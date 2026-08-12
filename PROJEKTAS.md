# DN Apps & Automation — projekto dokumentacija ir deploy

Šis failas aprašo projektą, architektūrą ir **žingsnis po žingsnio**, kaip paleisti lokalų režimą bei deployinti į **Vercel**.

---

## 1. Kas tai per projektas?

**Pavadinimas:** DN Apps & Automation  
**Tipas:** One-page portfolio svetainė (LT + EN) su admin panelė turiniui redaguoti.  
**Stack:**

| Technologija | Paskirtis |
|---|---|
| Next.js 16 (App Router) | Frontend + API routes |
| React 19 | UI |
| Tailwind CSS 4 | Stiliai |
| Framer Motion | Animacijos |
| Upstash Redis | Turinio saugykla production (Vercel) |
| JSON failas (`data/site-content.json`) | Turinio saugykla lokalioje aplinkoje |

**Pagrindiniai URL:**

- Vieša svetainė: `/`
- Admin: `/admin`

---

## 2. Projekto struktūra (svarbiausia)

```text
portfolio-lt/
├── data/
│   └── site-content.json          # lokalus turinys (dev)
├── public/
│   └── logo.png                   # logotipas
├── src/
│   ├── app/
│   │   ├── page.tsx               # pagrindinis one-pager
│   │   ├── admin/page.tsx         # admin UI
│   │   └── api/
│   │       ├── content/           # viešas turinio GET
│   │       └── admin/             # login / logout / save / health
│   ├── components/                # Hero, Services, Portfolio, Contact, Admin...
│   ├── context/LanguageContext.tsx
│   └── lib/
│       ├── i18n.ts                # tipai + default turinys
│       ├── content-store.ts       # file / Redis saugykla
│       └── admin-auth.ts          # slaptažodis + session cookie
├── .env.example                   # env šablonas
├── .env.local                     # lokalūs secret'ai (NEcommittinti)
├── vercel.json
└── PROJEKTAS.md                   # šis failas
```

---

## 3. Kaip veikia turinys ir admin?

1. Vieša svetainė krauna turinį iš `GET /api/content`.
2. Admin prisijungia per `POST /api/admin/login` (slaptažodis).
3. Išsaugojimas eina per `PUT /api/admin/content`.
4. **Lokaliai** turinys rašomas į `data/site-content.json`.
5. **Vercel** turinys rašomas į **Upstash Redis** (nes Vercel failų sistema nėra patikima ilgalaikiam saugojimui).

Be Upstash Redis Vercel’e:
- svetainė vis tiek veiks su default/pradiniu turiniu,
- bet admin pakeitimai **neišsilaikys**.

---

## 4. Aplinkos kintamieji (Environment Variables)

Nukopijuok `.env.example` → `.env.local` ir užpildyk:

| Kintamasis | Privalomas | Aprašymas |
|---|---|---|
| `ADMIN_PASSWORD` | Taip | Admin slaptažodis |
| `ADMIN_SECRET` | Taip | Cookie parašo secret (ilgas random string) |
| `UPSTASH_REDIS_REST_URL` | Taip (Vercel) | Upstash REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Taip (Vercel) | Upstash REST token |
| `RESEND_API_KEY` | Taip (kontaktų formai) | Resend API raktas žinučių siuntimui |
| `CONTACT_FROM_EMAIL` | Ne | Siuntėjo adresas (po domain verify), pvz. `DN Apps <hello@domain.com>` |
| `CONTACT_TO_EMAIL` | Ne | Jei nenurodyta — naudojamas admin `settings.email` |
| `NEXT_PUBLIC_SITE_URL` | Ne | Viešas URL Open Graph nuorodoms |

Lokaliai Redis **nebūtinas** (naudojamas JSON failas).  
Vercel’e Redis **reikalingas**, jei nori redaguoti turinį online.

### Kontaktų forma (be mailto)

Forma siunčia `POST /api/contact` → Resend → tavo el. paštas (admin nustatymuose).

1. Susikurk paskyrą: https://resend.com  
2. Sukurk API key ir įrašyk `RESEND_API_KEY` į `.env.local` / Vercel.  
3. Admin → nustatyk savo realų el. paštą (ne `example.com`).  
4. Production’e patvirtink domeną Resend ir nustatyk `CONTACT_FROM_EMAIL`.  
   Be domain verify Resend leidžia siųsti tik į tavo Resend paskyros el. paštą.

---

## 5. Lokalus paleidimas (dev)

### Reikalavimai
- Node.js 20+ (rekomenduojama)
- npm

### Žingsniai

1. Atidaryk projekto folderį:
   ```bash
   cd portfolio-lt
   ```
2. Įdiek priklausomybes:
   ```bash
   npm install
   ```
3. Sukurk env failą:
   ```bash
   copy .env.example .env.local
   ```
   Windows PowerShell:
   ```powershell
   Copy-Item .env.example .env.local
   ```
