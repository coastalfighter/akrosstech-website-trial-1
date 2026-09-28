"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

/* One shared 1 s ticker for every clock (no per-component intervals). */
let now = 0;
const listeners = new Set<() => void>();
let timer: number | undefined;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (timer === undefined) {
    now = Date.now();
    timer = window.setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}
const getSnapshot = () => now;
const getServerSnapshot = () => 0;

/** Formats a timestamp for a time zone, e.g. { time: "08:27:05 AM", offset: "GMT-4" }. */
export function formatZone(ms: number, timeZone: string): { time: string; offset: string } {
  const date = new Date(ms);
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
  const offset =
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
      .formatToParts(date)
      .find((p) => p.type === "timeZoneName")?.value ?? "";
  return { time, offset };
}

function Clock({ label, timeZone }: { label: string; timeZone: string }) {
  const ms = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { time, offset } = ms ? formatZone(ms, timeZone) : { time: "--:--:--", offset: "" };
  return (
    <span className="flex items-center gap-2 tabular-nums">
      <span className="opacity-60">
        {label}
        {offset && ` (${offset.replace("-", "−")})`}
      </span>
      <span suppressHydrationWarning>{time}</span>
    </span>
  );
}

/**
 * Fixed studio status bar along the bottom edge: copyright, live clocks for
 * the U.S. office and the India delivery team, and a quick call link. Text
 * colour follows the section underneath (theme sensor).
 */
export function BottomBar() {
  const year = new Date().getFullYear();
  return (
    <div className="site-bar pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="container-page flex h-11 items-center justify-between gap-6 mono !text-[10px] sm:!text-[11px]">
        <span className="opacity-60">©{year}</span>
        <div className="hidden items-center gap-8 md:flex">
          <Clock label="Wilmington" timeZone="America/New_York" />
          <Clock label="India" timeZone="Asia/Kolkata" />
        </div>
        <Link
          href="/contact"
          className="pointer-events-auto inline-flex items-center gap-2 transition-colors hover:text-lime"
        >
          <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
          Book a call
        </Link>
      </div>
    </div>
  );
}
