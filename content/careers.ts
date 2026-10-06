/**
 * Careers content from the audited Infozub /careers/ and /careers/apply/ pages.
 *
 * To publish a live opening: add an object to `jobOpenings` below.
 * The /careers grid, job cards, and /careers/[slug] detail pages update from this list.
 * Leave the array empty when no openings are confirmed — do not invent roles.
 */

export const careersSeo = {
  title: "Careers",
  description:
    "Looking for the Best Job that Suits you in the world of Digital Services? You may win a chance to Enter into the INFOZUB World of Awesomeness!",
} as const;

export const applySeo = {
  title: "Apply",
  description:
    "Apply to INFOZUB. Looking for the Best Job that Suits you in the world of Digital Services?",
} as const;

export const careersHero = {
  eyebrow: "Careers",
  title: "Job Vacancies & Career Opportunities",
  description:
    "Looking for the Best Job that Suits you in the world of Digital Services? You may win a chance to Enter into the INFOZUB World of Awesomeness!",
  contactLine: "If you would love to Join us! Contact Careers department",
} as const;

/** Verified team pitch from /careers/ — used for “Why work with Infozub”. */
export const careersPitch = {
  lead: "We are looking forward to join hands with Game Changers!",
  body: "Are you looking to work in an fun, relaxed yet professional environment with a closely-knitted team instead of boring corporate life? We might be the one whom you are looking for. Share the same passion with us and let us grow and succeed together for better and for the new!",
} as const;

export const whyWorkWithUs = [
  {
    title: "Game Changers welcome",
    body: "We are looking forward to join hands with Game Changers!",
  },
  {
    title: "Fun, relaxed, professional",
    body: "Work in an fun, relaxed yet professional environment with a closely-knitted team instead of boring corporate life.",
  },
  {
    title: "Grow together",
    body: "Share the same passion with us and let us grow and succeed together for better and for the new!",
  },
] as const;

export const resumeEmail = "info@infozub.com" as const;

/** Public OpnForm used on the previous /careers/apply/ page. */
export const jobApplicationFormUrl =
  "https://forms.infozub.com/forms/job-application-pb91hk" as const;

export const jobApplicationFormSuccess =
  "Amazing, we saved your answers. Thank you for your time and have a great day!" as const;

/**
 * Designation options on the public application form.
 * These are form choices — not a confirmed live vacancy list.
 */
export const applicationDesignations = [
  "Digital Marketing Executive",
  "Digital Marketing Team Leader",
  "Digital Marketing Manager",
  "Senior Tele Sales Executive",
  "Business Development Executive",
  "Senior Business Development Executive",
  "Business Development Team Leader",
  "Internship",
] as const;

export const workLocations = [
  "INFOZUB Private Limited, Palladam",
  "INFOZUB Private Limited, Tirupur (Avinashi Road)",
] as const;

export type JobOpening = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  summary: string;
  responsibilities?: readonly string[];
  requirements?: readonly string[];
  /** Optional deep-link into the application form or mailto */
  applyHref?: string;
};

/**
 * Live openings published on the company site.
 * Currently empty: the previous /careers/ page listed no role titles.
 */
export const jobOpenings: readonly JobOpening[] = [
  // Example when a role is published:
  // {
  //   slug: "digital-marketing-executive",
  //   title: "Digital Marketing Executive",
  //   department: "Digital Marketing",
  //   location: "INFOZUB Private Limited, Palladam",
  //   type: "Full-time",
  //   summary: "…",
  //   responsibilities: ["…"],
  //   requirements: ["…"],
  // },
];

export const openRolesCount = jobOpenings.length;

export function getJobBySlug(slug: string): JobOpening | undefined {
  return jobOpenings.find((job) => job.slug === slug);
}

export function getJobSlugs(): string[] {
  return jobOpenings.map((job) => job.slug);
}

export const resumeCta = {
  title: "Don’t see the right role?",
  description: `Send us your resume. Email ${resumeEmail}, or use the application form.`,
  emailLabel: "Email resume",
  applyLabel: "Open application form",
} as const;
