import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { testimonials } from "@/content/proof";
import {
  copyrightsContent,
  paymentsContent,
  privacyParagraphs,
  reviewsContent,
  termsSections,
  thanksContent,
} from "@/content/legal";
import { site } from "@/content/site";

function LegalBreadcrumbs({
  path,
  label,
}: {
  path: string;
  label: string;
}) {
  return (
    <JsonLdScript
      data={[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: label, path },
        ]),
        webPageJsonLd({
          title: label,
          description: label,
          path,
        }),
      ]}
    />
  );
}

export function PaymentsPage() {
  const { hero, card, gst, bank, notes, policyNote, seo } = paymentsContent;
  return (
    <MarketingPage transparentHeader>
      <LegalBreadcrumbs path={seo.path} label={seo.title} />
      <PageHero title={hero.title} description={hero.description} />
      <Section tone="surface">
        <Container className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Card>
              <CardTitle>{card.title}</CardTitle>
              <p className="mt-3 text-sm text-muted">{policyNote}</p>
              <Button asChild variant="signal" className="mt-6">
                <a href={card.ctaHref} rel="noreferrer">
                  {card.ctaLabel}
                </a>
              </Button>
              <p className="mt-4 text-xs text-muted">
                Also review{" "}
                <Link href="/terms" className="font-semibold text-navy underline-offset-2 hover:underline">
                  Terms &amp; Conditions
                </Link>{" "}
                before paying.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card>
              <p className="text-xs font-semibold uppercase tracking-wide text-signal-strong">
                GST
              </p>
              <p className="mt-2 font-mono text-sm text-ink">{gst}</p>
              <CardTitle className="mt-6">{bank.heading}</CardTitle>
              <dl className="mt-4 space-y-3 text-sm">
                {bank.rows.map((row) => (
                  <div key={row.label}>
                    <dt className="text-muted">{row.label}</dt>
                    <dd className="font-medium text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-muted">
                {notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </MarketingPage>
  );
}

export function TermsPage() {
  return (
    <MarketingPage transparentHeader>
      <LegalBreadcrumbs path="/terms" label="Terms & Conditions" />
      <PageHero
        title="Terms & Conditions"
        description="General terms, cancellation, and refund policies published by INFOZUB."
      />
      <Section>
        <Container width="narrow" className="space-y-10">
          {termsSections.map((section) => (
            <article key={section.heading}>
              <h2 className="font-display text-2xl font-semibold text-ink">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted md:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
          <p className="text-sm text-muted">
            A separate WordPress privacy sample also exists at{" "}
            <Link href="/privacy-policy" className="font-semibold text-navy underline-offset-2 hover:underline">
              /privacy-policy
            </Link>
            .
          </p>
        </Container>
      </Section>
    </MarketingPage>
  );
}

export function PrivacyPolicyPage() {
  return (
    <MarketingPage transparentHeader>
      <LegalBreadcrumbs path="/privacy-policy" label="Privacy Policy" />
      <PageHero
        title="Privacy Policy"
        description="How INFOZUB describes handling of website visitor data on the published privacy policy page."
      />
      <Section>
        <Container width="narrow" className="space-y-4 text-sm leading-relaxed text-muted md:text-base">
          {privacyParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          <p>
            For service terms and the privacy block used in the footer link, see{" "}
            <Link href="/terms" className="font-semibold text-navy underline-offset-2 hover:underline">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </Container>
      </Section>
    </MarketingPage>
  );
}

export function CopyrightsPage() {
  const { hero, paragraphs, contactEmail, seo } = copyrightsContent;
  return (
    <MarketingPage transparentHeader>
      <LegalBreadcrumbs path={seo.path} label={seo.title} />
      <PageHero title={hero.title} description={hero.description} />
      <Section>
        <Container width="narrow" className="space-y-4 text-sm leading-relaxed text-muted md:text-base">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <p>
            Contact:{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="font-semibold text-navy underline-offset-2 hover:underline"
            >
              {contactEmail}
            </a>
          </p>
        </Container>
      </Section>
    </MarketingPage>
  );
}

export function ThanksPage() {
  const { hero, phoneDisplay, phoneHref, seo } = thanksContent;
  return (
    <MarketingPage transparentHeader>
      <LegalBreadcrumbs path={seo.path} label={seo.title} />
      <PageHero title={hero.title} description={hero.description}>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="signal" size="lg">
            <a href={phoneHref}>Call {phoneDisplay}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </PageHero>
      <Section tone="surface">
        <Container>
          <p className="max-w-2xl text-muted">
            Prefer email? Reach {site.email} or return to{" "}
            <Link href="/contact" className="font-semibold text-navy underline-offset-2 hover:underline">
              Contact
            </Link>
            .
          </p>
        </Container>
      </Section>
    </MarketingPage>
  );
}

export function ReviewsPage() {
  const { hero, note, seo } = reviewsContent;
  return (
    <MarketingPage transparentHeader>
      <LegalBreadcrumbs path={seo.path} label={seo.title} />
      <PageHero title={hero.title} description={hero.description} />
      <Section tone="surface">
        <Container>
          <SectionHeader
            title="Client testimonials"
            description={note}
          />
          <Stagger className="grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <StaggerItem key={item.name}>
                <Card className="h-full">
                  <p className="text-sm leading-relaxed text-muted">
                    “{item.quote}”
                  </p>
                  <p className="mt-4 font-display text-base font-semibold text-ink">
                    {item.name}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/clients">Clients</Link>
            </Button>
            <Button asChild variant="signal">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </MarketingPage>
  );
}

export function CampaignLandingPage({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return (
    <MarketingPage transparentHeader>
      <LegalBreadcrumbs path={path} label={title} />
      <PageHero title={title} description={description}>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="signal" size="lg">
            <Link href="/digital-suite">Explore Digital Suite</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </PageHero>
      <Section>
        <Container>
          <p className="max-w-2xl text-muted">
            This URL was a published campaign landing on the previous INFOZUB
            WordPress site. Full suite details, city pages, and contact options
            live on the Digital Suite and Contact pages.
          </p>
        </Container>
      </Section>
    </MarketingPage>
  );
}
