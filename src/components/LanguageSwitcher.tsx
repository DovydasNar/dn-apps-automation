"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/lib/i18n";

const options: { value: Locale; label: string }[] = [
  { value: "lt", label: "LT" },
  { value: "en", label: "EN" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex rounded-full border border-border bg-background/50 p-0.5"
    >
      {options.map((option) => {
        const active = locale === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLocale(option.value)}
            className={`min-w-9 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition ${
              active
                ? "bg-accent/20 text-accent shadow-[0_0_16px_rgba(34,211,238,0.25)]"
                : "text-muted hover:text-foreground"
            }`}
            aria-pressed={active}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
