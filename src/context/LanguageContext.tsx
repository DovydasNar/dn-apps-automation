"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultContent,
  type Dictionary,
  type Locale,
  type SiteContent,
  type SiteSettings,
} from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  settings: SiteSettings;
  content: SiteContent;
  loading: boolean;
  refreshContent: () => Promise<void>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "dn-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("lt");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  const refreshContent = useCallback(async () => {
    try {
      const response = await fetch("/api/content", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as SiteContent;
      // Guard against stale Redis payloads missing new portfolio fields.
      if (
        data?.locales?.lt?.portfolio?.projects &&
        data?.locales?.en?.portfolio?.projects
      ) {
        setContent(data);
      }
    } catch {
      // keep current/default content
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "lt" || saved === "en") {
      setLocaleState(saved);
    }
    void refreshContent();

    const onFocus = () => {
      void refreshContent();
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [refreshContent]);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: content.locales[locale],
      settings: content.settings,
      content,
      loading,
      refreshContent,
    }),
    [locale, setLocale, content, loading, refreshContent],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
