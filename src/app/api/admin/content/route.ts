import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { writeContent } from "@/lib/content-store";
import type { SiteContent } from "@/lib/i18n";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as SiteContent;
    if (!body?.settings || !body?.locales?.lt || !body?.locales?.en) {
      return NextResponse.json({ error: "Invalid content payload" }, { status: 400 });
    }

    const content = await writeContent(body);
    return NextResponse.json({ ok: true, content });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save content";
    const status = message.includes("UPSTASH_REDIS") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
