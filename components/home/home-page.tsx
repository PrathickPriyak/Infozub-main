import Link from "next/link";
import {
  Cloud,
  Cpu,
  Megaphone,
  PhoneCall,
  PlayCircle,
  Search,
  Share2,
  Smartphone,
  Users,
  AtSign,
} from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { MarketingPage } from "@/components/layout/marketing-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { HomeHeroVisual } from "@/components/home/home-hero-visual";
import {
  homeAcademy,
  homeCapabilities,
  homeCta,
  homeHero,
  homeIntro,
  homeVentures,
} from "@/content/home";
import {
  certifications,
  counters,
  namedResults,
  strengths,
  strengthsLine,
  testimonials,
} from "@/content/proof";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const capabilityIcons = [
  Megaphone,
  Search,
  Smartphone,
  PlayCircle,
  Users,
  AtSign,
  Cloud,
  Users,
  Cpu,
  PhoneCall,
] as const;

export function HomePage() {
  return (
    <MarketingPage transparentHeader>
      <Hero />
      <Intro />
      <Capabilities />
      <Expertise />
      <Academy />
      <Stats />
      <Results />
      <Testimonials />
      <Ventures />
      <CloseCta />
      <Contact />
    </MarketingPage>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
      >
        <div className="absolute -left-24 top-0 size-[32rem] rounded-full bg-navy blur-3xl" />
        <div className="absolute bottom-0 right-0 size-[24rem] rounded-full bg-signal/25 blur-3xl" />
        <div className="absolute inset-0 bg-grid-fade opacity-40" />
      </div>

      <Container className="relative grid items-center gap-12 pb-20 pt-28 md:pb-28 md:pt-32 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <Badge
            variant="outline"
            className="border-white/20 bg-white/5 text-white"
          >
            {site.legalName}
          </Badge>
          <h1 className="mt-5 max-w-xl font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {homeHero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
            {homeHero.supporting}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
            {homeHero.detail}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Button asChild variant="signal" size="lg">
                <Link href={homeHero.primaryCta.href}>
                  {homeHero.primaryCta.label}
                </Link>
              </Button>
            </Magnetic>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={homeHero.secondaryCta.href}>
                {homeHero.secondaryCta.label}
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <HomeHeroVisual />
        </Reveal>
      </Container>
    </section>
  );
}

