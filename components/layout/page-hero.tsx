import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import {
  Breadcrumbs,
  type Crumb,
} from "@/components/seo/breadcrumbs";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  tone?: "ink" | "mist";
  breadcrumbs?: readonly Crumb[];
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  tone = "ink",
  breadcrumbs,
}: PageHeroProps) {
  const inverse = tone === "ink";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        inverse ? "bg-ink text-white" : "bg-mist",
      )}
    >
      {inverse ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="ambient-orb absolute -left-20 top-0 size-72 rounded-full bg-navy blur-3xl" />
          <div className="ambient-orb ambient-orb-delayed absolute bottom-0 right-0 size-64 rounded-full bg-signal/20 blur-3xl" />
        </div>
      ) : null}
      <Container className="relative pb-12 pt-24 sm:pb-16 sm:pt-28 md:pb-20 md:pt-32">
        <Reveal mode="mount">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <Breadcrumbs
              items={breadcrumbs}
              className={cn(
                "mb-5",
                inverse &&
                  "text-white/75 [&_a]:hover:!text-white [&_span[aria-current=page]]:!text-white",
              )}
            />
          ) : null}
          {eyebrow ? (
            <Badge
              variant={inverse ? "outline" : "signal"}
              className={
                inverse ? "border-white/20 bg-white/5 text-white" : undefined
              }
            >
              {eyebrow}
            </Badge>
          ) : null}
          <TextReveal
            as="h1"
            text={title}
            className={cn(
              "mt-4 block max-w-3xl font-display text-3xl font-semibold tracking-tight sm:mt-5 sm:text-4xl md:text-5xl",
              inverse ? "!text-white" : "text-ink",
            )}
          />
          {description ? (
            <p
              className={cn(
                "mt-4 max-w-2xl text-base leading-relaxed sm:mt-5 sm:text-lg",
                inverse ? "text-white/75" : "text-muted",
              )}
            >
              {description}
            </p>
          ) : null}
          {children ? (
            <div className="mt-6 max-w-full sm:mt-8">{children}</div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-sm text-navy underline-offset-4 hover:underline focus-ring"
    >
      {children}
    </Link>
  );
}
