import { describe, expect, it } from "vitest";
import { coverFit, interpolate, lifeScale } from "@/lib/trail";

describe("coverFit", () => {
  it("fills a wide box with a tall image, centred", () => {
    const r = coverFit(100, 200, 400, 100);
    expect(r.width).toBe(400);
    expect(r.height).toBe(800);
    expect(r.x).toBe(0);
    expect(r.y).toBe(-350);
  });

  it("honours the focal point and zoom", () => {
    const top = coverFit(200, 200, 100, 50, 0.5, 0);
    expect(top.y).toBe(0);
    const bottom = coverFit(200, 200, 100, 50, 0.5, 1);
    expect(bottom.y).toBe(50 - 100);
    const zoomed = coverFit(100, 100, 100, 100, 0.5, 0.5, 1.5);
    expect(zoomed.width).toBe(150);
    expect(zoomed.x).toBe(-25);
  });

  it("returns an empty rect for degenerate sizes", () => {
    expect(coverFit(0, 100, 100, 100)).toEqual({ x: 0, y: 0, width: 0, height: 0 });
  });
});

describe("interpolate", () => {
  it("fills long segments with evenly spaced points ending at the target", () => {
    const pts = interpolate({ x: 0, y: 0 }, { x: 100, y: 0 }, 10);
    expect(pts).toHaveLength(10);
    expect(pts[0]).toEqual({ x: 10, y: 0 });
    expect(pts.at(-1)).toEqual({ x: 100, y: 0 });
  });

  it("always yields at least the target point", () => {
    expect(interpolate({ x: 5, y: 5 }, { x: 5, y: 5 }, 10)).toEqual([{ x: 5, y: 5 }]);
  });
});

describe("lifeScale", () => {
  it("starts full, shrinks, and ends at zero", () => {
    expect(lifeScale(0, 1000)).toBe(1);
    expect(lifeScale(500, 1000)).toBeCloseTo(0.875);
    expect(lifeScale(1000, 1000)).toBe(0);
    expect(lifeScale(2000, 1000)).toBe(0);
  });
});
