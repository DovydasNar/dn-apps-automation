"use client";

import { motion } from "framer-motion";
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
          {t.portfolio.projects.map((project, index) => {
            const tags = Array.isArray(project.tags) ? project.tags : [];
            const progress = Math.max(
              0,
              Math.min(100, Number(project.progress) || 0),
            );

            return (
              <FadeIn
                key={`${project.name}-${index}`}
                as="li"
                delay={index * 0.08}
              >
                <article className="glass glow-border group flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] sm:p-7">
                  <div>
                    {project.category ? (
                      <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent shadow-[0_0_16px_rgba(34,211,238,0.18)]">
                        {project.category}
                      </span>
                    ) : null}

                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                      {project.name}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-base leading-relaxed text-slate-300">
                      {project.summary}
                    </p>

                    {project.impact ? (
                      <div className="mt-5 rounded-xl border border-accent/20 bg-accent/[0.06] px-3.5 py-3 shadow-[inset_0_0_20px_rgba(34,211,238,0.06)]">
                        <p className="text-sm font-medium leading-snug text-accent">
                          {project.impact}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-6 space-y-5">
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-xs uppercase tracking-[0.14em] text-muted">
                          {t.portfolio.progressLabel}
                        </span>
                        <span className="text-sm font-semibold tabular-nums text-accent">
                          {progress}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-background/80 ring-1 ring-border">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-accent via-cyan-300 to-accent-secondary shadow-[0_0_18px_rgba(34,211,238,0.55)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{
                            duration: 1,
                            delay: 0.1 + index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </div>
                    </div>

                    {tags.length > 0 ? (
                      <ul className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-slate-400"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
