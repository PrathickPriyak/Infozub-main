import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export function VenturesPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        title="Ventures"
        description="Whole new bunch of products and services, crafted in-house at INFOZUB with our 9+ years of experience."
      />
      <Section>
        <Container className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardTitle>Digital Academy</CardTitle>
            <p className="mt-3 text-sm text-muted">
              Empower the young generation with skills and real-time knowledge
              about Digital Marketing.
            </p>
            <Button asChild variant="outline" className="mt-5">
              <Link href="/academy">View courses</Link>
            </Button>
          </Card>
          <Card>
            <CardTitle>More exciting stuffs</CardTitle>
            <p className="mt-3 text-sm text-muted">Coming soon!</p>
          </Card>
        </Container>
      </Section>
    </MarketingPage>
  );
}

export function ClientsPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        title="Our clients"
        description="We love to serve our clients. Working together for effective digital solutions."
      />
      <Section>
        <Container>
          <p className="max-w-2xl text-muted">
            Named result stories are listed below. The previous clients page
            also showed a logo wall without accessible names, so those files
            are not treated as confirmed legal names here.
          </p>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/projects">View named results</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </MarketingPage>
  );
}
