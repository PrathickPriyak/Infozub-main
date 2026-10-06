import type { Metadata } from "next";
import { CityServicePage } from "@/components/services/city-page";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Tiruppur",
  description:
    "Premier Digital Marketing Service Provider in Tiruppur, India. Customized Marketing Strategies for your Company's Best Digital ROAS.",
};

export default function Page() {
  return <CityServicePage city="tirupur" />;
}
