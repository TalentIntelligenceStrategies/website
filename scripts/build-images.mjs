/**
 * Responsive image variants.
 *
 * The site shipped one file per image at full desktop resolution and let the
 * browser scale it down: the 2026-08-27 mobile audit measured press/iii.jpg at
 * 486 KB and 1920 px natural rendering into a 310 px card, and 1.02 MB of board
 * headshots rendering at 94–114 px. There was no srcset, no <picture> and no
 * WebP anywhere in the tree.
 *
 * This emits 400 / 800 / 1600 px WebP for every raster under assets/imagery/,
 * next to the original. The original stays put and stays the <img src> — it is
 * the fallback for anything that cannot take WebP, and it means a page that has
 * not been converted to <picture> yet is unaffected.
 *
 * AVIF is deliberately not emitted. It encodes 5–10× slower for a further ~15%
 * over WebP, and WebP already covers every browser this site supports. Revisit
 * if the imagery budget ever becomes the constraint again.
 *
 * Variants larger than the source are skipped rather than upscaled, so a small
 * logo does not gain three copies of itself.
 *
 * Output: assets/imagery/<path>/<name>-<width>.webp — committed, like the rest of
 * the served tree. Idempotent: an up-to-date variant is left alone, so reruns are
 * cheap and `npm run verify` stays fast.
 *
 * Run: node scripts/build-images.mjs   (or `npm run build`)
 */
import sharp from 'sharp';
import { readdirSync, readFileSync, statSync, existsSync, rmSync } from 'node:fs';
import { join, dirname, extname, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC  = join(ROOT, 'assets/imagery');
const WIDTHS = [400, 800, 1600];
// A source narrower than the next step up would otherwise only ever get the 400
// variant, which is a real quality drop on a 2× screen — so its native width is
// added as a step and the WebP is never smaller than the file it replaces. Skipped
// when native is within 15% of a step already emitted: a 410px twin of the 400px
// variant is two near-identical files in the tree and no benefit to anyone.
const stepsFor = (w) => {
  if (!w) return WIDTHS;
  const steps = WIDTHS.filter((x) => x <= w);
  if (!steps.some((x) => w <= x * 1.15)) steps.push(w);
  return steps.length ? steps : [Math.min(w, WIDTHS[0])];
};

const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(png|jpe?g)$/i.test(name)) out.push(p);
  }
  return out;
};

/* Only images something actually references. Without this the walk picks up every
   orphan in the tree and gives it three variants — it generated 80 files (3.2 MB)
   for seven unreferenced sources on its first run, including an 8750px-wide WebP
   of a 2.3 MB JPEG nothing points at. The sources themselves are left alone; they
   just stop earning derivatives. */
const referenced = () => {
  const seen = new Set();
  const scan = (dir) => {
    for (const name of readdirSync(dir)) {
      if (['node_modules', '.git', '.vite', '.agents'].includes(name)) continue;
      // Render harnesses, not pages: assets/product-shots/ and assets/badges/ exist to
      // screenshot product stills. Counting their references would mint responsive
      // variants for imagery no visitor ever loads.
      if (name === 'product-shots' || name === 'badges') continue;
      // Internal review pages, and the gitignored probe harnesses at the repo root
      // (.wave-probe.html and friends). None of them deploy, and counting their
      // references keeps variants alive for imagery no page loads.
      if (name === 'documents' || name.startsWith('.')) continue;
      const p = join(dir, name);
      if (statSync(p).isDirectory()) { scan(p); continue; }
      if (!/\.(html|css|js|mjs)$/.test(name)) continue;
      const text = readFileSync(p, 'utf8');
      for (const m of text.matchAll(/\/assets\/imagery\/[A-Za-z0-9%._/-]+\.(?:png|jpe?g)/g)) {
        seen.add(join(ROOT, decodeURIComponent(m[0])));
      }
    }
  };
  scan(ROOT);
  return seen;
};

const inUse = referenced();
// Which variant files are actually NAMED in a srcset or an image-set. A <picture>
// names its whole set, but a CSS background names one or two sizes, so the rest of
// that source's steps are dead weight.
const namedVariants = () => {
  const seen = new Set();
  const scan = (dir) => {
    for (const name of readdirSync(dir)) {
      if (['node_modules', '.git', '.vite', '.agents', 'product-shots', 'badges', 'documents'].includes(name)) continue;
      if (name.startsWith('.')) continue;
      const p = join(dir, name);
      if (statSync(p).isDirectory()) { scan(p); continue; }
      if (!/\.(html|css|js|mjs)$/.test(name)) continue;
      for (const m of readFileSync(p, 'utf8').matchAll(/\/assets\/imagery\/[A-Za-z0-9%._/-]+-\d+\.webp/g)) {
        seen.add(join(ROOT, decodeURIComponent(m[0])));
      }
    }
  };
  scan(ROOT);
  return seen;
};
const named = namedVariants();
const all = walk(SRC);
const sources = all.filter((p) => inUse.has(p));
const skippedOrphans = all.length - sources.length;

/* The one definition of which variants a source should have, used by both the
   generation pass and the prune so they cannot disagree and churn against each
   other. Unreferenced source → none. Wired up (at least one variant named in a
   srcset or image-set) → exactly the named ones, so a CSS background that uses
   800 and 1400 does not also carry a 400. Not yet wired → the full step set, so
   there is something to point a new srcset at. */
const targetsFor = (src, width) => {
  if (!inUse.has(src)) return [];
  const stem = join(dirname(src), basename(src, extname(src)));
  const steps = stepsFor(width).filter((w) => !width || w <= width).map((w) => `${stem}-${w}.webp`);
  const wired = steps.some((f) => named.has(f));
  return wired ? steps.filter((f) => named.has(f)) : steps;
};
let made = 0, skipped = 0, bytesIn = 0, bytesOut = 0;

for (const src of sources) {
  const meta = await sharp(src).metadata();
  const stem = join(dirname(src), basename(src, extname(src)));
  bytesIn += statSync(src).size;

  for (const out of targetsFor(src, meta.width)) {
    const w = parseInt(out.match(/-(\d+)\.webp$/)[1], 10);
    if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) {
      bytesOut += statSync(out).size; skipped++; continue;
    }
    await sharp(src).resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(out);
    bytesOut += statSync(out).size; made++;
  }
}

// Prune variants this run would no longer emit — a changed WIDTHS list or a resized
// source otherwise leaves orphans in a tree that Pages serves.
let pruned = 0;
for (const src of all) {
  const meta = await sharp(src).metadata();
  const stem = join(dirname(src), basename(src, extname(src)));
  const keep = new Set(targetsFor(src, meta.width));
  const dir = dirname(src);
  const prefix = basename(stem) + '-';
  for (const f of readdirSync(dir)) {
    if (!f.startsWith(prefix) || !f.endsWith('.webp')) continue;
    if (!/^-\d+\.webp$/.test(f.slice(prefix.length - 1))) continue;   // sibling stems, e.g. -flip-400
    const p = join(dir, f);
    if (!keep.has(p)) { rmSync(p); pruned++; }
  }
}

console.log(`images: ${sources.length} referenced sources (${(bytesIn / 1048576).toFixed(1)} MB) → ` +
  `${made} written, ${skipped} current, ${pruned} pruned, ${(bytesOut / 1048576).toFixed(1)} MB of variants` +
  (skippedOrphans ? `  · ${skippedOrphans} unreferenced source(s) skipped` : ''));
