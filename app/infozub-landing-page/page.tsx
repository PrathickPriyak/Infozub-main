import { CampaignLandingPage } from "@/components/legal/legal-pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/content/seo/pages";

export const metadata = buildMetadata({
  title: pageSeo.landingPage.title,
  description: pageSeo.landingPage.description,
  path: pageSeo.landingPage.path,
});

export default function Page() {
  return (
    <CampaignLandingPage
      title={pageSeo.landingPage.title}
      description={pageSeo.landingPage.description}
      path={pageSeo.landingPage.path}
    />
  );
}
