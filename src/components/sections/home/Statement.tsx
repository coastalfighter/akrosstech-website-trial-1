import { companyStats } from "@/content/site";
import { industries } from "@/content/industries";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/Scroll";
import { Counter } from "@/components/motion/Counter";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * Right after the cover: the industries we hire for as a quiet "client
 * row" marquee, then the brand statement lighting up word by word, and the
 * headline numbers.
 */
export function Statement() {
  return (
    <section id="about" aria-labelledby="statement-title" className="pt-24 pb-28 md:pt-32 md:pb-40">
      <div className="container-page grid gap-8 md:grid-cols-[1fr_20rem]">
        <p className="max-w-xs mono text-stone md:col-start-2">
          Trusted by startups, staffing agencies and enterprise teams across the U.S.
        </p>
      </div>

      <Marquee duration={45} className="mt-10 border-y border-ink/10 py-7">
        {industries.map((industry) => (
          <span
            key={industry.name}
            className="flex items-center gap-5 px-6 text-[clamp(1.1rem,0.9rem+0.8vw,1.6rem)] font-medium tracking-[-0.03em] whitespace-nowrap text-ink/60"
          >
            <span className="size-1.5 bg-lime" aria-hidden="true" />
            {industry.name}
          </span>
        ))}
      </Marquee>

      <div className="container-page mt-24 grid gap-14 md:mt-36 lg:grid-cols-[14rem_1fr]">
        <Reveal y={10}>
          <Eyebrow>About Akrostech</Eyebrow>
        </Reveal>
        <div className="flex flex-col gap-16">
          <h2 id="statement-title" className="sr-only">
            About Akrostech
          </h2>
          <ScrubText className="max-w-5xl h-md">
            At Akrostech, we build lean, efficient and high-performing remote teams that integrate
            seamlessly into your business — recruitment, virtual assistance, accounting and legal
            support. And now, we build the websites that help you grow, too.
          </ScrubText>

          <Reveal
            stagger={0.08}
            as="dl"
            className="grid grid-cols-2 gap-y-10 border-t border-ink/12 pt-10 md:grid-cols-4"
          >
            {companyStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2 pr-6">
                <dt className="order-2 text-[13px] text-stone">{stat.label}</dt>
                <dd className="order-1 h-lg tabular-nums">
                  <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
