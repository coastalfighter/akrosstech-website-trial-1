import { features, whyChooseUs } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StackCards, type StackCard } from "@/components/sections/shared/StackCards";
import { whySublines } from "@/content/studio";

const base: StackCard[] = [
  { ...whyChooseUs.points[0]!, photo: "circuitBoard" },
  { ...whyChooseUs.points[1]!, photo: "meeting" },
  { ...features.items[0]!, photo: "highFive" },
  { ...features.items[1]!, photo: "workshop" },
  { ...features.items[2]!, photo: "security" },
];
const points: StackCard[] = base.map((p) => ({ ...p, subline: whySublines[p.title] }));

/** Why work with us — the five reasons as sticky stacked moss cards. */
export function WhyWork() {
  return (
    <section id="why" aria-labelledby="why-title" className="pb-0">
      <div className="container-page">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
          <SectionHeading
            id="why-title"
            eyebrow="Why work with us"
            title="Why work with us?"
            size="lg"
          />
          <Reveal y={16}>
            <p className="text-base leading-[1.4] text-stone">{whyChooseUs.body}</p>
          </Reveal>
        </div>
        <StackCards items={points} />
      </div>
    </section>
  );
}
