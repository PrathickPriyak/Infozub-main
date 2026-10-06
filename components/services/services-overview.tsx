import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  ProjectClose,
  StrengthsSection,
} from "@/components/marketing/proof-sections";
import {
  RelatedServices,
  ServiceCard,
  ServiceContactCta,
} from "@/components/services/service-card";
import {
  allServices,
  cityPages,
  digitalMarketingProcess,
  serviceCategories,
  serviceDetailPages,
  servicesPageIntro,
} from "@/content/services";
import { processSteps } from "@/content/about";
import { site } from "@/content/site";

export function ServicesOverviewPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        eyebrow={servicesPageIntro.eyebrow}
        title={servicesPageIntro.title}
        description={servicesPageIntro.description}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="signal" size="lg">
            <Link href="/contact">Get quote</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            <a href={site.phoneHref}>Call now</a>
          </Button>
        </div>
      </PageHero>

      <Section tone="surface">
        <Container>
          <SectionHeader
            eyebrow="Overview"
            title="Our services"
            description="Get brand growth, connect with your target audience and meet your revenue goals with are following services"
          />
          <div className="flex flex-wrap gap-2">
            {serviceCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink transition hover:border-navy/30 focus-ring"
              >
                {category.title}
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {serviceCategories.map((category) => {
        const items = allServices.filter(
          (service) => service.category === category.id,
        );
        if (items.length === 0) return null;

        return (
          <Section key={category.id} id={category.id}>
            <Container>
              <SectionHeader
                eyebrow="Category"
                title={category.title}
                description={category.description}
              />
              <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service) => (
                  <StaggerItem key={service.slug}>
                    <ServiceCard service={service} />
                  </StaggerItem>
                ))}
              </Stagger>
            </Container>
          </Section>
        );
      })}

      <Section tone="surface">
        <Container>
          <SectionHeader
            title="The digital marketing process"
            description="Build, Operate and Manage — the working model published with Digital Suite."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
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
          <Reveal className="mt-6">
            <ul className="flex flex-wrap gap-2" aria-label="Process steps">
              {digitalMarketingProcess.map((label) => (
                <li key={label}>
                  <Badge variant="neutral">{label}</Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader title="We expanded our digital marketing service" />
          <div className="grid gap-4 md:grid-cols-2">
            <Card interactive>
              <CardTitle>Digital Marketing Agency in Coimbatore</CardTitle>
              <CardDescription>{cityPages.coimbatore.quote}</CardDescription>
              <Button asChild variant="outline" className="mt-5">
                <Link href="/digital-suite/coimbatore">Coimbatore</Link>
              </Button>
            </Card>
            <Card interactive>
              <CardTitle>Digital Marketing Agency in Tirupur</CardTitle>
              <CardDescription>{cityPages.tirupur.quote}</CardDescription>
              <Button asChild variant="outline" className="mt-5">
                <Link href="/digital-suite/tirupur">Tirupur</Link>
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader
            title="Explore detailed services"
            description="Longer write-ups for Google Ads, social, SEO, email, influencer marketing, and website development."
          />
          <RelatedServices services={serviceDetailPages} />
          <ServiceContactCta className="mt-10" />
        </Container>
      </Section>

      <StrengthsSection />
      <ProjectClose />
    </MarketingPage>
  );
}
