/**
 * Chatbot knowledge built only from verified site content modules.
 * Do not invent answers here — every string must come from published copy.
 */

import { aboutHero, aboutIntro, founderStory } from "@/content/about";
import { academyCourses, academyFormat, academyOrigin } from "@/content/academy";
import { careersHero, openRolesCount, resumeEmail } from "@/content/careers";
import { contactDetails, contactOffices } from "@/content/contact";
import { homeHero } from "@/content/home";
import { namedResults } from "@/content/proof";
import { digitalSuiteServices } from "@/content/services";
import { site } from "@/content/site";

export type ChatKnowledgeEntry = {
  id: string;
  /** Phrases visitors might ask */
  prompts: readonly string[];
  /** Extra tokens used for scoring */
  keywords: readonly string[];
  answer: string;
  href?: string;
};

function unique(values: readonly string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

export const chatKnowledge: readonly ChatKnowledgeEntry[] = [
  {
    id: "company",
    prompts: [
      "what is infozub",
      "who are you",
      "about the company",
      "tell me about infozub",
    ],
    keywords: ["infozub", "company", "agency", "about", "who"],
    answer: `${site.legalName} is a premier digital marketing agency. ${homeHero.supporting} ${aboutIntro.body}`,
    href: "/about",
  },
  {
    id: "founded",
    prompts: ["when did infozub start", "founded", "history", "founder"],
    keywords: ["founded", "2013", "founder", "logesh", "history", "started"],
    answer: `${aboutHero.description} ${founderStory.body}`,
    href: "/about",
  },
  {
    id: "contact",
    prompts: [
      "how can i contact you",
      "phone number",
      "email",
      "office hours",
      "address",
    ],
    keywords: [
      "contact",
      "phone",
      "email",
      "call",
      "office",
      "hours",
      "address",
      "location",
    ],
    answer: `Call ${site.phoneDisplay} or email ${site.email}. Hours: ${site.hours}. Offices: ${site.offices
      .map((office) => `${office.city} — ${office.address}`)
      .join(" · ")}`,
    href: "/contact",
  },
  {
    id: "offices",
    prompts: ["where are your offices", "tirupur office", "palladam office"],
    keywords: ["tirupur", "tiruppur", "palladam", "office", "branch", "location"],
    answer: contactOffices
      .map((office) => `${office.title}: ${office.address}`)
      .join(" "),
    href: "/contact",
  },
  {
    id: "services",
    prompts: [
      "what services do you offer",
      "digital suite",
      "digital marketing services",
    ],
    keywords: ["service", "suite", "marketing", "ads", "seo", "offer"],
    answer: `INFOZUB Premier Digital Suite includes: ${digitalSuiteServices
      .map((service) => service.title)
      .join(", ")}.`,
    href: "/digital-suite",
  },
  ...digitalSuiteServices
    .filter((service) => Boolean(service.overview))
    .map((service) => ({
      id: `service-${service.slug}`,
      prompts: [`tell me about ${service.title}`, service.title.toLowerCase()],
      keywords: unique([
        service.title.toLowerCase(),
        service.slug.replaceAll("-", " "),
        "service",
      ]),
      answer: `${service.title}: ${service.overview ?? service.description}`,
      href: service.href,
    })),
  {
    id: "academy",
    prompts: [
      "what courses do you offer",
      "digital academy",
      "infozub academy",
      "training",
    ],
    keywords: ["academy", "course", "learn", "training", "class", "enroll"],
    answer: `INFOZUB Digital Academy courses (${academyFormat}): ${academyCourses
      .map((course) => course.title)
      .join(", ")}. Lessons and enrollment are on ${academyOrigin}.`,
    href: "/academy",
  },
  ...academyCourses.map((course) => ({
    id: `course-${course.slug}`,
    prompts: [`${course.title}`, `start ${course.title}`],
    keywords: unique([
      course.title.toLowerCase(),
      course.slug.replaceAll("-", " "),
      "course",
      "academy",
    ]),
    answer: `${course.title} is labeled ${academyFormat}. Start the course on the Digital Academy: ${course.href}`,
    href: "/academy",
  })),
  {
    id: "projects",
    prompts: [
      "client results",
      "case studies",
      "projects",
      "suzuki",
      "bharath",
    ],
    keywords: [
      "project",
      "result",
      "suzuki",
      "bharath",
      "client",
      "campaign",
      "leads",
    ],
    answer: namedResults
      .map(
        (item) =>
          `${item.client}: ${item.highlights.join("; ")}. More at ${item.href}.`,
      )
      .join(" "),
    href: "/projects",
  },
  {
    id: "careers",
    prompts: [
      "jobs",
      "careers",
      "hiring",
      "openings",
      "apply for a job",
    ],
    keywords: ["career", "job", "hiring", "vacancy", "opening", "resume", "apply"],
    answer:
      openRolesCount > 0
        ? `${careersHero.description} See open roles on the careers page.`
        : `No open roles are listed right now. ${careersHero.contactLine}. Email your resume to ${resumeEmail} or apply at /careers/apply.`,
    href: "/careers",
  },
  {
    id: "hours",
    prompts: ["what are your working hours", "are you open"],
    keywords: ["hours", "open", "timing", "schedule", "monday", "friday"],
    answer: `INFOZUB hours: ${site.hours}.`,
    href: "/contact",
  },
  {
    id: "social",
    prompts: ["social media links", "facebook", "linkedin", "instagram"],
    keywords: ["facebook", "linkedin", "instagram", "youtube", "social", "follow"],
    answer: `Follow INFOZUB: ${contactDetails.social
      .map((item) => `${item.label} ${item.href}`)
      .join(" · ")}`,
    href: "/contact",
  },
];
