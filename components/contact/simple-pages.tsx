import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export function VenturesPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        title="Ventures"
        description="Whole new bunch of products and services, crafted in-house at INFOZUB with our 9+ years of experience."
      />
      <Section>
        <Container className="grid gap-4 md:grid-cols-2">
          <Card className="h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
              Current venture
            </p>
            <CardTitle className="mt-3">Digital Academy</CardTitle>
            <CardDescription>
              Empower the young generation with skills and real-time knowledge
              about Digital Marketing.
            </CardDescription>
            <Button asChild variant="signal" className="mt-6">
              <Link href="/academy">View courses</Link>
            </Button>
          </Card>
          <Card className="h-full border-line bg-mist/50">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Next
            </p>
            <CardTitle className="mt-3">More exciting stuffs</CardTitle>
            <CardDescription>Coming soon!</CardDescription>
          </Card>
        </Container>
      </Section>
    </MarketingPage>
  );
}

export { ClientsPage } from "@/components/clients/clients-page";
