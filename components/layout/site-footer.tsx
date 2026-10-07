import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";
import { Separator } from "@/components/ui/separator";
import { homeHero } from "@/content/home";
import { site } from "@/content/site";
import {
  footerLegalLinks,
  primaryNavigation,
  socialLinks,
} from "@/content/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid min-w-0 max-w-6xl gap-5 px-4 py-6 sm:grid-cols-[1.1fr_1fr_1fr] sm:gap-6 sm:px-6 sm:py-7 lg:px-8">
        <div className="min-w-0 space-y-1.5">
          <BrandMark compact className="min-h-0" />
          <p className="max-w-xs text-xs leading-snug text-muted">
            {site.legalName}. {homeHero.supporting}
          </p>
          <p className="pt-1 text-xs text-muted">
            {site.offices.map((office) => office.city).join(" · ")} ·{" "}
            <Link
              href="/contact#locations"
              className="font-medium text-navy hover:underline focus-ring rounded-sm"
            >
              Directions
            </Link>
          </p>
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink">
            Explore
          </h2>
          <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-0">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-sm py-0.5 text-sm text-muted hover:text-ink focus-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink">
            Connect
          </h2>
          <div className="mt-2 space-y-0.5 text-sm">
            <a
              className="block rounded-sm text-muted hover:text-ink focus-ring"
              href={site.phoneHref}
            >
              {site.phoneDisplay}
            </a>
            <a
              className="block break-all rounded-sm text-muted hover:text-ink focus-ring"
              href={site.emailHref}
            >
              {site.email}
            </a>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-x-2.5 gap-y-1">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-xs font-medium text-muted transition hover:text-ink focus-ring"
                aria-label={item.label}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      <div className="mx-auto flex min-w-0 max-w-6xl flex-col gap-1.5 px-4 py-2.5 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}®. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {footerLegalLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm hover:text-ink focus-ring"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
