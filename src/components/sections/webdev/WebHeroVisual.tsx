import { LogoMark } from "@/components/layout/Logo";

const scores = [
  { label: "Performance", value: 90 },
  { label: "Accessibility", value: 95 },
  { label: "Best Practices", value: 95 },
  { label: "SEO", value: 95 },
];

/** Hero aside for the Website Development page: quality targets we build to. */
export function WebHeroVisual() {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="animate-float relative [perspective:1200px]">
      <div className="glass relative [transform:rotateY(-10deg)_rotateX(6deg)] rounded-[2rem] p-7 shadow-2xl shadow-black/50">
        <div className="mb-6 flex items-center justify-between">
          <p className="font-display text-fg-subtle text-xs tracking-[0.25em] uppercase">
            Every build targets
          </p>
          <LogoMark className="w-8 text-lime-500" />
        </div>
        <ul className="grid grid-cols-2 gap-5">
          {scores.map((s) => (
            <li
              key={s.label}
              className="border-line flex flex-col items-center gap-2 rounded-2xl border bg-white/[0.02] p-4"
            >
              <svg viewBox="0 0 64 64" className="size-20" aria-hidden="true">
                <circle
                  cx="32"
                  cy="32"
                  r={r}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="5"
                />
                <circle
                  cx="32"
                  cy="32"
                  r={r}
                  fill="none"
                  stroke="#bff747"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={c}
                  strokeDashoffset={c * (1 - s.value / 100)}
                  transform="rotate(-90 32 32)"
                />
                <text
                  x="32"
                  y="37"
                  textAnchor="middle"
                  className="fill-fg font-display text-[15px] font-semibold"
                >
                  {s.value}+
                </text>
              </svg>
              <span className="text-fg-muted text-xs">{s.label}</span>
            </li>
          ))}
        </ul>
        <p className="text-fg-subtle mt-6 text-center text-xs">
          Lighthouse targets on every launch
        </p>
      </div>
    </div>
  );
}
