"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, Menu, Phone } from "lucide-react";
import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  headerCta,
  mobileHomeLink,
  primaryNavigation,
  type NavItem,
} from "@/content/navigation";
import { site } from "@/content/site";
import { isNavBranchActive, isNavItemActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  inverse?: boolean;
};

function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const active = isNavBranchActive(pathname, item);
  const panelId = useId();
  const [open, setOpen] = useState(active);
  const hasChildren = Boolean(item.children?.length);

  if (!hasChildren) {
    return (
      <SheetClose asChild>
        <Link
          href={item.href}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className={cn(
            "flex min-h-12 items-center rounded-lg px-3 text-base font-medium transition-colors focus-ring",
            active
              ? "bg-signal-soft text-ink"
              : "text-ink hover:bg-mist",
          )}
        >
          {item.label}
        </Link>
      </SheetClose>
    );
  }

  return (
    <div className="rounded-lg">
      <button
        type="button"
        className={cn(
          "flex min-h-12 w-full items-center justify-between rounded-lg px-3 text-left text-base font-medium transition-colors focus-ring",
          active ? "bg-signal-soft text-ink" : "text-ink hover:bg-mist",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${item.label} submenu`}
        onClick={() => setOpen((value) => !value)}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "size-4 text-muted transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="mt-1 space-y-1 border-l border-line py-1 pl-3"
      >
        {item.children?.map((child) => {
          const childActive = isNavItemActive(pathname, child.href, {
            exact: true,
          });
          return (
            <SheetClose asChild key={`${child.href}-${child.label}`}>
              <Link
                href={child.href}
                onClick={onNavigate}
                aria-current={childActive ? "page" : undefined}
                className={cn(
                  "flex min-h-11 flex-col justify-center rounded-md px-3 py-2 transition-colors focus-ring",
                  childActive
                    ? "bg-mist text-ink"
                    : "text-muted hover:bg-mist hover:text-ink",
                )}
              >
                <span className="text-sm font-semibold">{child.label}</span>
                {child.description ? (
                  <span className="text-xs text-muted">
                    {child.description}
                  </span>
                ) : null}
              </Link>
            </SheetClose>
          );
        })}
      </div>
    </div>
  );
}

export function MobileNav({ inverse = false }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={inverse ? "outline" : "secondary"}
          size="icon"
          className={cn(
            "lg:hidden",
            inverse &&
              "border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <Menu className="size-5" aria-hidden />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        id="mobile-navigation"
        className="gap-0 p-0"
        aria-describedby={undefined}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4 pr-14">
          <BrandMark compact />
          <SheetTitle className="sr-only">Site navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Browse Infozub pages and contact options
          </SheetDescription>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-4 py-4"
          aria-label="Mobile primary"
        >
          <div className="space-y-1">
            <MobileNavItem
              item={mobileHomeLink}
              onNavigate={() => setOpen(false)}
            />
            {primaryNavigation.map((item) => (
              <MobileNavItem
                key={item.href}
                item={item}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </div>
        </nav>

        <div className="mt-auto space-y-3 border-t border-line bg-mist/70 p-4">
          <a
            href={site.phoneHref}
            className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-ink hover:bg-surface focus-ring"
          >
            <Phone className="size-4 text-ember" aria-hidden />
            {site.phoneDisplay}
          </a>
          <a
            href={site.emailHref}
            className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-ink hover:bg-surface focus-ring"
          >
            <Mail className="size-4 text-ember" aria-hidden />
            {site.email}
          </a>
          <SheetClose asChild>
            <Button asChild variant="signal" className="h-12 w-full">
              <Link href={headerCta.href}>{headerCta.label}</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
