"use client";

import { useId, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { postJson } from "./submit";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ className }: { className?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Zod is loaded on demand to keep it out of the initial JS bundle.
    const { newsletterSchema, fieldErrors } = await import("@/lib/validation");
    const parsed = newsletterSchema.safeParse({ email, website: honeypot });
    if (!parsed.success) {
      setStatus("error");
      setMessage(fieldErrors(parsed.error).email ?? "Please enter a valid email address");
      return;
    }
    setStatus("loading");
    const result = await postJson("/api/newsletter", parsed.data);
    if (result.ok) {
      setStatus("success");
      setMessage("You’re subscribed. Welcome aboard!");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(result.fieldErrors?.email ?? result.message);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full", className)}>
      <label htmlFor={`${id}-email`} className="mb-4 block label text-muted">
        Subscribe our newsletter:
      </label>
      <div className="flex items-center gap-2 border-b border-line-strong pb-2 focus-within:border-fg">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === "error"}
          aria-describedby={`${id}-status`}
          className="min-w-0 flex-1 bg-transparent font-serif text-2xl text-fg placeholder:text-muted focus:outline-none"
        />
        {/* Honeypot — visually hidden, ignored by humans */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:bg-fg hover:text-bg disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : status === "success" ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <ArrowRight className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className={cn("mt-2 min-h-5 text-xs", status === "error" ? "text-red-500" : "text-fg")}
      >
        {status === "success" || status === "error" ? message : ""}
      </p>
    </form>
  );
}
