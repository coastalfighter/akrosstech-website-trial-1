import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();

vi.mock("@/lib/email", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/email")>();
  return { ...actual, createEmailSender: () => send };
});

const validContact = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  message: "We would like a new website for our clinic.",
  service: "Website Development",
};

let ipCounter = 0;
function post(url: string, body: unknown, headers: Record<string, string> = {}) {
  ipCounter += 1;
  return new Request(`http://localhost${url}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      host: "localhost",
      "x-forwarded-for": `10.0.0.${ipCounter}`,
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    send.mockReset();
    send.mockResolvedValue({ id: "email_1", delivered: true });
  });

  it("delivers a valid submission", async () => {
    const { POST } = await import("../contact/route");
    const res = await POST(post("/api/contact", validContact));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0][0].replyTo).toBe("jane@example.com");
  });

  it("returns field errors for invalid input", async () => {
    const { POST } = await import("../contact/route");
    const res = await POST(post("/api/contact", { ...validContact, email: "bad" }));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.fieldErrors.email).toBeTruthy();
    expect(send).not.toHaveBeenCalled();
  });

  it("silently accepts but does not send when the honeypot is filled", async () => {
    const { POST } = await import("../contact/route");
    const res = await POST(post("/api/contact", { ...validContact, website: "spam" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects non-JSON content types", async () => {
    const { POST } = await import("../contact/route");
    const res = await POST(post("/api/contact", validContact, { "content-type": "text/plain" }));
    expect(res.status).toBe(415);
  });

  it("rejects cross-origin requests", async () => {
    const { POST } = await import("../contact/route");
    const res = await POST(post("/api/contact", validContact, { origin: "https://evil.example" }));
    expect(res.status).toBe(403);
  });

  it("rejects malformed JSON and oversized bodies", async () => {
    const { POST } = await import("../contact/route");
    expect((await POST(post("/api/contact", "{not json"))).status).toBe(400);
    expect(
      (await POST(post("/api/contact", { ...validContact, message: "x".repeat(20000) }))).status,
    ).toBe(413);
  });

  it("rate limits repeated submissions from one IP", async () => {
    const { POST } = await import("../contact/route");
    const headers = { "x-forwarded-for": "192.168.1.50" };
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) {
      const res = await POST(post("/api/contact", validContact, headers));
      statuses.push(res.status);
    }
    expect(statuses.slice(0, 5).every((s) => s === 200)).toBe(true);
    expect(statuses[5]).toBe(429);
  });

  it("maps a missing email configuration to 503", async () => {
    const { EmailNotConfiguredError } = await import("@/lib/email");
    send.mockRejectedValueOnce(new EmailNotConfiguredError());
    const { POST } = await import("../contact/route");
    const res = await POST(post("/api/contact", validContact));
    expect(res.status).toBe(503);
  });

  it("maps provider failures to 502", async () => {
    send.mockRejectedValueOnce(new Error("provider down"));
    const { POST } = await import("../contact/route");
    const res = await POST(post("/api/contact", validContact));
    expect(res.status).toBe(502);
  });

  it("rejects GET", async () => {
    const { GET } = await import("../contact/route");
    expect(GET().status).toBe(405);
  });
});

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    send.mockReset();
    send.mockResolvedValue({ id: "email_2", delivered: true });
  });

  it("subscribes a valid email", async () => {
    const { POST } = await import("../newsletter/route");
    const res = await POST(post("/api/newsletter", { email: "reader@example.com" }));
    expect(res.status).toBe(200);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("rejects an invalid email", async () => {
    const { POST } = await import("../newsletter/route");
    const res = await POST(post("/api/newsletter", { email: "nope" }));
    expect(res.status).toBe(422);
    expect(send).not.toHaveBeenCalled();
  });
});

describe("newsletter honeypot", () => {
  it("returns 200 without sending", async () => {
    send.mockReset();
    const { POST } = await import("../newsletter/route");
    const res = await POST(
      post("/api/newsletter", { email: "bot@example.com", website: "filled" }),
    );
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });
});
