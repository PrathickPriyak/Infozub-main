import { BlogIndexPage } from "@/components/blog/blog-pages";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getCategoryBySlug } from "@/content/blog";
import { pageSeo } from "@/content/seo/pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export const metadata = buildMetadata({
  title: pageSeo.blog.title,
  description: pageSeo.blog.description,
  path: pageSeo.blog.path,
});

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const category =
    params.category && getCategoryBySlug(params.category)
      ? params.category
      : undefined;

  return (
    <>
      <JsonLdScript
        data={[
          webPageJsonLd({
            title: pageSeo.blog.title,
            description: pageSeo.blog.description,
            path: "/blog",
            type: "CollectionPage",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <BlogIndexPage category={category} />
    </>
  );
}
