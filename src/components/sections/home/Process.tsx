import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/** How an engagement runs — drawn from the onboarding FAQ on the original site. */
const steps = [
  {
    title: "Consultation",
    body: "A free call to understand your goals, workflows and the talent you need.",
  },
  {
    title: "Tailored plan",
    body: "We suggest the right service model and scope it around your business stage.",
  },
  {
    title: "Dedicated team",
    body: "Once the agreement is signed, we assign your dedicated, pre-vetted team.",
  },
  {
    title: "Training",
    body: "Your team is trained on your tools, processes and U.S. working hours.",
  },
  {
    title: "Go live",
    body: "Usually within 3–5 business days — with regular reporting and review calls.",
  },
];

/** rebrandgurus-style process rail: numbered steps along a hairline. */
export function Process() {
  return (
    <section
      id="process"
      data-tone="paper"
      data-index-label="Process"
      aria-labelledby="process-title"
      className="pb-28 md:pb-40"
    >
      <div className="container-page">
        <SectionHeading
          id="process-title"
          label="How we engage"
          index="07"
          title="From first call to *go-live* in days."
          size="md"
        />
        <Reveal
          stagger={0.1}
          as="ol"
          className="relative mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-5 md:gap-6"
        >
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex flex-col gap-4">
              <span
                className="absolute -top-[2.85rem] left-0 size-2.5 rounded-full bg-fg"
                aria-hidden="true"
              />
              <span className="font-serif text-6xl leading-none text-fg md:text-7xl">0{i + 1}</span>
              <h3 className="text-lg font-semibold text-fg">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
