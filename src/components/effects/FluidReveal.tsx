"use client";

import { useEffect, useRef } from "react";
import { getImageProps } from "next/image";
import heroLiquid from "@/assets/images/hero-liquid.jpg";
import {
  FLUID_SETTINGS as S,
  createStepper,
  dyeDissipationFor,
  scrollFade,
  toSimPoint,
} from "@/lib/fluid";
import { cn } from "@/lib/utils";

/** Stop simulating this long after the last pointer move (dye has faded by then). */
const IDLE_STOP_MS = 4500;
/** How the reveal image is framed: top-down focal point and zoom. */
const PHOTO_FOCUS = { x: 0.5, y: 0.12 };
const PHOTO_ZOOM = 1;

const { props: photoProps } = getImageProps({
  src: heroLiquid,
  alt: "",
  width: 1920,
  height: Math.round((1920 * heroLiquid.height) / heroLiquid.width),
  quality: 70,
});

/* ── Shaders (the noth.in hero solver, GLSL ES 1.0) ───────────────────── */

const VERT = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const ADVECT = `
precision highp float;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uTexelSize;
uniform float uDt;
uniform float uDissipation;
varying vec2 vUv;
vec4 bilerp(sampler2D sam, vec2 uv, vec2 tsize) {
  vec2 st = uv / tsize - 0.5;
  vec2 iuv = floor(st);
  vec2 fuv = fract(st);
  vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
  vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
  vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
  vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
  return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}
void main() {
  vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
  gl_FragColor = uDissipation * bilerp(uSource, coord, uTexelSize);
}`;

const SPLAT = `
precision highp float;
uniform sampler2D uTarget;
uniform float uAspectRatio;
uniform vec2 uPoint;
uniform vec3 uColor;
uniform float uRadius;
varying vec2 vUv;
void main() {
  vec2 p = vUv - uPoint;
  p.x *= uAspectRatio;
  vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}`;

const CURL = `
precision highp float;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;
varying vec2 vUv;
void main() {
  float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).y;
  float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).y;
  float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).x;
  float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).x;
  gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`;

const VORTICITY = `
precision highp float;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform vec2 uTexelSize;
uniform float uCurlStrength;
uniform float uDt;
varying vec2 vUv;
void main() {
  float L = texture2D(uCurl, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture2D(uCurl, vUv + vec2(uTexelSize.x, 0.0)).x;
  float T = texture2D(uCurl, vUv + vec2(0.0, uTexelSize.y)).x;
  float B = texture2D(uCurl, vUv - vec2(0.0, uTexelSize.y)).x;
  float C = texture2D(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force = force / (length(force) + 0.0001) * uCurlStrength * C;
  vec2 velocity = texture2D(uVelocity, vUv).xy + force * uDt;
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}`;

const DIVERGENCE = `
precision highp float;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;
varying vec2 vUv;
void main() {
  float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
  float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;
  float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;
  gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`;

const PRESSURE = `
precision highp float;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
uniform vec2 uTexelSize;
varying vec2 vUv;
void main() {
  float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
  float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
  float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
  float C = texture2D(uDivergence, vUv).x;
  gl_FragColor = vec4((L + R + B + T - C) * 0.25, 0.0, 0.0, 1.0);
}`;

const GRADIENT = `
precision highp float;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;
varying vec2 vUv;
void main() {
  float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
  float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
  float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
  vec2 velocity = texture2D(uVelocity, vUv).xy - vec2(R - L, T - B) * 0.5;
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}`;

/* The thresholded dye reveals the photo; everywhere else stays transparent
   so the paper and wordmark underneath show through untouched. */
const DISPLAY = `
precision highp float;
uniform sampler2D uDye;
uniform sampler2D uReveal;
uniform float uRevealSize;
uniform float uEdgeSoftness;
uniform float uEdgeWidth;
uniform float uImageAspect;
uniform float uPlaneAspect;
uniform vec2 uFocus;
uniform float uZoom;
varying vec2 vUv;
vec2 coverUv(vec2 uv) {
  vec2 ratio = vec2(min(uPlaneAspect / uImageAspect, 1.0), min(uImageAspect / uPlaneAspect, 1.0)) / uZoom;
  return uv * ratio + (1.0 - ratio) * uFocus;
}
void main() {
  float dye = texture2D(uDye, vUv).r;
  float mask = clamp(smoothstep(uEdgeSoftness, uEdgeSoftness + uEdgeWidth, dye * uRevealSize), 0.0, 1.0);
  vec3 color = texture2D(uReveal, clamp(coverUv(vUv), 0.001, 0.999)).rgb;
  gl_FragColor = vec4(color * mask, mask);
}`;

