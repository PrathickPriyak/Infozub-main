import { PaymentsPage } from "@/components/legal/legal-pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/content/seo/pages";

export const metadata = buildMetadata({
  title: pageSeo.payments.title,
  description: pageSeo.payments.description,
  path: pageSeo.payments.path,
});

export default function Page() {
  return <PaymentsPage />;
}
