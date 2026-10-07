import {
  chatKnowledge,
  type ChatKnowledgeEntry,
} from "@/lib/chatbot/knowledge";

export type ChatMatchResult =
  | {
      ok: true;
      entry: ChatKnowledgeEntry;
      score: number;
      answer: string;
      href?: string;
    }
  | {
      ok: false;
      reason: "no-match";
      answer: string;
      href: "/contact";
    };

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "was",
  "were",
  "do",
  "does",
  "did",
  "you",
  "your",
  "me",
  "my",
  "i",
  "we",
  "our",
  "to",
  "of",
  "in",
  "on",
  "for",
  "and",
  "or",
  "with",
  "about",
  "what",
  "which",
  "where",
  "when",
  "how",
  "can",
  "please",
  "tell",
]);

export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function scoreEntry(query: string, tokens: string[], entry: ChatKnowledgeEntry): number {
  const haystack = `${entry.prompts.join(" ")} ${entry.keywords.join(" ")} ${entry.answer}`.toLowerCase();
  let score = 0;

  for (const prompt of entry.prompts) {
    if (query.includes(prompt.toLowerCase()) || prompt.toLowerCase().includes(query)) {
      score += 8;
    }
  }

  for (const token of tokens) {
    if (entry.keywords.some((keyword) => keyword.includes(token) || token.includes(keyword))) {
      score += 3;
    } else if (haystack.includes(token)) {
      score += 1;
    }
  }

  // Light boost when the full query clearly mentions a core topic word.
  for (const keyword of entry.keywords) {
    if (keyword.length >= 4 && query.includes(keyword)) {
      score += 2;
      break;
    }
  }

  return score;
}

const NO_MATCH_ANSWER =
  "I could not find a verified answer for that on the INFOZUB website. Please use the contact form and the team will help you.";

const GREETING_ANSWER =
  "Hi — welcome to INFOZUB! I can help with questions about our Digital Marketing Suite, Academy courses, projects, careers, and contact details. What would you like to know?";

/** Pure greetings (and short hellos) should never fall through to Contact. */
const GREETING_PATTERN =
  /^(hi|hii|hiii|hello|hey|hey there|hi there|hello there|good morning|good afternoon|good evening|namaste|vanakkam)([!.\s]*)$/i;

function isGreeting(query: string): boolean {
  return GREETING_PATTERN.test(query.trim());
}

/**
 * Match a visitor question against verified site knowledge.
 * Low-confidence results fall through to the contact page.
 */
export function matchChatQuestion(rawQuestion: string): ChatMatchResult {
  const query = rawQuestion.trim().toLowerCase();
  if (query.length < 2) {
    return {
      ok: false,
      reason: "no-match",
      answer: NO_MATCH_ANSWER,
      href: "/contact",
    };
  }

  if (isGreeting(query)) {
    const greetingEntry = chatKnowledge.find((entry) => entry.id === "greeting");
    return {
      ok: true,
      entry: greetingEntry ?? {
        id: "greeting",
        prompts: ["hi"],
        keywords: ["hi"],
        answer: GREETING_ANSWER,
      },
      score: 100,
      answer: greetingEntry?.answer ?? GREETING_ANSWER,
      href: greetingEntry?.href,
    };
  }

  const tokens = tokenize(query);
  let best: { entry: ChatKnowledgeEntry; score: number } | null = null;

  for (const entry of chatKnowledge) {
    const score = scoreEntry(query, tokens, entry);
    if (!best || score > best.score) {
      best = { entry, score };
    }
  }

  // Require a real signal so invented/off-topic questions go to contact.
  if (!best || best.score < 4) {
    return {
      ok: false,
      reason: "no-match",
      answer: NO_MATCH_ANSWER,
      href: "/contact",
    };
  }

  return {
    ok: true,
    entry: best.entry,
    score: best.score,
    answer: best.entry.answer,
    href: best.entry.href,
  };
}
