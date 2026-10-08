/**
 * INFOZUB Digital Academy — company-site entry content.
 * Course lesson data lives on academy.infozub.com; this file only
 * stores verified titles, external URLs, and published marketing copy.
 */

export const academySeo = {
  title: "Academy",
  description:
    "Arm yourself with the digital marketing fundamentals! Learn from experts with an agency styled training approach only at INFOZUB.",
} as const;

/** Course platform — source of truth for lessons, enrollment, and pricing. */
export const academyOrigin = "https://academy.infozub.com";

/** Legacy WordPress courses URL on the main site (kept as alias). */
export const coursesPath = "/courses";

export const academyHero = {
  eyebrow: "INFOZUB Digital Academy",
  title: "Become a Successful Digital Marketer",
  description:
    "Digital Academy is the destination for ambitious individuals who aspire to learn about Digital Marketing and build a career on their own terms!",
} as const;

export const academyIntro = {
  title: "What the Academy offers",
  body: "We have carefully designed our course to help people to learn from startch. Even if you don’t know anything about Digital Marketing, we have designed this course in a way that it will be easy for you to follow us.",
  ventureLine:
    "Empower the young generation with skills and real-time knowledge about Digital Marketing.",
} as const;

export const academyOffersHeading = {
  eyebrow: "What we Offer?",
  title: "Skyrocket your Digital Marketing skill with our course",
} as const;

/** Organizational groups from verified course titles only — not invented products. */
export const academyCategories = [
  {
    id: "digital-marketing",
    title: "Digital marketing",
    description:
      "Social Media Marketing Master Course and Google Ads Master Course.",
    courseSlugs: ["social-media-marketing", "google-ads"] as const,
  },
  {
    id: "design-creative",
    title: "Design & creative",
    description:
      "Adobe Photoshop, Canva, Web Design, and Mobile App Video Editing Master Courses.",
    courseSlugs: [
      "adobe-photoshop",
      "canva",
      "web-design",
      "mobile-app-video-editing",
    ] as const,
  },
  {
    id: "career-business",
    title: "Career & business",
    description: "Interview Success Formula and Business Success Formula.",
    courseSlugs: ["interview-success", "business-success"] as const,
  },
  {
    id: "ai-web",
    title: "AI & web",
    description: "AI Website Builder Mastery.",
    courseSlugs: ["ai-website-builder"] as const,
  },
] as const;

export type AcademyCourse = {
  slug: string;
  title: string;
  /** Deep link on academy.infozub.com — do not host lesson content here. */
  href: string;
  /** Local copy of the published /courses/ card image. */
  image: string;
  featured?: boolean;
};

/**
 * Course cards from https://infozub.com/courses/ (order preserved).
 * Prices and durations are not published on the company courses page.
 */
export const academyCourses: readonly AcademyCourse[] = [
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing Master Course",
    href: `${academyOrigin}/course/tamil/social-media-marketing/`,
    image: "/academy/smm.webp",
    featured: true,
  },
  {
    slug: "adobe-photoshop",
    title: "Adobe Photoshop Master Course",
    href: `${academyOrigin}/course/tamil/adobe-photoshop/`,
    image: "/academy/photoshop.webp",
    featured: true,
  },
  {
    slug: "web-design",
    title: "Web Design Master Course",
    href: `${academyOrigin}/course/tamil/web-design/`,
    image: "/academy/web-design.webp",
    featured: true,
  },
  {
    slug: "canva",
    title: "Canva Master Course",
    href: `${academyOrigin}/course/tamil/canva-master-course/`,
    image: "/academy/canva.webp",
  },
  {
    slug: "mobile-app-video-editing",
    title: "Mobile App Video Editing Master Course",
    href: `${academyOrigin}/course/tamil/mobile-app-video-editing/`,
    image: "/academy/video-editing.webp",
  },
  {
    slug: "interview-success",
    title: "Interview Success Formula",
    href: `${academyOrigin}/course/tamil/interview-success-formula/`,
    image: "/academy/interview.webp",
  },
  {
    slug: "ai-website-builder",
    title: "AI Website Builder Mastery",
    href: `${academyOrigin}/course/tamil/ai-website-builder-mastery/`,
    image: "/academy/ai-web.webp",
  },
  {
    slug: "business-success",
    title: "Business Success Formula",
    href: `${academyOrigin}/course/tamil/business-success-formula/`,
    image: "/academy/business.webp",
  },
  {
    slug: "google-ads",
    title: "Google Ads Master Course",
    href: `${academyOrigin}/course/tamil/google-ads/`,
    image: "/academy/google-ads.webp",
    featured: true,
  },
] as const;

export const academyBenefits = {
  title: "Join This Course and Get Access!",
  items: [
    "Foundation to kick start your Digital Marketing Journey",
    "Resources like PDFs, Templates, Checklists and more",
    "Access to Facebook Private Group",
    "Get Certified from Digital Academy",
    "Network with Experts in Digital fields",
  ],
} as const;

export const academyAudience = {
  title: "This Course is Suitable For",
  prompt: "Wondering whether you can take up this course, right?",
  items: [
    "Students",
    "Professionals",
    "Freelancers",
    "Home Makers",
    "Business Owners",
  ],
} as const;

export const academyFormat = "Online Self Placed" as const;

export const academyTraining = {
  title: "Training approach",
  description:
    "Learn from experts with an agency styled training approach only at INFOZUB.",
  points: [
    {
      title: academyFormat,
      body: "Each course card on the company courses page is labeled Online Self Placed.",
    },
    {
      title: "Learn from scratch",
      body: "We have carefully designed our course to help people to learn from startch. Even if you don’t know anything about Digital Marketing, we have designed this course in a way that it will be easy for you to follow us.",
    },
    {
      title: "Agency styled training",
      body: "Arm yourself with the digital marketing fundamentals! Learn from experts with an agency styled training approach only at INFOZUB.",
    },
  ],
} as const;

export const academyCta = {
  title: "You Are Just One Step Away!",
  primary: { href: academyOrigin, label: "Enroll Now" },
  secondary: { href: academyOrigin, label: "Registration is Open!" },
  browseLabel: "Browse courses on Academy",
} as const;

export function getCourseBySlug(slug: string): AcademyCourse | undefined {
  return academyCourses.find((course) => course.slug === slug);
}

export function getFeaturedCourses(): readonly AcademyCourse[] {
  const featured = academyCourses.filter((course) => course.featured);
  return featured.length > 0 ? featured : academyCourses.slice(0, 4);
}

export function getCoursesForCategory(
  courseSlugs: readonly string[],
): readonly AcademyCourse[] {
  return courseSlugs
    .map((slug) => getCourseBySlug(slug))
    .filter((course): course is AcademyCourse => Boolean(course));
}
