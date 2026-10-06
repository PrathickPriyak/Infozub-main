import { PrivacyPolicyPage } from "@/components/legal/legal-pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/content/seo/pages";

export const metadata = buildMetadata({
  title: pageSeo.privacy.title,
  description: pageSeo.privacy.description,
  path: pageSeo.privacy.path,
});

export default function Page() {
  return <PrivacyPolicyPage />;
}
