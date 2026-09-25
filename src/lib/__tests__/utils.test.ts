import { describe, expect, it } from "vitest";
import { cn, escapeHtml, formatDate, readingTime } from "@/lib/utils";
import { formatCounter } from "@/components/motion/Counter";

describe("utils", () => {
  it("cn merges and de-duplicates tailwind classes", () => {
    expect(cn("px-2 py-1", false && "hidden", "px-4")).toBe("py-1 px-4");
  });

  it("escapeHtml neutralises markup", () => {
    expect(escapeHtml(`<script>alert("x")</script>&'`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;&amp;&#39;",
    );
  });

  it("formatDate is timezone-stable", () => {
    expect(formatDate("2025-01-22")).toBe("January 22, 2025");
  });

  it("readingTime has a one-minute floor", () => {
    expect(readingTime("short")).toBe(1);
    expect(readingTime(Array(900).fill("word").join(" "))).toBe(4);
  });

  it("formatCounter respects decimals and grouping", () => {
    expect(formatCounter(99.94, 1)).toBe("99.9");
    expect(formatCounter(1200)).toBe("1,200");
  });
});
