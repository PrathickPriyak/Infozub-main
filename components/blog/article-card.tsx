import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  blogCategories,
  formatPostDate,
} from "@/content/blog";
import type { BlogPostSummary } from "@/content/blog/types";
import { cn } from "@/lib/utils";

function categoryTitle(slug: string): string {
  return (
    blogCategories.find((category) => category.slug === slug)?.title ?? slug
  );
}

type ArticleCardProps = {
  post: BlogPostSummary;
  className?: string;
  featured?: boolean;
};

export function ArticleCard({
  post,
  className,
  featured = false,
}: ArticleCardProps) {
  return (
    <Card
      interactive
      className={cn(
        "group flex h-full flex-col overflow-hidden p-0",
        featured && "sm:flex-row",
        className,
      )}
    >
      {post.coverImage ? (
        <div
          className={cn(
            "relative overflow-hidden bg-mist media-zoom",
            featured ? "aspect-[16/10] sm:w-[44%] sm:aspect-auto sm:min-h-[240px]" : "aspect-[16/10]",
          )}
        >
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 44vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {post.categories.map((category) => (
            <Badge key={category} variant="neutral">
              {categoryTitle(category)}
            </Badge>
          ))}
          {featured ? <Badge variant="signal">Featured</Badge> : null}
        </div>

        <CardTitle className="mt-4 transition-colors group-hover:text-navy">
          <Link
            href={`/blog/${post.slug}`}
            className="focus-ring rounded-sm"
          >
            {post.title}
          </Link>
        </CardTitle>

        <CardDescription className="flex-1">{post.excerpt}</CardDescription>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <p>
            {post.author ? `${post.author.name} · ` : null}
            <time dateTime={post.publishedAt}>
              {formatPostDate(post.publishedAt)}
            </time>
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-navy transition group-hover:text-signal-strong focus-ring rounded-sm"
          >
            Read
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </Card>
  );
}

type CategoryFilterProps = {
  active?: string;
  counts: Record<string, number>;
};

export function BlogCategoryFilter({
  active,
  counts,
}: CategoryFilterProps) {
  const visible = blogCategories.filter(
    (category) => (counts[category.slug] ?? 0) > 0,
  );
  if (visible.length === 0) return null;

  return (
    <div
      className="flex flex-wrap gap-2"
      role="navigation"
      aria-label="Blog categories"
    >
      <Link
        href="/blog"
        className={cn(
          "rounded-md border px-3.5 py-2 text-sm font-medium transition focus-ring",
          !active
            ? "border-navy bg-navy text-white"
            : "border-line bg-surface text-ink hover:border-navy/30",
        )}
      >
        All
      </Link>
      {visible.map((category) => {
        const isActive = active === category.slug;
        return (
          <Link
            key={category.slug}
            href={`/blog?category=${category.slug}`}
            className={cn(
              "rounded-md border px-3.5 py-2 text-sm font-medium transition focus-ring",
              isActive
                ? "border-navy bg-navy text-white"
                : "border-line bg-surface text-ink hover:border-navy/30",
            )}
          >
            {category.title}
            <span className="ml-1.5 text-xs opacity-70">
              {counts[category.slug]}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
