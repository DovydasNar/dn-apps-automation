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
      category: string;
      name: string;
      summary: string;
      impact: string;
      tags: string[];
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
        title: "Atlikti darbai",
        subtitle:
          "Realūs technologiniai sprendimai, sprendžiantys verslo iššūkius.",
        progressLabel: "Progresas",
        projects: [
          {
            category: "Mobilioji Aplikacija",
            name: "Užsakymų ir sąskaitų valdymo sistema",
            summary:
              "Mobilus sprendimas darbuotojams, leidžiantis vietoje įvesti užsakymą ir akimirksniu automatiškai sugeneruoti bei išsiųsti sąskaitą buhalterijai.",
            impact: "⚡ 0% popierizmo ir momentinis sąskaitų generavimas",
            tags: ["React Native", "Node.js", "Buhalterinė integracija"],
            progress: 100,
          },
          {
            category: "Web Scraping & Botai",
            name: "Logistikos konteinerių duomenų botas",
            summary:
              "Automatizuotas botas, pagal konteinerių numerius savarankiškai išgaunantis ir sutikrinantis automobilių duomenis iš skirtingų klientų sistemų.",
            impact: "⏱️ Sutaupoma 10+ valandų rutininio darbo kas savaitę",
            tags: ["Python", "Django", "Web Scraping", "Automation"],
            progress: 100,
          },
          {
            category: "Web Platformos",
            name: "B2B ir C2C specializuotos platformos",
            summary:
              "Autovežių užsakymų valdymo sistema bei specializuota autodalių prekybos platforma, valdanti sudėtingą vidinę logiką.",
            impact: "🚀 Pilnas užsakymų ciklų ir duomenų valdymas",
            tags: ["React", "Node.js", "Django", "Tailwind CSS"],
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
        title: "Completed work",
        subtitle:
          "Real technology solutions that solve business challenges.",
        progressLabel: "Progress",
        projects: [
          {
            category: "Mobile Application",
            name: "Order and invoice management system",
            summary:
              "A mobile solution for staff to enter orders on site and instantly generate and send invoices to accounting.",
            impact: "⚡ 0% paperwork and instant invoice generation",
            tags: ["React Native", "Node.js", "Accounting integration"],
            progress: 100,
          },
          {
            category: "Web Scraping & Bots",
            name: "Logistics container data bot",
            summary:
              "An automated bot that independently extracts and cross-checks vehicle data from different client systems by container numbers.",
            impact: "⏱️ Saves 10+ hours of routine work every week",
            tags: ["Python", "Django", "Web Scraping", "Automation"],
            progress: 100,
          },
          {
            category: "Web Platforms",
            name: "Specialized B2B and C2C platforms",
            summary:
              "A car-carrier order management system and a specialized auto-parts marketplace handling complex internal logic.",
            impact: "🚀 Full order-cycle and data management",
            tags: ["React", "Node.js", "Django", "Tailwind CSS"],
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
