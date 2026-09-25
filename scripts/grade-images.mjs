/**
 * Bakes the site's cinematic photo grade (desaturate + electric-blue tint +
 * darken) into background variants, so full-bleed images need no runtime
 * CSS filters or overlays (much cheaper to paint).
 *
 *   node scripts/grade-images.mjs
 *
 * Reads  src/assets/images/*.jpg
 * Writes src/assets/images/graded/*.jpg (max 1920px wide)
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("src/assets/images");
const OUT = path.join(SRC, "graded");

const files = (await readdir(SRC)).filter((f) => f.endsWith(".jpg"));
for (const file of files) {
  const out = path.join(OUT, file);
  await sharp(path.join(SRC, file))
    .resize({ width: 1920, withoutEnlargement: true })
    .modulate({ saturation: 0.08 }) // desaturate (keeps sRGB so the tint applies)
    .linear(1.08, -14) // contrast + darken
    .tint({ r: 118, g: 140, b: 196 })
    .modulate({ brightness: 0.85 })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(out);
  console.log("graded", file);
}
