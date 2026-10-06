import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/blog/blog-pages";
import {
  getPostBySlug,
  getPostShareUrl,
  getPostSlugs,
} from "@/content/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article" };

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  const url = getPostShareUrl(slug);

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
      images: post.coverImage
        ? [
            {
              url: post.coverImage.src,
              alt: post.coverImage.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: post.coverImage ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getPostBySlug(slug)) notFound();
  return <BlogArticlePage slug={slug} />;
}
