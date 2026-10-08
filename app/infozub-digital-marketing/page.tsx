import { CampaignLandingPage } from "@/components/legal/legal-pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/content/seo/pages";

export const metadata = buildMetadata({
  title: pageSeo.digitalMarketingLanding.title,
  description: pageSeo.digitalMarketingLanding.description,
  path: pageSeo.digitalMarketingLanding.path,
});

export default function Page() {
  return (
    <CampaignLandingPage
      title={pageSeo.digitalMarketingLanding.title}
      description={pageSeo.digitalMarketingLanding.description}
      path={pageSeo.digitalMarketingLanding.path}
    />
  );
}
