"use client";

import { useMemo, useState } from "react";
import {
  Award,
  Building2,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { timeline, timelineClose } from "@/content/about";

type TimelineYear = (typeof timeline)[number]["year"];

const years = Array.from(
  new Set(timeline.map((entry) => entry.year)),
) as TimelineYear[];

const groupMeta = {
  Started: {
    label: "Started",
    icon: Rocket,
    tone: "bg-ember-soft text-ember",
  },
  "New Services": {
    label: "New services",
    icon: Sparkles,
    tone: "bg-signal-soft text-signal-strong",
  },
  Milestone: {
    label: "Milestone",
    icon: Award,
    tone: "bg-ember-soft text-ember-strong",
  },
  "New Ventures": {
    label: "New ventures",
    icon: Building2,
    tone: "bg-navy/10 text-navy",
  },
} as const;

export function AboutTimeline() {
  const [activeYear, setActiveYear] = useState<TimelineYear>(
    years[0] ?? "2013",
  );

  const yearIndex = years.indexOf(activeYear);
  const entries = useMemo(
    () => timeline.filter((entry) => entry.year === activeYear),
    [activeYear],
  );
  const itemCount = entries.reduce((sum, entry) => sum + entry.items.length, 0);

  function goYear(delta: number) {
    if (yearIndex < 0) return;
    const next = years[(yearIndex + delta + years.length) % years.length];
    if (next) setActiveYear(next);
  }

  return (
    <div className="about-journey">
      <div
        className="about-year-stepper relative mb-8 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Journey years"
      >
        <div className="pointer-events-none absolute left-4 right-4 top-1/2 hidden h-px -translate-y-1/2 bg-line md:block" />
        <div className="relative flex min-w-max items-center gap-2 md:justify-between md:gap-0">
          {years.map((year) => {
            const selected = activeYear === year;
            return (
              <button
                key={year}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveYear(year)}
                className={cn(
                  "about-year-chip focus-ring relative z-[1] flex min-w-[4.5rem] flex-col items-center gap-1 rounded-xl border px-3 py-2.5 transition",
                  selected
                    ? "border-ember bg-ember text-white shadow-soft"
                    : "border-line bg-surface text-muted hover:border-ember/40 hover:text-ink",
                )}
              >
                <span className="font-display text-base font-semibold tracking-tight">
                  {year}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-[0.12em]",
                    selected ? "text-white/80" : "text-muted",
                  )}
                >
                  {timeline.filter((entry) => entry.year === year).length}{" "}
                  updates
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="about-journey-panel overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-mist/60 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
              Journey year
            </p>
            <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {activeYear}
            </p>
            <p className="mt-1 text-sm text-muted">
              {itemCount} published milestone
              {itemCount === 1 ? "" : "s"} this year
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="focus-ring inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-ember/40 hover:bg-ember-soft hover:text-ember"
              aria-label="Previous year"
              onClick={() => goYear(-1)}
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              className="focus-ring inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-ember/40 hover:bg-ember-soft hover:text-ember"
              aria-label="Next year"
              onClick={() => goYear(1)}
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
            <p className="ml-1 min-w-[3.25rem] text-xs font-medium tabular-nums text-muted">
              {yearIndex + 1} / {years.length}
            </p>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-2">
          {entries.map((entry) => {
            const meta =
              groupMeta[entry.group as keyof typeof groupMeta] ??
              groupMeta.Milestone;
            const Icon = meta.icon;
            return (
              <article
                key={`${entry.year}-${entry.group}`}
                className="about-journey-card group rounded-xl border border-line bg-mist/40 p-5 transition"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "inline-flex size-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110",
                      meta.tone,
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      {meta.label}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {entry.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-relaxed text-ink"
                        >
                          <span
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-ember"
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">{timelineClose.join(" ")}</p>
        <div className="flex flex-wrap gap-2">
          {years.map((year) => (
            <button
              key={`mini-${year}`}
              type="button"
              aria-label={`Jump to ${year}`}
              onClick={() => setActiveYear(year)}
              className={cn(
                "focus-ring size-2.5 rounded-full transition",
                activeYear === year
                  ? "scale-125 bg-ember"
                  : "bg-line hover:bg-ember/50",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
