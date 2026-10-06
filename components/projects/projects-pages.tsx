import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectClose } from "@/components/marketing/proof-sections";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { ProjectCard } from "@/components/projects/project-card";
import {
  getProjectBySlug,
  getRelatedProjects,
  projects,
  projectsSeo,
} from "@/content/projects";

export function ProjectsIndexPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        eyebrow="Projects"
        title="Campaign results"
        description={projectsSeo.description}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="signal" size="lg">
            <Link href="/contact">Start a project</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/clients">View clients</Link>
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Portfolio"
            title={`${projects.length} named campaign results`}
            description="Engagements published with results on the previous INFOZUB website."
          />
          <ProjectsGrid />
        </Container>
      </Section>

      <ProjectClose />
    </MarketingPage>
  );
}

export function ProjectDetailPage({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(slug);
  const primaryImage = project.images[0];

  return (
    <MarketingPage transparentHeader>
      <PageHero title={project.title} description={project.description}>
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="border-white/25 bg-white/5 text-white"
          >
            {project.categoryLabel}
          </Badge>
          {project.services.map((service) => (
            <Badge
              key={service}
              variant="outline"
              className="border-white/25 bg-white/5 text-white"
            >
              {service}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="signal" size="lg">
            <Link href="/contact">Discuss a similar project</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/projects">All projects</Link>
          </Button>
        </div>
      </PageHero>

      {primaryImage ? (
        <Section tone="surface" className="!pt-10">
          <Container>
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-mist shadow-soft">
                <Image
                  src={primaryImage.src}
                  alt={primaryImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeader title="Overview" className="mb-6" />
              <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                {project.description}
              </p>
              <SectionHeader title="Services used" className="mb-4 mt-10" />
              <ul className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <li key={service}>
                    <Badge variant="neutral">{service}</Badge>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeader title="Published results" className="mb-6" />
              <Stagger className="space-y-3">
                {project.results.map((result) => (
                  <StaggerItem key={result}>
                    <div className="rounded-xl border border-line bg-mist/70 px-4 py-4 text-sm font-medium text-ink md:text-base">
                      {result}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              {!project.externalUrl ? (
                <p className="mt-6 text-sm text-muted">
                  No public external project link was published for this
                  engagement.
                </p>
              ) : (
                <Button asChild variant="outline" className="mt-6">
                  <a href={project.externalUrl} rel="noreferrer">
                    Visit project
                  </a>
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="surface">
          <Container>
            <SectionHeader title="Related project" />
            <div className="grid gap-5 sm:grid-cols-2">
              {related.map((item) => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <ProjectClose />
    </MarketingPage>
  );
}
