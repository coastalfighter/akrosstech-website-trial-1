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
      />
      <section aria-label="Articles" className="pb-24 sm:pb-32">
        <div className="container-page">
          <BlogCards posts={posts} />
        </div>
      </section>
      <CtaBanner {...ctaBanner} />
    </>
  );
}
