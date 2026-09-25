"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface CounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function formatCounter(value: number, decimals = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Number that counts up when scrolled into view. The final value is
 * server-rendered (SEO / no-JS) and in an sr-only span, so assistive tech
 * never hears the intermediate numbers.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2.2,
  className,
}: CounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapperRef, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = usePrefersReducedMotion();
  const final = `${prefix}${formatCounter(value, decimals)}${suffix}`;

  // Reset to zero after hydration (only if not yet visible) so the count-up is seen.
  useEffect(() => {
    if (reduced || inView || !numberRef.current) return;
    numberRef.current.textContent = formatCounter(0, decimals);
  }, [reduced, inView, decimals]);

  useEffect(() => {
    if (!inView || reduced || !numberRef.current) return;
    const node = numberRef.current;
    const state = { value: 0 };
    const tween = gsap.to(state, {
      value,
      duration,
      ease: "expo.out",
      onUpdate: () => {
        node.textContent = formatCounter(state.value, decimals);
      },
    });
    return () => {
      tween.kill();
    };
  }, [inView, reduced, value, decimals, duration]);

  return (
    <span ref={wrapperRef} className={className}>
      <span aria-hidden="true">
        {prefix}
        <span ref={numberRef} className="tabular-nums">
          {formatCounter(value, decimals)}
        </span>
        {suffix}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
