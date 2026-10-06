import { absoluteUrl, organizationProfile, SITE_ORIGIN } from "@/lib/seo/site";

type JsonLdPrimitive = string | number | boolean | null;
type JsonLdValue =
  | JsonLdPrimitive
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export type JsonLd = { [key: string]: JsonLdValue };

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: organizationProfile.name,
    legalName: organizationProfile.legalName,
    url: organizationProfile.url,
    email: organizationProfile.email,
    telephone: organizationProfile.telephone,
    foundingDate: organizationProfile.foundingDate,
    logo: absoluteUrl("/og/default.png"),
    sameAs: [...organizationProfile.sameAs],
    address: organizationProfile.address.map((item) => ({ ...item })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: organizationProfile.telephone,
        contactType: "customer service",
        email: organizationProfile.email,
        areaServed: "IN",
        availableLanguage: ["en", "ta"],
      },
    ],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: "INFOZUB",
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    inLanguage: "en-US",
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(items: readonly BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export type ArticleJsonLdInput = {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  imageUrl?: string;
  imageAlt?: string;
  authorName?: string;
};

export function articleJsonLd(input: ArticleJsonLdInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    author: input.authorName
      ? {
          "@type": "Person",
          name: input.authorName,
        }
      : {
          "@type": "Organization",
          name: "INFOZUB",
        },
    publisher: {
      "@id": `${SITE_ORIGIN}/#organization`,
    },
    image: input.imageUrl
      ? {
          "@type": "ImageObject",
          url: absoluteUrl(input.imageUrl),
          caption: input.imageAlt ?? input.title,
        }
      : absoluteUrl("/og/default.png"),
  };
}

export function webPageJsonLd({
  title,
  description,
  path,
  type = "WebPage",
}: {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    about: { "@id": `${SITE_ORIGIN}/#organization` },
  };
}
