import { NextResponse } from "next/server";
import { matchChatQuestion } from "@/lib/chatbot/match";
import { askInfozubGemini, isGeminiConfigured } from "@/lib/chatbot/gemini";
import {
  contentLengthExceeds,
  isAllowedContactOrigin,
} from "@/lib/security/request";

export const runtime = "nodejs";

const MAX_CHAT_BODY_BYTES = 12_288;
const MAX_MESSAGE_CHARS = 1_500;
const MAX_HISTORY = 8;

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
  const max = 20;
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  bucket.count += 1;
  return bucket.count > max;
}

type HistoryItem = { role: "user" | "bot"; text: string };

function readBody(raw: unknown): {
  message: string;
  history: HistoryItem[];
} | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  const message = typeof value.message === "string" ? value.message.trim() : "";
  if (!message || message.length > MAX_MESSAGE_CHARS) return null;

  const historyRaw = Array.isArray(value.history) ? value.history : [];
  const history: HistoryItem[] = [];
  for (const item of historyRaw.slice(-MAX_HISTORY)) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const role = row.role === "user" || row.role === "bot" ? row.role : null;
    const text = typeof row.text === "string" ? row.text.trim() : "";
    if (!role || !text || text.length > MAX_MESSAGE_CHARS) continue;
    history.push({ role, text });
  }

  return { message, history };
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

  if (contentLengthExceeds(request, MAX_CHAT_BODY_BYTES)) {
    return json({ ok: false, error: "Request is too large." }, 413);
  }

  let rawText: string;
  try {
    rawText = await request.text();
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  if (rawText.length > MAX_CHAT_BODY_BYTES) {
    return json({ ok: false, error: "Request is too large." }, 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText) as unknown;
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  const body = readBody(parsed);
  if (!body) {
    return json({ ok: false, error: "Enter a valid question." }, 400);
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return json(
      { ok: false, error: "Too many questions. Please try again shortly." },
      429,
    );
  }

  // Strong knowledge hits stay instant/verified. Broader questions use Gemini
  // (when configured) so visitors get Infozub-focused conversational answers.
  const matched = matchChatQuestion(body.message);
  const geminiReady = isGeminiConfigured();
  const strongKnowledge = matched.ok && matched.score >= (geminiReady ? 10 : 4);

  if (strongKnowledge && matched.ok) {
    return json(
      {
        ok: true,
        answer: matched.answer,
        href: matched.href ?? null,
        source: "knowledge",
      },
      200,
    );
  }

  if (geminiReady) {
    const ai = await askInfozubGemini(body.message, body.history);
    if (ai.ok) {
      return json(
        {
          ok: true,
          answer: ai.answer,
          href: null,
          source: "ai",
        },
        200,
      );
    }
    console.error("[chat] gemini failed", ai.error);
  }

  // Fallback: any knowledge hit if Gemini is unavailable.
  if (matched.ok) {
    return json(
      {
        ok: true,
        answer: matched.answer,
        href: matched.href ?? null,
        source: "knowledge",
      },
      200,
    );
  }

  return json(
    {
      ok: true,
      answer:
        "I could not answer that right now. Please use Enquire About Digital Marketing on the contact page, or call / email INFOZUB and the team will help.",
      href: "/contact#contact-form",
      source: "fallback",
      suggestContact: true,
    },
    200,
  );
}
