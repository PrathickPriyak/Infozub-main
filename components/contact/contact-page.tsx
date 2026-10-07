import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import {
  contactCta,
  contactDetails,
  contactHero,
  contactOffices,
  mapDirectionsUrl,
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
          <Magnetic>
            <Button asChild variant="signal" size="lg">
              <a href="#contact-form">Send a message</a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <a href={site.phoneHref}>Call now</a>
            </Button>
          </Magnetic>
        </div>
      </PageHero>

      <Section tone="surface" id="details">
        <Container>
          <SectionHeader
            eyebrow="Contact details"
            title="Reach the INFOZUB team"
            description="Email, phone, or social — pick the channel that works best for you."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <a
                href={contactDetails.emailHref}
                className="contact-action-card group block h-full rounded-2xl focus-ring"
              >
                <Card interactive className="h-full">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-signal/10 text-signal">
                    <Mail className="size-5" aria-hidden />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    {contactDetails.emailLabel}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold text-ink transition group-hover:text-navy">
                    {contactDetails.email}
                  </p>
                </Card>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a
                href={contactDetails.phoneHref}
                className="contact-action-card group block h-full rounded-2xl focus-ring"
              >
                <Card interactive className="h-full">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-signal/10 text-signal">
                    <Phone className="size-5" aria-hidden />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    {contactDetails.phoneLabel}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold text-ink transition group-hover:text-navy">
                    {contactDetails.phone}
                  </p>
                  <p className="mt-2 text-sm text-muted">{contactDetails.hours}</p>
                </Card>
              </a>
            </StaggerItem>
            <StaggerItem>
              <Card
                interactive
                className="contact-action-card h-full sm:col-span-2 lg:col-span-1"
              >
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
                        className="inline-flex rounded-md border border-line px-3 py-1.5 text-sm font-medium text-muted transition hover:-translate-y-0.5 hover:border-navy/30 hover:text-ink focus-ring"
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

      <Section id="contact-form" pattern="grid">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionHeader
                eyebrow="Contact form"
                title="Send a message"
                description="Tell us about Digital Marketing Suite, Website Development, courses, careers, or anything else. We will get back to you soon."
              />
            </Reveal>
            <Reveal>
              <div className="contact-form-shell rounded-2xl border border-line bg-surface p-5 shadow-soft md:p-8">
                <ContactForm />
              </div>
            </Reveal>
            <p className="mt-6 text-center text-sm text-muted">
              Prefer email? Write to{" "}
              <a
                href={site.emailHref}
                className="rounded-sm font-semibold text-navy underline-offset-2 hover:underline focus-ring"
              >
                {site.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="surface" id="locations">
        <Container>
          <SectionHeader
            eyebrow="Address"
            title="INFOZUB BRANCHES"
            description="Our Locations"
          />
          <Stagger className="grid gap-4 md:grid-cols-2">
            {contactOffices.map((office) => (
              <StaggerItem key={office.id}>
                <div className="contact-map-card flex h-full flex-col justify-between rounded-2xl border border-line bg-mist p-5 shadow-soft sm:p-6">
                  <div>
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      <MapPin className="size-4 text-signal" aria-hidden />
                      {office.title}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink md:text-base">
                      {office.address}
                    </p>
                  </div>
                  <div className="mt-5">
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={mapDirectionsUrl(office.map.lat, office.map.lng)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in Maps
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </a>
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
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
              <Magnetic>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="border-transparent bg-white text-ink hover:bg-mist"
                >
                  <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="#contact-form">Use the form</Link>
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </Section>
    </MarketingPage>
  );
}
