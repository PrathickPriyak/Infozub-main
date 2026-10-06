import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";
import { Container, Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { primaryNavigation, headerCta } from "@/content/navigation";

export const metadata: Metadata = {
  title: "Navigation Preview",
  description:
    "Internal preview for Infozub sticky header, transparent hero state, and mobile navigation.",
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  searchParams: Promise<{ mode?: string }>;
};

export default async function NavPreviewPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const solidMode = params.mode === "solid";
  const transparentOnHero = !solidMode;
  const inverseOnHero = !solidMode;

  return (
    <>
      <SkipLink />
      <SiteHeader
        transparentOnHero={transparentOnHero}
        inverseOnHero={inverseOnHero}
      />
      <main id="main">
        <section
          className={
            solidMode
              ? "border-b border-line bg-mist"
              : "relative overflow-hidden bg-ink text-white"
          }
        >
          {!solidMode ? (
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              aria-hidden
            >
              <div className="absolute -left-24 top-0 size-[28rem] rounded-full bg-navy blur-3xl" />
              <div className="absolute bottom-0 right-0 size-[22rem] rounded-full bg-signal/30 blur-3xl" />
            </div>
          ) : null}

          <Container className="relative py-20 md:py-28">
            <Badge variant={solidMode ? "signal" : "outline"}>
              Header preview
            </Badge>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
              {solidMode
                ? "Solid sticky navigation"
                : "Transparent over dark hero"}
            </h1>
            <p
              className={
                solidMode
                  ? "mt-4 max-w-2xl text-lg text-muted"
                  : "mt-4 max-w-2xl text-lg text-white/75"
              }
            >
              Scroll to verify the sticky transition, hover desktop links, open
              the Digital Suite dropdown, and exercise the mobile sheet with
              scroll lock. Homepage content is intentionally not built here.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {solidMode ? (
                <>
                  <Button asChild variant="outline">
                    <Link href="/nav-preview">Transparent hero</Link>
                  </Button>
                  <Button asChild variant="signal">
                    <Link href="/nav-preview?mode=solid">Solid header</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="secondary"
                    className="border-transparent bg-white text-ink hover:bg-white/90"
                  >
                    <Link href="/nav-preview">Transparent hero</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/nav-preview?mode=solid">Solid header</Link>
                  </Button>
                </>
              )}
              <Button
                asChild
                variant="ghost"
                className={
                  solidMode ? undefined : "text-white hover:bg-white/10"
                }
              >
                <Link href={headerCta.href}>{headerCta.label}</Link>
              </Button>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Checklist
            </h2>
            <ul className="mt-6 space-y-3 text-muted">
              <li>Desktop: logo, primary links, Digital Suite compact dropdown, CTA</li>
              <li>Tablet / mobile: hamburger opens animated sheet with full nav + CTA</li>
              <li>Body scroll locks while the sheet is open</li>
              <li>Active page marker via aria-current on matching routes</li>
              <li>Keyboard: Tab through links, Enter/Space on triggers, Escape closes sheet</li>
            </ul>

            <div className="mt-10 rounded-xl border border-line bg-surface p-5">
              <h3 className="font-display text-sm font-semibold text-ink">
                Centralized routes
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {primaryNavigation.map((item) => (
                  <li key={item.href} className="text-sm text-muted">
                    <span className="font-medium text-ink">{item.label}</span>
                    {" — "}
                    {item.href}
                    {item.children?.length ? (
                      <ul className="mt-1 space-y-1 pl-4">
                        {item.children.map((child) => (
                          <li key={`${child.href}-${child.label}`}>
                            {child.label}: {child.href}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        {/* Tall region so sticky / scroll-state changes are easy to verify */}
        <Section pattern="grid" className="min-h-[70vh]">
          <Container>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Scroll region
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Keep scrolling. In transparent mode the header should become solid
              mist with a border once past the hero. In solid mode it stays
              opaque the whole time.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-line bg-surface px-5 py-8 text-sm text-muted"
                >
                  Scroll block {index + 1}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
