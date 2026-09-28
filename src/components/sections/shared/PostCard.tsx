import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/content";
import { blogPhoto } from "@/content/media";
import { formatDate } from "@/lib/utils";

/** Journal card (juncastudio-style): category · date, image, title, read time, excerpt. */
export function PostCard({
  post,
  headingLevel = "h3",
}: {
  post: BlogPost;
  headingLevel?: "h2" | "h3";
}) {
  const photo = blogPhoto(post.slug);
  const Heading = headingLevel;
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-cursor="Read article"
      className="group flex flex-col gap-3"
    >
      <p className="flex items-center justify-between gap-4 text-sm text-stone">
        <span>{post.category}</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-paper-2">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
      <Heading className="mt-2 font-display text-[1.375rem] leading-[1.15] font-medium tracking-[-0.02em]">
        {post.title}
      </Heading>
      <p className="text-sm text-stone">{post.readingMinutes} min read</p>
      <p className="line-clamp-3 text-[15px] leading-[1.4]">{post.description}</p>
    </Link>
  );
}
