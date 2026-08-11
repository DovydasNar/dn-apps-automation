import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import { defaultContent, type SiteContent } from "@/lib/i18n";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_PATH = path.join(DATA_DIR, "site-content.json");
const REDIS_KEY = "dn:site-content";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mergeContent(raw: unknown): SiteContent {
  if (!isObject(raw)) return structuredClone(defaultContent);

  const base = structuredClone(defaultContent);
  const settings = isObject(raw.settings) ? raw.settings : {};
  const locales = isObject(raw.locales) ? raw.locales : {};

  return {
    settings: {
      ...base.settings,
      ...(settings as Partial<SiteContent["settings"]>),
    },
    locales: {
      lt: deepMerge(base.locales.lt, locales.lt),
      en: deepMerge(base.locales.en, locales.en),
    },
  };
}

function deepMerge<T>(base: T, patch: unknown): T {
  if (Array.isArray(base)) {
    return (Array.isArray(patch) ? patch : base) as T;
  }

  if (!isObject(base)) {
    return patch === undefined ? base : (patch as T);
  }

  if (!isObject(patch)) return base;

  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (key in base) {
      result[key] = deepMerge((base as Record<string, unknown>)[key], value);
    } else {
      result[key] = value;
    }
  }
  return result as T;
}

export function hasRedisConfig() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

export function getStorageMode(): "redis" | "file" {
  return hasRedisConfig() ? "redis" : "file";
}

function getRedis() {
  return Redis.fromEnv();
}

async function readFromFile(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf8");
    return mergeContent(JSON.parse(raw));
  } catch {
    const content = structuredClone(defaultContent);
    await writeToFile(content);
    return content;
  }
}

async function writeToFile(content: SiteContent): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf8");
}

async function readFromRedis(): Promise<SiteContent> {
  const redis = getRedis();
  const raw = await redis.get<SiteContent | string>(REDIS_KEY);

  if (!raw) {
    const seeded = structuredClone(defaultContent);
    await redis.set(REDIS_KEY, seeded);
    return seeded;
  }

  if (typeof raw === "string") {
    return mergeContent(JSON.parse(raw));
  }

  return mergeContent(raw);
}

async function writeToRedis(content: SiteContent): Promise<void> {
  const redis = getRedis();
  await redis.set(REDIS_KEY, content);
}

export async function readContent(): Promise<SiteContent> {
  if (hasRedisConfig()) {
    return readFromRedis();
  }
  return readFromFile();
}

export async function writeContent(content: SiteContent): Promise<SiteContent> {
  const normalized = mergeContent(content);

  if (hasRedisConfig()) {
    await writeToRedis(normalized);
    return normalized;
  }

  // On Vercel, local filesystem is ephemeral / read-only for durable writes.
  if (process.env.VERCEL) {
    throw new Error(
      "Production storage is not configured. Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.",
    );
  }

  await writeToFile(normalized);
  return normalized;
}
