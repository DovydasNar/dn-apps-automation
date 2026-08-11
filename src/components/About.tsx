"use client";

import { GraduationCap } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { techStack } from "@/components/TechLogos";
import { useLanguage } from "@/context/LanguageContext";

export function About() {
  const { t } = useLanguage();
  const education = t.about.education ?? [];

  return (
    <section id="apie" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(52,211,153,0.07),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn>
          <div className="glass glow-border rounded-2xl p-7 sm:p-10 lg:p-12">
            <SectionHeading title={t.about.title} />
            <p className="max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
              {t.about.text}
            </p>

            {education.length > 0 ? (
              <div className="mt-10">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {t.about.educationTitle}
                </p>
                <ul className="space-y-4">
                  {education.map((item, index) => (
                    <li
                      key={`${item.school}-${item.period}-${index}`}
                      className="rounded-2xl border border-border bg-background/50 p-4 sm:p-5"
                    >
                      <div className="flex gap-3">
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                          <GraduationCap size={18} />
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                            <h3 className="text-base font-semibold text-foreground sm:text-lg">
                              {item.degree || item.school}
                            </h3>
                            {item.period ? (
                              <span className="shrink-0 text-xs font-medium uppercase tracking-[0.12em] text-accent">
                                {item.period}
                              </span>
                            ) : null}
                          </div>
                          {item.degree && item.school ? (
                            <p className="mt-1 text-sm text-muted">{item.school}</p>
                          ) : null}
                          {item.description ? (
                            <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                              {item.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {t.about.stackLabel}
              </p>
              <ul className="flex flex-wrap gap-4">
                {techStack.map(({ name, Logo }) => (
                  <li
                    key={name}
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-background/50 px-4 py-3 transition hover:border-accent/40 hover:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white/95 p-1.5 shadow-[0_0_16px_rgba(34,211,238,0.12)]">
                      <Logo className="h-full w-full" />
                    </span>
                    <span className="text-sm font-medium text-foreground group-hover:text-accent">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
