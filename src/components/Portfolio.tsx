"use client";

import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

export function Portfolio() {
  const { t } = useLanguage();

  return (
    <section id="darbai" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            title={t.portfolio.title}
            subtitle={t.portfolio.subtitle}
          />
        </FadeIn>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.portfolio.projects.map((project, index) => (
            <FadeIn key={project.name} as="li" delay={index * 0.08}>
              <article className="glass glow-border group flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] sm:p-7">
                <div>
                  <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent shadow-[0_0_16px_rgba(34,211,238,0.18)]">
                    {project.category}
                  </span>

                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                    {project.name}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-base leading-relaxed text-slate-300">
                    {project.summary}
                  </p>

                  <div className="mt-5 rounded-xl border border-accent/20 bg-accent/[0.06] px-3.5 py-3 shadow-[inset_0_0_20px_rgba(34,211,238,0.06)]">
                    <p className="text-sm font-medium leading-snug text-accent">
                      {project.impact}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-slate-400"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
