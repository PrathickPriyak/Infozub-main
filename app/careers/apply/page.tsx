import type { Metadata } from "next";
import { CareersApplyPage } from "@/components/careers/careers-pages";

export const metadata: Metadata = {
  title: "Apply",
};

export default function Page() {
  return <CareersApplyPage />;
}
