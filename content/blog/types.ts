/**
 * Blog content model.
 *
 * Posts live as JSON files under `content/blog/posts/` (one file per article).
 * Loaders in `content/blog/index.ts` read that folder at build time.
 *
 * Future CMS: keep these types and replace `getAllPosts()` with an API client —
 * page components should only call the loader helpers, never hardcode posts.
 */

export type BlogAuthor = {
  name: string;
  role?: string;
};

export type BlogCategory = {
  slug: string;
  title: string;
  description?: string;
};

export type BlogPost = {
  /** URL segment — preserve WordPress slug when migrating. */
  slug: string;
  title: string;
  excerpt: string;
  /** HTML from migration (WordPress `content.rendered`); sanitized on load. */
  contentHtml: string;
  /** ISO 8601 date string */
  publishedAt: string;
  updatedAt?: string;
  author?: BlogAuthor;
  /** Category slugs referencing `categories.json` */
  categories: string[];
  featured?: boolean;
  coverImage?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  } | null;
  seo?: {
    title?: string;
    description?: string;
  };
  /** Original WordPress permalink, if any */
  legacyUrl?: string;
};

export type BlogPostSummary = Omit<BlogPost, "contentHtml">;
