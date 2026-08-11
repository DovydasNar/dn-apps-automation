type TechLogoProps = {
  className?: string;
};

export function JavaScriptLogo({ className }: TechLogoProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#F7DF1E" d="M0 0h48v48H0z" />
      <path d="M25.6 34.8c.7 1.2 1.6 2.1 3.3 2.1 1.4 0 2.3-.7 2.3-1.7 0-1.2-.9-1.6-2.5-2.3l-.9-.4c-2.5-1.1-4.1-2.4-4.1-5.2 0-2.6 2-4.6 5.1-4.6 2.2 0 3.8.8 4.9 2.8l-2.7 1.7c-.6-1-1.2-1.4-2.2-1.4-1 0-1.6.6-1.6 1.4 0 1 .6 1.4 2.1 2.1l.9.4c2.9 1.2 4.5 2.6 4.5 5.5 0 3.1-2.4 4.8-5.7 4.8-3.2 0-5.3-1.5-6.3-3.5l2.9-1.7zm-10.2.2c.5.9 1 1.6 2.1 1.6 1.1 0 1.7-.4 1.7-2.1V22.4h3.4v12.2c0 3.5-2.1 5.1-5.1 5.1-2.7 0-4.3-1.4-5.1-3.1l3-1.6z" />
    </svg>
  );
}

export function ReactLogo({ className }: TechLogoProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="4.2" fill="#61DAFB" />
      <g fill="none" stroke="#61DAFB" strokeWidth="2.2">
        <ellipse cx="24" cy="24" rx="20" ry="8" />
        <ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)" />
      </g>
    </svg>
  );
}

export function NodeLogo({ className }: TechLogoProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#539E43"
        d="M24 3.5 41 13.4v21.2L24 44.5 7 34.6V13.4L24 3.5z"
      />
      <path
        fill="#fff"
        d="M24.1 14.2c-4.7 0-7.7 2.5-7.7 5.8 0 3.9 2.9 5.1 7.4 6.1 3.2.7 3.9 1.3 3.9 2.4 0 1.2-1 1.9-3 1.9-2.1 0-3.5-.7-4.5-2.5l-3.1 1.9c1.4 2.8 3.9 4.1 7.7 4.1 4.8 0 8-2.5 8-6.2 0-4-2.7-5.3-7.5-6.3-3.4-.7-4-1.2-4-2.3 0-1 .9-1.7 2.8-1.7 1.9 0 3.1.7 3.8 2.3l3.1-1.7c-1.3-2.7-3.8-3.8-7-3.8z"
      />
    </svg>
  );
}

export function DjangoLogo({ className }: TechLogoProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="8" fill="#092E20" />
      <path
        fill="#fff"
        d="M20.2 10.5h4.2v21.2c0 5.4-3.2 7.9-8.8 7.9-1.7 0-3.5-.3-4.7-.8v-4c1 .4 2.2.6 3.5.6 2.8 0 4.2-1.2 4.2-3.9V10.5h1.6zm9.2 15.8c1.6 0 2.4.2 2.4.2v4c-.7.2-2 .4-3.5.4-4.5 0-6.6-2.2-6.6-7.2V17h-2.4v-3.8h2.4v-4.5h4.2v4.5h4.8V17h-4.8v6.2c0 2.2.8 3.1 3.5 3.1z"
      />
    </svg>
  );
}

export const techStack = [
  { name: "JavaScript", Logo: JavaScriptLogo },
  { name: "React", Logo: ReactLogo },
  { name: "Node.js", Logo: NodeLogo },
  { name: "Django", Logo: DjangoLogo },
] as const;
