import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/forms/ContactForm";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Accordion } from "@/components/ui/Accordion";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ContactForm", () => {
  it("shows inline errors and does not submit when invalid", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/please enter your first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits valid data and shows the success state", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm defaultService="Website Development" />);

    await user.type(screen.getByLabelText(/first name/i), "Jane");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/^email$/i), "jane@example.com");
    await user.type(screen.getByLabelText(/^message$/i), "Please build us a new website.");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(JSON.parse(init.body)).toMatchObject({
      firstName: "Jane",
      service: "Website Development",
      smsConsent: false,
    });
    expect(await screen.findByText(/message received/i)).toBeInTheDocument();
  });

  it("surfaces server errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: false, message: "Too many requests" }), {
          status: 429,
        }),
      ),
    );
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/first name/i), "Jane");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/^email$/i), "jane@example.com");
    await user.type(screen.getByLabelText(/^message$/i), "Hello there, testing errors.");
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/too many requests/i);
  });
});

describe("NewsletterForm", () => {
  it("validates the email before posting", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<NewsletterForm />);
    await user.type(screen.getByLabelText(/subscribe to our newsletter/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(await screen.findByRole("status")).toHaveTextContent(/valid email/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("Accordion", () => {
  const items = [
    { question: "First?", answer: "Answer one" },
    { question: "Second?", answer: "Answer two" },
  ];

  it("starts with every panel closed by default", () => {
    render(<Accordion items={items} />);
    for (const name of ["First?", "Second?"]) {
      expect(screen.getByRole("button", { name })).toHaveAttribute("aria-expanded", "false");
    }
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("toggles panels with correct ARIA state", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultOpen={0} />);
    const first = screen.getByRole("button", { name: "First?" });
    const second = screen.getByRole("button", { name: "Second?" });
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(second).toHaveAttribute("aria-expanded", "false");

    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(await screen.findByRole("region", { name: "Second?" })).toHaveTextContent("Answer two");
  });
});
