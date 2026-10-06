import type { Metadata } from "next";
import { CareersPage } from "@/components/careers/careers-pages";
import { careersSeo } from "@/content/careers";

export const metadata: Metadata = {
  title: careersSeo.title,
  description: careersSeo.description,
};

export default function Page() {
  return <CareersPage />;
}
