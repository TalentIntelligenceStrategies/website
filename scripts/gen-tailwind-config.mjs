/**
 * Generate tailwind.config.js from the brand token snapshot.
 *
 * Why this exists: 21st.dev components arrive as React + Tailwind. Pasted verbatim,
 * `bg-blue-500` introduces a colour that is in no TIS ramp — which is how the site
 * accumulated 119 invented hexes the first time. So the default Tailwind palette is
 * REPLACED, not extended, and the familiar scale names are aliased onto TIS tokens.
 * A pasted `bg-blue-500` resolves to the Signal accent; `bg-fuchsia-400` resolves to
 * nothing and the component renders visibly unstyled, which is the intended failure.
 *
 * Source of truth chain:
 *   designs/design-tokens-snapshot.md §7.4  → token names + canonical hex
 *   assets/styles.css :root                 → which --vars actually resolve at runtime
 *
 * A token in §7.4 with no --var in styles.css is emitted as `var(--x, #HEX)`. Without
 * the fallback an unresolved var() invalidates the whole declaration and the value
 * silently falls back to inherited — the trap that cost a full session before.
 *
 * Run: npm run tokens
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SNAPSHOT = join(ROOT, 'designs/design-tokens-snapshot.md');
const STYLES = join(ROOT, 'assets/styles.css');
const OUT = join(ROOT, 'tailwind.config.js');

// ── 1. Parse §7.4 Semantic token map ──────────────────────────────────────────
const md = readFileSync(SNAPSHOT, 'utf8');
const from = md.indexOf('### 7.4 Semantic token map');
const to = md.indexOf('### 7.5');
if (from < 0 || to < 0) throw new Error('§7.4 / §7.5 not found — snapshot structure changed');

const tokens = new Map();
for (const line of md.slice(from, to).split('\n')) {
  const m = /^\| ([a-z0-9-]+) \| `([^`]+)`/.exec(line);
  if (m) tokens.set(m[1], m[2]);
}
if (tokens.size < 60) throw new Error(`only ${tokens.size} tokens parsed — check the table format`);

// ── 2. Which --vars actually exist in the shipped stylesheet ──────────────────
const css = readFileSync(STYLES, 'utf8');
const rootBlocks = [...css.matchAll(/(?::root|\[data-theme="light"\])[^{]*\{([\s\S]*?)\n\}/g)];
const defined = new Set();
for (const b of rootBlocks) for (const m of b[1].matchAll(/(--[a-z0-9-]+)\s*:/g)) defined.add(m[1]);

const unresolved = [];
/** Emit a Tailwind colour value for a §7.4 token name. */
function ref(name) {
  const v = `--${name}`;
  if (defined.has(v)) return `var(${v})`;
  const hex = tokens.get(name);
  unresolved.push(name);
  return hex && hex.startsWith('#') ? `var(${v}, ${hex})` : `var(${v})`;
}
const has = (n) => tokens.has(n);
const pick = (...names) => ref(names.find(has) ?? names[0]);

// ── 3. Build the palette ──────────────────────────────────────────────────────
const surface = {}, text = {}, border = {}, score = {}, juris = {}, status = {};
for (const name of tokens.keys()) {
  if (name.startsWith('surface-')) surface[name.slice(8)] = ref(name);
  else if (name.startsWith('text-')) text[name.slice(5)] = ref(name);
  else if (name.startsWith('border-')) border[name.slice(7)] = ref(name);
  else if (name.startsWith('score-')) score[name.slice(6)] = ref(name);
  else if (name.startsWith('juris-')) juris[name.slice(6)] = ref(name);
  else if (/^(success|warning|danger|info|signal)-/.test(name)) status[name] = ref(name);
}

