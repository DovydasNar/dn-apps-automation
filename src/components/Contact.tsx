"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

const formStatusCopy = {
  lt: {
    submitting: "Siunčiama…",
    sent: "Sėkmingai išsiųsta!",
    error: "Klaida. Nepavyko išsiųsti žinutės.",
  },
  en: {
    submitting: "Sending…",
    sent: "Sent successfully!",
    error: "Error. Could not send the message.",
  },
} as const;

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function TelegramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.472.02.728-.15 1.58-.828 5.425-1.17 7.2-.145.75-.433 1.001-.712 1.025-.608.052-1.07-.4-1.66-.785-.92-.645-1.439-1.046-2.331-1.674-1.032-.726-.363-1.125.226-1.776.154-.17 2.833-2.597 2.884-2.82.006-.028.014-.134-.05-.19s-.16-.04-.228-.023c-.098.026-1.66 1.054-4.686 3.096-.443.304-.844.452-1.204.444-.397-.01-1.16-.224-1.727-.409-.697-.226-1.25-.346-1.202-.73.025-.2.3-.404.823-.613 3.22-1.401 5.37-2.324 6.45-2.77 3.065-1.267 3.703-1.487 4.118-1.487z" />
    </svg>
  );
}

export function Contact() {
  const { t, settings, locale } = useLanguage();
  const statusCopy = formStatusCopy[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const emailUrl = settings.email ? `mailto:${settings.email}` : undefined;
  const phoneHref = settings.phone
    ? `tel:${settings.phone.replace(/\s+/g, "")}`
    : undefined;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("send_failed");
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const contacts = [
    emailUrl
      ? {
          key: "email",
          href: emailUrl,
          label: t.contact.emailLabel,
          value: settings.emailLabel || settings.email,
          icon: <Mail size={18} />,
          external: false,
        }
      : null,
    phoneHref
      ? {
          key: "phone",
          href: phoneHref,
          label: t.contact.phoneLabel,
          value: settings.phoneLabel || settings.phone,
          icon: <Phone size={18} />,
          external: false,
        }
      : null,
    settings.location
      ? {
          key: "location",
          href: undefined,
          label: t.contact.locationLabel,
          value: settings.location,
          icon: <MapPin size={18} />,
          external: false,
        }
      : null,
    settings.linkedInUrl
      ? {
          key: "linkedin",
          href: settings.linkedInUrl,
          label: t.contact.linkedInLabel,
          value: t.contact.profileLabel,
          icon: <LinkedInIcon size={18} />,
          external: true,
        }
      : null,
    settings.githubUrl
      ? {
          key: "github",
          href: settings.githubUrl,
          label: t.contact.githubLabel,
          value: t.contact.profileLabel,
          icon: <GitHubIcon size={18} />,
          external: true,
        }
      : null,
    settings.telegramUrl
      ? {
          key: "telegram",
          href: settings.telegramUrl,
          label: t.contact.telegramLabel,
          value: t.contact.profileLabel,
          icon: <TelegramIcon size={18} />,
          external: true,
        }
      : null,
  ].filter(Boolean) as {
    key: string;
    href?: string;
    label: string;
    value: string;
    icon: ReactNode;
    external: boolean;
  }[];

  return (
    <section id="kontaktai" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading title={t.contact.title} subtitle={t.contact.subtitle} />
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-5">
          <FadeIn className="lg:col-span-3" delay={0.05}>
            <form
              onSubmit={handleSubmit}
              className="glass glow-border min-w-0 rounded-2xl p-5 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="name"
                  name="name"
                  label={t.contact.fields.name}
                  type="text"
                  required
                  autoComplete="name"
                />
                <Field
                  id="email"
                  name="email"
                  label={t.contact.fields.email}
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-muted"
                >
                  {t.contact.fields.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-y rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground outline-none transition placeholder:text-muted/60 focus:border-accent/50 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/15 px-6 py-3 text-sm font-medium text-accent shadow-[0_0_28px_rgba(34,211,238,0.22)] transition hover:border-accent hover:bg-accent/25 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? statusCopy.submitting : t.contact.submit}
                  <Send size={16} />
                </button>
                {status === "sent" ? (
                  <p className="text-sm text-accent-secondary">
                    {statusCopy.sent}
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="text-sm text-red-400">{statusCopy.error}</p>
                ) : null}
              </div>
            </form>
          </FadeIn>

          <FadeIn className="lg:col-span-2" delay={0.12}>
            <div className="glass glow-border flex h-full min-w-0 flex-col justify-between gap-8 rounded-2xl p-5 sm:p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-muted">
                  {t.contact.directTitle}
                </p>
                <p className="mt-3 text-lg leading-relaxed text-foreground/90">
                  {t.contact.directText}
                </p>
              </div>

              <ul className="space-y-3">
                {contacts.map((item) => {
                  const className =
                    "group flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 transition hover:border-accent/40 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]";
                  const inner = (
                    <>
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                        {item.icon}
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-muted">
                          {item.label}
                        </span>
                        <span className="text-sm text-foreground group-hover:text-accent">
                          {item.value}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={item.key}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className={className}
                          {...(item.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className={className}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  type,
  required,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground outline-none transition placeholder:text-muted/60 focus:border-accent/50 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
      />
    </div>
  );
}
