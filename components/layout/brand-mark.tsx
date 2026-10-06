import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  href?: string;
  compact?: boolean;
};

export function BrandMark({
  className,
  href = "/",
  compact = false,
}: BrandMarkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 focus-ring rounded-md",
        className,
      )}
      aria-label="Infozub Private Limited home"
    >
      <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-md gradient-signal shadow-soft">
        <span className="font-display text-sm font-bold tracking-tight text-white">
          IZ
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-semibold tracking-tight text-ink group-hover:text-navy">
          INFOZUB
        </span>
        {!compact ? (
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
            Private Limited
          </span>
        ) : null}
      </span>
    </Link>
  );
}
