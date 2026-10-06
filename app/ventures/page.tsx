import type { Metadata } from "next";
import { VenturesPage } from "@/components/contact/simple-pages";

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "INFOZUB Ventures - Whole new bunch of products and services, crafted in-house at INFOZUB with our 9+ years of experience.",
};

export default function Page() {
  return <VenturesPage />;
}
