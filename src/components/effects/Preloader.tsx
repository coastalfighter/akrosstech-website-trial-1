import { LogoMark } from "@/components/layout/Logo";

const STORAGE_KEY = "ak-preloaded";

/** Total intro length in ms (must match the CSS timings in globals.css). */
export const INTRO_DURATION_MS = 1800;

/**
 * First-visit intro (noth.in-style): an ink panel with the drawn mark and a
 * 00→100 counter, which then slides up to reveal the page. Entirely CSS, so
 * it starts on first paint without waiting for JavaScript.
 */
export function Preloader() {
  return (
    <div className="preloader fixed inset-0 z-[100] bg-ink text-paper" aria-hidden="true">
      <div className="preloader-inner flex h-full flex-col justify-between p-5 md:p-10">
        <div className="flex justify-between label">
          <span>Akrostech Consulting</span>
          <span>Offshore talent · Onshore quality</span>
        </div>
        <div className="flex items-center justify-center">
          <LogoMark animated className="w-24 text-lime md:w-32" />
        </div>
        <div className="flex items-end justify-between">
          <span className="label">Wilmington, DE — India</span>
          <span className="font-serif text-6xl leading-none md:text-8xl">
            (<span className="preloader-count text-lime tabular-nums" />)
          </span>
        </div>
      </div>
    </div>
  );
}

/** Inline script (runs before paint) — decides whether the preloader shows. */
export const preloaderScript = `(function(){var d=document.documentElement,k='${STORAGE_KEY}';try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches,s=sessionStorage.getItem(k);d.dataset.preloader=(s||r)?'done':'active';if(!s)sessionStorage.setItem(k,'1');}catch(e){d.dataset.preloader='done';}})();`;
