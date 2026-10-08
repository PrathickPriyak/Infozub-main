# Infozub production architecture

Status: implemented in this repository (App Router site under `app/`, `components/`, `content/`, `public/`). This document remains the design reference; prefer the live tree and `README.md` when they differ from early scaffold notes.

Based on: `docs/website-audit.md`, `docs/content-inventory.md`.

## Goal

Replace the WordPress/Divi frontend with a standalone Next.js application that:

- Preserves useful URLs, business content, and SEO signals from the audit
- Does **not** call WordPress at runtime
- Deploys cleanly on Vercel
- Is fast, accessible, responsive, and maintainable

The new site is a company marketing site: mostly static content, a few forms, media, and structured SEO. It is not a CMS-backed blog platform at launch.

## Recommended stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js (latest stable at scaffold time) | App Router only |
| Language | TypeScript (strict) | No `any` in app code |
| Styling | Tailwind CSS | Design tokens in CSS variables |
| Motion | Framer Motion | Respect `prefers-reduced-motion` |
| Icons | Lucide React | Prefer over custom icon fonts |
| UI primitives | shadcn/ui selectively | Button, Input, Textarea, Select, Label, Dialog, Sheet, Accordion, Separator |
| Forms | React Hook Form + Zod + Server Actions | Native ownership, no WordPress or OpnForm runtime |
| Validation | Zod | Shared by content schemas and form schemas |
| Hosting | Vercel | Node/Edge as needed for form actions |
| Analytics | Pluggable script loader | GTM/FB only when env IDs exist |

Pin exact package versions at scaffold. Architecture does not hard-code patch versions.

## Architecture decisions

### Content source

**Decision: typed content modules in the repo (`content/`), validated with Zod.**

Alternatives considered:

1. **Typed content in repo (chosen)** — Independent of WordPress, git-reviewed, works offline, Vercel-native, easy for engineers and agents. Best fit for a known 20-page migration.
2. **Headless CMS now** — Better for non-dev editors later, but adds runtime/vendor dependency before redesign is done. Deferred.
3. **MDX-only** — Good for legal prose, weaker for structured cards (services, packages, FAQs). Used only where long prose benefits.

Content is loaded by Server Components through a thin `lib/content` API. A future CMS can replace the loaders without rewriting pages.

### Forms

**Decision: first-party Next.js Server Actions. No OpnForm or Contact Form 7 at runtime.**

Submissions go to:

1. Server Action validation (Zod)
2. Email and/or webhook (env-configured)
3. Optional CRM webhook later

OpnForm field lists from the audit are the **field inventory** to recreate, not a live dependency.

### Rendering

**Decision: static-first App Router.**

- Marketing pages: Server Components, statically generated
- Forms: Client Components only for interactive islands
- Dynamic only where required (form POST handlers, optional preview)

### WordPress independence

No WordPress REST calls, no Divi theme, no WP plugins, no PHP. Migrated assets live in `public/` or the Vercel Blob/CDN later. Legacy URLs are handled with Next.js redirects, not WP permalinks.

---

## 1. Folder structure

