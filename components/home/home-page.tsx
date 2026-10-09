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
import { TextReveal } from "@/components/motion/text-reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { HomeHeroVisual } from "@/components/home/home-hero-visual";
import { TestimonialsCarousel } from "@/components/marketing/testimonials-carousel";
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
import { digitalSuiteServices } from "@/content/services";
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

function hrefForCapability(title: string): string {
  const match = digitalSuiteServices.find(
    (service) => service.title.toLowerCase() === title.toLowerCase(),
  );
  if (match?.overview) return match.href;
  return "/digital-suite";
}

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
        <div className="ambient-orb absolute -left-24 top-0 size-[32rem] rounded-full bg-navy blur-3xl" />
        <div className="ambient-orb ambient-orb-delayed absolute bottom-0 right-0 size-[24rem] rounded-full bg-ember/20 blur-3xl" />
        <div className="absolute inset-0 bg-grid-fade opacity-40" />
        <span className="hero-float-chip absolute left-[12%] top-[28%] size-3 rounded-full border border-ember/50 bg-ember/35" />
        <span className="hero-float-chip hero-float-chip-delay absolute right-[18%] top-[22%] size-2 rounded-full bg-white/40" />
        <span className="hero-float-chip hero-float-chip-slow absolute bottom-[18%] left-[40%] size-2.5 rounded-full border border-white/30" />
        <span className="hero-target-ring absolute right-[8%] top-[42%] size-24 rounded-full border border-ember/30" />
        <span className="hero-target-ring hero-target-ring-delay absolute right-[6%] top-[40%] size-32 rounded-full border border-white/10" />
      </div>

      <Container className="relative grid min-w-0 items-center gap-10 pb-16 pt-24 sm:gap-12 sm:pb-20 sm:pt-28 md:pb-28 md:pt-32 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal mode="mount">
          <Badge
            variant="outline"
            className="border-white/20 bg-white/5 text-white"
          >
            {site.legalName}
          </Badge>
          <TextReveal
            as="h1"
            text={homeHero.headline}
            className="mt-4 block max-w-xl font-display text-3xl font-semibold tracking-tight !text-white sm:mt-5 sm:text-4xl md:text-5xl xl:text-6xl"
          />
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:mt-5 sm:text-lg md:text-xl">
            {homeHero.supporting}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
            {homeHero.detail}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <Magnetic>
              <Button asChild variant="signal" size="lg" className="cta-pulse">
                <Link href={homeHero.primaryCta.href}>
                  {homeHero.primaryCta.label}
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
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
            </Magnetic>
          </div>
        </Reveal>

        <Reveal mode="mount" delay={0.08}>
          <div className="hero-visual-tilt">
            <HomeHeroVisual />
          </div>
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
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember">
              Who we are
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {homeIntro.teamLine}
            </p>
            <div className="mt-6">
              <Button asChild variant="primary">
                <Link href="/about">About INFOZUB</Link>
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
                <Link
                  href={hrefForCapability(item.title)}
                  className="capability-card group block h-full rounded-xl focus-ring"
                >
                  <Card interactive className="h-full">
                    <div className="flex size-10 items-center justify-center rounded-md bg-ember-soft text-ember transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <CardTitle className="mt-4">{item.title}</CardTitle>
                    {"description" in item && item.description ? (
                      <CardDescription>{item.description}</CardDescription>
                    ) : null}
                  </Card>
                </Link>
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
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember">
            {homeAcademy.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            {homeAcademy.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {homeAcademy.body}
          </p>
          <p className="mt-3 text-sm font-medium text-white/55">
            {homeAcademy.label} — lessons and enrollment on academy.infozub.com
          </p>
        </Reveal>
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              variant="signal"
              size="lg"
              className="cta-pulse"
            >
              <Link href={homeAcademy.enquireCta.href}>
                {homeAcademy.enquireCta.label}
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="border-transparent bg-white text-ink hover:bg-white/90"
            >
              <Link href={homeAcademy.cta.href}>{homeAcademy.cta.label}</Link>
            </Button>
          </div>
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
                <p className="font-display text-2xl font-semibold text-ink sm:text-3xl md:text-4xl">
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
                <Link
                  href={item.href}
                  className="block h-full rounded-xl focus-ring"
                >
                  <Card interactive className="h-full">
                    <CardTitle>{item.client}</CardTitle>
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {item.highlights.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ember" />
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
          description="Reviews published on the Infozub homepage. Browse with the controls or let them auto-advance."
        />
        <Reveal>
          <TestimonialsCarousel items={testimonials} />
        </Reveal>
        <Reveal className="mt-8">
          <Button asChild variant="outline">
            <Link href="/reviews">Read all reviews</Link>
          </Button>
        </Reveal>
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
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
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
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
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
          </Card>
        </div>
      </Container>
    </Section>
  );
}
