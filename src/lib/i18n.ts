export type Locale = "lt" | "en";

export type Dictionary = {
  nav: {
    services: string;
    work: string;
    about: string;
    contact: string;
    contactCta: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    h2: string;
    cta: string;
  };
  services: {
    title: string;
    items: { title: string; description: string }[];
  };
  portfolio: {
    title: string;
    subtitle: string;
    progressLabel: string;
    projects: {
      name: string;
      summary: string;
      progress: number;
    }[];
  };
  about: {
    title: string;
    text: string;
    stackLabel: string;
    educationTitle: string;
    education: {
      school: string;
      degree: string;
      period: string;
      description: string;
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
      email: string;
      message: string;
    };
    messagePlaceholder: string;
    submit: string;
    submitted: string;
    directTitle: string;
    directText: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    linkedInLabel: string;
    githubLabel: string;
    telegramLabel: string;
    profileLabel: string;
    mailSubject: string;
    mailBodyName: string;
    mailBodyEmail: string;
  };
  footer: {
    copyright: string;
    backToTop: string;
  };
};

export type SiteSettings = {
  brandName: string;
  email: string;
  emailLabel: string;
  phone: string;
  phoneLabel: string;
  location: string;
  linkedInUrl: string;
  githubUrl: string;
  telegramUrl: string;
};

export type SiteContent = {
  settings: SiteSettings;
  locales: Record<Locale, Dictionary>;
};

export const navHrefs = {
  services: "#paslaugos",
  work: "#darbai",
  about: "#apie",
  contact: "#kontaktai",
} as const;

