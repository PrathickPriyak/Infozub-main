/**
 * Named campaign results from the audited Infozub site.
 * Only Suzuki Motorcycle (Tamilnadu) and Bharath Electronics and Appliances
 * were published with figures — do not invent additional case studies.
 */

export const projectsSeo = {
  title: "Projects",
  description:
    "Named campaign results published by INFOZUB — Suzuki Motorcycle (Tamilnadu) and Bharath Electronics and Appliances.",
} as const;

export type ProjectCategoryId = "automotive" | "electronics";

export type ProjectImage = {
  src: string;
  thumbSrc: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectRecord = {
  slug: string;
  title: string;
  category: ProjectCategoryId;
  categoryLabel: string;
  description: string;
  services: readonly string[];
  results: readonly string[];
  images: readonly ProjectImage[];
  /** No public external project URLs were published on the old site. */
  externalUrl?: string;
};

export const projectCategories = [
  { id: "all" as const, label: "All" },
  { id: "automotive" as const, label: "Automotive" },
  { id: "electronics" as const, label: "Electronics" },
] as const;

export const projects: readonly ProjectRecord[] = [
  {
    slug: "suzuki-motorcycle-tamilnadu",
    title: "Suzuki Motorcycle (Tamilnadu)",
    category: "automotive",
    categoryLabel: "Automotive",
    description:
      "Named campaign results published on INFOZUB for Suzuki Motorcycle (Tamilnadu).",
    services: ["Digital marketing", "Tele calling"],
    results: [
      "84,000+ Leads Generated",
      "52,000+ Leads Verified (Tele Calling)",
      "3200+ Vehicles Booked",
    ],
    images: [
      {
        src: "/projects/suzuki-motorcycle.webp",
        thumbSrc: "/projects/suzuki-motorcycle-thumb.webp",
        alt: "Suzuki Motorcycle Tamilnadu campaign visual",
        width: 1280,
        height: 860,
      },
    ],
  },
  {
    slug: "bharath-electronics-and-appliances",
    title: "Bharath Electronics and Appliances",
    category: "electronics",
    categoryLabel: "Electronics",
    description:
      "Named campaign results published on INFOZUB for Bharath Electronics and Appliances.",
    services: ["Digital marketing"],
    results: [
      "40,000+ Leads Generated",
      "1M+ Digital Impressions / Month",
      "State-of-the-Art Technology Support",
    ],
    images: [
      {
        src: "/projects/bharath-electronics.webp",
        thumbSrc: "/projects/bharath-electronics-thumb.webp",
        alt: "Bharath Electronics and Appliances logo",
        width: 960,
        height: 720,
      },
    ],
  },
] as const;

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export function getRelatedProjects(
  slug: string,
  limit = 1,
): readonly ProjectRecord[] {
  return projects.filter((project) => project.slug !== slug).slice(0, limit);
}

/** Filter shown when more than one category is represented. */
export const showProjectFilters =
  new Set(projects.map((project) => project.category)).size > 1;
