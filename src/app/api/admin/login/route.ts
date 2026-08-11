import { NextResponse } from "next/server";
import {
  createSessionToken,
  isAdminAuthenticated,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { password?: string }
    | null;

  if (!body?.password || !verifyPassword(body.password)) {
    return NextResponse.json({ error: "Neteisingas slaptažodis" }, { status: 401 });
  }

  const token = createSessionToken();
  const response = NextResponse.json({ ok: true });
  const options = sessionCookieOptions(token);
  response.cookies.set(options);
  return response;
}
