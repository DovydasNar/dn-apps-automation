"use client";

import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-muted sm:flex-row sm:px-8">
        <p>{t.footer.copyright}</p>
        <a href="#top" className="transition hover:text-accent">
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
