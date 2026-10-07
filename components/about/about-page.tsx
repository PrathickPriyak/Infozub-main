import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BarChart3,
  Gauge,
  LineChart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Magnetic } from "@/components/motion/magnetic";
import { MediaZoom } from "@/components/motion/media-zoom";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { ProjectClose } from "@/components/marketing/proof-sections";
import { AboutTimeline } from "@/components/about/about-timeline";
import {
  aboutCertificationBadges,
  aboutHero,
  aboutIntro,
  aboutMedia,
  aboutPressLogos,
  beliefLines,
  founderStory,
  pressMentions,
  processSteps,
  whatWeDo,
  whyInfozub,
} from "@/content/about";
import { counters, strengths, strengthsLine } from "@/content/proof";
import { site } from "@/content/site";

const whyIcons = [
  Target,
  Gauge,
  ShieldCheck,
  Sparkles,
  BarChart3,
  LineChart,
  Award,
  Users,
] as const;

export function AboutPage() {
  return (
    <MarketingPage transparentHeader>
      <AboutHero />

      <Section tone="surface" id="about-infozub">
        <Container className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <SectionHeader
              eyebrow={aboutIntro.eyebrow}
              title={aboutIntro.title}
              description={aboutIntro.body}
              className="mb-0"
            />
            <p className="mt-5 text-base leading-relaxed text-muted">
              {aboutIntro.detail}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink">
              {aboutIntro.teamLine}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Button asChild variant="signal">
                  <Link href="/contact">Work with us</Link>
                </Button>
              </Magnetic>
              <Button asChild variant="outline">
                <Link href="/digital-suite">Explore Digital Suite</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="about-media-panel relative overflow-hidden rounded-2xl border border-line bg-mist shadow-elevated">
              <div className="relative aspect-[5/3]">
                <MediaZoom className="absolute inset-0 size-full">
                  <Image
                    src={aboutMedia.team.src}
                    alt={aboutMedia.team.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover"
                    priority
                  />
                </MediaZoom>
              </div>
              <div className="grid grid-cols-2 gap-px border-t border-line bg-line">
                <div className="bg-surface px-4 py-4">
                  <p className="font-display text-2xl font-semibold text-ink">2013</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                    Founded
                  </p>
                </div>
                <div className="bg-surface px-4 py-4">
                  <p className="font-display text-2xl font-semibold text-ink">30+</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                    Young experts
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section pattern="grid" id="founder">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="about-media-panel relative mx-auto aspect-square max-w-md overflow-hidden rounded-2xl border border-line bg-mist shadow-soft lg:mx-0">
              <MediaZoom className="absolute inset-0 size-full">
                <Image
                  src={aboutMedia.founder.src}
                  alt={aboutMedia.founder.alt}
                  fill
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-cover"
                />
              </MediaZoom>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionHeader
              eyebrow={founderStory.eyebrow}
              title={founderStory.title}
              className="mb-4"
            />
            <p className="text-base leading-relaxed text-muted whitespace-pre-line">
              {founderStory.body}
            </p>
            <div className="mt-8 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                As seen on
              </p>
              <Stagger className="grid gap-3 sm:grid-cols-2">
                {pressMentions.map((item) => {
                  const logo = aboutPressLogos.find(
                    (entry) => entry.publication === item.publication,
                  );
                  return (
                    <StaggerItem key={item.publication}>
                      <Card interactive className="about-press-card h-full">
                        {logo ? (
                          <div className="relative mb-3 h-10 w-28">
                            <Image
                              src={logo.src}
                              alt={`${item.publication} logo`}
                              fill
                              sizes="112px"
                              className="object-contain object-left"
                            />
                          </div>
                        ) : null}
                        <CardTitle>{item.publication}</CardTitle>
                        {item.lines.map((line) => (
                          <CardDescription key={line}>{line}</CardDescription>
                        ))}
                      </Card>
                    </StaggerItem>
                  );
                })}
              </Stagger>
              <p className="text-xs text-muted">
                Press features are named on the About page. Original article URLs
                were not published in the site HTML.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface" id="beliefs">
        <Container>
          <SectionHeader
            eyebrow="Why you need to choose us"
            title="How we approach the work"
            description="Published beliefs from the Infozub digital marketing pages."
          />
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {beliefLines.map((line) => (
              <StaggerItem key={line}>
                <div className="about-belief-card flex min-h-[4.75rem] items-center rounded-xl border border-line bg-mist/70 px-4 py-3 text-sm font-medium text-ink">
                  {line}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section id="what-we-do">
        <Container>
          <SectionHeader
            eyebrow="What we do"
            title="Premier Digital Suite capabilities"
            description="Service names published across the homepage and Digital Suite."
          />
          <Stagger className="flex flex-wrap gap-2">
            {whatWeDo.map((item) => (
              <StaggerItem key={item}>
                <Badge
                  variant="neutral"
                  className="about-service-chip px-3 py-1.5 text-sm"
                >
                  {item}
                </Badge>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8">
            <Button asChild variant="outline">
              <Link href="/digital-suite">See the full Digital Suite</Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface" pattern="dots" id="why-infozub">
        <Container>
          <SectionHeader
            eyebrow="Why INFOZUB"
            title="Technology and business capabilities"
            description={strengthsLine}
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyInfozub.map((item, index) => {
              const Icon = whyIcons[index] ?? Sparkles;
              return (
                <StaggerItem key={item.title}>
                  <Card interactive className="about-capability-card h-full">
                    <div className="flex size-10 items-center justify-center rounded-md bg-ember-soft text-ember">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <CardTitle className="mt-4 text-base">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
          <Reveal className="mt-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
              Our strength
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {strengths.map((item) => (
                <li
                  key={item}
                  className="about-belief-card rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section tone="mist" id="journey">
        <Container>
          <SectionHeader
            eyebrow="Our path to success"
            title="Our journey"
            description="Step through each published year — from the 2013 start to Digital Academy in 2021."
          />
          <AboutTimeline />
        </Container>
      </Section>

      <Section tone="surface" id="process">
        <Container>
          <SectionHeader
            title="The digital marketing process"
            description="Build, Operate and Manage — the working model published on About."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <StaggerItem key={step.title}>
                <Card interactive className="about-process-card h-full">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-xs text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div className="relative size-10">
                      <Image
                        src={step.icon}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <CardTitle className="mt-3">{step.title}</CardTitle>
                  <CardDescription>{step.body}</CardDescription>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section pattern="dots" id="growth">
        <Container>
          <SectionHeader
            eyebrow="A little history"
            title="Published performance"
            description="Counters shown as they appear on the live Infozub site."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {counters.map((stat) => (
              <StaggerItem key={stat.label}>
                <Card className="about-stat-card h-full">
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

      <Section tone="surface" id="certifications">
        <Container>
          <SectionHeader
            title="Our certifications"
            description="Google and Meta credentials published on INFOZUB."
          />
          <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {aboutCertificationBadges.map((badge) => (
              <StaggerItem key={badge.name}>
                <article className="about-cert-card flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-mist px-3 py-5 text-center shadow-soft">
                  <div className="relative mb-3 size-14">
                    <Image
                      src={badge.src}
                      alt={badge.name}
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </div>
                  <p className="text-xs font-medium leading-snug text-muted">
                    {badge.name}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section id="location">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <SectionHeader
              eyebrow="Where we work"
              title="Palladam & Tiruppur"
              description={`${site.offices[0]?.address} · ${site.offices[1]?.address}`}
              className="mb-0"
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Magnetic>
                <Button asChild variant="signal">
                  <Link href="/contact">Visit Contact</Link>
                </Button>
              </Magnetic>
              <Button asChild variant="outline">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("INFOZUB Palladam")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="size-4" aria-hidden />
                  Open in Google Maps
                </a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("INFOZUB Palladam")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="about-media-panel group relative block overflow-hidden rounded-2xl border border-line shadow-elevated focus-ring"
            >
              <div className="relative aspect-[5/4]">
                <MediaZoom className="absolute inset-0 size-full">
                  <Image
                    src={aboutMedia.officeGoogle.src}
                    alt={aboutMedia.officeGoogle.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                  />
                </MediaZoom>
                <span className="absolute bottom-3 left-3 rounded-md bg-ink/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                  Google Maps
                </span>
              </div>
            </a>
          </Reveal>
        </Container>
      </Section>

      <ProjectClose />
    </MarketingPage>
  );
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
      >
        <div className="ambient-orb absolute -left-24 top-0 size-[28rem] rounded-full bg-navy blur-3xl" />
        <div className="ambient-orb ambient-orb-delayed absolute bottom-0 right-0 size-[22rem] rounded-full bg-ember/20 blur-3xl" />
        <div className="absolute inset-0 bg-grid-fade opacity-40" />
        <span className="hero-float-chip absolute left-[12%] top-[28%] size-3 rounded-full border border-ember/50 bg-ember/35" />
        <span className="hero-float-chip hero-float-chip-delay absolute right-[18%] top-[22%] size-2 rounded-full bg-white/40" />
        <span className="hero-float-chip hero-float-chip-slow absolute bottom-[18%] left-[40%] size-2.5 rounded-full border border-white/30" />
        <span className="hero-target-ring absolute right-[10%] top-[46%] size-24 rounded-full border border-ember/30" />
        <span className="hero-target-ring hero-target-ring-delay absolute right-[8%] top-[44%] size-32 rounded-full border border-white/10" />
      </div>

      <Container className="relative grid min-w-0 items-center gap-10 pb-14 pt-24 sm:gap-12 sm:pb-16 sm:pt-28 md:pb-24 md:pt-32 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal mode="mount">
          <Badge
            variant="outline"
            className="border-white/20 bg-white/5 text-white"
          >
            {aboutHero.eyebrow}
          </Badge>
          <TextReveal
            as="h1"
            text={aboutHero.title}
            className="mt-4 block max-w-xl font-display text-3xl font-semibold tracking-tight !text-white sm:mt-5 sm:text-4xl md:text-5xl xl:text-6xl"
          />
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:mt-5 sm:text-lg">
            {aboutHero.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <Magnetic>
              <Button asChild variant="signal" size="lg" className="cta-pulse">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#journey">Our journey</Link>
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal mode="mount" delay={0.08}>
          <div className="about-hero-collage relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="about-hero-shot about-hero-shot-main relative aspect-[5/4] overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-elevated">
              <MediaZoom className="absolute inset-0 size-full">
                <Image
                  src={aboutMedia.team.src}
                  alt={aboutMedia.team.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover"
                  priority
                />
              </MediaZoom>
            </div>
            <div className="about-hero-shot about-hero-shot-a absolute -left-3 bottom-6 hidden w-[42%] overflow-hidden rounded-xl border border-white/20 bg-ink shadow-elevated sm:block">
              <div className="relative aspect-[4/3]">
                <Image
                  src={aboutMedia.hero.src}
                  alt={aboutMedia.hero.alt}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="about-hero-shot about-hero-shot-b absolute -right-2 top-4 hidden w-[36%] overflow-hidden rounded-xl border border-white/20 bg-white shadow-elevated sm:block">
              <div className="relative aspect-square bg-white p-3">
                <Image
                  src={aboutMedia.logo.src}
                  alt={aboutMedia.logo.alt}
                  fill
                  sizes="160px"
                  className="object-contain p-2"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
