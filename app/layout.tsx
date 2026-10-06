import type { Metadata } from "next";
import { Outfit, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import { ReducedMotionProvider } from "@/components/motion/reduced-motion";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";
import {
  DEFAULT_OG_PATH,
  SITE_ORIGIN,
  TWITTER_HANDLE,
  absoluteUrl,
} from "@/lib/seo/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "INFOZUB — Premier Digital Marketing Agency",
    template: "%s | INFOZUB",
  },
  description:
    "Infozub Private Limited — modern digital marketing, growth systems, and digital academy.",
  applicationName: "INFOZUB",
  authors: [{ name: "Infozub Private Limited", url: SITE_ORIGIN }],
  creator: "Infozub Private Limited",
  publisher: "Infozub Private Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_ORIGIN,
    siteName: "INFOZUB",
    title: "INFOZUB — Premier Digital Marketing Agency",
    description:
      "Modern Ad-Personalization and Advanced Digital Marketing Solution(s) Provider. Get Maximum ROAS with Tailored Digital Marketing Automation.",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_PATH),
        width: 1200,
        height: 630,
        alt: "INFOZUB — Premier Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: "INFOZUB — Premier Digital Marketing Agency",
    description:
      "Modern Ad-Personalization and Advanced Digital Marketing Solution(s) Provider. Get Maximum ROAS with Tailored Digital Marketing Automation.",
    images: [absoluteUrl(DEFAULT_OG_PATH)],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${sourceSans.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full font-sans">
        <JsonLdScript
          id="organization-website-jsonld"
          data={[organizationJsonLd(), websiteJsonLd()]}
        />
        <ReducedMotionProvider>{children}</ReducedMotionProvider>
      </body>
    </html>
  );
}
