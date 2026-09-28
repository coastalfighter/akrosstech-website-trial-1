/**
 * Home-page copy for the "Studio" design. Written for this layout (short
 * lines, a bold sub-line per point) but built only from facts already on
 * the site — services, industries, the "why choose us" points and the
 * talent network. Edit freely.
 */

export const studioHero = {
  /** `*…*` renders as the muted half of the headline. */
  title:
    "Offshore talent. Onshore quality. *We build the remote teams and websites ambitious U.S. businesses grow on.*",
};

export const studioClients = {
  eyebrow: "Who we work with",
  body: "Startups, staffing agencies and growing U.S. enterprises. They move fast, and hiring, admin and back-office work can’t be what slows them down.",
};

export const studioStatement =
  "At Akrostech, we build lean offshore teams that turn outsourcing into a real growth lever.";

/** One-line promise per service (shown under the title on service cards). */
export const serviceTaglines: Record<string, string> = {
  "website-development": "Built to convert, engineered to perform",
  "recruitment-process-outsourcing": "Your hiring cycle, end to end",
  "virtual-assistance": "An extension of your team",
  "accounting-assistance": "Accurate books, on your schedule",
  "legal-process-outsourcing": "Paralegal support, compliance-first",
};

export const studioWork = {
  eyebrow: "Selected work",
  title: ["Websites that work", "as hard as your team."],
  body: "Our web studio designs and builds fast, conversion-focused websites, end to end: strategy, design, development, SEO and support. The projects below are samples of the work we deliver.",
  cta: "Explore the web studio",
};

export const studioFix = {
  title: [
    "Great teams, slowed down by hiring and admin.",
    "That’s what growing businesses tell us.",
  ],
  label: "( What we fix )",
  paragraphs: [
    "Founders and operators build great companies, and rarely have the hours for recruiting, bookkeeping, admin and legal prep.",
    "We take that work off your plate: pre-vetted remote professionals who plug into your tools, work your hours and report like part of your team. One partner, and a direct line to the people doing the work.",
  ],
  cta: "Discover the company",
};

/** Bold one-liners for the "why work with us" cards, keyed by card title. */
export const whySublines: Record<string, string> = {
  "Quality First, Always": "Measured, not promised.",
  "Clear Collaboration": "No surprises, ever.",
  "Curated Talent": "Vetted before you meet them.",
  "US-Aligned Operations": "Your hours, your workflows.",
  "Secure & Compliant": "Your data stays yours.",
};

export const studioIndustries = {
  eyebrow: "Industries",
  title: "Every industry hires a different way.",
  body: "Healthcare, IT, BFSI, manufacturing, sales, customer service, construction, e-commerce and education: our domain-focused recruiters shape every search around the roles your field depends on.",
  cta: "Recruitment services",
};

export const studioNews = {
  eyebrow: "Latest news",
  title: "Our take on outsourcing, hiring and what makes a remote team work.",
  cta: "See all articles",
};

export const studioVoices = {
  eyebrow: "Client voices",
  title: "Our clients speak for themselves.",
  intro: [
    "Akrostech works with **startups**, **staffing agencies** and **enterprises**: teams that need reliable people behind their growth, and a website that shows it.",
    "We build dedicated remote teams across recruitment, virtual assistance, accounting and legal support — trained in U.S. workflows and working your hours.",
    "We think outsourcing should feel like hiring well: vetted people, clear reporting, no surprises. That’s the standard every engagement is held to.",
  ],
  note: "Testimonials shown are samples until approved client quotes are published.",
};

export const studioFaq = {
  title: "Got a question? We answer it here.",
};
