"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  AdminField,
  AdminSection,
  LocaleTabs,
} from "@/components/admin/AdminFields";
import { defaultContent, type Locale, type SiteContent } from "@/lib/i18n";

type Tab =
  | "settings"
  | "hero"
  | "services"
  | "portfolio"
  | "about"
  | "contact"
  | "nav";

const tabs: { id: Tab; label: string }[] = [
  { id: "settings", label: "Nustatymai" },
  { id: "hero", label: "Hero" },
  { id: "services", label: "Paslaugos" },
  { id: "portfolio", label: "Darbai" },
  { id: "about", label: "Apie" },
  { id: "contact", label: "Kontaktai" },
  { id: "nav", label: "Navigacija" },
];

export function AdminApp() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [locale, setLocale] = useState<Locale>("lt");
  const [tab, setTab] = useState<Tab>("settings");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [storageInfo, setStorageInfo] = useState<{
    storage: string;
    redisConfigured: boolean;
    vercel: boolean;
  } | null>(null);

  useEffect(() => {
    async function boot() {
      try {
        const session = await fetch("/api/admin/login", { cache: "no-store" });
        const sessionData = (await session.json()) as { authenticated?: boolean };
        setAuthenticated(Boolean(sessionData.authenticated));

        const contentRes = await fetch("/api/content", { cache: "no-store" });
        if (contentRes.ok) {
          setContent((await contentRes.json()) as SiteContent);
        }

        if (sessionData.authenticated) {
          const healthRes = await fetch("/api/admin/health", { cache: "no-store" });
          if (healthRes.ok) {
            setStorageInfo(
              (await healthRes.json()) as {
                storage: string;
                redisConfigured: boolean;
                vercel: boolean;
              },
            );
          }
        }
      } catch {
        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    }

    void boot();
  }, []);

  const dict = content.locales[locale];

  const dirtyHint = useMemo(
    () => "Pakeitimai išsaugomi tik paspaudus „Išsaugoti“.",
    [],
  );

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setLoginError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setLoginError("Neteisingas slaptažodis.");
      return;
    }

    setAuthenticated(true);
    setPassword("");

    const healthRes = await fetch("/api/admin/health", { cache: "no-store" });
    if (healthRes.ok) {
      setStorageInfo(
        (await healthRes.json()) as {
          storage: string;
          redisConfigured: boolean;
          vercel: boolean;
        },
      );
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
  }

  async function handleSave() {
    setSaving(true);
    setStatus("");
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (response.status === 401) {
        setAuthenticated(false);
        setStatus("Sesija baigėsi. Prisijunkite iš naujo.");
        return;
      }

      if (!response.ok) {
        setStatus("Nepavyko išsaugoti. Bandykite dar kartą.");
        return;
      }

      const data = (await response.json()) as { content: SiteContent };
      setContent(data.content);
      setStatus("Išsaugota. Viešas puslapis atsinaujins iš karto.");
    } catch {
      setStatus("Įvyko klaida saugant turinį.");
    } finally {
      setSaving(false);
    }
  }

  function updateLocale(
    updater: (current: SiteContent["locales"][Locale]) => SiteContent["locales"][Locale],
  ) {
    setContent((prev) => ({
      ...prev,
      locales: {
        ...prev.locales,
        [locale]: updater(prev.locales[locale]),
      },
    }));
  }

  if (checking) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background text-muted">
        Kraunama…
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background px-5">
        <form
          onSubmit={handleLogin}
          className="glass w-full max-w-md rounded-2xl border border-border p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Admin
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-foreground">
            DN Apps valdymas
          </h1>
          <p className="mt-2 text-sm text-muted">
            Prisijunkite, kad redaguotumėte tekstus, darbus ir kontaktus.
          </p>

          <div className="mt-6">
            <AdminField
              label="Slaptažodis"
              value={password}
              onChange={setPassword}
              type="password"
            />
          </div>

          {loginError ? (
            <p className="mt-3 text-sm text-red-400">{loginError}</p>
          ) : null}

          <button
            type="submit"
            className="mt-6 w-full rounded-full border border-accent/50 bg-accent/15 px-5 py-3 text-sm font-medium text-accent transition hover:bg-accent/25"
          >
            Prisijungti
          </button>

          <Link
            href="/"
            className="mt-4 block text-center text-sm text-muted hover:text-accent"
          >
            Grįžti į svetainę
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-accent">Admin</p>
            <h1 className="text-lg font-semibold">{content.settings.brandName}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <LocaleTabs locale={locale} onChange={setLocale} />
            <Link
              href="/"
              target="_blank"
              className="rounded-full border border-border px-3 py-1.5 text-sm text-muted hover:text-accent"
            >
              Peržiūra
            </Link>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="rounded-full border border-border px-3 py-1.5 text-sm text-muted hover:text-foreground"
            >
              Atsijungti
            </button>
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className="rounded-full border border-accent/50 bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent disabled:opacity-60"
            >
              {saving ? "Saugoma…" : "Išsaugoti"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-2xl border border-border bg-card p-2 lg:sticky lg:top-24">
          <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  tab === item.id
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="space-y-4">
          <p className="text-sm text-muted">{dirtyHint}</p>
          {storageInfo ? (
            <p
              className={`rounded-xl border px-4 py-3 text-sm ${
                storageInfo.redisConfigured
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : "border-amber-400/30 bg-amber-400/10 text-amber-200"
              }`}
            >
              {storageInfo.redisConfigured
                ? `Saugykla: Upstash Redis (paruošta production).`
                : storageInfo.vercel
                  ? "Vercel aplinkoje nerastas Upstash Redis. Admin pakeitimai neišsilaikys, kol pridėsite UPSTASH_REDIS_REST_URL ir UPSTASH_REDIS_REST_TOKEN."
                  : "Vietinė saugykla: data/site-content.json. Deploy’ui į Vercel reikės Upstash Redis."}
            </p>
          ) : null}
          {status ? <p className="text-sm text-accent-secondary">{status}</p> : null}

          {tab === "settings" ? (
            <AdminSection
              title="Kontaktai ir nustatymai"
              description="Šie duomenys matomi kontaktų skiltyje abiem kalbom."
            >
              <AdminField
                label="Svetainės pavadinimas"
                value={content.settings.brandName}
                onChange={(brandName) =>
                  setContent((prev) => ({
                    ...prev,
                    settings: { ...prev.settings, brandName },
                  }))
                }
              />
              <AdminField
                label="El. paštas (mailto)"
                value={content.settings.email}
                onChange={(email) =>
                  setContent((prev) => ({
                    ...prev,
                    settings: { ...prev.settings, email },
                  }))
                }
              />
              <AdminField
                label="El. pašto etiketė (kas rodoma)"
                value={content.settings.emailLabel}
                onChange={(emailLabel) =>
                  setContent((prev) => ({
                    ...prev,
                    settings: { ...prev.settings, emailLabel },
                  }))
                }
              />
              <AdminField
                label="Telefonas (tel: nuorodai, pvz. +37060000000)"
                value={content.settings.phone}
                onChange={(phone) =>
                  setContent((prev) => ({
                    ...prev,
                    settings: { ...prev.settings, phone },
                  }))
                }
              />
              <AdminField
                label="Telefono etiketė (kas rodoma)"
                value={content.settings.phoneLabel}
                onChange={(phoneLabel) =>
                  setContent((prev) => ({
                    ...prev,
                    settings: { ...prev.settings, phoneLabel },
                  }))
                }
              />
              <AdminField
                label="Vieta / miestas"
                value={content.settings.location}
                onChange={(location) =>
                  setContent((prev) => ({
                    ...prev,
                    settings: { ...prev.settings, location },
                  }))
                }
              />
              <AdminField
                label="LinkedIn URL"
                value={content.settings.linkedInUrl}
                onChange={(linkedInUrl) =>
                  setContent((prev) => ({
                    ...prev,
                    settings: { ...prev.settings, linkedInUrl },
                  }))
                }
              />
              <AdminField
                label="GitHub URL"
                value={content.settings.githubUrl}
                onChange={(githubUrl) =>
                  setContent((prev) => ({
                    ...prev,
                    settings: { ...prev.settings, githubUrl },
                  }))
                }
              />
              <AdminField
                label="Telegram URL (pvz. https://t.me/username)"
                value={content.settings.telegramUrl}
                onChange={(telegramUrl) =>
                  setContent((prev) => ({
                    ...prev,
                    settings: { ...prev.settings, telegramUrl },
                  }))
                }
              />
            </AdminSection>
          ) : null}

          {tab === "hero" ? (
            <AdminSection title="Hero sekcija">
              <AdminField
                label="Eyebrow"
                value={dict.hero.eyebrow}
                onChange={(eyebrow) =>
                  updateLocale((current) => ({
                    ...current,
                    hero: { ...current.hero, eyebrow },
                  }))
                }
              />
              <AdminField
                label="H1"
                value={dict.hero.h1}
                onChange={(h1) =>
                  updateLocale((current) => ({
                    ...current,
                    hero: { ...current.hero, h1 },
                  }))
                }
                multiline
              />
              <AdminField
                label="H2"
                value={dict.hero.h2}
                onChange={(h2) =>
                  updateLocale((current) => ({
                    ...current,
                    hero: { ...current.hero, h2 },
                  }))
                }
                multiline
              />
              <AdminField
                label="CTA mygtukas"
                value={dict.hero.cta}
                onChange={(cta) =>
                  updateLocale((current) => ({
                    ...current,
                    hero: { ...current.hero, cta },
                  }))
                }
              />
            </AdminSection>
          ) : null}

          {tab === "services" ? (
            <AdminSection
              title="Paslaugos"
              description="Galite pridėti, redaguoti ar ištrinti paslaugų korteles."
            >
              <AdminField
                label="Sekcijos pavadinimas"
                value={dict.services.title}
                onChange={(title) =>
                  updateLocale((current) => ({
                    ...current,
                    services: { ...current.services, title },
                  }))
                }
              />

              {dict.services.items.map((item, index) => (
                <div
                  key={index}
                  className="space-y-3 rounded-xl border border-border/80 bg-background/40 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-accent">
                      Paslauga {index + 1}
                    </p>
                    <button
                      type="button"
                      className="text-xs text-red-400 hover:text-red-300"
                      onClick={() =>
                        updateLocale((current) => ({
                          ...current,
                          services: {
                            ...current.services,
                            items: current.services.items.filter((_, i) => i !== index),
                          },
                        }))
                      }
                    >
                      Ištrinti
                    </button>
                  </div>
                  <AdminField
                    label="Pavadinimas"
                    value={item.title}
                    onChange={(title) =>
                      updateLocale((current) => {
                        const items = [...current.services.items];
                        items[index] = { ...items[index], title };
                        return {
                          ...current,
                          services: { ...current.services, items },
                        };
                      })
                    }
                  />
                  <AdminField
                    label="Aprašymas"
                    value={item.description}
                    multiline
                    onChange={(description) =>
                      updateLocale((current) => {
                        const items = [...current.services.items];
                        items[index] = { ...items[index], description };
                        return {
                          ...current,
                          services: { ...current.services, items },
                        };
                      })
                    }
                  />
                </div>
              ))}

              <button
                type="button"
                className="rounded-full border border-accent/40 px-4 py-2 text-sm text-accent hover:bg-accent/10"
                onClick={() =>
                  updateLocale((current) => ({
                    ...current,
                    services: {
                      ...current.services,
                      items: [
                        ...current.services.items,
                        {
                          title: locale === "lt" ? "Nauja paslauga" : "New service",
                          description: "",
                        },
                      ],
                    },
                  }))
                }
              >
                + Pridėti paslaugą
              </button>
            </AdminSection>
          ) : null}

          {tab === "portfolio" ? (
            <AdminSection
              title="Atlikti darbai"
              description="Kortelės su kategorija, aprašymu, rezultatu ir technologijomis."
            >
              <AdminField
                label="Sekcijos pavadinimas"
                value={dict.portfolio.title}
                onChange={(title) =>
                  updateLocale((current) => ({
                    ...current,
                    portfolio: { ...current.portfolio, title },
                  }))
                }
              />
              <AdminField
                label="Subtitras"
                value={dict.portfolio.subtitle}
                multiline
                onChange={(subtitle) =>
                  updateLocale((current) => ({
                    ...current,
                    portfolio: { ...current.portfolio, subtitle },
                  }))
                }
              />

              {dict.portfolio.projects.map((project, index) => (
                <div
                  key={index}
                  className="space-y-3 rounded-xl border border-border/80 bg-background/40 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-accent">
                      Projektas {index + 1}
                    </p>
                    <button
                      type="button"
                      className="text-xs text-red-400 hover:text-red-300"
                      onClick={() =>
                        updateLocale((current) => ({
                          ...current,
                          portfolio: {
                            ...current.portfolio,
                            projects: current.portfolio.projects.filter(
                              (_, i) => i !== index,
                            ),
                          },
                        }))
                      }
                    >
                      Ištrinti
                    </button>
                  </div>
                  <AdminField
                    label="Kategorija"
                    value={project.category}
                    onChange={(category) =>
                      updateLocale((current) => {
                        const projects = [...current.portfolio.projects];
                        projects[index] = { ...projects[index], category };
                        return {
                          ...current,
                          portfolio: { ...current.portfolio, projects },
                        };
                      })
                    }
                  />
                  <AdminField
                    label="Pavadinimas"
                    value={project.name}
                    onChange={(name) =>
                      updateLocale((current) => {
                        const projects = [...current.portfolio.projects];
                        projects[index] = { ...projects[index], name };
                        return {
                          ...current,
                          portfolio: { ...current.portfolio, projects },
                        };
                      })
                    }
                  />
                  <AdminField
                    label="Aprašymas"
                    value={project.summary}
                    multiline
                    onChange={(summary) =>
                      updateLocale((current) => {
                        const projects = [...current.portfolio.projects];
                        projects[index] = { ...projects[index], summary };
                        return {
                          ...current,
                          portfolio: { ...current.portfolio, projects },
                        };
                      })
                    }
                  />
                  <AdminField
                    label="Rezultatas / poveikis"
                    value={project.impact}
                    onChange={(impact) =>
                      updateLocale((current) => {
                        const projects = [...current.portfolio.projects];
                        projects[index] = { ...projects[index], impact };
                        return {
                          ...current,
                          portfolio: { ...current.portfolio, projects },
                        };
                      })
                    }
                  />
                  <AdminField
                    label="Technologijos (atskirtos kableliu)"
                    value={project.tags.join(", ")}
                    onChange={(value) =>
                      updateLocale((current) => {
                        const projects = [...current.portfolio.projects];
                        const tags = value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean);
                        projects[index] = { ...projects[index], tags };
                        return {
                          ...current,
                          portfolio: { ...current.portfolio, projects },
                        };
                      })
                    }
                  />
                </div>
              ))}

              <button
                type="button"
                className="rounded-full border border-accent/40 px-4 py-2 text-sm text-accent hover:bg-accent/10"
                onClick={() =>
                  updateLocale((current) => ({
                    ...current,
                    portfolio: {
                      ...current.portfolio,
                      projects: [
                        ...current.portfolio.projects,
                        {
                          category:
                            locale === "lt" ? "Nauja kategorija" : "New category",
                          name:
                            locale === "lt" ? "Naujas projektas" : "New project",
                          summary: "",
                          impact: "",
                          tags: [],
                        },
                      ],
                    },
                  }))
                }
              >
                + Pridėti projektą
              </button>
            </AdminSection>
          ) : null}

          {tab === "about" ? (
            <AdminSection title="Apie mane">
              <AdminField
                label="Pavadinimas"
                value={dict.about.title}
                onChange={(title) =>
                  updateLocale((current) => ({
                    ...current,
                    about: { ...current.about, title },
                  }))
                }
              />
              <AdminField
                label="Tekstas"
                value={dict.about.text}
                multiline
                onChange={(text) =>
                  updateLocale((current) => ({
                    ...current,
                    about: { ...current.about, text },
                  }))
                }
              />
              <AdminField
                label="Technologijų etiketė"
                value={dict.about.stackLabel}
                onChange={(stackLabel) =>
                  updateLocale((current) => ({
                    ...current,
                    about: { ...current.about, stackLabel },
                  }))
                }
              />
              <AdminField
                label="Išsilavinimo sekcijos pavadinimas"
                value={dict.about.educationTitle}
                onChange={(educationTitle) =>
                  updateLocale((current) => ({
                    ...current,
                    about: { ...current.about, educationTitle },
                  }))
                }
              />

              {(dict.about.education ?? []).map((item, index) => (
                <div
                  key={index}
                  className="space-y-3 rounded-xl border border-border/80 bg-background/40 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-accent">
                      Išsilavinimas {index + 1}
                    </p>
                    <button
                      type="button"
                      className="text-xs text-red-400 hover:text-red-300"
                      onClick={() =>
                        updateLocale((current) => ({
                          ...current,
                          about: {
                            ...current.about,
                            education: (current.about.education ?? []).filter(
                              (_, i) => i !== index,
                            ),
                          },
                        }))
                      }
                    >
                      Ištrinti
                    </button>
                  </div>
                  <AdminField
                    label="Mokymo įstaiga"
                    value={item.school}
                    onChange={(school) =>
                      updateLocale((current) => {
                        const education = [...(current.about.education ?? [])];
                        education[index] = { ...education[index], school };
                        return {
                          ...current,
                          about: { ...current.about, education },
                        };
                      })
                    }
                  />
                  <AdminField
                    label="Laipsnis / specialybė"
                    value={item.degree}
                    onChange={(degree) =>
                      updateLocale((current) => {
                        const education = [...(current.about.education ?? [])];
                        education[index] = { ...education[index], degree };
                        return {
                          ...current,
                          about: { ...current.about, education },
                        };
                      })
                    }
                  />
                  <AdminField
                    label="Laikotarpis (pvz. 2019 — 2023)"
                    value={item.period}
                    onChange={(period) =>
                      updateLocale((current) => {
                        const education = [...(current.about.education ?? [])];
                        education[index] = { ...education[index], period };
                        return {
                          ...current,
                          about: { ...current.about, education },
                        };
                      })
                    }
                  />
                  <AdminField
                    label="Trumpas aprašymas (nebūtina)"
                    value={item.description}
                    multiline
                    onChange={(description) =>
                      updateLocale((current) => {
                        const education = [...(current.about.education ?? [])];
                        education[index] = { ...education[index], description };
                        return {
                          ...current,
                          about: { ...current.about, education },
                        };
                      })
                    }
                  />
                </div>
              ))}

              <button
                type="button"
                className="rounded-full border border-accent/40 px-4 py-2 text-sm text-accent hover:bg-accent/10"
                onClick={() =>
                  updateLocale((current) => ({
                    ...current,
                    about: {
                      ...current.about,
                      education: [
                        ...(current.about.education ?? []),
                        {
                          school:
                            locale === "lt"
                              ? "Mokymo įstaiga"
                              : "Institution",
                          degree:
                            locale === "lt"
                              ? "Specialybė / laipsnis"
                              : "Degree / field",
                          period: "",
                          description: "",
                        },
                      ],
                    },
                  }))
                }
              >
                + Pridėti išsilavinimą
              </button>
            </AdminSection>
          ) : null}

          {tab === "contact" ? (
            <AdminSection title="Kontaktų sekcijos tekstai">
              <AdminField
                label="Pavadinimas"
                value={dict.contact.title}
                onChange={(title) =>
                  updateLocale((current) => ({
                    ...current,
                    contact: { ...current.contact, title },
                  }))
                }
              />
              <AdminField
                label="Subtitras"
                value={dict.contact.subtitle}
                onChange={(subtitle) =>
                  updateLocale((current) => ({
                    ...current,
                    contact: { ...current.contact, subtitle },
                  }))
                }
              />
              <AdminField
                label="Laukas: vardas"
                value={dict.contact.fields.name}
                onChange={(name) =>
                  updateLocale((current) => ({
                    ...current,
                    contact: {
                      ...current.contact,
                      fields: { ...current.contact.fields, name },
                    },
                  }))
                }
              />
              <AdminField
                label="Laukas: el. paštas"
                value={dict.contact.fields.email}
                onChange={(email) =>
                  updateLocale((current) => ({
                    ...current,
                    contact: {
                      ...current.contact,
                      fields: { ...current.contact.fields, email },
                    },
                  }))
                }
              />
              <AdminField
                label="Laukas: žinutė"
                value={dict.contact.fields.message}
                onChange={(message) =>
                  updateLocale((current) => ({
                    ...current,
                    contact: {
                      ...current.contact,
                      fields: { ...current.contact.fields, message },
                    },
                  }))
                }
              />
              <AdminField
                label="Žinutės placeholder"
                value={dict.contact.messagePlaceholder}
                onChange={(messagePlaceholder) =>
                  updateLocale((current) => ({
                    ...current,
                    contact: { ...current.contact, messagePlaceholder },
                  }))
                }
              />
              <AdminField
                label="Siųsti mygtukas"
                value={dict.contact.submit}
                onChange={(submit) =>
                  updateLocale((current) => ({
                    ...current,
                    contact: { ...current.contact, submit },
                  }))
                }
              />
              <AdminField
                label="Tiesioginiai kontaktai (antraštė)"
                value={dict.contact.directTitle}
                onChange={(directTitle) =>
                  updateLocale((current) => ({
                    ...current,
                    contact: { ...current.contact, directTitle },
                  }))
                }
              />
              <AdminField
                label="Tiesioginiai kontaktai (tekstas)"
                value={dict.contact.directText}
                multiline
                onChange={(directText) =>
                  updateLocale((current) => ({
                    ...current,
                    contact: { ...current.contact, directText },
                  }))
                }
              />
            </AdminSection>
          ) : null}

          {tab === "nav" ? (
            <AdminSection title="Navigacija ir footer">
              <AdminField
                label="Nav: paslaugos"
                value={dict.nav.services}
                onChange={(services) =>
                  updateLocale((current) => ({
                    ...current,
                    nav: { ...current.nav, services },
                  }))
                }
              />
              <AdminField
                label="Nav: darbai"
                value={dict.nav.work}
                onChange={(work) =>
                  updateLocale((current) => ({
                    ...current,
                    nav: { ...current.nav, work },
                  }))
                }
              />
              <AdminField
                label="Nav: apie"
                value={dict.nav.about}
                onChange={(about) =>
                  updateLocale((current) => ({
                    ...current,
                    nav: { ...current.nav, about },
                  }))
                }
              />
              <AdminField
                label="Nav: kontaktai"
                value={dict.nav.contact}
                onChange={(contact) =>
                  updateLocale((current) => ({
                    ...current,
                    nav: { ...current.nav, contact },
                  }))
                }
              />
              <AdminField
                label="CTA mygtukas"
                value={dict.nav.contactCta}
                onChange={(contactCta) =>
                  updateLocale((current) => ({
                    ...current,
                    nav: { ...current.nav, contactCta },
                  }))
                }
              />
              <AdminField
                label="Footer copyright"
                value={dict.footer.copyright}
                onChange={(copyright) =>
                  updateLocale((current) => ({
                    ...current,
                    footer: { ...current.footer, copyright },
                  }))
                }
              />
              <AdminField
                label="Į viršų"
                value={dict.footer.backToTop}
                onChange={(backToTop) =>
                  updateLocale((current) => ({
                    ...current,
                    footer: { ...current.footer, backToTop },
                  }))
                }
              />
            </AdminSection>
          ) : null}
        </div>
      </div>
    </div>
  );
}
