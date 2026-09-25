import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/content";
import { blogPhotos } from "@/content/media";
import { formatDate } from "@/lib/utils";
import { Photo } from "@/components/ui/Photo";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";

type PostSummary = Pick<
  BlogPost,
  "slug" | "title" | "description" | "date" | "category" | "readingMinutes"
>;

export function BlogCards({ posts }: { posts: PostSummary[] }) {
  return (
    <Reveal stagger={0.1} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <TiltCard key={post.slug} className="rounded-2xl" max={4}>
          <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel">
            <Photo
              name={blogPhotos[post.slug] ?? "blocks"}
              className="aspect-[16/10]"
              sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
            >
              <span className="absolute top-4 left-4 z-10 rounded-md border border-line-strong bg-void/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-pulse uppercase backdrop-blur">
                {post.category}
              </span>
            </Photo>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.08em] text-fg-subtle uppercase">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">/</span>
                <span>{post.readingMinutes} min read</span>
              </p>
              <h3 className="text-xl leading-snug font-semibold text-fg">
                <Link
                  href={`/blog/${post.slug}`}
                  className="after:absolute after:inset-0 hover:text-signal-soft"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="line-clamp-3 text-sm leading-relaxed text-fg-muted">
                {post.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-3 font-mono text-xs tracking-[0.12em] text-pulse uppercase">
                Read More{" "}
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover/tilt:rotate-45"
                  aria-hidden="true"
                />
              </span>
            </div>
          </article>
        </TiltCard>
      ))}
    </Reveal>
  );
}
