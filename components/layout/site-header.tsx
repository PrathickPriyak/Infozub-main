"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { BrandMark } from "@/components/layout/brand-mark";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { headerCta } from "@/content/navigation";
import { site } from "@/content/site";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

export type SiteHeaderProps = {
  className?: string;
  /**
   * When true, the header starts transparent over a hero and becomes solid on scroll.
   * Disable on pages without a full-bleed dark/light hero.
   */
  transparentOnHero?: boolean;
  /** Force inverse (light-on-dark) text while transparent. */
  inverseOnHero?: boolean;
};

export function SiteHeader({
  className,
  transparentOnHero = false,
  inverseOnHero = false,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const scrolled = useScrolled(16);
  const solid = !transparentOnHero || scrolled;
  const inverse = transparentOnHero && inverseOnHero && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        solid
          ? "border-b border-line/80 bg-mist/90 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
        className,
      )}
    >
      <div
        className={cn(
          "hidden border-b md:block",
          solid
            ? "border-line/70 bg-ink text-white"
            : "border-white/10 bg-ink/25 text-white",
        )}
      >
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between gap-4 px-4 text-xs sm:px-6 lg:px-8">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-sm text-white/90 transition hover:text-white focus-ring"
          >
            <Phone className="size-3.5" aria-hidden />
            <span>{site.phoneDisplay}</span>
          </a>
          <a
            href={site.emailHref}
            className="inline-flex items-center gap-2 rounded-sm text-white/90 transition hover:text-white focus-ring"
          >
            <Mail className="size-3.5" aria-hidden />
            <span>{site.email}</span>
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandMark inverse={inverse} />

        <DesktopNav inverse={inverse} />

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant={inverse ? "secondary" : "signal"}
            size="sm"
            className={cn(
              "hidden sm:inline-flex",
              inverse &&
                "border-transparent bg-white text-ink hover:bg-white/90",
            )}
          >
            <Link href={headerCta.href}>{headerCta.label}</Link>
          </Button>

          {/* Remount on route change so the sheet always starts closed */}
          <MobileNav key={pathname} inverse={inverse} />
        </div>
      </div>
    </header>
  );
}
