import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: string;
};

export function AdminField({
  label,
  value,
  onChange,
  multiline = false,
  type = "text",
}: FieldProps) {
  const className =
    "w-full rounded-xl border border-border bg-background/70 px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-accent/50 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]";

  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
        {label}
      </span>
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${className} resize-y`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
      )}
    </label>
  );
}

export function AdminSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="glass rounded-2xl border border-border p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted">{description}</p>
        ) : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function LocaleTabs({
  locale,
  onChange,
}: {
  locale: "lt" | "en";
  onChange: (locale: "lt" | "en") => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-border bg-background/50 p-0.5">
      {(["lt", "en"] as const).map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
            locale === value
              ? "bg-accent/20 text-accent"
              : "text-muted hover:text-foreground"
          }`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
