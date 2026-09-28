import { describe, expect, it } from "vitest";
import {
  FLUID_SETTINGS,
  FLUID_STEP,
  createStepper,
  dyeDissipationFor,
  scrollFade,
  toSimPoint,
} from "@/lib/fluid";

describe("scrollFade", () => {
  it("is full strength while the hero is in place", () => {
    expect(scrollFade(0, 900)).toEqual({ strength: 1, progress: 0 });
    expect(scrollFade(120, 900)).toEqual({ strength: 1, progress: 0 });
  });

  it("eases out quadratically as the hero scrolls away", () => {
    const half = scrollFade(-450, 900);
    expect(half.progress).toBeCloseTo(0.25);
    expect(half.strength).toBeCloseTo(0.75);
    expect(scrollFade(-2000, 900)).toEqual({ strength: 0, progress: 1 });
  });
});

describe("dyeDissipationFor", () => {
  it("interpolates towards faster decay when scrolled away", () => {
    expect(dyeDissipationFor(0)).toBe(FLUID_SETTINGS.dyeDissipation);
    expect(dyeDissipationFor(1)).toBeCloseTo(FLUID_SETTINGS.dyeDissipationScrolled);
    expect(dyeDissipationFor(5)).toBeCloseTo(FLUID_SETTINGS.dyeDissipationScrolled);
  });
});

describe("createStepper", () => {
  it("runs one step per 60 Hz frame and none for a half frame", () => {
    const step = createStepper();
    expect(step(FLUID_STEP)).toBe(1);
    expect(step(FLUID_STEP / 2)).toBe(0);
    expect(step(FLUID_STEP / 2)).toBe(1);
  });

  it("caps catch-up work after a long pause", () => {
    const step = createStepper(FLUID_STEP, 3);
    expect(step(2)).toBe(3);
    expect(step(0)).toBe(0);
  });
});

describe("toSimPoint", () => {
  it("maps client coordinates to GL space with a bottom-left origin", () => {
    const rect = { left: 100, top: 50, width: 800, height: 400 };
    expect(toSimPoint(100, 50, rect)).toEqual({ x: 0, y: 1 });
    expect(toSimPoint(900, 450, rect)).toEqual({ x: 1, y: 0 });
    expect(toSimPoint(500, 250, rect)).toEqual({ x: 0.5, y: 0.5 });
  });
});
