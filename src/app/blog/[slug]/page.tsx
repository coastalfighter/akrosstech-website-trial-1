import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPost } from "@/lib/content";
import { blogPhotos } from "@/content/media";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata, serializeJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { MdxContent } from "@/components/mdx/MdxContent";
import { HoverList } from "@/components/sections/shared/HoverList";
import { Label } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { IntroFade } from "@/components/motion/Intro";
import { ImageReveal } from "@/components/motion/Scroll";

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
      <article data-tone="paper">
        <header className="pt-32 md:pt-40">
          <div className="container-page max-w-5xl">
            <IntroFade
              delay={0}
              className="flex items-center justify-between gap-4 border-b border-line pb-5"
            >
              <Label>{post.category}</Label>
              <Link href="/blog" className="link-line label text-muted">
                ← Back to blog
              </Link>
            </IntroFade>
            <h1 className="mt-12 display-lg text-fg">{post.title}</h1>
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 label text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.readingMinutes} min read</span>
              <span>By Akrostech</span>
            </p>
          </div>
          <ImageReveal className="mt-14 aspect-[21/9] w-full">
            <Photo
              name={blogPhotos[slug] ?? "blocks"}
              baked
              priority
              sizes="100vw"
              className="size-full"
            />
          </ImageReveal>
        </header>
        <div className="container-page max-w-3xl py-20">
          <MdxContent source={post.body} />
          {post.tags.length > 0 && (
            <ul className="mt-14 flex flex-wrap gap-2 border-t border-line pt-8" aria-label="Tags">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line-strong px-3 py-1.5 label text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
      {related.length > 0 && (
        <section data-tone="ink" aria-labelledby="related-title" className="py-28">
          <div className="container-page">
            <h2 id="related-title" className="mb-12 display-md text-fg">
              Keep <em className="italic">reading</em>
            </h2>
            <HoverList
              size="md"
              items={related.map((p) => ({
                href: `/blog/${p.slug}`,
                title: p.title,
                meta: `${formatDate(p.date)} — ${p.readingMinutes} min read`,
                tag: p.category,
                photo: blogPhotos[p.slug] ?? "blocks",
              }))}
            />
          </div>
        </section>
      )}
    </>
  );
}
