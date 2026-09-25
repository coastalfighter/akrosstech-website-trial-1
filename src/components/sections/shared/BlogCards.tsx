import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { LogoMark } from "@/components/layout/Logo";

const accents = ["from-lime-500/30", "from-teal-400/30", "from-violet-500/30"];

export function BlogCards({
  posts,
}: {
  posts: Pick<
    BlogPost,
    "slug" | "title" | "description" | "date" | "category" | "readingMinutes"
  >[];
}) {
  return (
    <Reveal stagger={0.1} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <TiltCard key={post.slug} className="rounded-[1.75rem]" max={5}>
          <article className="border-line bg-ink-850 relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border">
            <div
              className={`relative grid aspect-[16/9] place-items-center overflow-hidden bg-gradient-to-br ${accents[i % accents.length]} to-ink-900`}
              aria-hidden="true"
            >
              <div className="dot-grid absolute inset-0 opacity-50" />
              <LogoMark className="text-fg/20 w-24 transition-transform duration-700 group-hover/tilt:scale-110 group-hover/tilt:rotate-6" />
              <span className="bg-ink-950/70 absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-medium text-lime-500 backdrop-blur">
                {post.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <p className="text-fg-subtle flex items-center gap-3 text-xs">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" aria-hidden="true" /> {post.readingMinutes} min read
                </span>
              </p>
              <h3 className="text-fg text-xl leading-snug font-medium">
                <Link
                  href={`/blog/${post.slug}`}
                  className="after:absolute after:inset-0 hover:text-lime-500"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-fg-muted line-clamp-3 text-sm leading-relaxed">
                {post.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold text-lime-500">
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
