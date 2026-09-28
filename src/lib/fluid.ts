/**
 * Settings and pure helpers for the hero fluid reveal
 * (components/effects/FluidReveal). The simulation parameters mirror the
 * noth.in hero exactly: a stable-fluids solver whose dye field, once
 * thresholded, becomes a crisp liquid mask.
 */

export const FLUID_SETTINGS = {
  /** Velocity / pressure grid (texels per side). */
  simResolution: 256,
  /** Dye (mask) grid (texels per side). */
  dyeResolution: 512,
  velocityDissipation: 0.962,
  dyeDissipation: 0.988,
  /** Dye dissipation once the hero has scrolled fully away (clears fast). */
  dyeDissipationScrolled: 0.97,
  pressureIterations: 20,
  curlStrength: 0,
  /** Gaussian splat radius in squared UV units. */
  splatRadius: 6e-5,
  splatForce: 5900,
  /** Dye multiplier before thresholding; higher = fatter stroke. */
  revealSize: 3.9,
  /** Threshold and width of the smoothstep that turns dye into the mask. */
  edgeSoftness: 0.5,
  edgeWidth: 0.01,
} as const;

/** Simulation tick: the solver is tuned for 60 steps per second. */
export const FLUID_STEP = 1 / 60;

/**
 * How far the hero has scrolled out of view, as the splat strength (1 while
 * in place, easing to 0) plus the eased progress used to speed up dye decay.
 */
export function scrollFade(top: number, height: number): { strength: number; progress: number } {
  const n = Math.min(Math.max(-top / Math.max(height, 1), 0), 1);
  const progress = n * n;
  return { strength: 1 - progress, progress };
}

/** Dye dissipation for a given scroll progress (0–1). */
export function dyeDissipationFor(progress: number): number {
  const p = Math.min(Math.max(progress, 0), 1);
  return (
    FLUID_SETTINGS.dyeDissipation +
    (FLUID_SETTINGS.dyeDissipationScrolled - FLUID_SETTINGS.dyeDissipation) * p
  );
}

/**
 * Fixed-timestep accumulator so the fluid behaves the same on 60 Hz and
 * 120 Hz displays. Returns how many simulation steps to run for a frame.
 */
export function createStepper(step = FLUID_STEP, maxSteps = 3) {
  let accumulator = 0;
  return (elapsedSeconds: number): number => {
    accumulator += Math.min(Math.max(elapsedSeconds, 0), step * maxSteps);
    let steps = 0;
    while (accumulator >= step && steps < maxSteps) {
      accumulator -= step;
      steps++;
    }
    return steps;
  };
}

/** Pointer position in simulation space: 0–1, origin bottom-left (GL). */
export function toSimPoint(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
): { x: number; y: number } {
  return {
    x: (clientX - rect.left) / Math.max(rect.width, 1),
    y: 1 - (clientY - rect.top) / Math.max(rect.height, 1),
  };
}
