import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/blog/blog-pages";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import {
  getPostBySlug,
  getPostSlugs,
} from "@/content/blog";
import { buildMetadata, missingResourceMetadata } from "@/lib/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return missingResourceMetadata;

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;

  return buildMetadata({
    title,
    description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    authors: post.author ? [post.author.name] : undefined,
    ogImage: post.coverImage?.src,
    ogImageAlt: post.coverImage?.alt ?? post.title,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;

  return (
    <>
      <JsonLdScript
        data={[
          articleJsonLd({
            title,
            description,
            path: `/blog/${post.slug}`,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            imageUrl: post.coverImage?.src,
            imageAlt: post.coverImage?.alt,
            authorName: post.author?.name,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <BlogArticlePage slug={slug} />
    </>
  );
}
