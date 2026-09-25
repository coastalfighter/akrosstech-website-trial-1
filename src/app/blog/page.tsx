import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/shared/PageHero";
import { BlogCards } from "@/components/sections/shared/BlogCards";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { ctaBanner } from "@/content/home";

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
        eyebrow="Our Blog"
        title="Our latest insight news"
        description="Practical guides on outsourcing, hiring and scaling your business with remote teams."
        breadcrumbs={[{ name: "Blog", path: "/blog" }]}
        photo="library"
      />
      <section aria-labelledby="articles-title" className="py-24 sm:py-32">
        <div className="container-page">
          <h2 id="articles-title" className="sr-only">
            All articles
          </h2>
          <BlogCards posts={posts} />
        </div>
      </section>
      <CtaBanner {...ctaBanner} />
    </>
  );
}
