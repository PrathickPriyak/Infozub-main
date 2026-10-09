# Infozub

Production marketing website for **Infozub Private Limited** — Next.js App Router, TypeScript, Tailwind CSS.

Clone this repository (default branch **`main`** after this work is merged), install dependencies, and the full application runs locally. Source, content modules, and static assets under `public/` are all tracked in git.

## Requirements

- **Node.js 22.x** (see `.nvmrc`)
- npm 10+ (ships with Node 22)

```bash
node -v   # v22.x
npm -v
```

## Quick start

```bash
git clone https://github.com/PrathickPriyak/Infozub-main.git
cd Infozub-main

npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run check` | lint + typecheck + build |

Contact form delivery is optional in development. Leave webhook env vars empty unless you need outbound delivery.

## Environment

Copy `.env.example` → `.env.local`. Do **not** commit `.env.local` or real secrets.

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site origin (no trailing slash). Defaults to `https://infozub.com` if unset. |
| `CONTACT_FORM_WEBHOOK_URL` | Optional* | HTTPS webhook for enquiry submissions (server-only). Use the Google Apps Script URL from `docs/enquiry-excel-setup.md` to store rows in a sheet (download as Excel). |
| `CONTACT_FORM_WEBHOOK_TOKEN` | Optional | Bearer token for the webhook (server-only). |

\*Required in production if you need enquiries saved to a spreadsheet/CRM. Without it, the form still validates and shows success only after the API accepts — but nothing is stored.

Never prefix webhook values with `NEXT_PUBLIC_`.

Production deploy notes: [`docs/vercel-deployment.md`](docs/vercel-deployment.md).

## Repository layout

```text
.
├── app/                 # Next.js App Router pages & API routes
├── components/          # UI (layout, marketing, forms, chatbot, primitives)
├── content/             # Typed site copy & data (source of truth)
├── docs/                # Audits, architecture, deploy, QA
├── hooks/               # Shared React hooks
├── lib/                 # SEO, contact, security, utilities
├── public/              # Static images & brand assets (committed)
├── .env.example         # Env template (safe to commit)
├── next.config.ts
├── package.json
└── tsconfig.json
```

What is **not** in git (and should not be): `node_modules/`, `.next/`, `.env*`, `.vercel/`.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Lucide · Radix UI primitives

## Docs

| Doc | Contents |
| --- | --- |
| [`docs/architecture.md`](docs/architecture.md) | System design |
| [`docs/design-system.md`](docs/design-system.md) | Visual system |
| [`docs/website-audit.md`](docs/website-audit.md) | Live-site audit |
| [`docs/content-inventory.md`](docs/content-inventory.md) | Content inventory |
| [`docs/seo-migration.md`](docs/seo-migration.md) | SEO / URL migration |
| [`docs/vercel-deployment.md`](docs/vercel-deployment.md) | Vercel production deploy |
| [`docs/final-qa-report.md`](docs/final-qa-report.md) | QA checklist |

Living style guide when running locally: [/design-system](http://localhost:3000/design-system)

## License

Proprietary — Infozub Private Limited. All rights reserved.
