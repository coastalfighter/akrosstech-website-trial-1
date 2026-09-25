"use client";

import { useRef } from "react";
import { m, useInView } from "motion/react";

/** Circular progress ring that fills when scrolled into view. */
export function AccuracyRing({ value, size = 132 }: { value: number; size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 132 132"
      role="img"
      aria-label={`${value}% task accuracy rate`}
    >
      <circle
        cx="66"
        cy="66"
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="10"
      />
      <m.circle
        cx="66"
        cy="66"
        r={radius}
        fill="none"
        stroke="#bff747"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={inView ? { strokeDashoffset: circumference * (1 - value / 100) } : undefined}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        transform="rotate(-90 66 66)"
      />
      <text
        x="66"
        y="74"
        textAnchor="middle"
        className="fill-fg font-display text-[26px] font-semibold"
      >
        {value}%
      </text>
    </svg>
  );
}
