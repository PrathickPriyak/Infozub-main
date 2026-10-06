/**
 * Page SEO migrated from verified Yoast data on infozub.com.
 * Empty descriptions were filled with accurate, non-stuffed copy from page purpose.
 */

export const pageSeo = {
  home: {
    title: "INFOZUB - Premier Digital Marketing Agency",
    description:
      "Modern Ad-Personalization and Advanced Digital Marketing Solution(s) Provider. Get Maximum ROAS with Tailored Digital Marketing Automation.",
    path: "/",
    absoluteTitle: true,
  },
  about: {
    title: "About",
    description:
      "We are a complete digital marketing agency. We grow businesses and brands online with complete, integrated marketing strategies",
    path: "/about",
  },
  digitalSuite: {
    title: "Digital Marketing Agency in Tamil Nadu, India",
    description:
      "Premier Digital Marketing Service Provider in Tamil Nadu, India. Customized Marketing Strategies for your Company's Best Digital ROAS.",
    path: "/digital-suite",
  },
  coimbatore: {
    title: "Digital Marketing Agency in Coimbatore",
    description:
      "Premier Digital Marketing Service Provider in Coimbatore, India. Customized Marketing Strategies for your Company's Best Digital ROAS.",
    path: "/digital-suite/coimbatore",
  },
  tirupur: {
    title: "Digital Marketing Agency in Tirupur",
    description:
      "Premier Digital Marketing Service Provider in Tiruppur, India. Customized Marketing Strategies for your Company's Best Digital ROAS.",
    path: "/digital-suite/tirupur",
  },
  academy: {
    title: "Academy",
    description:
      "Arm yourself with the digital marketing fundamentals! Learn from experts with an agency styled training approach only at INFOZUB.",
    path: "/academy",
  },
  courses: {
    title: "Courses",
    description:
      "Arm yourself with the digital marketing fundamentals! Learn from experts with an agency styled training approach only at INFOZUB.",
    /** Legacy WordPress path — content matches Academy; canonical stays /courses for equity. */
    path: "/courses",
  },
  ventures: {
    title: "Ventures",
    description:
      "INFOZUB Ventures - Whole new bunch of products and services, crafted in-house at INFOZUB with our 7+ years of experience.",
    path: "/ventures",
  },
  clients: {
    title: "Clients",
    description:
      "INFOZUB - strives the best in the industry. We provide high-quality solutions that are tailored to our client's unique business needs.",
    path: "/clients",
  },
  careers: {
    title: "Careers",
    description:
      "Looking for the Best Job that Suits you in the world of Digital Services? You may win a chance to Enter into the INFOZUB World of Awesomeness!",
    path: "/careers",
  },
  apply: {
    title: "Apply",
    description:
      "Apply to INFOZUB. Share your resume and designation preference through the INFOZUB job application form.",
    path: "/careers/apply",
  },
  contact: {
    title: "Contact Us",
    description:
      "We offer digital marketing solutions to help you boost your brand online. Contact us today to know more about our services.",
    path: "/contact",
  },
  web: {
    title: "Website Development",
    description:
      "Professional website design and development from INFOZUB — research-led layouts, WordPress packages, and friendly support for your business site.",
    path: "/web",
  },
  reviews: {
    title: "Reviews",
    description:
      "See what clients say about INFOZUB — written testimonials and published video reviews from the INFOZUB website.",
    path: "/reviews",
  },
  payments: {
    title: "Payments",
    description:
      "Read our refund policy & terms and conditions before making the payment. Once you make the payment, it is accepted that you have agreed on the same",
    path: "/payments",
  },
  terms: {
    title: "Terms & Conditions",
    description:
      "Find the general terms and conditions, the cancellation & refund policies of INFOZUB. For more queries contact us info@infozub.com",
    path: "/terms",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "Understand how we handle your data at INFOZUB. We ensure to take maximum care when it comes to privacy and data.",
    path: "/privacy-policy",
  },
  copyrights: {
    title: "Copyrights",
    description:
      "All the text content and Images in website is owned by INFOZUB Team. For any concerns mail us at info@infozub.com.",
    path: "/copyrights",
  },
  thanks: {
    title: "Thank You",
    description:
      "Thank you for getting in touch with us. We have received your contact information we will reach you at the earliest.",
    path: "/thanks",
  },
  services: {
    title: "Services",
    description:
      "Explore INFOZUB Digital Suite services — paid media, social, web, telephony, and sales support published on infozub.com.",
    path: "/services",
  },
  projects: {
    title: "Projects",
    description:
      "Named campaign results published by INFOZUB — Suzuki Motorcycle (Tamilnadu) and Bharath Electronics and Appliances.",
    path: "/projects",
  },
  blog: {
    title: "Blog",
    description:
      "INFOZUB insights on digital marketing, growth, and company updates.",
    path: "/blog",
  },
  landingPage: {
    title: "Infozub Landing Page",
    description:
      "INFOZUB digital marketing services — maximize brand visibility with strategies published on the INFOZUB campaign landing page.",
    path: "/infozub-landing-page",
  },
  digitalMarketingLanding: {
    title: "INFOZUB Digital Marketing",
    description:
      "Providing branding identity through INFOZUB digital marketing services — strategies to increase online presence for your business.",
    path: "/infozub-digital-marketing",
  },
} as const;

export type PageSeoKey = keyof typeof pageSeo;
