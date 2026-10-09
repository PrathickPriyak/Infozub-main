import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectClose } from "@/components/marketing/proof-sections";
import {
  RelatedServices,
  ServiceContactCta,
  ServiceIcon,
} from "@/components/services/service-card";
import { processSteps } from "@/content/about";
import { enquiryHref, interestForServiceSlug } from "@/content/enquiry";
import {
  getRelatedServices,
  getServiceBySlug,
  getServiceDetailSlugs,
  serviceCategories,
  websiteDevelopment,
} from "@/content/services";

export { getServiceDetailSlugs };

export function getServiceDetail(slug: string) {
  const service = getServiceBySlug(slug);
  if (!service?.overview) return undefined;
  return service;
}

export function ServiceDetailPage({ slug }: { slug: string }) {
  const service = getServiceDetail(slug);
  if (!service?.overview) {
    notFound();
  }

  const category = serviceCategories.find(
    (item) => item.id === service.category,
  );
  const related = getRelatedServices(service.slug);
  const enquireHref = enquiryHref(interestForServiceSlug(service.slug));
  const processLabels =
    service.process ??
    (service.category === "paid-media" || service.category === "social-brand"
      ? processSteps.map((step) => step.title)
      : undefined);
  const processDetails =
    !service.process &&
    (service.category === "paid-media" || service.category === "social-brand")
      ? processSteps
      : undefined;

  return (
    <MarketingPage transparentHeader>
      <PageHero
        title={service.title}
        description={service.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      >
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex size-11 items-center justify-center rounded-md bg-white/10 text-white">
            <ServiceIcon slug={service.slug} className="size-5" />
          </span>
          {category ? (
            <Badge
              variant="outline"
              className="border-white/25 bg-white/5 text-white"
            >
              {category.title}
            </Badge>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="signal" size="lg">
            <Link href={enquireHref}>Enquire About Digital Marketing</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/contact#contact-form">Get a Free Consultation</Link>
          </Button>
        </div>
      </PageHero>

      <Section tone="surface">
        <Container>
          <SectionHeader title="Overview" />
          <p className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            {service.overview}
          </p>
        </Container>
      </Section>

      {service.capabilities && service.capabilities.length > 0 ? (
        <Section>
          <Container>
            <SectionHeader title="Capabilities" />
            <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {service.capabilities.map((item) => (
                <StaggerItem key={item}>
                  <div className="rounded-xl border border-line bg-mist/70 px-4 py-3 text-sm font-medium text-ink">
                    {item}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      ) : null}

      {processLabels && processLabels.length > 0 ? (
        <Section tone={service.capabilities ? "surface" : undefined}>
          <Container>
            <SectionHeader
              title="Process"
              description={
                service.process
                  ? "Published website development process."
                  : "The Digital Marketing Process published on Infozub About / Digital Suite."
              }
            />
            {processDetails ? (
              <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {processDetails.map((step, index) => (
                  <StaggerItem key={step.title}>
                    <Card className="h-full">
                      <p className="font-mono text-xs text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <CardTitle className="mt-2">{step.title}</CardTitle>
                      <CardDescription>{step.body}</CardDescription>
                    </Card>
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {processLabels.map((label, index) => (
                  <li
                    key={label}
                    className="rounded-xl border border-line bg-surface px-4 py-3"
                  >
                    <p className="font-mono text-xs text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink">{label}</p>
                  </li>
                ))}
              </ol>
            )}
          </Container>
        </Section>
      ) : null}

      {service.benefits && service.benefits.length > 0 ? (
        <Section>
          <Container>
            <SectionHeader title="Benefits" />
            <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {service.benefits.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-line bg-mist/70 px-4 py-3 text-sm font-medium text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
            {service.slug === "website-development" ? (
              <Reveal className="mt-8">
                <Button asChild variant="outline">
                  <Link href="/web">View website packages</Link>
                </Button>
                <p className="mt-3 text-sm text-muted">
                  {websiteDevelopment.packageNote}
                </p>
              </Reveal>
            ) : null}
          </Container>
        </Section>
      ) : null}

      <Section tone="surface">
        <Container>
          <SectionHeader title="Related services" />
          <RelatedServices services={related} />
          <ServiceContactCta className="mt-10" interestHref={enquireHref} />
        </Container>
      </Section>

      <ProjectClose />
    </MarketingPage>
  );
}
