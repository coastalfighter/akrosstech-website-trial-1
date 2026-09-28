import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { allServiceCards } from "@/content/services";
import { photos, servicePhotos } from "@/content/media";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";

/**
 * Every service as a large row. On hover the row floods lime and its photo
 * swings in on the right (pure CSS); on touch the photo shows inline.
 */
export function ServiceRows() {
  return (
    <Reveal stagger={0.06} as="ol" className="border-t border-ink/12">
      {allServiceCards.map((s, i) => {
        const photo = photos[servicePhotos[s.slug]?.hero ?? "blocks"];
        return (
          <li key={s.slug} className="border-b border-ink/12">
            <Link
              href={`/services/${s.slug}`}
              className="group relative grid items-center gap-6 overflow-hidden px-2 py-8 transition-colors duration-500 hover:bg-lime md:grid-cols-[4rem_1.3fr_1fr_12rem] md:px-4 md:py-10"
            >
              <span className="mono text-stone tabular-nums group-hover:text-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="flex items-center gap-3 h-md">
                {s.title}
                {s.slug === "website-development" && (
                  <Badge className="group-hover:bg-ink group-hover:text-lime">New</Badge>
                )}
              </h2>
              <p className="max-w-md text-[15px] leading-[1.4] text-stone group-hover:text-ink/80">
                {s.summary}
              </p>
              <span className="relative hidden aspect-[4/3] w-full overflow-hidden rounded-[4px] md:block">
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="12rem"
                  className="translate-y-6 rotate-3 object-cover opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:rotate-0 group-hover:opacity-100"
                />
                <ArrowUpRight
                  className="absolute right-0 bottom-0 size-6 transition-opacity duration-300 group-hover:opacity-0"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        );
      })}
    </Reveal>
  );
}
