import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobDetailPage } from "@/components/careers/careers-pages";
import { getJobBySlug, getJobSlugs } from "@/content/careers";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: "Role" };
  return {
    title: job.title,
    description: job.summary,
    alternates: {
      canonical: `/careers/${job.slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getJobBySlug(slug)) notFound();
  return <JobDetailPage slug={slug} />;
}
