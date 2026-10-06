import Link from "next/link";
import {
  Award,
  BarChart3,
  Gauge,
  LineChart,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { ProjectClose } from "@/components/marketing/proof-sections";
import {
  aboutHero,
  aboutIntro,
  beliefLines,
  founderStory,
  pressMentions,
  processSteps,
  timeline,
  timelineClose,
  whatWeDo,
  whyInfozub,
} from "@/content/about";
import { certifications, counters, strengths, strengthsLine } from "@/content/proof";

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
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        description={aboutHero.description}
      >
        <div className="flex flex-wrap gap-3">
          <Magnetic>
            <Button asChild variant="signal" size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </Magnetic>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/digital-suite">Explore Digital Suite</Link>
          </Button>
        </div>
      </PageHero>

      {/* About Infozub */}
      <Section tone="surface">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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
          </Reveal>
          <Reveal delay={0.06}>
            <Card className="h-full bg-mist/80">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal-strong">
                Who we are
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink">
                {aboutIntro.teamLine}
              </p>
              <p className="mt-6 font-display text-4xl font-semibold tabular-nums text-ink">
                2013
              </p>
              <p className="mt-1 text-sm text-muted">Founded · May 2013</p>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* Company story — founder */}
      <Section pattern="grid">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              eyebrow={founderStory.eyebrow}
              title={founderStory.title}
              className="mb-4"
            />
            <p className="text-base leading-relaxed text-muted whitespace-pre-line">
              {founderStory.body}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                As seen on
              </p>
              {pressMentions.map((item) => (
                <Card key={item.publication} interactive>
                  <CardTitle>{item.publication}</CardTitle>
                  {item.lines.map((line) => (
                    <CardDescription key={line}>{line}</CardDescription>
                  ))}
                </Card>
              ))}
              <p className="text-xs text-muted">
                Press features are named on the About page. Original article URLs
                were not published in the site HTML.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Approach — verified beliefs (not invented mission/vision/values) */}
      <Section tone="surface">
        <Container>
          <SectionHeader
            eyebrow="Why you need to choose us"
            title="How we approach the work"
            description="Published beliefs from the Infozub digital marketing pages. Discrete mission, vision, and core-values statements were not on the previous website."
          />
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {beliefLines.map((line) => (
              <StaggerItem key={line}>
                <div className="flex min-h-[4.5rem] items-center rounded-xl border border-line bg-mist/70 px-4 py-3 text-sm font-medium text-ink">
                  {line}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* What we do */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="What we do"
            title="Premier Digital Suite capabilities"
            description="Service names published across the homepage and Digital Suite."
          />
          <Stagger className="flex flex-wrap gap-2">
            {whatWeDo.map((item) => (
              <StaggerItem key={item}>
                <Badge variant="neutral" className="px-3 py-1.5 text-sm">
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

      {/* Why INFOZUB / technology & business capabilities */}
      <Section tone="surface" pattern="dots">
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
                  <Card interactive className="h-full">
                    <div className="flex size-10 items-center justify-center rounded-md bg-signal-soft text-signal-strong">
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
                  className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* Timeline story */}
      <Section id="journey">
        <Container>
          <SectionHeader
            eyebrow="Our path to success"
            title="Our journey"
            description="Milestones from the About timeline, 2013 through 2021. No 2020 entry and nothing after 2021 was published."
          />
          <ol className="relative space-y-0 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-0 md:space-y-0">
            {timeline.map((entry, index) => (
              <li
                key={`${entry.year}-${entry.group}-${index}`}
                className="relative border-l border-line pb-8 pl-6 last:pb-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-8"
              >
                <Reveal>
                  <span className="absolute -left-[5px] top-1 size-2.5 rounded-full bg-signal md:left-0 md:top-0 md:-mt-[5px]" />
                  <p className="font-mono text-xs text-signal-strong">
                    {entry.year}
                    <span className="text-muted"> · {entry.group}</span>
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink">
                    {entry.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-muted">{timelineClose.join(" ")}</p>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="surface">
        <Container>
          <SectionHeader
            title="The digital marketing process"
            description="Build, Operate and Manage — the working model published on About."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <StaggerItem key={step.title}>
                <Card interactive className="h-full">
                  <p className="font-mono text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <CardTitle className="mt-2">{step.title}</CardTitle>
                  <CardDescription>{step.body}</CardDescription>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Growth / achievements — verified counters only */}
      <Section pattern="dots">
        <Container>
          <SectionHeader
            eyebrow="A little history"
            title="Published performance"
            description="Counters shown as they appear on the live Infozub site."
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

      {/* Certifications */}
      <Section tone="surface">
        <Container>
          <SectionHeader title="Our certifications" />
          <ul className="flex flex-wrap gap-2">
            {certifications.map((name) => (
              <li key={name}>
                <Badge variant="neutral">{name}</Badge>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ProjectClose />
    </MarketingPage>
  );
}
