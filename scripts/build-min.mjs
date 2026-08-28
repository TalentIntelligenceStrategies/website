/**
 * Minified twins of the two hand-authored assets.
 *
 * assets/styles.css is 40% comments and assets/site.js is 53% — together ~67 KB gzip
 * of design documentation downloaded by every visitor on every page. The comments are
 * load-bearing for this repo (they are why DESIGN.md stays honest) and are staying;
 * they just have no business in the payload.
 *
 * So: the sources stay authored, committed and comment-rich, and this emits stripped
 * copies into assets/build/ that the pages actually load. Same contract the vendored
 * bundles already have, and `npm run verify` already guards the whole directory
 * against drift.
 *
 * esbuild, not a new dependency — it is already installed under Vite.
 *
 * CSS is minified with NO target set, so esbuild rewrites nothing: styles.css carries
 * :has(), @supports, dvh, clamp() and ::-webkit rules that a lowering pass would be
 * free to transform. Whitespace and comments only.
 *
 * ORDER MATTERS: scripts/build-fonts.mjs writes the @font-face block into
 * assets/styles.css, so this has to run after it or the twin ships a stale block.
 * See the `build` script in package.json.
 *
 * Run: node scripts/build-min.mjs   (or `npm run build`)
 */
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets/build');
mkdirSync(OUT, { recursive: true });

const gz = (s) => Math.round(Buffer.byteLength(s) / 1024);

const targets = [
  { from: 'assets/styles.css', to: 'styles.css', loader: 'css' },
  // site.js is a classic script, not a module — the pages load it with a plain
  // <script defer>. format:'iife' would wrap it in a function and break the two
  // globals it deliberately publishes (__tisLenis, __tisLenisTakeOverRaf).
  { from: 'assets/site.js', to: 'site.js', loader: 'js' },
];

for (const t of targets) {
  const src = join(ROOT, t.from);
  const res = await build({
    entryPoints: [src],
    outfile: join(OUT, t.to),
    minify: true,
    bundle: false,
    write: true,
    legalComments: 'none',
    // JS only. CSS gets no target on purpose — see the header.
    ...(t.loader === 'js' ? { target: 'es2020' } : {}),
    logLevel: 'warning',
  });
  if (res.errors.length) throw new Error(`${t.from}: ${res.errors.length} error(s)`);
  const before = readFileSync(src, 'utf8');
  const after = readFileSync(join(OUT, t.to), 'utf8');
  console.log(`min: ${t.from} ${gz(before)} KB → assets/build/${t.to} ${gz(after)} KB`);
}
