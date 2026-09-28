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

function Clock({
  label,
  timeZone,
  showOffset,
}: {
  label?: string;
  timeZone: string;
  showOffset?: boolean;
}) {
  const ms = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { time, offset } = ms ? formatZone(ms, timeZone) : { time: "--:--:-- --", offset: "" };
  return (
    <>
      {label && <span className="opacity-60">{label}</span>}
      {showOffset && offset && (
        <span className="opacity-80">({offset.replace("GMT", "UTC").replace("-", "−")})</span>
      )}
      <span className="font-medium tabular-nums" suppressHydrationWarning>
        {time}
      </span>
    </>
  );
}

/**
 * Fixed studio status bar along the bottom edge (juncastudio-style): the
 * year, the U.S. office's UTC offset and live time, the India delivery
 * team's time, and a quick call link. Text colour follows the section
 * underneath (theme sensor).
 */
export function BottomBar() {
  const year = new Date().getFullYear();
  return (
    <div className="site-bar pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="container-page flex h-12 items-center justify-between gap-6 text-[13px] sm:text-sm">
        <div className="flex items-center gap-8 sm:gap-12">
          <span>©{year}</span>
          <span className="hidden items-center gap-3 sm:flex">
            <Clock timeZone="America/New_York" showOffset />
          </span>
          <span className="hidden items-center gap-3 lg:flex">
            <Clock label="India" timeZone="Asia/Kolkata" />
          </span>
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
