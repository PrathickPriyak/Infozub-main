/**
 * Site URL and SEO constants for Infozub.
 * Use verified business identity from the WordPress audit only.
 */

import { site } from "@/content/site";
import { socialLinks } from "@/content/navigation";

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://infozub.com";

export const DEFAULT_OG_PATH = "/og/default.png";

export const TWITTER_HANDLE = "@infozubltd";

export const organizationProfile = {
  name: site.name,
  legalName: site.legalName,
  url: SITE_ORIGIN,
  email: site.email,
  telephone: "+91-99446-40033",
  foundingDate: String(site.foundedYear),
  sameAs: [
    ...socialLinks.map((item) => item.href),
    "https://twitter.com/infozubltd",
    "https://www.youtube.com/user/InfozubLtd",
    "https://academy.infozub.com",
  ],
  address: site.offices.map((office) => ({
    "@type": "PostalAddress" as const,
    addressLocality: office.city,
    streetAddress: office.address,
    addressCountry: "IN",
  })),
} as const;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}
