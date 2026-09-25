/**
 * Global site configuration — contact details, social links and headline
 * figures. Every value here is rendered across multiple pages, so edit it
 * in one place.
 */
export const site = {
  name: "Akrostech",
  legalName: "Akrostech Consulting LLC",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://akrosstech.com").replace(/\/$/, ""),
  tagline: "Offshore Talent. Onshore Quality.",
  description:
    "Akrostech helps U.S. businesses scale with offshore talent and onshore quality — Recruitment Process Outsourcing, Virtual Assistance, Accounting, Legal Process Outsourcing and Website Development.",
  shortDescription: "Built for startups, scaled by enterprises, trusted by leaders.",
  contact: {
    phone: "+1 (332) 287-0846",
    phoneHref: "tel:+13322870846",
    email: "contact@akrostech.info",
    address: {
      street: "1207 Delaware Ave, Unit 2877",
      city: "Wilmington",
      region: "DE",
      postalCode: "19806",
      country: "US",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/akrostech-consulting/",
  },
  locale: "en_US",
} as const;

export const fullAddress = `${site.contact.address.street}, ${site.contact.address.city}, ${site.contact.address.region} ${site.contact.address.postalCode}`;

export interface Stat {
  value: number;
  /** Decimal places to render while counting. */
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
}

/** "By the Numbers" — carried over verbatim from the current site. */
export const companyStats: Stat[] = [
  { value: 45, suffix: "+", label: "Clients and Counting" },
  { value: 100, suffix: "+", label: "Professionals working together" },
  { value: 95, suffix: "%", label: "Client Retention" },
  { value: 99.9, decimals: 1, suffix: "%", label: "Uptime and Availability" },
];

/**
 * Website-development figures.
 * Confirm these with the business before launch — they are the only
 * numbers on the site that did not come from the existing website.
 */
export const webStats: Stat[] = [
  { value: 50, suffix: "+", label: "Websites Delivered" },
  { value: 6, suffix: "+", label: "Years of Web Experience" },
  { value: 100, suffix: "%", label: "Responsive & Mobile-First" },
  { value: 24, suffix: "/7", label: "Support & Maintenance" },
];
