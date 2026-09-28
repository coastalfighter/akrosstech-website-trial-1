/**
 * Bakes the site's monochrome editorial photo grade (black & white +
 * contrast) into background variants, so full-bleed images need no runtime
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
    .modulate({ saturation: 0 }) // monochrome, kept in sRGB
    .linear(1.12, -10) // editorial contrast
    .modulate({ brightness: 0.92 })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(out);
  console.log("graded", file);
}
