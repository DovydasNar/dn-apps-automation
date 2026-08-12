"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { navHrefs } from "@/lib/i18n";

export function Hero() {
  const { t, settings } = useLanguage();

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-start overflow-x-hidden animated-gradient pt-16 lg:items-center"
    >
      <div className="pointer-events-none absolute inset-0 hero-grid" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-14 sm:gap-10 sm:px-8 sm:py-28 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative z-20 min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-accent"
          >
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="max-w-3xl text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-foreground break-words sm:text-5xl lg:text-[3.25rem]"
          >
            {t.hero.h1}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted break-words sm:mt-6 sm:text-xl"
          >
            {t.hero.h2}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-8 sm:mt-10"
          >
            <a
              href={navHrefs.contact}
              className="group inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/15 px-7 py-3.5 text-base font-medium text-accent shadow-[0_0_32px_rgba(34,211,238,0.25)] transition hover:border-accent hover:bg-accent/25 hover:shadow-[0_0_48px_rgba(34,211,238,0.45)]"
            >
              {t.hero.cta}
              <ArrowDownRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative z-10 mx-auto flex w-full max-w-[16rem] items-center justify-center sm:max-w-md lg:max-w-none"
        >
          <div className="pointer-events-none absolute inset-8 rounded-full bg-accent/15 blur-3xl" />
          <div className="glass relative rounded-[1.75rem] border-accent/20 p-3 shadow-[0_0_60px_rgba(34,211,238,0.18)] sm:p-6">
            <Image
              src="/logo.png"
              alt={settings.brandName}
              width={720}
              height={720}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
