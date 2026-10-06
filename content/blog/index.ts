/**
 * Blog content loaders.
 *
 * Migration: drop one `{slug}.json` file per post into `content/blog/posts/`.
 * Do not put article bodies in React page components.
 *
 * CMS later: replace filesystem reads below with your CMS SDK while keeping
 * the same exported function signatures used by `/blog` routes.
 */

import fs from "node:fs";
import path from "node:path";
import categoriesJson from "@/content/blog/categories.json";
import type {
  BlogCategory,
  BlogPost,
  BlogPostSummary,
} from "@/content/blog/types";
import { sanitizeHtml } from "@/lib/security/html";
import { SITE_ORIGIN } from "@/lib/seo/site";

const postsDirectory = path.join(process.cwd(), "content/blog/posts");

export const blogSeo = {
  title: "Blog",
  description:
    "INFOZUB insights on digital marketing, growth, and company updates.",
} as const;

export const blogHero = {
  eyebrow: "Blog",
  title: "Insights from INFOZUB",
  description:
    "Articles and updates from the INFOZUB team. New posts will appear here as they are published.",
} as const;

export const blogEmpty = {
  title: "No articles published yet",
  description:
    "The previous INFOZUB website did not have public blog posts. When articles are ready, they will be listed here with categories, featured stories, and full article pages.",
  ctaLabel: "Talk to INFOZUB",
  ctaHref: "/contact",
} as const;

export const blogCategories: readonly BlogCategory[] = categoriesJson;

function isBlogPost(value: unknown): value is BlogPost {
  if (!value || typeof value !== "object") return false;
  const post = value as Partial<BlogPost>;
  return (
    typeof post.slug === "string" &&
    typeof post.title === "string" &&
    typeof post.excerpt === "string" &&
    typeof post.contentHtml === "string" &&
    typeof post.publishedAt === "string" &&
    Array.isArray(post.categories)
  );
}

function readPostFile(fileName: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed: unknown = JSON.parse(raw);
  if (!isBlogPost(parsed)) {
    console.warn(`[blog] Skipping invalid post file: ${fileName}`);
    return null;
  }
  return {
    ...parsed,
    contentHtml: sanitizeHtml(parsed.contentHtml),
  };
}

/** All published posts, newest first. Skips `_*.json` templates. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".json") && !name.startsWith("_"));

  const posts = files
    .map(readPostFile)
    .filter((post): post is BlogPost => Boolean(post));

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostSummaries(): BlogPostSummary[] {
  return getAllPosts().map((post) => {
    const { contentHtml, ...summary } = post;
    void contentHtml;
    return summary;
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.featured) ?? posts[0];
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getAllPosts().filter((post) =>
    post.categories.includes(categorySlug),
  );
}

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find((category) => category.slug === slug);
}

export function getRelatedPosts(
  slug: string,
  limit = 3,
): BlogPostSummary[] {
  const current = getPostBySlug(slug);
  const summaries = getPostSummaries().filter((post) => post.slug !== slug);
  if (!current) return summaries.slice(0, limit);

  const sameCategory = summaries.filter((post) =>
    post.categories.some((category) => current.categories.includes(category)),
  );
  const others = summaries.filter(
    (post) =>
      !post.categories.some((category) =>
        current.categories.includes(category),
      ),
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function formatPostDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getPostShareUrl(slug: string, origin?: string): string {
  const base = origin ?? SITE_ORIGIN;
  return `${base.replace(/\/$/, "")}/blog/${slug}`;
}
