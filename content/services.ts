/**
 * Services catalog from the audited Infozub site.
 * Descriptions and overviews are published copy only — no invented services.
 */

export type ServiceCategoryId =
  | "paid-media"
  | "social-brand"
  | "sales-ops"
  | "web-growth";

export type ServiceRecord = {
  slug: string;
  title: string;
  description: string;
  category: ServiceCategoryId;
  /** Longer paragraph from landing pages — required for a dedicated detail route */
  overview?: string;
  /** Detail URL when enough content exists; otherwise suite/overview href */
  href: string;
  /** Optional verified benefit lines (only where published) */
  benefits?: readonly string[];
  /** Optional process labels (only where published) */
  process?: readonly string[];
  /** Optional capability lines drawn from published strengths/suite context */
  capabilities?: readonly string[];
};

export const serviceCategories = [
  {
    id: "paid-media" as const,
    title: "Paid media",
    description: "Search, social, and video advertising channels from the Digital Suite.",
  },
  {
    id: "social-brand" as const,
    title: "Social & brand",
    description: "Creative, social management, and influencer work published on Infozub.",
  },
  {
    id: "sales-ops" as const,
    title: "Sales & operations",
    description: "Telephony, lead tooling, sales support, and cloud operations.",
  },
  {
    id: "web-growth" as const,
    title: "Web & growth",
    description: "Website, SEO, email, and broader growth services with published write-ups.",
  },
] as const;

/** Digital Suite tiles with published one-line descriptions. */
export const digitalSuiteServices: readonly ServiceRecord[] = [
  {
    slug: "facebook-ads",
    title: "Facebook Ads",
    description:
      "Reach your customers on Facebook, most popular social media platform.",
    category: "paid-media",
    href: "/digital-suite",
  },
  {
    slug: "instagram-ads",
    title: "Instagram Ads",
    description:
      "Elevate your brand presence on with Instagram, where images speak.",
    category: "paid-media",
    href: "/digital-suite",
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    description:
      "When people search for your product or service, be visible to them.",
    overview:
      "Google Ads can help you reach your target audience and immediately drive relevant traffic to your website. With us create effective ad campaigns, optimize your budget, and achieve your marketing goals with Google Ads.",
    category: "paid-media",
    href: "/services/google-ads",
  },
  {
    slug: "youtube-ads",
    title: "Youtube Ads",
    description:
      "Non-skippable ads where your audience consume video content.",
    category: "paid-media",
    href: "/digital-suite",
  },
  {
    slug: "twitter-ads",
    title: "Twitter Ads",
    description: "Tweet, Tweet., we run ads on Twitter too! Give it a try.",
    category: "paid-media",
    href: "/digital-suite",
  },
  {
    slug: "linkedin-ads",
    title: "LinkedIn Ads",
    description:
      "Reach your audience on the world’s largest professional network.",
    category: "paid-media",
    href: "/digital-suite",
  },
  {
    slug: "gmb-ads",
    title: "GMB Ads",
    description:
      "Hyper local marketing with GMB helps you to get more Business Deals.",
    category: "paid-media",
    href: "/digital-suite",
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    description: "Your business operations on the Cloud, managed by us.",
    category: "sales-ops",
    href: "/digital-suite",
  },
  {
    slug: "creative-designing",
    title: "Creative Designing",
    description:
      "Irresistible creatives that grab digital attention from your audience.",
    category: "social-brand",
    href: "/digital-suite",
  },
  {
    slug: "sales-support",
    title: "Sales Support",
    description:
      "We support your sales by offering SOP and Lead verification support.",
    category: "sales-ops",
    href: "/digital-suite",
  },
  {
    slug: "social-management",
    title: "Social Management",
    description: "We Manage your Social Media Channels Professionally.",
    category: "social-brand",
    href: "/digital-suite",
  },
  {
    slug: "cloud-telephony",
    title: "Cloud Telephony",
    description:
      "Receive and Make Calls from the Cloud, with complete statistics.",
    category: "sales-ops",
    href: "/digital-suite",
  },
  {
    slug: "lead-management",
    title: "Lead Management",
    description: "Customized Lead Management web app.",
    category: "sales-ops",
    href: "/digital-suite",
  },
  {
    slug: "website-development",
    title: "Website Development",
    description: "We create Awesome Website for your business.",
    overview:
      "Create a professional and responsive website that meets your business needs and exceeds your customers’ expectations with us. We can help you make a strong first impression on your visitors, showcase your brand identity, and drive conversions.",
    category: "web-growth",
    href: "/services/website-development",
    process: [
      "Requirement Analysis",
      "Defining Project",
      "Layout Creation",
      "Web Design Review",
      "Testing & Delivery",
    ],
    benefits: [
      "Upgdated Technologies",
      "On Time Delivery",
      "Friendly Support",
      "Affordable Prices",
      "Easy Navigation",
    ],
  },
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    description: "Build brand affinity and reach out to new audiences.",
    overview:
      "Influencer marketing can help you reach a wider audience and build trust with potential customers by partnering with social media influencers who have a strong following in your niche. Collaborate with the right influencers to promote your brand and drive conversions.",
    category: "social-brand",
    href: "/services/influencer-marketing",
  },
] as const;

