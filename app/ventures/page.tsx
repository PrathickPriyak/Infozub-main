import { VenturesPage } from "@/components/contact/simple-pages";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { pageSeo } from "@/content/seo/pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: pageSeo.ventures.title,
  description: pageSeo.ventures.description,
  path: pageSeo.ventures.path,
});

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={[
          webPageJsonLd({
            title: pageSeo.ventures.title,
            description: pageSeo.ventures.description,
            path: "/ventures",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Ventures", path: "/ventures" },
          ]),
        ]}
      />
      <VenturesPage />
    </>
  );
}
