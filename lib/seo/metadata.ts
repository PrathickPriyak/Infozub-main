import type { Metadata } from "next";
import {
  absoluteUrl,
  DEFAULT_OG_PATH,
  SITE_ORIGIN,
  TWITTER_HANDLE,
} from "@/lib/seo/site";

export type BuildMetadataInput = {
  /** Short title used with the root `%s | INFOZUB` template, or absolute title */
  title: string;
  description: string;
  /** Path beginning with `/` */
  path: string;
  /** When true, title is used as-is (no template suffix) */
  absoluteTitle?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
  type?: "website" | "article";
  robots?: Metadata["robots"];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  ogImage = DEFAULT_OG_PATH,
  ogImageAlt = "INFOZUB — Premier Digital Marketing Agency",
  type = "website",
  robots,
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(ogImage);
  const resolvedRobots =
    robots ??
    (noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true });

  const ogTitle = absoluteTitle ? title : `${title} | INFOZUB`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    metadataBase: new URL(SITE_ORIGIN),
    alternates: {
      canonical: path,
    },
    robots: resolvedRobots,
    openGraph:
      type === "article"
        ? {
            title: ogTitle,
            description,
            url,
            siteName: "INFOZUB",
            locale: "en_US",
            type: "article",
            publishedTime,
            modifiedTime,
            authors,
            images: [{ url: imageUrl, alt: ogImageAlt }],
          }
        : {
            title: ogTitle,
            description,
            url,
            siteName: "INFOZUB",
            locale: "en_US",
            type: "website",
            images: [{ url: imageUrl, alt: ogImageAlt }],
          },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: ogTitle,
      description,
      images: [imageUrl],
    },
  };
}
