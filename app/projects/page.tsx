import { ProjectsIndexPage } from "@/components/projects/projects-pages";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { pageSeo } from "@/content/seo/pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: pageSeo.projects.title,
  description: pageSeo.projects.description,
  path: pageSeo.projects.path,
});

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={[
          webPageJsonLd({
            title: pageSeo.projects.title,
            description: pageSeo.projects.description,
            path: "/projects",
            type: "CollectionPage",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />
      <ProjectsIndexPage />
    </>
  );
}
