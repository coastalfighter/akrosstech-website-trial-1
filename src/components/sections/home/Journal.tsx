import type { BlogPost } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PostCard } from "@/components/sections/shared/PostCard";

/** Latest articles from the journal. */
export function Journal({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="journal" aria-labelledby="journal-title" className="py-32 md:py-44">
      <div className="container-page">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="journal-title"
            eyebrow="Journal"
            title="Our take on outsourcing, *hiring and the web.*"
            size="md"
            className="max-w-2xl"
          />
          <Reveal y={12}>
            <ButtonLink href="/blog" arrow>
              Read all articles
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal stagger={0.1} as="ul" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
