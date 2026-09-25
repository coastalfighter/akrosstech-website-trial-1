import { describe, expect, it } from "vitest";
import {
  LOGO_BAR,
  LOGO_WAVE,
  LOGO_WAVE_PATH,
  sampleSegments,
  segmentsToPath,
} from "@/lib/logo-geometry";

const dist = (a: readonly number[], b: readonly number[]) => Math.hypot(a[0] - b[0], a[1] - b[1]);

describe("logo geometry", () => {
  it("is one continuous stroke (each segment starts where the previous ended)", () => {
    for (let i = 1; i < LOGO_WAVE.length; i++) {
      expect(dist(LOGO_WAVE[i].from, LOGO_WAVE[i - 1].to)).toBeLessThan(1e-6);
    }
  });

  it("uses exact semicircles whose endpoints sit on the circle", () => {
    for (const seg of LOGO_WAVE) {
      if (seg.kind !== "arc") continue;
      expect(dist(seg.from, seg.center)).toBeCloseTo(seg.radius, 6);
      expect(dist(seg.to, seg.center)).toBeCloseTo(seg.radius, 6);
      expect(dist(seg.from, seg.to)).toBeCloseTo(seg.radius * 2, 6);
    }
  });

  it("serialises to a valid SVG path", () => {
    expect(LOGO_WAVE_PATH.startsWith("M")).toBe(true);
    expect(LOGO_WAVE_PATH.match(/A/g)).toHaveLength(3);
    expect(segmentsToPath([])).toBe("");
  });

  it("samples densely and without duplicate joins", () => {
    const pts = sampleSegments(LOGO_WAVE, 12);
    expect(pts.length).toBeGreaterThan(150);
    for (let i = 1; i < pts.length; i++) expect(dist(pts[i], pts[i - 1])).toBeGreaterThan(0.5);
    expect(sampleSegments(LOGO_BAR, 12).length).toBeGreaterThan(20);
  });
});
