"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/motion/reduced-motion";
import { counters } from "@/content/proof";
import { cn } from "@/lib/utils";

const previewStats = [counters[0], counters[2], counters[4]] as const;

const orbits = [
  { label: "Facebook", x: "10%", y: "18%", delay: 0 },
  { label: "Google", x: "72%", y: "14%", delay: 0.4 },
  { label: "YouTube", x: "78%", y: "62%", delay: 0.8 },
  { label: "LinkedIn", x: "8%", y: "68%", delay: 1.1 },
];

export function HomeHeroVisual({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/60 p-5 shadow-elevated md:p-7",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-signal/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-navy-soft/80 blur-3xl"
        aria-hidden
      />

      <p className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
        Premier Digital Suite
      </p>
      <p className="relative mt-2 font-display text-xl font-semibold text-white">
        Engage the right audience, online.
      </p>

      <dl className="relative mt-6 grid gap-3 sm:grid-cols-3">
        {previewStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-3"
          >
            <dt className="text-[11px] leading-snug text-white/55">{stat.label}</dt>
            <dd className="mt-1 font-display text-lg font-semibold tabular-nums text-white">
              {stat.value.toLocaleString("en-IN")}
              {stat.suffix}
            </dd>
          </div>
        ))}
      </dl>

      <div className="relative mt-6 h-36 overflow-hidden rounded-xl border border-white/10 bg-ink/40">
        {orbits.map((node) => (
          <motion.span
            key={node.label}
            className="absolute rounded-full border border-signal/40 bg-signal/15 px-2.5 py-1 text-[11px] font-medium text-white/90"
            style={{ left: node.x, top: node.y }}
            animate={
              reduced
                ? undefined
                : { y: [0, -6, 0], opacity: [0.75, 1, 0.75] }
            }
            transition={
              reduced
                ? undefined
                : {
                    duration: 4.2,
                    repeat: Infinity,
                    delay: node.delay,
                    ease: "easeInOut",
                  }
            }
          >
            {node.label}
          </motion.span>
        ))}
        <div
          className="absolute inset-6 rounded-full border border-white/10"
          aria-hidden
        />
        <div
          className="absolute inset-12 rounded-full border border-signal/20"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-signal px-3 py-1 text-xs font-semibold text-accent-foreground">
            INFOZUB
          </span>
        </div>
      </div>
    </div>
  );
}
