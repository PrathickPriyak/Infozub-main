import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/** Server-safe wrapper — hover lift lives on Button CSS. */
export function Magnetic({ children, className }: MagneticProps) {
  return <div className={cn("inline-flex", className)}>{children}</div>;
}