// Aliases: the Tailwind scale names a pasted component is most likely to use, mapped
// onto the nearest TIS token. Anything not listed here does not exist — deliberately.
const alias = {
  blue: { 400: pick('surface-accent-signal'), 500: pick('surface-accent-signal'),
          600: pick('surface-accent-signal-text'), 700: pick('surface-accent-signal-text'),
          DEFAULT: pick('surface-accent-signal') },
  sky: { 400: pick('score-b-vivid'), 500: pick('score-b-vivid'), 600: pick('score-b'), DEFAULT: pick('score-b-vivid') },
  orange: { 400: pick('surface-accent-licensing'), 500: pick('surface-accent-licensing'),
            600: pick('surface-accent-licensing-text'), DEFAULT: pick('surface-accent-licensing') },
  red: { 500: pick('danger-border'), 600: pick('danger-fg'), 700: pick('danger-fg'), DEFAULT: pick('danger-fg') },
  green: { 500: pick('signal-active'), 600: pick('success-fg'), 700: pick('success-fg'), DEFAULT: pick('success-fg') },
  amber: { 500: pick('signal-warning'), 600: pick('warning-fg'), DEFAULT: pick('signal-warning') },
  violet: { 500: pick('score-c-vivid'), 600: pick('score-c'), DEFAULT: pick('score-c-vivid') },
  gray: { 50: pick('surface-secondary'), 100: pick('surface-tertiary'), 200: pick('surface-quaternary'),
          300: pick('border-tertiary'), 400: pick('text-quaternary'), 500: pick('text-tertiary'),
          600: pick('text-secondary'), 700: pick('text-secondary'), 800: pick('text-primary'),
          900: pick('text-primary'), 950: pick('text-primary') },
};
alias.slate = alias.gray;
alias.zinc = alias.gray;
alias.neutral = alias.gray;
alias.stone = alias.gray;
alias.indigo = alias.blue;
alias.cyan = alias.sky;
alias.emerald = alias.green;
alias.rose = alias.red;

// shadcn/ui semantic names. Nearly every 21st.dev component is built on shadcn, so its
// primitives arrive wearing `bg-card`, `text-muted-foreground`, `bg-primary`,
// `border-input`, `ring-ring`. None of those are TIS token names, so without this block
// they resolve to nothing and a ported card renders as unstyled text on the page ground.
// Mapped here once instead of hand-rewritten per component — the alias is the same kind
// of consumption-layer mapping as the scale names above, not a new token.
const semantic = {
  background: pick('surface-page'),
  foreground: pick('text-primary'),
  card: pick('surface-elevated'),
  'card-foreground': pick('text-primary'),
  popover: pick('surface-elevated'),
  'popover-foreground': pick('text-primary'),
  // The TIS primary action is near-black ink with inverse text (§6), not a brand hue.
  primary: pick('surface-inverse'),
  'primary-foreground': pick('text-inverse'),
  secondary: pick('surface-secondary'),
  'secondary-foreground': pick('text-secondary'),
  muted: pick('surface-tertiary'),
  'muted-foreground': pick('text-tertiary'),
  accent: pick('surface-tertiary'),
  'accent-foreground': pick('text-primary'),
  destructive: pick('danger-fg'),
  'destructive-foreground': pick('text-inverse'),
  input: pick('border-primary'),
  ring: pick('border-focus'),
};

// `border-border` is shadcn's hairline class, and borderColor.DEFAULT is what a bare
// `border` utility uses now that preflight (which used to supply it) is off.
border.DEFAULT = pick('border-primary');

const colors = {
  inherit: 'inherit', current: 'currentColor', transparent: 'transparent',
  // The §1.3 sanctioned exception — always-dark, image-backed surfaces only.
  black: '#000', white: '#fff',
  surface, text, border, score, juris, ...status, ...alias, ...semantic,
};

// ── 4. Non-colour scales, lifted from the shipped stylesheet ──────────────────
// Breakpoints are the §3.1 scale. Custom properties cannot be used in a media
// condition, so these are the one place the values are allowed to be literals.
const screens = { xs: '480px', sm: '560px', md: '640px', lg: '768px', xl: '880px', '2xl': '980px', '3xl': '1100px' };

