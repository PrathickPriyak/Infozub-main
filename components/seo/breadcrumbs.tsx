import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: readonly Crumb[];
  className?: string;
};

/** Visible breadcrumb trail — pair with BreadcrumbList JSON-LD on the page. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm text-muted", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          let content: ReactNode = item.label;
          if (item.href && !isLast) {
            content = (
              <Link
                href={item.href}
                className="rounded-sm transition hover:text-ink focus-ring"
              >
                {item.label}
              </Link>
            );
          } else if (isLast) {
            content = (
              <span className="font-medium text-ink" aria-current="page">
                {item.label}
              </span>
            );
          }

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className="size-3.5 shrink-0 text-muted-soft" aria-hidden />
              ) : null}
              {content}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
