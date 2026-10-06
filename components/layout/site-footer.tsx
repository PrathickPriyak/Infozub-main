import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";
import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS = [
  { href: "/copyrights", label: "Copyrights" },
  { href: "/terms", label: "Terms & Privacy" },
  { href: "/payments", label: "Payments" },
] as const;

const SOCIAL = [
  { href: "https://www.facebook.com/Infozub", label: "Facebook" },
  { href: "https://x.com/infozubltd", label: "X" },
  { href: "https://www.linkedin.com/company/infozub-ltd/", label: "LinkedIn" },
  { href: "https://www.instagram.com/infozub/", label: "Instagram" },
  { href: "https://www.youtube.com/@infozub", label: "YouTube" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <BrandMark />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Infozub Private Limited — digital marketing, growth systems, and
            digital academy for ambitious brands.
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold text-ink">Offices</h2>
          <div className="mt-4 space-y-4 text-sm text-muted">
            <p>
              <span className="font-semibold text-ink">Tiruppur</span>
              <br />
              2nd Floor, Alagendira Towers, Bungalow Stop, Tiruppur – 641602
            </p>
            <p>
              <span className="font-semibold text-ink">Palladam</span>
              <br />
              271 A3, Chinnaiyah Garden, Kosavampalayam Road, Palladam – 641664
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold text-ink">Connect</h2>
          <div className="mt-4 space-y-2 text-sm">
            <a className="block text-muted hover:text-ink" href="tel:+919944640033">
              +91 99 44 64 00 33
            </a>
            <a className="block text-muted hover:text-ink" href="mailto:info@infozub.com">
              info@infozub.com
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {SOCIAL.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-line px-2.5 py-1.5 text-xs font-medium text-muted transition hover:border-navy/20 hover:text-ink focus-ring"
                aria-label={item.label}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>All Rights Reserved. © {new Date().getFullYear()} – INFOZUB®.</p>
        <div className="flex flex-wrap gap-4">
          {FOOTER_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
