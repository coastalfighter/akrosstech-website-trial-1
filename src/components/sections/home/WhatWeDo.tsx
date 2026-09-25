import { whatWeDo } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Icon } from "@/components/ui/Icon";

/** Animated connection between U.S. clients and the India delivery centre. */
function ConnectionMap() {
  return (
    <svg
      viewBox="0 0 520 260"
      className="h-auto w-full"
      role="img"
      aria-label="U.S. clients connected to our India-based delivery team"
    >
      <defs>
        <linearGradient id="arc" x1="0" x2="1">
          <stop offset="0" stopColor="#bff747" />
          <stop offset="1" stopColor="#3de0c5" />
        </linearGradient>
        <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.2" fill="rgba(255,255,255,0.12)" />
        </pattern>
      </defs>
      <rect width="520" height="260" fill="url(#dots)" rx="24" />
      <path
        d="M100 170 C 180 20, 340 20, 420 150"
        fill="none"
        stroke="url(#arc)"
        strokeWidth="2"
        strokeDasharray="6 8"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="140"
          to="0"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      <circle r="5" fill="#bff747">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path="M100 170 C 180 20, 340 20, 420 150"
        />
      </circle>
      {[
        { x: 100, y: 170, label: "U.S. Clients", sub: "EST · CST · MST · PST" },
        { x: 420, y: 150, label: "Delivery Team", sub: "India · U.S.-aligned hours" },
      ].map((node) => (
        <g key={node.label}>
          <circle cx={node.x} cy={node.y} r="16" fill="rgba(191,247,71,0.15)">
            <animate attributeName="r" values="12;22;12" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx={node.x} cy={node.y} r="7" fill="#bff747" />
          <text
            x={node.x}
            y={node.y + 38}
            textAnchor="middle"
            className="fill-fg text-[15px] font-semibold"
          >
            {node.label}
          </text>
          <text
            x={node.x}
            y={node.y + 58}
            textAnchor="middle"
            className="fill-fg-subtle text-[11px]"
          >
            {node.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function WhatWeDo() {
  return (
    <section aria-labelledby="what-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading id="what-title" eyebrow={whatWeDo.eyebrow} title={whatWeDo.heading} />
          <Reveal>
            <ButtonLink href="/contact" arrow variant="secondary">
              Contact Us
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <Reveal
            className="border-line bg-ink-850 flex flex-col justify-between gap-10 rounded-[2rem] border p-8 sm:p-10 lg:col-span-7"
            scale={0.96}
          >
            <ConnectionMap />
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <p className="font-display text-7xl leading-none font-semibold text-lime-500 sm:text-8xl">
                <Counter value={100} suffix="+" />
              </p>
              <p className="text-fg-muted max-w-xs">{whatWeDo.projects}</p>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:col-span-5">
            <TiltCard className="rounded-[2rem]">
              <Reveal className="border-line from-ink-800 to-ink-900 flex h-full flex-col gap-4 rounded-[2rem] border bg-gradient-to-br p-8">
                <span className="text-ink-950 grid size-12 place-items-center rounded-2xl bg-lime-500">
                  <Icon name="users" className="size-6" />
                </span>
                <p className="font-display text-fg-subtle text-xs tracking-[0.25em] uppercase">
                  {whatWeDo.valueTitle}
                </p>
                <h3 className="text-fg text-2xl font-medium">{whatWeDo.network.title}</h3>
                <p className="text-fg-muted leading-relaxed">{whatWeDo.network.body}</p>
              </Reveal>
            </TiltCard>
            <TiltCard className="rounded-[2rem]">
              <Reveal
                className="text-ink-950 flex h-full flex-col gap-4 rounded-[2rem] border border-lime-500/30 bg-lime-500 p-8"
                delay={0.1}
              >
                <Icon name="layers" className="size-8" />
                <h3 className="text-2xl font-semibold">{whatWeDo.engagement.title}</h3>
                <p className="text-ink-800 leading-relaxed">{whatWeDo.engagement.body}</p>
              </Reveal>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
