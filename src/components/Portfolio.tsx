"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

export function Portfolio() {
  const { t } = useLanguage();

  return (
    <section id="darbai" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            title={t.portfolio.title}
            subtitle={t.portfolio.subtitle}
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="glass glow-border overflow-hidden rounded-3xl">
            <ul className="divide-y divide-border/70">
              {t.portfolio.projects.map((project, index) => (
                <li
                  key={project.name}
                  className="grid gap-5 p-6 transition hover:bg-accent/[0.03] sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-8"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-sm font-semibold text-accent shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                    0{index + 1}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div className="max-w-2xl">
                        <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                          {project.name}
                        </h3>
                        <p className="mt-2 text-base leading-relaxed text-muted">
                          {project.summary}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold tabular-nums text-accent">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-muted">
                        <span>{t.portfolio.progressLabel}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-background/80 ring-1 ring-border">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-accent via-cyan-300 to-accent-secondary shadow-[0_0_18px_rgba(34,211,238,0.55)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress}%` }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{
                            duration: 1,
                            delay: 0.1 + index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
