import { ClientsPage } from "@/components/clients/clients-page";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { pageSeo } from "@/content/seo/pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: pageSeo.clients.title,
  description: pageSeo.clients.description,
  path: pageSeo.clients.path,
});

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={[
          webPageJsonLd({
            title: pageSeo.clients.title,
            description: pageSeo.clients.description,
            path: "/clients",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Clients", path: "/clients" },
          ]),
        ]}
      />
      <ClientsPage />
    </>
  );
}
