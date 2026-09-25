import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { readingTime } from "./utils";

const CONTENT_ROOT = path.join(process.cwd(), "content");

const blogFrontmatter = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
});

const legalFrontmatter = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  effectiveDate: z.string(),
  lastUpdated: z.string(),
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatter>;
export type LegalFrontmatter = z.infer<typeof legalFrontmatter>;

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  body: string;
  readingMinutes: number;
}

export interface LegalDoc extends LegalFrontmatter {
  slug: string;
  body: string;
}

const SLUG_PATTERN = /^[a-z0-9-]+$/;

function readMdx(dir: string, slug: string): { data: unknown; body: string } | null {
  // Guard against path traversal: slugs are restricted to [a-z0-9-].
  if (!SLUG_PATTERN.test(slug)) return null;
  const file = path.join(CONTENT_ROOT, dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { data, body: content };
}

function listSlugs(dir: string): string[] {
  const folder = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getBlogPost(slug: string): BlogPost | null {
  const raw = readMdx("blog", slug);
  if (!raw) return null;
  const parsed = blogFrontmatter.safeParse(raw.data);
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in content/blog/${slug}.mdx: ${parsed.error.message}`);
  }
  return { ...parsed.data, slug, body: raw.body, readingMinutes: readingTime(raw.body) };
}

/** All posts, newest first (ties broken by title for stable ordering). */
export function getAllBlogPosts(): BlogPost[] {
  return listSlugs("blog")
    .map((slug) => getBlogPost(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getLegalDoc(slug: string): LegalDoc | null {
  const raw = readMdx("legal", slug);
  if (!raw) return null;
  const parsed = legalFrontmatter.safeParse(raw.data);
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in content/legal/${slug}.mdx: ${parsed.error.message}`);
  }
  return { ...parsed.data, slug, body: raw.body };
}
