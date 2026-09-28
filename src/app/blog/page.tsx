import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import { blogPhotos } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { PageHero } from "@/components/sections/shared/PageHero";
import { HoverList } from "@/components/sections/shared/HoverList";
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
        label="Journal"
        title="Our latest *insight* news"
        description="Practical guides on outsourcing, hiring and scaling your business with remote teams."
        breadcrumbs={[{ name: "Blog", path: "/blog" }]}
      />
      <section data-tone="paper" aria-labelledby="articles-title" className="pb-28 md:pb-40">
        <div className="container-page">
          <h2 id="articles-title" className="sr-only">
            All articles
          </h2>
          <HoverList
            size="md"
            items={posts.map((p) => ({
              href: `/blog/${p.slug}`,
              title: p.title,
              meta: `${formatDate(p.date)} — ${p.readingMinutes} min read`,
              tag: p.category,
              photo: blogPhotos[p.slug] ?? "blocks",
            }))}
          />
        </div>
      </section>
      <CtaBanner {...ctaBanner} />
    </>
  );
}
