import { AcademyPage } from "@/components/academy/academy-page";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { pageSeo } from "@/content/seo/pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: pageSeo.academy.title,
  description: pageSeo.academy.description,
  path: pageSeo.academy.path,
});

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={[
          webPageJsonLd({
            title: pageSeo.academy.title,
            description: pageSeo.academy.description,
            path: "/academy",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Academy", path: "/academy" },
          ]),
        ]}
      />
      <AcademyPage />
    </>
  );
}
