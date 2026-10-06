import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";

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
      <SiteHeader
        transparentOnHero={transparentHeader}
        inverseOnHero={transparentHeader}
      />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
