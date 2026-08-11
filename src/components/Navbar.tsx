"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { navHrefs } from "@/lib/i18n";

export function Navbar() {
  const { t, settings } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: navHrefs.services, label: t.nav.services },
    { href: navHrefs.work, label: t.nav.work },
    { href: navHrefs.about, label: t.nav.about },
    { href: navHrefs.contact, label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border bg-background/75 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:h-[4.25rem] sm:px-8">
        <a
          href="#top"
          className="group flex min-w-0 items-center gap-2.5"
          aria-label={settings.brandName}
        >
          <Image
            src="/logo.png"
            alt={settings.brandName}
            width={160}
            height={64}
            priority
            className="h-10 w-auto object-contain drop-shadow-[0_0_18px_rgba(34,211,238,0.35)] transition group-hover:drop-shadow-[0_0_26px_rgba(34,211,238,0.5)] sm:h-12"
          />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <a
            href={navHrefs.contact}
            className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition hover:border-accent hover:bg-accent/20 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
          >
            {t.nav.contactCta}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            className="inline-flex items-center justify-center rounded-lg border border-border p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-base text-foreground transition hover:bg-accent/10 hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={navHrefs.contact}
                className="mt-2 block rounded-lg bg-accent/15 px-3 py-3 text-center font-medium text-accent"
                onClick={() => setOpen(false)}
              >
                {t.nav.contactCta}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
