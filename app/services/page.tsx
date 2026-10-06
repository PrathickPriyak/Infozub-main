import type { Metadata } from "next";
import { ServicesOverviewPage } from "@/components/services/services-overview";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Premier Digital Marketing Service Provider in Tamil Nadu, India. Customized Marketing Strategies for your Company's Best Digital ROAS.",
};

export default function Page() {
  return <ServicesOverviewPage />;
}
