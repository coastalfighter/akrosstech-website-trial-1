export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
  badge?: string;
}

export const serviceLinks: NavLink[] = [
  { label: "Website Development", href: "/services/website-development", badge: "New" },
  { label: "Virtual Assistance", href: "/services/virtual-assistance" },
  { label: "Recruitment Process Outsourcing", href: "/services/recruitment-process-outsourcing" },
  { label: "Accounting Assistance", href: "/services/accounting-assistance" },
  { label: "Legal Process Outsourcing", href: "/services/legal-process-outsourcing" },
];

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", children: serviceLinks },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const footerNav = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ],
  services: serviceLinks,
  help: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
} satisfies Record<string, NavLink[]>;
