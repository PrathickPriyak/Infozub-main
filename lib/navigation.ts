import type { NavItem } from "@/content/navigation";

/**
 * Active check for primary nav leaves and dropdown children.
 * Use `exact` for sibling routes that share a common prefix
 * (e.g. /digital-suite vs /digital-suite/coimbatore).
 */
export function isNavItemActive(
  pathname: string,
  href: string,
  options?: { exact?: boolean },
): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  if (options?.exact) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/** True when the item or any of its children match the current path. */
export function isNavBranchActive(pathname: string, item: NavItem): boolean {
  if (isNavItemActive(pathname, item.href)) {
    return true;
  }

  return Boolean(
    item.children?.some((child) =>
      isNavItemActive(pathname, child.href, { exact: true }),
    ),
  );
}
