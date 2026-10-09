import type { ReactNode } from "react";
import { SiteChatbot } from "@/components/chat/site-chatbot";
import { StickyEnquire } from "@/components/contact/sticky-enquire";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";
import { RouteProgress } from "@/components/motion/page-transition";

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
      <SiteHeader
        transparentOnHero={transparentHeader}
        inverseOnHero={transparentHeader}
      />
      {!transparentHeader ? (
        <div className="h-16 md:h-[6.5rem]" aria-hidden />
      ) : null}
      <main id="main" className="min-w-0 overflow-x-clip pb-20 md:pb-0">
        {children}
      </main>
      <SiteFooter />
      <StickyEnquire />
      <SiteChatbot />
    </>
  );
}
