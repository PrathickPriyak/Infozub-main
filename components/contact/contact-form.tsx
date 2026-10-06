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
  "flex h-11 w-full rounded-md border border-input bg-surface px-3.5 py-2 text-sm text-ink shadow-soft transition-colors focus-ring disabled:cursor-not-allowed disabled:opacity-50",
);

type FormStatus = "idle" | "submitting" | "success" | "error";

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const validation = validateContactForm(values);
    if (!validation.ok) {
      setErrors(validation.errors);
      setStatus("error");
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
          "rounded-2xl border border-signal/30 bg-signal-soft/50 p-6 md:p-8",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="size-10 text-signal-strong" aria-hidden />
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
            className="text-navy underline-offset-2 hover:underline"
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
      className={cn("relative space-y-5", className)}
      noValidate
      aria-busy={submitting}
    >
      <h3 className="font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
        {contactFormMeta.heading}
      </h3>

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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor={`${formId}-name`} error={errors.name}>
          <Input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            disabled={submitting}
            value={values.name}
            aria-invalid={Boolean(errors.name)}
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
            aria-invalid={Boolean(errors.email)}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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
            aria-invalid={Boolean(errors.phone)}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </Field>

        <Field
          label="Select"
          htmlFor={`${formId}-interest`}
          error={errors.interest}
          hint="What can we help you with?"
        >
          <select
            id={`${formId}-interest`}
            name="interest"
            required
            disabled={submitting}
            className={selectClassName}
            value={values.interest}
            aria-invalid={Boolean(errors.interest)}
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
        </Field>
      </div>

      <Field
        label="Message"
        htmlFor={`${formId}-message`}
        error={errors.message}
      >
        <Textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={5}
          disabled={submitting}
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          onChange={(event) => updateField("message", event.target.value)}
        />
      </Field>

      {formError ? (
        <p
          className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger"
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
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
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            {site.email}
          </a>
        </p>
      </div>
    </form>
  );
}
