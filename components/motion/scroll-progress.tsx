"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Subtle scroll progress bar. Transform-only updates, passive scroll + rAF.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[45] h-[2px]",
        className,
      )}
      aria-hidden
    >
      <div
        className="h-full origin-left bg-signal/80"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
