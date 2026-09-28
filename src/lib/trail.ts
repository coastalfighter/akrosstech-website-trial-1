/**
 * Pure geometry for the hero "paint trail" (see components/effects/HeroTrail).
 * Kept framework-free so it can be unit tested.
 */

export interface TrailPoint {
  x: number;
  y: number;
  /** Base radius in CSS pixels. */
  r: number;
  /** performance.now() timestamp when the point was painted. */
  born: number;
  /** Random phase so every blob wobbles differently. */
  seed: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * `object-fit: cover` for canvas drawImage: scales an image to fill the
 * target box (optionally zoomed) and positions it around a focal point
 * (0–1 on each axis).
 */
export function coverFit(
  imageWidth: number,
  imageHeight: number,
  boxWidth: number,
  boxHeight: number,
  focusX = 0.5,
  focusY = 0.5,
  zoom = 1,
): Rect {
  if (imageWidth <= 0 || imageHeight <= 0 || boxWidth <= 0 || boxHeight <= 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  const scale = Math.max(boxWidth / imageWidth, boxHeight / imageHeight) * Math.max(zoom, 1);
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  const fx = Math.min(Math.max(focusX, 0), 1);
  const fy = Math.min(Math.max(focusY, 0), 1);
  // `|| 0` normalises -0 (e.g. an overflow times a 0 focal point).
  return { x: (boxWidth - width) * fx || 0, y: (boxHeight - height) * fy || 0, width, height };
}

/**
 * Evenly spaced points from `from` (exclusive) to `to` (inclusive), so fast
 * pointer moves still leave a continuous stroke instead of dotted blobs.
 */
export function interpolate(
  from: { x: number; y: number },
  to: { x: number; y: number },
  spacing: number,
): { x: number; y: number }[] {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.hypot(dx, dy);
  const steps = Math.max(1, Math.ceil(distance / Math.max(spacing, 1)));
  const out: { x: number; y: number }[] = [];
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    out.push({ x: from.x + dx * t, y: from.y + dy * t });
  }
  return out;
}

/**
 * Radius multiplier over a blob's life: holds near full size, then shrinks
 * quickly to nothing (ease-in cubic), which reads as liquid retracting.
 */
export function lifeScale(age: number, life: number): number {
  if (life <= 0 || age >= life) return 0;
  if (age <= 0) return 1;
  const t = age / life;
  return 1 - t * t * t;
}
