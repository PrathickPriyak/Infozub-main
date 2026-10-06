import { headerCta } from "@/content/navigation";

/**
 * Homepage copy. Facts come from the audited WordPress homepage.
 * Presentation is rewritten; claims are not invented.
 */

export const homeSeo = {
  title: "INFOZUB - Premier Digital Marketing Agency",
  description:
    "Modern Ad-Personalization and Advanced Digital Marketing Solution(s) Provider. Get Maximum ROAS with Tailored Digital Marketing Automation.",
} as const;

export const homeHero = {
  headline: "Premier Digital Marketing Agency",
  supporting: "We engage your business with the right audience, online.",
  detail:
    "Targeted marketing, personalised ads, and a digital operations suite built around visibility, brand response, and return on ad spend.",
  primaryCta: {
    href: "/digital-suite",
    label: "Explore Digital Suite",
  },
  secondaryCta: headerCta,
} as const;

export const homeIntro = {
  eyebrow: "Your Targeted Marketing Partner",
  title: "You dream. We make it happen.",
  body: "There is an innovative approach in the digital marketing solutions we provide for a wide variety of industries. For your company’s end results and profit objectives — internet visibility, brand responsiveness — the by-product of proper optimisation is priceless.",
  closer: "We love to do it for you.",
  teamLine:
    "We are a team of 30+ young experts in digital marketing and sales process support. Our work combines industry know-how, technological proficiency, and digital solutions delivery.",
} as const;

/**
 * Homepage service tiles as published (titles only on the old home).
 * One-line descriptions are used only when the Digital Suite page published them.
 */
export const homeCapabilities = [
  {
    title: "Facebook Ads",
    description:
      "Reach your customers on Facebook, most popular social media platform.",
  },
  {
    title: "Google Ads",
    description:
      "When people search for your product or service, be visible to them.",
  },
  {
    title: "Instagram Ads",
    description:
      "Elevate your brand presence on with Instagram, where images speak.",
  },
  {
    title: "YouTube Ads",
    description:
      "Non-skippable ads where your audience consume video content.",
  },
  {
    title: "LinkedIn Ads",
    description:
      "Reach your audience on the world’s largest professional network.",
  },
  {
    title: "Twitter Ads",
    description: "Tweet, Tweet., we run ads on Twitter too! Give it a try.",
  },
  {
    title: "Cloud Telephony",
    description:
      "Receive and Make Calls from the Cloud, with complete statistics.",
  },
  {
    title: "Sales Support",
    description:
      "We support your sales by offering SOP and Lead verification support.",
  },
  { title: "Technology Support" },
  { title: "Voice Calling" },
] as const;

export const homeAcademy = {
  eyebrow: "Learn With Us",
  title: "Become a successful digital marketer",
  body: "Digital Academy is a destination for ambitious individuals who aspire to learn about Digital Marketing and build a career on their own terms.",
  label: "INFOZUB Digital Academy",
  cta: { href: "/courses", label: "View Courses" },
} as const;

export const homeVentures = {
  title: "Ventures, crafted in-house",
  body: "Whole new bunch of products and services, crafted in-house at INFOZUB with our 9+ years of experience.",
  featured: {
    title: "Digital Academy",
    description:
      "Empower the young generation with skills and real-time knowledge about Digital Marketing.",
  },
  cta: { href: "/ventures", label: "View all Ventures" },
} as const;

export const homeCta = {
  title: "Ready to start a project?",
  body: "Get in touch for Digital Suite, website development, academy, or a conversation about your next campaign.",
  primary: headerCta,
  secondary: { href: "/digital-suite", label: "Explore Digital Suite" },
} as const;
