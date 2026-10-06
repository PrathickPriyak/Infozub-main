import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { namedResults, testimonials } from "@/content/proof";

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
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal-strong">
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

export function ClientsPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        title="Our clients"
        description="We love to serve our clients. Working together for effective digital solutions."
      />
      <Section tone="surface">
        <Container>
          <SectionHeader
            eyebrow="Named results"
            title="Campaigns published with figures"
            description="INFOZUB has published named campaign outcomes for these engagements."
          />
          <Stagger className="grid gap-5 md:grid-cols-2">
            {namedResults.map((item) => (
              <StaggerItem key={item.client}>
                <Link
                  href={item.href}
                  className="block h-full rounded-xl focus-ring"
                >
                  <Card interactive className="h-full">
                    <CardTitle>{item.client}</CardTitle>
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {item.highlights.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-signal" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8">
            <Button asChild variant="outline">
              <Link href="/projects">View project pages</Link>
            </Button>
          </Reveal>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="What our clients say"
            title="Testimonials"
            description="Reviews published on the Infozub website."
          />
          <Stagger className="grid gap-4 md:grid-cols-2">
            {testimonials.slice(0, 4).map((item) => (
              <StaggerItem key={item.name}>
                <figure className="h-full rounded-xl border border-line bg-surface p-6 shadow-soft">
                  <blockquote className="whitespace-pre-line text-sm leading-relaxed text-muted">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-ink">
                    {item.name}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/reviews">Read all reviews</Link>
            </Button>
            <Button asChild variant="signal">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </Reveal>
        </Container>
      </Section>
    </MarketingPage>
  );
}
