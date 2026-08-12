"use client";

import {
  Bot,
  Database,
  Globe,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

const icons: LucideIcon[] = [Workflow, Database, Bot, Globe];

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="paslaugos" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.06),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading title={t.services.title} />
        </FadeIn>

        <ul className="grid gap-5 sm:grid-cols-2">
          {t.services.items.map((item, index) => {
            const Icon = icons[index] ?? Workflow;
            return (
              <FadeIn key={item.title} as="li" className="h-full" delay={index * 0.08}>
                <article className="glass glow-border group h-full min-w-0 rounded-2xl p-5 sm:p-7">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition group-hover:border-accent/50 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground break-words">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted break-words">
                    {item.description}
                  </p>
                </article>
              </FadeIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
