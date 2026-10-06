import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectClose } from "@/components/marketing/proof-sections";
import { ContactForm } from "@/components/contact/contact-form";
import {
  contactCta,
  contactDetails,
  contactHero,
  contactOffices,
  mapEmbedUrl,
} from "@/content/contact";
import { site } from "@/content/site";

export function ContactPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        eyebrow={contactHero.eyebrow}
        title={contactHero.title}
        description={contactHero.description}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="signal" size="lg">
            <a href="#contact-form">Send a message</a>
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

      <Section tone="surface" id="details">
        <Container>
          <SectionHeader
            eyebrow="Contact details"
            title="Contact Us"
            description={contactHero.description}
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <Card className="h-full">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  <Mail className="size-4" aria-hidden />
                  {contactDetails.emailLabel}
                </p>
                <a
                  href={contactDetails.emailHref}
                  className="mt-3 block font-display text-lg font-semibold text-ink transition hover:text-navy focus-ring rounded-sm"
                >
                  {contactDetails.email}
                </a>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="h-full">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  <Phone className="size-4" aria-hidden />
                  {contactDetails.phoneLabel}
                </p>
                <a
                  href={contactDetails.phoneHref}
                  className="mt-3 block font-display text-lg font-semibold text-ink transition hover:text-navy focus-ring rounded-sm"
                >
                  {contactDetails.phone}
                </a>
                <p className="mt-2 text-sm text-muted">{contactDetails.hours}</p>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="h-full sm:col-span-2 lg:col-span-1">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {contactDetails.followLabel}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {contactDetails.social.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-md border border-line px-3 py-1.5 text-sm font-medium text-muted transition hover:border-navy/30 hover:text-ink focus-ring"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            </StaggerItem>
          </Stagger>
        </Container>
      </Section>

      <Section id="address">
        <Container>
          <SectionHeader
            eyebrow="Address"
            title="INFOZUB BRANCHES"
            description="Our Locations"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {contactOffices.map((office) => (
              <Card key={office.id} className="h-full">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  <MapPin className="size-4" aria-hidden />
                  {office.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink md:text-base">
                  {office.address}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface" id="contact-form">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <Reveal>
              <SectionHeader
                title="Send a message"
                description="Tell us about Digital Marketing Suite, Website Development, courses, careers, or anything else."
                className="mb-0"
              />
              <p className="mt-6 text-sm text-muted">
                Prefer email? Write to{" "}
                <a
                  href={site.emailHref}
                  className="font-semibold text-navy underline-offset-2 hover:underline"
                >
                  {site.email}
                </a>
                .
              </p>
            </Reveal>
            <Reveal>
              <div className="rounded-2xl border border-line bg-surface p-5 shadow-soft md:p-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section id="locations">
        <Container>
          <SectionHeader
            eyebrow="Map"
            title="Our Locations"
            description="INFOZUB branch locations from the published contact page maps."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {contactOffices.map((office) => (
              <div key={office.id} className="overflow-hidden rounded-2xl border border-line bg-mist shadow-soft">
                <div className="border-b border-line px-4 py-3">
                  <CardTitle className="text-base">{office.title}</CardTitle>
                  <p className="mt-1 text-sm text-muted">{office.address}</p>
                </div>
                <iframe
                  title={`Map — ${office.map.label}`}
                  src={mapEmbedUrl(office.map.lat, office.map.lng)}
                  className="aspect-[4/3] w-full border-0 bg-mist"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="fullscreen"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              {contactCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/75 md:text-base">
              {contactCta.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="border-transparent bg-white text-ink hover:bg-mist"
              >
                <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#contact-form">Use the form</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ProjectClose />
    </MarketingPage>
  );
}
