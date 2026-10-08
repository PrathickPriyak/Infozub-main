import { ReviewsPage } from "@/components/legal/legal-pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/content/seo/pages";

export const metadata = buildMetadata({
  title: pageSeo.reviews.title,
  description: pageSeo.reviews.description,
  path: pageSeo.reviews.path,
});

export default function Page() {
  return <ReviewsPage />;
}
