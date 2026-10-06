import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  CountersSection,
  ProjectClose,
  StrengthsSection,
} from "@/components/marketing/proof-sections";
import {
  aboutHero,
  founderStory,
  pressMentions,
  processSteps,
  timeline,
  timelineClose,
} from "@/content/about";
import { certifications } from "@/content/proof";
import { homeIntro } from "@/content/home";

export function AboutPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        description={aboutHero.description}
      >
        <Button asChild variant="signal" size="lg">
          <Link href="/contact">Get in touch</Link>
        </Button>
      </PageHero>

      <Section tone="surface">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              eyebrow="About INFOZUB"
              title="A digital marketing company since 2013"
              description={homeIntro.teamLine}
              className="mb-0"
            />
          </Reveal>
          <Reveal>
            <Card>
              <p className="text-sm leading-relaxed text-muted">{homeIntro.body}</p>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Our path to success"
            title="Our journey"
            description="Milestones published on the About page, from 2013 through 2021."
          />
          <ol className="relative space-y-6 border-l border-line pl-6">
            {timeline.map((entry, index) => (
              <li key={`${entry.year}-${entry.group}-${index}`}>
                <Reveal>
                  <span className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full bg-signal" />
                  <p className="font-mono text-xs text-signal-strong">
                    {entry.year} · {entry.group}
                  </p>
                  <ul className="mt-2 text-sm text-ink">
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

      <Section tone="surface">
        <Container className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              eyebrow={founderStory.eyebrow}
              title={founderStory.title}
              className="mb-4"
            />
            <p className="text-base leading-relaxed text-muted">{founderStory.body}</p>
          </Reveal>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
              As seen on
            </p>
            <div className="mt-4 space-y-4">
              {pressMentions.map((item) => (
                <Card key={item.publication}>
                  <CardTitle>{item.publication}</CardTitle>
                  {item.lines.map((line) => (
                    <CardDescription key={line}>{line}</CardDescription>
                  ))}
                </Card>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            title="The digital marketing process"
            description="Build, Operate and Manage — the working model published on the About page."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <StaggerItem key={step.title}>
                <Card className="h-full">
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

      <StrengthsSection />
      <CountersSection />

      <Section>
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
