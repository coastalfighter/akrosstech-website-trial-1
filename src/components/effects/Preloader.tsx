import { LogoMark } from "@/components/layout/Logo";

const STORAGE_KEY = "ak-preloaded";

/** Total intro length in ms (must match the CSS timings in globals.css). */
export const INTRO_DURATION_MS = 2050;

/**
 * First-visit intro (juncastudio-style): an ink panel where short status
 * lines appear one by one over a lime progress line, then the panel slides
 * up to reveal the page. Entirely CSS, so it starts on first paint without
 * waiting for JavaScript.
 */
const lines = [
  "Akrostech, offshore talent & web studio",
  "Recruitment, operations and websites",
  "Wilmington, DE · delivering from India",
];

export function Preloader() {
  return (
    <div className="preloader fixed inset-0 z-[100] bg-ink text-paper" aria-hidden="true">
      <div className="flex h-full flex-col justify-between p-5 md:p-7">
        <span className="flex items-center gap-2.5">
          <LogoMark animated className="w-6 text-lime" />
          <span className="font-display text-[21px] font-medium tracking-[-0.03em]">Akrostech</span>
        </span>
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-1 font-display text-[clamp(1.25rem,1rem+0.8vw,1.625rem)] leading-tight font-medium tracking-[-0.02em]">
            {lines.map((line, i) => (
              <li key={line} className="preloader-line" style={{ ["--line" as string]: i }}>
                {line}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <span className="block h-px flex-1 bg-paper/15">
              <span className="preloader-bar block h-full w-full bg-lime" />
            </span>
            <span className="w-12 text-right text-sm tabular-nums">
              <span className="preloader-count" />%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Inline script (runs before paint) — decides whether the preloader shows. */
export const preloaderScript = `(function(){var d=document.documentElement,k='${STORAGE_KEY}';if(location.pathname==='/')d.dataset.heroHeader='dark';try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches,s=sessionStorage.getItem(k);d.dataset.preloader=(s||r)?'done':'active';if(!s)sessionStorage.setItem(k,'1');}catch(e){d.dataset.preloader='done';}})();`;
