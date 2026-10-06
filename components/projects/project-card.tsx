"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import type { ProjectRecord } from "@/content/projects";
import { usePrefersReducedMotion } from "@/components/motion/reduced-motion";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: ProjectRecord;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });
  const image = project.images[0];

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(offsetX * -12);
    y.set(offsetY * -10);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <Link
      ref={cardRef}
      href={`/projects/${project.slug}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-navy/25 hover:shadow-elevated focus-ring",
        className,
      )}
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-mist media-zoom">
        {image ? (
          <motion.div
            className="absolute inset-[-8%]"
            style={reduced ? undefined : { x: springX, y: springY }}
          >
            <Image
              src={image.thumbSrc}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="border-white/25 bg-ink/40 text-white backdrop-blur-sm"
          >
            {project.categoryLabel}
          </Badge>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-display text-xl font-semibold text-white md:text-2xl">
            {project.title}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-white/80">
            {project.results[0]}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="truncate text-sm text-muted">
            {project.services.join(" · ")}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-navy transition group-hover:text-signal-strong">
          View
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
