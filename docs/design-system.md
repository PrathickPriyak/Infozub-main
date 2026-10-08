# Infozub design system

Brand: **Infozub Private Limited**  
Direction: **Signal Navy** — premium digital-services identity  
Status: foundation implemented; marketing pages not built yet

The old WordPress site is a content and brand reference only. This system does not copy Divi layouts, stock icon grids, or the previous color treatment.

## Design principles

1. **Trust first** — deep ink navy, calm surfaces, clear hierarchy
2. **Signal accent** — teal used for CTAs and interactive focus, not decoration overload
3. **One composition** — heroes read as a single scene, not a dashboard
4. **Motion with purpose** — reveal, hover, counters; never gimmicks or slow page wipes
5. **Mobile excellence** — touch targets, stacked rhythm, no hover-only meaning

## 1. Color system

| Token | Hex | Role |
| --- | --- | --- |
| `--ink` | `#0A1628` | Primary text, strongest surfaces |
| `--ink-soft` | `#15263D` | Secondary dark surfaces |
| `--navy` | `#0E2A4A` | Brand navy (evolved from legacy `#003068`) |
| `--signal` | `#0FAE9A` | Primary accent / CTA |
| `--signal-strong` | `#0B8F7F` | Accent hover / pressed |
| `--signal-soft` | `#D8F5F0` | Accent wash / badge fills |
| `--mist` | `#F3F6F9` | Page background |
| `--surface` | `#FFFFFF` | Cards, elevated panels |
| `--line` | `#D5DDE8` | Borders, dividers |
| `--muted` | `#5C6B7C` | Secondary text |
| `--muted-soft` | `#8A96A5` | Placeholder / meta |
| `--warning` | `#C47D1A` | Caution only (not brand accent) |
| `--danger` | `#C23B3B` | Errors |
| `--success` | `#1F8A5B` | Success states |

Do **not** default to purple gradients, cream/terracotta editorial themes, or dark-mode-first chrome.

## 2–4. Typography

| Role | Family | Notes |
| --- | --- | --- |
| Display / headings | **Outfit** | Geometric, modern, tech-capable |
| Body / UI | **Source Sans 3** | Readable, professional |
| Mono | **IBM Plex Mono** | Labels, code, micro-meta only |

### Heading hierarchy

| Style | Size (mobile → desktop) | Weight | Tracking |
| --- | --- | --- | --- |
| Display | 2.5rem → 3.75rem | 600 | -0.03em |
| H1 | 2rem → 3rem | 600 | -0.025em |
| H2 | 1.625rem → 2.25rem | 600 | -0.02em |
| H3 | 1.25rem → 1.5rem | 600 | -0.015em |
| H4 | 1.125rem | 600 | -0.01em |

### Body

| Style | Size | Leading | Color |
| --- | --- | --- | --- |
| Lead | 1.125–1.25rem | 1.7 | muted |
| Body | 1rem | 1.65 | ink |
| Small | 0.875rem | 1.5 | muted |
| Micro | 0.75rem | 1.4 | muted-soft |

## 5. Buttons

Variants: `primary`, `secondary`, `ghost`, `outline`, `signal`  
Sizes: `sm`, `md`, `lg`

- Primary: ink fill, white text
- Signal: teal fill for conversion CTAs
- Radius: `rounded-md` (8px), not pill-by-default
- Min height: 40 / 44 / 52px
- Hover: slight lift (`translateY(-1px)`) + color shift
- Focus: visible ring using signal

## 6. Cards

Cards are **interaction or grouping containers**, not default decoration.

- Background: surface
- Border: 1px `line`
- Radius: 12–16px
- Shadow: soft single-layer only
- Hover (interactive): border to navy/signal wash, shadow strengthens slightly, optional 2px lift

## 7. Navigation

- Top bar: phone + email on `md+` (from `content/site.ts`)
- Primary nav: single source in `content/navigation.ts` — desktop + mobile import the same config
- Compact Digital Suite dropdown only (city pages justify it; no mega-menu)
- Active state: `aria-current="page"` + signal underline marker
- Sticky header with optional transparent → solid transition over heroes (`transparentOnHero` / `inverseOnHero`)
- Mobile: right sheet with slide animation, focus trap, Escape to close, body scroll lock
- Preview: `/nav-preview` (noindex) for transparent + solid modes
- Keyboard: Tab order, Radix menu arrow keys, sheet focus management

## 8. Forms

- Label above field, 14px semibold
- Input height 44px, radius 8px
- Border `line` → focus ring signal
- Error text under field in danger
- Helper text in muted

## 9. Badges

- Soft pill **only** for status/meta chips (not every CTA)
- Variants: neutral, signal, navy
- Uppercase micro optional via `tracking-wide`, sparingly

## 10. Sections

| Token | Value |
| --- | --- |
| Section Y padding | `py-16 md:py-24` |
| Container | `max-w-6xl` (+ `max-w-7xl` for logo walls) |
| Gutter | `px-4 sm:px-6 lg:px-8` |
| Stack gap | `gap-6 md:gap-8` |

Section header pattern: eyebrow (optional) → H2 → one supporting sentence.

## 11–13. Shadows, borders, radius

| Token | Value |
| --- | --- |
| `--shadow-sm` | `0 1px 2px rgba(10,22,40,0.06)` |
| `--shadow-md` | `0 8px 24px rgba(10,22,40,0.08)` |
| `--shadow-lg` | `0 18px 40px rgba(10,22,40,0.10)` |
| Border | 1px `--line` |
| Radius sm | 6px |
| Radius md | 8px |
| Radius lg | 12px |
| Radius xl | 16px |

Avoid stacked multi-layer neon shadows.

## 14. Icons

- Library: **Lucide React**
- Default stroke 1.75–2
- Sizes: 16 / 20 / 24
- Color inherits text; signal on interactive emphasis

## 15–16. Gradients and backgrounds

- Page: mist base
- Atmospheric wash: soft navy→mist diagonal at low opacity
- Signal sheen: sparse teal radial behind heroes
- Pattern: subtle 24px grid or dot mask at 3–6% opacity
- No animated rainbow meshes

## 17–19. Motion

| Pattern | Use |
| --- | --- |
| Reveal | Sections fade/slide once on enter |
| Stagger | Service grids, stats |
| Hover | Buttons, cards, nav links |
| Counters | Animate to value when in view |
| Magnetic CTA | Optional subtle pull on primary CTAs |
| Page transition | Prefer instant or very light template fade; no long shared-element theatre |

Respect `prefers-reduced-motion`.

Durations: 180–450ms typical. Max reveal distance 16–24px.

## Implementation map

| Area | Location |
| --- | --- |
| Tokens | `app/globals.css` |
| Fonts | `app/layout.tsx` |
| Utils | `lib/utils.ts` |
| Motion variants | `lib/motion/variants.ts` |
| UI primitives | `components/ui/*` |
| Layout primitives | `components/layout/*` |
| Motion wrappers | `components/motion/*` |
| Living preview | `/design-system` |

## Out of scope for this phase

- Full marketing page builds
- Final photography art direction
- CMS theming
- Dark theme toggle
