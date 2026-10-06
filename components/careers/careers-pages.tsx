import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectClose } from "@/components/marketing/proof-sections";
import {
  CareersResumeCta,
  JobOpeningsList,
} from "@/components/careers/job-card";
import {
  careersHero,
  careersPitch,
  getJobBySlug,
  jobApplicationFormUrl,
  jobOpenings,
  openRolesCount,
  resumeEmail,
  whyWorkWithUs,
  workLocations,
} from "@/content/careers";

export function CareersPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        eyebrow={careersHero.eyebrow}
        title={careersHero.title}
        description={careersHero.description}
      >
        <p className="mb-6 max-w-2xl text-sm text-white/75 md:text-base">
          {careersHero.contactLine}
        </p>
        <div className="flex w-full max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild variant="signal" size="lg" className="w-full sm:w-auto">
            <a href={`mailto:${resumeEmail}`}>Email resume</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white sm:w-auto"
          >
            <Link href="/careers/apply">Apply now</Link>
          </Button>
        </div>
      </PageHero>

      <Section tone="surface" id="why-infozub">
        <Container>
          <SectionHeader
            eyebrow="Why work with INFOZUB"
            title={careersPitch.lead}
            description={careersPitch.body}
          />
          <Stagger className="grid gap-4 md:grid-cols-3">
            {whyWorkWithUs.map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-xl border border-line bg-surface p-6 shadow-soft">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/about">About INFOZUB</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Reach Us</Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      <Section id="openings">
        <Container>
          <SectionHeader
            eyebrow="Current openings"
            title={
              openRolesCount > 0
                ? `${openRolesCount} open role${openRolesCount === 1 ? "" : "s"}`
                : "No open roles right now"
            }
            description={
              openRolesCount > 0
                ? "Published positions at INFOZUB. Select a role for details and apply."
                : "We are not listing active vacancies on this page at the moment. You can still share your resume with the Careers team."
            }
          />
          <JobOpeningsList jobs={jobOpenings} />
          {openRolesCount > 0 ? (
            <CareersResumeCta className="mt-10" />
          ) : null}
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader
            title="Work locations"
            description="Preferences collected on the INFOZUB job application form."
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {workLocations.map((location) => (
              <li
                key={location}
                className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-ink"
              >
                {location}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ProjectClose />
    </MarketingPage>
  );
}

export function JobDetailPage({ slug }: { slug: string }) {
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const applyHref = job.applyHref ?? "/careers/apply";

  return (
    <MarketingPage transparentHeader>
      <PageHero
        title={job.title}
        description={job.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: job.title },
        ]}
      >
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="border-white/25 bg-white/5 text-white"
          >
            {job.type}
          </Badge>
          <Badge
            variant="outline"
            className="border-white/25 bg-white/5 text-white"
          >
            {job.department}
          </Badge>
          <Badge
            variant="outline"
            className="border-white/25 bg-white/5 text-white"
          >
            {job.location}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="signal" size="lg">
            <Link href={applyHref}>Apply for this role</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/careers">All openings</Link>
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container className="max-w-3xl">
          {job.responsibilities && job.responsibilities.length > 0 ? (
            <div className="mb-10">
              <SectionHeader title="Responsibilities" className="mb-4" />
              <ul className="space-y-3 text-sm leading-relaxed text-muted md:text-base">
                {job.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-line bg-mist/70 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {job.requirements && job.requirements.length > 0 ? (
            <div className="mb-10">
              <SectionHeader title="Requirements" className="mb-4" />
              <ul className="space-y-3 text-sm leading-relaxed text-muted md:text-base">
                {job.requirements.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-line bg-mist/70 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <CareersResumeCta />
        </Container>
      </Section>

      <ProjectClose />
    </MarketingPage>
  );
}

export function CareersApplyPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        eyebrow="Careers"
        title="Apply to INFOZUB"
        description="Submit the INFOZUB job application form. Preferred work locations and designation options match the previous careers apply page."
      >
        <div className="flex w-full max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild variant="signal" size="lg" className="w-full sm:w-auto">
            <a href={`mailto:${resumeEmail}`}>Email {resumeEmail}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white sm:w-auto"
          >
            <Link href="/careers">Back to careers</Link>
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container>
          <SectionHeader
            title="Application form"
            description="The same public form used on the previous INFOZUB careers apply page. Required fields include designation, contact details, location preference, experience, and resume upload."
          />
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
            <iframe
              title="INFOZUB job application form"
              src={jobApplicationFormUrl}
              className="min-h-[70vh] w-full border-0 bg-white md:min-h-[80vh]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
          <p className="mt-4 text-sm text-muted">
            If the form does not load, email your resume to{" "}
            <a
              href={`mailto:${resumeEmail}`}
              className="font-semibold text-navy underline-offset-2 hover:underline focus-ring rounded-sm"
            >
              {resumeEmail}
            </a>
            .
          </p>
          <CareersResumeCta className="mt-8" />
        </Container>
      </Section>
    </MarketingPage>
  );
}
