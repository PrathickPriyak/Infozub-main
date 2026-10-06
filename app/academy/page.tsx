import type { Metadata } from "next";
import { AcademyPage } from "@/components/academy/academy-page";
import { academySeo } from "@/content/academy";

export const metadata: Metadata = {
  title: "Academy",
  description: academySeo.description,
};

export default function Page() {
  return <AcademyPage />;
}
