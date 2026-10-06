import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectClose } from "@/components/marketing/proof-sections";
import {
  academyAudience,
  academyBenefits,
  academyCourses,
  academyFormat,
  academyHero,
  academyOrigin,
} from "@/content/academy";

export function AcademyPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        eyebrow={academyHero.eyebrow}
        title={academyHero.title}
        description={academyHero.description}
      >
        <Button asChild variant="signal" size="lg">
          <a href={academyOrigin} rel="noreferrer">
            Registration is open
          </a>
        </Button>
      </PageHero>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="What we offer"
            title="Skyrocket your digital marketing skill with our course"
            description={`Each card is labeled “${academyFormat}”. Lesson content lives on the Academy platform.`}
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {academyCourses.map((course) => (
              <StaggerItem key={course.title}>
                <Card interactive className="h-full">
                  <Badge variant="neutral">{academyFormat}</Badge>
                  <CardTitle className="mt-3">{course.title}</CardTitle>
                  <Button asChild variant="outline" className="mt-5">
                    <a href={course.href} rel="noreferrer">
                      Start course
                    </a>
                  </Button>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <SectionHeader title="Join this course and get access" className="mb-6" />
            <ul className="space-y-3 text-sm text-muted">
              {academyBenefits.map((item) => (
                <li key={item} className="rounded-lg border border-line bg-surface px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <SectionHeader
              title="This course is suitable for"
              className="mb-6"
            />
            <div className="flex flex-wrap gap-2">
              {academyAudience.map((item) => (
                <Badge key={item} variant="signal">
                  {item}
                </Badge>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="ink">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-semibold text-white">
            You are just one step away
          </h2>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="mt-8 border-transparent bg-white text-ink"
          >
            <a href={academyOrigin} rel="noreferrer">
              Enroll now
            </a>
          </Button>
        </Container>
      </Section>
      <ProjectClose />
    </MarketingPage>
  );
}
