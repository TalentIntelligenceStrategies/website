/**
 * Search index for the site-wide search modal.
 *
 * Until now the modal's input was decorative: `site.js` focused it on open and
 * never read it, while the placeholder promised "Search reports, press, and
 * pages…". This builds the index that makes the promise true.
 *
 * One entry per h1/h2/h3 in each page's <main>, carrying the heading, the dek or
 * lede that follows it, and a deep link. Both languages: EN from the element's
 * own text, ZH from its `data-zh` attribute, so a visitor reading 中文 searches
 * 中文. The modal picks the pair matching <html lang> at query time.
 *
 * Deep links need ids. Headings that lack one get a slug written back into the
 * HTML — never overwriting an existing id, so the ids are stable across builds
 * and a rerun is a no-op. Uniqueness is enforced per page and the script throws
 * rather than emit a colliding anchor.
 *
 * The two veiled pages are indexed but link to their page root. `data-veil`
 * scroll-locks the document, so an anchor there would land on a frozen view —
 * the section is worth finding, the fragment is not worth following.
 *
 * Output: assets/build/search-index.json, committed like the rest of
 * assets/build/. Fetched by site.js on first modal open, never on page load.
 *
 * Run: node scripts/build-search-index.mjs   (or `npm run build`)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT  = join(ROOT, 'assets/build/search-index.json');

/* label is what a result row shows as its page; veiled pages link to the root. */
const PAGES = [
  { file: 'index.html',                      url: '/',                                 en: 'Home',                    zh: '首頁' },
  { file: 'product/signal/index.html',       url: '/product/signal/',                  en: 'Patent Intelligence',     zh: '專利情報' },
  { file: 'product/signal/methodology.html', url: '/product/signal/methodology.html',  en: 'SABCD Methodology',       zh: 'SABCD 評級方法' },
  { file: 'product/licensing/index.html',    url: '/product/licensing/',               en: 'Licensing Platform',      zh: '專利授權平台', veil: true },
  { file: 'product/licensing/badge.html',    url: '/product/licensing/badge.html',     en: 'Verified License Badge',  zh: '授權驗證標章', veil: true },
  { file: 'patents/index.html',              url: '/patents/',                         en: 'Owned Patents',           zh: '自有專利' },
  { file: 'reports/index.html',              url: '/reports/',                         en: 'Reports & Press',         zh: '報告與新聞' },
  { file: 'about/index.html',                url: '/about/',                           en: 'About',                   zh: '關於' },
];

/* An attribute matcher that understands quoting. Several headings carry a
   `data-zh='… <span …></span> 夥伴關係'` whose value contains `>`, and a plain
   [^>]* stops inside the attribute — which made the "heading text" start
   mid-attribute for 8 entries. */
const ATTRS = `(?:[^>"']|"[^"]*"|'[^']*')*`;

const TAG = new RegExp(`<[a-zA-Z/!][^>"']*(?:"[^"]*"|'[^']*'|[^>"'])*>`, 'g');
const strip = (html) => html
  .replace(TAG, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&rsquo;/g, "'")
  .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
  .replace(/\s+/g, ' ').trim();

// ASCII slug from the English heading. CJK-only headings fall back to a positional
// slug, since a transliteration would be neither stable nor readable.
const slugify = (s, i) => {
  const words = s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').split('-').filter(Boolean);
  let base = '';
  for (const w of words) {
    if (base && (base + '-' + w).length > 40) break;
    base = base ? `${base}-${w}` : w;
  }
  return base || `section-${i}`;
};

/* `strip` turns every tag into a space, which is right for English — a <br> there stands
   in for the space between two sentences. In Chinese it is wrong: 。 and 、 carry their
   own trailing space and a line break between two Han characters means nothing at all, so
   a ZH `data-zh` carrying <br> came out of the index with a visible hole in it
   ("選報告類型， 上傳資料。" is in the shipped index today). Collapse whitespace that sits
   between two CJK/full-width characters. Latin↔CJK spacing is deliberate and is left
   alone, which is why this tests both sides rather than just the left. */
const CJK = '\\u2E80-\\u9FFF\\uF900-\\uFAFF\\uFF00-\\uFFEF';
const cjkTighten = (s) => s.replace(new RegExp(`([${CJK}])\\s+(?=[${CJK}])`, 'g'), '$1');

/* The Chinese string for an element. Usually its own data-zh — in either quote
   style — but on several headings the translation sits on a child <span> instead
   (`<h1><span data-zh="…">…</span></h1>`), so fall back to joining the children's. */
const DATA_ZH = /\bdata-zh=(?:"([^"]*)"|'([^']*)')/;
const zhOf = (attrs, inner) => {
  const own = DATA_ZH.exec(attrs);
  if (own) return cjkTighten(strip(own[1] ?? own[2]));
  const parts = [...inner.matchAll(new RegExp(DATA_ZH.source, 'g'))].map((m) => strip(m[1] ?? m[2]));
  return cjkTighten(parts.join(' ').trim());
};

const entries = [];
let added = 0;

/* One entry per page, ahead of its sections. Without these, searching a page by its
   own name returns nothing — "methodology" appears in no heading on the methodology
   page, only in its <title> and in the nav. */
PAGES.forEach((page, i) => {
  entries.push({ p: i, t: page.en, zt: page.zh, u: page.url, page: 1 });
});

