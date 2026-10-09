/**
 * Lead-generation CTAs and enquiry deep links.
 * Reuses /contact#contact-form — does not invent claims or stats.
 */

import type { ContactInterest } from "@/content/contact";

export const enquiryCta = {
  primary: {
    href: "/contact#contact-form",
    label: "Enquire About Digital Marketing",
  },
  consultation: {
    href: "/contact#contact-form",
    label: "Get a Free Consultation",
  },
  talk: {
    href: "/contact#contact-form",
    label: "Talk to Our Team",
  },
  sticky: {
    href: "/contact#contact-form",
    label: "Enquire Now",
  },
  course: {
    label: "Enquire About Course",
  },
} as const;

/** Build /contact deep link with optional preselected enquiry type. */
export function enquiryHref(interest?: ContactInterest): string {
  if (!interest) return "/contact#contact-form";
  return `/contact?interest=${encodeURIComponent(interest)}#contact-form`;
}

/** Map service detail slugs to enquiry types for CTA prefills. */
export function interestForServiceSlug(
  slug: string,
): ContactInterest | undefined {
  switch (slug) {
    case "google-ads":
      return "Google Ads";
    case "search-engine-optimization":
      return "SEO Services";
    case "social-media-marketing":
      return "Social Media Marketing";
    case "influencer-marketing":
    case "email-marketing":
      return "Digital Marketing Services";
    case "website-development":
      return "Other";
    default:
      return "Digital Marketing Services";
  }
}
