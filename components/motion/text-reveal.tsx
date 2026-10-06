"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/motion/reduced-motion";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Keep short — word staggers are for headlines, not paragraphs. */
  delay?: number;
};

/**
 * Subtle word-by-word reveal for short headlines.
 * Falls back to plain text when prefers-reduced-motion is on.
 */
export function TextReveal({
  text,
  as: Tag = "span",
  className,
  delay = 0,
}: TextRevealProps) {
  const reduced = usePrefersReducedMotion();
  const words = text.trim().split(/\s+/);

  if (reduced || words.length > 14) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn("inline", className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.045,
              delayChildren: delay,
            },
          },
        }}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block whitespace-pre"
            variants={{
              hidden: { opacity: 0, y: "0.35em" },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
