import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { createRateLimiter } from "@/lib/rate-limit";
import { guardFormRequest, jsonError } from "@/lib/api";
import { buildContactEmail, createEmailSender, EmailNotConfiguredError } from "@/lib/email";

export const runtime = "nodejs";

/** 5 submissions per IP per 10 minutes. */
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  const guarded = await guardFormRequest(request, contactSchema, limiter);
  if (!guarded.ok) return guarded.response;

  // Honeypot filled → silently accept so bots learn nothing.
  if (guarded.data.website) return NextResponse.json({ ok: true });

  try {
    const send = createEmailSender();
    await send(
      buildContactEmail(guarded.data, {
        ip: guarded.ip,
        userAgent: request.headers.get("user-agent") ?? "unknown",
      }),
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] delivery failed:", error instanceof Error ? error.message : error);
    if (error instanceof EmailNotConfiguredError) {
      return jsonError(
        503,
        "Our contact form is temporarily unavailable. Please email or call us directly.",
      );
    }
    return jsonError(
      502,
      "We couldn’t send your message right now. Please try again or email us directly.",
    );
  }
}

export function GET() {
  return jsonError(405, "Method not allowed", {}, { Allow: "POST" });
}
