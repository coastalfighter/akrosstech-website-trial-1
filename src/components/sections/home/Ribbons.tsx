import { Marquee } from "@/components/motion/Marquee";

const top = [
  "Recruitment",
  "Virtual Assistance",
  "Accounting",
  "Legal Support",
  "Web Development",
  "U.S. Aligned",
  "Offshore Talent",
];
const bottom = [
  "Strategy",
  "Design",
  "Development",
  "Compliance",
  "Scalability",
  "Onshore Quality",
  "Reliability",
];

/** Two tilted marquee ribbons crossing each other (rebrandgurus-style). */
export function Ribbons() {
  return (
    <section
      data-tone="paper"
      aria-hidden="true"
      className="relative h-[34vh] min-h-[240px] overflow-hidden md:h-[46vh]"
    >
      <div className="absolute top-1/2 left-1/2 w-[130%] -translate-x-1/2 -translate-y-1/2 -rotate-[4deg] bg-ink py-4 text-paper md:py-6">
        <Marquee duration={38} pauseOnHover={false}>
          {top.map((word) => (
            <span
              key={word}
              className="flex items-center gap-10 font-serif text-3xl whitespace-nowrap italic md:text-5xl"
            >
              {word}
              <span className="text-lg not-italic">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
      <div className="absolute top-1/2 left-1/2 w-[130%] -translate-x-1/2 -translate-y-1/2 rotate-[5deg] bg-lime py-4 text-ink md:py-6">
        <Marquee duration={44} reverse pauseOnHover={false}>
          {bottom.map((word) => (
            <span
              key={word}
              className="flex items-center gap-10 text-2xl font-extrabold tracking-tight whitespace-nowrap uppercase md:text-4xl"
            >
              {word}
              <span className="text-lg">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
