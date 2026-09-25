"use client";

import { useSyncExternalStore } from "react";

/* A single shared ticking clock (updates every 15 s) for all LiveClock instances. */
let now = 0;
const listeners = new Set<() => void>();
let timer: number | undefined;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) {
    now = Date.now();
    timer = window.setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 15_000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}

/** Must return a stable value between ticks, or React re-renders in a loop. */
const getSnapshot = () => {
  if (!now) now = Date.now();
  return now;
};
const getServerSnapshot = () => 0;

export function formatZoneTime(epochMs: number, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).format(epochMs);
}

/**
 * Live time in a given IANA time zone. Renders "--:--" on the server and
 * fills in after hydration, so there is never a hydration mismatch.
 */
export function LiveClock({ timeZone, className }: { timeZone: string; className?: string }) {
  const epoch = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <time className={className} suppressHydrationWarning>
      {epoch ? formatZoneTime(epoch, timeZone) : "--:--"}
    </time>
  );
}
