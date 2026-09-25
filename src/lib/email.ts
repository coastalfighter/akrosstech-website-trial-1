import "server-only";
import { Resend } from "resend";
import type { ContactPayload, NewsletterPayload } from "./validation";
import { escapeHtml } from "./utils";

export class EmailNotConfiguredError extends Error {
  constructor() {
    super("Email delivery is not configured (missing RESEND_API_KEY).");
    this.name = "EmailNotConfiguredError";
  }
}

export class EmailDeliveryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailDeliveryError";
  }
}

export interface EmailConfig {
  apiKey: string | undefined;
  to: string;
  from: string;
}

/** Read email configuration from the environment with safe defaults. */
export function getEmailConfig(env: NodeJS.ProcessEnv = process.env): EmailConfig {
  return {
    apiKey: env.RESEND_API_KEY || undefined,
    to: env.CONTACT_TO_EMAIL || "gaurang@akrosstech.com",
    from: env.CONTACT_FROM_EMAIL || "Akrostech Website <onboarding@resend.dev>",
  };
}

interface OutgoingEmail {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export type EmailSender = (
  email: OutgoingEmail,
) => Promise<{ id: string | null; delivered: boolean }>;

/**
 * Build a sender bound to the current configuration.
 * In development without an API key, emails are logged instead of sent so
 * the forms remain testable locally. In production a missing key throws.
 */
export function createEmailSender(config: EmailConfig = getEmailConfig()): EmailSender {
  return async ({ subject, html, text, replyTo }) => {
    if (!config.apiKey) {
      if (process.env.NODE_ENV === "production") throw new EmailNotConfiguredError();
      console.info(`[email:dev] Would send "${subject}" to ${config.to}\n${text}`);
      return { id: null, delivered: false };
    }

    const resend = new Resend(config.apiKey);
    const { data, error } = await resend.emails.send({
      from: config.from,
      to: [config.to],
      subject,
      html,
      text,
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) throw new EmailDeliveryError(error.message);
    return { id: data?.id ?? null, delivered: true };
  };
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:8px 12px;color:#74746f;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:8px 12px;color:#111;font-size:14px">${value}</td></tr>`;

const layout = (title: string, body: string) => `<!doctype html>
<html><body style="margin:0;background:#f4f4f2;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden">
        <tr><td style="background:#0b0b0b;padding:20px 24px;color:#bff747;font-size:18px;font-weight:bold">Akrostech · ${escapeHtml(title)}</td></tr>
        <tr><td style="padding:16px 12px">${body}</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

/** Compose the notification email for a contact-form submission. */
export function buildContactEmail(
  payload: ContactPayload,
  meta: { ip: string; userAgent: string },
): OutgoingEmail {
  const name = `${payload.firstName} ${payload.lastName}`;
  const service = payload.service ?? "Not specified";
  const phone = payload.phone || "Not provided";
  const sms = payload.smsConsent ? "Yes — opted in to SMS" : "No";
  const message = escapeHtml(payload.message).replace(/\n/g, "<br>");

  const html = layout(
    "New contact enquiry",
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", escapeHtml(name))}
      ${row("Email", `<a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a>`)}
      ${row("Phone", escapeHtml(phone))}
      ${row("Service", escapeHtml(service))}
      ${row("SMS consent", sms)}
      ${row("Message", message)}
      ${row("IP", escapeHtml(meta.ip))}
      ${row("User agent", escapeHtml(meta.userAgent))}
    </table>`,
  );

  const text = [
    `New contact enquiry`,
    `Name: ${name}`,
    `Email: ${payload.email}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `SMS consent: ${sms}`,
    ``,
    payload.message,
    ``,
    `IP: ${meta.ip}`,
  ].join("\n");

  return { subject: `New enquiry: ${service} — ${name}`, html, text, replyTo: payload.email };
}

/** Compose the notification email for a newsletter sign-up. */
export function buildNewsletterEmail(payload: NewsletterPayload): OutgoingEmail {
  const email = escapeHtml(payload.email);
  return {
    subject: `New newsletter subscriber: ${payload.email}`,
    html: layout(
      "Newsletter sign-up",
      `<p style="padding:0 12px;font-size:15px;color:#111">${email} subscribed to the Akrostech newsletter.</p>`,
    ),
    text: `${payload.email} subscribed to the Akrostech newsletter.`,
    replyTo: payload.email,
  };
}
