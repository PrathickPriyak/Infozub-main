export type NavChild = {
  href: string;
  label: string;
  description?: string;
};

export type NavItem = {
  href: string;
  label: string;
  /** Compact dropdown only — used when real child routes exist */
  children?: readonly NavChild[];
  /** Open in new tab when true */
  external?: boolean;
};

export type NavCta = {
  href: string;
  label: string;
};

/**
 * Single source of truth for primary navigation.
 * Desktop, mobile, and footer utility links should import from here
 * instead of duplicating labels/hrefs.
 */
export const primaryNavigation: readonly NavItem[] = [
  { href: "/about", label: "About" },
  {
    href: "/digital-suite",
    label: "Digital Suite",
    children: [
      {
        href: "/services",
        label: "All services",
        description: "Paid media, social, web, and sales support",
      },
      {
        href: "/digital-suite",
        label: "Overview",
        description: "Premier digital marketing services",
      },
      {
        href: "/digital-suite/coimbatore",
        label: "Coimbatore",
        description: "Digital marketing agency in Coimbatore",
      },
      {
        href: "/digital-suite/tirupur",
        label: "Tirupur",
        description: "Digital marketing agency in Tirupur",
      },
    ],
  },
  { href: "/academy", label: "Academy" },
  { href: "/ventures", label: "Ventures" },
  { href: "/clients", label: "Clients" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const headerCta: NavCta = {
  href: "/contact",
  label: "Get in touch",
} as const;

export const mobileHomeLink: NavItem = {
  href: "/",
  label: "Home",
} as const;

/** Legal / utility links used in the site footer */
export const footerLegalLinks = [
  { href: "/copyrights", label: "Copyrights" },
  { href: "/terms", label: "Terms & Privacy" },
  { href: "/payments", label: "Payments" },
] as const;

export const socialLinks = [
  { href: "https://www.facebook.com/Infozub", label: "Facebook" },
  { href: "https://x.com/infozubltd", label: "X" },
  { href: "https://www.linkedin.com/company/infozub-ltd/", label: "LinkedIn" },
  { href: "https://www.instagram.com/infozub/", label: "Instagram" },
  { href: "https://www.youtube.com/@infozub", label: "YouTube" },
] as const;
