import "server-only";
import { NextResponse } from "next/server";
import type * as z from "zod/mini";
import { fieldErrors } from "./validation";
import { clientIp, type RateLimiter } from "./rate-limit";

/** Max accepted JSON body size (bytes) — generous for a contact message. */
export const MAX_BODY_BYTES = 16 * 1024;

export function jsonError(
  status: number,
  message: string,
  extra: Record<string, unknown> = {},
  headers?: HeadersInit,
) {
  return NextResponse.json({ ok: false, message, ...extra }, { status, headers });
}

/**
 * Reject cross-site form posts: when an Origin header is present it must
 * match the request host. (Same-origin fetches from our pages always pass.)
 */
export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host;
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return originHost === host;
  } catch {
    return false;
  }
}

type Guarded<T> = { ok: true; data: T; ip: string } | { ok: false; response: NextResponse };

/**
 * Shared request pipeline for form endpoints:
 * origin check → content-type → rate limit → size limit → JSON parse → schema validation.
 */
export async function guardFormRequest<S extends z.ZodMiniType>(
  request: Request,
  schema: S,
  limiter: RateLimiter,
): Promise<Guarded<z.output<S>>> {
  if (!isAllowedOrigin(request)) {
    return { ok: false, response: jsonError(403, "Forbidden") };
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return { ok: false, response: jsonError(415, "Content-Type must be application/json") };
  }

  const ip = clientIp(request.headers);
  const limit = limiter.check(ip);
  if (!limit.allowed) {
    const retryAfter = Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000));
    return {
      ok: false,
      response: jsonError(
        429,
        "Too many requests — please try again in a few minutes.",
        {},
        { "Retry-After": String(retryAfter) },
      ),
    };
  }

  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return { ok: false, response: jsonError(413, "Request body too large") };
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return { ok: false, response: jsonError(400, "Invalid JSON body") };
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return {
      ok: false,
      response: jsonError(422, "Please check the highlighted fields.", {
        fieldErrors: fieldErrors(parsed.error),
      }),
    };
  }

  return { ok: true, data: parsed.data, ip };
}
