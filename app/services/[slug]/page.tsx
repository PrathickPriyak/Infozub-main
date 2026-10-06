import { notFound } from "next/navigation";
import {
  ServiceDetailPage,
  getServiceDetail,
  getServiceDetailSlugs,
} from "@/components/services/service-detail";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { buildMetadata, missingResourceMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getServiceDetailSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) return missingResourceMetadata;
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLdScript
        data={[
          webPageJsonLd({
            title: service.title,
            description: service.description,
            path: `/services/${service.slug}`,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <ServiceDetailPage slug={slug} />
    </>
  );
}
