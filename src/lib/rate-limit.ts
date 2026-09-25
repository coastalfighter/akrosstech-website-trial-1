/**
 * Minimal fixed-window rate limiter.
 *
 * State lives in module memory, so on serverless platforms each warm
 * instance keeps its own counters. That is enough to blunt casual abuse of
 * the contact form; for strict global limits swap the store for a shared
 * KV (e.g. Upstash Redis) behind the same `check()` interface.
 */
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Epoch ms when the current window resets. */
  resetAt: number;
}

export interface RateLimiter {
  check(key: string, now?: number): RateLimitResult;
  reset(): void;
}

export function createRateLimiter({
  limit,
  windowMs,
}: {
  limit: number;
  windowMs: number;
}): RateLimiter {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return {
    check(key, now = Date.now()) {
      // Opportunistic cleanup keeps memory bounded.
      if (hits.size > 5000) {
        for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
      }

      const entry = hits.get(key);
      if (!entry || entry.resetAt <= now) {
        const resetAt = now + windowMs;
        hits.set(key, { count: 1, resetAt });
        return { allowed: true, remaining: limit - 1, resetAt };
      }

      entry.count += 1;
      const allowed = entry.count <= limit;
      return { allowed, remaining: Math.max(0, limit - entry.count), resetAt: entry.resetAt };
    },
    reset() {
      hits.clear();
    },
  };
}

/** Best-effort client IP from standard proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
