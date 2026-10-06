import { CareersApplyPage } from "@/components/careers/careers-pages";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { pageSeo } from "@/content/seo/pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: pageSeo.apply.title,
  description: pageSeo.apply.description,
  path: pageSeo.apply.path,
});

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={[
          webPageJsonLd({
            title: pageSeo.apply.title,
            description: pageSeo.apply.description,
            path: "/careers/apply",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/careers" },
            { name: "Apply", path: "/careers/apply" },
          ]),
        ]}
      />
      <CareersApplyPage />
    </>
  );
}
