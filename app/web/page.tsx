import type { Metadata } from "next";
import { WebsiteDevelopmentPage } from "@/components/services/website-page";

export const metadata: Metadata = {
  title: "Website Development",
};

export default function Page() {
  return <WebsiteDevelopmentPage />;
}
