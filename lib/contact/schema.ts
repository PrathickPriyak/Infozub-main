/**
 * Shared contact form schema — used by the client UI and /api/contact.
 * Keep field names stable so CRM/email adapters can map without UI changes.
 */

import {
  contactInterestOptions,
  type ContactInterest,
} from "@/content/contact";

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  interest: ContactInterest | "";
  message: string;
};

/** Payload accepted by POST /api/contact (includes spam traps). */
export type ContactSubmissionInput = ContactFormValues & {
  /** Honeypot — must stay empty. */
  website?: string;
  /** Client timestamp when the form mounted (ms). */
  startedAt?: number;
};

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

export type ContactValidationResult =
  | { ok: true; data: ContactFormValues }
  | { ok: false; errors: ContactFieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;

export function isContactInterest(
  value: string,
): value is ContactInterest {
  return (contactInterestOptions as readonly string[]).includes(value);
}

export function validateContactForm(
  input: Partial<ContactFormValues>,
): ContactValidationResult {
  const errors: ContactFieldErrors = {};

  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const phone = (input.phone ?? "").trim();
  const interest = (input.interest ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!name) errors.name = "Name is required.";
  else if (name.length < 2) errors.name = "Enter your full name.";
  else if (name.length > 120) errors.name = "Name is too long.";

  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  else if (email.length > 200) errors.email = "Email is too long.";

  if (!phone) errors.phone = "Phone number is required.";
  else if (!PHONE_RE.test(phone))
    errors.phone = "Enter a valid phone number.";
  else if (phone.replace(/\D/g, "").length < 7)
    errors.phone = "Enter a valid phone number.";

  if (!interest) errors.interest = "Please select a topic.";
  else if (!isContactInterest(interest))
    errors.interest = "Please select a valid topic.";

  if (!message) errors.message = "Message is required.";
  else if (message.length < 10)
    errors.message = "Please add a bit more detail (at least 10 characters).";
  else if (message.length > 5000) errors.message = "Message is too long.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      interest: interest as ContactInterest,
      message,
    },
  };
}

export const emptyContactFormValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
};
