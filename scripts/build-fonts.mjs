/**
 * Font pipeline — TTF → WOFF2, with the CJK face subset and range-split.
 *
 * Why this exists: the English homepage was fetching 6.94 MB of
 * NotoSansTC-Regular.ttf to render two characters (the 「中文」 language-toggle
 * label), and a Chinese visitor paid ~28 MB across four weights. Nothing in the
 * repo was WOFF2. See the 2026-08-27 mobile audit.
 *
 * Two different treatments, because the two problems are different:
 *
 *   Latin (Urbanist, Inconsolata) — format conversion only, NO glyph subsetting.
 *     41 KB → ~18 KB is most of the win, and keeping every glyph means new copy
 *     can never render tofu. Not worth the fragility for the last 5 KB.
 *
 *   CJK (Noto Sans TC) — subset to the glyphs this site actually uses, then split
 *     into buckets with their own unicode-range so a page downloads only the
 *     buckets it renders. 6.94 MB per weight becomes ~30 KB per bucket.
 *
 * The subsetting is content-driven, so it CAN go stale: add Chinese copy without
 * rebuilding and those glyphs render as tofu. That is guarded — this script scans
 * every .html and .js in the tree (including the `data-zh` attributes and the
 * bilingual string pairs inside site.js) and throws if a codepoint it found is
 * missing from what it emitted. `npm run verify` runs the whole build, so a stale
 * subset fails there before it can ship.
 *
 * Output: assets/build/fonts/*.woff2, plus the @font-face block injected between
 * the sentinels in assets/styles.css. Committed, like the rest of assets/build/ —
 * Pages serves the repo root.
 *
 * Run: node scripts/build-fonts.mjs   (or `npm run build`)
 */
import subsetFont from 'subset-font';
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC  = join(ROOT, 'designs/assets/fonts');
const OUT  = join(ROOT, 'assets/build/fonts');
const CSS  = join(ROOT, 'assets/styles.css');

const START = '/* @generated:fonts:start — scripts/build-fonts.mjs, do not edit by hand */';
const END   = '/* @generated:fonts:end */';

/* Latin faces: converted whole. Weight order matches the old block in styles.css. */
const LATIN = [
  ['Urbanist',    400, 'Urbanist/static/Urbanist-Regular.ttf'],
  ['Urbanist',    500, 'Urbanist/static/Urbanist-Medium.ttf'],
  ['Urbanist',    600, 'Urbanist/static/Urbanist-SemiBold.ttf'],
  ['Urbanist',    700, 'Urbanist/static/Urbanist-Bold.ttf'],
  ['Inconsolata', 400, 'Inconsolata/static/Inconsolata-Regular.ttf'],
  ['Inconsolata', 500, 'Inconsolata/static/Inconsolata-Medium.ttf'],
  ['Inconsolata', 600, 'Inconsolata/static/Inconsolata-SemiBold.ttf'],
];

/* CJK faces: subset + split. */
const CJK = [
  [400, 'Noto Sans TC/static/NotoSansTC-Regular.ttf'],
  [500, 'Noto Sans TC/static/NotoSansTC-Medium.ttf'],
  [600, 'Noto Sans TC/static/NotoSansTC-SemiBold.ttf'],
  [700, 'Noto Sans TC/static/NotoSansTC-Bold.ttf'],
];

/* Latin charset kept whole. Enumerated as ranges rather than scanned from the
   site, because these faces are ~40 KB and the last few KB of subsetting are not
   worth a copy edit rendering tofu. subset-font drops codepoints a face does not
   carry, so an over-broad list costs nothing. */
const LATIN_RANGES = [
  [0x0020, 0x007E],  // Basic Latin
  [0x00A0, 0x024F],  // Latin-1 Supplement, Latin Extended-A and -B
  [0x02B0, 0x02FF],  // Spacing modifier letters
  [0x0300, 0x036F],  // Combining diacriticals
  [0x2000, 0x206F],  // General punctuation — the em dash, the bullet, the ellipsis
  [0x20A0, 0x20BF],  // Currency symbols
  [0x2100, 0x214F],  // Letterlike symbols
  [0x2190, 0x21FF],  // Arrows — the "Read more →" glyph
  [0x2200, 0x22FF],  // Mathematical operators
  [0x25A0, 0x25FF],  // Geometric shapes
];
const ALL_LATIN = LATIN_RANGES
  .flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, i) => String.fromCodePoint(a + i)))
  .join('');

/* Codepoints the CJK face is responsible for. Han, Bopomofo, CJK punctuation,
   fullwidth forms — everything a Latin face would fall through on. */
const CJK_RE = /[⺀-⻿　-〿㄀-ㄯ㈀-㋿㐀-䶿一-鿿豈-﫿︰-﹏＀-￯]/u;

/* Glyphs per bucket. Small enough that a page rendering a handful of characters
   pulls tens of KB rather than hundreds; large enough that a fully Chinese page
   does not open dozens of connections. */
const BUCKET = 300;

/* ── 1. Collect every CJK codepoint the site can render ────────────────── */
// Scanned as raw text rather than parsed: the strings live in HTML text nodes,
// in data-zh / data-zh-html / placeholder attributes, AND in JS string literals
// (site.js pairs every message as t('English', '中文')). A DOM parse would miss
// the last group, and an over-broad scan costs nothing but a few extra glyphs.
const SKIP = new Set(['node_modules', '.git', '.vite', 'designs', 'assets/build']);

