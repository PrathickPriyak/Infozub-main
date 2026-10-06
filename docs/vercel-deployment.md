# Vercel deployment — Infozub

GitHub → Vercel for the Next.js 16 App Router marketing site.

Do not deploy to production until `npm run build` succeeds on the commit you intend to ship. This document does not record a live Vercel deploy.

---

## Production environment variable checklist

Set these in **Vercel → Project → Settings → Environment Variables** before the first production build. `NEXT_PUBLIC_*` values are inlined at **build** time — changing them requires a **redeploy**.

Never put secrets in the repo, `vercel.json`, or this file. Copy names from `.env.example` only.

| Name | Required | Environments | Public? | Value / notes |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Production, Preview, Development | Yes (`NEXT_PUBLIC_`) | `https://infozub.com` (no trailing slash). Used for canonical URLs, Open Graph, sitemap, JSON-LD, and contact origin checks. |
| `CONTACT_FORM_WEBHOOK_URL` | Recommended for production | Production (optional Preview) | **No** — server only | HTTPS URL of the CRM/email webhook. Leave empty to accept submissions without delivery. Private IPs and URLs with credentials are rejected. |
| `CONTACT_FORM_WEBHOOK_TOKEN` | Optional | Same as webhook URL | **No** — server only | Bearer token sent to the webhook. Omit if the endpoint does not need auth. |

Do **not** add unused tracking IDs (`NEXT_PUBLIC_GTM_ID`, Facebook pixel, Typebot, Turnstile) until those features exist.

Vercel also injects (do not set these as secrets in git):

| Name | Purpose |
| --- | --- |
| `NODE_ENV` | `production` on Vercel builds and serverless |
| `VERCEL_ENV` | `production` / `preview` / `development` |
| `VERCEL_URL` | This deployment host (used so Preview contact POSTs are allowed) |
| `VERCEL_PROJECT_PRODUCTION_URL` | Production hostname |

### Checklist before first production deploy

- [ ] `NEXT_PUBLIC_SITE_URL=https://infozub.com` on **Production**
- [ ] Same origin on **Preview** (keeps canonicals on the real domain so preview URLs are not indexed as canonical)
- [ ] `CONTACT_FORM_WEBHOOK_URL` set on **Production** if contact messages must be delivered
- [ ] `CONTACT_FORM_WEBHOOK_TOKEN` set only if the webhook requires it
- [ ] No `NEXT_PUBLIC_` prefix on webhook URL or token
- [ ] Values contain no trailing slash on `NEXT_PUBLIC_SITE_URL`
- [ ] Redeploy after any env change

---

## Vercel configuration

Connect the GitHub repository. Next.js is auto-detected — **do not** add a custom output directory.

Recommended project settings:

| Setting | Value |
| --- | --- |
| Framework Preset | Next.js |
| Root Directory | `.` (repository root) |
| Build Command | `npm run build` |
| Output Directory | *(leave empty — Next.js)* |
| Install Command | `npm install` |
| Node.js Version | **20.x** (see `package.json` `engines` and `.nvmrc`) |
| Production Branch | `main` |
| Preview | Enabled for pull requests |

Redirects, security headers, and trailing-slash rules live in `next.config.ts`, not `vercel.json`.

Custom domain:

1. Vercel → Project → Settings → Domains
2. Add `infozub.com` and `www.infozub.com`
3. Point DNS as Vercel instructs (A/CNAME or nameservers)
4. Prefer apex `infozub.com` as the primary domain; redirect `www` → apex (or the reverse — pick one and keep `NEXT_PUBLIC_SITE_URL` in sync)

---

## Build command

Local / CI (must pass before you treat a commit as shippable):

```bash
npm ci
npm run lint
npm run typecheck
NEXT_PUBLIC_SITE_URL=https://infozub.com npm run build
```

On Vercel the dashboard **Build Command** is:

```bash
npm run build
```

That runs `next build`. Use **`npx convex dev` is not applicable** — this app has no Convex backend. Do not run `npx convex deploy`.

---

## Deployment command

**Recommended: GitHub integration (no CLI secrets in the repo)**

1. Import `Infozub-main` in the Vercel dashboard and grant GitHub access.
2. Set environment variables (checklist above).
3. Production: merge to `main` (or push to the Production Branch). Vercel builds and assigns the production domain.
4. Preview: every pull request gets a unique `*.vercel.app` URL.

