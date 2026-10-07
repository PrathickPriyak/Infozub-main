/**
 * Security headers for next.config.ts.
 * CSP is built at request/config evaluation time so `next dev` always
 * allows React/Turbopack eval while production stays locked down.
 */

export type SecurityHeader = { key: string; value: string };

function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production";
}

/** Production CSP — no eval. */
function productionCsp(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-src https://maps.google.com https://www.google.com https://forms.infozub.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/**
 * Development CSP — React Fast Refresh / Turbopack need eval.
 * `wasm-unsafe-eval` covers newer Chromium tooling paths.
 */
function developmentCsp(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' ws: wss: http://localhost:* http://127.0.0.1:*",
    "frame-src https://maps.google.com https://www.google.com https://forms.infozub.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
}

export function getContentSecurityPolicy(): string {
  return isProductionRuntime() ? productionCsp() : developmentCsp();
}

/** @deprecated Prefer getSecurityHeaders() so CSP tracks NODE_ENV correctly. */
export const CONTENT_SECURITY_POLICY = getContentSecurityPolicy();

export function getSecurityHeaders(): SecurityHeader[] {
  const isProd = isProductionRuntime();

  return [
    { key: "Content-Security-Policy", value: getContentSecurityPolicy() },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    ...(isProd
      ? [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ]
      : []),
  ];
}

/** Eager export for tools that still import the array; rebuilt on module load. */
export const SECURITY_HEADERS = getSecurityHeaders();
