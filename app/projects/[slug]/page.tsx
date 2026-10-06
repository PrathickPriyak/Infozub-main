import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/projects/projects-pages";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getProjectBySlug, getProjectSlugs } from "@/content/projects";
import { buildMetadata, missingResourceMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return missingResourceMetadata;
  const image = project.images[0];
  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    ogImage: image?.src,
    ogImageAlt: image?.alt ?? project.title,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLdScript
        data={[
          webPageJsonLd({
            title: project.title,
            description: project.description,
            path: `/projects/${project.slug}`,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
      <ProjectDetailPage slug={slug} />
    </>
  );
}
