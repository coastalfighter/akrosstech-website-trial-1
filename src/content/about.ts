import type { IconName } from "@/components/ui/Icon";
import type { Stat } from "./site";

/** About-page copy — carried over verbatim from akrosstech.com/about-akrostech. */
export const aboutHero = {
  eyebrow: "About Us",
  title: "Outsourcing, Reimagined for the Modern Business",
  body: "We’re a people-powered partner helping businesses build reliable, high-performance remote teams.",
  tags: [
    "Talent Acquisition",
    "Virtual Assistance",
    "Accounting",
    "Paralegal",
    "Website Development",
  ],
};

export const approach = {
  eyebrow: "Approach",
  heading: "Global Teams. Local Precision.",
  mission: {
    title: "Our mission",
    body: "To empower businesses with access to skilled remote professionals who accelerate & simplify operations.",
  },
  vision: {
    title: "Our Vision",
    body: "To be the most trusted global partner for building agile, high-performing offshore teams.",
  },
};

export const edge = {
  eyebrow: "Our Edge",
  heading: "The Akrostech Difference: Built for Results",
  items: [
    {
      title: "Built-In Alignment",
      icon: "target" as IconName,
      description:
        "We don’t just match skills — we align with your goals, workflows, and culture from day one.",
    },
    {
      title: "Flexible Scaling",
      icon: "trending" as IconName,
      description:
        "Ramp up or down quickly with agile engagement models tailored to your business stage and needs.",
    },
    {
      title: "Quantifiable Quality",
      icon: "chart" as IconName,
      description:
        "From hiring accuracy to service uptime, every process is measured, optimized, and performance-verified.",
    },
    {
      title: "Dedicated, Not Detached",
      icon: "handshake" as IconName,
      description:
        "Your outsourced team isn’t external — they’re embedded, proactive, and fully accountable.",
    },
  ],
};

export const experience = {
  eyebrow: "Company Experience",
  heading: "Proven Partnerships, Measurable Impact",
  body: "From growing startups to scaling enterprises, our journey is built on real results, trusted partnerships, and a relentless focus on performance.",
  stats: [
    { value: 100, suffix: "+", label: "Professionals" },
    { value: 95, suffix: "%", label: "Client Retention" },
    { value: 120, suffix: "+", label: "Successful Placements" },
  ] satisfies Stat[],
};

export const support = {
  title: "24/7 support",
  body: "We provide 24/7 service to our agency customers.",
};

export const aboutCta = {
  eyebrow: "Let's Get Started",
  heading: "Ready to elevate your brands? start now!",
  body: "Take your brands to the next level with our expert web solutions Let’s get started today!",
  cta: "Get Started",
};
