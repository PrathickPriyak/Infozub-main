/**
 * Contact page copy and form options from the audited Infozub /contact/ page
 * and Contact OpnForm field list. Do not invent offices, phones, or fields.
 */

import { site } from "@/content/site";
import { socialLinks } from "@/content/navigation";

export const contactSeo = {
  title: "Contact Us",
  description:
    "We offer digital marketing solutions to help you boost your brand online. Contact us today to know more about our services.",
} as const;

export const contactHero = {
  eyebrow: "Contact",
  title: "Get in Touch With INFOZUB",
  description: "Send a message or schedule a business consultation.",
} as const;

export const contactDetails = {
  emailLabel: "Email Us",
  email: site.email,
  emailHref: site.emailHref,
  phoneLabel: "Call Us",
  phone: site.phoneDisplay,
  phoneHref: site.phoneHref,
  hours: site.hours,
  followLabel: "Follow Us",
  social: socialLinks,
} as const;

/** Offices as labeled on /contact/ and the shared office block. */
export const contactOffices = [
  {
    id: "palladam",
    title: "Palladam Office",
    address: "271 A3, Chinnaiyah Garden, Kosavampalayam Road, Palladam – 641664.",
    map: {
      lat: 10.987692,
      lng: 77.272907,
      label: "INFOZUB Palladam",
    },
  },
  {
    id: "tirupur",
    title: "Tirupur Office",
    address:
      "2nd Floor, Alagendira Towers, Bungalow Stop, Tiruppur – 641602",
    map: {
      lat: 11.115207,
      lng: 77.330814,
      label: "INFOZUB Tirupur",
    },
  },
] as const;

export const contactFormMeta = {
  heading: "GET IN TOUCH",
  submitLabel: "Submit",
  successTitle: "Thank you",
  successMessage:
    "We have received your contact information. We will get in touch with you soon!",
  successPhone: site.phoneDisplay,
  /** Legacy OpnForm used on the WordPress contact page — kept as reference only. */
  legacyFormUrl: "https://forms.infozub.com/forms/contact-infozub-tgwsra",
} as const;

/** Select options from the Contact OpnForm. */
export const contactInterestOptions = [
  "Digital Marketing Suite",
  "Website Development",
  "Join Course",
  "Career",
  "Others",
] as const;

export type ContactInterest = (typeof contactInterestOptions)[number];

export const contactCta = {
  title: "Prefer to talk?",
  description: `Call ${site.phoneDisplay} or email ${site.email}. Hours: ${site.hours}.`,
} as const;

export function mapDirectionsUrl(lat: number, lng: number): string {
  const query = encodeURIComponent(`${lat},${lng}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/** Embeddable Google Maps URL for office lat/lng (no API key required). */
export function mapEmbedUrl(lat: number, lng: number, zoom = 16): string {
  const query = encodeURIComponent(`${lat},${lng}`);
  return `https://maps.google.com/maps?q=${query}&z=${zoom}&output=embed`;
}

