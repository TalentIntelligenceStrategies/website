/**
 * Catch media-query declarations that lose to a later rule on source order.
 *
 * assets/styles.css interleaves media queries with the base rules they override, so a
 * `@media` block written ABOVE its component silently loses every property the base
 * rule also declares — same specificity, later wins. Nothing errors; the phone just
 * keeps rendering the desktop value.
 *
 * This has bitten repeatedly. On 2026-08-29 six declarations of a mobile contact
 * reflow were dead this way (gap, justify-content, padding, min-height,
 * grid-template-columns, column-gap) while `order` from the same block worked, because
 * no base rule declares `order` — which is exactly what made it invisible.
 *
 * Run: npm run cascade   (also runs inside npm run verify)
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(ROOT, 'assets/styles.css');

/** (id, class/attr/pseudo-class, element/pseudo-element) packed into one integer. */
function specificity(sel) {
  let a = 0, b = 0, c = 0;
  let s = sel
    .replace(/::[a-zA-Z-]+(\([^)]*\))?/g, () => { c++; return ' '; })
    .replace(/:[a-zA-Z-]+(\([^)]*\))?/g, () => { b++; return ' '; });
  a = (s.match(/#[\w-]+/g) || []).length;
  b += (s.match(/\.[\w-]+/g) || []).length + (s.match(/\[[^\]]+\]/g) || []).length;
  c += (s.replace(/[#.][\w-]+|\[[^\]]+\]/g, ' ').match(/(^|[\s>+~])[a-zA-Z][\w-]*/g) || []).length;
  return a * 10000 + b * 100 + c;
}

/**
 * Blank out comments while preserving every byte position, so reported line numbers
 * stay true. Stripping them first is not optional: splitting a rule body on `;` and
 * matching /^\s*prop\s*:/ skips any declaration that shares a chunk with a preceding
 * comment, which under-reported a real run of 9 defects as 7.
 */
function blankComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
}

function parse(cssRaw) {
  const css = blankComments(cssRaw);
  const decls = [];
  let i = 0, line = 1, media = [], head = '', block = 0;

  while (i < css.length) {
    const ch = css[i];
    if (ch === '\n') { line++; i++; head += ' '; continue; }
    if (ch === '{') {
      const sel = head.trim();
      head = '';
      if (sel.startsWith('@')) {            // at-rule: descend, keep the condition
        media.push(sel.replace(/\s+/g, ' '));
        i++;
        continue;
      }
      let depth = 1, j = i + 1;
      while (j < css.length && depth > 0) {
        if (css[j] === '{') depth++;
        else if (css[j] === '}') depth--;
        j++;
      }
      const body = css.slice(i + 1, j - 1);
      const startLine = line;
      block++;
      line += (css.slice(i, j).match(/\n/g) || []).length;
      for (const chunk of body.split(';')) {
        if (/[{}]/.test(chunk)) continue;   // nested at-rule remnants
        const m = chunk.match(/([-a-zA-Z]+)\s*:/);
        if (!m) continue;
        for (const one of sel.split(',')) {
          const t = one.trim().replace(/\s+/g, ' ');
          if (!t) continue;
          decls.push({
            sel: t, prop: m[1], line: startLine, block,
            media: media.join(' AND '),
            spec: specificity(t),
            important: /!important/.test(chunk),
            order: decls.length,
          });
        }
      }
      i = j;
      continue;
    }
    if (ch === '}') { if (media.length) media.pop(); i++; head = ''; continue; }
    head += ch;
    i++;
  }
  return decls;
}

/**
 * A declaration inside a media query loses when a LATER declaration of the same
 * property on the same selector wins the cascade unconditionally — i.e. it is either
 * unconditional (no media) or carries the identical condition. A later declaration
 * under a *different* condition is not a conflict: the two never apply together.
 */
function findLosers(decls) {
  const byKey = new Map();
  for (const d of decls) {
    const k = `${d.sel}|${d.prop}`;
    if (!byKey.has(k)) byKey.set(k, []);
    byKey.get(k).push(d);
  }
  const out = [];
  for (const list of byKey.values()) {
    for (const a of list) {
      if (!a.media) continue;
      for (const b of list) {
        if (b.order <= a.order) continue;
        // Same rule block: re-declaring a property is the progressive-enhancement
        // fallback idiom (a plain url() followed by image-set(), a hex followed by
        // color-mix()). The later one winning is the entire point.
        if (b.block === a.block) continue;
        if (b.media && b.media !== a.media) continue;
        if (b.spec < a.spec) continue;
        if (a.important && !b.important) continue;
        out.push({ ...a, beatenAt: b.line, beatenBy: b.media || '(no media query)' });
        break;
      }
    }
  }
  return out;
}

const losers = findLosers(parse(readFileSync(FILE, 'utf8')));

if (losers.length) {
  console.error(`DEAD MEDIA-QUERY DECLARATIONS — ${losers.length} in assets/styles.css\n`);
  const groups = new Map();
  for (const l of losers) {
    const k = `${l.sel}  [${l.media}]  line ${l.line}  ->  beaten at line ${l.beatenAt} by ${l.beatenBy}`;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(l.prop);
  }
  for (const [k, props] of [...groups].sort()) {
    console.error(`  ${k}\n      never applies: ${props.join(', ')}`);
  }
  console.error('\nMove the media block BELOW the rule it overrides. Do not reach for');
  console.error('!important or a longer selector — both make the next edit harder.');
  process.exit(1);
}
console.log('cascade order is clean — no media-query declaration is dead on source order');