4. `.env.local` nustatyk bent:
   ```env
   ADMIN_PASSWORD=dnadmin123
   ADMIN_SECRET=local-dev-secret
   ```
5. Paleisk:
   ```bash
   npm run dev
   ```
6. Atidaryk:
   - Svetainė: http://localhost:3000
   - Admin: http://localhost:3000/admin

### Naudingos komandos

```bash
npm run dev      # development
npm run build    # production build patikra
npm run start    # paleisti build'ą lokalai
npm run lint     # eslint
```

---

## 6. Deploy į Vercel — step by step

### A) Paruošk GitHub repo

1. Sukurk naują GitHub repository (pvz. `portfolio-lt` / `dn-apps-automation`).
2. Projekte paleisk (jei dar nepaduota):
   ```bash
   git add .
   git commit -m "Prepare DN Apps portfolio for Vercel deploy"
   git branch -M main
   git remote add origin https://github.com/<TAVO_USER>/<REPO>.git
   git push -u origin main
   ```
3. Įsitikink, kad `.env.local` **nėra** commit’intas (jis yra `.gitignore`).

### B) Sukurk Upstash Redis (production turiniui)

1. Eik į https://console.upstash.com ir prisijunk.
2. Sukurk naują Redis database (regionas: Europe, jei įmanoma — arčiau Vercel `fra1`).
3. Atidaryk database → **REST API**.
4. Nukopijuok:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### C) Importuok projektą į Vercel

1. Eik į https://vercel.com → **Add New… → Project**.
2. Importuok savo GitHub repo.
3. Framework: **Next.js** (Vercel turėtų atpažinti automatiškai).
4. Root Directory: projekto šaknis (default).
5. **Environment Variables** pridėk:

| Name | Value |
|---|---|
| `ADMIN_PASSWORD` | stiprus slaptažodis |
| `ADMIN_SECRET` | ilgas random secret |
| `UPSTASH_REDIS_REST_URL` | iš Upstash |
| `UPSTASH_REDIS_REST_TOKEN` | iš Upstash |

6. Spausk **Deploy**.

### D) Po deploy patikra

1. Atidaryk savo Vercel URL (pvz. `https://xxxxx.vercel.app`).
2. Patikrink LT/EN perjungimą.
3. Eik į `/admin`, prisijunk su `ADMIN_PASSWORD`.
4. Admin’e turėtų matytis: **„Saugykla: Upstash Redis“**.
5. Pakeisk tekstą → **Išsaugoti** → atidaryk viešą puslapį ir patikrink, ar matosi pakeitimai.
6. (Pasirinktinai) pridėk custom domain Vercel → Project → Settings → Domains.

### E) Vercel CLI variantas (alternatyva)

Jei nori deployinti iš terminalo:

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

Env kintamuosius vis tiek geriau pridėti Vercel Dashboard’e.

---

## 7. Po deploy checklist

- [ ] Viešas puslapis kraunasi
- [ ] LT / EN veikia
- [ ] Logotipas matosi
- [ ] `/admin` prašo slaptažodžio
- [ ] Admin išsaugo turinį be klaidos
- [ ] Po save turinys matomas viešame puslapyje
- [ ] El. paštas ir LinkedIn pakeisti iš placeholder’ių
- [ ] `ADMIN_PASSWORD` pakeistas iš default reikšmės

---

## 8. Dažnos problemos

### Admin sako, kad Redis nerastas
Pridėk `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` Vercel Environment Variables ir **Redeploy**.

### Pakeitimai dingsta po refresh (Vercel)
Reiškia, kad rašoma ne į Redis (arba env nepriskirti Production aplinkai). Patikrink Variables → Environment: Production.

### 401 Unauthorized admin’e
Neteisingas slaptažodis arba baigėsi sesija — prisijunk iš naujo.

### Build failina dėl Node
Naudok Node 20+. Vercel paprastai pasirenka tinkamą versiją automatiškai.

### Logo nerodo
Failas turi būti `public/logo.png`.

---

## 9. Saugumas (trumpai)

- Nelaikyk `ADMIN_PASSWORD` / Redis token’ų GitHub’e.
- Production’e naudok stiprų slaptažodį.
- `/admin` turi `robots: noindex`, bet slaptažodis vis tiek būtinas.
- Jei nori dar stipriau: apribok admin IP, pridėk 2FA per Vercel Protection / Cloudflare Access.

---

## 10. Greitas „zero to production“ santrauka

1. `npm install`
2. Sukonfigūruok `.env.local`
3. `npm run build` (patikrai)
4. Push į GitHub
5. Sukurk Upstash Redis
6. Importuok į Vercel + pridėk env vars
7. Deploy
8. Patikrink `/` ir `/admin`

---

## 11. Kontaktai / placeholder’iai, kuriuos pakeisk pirmiausia

Admin → **Nustatymai**:
- El. paštas
- LinkedIn URL
- Svetainės pavadinimas (jei reikia)

Tai viskas, ko reikia projektui paleisti lokalai ir deployinti online į Vercel.
