import { describe, expect, it } from "vitest";
import { contactSchema, fieldErrors, newsletterSchema } from "@/lib/validation";

const valid = {
  firstName: "Jane",
  lastName: "Doe",
  email: "Jane@Example.com ",
  phone: "+1 (332) 287-0846",
  service: "Website Development",
  message: "We need a new marketing website.",
  smsConsent: true,
  website: "",
};

describe("contactSchema", () => {
  it("accepts a valid submission and normalises email", () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("jane@example.com");
  });

  it("defaults optional fields", () => {
    const minimal = {
      firstName: valid.firstName,
      lastName: valid.lastName,
      email: valid.email,
      message: valid.message,
    };
    const result = contactSchema.safeParse(minimal);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBe("");
      expect(result.data.smsConsent).toBe(false);
      expect(result.data.service).toBeUndefined();
    }
  });

  it("rejects missing names, bad email, short message and invalid phone", () => {
    const result = contactSchema.safeParse({
      ...valid,
      firstName: " ",
      email: "nope",
      message: "hi",
      phone: "abc",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = fieldErrors(result.error);
      expect(Object.keys(errors).sort()).toEqual(["email", "firstName", "message", "phone"]);
    }
  });

  it("rejects unknown services", () => {
    expect(contactSchema.safeParse({ ...valid, service: "Crypto mining" }).success).toBe(false);
  });

  it("rejects an overly long message", () => {
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(5001) }).success).toBe(false);
  });

  it("passes a filled honeypot through so the API can discard it silently", () => {
    const result = contactSchema.safeParse({ ...valid, website: "http://spam" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.website).toBe("http://spam");
  });
});

describe("newsletterSchema", () => {
  it("accepts a valid email", () => {
    expect(newsletterSchema.safeParse({ email: "a@b.co" }).success).toBe(true);
  });
  it("rejects an invalid email", () => {
    expect(newsletterSchema.safeParse({ email: "a@b" }).success).toBe(false);
  });
});
