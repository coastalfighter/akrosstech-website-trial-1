import { portfolio, type PortfolioItem } from "@/content/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

/** Abstract, code-drawn preview of a website layout (no image downloads). */
function Preview({ item }: { item: PortfolioItem }) {
  const [a, b] = item.palette;
  const block = "rounded-md bg-white/[0.07]";
  return (
    <div
      className="border-line bg-ink-900 relative aspect-[16/10] overflow-hidden rounded-2xl border"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover/tilt:opacity-70"
        style={{
          background: `radial-gradient(circle at 20% 10%, ${a}55, transparent 55%), radial-gradient(circle at 90% 90%, ${b}44, transparent 50%)`,
        }}
      />
      <div className="border-line relative flex items-center gap-1.5 border-b px-3 py-2">
        <span className="size-1.5 rounded-full bg-white/25" />
        <span className="size-1.5 rounded-full bg-white/25" />
        <span className="size-1.5 rounded-full bg-white/25" />
      </div>
      <div className="relative grid h-full gap-2 p-3 transition-transform duration-700 ease-out group-hover/tilt:-translate-y-6">
        {item.layout === "dashboard" && (
          <div className="grid grid-cols-[1fr_3fr] gap-2">
            <div className={`${block} h-40`} />
            <div className="grid gap-2">
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={`${block} h-10`} />
                ))}
              </div>
              <div className="flex h-24 items-end gap-1.5 rounded-md bg-white/[0.04] p-2">
                {[40, 65, 50, 80, 60, 90, 75, 95].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{ height: `${h}%`, background: i % 2 ? a : b, opacity: 0.8 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {item.layout === "store" && (
          <>
            <div
              className="h-16 rounded-md"
              style={{ background: `linear-gradient(110deg, ${a}88, ${b}55)` }}
            />
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="grid gap-1">
                  <div className={`${block} aspect-square`} />
                  <div className="h-1.5 w-2/3 rounded bg-white/10" />
                </div>
              ))}
            </div>
          </>
        )}
        {item.layout === "corporate" && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid content-center gap-2 p-2">
                <div className="h-3 w-4/5 rounded bg-white/20" />
                <div className="h-3 w-3/5 rounded bg-white/20" />
                <div className="mt-2 h-5 w-1/3 rounded-full" style={{ background: a }} />
              </div>
              <div
                className="h-24 rounded-md"
                style={{ background: `linear-gradient(140deg, ${a}66, ${b}66)` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`${block} h-16`} />
              ))}
            </div>
          </>
        )}
        {item.layout === "landing" && (
          <div className="grid place-items-center gap-3 pt-4 text-center">
            <div className="h-4 w-2/3 rounded bg-white/25" />
            <div
              className="h-4 w-1/2 rounded"
              style={{ background: `linear-gradient(90deg, ${a}, ${b})` }}
            />
            <div className="h-2 w-1/3 rounded bg-white/10" />
            <div className="mt-1 flex gap-2">
              <div className="h-6 w-20 rounded-full" style={{ background: a }} />
              <div className="h-6 w-20 rounded-full border border-white/20" />
            </div>
            <div
              className="mt-2 h-20 w-4/5 rounded-lg border border-white/10"
              style={{ background: `linear-gradient(180deg, ${b}33, transparent)` }}
            />
          </div>
        )}
        {item.layout === "app" && (
          <div className="grid grid-cols-[2fr_3fr] gap-2">
            <div className="grid gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2 rounded-md bg-white/[0.05] p-2">
                  <div
                    className="size-4 rounded"
                    style={{ background: i === 1 ? a : "rgba(255,255,255,0.12)" }}
                  />
                  <div className="h-1.5 flex-1 rounded bg-white/10" />
                </div>
              ))}
            </div>
            <div className="grid gap-2 rounded-md bg-white/[0.04] p-2">
              <div className="h-3 w-1/2 rounded bg-white/20" />
              <div className="h-16 rounded-md border border-dashed border-white/15" />
              <div className="h-5 w-1/3 rounded-full" style={{ background: b }} />
            </div>
          </div>
        )}
        {item.layout === "listing" && (
          <div className="grid grid-cols-[3fr_2fr] gap-2">
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="grid gap-1">
                  <div
                    className="h-14 rounded-md"
                    style={{
                      background: `linear-gradient(135deg, ${i % 2 ? a : b}55, transparent)`,
                    }}
                  />
                  <div className="h-1.5 w-3/4 rounded bg-white/10" />
                </div>
              ))}
            </div>
            <div className="relative rounded-md bg-white/[0.04]">
              {[
                [30, 30],
                [60, 55],
                [40, 75],
              ].map(([x, y], i) => (
                <span
                  key={i}
                  className="absolute size-3 rounded-full ring-4 ring-white/10"
                  style={{ left: `${x}%`, top: `${y}%`, background: a }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Portfolio({
  limit,
  title = "Selected work",
  description,
}: {
  limit?: number;
  title?: string;
  description?: string;
}) {
  const items = limit ? portfolio.slice(0, limit) : portfolio;
  return (
    <section aria-labelledby="work-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="work-title"
            eyebrow="Portfolio"
            title={title}
            description={
              description ??
              "A preview of the kind of websites and applications we design and build. Real client case studies are coming soon."
            }
          />
          <Reveal>
            <Badge tone="warning">Sample projects</Badge>
          </Reveal>
        </div>

        <Reveal stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <TiltCard key={item.title} className="rounded-[1.75rem]" max={6}>
              <article className="border-line bg-ink-850 flex h-full flex-col gap-5 rounded-[1.75rem] border p-4 pb-6">
                <Preview item={item} />
                <div className="flex flex-col gap-2 px-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-medium tracking-wide text-lime-500 uppercase">
                      {item.category}
                    </p>
                    <Badge tone="neutral">Sample</Badge>
                  </div>
                  <h3 className="text-fg text-xl font-medium">{item.title}</h3>
                  <p className="text-fg-muted text-sm leading-relaxed">{item.description}</p>
                  <ul className="mt-2 flex flex-wrap gap-2" aria-label="Technology">
                    {item.stack.map((tech) => (
                      <li
                        key={tech}
                        className="text-fg-muted rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px]"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
