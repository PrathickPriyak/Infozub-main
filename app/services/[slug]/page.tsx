import type { Metadata } from "next";
import { ServiceDetailPage, getServiceDetail, getServiceDetailSlugs } from "@/components/services/service-detail";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getServiceDetailSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getServiceDetail(slug)) notFound();
  return <ServiceDetailPage slug={slug} />;
}
