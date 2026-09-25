import { LogoMark } from "@/components/layout/Logo";

const STORAGE_KEY = "ak-preloaded";

/** Total intro length in ms (must match the CSS timings in globals.css). */
export const INTRO_DURATION_MS = 1600;

const bootLines = [
  { text: "> initializing akrostech.core", t: 0.05 },
  { text: "> linking U.S. ⇄ India delivery teams", t: 0.3 },
  { text: "> loading talent network [100+]", t: 0.55 },
  { text: "> status: online ✓", t: 0.78, ok: true },
];

/**
 * First-visit "boot sequence". Entirely CSS-driven (typed lines, 0→100
 * counter, progress bar, wipe-out), so it starts on first paint without
 * waiting for JavaScript. An inline <head> script sets `html[data-preloader]`
 * to "active" once per session, "done" otherwise.
 */
export function Preloader() {
  return (
    <div
      className="preloader fixed inset-0 z-[100] flex flex-col justify-between bg-void p-6 sm:p-10"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines mask-radial opacity-60" />
      <div className="relative flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
        <span>Akrostech // v2</span>
        <span>Offshore Talent. Onshore Quality.</span>
      </div>

      <div className="relative mx-auto flex w-full max-w-xl flex-col gap-8">
        <LogoMark className="w-20" />
        <div className="font-mono text-sm leading-7 text-fg-muted sm:text-base">
          {bootLines.map((line) => (
            <span
              key={line.text}
              className={`boot-line block overflow-hidden whitespace-nowrap ${line.ok ? "text-ok" : ""}`}
              style={{ ["--chars" as string]: line.text.length, ["--t" as string]: `${line.t}s` }}
            >
              {line.text}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <span className="font-mono text-xs tracking-[0.2em] text-fg-subtle uppercase">
            Booting
          </span>
          <p className="font-display text-5xl font-semibold text-fg tabular-nums sm:text-7xl">
            <span className="preloader-count" />
            <span className="text-pulse">%</span>
          </p>
        </div>
        <div className="h-px w-full bg-line">
          <div className="preloader-bar h-full origin-left bg-gradient-to-r from-signal to-pulse" />
        </div>
      </div>
    </div>
  );
}

/** Inline script (runs before paint) — decides whether the preloader shows. */
export const preloaderScript = `(function(){var d=document.documentElement,k='${STORAGE_KEY}';try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches,s=sessionStorage.getItem(k);d.dataset.preloader=(s||r)?'done':'active';if(!s)sessionStorage.setItem(k,'1');}catch(e){d.dataset.preloader='done';}})();`;
