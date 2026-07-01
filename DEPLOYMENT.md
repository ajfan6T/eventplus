# Deploying Eventplus (Vercel + Turso)

This is the runbook for a **private beta** deployment: hosted on Vercel, database on
Turso (hosted libSQL — same adapter we use in dev, so no code changes). Payments and
email are stubbed; vendors self-onboard and an admin approves them.

You'll need free accounts on **Vercel** and **Turso**. The GitHub repo is already connected.

---

## 1. Database — Turso

Install the CLI and sign in:

```bash
# macOS
brew install tursodatabase/tap/turso
turso auth login
```

Create the database and grab its credentials:

```bash
turso db create eventplus
turso db show eventplus --url           # → DATABASE_URL  (libsql://eventplus-<org>.turso.io)
turso db tokens create eventplus        # → DATABASE_AUTH_TOKEN
```

**Apply the schema** (pipes the committed Prisma migrations into Turso, in order):

```bash
cat prisma/migrations/*/migration.sql | turso db shell eventplus
```

**Seed structural data** (event categories only — no demo vendors/accounts). Run locally
with the Turso creds pointed in:

```bash
DATABASE_URL="libsql://eventplus-<org>.turso.io" \
DATABASE_AUTH_TOKEN="<token>" \
npm run db:seed:prod
```

**Create your admin account** (sign-up only makes `family` users, so bootstrap the admin):

```bash
DATABASE_URL="libsql://…" DATABASE_AUTH_TOKEN="<token>" \
npm run make-admin -- you@youremail.com "a-strong-password"
```

---

## 2. Hosting — Vercel

1. **Import** the GitHub repo at [vercel.com/new](https://vercel.com/new). Framework preset
   auto-detects **Next.js**. Leave build/install commands at their defaults (`postinstall`
   runs `prisma generate`).
2. **Environment variables** (Project → Settings → Environment Variables):

   | Key | Value |
   | --- | --- |
   | `DATABASE_URL` | `libsql://eventplus-<org>.turso.io` |
   | `DATABASE_AUTH_TOKEN` | the token from `turso db tokens create` |
   | `AUTH_SECRET` | a fresh secret — `node -e "console.log(require('crypto').randomBytes(33).toString('base64'))"` |
   | `AUTH_URL` | `https://<your-app>.vercel.app` (set after the first deploy) |

   Optional (leave unset to keep them stubbed): `RESEND_API_KEY`, `RESEND_FROM`,
   `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`.
3. **Deploy.** Every push to `main` redeploys automatically.
4. After the first deploy, set `AUTH_URL` to the real URL and redeploy.

> Migrations are applied **once from your machine** (step 1) — the Vercel build does not run
> them. When you change the schema later: create a migration locally (`npm run db:migrate`),
> then `cat` the new migration file into `turso db shell` before deploying.

---

## 3. First run

1. Visit your URL → sign in as the **admin** you created → you land on the app.
2. Vendors sign up at `/signup?role=vendor`, then create a listing at `/vendor-onboarding`.
3. Approve listings at **`/admin`** — approved listings appear in the public marketplace.
4. Invite your beta families to sign up and plan events.

---

## Notes

- **No demo data in production.** The prod seed loads only event categories. There are no
  demo vendors and **no `password123` demo accounts** — those exist only in the local dev seed.
- **Payments** use the mock checkout (no gateway). **Email** logs to the server console until
  you add `RESEND_API_KEY` + a verified `RESEND_FROM` sender.
- **Google sign-in** appears only when `AUTH_GOOGLE_ID`/`AUTH_GOOGLE_SECRET` are set (add
  `https://<your-app>.vercel.app/api/auth/callback/google` as an authorized redirect URI).
- **Scaling later:** the schema is Postgres-ready. To move off Turso, switch the Prisma
  `datasource` provider to `postgresql` and swap the driver adapter in `src/lib/db.ts`.
