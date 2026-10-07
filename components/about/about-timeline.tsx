"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { timeline, timelineClose } from "@/content/about";

const years = Array.from(new Set(timeline.map((entry) => entry.year)));

export function AboutTimeline() {
  const [activeYear, setActiveYear] = useState<string>("all");

  const entries = useMemo(() => {
    if (activeYear === "all") return timeline;
    return timeline.filter((entry) => entry.year === activeYear);
  }, [activeYear]);

  return (
    <div>
      <div
        className="about-year-rail mb-8 flex gap-2 overflow-x-auto pb-1"
        role="tablist"
        aria-label="Filter journey by year"
      >
        <YearChip
          label="All years"
          selected={activeYear === "all"}
          onSelect={() => setActiveYear("all")}
        />
        {years.map((year) => (
          <YearChip
            key={year}
            label={year}
            selected={activeYear === year}
            onSelect={() => setActiveYear(year)}
          />
        ))}
      </div>

      <ol className="relative space-y-0 md:grid md:grid-cols-2 md:gap-x-10">
        {entries.map((entry, index) => (
          <li
            key={`${entry.year}-${entry.group}-${index}`}
            className="about-timeline-item relative border-l border-line pb-8 pl-6 last:pb-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pt-8"
          >
            <Reveal>
              <span className="about-timeline-dot absolute -left-[5px] top-1 size-2.5 rounded-full bg-ember md:left-0 md:top-0 md:-mt-[5px]" />
              <p className="font-mono text-xs text-ember-strong">
                {entry.year}
                <span className="text-muted"> · {entry.group}</span>
              </p>
              <ul className="mt-2 space-y-1 text-sm text-ink">
                {entry.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm text-muted">{timelineClose.join(" ")}</p>
    </div>
  );
}

function YearChip({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onSelect}
      className={`about-year-chip focus-ring shrink-0 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
        selected
          ? "border-ember bg-ember-soft text-ember-strong"
          : "border-line bg-surface text-muted hover:border-ember/40 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
