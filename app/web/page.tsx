import { WebsiteDevelopmentPage } from "@/components/services/website-page";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { pageSeo } from "@/content/seo/pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: pageSeo.web.title,
  description: pageSeo.web.description,
  path: pageSeo.web.path,
});

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={[
          webPageJsonLd({
            title: pageSeo.web.title,
            description: pageSeo.web.description,
            path: "/web",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Website Development", path: "/web" },
          ]),
        ]}
      />
      <WebsiteDevelopmentPage />
    </>
  );
}