PAGES.forEach((page, pageIndex) => {
  const path = join(ROOT, page.file);
  let html = readFileSync(path, 'utf8');

  const mainStart = html.indexOf('<main');
  const mainEnd   = html.indexOf('</main>');
  if (mainStart === -1 || mainEnd === -1) throw new Error(`${page.file}: no <main>`);

  // Work on the <main> slice only, then splice it back, so ids are never written
  // into the shared chrome (the nav and footer repeat on all 8 pages).
  // Comments are blanked (length-preserving, so every offset below stays valid).
  // Without this the scanner matched an <h3> written inside a comment that DESCRIBES
  // markup, indexed the prose around it, and wrote an id into the comment itself.
  const raw = html.slice(mainStart, mainEnd);
  const main = raw.replace(/<!--[\s\S]*?-->/g, (c) => ' '.repeat(c.length));
  const taken = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  // Insertions are collected first and applied in reverse at the end. Splicing as we
  // go would invalidate every later match index from the same scan — which silently
  // duplicated heading tails and injected ids into attribute values the first time.
  const inserts = [];

  // Headings, in document order, with the paragraph that follows each.
  // The attribute matcher must understand quoting: several headings carry a
  // `data-zh='… <span …></span> 夥伴關係'` whose value contains `>`, and a plain
  // [^>]* stopped inside the attribute, so the "heading text" began mid-attribute.
  const HEADING = new RegExp(`<h([1-3])\\b(${ATTRS})>([\\s\\S]*?)</h\\1>`, 'g');
  const found = [...main.matchAll(HEADING)];

  /* Not every heading is content. Two kinds are skipped:
       - `.sr-only` — an accessible label for a list, not a section anyone navigates to.
       - headings inside a status panel that is hidden until a form succeeds
         (.contact-success, .sig-rt__panel, the newsletter confirmations). Indexing
         "Message sent." as a destination is worse than not indexing at all.
     Detected by walking back from the heading to the nearest enclosing element that
     is still open, which is enough for the flat, hand-authored markup here. */
  const SKIP_CLASS = /\b(sr-only|contact-success|sig-rt__panel|mkt-success|nl-success)\b/;

  /* Ranges covered by a hidden status panel. Each match is walked forward counting
     opens and closes of that same tag, which is exact for a single tag type and
     avoids pretending a regex can model the whole tree. */
  const skipRanges = [];
  for (const open of main.matchAll(new RegExp(`<(\\w+)(${ATTRS})>`, 'g'))) {
    if (!SKIP_CLASS.test(open[2])) continue;
    const tag = open[1];
    const re = new RegExp(`<${tag}\\b[^>]*>|</${tag}>`, 'g');
    re.lastIndex = open.index;
    let depth = 0, end = main.length;
    for (let t; (t = re.exec(main)); ) {
      depth += t[0][1] === '/' ? -1 : 1;
      if (depth === 0) { end = t.index + t[0].length; break; }
    }
    skipRanges.push([open.index, end]);
  }
  const inSkippedContainer = (at) => skipRanges.some(([a, b]) => at >= a && at < b);

  found.forEach((m, i) => {
    const [full, , attrs, inner] = m;
    const en = strip(inner);
    if (!en) return;
    if (SKIP_CLASS.test(attrs) || inSkippedContainer(m.index)) return;

    const zh = zhOf(attrs, inner);

    // The dek / lede immediately after the heading, if there is one.
    const after = main.slice(m.index + full.length, m.index + full.length + 1600);
    const p = /<p\b([^>]*)>([\s\S]*?)<\/p>/.exec(after);
    let bodyEn = '', bodyZh = '';
    if (p && after.slice(0, p.index).replace(/<[^>]+>|\s/g, '') === '') {
      bodyEn = strip(p[2]).slice(0, 240);
      bodyZh = zhOf(p[1], p[2]).slice(0, 240);
    }

    // Deep link. Veiled pages get the page root — see the header note.
    let frag = '';
    if (!page.veil) {
      const has = /\bid="([^"]+)"/.exec(attrs);
      if (has) {
        frag = has[1];
      } else {
        let slug = slugify(en, i);
        let n = 2;
        while (taken.has(slug)) slug = `${slugify(en, i)}-${n++}`;
        taken.add(slug);
        // Record the insertion point: just before the '>' of this heading's open tag.
        inserts.push({ at: m.index + full.indexOf('>'), text: ` id="${slug}"` });
        frag = slug;
        added++;
      }
    }

    // The page entry and the page's own h1 are frequently the same words; keep the
    // page entry, which links to the top and carries the Page label.
    if (entries.some((x) => x.p === pageIndex && x.t.toLowerCase() === en.toLowerCase())) return;
    entries.push({
      p: pageIndex,
      t: en,
      ...(bodyEn ? { b: bodyEn } : {}),
      ...(zh ? { zt: zh } : {}),
      ...(bodyZh ? { zb: bodyZh } : {}),
      u: page.url + (frag ? `#${frag}` : ''),
    });
  });

  // Splice into the ORIGINAL slice (offsets match: blanking preserved length), in
  // reverse order so each splice leaves the earlier offsets untouched.
  let patched = raw;
  for (const ins of inserts.sort((a, b) => b.at - a.at)) {
    patched = patched.slice(0, ins.at) + ins.text + patched.slice(ins.at);
  }
  const next = html.slice(0, mainStart) + patched + html.slice(mainEnd);
  if (next !== html) writeFileSync(path, next);
});

// Nothing should ever point at a duplicate anchor.
for (const page of PAGES) {
  const ids = [...readFileSync(join(ROOT, page.file), 'utf8').matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) throw new Error(`${page.file}: duplicate id(s) ${[...new Set(dupes)].join(', ')}`);
}

mkdirSync(dirname(OUT), { recursive: true });
const payload = { pages: PAGES.map(({ url, en, zh, veil }) => ({ u: url, en, zh, ...(veil ? { v: 1 } : {}) })), e: entries };
writeFileSync(OUT, JSON.stringify(payload));

const kb = (readFileSync(OUT).length / 1024).toFixed(1);
console.log(`search: ${entries.length} entries across ${PAGES.length} pages, ${added} heading id(s) added, ${kb} KB`);
