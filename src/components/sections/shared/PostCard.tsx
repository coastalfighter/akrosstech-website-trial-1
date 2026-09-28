import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/content";
import { blogPhoto } from "@/content/media";
import { formatDate } from "@/lib/utils";

/** Journal card: image, date · read time, title. */
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
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-paper-2">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-[3px] bg-paper/90 px-2 py-1 mono !text-[9px] text-ink">
          {post.category}
        </span>
      </div>
      <Heading className="text-[17px] leading-snug font-medium tracking-[-0.01em]">
        <span className="link-line">{post.title}</span>
      </Heading>
      <p className="mono text-stone">
        {formatDate(post.date)} · {post.readingMinutes} min read
      </p>
    </Link>
  );
}
