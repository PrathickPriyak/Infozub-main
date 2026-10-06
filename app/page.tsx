import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";
import { Container, Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <Section pattern="grid" className="pb-20 pt-16 md:pb-28 md:pt-24">
          <Container>
            <Reveal>
              <Badge variant="signal">Foundation ready</Badge>
              <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink md:text-6xl">
                Infozub Private Limited
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                Signal Navy design system is live. Marketing pages come next —
                review tokens, components, and motion patterns first.
              </p>
              <div className="mt-8">
                <Magnetic>
                  <Button asChild variant="signal" size="lg">
                    <Link href="/design-system">
                      Open design system
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </Magnetic>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
