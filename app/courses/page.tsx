import type { Metadata } from "next";
import { AcademyPage } from "@/components/academy/academy-page";
import { academySeo } from "@/content/academy";

/**
 * Legacy WordPress /courses/ path — same Academy entry experience.
 * Canonical URL is /academy.
 */
export const metadata: Metadata = {
  title: "Courses",
  description: academySeo.description,
  alternates: {
    canonical: "/academy",
  },
};

export default function Page() {
  return <AcademyPage />;
}
