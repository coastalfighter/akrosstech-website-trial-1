/**
 * SAMPLE CONTENT — illustrative testimonials, clearly labelled as samples
 * in the UI. Replace with real, approved client quotes before relying on
 * them. Attributions deliberately use roles only (no real names).
 */
export interface Testimonial {
  quote: string;
  role: string;
  company: string;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Akrostech took our hiring off our plate completely. Time-to-fill dropped and the candidates they sent were consistently on point.",
    role: "Operations Director",
    company: "Healthcare Staffing Firm",
    service: "Recruitment Process Outsourcing",
  },
  {
    quote:
      "Our virtual assistant works our hours and feels like part of the team. I got back ten hours a week in the first month.",
    role: "Founder",
    company: "E-commerce Startup",
    service: "Virtual Assistance",
  },
  {
    quote:
      "Books are reconciled on time every month and our CPA finally has everything they need without chasing us.",
    role: "Managing Partner",
    company: "Professional Services Firm",
    service: "Accounting Assistance",
  },
  {
    quote:
      "They redesigned our website in four weeks. It is faster, looks premium, and enquiries went up almost immediately.",
    role: "Marketing Lead",
    company: "B2B SaaS Company",
    service: "Website Development",
  },
  {
    quote:
      "Document prep and case tracking are handled with real care for confidentiality. Our attorneys spend their time on strategy now.",
    role: "Practice Manager",
    company: "Personal Injury Law Firm",
    service: "Legal Process Outsourcing",
  },
];
