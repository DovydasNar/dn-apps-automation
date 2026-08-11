import { NextResponse } from "next/server";
import { readContent } from "@/lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const content = await readContent();
  return NextResponse.json(content);
}