export const defaultContent: SiteContent = {
  settings: {
    brandName: "DN Apps & Automation",
    email: "hello@example.com",
    emailLabel: "hello@example.com",
    phone: "",
    phoneLabel: "",
    location: "",
    linkedInUrl: "https://www.linkedin.com/",
    githubUrl: "",
    telegramUrl: "",
  },
  locales: {
    lt: {
      nav: {
        services: "Paslaugos",
        work: "Darbai",
        about: "Apie",
        contact: "Kontaktai",
        contactCta: "Susisiekti",
        openMenu: "Atidaryti meniu",
        closeMenu: "Uždaryti meniu",
      },
      hero: {
        eyebrow: "DN Apps & Automation",
        h1: "Automatizuoju procesus ir kuriu įrankius, kurie taupo jūsų verslo laiką.",
        h2: "Nuo duomenų išgavimo (web scraping) ir automatizacijos botų iki pilnų internetinių platformų ir mobiliųjų aplikacijų.",
        cta: "Aptarti jūsų projektą",
      },
      services: {
        title: "Paslaugos",
        items: [
          {
            title: "Procesų automatizacija",
            description:
              "Paversiu jūsų valandų valandas trunkantį rankinį darbą į automatizuotus procesus.",
          },
          {
            title: "Duomenų išgavimas (Web Scraping)",
            description:
              "Surinksiu reikalingus duomenis iš bet kokių sistemų, failų ar interneto svetainių greitiems sprendimams priimti.",
          },
          {
            title: "Programėlių ir botų kūrimas",
            description:
              "Kuriu specializuotus botus ir programėles, palengvinančias komandos darbą, vidinius procesus bei komunikaciją.",
          },
          {
            title: "Interneto svetainės ir platformos",
            description:
              "Suteiksiu jūsų verslui modernų ir greitą skaitmeninį veidą – nuo paprastų svetainių iki sudėtingų užsakymų platformų.",
          },
        ],
      },
      portfolio: {
        title: "Atliekami darbai",
        subtitle: "Trumpai — ką kuriu dabar ir kiek toli pažengę projektai.",
        progressLabel: "Progresas",
        projects: [
          {
            name: "Užsakymų valdymo ir sąskaitų generavimo aplikacija",
            summary:
              "Mobili aplikacija užsakymams vietoje ir automatiniam sąskaitų perdavimui į buhalteriją — be rankinio perkėlinėjimo.",
            progress: 90,
          },
          {
            name: "Logistikos duomenų išgavimo (Scraping) Botas",
            summary:
              "Botas, kuris pagal konteinerių numerius automatiškai surenka automobilių duomenis iš nurodytų sistemų.",
            progress: 95,
          },
          {
            name: "Specializuotos B2B ir C2C platformos",
            summary:
              "Autovežių užsakymų valdymo sistema ir automobilių dalių e-prekybos platforma specifinėms verslo nišoms.",
            progress: 60,
          },
        ],
      },
      about: {
        title: "Apie mane",
        text: "Esu programuotojas, kurio aistra – spręsti realias verslo problemas pasitelkiant kodą. Kuriu modernius ir greitus sprendimus naudodamas JavaScript, React, Node.js bei Django technologijas. Šis įrankių rinkinys man leidžia užtikrinti tiek sklandžią vartotojo patirtį, tiek galingą foninę (backend) logiką. Nesvarbu, ar jums reikia paprasto boto, automatizuoto duomenų išgavimo skripto, ar nuo nulio sukurtos užsakymų platformos – esu pasiruošęs padėti optimizuoti jūsų veiklą ir sutaupyti jūsų laiką.",
        stackLabel: "Technologijos",
        educationTitle: "Išsilavinimas",
        education: [],
      },
      contact: {
        title: "Kontaktai",
        subtitle: "Papasakokite apie savo projektą — atsakysiu greitai.",
        fields: {
          name: "Vardas",
          email: "El. paštas",
          message: "Trumpas projekto aprašymas",
        },
        messagePlaceholder: "Trumpai apie poreikį, terminus ir tikslą...",
        submit: "Siųsti žinutę",
        submitted: "Atidaromas el. pašto klientas…",
        directTitle: "Tiesioginiai kontaktai",
        directText: "Rašykite el. paštu, skambinkite arba susisiekite per socialinius kanalus.",
        emailLabel: "El. paštas",
        phoneLabel: "Telefonas",
        locationLabel: "Vieta",
        linkedInLabel: "LinkedIn",
        githubLabel: "GitHub",
        telegramLabel: "Telegram",
        profileLabel: "Profilis",
        mailSubject: "Projekto užklausa",
        mailBodyName: "Vardas",
        mailBodyEmail: "El. paštas",
      },
      footer: {
        copyright: `© ${new Date().getFullYear()} DN Apps & Automation. Visos teisės saugomos.`,
        backToTop: "Į viršų",
      },
    },
    en: {
      nav: {
        services: "Services",
        work: "Work",
        about: "About",
        contact: "Contact",
        contactCta: "Get in touch",
        openMenu: "Open menu",
        closeMenu: "Close menu",
      },
      hero: {
        eyebrow: "DN Apps & Automation",
        h1: "I automate processes and build tools that save your business time.",
        h2: "From data extraction (web scraping) and automation bots to full web platforms and mobile applications.",
        cta: "Discuss your project",
      },
      services: {
        title: "Services",
        items: [
          {
            title: "Process automation",
            description:
              "I turn hours of manual work into automated processes.",
          },
          {
            title: "Data extraction (Web Scraping)",
            description:
              "I collect the data you need from systems, files, or websites so you can make decisions faster.",
          },
          {
            title: "Apps and bot development",
            description:
              "I build specialized bots and apps that make teamwork, internal processes, and communication easier.",
          },
          {
            title: "Websites and platforms",
            description:
              "I give your business a modern, fast digital presence — from simple sites to complex order platforms.",
          },
        ],
      },
      portfolio: {
        title: "Work in progress",
        subtitle:
          "A quick look at what I’m building now and how far each project has come.",
        progressLabel: "Progress",
        projects: [
          {
            name: "Order management & invoice generation app",
            summary:
              "A mobile app for on-site orders with automatic invoice delivery to accounting — no double data entry.",
            progress: 90,
          },
          {
            name: "Logistics data extraction (scraping) bot",
            summary:
              "A bot that takes container numbers and automatically pulls vehicle data from the connected systems.",
            progress: 95,
          },
          {
            name: "Specialized B2B and C2C platforms",
            summary:
              "A car-carrier order management system and an auto-parts marketplace tailored to niche business needs.",
            progress: 60,
          },
        ],
      },
      about: {
        title: "About me",
        text: "I’m a developer passionate about solving real business problems with code. I build modern, fast solutions using JavaScript, React, Node.js, and Django. This stack lets me deliver both a smooth user experience and powerful backend logic. Whether you need a simple bot, an automated data extraction script, or an order platform built from scratch — I’m ready to help optimize your operations and save you time.",
        stackLabel: "Tech stack",
        educationTitle: "Education",
        education: [],
      },
      contact: {
        title: "Contact",
        subtitle: "Tell me about your project — I’ll get back to you quickly.",
        fields: {
          name: "Name",
          email: "Email",
          message: "Short project description",
        },
        messagePlaceholder: "Briefly share the need, timeline, and goal...",
        submit: "Send message",
        submitted: "Opening your email client…",
        directTitle: "Direct contacts",
        directText: "Email me, call me, or reach out through social channels.",
        emailLabel: "Email",
        phoneLabel: "Phone",
        locationLabel: "Location",
        linkedInLabel: "LinkedIn",
        githubLabel: "GitHub",
        telegramLabel: "Telegram",
        profileLabel: "Profile",
        mailSubject: "Project inquiry",
        mailBodyName: "Name",
        mailBodyEmail: "Email",
      },
      footer: {
        copyright: `© ${new Date().getFullYear()} DN Apps & Automation. All rights reserved.`,
        backToTop: "Back to top",
      },
    },
  },
};
