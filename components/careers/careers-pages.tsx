import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { ProjectClose } from "@/components/marketing/proof-sections";
import {
  careersHero,
  careersPitch,
  hiringCategories,
  resumeEmail,
  workLocations,
} from "@/content/careers";
import { site } from "@/content/site";

export function CareersPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero title={careersHero.title} description={careersHero.description}>
        <Button asChild variant="signal" size="lg">
          <a href={`mailto:${resumeEmail}`}>Send your resume to {resumeEmail}</a>
        </Button>
      </PageHero>

      <Section tone="surface">
        <Container className="max-w-3xl">
          <p className="text-lg leading-relaxed text-muted">{careersPitch}</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            title="Roles we hire for"
            description="These titles appear as options on the public job application form. They are not a confirmed list of live openings."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {hiringCategories.map((role) => (
              <Card key={role}>
                <CardTitle className="text-base">{role}</CardTitle>
              </Card>
            ))}
          </div>
          <Reveal className="mt-10">
            <Card className="bg-mist/70">
              <CardTitle>Don’t see the right role?</CardTitle>
              <CardDescription>
                Send your resume to {resumeEmail}. Work locations listed on the
                application form: {workLocations.join("; ")}.
              </CardDescription>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild variant="signal">
                  <a href={`mailto:${resumeEmail}`}>Email resume</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/careers/apply">Open application form</a>
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>
      <ProjectClose />
    </MarketingPage>
  );
}

const designations = hiringCategories;
const locations = workLocations;

export function CareersApplyPage() {
  const subject = "INFOZUB job application";
  const body = [
    "Designation:",
    "Name:",
    "Phone:",
    "Email:",
    "City:",
    "Work location preference:",
    "Educational qualification:",
    "Currently employed:",
    "Previous experience:",
  ].join("%0D%0A");

  return (
    <MarketingPage>
      <PageHero
        tone="mist"
        title="Apply"
        description="The previous site used an embedded application form. Until first-party mail is configured, applications go to the careers email with the same fields."
      />
      <Section>
        <Container className="max-w-2xl">
          <p className="text-sm text-muted">
            Preferred locations: {locations.join("; ")}. Designations:{" "}
            {designations.join(", ")}.
          </p>
          <Button asChild variant="signal" className="mt-6">
            <a
              href={`mailto:${resumeEmail}?subject=${encodeURIComponent(subject)}&body=${body}`}
            >
              Start application email
            </a>
          </Button>
          <p className="mt-4 text-sm text-muted">
            Or write directly to {resumeEmail} / {site.phoneDisplay}.
          </p>
        </Container>
      </Section>
    </MarketingPage>
  );
}
