import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
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
          <Magnetic>
            <Button asChild variant="signal" size="lg" className="cta-pulse">
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

      <Section tone="surface" id="details" pattern="dots">
        <Container>
          <SectionHeader
            eyebrow="Contact details"
            title="Contact Us"
            description="Reach the INFOZUB team by email, phone, or social channels."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <Card interactive className="contact-action-card h-full">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  <Mail className="size-4 text-signal" aria-hidden />
                  {contactDetails.emailLabel}
                </p>
                <a
                  href={contactDetails.emailHref}
                  className="mt-3 block rounded-sm font-display text-lg font-semibold text-ink transition hover:text-navy focus-ring"
                >
                  {contactDetails.email}
                </a>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card interactive className="contact-action-card h-full">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  <Phone className="size-4 text-signal" aria-hidden />
                  {contactDetails.phoneLabel}
                </p>
                <a
                  href={contactDetails.phoneHref}
                  className="mt-3 block rounded-sm font-display text-lg font-semibold text-ink transition hover:text-navy focus-ring"
                >
                  {contactDetails.phone}
                </a>
                <p className="mt-2 text-sm text-muted">{contactDetails.hours}</p>
              </Card>
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

      <Section tone="surface" id="contact-form">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
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
                  className="rounded-sm font-semibold text-navy underline-offset-2 hover:underline focus-ring"
                >
                  {site.email}
                </a>
                .
              </p>
              <div className="contact-brand-panel relative mt-8 overflow-hidden rounded-2xl border border-navy/20 bg-ink shadow-elevated">
                <Image
                  src="/brand/infozub-logo.jpg"
                  alt="INFOZUB — Your Targeted Marketing Partner"
                  width={1200}
                  height={900}
                  className="h-auto w-full object-cover"
                  priority={false}
                />
              </div>
            </Reveal>
            <Reveal>
              <div className="contact-form-shell rounded-2xl border border-line bg-surface p-5 shadow-soft md:p-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section id="locations" pattern="grid">
        <Container>
          <SectionHeader
            eyebrow="Address"
            title="INFOZUB BRANCHES"
            description="Our Locations"
          />
          <Stagger className="grid gap-6 lg:grid-cols-2">
            {contactOffices.map((office) => (
              <StaggerItem key={office.id}>
                <div className="contact-map-card overflow-hidden rounded-2xl border border-line bg-mist shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-elevated">
                  <div className="border-b border-line px-4 py-4 sm:px-5">
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      <MapPin className="size-4 text-signal" aria-hidden />
                      {office.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink md:text-base">
                      {office.address}
                    </p>
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
