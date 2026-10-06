import { CityServicePage } from "@/components/services/city-page";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { pageSeo } from "@/content/seo/pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: pageSeo.tirupur.title,
  description: pageSeo.tirupur.description,
  path: pageSeo.tirupur.path,
});

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={[
          webPageJsonLd({
            title: pageSeo.tirupur.title,
            description: pageSeo.tirupur.description,
            path: pageSeo.tirupur.path,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Digital Suite", path: "/digital-suite" },
            { name: "Tirupur", path: pageSeo.tirupur.path },
          ]),
        ]}
      />
      <CityServicePage city="tirupur" />
    </>
  );
}
