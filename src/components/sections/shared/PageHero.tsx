import Link from "next/link";
import Image from "next/image";
import { photos, type PhotoKey } from "@/content/media";
import { breadcrumbJsonLd, serializeJsonLd } from "@/lib/seo";
import { plain } from "@/lib/rich";
import { IntroFade, IntroTitle } from "@/components/motion/Intro";
import { Parallax } from "@/components/motion/Parallax";
import { ImageReveal } from "@/components/motion/Scroll";
import { Eyebrow } from "@/components/ui/SectionHeading";

interface Crumb {
  name: string;
  path: string;
}

interface PageHeroProps {
  eyebrow: string;
  /** Wrap words in *asterisks* for the muted half of a two-tone title. */
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  photo?: PhotoKey;
  children?: React.ReactNode;
}

/**
 * Inner-page opener on paper: breadcrumb trail, oversized two-tone title,
 * intro column and an optional wide photograph that wipes in and drifts.
 */
export function PageHero({
  eyebrow,
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
    <section aria-labelledby="page-title" className="pt-32 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd(trail)) }}
      />
      <div className="container-page">
        <IntroFade delay={0} className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 mono text-stone">
              {trail.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === trail.length - 1 ? (
                    <span aria-current="page" className="text-ink">
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

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <IntroTitle as="h1" id="page-title" className="h-xl">
            {title}
          </IntroTitle>
          {(description || children) && (
            <IntroFade delay={0.3} className="flex max-w-lg flex-col gap-6">
              {description && (
                <p className="text-[15px] leading-relaxed text-stone sm:text-base">{description}</p>
              )}
              {children}
            </IntroFade>
          )}
        </div>
      </div>

      {photo && (
        <div className="container-page mt-16 md:mt-20">
          <ImageReveal className="relative aspect-[16/10] rounded-[6px] bg-paper-2 md:aspect-[21/9]">
            <Parallax speed={0.14} className="absolute inset-x-0 -inset-y-[10%]">
              <Image
                src={photos[photo].src}
                alt={photos[photo].alt}
                fill
                priority
                sizes="100vw"
                placeholder="empty"
                className="object-cover"
              />
            </Parallax>
          </ImageReveal>
        </div>
      )}
    </section>
  );
}
