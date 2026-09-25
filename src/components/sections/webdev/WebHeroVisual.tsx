const scores = [
  { label: "Performance", value: 90 },
  { label: "Accessibility", value: 95 },
  { label: "Best Practices", value: 95 },
  { label: "SEO", value: 95 },
];

/** Hero aside for the Website Development page: Lighthouse targets panel. */
export function WebHeroVisual() {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="beam rounded-2xl shadow-[0_40px_120px_-30px_rgba(61,123,255,0.55)] glass">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <span className="font-mono text-[11px] tracking-[0.12em] text-fg-subtle uppercase">
          lighthouse --targets
        </span>
        <span className="font-mono text-[11px] text-ok">● passing</span>
      </div>
      <ul className="grid grid-cols-2 gap-px bg-line">
        {scores.map((s) => (
          <li key={s.label} className="flex flex-col items-center gap-2 bg-panel/90 p-6">
            <svg viewBox="0 0 64 64" className="size-20" aria-hidden="true">
              <circle
                cx="32"
                cy="32"
                r={r}
                fill="none"
                stroke="rgba(148,163,184,0.15)"
                strokeWidth="5"
              />
              <circle
                cx="32"
                cy="32"
                r={r}
                fill="none"
                stroke="#34d399"
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
                className="fill-fg font-mono text-[14px] font-semibold"
              >
                {s.value}+
              </text>
            </svg>
            <span className="font-mono text-[11px] tracking-[0.08em] text-fg-muted uppercase">
              {s.label}
            </span>
          </li>
        ))}
      </ul>
      <p className="border-t border-line px-5 py-3 text-center font-mono text-[11px] text-fg-subtle">
        Target scores on every launch
      </p>
    </div>
  );
}
