/**
 * Contact delivery adapter.
 * Swap or extend `deliverContactSubmission` to connect email, CRM, or OpnForm
 * without changing the contact form UI.
 *
 * Secrets (webhook URLs, API keys) must live in server env only.
 */

import type { ContactFormValues } from "@/lib/contact/schema";

export type ContactDeliveryResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

export type ContactDeliveryContext = {
  /** ISO timestamp */
  receivedAt: string;
  /** Best-effort client IP (may be empty behind some proxies) */
  ip?: string;
  userAgent?: string;
};

/**
 * POST JSON to CONTACT_FORM_WEBHOOK_URL when configured.
 * Expected env (server-only): CONTACT_FORM_WEBHOOK_URL
 * Optional: CONTACT_FORM_WEBHOOK_TOKEN (sent as Bearer)
 */
async function deliverViaWebhook(
  data: ContactFormValues,
  context: ContactDeliveryContext,
): Promise<ContactDeliveryResult | null> {
  const url = process.env.CONTACT_FORM_WEBHOOK_URL;
  if (!url) return null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = process.env.CONTACT_FORM_WEBHOOK_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      source: "infozub-website",
      form: "contact",
      ...data,
      meta: context,
    }),
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
    // Operators should set CONTACT_FORM_WEBHOOK_URL for production delivery.
    console.info("[contact] submission accepted (no webhook configured)", {
      interest: data.interest,
      email: data.email,
      receivedAt: context.receivedAt,
    });
    return { ok: true, id: `local-${Date.now()}` };
  } catch (error) {
    console.error("[contact] delivery error", error);
    return {
      ok: false,
      error: "Something went wrong. Please email info@infozub.com.",
    };
  }
}
