import { CityServicePage } from "@/components/services/city-page";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { pageSeo } from "@/content/seo/pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: pageSeo.coimbatore.title,
  description: pageSeo.coimbatore.description,
  path: pageSeo.coimbatore.path,
});

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={[
          webPageJsonLd({
            title: pageSeo.coimbatore.title,
            description: pageSeo.coimbatore.description,
            path: pageSeo.coimbatore.path,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Digital Suite", path: "/digital-suite" },
            { name: "Coimbatore", path: pageSeo.coimbatore.path },
          ]),
        ]}
      />
      <CityServicePage city="coimbatore" />
    </>
  );
}
