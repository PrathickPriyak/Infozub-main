import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  additionalServicePages,
  digitalSuiteServices,
  type ServiceRecord,
} from "@/content/services";
import { ProjectClose } from "@/components/marketing/proof-sections";

const detailed = [
  ...digitalSuiteServices.filter((item) => item.overview),
  ...additionalServicePages,
];

export function getServiceDetail(slug: string): ServiceRecord | undefined {
  return detailed.find((item) => item.slug === slug);
}

export function getServiceDetailSlugs(): string[] {
  return detailed.map((item) => item.slug);
}

export function ServiceDetailPage({ slug }: { slug: string }) {
  const service = getServiceDetail(slug);
  if (!service?.overview) {
    notFound();
  }

  const related = detailed.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <MarketingPage transparentHeader>
      <PageHero title={service.title} description={service.description}>
        <Button asChild variant="signal" size="lg">
          <Link href="/contact">Get in touch</Link>
        </Button>
      </PageHero>

      <Section tone="surface">
        <Container>
          <SectionHeader title="Overview" />
          <p className="max-w-3xl text-base leading-relaxed text-muted">
            {service.overview}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader title="Related services" />
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Card key={item.slug} interactive>
                <CardTitle>{item.title}</CardTitle>
                <Button asChild variant="link" className="mt-3 px-0">
                  <Link href={item.href}>Learn more</Link>
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      <ProjectClose />
    </MarketingPage>
  );
}
