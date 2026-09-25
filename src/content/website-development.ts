import type { IconName } from "@/components/ui/Icon";

/**
 * Website Development — the new Akrostech service line.
 * Written in the same voice as the existing outsourcing pages:
 * outcome-first, U.S.-aligned, "extension of your team".
 */

export const webDevHero = {
  eyebrow: "Website Development",
  title: "Websites that work as hard as your team.",
  intro:
    "Akrostech now designs and builds websites for U.S. businesses. Our India-based designers and engineers work in your time zone to deliver fast, secure, conversion-focused websites—from single landing pages to full-scale web applications—at a fraction of U.S. agency cost.",
  highlights: ["U.S. time zone alignment", "Fixed-scope pricing", "Launch-to-support partnership"],
};

export interface WebService {
  title: string;
  description: string;
  icon: IconName;
  points: string[];
}

export const webServices: WebService[] = [
  {
    title: "Custom Website Design & Development",
    icon: "palette",
    description:
      "Bespoke websites designed around your brand, your audience and your goals—never a recycled template.",
    points: [
      "Brand-aligned UI/UX design in Figma",
      "Pixel-perfect, hand-coded builds",
      "Conversion-focused page architecture",
      "Accessible (WCAG 2.2 AA) by default",
    ],
  },
  {
    title: "E-commerce Development",
    icon: "cart",
    description:
      "Online stores that make buying effortless—from product discovery to checkout—on Shopify, WooCommerce or headless commerce.",
    points: [
      "Shopify, WooCommerce & headless stores",
      "Payment, shipping & tax configuration",
      "Product catalog setup & migration",
      "Cart, checkout & upsell optimization",
    ],
  },
  {
    title: "CMS-Based Websites",
    icon: "layout",
    description:
      "Edit your own content with confidence. We build on WordPress and modern headless CMS platforms so your team stays in control.",
    points: [
      "WordPress (custom themes, no bloat)",
      "Headless CMS: Sanity, Contentful, Strapi",
      "Custom content models & editor training",
      "Roles, workflows & multilingual content",
    ],
  },
  {
    title: "Web Application Development",
    icon: "appWindow",
    description:
      "Customer portals, dashboards, booking systems and SaaS products—engineered for scale with React, Next.js and Node.js.",
    points: [
      "React / Next.js front-ends",
      "Node.js & Python APIs",
      "Authentication, roles & dashboards",
      "Third-party & CRM integrations",
    ],
  },
  {
    title: "Landing Page Design",
    icon: "target",
    description:
      "High-converting landing pages for campaigns, launches and lead generation—built fast and designed to be A/B tested.",
    points: [
      "Campaign-specific messaging & layout",
      "Lead capture & CRM hand-off",
      "Analytics & conversion tracking",
      "Delivered in as little as 5–7 business days",
    ],
  },
  {
    title: "Website Redesign & Modernization",
    icon: "refresh",
    description:
      "Give an outdated site a modern look, a faster stack and a clearer path to conversion—without losing the SEO equity you’ve built.",
    points: [
      "UX & content audit",
      "Modern design refresh",
      "Platform migration (e.g. WordPress → Next.js)",
      "301 redirect mapping to protect rankings",
    ],
  },
  {
    title: "Performance Optimization",
    icon: "gauge",
    description:
      "Speed is revenue. We tune Core Web Vitals so pages load instantly and rank higher on every device.",
    points: [
      "Core Web Vitals (LCP, INP, CLS) tuning",
      "Image, font & script optimization",
      "Caching & CDN configuration",
      "Before/after Lighthouse reporting",
    ],
  },
  {
    title: "SEO-Friendly Development",
    icon: "search",
    description:
      "Search visibility is engineered in from day one—clean markup, structured data and technical SEO best practices.",
    points: [
      "Semantic HTML & heading hierarchy",
      "Schema.org structured data",
      "XML sitemaps, robots & canonical tags",
      "Open Graph & social previews",
    ],
  },
  {
    title: "Responsive & Mobile-First Design",
    icon: "smartphone",
    description:
      "Most of your visitors are on a phone. Every layout we ship is designed mobile-first and tested across real devices.",
    points: [
      "Mobile-first layouts & touch interactions",
      "Cross-browser & cross-device QA",
      "Fluid typography & adaptive images",
      "Tested on iOS, Android & desktop",
    ],
  },
  {
    title: "Maintenance & Support Packages",
    icon: "wrench",
    description:
      "Your website is never “done.” Our monthly plans keep it secure, updated, backed up and improving after launch.",
    points: [
      "Security & software updates",
      "Automated backups & uptime monitoring",
      "Content edits & new features",
      "Priority support in U.S. hours",
    ],
  },
];

