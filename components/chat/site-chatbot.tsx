"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
  href?: string;
  source?: "knowledge" | "ai" | "fallback";
};

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "bot",
  text: "Hi — welcome to INFOZUB! Ask me anything about our Digital Marketing services, Academy courses, projects, careers, or how to enquire. I focus on INFOZUB.",
};

const SUGGESTIONS = [
  "Hi",
  "What services do you offer?",
  "What Academy courses are available?",
  "How can I contact INFOZUB?",
] as const;

type ChatApiResponse = {
  ok?: boolean;
  answer?: string;
  href?: string | null;
  source?: "knowledge" | "ai" | "fallback";
  error?: string;
  suggestContact?: boolean;
};

export function SiteChatbot() {
  const panelId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const messageSeq = useRef(0);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [pending, setPending] = useState(false);

  function nextMessageId(prefix: "u" | "b"): string {
    messageSeq.current += 1;
    return `${prefix}-${messageSeq.current}`;
  }

  function scrollToBottom() {
    queueMicrotask(() => {
      const node = listRef.current;
      if (node) node.scrollTop = node.scrollHeight;
    });
  }

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || pending) return;

    const userMessage: ChatMessage = {
      id: nextMessageId("u"),
      role: "user",
      text: trimmed,
    };

    const history = [...messages, userMessage]
      .filter((message) => message.id !== "welcome")
      .slice(-8)
      .map((message) => ({ role: message.role, text: message.text }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPending(true);
    scrollToBottom();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          message: trimmed,
          history,
        }),
      });

      const payload = (await response.json()) as ChatApiResponse;

      if (!response.ok || !payload.ok || !payload.answer) {
        setMessages((prev) => [
          ...prev,
          {
            id: nextMessageId("b"),
            role: "bot",
            text:
              payload.error ??
              "Something went wrong. Please try again, or enquire via Contact.",
            href: "/contact#contact-form",
            source: "fallback",
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId("b"),
          role: "bot",
          text: payload.answer!,
          href: payload.href ?? undefined,
          source: payload.source,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId("b"),
          role: "bot",
          text: "Network error. Please try again, or use the enquiry form on Contact.",
          href: "/contact#contact-form",
          source: "fallback",
        },
      ]);
    } finally {
      setPending(false);
      scrollToBottom();
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-end p-4 sm:p-6">
      <div className="pointer-events-auto flex max-w-full flex-col items-end gap-3">
        {open ? (
          <section
            id={panelId}
            aria-label="INFOZUB site assistant"
            className="chat-panel flex h-[min(34rem,70vh)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-elevated"
          >
            <header className="flex items-center justify-between gap-3 border-b border-line bg-ink px-4 py-3 text-white">
              <div>
                <p className="font-display text-sm font-semibold">
                  INFOZUB Assistant
                </p>
                <p className="text-xs text-white/70">
                  Answers focused on INFOZUB
                </p>
              </div>
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-md text-white hover:bg-white/10 focus-ring"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" aria-hidden />
              </button>
            </header>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    message.role === "user"
                      ? "ml-auto bg-ember text-white"
                      : "bg-mist text-ink",
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  {message.href && message.role === "bot" ? (
                    <Link
                      href={message.href}
                      className="mt-2 inline-flex text-xs font-semibold text-navy underline-offset-2 hover:underline focus-ring rounded-sm"
                    >
                      Open related page
                    </Link>
                  ) : null}
                </div>
              ))}

              {pending ? (
                <div className="inline-flex items-center gap-2 rounded-2xl bg-mist px-3.5 py-2.5 text-sm text-muted">
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Thinking…
                </div>
              ) : null}

              {messages.length <= 1 && !pending ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-left text-xs font-medium text-muted transition hover:border-ember/40 hover:text-ink focus-ring"
                      onClick={() => void ask(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form
              className="border-t border-line p-3"
              onSubmit={(event) => {
                event.preventDefault();
                void ask(input);
              }}
            >
              <div className="flex gap-2">
                <label className="sr-only" htmlFor={`${panelId}-input`}>
                  Ask a question
                </label>
                <input
                  id={`${panelId}-input`}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about INFOZUB…"
                  disabled={pending}
                  maxLength={1500}
                  className="h-11 min-w-0 flex-1 rounded-md border border-input bg-surface px-3 text-sm text-ink shadow-soft focus-ring disabled:opacity-60"
                />
                <Button
                  type="submit"
                  variant="signal"
                  size="icon"
                  disabled={!input.trim() || pending}
                  aria-label="Send message"
                >
                  {pending ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : (
                    <Send className="size-4" aria-hidden />
                  )}
                </Button>
              </div>
            </form>
          </section>
        ) : null}

        <Button
          type="button"
          variant="signal"
          size="lg"
          className="chat-launcher shadow-elevated"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <>
              <X className="size-4" aria-hidden />
              Close
            </>
          ) : (
            <>
              <MessageCircle className="size-4" aria-hidden />
              Ask INFOZUB
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
