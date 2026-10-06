import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";
import { contactSeo } from "@/content/contact";

export const metadata: Metadata = {
  title: contactSeo.title,
  description: contactSeo.description,
  alternates: {
    canonical: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
