/**
 * Guard against a stale committed build.
 *
 * assets/build/ is committed because Pages serves the repo root, which means it can
 * drift from src/ without anything failing until a page breaks in production. This
 * rebuilds into a temp dir and compares. Run before committing, and in CI.
 *
 * Run: npm run verify
 */
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, existsSync, rmSync, cpSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(ROOT, 'assets/build');
const TMP = join(ROOT, '.vite/verify-build');

const hash = (p) => createHash('sha256').update(readFileSync(p)).digest('hex').slice(0, 16);
// Recursive: assets/build/ gained a fonts/ subdirectory, and a flat readdir would
// try to hash the directory itself.
const list = (dir, prefix = '') => (existsSync(dir) ? readdirSync(dir).sort() : []).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? list(p, `${prefix}${f}/`) : [[`${prefix}${f}`, hash(p)]];
});
const snap = (dir) => Object.fromEntries(list(dir));

if (!existsSync(BUILD)) {
  console.error('assets/build/ is missing — run `npm run build`.');
  process.exit(1);
}
const before = snap(BUILD);
cpSync(BUILD, TMP, { recursive: true });

try {
  execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
  const after = snap(BUILD);
  const names = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
  const drift = names.filter((n) => before[n] !== after[n]);

  if (drift.length) {
    console.error('STALE BUILD — assets/build/ does not match src/:');
    for (const n of drift) {
      console.error(`  ${n}: committed ${before[n] ?? '(absent)'} → rebuilt ${after[n] ?? '(absent)'}`);
    }
    console.error('\nCommit the rebuilt artifacts.');
    process.exit(1);
  }
  console.log(`build is current — ${names.length} artifact(s) match src/`);
} finally {
  rmSync(TMP, { recursive: true, force: true });
}