```text
.
├── app/
│   ├── (marketing)/                 # Primary site chrome
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # /
│   │   ├── about/page.tsx
│   │   ├── digital-suite/
│   │   │   ├── page.tsx
│   │   │   ├── coimbatore/page.tsx
│   │   │   └── tirupur/page.tsx
│   │   ├── courses/page.tsx
│   │   ├── ventures/page.tsx
│   │   ├── clients/page.tsx
│   │   ├── careers/
│   │   │   ├── page.tsx
│   │   │   └── apply/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── web/page.tsx
│   │   ├── reviews/page.tsx
│   │   ├── payments/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── copyrights/page.tsx
│   │   └── thanks/page.tsx
│   ├── (campaign)/                  # Minimal chrome for lead pages
│   │   ├── layout.tsx
│   │   ├── infozub-landing-page/page.tsx
│   │   └── infozub-digital-marketing/page.tsx
│   ├── api/                         # Only if webhooks need raw Route Handlers
│   │   └── health/route.ts
│   ├── actions/                     # Server Actions for forms
│   │   ├── contact.ts
│   │   ├── quote.ts
│   │   ├── apply.ts
│   │   └── lead.ts
│   ├── layout.tsx                   # Root providers, fonts, global metadata
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── loading.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── opengraph-image.tsx          # Optional default OG
│   └── favicon.ico
├── components/
│   ├── layout/
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── office-block.tsx
│   │   ├── legal-strip.tsx
│   │   └── skip-link.tsx
│   ├── sections/                    # Page section compositions
│   │   ├── hero.tsx
│   │   ├── service-grid.tsx
│   │   ├── stats-counters.tsx
│   │   ├── testimonials.tsx
│   │   ├── client-logos.tsx
│   │   ├── process-steps.tsx
│   │   ├── certifications.tsx
│   │   ├── faq-accordion.tsx
│   │   ├── cta-banner.tsx
│   │   ├── timeline.tsx
│   │   ├── package-cards.tsx
│   │   └── video-reviews.tsx
│   ├── forms/
│   │   ├── contact-form.tsx
│   │   ├── quote-form.tsx
│   │   ├── apply-form.tsx
│   │   ├── lead-form.tsx
│   │   └── form-status.tsx
│   ├── seo/
│   │   ├── json-ld.tsx
│   │   └── breadcrumb-json-ld.tsx
│   ├── motion/
│   │   ├── reveal.tsx
│   │   ├── stagger.tsx
│   │   └── reduced-motion.tsx
│   └── ui/                          # shadcn primitives only
├── content/
│   ├── site.ts                      # Company constants: phones, offices, social
│   ├── navigation.ts
│   ├── home.ts
│   ├── about.ts
│   ├── digital-suite.ts
│   ├── courses.ts
│   ├── ventures.ts
│   ├── clients.ts
│   ├── careers.ts
│   ├── contact.ts
│   ├── web.ts
│   ├── reviews.ts
│   ├── payments.ts
│   ├── legal/
│   │   ├── terms.mdx
│   │   ├── privacy.mdx
│   │   └── copyrights.mdx
│   ├── testimonials.ts
│   ├── services.ts
│   ├── faqs.ts
│   └── seo/
│       └── pages.ts                 # Title/description/canonical per route
├── lib/
│   ├── content/
│   │   ├── index.ts                 # Typed getters
│   │   └── schemas.ts               # Zod content schemas
│   ├── forms/
│   │   ├── schemas.ts
│   │   ├── submit.ts                # Email/webhook delivery
│   │   └── rate-limit.ts
│   ├── seo/
│   │   ├── metadata.ts              # buildMetadata helpers
│   │   └── schema-org.ts
│   ├── motion/
│   │   └── variants.ts
│   ├── utils.ts
│   └── env.ts                       # Validated env
├── public/
│   ├── brand/
│   ├── clients/
│   ├── services/
│   ├── certifications/
│   ├── courses/
│   ├── reviews/
│   └── og/
├── styles/
│   └── globals.css
├── docs/
│   ├── website-audit.md
│   ├── content-inventory.md
│   └── architecture.md
├── next.config.ts
├── tailwind.config.ts               # or CSS-first Tailwind v4 config if chosen at scaffold
├── tsconfig.json
├── components.json                  # shadcn
├── package.json
└── vercel.json                      # redirects/headers if not in next.config
```

### Rules

- `app/**/page.tsx` stays thin: load content, compose sections, export metadata.
- Business copy lives in `content/`, not buried in JSX.
- Presentational pieces live in `components/`.
- Side effects (email, webhooks) live in `lib/forms/` and `app/actions/`.

---

## 2. Route structure

Preserve high-value audit URLs. Trailing-slash policy: **no trailing slash** in Next.js (`trailingSlash: false`), with redirects from old WordPress trailing-slash URLs.

### Primary marketing routes

| Route | Purpose | Layout |
| --- | --- | --- |
| `/` | Home | marketing |
| `/about` | Company story | marketing |
| `/digital-suite` | Services + quote | marketing |
| `/digital-suite/coimbatore` | City landing | marketing |
| `/digital-suite/tirupur` | City landing | marketing |
| `/courses` | Academy catalog | marketing |
| `/ventures` | Ventures | marketing |
| `/clients` | Logo wall | marketing |
| `/careers` | Careers intro | marketing |
| `/careers/apply` | Job application | marketing |
| `/contact` | Contact + maps | marketing |
| `/web` | Website packages | marketing |
| `/reviews` | Video reviews | marketing |
| `/payments` | Payment instructions | marketing |
| `/terms` | Terms + refund policy | marketing |
| `/privacy-policy` | Privacy | marketing |
| `/copyrights` | Copyrights / DMCA | marketing |
| `/thanks` | Form thank-you | marketing |

