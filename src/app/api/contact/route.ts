import { NextResponse } from "next/server";
import { readContent } from "@/lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function asTrimmedString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = asTrimmedString(body.name, 120);
  const email = asTrimmedString(body.email, 200);
  const message = asTrimmedString(body.message, 5000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "email_not_configured" },
      { status: 503 },
    );
  }

  const content = await readContent();
  const to =
    process.env.CONTACT_TO_EMAIL?.trim() || content.settings.email?.trim();

  if (!to || !EMAIL_RE.test(to) || to.endsWith("@example.com")) {
    return NextResponse.json(
      { error: "recipient_not_configured" },
      { status: 503 },
    );
  }

  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "DN Apps & Automation <onboarding@resend.dev>";
  const brand = content.settings.brandName || "DN Apps & Automation";
  const subject = `${content.locales.lt.contact.mailSubject}: ${name}`;
  const text = [
    `${content.locales.lt.contact.mailBodyName}: ${name}`,
    `${content.locales.lt.contact.mailBodyEmail}: ${email}`,
    "",
    message,
  ].join("\n");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[${brand}] ${subject}`,
      text,
    }),
  });

  if (!resendResponse.ok) {
    const details = await resendResponse.text().catch(() => "");
    console.error("Resend error:", resendResponse.status, details);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
