import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllBlogPosts, getBlogPost } from "@/lib/content";
import { blogPhotos } from "@/content/media";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata, serializeJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { MdxContent } from "@/components/mdx/MdxContent";
import { BlogCards } from "@/components/sections/shared/BlogCards";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { IntroFade } from "@/components/motion/Intro";
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
        <header className="relative pt-40 pb-12 sm:pt-48">
          <div className="absolute inset-0 grid-lines mask-radial opacity-50" aria-hidden="true" />
          <div className="relative container-page max-w-4xl">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-fg-muted uppercase transition-colors hover:text-pulse"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> Back to blog
            </Link>
            <IntroFade delay={0}>
              <Eyebrow>{post.category}</Eyebrow>
            </IntroFade>
            <h1 className="mt-6 text-[clamp(2.25rem,1.3rem+3.6vw,4.25rem)] leading-[1.04] font-bold tracking-tight text-fg">
              {post.title}
            </h1>
            <p className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.1em] text-fg-subtle uppercase">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">/</span>
              <span>{post.readingMinutes} min read</span>
              <span aria-hidden="true">/</span>
              <span>By Akrostech</span>
            </p>
          </div>
          <div className="relative container-page mt-12 max-w-5xl">
            <Photo
              name={blogPhotos[slug] ?? "blocks"}
              priority
              className="aspect-[21/9] rounded-2xl border border-line"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
        </header>

        <div className="container-page max-w-3xl pb-16">
          <MdxContent source={post.body} />
          {post.tags.length > 0 && (
            <ul className="mt-14 flex flex-wrap gap-2 border-t border-line pt-8" aria-label="Tags">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-line-strong px-2.5 py-1 font-mono text-xs text-fg-muted"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line py-20">
          <div className="container-page">
            <h2 id="related-title" className="mb-10 text-3xl font-semibold text-fg">
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
