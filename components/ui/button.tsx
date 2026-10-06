import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-[transform,background-color,box-shadow,color,border-color] duration-200 ease-out focus-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-white shadow-soft hover:-translate-y-px hover:bg-ink-soft hover:shadow-elevated",
        signal:
          "bg-signal text-accent-foreground shadow-soft hover:-translate-y-px hover:bg-signal-strong hover:shadow-elevated motion-safe:hover:shadow-[0_10px_28px_rgba(15,174,154,0.28)]",
        secondary:
          "bg-surface text-ink border border-line shadow-soft hover:-translate-y-px hover:border-navy/25 hover:shadow-elevated",
        outline:
          "border border-line bg-transparent text-ink hover:border-navy/30 hover:bg-surface active:bg-mist",
        ghost: "bg-transparent text-ink hover:bg-navy/5",
        link: "rounded-none bg-transparent px-0 text-navy underline-offset-4 hover:text-signal-strong hover:underline",
      },
      size: {
        sm: "h-10 px-3.5 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-[52px] px-6 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
