"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Thin top loading indicator remounted on each client navigation.
 * CSS animation only. Honors prefers-reduced-motion in globals.css.
 */
export function RouteProgress({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className={cn(
        "route-progress pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 motion-reduce:hidden",
        className,
      )}
      aria-hidden
    >
      <div className="route-progress-bar h-full w-full origin-left bg-signal" />
    </div>
  );
}
