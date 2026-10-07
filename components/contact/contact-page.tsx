import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Magnetic } from "@/components/motion/magnetic";
import { MediaZoom } from "@/components/motion/media-zoom";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ContactForm } from "@/components/contact/contact-form";
import {
  contactCta,
  contactDetails,
  contactHero,
  contactHeroVisuals,
  contactOffices,
  contactPathways,
  mapEmbedUrl,
} from "@/content/contact";
import { site } from "@/content/site";

export function ContactPage() {
  return (
    <MarketingPage transparentHeader>
      <ContactHero />

      <Section tone="surface" id="details" pattern="dots">
        <Container>
          <SectionHeader
            eyebrow="Contact details"
            title="Contact Us"
            description="Reach the INFOZUB team by email, phone, or social channels."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <a
                href={contactDetails.emailHref}
                className="contact-action-card group block h-full rounded-2xl focus-ring"
              >
                <Card interactive className="h-full">
                  <span className="contact-icon-bob inline-flex size-11 items-center justify-center rounded-full bg-signal/10 text-signal">
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
                  <span className="contact-icon-bob contact-icon-bob-delay inline-flex size-11 items-center justify-center rounded-full bg-signal/10 text-signal">
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

      <Section id="pathways" pattern="grid">
        <Container>
          <SectionHeader
            eyebrow="How can we help?"
            title="Pick a topic, then send a message"
            description="These match the interests on our contact form — choose one to explore, or jump straight to the form."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactPathways.map((pathway) => (
              <StaggerItem key={pathway.id}>
                <Link
                  href={`${pathway.href}`}
                  className="contact-pathway group relative block overflow-hidden rounded-2xl border border-line bg-mist shadow-soft focus-ring"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <MediaZoom className="absolute inset-0 size-full">
                      <Image
                        src={pathway.image}
                        alt={pathway.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </MediaZoom>
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
                      aria-hidden
                    />
                    <span className="contact-pathway-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="font-display text-base font-semibold">
                      {pathway.label}
                    </p>
                    <p className="mt-1 text-xs text-white/75">{pathway.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-signal">
                      Explore
                      <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-8 text-center">
            <Magnetic>
              <Button asChild variant="signal" size="lg" className="cta-pulse">
                <a href="#contact-form">Or write to us now</a>
              </Button>
            </Magnetic>
          </div>
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
                <div
                  className="pointer-events-none absolute inset-0 contact-brand-sheen"
                  aria-hidden
                />
              </div>
              <ul className="mt-6 space-y-3 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden />
                  <span>{site.offices[0]?.address}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden />
                  <span>{site.offices[1]?.address}</span>
                </li>
              </ul>
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
                <div className="contact-map-card group overflow-hidden rounded-2xl border border-line bg-mist shadow-soft">
                  <div className="border-b border-line px-4 py-4 sm:px-5">
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      <MapPin className="size-4 text-signal" aria-hidden />
                      {office.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink md:text-base">
                      {office.address}
                    </p>
                  </div>
                  <div className="relative overflow-hidden">
                    <iframe
                      title={`Map — ${office.map.label}`}
                      src={mapEmbedUrl(office.map.lat, office.map.lng)}
                      className="aspect-[4/3] w-full border-0 bg-mist transition duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="fullscreen"
                      allowFullScreen
                    />
                    <span
                      className="contact-map-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
                      aria-hidden
                    />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="ink">
        <Container className="relative text-center">
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden
          >
            <div className="ambient-orb absolute left-1/4 top-0 size-48 -translate-x-1/2 rounded-full bg-navy blur-3xl" />
            <div className="ambient-orb ambient-orb-delayed absolute right-1/4 bottom-0 size-40 rounded-full bg-signal/20 blur-3xl" />
          </div>
          <Reveal>
            <h2 className="relative font-display text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              {contactCta.title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-sm text-white/75 md:text-base">
              {contactCta.description}
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
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

function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
      >
        <div className="ambient-orb absolute -left-24 top-0 size-[28rem] rounded-full bg-navy blur-3xl" />
        <div className="ambient-orb ambient-orb-delayed absolute bottom-0 right-0 size-[22rem] rounded-full bg-signal/25 blur-3xl" />
        <div className="absolute inset-0 bg-grid-fade opacity-40" />
        <span className="hero-float-chip absolute left-[10%] top-[30%] size-3 rounded-full border border-signal/50 bg-signal/30" />
        <span className="hero-float-chip hero-float-chip-delay absolute right-[22%] top-[20%] size-2 rounded-full bg-white/40" />
        <span className="hero-float-chip hero-float-chip-slow absolute bottom-[22%] left-[36%] size-2.5 rounded-full border border-white/30" />
        <span className="hero-target-ring absolute right-[12%] top-[48%] size-20 rounded-full border border-signal/25" />
        <span className="hero-target-ring hero-target-ring-delay absolute right-[10%] top-[46%] size-28 rounded-full border border-white/10" />
      </div>

      <Container className="relative grid min-w-0 items-center gap-10 pb-14 pt-24 sm:gap-12 sm:pb-16 sm:pt-28 md:pb-24 md:pt-32 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal mode="mount">
          <Badge
            variant="outline"
            className="border-white/20 bg-white/5 text-white"
          >
            {contactHero.eyebrow}
          </Badge>
          <TextReveal
            as="h1"
            text={contactHero.title}
            className="mt-4 block max-w-xl font-display text-3xl font-semibold tracking-tight !text-white sm:mt-5 sm:text-4xl md:text-5xl"
          />
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:mt-5 sm:text-lg">
            {contactHero.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
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
        </Reveal>

        <Reveal mode="mount" delay={0.08}>
          <div className="contact-hero-collage relative mx-auto aspect-[5/4] w-full max-w-lg">
            {contactHeroVisuals.map((shot) => (
              <div key={shot.src} className={shot.className}>
                <MediaZoom>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 420px"
                    className="object-cover"
                    priority={shot.src.includes("logo")}
                  />
                </MediaZoom>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