const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const rel = relative(ROOT, p);
    if (SKIP.has(name) || SKIP.has(rel)) continue;
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(html|js|mjs)$/.test(name)) out.push(p);
  }
  return out;
};

const used = new Set();
const sources = walk(ROOT);
for (const f of sources) {
  for (const ch of readFileSync(f, 'utf8')) if (CJK_RE.test(ch)) used.add(ch.codePointAt(0));
}
const points = [...used].sort((a, b) => a - b);
console.log(`fonts: ${points.length} distinct CJK codepoints across ${sources.length} source files`);

/* ── 2. Bucket them, and describe each bucket as a unicode-range ────────── */
// Contiguous runs collapse to U+xxxx-yyyy. Buckets are cut on codepoint order,
// so a run of related characters usually lands in one file.
const toRange = (cps) => {
  const parts = [];
  let start = cps[0], prev = cps[0];
  for (const cp of cps.slice(1)) {
    if (cp === prev + 1) { prev = cp; continue; }
    parts.push(start === prev ? `U+${start.toString(16).toUpperCase()}`
                              : `U+${start.toString(16).toUpperCase()}-${prev.toString(16).toUpperCase()}`);
    start = prev = cp;
  }
  parts.push(start === prev ? `U+${start.toString(16).toUpperCase()}`
                            : `U+${start.toString(16).toUpperCase()}-${prev.toString(16).toUpperCase()}`);
  return parts.join(',');
};

const buckets = [];
for (let i = 0; i < points.length; i += BUCKET) buckets.push(points.slice(i, i + BUCKET));

/* ── 3. Emit ───────────────────────────────────────────────────────────── */
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const faces = [];
let total = 0;

for (const [family, weight, file] of LATIN) {
  const src = join(SRC, file);
  if (!existsSync(src)) throw new Error(`missing source font: ${file}`);
  // No `text` argument would drop everything; passing the full charset keeps the
  // face whole while still re-encoding to WOFF2.
  const ttf = readFileSync(src);
  const buf = await subsetFont(ttf, ALL_LATIN, { targetFormat: 'woff2' });
  const name = `${family.replace(/\s+/g, '')}-${weight}.woff2`;
  writeFileSync(join(OUT, name), buf);
  total += buf.length;
  faces.push({ family, weight, name, range: null });
  console.log(`  ${name.padEnd(28)} ${(ttf.length / 1024).toFixed(0).padStart(6)} KB ttf → ${(buf.length / 1024).toFixed(1).padStart(7)} KB woff2`);
}

for (const [weight, file] of CJK) {
  const src = join(SRC, file);
  if (!existsSync(src)) throw new Error(`missing source font: ${file}`);
  const ttf = readFileSync(src);
  for (const [i, bucket] of buckets.entries()) {
    const text = bucket.map((cp) => String.fromCodePoint(cp)).join('');
    const buf = await subsetFont(ttf, text, { targetFormat: 'woff2' });
    const name = `NotoSansTC-${weight}-${String(i).padStart(2, '0')}.woff2`;
    writeFileSync(join(OUT, name), buf);
    total += buf.length;
    faces.push({ family: 'Noto Sans TC', weight, name, range: toRange(bucket) });
  }
  console.log(`  NotoSansTC-${weight}-*.woff2      ${(ttf.length / 1024).toFixed(0).padStart(6)} KB ttf → ${buckets.length} buckets`);
}

/* ── 4. Coverage assertion ─────────────────────────────────────────────── */
// The bucket ranges are built from `points`, so this can only fail if the two
// ever drift apart. Cheap insurance on the one property that would silently
// ship tofu.
const covered = new Set(buckets.flat());
const missing = points.filter((cp) => !covered.has(cp));
if (missing.length) {
  throw new Error(`fonts: ${missing.length} codepoint(s) used on the site but not emitted: ` +
    missing.slice(0, 20).map((c) => String.fromCodePoint(c)).join(''));
}

/* ── 5. Inject the @font-face block into styles.css ─────────────────────── */
const block = [
  START,
  '/* Latin faces are whole — format conversion only. The Noto Sans TC faces are',
  '   subset to the glyphs this site uses and split by unicode-range, so a page',
  '   downloads only the buckets it renders. Regenerate with `npm run build`. */',
  ...faces.map(({ family, weight, name, range }) => [
    '@font-face {',
    `  font-family: '${family}';`,
    '  font-style: normal;',
    `  font-weight: ${weight};`,
    '  font-display: swap;',
    `  src: url('/assets/build/fonts/${name}') format('woff2');`,
    ...(range ? [`  unicode-range: ${range};`] : []),
    '}',
  ].join('\n')),
  END,
].join('\n');

const css = readFileSync(CSS, 'utf8');
const a = css.indexOf(START), b = css.indexOf(END);
if (a === -1 || b === -1) throw new Error(`sentinels not found in assets/styles.css — expected ${START}`);
writeFileSync(CSS, css.slice(0, a) + block + css.slice(b + END.length));

console.log(`fonts: ${faces.length} faces, ${(total / 1024 / 1024).toFixed(2)} MB emitted to assets/build/fonts/`);
