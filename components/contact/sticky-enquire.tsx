"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { enquiryCta } from "@/content/enquiry";
import { cn } from "@/lib/utils";

/**
 * Mobile/tablet sticky enquiry CTA. Hidden on /contact (form is already there)
 * and on large screens where the header CTA is visible.
 */
export function StickyEnquire({ className }: { className?: string }) {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden",
        className,
      )}
    >
      <Link
        href={enquiryCta.sticky.href}
        className="pointer-events-auto flex min-h-12 items-center justify-center gap-2 rounded-full bg-ember px-5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(247,127,0,0.35)] transition hover:bg-ember-strong focus-ring"
      >
        <MessageSquare className="size-4 shrink-0" aria-hidden />
        {enquiryCta.sticky.label}
      </Link>
    </div>
  );
}
