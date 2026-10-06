# Security audit — Infozub marketing site

Date: 6 October 2026.

Scope: production Next.js 16 app (App Router). No invented secrets. Bank details on `/payments` are the published WordPress copy, not leaked credentials.

---

## Verification

| Check | Result |
| --- | --- |
| `.env*` gitignored | Yes (`.gitignore` ignores `.env*` with `!.env.example`) |
| Secrets committed | None. Tracked env file is `.env.example` only (empty secret values) |
| `NEXT_PUBLIC_` usage | Only `NEXT_PUBLIC_SITE_URL` (canonical/OG origin — must be public) |
| Server secrets | `CONTACT_FORM_WEBHOOK_URL` / `CONTACT_FORM_WEBHOOK_TOKEN` — server-only |
| `npm audit --omit=dev` | 0 vulnerabilities |
| Open redirects | Static `next.config` redirects only; no user-controlled destinations |
| Client-side secrets | None |

---

## Findings and fixes

### Contact API

- Origin allowlist (`SITE_ORIGIN`; localhost in development).
- JSON body size cap (16 KB).
- Typed payload parse (no unchecked casts).
- Honeypot + timing trap (missing `startedAt` is treated as spam).
- In-memory rate limit (8/min/IP) — per-instance only; not a shared store on serverless.
- Webhook delivery: HTTPS only, no URL credentials, DNS-resolved private/metadata IPs rejected, `redirect: "error"`, 8s timeout.
- No PII in logs (email/phone/name/message never logged).
- GET returns 405. Responses are `Cache-Control: no-store`.

### XSS / HTML

- Blog `contentHtml` is sanitized on load (scripts, event handlers, `javascript:` / `data:` URLs stripped; links/images allowlisted).
- JSON-LD is serialized with `<`, `>`, `&` escaped as Unicode so it cannot break out of `<script>`.
- Maps iframe: `referrerPolicy=strict-origin-when-cross-origin`, `allow=fullscreen` (no camera/mic/geo).
- Job application iframe: sandbox + same referrer policy.

### Headers

Applied sitewide:

- Content-Security-Policy (embeds: Google Maps + `forms.infozub.com` only)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera, microphone, geolocation, payment, usb disabled
- Cross-Origin-Opener-Policy: same-origin
- HSTS in production only (`upgrade-insecure-requests` too, so local HTTP `next dev` still works)
- `X-Powered-By` disabled

Internal routes `/api/*`, `/design-system`, `/nav-preview` send `X-Robots-Tag: noindex`.

### Remaining operator notes

- Set `CONTACT_FORM_WEBHOOK_URL` (HTTPS) before production traffic; without it submissions are accepted but only logged without PII.
- In-memory rate limiting resets per serverless isolate — add a shared limiter if abuse appears.
- `/payments` continues to show the previously public GST and bank account details from the WordPress site.
- CSP uses `'unsafe-inline'` for Next.js hydration scripts. Nonce-based CSP can be added later via middleware if needed.
