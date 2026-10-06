# SEO migration checklist — Infozub

Migration from WordPress (Yoast) to Next.js App Router.  
Audit source: October 2026 inventory in `docs/website-audit.md` and `docs/content-inventory.md`.

Production origin: `https://infozub.com`  
Configure with `NEXT_PUBLIC_SITE_URL=https://infozub.com` (see `.env.example`).

---

## Goals

- Preserve equity for important WordPress URLs.
- Ship complete metadata (title, description, canonical, Open Graph, Twitter).
- Publish `robots.txt` + `sitemap.xml`.
- Emit Organization, WebSite, WebPage, BreadcrumbList, and Article JSON-LD.
- Fill previously empty meta descriptions with accurate, non-stuffed copy.
- Do not invent business claims.

---

## URL map

| Legacy WordPress URL | Next.js URL | Action |
| --- | --- | --- |
| `/` | `/` | Keep |
| `/about/` | `/about` | Keep (trailing slash auto-normalized) |
| `/digital-suite/` | `/digital-suite` | Keep |
| `/digital-suite/coimbatore/` | `/digital-suite/coimbatore` | Keep |
| `/digital-suite/tirupur/` | `/digital-suite/tirupur` | Keep |
| `/courses/` | `/academy` | **308/301 redirect** (`/courses` → `/academy`) |
| `/ventures/` | `/ventures` | Keep |
| `/clients/` | `/clients` | Keep |
| `/careers/` | `/careers` | Keep |
| `/careers/apply/` | `/careers/apply` | Keep |
| `/contact/` | `/contact` | Keep |
| `/web/` | `/web` | Keep |
| `/reviews/` | `/reviews` | Keep (written testimonials; video assets TBD) |
| `/payments/` | `/payments` | Keep |
| `/terms/` | `/terms` | Keep (footer “Terms & Privacy”) |
| `/privacy-policy/` | `/privacy-policy` | Keep |
| `/copyrights/` | `/copyrights` | Keep |
| `/thanks/` | `/thanks` | Keep |
| `/infozub-landing-page/` | `/infozub-landing-page` | Keep (campaign shell → Digital Suite / Contact CTAs) |
| `/infozub-digital-marketing/` | `/infozub-digital-marketing` | Keep (campaign shell) |
| `/category/uncategorized/` | `/blog` | Temporary redirect |
| — | `/services`, `/services/[slug]` | New catalog routes (linked from Digital Suite) |
| — | `/projects`, `/projects/[slug]` | New routes for the two named results |
| — | `/blog`, `/blog/[slug]` | New (0 posts at launch; migration-ready) |
| `/thank-you` | `/thanks` | Alias redirect |
| `/privacy` | `/privacy-policy` | Alias redirect |
| `/terms-and-conditions` | `/terms` | Alias redirect |

Academy lessons remain on `https://academy.infozub.com` (external). Do not 301 those onto the marketing site.

---

## Metadata checklist

### Sitewide

- [x] `metadataBase` → `https://infozub.com`
- [x] Default title template `%s | INFOZUB`
- [x] Default description from verified home positioning
- [x] Default Open Graph + Twitter card (`@infozubltd`)
- [x] Default OG image `public/og/default.png` (HTTPS)
- [x] Organization + WebSite JSON-LD in root layout
- [x] `app/robots.ts` allows crawl; disallows `/api/`, design previews
- [x] `app/sitemap.ts` lists public marketing + dynamic routes

### Per route

For each public page confirm:

- [x] Unique title (Yoast title preserved where available)
- [x] Meta description (Yoast text, or accurate fill for previously empty pages)
- [x] Canonical path
- [x] Open Graph title / description / url / image
- [x] Twitter card where applicable
- [x] One H1 (PageHero / home hero)
- [x] Semantic landmarks (`header`, `main`, `footer`, `nav`, `article` on legal/blog)
- [x] Image `alt` on project/blog media
- [x] Internal links (nav, footer legal, related services/projects, campaign → suite/contact)

### Structured data

| Type | Where |
| --- | --- |
| Organization | Root layout |
| WebSite | Root layout |
| WebPage / AboutPage / ContactPage / CollectionPage | Page routes |
| BreadcrumbList | Nested + major section pages |
| Article | `/blog/[slug]` when posts exist |

Visible breadcrumbs render on city, service, project, job, and article heroes.

---

## Empty-description fills (audit gaps)

These WordPress pages had empty or unusable descriptions. New copy is purpose-based, not keyword-stuffed:

| Path | New description basis |
| --- | --- |
| `/web` | Website design & development packages published on `/web/` |
| `/careers/apply` | Job application form purpose |
| `/reviews` | Client testimonials / reviews page purpose |
| `/infozub-landing-page` | Campaign landing → Digital Suite |
| `/infozub-digital-marketing` | Campaign landing → Digital Suite |

---

## Post-deploy verification

1. Fetch `https://infozub.com/robots.txt` — sitemap URL present; no unexpected Disallow.
2. Fetch `https://infozub.com/sitemap.xml` — all kept URLs listed; no `/design-system` or `/nav-preview`.
3. Sample 5 pages in Rich Results / schema validator (home, about, digital-suite, contact, a project).
4. Confirm `/courses` → `/academy` (301/308).
5. Confirm `/thanks`, `/payments`, `/terms`, `/privacy-policy`, `/copyrights`, `/reviews` return 200.
6. Confirm OG previews use HTTPS images (not legacy `http://` WP uploads).
7. Search Console: submit new sitemap; monitor coverage for redirected `/courses`.
8. When first blog post ships: verify Article JSON-LD + `sitemap` entry.

---

## Content decisions still open (not SEO blockers)

- Two privacy texts (`/terms` vs `/privacy-policy`) remain as published; footer primary legal link stays Terms & Privacy → `/terms`, with Privacy Policy also linked.
- `/reviews` video files were not migrated in this pass; written testimonials are shown.
- Campaign landings are thin shells preserving the URL; full Divi form markup was not re-cloned.
- Legal entity wording still varies in source copy (“Ltd.” vs “Private Limited”) — do not invent a single legal name beyond what pages already publish.

---

## Implementation map

| Concern | Location |
| --- | --- |
| Metadata helper | `lib/seo/metadata.ts` |
| Site constants / absolute URLs | `lib/seo/site.ts` |
| JSON-LD builders | `lib/seo/json-ld.ts` |
| Page SEO copy (Yoast + fills) | `content/seo/pages.ts` |
| Legal/utility copy | `content/legal.ts` |
| Robots / sitemap | `app/robots.ts`, `app/sitemap.ts` |
| Redirects | `next.config.ts` |
| JSON-LD script | `components/seo/json-ld-script.tsx` |
| Visible breadcrumbs | `components/seo/breadcrumbs.tsx` |

---

## Sign-off

- [ ] Production `NEXT_PUBLIC_SITE_URL` set in Vercel (see `docs/vercel-deployment.md`)
- [ ] Sitemap submitted in Google Search Console + Bing
- [ ] Spot-check titles/descriptions against this checklist
- [ ] Monitor 404s for any missed legacy slugs for 30 days post-cutover
