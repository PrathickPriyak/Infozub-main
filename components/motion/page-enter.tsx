"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/components/motion/reduced-motion";

/**
 * Soft enter transition for marketing page content.
 * Exit animations skipped to avoid fighting App Router navigation.
 */
export function PageEnter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      className={className}
      initial={{ opacity: 0.01, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
