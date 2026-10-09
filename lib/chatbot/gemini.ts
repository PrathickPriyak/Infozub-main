/**
 * Gemini (Google AI) client for the INFOZUB site chatbot.
 * Uses native Generative Language API — required for AQ. auth keys.
 */

import {
  buildInfozubChatContext,
  INFOZUB_CHAT_SYSTEM_PROMPT,
} from "@/lib/chatbot/context";

export type ChatTurn = {
  role: "user" | "bot";
  text: string;
};

const DEFAULT_MODEL = "gemini-flash-latest";
const FALLBACK_MODELS = [
  "gemini-flash-latest",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash",
] as const;

const GEMINI_TIMEOUT_MS = 25_000;

type GeminiPart = { text?: string };
type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: GeminiPart[] };
    finishReason?: string;
  }>;
  error?: { message?: string; code?: number; status?: string };
};

function extractText(payload: GeminiResponse): string | null {
  const parts = payload.candidates?.[0]?.content?.parts ?? [];
  const text = parts
    .map((part) => part.text?.trim() ?? "")
    .filter(Boolean)
    .join("\n")
    .trim();
  return text.length > 0 ? text : null;
}

function getApiKey(): string | null {
  const key =
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim() ||
    "";
  return key.length > 0 ? key : null;
}

function modelCandidates(): string[] {
  const preferred = process.env.GEMINI_MODEL?.trim();
  const list = preferred
    ? [preferred, ...FALLBACK_MODELS]
    : [...FALLBACK_MODELS];
  return [...new Set(list.filter(Boolean))];
}

async function generateWithModel(
  model: string,
  apiKey: string,
  contents: Array<{ role: string; parts: Array<{ text: string }> }>,
  systemText: string,
): Promise<{ ok: true; text: string } | { ok: false; status: number; error: string }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemText }] },
      contents,
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens: 1024,
      },
    }),
    signal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
  });

  const payload = (await response.json()) as GeminiResponse;

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: payload.error?.message ?? `Gemini HTTP ${response.status}`,
    };
  }

  const text = extractText(payload);
  if (!text) {
    return {
      ok: false,
      status: 502,
      error: "Empty model response",
    };
  }

  return { ok: true, text };
}

/**
 * Ask Gemini with Infozub-focused system instructions + verified site context.
 */
export async function askInfozubGemini(
  question: string,
  history: readonly ChatTurn[] = [],
): Promise<{ ok: true; answer: string } | { ok: false; error: string }> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { ok: false, error: "GEMINI_API_KEY is not configured." };
  }

  const systemText = `${INFOZUB_CHAT_SYSTEM_PROMPT}${buildInfozubChatContext()}`;

  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
  for (const turn of history.slice(-8)) {
    contents.push({
      role: turn.role === "user" ? "user" : "model",
      parts: [{ text: turn.text }],
    });
  }
  contents.push({
    role: "user",
    parts: [{ text: question }],
  });

  let lastError = "Gemini request failed.";

  for (const model of modelCandidates()) {
    try {
      const result = await generateWithModel(
        model || DEFAULT_MODEL,
        apiKey,
        contents,
        systemText,
      );
      if (result.ok) {
        return { ok: true, answer: result.text };
      }
      lastError = result.error;
      // Retry on transient overload / not found.
      if (result.status !== 503 && result.status !== 429 && result.status !== 404) {
        break;
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Gemini network error";
    }
  }

  return { ok: false, error: lastError };
}

export function isGeminiConfigured(): boolean {
  return Boolean(getApiKey());
}
