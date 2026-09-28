/**
 * Bakes the site's photo grade (full colour, gently muted and deepened so
 * light type and lime accents sit well on top) into background variants, so
 * full-bleed images need no runtime CSS filters (much cheaper to paint).
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
    .modulate({ saturation: 0.9, brightness: 0.88 }) // slightly muted, deeper
    .linear(1.06, -6) // gentle contrast
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(out);
  console.log("graded", file);
}
