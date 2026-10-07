import { cn } from "@/lib/utils";
import { counters } from "@/content/proof";

const previewStats = [counters[0], counters[2], counters[4]] as const;

const orbits = [
  { label: "Facebook", x: "10%", y: "18%" },
  { label: "Google", x: "72%", y: "14%" },
  { label: "YouTube", x: "78%", y: "62%" },
  { label: "LinkedIn", x: "8%", y: "68%" },
] as const;

export function HomeHeroVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative isolate min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/60 p-4 shadow-elevated sm:p-5 md:p-7",
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
      <p className="relative mt-2 font-display text-lg font-semibold text-white sm:text-xl">
        Engage the right audience, online.
      </p>

      <dl className="relative mt-6 space-y-2">
        {previewStats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-w-0 items-baseline justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 sm:px-4"
          >
            <dt className="min-w-0 text-[11px] leading-snug text-white/55">
              {stat.label}
            </dt>
            <dd className="shrink-0 font-display text-base font-semibold tabular-nums tracking-tight text-white sm:text-lg">
              {stat.value.toLocaleString("en-IN")}
              {stat.suffix}
            </dd>
          </div>
        ))}
      </dl>

      <div className="relative mt-6 h-36 overflow-hidden rounded-xl border border-white/10 bg-ink/40">
        {orbits.map((node, index) => (
          <span
            key={node.label}
            className="orbit-chip absolute max-w-[40%] truncate rounded-full border border-signal/40 bg-signal/15 px-2 py-1 text-[10px] font-medium text-white/90 sm:max-w-none sm:px-2.5 sm:text-[11px]"
            style={{
              left: node.x,
              top: node.y,
              animationDelay: `${index * 0.4}s`,
            }}
          >
            {node.label}
          </span>
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
          <span className="rounded-full bg-signal px-3 py-1 text-xs font-semibold tracking-wide text-white">
            INFOZUB
          </span>
        </div>
      </div>
    </div>
  );
}
