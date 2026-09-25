import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getAllBlogPosts, getBlogPost } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata, serializeJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { MdxContent } from "@/components/mdx/MdxContent";
import { BlogCards } from "@/components/sections/shared/BlogCards";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { GradientMesh } from "@/components/effects/Backgrounds";
import { ctaBanner } from "@/content/home";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getAllBlogPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            articleJsonLd(post),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${slug}` },
            ]),
          ]),
        }}
      />
      <article>
        <header className="relative overflow-hidden pt-36 pb-14 sm:pt-44">
          <GradientMesh className="opacity-60" />
          <div className="container-page relative max-w-4xl">
            <Link
              href="/blog"
              className="text-fg-muted mb-8 inline-flex items-center gap-2 text-sm transition-colors hover:text-lime-500"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> Back to blog
            </Link>
            <Reveal y={16}>
              <Eyebrow>{post.category}</Eyebrow>
            </Reveal>
            <h1 className="text-fg mt-6 text-[clamp(2.25rem,1.4rem+3.4vw,4rem)] leading-[1.05] font-semibold tracking-tight">
              {post.title}
            </h1>
            <p className="text-fg-subtle mt-6 flex flex-wrap items-center gap-3 text-sm">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden="true" /> {post.readingMinutes} min read
              </span>
              <span aria-hidden="true">·</span>
              <span>By Akrostech</span>
            </p>
          </div>
        </header>

        <div className="container-page max-w-3xl pb-16">
          <MdxContent source={post.body} />
          {post.tags.length > 0 && (
            <ul className="border-line mt-14 flex flex-wrap gap-2 border-t pt-8" aria-label="Tags">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-line-strong text-fg-muted rounded-full border px-3 py-1 text-xs"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-line border-t py-20">
          <div className="container-page">
            <h2 id="related-title" className="text-fg mb-10 text-3xl font-medium">
              Keep reading
            </h2>
            <BlogCards posts={related} />
          </div>
        </section>
      )}
      <CtaBanner {...ctaBanner} />
    </>
  );
}
