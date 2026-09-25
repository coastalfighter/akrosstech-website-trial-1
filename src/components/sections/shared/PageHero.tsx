import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { IntroFade, IntroTitle } from "@/components/motion/Intro";
import { DotGrid, GradientMesh } from "@/components/effects/Backgrounds";
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
  children?: React.ReactNode;
  /** Optional visual rendered to the right on large screens. */
  aside?: React.ReactNode;
  className?: string;
}

/** Inner-page hero with breadcrumbs (+ BreadcrumbList JSON-LD). */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  aside,
  className,
}: PageHeroProps) {
  const trail = [{ name: "Home", path: "/" }, ...breadcrumbs];
  return (
    <section
      className={cn("relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28", className)}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd(trail)) }}
      />
      <GradientMesh className="opacity-70" />
      <DotGrid className="opacity-50" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-7">
          <nav aria-label="Breadcrumb">
            <ol className="text-fg-subtle flex flex-wrap items-center gap-1.5 text-sm">
              {trail.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3.5" aria-hidden="true" />}
                  {i === trail.length - 1 ? (
                    <span aria-current="page" className="text-fg-muted">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-lime-500">
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
          <IntroTitle className="text-fg max-w-4xl text-[clamp(2.5rem,1.4rem+4.6vw,5.5rem)] leading-[1] font-semibold tracking-[-0.03em]">
            {title}
          </IntroTitle>
          {description && (
            <IntroFade delay={0.3}>
              <p className="text-fg-muted max-w-2xl text-lg leading-relaxed sm:text-xl">
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
