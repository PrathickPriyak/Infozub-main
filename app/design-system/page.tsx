import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";
import {
  Container,
  Section,
  SectionHeader,
} from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Magnetic } from "@/components/motion/magnetic";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "Signal Navy visual system for Infozub Private Limited — tokens, components, and motion.",
  robots: {
    index: false,
    follow: false,
  },
};

const COLORS = [
  { name: "Ink", token: "--ink", className: "bg-ink" },
  { name: "Navy", token: "--navy", className: "bg-navy" },
  { name: "Signal", token: "--signal", className: "bg-signal" },
  { name: "Signal soft", token: "--signal-soft", className: "bg-signal-soft" },
  { name: "Mist", token: "--mist", className: "bg-mist border border-line" },
  { name: "Surface", token: "--surface", className: "bg-surface border border-line" },
  { name: "Muted", token: "--muted", className: "bg-muted" },
  { name: "Line", token: "--line", className: "bg-line" },
] as const;

const SERVICES = [
  {
    title: "Performance ads",
    description: "Channel mix with measurable ROAS and clear reporting cadence.",
    icon: Megaphone,
  },
  {
    title: "Growth systems",
    description: "Lead capture, telephony, and CRM workflows that stay accountable.",
    icon: Target,
  },
  {
    title: "Analytics layer",
    description: "Tracking architecture that makes spend and pipeline comparable.",
    icon: BarChart3,
  },
  {
    title: "Brand trust",
    description: "Creative systems and SOPs that keep delivery consistent.",
    icon: ShieldCheck,
  },
] as const;

function ColorSwatch({
  name,
  token,
  className,
}: {
  name: string;
  token: string;
  className: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
      <div className={`h-20 ${className}`} />
      <div className="space-y-1 p-3">
        <p className="text-sm font-semibold text-ink">{name}</p>
        <p className="font-mono text-xs text-muted">{token}</p>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <Section pattern="dots" className="pb-12 pt-14 md:pb-16 md:pt-20">
          <Container>
            <Reveal>
              <Badge variant="navy">Internal preview</Badge>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Signal Navy design system
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted">
                Tokens and reusable UI for Infozub Private Limited. This route is
                a living style guide — not a marketing page.
              </p>
            </Reveal>
          </Container>
        </Section>

        <Section tone="surface">
          <Container>
            <SectionHeader
              eyebrow="01 · Color"
              title="Color system"
              description="Ink and navy for trust. Signal teal for conversion. Mist surfaces keep pages light and calm."
            />
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {COLORS.map((color) => (
                <StaggerItem key={color.token}>
                  <ColorSwatch {...color} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeader
              eyebrow="02 · Typography"
              title="Heading hierarchy"
              description="Outfit for display. Source Sans 3 for body copy and UI."
            />
            <div className="space-y-6 rounded-xl border border-line bg-surface p-6 shadow-soft md:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-soft">
                  Display
                </p>
                <p className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-6xl">
                  Engage the right audience
                </p>
              </div>
              <Separator />
              <div className="space-y-4">
                <h1 className="text-3xl font-semibold md:text-5xl">Heading one</h1>
                <h2 className="text-2xl font-semibold md:text-4xl">Heading two</h2>
                <h3 className="text-xl font-semibold md:text-2xl">Heading three</h3>
                <h4 className="text-lg font-semibold">Heading four</h4>
              </div>
              <Separator />
              <div className="max-w-2xl space-y-3">
                <p className="text-lg leading-relaxed text-muted md:text-xl">
                  Lead paragraph — used under heroes and section intros.
                </p>
                <p className="text-base leading-relaxed text-ink">
                  Body copy stays readable at 16px with generous line height. Use
                  muted for secondary supporting sentences.
                </p>
                <p className="font-mono text-xs text-muted">
                  Mono · labels, IDs, technical meta
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Section tone="surface">
          <Container>
            <SectionHeader
              eyebrow="03 · Actions"
              title="Buttons and badges"
              description="Primary ink for structural actions. Signal for conversion. Avoid pill CTAs by default."
            />
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button variant="signal">Signal CTA</Button>
              </Magnetic>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">
                Text link
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>Neutral</Badge>
              <Badge variant="signal">Signal</Badge>
              <Badge variant="navy">Navy</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeader
              eyebrow="04 · Cards"
              title="Interactive cards"
              description="Cards are for interaction and grouping — not decorative wrappers everywhere."
            />
            <Stagger className="grid gap-4 md:grid-cols-2">
              {SERVICES.map((service) => (
                <StaggerItem key={service.title}>
                  <Card interactive className="h-full">
                    <div className="mb-4 inline-flex rounded-lg bg-signal-soft p-2.5 text-signal-strong">
                      <service.icon className="size-5" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>

        <Section tone="surface" pattern="grid">
          <Container>
            <SectionHeader
              eyebrow="05 · Motion"
              title="Counters and reveals"
              description="Animate once on enter. Reduced motion jumps to final values."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Projects handled", value: 130, suffix: "+" },
                { label: "Leads / 12 months", value: 170000, suffix: "+" },
                { label: "Ad impressions", value: 47, suffix: "M+" },
              ].map((stat) => (
                <Card key={stat.label} className="text-center">
                  <p className="font-display text-3xl font-semibold text-ink md:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-muted">{stat.label}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section>
          <Container width="narrow">
            <SectionHeader
              eyebrow="06 · Forms"
              title="Form controls"
              description="44px targets, clear labels, signal focus rings."
            />
            <Card className="space-y-5">
              <Field label="Full name" htmlFor="name">
                <Input id="name" placeholder="Your name" />
              </Field>
              <Field label="Work email" htmlFor="email" hint="We reply within one business day.">
                <Input id="email" type="email" placeholder="you@company.com" />
              </Field>
              <Field label="Service interest" htmlFor="service">
                <Select>
                  <SelectTrigger id="service" aria-label="Service interest">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suite">Digital Suite</SelectItem>
                    <SelectItem value="web">Website Development</SelectItem>
                    <SelectItem value="academy">Academy</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Message" htmlFor="message">
                <Textarea id="message" placeholder="Tell us about your goals" />
              </Field>
              <div className="flex items-center gap-2">
                <Checkbox id="consent" />
                <Label htmlFor="consent" className="font-normal text-muted">
                  I agree to be contacted about this enquiry.
                </Label>
              </div>
              <Button variant="signal" className="w-full sm:w-auto">
                Submit sample
              </Button>
            </Card>
          </Container>
        </Section>

        <Section tone="surface">
          <Container width="narrow">
            <SectionHeader
              eyebrow="07 · FAQ"
              title="Accordion pattern"
              description="Used for Digital Suite pricing questions and similar content."
            />
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do packages work?</AccordionTrigger>
                <AccordionContent>
                  Digital Suite packages are monthly retainers. Exact rate cards
                  are shared after discovery.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                <AccordionContent>
                  Published policy is no refunds once work agreements are active.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can we meet in person?</AccordionTrigger>
                <AccordionContent>
                  Meeting cadence depends on package tier, including online and
                  in-person options for higher tiers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Container>
        </Section>

        <Section tone="ink" className="text-white">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-medium text-signal">
                  <Sparkles className="size-4" />
                  Next phase
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Build marketing pages on this foundation
                </h2>
                <p className="mt-3 max-w-xl text-white/75">
                  Home, Digital Suite, About, and Contact should reuse these
                  tokens and components — not invent new visual languages.
                </p>
              </div>
              <Magnetic>
                <Button asChild variant="signal" size="lg">
                  <Link href="/">Back to foundation home</Link>
                </Button>
              </Magnetic>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
