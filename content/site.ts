export const site = {
  name: "INFOZUB",
  legalName: "Infozub Private Limited",
  phoneDisplay: "+91 99 44 64 00 33",
  phoneHref: "tel:+919944640033",
  email: "info@infozub.com",
  emailHref: "mailto:info@infozub.com",
} as const;

export type SiteConfig = typeof site;
