import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Magnetic } from "@/components/motion/magnetic";
import { TextReveal } from "@/components/motion/text-reveal";
import {
  counters,
  namedResults,
  strengths,
  strengthsLine,
  testimonials,
} from "@/content/proof";

export function CountersSection() {
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
              <Card className="h-full transition-transform duration-300 hover:-translate-y-0.5">
                <p className="font-display text-3xl font-semibold text-ink">
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

export function ResultsSection() {
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

export function TestimonialsSection() {
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
              <figure className="h-full rounded-xl border border-line bg-surface p-6 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-elevated">
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

export function StrengthsSection() {
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
              <div className="flex min-h-16 items-center rounded-xl border border-line bg-mist/60 px-4 py-3 font-medium text-ink transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-navy/20 hover:bg-surface">
                {item}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

export function ProjectClose() {
  return (
    <Section tone="ink" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="ambient-orb absolute -left-16 top-1/2 size-64 -translate-y-1/2 rounded-full bg-navy blur-3xl" />
        <div className="ambient-orb ambient-orb-delayed absolute -right-10 top-0 size-56 rounded-full bg-signal/25 blur-3xl" />
      </div>
      <Container className="relative text-center">
        <Reveal>
          <TextReveal
            as="h2"
            text="Ready to start a project?"
            className="font-display text-2xl font-semibold text-white sm:text-3xl md:text-4xl"
          />
          <p className="mx-auto mt-4 max-w-xl text-white/75">
            Get your business engaged with the perfect audience.
          </p>
          <Magnetic className="mt-8">
            <Button asChild variant="signal" size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </Magnetic>
        </Reveal>
      </Container>
    </Section>
  );
}
