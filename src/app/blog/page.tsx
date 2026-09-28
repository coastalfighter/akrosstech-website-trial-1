import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/shared/PageHero";
import { PostCard } from "@/components/sections/shared/PostCard";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Outsourcing & Growth Insights",
  description:
    "Insights on recruitment process outsourcing, virtual assistants, HR outsourcing and building high-performing remote teams.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllBlogPosts();
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Our take on outsourcing, *hiring and the web.*"
        description="Practical guides on outsourcing, hiring and scaling your business with remote teams."
        breadcrumbs={[{ name: "Blog", path: "/blog" }]}
      />
      <section aria-labelledby="articles-title" className="pt-20 pb-32 md:pt-28 md:pb-44">
        <div className="container-page">
          <h2 id="articles-title" className="sr-only">
            All articles
          </h2>
          <Reveal
            stagger={0.1}
            as="ul"
            className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
