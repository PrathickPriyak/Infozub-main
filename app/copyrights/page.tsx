import { CopyrightsPage } from "@/components/legal/legal-pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/content/seo/pages";

export const metadata = buildMetadata({
  title: pageSeo.copyrights.title,
  description: pageSeo.copyrights.description,
  path: pageSeo.copyrights.path,
});

export default function Page() {
  return <CopyrightsPage />;
}
