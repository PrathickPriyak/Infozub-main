import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
};

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  children,
  className,
  width = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8",
        widths[width],
        className,
      )}
    >
      {children}
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "mist" | "surface" | "ink" | "transparent";
  pattern?: "none" | "grid" | "dots";
};

const tones = {
  mist: "bg-mist/80",
  surface: "bg-surface",
  ink: "gradient-ink text-white",
  transparent: "bg-transparent",
} as const;

export function Section({
  children,
  className,
  id,
  tone = "transparent",
  pattern = "none",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24",
        tones[tone],
        className,
      )}
    >
      {pattern === "grid" ? (
        <div className="pointer-events-none absolute inset-0 bg-grid-fade" aria-hidden />
      ) : null}
      {pattern === "dots" ? (
        <div className="pointer-events-none absolute inset-0 bg-dot-fade" aria-hidden />
      ) : null}
      <div className="relative">{children}</div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl md:mb-14",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-signal-strong">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
