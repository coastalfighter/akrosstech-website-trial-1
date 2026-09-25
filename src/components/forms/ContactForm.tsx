"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { SERVICE_OPTIONS, type ServiceOption } from "@/lib/constants";
import type { ContactInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { postJson } from "./submit";

type Status = "idle" | "loading" | "success" | "error";

const initialValues: Required<Omit<ContactInput, "service">> & { service: string } = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  smsConsent: false,
  website: "",
};

const inputClass =
  "peer w-full rounded-lg border border-line-strong bg-white/[0.03] px-4 pt-6 pb-2.5 text-[15px] text-fg placeholder-transparent transition-colors focus:border-signal/70 focus:bg-white/[0.05] focus:outline-none aria-[invalid=true]:border-red-400/70";

const labelClass =
  "pointer-events-none absolute top-2 left-4 text-[11px] font-medium tracking-wide text-fg-subtle uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-[11px] peer-focus:tracking-wide peer-focus:uppercase peer-focus:text-pulse";

export function ContactForm({
  defaultService,
  className,
}: {
  defaultService?: ServiceOption;
  className?: string;
}) {
  const id = useId();
  const [values, setValues] = useState({ ...initialValues, service: defaultService ?? "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as string]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key as string];
        return next;
      });
    }
  };

  const toPayload = () => ({
    ...values,
    service: values.service === "" ? undefined : values.service,
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Zod is loaded on first submit to keep it out of the initial JS bundle.
    const { contactSchema, fieldErrors } = await import("@/lib/validation");
    const parsed = contactSchema.safeParse(toPayload());
    if (!parsed.success) {
      const found = fieldErrors(parsed.error);
      setErrors(found);
      setStatus("idle");
      // Move focus to the first invalid field for keyboard and screen-reader users.
      const firstKey = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus("loading");
    setServerMessage("");
    const result = await postJson("/api/contact", parsed.data);
    if (result.ok) {
      setStatus("success");
      setValues({ ...initialValues, service: defaultService ?? "" });
      setErrors({});
    } else {
      setStatus("error");
      setServerMessage(result.message);
      if (result.fieldErrors) setErrors(result.fieldErrors);
    }
  }

  const field = (name: keyof typeof values) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });

  const errorText = (name: string) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="mt-1.5 pl-1 text-xs text-red-300">
        {errors[name]}
      </p>
    ) : null;

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <m.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center gap-5 text-center"
            role="status"
            aria-live="polite"
          >
            <span className="grid size-16 place-items-center rounded-xl bg-ok/15 text-ok">
              <CheckCircle2 className="size-8" aria-hidden="true" />
            </span>
            <h3 className="text-2xl font-medium text-fg">Thank you — message received.</h3>
            <p className="max-w-sm text-fg-muted">
              Our team will get back to you shortly. For anything urgent, call us directly.
            </p>
            <Button variant="secondary" onClick={() => setStatus("idle")}>
              Send another message
            </Button>
          </m.div>
        ) : (
          <m.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 sm:grid-cols-2"
            aria-describedby={`${id}-server`}
          >
            <div className="relative">
              <input
                {...field("firstName")}
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                required
                value={values.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                className={inputClass}
              />
              <label htmlFor={`${id}-firstName`} className={labelClass}>
                First name
              </label>
              {errorText("firstName")}
            </div>
            <div className="relative">
              <input
                {...field("lastName")}
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
                required
                value={values.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                className={inputClass}
              />
              <label htmlFor={`${id}-lastName`} className={labelClass}>
                Last name
              </label>
              {errorText("lastName")}
            </div>
            <div className="relative">
              <input
                {...field("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Enter your e-mail"
                required
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputClass}
              />
              <label htmlFor={`${id}-email`} className={labelClass}>
                Email
              </label>
              {errorText("email")}
            </div>
            <div className="relative">
              <input
                {...field("phone")}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Enter your mobile no."
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputClass}
              />
              <label htmlFor={`${id}-phone`} className={labelClass}>
                Mobile no. (optional)
              </label>
              {errorText("phone")}
            </div>
            <div className="relative sm:col-span-2">
              <select
                {...field("service")}
                value={values.service}
                onChange={(e) => set("service", e.target.value)}
                className={cn(
                  inputClass,
                  "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10",
                )}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a8a8a3' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                }}
              >
                <option value="" className="bg-panel">
                  Choose a service…
                </option>
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-panel">
                    {option}
                  </option>
                ))}
              </select>
              <label
                htmlFor={`${id}-service`}
                className="pointer-events-none absolute top-2 left-4 text-[11px] font-medium tracking-wide text-fg-subtle uppercase"
              >
                I’m interested in
              </label>
              {errorText("service")}
            </div>
            <div className="relative sm:col-span-2">
              <textarea
                {...field("message")}
                rows={5}
                placeholder="Write message..."
                required
                value={values.message}
                onChange={(e) => set("message", e.target.value)}
                className={cn(inputClass, "resize-y")}
              />
              <label htmlFor={`${id}-message`} className={labelClass}>
                Message
              </label>
              {errorText("message")}
            </div>

            {/* Honeypot — hidden from humans and assistive tech */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor={`${id}-website`}>Website</label>
              <input
                id={`${id}-website`}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <input
                id={`${id}-sms`}
                type="checkbox"
                name="smsConsent"
                checked={values.smsConsent}
                onChange={(e) => set("smsConsent", e.target.checked)}
                className="mt-1 size-4 shrink-0 accent-[#3d7bff]"
              />
              <label htmlFor={`${id}-sms`} className="text-xs leading-relaxed text-fg-subtle">
                By opting in for text messages, you agree to receive an appointment reminders and
                important updates from Akrostech Consulting LLC at the number provided. Message
                frequency varies. Msg &amp; data rates may apply. Reply STOP to unsubscribe. Reply
                HELP for help. View our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-fg-muted underline underline-offset-2 hover:text-pulse"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/terms-and-conditions"
                  className="text-fg-muted underline underline-offset-2 hover:text-pulse"
                >
                  Terms &amp; Conditions
                </Link>{" "}
                for more information.
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p id={`${id}-server`} role="alert" className="text-sm text-red-300">
                {status === "error" ? serverMessage : ""}
              </p>
              <Button
                type="submit"
                size="lg"
                arrow={status !== "loading"}
                disabled={status === "loading"}
                className="w-full sm:w-auto"
              >
                {status === "loading" ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