export interface TechGroup {
  label: string;
  items: string[];
}

export const techStack: TechGroup[] = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "GSAP", "Three.js"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "NestJS", "Python", "PHP", "Laravel", "GraphQL"],
  },
  {
    label: "CMS & Commerce",
    items: ["WordPress", "WooCommerce", "Shopify", "Sanity", "Contentful", "Strapi", "Webflow"],
  },
  { label: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Firebase", "Redis"] },
  {
    label: "Cloud & DevOps",
    items: ["Vercel", "AWS", "Cloudflare", "Docker", "GitHub Actions", "Netlify"],
  },
  {
    label: "Design & Growth",
    items: ["Figma", "Google Analytics 4", "Search Console", "Hotjar", "HubSpot"],
  },
];

export interface ProcessStep {
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  icon: IconName;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Discovery",
    duration: "Week 1",
    icon: "compass",
    description:
      "We learn your business, audience and goals, audit what exists today and agree on scope, timeline and success metrics.",
    deliverables: ["Kick-off workshop", "Sitemap & scope document", "Fixed quote & timeline"],
  },
  {
    title: "Design",
    duration: "Weeks 1–3",
    icon: "palette",
    description:
      "Wireframes become high-fidelity, on-brand designs for desktop and mobile. You review, we refine—until it feels right.",
    deliverables: ["Wireframes", "UI design in Figma", "Clickable prototype"],
  },
  {
    title: "Development",
    duration: "Weeks 2–6",
    icon: "code",
    description:
      "Our engineers build in weekly sprints on a live staging link, so you see progress in real time—no black boxes.",
    deliverables: ["Staging environment", "CMS & integrations", "Weekly progress demos"],
  },
  {
    title: "Testing",
    duration: "Final week",
    icon: "flask",
    description:
      "Rigorous QA across browsers and devices, plus performance, accessibility, SEO and security checks before anything goes live.",
    deliverables: ["Cross-device QA", "Lighthouse & accessibility audit", "Security review"],
  },
  {
    title: "Launch",
    duration: "Go-live",
    icon: "rocket",
    description:
      "We handle domain, hosting, redirects and analytics so launch day is calm—then monitor closely for the first 72 hours.",
    deliverables: ["Production deployment", "Analytics & Search Console", "Team training session"],
  },
  {
    title: "Support",
    duration: "Ongoing",
    icon: "lifeBuoy",
    description:
      "Every build includes 30 days of free post-launch support. After that, our maintenance plans keep your site secure and improving.",
    deliverables: ["30-day warranty", "Monthly maintenance", "Growth roadmap"],
  },
];

