"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { matchChatQuestion } from "@/lib/chatbot/match";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
  href?: string;
  redirectToContact?: boolean;
};

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "bot",
  text: "Hi — welcome to INFOZUB! I can answer questions from this website (services, Academy courses, projects, careers, and contact details). Ask anything about what is published here.",
};

const SUGGESTIONS = [
  "Hi",
  "What services do you offer?",
  "What Academy courses are available?",
  "How can I contact INFOZUB?",
] as const;

export function SiteChatbot() {
  const router = useRouter();
  const panelId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const messageSeq = useRef(0);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [pendingRedirect, setPendingRedirect] = useState(false);

  function nextMessageId(prefix: "u" | "b"): string {
    messageSeq.current += 1;
    return `${prefix}-${messageSeq.current}`;
  }

  useEffect(() => {
    if (!open) return;
    const node = listRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!pendingRedirect) return;
    const timer = window.setTimeout(() => {
      router.push("/contact#contact-form");
      setPendingRedirect(false);
      setOpen(false);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [pendingRedirect, router]);

  function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || pendingRedirect) return;

    const userMessage: ChatMessage = {
      id: nextMessageId("u"),
      role: "user",
      text: trimmed,
    };

    const result = matchChatQuestion(trimmed);
    const botMessage: ChatMessage = result.ok
      ? {
          id: nextMessageId("b"),
          role: "bot",
          text: result.answer,
          href: result.href,
        }
      : {
          id: nextMessageId("b"),
          role: "bot",
          text: `${result.answer} Taking you to Contact Us…`,
          href: "/contact",
          redirectToContact: true,
        };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
    if (!result.ok) setPendingRedirect(true);
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
                <p className="font-display text-sm font-semibold">INFOZUB Assistant</p>
                <p className="text-xs text-white/70">Answers from published site content</p>
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

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    message.role === "user"
                      ? "ml-auto bg-signal text-white"
                      : "bg-mist text-ink",
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  {message.href && message.role === "bot" ? (
                    <Link
                      href={message.href}
                      className="mt-2 inline-flex text-xs font-semibold text-navy underline-offset-2 hover:underline focus-ring rounded-sm"
                      onClick={() => {
                        if (message.redirectToContact) setOpen(false);
                      }}
                    >
                      {message.redirectToContact
                        ? "Go to Contact Us"
                        : "Open related page"}
                    </Link>
                  ) : null}
                </div>
              ))}

              {messages.length <= 1 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-left text-xs font-medium text-muted transition hover:border-signal/40 hover:text-ink focus-ring"
                      onClick={() => ask(suggestion)}
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
                ask(input);
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
                  disabled={pendingRedirect}
                  className="h-11 min-w-0 flex-1 rounded-md border border-input bg-surface px-3 text-sm text-ink shadow-soft focus-ring disabled:opacity-60"
                />
                <Button
                  type="submit"
                  variant="signal"
                  size="icon"
                  disabled={!input.trim() || pendingRedirect}
                  aria-label="Send message"
                >
                  <Send className="size-4" aria-hidden />
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
