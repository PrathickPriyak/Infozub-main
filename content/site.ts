export const site = {
  name: "INFOZUB",
  legalName: "Infozub Private Limited",
  phoneDisplay: "+91 99 44 64 00 33",
  phoneHref: "tel:+919944640033",
  email: "info@infozub.com",
  emailHref: "mailto:info@infozub.com",
  /** Founding year published on /about/ */
  foundedYear: 2013,
  hours: "09AM to 05PM, Monday to Friday",
  offices: [
    {
      city: "Tiruppur",
      address: "2nd Floor, Alagendira Towers, Bungalow Stop, Tiruppur – 641602",
    },
    {
      city: "Palladam",
      address: "271 A3, Chinnaiyah Garden, Kosavampalayam Road, Palladam – 641664",
    },
  ],
} as const;

export type SiteConfig = typeof site;