/** Longer service write-ups published on campaign landing pages. */
export const additionalServicePages: readonly ServiceRecord[] = [
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    description:
      "Reach a larger audience, increase brand awareness, and engage with your customers.",
    overview:
      "Social media marketing can help you reach a larger audience, increase brand awareness, and engage with your customers. Our agency can help you create compelling social media content and develop effective social media strategies to achieve your marketing goals.",
    category: "social-brand",
    href: "/services/social-media-marketing",
  },
  {
    slug: "search-engine-optimization",
    title: "Search Engine Optimization",
    description:
      "Rank higher in search engine results pages and improve overall visibility.",
    overview:
      "Search engine optimization (SEO) can help your website rank higher in search engine results pages, increase organic traffic, and improve overall visibility. Get a customized SEO strategy that aligns with your business goals and drives long-term results.",
    category: "web-growth",
    href: "/services/search-engine-optimization",
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    description:
      "Engage your audience, increase open and click-through rates, and drive conversions.",
    overview:
      "We can help you create effective email marketing strategies that engage your audience, increase open and click-through rates, and achieve your marketing goals. Nurture relationships with your subscribers, promote your products and services and drive conversions",
    category: "web-growth",
    href: "/services/email-marketing",
  },
] as const;

export const allServices: readonly ServiceRecord[] = [
  ...digitalSuiteServices,
  ...additionalServicePages,
];

export const serviceDetailPages = allServices.filter(
  (item): item is ServiceRecord & { overview: string } => Boolean(item.overview),
);

export function getServiceBySlug(slug: string): ServiceRecord | undefined {
  return allServices.find((item) => item.slug === slug);
}

export function getServiceDetailSlugs(): string[] {
  return serviceDetailPages.map((item) => item.slug);
}

