import { SITE_ORIGIN } from "@/lib/seo/site";

/** Contact JSON is small (name, email, phone, message ≤ 5k). */
export const MAX_CONTACT_BODY_BYTES = 16_384;

function originFromHeader(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function httpsOriginFromHost(host: string | undefined): string | null {
  if (!host) return null;
  const hostname = host.replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (!hostname) return null;
  try {
    return new URL(`https://${hostname}`).origin;
  } catch {
    return null;
  }
}

function isDevLoopback(origin: string): boolean {
  return (
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:")
  );
}

/** Origins allowed to POST /api/contact (site + this Vercel deployment). */
export function allowedContactOrigins(): string[] {
  const origins = new Set<string>([SITE_ORIGIN]);
  const deployment = httpsOriginFromHost(process.env.VERCEL_URL);
  const production = httpsOriginFromHost(
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  );
  if (deployment) origins.add(deployment);
  if (production) origins.add(production);
  return [...origins];
}

/**
 * CSRF / cross-site POST defense for JSON APIs.
 * Browser `fetch` from other origins is also blocked by CORS (this app
 * does not send Access-Control-Allow-Origin).
 */
export function isAllowedContactOrigin(request: Request): boolean {
  const origin = originFromHeader(request.headers.get("origin"));
  const refererOrigin = originFromHeader(request.headers.get("referer"));
  const candidate = origin ?? refererOrigin;

  if (!candidate) {
    return process.env.NODE_ENV !== "production";
  }

  if (allowedContactOrigins().includes(candidate)) return true;
  if (process.env.NODE_ENV !== "production" && isDevLoopback(candidate)) {
    return true;
  }
  return false;
}

export function contentLengthExceeds(request: Request, maxBytes: number): boolean {
  const header = request.headers.get("content-length");
  if (!header) return false;
  const size = Number(header);
  return Number.isFinite(size) && size > maxBytes;
}