export interface PricingTier {
  name: string;
  tagline: string;
  /** Display price, e.g. "$1,499". */
  price: string;
  priceNote: string;
  timeline: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

/** One-time project packages. Prices are "starting at", in USD. */
export const websitePackages: PricingTier[] = [
  {
    name: "Landing Page",
    tagline: "For campaigns, launches & lead generation",
    price: "$499",
    priceNote: "starting at, one-time",
    timeline: "5–7 business days",
    features: [
      "1 high-converting page (up to 8 sections)",
      "Custom design, mobile-first",
      "Lead form with email / CRM hand-off",
      "Basic on-page SEO & analytics",
      "Speed-optimized build",
      "2 revision rounds",
    ],
    cta: "Start a landing page",
  },
  {
    name: "Business Website",
    tagline: "For service businesses & growing brands",
    price: "$1,499",
    priceNote: "starting at, one-time",
    timeline: "2–4 weeks",
    features: [
      "Up to 8 custom-designed pages",
      "WordPress or headless CMS",
      "Blog & editable content",
      "On-page SEO & schema markup",
      "Core Web Vitals optimization",
      "3 revision rounds + CMS training",
    ],
    highlighted: true,
    cta: "Build my website",
  },
  {
    name: "E-commerce Store",
    tagline: "For brands selling online",
    price: "$2,999",
    priceNote: "starting at, one-time",
    timeline: "4–6 weeks",
    features: [
      "Shopify, WooCommerce or headless",
      "Up to 50 products set up",
      "Payments, shipping & tax configuration",
      "Custom product & collection pages",
      "Abandoned-cart & email integrations",
      "Store-management training",
    ],
    cta: "Launch my store",
  },
  {
    name: "Web Application",
    tagline: "For portals, dashboards & SaaS",
    price: "$5,999",
    priceNote: "starting at, custom scope",
    timeline: "6–12+ weeks",
    features: [
      "React / Next.js + Node.js stack",
      "Authentication & user roles",
      "Custom dashboards & admin panel",
      "API & third-party integrations",
      "Automated testing & CI/CD",
      "Dedicated project manager",
    ],
    cta: "Scope my application",
  },
];

/** Monthly maintenance plans. */
export const maintenancePlans: PricingTier[] = [
  {
    name: "Essential",
    tagline: "Keep it secure and running",
    price: "$99",
    priceNote: "per month",
    timeline: "Response within 48 hours",
    features: [
      "Security, plugin & core updates",
      "Weekly off-site backups",
      "24/7 uptime monitoring",
      "Up to 2 hours of content edits",
      "Monthly health report",
    ],
    cta: "Choose Essential",
  },
  {
    name: "Growth",
    tagline: "Keep it fast and improving",
    price: "$249",
    priceNote: "per month",
    timeline: "Response within 24 hours",
    features: [
      "Everything in Essential",
      "Daily backups",
      "Up to 6 hours of edits & small features",
      "Quarterly performance tuning",
      "SEO health checks",
      "Priority support in U.S. hours",
    ],
    highlighted: true,
    cta: "Choose Growth",
  },
  {
    name: "Scale",
    tagline: "A development team on demand",
    price: "$499",
    priceNote: "per month",
    timeline: "Same-day critical response",
    features: [
      "Everything in Growth",
      "Up to 15 hours of development",
      "Conversion & A/B testing support",
      "Dedicated developer",
      "Quarterly strategy call",
    ],
    cta: "Choose Scale",
  },
];

export const webWhyUs: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Agency Quality, Offshore Cost",
    icon: "coins",
    description:
      "Senior designers and engineers at a fraction of U.S. agency rates—the same Offshore Talent. Onshore Quality. model our clients already trust.",
  },
  {
    title: "Your Hours, Your Rhythm",
    icon: "clock",
    description:
      "Our team works across EST, CST, MST and PST, with structured updates and real-time collaboration—no overnight silences.",
  },
  {
    title: "Transparent, Fixed-Scope Pricing",
    icon: "clipboardCheck",
    description:
      "Clear packages, clear timelines and a live staging link from week one. You always know what’s being built and what it costs.",
  },
  {
    title: "Built to Perform",
    icon: "gauge",
    description:
      "Performance, accessibility and SEO are engineered in—not bolted on—so your site ranks, loads fast and converts.",
  },
  {
    title: "Secure & Compliant",
    icon: "shield",
    description:
      "NDAs, secure credential handling and security-hardened builds, backed by the enterprise-grade practices behind all Akrostech services.",
  },
  {
    title: "A Partner After Launch",
    icon: "handshake",
    description:
      "Launch is the beginning. 30 days of free support, then flexible maintenance plans—your outsourced web team, on call.",
  },
];

export const webFaqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "A landing page typically takes 5–7 business days, a business website 2–4 weeks, an e-commerce store 4–6 weeks and a web application 6–12+ weeks. You’ll get a fixed timeline after the discovery call.",
  },
  {
    question: "What do your prices include?",
    answer:
      "Every package includes design, development, mobile optimization, basic SEO, analytics setup, launch support and 30 days of free post-launch fixes. Prices are starting points—after discovery we send a fixed quote with no hidden fees.",
  },
  {
    question: "Will I own my website and its code?",
    answer:
      "Yes. Once the project is paid in full, you own the design, the code and the content. We hand over all credentials and repositories.",
  },
  {
    question: "Can you redesign my existing site without hurting my SEO?",
    answer:
      "Absolutely. We audit your current rankings, preserve high-performing content and map every old URL to its new home with 301 redirects so your search equity carries over.",
  },
  {
    question: "Do you provide hosting and domains?",
    answer:
      "We’ll recommend and set up the right hosting for your stack—Vercel, AWS, Cloudflare or managed WordPress hosting—in your name, so you’re never locked in.",
  },
  {
    question: "Can my team update the website ourselves?",
    answer:
      "Yes. CMS-based builds come with an easy editor and a recorded training session. If you’d rather not, our maintenance plans include monthly content edits.",
  },
];
