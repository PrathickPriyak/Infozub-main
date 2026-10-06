import {
  Briefcase,
  GraduationCap,
  Palette,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectClose } from "@/components/marketing/proof-sections";
import {
  AcademyCategoryCard,
  AcademyExternalCta,
  CourseCard,
} from "@/components/academy/course-card";
import {
  academyAudience,
  academyBenefits,
  academyCategories,
  academyCourses,
  academyCta,
  academyHero,
  academyIntro,
  academyOffersHeading,
  academyOrigin,
  academyTraining,
  getCoursesForCategory,
  getFeaturedCourses,
} from "@/content/academy";

const categoryIcons: Record<string, LucideIcon> = {
  "digital-marketing": GraduationCap,
  "design-creative": Palette,
  "career-business": Briefcase,
  "ai-web": Sparkles,
};

export function AcademyPage() {
  const featured = getFeaturedCourses();

  return (
    <MarketingPage transparentHeader>
      <div className="academy-surface">
        <PageHero
          eyebrow={academyHero.eyebrow}
          title={academyHero.title}
          description={academyHero.description}
        >
          <div className="flex flex-wrap gap-3">
            <AcademyExternalCta
              href={academyCta.secondary.href}
              label={academyCta.secondary.label}
            />
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#featured-courses">View courses</a>
            </Button>
          </div>
        </PageHero>

        <Section tone="surface">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <Reveal>
                <SectionHeader
                  eyebrow="Digital Academy"
                  title={academyIntro.title}
                  description={academyIntro.body}
                />
              </Reveal>
              <Reveal>
                <aside className="rounded-xl border border-signal/25 bg-signal-soft/70 p-6 shadow-soft">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wide text-signal-strong">
                    INFOZUB Ventures
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-ink">
                    {academyIntro.ventureLine}
                  </p>
                  <p className="mt-4 text-sm text-muted">
                    Enrollment and lessons stay on{" "}
                    <a
                      href={academyOrigin}
                      rel="noreferrer"
                      className="font-semibold text-navy underline-offset-2 hover:underline focus-ring rounded-sm"
                    >
                      academy.infozub.com
                    </a>
                    .
                  </p>
                </aside>
              </Reveal>
            </div>
          </Container>
        </Section>

        <Section id="categories">
          <Container>
            <SectionHeader
              eyebrow="Course categories"
              title={academyOffersHeading.title}
              description="Browse Academy courses by skill area. Start Course opens academy.infozub.com."
            />
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {academyCategories.map((category) => {
                const courses = getCoursesForCategory(category.courseSlugs);
                return (
                  <StaggerItem key={category.id}>
                    <AcademyCategoryCard
                      title={category.title}
                      description={category.description}
                      courseCount={courses.length}
                      icon={categoryIcons[category.id]}
                      href="#all-courses"
                    />
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Container>
        </Section>

        <Section tone="surface" id="benefits">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2">
              <Reveal>
                <SectionHeader
                  eyebrow="Learning benefits"
                  title={academyBenefits.title}
                  className="mb-6"
                />
                <ul className="space-y-3">
                  {academyBenefits.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal>
                <SectionHeader
                  title={academyAudience.title}
                  description={academyAudience.prompt}
                  className="mb-6"
                />
                <div className="flex flex-wrap gap-2">
                  {academyAudience.items.map((item) => (
                    <Badge key={item} variant="signal" className="gap-1.5">
                      <Users className="size-3.5" aria-hidden />
                      {item}
                    </Badge>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        <Section id="featured-courses">
          <Container>
            <SectionHeader
              eyebrow={academyOffersHeading.eyebrow}
              title="Featured courses"
              description={academyOffersHeading.title}
            />
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((course) => (
                <StaggerItem key={course.slug}>
                  <CourseCard course={course} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>

        <Section tone="surface" id="all-courses">
          <Container>
            <SectionHeader
              eyebrow="Course catalog"
              title="All Academy courses"
              description="Start Course links open the Digital Academy platform — the source of truth for lessons and enrollment."
            />
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {academyCourses.map((course) => (
                <StaggerItem key={course.slug}>
                  <CourseCard course={course} compact />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>

        <Section id="training">
          <Container>
            <SectionHeader
              eyebrow="How learning works"
              title={academyTraining.title}
              description={academyTraining.description}
            />
            <Stagger className="grid gap-4 md:grid-cols-3">
              {academyTraining.points.map((point) => (
                <StaggerItem key={point.title}>
                  <div className="h-full rounded-xl border border-signal/20 bg-signal-soft/40 p-6">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {point.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {point.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="mt-8">
              <AcademyExternalCta
                href={academyOrigin}
                label={academyCta.browseLabel}
              />
            </Reveal>
          </Container>
        </Section>

        <Section tone="ink">
          <Container className="text-center">
            <Reveal>
              <p className="font-mono text-xs font-semibold uppercase tracking-wide text-signal">
                INFOZUB Digital Academy
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                {academyCta.title}
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="border-transparent bg-white text-ink hover:bg-mist"
                >
                  <a href={academyCta.primary.href} rel="noreferrer">
                    {academyCta.primary.label}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={academyOrigin} rel="noreferrer">
                    {academyCta.browseLabel}
                  </a>
                </Button>
              </div>
            </Reveal>
          </Container>
        </Section>
      </div>

      <ProjectClose />
    </MarketingPage>
  );
}