**Optional CLI** (local machine after `npx vercel login` and `npx vercel link` — not for day-to-day development):

```bash
# Preview deployment
npx vercel

# Production — only after preview and `npm run build` are verified
npx vercel --prod
```

Do not commit `.vercel/` (`/.vercel` is gitignored). Do not store a Vercel token in the repository.

---

## Post-deployment checklist

Run these against the **production hostname** (`https://infozub.com`) after the first successful Vercel build, and against the PR preview URL before merge.

### Build and quality

- [ ] Vercel build log shows `Compiled successfully` and route table
- [ ] No TypeScript or ESLint errors in the build
- [ ] Node 20.x used in the build log

### Environment

- [ ] View source / metadata: canonical and `og:url` use `https://infozub.com`
- [ ] `https://infozub.com/sitemap.xml` URLs use that origin
- [ ] Contact submit from the production origin returns success (webhook or local accept)

### Routes (200)

- [ ] `/` `/about` `/digital-suite` `/digital-suite/coimbatore` `/digital-suite/tirupur`
- [ ] `/academy` `/services` `/web` `/projects` `/blog` `/ventures` `/clients` `/reviews`
- [ ] `/careers` `/careers/apply` `/contact`
- [ ] `/payments` `/terms` `/privacy-policy` `/copyrights` `/thanks`
- [ ] `/infozub-landing-page` `/infozub-digital-marketing`
- [ ] `/services/google-ads` `/services/website-development` `/services/influencer-marketing`
- [ ] `/services/social-media-marketing` `/services/search-engine-optimization` `/services/email-marketing`
- [ ] `/projects/suzuki-motorcycle-tamilnadu` `/projects/bharath-electronics-and-appliances`

Internal-only (must be 200 but **noindex**):

- [ ] `/design-system` `/nav-preview`

Empty collections (expected):

- [ ] `/blog` empty state (0 posts at audit)
- [ ] `/careers` empty openings + resume CTA
- [ ] `/careers/[slug]` 404 until a real opening is added

### Redirects

- [ ] `/courses` → `/academy` (308/301)
- [ ] `/thank-you` → `/thanks`
- [ ] `/privacy` → `/privacy-policy`
- [ ] `/terms-and-conditions` → `/terms`
- [ ] `/category/uncategorized` → `/blog` (307/302)

### Images

- [ ] `/favicon.ico`
- [ ] `/og/default.png` (1200×630)
- [ ] `/projects/suzuki-motorcycle.webp` and `-thumb.webp`
- [ ] `/projects/bharath-electronics.webp` and `-thumb.webp`
- [ ] Project cards on `/projects` render via `next/image`

### Forms

- [ ] `/contact` native form posts to `/api/contact` (same origin)
- [ ] `/careers/apply` job iframe loads `https://forms.infozub.com/forms/job-application-pb91hk`
- [ ] Maps on `/contact` load Google Maps embeds
- [ ] `GET /api/contact` returns 405
- [ ] Cross-origin POST to `/api/contact` returns 403

### External links

- [ ] Academy CTAs open `https://academy.infozub.com` in a new tab (`noopener noreferrer`)
- [ ] Footer social: Facebook, X, LinkedIn, Instagram, YouTube
- [ ] Payments “Pay Now” → `https://rzp.io/l/infozub`

### Metadata / sitemap / robots

- [ ] Homepage title matches Yoast: `INFOZUB - Premier Digital Marketing Agency`
- [ ] `rel=canonical` present; JSON-LD `Organization` + `WebSite` in the homepage HTML
- [ ] `https://infozub.com/robots.txt` allows `/`, disallows `/api/`, `/design-system`, `/nav-preview`, and points at the sitemap
- [ ] `https://infozub.com/sitemap.xml` lists the static marketing URLs and service/project pages (no `/design-system`)
- [ ] Submit sitemap in Google Search Console and Bing Webmaster Tools
- [ ] Security headers present (`Content-Security-Policy`, `X-Frame-Options: DENY`, `nosniff`)

### Cutover

- [ ] DNS for `infozub.com` points at Vercel
- [ ] HTTPS certificate issued
- [ ] WordPress frontend decommissioned only after 24–48h of clean logs
- [ ] Watch 404s for missed legacy slugs (`docs/seo-migration.md`)
