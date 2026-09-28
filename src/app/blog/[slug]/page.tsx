import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPost } from "@/lib/content";
import { blogPhotos } from "@/content/media";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata, serializeJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { MdxContent } from "@/components/mdx/MdxContent";
import { PostCard } from "@/components/sections/shared/PostCard";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { IntroFade } from "@/components/motion/Intro";
import { ImageReveal } from "@/components/motion/Scroll";
import { Reveal } from "@/components/motion/Reveal";

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
        <header className="pt-32 md:pt-40">
          <div className="container-page max-w-5xl">
            <IntroFade
              delay={0}
              className="flex items-center justify-between gap-4 border-b border-ink/12 pb-5"
            >
              <Eyebrow>{post.category}</Eyebrow>
              <Link href="/blog" className="link-line mono text-stone">
                ← Back to journal
              </Link>
            </IntroFade>
            <h1 className="mt-12 h-lg">{post.title}</h1>
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 mono text-stone">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.readingMinutes} min read</span>
              <span>By Akrostech</span>
            </p>
          </div>
          <div className="container-page mt-14">
            <ImageReveal className="aspect-[16/9] w-full rounded-[6px] md:aspect-[21/9]">
              <Photo
                name={blogPhotos[slug] ?? "blocks"}
                priority
                sizes="100vw"
                className="size-full"
              />
            </ImageReveal>
          </div>
        </header>
        <div className="container-page max-w-3xl py-20">
          <MdxContent source={post.body} />
          {post.tags.length > 0 && (
            <ul
              className="mt-14 flex flex-wrap gap-2 border-t border-ink/12 pt-8"
              aria-label="Tags"
            >
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-[3px] border border-ink/15 px-2.5 py-1 text-[13px]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-ink/12 py-28">
          <div className="container-page">
            <h2 id="related-title" className="mb-12 h-md">
              Keep <span className="opacity-50">reading.</span>
            </h2>
            <Reveal stagger={0.1} as="ul" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