### Campaign routes (minimal chrome)

| Route | Purpose |
| --- | --- |
| `/infozub-landing-page` | Lead gen (legacy slug kept for SEO) |
| `/infozub-digital-marketing` | Lead gen + promo video |

### Redirects (Next.js `redirects` in `next.config.ts`)

| From | To | Notes |
| --- | --- | --- |
| `/about/` → `/about` | permanent | trailing slash normalization for all WP paths |
| `/category/uncategorized` | `/` | no posts |
| Broken WhatsApp link usage | replace with verified WhatsApp URL or remove | audit: `connect.infozub.com/WhatsApp` 404 |

Academy URLs (`academy.infozub.com`) remain external until a separate product decision.

### Not in scope as WordPress runtime

- `/wp-admin`, `/wp-json`, `/wp-content` as app routes
- Blog archive routes (0 posts)

Optional later: `/blog` only if a real content plan exists.

---

## 3. Component architecture

Three layers:

1. **Primitives (`components/ui`)** — shadcn only where it saves time (forms, dialogs, accordion, sheet).
2. **Layout / atoms (`components/layout`, small shared widgets)** — Header, Footer, SkipLink, BrandLogo, SocialLinks, PhoneLink.
3. **Sections (`components/sections`)** — Domain blocks that map to audit sections (Hero, ServiceGrid, FAQ, etc.).
4. **Page compositions (`app/**/page.tsx`)** — Assemble sections from typed content.

### Patterns

- Prefer Server Components by default.
- Add `"use client"` only for: mobile nav, forms, Framer Motion wrappers, accordion/dialog interactions, video players with custom controls.
- Pass serializable content props into client islands. Do not import large content trees into client bundles unless needed.
- One section = one primary job, matching the audit’s section inventory.

### shadcn usage policy

Use:

- `Button`, `Input`, `Textarea`, `Select`, `Label`, `Checkbox`
- `Sheet` for mobile navigation
- `Accordion` for FAQs
- `Dialog` only if a modal is required
- `Separator`, `Badge` if needed for packages

Do not:

- Import a full dashboard kit
- Wrap every layout block in Card
- Use shadcn for hero/brand composition

---

## 4. Layout architecture

```text
RootLayout
  fonts, global CSS, theme variables
  JSON-LD Organization (sitewide)
  analytics loader (conditional)
  ├── MarketingLayout
  │     SkipLink
  │     SiteHeader (top bar + nav)
  │     <main id="main">{children}</main>
  │     OfficeBlock (optional via prop/slot)
  │     SiteFooter (legal strip + social + copyright)
  └── CampaignLayout
        minimal header (logo + phone + email)
        <main>{children}</main>
        compact footer / trust strip
```

### Layout behaviors

- Sticky header on marketing layout; collapses phone bar on small screens.
- Mobile nav via `Sheet`, keyboard-accessible, focus trap provided by Radix/shadcn.
- Floating call control is optional and must not obscure primary CTAs (`safe-area` aware).
- Campaign layout omits main mega-nav to protect conversion focus (matches audit campaign pages).

### Nested layouts

- `/digital-suite` may use a local layout only if shared city chrome appears; otherwise keep pages independent.
- Legal pages can reuse marketing layout; long prose uses a `prose` container component.

---

## 5. Shared UI components

Minimum shared set:

| Component | Responsibility |
| --- | --- |
| `BrandLogo` | SVG/PNG logo with real alt text |
| `SiteHeader` / `MobileNav` | Primary navigation |
| `SiteFooter` / `LegalStrip` / `SocialLinks` | Global footer |
| `OfficeBlock` | Tiruppur + Palladam + contact CTA |
| `Button` / `LinkButton` | Primary/secondary CTAs |
| `Section` / `Container` | Width, spacing rhythm |
| `Heading` | Consistent H1–H3 hierarchy |
| `IconTile` | Service/strength tiles |
| `StatCounter` | Animated numbers with reduced-motion fallback |
| `TestimonialCard` | Quote + attribution |
| `LogoCloud` | Client logos |
| `FaqAccordion` | FAQ |
| `FormStatus` | Success/error/pending |
| `RemoteMap` | Lazy Google Maps embed |
| `SafeVideo` | Accessible HTML5 video with poster |
| `JsonLd` | Structured data injector |

