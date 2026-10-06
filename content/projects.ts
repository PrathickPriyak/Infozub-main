import { namedResults } from "@/content/proof";

export const projectsSeo = {
  title: "Projects",
  description:
    "Named campaign results published by INFOZUB. No additional public project entries were found on the previous website.",
} as const;

export const projects = namedResults.map((item) => ({
  slug: item.client.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  title: item.client,
  category: "Digital marketing",
  highlights: item.highlights,
}));
