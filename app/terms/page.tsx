import { TermsPage } from "@/components/legal/legal-pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/content/seo/pages";

export const metadata = buildMetadata({
  title: pageSeo.terms.title,
  description: pageSeo.terms.description,
  path: pageSeo.terms.path,
});

export default function Page() {
  return <TermsPage />;
}