const banner = `/**
 * GENERATED — do not edit by hand. Run \`npm run tokens\` to regenerate.
 * Source: designs/design-tokens-snapshot.md §7.4 + assets/styles.css :root
 *
 * Red line (DESIGN.md §0.1): the CSS custom properties in styles.css are
 * authoritative. This file is a consumption layer — on conflict, the stylesheet wins.
 *
 * The default Tailwind palette is REPLACED, not extended. Scale names such as
 * blue/slate/gray, and the shadcn/ui semantic names (card, muted, primary, ring…),
 * are aliased onto TIS tokens so a pasted 21st.dev component cannot introduce a colour
 * that is in no TIS ramp. A name that is not mapped here does not exist, and the
 * component will render visibly unstyled rather than off-brand.
 *
 * Preflight is off; src/islands/tailwind.css carries a [data-island]-scoped reset in
 * its place. See DESIGN.md §15.3.
 */`;

const body = `${banner}
/** @type {import('tailwindcss').Config} */
export default {
  // ISLAND SOURCES ONLY. The hand-authored pages must never be scanned, and this is not a
  // performance note — it is the same class of leak as preflight was.
  //
  // Tailwind generates a utility for any string in a scanned file that matches a utility
  // pattern, and emits it UNSCOPED. The pages carry class names that collide: the site's
  // own \`.container\` matches Tailwind's container plugin, so islands.css shipped
  // \`.container{max-width:1100px}\` and the first page to load it had its whole layout
  // pulled in by ~90px a side. \`.h-section\` collided too (a height utility, via the
  // \`spacing.section\` extension below), and so did \`.text-secondary\`, \`.hidden\`,
  // \`.visible\`, \`.block\`, \`.flex\`, \`.uppercase\` and a few dozen more.
  //
  // Islands are authored in src/islands/. If you ever want Tailwind classes inside a
  // hand-authored page, that is a §15.3 conversation, not a glob edit.
  content: [
    './src/islands/**/*.{js,jsx,ts,tsx}',
  ],
  // No dark: variant — theming is done with [data-theme] on <html>, driven by the
  // CSS custom properties. A Tailwind dark: class would be a second, competing system.
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    screens: ${JSON.stringify(screens, null, 6).replace(/\n/g, '\n    ')},
    colors: ${JSON.stringify(colors, null, 6).replace(/\n/g, '\n    ')},
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      boxShadow: {
        low: 'var(--shadow-low)',
        medium: 'var(--shadow-medium)',
        high: 'var(--shadow-high)',
        'stacked-low': 'var(--shadow-stacked-low)',
      },
      transitionTimingFunction: {
        card: 'var(--ease-card)',
        out: 'var(--ease-out)',
      },
      maxWidth: { container: '1440px' },
      spacing: { section: 'var(--space-section)', 'head-gap': 'var(--space-head-gap)' },
    },
  },
  corePlugins: {
    // The site's own graph-paper underlay owns the page background gradient.
    // Tailwind gradient utilities are off: gradients were retired 2026-08-06
    // (design-tokens.md §7.5) and this is where they would creep back in.
    backgroundImage: false,
    // Preflight is a GLOBAL reset — margin: 0 on everything, list-style: none,
    // h1..h6 { font-size: inherit }. The 11 pages are hand-authored and styled by
    // assets/styles.css, so the first page to load islands.css would have had all of
    // its markup silently restyled. The replacement is the [data-island]-scoped reset
    // in src/islands/tailwind.css, which must stay in step with this (DESIGN.md §15.3).
    preflight: false,
  },
  plugins: [],
};
`;

writeFileSync(OUT, body);

console.log(`tailwind.config.js written — ${tokens.size} §7.4 tokens, ${defined.size} vars live in styles.css`);
if (unresolved.length) {
  const uniq = [...new Set(unresolved)].sort();
  console.log(`\n  ${uniq.length} token(s) are in §7.4 but have no --var in styles.css.`);
  console.log(`  Emitted as var(--x, #hex) so they resolve, but the stylesheet is the lagging side:`);
  for (const u of uniq) console.log(`    --${u}  →  ${tokens.get(u)}`);
}