/* ── Minimal WebGL plumbing ───────────────────────────────────────────── */

type GL = WebGLRenderingContext | WebGL2RenderingContext;

interface Target {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
}
interface DoubleTarget {
  read: Target;
  write: Target;
  swap: () => void;
}
interface Program {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
}

interface TextureFormat {
  internalFormat: number;
  format: number;
  type: number;
  linear: boolean;
}

function compile(gl: GL, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: GL, vertex: WebGLShader, fragmentSource: string): Program | null {
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.bindAttribLocation(program, 0, "aPosition");
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  const uniforms: Program["uniforms"] = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
  }
  return { program, uniforms };
}

/** Half-float render targets (negative velocities need float storage). */
function pickFormat(gl: GL): TextureFormat | null {
  if (typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext) {
    if (
      !gl.getExtension("EXT_color_buffer_float") &&
      !gl.getExtension("EXT_color_buffer_half_float")
    ) {
      return null;
    }
    return { internalFormat: gl.RGBA16F, format: gl.RGBA, type: gl.HALF_FLOAT, linear: true };
  }
  const half = gl.getExtension("OES_texture_half_float");
  if (!half) return null;
  gl.getExtension("EXT_color_buffer_half_float");
  const linear = !!gl.getExtension("OES_texture_half_float_linear");
  return { internalFormat: gl.RGBA, format: gl.RGBA, type: half.HALF_FLOAT_OES, linear };
}

function createTarget(gl: GL, size: number, fmt: TextureFormat, linear: boolean): Target | null {
  const texture = gl.createTexture();
  const fbo = gl.createFramebuffer();
  if (!texture || !fbo) return null;
  const filter = linear && fmt.linear ? gl.LINEAR : gl.NEAREST;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, fmt.internalFormat, size, size, 0, fmt.format, fmt.type, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) return null;
  gl.viewport(0, 0, size, size);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return { texture, fbo, width: size, height: size };
}

function createDouble(
  gl: GL,
  size: number,
  fmt: TextureFormat,
  linear: boolean,
): DoubleTarget | null {
  const a = createTarget(gl, size, fmt, linear);
  const b = createTarget(gl, size, fmt, linear);
  if (!a || !b) return null;
  const pair: DoubleTarget = {
    read: a,
    write: b,
    swap() {
      const t = pair.read;
      pair.read = pair.write;
      pair.write = t;
    },
  };
  return pair;
}

/**
 * noth.in hero effect: a GPU stable-fluids simulation driven by the
 * pointer. Its dye field is thresholded into a crisp, watery mask that
 * reveals a lime liquid-ink texture over the wordmark; outside the mask the
 * canvas is transparent. Sits inside a positioned parent (the hero) and
 * covers it.
 *
 * Runs only where it can do so cheaply and accessibly: WebGL with
 * half-float targets, motion allowed, hero on screen, and only for a few
 * seconds after the last pointer move. Otherwise it renders nothing.
 */
export function FluidReveal({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Hover-driven effect: mouse/trackpad only, and never with reduced motion.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    // WebGL setup (context, shaders, targets) waits for an idle moment so it
    // never competes with the first paint or hydration.
    let teardown: (() => void) | undefined;
    let cancelled = false;
    const run = () => {
      if (!cancelled) teardown = setupFluid(canvas);
    };
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(run, { timeout: 3000 })
      : window.setTimeout(run, 1500);
    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      teardown?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    />
  );
}