All interactive components need:

- Visible focus styles
- Accessible names (no icon-only “Follow” without `aria-label`)
- Sufficient color contrast against the chosen brand palette

---

## 6. Animation system

Centralize in `lib/motion/variants.ts` and thin wrappers in `components/motion/`.

### Principles

- Motion supports hierarchy and presence, not decoration spam.
- Default page entrance: fade/slide on section enter (once).
- Stagger children for service grids and stats.
- Hover/tap micro-interactions on CTAs and cards only where they clarify affordance.
- Honor `prefers-reduced-motion: reduce`: instant opacity swaps, no large transforms, counters jump to final value.

### Suggested tokens

- Duration: 200–500ms for UI, ≤800ms for hero entrance
- Easing: shared `easeOut` / `easeInOut` constants
- Distance: 12–24px translateY max for reveals

### What not to animate

- Legal prose
- Form field typing
- Map embeds
- Large video overlays that cause layout thrash

---

## 7. Image handling

### Strategy

1. Migrate required assets from WordPress uploads into `public/` (or import from `assets/` for hashed bundling where useful).
2. Serve with `next/image` for raster images.
3. Prefer SVG/logo components for brand marks when available.
4. Provide meaningful `alt` text during migration (audit alts are mostly empty).
5. Videos stay as progressive MP4 in `public/reviews/` with posters; use `preload="none"` until interaction.

### `next.config` images

```ts
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 768, 1024, 1280, 1536],
  imageSizes: [64, 96, 128, 256, 384],
}
```

Remote patterns only if a temporary CDN is used during cutover. Final state should be local/Vercel-hosted assets so WordPress media URLs are not required.

### Performance rules

- Hero: `priority` + explicit sizes
- Below-fold: lazy by default
- Logo clouds: constrained sizes, sprites or compact WebP where possible
- No full-resolution 2000px logos in headers

---

## 8. SEO architecture

### Technical SEO

- App Router Metadata API per route (`generateMetadata` or static `metadata`)
- `app/sitemap.ts` listing all public routes
- `app/robots.ts` allowing crawl; point to sitemap
- Canonical URLs absolute (`https://infozub.com/...`)
- Open Graph + Twitter cards from metadata helpers
- JSON-LD:
  - Organization (sitewide)
  - WebSite
  - WebPage / AboutPage / ContactPage as appropriate
  - BreadcrumbList on nested routes
  - FAQPage where FAQ content exists (`/digital-suite`)
  - LocalBusiness or Organization address once legal entity is confirmed

### Content SEO

- One clear H1 per page
- Preserve high-performing titles/descriptions from audit where still accurate
- Fill audit gaps (empty descriptions on `/web`, campaign pages, `/reviews`, `/careers/apply`)
- Redirect map for trailing slashes and any retired slugs
- External academy links use clear anchor text; `rel` only when needed

### Migration SEO checklist

- Keep primary nav URLs
- Keep city landings
- Keep campaign slugs until traffic is measured, then optionally redirect to cleaner paths
- Replace HTTP OG images with HTTPS absolute URLs
- Do not ship `noindex` on thank-you unless product decides otherwise (audit currently indexes `/thanks`)

Legal name conflicts from the audit (Ltd vs Private Limited, UK availability clause) are **content decisions**, not framework decisions. Architecture exposes a single `content/site.ts` company profile so legal copy can be corrected once.

---

## 9. Metadata architecture

```ts
// lib/seo/metadata.ts
buildMetadata({
  title: string,          // page title without site name, or absolute
  description: string,
  path: string,           // "/about"
  ogImage?: string,
  robots?: Robots,
  type?: "website" | "article",
})
```

`content/seo/pages.ts` stores the source of truth migrated from Yoast, plus improved drafts for empty descriptions.

Root layout sets:

