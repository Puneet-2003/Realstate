/**
 * Builds the size tiers the hero scroll sequence streams from:
 *
 *   public/frames/lo/NNNN.webp   640px  – tiny preview tier, fetched first so the
 *                                          whole walkthrough is scrubbable fast
 *   public/frames/md/NNNN.webp  1280px  – phones, tablets, small windows, slow links
 *   public/frames/hd/NNNN.webp  1920px  – large desktop canvases
 *
 * Source: public/frames/NNNN.webp (original 1920×1080 renders).
 * Usage:  node scripts/optimize-frames.mjs
 * After regenerating, bump CACHE_VERSION in components/sections/HeroSection.tsx.
 */
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import { cpus } from "node:os";
import path from "node:path";

const SRC_DIR = path.resolve("public/frames");
const TIERS = [
  { name: "lo", width: 640, quality: 55 },
  { name: "md", width: 1280, quality: 68 },
  { name: "hd", width: 1920, quality: 70 },
];

const files = (await readdir(SRC_DIR)).filter((f) => /^\d{4}\.webp$/.test(f)).sort();
for (const t of TIERS) await mkdir(path.join(SRC_DIR, t.name), { recursive: true });

sharp.concurrency(1);
const workers = Math.max(2, cpus().length - 2);
const totals = Object.fromEntries(TIERS.map((t) => [t.name, 0]));
let next = 0;
let done = 0;

async function worker() {
  while (next < files.length) {
    const file = files[next++];
    const input = await sharp(path.join(SRC_DIR, file)).toBuffer();
    for (const t of TIERS) {
      const out = path.join(SRC_DIR, t.name, file);
      await sharp(input).resize(t.width).webp({ quality: t.quality, effort: 5 }).toFile(out);
      totals[t.name] += (await stat(out)).size;
    }
    if (++done % 50 === 0) console.log(`${done}/${files.length}`);
  }
}

await Promise.all(Array.from({ length: workers }, worker));
for (const t of TIERS) {
  console.log(`${t.name}: ${(totals[t.name] / 1024 / 1024).toFixed(1)} MB total`);
}
