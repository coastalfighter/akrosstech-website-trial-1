import * as z from "zod/mini";
import { SERVICE_OPTIONS } from "./constants";

// Disable Zod's JIT (which probes `new Function`) so it never trips our CSP.
z.config({ jitless: true });

export { SERVICE_OPTIONS };

const phonePattern = /^[+()\-.\s\d]{7,20}$/;

/** Trimmed string with a max length and optional required-message. */
const text = (max: number, requiredMessage?: string) =>
  z
    .string()
    .check(
      z.trim(),
      z.maxLength(max, `Must be ${max} characters or fewer`),
      ...(requiredMessage ? [z.minLength(1, requiredMessage)] : []),
    );

const email = z.pipe(
  z.string().check(z.trim(), z.toLowerCase()),
  z.email("Please enter a valid email address"),
);

/**
 * Contact form schema — shared by the client form (instant feedback) and
 * the API route (authoritative validation). Uses the tree-shakable
 * `zod/mini` API so the client only downloads what it needs.
 */
export const contactSchema = z.object({
  firstName: text(60, "Please enter your first name"),
  lastName: text(60, "Please enter your last name"),
  email,
  phone: z._default(
    z.string().check(
      z.trim(),
      z.refine((v) => v === "" || phonePattern.test(v), "Please enter a valid phone number"),
    ),
    "",
  ),
  service: z.optional(z.enum(SERVICE_OPTIONS)),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(10, "Please tell us a little more (10+ characters)"),
      z.maxLength(5000, "Must be 5000 characters or fewer"),
    ),
  smsConsent: z._default(z.boolean(), false),
  /**
   * Honeypot — real users never fill this hidden field. It is accepted here
   * so the API can silently discard bot submissions with a normal 200.
   */
  website: z._default(z.string().check(z.maxLength(500)), ""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;

export const newsletterSchema = z.object({
  email,
  website: z._default(z.string().check(z.maxLength(500)), ""),
});

export type NewsletterPayload = z.output<typeof newsletterSchema>;

/** Flatten validation issues into `{ field: firstMessage }` for form display. */
export function fieldErrors(error: {
  issues: ReadonlyArray<{ path: ReadonlyArray<PropertyKey>; message: string }>;
}): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
