import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { cityPages } from "@/content/services";
import { site } from "@/content/site";
import {
  CountersSection,
  ProjectClose,
  ResultsSection,
  StrengthsSection,
  TestimonialsSection,
} from "@/components/marketing/proof-sections";
import { digitalSuiteServices } from "@/content/services";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

type City = "coimbatore" | "tirupur";

export function CityServicePage({ city }: { city: City }) {
  const data = cityPages[city];

  return (
    <MarketingPage transparentHeader>
      <PageHero
        title={data.title}
        description={data.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Digital Suite", href: "/digital-suite" },
          { label: city === "coimbatore" ? "Coimbatore" : "Tirupur" },
        ]}
      >
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
            <Link href="/contact?interest=Digital%20Marketing%20Services#contact-form">
              Enquire About Digital Marketing
            </Link>
          </Button>
        </div>
      </PageHero>

      <Section tone="surface">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Why digital marketing is important?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{data.why}</p>
          <blockquote className="mt-6 border-l-2 border-ember pl-4 text-ink">
            {data.quote}
          </blockquote>
          {"closer" in data && data.closer ? (
            <p className="mt-4 font-medium text-ink">{data.closer}</p>
          ) : null}
        </Container>
      </Section>

      <Section>
        <Container>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {digitalSuiteServices.map((item) => (
              <StaggerItem key={item.slug}>
                <Card className="h-full">
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
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

