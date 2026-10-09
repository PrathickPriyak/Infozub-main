import Link from "next/link";
import {
  Briefcase,
  CheckCircle2,
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
} from "@/content/academy";
import { enquiryCta, enquiryHref } from "@/content/enquiry";

const categoryIcons: Record<string, LucideIcon> = {
  "digital-marketing": GraduationCap,
  "design-creative": Palette,
  "career-business": Briefcase,
  "ai-web": Sparkles,
};

export function AcademyPage() {
  return (
    <MarketingPage transparentHeader>
      <div className="academy-surface">
        <PageHero
          eyebrow={academyHero.eyebrow}
          title={academyHero.title}
          description={academyHero.description}
        >
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="signal" size="lg" className="cta-pulse">
              <Link href={enquiryHref("Digital Marketing Course")}>
                {enquiryCta.course.label}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#what-we-offer">View courses</a>
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
                <aside className="rounded-xl border border-ember/30 bg-ember-soft/80 p-6 shadow-soft">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wide text-ember-strong">
                    INFOZUB Ventures
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-ink">
                    {academyIntro.ventureLine}
                  </p>
                  <p className="mt-4 text-sm text-muted">
                    Enrollment and lessons stay on{" "}
                    <a
                      href={academyOrigin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm font-semibold text-navy underline-offset-2 hover:underline focus-ring"
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

        <Section id="what-we-offer" className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute -right-24 top-10 size-72 rounded-full bg-ember/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-0 size-64 rounded-full bg-navy/10 blur-3xl"
            aria-hidden
          />
          <Container className="relative">
            <Reveal>
              <SectionHeader
                eyebrow={academyOffersHeading.eyebrow}
                title={academyOffersHeading.title}
                description="Each course is Online Self Placed. Start Course opens the matching page on academy.infozub.com."
                align="center"
                className="mx-auto max-w-3xl"
              />
            </Reveal>

            <Stagger className="mt-2 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {academyCourses.map((course, index) => (
                <StaggerItem key={course.slug}>
                  <CourseCard course={course} index={index} />
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <AcademyExternalCta
                href={academyOrigin}
                label={academyCta.browseLabel}
              />
              <Button asChild variant="outline">
                <a href="#categories">Browse by category</a>
              </Button>
            </Reveal>
          </Container>
        </Section>

        <Section id="categories" tone="surface">
          <Container>
            <SectionHeader
              eyebrow="Course categories"
              title="Browse by skill area"
              description="Jump to the same published courses, grouped for quicker scanning."
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
                      href={`#category-${category.id}`}
                    />
                  </StaggerItem>
                );
              })}
            </Stagger>

            <div className="mt-12 space-y-12">
              {academyCategories.map((category) => {
                const courses = getCoursesForCategory(category.courseSlugs);
                return (
                  <div key={category.id} id={`category-${category.id}`}>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {category.description}
                    </p>
                    <Stagger className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {courses.map((course, index) => (
                        <StaggerItem key={course.slug}>
                          <CourseCard
                            course={course}
                            compact
                            index={index}
                          />
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>

        <Section id="benefits" pattern="dots">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2">
              <Reveal>
                <SectionHeader
                  eyebrow="Learning benefits"
                  title={academyBenefits.title}
                  className="mb-6"
                />
                <ul className="space-y-3">
                  {academyBenefits.items.map((item, index) => (
                    <li
                      key={item}
                      className="benefit-row flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-muted shadow-soft transition-transform duration-300 hover:-translate-x-0.5 hover:border-ember/30"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <CheckCircle2
                        className="mt-0.5 size-5 shrink-0 text-ember"
                        aria-hidden
                      />
                      <span>{item}</span>
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
                  {academyAudience.items.map((item, index) => (
                    <Badge
                      key={item}
                      variant="signal"
                      className="audience-chip gap-1.5"
                      style={{ animationDelay: `${index * 90}ms` }}
                    >
                      <Users className="size-3.5" aria-hidden />
                      {item}
                    </Badge>
                  ))}
                </div>
              </Reveal>
            </div>
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
                  <div className="h-full rounded-xl border border-ember/25 bg-ember-soft/50 p-6 transition-transform duration-300 hover:-translate-y-1">
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
              <p className="font-mono text-xs font-semibold uppercase tracking-wide text-ember">
                INFOZUB Digital Academy
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                {academyCta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
                Interested in Learning Digital Marketing? Enquire Today.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  variant="signal"
                  size="lg"
                  className="cta-pulse"
                >
                  <Link href={enquiryHref("Digital Marketing Course")}>
                    {enquiryCta.course.label}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  <a
                    href={academyOrigin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {academyCta.browseLabel}
                  </a>
                </Button>
              </div>
            </Reveal>
          </Container>
        </Section>
      </div>
    </MarketingPage>
  );
}
