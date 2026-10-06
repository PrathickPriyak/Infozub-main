import type { Metadata } from "next";
import { ProjectDetailPage } from "@/components/projects/projects-pages";
import { projects } from "@/content/projects";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project" };
  return { title: project.title };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!projects.some((item) => item.slug === slug)) notFound();
  return <ProjectDetailPage slug={slug} />;
}
