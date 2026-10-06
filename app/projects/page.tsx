import type { Metadata } from "next";
import { ProjectsIndexPage } from "@/components/projects/projects-pages";
import { projectsSeo } from "@/content/projects";

export const metadata: Metadata = {
  title: projectsSeo.title,
  description: projectsSeo.description,
};

export default function Page() {
  return <ProjectsIndexPage />;
}
