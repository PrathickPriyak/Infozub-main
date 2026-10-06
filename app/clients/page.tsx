import type { Metadata } from "next";
import { ClientsPage } from "@/components/contact/simple-pages";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "INFOZUB - strives the best in the industry. We provide high-quality solutions that are tailored to our client's unique business needs.",
};

export default function Page() {
  return <ClientsPage />;
}
