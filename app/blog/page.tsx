import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/blog/blog-pages";
import { blogSeo, getCategoryBySlug } from "@/content/blog";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export const metadata: Metadata = {
  title: blogSeo.title,
  description: blogSeo.description,
  alternates: {
    canonical: "/blog",
  },
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const category =
    params.category && getCategoryBySlug(params.category)
      ? params.category
      : undefined;

  return <BlogIndexPage category={category} />;
}
