import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/simple-pages";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "We offer digital marketing solutions to help you boost your brand online. Contact us today to know more about our services.",
};

export default function Page() {
  return <ContactPage />;
}
