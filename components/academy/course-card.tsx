import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MediaZoom } from "@/components/motion/media-zoom";
import type { AcademyCourse } from "@/content/academy";
import { academyFormat } from "@/content/academy";
import { cn } from "@/lib/utils";

type CourseCardProps = {
  course: AcademyCourse;
  className?: string;
  compact?: boolean;
  index?: number;
};

export function CourseCard({
  course,
  className,
  compact = false,
  index = 0,
}: CourseCardProps) {
  return (
    <a
      href={course.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "course-card group/media group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-soft focus-ring",
        className,
      )}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-navy/10">
        <MediaZoom className="size-full">
          <Image
            src={course.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="media-zoom-target object-cover"
          />
        </MediaZoom>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95"
          aria-hidden
        />
        <Badge
          variant="signal"
          className="absolute left-3 top-3 border-0 bg-white/95 text-ember-strong shadow-soft backdrop-blur-sm"
        >
          {academyFormat}
        </Badge>
        <span
          className="course-card-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0"
          aria-hidden
        />
      </div>

      <div className={cn("flex flex-1 flex-col p-5", compact && "p-4")}>
        <div className="flex items-start gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-ember-soft text-ember transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <BookOpen className="size-5" aria-hidden />
          </span>
          <h3
            className={cn(
              "font-display font-semibold tracking-tight text-ink transition-colors group-hover:text-navy",
              compact ? "text-base" : "text-lg",
            )}
          >
            {course.title}
          </h3>
        </div>

        {!compact ? (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            Opens on the INFOZUB Digital Academy platform.
          </p>
        ) : (
          <div className="flex-1" />
        )}

        <span className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ember px-4 text-sm font-semibold text-white transition-[transform,background-color,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:bg-ember-strong group-hover:shadow-[0_10px_28px_rgba(247,127,0,0.3)]">
          Start Course
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
    </a>
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
        "group block rounded-xl border border-line bg-mist/80 p-5 transition hover:-translate-y-0.5 hover:border-ember/40 hover:bg-ember-soft/50 focus-ring",
        className,
      )}
    >
      <span className="inline-flex size-10 items-center justify-center rounded-md bg-ember-soft text-ember transition-transform duration-300 group-hover:scale-110">
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ember-strong">
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
