/**
 * Contact delivery adapter.
 * Swap or extend `deliverContactSubmission` to connect email, CRM, Sheets,
 * or OpnForm without changing the contact form UI.
 *
 * Secrets (webhook URLs, API keys) must live in server env only.
 */

import type {
  ContactChannel,
  ContactFormValues,
} from "@/lib/contact/schema";
import { assertSafeWebhookUrl } from "@/lib/security/webhook-url";

export type ContactDeliveryResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

export type ContactDeliveryContext = {
  /** ISO timestamp */
  receivedAt: string;
  /** Best-effort client IP (may be empty behind some proxies) */
  ip?: string;
  userAgent?: string;
  channel?: ContactChannel;
};

const WEBHOOK_TIMEOUT_MS = 8_000;

/** Flat row shape for Google Sheets / Excel-friendly webhooks. */
export function buildEnquirySheetRow(
  data: ContactFormValues,
  context: ContactDeliveryContext,
) {
  return {
    timestamp: context.receivedAt,
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    enquiryType: data.interest,
    message: data.message,
    sourcePage: data.sourcePage,
    channel: context.channel ?? "page",
    consent: data.consent ? "Yes" : "No",
  };
}

/**
 * POST JSON to CONTACT_FORM_WEBHOOK_URL when configured.
 * Point this at the Google Apps Script web app from docs/enquiry-google-sheet.gs
 * to append each enquiry as a spreadsheet row (File → Download → Excel).
 *
 * Optional: CONTACT_FORM_WEBHOOK_TOKEN (sent as Bearer)
 */
async function deliverViaWebhook(
  data: ContactFormValues,
  context: ContactDeliveryContext,
): Promise<ContactDeliveryResult | null> {
  const url = process.env.CONTACT_FORM_WEBHOOK_URL?.trim();
  if (!url) return null;

  const safeUrl = await assertSafeWebhookUrl(url);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = process.env.CONTACT_FORM_WEBHOOK_TOKEN?.trim();
  if (token) headers.Authorization = `Bearer ${token}`;

  const sheetRow = buildEnquirySheetRow(data, context);

  const response = await fetch(safeUrl, {
    method: "POST",
    headers,
    // Google Apps Script web apps often 302; follow redirects.
    body: JSON.stringify({
      source: "infozub-website",
      form: context.channel === "modal" ? "enquiry-modal" : "contact",
      ...data,
      channel: context.channel ?? "page",
      sheetRow,
      meta: {
        receivedAt: context.receivedAt,
        ip: context.ip,
        userAgent: context.userAgent,
      },
    }),
    redirect: "follow",
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });

  if (!response.ok) {
    console.error("[contact] webhook failed", response.status);
    return { ok: false, error: "Delivery failed. Please try again or email us." };
  }

  return { ok: true };
}

export async function deliverContactSubmission(
  data: ContactFormValues,
  context: ContactDeliveryContext,
): Promise<ContactDeliveryResult> {
  try {
    const webhookResult = await deliverViaWebhook(data, context);
    if (webhookResult) return webhookResult;

    // No webhook configured yet — accept so the UI can be verified.
    // Operators should set CONTACT_FORM_WEBHOOK_URL for spreadsheet delivery.
    // Do not log email, phone, name, or message (PII).
    console.info("[contact] submission accepted (no webhook configured)", {
      interest: data.interest,
      sourcePage: data.sourcePage,
      channel: context.channel ?? "page",
      receivedAt: context.receivedAt,
    });
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "delivery error";
    console.error("[contact] delivery error", message);
    return {
      ok: false,
      error: "Something went wrong. Please email info@infozub.com.",
    };
  }
}
