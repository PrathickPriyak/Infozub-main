# Performance audit — Infozub marketing site

Date: 6 October 2026.

Goal: excellent Lighthouse performance without sacrificing verified visual quality.  
Stack: Next.js 16 App Router, React 19, Tailwind CSS 4.

---

## Findings (before this pass)

| Area | Issue |
| --- | --- |
| JS bundle | `framer-motion` on the homepage critical path (Reveal, TextReveal, Magnetic, hero visual, page enter) |
| Client tree | Root `ReducedMotionProvider` forced a client boundary around the entire app |
| Client tree | Page enter + scroll-progress ran Framer/state on every marketing page |
| Fonts | Three Google families (Outfit, Source Sans 3, IBM Plex Mono), full subset weights |
| Images | `next/image` already used for projects/blog; first project card lacked `priority`; OG PNG is tiny solid |
| Layout shift | Word-level `TextReveal` hid the real H1 (`sr-only`) and animated opacity — extra CLS/LCP risk |
| Network | Maps + job form iframes already `loading="lazy"`; no analytics/chat scripts |
| Dependencies | `framer-motion`, `@radix-ui/react-label`, `@radix-ui/react-separator` unused after CSS motion / native elements |
| CLS / LCP | Hero started at `opacity: 0.35` via JS; CSS mount animation is cheaper and H1 is in HTML |

---

## What was optimized

### JavaScript / Server Components

- Marketing pages remain **Server Components** by default.
- Client islands kept only where interaction requires them: sticky header, desktop/mobile nav, contact form, share buttons, route progress.
- Removed sitewide `ReducedMotionProvider`.
- Removed page-enter wrapper and scroll-progress bar (JS on every route).
- Converted Reveal / Stagger / TextReveal / Magnetic / HomeHeroVisual / AnimatedCounter / ProjectCard / ProjectsGrid to **server-safe** implementations.
- `optimizePackageImports: ["lucide-react"]` so icon imports tree-shake.

### Dependencies removed

- `framer-motion`
- `@radix-ui/react-label` (native `<label>`)
- `@radix-ui/react-separator` (plain divider)

Radix accordion / checkbox / select remain for the internal `/design-system` preview. Dialog + navigation-menu remain for production nav.

### Fonts

- Dropped IBM Plex Mono file download. Mono UI uses system `ui-monospace`.
- Outfit and Source Sans 3 remain as `next/font` variable families with `display: "swap"` (explicit weight arrays broke the Next 16 Google Font loader in this environment).

### Images

- `next/image` with AVIF/WebP, sized device widths for 320–1920.
- 30-day `minimumCacheTTL` for optimized images.
- Immutable cache headers for static `/public` assets.
- First project card uses `priority` for LCP on `/projects`.
- Project cards no longer wrap images in a Framer spring layer.

### Animations

- Section reveals and hero orbit chips are **CSS** (`reveal-view`, `orbit-chip`), with `prefers-reduced-motion` disabling them.
- Button hover/press remains CSS (`active:scale`, hover translate).
- Media zoom remains CSS (`media-zoom`).
- Route progress remains a tiny CSS bar on client navigations only.

### Layout / loading

- H1 text is in the first HTML payload (no word-split JS).
- Hero visual is static HTML+CSS (no hydration).
- Maps and job-application iframe stay `loading="lazy"`.
- `poweredByHeader: false`, gzip/brotli `compress: true`.
- Production `removeConsole` (keeps `error`/`warn`).
- Viewport `themeColor` set for browser chrome.

### Network

- No third-party analytics, chat, or tag-manager scripts on marketing pages.
- Contact posts to first-party `/api/contact` only when submitted.
- Academy and social remain user-initiated navigations.

---

## Client vs server map (production)

| Client (interactive) | Server |
| --- | --- |
| `SiteHeader` / `DesktopNav` / `MobileNav` / `Sheet` | Page bodies, heroes, cards, legal copy |
| `ContactForm` | Forms markup around it |
| `ShareButtons` | Blog article body |
| `RouteProgress` | Footer, JSON-LD, metadata |

---

## Remaining notes (not blockers)

- `/design-system` and `/nav-preview` are `noindex` and still heavier; they are not in the sitemap.
- Contact maps load Google Maps embeds on `/contact` only, below the fold, lazy.
- Careers apply iframe loads OpnForm when that page is visited.
- Default OG image is a solid Signal Navy PNG; a designed 1200×630 graphic would improve social CTR, not Lighthouse LCP on-page.
- Run Lighthouse on production (Vercel) after deploy — local `next dev` scores are not representative.

---

## Verification

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build` (production compile)

Target: strong LCP from CSS+HTML heroes, smaller JS (no Framer), fewer font files, lazy third-party frames.
