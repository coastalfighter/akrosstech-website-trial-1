export type SubmitResult =
  { ok: true } | { ok: false; message: string; fieldErrors?: Record<string, string> };

/** POST JSON to an API route and normalise the response for form UIs. */
export async function postJson(
  url: string,
  body: unknown,
  signal?: AbortSignal,
): Promise<SubmitResult> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });
    const data = (await res.json().catch(() => ({}))) as {
      message?: string;
      fieldErrors?: Record<string, string>;
    };
    if (res.ok) return { ok: true };
    return {
      ok: false,
      message: data.message ?? "Something went wrong. Please try again.",
      fieldErrors: data.fieldErrors,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, message: "Request cancelled." };
    }
    return { ok: false, message: "Network error — please check your connection and try again." };
  }
}
