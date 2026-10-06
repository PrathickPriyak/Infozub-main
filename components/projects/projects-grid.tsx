"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/project-card";
import {
  projectCategories,
  projects,
  showProjectFilters,
  type ProjectCategoryId,
} from "@/content/projects";
import { usePrefersReducedMotion } from "@/components/motion/reduced-motion";
import { cn } from "@/lib/utils";

type FilterId = "all" | ProjectCategoryId;

export function ProjectsGrid() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [isPending, startTransition] = useTransition();
  const reduced = usePrefersReducedMotion();

  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div>
      {showProjectFilters ? (
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((category) => {
            const active = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() =>
                  startTransition(() => setFilter(category.id))
                }
                className={cn(
                  "rounded-md border px-3.5 py-2 text-sm font-medium transition focus-ring",
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-line bg-surface text-ink hover:border-navy/30",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <LayoutGroup>
        <motion.div
          layout
          className={cn(
            "grid gap-5 sm:grid-cols-2",
            isPending && "opacity-80",
          )}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {visible.length === 0 ? (
        <p className="mt-8 text-sm text-muted">
          No published projects in this category.
        </p>
      ) : null}
    </div>
  );
}
