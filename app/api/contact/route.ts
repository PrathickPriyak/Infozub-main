import { NextResponse } from "next/server";
import {
  isContactChannel,
  validateContactForm,
  type ContactSubmissionInput,
} from "@/lib/contact/schema";
import { deliverContactSubmission } from "@/lib/contact/submit";
import {
  contentLengthExceeds,
  isAllowedContactOrigin,
  MAX_CONTACT_BODY_BYTES,
} from "@/lib/security/request";

export const runtime = "nodejs";

/** Minimum time (ms) a real user typically needs to fill the form. */
const MIN_FILL_MS = 2500;

const jsonHeaders = { "Cache-Control": "no-store" };

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: jsonHeaders });
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 8;
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  bucket.count += 1;
  return bucket.count > max;
}

function readSubmission(raw: unknown): ContactSubmissionInput | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  return {
    name: typeof value.name === "string" ? value.name : "",
    email: typeof value.email === "string" ? value.email : "",
    phone: typeof value.phone === "string" ? value.phone : "",
    company: typeof value.company === "string" ? value.company : "",
    interest:
      typeof value.interest === "string"
        ? (value.interest as ContactSubmissionInput["interest"])
        : "",
    message: typeof value.message === "string" ? value.message : "",
    consent:
      value.consent === true ||
      value.consent === "true" ||
      value.consent === "on" ||
      value.consent === "1",
    sourcePage: typeof value.sourcePage === "string" ? value.sourcePage : "",
    channel:
      typeof value.channel === "string" && isContactChannel(value.channel)
        ? value.channel
        : "page",
    website: typeof value.website === "string" ? value.website : "",
    startedAt: typeof value.startedAt === "number" ? value.startedAt : undefined,
  };
}

export function GET() {
  return new NextResponse(null, {
    status: 405,
    headers: { ...jsonHeaders, Allow: "POST" },
  });
}

export async function POST(request: Request) {
  if (!isAllowedContactOrigin(request)) {
    return json({ ok: false, error: "Invalid request origin." }, 403);
  }

  if (contentLengthExceeds(request, MAX_CONTACT_BODY_BYTES)) {
    return json({ ok: false, error: "Request is too large." }, 413);
  }

  let rawText: string;
  try {
    rawText = await request.text();
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  if (rawText.length > MAX_CONTACT_BODY_BYTES) {
    return json({ ok: false, error: "Request is too large." }, 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText) as unknown;
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  const body = readSubmission(parsed);
  if (!body) {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      429,
    );
  }

  // Honeypot — bots often fill hidden fields.
  if (body.website && body.website.trim().length > 0) {
    return json({ ok: true }, 200);
  }

  // Timing trap — missing or instantaneous submits are treated as automated.
  if (typeof body.startedAt !== "number" || !Number.isFinite(body.startedAt)) {
    return json({ ok: true }, 200);
  }
  const elapsed = Date.now() - body.startedAt;
  if (elapsed < 0 || elapsed < MIN_FILL_MS) {
    return json({ ok: true }, 200);
  }

  const validation = validateContactForm(body);
  if (!validation.ok) {
    return json({ ok: false, errors: validation.errors }, 400);
  }

  const delivery = await deliverContactSubmission(validation.data, {
    receivedAt: new Date().toISOString(),
    ip,
    userAgent: request.headers.get("user-agent") ?? undefined,
    channel: body.channel ?? "page",
  });

  if (!delivery.ok) {
    return json({ ok: false, error: delivery.error }, 502);
  }

  return json({ ok: true }, 200);
}
