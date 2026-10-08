import { ServicesOverviewPage } from "@/components/services/services-overview";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { pageSeo } from "@/content/seo/pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: pageSeo.digitalSuite.title,
  description: pageSeo.digitalSuite.description,
  path: pageSeo.digitalSuite.path,
});

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={[
          webPageJsonLd({
            title: pageSeo.digitalSuite.title,
            description: pageSeo.digitalSuite.description,
            path: "/digital-suite",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Digital Suite", path: "/digital-suite" },
          ]),
        ]}
      />
      <ServicesOverviewPage />
    </>
  );
}
