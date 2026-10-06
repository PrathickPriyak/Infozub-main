"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { usePrefersReducedMotion } from "@/components/motion/reduced-motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  mode = "view",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** `mount` for above-the-fold content so it never waits on intersection. */
  mode?: "view" | "mount";
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  if (mode === "mount") {
    return (
      <motion.div
        className={className}
        // Start slightly offset but never fully invisible — avoids blank heroes
        // when JS is slow or screenshots capture the first paint.
        initial={{ opacity: 0.35, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.42,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
