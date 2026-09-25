import { LogoMark } from "@/components/layout/Logo";

const STORAGE_KEY = "ak-preloaded";

/** Total intro length in ms (must match the CSS timings in globals.css). */
export const INTRO_DURATION_MS = 1600;

/**
 * First-visit brand reveal.
 *
 * The whole sequence (stroke draw, 0→100 counter, curtain lift) is pure CSS,
 * so it starts on first paint and never waits for JavaScript/hydration. An
 * inline <head> script sets `html[data-preloader]` before paint: "active" on
 * the first visit of a session, "done" for repeat visits and reduced motion.
 */
export function Preloader() {
  return (
    <div
      className="preloader bg-ink-950 fixed inset-0 z-[100] flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      <div className="gradient-mesh opacity-40">
        <span />
        <span />
        <span />
      </div>
      <div data-preloader-fade className="relative flex flex-col items-center gap-8">
        <LogoMark
          animated
          className="w-28 text-lime-500 drop-shadow-[0_0_30px_rgba(191,247,71,0.35)] sm:w-36"
        />
        <p className="font-display text-fg-muted text-sm tracking-[0.5em] uppercase">Akrostech</p>
      </div>
      <div
        data-preloader-fade
        className="absolute right-6 bottom-6 left-6 flex items-end justify-between sm:right-10 sm:bottom-10 sm:left-10"
      >
        <p className="text-fg-subtle max-w-[14rem] text-xs leading-relaxed">
          Offshore Talent. Onshore Quality.
        </p>
        <p className="font-display text-fg text-5xl font-light tabular-nums sm:text-7xl">
          <span className="preloader-count" />
          <span className="text-lime-500">%</span>
        </p>
      </div>
      <div data-preloader-fade className="bg-line absolute bottom-0 left-0 h-[2px] w-full">
        <div className="preloader-bar h-full origin-left bg-lime-500" />
      </div>
    </div>
  );
}

/** Inline script (runs before paint) — decides whether the preloader shows. */
export const preloaderScript = `(function(){var d=document.documentElement,k='${STORAGE_KEY}';try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches,s=sessionStorage.getItem(k);d.dataset.preloader=(s||r)?'done':'active';if(!s)sessionStorage.setItem(k,'1');}catch(e){d.dataset.preloader='done';}})();`;
