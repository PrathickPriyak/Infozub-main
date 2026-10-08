/**
 * Legal and utility page copy from the audited WordPress site.
 * Quoted as published — spelling retained.
 */

import { site } from "@/content/site";
import { pageSeo } from "@/content/seo/pages";

export const paymentsContent = {
  seo: pageSeo.payments,
  hero: {
    title: "Payments Options",
    description: "We have furnished our available payment options.",
  },
  card: {
    title: "Credit Card Payments",
    ctaLabel: "Pay Now",
    ctaHref: "https://rzp.io/l/infozub",
  },
  gst: "GST Identification Number : 33AAGCI5436F1ZR",
  bank: {
    heading: "INR RECEIVING ACCOUNT",
    rows: [
      { label: "Bank Name", value: "State Bank of India" },
      { label: "Account Name", value: "INFOZUB Private Limited" },
      { label: "Account Number", value: "40822677559" },
      { label: "Account Type", value: "Current Account" },
      { label: "Branch", value: "Palladam" },
      { label: "IFSC", value: "SBIN0022022" },
    ],
  },
  notes: [
    "NEFT / RTGS / IMPS Accepted",
    "Transfers can be made from a company / personal bank account.",
    "Cheque / DD is Accepted.",
    "Payments Accepted Globally through PayPal.",
    "Wire transfers are supported.",
  ],
  policyNote:
    "Read our refund policy and terms before paying. Once you make the payment, it is accepted that you have agreed to the same.",
} as const;

export const copyrightsContent = {
  seo: pageSeo.copyrights,
  hero: {
    title: "Copyrights",
    description:
      "All the text content and Images in website is owned by INFOZUB Team. For any concerns mail us at info@infozub.com.",
  },
  paragraphs: [
    "All content on the domain infozub.com is created (or) sourced by INFOZUB team. If you have any concerns, get in touch with us.",
    "If you have any concerns with respect to the content present in the domain infozub.com, kindly get in touch with us.",
  ],
  contactEmail: site.email,
} as const;

export const thanksContent = {
  seo: pageSeo.thanks,
  hero: {
    title: "Thank You",
    description:
      "We have received your contact information. We will get in touch with you soon!",
  },
  phoneDisplay: site.phoneDisplay,
  phoneHref: site.phoneHref,
} as const;

export const reviewsContent = {
  seo: pageSeo.reviews,
  hero: {
    title: "Reviews",
    description: "See What Our Client Say’s About INFOZUB",
  },
  note:
    "Written testimonials below are published on INFOZUB marketing pages. Video reviews from the previous /reviews/ page remain available as embedded media when assets are migrated; spoken transcripts were not verified in the audit.",
} as const;

export const termsSections = [
  {
    heading: "No Refund Policy",
    paragraphs: [
      "By using the INFOZUB Website and Services provided by INFOZUB, you agree to the company’s terms, conditions, and no refund policy.",
      "At INFOZUB, we follow and practice industry standards to deliver the best services like Digital Marketing Consultancy, Website Design and Development to our clients. The projects are handled by experienced and well-trained staff at INFOZUB.",
      "At INFOZUB we reserve the right to not offer a refund on any of the services that our clients sign up to in our sole discretion. As all the details of the services provided by INFOZUB will be explained and listed in the contract with the client, the client can make amendments beforehand. Once the contract is signed and an agreement between INFOZUB and the client has been made the company will have to make various investments in order to fulfill the agreed services and can therefore not pay any refunds.",
      "There is always a certain set of resources that are involved in achieving every milestone of a campaign. Being a Digital Marketing Consultancy and Web Design and Development Service Provider, we never compromise on quality standards. We take all the time, energy and efforts required to build the concept for the project and it consumes a lot of our resources.",
      "We can’t offer any guarantees on Google rankings as the search engine is updated regularly and fluctuations of rankings are outside of our control. However, we always aim to achieve the best possible outcomes for our clients and utilise all the resources we have to achieve the desired ranks.",
    ],
  },
  {
    heading: "Cancellation Policy",
    paragraphs: [
      "Services offered by us require different plans of action to be completed:",
      "For fixed-term contracts we reserve the right to not accept any cancellations during the term of the contract as both parties have agreed and signed a contract outlining the project’s timeframe, cost and services. Amendments should be made before the contract is signed.",
      "For ongoing contracts cancellations can be made at any point with a 30-day written notice to INFOZUB management to perform a complete project handover, stating reasons for termination. You agree to be billed for the same duration. If you wish not to have a project handover, you can drop a Cancellation Request Email to INFOZUB management and we will give you a confirmation within 48 hours of “Immediate Service Discontinuation”.",
      "Any changes to the scope of work during the development phase or any third party involvement which we are not informed about in advance may lead to a cancellation of the project by INFOZUB. In this case no refunds will be provided.",
    ],
  },
  {
    heading: "Web Design and Development",
    paragraphs: [
      "Website Design and Development projects consume a lot of resources and time based on your specific requirements. If you decide to change the design elements, you agree to allow us additional time and you agree to pay for the time consumed in addition.",
      "INFOZUB makes the final decision on whether to bill for the extra hours of work.",
      "Every design and revision consume resources from different subject experts. So, you agree to instruct all your design requirements before starting the work. Any changes to the scope of work during the design or development will lead to additional charges and a delay in delivery.",
    ],
  },
  {
    heading: "Search Engine Optimisation",
    paragraphs: [
      "SEO or Search Engine Optimization is a time-consuming activity and usually the results are given after a reasonable timeframe, which is discussed and agreed on with each client individually, depending on their specific project requirements. By using SEO Services provided by INFOZUB you agree that you understand that Search Engines are highly volatile in nature and are therefore difficult to predict.",
      "We reserve the right to change/add and modify the policy without any notice; it is advisable to check this page regularly.",
    ],
  },
  {
    heading: "Privacy Policy",
    paragraphs: [
      "INFOZUB is committed to protecting the privacy of its clients and using their information responsibly.",
      "At INFOZUB, we are highly trained digital marketing professionals who quickly adapt to market fluctuations and bottlenecks. We do not guarantee the results that we have projected in this article/course. Actual results of the course may vary based on competition and efforts from the user.",
      "If you would like to opt-out of our re-marketing campaign, kindly email logesh@infozub.com and we will help you opt-out of the re-marketing ads. This is subject to Facebook Terms and Conditions / Google Terms and Conditions.",
    ],
  },
  {
    heading: "Terms of use",
    paragraphs: [
      "These terms of use relate to you accessing and using the www.infozub.com website as well as all related pages. They describe the manner in which you may use this website. By using this website you clarify to have read, understood and agree to these terms of use.",
      "INFOZUB Ltd. is a registered Business in the India offering Digital Marketing, Web Design and SEO Services Globally.",
      "The information on this website is provided on an “as is” basis. INFOZUB does not hold any responsibility for representations and warranties relating to this website and its contents.",
      "Information on this website is for information only. All material on this website is the property of INFOZUB. Copyright and other relevant intellectual property rights exist on all texts, images, audios, softwares, files and videos on this website. All rights are reserved.",
      "INFOZUB reserves the right to make changes to these terms of use at any time. Every time you visit this website you agree to the current terms of use.",
      `If you have any questions regarding these terms of use please contact us at ${site.email}.`,
    ],
  },
] as const;

export const privacyParagraphs = [
  "Our website address is: http://infozub.com.",
  "When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.",
  "An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.",
  "If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.",
  "If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.",
  "For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.",
  "If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.",
  "Visitor comments may be checked through an automated spam detection service.",
] as const;
