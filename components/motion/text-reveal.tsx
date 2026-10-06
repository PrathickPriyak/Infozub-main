import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
};

/**
 * Headline render without word-level JS animation.
 * Keeps H1 in the first HTML payload (better LCP / CLS).
 */
export function TextReveal({
  text,
  as: Tag = "span",
  className,
}: TextRevealProps) {
  return <Tag className={cn(className)}>{text}</Tag>;
}
