import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/content/blog";
import { getJobSlugs } from "@/content/careers";
import { getProjectSlugs } from "@/content/projects";
import { getServiceDetailSlugs } from "@/content/services";
import { absoluteUrl } from "@/lib/seo/site";

/** Public marketing URLs preserved or introduced in the Next.js rebuild. */
const staticRoutes = [
  "/",
  "/about",
  "/digital-suite",
  "/digital-suite/coimbatore",
  "/digital-suite/tirupur",
  "/academy",
  "/services",
  "/web",
  "/projects",
  "/blog",
  "/ventures",
  "/clients",
  "/reviews",
  "/careers",
  "/careers/apply",
  "/contact",
  "/payments",
  "/terms",
  "/privacy-policy",
  "/copyrights",
  "/thanks",
  "/infozub-landing-page",
  "/infozub-digital-marketing",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));

  const serviceEntries: MetadataRoute.Sitemap = getServiceDetailSlugs().map(
    (slug) => ({
      url: absoluteUrl(`/services/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    }),
  );

  const projectEntries: MetadataRoute.Sitemap = getProjectSlugs().map(
    (slug) => ({
      url: absoluteUrl(`/projects/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const jobEntries: MetadataRoute.Sitemap = getJobSlugs().map((slug) => ({
    url: absoluteUrl(`/careers/${slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const blogEntries: MetadataRoute.Sitemap = getPostSlugs().map((slug) => ({
    url: absoluteUrl(`/blog/${slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...projectEntries,
    ...jobEntries,
    ...blogEntries,
  ];
}
