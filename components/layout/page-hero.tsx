import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  tone?: "ink" | "mist";
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  tone = "ink",
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
      <Container className="relative pb-16 pt-28 md:pb-20 md:pt-32">
        <Reveal mode="mount">
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
              "mt-5 block max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl",
              inverse ? "!text-white" : "text-ink",
            )}
          />
          {description ? (
            <p
              className={cn(
                "mt-5 max-w-2xl text-lg leading-relaxed",
                inverse ? "text-white/75" : "text-muted",
              )}
            >
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
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
    <Link href={href} className="text-navy underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}
