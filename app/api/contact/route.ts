import { NextResponse } from "next/server";
import {
  validateContactForm,
  type ContactSubmissionInput,
} from "@/lib/contact/schema";
import { deliverContactSubmission } from "@/lib/contact/submit";

export const runtime = "nodejs";

/** Minimum time (ms) a real user typically needs to fill the form. */
const MIN_FILL_MS = 2500;

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();

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

export async function POST(request: Request) {
  let body: ContactSubmissionInput;
  try {
    body = (await request.json()) as ContactSubmissionInput;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  // Honeypot — bots often fill hidden fields.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Timing trap — instantaneous submits are likely automated.
  if (typeof body.startedAt === "number") {
    const elapsed = Date.now() - body.startedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) {
      return NextResponse.json({ ok: true });
    }
  }

  const validation = validateContactForm(body);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, errors: validation.errors },
      { status: 400 },
    );
  }

  const delivery = await deliverContactSubmission(validation.data, {
    receivedAt: new Date().toISOString(),
    ip,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  if (!delivery.ok) {
    return NextResponse.json(
      { ok: false, error: delivery.error },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: delivery.id });
}
