import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import {
  defaultContent,
  type Dictionary,
  type SiteContent,
} from "@/lib/i18n";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_PATH = path.join(DATA_DIR, "site-content.json");
const REDIS_KEY = "dn:site-content";

type PortfolioProject = Dictionary["portfolio"]["projects"][number];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizePortfolioProject(
  project: unknown,
  fallback: PortfolioProject,
): PortfolioProject {
  if (!isObject(project)) return { ...fallback };

  const hasNewShape =
    typeof project.category === "string" &&
    typeof project.impact === "string" &&
    Array.isArray(project.tags);

  // Old progress-based cards would crash the UI — migrate to defaults.
  if (!hasNewShape) return { ...fallback };

  return {
    category: project.category as string,
    name:
      typeof project.name === "string" && project.name.trim()
        ? project.name
        : fallback.name,
    summary:
      typeof project.summary === "string" && project.summary.trim()
        ? project.summary
        : fallback.summary,
    impact: project.impact as string,
    tags: (project.tags as unknown[])
      .filter((tag): tag is string => typeof tag === "string" && Boolean(tag.trim()))
      .map((tag) => tag.trim()),
  };
}

function normalizeLocale(locale: Dictionary, defaults: Dictionary): Dictionary {
  const fallbackProjects = defaults.portfolio.projects;
  const rawProjects = Array.isArray(locale.portfolio.projects)
    ? locale.portfolio.projects
    : fallbackProjects;

  const projects =
    rawProjects.length > 0
      ? rawProjects.map((project, index) =>
          normalizePortfolioProject(
            project,
            fallbackProjects[index] ?? fallbackProjects[0],
          ),
        )
      : fallbackProjects.map((project) => ({ ...project }));

  return {
    ...locale,
    portfolio: {
      title: locale.portfolio.title || defaults.portfolio.title,
      subtitle: locale.portfolio.subtitle || defaults.portfolio.subtitle,
      projects,
    },
  };
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
      lt: normalizeLocale(deepMerge(base.locales.lt, locales.lt), base.locales.lt),
      en: normalizeLocale(deepMerge(base.locales.en, locales.en), base.locales.en),
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

  const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
  const merged = mergeContent(parsed);

  // Persist migrated schema (e.g. portfolio cards) so clients stop receiving stale shapes.
  await redis.set(REDIS_KEY, merged);

  return merged;
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
