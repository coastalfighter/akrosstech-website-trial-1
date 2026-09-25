import type { PhotoKey } from "./media";

/**
 * SAMPLE CONTENT — placeholder projects that illustrate the kind of work
 * Akrostech delivers. Every card is clearly labelled "Sample" in the UI.
 * Replace with real case studies as they become available.
 */
export interface PortfolioItem {
  title: string;
  category: string;
  description: string;
  stack: string[];
  /** Cover photograph. */
  photo: PhotoKey;
}

export const portfolio: PortfolioItem[] = [
  {
    title: "FinTech Analytics Dashboard",
    category: "Web Application",
    description: "Real-time portfolio insights with role-based access and live charts.",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    photo: "analytics",
  },
  {
    title: "D2C Skincare Store",
    category: "E-commerce",
    description: "Headless storefront with subscriptions and one-page checkout.",
    stack: ["Shopify", "Next.js", "Klaviyo"],
    photo: "laptopGlow",
  },
  {
    title: "Healthcare Clinic Website",
    category: "Business Website",
    description: "Accessible, mobile-first site with online appointment booking.",
    stack: ["WordPress", "ACF", "Calendly"],
    photo: "codeDesk",
  },
  {
    title: "SaaS Product Launch",
    category: "Landing Page",
    description: "Animated launch page built to convert paid traffic into trials.",
    stack: ["Next.js", "GSAP", "HubSpot"],
    photo: "codeLaptop",
  },
  {
    title: "Law Firm Client Portal",
    category: "Web Application",
    description: "Secure document sharing and case tracking for clients.",
    stack: ["React", "NestJS", "AWS"],
    photo: "typing",
  },
  {
    title: "Real Estate Listings Platform",
    category: "Website Redesign",
    description: "Modernized listings search with map views and saved homes.",
    stack: ["Next.js", "Sanity", "Mapbox"],
    photo: "blocks",
  },
];
