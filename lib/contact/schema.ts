/**
 * Shared contact / enquiry form schema — used by the client UI and /api/contact.
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
  /** Optional business name */
  company: string;
  interest: ContactInterest | "";
  /** Optional brief */
  message: string;
  /** Must be true to submit */
  consent: boolean;
  /** Path (+ query) where the visitor started the enquiry */
  sourcePage: string;
};

export const contactChannels = ["page", "modal"] as const;
export type ContactChannel = (typeof contactChannels)[number];

/** Payload accepted by POST /api/contact (includes spam traps). */
export type ContactSubmissionInput = ContactFormValues & {
  /** Honeypot — must stay empty. */
  website?: string;
  /** Client timestamp when the form mounted (ms). */
  startedAt?: number;
  /** Where the visitor submitted from */
  channel?: ContactChannel;
};

export function isContactChannel(value: string): value is ContactChannel {
  return (contactChannels as readonly string[]).includes(value);
}

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

export type ContactValidationResult =
  | { ok: true; data: ContactFormValues }
  | { ok: false; errors: ContactFieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Indian mobile: 10 digits starting 6–9, optional 0 / +91 / 91 prefix. */
export function isIndianMobile(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) return true;
  if (digits.length === 11 && /^0[6-9]\d{9}$/.test(digits)) return true;
  if (digits.length === 12 && /^91[6-9]\d{9}$/.test(digits)) return true;
  return false;
}

export function isContactInterest(
  value: string,
): value is ContactInterest {
  return (contactInterestOptions as readonly string[]).includes(value);
}

export function validateContactForm(
  input: Partial<Omit<ContactFormValues, "consent">> & {
    consent?: boolean | string;
  },
): ContactValidationResult {
  const errors: ContactFieldErrors = {};

  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const phone = (input.phone ?? "").trim();
  const company = (input.company ?? "").trim();
  const interest = (input.interest ?? "").trim();
  const message = (input.message ?? "").trim();
  const sourcePage = (input.sourcePage ?? "").trim().slice(0, 500);
  const consentRaw = input.consent;
  const consent =
    consentRaw === true ||
    consentRaw === "true" ||
    consentRaw === "on" ||
    consentRaw === "1";

  if (!name) errors.name = "Full name is required.";
  else if (name.length < 2) errors.name = "Enter your full name.";
  else if (name.length > 120) errors.name = "Name is too long.";

  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  else if (email.length > 200) errors.email = "Email is too long.";

  if (!phone) errors.phone = "Phone number is required.";
  else if (!isIndianMobile(phone))
    errors.phone = "Enter a valid Indian mobile number (10 digits).";

  if (company.length > 160) errors.company = "Company name is too long.";

  if (!interest) errors.interest = "Please select an enquiry type.";
  else if (!isContactInterest(interest))
    errors.interest = "Please select a valid enquiry type.";

  if (message.length > 5000) errors.message = "Message is too long.";

  if (!consent) errors.consent = "Please confirm we may contact you.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      company,
      interest: interest as ContactInterest,
      message,
      consent: true,
      sourcePage: sourcePage || "/",
    },
  };
}

export const emptyContactFormValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  interest: "",
  message: "",
  consent: false,
  sourcePage: "",
};
