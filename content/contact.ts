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
    /** Google Maps pin from /contact/ embeds (Palladam-area coordinates). */
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
    /** Google Maps pin from /contact/ embeds (Tirupur-area coordinates). */
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

/**
 * Visual pathways on /contact — labels match OpnForm interests;
 * images are existing site assets (projects / Academy).
 */
export const contactPathways = [
  {
    id: "digital-marketing",
    label: "Digital Marketing Suite",
    description: "Ask about campaigns, leads, and brand growth.",
    href: "/digital-suite",
    image: "/projects/suzuki-motorcycle.webp",
    imageAlt: "Suzuki Motorcycle Tamilnadu project work",
  },
  {
    id: "website",
    label: "Website Development",
    description: "Talk to us about websites and digital presence.",
    href: "/services",
    image: "/projects/bharath-electronics.webp",
    imageAlt: "Bharath Electronics and Appliances project work",
  },
  {
    id: "course",
    label: "Join Course",
    description: "Enquire about INFOZUB Academy training.",
    href: "/academy",
    image: "/academy/smm.webp",
    imageAlt: "Social Media Marketing course",
  },
  {
    id: "career",
    label: "Career",
    description: "Reach the team about openings at INFOZUB.",
    href: "/careers",
    image: "/academy/interview.webp",
    imageAlt: "Interview Success Formula course",
  },
] as const;

export const contactHeroVisuals = [
  {
    src: "/brand/infozub-logo.jpg",
    alt: "INFOZUB — Your Targeted Marketing Partner",
    className: "contact-hero-shot contact-hero-shot-main",
  },
  {
    src: "/projects/suzuki-motorcycle-thumb.webp",
    alt: "Suzuki Motorcycle Tamilnadu project",
    className: "contact-hero-shot contact-hero-shot-a",
  },
  {
    src: "/academy/google-ads.webp",
    alt: "Google Ads Academy course",
    className: "contact-hero-shot contact-hero-shot-b",
  },
] as const;

export function mapEmbedUrl(lat: number, lng: number): string {
  const query = encodeURIComponent(`${lat},${lng}`);
  return `https://maps.google.com/maps?q=${query}&z=15&output=embed`;
}

export function mapDirectionsUrl(lat: number, lng: number): string {
  const query = encodeURIComponent(`${lat},${lng}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/** Side gallery beside the contact form — verified brand / project / Academy assets. */
export const contactFormGallery = [
  {
    src: "/academy/web-design.webp",
    alt: "Web Design Academy course",
  },
  {
    src: "/projects/bharath-electronics-thumb.webp",
    alt: "Bharath Electronics and Appliances project",
  },
  {
    src: "/academy/canva.webp",
    alt: "Canva Master Course",
  },
] as const;
