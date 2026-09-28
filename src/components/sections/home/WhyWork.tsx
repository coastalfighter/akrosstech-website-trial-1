import { features, whyChooseUs } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StackCards, type StackCard } from "@/components/sections/shared/StackCards";

const points: StackCard[] = [
  { ...whyChooseUs.points[0]!, photo: "circuitBoard" },
  { ...whyChooseUs.points[1]!, photo: "meeting" },
  { ...features.items[0]!, photo: "highFive" },
  { ...features.items[1]!, photo: "workshop" },
  { ...features.items[2]!, photo: "security" },
];

/** Why work with us — the five reasons as sticky stacked moss cards. */
export function WhyWork() {
  return (
    <section id="why" aria-labelledby="why-title" className="pb-32 md:pb-44">
      <div className="container-page">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
          <SectionHeading
            id="why-title"
            eyebrow={whyChooseUs.eyebrow}
            title="Built for reliability, *scalability and value.*"
            size="lg"
          />
          <Reveal y={16}>
            <p className="text-[15px] leading-relaxed text-stone">{whyChooseUs.body}</p>
          </Reveal>
        </div>
        <StackCards items={points} />
      </div>
    </section>
  );
}
