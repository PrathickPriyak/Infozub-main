import Link from "next/link";
import type { Metadata } from "next";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This URL is not part of the INFOZUB website.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <MarketingPage>
      <PageHero
        tone="mist"
        eyebrow="404"
        title="Page not found"
        description="This URL is not part of the INFOZUB website. Check the address, or continue from home, Academy, or Contact."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="signal" size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/academy">Academy</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </PageHero>
    </MarketingPage>
  );
}
