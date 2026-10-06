# Infozub

Next.js website for **Infozub Private Limited**.

## Docs

- `docs/website-audit.md` — live site audit
- `docs/content-inventory.md` — content inventory
- `docs/architecture.md` — production architecture
- `docs/design-system.md` — Signal Navy visual system
- `docs/seo-migration.md` — SEO and URL migration
- `docs/performance-audit.md` — performance notes
- `docs/security-audit.md` — security notes
- `docs/vercel-deployment.md` — GitHub → Vercel production deploy

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Site: http://localhost:3000
- Living style guide: http://localhost:3000/design-system

Copy `.env.example` to `.env.local`. Do not commit secrets. Never prefix webhook values with `NEXT_PUBLIC_`.

## Production checks

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Stack

Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4 · Lucide · Radix primitives
