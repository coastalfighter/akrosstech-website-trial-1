import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { PhotoKey } from "@/content/media";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { IntroFade, IntroTitle } from "@/components/motion/Intro";
import { GridBackdrop } from "@/components/effects/Backgrounds";
import { Spotlight } from "@/components/effects/Spotlight";
import { breadcrumbJsonLd, serializeJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface Crumb {
  name: string;
  path: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  /** Full-bleed background photograph. */
  photo?: PhotoKey;
  children?: React.ReactNode;
  /** Optional visual rendered to the right on large screens. */
  aside?: React.ReactNode;
  className?: string;
}

/** Inner-page hero: full-bleed graded photo, breadcrumbs (+ JSON-LD), CSS intro. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  photo,
  children,
  aside,
  className,
}: PageHeroProps) {
  const trail = [{ name: "Home", path: "/" }, ...breadcrumbs];
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-line pt-40 pb-20 sm:pt-48 sm:pb-28",
        className,
      )}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd(trail)) }}
      />
      {photo && (
        <div className="absolute inset-0 -z-20">
          <Photo name={photo} baked priority sizes="100vw" className="size-full opacity-70" />
        </div>
      )}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-canvas via-canvas/90 to-canvas/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-canvas to-transparent"
        aria-hidden="true"
      />
      <GridBackdrop className="-z-10 opacity-60" />
      <Spotlight className="-z-10" />

      <div className="relative container-page grid items-center gap-12 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-7">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-fg-subtle uppercase">
              {trail.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3" aria-hidden="true" />}
                  {i === trail.length - 1 ? (
                    <span aria-current="page" className="text-fg-muted">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-pulse">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <IntroFade delay={0}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </IntroFade>
          <IntroTitle className="max-w-4xl text-[clamp(2.5rem,1.3rem+4.8vw,5.75rem)] leading-[0.98] font-bold tracking-[-0.04em] text-fg">
            {title}
          </IntroTitle>
          {description && (
            <IntroFade delay={0.3}>
              <p className="max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
                {description}
              </p>
            </IntroFade>
          )}
          {children && (
            <IntroFade delay={0.4} className="flex flex-col gap-7">
              {children}
            </IntroFade>
          )}
        </div>
        {aside && (
          <IntroFade delay={0.35} className="hidden lg:block">
            {aside}
          </IntroFade>
        )}
      </div>
    </section>
  );
}
