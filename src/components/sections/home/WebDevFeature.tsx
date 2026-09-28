import Link from "next/link";
import { webDevHero, websitePackages } from "@/content/website-development";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/Scroll";

/** The new service, introduced editorially: sticky statement + price list. */
export function WebDevFeature() {
  return (
    <section
      id="web"
      data-tone="paper"
      data-index-label="Websites"
      aria-labelledby="webdev-title"
      className="py-28 md:py-40"
    >
      <div className="container-page grid gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="webdev-title"
            label="New — Website Development"
            index="03"
            title="Now building *websites* that work as hard as your team."
            size="md"
            description={webDevHero.intro}
          />
          <ImageReveal className="aspect-[16/10]">
            <Photo
              name="codeDesk"
              hover
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="size-full"
            />
          </ImageReveal>
        </div>

        <div className="flex flex-col">
          <p className="mb-6 label text-muted">( Packages — starting at )</p>
          <Reveal stagger={0.08} as="ul" className="border-t border-line">
            {websitePackages.map((tier) => (
              <li key={tier.name} className="border-b border-line">
                <Link
                  href="/services/website-development#packages"
                  className="group grid grid-cols-[1fr_auto] items-end gap-6 py-8"
                >
                  <span>
                    <span className="label text-muted">{tier.timeline}</span>
                    <span className="mt-3 block font-serif text-4xl leading-none text-fg transition-transform duration-700 group-hover:translate-x-2 group-hover:italic md:text-5xl">
                      {tier.name}
                    </span>
                    <span className="mt-3 block text-sm text-muted">{tier.tagline}</span>
                  </span>
                  <span className="font-serif text-4xl text-fg tabular-nums md:text-5xl">
                    {tier.price}
                  </span>
                </Link>
              </li>
            ))}
          </Reveal>
          <Reveal className="mt-12 flex flex-wrap items-center gap-6">
            <ButtonLink href="/services/website-development" arrow size="lg">
              Packages &amp; process
            </ButtonLink>
            <span className="label text-muted">Maintenance from $99 / month</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