export function getRelatedServices(
  slug: string,
  limit = 3,
): readonly ServiceRecord[] {
  const current = getServiceBySlug(slug);
  if (!current) return serviceDetailPages.slice(0, limit);

  const sameCategory = serviceDetailPages.filter(
    (item) => item.slug !== slug && item.category === current.category,
  );
  const others = serviceDetailPages.filter(
    (item) => item.slug !== slug && item.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export const digitalSuiteIntro = {
  title: "Premier Digital Suite",
  description:
    "For your company’s end result and profits objectives – internet visibility, brand responsiveness, the by-product of proper optimisation is priceless.",
  closer: "We do it for you.",
} as const;

export const servicesPageIntro = {
  eyebrow: "Services",
  title: "Premier Digital Suite",
  description:
    "We are a team of 30+ Young Experts in Digital Marketing and Sales Process Support! Our services leverage deep domain know-how in the industry, technological proficiency and efficient global digital solutions distribution mechanisms.",
} as const;

export const cityPages = {
  coimbatore: {
    title: "Digital Marketing Agency in Coimbatore",
    description:
      "Get the best out of your digital presence by taking advantage of our result driven approach.",
    quote:
      "We are Top Digital Marketing Company in Coimbatore with young specialized team to engage your business with the right audience, online.",
    why: "Can you imagine a man without a digital device or social media? it is very difficult right. Yes, We are living in a decade of innovations and changes. Here, Digital Marketing is need of the hour for any mode of business to be it online or offline. It has many advantages such as Cost-effective, More visibility, Builds people’s trust, Track the real time results, etc",
  },
  tirupur: {
    title: "Digital Marketing Agency in Tirupur",
    description:
      "Explore the award-winning digital marketing agency in Tirupur, creative B2B and B2C digital advertising agency specializing in branding, web design, search engine advertising and social media marketing.",
    quote:
      "We are Top Digital Marketing Company in Tirupur with young specialized team to engaging your business with the right audience, online.",
    closer:
      "Meet your Goal with INFOZUB — The Best Digital Marketing Company in Tirupur",
    why: "Your potential customers are using search engine and other digital channels to discover new products and services. If you want to ahead of your competitors, then INFOZUB – Digital Marketing Company can help to define and manage your company’s presence online by creating strategies, designing website, help you in digital market, shows your business to potential audience, marketing your service digitally and Track your ROI. Depending on your business goals we will build a campaign in various social media channels like Facebook, Instagram, YouTube and also in Google Search Engine.",
  },
} as const;

export const websiteDevelopment = {
  title: "Professional Website Design & Development",
  description:
    "A website is everything for a business in this digital world. We ensure to provide you with the best of our services and advice from the experts for best results.",
  processIntro:
    "We ensure that you will get a unique web design for your business. Your business website will develop with a detailed research process about your business field and requirements.",
  process: [
    "Requirement Analysis",
    "Defining Project",
    "Layout Creation",
    "Web Design Review",
    "Testing & Delivery",
  ],
  reasonsTitle: "Why INFOZUB for Website Development",
  reasons: [
    "Upgdated Technologies",
    "On Time Delivery",
    "Friendly Support",
    "Affordable Prices",
    "Easy Navigation",
  ],
  packageNote:
    "STANDARD WEBSITE DESIGN AND DEVELOPMENT PACKAGE ON WORDPRESS AND DIVI. PACKAGE PRICE IS PER 10 MONTHS",
  packages: [
    {
      name: "Silver",
      price: "₹ 4,999",
      differences: [
        "1 Landing Page",
        "1 Email ID",
        "1GB Server Space",
        "Duration – 5 Days",
      ],
    },
    {
      name: "Gold",
      price: "₹ 9,999",
      differences: [
        "4 Website Pages",
        "2 Email ID’s",
        "2 GB Server Space",
        "Duration – 7 Days",
      ],
    },
    {
      name: "Gold+",
      price: "₹ 19,999",
      differences: [
        "8 Website Pages",
        "4 Email ID’s",
        "5 GB Server Space",
        "Duration – 10 Days",
        "Upto 5 Custom Image Designs",
        "Hubspot Integration from Script",
      ],
    },
  ],
  sharedFeatures: [
    "Hosting",
    "Online Contact Form",
    "Google Map Integration",
    "Additional Support Charges – ₹ 600 / Hour",
    "Responsive Design",
    ".in Domain Name",
    "Initial One Time Backup",
    "Google Analytics Setup",
    "Google Tag Manager Setup",
    "Custom Image Design",
    "Google and Bing SEO",
    "On-Page SEO Writing",
    "Hubspot Integration",
    "Home Page Sliding Banner",
    "Tawk.to Live Chat",
    "SSL Setup",
    "WhatsApp Click to Chat",
    "SMTP Mail Configuration",
    "Web Application Firewall",
    "Cache Plugin Configuration",
    "cPanel Logins",
    "WordPress Logins",
    "Website Backup ZIP File – ₹ 1,000 / 1GB",
    ".in GoDaddy Domain Transfer – ₹ 1,000 (One Time)",
  ],
} as const;

/** Shared eight-step process used on Digital Suite / About. */
export const digitalMarketingProcess = [
  "Discuss",
  "Understand",
  "Strategy",
  "Brainstorm",
  "Digital Asset",
  "Campaigns",
  "Working Model",
  "Review",
] as const;
