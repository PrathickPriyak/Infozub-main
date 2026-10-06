import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
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
              <Card className="h-full">
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
              <div className="flex min-h-16 items-center rounded-xl border border-line bg-mist/60 px-4 py-3 font-medium text-ink">
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
    <Section tone="ink">
      <Container className="text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
            Ready to start a project?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">
            Get your business engaged with the perfect audience.
          </p>
          <Button
            asChild
            variant="signal"
            size="lg"
            className="mt-8"
          >
            <Link href="/contact">Get in touch</Link>
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
