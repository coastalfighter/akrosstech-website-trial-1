import type { StaticImageData } from "next/image";
import healthcare from "@/assets/images/industries/healthcare.jpg";
import technology from "@/assets/images/industries/technology.jpg";
import finance from "@/assets/images/industries/finance.jpg";
import manufacturing from "@/assets/images/industries/manufacturing.jpg";
import construction from "@/assets/images/industries/construction.jpg";
import ecommerce from "@/assets/images/industries/ecommerce.jpg";
import customerService from "@/assets/images/industries/customer-service.jpg";
import education from "@/assets/images/industries/education.jpg";

export interface Industry {
  name: string;
  src: StaticImageData;
  alt: string;
}

/**
 * Industries we recruit for — names from the Recruitment Process
 * Outsourcing page ("Healthcare, IT, BFSI, Manufacturing, Sales, Customer
 * Service, Construction, E-commerce, Education, and Administration").
 * Photos: Unsplash (see docs/IMAGE_CREDITS.md).
 */
export const industries: Industry[] = [
  { name: "Healthcare", src: healthcare, alt: "Surgical team looking down under operating lights" },
  { name: "IT & Tech", src: technology, alt: "Engineers working together at computer screens" },
  { name: "BFSI", src: finance, alt: "Candlestick trading chart glowing on a dark screen" },
  {
    name: "Manufacturing",
    src: manufacturing,
    alt: "Engineer working at a laptop in an industrial lab",
  },
  { name: "Construction", src: construction, alt: "Aerial view of workers on a construction site" },
  { name: "E-commerce", src: ecommerce, alt: "Hand holding a payment card beside a laptop" },
  {
    name: "Sales & Customer Service",
    src: customerService,
    alt: "Headset resting beside a laptop at a support desk",
  },
  { name: "Education", src: education, alt: "Stack of books with an apple and alphabet blocks" },
];

export const industriesIntro = {
  eyebrow: "Industries",
  title: "Every industry hires differently.",
  body: "We specialize in recruitment across a wide range of U.S. industries, including Healthcare, IT, BFSI, Manufacturing, Sales, Customer Service, Construction, E-commerce, Education, and Administration.",
};
