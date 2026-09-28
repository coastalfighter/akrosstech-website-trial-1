import type { BlogPost } from "@/lib/content";
import { studioNews } from "@/content/studio";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PostCard } from "@/components/sections/shared/PostCard";

/** Latest news: eyebrow, two-line title, "See all articles", then the cards. */
export function Journal({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="journal" aria-labelledby="journal-title" className="py-40 md:py-52">
      <div className="container-page">
        <div className="mb-16 flex flex-col gap-6">
          <Reveal y={10}>
            <Eyebrow>{studioNews.eyebrow}</Eyebrow>
          </Reveal>
          <TextReveal as="h2" id="journal-title" split="lines" className="max-w-2xl h-lg">
            {studioNews.title}
          </TextReveal>
          <Reveal y={12} className="mt-8">
            <ButtonLink href="/blog" arrow>
              {studioNews.cta}
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal
          stagger={0.1}
          as="ul"
          className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
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
