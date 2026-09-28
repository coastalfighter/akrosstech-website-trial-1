import { LogoMark } from "@/components/layout/Logo";

const STORAGE_KEY = "ak-preloaded";

/** Total intro length in ms (must match the CSS timings in globals.css). */
export const INTRO_DURATION_MS = 1800;

/**
 * First-visit intro: an ink panel with the drawn mark, a 0→100 counter and
 * a lime progress line, which then slides up to reveal the page. Entirely
 * CSS, so it starts on first paint without waiting for JavaScript.
 */
export function Preloader() {
  return (
    <div className="preloader fixed inset-0 z-[100] bg-ink text-paper" aria-hidden="true">
      <div className="flex h-full flex-col justify-between p-5 md:p-7">
        <div className="flex items-start justify-between mono text-fog">
          <span className="flex items-center gap-2.5 text-paper">
            <LogoMark animated className="w-6 text-lime" />
            Akrostech
          </span>
          <span className="hidden sm:block">Offshore talent · Onshore quality</span>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-end justify-between gap-6">
            <span className="h-display tabular-nums">
              <span className="preloader-count" />
              <span className="text-lime">%</span>
            </span>
            <span className="mb-3 mono text-fog">Wilmington, DE — India</span>
          </div>
          <span className="block h-px w-full bg-paper/15">
            <span className="preloader-bar block h-full w-full bg-lime" />
          </span>
        </div>
      </div>
    </div>
  );
}

/** Inline script (runs before paint) — decides whether the preloader shows. */
export const preloaderScript = `(function(){var d=document.documentElement,k='${STORAGE_KEY}';if(location.pathname==='/')d.dataset.heroHeader='dark';try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches,s=sessionStorage.getItem(k);d.dataset.preloader=(s||r)?'done':'active';if(!s)sessionStorage.setItem(k,'1');}catch(e){d.dataset.preloader='done';}})();`;
