import type { Metadata } from "next";
import { CareersApplyPage } from "@/components/careers/careers-pages";
import { applySeo } from "@/content/careers";

export const metadata: Metadata = {
  title: applySeo.title,
  description: applySeo.description,
  alternates: {
    canonical: "/careers/apply",
  },
};

export default function Page() {
  return <CareersApplyPage />;
}
