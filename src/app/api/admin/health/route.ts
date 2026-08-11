import { NextResponse } from "next/server";
import { getStorageMode, hasRedisConfig, readContent } from "@/lib/content-store";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await readContent();
  return NextResponse.json({
    storage: getStorageMode(),
    redisConfigured: hasRedisConfig(),
    vercel: Boolean(process.env.VERCEL),
    brandName: content.settings.brandName,
  });
}
