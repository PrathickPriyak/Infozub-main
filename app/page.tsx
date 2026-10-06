import { HomePage } from "@/components/home/home-page";
import { homeSeo } from "@/content/home";

export const metadata = {
  title: {
    absolute: homeSeo.title,
  },
  description: homeSeo.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    url: "/",
    type: "website",
  },
};

export default function Page() {
  return <HomePage />;
}
