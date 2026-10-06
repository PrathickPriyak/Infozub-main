import { ThanksPage } from "@/components/legal/legal-pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/content/seo/pages";

export const metadata = buildMetadata({
  title: pageSeo.thanks.title,
  description: pageSeo.thanks.description,
  path: pageSeo.thanks.path,
});

export default function Page() {
  return <ThanksPage />;
}
