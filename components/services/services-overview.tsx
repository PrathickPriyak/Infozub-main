import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  CountersSection,
  ProjectClose,
  ResultsSection,
  StrengthsSection,
  TestimonialsSection,
} from "@/components/marketing/proof-sections";
import {
  additionalServicePages,
  cityPages,
  digitalSuiteIntro,
  digitalSuiteServices,
} from "@/content/services";
import { processSteps } from "@/content/about";
import { certifications } from "@/content/proof";
import { Badge } from "@/components/ui/badge";
import { site } from "@/content/site";

export function ServicesOverviewPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        title={digitalSuiteIntro.title}
        description={digitalSuiteIntro.description}
      >
        <p className="mb-6 text-white/70">{digitalSuiteIntro.closer}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="signal" size="lg">
            <a href={site.phoneHref}>Call now</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/contact">Get quote</Link>
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="What we offer"
            title="Our services"
            description="Every Digital Suite service named on the previous website, with the published one-line description."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {digitalSuiteServices.map((item) => (
              <StaggerItem key={item.slug}>
                <Card interactive className="h-full">
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  {item.overview ? (
                    <Link
                      href={item.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy"
                    >
                      Learn more
                      <ArrowRight className="size-4" />
                    </Link>
                  ) : null}
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8">
            <p className="text-sm text-muted">And much more.</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader
            title="Also published on campaign pages"
            description="Longer service write-ups that appeared on Infozub landing pages."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {additionalServicePages.map((item) => (
              <Card key={item.slug} interactive>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <Button asChild variant="link" className="mt-3 px-0">
                  <Link href={item.href}>Learn more</Link>
                </Button>
              </Card>
            ))}
          </div>
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
          <SectionHeader title="The digital marketing process" />
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
        </Container>
      </Section>

      <Section>
        <Container>
          <ul className="flex flex-wrap gap-2">
            {certifications.map((name) => (
              <li key={name}>
                <Badge variant="neutral">{name}</Badge>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <StrengthsSection />
      <CountersSection />
      <ResultsSection />
      <TestimonialsSection />
      <ProjectClose />
    </MarketingPage>
  );
}
