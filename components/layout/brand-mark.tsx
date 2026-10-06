import Link from "next/link";
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
        "group inline-flex items-center gap-2.5 rounded-md focus-ring",
        className,
      )}
      aria-label={`${site.legalName} home`}
    >
      <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-md gradient-signal shadow-soft">
        <span className="font-display text-sm font-bold tracking-tight text-white">
          IZ
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-semibold tracking-tight transition-colors",
            inverse
              ? "text-white group-hover:text-white"
              : "text-ink group-hover:text-navy",
          )}
        >
          {site.name}
        </span>
        {!compact ? (
          <span
            className={cn(
              "mt-1 text-[10px] font-medium uppercase tracking-[0.14em]",
              inverse ? "text-white/70" : "text-muted",
            )}
          >
            Private Limited
          </span>
        ) : null}
      </span>
    </Link>
  );
}
