import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { socialLinks } from "@/content/navigation";
import { site } from "@/content/site";

export function ContactPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        title="Get in touch with INFOZUB"
        description="Send a message or schedule a business consultation."
      />
      <Section>
        <Container className="grid gap-4 md:grid-cols-2">
          <Card>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              <Mail className="size-4" aria-hidden /> Email us
            </p>
            <a
              href={site.emailHref}
              className="mt-3 block text-lg font-semibold text-ink"
            >
              {site.email}
            </a>
          </Card>
          <Card>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              <Phone className="size-4" aria-hidden /> Call us
            </p>
            <a
              href={site.phoneHref}
              className="mt-3 block text-lg font-semibold text-ink"
            >
              {site.phoneDisplay}
            </a>
            <p className="mt-2 text-sm text-muted">{site.hours}</p>
          </Card>
          {site.offices.map((office) => (
            <Card key={office.city}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {office.city} office
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                {office.address}
              </p>
            </Card>
          ))}
        </Container>
        <Container className="mt-8">
          <Card>
            <CardTitle>Send a message</CardTitle>
            <p className="mt-2 text-sm text-muted">
              Email {site.email} with your name, phone, and how we can help —
              Digital Marketing Suite, Website Development, Join Course, Career,
              or others.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="signal">
                <a href={site.emailHref}>Email INFOZUB</a>
              </Button>
              <Button asChild variant="outline">
                <a href={site.phoneHref}>Call now</a>
              </Button>
            </div>
          </Card>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-line px-3 py-2 text-sm text-muted hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </Section>
    </MarketingPage>
  );
}

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
              <Link href="/courses">View courses</Link>
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
