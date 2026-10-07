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
      <div className="mx-auto grid min-w-0 max-w-6xl gap-6 px-4 py-7 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8">
        <div className="min-w-0 space-y-2 sm:col-span-2 lg:col-span-1">
          <BrandMark />
          <p className="max-w-xs text-xs leading-relaxed text-muted">
            {site.legalName}. {homeHero.supporting}
          </p>
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink">
            Explore
          </h2>
          <ul className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-0.5">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-sm py-1 text-sm text-muted hover:text-ink focus-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink">
            Offices
          </h2>
          <div className="mt-2.5 space-y-2.5 text-xs leading-relaxed text-muted">
            {site.offices.map((office) => (
              <p key={office.city} className="break-words">
                <span className="font-semibold text-ink">{office.city}</span>
                <br />
                {office.address}
              </p>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink">
            Connect
          </h2>
          <div className="mt-2.5 space-y-1 text-sm">
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
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
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

      <div className="mx-auto flex min-w-0 max-w-6xl flex-col gap-2 px-4 py-3 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
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
