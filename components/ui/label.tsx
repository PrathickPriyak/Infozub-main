import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Label({
  className,
  ...props
}: ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-sm font-semibold leading-none text-ink peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
}
