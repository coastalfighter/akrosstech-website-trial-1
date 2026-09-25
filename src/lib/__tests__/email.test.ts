import { describe, expect, it } from "vitest";
import { buildContactEmail, buildNewsletterEmail, getEmailConfig } from "@/lib/email";
import { contactSchema } from "@/lib/validation";

describe("email", () => {
  it("defaults delivery to the business inbox", () => {
    const config = getEmailConfig({} as NodeJS.ProcessEnv);
    expect(config.to).toBe("gaurang@akrosstech.com");
    expect(config.apiKey).toBeUndefined();
  });

  it("reads overrides from the environment", () => {
    const config = getEmailConfig({
      RESEND_API_KEY: "re_x",
      CONTACT_TO_EMAIL: "a@b.co",
      CONTACT_FROM_EMAIL: "X <x@y.co>",
    } as unknown as NodeJS.ProcessEnv);
    expect(config).toEqual({ apiKey: "re_x", to: "a@b.co", from: "X <x@y.co>" });
  });

  it("escapes user content and sets reply-to", () => {
    const payload = contactSchema.parse({
      firstName: "<b>Eve</b>",
      lastName: "Doe",
      email: "eve@example.com",
      message: "Hello <script>alert(1)</script>\nsecond line",
      service: "Virtual Assistance",
    });
    const email = buildContactEmail(payload, { ip: "1.2.3.4", userAgent: "UA" });
    expect(email.replyTo).toBe("eve@example.com");
    expect(email.subject).toContain("Virtual Assistance");
    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
    expect(email.html).toContain("<br>");
    expect(email.text).toContain("second line");
  });

  it("builds a newsletter notification", () => {
    const email = buildNewsletterEmail({ email: "n@example.com", website: "" });
    expect(email.subject).toContain("n@example.com");
  });
});
