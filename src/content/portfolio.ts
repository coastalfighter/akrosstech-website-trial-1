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
  /** Two colours used to paint the abstract preview. */
  palette: [string, string];
  layout: "dashboard" | "store" | "landing" | "corporate" | "app" | "listing";
}

export const portfolio: PortfolioItem[] = [
  {
    title: "FinTech Analytics Dashboard",
    category: "Web Application",
    description: "Real-time portfolio insights with role-based access and live charts.",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    palette: ["#bff747", "#3de0c5"],
    layout: "dashboard",
  },
  {
    title: "D2C Skincare Store",
    category: "E-commerce",
    description: "Headless storefront with subscriptions and one-page checkout.",
    stack: ["Shopify", "Next.js", "Klaviyo"],
    palette: ["#f7a8c4", "#7c5cff"],
    layout: "store",
  },
  {
    title: "Healthcare Clinic Website",
    category: "Business Website",
    description: "Accessible, mobile-first site with online appointment booking.",
    stack: ["WordPress", "ACF", "Calendly"],
    palette: ["#3de0c5", "#4f8cff"],
    layout: "corporate",
  },
  {
    title: "SaaS Product Launch",
    category: "Landing Page",
    description: "Animated launch page built to convert paid traffic into trials.",
    stack: ["Next.js", "GSAP", "HubSpot"],
    palette: ["#7c5cff", "#bff747"],
    layout: "landing",
  },
  {
    title: "Law Firm Client Portal",
    category: "Web Application",
    description: "Secure document sharing and case tracking for clients.",
    stack: ["React", "NestJS", "AWS"],
    palette: ["#e8c872", "#bff747"],
    layout: "app",
  },
  {
    title: "Real Estate Listings Platform",
    category: "Website Redesign",
    description: "Modernized listings search with map views and saved homes.",
    stack: ["Next.js", "Sanity", "Mapbox"],
    palette: ["#4f8cff", "#3de0c5"],
    layout: "listing",
  },
];