function Intro() {
  return (
    <Section tone="surface">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <Reveal>
          <SectionHeader
            eyebrow={homeIntro.eyebrow}
            title={homeIntro.title}
            description={homeIntro.body}
            className="mb-0 max-w-none"
          />
          <p className="mt-5 font-display text-lg text-ink">{homeIntro.closer}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <Card className="h-full bg-mist/70">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-signal-strong">
              Who we are
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {homeIntro.teamLine}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="primary">
                <Link href="/about">About INFOZUB</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={homeHero.primaryCta.href}>
                  {homeHero.primaryCta.label}
                </Link>
              </Button>
            </div>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}

function Capabilities() {
  return (
    <Section pattern="grid">
      <Container>
        <SectionHeader
          eyebrow="What we offer"
          title="Premier Digital Suite"
          description="Paid media, creative, telephony, and sales-process support from the Premier Digital Suite."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeCapabilities.map((item, index) => {
            const Icon = capabilityIcons[index] ?? Share2;
            return (
              <StaggerItem key={item.title}>
                <Card interactive className="h-full">
                  <div className="flex size-10 items-center justify-center rounded-md bg-signal-soft text-signal-strong">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <CardTitle className="mt-4">{item.title}</CardTitle>
                  {"description" in item && item.description ? (
                    <CardDescription>{item.description}</CardDescription>
                  ) : null}
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal className="mt-8">
          <p className="text-sm text-muted">And much more included.</p>
          <Button asChild variant="link" className="mt-1 px-0">
            <Link href="/digital-suite">See the full Digital Suite</Link>
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}

function Expertise() {
  return (
    <Section tone="surface">
      <Container>
        <SectionHeader
          eyebrow="Our strength"
          title="Why choose INFOZUB"
          description={strengthsLine}
        />
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((item) => (
            <StaggerItem key={item}>
              <div className="flex min-h-16 items-center rounded-xl border border-line bg-mist/60 px-4 py-3 font-medium text-ink">
                {item}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            Certifications
          </p>
          <ul className="flex flex-wrap gap-2">
            {certifications.map((name) => (
              <li key={name}>
                <Badge variant="neutral">{name}</Badge>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}

function Academy() {
  return (
    <Section tone="ink" className="text-white">
      <Container className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">
            {homeAcademy.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {homeAcademy.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {homeAcademy.body}
          </p>
          <p className="mt-3 text-sm font-medium text-white/55">
            {homeAcademy.label}
          </p>
        </Reveal>
        <Reveal>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="border-transparent bg-white text-ink hover:bg-white/90"
          >
            <Link href={homeAcademy.cta.href}>{homeAcademy.cta.label}</Link>
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}

function Stats() {
  return (
    <Section pattern="dots">
      <Container>
        <SectionHeader
          eyebrow="A little history"
          title="Published performance"
          description="Figures published on the Infozub website."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {counters.map((stat) => (
            <StaggerItem key={stat.label}>
              <Card className="h-full">
                <p className="font-display text-3xl font-semibold text-ink md:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

function Results() {
  return (
    <Section tone="surface">
      <Container>
        <SectionHeader
          eyebrow="Client results"
          title="Named campaign outcomes"
          description="Campaign outcomes Infozub has published with named clients."
        />
        <Stagger className="grid gap-5 md:grid-cols-2">
          {namedResults.map((item) => (
            <StaggerItem key={item.client}>
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
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-8">
          <Button asChild variant="outline">
            <Link href="/clients">View all clients</Link>
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="What our clients say"
          title="Testimonials"
          description="Reviews published on the Infozub homepage."
        />
        <Stagger className="grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
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
      </Container>
    </Section>
  );
}

function Ventures() {
  return (
    <Section tone="surface" pattern="grid">
      <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal>
          <SectionHeader
            title={homeVentures.title}
            description={homeVentures.body}
            className="mb-0"
          />
          <Button asChild variant="outline" className="mt-6">
            <Link href={homeVentures.cta.href}>{homeVentures.cta.label}</Link>
          </Button>
        </Reveal>
        <Reveal>
          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal-strong">
              Current venture
            </p>
            <CardTitle className="mt-3">{homeVentures.featured.title}</CardTitle>
            <CardDescription>
              {homeVentures.featured.description}
            </CardDescription>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}

function CloseCta() {
  return (
    <Section tone="ink">
      <Container className="text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {homeCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 md:text-lg">
            {homeCta.body}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <Button asChild variant="signal" size="lg">
                <Link href={homeCta.primary.href}>{homeCta.primary.label}</Link>
              </Button>
            </Magnetic>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={homeCta.secondary.href}>{homeCta.secondary.label}</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact-offices">
      <Container>
        <SectionHeader
          eyebrow="Don’t feel shy"
          title="Talk to INFOZUB"
          description="Two offices in Tamil Nadu. Call, email, or send a message from the contact page."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Call
            </p>
            <a
              href={site.phoneHref}
              className={cn(
                "mt-3 block text-sm font-semibold text-ink hover:text-navy focus-ring rounded-sm",
              )}
            >
              {site.phoneDisplay}
            </a>
            <p className="mt-2 text-xs text-muted">{site.hours}</p>
          </Card>
          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Email
            </p>
            <a
              href={site.emailHref}
              className="mt-3 block text-sm font-semibold text-ink hover:text-navy focus-ring rounded-sm"
            >
              {site.email}
            </a>
            <Button asChild variant="signal" size="sm" className="mt-4">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
