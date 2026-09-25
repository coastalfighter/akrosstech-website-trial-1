import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { createRateLimiter } from "@/lib/rate-limit";
import { guardFormRequest, jsonError } from "@/lib/api";
import { buildNewsletterEmail, createEmailSender, EmailNotConfiguredError } from "@/lib/email";

export const runtime = "nodejs";

/** 3 sign-ups per IP per 10 minutes. */
const limiter = createRateLimiter({ limit: 3, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  const guarded = await guardFormRequest(request, newsletterSchema, limiter);
  if (!guarded.ok) return guarded.response;

  if (guarded.data.website) return NextResponse.json({ ok: true });

  try {
    await createEmailSender()(buildNewsletterEmail(guarded.data));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(
      "[api/newsletter] delivery failed:",
      error instanceof Error ? error.message : error,
    );
    if (error instanceof EmailNotConfiguredError) {
      return jsonError(503, "Newsletter sign-up is temporarily unavailable.");
    }
    return jsonError(502, "We couldn’t subscribe you right now. Please try again later.");
  }
}

export function GET() {
  return jsonError(405, "Method not allowed", {}, { Allow: "POST" });
}
