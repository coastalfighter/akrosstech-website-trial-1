import { describe, expect, it } from "vitest";
import { getAllBlogPosts, getBlogPost, getLegalDoc } from "@/lib/content";

describe("content loader", () => {
  it("loads all migrated blog posts with valid frontmatter", () => {
    const posts = getAllBlogPosts();
    expect(posts).toHaveLength(3);
    for (const post of posts) {
      expect(post.title.length).toBeGreaterThan(10);
      expect(post.body.length).toBeGreaterThan(500);
      expect(post.readingMinutes).toBeGreaterThanOrEqual(1);
    }
  });

  it("returns null for unknown or unsafe slugs", () => {
    expect(getBlogPost("does-not-exist")).toBeNull();
    expect(getBlogPost("../../package")).toBeNull();
    expect(getLegalDoc("../blog/what-is-recruitment-process-outsourcing-rpo")).toBeNull();
  });

  it("loads both legal documents", () => {
    expect(getLegalDoc("privacy-policy")?.title).toBe("Privacy Policy");
    expect(getLegalDoc("terms-and-conditions")?.lastUpdated).toBe("07/02/2025");
  });
});
