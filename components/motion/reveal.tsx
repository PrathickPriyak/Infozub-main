import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: "view" | "mount";
};

/**
 * CSS-first reveal. No Framer Motion on the marketing critical path.
 * Honors prefers-reduced-motion via globals.css.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  mode = "view",
}: RevealProps) {
  return (
    <div
      className={cn(
        mode === "mount" ? "reveal-mount" : "reveal-view",
        className,
      )}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("stagger-view", className)}>{children}</div>;
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("stagger-item", className)}>{children}</div>;
}
