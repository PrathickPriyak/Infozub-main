import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  interactive = false,
  ...props
}: ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-surface p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-out",
        interactive &&
          "hover:-translate-y-1 hover:border-navy/20 hover:shadow-elevated motion-safe:hover:scale-[1.01]",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "font-display text-lg font-semibold tracking-tight text-ink",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p className={cn("mt-2 text-sm leading-relaxed text-muted", className)} {...props} />
  );
}