/** Builds the simulation on `canvas`; returns a teardown, or nothing if unsupported. */
function setupFluid(canvas: HTMLCanvasElement): (() => void) | undefined {
  const attrs: WebGLContextAttributes = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
    powerPreference: "high-performance",
  };
  const gl = (canvas.getContext("webgl2", attrs) ?? canvas.getContext("webgl", attrs)) as GL | null;
  if (!gl) return;
  const fmt = pickFormat(gl);
  const vertex = compile(gl, gl.VERTEX_SHADER, VERT);
  if (!fmt || !vertex) return;

  const programs = {
    advect: createProgram(gl, vertex, ADVECT),
    splat: createProgram(gl, vertex, SPLAT),
    curl: createProgram(gl, vertex, CURL),
    vorticity: createProgram(gl, vertex, VORTICITY),
    divergence: createProgram(gl, vertex, DIVERGENCE),
    pressure: createProgram(gl, vertex, PRESSURE),
    gradient: createProgram(gl, vertex, GRADIENT),
    display: createProgram(gl, vertex, DISPLAY),
  };
  if (Object.values(programs).some((p) => !p)) return;
  const P = programs as Record<keyof typeof programs, Program>;

  const sim = S.simResolution;
  const dyeSize = S.dyeResolution;
  const velocity = createDouble(gl, sim, fmt, true);
  const dye = createDouble(gl, dyeSize, fmt, true);
  const pressure = createDouble(gl, sim, fmt, false);
  const curl = createTarget(gl, sim, fmt, false);
  const divergence = createTarget(gl, sim, fmt, false);
  if (!velocity || !dye || !pressure || !curl || !divergence) return;
  const simTexel: [number, number] = [1 / sim, 1 / sim];
  const dyeTexel: [number, number] = [1 / dyeSize, 1 / dyeSize];

  // Full-screen quad.
  const vbo = gl.createBuffer();
  const ibo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);
  gl.disable(gl.BLEND);

  const bindProgram = (p: Program) => {
    gl.useProgram(p.program);
    return p.uniforms;
  };
  let unit = 0;
  const bindTexture = (texture: WebGLTexture) => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    return unit++;
  };
  const draw = (target: Target | null) => {
    if (target) {
      gl.viewport(0, 0, target.width, target.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    } else {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    unit = 0;
  };

  // Reveal photo (loaded when idle; nothing is drawn until it is ready).
  let photo: WebGLTexture | null = null;
  let photoAspect = heroLiquid.width / heroLiquid.height;
  const loadPhoto = () => {
    const img = new Image();
    img.decoding = "async";
    img.src = photoProps.src;
    img
      .decode()
      .then(() => {
        const texture = gl.createTexture();
        if (!texture) return;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        photoAspect = img.naturalWidth / img.naturalHeight;
        photo = texture;
      })
      .catch(() => {
        // Photo unavailable: the effect stays off.
      });
  };
  loadPhoto();

  // Canvas sizing.
  let aspect = 1;
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    aspect = rect.width / Math.max(rect.height, 1);
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  // Pointer input.
  const mouse = { x: 0.5, y: 0.5 };
  const prev = { x: 0.5, y: 0.5 };
  let moved = false;
  let primed = false;
  let lastMove = 0;

  const splat = (target: DoubleTarget, color: [number, number, number]) => {
    const u = bindProgram(P.splat);
    gl.uniform1i(u.uTarget!, bindTexture(target.read.texture));
    gl.uniform1f(u.uAspectRatio!, aspect);
    gl.uniform2f(u.uPoint!, mouse.x, mouse.y);
    gl.uniform3f(u.uColor!, color[0], color[1], color[2]);
    gl.uniform1f(u.uRadius!, S.splatRadius);
    draw(target.write);
    target.swap();
  };

  const step = (strength: number, dyeDissipation: number, applySplat: boolean) => {
    if (applySplat && moved) {
      const dx = mouse.x - prev.x;
      const dy = mouse.y - prev.y;
      if ((dx !== 0 || dy !== 0) && strength > 0.001) {
        splat(velocity, [dx * S.splatForce * strength, dy * S.splatForce * strength, 0]);
        splat(dye, [strength, strength, strength]);
      }
      prev.x = mouse.x;
      prev.y = mouse.y;
      moved = false;
    }

    if (S.curlStrength > 0) {
      let u = bindProgram(P.curl);
      gl.uniform1i(u.uVelocity!, bindTexture(velocity.read.texture));
      gl.uniform2f(u.uTexelSize!, ...simTexel);
      draw(curl);
      u = bindProgram(P.vorticity);
      gl.uniform1i(u.uVelocity!, bindTexture(velocity.read.texture));
      gl.uniform1i(u.uCurl!, bindTexture(curl.texture));
      gl.uniform2f(u.uTexelSize!, ...simTexel);
      gl.uniform1f(u.uCurlStrength!, S.curlStrength);
      gl.uniform1f(u.uDt!, 0.016);
      draw(velocity.write);
      velocity.swap();
    }

    let u = bindProgram(P.advect);
    gl.uniform1i(u.uVelocity!, bindTexture(velocity.read.texture));
    gl.uniform1i(u.uSource!, bindTexture(velocity.read.texture));
    gl.uniform2f(u.uTexelSize!, ...simTexel);
    gl.uniform1f(u.uDt!, 1);
    gl.uniform1f(u.uDissipation!, S.velocityDissipation);
    draw(velocity.write);
    velocity.swap();

    u = bindProgram(P.advect);
    gl.uniform1i(u.uVelocity!, bindTexture(velocity.read.texture));
    gl.uniform1i(u.uSource!, bindTexture(dye.read.texture));
    gl.uniform2f(u.uTexelSize!, ...dyeTexel);
    gl.uniform1f(u.uDt!, 1);
    gl.uniform1f(u.uDissipation!, dyeDissipation);
    draw(dye.write);
    dye.swap();

    u = bindProgram(P.divergence);
    gl.uniform1i(u.uVelocity!, bindTexture(velocity.read.texture));
    gl.uniform2f(u.uTexelSize!, ...simTexel);
    draw(divergence);

    gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.read.fbo);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    u = bindProgram(P.pressure);
    gl.uniform2f(u.uTexelSize!, ...simTexel);
    for (let i = 0; i < S.pressureIterations; i++) {
      gl.uniform1i(u.uDivergence!, bindTexture(divergence.texture));
      gl.uniform1i(u.uPressure!, bindTexture(pressure.read.texture));
      draw(pressure.write);
      pressure.swap();
    }

    u = bindProgram(P.gradient);
    gl.uniform1i(u.uPressure!, bindTexture(pressure.read.texture));
    gl.uniform1i(u.uVelocity!, bindTexture(velocity.read.texture));
    gl.uniform2f(u.uTexelSize!, ...simTexel);
    draw(velocity.write);
    velocity.swap();
  };

  const render = () => {
    if (!photo) return;
    const u = bindProgram(P.display);
    gl.uniform1i(u.uDye!, bindTexture(dye.read.texture));
    gl.uniform1i(u.uReveal!, bindTexture(photo));
    gl.uniform1f(u.uRevealSize!, S.revealSize);
    gl.uniform1f(u.uEdgeSoftness!, S.edgeSoftness);
    gl.uniform1f(u.uEdgeWidth!, S.edgeWidth);
    gl.uniform1f(u.uImageAspect!, photoAspect);
    gl.uniform1f(u.uPlaneAspect!, aspect);
    // Focus is top-down; GL textures here are bottom-up (flipped on upload).
    gl.uniform2f(u.uFocus!, PHOTO_FOCUS.x, 1 - PHOTO_FOCUS.y);
    gl.uniform1f(u.uZoom!, PHOTO_ZOOM);
    draw(null);
  };

  // Frame loop: only while the hero is visible and recently touched.
  const stepper = createStepper();
  let frame = 0;
  let lastTime = 0;
  let visible = true;
  const loop = (time: number) => {
    const elapsed = lastTime ? (time - lastTime) / 1000 : 1 / 60;
    lastTime = time;
    const rect = canvas.getBoundingClientRect();
    const { strength, progress } = scrollFade(rect.top, rect.height);
    const steps = stepper(elapsed);
    for (let i = 0; i < steps; i++) step(strength, dyeDissipationFor(progress), i === 0);
    render();
    if (visible && performance.now() - lastMove < IDLE_STOP_MS) {
      frame = requestAnimationFrame(loop);
    } else {
      frame = 0;
      lastTime = 0;
    }
  };
  const start = () => {
    if (!frame) frame = requestAnimationFrame(loop);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!visible || !photo) return;
    const rect = canvas.getBoundingClientRect();
    const point = toSimPoint(e.clientX, e.clientY, rect);
    if (point.x < -0.1 || point.x > 1.1 || point.y < -0.1 || point.y > 1.1) {
      primed = false;
      return;
    }
    mouse.x = point.x;
    mouse.y = point.y;
    // First contact only sets the origin, so there is no jet from the centre.
    if (!primed) {
      prev.x = mouse.x;
      prev.y = mouse.y;
      primed = true;
    }
    moved = true;
    lastMove = performance.now();
    start();
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  const io = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
    if (!visible) primed = false;
  });
  io.observe(canvas);

  const onContextLost = (e: Event) => {
    e.preventDefault();
    visible = false;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };
  canvas.addEventListener("webglcontextlost", onContextLost);

  return () => {
    window.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    io.disconnect();
    resizeObserver.disconnect();
    if (frame) cancelAnimationFrame(frame);
  };
}
