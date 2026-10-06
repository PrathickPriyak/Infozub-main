"use client";

import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/components/motion/reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Thin top loading indicator remounted on each client navigation.
 * CSS animation only — no timers or setState.
 */
export function RouteProgress({ className }: { className?: string }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <div
      key={pathname}
      className={cn("route-progress pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5", className)}
      aria-hidden
    >
      <div className="route-progress-bar h-full w-full origin-left bg-signal" />
    </div>
  );
}
