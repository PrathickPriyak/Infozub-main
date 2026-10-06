import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MediaZoomProps = {
  children: ReactNode;
  className?: string;
};

export function MediaZoom({ children, className }: MediaZoomProps) {
  return (
    <div className={cn("media-zoom overflow-hidden", className)}>
      {children}
    </div>
  );
}
