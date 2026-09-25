/**
 * Geometry of the Akrostech "wave" monogram, reconstructed from the
 * original 1563×1563 PNG as pure lines + semicircles.
 *
 * The mark is one continuous stroke (three parallel diagonals joined by
 * semicircular turns) plus a separate short diagonal bar. Describing it
 * mathematically lets us render a crisp SVG, animate the stroke in the
 * preloader, and extrude the very same path into a 3D tube in the hero.
 */

export type Vec2 = readonly [number, number];

export type LogoSegment =
  | { kind: "line"; from: Vec2; to: Vec2 }
  | { kind: "arc"; center: Vec2; radius: number; from: Vec2; to: Vec2; sweep: 0 | 1 };

/** Stroke tilt from vertical, in degrees. */
const TILT_DEG = 21;
/** Centre-line radius of every semicircular turn. */
const TURN_RADIUS = 108;
/** Stroke thickness in source-image pixels. */
export const LOGO_STROKE_WIDTH = 100;

const rad = (TILT_DEG * Math.PI) / 180;
/** Unit vector pointing "up the stroke" (screen coordinates, y down). */
const UP: Vec2 = [Math.sin(rad), -Math.cos(rad)];
/** Unit normal to the stroke direction (points right/down). */
const NORMAL: Vec2 = [Math.cos(rad), Math.sin(rad)];

const add = (a: Vec2, b: Vec2): Vec2 => [a[0] + b[0], a[1] + b[1]];
const scale = (a: Vec2, s: number): Vec2 => [a[0] * s, a[1] * s];

/** Walk `distance` along the stroke direction (positive = up). */
const along = (p: Vec2, distance: number): Vec2 => add(p, scale(UP, distance));
/** Point on the stroke that reaches a given y. */
const alongToY = (p: Vec2, y: number): Vec2 => along(p, (y - p[1]) / UP[1]);

// Turn centres. C2/C3 are derived so every diagonal is exactly tangent.
const C1: Vec2 = [540, 580];
const C2: Vec2 = (() => {
  const start = add(C1, scale(NORMAL, 2 * TURN_RADIUS));
  const y = 1030;
  return alongToY(start, y);
})();
const C3: Vec2 = (() => {
  const start = add(C2, scale(NORMAL, 2 * TURN_RADIUS));
  return alongToY(start, 580);
})();

const left = (c: Vec2) => add(c, scale(NORMAL, -TURN_RADIUS));
const right = (c: Vec2) => add(c, scale(NORMAL, TURN_RADIUS));

/** Main continuous wave stroke. */
export const LOGO_WAVE: LogoSegment[] = [
  { kind: "line", from: alongToY(left(C1), 1115), to: left(C1) },
  { kind: "arc", center: C1, radius: TURN_RADIUS, from: left(C1), to: right(C1), sweep: 1 },
  { kind: "line", from: right(C1), to: left(C2) },
  { kind: "arc", center: C2, radius: TURN_RADIUS, from: left(C2), to: right(C2), sweep: 0 },
  { kind: "line", from: right(C2), to: left(C3) },
  { kind: "arc", center: C3, radius: TURN_RADIUS, from: left(C3), to: right(C3), sweep: 1 },
  { kind: "line", from: right(C3), to: alongToY(right(C3), 873) },
];

/** Detached accent bar on the right. */
const BAR_TOP: Vec2 = [1346, 552];
export const LOGO_BAR: LogoSegment[] = [
  { kind: "line", from: BAR_TOP, to: alongToY(BAR_TOP, 873) },
];

/** Tight viewBox around the mark including stroke caps. */
export const LOGO_VIEWBOX = "160 410 1230 790";

const fmt = (n: number) => Number(n.toFixed(2));

/** Convert segments into an SVG path `d` attribute. */
export function segmentsToPath(segments: LogoSegment[]): string {
  if (segments.length === 0) return "";
  const [sx, sy] = segments[0].from;
  const parts = [`M${fmt(sx)} ${fmt(sy)}`];
  for (const seg of segments) {
    const [x, y] = seg.to;
    if (seg.kind === "line") parts.push(`L${fmt(x)} ${fmt(y)}`);
    else parts.push(`A${seg.radius} ${seg.radius} 0 0 ${seg.sweep} ${fmt(x)} ${fmt(y)}`);
  }
  return parts.join(" ");
}

export const LOGO_WAVE_PATH = segmentsToPath(LOGO_WAVE);
export const LOGO_BAR_PATH = segmentsToPath(LOGO_BAR);

/**
 * Sample evenly spaced points along a list of segments.
 * `step` is the approximate spacing in source pixels.
 */
export function sampleSegments(segments: LogoSegment[], step = 12): Vec2[] {
  const points: Vec2[] = [];
  segments.forEach((seg, index) => {
    const includeStart = index === 0;
    if (seg.kind === "line") {
      const dx = seg.to[0] - seg.from[0];
      const dy = seg.to[1] - seg.from[1];
      const n = Math.max(1, Math.round(Math.hypot(dx, dy) / step));
      for (let i = includeStart ? 0 : 1; i <= n; i++) {
        const t = i / n;
        points.push([seg.from[0] + dx * t, seg.from[1] + dy * t]);
      }
    } else {
      const a0 = Math.atan2(seg.from[1] - seg.center[1], seg.from[0] - seg.center[0]);
      // Semicircle: SVG sweep=1 means increasing angle in screen space.
      const direction = seg.sweep === 1 ? 1 : -1;
      const n = Math.max(2, Math.round((Math.PI * seg.radius) / step));
      for (let i = includeStart ? 0 : 1; i <= n; i++) {
        const a = a0 + direction * Math.PI * (i / n);
        points.push([
          seg.center[0] + Math.cos(a) * seg.radius,
          seg.center[1] + Math.sin(a) * seg.radius,
        ]);
      }
    }
  });
  return points;
}

/** Centre of the mark's bounding box, used to centre the 3D model. */
export const LOGO_CENTER: Vec2 = [775, 800];
