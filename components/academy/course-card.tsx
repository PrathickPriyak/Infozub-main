import { ArrowUpRight, BookOpen, GraduationCap, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AcademyCourse } from "@/content/academy";
import { academyFormat } from "@/content/academy";
import { cn } from "@/lib/utils";

type CourseCardProps = {
  course: AcademyCourse;
  className?: string;
  compact?: boolean;
};

export function CourseCard({ course, className, compact = false }: CourseCardProps) {
  return (
    <Card
      interactive
      className={cn(
        "group flex h-full flex-col border-signal/15 bg-surface/95",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-md bg-signal-soft text-signal-strong transition-transform duration-200 group-hover:scale-105">
          <BookOpen className="size-5" aria-hidden />
        </span>
        <Badge variant="neutral">{academyFormat}</Badge>
      </div>
      <CardTitle className={cn("mt-4", compact ? "text-base" : undefined)}>
        {course.title}
      </CardTitle>
      {!compact ? (
        <CardDescription className="flex-1">
          Opens on the INFOZUB Digital Academy platform.
        </CardDescription>
      ) : (
        <div className="flex-1" />
      )}
      <a
        href={course.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-navy transition group-hover:text-signal-strong focus-ring rounded-sm"
      >
        Start Course
        <ArrowUpRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </a>
    </Card>
  );
}

type CategoryCardProps = {
  title: string;
  description: string;
  courseCount: number;
  icon?: LucideIcon;
  href: string;
  className?: string;
};

export function AcademyCategoryCard({
  title,
  description,
  courseCount,
  icon: Icon = GraduationCap,
  href,
  className,
}: CategoryCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group block rounded-xl border border-line bg-mist/80 p-5 transition hover:-translate-y-0.5 hover:border-signal/40 hover:bg-signal-soft/40 focus-ring",
        className,
      )}
    >
      <span className="inline-flex size-10 items-center justify-center rounded-md bg-signal-soft text-signal-strong">
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-signal-strong">
        {courseCount} course{courseCount === 1 ? "" : "s"}
      </p>
    </a>
  );
}

export function AcademyExternalCta({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Button asChild variant="signal" size="lg" className={className}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
        <ArrowUpRight className="size-4" aria-hidden />
      </a>
    </Button>
  );
}
