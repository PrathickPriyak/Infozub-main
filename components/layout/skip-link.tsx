import Link from "next/link";
import { cn } from "@/lib/utils";

export function SkipLink({ className }: { className?: string }) {
  return (
    <Link
      href="#main"
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-foreground",
        className,
      )}
    >
      Skip to content
    </Link>
  );
}