- `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL)`
- default title template: `%s | INFOZUB` (or exact brand style chosen in design)
- default OG image under `public/og/default.png`
- twitter `site: @infozubltd`

Every route exports metadata. No reliance on client-side head managers.

---

## 10. Contact / form architecture

### Forms to implement (from audit inventory)

| Form | Route | Action module |
| --- | --- | --- |
| Contact | `/contact` | `app/actions/contact.ts` |
| Digital Suite quote | `/digital-suite` (+ city pages) | `app/actions/quote.ts` |
| Job application | `/careers/apply` | `app/actions/apply.ts` |
| Campaign lead | campaign routes | `app/actions/lead.ts` |

### Flow

```text
Client form (RHF + Zod)
  → Server Action
    → re-validate with Zod
    → rate limit (IP + action)
    → deliver via email provider and/or webhook
    → return { ok: true } | { ok: false, error }
  → UI status
  → optional redirect to /thanks
```

### Delivery adapters (`lib/forms/submit.ts`)

Env-driven, no hard dependency on one vendor:

- `FORM_EMAIL_TO=info@infozub.com`
- `RESEND_API_KEY` or SMTP credentials
- `FORM_WEBHOOK_URL` optional

File uploads (resume) go to Vercel Blob or S3-compatible storage, never into git. Max size and MIME allow-list enforced server-side.

### Anti-abuse

- Honeypot field
- Server rate limit
- Optional Turnstile/hCaptcha behind env flag
- Do not expose internal error stacks to clients

### Independence rule

Do not iframe OpnForm in production. Field schemas are recreated in Zod from the audit so the app works if `forms.infozub.com` disappears.

---

## 11. Content management approach

### Launch model: Git-based typed content

- Structured data: TypeScript modules + Zod schemas
- Long legal prose: MDX under `content/legal/`
- Media: `public/` with naming conventions from inventory

Editors update content via PR (or a later CMS). Pages import getters:

```ts
const page = getDigitalSuiteContent()
const faqs = getDigitalSuiteFaqs()
```

### Why this fits Infozub now

- Content volume is bounded (~20 pages)
- Audit already extracted the copy
- Zero WordPress runtime risk
- Previewable in PRs on Vercel

### Future CMS seam

Keep `lib/content/index.ts` as the only import surface for pages. Later, swap loaders to Sanity/Contentful without changing section components.

### What stays out of content files

- Secrets
- Form delivery logic
- Presentation class names (keep styling in components)

---

## 12. Error handling

| Layer | Mechanism |
| --- | --- |
| Route errors | `app/error.tsx` (recoverable) |
| Root fatal | `app/global-error.tsx` |
| Missing routes | `app/not-found.tsx` branded 404 |
| Form failures | typed action result + inline `FormStatus` |
| Config/env | fail fast in `lib/env.ts` at boot for required secrets |
| External embeds | maps/videos degrade to link fallback if blocked |

Logging: `console.error` in Server Actions is acceptable for Vercel logs; optional Sentry later. Never log full resume contents or full PII payloads.

---

## 13. Loading states

| Case | UX |
| --- | --- |
| Initial route transition | `loading.tsx` skeleton matching layout chrome |
| Section images | `next/image` blur placeholder or neutral skeleton |
| Form submit | button pending state + disabled fields (`useFormStatus` / RHF `isSubmitting`) |
| File upload | progress or determinate busy label |
| Video | poster frame until play |

Avoid full-page spinners for static pages. Prefer structural skeletons for header + hero only.

---

## 14. Responsive breakpoints

Use Tailwind defaults unless design tokens require otherwise:

| Token | Min width | Role |
| --- | --- | --- |
| base | 0 | Mobile first |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets; nav may still be sheet |
| `lg` | 1024px | Desktop nav; multi-column services |
| `xl` | 1280px | Comfortable marketing width |
| `2xl` | 1536px | Max container ceiling |

### Layout rules

- Single-column by default
- Service grids: 1 → 2 → 3/4 columns
- Header: phone bar stacks or hides labels before full desktop nav
- Containers: `max-w-6xl` or `max-w-7xl` with consistent horizontal padding (`px-4 sm:px-6 lg:px-8`)
- Touch targets ≥ 44px for primary controls

---

## 15. Performance strategy

### Rendering

