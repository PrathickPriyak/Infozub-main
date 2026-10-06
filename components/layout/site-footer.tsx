import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";
import { Separator } from "@/components/ui/separator";
import { site } from "@/content/site";
import { footerLegalLinks, socialLinks } from "@/content/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid min-w-0 max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-14 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div className="min-w-0 space-y-4">
          <BrandMark />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {site.legalName} — digital marketing, growth systems, and digital
            academy for ambitious brands.
          </p>
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-sm font-semibold text-ink">Offices</h2>
          <div className="mt-4 space-y-4 text-sm text-muted">
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
          <h2 className="font-display text-sm font-semibold text-ink">Connect</h2>
          <div className="mt-4 space-y-2 text-sm">
            <a
              className="inline-flex min-h-11 items-center rounded-sm text-muted hover:text-ink focus-ring"
              href={site.phoneHref}
            >
              {site.phoneDisplay}
            </a>
            <a
              className="flex min-h-11 items-center break-all rounded-sm text-muted hover:text-ink focus-ring"
              href={site.emailHref}
            >
              {site.email}
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-line px-3 text-xs font-medium text-muted transition hover:border-navy/20 hover:text-ink focus-ring"
                aria-label={item.label}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      <div className="mx-auto flex min-w-0 max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          All Rights Reserved. © {new Date().getFullYear()} – {site.name}®.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {footerLegalLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
