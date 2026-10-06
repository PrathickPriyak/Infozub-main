import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";
import { aboutSeo } from "@/content/about";

export const metadata: Metadata = {
  title: aboutSeo.title,
  description: aboutSeo.description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About | INFOZUB`,
    description: aboutSeo.description,
    url: "/about",
    type: "website",
  },
};

export default function Page() {
  return <AboutPage />;
}
