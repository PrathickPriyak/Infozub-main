import { HomePage } from "@/components/home/home-page";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { pageSeo } from "@/content/seo/pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { webPageJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: pageSeo.home.title,
  description: pageSeo.home.description,
  path: pageSeo.home.path,
  absoluteTitle: true,
});

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={webPageJsonLd({
          title: pageSeo.home.title,
          description: pageSeo.home.description,
          path: "/",
        })}
      />
      <HomePage />
    </>
  );
}
