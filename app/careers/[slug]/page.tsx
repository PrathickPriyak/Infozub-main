import { notFound } from "next/navigation";
import { JobDetailPage } from "@/components/careers/careers-pages";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getJobBySlug, getJobSlugs } from "@/content/careers";
import { buildMetadata, missingResourceMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return missingResourceMetadata;
  return buildMetadata({
    title: job.title,
    description: job.summary,
    path: `/careers/${job.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  return (
    <>
      <JsonLdScript
        data={[
          webPageJsonLd({
            title: job.title,
            description: job.summary,
            path: `/careers/${job.slug}`,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/careers" },
            { name: job.title, path: `/careers/${job.slug}` },
          ]),
        ]}
      />
      <JobDetailPage slug={slug} />
    </>
  );
}
