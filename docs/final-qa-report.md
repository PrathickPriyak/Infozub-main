# Final QA report — Infozub website

Date: 6 October 2026.  
Stack: Next.js 16 App Router, production `next build` + `next start`.  
Method: route crawl (titles, canonicals, JSON-LD, h1, skip link, 404), Playwright (320 / 768 / 1280 / 1920 overflow, desktop dropdown, mobile sheet, contact submit, skip-link, internal link walk), contrast tokens, code review.  
Rule: fix only issues found; no large rewrites.

Fresh verification on production `next start` (port 3006/3007): **0 remaining high/medium Playwright or crawl failures** after the fixes below.

---

## Issues found

| Sev | Area | Issue |
| --- | --- | --- |
| High | Navigation | Digital Suite dropdown links did not change the route (Radix Navigation Menu vs Next.js `Link`) |
| High | Forms | `POST /api/contact` returned 403 when Origin host was `127.0.0.1` and the server Host differed (`localhost`) — same class of bug on any host that is not exactly `NEXT_PUBLIC_SITE_URL` |
| High | Routing | No branded `app/not-found.tsx`; unknown URLs used the default Next.js 404 |
| Medium | Visual / a11y | Current breadcrumb on dark heroes used `text-ink`; hover used `hover:text-ink` |
| Medium | Visual / a11y | Hash targets and the contact success card sat under the fixed header (`#contact-form`, skip link) |
| Medium | A11y | `--muted-soft` (#8a96a5) was 3.0:1 on white / 2.8:1 on mist (AA fail for helper text) |
| Medium | A11y | `--signal-strong` (#0b8f7f) was 4.0:1 on white / 3.5:1 on signal-soft (AA fail for 12px eyebrows/badges) |
| Medium | A11y | Contact field errors/hints were not referenced with `aria-describedby` |
| Medium | A11y | Empty contact submit did not move focus to the first invalid field |
| Medium | Dev / CSP | Production CSP (`script-src` without `'unsafe-eval'`, `connect-src 'self'`) broke React/`next dev` eval and HMR websockets |
| Medium | SEO | Unknown blog/job/service/project slugs returned generic indexable titles before `notFound()` |
| Low | A11y | Footer legal links and mobile sheet phone/email lacked `focus-ring` |
| Low | A11y | Mobile Digital Suite control had no submenu accessible name; leaf/child links lacked `focus-ring` |
| Low | A11y | Skip link used Next.js `Link` for `#main` (unreliable hash jump) |
| Low | A11y | Design-system type specimen used a second `<h1>` |
| Low | Forms | Native `<button>` defaulted to `submit`; demo/extra buttons could submit a parent form |
| Low | SEO | Blog share URLs ignored `NEXT_PUBLIC_SITE_URL` |
| Low | Layout | `html { overflow-x: clip }` can clip `position: fixed` descendants (dropdown) in some engines |
| Low | Layout | Global `iframe { height: auto }` can collapse embeds that rely on min-height |
| Low | A11y | Decorative menu/close icons missing `aria-hidden` |

No broken internal links in the crawl. No missing project/OG/favicon assets. No horizontal overflow at 320–1920 on sampled routes. No downloads on the site (none were published). Dead WhatsApp URL from WordPress was not rebuilt.

---

## Issues fixed

- Desktop submenu items call `router.push` so Radix cannot swallow Next.js navigation. Menu `delayDuration` is 0 for immediate hover.
- Contact origin allowlist accepts the request `Host` (and still allows `SITE_ORIGIN` / Vercel hosts). Cross-origin POSTs remain 403.
- Branded 404 (`app/not-found.tsx`) with home / Academy / Contact actions; `app/error.tsx` for recoverable route errors.
- Breadcrumbs inherit color; inverse heroes force white current/hover.
- `html { scroll-padding-top }` for the sticky header; contact success scrolls `#contact-form` into view.
- `--muted-soft` → `#627181`; `--signal-strong` → `#0a7a6c` (AA on mist, white, signal-soft).
- `Field` wires `aria-describedby` / `aria-invalid` to the control; empty submit focuses the first invalid field.
- Development CSP allows `'unsafe-eval'` and `ws:`/`wss:` for HMR; production CSP is unchanged.
- Missing dynamic slugs use `missingResourceMetadata` (`noindex`).
- Footer legal + mobile tel/email/nav links: `focus-ring`. Mobile Digital Suite: `aria-label` “submenu”.
- Skip link is a native `#main` anchor with a visible focus style.
- Design-system heading specimen is no longer a second `h1`.
- `Button` defaults to `type="button"` unless `type` or `asChild` is set (submit still sets `type="submit"`).
- `getPostShareUrl` uses `SITE_ORIGIN`.
- Removed `overflow-x: clip` from `html` (body/main still clip). Iframes no longer get `height: auto`.
- Decorative menu/close icons marked `aria-hidden`.

Verified after production rebuild: Overview → `/digital-suite`, hover Coimbatore → city page, mobile Tirupur → city page, empty contact submit shows errors and focuses Name, valid submit returns 200 and “Thank you”, current crumb `rgb(255, 255, 255)` on dark hero, first Tab is “Skip to content”, unknown URLs render branded 404, overflow recheck clean, sitemap **31** production URLs.

---

## Remaining TODOs

- Set `CONTACT_FORM_WEBHOOK_URL` on Vercel Production or submissions are accepted without delivery (`docs/vercel-deployment.md`).
- Connect GitHub → Vercel, DNS, Search Console sitemap — not done in this environment.
- Lighthouse on the live hostname after cutover (local `next start` is not a field score).
- Replace `/og/default.png` with designed brand art when it exists (current file is a valid 1200×630 solid PNG).
- Publish blog JSON posts and career openings when they exist (empty states are correct).
- Optional: nonce-based CSP instead of `script-src 'unsafe-inline'`.
- Optional: shared rate limit for `/api/contact` (in-memory only today).
- Contact interest label remains **Select** (OpnForm field name from the audit).
- `/design-system` and `/nav-preview` stay noindex internal tools.
- In-memory contact rate limit does not span serverless instances.

---

## Functionality

| Check | Result |
| --- | --- |
| All public routes 200 | Pass |
| Unknown URLs + blog/job/project slugs 404 | Pass (branded page) |
| Primary nav + Digital Suite children | Pass after dropdown fix |
| Mobile menu open / expand / navigate / close | Pass |
| Header CTA → `/contact` | Pass |
| Footer legal + social (`noopener noreferrer`) | Pass |
| Contact validation + success | Pass after origin, focus, and scroll fixes |
| Careers apply iframe + mailto | Pass |
| Academy → `academy.infozub.com` | Pass (`rel="noopener noreferrer"`) |
| Payments Razorpay | Pass |
| Project images via `next/image` | Pass |
| Downloads | None (expected) |
| Internal link crawl from home | Pass (27 reachable pages, no 4xx) |

---

## Responsiveness / visual

Playwright viewports **320, 768, 1280, 1920** on `/`, `/digital-suite`, `/academy`, `/contact`, `/projects`, `/services`, `/digital-suite/coimbatore`, `/careers/apply`, 404: no horizontal overflow.

Spacing, type scale, and Signal Navy tokens are consistent. Dark-hero breadcrumb contrast is fixed. Hash targets clear the sticky header. `prefers-reduced-motion` still disables CSS motion in `globals.css`.

---

## SEO

| Item | Result |
| --- | --- |
| Titles / descriptions | `buildMetadata` on marketing routes; home title is the Yoast absolute string |
| Canonical | `https://infozub.com…` |
| JSON-LD | Organization + WebSite globally; WebPage/Breadcrumb/Article on pages |
| `robots.txt` | Allow `/`; disallow `/api/`, `/design-system`, `/nav-preview`; sitemap + host |
| `sitemap.xml` | 31 production URLs; no internal preview/API routes |
| Redirects | `/courses` → `/academy`, `/thank-you` → `/thanks`, `/privacy` → `/privacy-policy`, `/terms-and-conditions` → `/terms`, `/category/uncategorized` → `/blog` |
| 404 | Branded page, `noindex` |

---

## Accessibility

| Check | Result |
| --- | --- |
| Skip link + `main#main` | Native hash link; first Tab focuses it |
| Keyboard / focus | `focus-ring` on controls; footer/mobile/nav gaps fixed |
| Labels | Contact fields associated; errors announced; first invalid focused |
| Contrast | Muted/signal-strong tokens raised to AA |
| Semantic HTML | Single page `h1` on marketing routes; design-system specimen fixed |
| Reduced motion | Global CSS |
| 404 / error | Branded copy, recovery actions |

---

## Performance (spot)

| Check | Result |
| --- | --- |
| Client islands | Header/nav, contact form, share buttons, route progress, Radix sheet/select/accordion (design-system) |
| Images | `next/image`, local WebP, AVIF/WebP config, no remotePatterns |
| Bundle | No Framer Motion; `optimizePackageImports` for lucide |
| Loading | Static marketing pages; `/api/contact`, `/blog`, `/nav-preview` dynamic |
| CSP | Production unchanged; development allows eval + websockets |

---

## Final route list

Public (indexable unless noted):

| Route | Notes |
| --- | --- |
| `/` | Home |
| `/about` | |
| `/digital-suite` | |
| `/digital-suite/coimbatore` | |
| `/digital-suite/tirupur` | |
| `/academy` | Company entry; lessons on academy.infozub.com |
| `/services` | |
| `/services/google-ads` | |
| `/services/website-development` | |
| `/services/influencer-marketing` | |
| `/services/social-media-marketing` | |
| `/services/search-engine-optimization` | |
| `/services/email-marketing` | |
| `/web` | Website development landing |
| `/projects` | |
| `/projects/suzuki-motorcycle-tamilnadu` | |
| `/projects/bharath-electronics-and-appliances` | |
| `/blog` | Empty catalog |
| `/ventures` | |
| `/clients` | |
| `/reviews` | |
| `/careers` | Empty openings + resume CTA |
| `/careers/apply` | OpnForm iframe |
| `/contact` | Native form |
| `/payments` | |
| `/terms` | |
| `/privacy-policy` | |
| `/copyrights` | |
| `/thanks` | |
| `/infozub-landing-page` | Preserved URL |
| `/infozub-digital-marketing` | Preserved URL |
| `/robots.txt` | |
| `/sitemap.xml` | |

Redirects: `/courses`, `/thank-you`, `/privacy`, `/terms-and-conditions`, `/category/uncategorized`.

Internal noindex: `/design-system`, `/nav-preview`.  
Dynamic: `POST /api/contact`.  
Param 404 until content exists: `/blog/[slug]`, `/careers/[slug]`.  
Branded 404: unknown paths, including `/services/facebook-ads` (suite tile only; no detail page).
