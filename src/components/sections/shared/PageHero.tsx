import Link from "next/link";
import type { PhotoKey } from "@/content/media";
import { Label } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { IntroFade, IntroTitle } from "@/components/motion/Intro";
import { ImageReveal } from "@/components/motion/Scroll";
import { breadcrumbJsonLd, serializeJsonLd } from "@/lib/seo";
import { plain } from "@/lib/rich";

interface Crumb {
  name: string;
  path: string;
}

interface PageHeroProps {
  label: string;
  /** Supports `*italic*` accents. */
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  photo?: PhotoKey;
  children?: React.ReactNode;
}

/**
 * Inner-page opener: breadcrumb + label, an oversized serif title, intro
 * copy on the right, then a full-width photograph that wipes in.
 */
export function PageHero({
  label,
  title,
  description,
  breadcrumbs,
  photo,
  children,
}: PageHeroProps) {
  const trail = [
    { name: "Home", path: "/" },
    ...breadcrumbs.map((c) => ({ ...c, name: plain(c.name) })),
  ];
  return (
    <section data-tone="paper" className="pt-32 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd(trail)) }}
      />
      <div className="container-page">
        <IntroFade
          delay={0}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5"
        >
          <Label>{label}</Label>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 label text-muted">
              {trail.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === trail.length - 1 ? (
                    <span aria-current="page" className="text-fg">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="link-line">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </IntroFade>

        <div className="grid gap-10 py-14 md:py-20 lg:grid-cols-[3fr_2fr] lg:items-end">
          <IntroTitle className="display-xl text-fg">{title}</IntroTitle>
          {(description || children) && (
            <IntroFade delay={0.35} className="flex flex-col gap-6">
              {description && <p className="text-lg leading-relaxed text-muted">{description}</p>}
              {children}
            </IntroFade>
          )}
        </div>
      </div>
      {photo && (
        <ImageReveal className="aspect-[16/9] w-full md:aspect-[21/9]">
          <Photo name={photo} baked priority sizes="100vw" className="size-full" />
        </ImageReveal>
      )}
    </section>
  );
}
