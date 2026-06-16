# Eventplus

**Plan unforgettable celebrations in Kerala.**

Eventplus is a two-sided marketplace connecting Kerala families with verified event vendors,
plus a founder-led corporate-events lane for the state's IT parks. Families plan weddings,
housewarmings, birthdays, baby showers and inaugurations through an AI-powered workflow —
smart checklists, live budget tracking, curated vendor recommendations and one-place booking.
Vendors get a CRM-style dashboard with leads, calendar and earnings.

This repository is **Phase One: the frontend** — a complete, production-quality UI built with
realistic mock data. The backend (auth, database, payments, real lead routing) lands in Phase Two.

---

## ✨ Highlights

**For families**
- AI planning wizard (`/plan`) — a guided intake that produces a tailored plan
- Planning dashboard (`/dashboard`) — living checklist, live budget tracker, shortlist, bookings
- Vendor discovery (`/vendors`) — search, filter by category/location, sort; deep-linkable
- Rich vendor profiles (`/vendors/[slug]`) — gallery, packages, reviews, booking request
- Occasion pages (`/events/[slug]`) — Kerala-specific guidance for each celebration

**For vendors**
- CRM dashboard (`/vendor`) — lead pipeline with status filters, calendar, earnings chart
- Acquisition page (`/for-vendors`)

**For businesses**
- Corporate lane (`/corporate`) — premium offsites, town halls, launches & annual days for
  Infopark Kochi, Technopark Trivandrum and Cyberpark Kozhikode
- Lead-capture inquiry form that routes to the founder's email (mock submit + `mailto` fallback)

---

## 🧱 Tech stack

| Layer        | Choice                                                        |
| ------------ | ------------------------------------------------------------- |
| Framework    | **Next.js 16** (App Router, Turbopack, React 19)              |
| Language     | **TypeScript**                                                |
| Styling      | **Tailwind CSS v4** (CSS-first `@theme` tokens)               |
| UI primitives| shadcn-style components on **Radix UI**                       |
| Animation    | **framer-motion**                                             |
| Icons        | **lucide-react** (+ inline SVG for brand/social glyphs)       |
| Fonts        | **Fraunces** (serif display) + **Inter** (sans), via `<link>` |
| Database     | **Prisma 7** + SQLite (dev) → Postgres-ready, libSQL driver adapter |
| Data access  | Server-only query layer (`src/lib/queries.ts`)                |

## 🎨 Design — "Festive Kerala Premium"

A warm, celebratory, premium aesthetic rooted in Kerala:

- **Palette:** kasavu cream `#FAF4E8` · temple maroon `#7B1E3B` · kasavu gold `#C9A227` · deep green `#1F4D3A`
- **Type:** elegant Fraunces headings + clean Inter body
- **Motifs:** mandala watermarks, nilavilakku (lamp) brand mark, kasavu gold-border dividers, gold-foil text
- **Imagery:** fully self-contained `GradientVisual` system (layered brand gradients + motifs) — no external image dependencies, so the app looks polished offline.

All design tokens live in [`src/app/globals.css`](src/app/globals.css).

## 🚀 Getting started

```bash
npm install                 # also runs `prisma generate` (postinstall)
cp .env.example .env        # set DATABASE_URL (SQLite by default)
npm run db:deploy           # apply migrations → creates dev.db
npm run db:seed             # load the catalog + demo data
npm run dev
```

Open the printed local URL (default [http://localhost:3000](http://localhost:3000)).

```bash
npm run build      # production build (Turbopack); SSG queries the DB
npm start          # serve the production build
npx tsc --noEmit   # type-check

npm run db:seed    # re-seed from the mock data in src/lib/data
npm run db:reset   # drop, re-migrate and re-seed
npm run db:studio  # open Prisma Studio
```

## 🗂️ Project structure

```
src/
├── app/
│   ├── layout.tsx              # root: fonts (<link>), metadata
│   ├── globals.css             # design system (Tailwind v4 @theme + motifs)
│   ├── (marketing)/            # public site — shared header + footer
│   │   ├── page.tsx            # home
│   │   ├── how-it-works/
│   │   ├── vendors/            # browse + [slug] detail
│   │   ├── events/             # index + [slug] occasion pages
│   │   ├── corporate/          # corporate lane + inquiry form
│   │   ├── for-vendors/
│   │   └── about/
│   ├── (auth)/                 # login + signup (split-screen shell)
│   ├── plan/                   # AI planning wizard (focused layout)
│   ├── dashboard/              # family planning dashboard (app shell)
│   └── vendor/                 # vendor CRM dashboard (app shell)
├── components/
│   ├── ui/                     # primitives (Button, Card, Dialog, Tabs, …)
│   ├── layout/                 # SiteHeader, SiteFooter
│   ├── motion/                 # scroll-reveal wrappers
│   ├── decor/                  # mandala, diya, kasavu motifs
│   ├── visual/                 # GradientVisual "photo" system
│   ├── brand/                  # Logo
│   └── …                       # vendors, categories, dashboard, vendor, plan, corporate, auth
└── lib/
    ├── types.ts                # domain types
    ├── utils.ts                # cn(), formatINR(), slugify()
    ├── db.ts                   # Prisma client singleton (libSQL adapter)
    ├── queries.ts              # server-only data-access layer → domain types
    └── data/                   # static config + seed source (vendors, categories, …)
prisma/
├── schema.prisma              # catalog + planning + CRM models
├── migrations/                # committed migration history
└── seed.ts                    # migrates src/lib/data into the database
```

## 📍 Scope notes

- **Database-backed (Phase Two, Round 1).** Vendors, categories, reviews, testimonials and the
  demo planning event / vendor CRM data now live in the database; pages read them through the
  query layer. `src/lib/data` remains the **seed source** and holds static config (locations,
  labels, copy, planner option lists).
- **Auth is mocked.** Login/signup route to the relevant dashboard without real authentication
  (Auth.js + roles is the next round).
- **Corporate inquiries** show a success state and build a `mailto:` to the founder address
  (`src/lib/data/site.ts → site.founderEmail`); real routing comes with the backend.
- **Kerala first** — content and vendors target Kochi, Trivandrum, Kozhikode, Thrissur and beyond.

## 🛣️ Phase Two roadmap

- ✅ **Round 1 — Database foundation:** Prisma schema, migrations, seed from mock data, and a
  server-side query layer; catalog + dashboard reads now hit the DB.
- ⏭️ **Round 2 — Auth & roles:** Auth.js (email/password + Google), `family` / `vendor` / `admin`
  roles, protected dashboards scoped to the signed-in user.
- ⏭️ Live booking & lead flows persisted (booking requests → vendor leads; corporate inquiries).
- ⏭️ Email routing (Resend) and payments (Razorpay, INR).
- ⏭️ Search/recommendations powered by the AI planner intake.

---

_Crafted in Kerala with care._
