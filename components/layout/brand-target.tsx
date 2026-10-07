"use client";

import { useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

type BrandTargetProps = {
  className?: string;
  /** Light glyph on dark surfaces */
  inverse?: boolean;
};

/**
 * Interactive crosshair that replaces the "O" in INFOZUB — matches the brand logo mark.
 */
export function BrandTarget({ className, inverse = false }: BrandTargetProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    setOffset({
      x: Math.max(-1, Math.min(1, nx)) * 1.6,
      y: Math.max(-1, Math.min(1, ny)) * 1.6,
    });
  }

  function reset() {
    setOffset({ x: 0, y: 0 });
    setActive(false);
  }

  return (
    <svg
      ref={ref}
      viewBox="0 0 40 40"
      aria-hidden
      className={cn(
        "brand-target inline-block size-[1.05em] shrink-0 overflow-visible align-[-0.12em]",
        active && "brand-target-active",
        className,
      )}
      onPointerEnter={() => setActive(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      <g
        className="brand-target-ring origin-center"
        style={{ transformOrigin: "20px 20px" }}
      >
        <circle
          cx="20"
          cy="20"
          r="11.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
        />
        <line
          x1="20"
          y1="3"
          x2="20"
          y2="8.2"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="31.8"
          x2="20"
          y2="37"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="20"
          x2="8.2"
          y2="20"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="31.8"
          y1="20"
          x2="37"
          y2="20"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
      <g
        className="brand-target-aim"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transformOrigin: "20px 20px",
        }}
      >
        <circle
          cx="20"
          cy="20"
          r="5.2"
          fill="currentColor"
          className={cn(inverse ? "opacity-95" : "opacity-100")}
        />
        <circle cx="20" cy="20" r="1.35" fill={inverse ? "#04336b" : "#ffffff"} />
        <line
          x1="14.2"
          y1="20"
          x2="16.4"
          y2="20"
          stroke={inverse ? "#04336b" : "#ffffff"}
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.85"
        />
        <line
          x1="23.6"
          y1="20"
          x2="25.8"
          y2="20"
          stroke={inverse ? "#04336b" : "#ffffff"}
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.85"
        />
        <line
          x1="20"
          y1="14.2"
          x2="20"
          y2="16.4"
          stroke={inverse ? "#04336b" : "#ffffff"}
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.85"
        />
        <line
          x1="20"
          y1="23.6"
          x2="20"
          y2="25.8"
          stroke={inverse ? "#04336b" : "#ffffff"}
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.85"
        />
      </g>
      <circle
        className="brand-target-ping"
        cx="20"
        cy="20"
        r="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
