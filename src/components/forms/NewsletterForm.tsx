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
      <label htmlFor={`${id}-email`} className="text-fg mb-3 block text-sm font-medium">
        Subscribe our newsletter:
      </label>
      <div className="border-line-strong flex items-center gap-2 rounded-full border bg-white/[0.03] p-1.5 focus-within:border-lime-500/70">
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
          className="text-fg placeholder:text-fg-subtle min-w-0 flex-1 bg-transparent px-4 text-sm focus:outline-none"
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
          className="text-ink-950 grid size-10 shrink-0 place-items-center rounded-full bg-lime-500 transition-transform hover:scale-105 disabled:opacity-60"
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
        className={cn(
          "mt-2 min-h-5 text-xs",
          status === "error" ? "text-red-300" : "text-lime-400",
        )}
      >
        {status === "success" || status === "error" ? message : ""}
      </p>
    </form>
  );
}
