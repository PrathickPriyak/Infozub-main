import type { Metadata } from "next";
import { AcademyPage } from "@/components/academy/academy-page";
import { academySeo } from "@/content/academy";

export const metadata: Metadata = {
  title: academySeo.title,
  description: academySeo.description,
  alternates: {
    canonical: "/academy",
  },
};

export default function Page() {
  return <AcademyPage />;
}