- Static generation for all marketing pages
- Partial Client Components only for islands
- No client-side fetching for primary page content

### JavaScript

- Tree-shake Lucide imports (`lucide-react` per-icon imports)
- Lazy-load Typebot/chat and analytics after idle/interaction
- Dynamic import Google Maps embeds on viewport entry
- Keep Framer Motion limited to motion wrappers, not whole pages as client trees

### Assets

- AVIF/WebP via `next/image`
- Compress migrated PNGs; replace decorative bloated images when redesigning
- Self-host fonts with `next/font` (no render-blocking third-party font CSS)

### Caching / CDN

- Vercel Edge CDN for static assets and HTML
- Immutable hashed assets from Next build
- Long-cache for `public/` media with versioned filenames when replaced

### Core Web Vitals targets

- LCP: hero image/text within ~2.5s on mobile reference
- CLS: reserved image/video dimensions; no late-injected sticky bars without space
- INP: avoid heavy work on input; forms stay light

### Measurement

- Vercel Analytics / Speed Insights optional
- Lighthouse CI in PR later
- Keep GTM lean; load marketing pixels after consent if consent becomes required

---

## Environment variables

```bash
# Public (client bundle) — origin only. Do not add tracking IDs unless a
# production feature actually needs them in the browser.
NEXT_PUBLIC_SITE_URL=https://infozub.com

# Server-only — never NEXT_PUBLIC_
CONTACT_FORM_WEBHOOK_URL=
CONTACT_FORM_WEBHOOK_TOKEN=
```

No WordPress credentials. No `WP_*` env vars. Do not commit `.env.local`.

---

## Vercel deployment architecture

```text
GitHub main/PR
  → Vercel Build (next build)
  → Static pages + Server Action endpoints
  → Edge CDN
```

- Preview deployments per PR for content/design review
- Production project mapped to `infozub.com`
- Redirects configured in `next.config.ts` (or `vercel.json` if preferred)
- Headers: security defaults (`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) in Next config headers
- Operator runbook: `docs/vercel-deployment.md`

### Cutover plan (high level)

1. Build Next app with content from audit inventory
2. Migrate assets into `public/`
3. Verify redirects and metadata on preview
4. Point DNS / Vercel domain
5. Decommission WordPress frontend when stable

WordPress may remain temporarily as a read-only content archive offline, but the production site must not depend on it.

---

## Accessibility baseline

- Semantic landmarks: header, main, footer, nav
- Skip to content link
- Keyboard-complete navigation and forms
- Color contrast AA for text and controls
- Form errors linked via `aria-describedby`
- Reduced motion support
- Video captions: **TODO - NEEDS VERIFICATION** / add when transcripts exist
- Icon links require accessible names

---

## Testing and quality gates

Before calling architecture “implemented”:

- TypeScript strict CI
- ESLint + Next plugin
- Playwright smoke: home, digital-suite, contact submit happy-path (mocked email)
- Axe checks on primary templates
- Lighthouse budgets for home and digital-suite

---

## Explicit non-goals (for this architecture phase)

- Building all page UIs now
- Installing WordPress adapters
- Choosing final visual brand system (tokens will be defined at redesign)
- Migrating `academy.infozub.com` into this app
- Implementing a full CMS admin

---

## Implementation order (next phase)

1. Scaffold Next.js App Router + Tailwind + shadcn baseline
2. Add `content/site.ts`, SEO helpers, root/marketing layouts
3. Ship shell pages with metadata for all routes
4. Implement shared sections + home
5. Forms + `/thanks`
6. Remaining marketing pages from inventory
7. Campaign layouts
8. Asset migration + redirects + sitemap
9. Performance/accessibility pass

---

## Open items carried from audit

These do not block architecture, but must be resolved before content freeze:

- Confirm legal entity name for schema and footer
- Confirm WhatsApp destination to replace dead `connect.infozub.com` link
- Confirm Tirupur “Avinashi Road” location vs Alagendira Towers
- Confirm whether `/thanks` should stay indexable
- Confirm Razorpay/PayPal payment destinations
- Provide review video transcripts/captions
- Resolve UK availability clause in terms vs India offices

Until resolved, code should read these from `content/site.ts` flags/comments rather than hardcoding conflicting statements in multiple places.
