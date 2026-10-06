"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { primaryNavigation } from "@/content/navigation";
import { isNavBranchActive, isNavItemActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type DesktopNavProps = {
  inverse?: boolean;
};

function linkClasses(inverse: boolean, active: boolean) {
  return cn(
    "group relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-ring",
    inverse
      ? active
        ? "text-white"
        : "text-white/80 hover:bg-white/10 hover:text-white"
      : active
        ? "text-ink"
        : "text-muted hover:bg-navy/5 hover:text-ink",
  );
}

function ActiveMarker({
  inverse,
  active,
}: {
  inverse: boolean;
  active: boolean;
}) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-200",
        inverse ? "bg-signal" : "bg-signal-strong",
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-data-[state=open]:scale-x-100",
      )}
      aria-hidden
    />
  );
}

export function DesktopNav({ inverse = false }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root
      className="relative z-50 hidden lg:flex"
      aria-label="Primary"
    >
      <NavigationMenu.List className="flex items-center gap-0.5">
        {primaryNavigation.map((item) => {
          const active = isNavBranchActive(pathname, item);
          const hasChildren = Boolean(item.children?.length);

          if (!hasChildren) {
            return (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={linkClasses(inverse, active)}
                  >
                    {item.label}
                    <ActiveMarker inverse={inverse} active={active} />
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={item.href} className="relative">
              <NavigationMenu.Trigger
                className={linkClasses(inverse, active)}
              >
                {item.label}
                <ChevronDown
                  className="size-3.5 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden
                />
                <ActiveMarker inverse={inverse} active={active} />
              </NavigationMenu.Trigger>

              <NavigationMenu.Content className="absolute left-0 top-full pt-3 data-[state=open]:animate-[nav-content-in_180ms_ease-out]">
                <ul
                  className="w-72 overflow-hidden rounded-xl border border-line bg-surface p-2 shadow-elevated transition-shadow duration-200"
                  aria-label={`${item.label} submenu`}
                >
                  {item.children?.map((child) => {
                    const childActive = isNavItemActive(pathname, child.href, {
                      exact: true,
                    });
                    return (
                      <li key={`${child.href}-${child.label}`}>
                        <NavigationMenu.Link asChild>
                          <Link
                            href={child.href}
                            aria-current={childActive ? "page" : undefined}
                            className={cn(
                              "block rounded-lg px-3 py-2.5 transition-colors focus-ring",
                              childActive
                                ? "bg-signal-soft text-ink"
                                : "hover:bg-mist",
                            )}
                          >
                            <span className="block text-sm font-semibold text-ink">
                              {child.label}
                            </span>
                            {child.description ? (
                              <span className="mt-0.5 block text-xs leading-snug text-muted">
                                {child.description}
                              </span>
                            ) : null}
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
