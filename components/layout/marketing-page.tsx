import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";
import { PageEnter } from "@/components/motion/page-enter";
import { RouteProgress } from "@/components/motion/page-transition";
import { ScrollProgress } from "@/components/motion/scroll-progress";

type MarketingPageProps = {
  children: ReactNode;
  transparentHeader?: boolean;
};

export function MarketingPage({
  children,
  transparentHeader = false,
}: MarketingPageProps) {
  return (
    <>
      <SkipLink />
      <RouteProgress />
      <ScrollProgress />
      <SiteHeader
        transparentOnHero={transparentHeader}
        inverseOnHero={transparentHeader}
      />
      {!transparentHeader ? (
        <div className="h-16 md:h-[6.5rem]" aria-hidden />
      ) : null}
      <PageEnter>
        <main id="main">{children}</main>
        <SiteFooter />
      </PageEnter>
    </>
  );
}
