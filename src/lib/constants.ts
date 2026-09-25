/** Services a visitor can pick in the contact form (kept dependency-free for client bundles). */
export const SERVICE_OPTIONS = [
  "Website Development",
  "Recruitment Process Outsourcing",
  "Virtual Assistance",
  "Accounting Assistance",
  "Legal Process Outsourcing",
  "Something else",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];
