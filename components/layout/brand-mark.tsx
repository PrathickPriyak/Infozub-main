import Link from "next/link";
import { BrandTarget } from "@/components/layout/brand-target";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  href?: string;
  compact?: boolean;
  /** For transparent headers over dark heroes */
  inverse?: boolean;
};

export function BrandMark({
  className,
  href = "/",
  compact = false,
  inverse = false,
}: BrandMarkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2.5 rounded-md focus-ring",
        className,
      )}
      aria-label={`${site.legalName} home`}
    >
      <span
        className={cn(
          "flex flex-col leading-none",
          inverse ? "text-white" : "text-navy",
        )}
      >
        <span
          className={cn(
            "inline-flex items-center font-display text-lg font-bold tracking-[0.04em] transition-colors sm:text-xl",
            inverse
              ? "text-white group-hover:text-white"
              : "text-navy group-hover:text-signal",
          )}
        >
          <span aria-hidden>INF</span>
          <BrandTarget inverse={inverse} />
          <span aria-hidden>ZUB</span>
          <span className="sr-only">{site.name}</span>
        </span>
        {!compact ? (
          <span
            className={cn(
              "mt-1 hidden text-[10px] font-medium tracking-[0.02em] sm:block",
              inverse ? "text-white/75" : "text-muted",
            )}
          >
            Your Targeted Marketing Partner!
          </span>
        ) : null}
      </span>
    </Link>
  );
}
