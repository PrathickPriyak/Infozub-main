"use client";

import { useId, useRef, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFormMeta } from "@/content/contact";
import { site } from "@/content/site";
import {
  emptyContactFormValues,
  validateContactForm,
  type ContactFieldErrors,
  type ContactFormValues,
} from "@/lib/contact/schema";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";

const MESSAGE_MAX = 2000;
const DEFAULT_INTEREST = "Digital Marketing Services" as const;

const fieldControlClassName =
  "transition-[border-color,box-shadow,background-color] duration-200 focus:border-ember/50 focus:bg-white";

/**
 * Floating lead-capture panel (replaces the site chatbot).
 * Submits name, email, phone, and message to /api/contact → Excel/Sheets.
 */
export function SiteLeadPanel() {
  const panelId = useId();
  const formId = useId();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const honeypotRef = useRef<HTMLInputElement>(null);
  const submitLockRef = useRef(false);

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<ContactFormValues>(() => ({
    ...emptyContactFormValues,
    interest: DEFAULT_INTEREST,
    consent: true,
    sourcePage: pathname,
  }));
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const [isPending, startTransition] = useTransition();

  const submitting = status === "submitting" || isPending;
  const messageLength = values.message.length;

  function updateField<K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function resetForNewEnquiry() {
    const search = searchParams.toString();
    const sourcePage = search ? `${pathname}?${search}` : pathname;
    submitLockRef.current = false;
    setStatus("idle");
    setFormError(null);
    setErrors({});
    setValues({
      ...emptyContactFormValues,
      interest: DEFAULT_INTEREST,
      consent: true,
      sourcePage,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLockRef.current || submitting) return;

    setFormError(null);

    const search = searchParams.toString();
    const sourcePage =
      values.sourcePage ||
      (search ? `${pathname}?${search}` : pathname);

    const validation = validateContactForm({
      ...values,
      sourcePage,
      interest: values.interest || DEFAULT_INTEREST,
      consent: true,
    });

    if (!validation.ok) {
      setErrors(validation.errors);
      setStatus("error");
      const fieldOrder: (keyof ContactFieldErrors)[] = [
        "name",
        "email",
        "phone",
        "message",
      ];
      const firstInvalid = fieldOrder.find((key) => validation.errors[key]);
      if (firstInvalid) {
        queueMicrotask(() => {
          document.getElementById(`${formId}-${firstInvalid}`)?.focus();
        });
      }
      return;
    }

    setErrors({});
    setStatus("submitting");
    submitLockRef.current = true;

    const honeypot = honeypotRef.current?.value ?? "";

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({
            ...validation.data,
            channel: "assistant",
            website: honeypot,
            startedAt,
          }),
        });

        const payload = (await response.json()) as {
          ok?: boolean;
          error?: string;
          errors?: ContactFieldErrors;
        };

        if (!response.ok || !payload.ok) {
          submitLockRef.current = false;
          if (payload.errors) setErrors(payload.errors);
          setFormError(
            payload.error ??
              "We could not send your message. Please try again or email us.",
          );
          setStatus("error");
          return;
        }

        setStatus("success");
        setValues({
          ...emptyContactFormValues,
          interest: DEFAULT_INTEREST,
          consent: true,
          sourcePage,
        });
      } catch {
        submitLockRef.current = false;
        setFormError(
          `Network error. Please email ${site.email} or call ${site.phoneDisplay}.`,
        );
        setStatus("error");
      }
    });
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-end p-4 sm:p-6">
      <div className="pointer-events-auto flex max-w-full flex-col items-end gap-3">
        {open ? (
          <section
            id={panelId}
            aria-label="INFOZUB enquiry form"
            className="chat-panel flex h-[min(36rem,75vh)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-elevated"
          >
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-line bg-ink px-4 py-3 text-white">
              <div>
                <p className="font-display text-sm font-semibold">
                  Enquire with INFOZUB
                </p>
                <p className="text-xs text-white/70">
                  We will get back to you soon
                </p>
              </div>
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-md text-white hover:bg-white/10 focus-ring"
                aria-label="Close enquiry form"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" aria-hidden />
              </button>
            </header>

            {status === "success" ? (
              <div
                className="flex-1 overflow-y-auto px-4 py-4"
                role="status"
                aria-live="polite"
              >
                <div className="rounded-xl border border-ember/30 bg-ember-soft/60 p-5">
                  <CheckCircle2 className="size-9 text-ember" aria-hidden />
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    {contactFormMeta.successTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {contactFormMeta.successMessage}
                  </p>
                  <p className="mt-3 text-sm font-medium text-ink">
                    Call us:{" "}
                    <a
                      href={site.phoneHref}
                      className="rounded-sm text-navy underline-offset-2 hover:underline focus-ring"
                    >
                      {contactFormMeta.successPhone}
                    </a>
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-5"
                    onClick={resetForNewEnquiry}
                  >
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative flex min-h-0 flex-1 flex-col"
                noValidate
                aria-busy={submitting}
              >
                <div
                  className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor={`${formId}-website`}>Website</label>
                  <input
                    ref={honeypotRef}
                    id={`${formId}-website`}
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    defaultValue=""
                  />
                </div>

                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  <Field
                    label="Name"
                    htmlFor={`${formId}-name`}
                    error={errors.name}
                  >
                    <Input
                      id={`${formId}-name`}
                      name="name"
                      autoComplete="name"
                      required
                      disabled={submitting}
                      value={values.name}
                      placeholder="Your full name"
                      aria-invalid={Boolean(errors.name)}
                      className={fieldControlClassName}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                    />
                  </Field>

                  <Field
                    label="Email"
                    htmlFor={`${formId}-email`}
                    error={errors.email}
                  >
                    <Input
                      id={`${formId}-email`}
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      disabled={submitting}
                      value={values.email}
                      placeholder="you@company.com"
                      aria-invalid={Boolean(errors.email)}
                      className={fieldControlClassName}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                    />
                  </Field>

                  <Field
                    label="Phone"
                    htmlFor={`${formId}-phone`}
                    error={errors.phone}
                  >
                    <Input
                      id={`${formId}-phone`}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      disabled={submitting}
                      value={values.phone}
                      placeholder="+91 9XXXXXXXXX"
                      aria-invalid={Boolean(errors.phone)}
                      className={fieldControlClassName}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                    />
                  </Field>

                  <div>
                    <Field
                      label="Message"
                      htmlFor={`${formId}-message`}
                      error={errors.message}
                    >
                      <Textarea
                        id={`${formId}-message`}
                        name="message"
                        rows={3}
                        disabled={submitting}
                        value={values.message}
                        maxLength={MESSAGE_MAX}
                        placeholder="How can we help?"
                        aria-invalid={Boolean(errors.message)}
                        className={fieldControlClassName}
                        onChange={(event) =>
                          updateField("message", event.target.value)
                        }
                      />
                    </Field>
                    <p
                      className="mt-1.5 text-right text-xs text-muted"
                      aria-live="polite"
                    >
                      {messageLength}/{MESSAGE_MAX}
                    </p>
                  </div>

                  {formError ? (
                    <p
                      className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger"
                      role="alert"
                    >
                      {formError}
                    </p>
                  ) : null}
                </div>

                <div className="shrink-0 space-y-2.5 border-t border-line px-4 py-3">
                  <p className="text-xs leading-snug text-muted">
                    By submitting, you agree to be contacted by INFOZUB about
                    this enquiry.
                  </p>
                  <Button
                    type="submit"
                    variant="signal"
                    size="lg"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </section>
        ) : null}

        <Button
          type="button"
          variant="signal"
          size="lg"
          className={cn("chat-launcher shadow-elevated")}
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
              <MessageSquare className="size-4" aria-hidden />
              Enquire
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
