import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { projects } from "@/content/projects";
import { ProjectClose } from "@/components/marketing/proof-sections";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function ProjectsIndexPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        title="Projects"
        description="The previous website had no public project archive. These are the only named campaign results published with figures."
      />
      <Section>
        <Container>
          <Stagger className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <StaggerItem key={project.slug}>
                <Card interactive className="h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal-strong">
                    {project.category}
                  </p>
                  <CardTitle className="mt-3">{project.title}</CardTitle>
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    {project.highlights.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="mt-6">
                    <Link href={`/projects/${project.slug}`}>View details</Link>
                  </Button>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
      <ProjectClose />
    </MarketingPage>
  );
}

export function ProjectDetailPage({ slug }: { slug: string }) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <MarketingPage transparentHeader>
      <PageHero title={project.title} description={project.category} />
      <Section>
        <Container>
          <SectionHeader title="Published results" />
          <ul className="max-w-xl space-y-3 text-muted">
            {project.highlights.map((line) => (
              <li key={line} className="rounded-xl border border-line bg-surface px-4 py-3">
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            No additional description, technology list, or project gallery was
            published for this engagement.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/projects">All projects</Link>
          </Button>
        </Container>
      </Section>
      <ProjectClose />
    </MarketingPage>
  );
}
