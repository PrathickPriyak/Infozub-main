"use client";

import { useId, useRef, useState, useTransition } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactFormMeta,
  contactInterestOptions,
  type ContactInterest,
} from "@/content/contact";
import { site } from "@/content/site";
import {
  emptyContactFormValues,
  validateContactForm,
  type ContactFieldErrors,
  type ContactFormValues,
} from "@/lib/contact/schema";
import { cn } from "@/lib/utils";

const selectClassName = cn(
  "flex h-11 w-full rounded-md border border-input bg-surface px-3.5 py-2 text-sm text-ink shadow-soft transition-[border-color,box-shadow] duration-200 focus-ring disabled:cursor-not-allowed disabled:opacity-50",
);

const fieldControlClassName =
  "transition-[border-color,box-shadow,background-color] duration-200 focus:border-ember/50 focus:bg-white";

type FormStatus = "idle" | "submitting" | "success" | "error";

const MESSAGE_MAX = 2000;

export function ContactForm({ className }: { className?: string }) {
  const formId = useId();
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<ContactFormValues>(emptyContactFormValues);
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

  function selectInterest(interest: ContactInterest) {
    updateField("interest", interest);
    queueMicrotask(() => {
      document.getElementById(`${formId}-message`)?.focus();
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const validation = validateContactForm(values);
    if (!validation.ok) {
      setErrors(validation.errors);
      setStatus("error");
      const fieldOrder: (keyof ContactFieldErrors)[] = [
        "name",
        "email",
        "phone",
        "interest",
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

    const honeypot = honeypotRef.current?.value ?? "";

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({
            ...validation.data,
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
          if (payload.errors) setErrors(payload.errors);
          setFormError(
            payload.error ??
              "We could not send your message. Please try again or email us.",
          );
          setStatus("error");
          return;
        }

        setStatus("success");
        setValues(emptyContactFormValues);
        queueMicrotask(() => {
          document.getElementById("contact-form")?.scrollIntoView({
            block: "start",
          });
        });
      } catch {
        setFormError(
          `Network error. Please email ${site.email} or call ${site.phoneDisplay}.`,
        );
        setStatus("error");
      }
    });
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-ember/30 bg-ember-soft/60 p-6 md:p-8",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="size-10 text-ember" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
          {contactFormMeta.successTitle}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {contactFormMeta.successMessage}
        </p>
        <p className="mt-4 text-sm font-medium text-ink">
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
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative space-y-6", className)}
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

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-ink">
          What can we help you with?
        </legend>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Topic">
          {contactInterestOptions.map((option) => {
            const selected = values.interest === option;
            return (
              <button
                key={option}
                type="button"
                disabled={submitting}
                aria-pressed={selected}
                onClick={() => selectInterest(option)}
                className={cn(
                  "rounded-full border px-3.5 py-2 text-left text-sm font-medium transition focus-ring disabled:opacity-50",
                  selected
                    ? "border-ember bg-ember text-white shadow-soft"
                    : "border-line bg-surface text-muted hover:border-navy/30 hover:text-ink",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
        {errors.interest ? (
          <p className="text-sm text-danger" role="alert">
            {errors.interest}
          </p>
        ) : null}
        <input
          id={`${formId}-interest`}
          name="interest"
          type="hidden"
          value={values.interest}
          required
        />
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor={`${formId}-name`} error={errors.name}>
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
            onChange={(event) => updateField("name", event.target.value)}
          />
        </Field>

        <Field label="Email" htmlFor={`${formId}-email`} error={errors.email}>
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
            onChange={(event) => updateField("email", event.target.value)}
          />
        </Field>
      </div>

      <Field
        label="Phone Number"
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
          placeholder="+91 …"
          aria-invalid={Boolean(errors.phone)}
          className={fieldControlClassName}
          onChange={(event) => updateField("phone", event.target.value)}
        />
      </Field>

      {/* Keep a native select for progressive enhancement / autofill parity */}
      <div className="sr-only">
        <label htmlFor={`${formId}-interest-select`}>Topic</label>
        <select
          id={`${formId}-interest-select`}
          className={selectClassName}
          value={values.interest}
          disabled={submitting}
          onChange={(event) =>
            updateField(
              "interest",
              event.target.value as ContactFormValues["interest"],
            )
          }
        >
          <option value="" disabled>
            Select a topic
          </option>
          {contactInterestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Field
          label="Message"
          htmlFor={`${formId}-message`}
          error={errors.message}
        >
          <Textarea
            id={`${formId}-message`}
            name="message"
            required
            rows={6}
            disabled={submitting}
            value={values.message}
            maxLength={MESSAGE_MAX}
            placeholder="Share a short brief — goals, timeline, or questions."
            aria-invalid={Boolean(errors.message)}
            className={fieldControlClassName}
            onChange={(event) => updateField("message", event.target.value)}
          />
        </Field>
        <p className="mt-2 text-right text-xs text-muted" aria-live="polite">
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

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <Button type="submit" variant="signal" size="lg" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            contactFormMeta.submitLabel
          )}
        </Button>
        <p className="text-xs text-muted">
          Or email{" "}
          <a
            href={site.emailHref}
            className="rounded-sm font-semibold text-navy underline-offset-2 hover:underline focus-ring"
          >
            {site.email}
          </a>
        </p>
      </div>
    </form>
  );
}
