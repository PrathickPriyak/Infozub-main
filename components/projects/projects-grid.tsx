import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

export function ProjectsGrid() {
  return (
    <div>
      <div className={cn("grid gap-5 sm:grid-cols-2")}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            priority={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
