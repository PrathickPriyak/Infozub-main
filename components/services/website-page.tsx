import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectClose } from "@/components/marketing/proof-sections";
import { websiteDevelopment } from "@/content/services";

export function WebsiteDevelopmentPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        title={websiteDevelopment.title}
        description={websiteDevelopment.description}
      >
        <Button asChild variant="signal" size="lg">
          <Link href="/contact?interest=Other#contact-form">
            Enquire About Digital Marketing
          </Link>
        </Button>
      </PageHero>

      <Section>
        <Container>
          <SectionHeader
            title="Our web design development process"
            description={websiteDevelopment.processIntro}
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {websiteDevelopment.process.map((step, index) => (
              <StaggerItem key={step}>
                <Card className="h-full">
                  <p className="font-mono text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <CardTitle className="mt-2">{step}</CardTitle>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader title={websiteDevelopment.reasonsTitle} />
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {websiteDevelopment.reasons.map((reason) => (
              <li
                key={reason}
                className="rounded-xl border border-line bg-mist/60 px-4 py-3 text-sm font-medium text-ink"
              >
                {reason}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Packages"
            title="Website design packages"
            description={websiteDevelopment.packageNote}
          />
          <Stagger className="grid gap-4 lg:grid-cols-3">
            {websiteDevelopment.packages.map((pack) => (
              <StaggerItem key={pack.name}>
                <Card className="h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
                    {pack.name}
                  </p>
                  <p className="mt-2 font-display text-3xl font-semibold text-ink">
                    {pack.price}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    {pack.differences.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="mt-6 w-full">
                    <Link href="/contact?interest=Other#contact-form">
                      Enquire Now
                    </Link>
                  </Button>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8">
            <Card>
              <CardTitle>Shared package inclusions</CardTitle>
              <CardDescription>
                Feature lists published on the website development page, in
                addition to the per-package differences above.
              </CardDescription>
              <ul className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-2">
                {websiteDevelopment.sharedFeatures.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink">
                Have something customized in mind? Get in touch.
              </p>
            </Card>
          </Reveal>
        </Container>
      </Section>
      <ProjectClose />
    </MarketingPage>
  );
}
