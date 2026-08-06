# Website Page System — how tisglobalinc.com is built

The extracted, buildable spec for the marketing site's page language. `index.html`
(the homepage) is the reference implementation; this document captures **everything**
about how it looks and behaves — spacing, type hierarchy, hero/nav/CTA treatment,
card patterns, imagery, motion, and overall page weight — so new pages match it
without eyeballing.

## 0. How to use this doc

**Source-of-truth chain.** The implemented visual truth is **`assets/styles.css`** —
`index.html` carries *zero* hex, *zero* CSS variables, and *zero* inline `<style>`; it
only links the stylesheet and applies classes. That is not incidental: the three pages
with no inline `<style>` are also the three with no token violations.

> Line numbers below are navigation aids, not contracts. They drift on every edit —
> grep for the selector, don't trust the number. Every value below is quoted from
`styles.css` / `site.js`, not re-derived.

- `assets/styles.css` + `assets/site.js` → **implemented truth** (what actually ships).
- **This doc** → the page-authoring reference: read it before building a new page.
- `../brand/*.md` (mirrored into `designs/*-snapshot.md`) → still owns **identity,
  logo, co-branding, badge, voice**. This doc does **not** restate those; it composes
  the tokens the snapshots define into page-level patterns.

This is **not** a mirror of `brand/*.md` — it sits one level above the page-scoped
[DESIGN.md](../DESIGN.md) (licensing landing page) and reuses its house format.

**Red line (from [website/CLAUDE.md](../CLAUDE.md)).** No invented colors, no inline
hex. Use the tokens in §1. The only sanctioned raw-hex exceptions are the
**pure `#000` / `#fff`** used on always-dark, image-backed surfaces (offer/report/
about/contact cards, announce bar, partner band) — see §1.3 and §7.

**Bilingual authoring pattern.** EN is the default DOM text; Traditional Chinese
lives in `data-zh` / `data-zh-html` attributes and is swapped by `site.js` on the
language toggle. Where EN and ZH need different line breaks in the same heading, use
`.lang-en-only` / `.lang-zh-only` spans (CSS at `styles.css:305`). Urbanist always
carries the Latin run; Noto Sans TC / PingFang TC sit in the fallback chain for CJK
code points only, so toggling `lang` never re-renders Latin glyphs in a CJK face.

> **Known upstream drift (do not inherit).** The jurisdiction ramp in
> `brand/design-tokens.md` has moved ahead of the shipped CSS (brand = US/TW/EU/JP/**CH**
> with teal EU; `styles.css` still ships US/TW/EU/JP/**KR** with slate EU, `--juris-*`
> at `styles.css:122`). The homepage uses no jurisdiction chips, so it is unaffected —
> but if a new page needs that ramp, source the values from `styles.css`, not the brand
> doc. The snapshots were resynced 2026-08-06; `styles.css` itself has **not** been
> migrated, so the CSS is the lagging side.

---

## 1. Foundations & tokens

Tokens live in three `:root`-level blocks in `styles.css`:

- **`:root, [data-theme="light"]`** — `styles.css:81–198` (the full light token set; `[data-theme="light"]` is hard-set on `<html>`).
- **`[data-theme="dark"]`** — `styles.css:201–267` (fully defined, not active by default).
- **spacing scale + the two font tokens `:root`** — `styles.css:348`.
- language-scoped asset-url overrides — `styles.css:288–301`.

### 1.1 Color tokens (light)

| Group | Token | Value |
|---|---|---|
| Surfaces | `--surface-page` | `#FFFFFF` |
| | `--surface-secondary` | `#FAFAFA` |
| | `--surface-tertiary` | `#F3F3F3` |
| | `--surface-quaternary` | `#EEEEEE` |
| | `--surface-inverse` | `#252525` |
| | `--surface-inverse-hover` | `#292524` |
| | `--surface-translucent` | `rgba(0,0,0,0.05)` |
| | `--surface-page-translucent` | `rgba(255,255,255,0.70)` |
| Text | `--text-primary` | `#252525` |
| | `--text-secondary` | `#474747` |
| | `--text-tertiary` | `#8A8F98` |
| | `--text-quaternary` | `#A5A5A5` |
| | `--text-inverse` | `#FFFFFF` |
| Borders | `--border-primary` | `#EEEEEE` |
| | `--border-secondary` | `#E8E8E8` |
| | `--border-tertiary` | `#D5D5D5` |
| | `--border-focus` | `#252525` |
| Signals | `--signal-active` | `#22C55E` |
| | `--signal-warning` | `#F59E0B` |
| | `--success-bg` / `--success-fg` | `#F0FDF4` / `#15803D` |

**Data ramps** (used by chips/dots, not by homepage marketing UI — source from `styles.css` when needed):
SABCD `--score-{s,a,b,c,d}` (`styles.css:112`) + vivid `--score-*-vivid` (`:131`, theme-independent, used for pillar gradients: s `#D4A017`, a `#10B981`, b `#0EA5E9`, c `#8B5CF6`, d `#F97316`); jurisdiction `--juris-*` (`:122`); bronze `--bronze-{light,mid,deep,darker}` (`:138`); slate primitives `--slate-{100,200,400,500,700,900}` (`:173`, feed the silver text-gradient).

**Shadows** (`styles.css:145`):
- `--shadow-low` `0 2px 4px rgba(0,0,0,0.06)`
- `--shadow-medium` `0 4px 24px rgba(0,0,0,0.08)`
- `--shadow-high` `0 7px 32px rgba(0,0,0,0.12)`
- `--shadow-stacked-low` — 5-layer near-flat stack (`:148`)

**Easing** (`styles.css:206`):
- `--ease-card` `cubic-bezier(0.16, 1, 0.3, 1)` — the primary reveal/hover/crossfade curve.
- `--ease-out` `cubic-bezier(0.23, 1, 0.32, 1)` — secondary (also redeclared locally on `.about-card`).

### 1.2 Global background — the graph-paper underlay

`body` (`styles.css:320`) paints a fixed **32px graph-paper grid** over `--surface-page`:
two `repeating-linear-gradient`s (0deg + 90deg) at `rgba(37,37,37,0.024)`, 1px line
every 32px, `background-attachment: fixed` so it reads as a steady viewport underlay.
Transparent sections show it through; solid sections (cards, footer, the black hero)
cover it. Base body type: `16px / line-height 1.6 / letter-spacing 0.01em`, antialiased.
`html { scroll-behavior: smooth; scroll-padding-top: 80px }`.

### 1.3 The pure-`#000`/`#fff` exception

Always-dark, image-backed surfaces use literal `#000` / `#0E0E0E` / `#fff` (not tokens)
so photographic/black-field imagery blends seamlessly and white copy stays legible in
*both* themes: `.offer-card` (`#0E0E0E`), `.about-card` / `.contact-panel .btn-primary`
(`#000`, hover `#1A1A1A`), `.report-card` scrim, the announce bar, the partner band.
These are the **only** sanctioned raw-hex literals outside the token table.

---

## 2. Typography

**Families** (all self-hosted `@font-face`, `font-display: swap`, from `/designs/assets/fonts/`):

- **Urbanist** — primary UI/display sans; 400/500/600/700.
- **Inconsolata** — mono; 400/500/600. **Numerals only** — see the rule below.
- **Noto Sans TC** — CJK; 400/500/600/700.

Use the tokens, never a literal stack — both are defined on `:root` in `styles.css`:

| Token | Value |
|---|---|
| `--font-sans` | `'Urbanist','Inter','Noto Sans TC','PingFang TC','Microsoft JhengHei',system-ui,sans-serif` |
| `--font-mono` | `'Inconsolata',ui-monospace,SFMono-Regular,Menlo,monospace` |

> ### Mono is never used on text.
>
> **Inconsolata is reserved for sectional numbering** — the `01` / `02` / `03` that
> index a section — plus numerals (prices, counts, percentages, scores, dates) and
> number-prefixed identifiers (`US 12051972 B2`, `LIC-12345`).
>
> **If a string reads as a word, it is `--font-sans`.** That includes eyebrows,
> labels, metadata, chips, tags, link text, status strings, column headers, form
> labels, and alphabetic codes — `S` / `A` / `B` / `C` / `D` tier letters and `US` /
> `TW` / `EP` jurisdiction letters included.
>
> Mixed content splits: `Save 10%` leads with a word, so it is sans. `NT$8,990` is
> sans-free — mono. When an eyebrow carries words rather than numerals, use
> `.offer-card-eyebrow--text`.
>
> This rule is upstream in [`brand/design-tokens.md`](../designs/design-tokens-snapshot.md) §3.
> It was violated for a long time because that file's own §7.2 defined `copy-mono-*`
> and `label-mono-*` roles that contradicted it. Those roles are now scoped to numerals.

**There are no numeric `--font-size-*` tokens** — every size is set per class. The full scale:

| Role | Class | Size | Weight | Line-height | Tracking | Notes |
|---|---|---|---|---|---|---|
| Display | `.h-display` | `clamp(40px,6vw,72px)` | 700 | 1.0 | −0.03em | `styles.css:398` |
| Section (full) | `.h-section` | `clamp(32px,4vw,48px)` | 700 | 1.1 | −0.02em | `:405` |
| Section (reduced) | `.offerings .h-section`, `.about-intro .h-section` | `clamp(24px,2.8vw,36px)` | 600 | 1.15 | −0.015em | `:414` — offerings/about adopt the smaller "Latest reports" hierarchy, not the full display scale |
| Hero title | `.pillar-title` | `clamp(40px,5vw,60px)` | 600 | 1.05 | −0.02em | white in hero; `em` = clipped gradient; `:1263` |
| Hero sub | `.pillar-sub` | `clamp(17px,1.5vw,20px)` | 450 | 1.4 | −0.01em | `max-width:52ch`; white 82% in hero; `:1282` |
| Eyebrow | `.eyebrow` | 12px | 500 | — | 0.10em | uppercase, **Urbanist**, tertiary, `margin 0 0 16px`; `:367` |
| Card title | `.offer-card-title` | 21px | 700 | 1.25 | −0.01em | white; about-card title = `clamp(19px,1.5vw,22px)` to match |
| Card desc | `.offer-card-desc` | 15px | 450 | 1.5 | — | white 82%; `min-height:4.5em` (reserves 3 lines) |
| Card eyebrow | `.offer-card-eyebrow` | 12px | 700 | — | 0.10em | uppercase **mono** — this is the sectional `01`/`02`/`03`, the one sanctioned mono use; white 72%. Words use `.offer-card-eyebrow--text` (Urbanist) |
| Card CTA | `.offer-card-more` | 13px | 600 | — | — | white |
| Nav link | `.topnav-link` | 14px | 600 | — | — | secondary; hover → `#000` |
| Button (default) | `.btn` | 12px | 700 | 1 | 0.10em | — |
| Button large | `.btn-lg` | 14px | 700 | 1 | 0.10em | — |

Head pattern within a section: **eyebrow (Urbanist 12px, 0.10em, uppercase, tertiary)
→ heading (`.h-section`) → dek (`.section-dek`, ~44ch)**. Chinese drops the negative
tracking per the existing TC handling.

---

## 3. Spacing, container & rhythm

**Container** (`styles.css:358`): `max-width:1440px; margin:0 auto; padding-inline:32px`
→ `20px` under 768px. Non-container blocks that must align with `.container` sections
(`.about-intro`, `.about-duo`, `.about-partners`) re-apply the same 1440/32/20 rule.

**Spacing scale** (`styles.css:371`) — a 3-tier ratio (~16 : 44 : 80) that encodes
hierarchy:

- `--space-section: clamp(28px,3vw,44px)` → `.section { padding-block }`, giving equal
  inter-section gaps (2× = ~56–88px).
- `--space-head-gap: clamp(32px,3.5vw,48px)` → title-block → content gap.

**Section cadence rules:**
- `.section--tight { padding-block: 32px }` (24px mobile).
- `.section--tight + .section { padding-block-start: 0 }` — a regular section following
  a tight one drops its top padding so the tight section (e.g. the partner strip) owns
  the full breathing room and the rhythm stays symmetric.

**Grid gaps** (per section): offerings `clamp(16px,1.6vw,24px)`; about-duo
`clamp(16px,1.8vw,28px)`; footer `48px 56px`; section-head `24px`; contact-row `16px`;
chips / contact-panel fields `8px`.

### 3.1 Breakpoints

**Reach for a scale value first.** These carry the most weight, so a new page that
uses them inherits behaviour that is already proven:

| Value | Queries using it | Reads as |
|---|---|---|
| `1100px` | 2 | wide desktop |
| `980px` (min `981px`) | 11 | desktop |
| `880px` (min `881px`) | 13 | small desktop / large tablet |
| `768px` (min `769px`) | 12 | tablet |
| `640px` | 10 | large phone |
| `560px` (min `561px`) | 12 | phone |
| `480px` | 4 | small phone |

Always `@media (max-width: 640px)` — one space after the colon, integer pixels, no
sub-pixel values. Prefer `max-width`; add a `min-width` companion only when a rule
genuinely needs the other side of the same edge, and use scale-value + 1 so the two
never overlap.

> **Do not "tidy" an existing breakpoint onto the scale.** Nine off-scale values are
> still in use — `1024` `920` `900` `820` `720` `700` `600` `520` `400` — and they are
> mostly *load-bearing*, not drift. Tested: collapsing `900px` → `880px` on the About
> and Signal pages made 881–900px render the two-column layout at ~230px per column,
> dropping body copy to six words a line. The `900px` edge exists because that layout
> needs 900px to breathe. A breakpoint value is a layout decision; migrating one means
> looking at the affected band, not matching a table.
>
> Custom properties **cannot** be used in a media condition —
> `@media (max-width: var(--bp-md))` does not work — so this scale stays a convention
> until a build step can compile it (see §Build).

---

## 4. Nav (topnav)

`.topnav` (`styles.css:455`): `position:fixed; z-index:100; height:64px`, background
`--surface-page-translucent`, `backdrop-filter: saturate(140%) blur(20px)`,
`border-bottom:1px solid --border-primary`. `.topnav-inner` is a flex row,
`height:100%`, `gap:32px`.

- **Logo** (`.topnav-logo`): Secondary mark, `height:28px`, `aspect-ratio` from the SVG
  viewBox (eng ≈8.75:1, ch ≈3.74:1), themed/lang-switched via `--logo-secondary`. Below
  640px it falls back to the square submark (`aspect-ratio:1/1`, `height:32px`).
- **Links** (`.topnav-link`): 14px/600, secondary color, centered, hover → `#000`
  (`#fff` in dark). The Products link is a `.has-dropdown` disclosure (chevron rotates
  180° when `aria-expanded="true"`) holding two `.product-card`s with lazy `<img>` media.
- **Controls cluster**: language globe + search (`.icon-btn`), then "Contact sales"
  primary CTA, then the mobile hamburger (`.topnav-mobile-trigger`, shown at narrow
  widths). The mobile drawer (`.mobile-drawer` + `.mobile-overlay`) mirrors the nav.

`main` reserves `padding-top` for the fixed 64px nav; `scroll-padding-top:80px` keeps
anchored jumps clear of it.

---

## 5. Hero

Full-viewport on the homepage, a layered z-stack with a WebGL shader and swappable
gradient backdrops.

**Container** (`.hero`, `styles.css:967`): base `height: clamp(460px,56vw,580px)`,
`overflow:hidden`, flex-centered, `background:#000` (fallback if WebGL fails).
**Homepage override** (`[data-page="home"] .hero`, `:993`): `height:auto;
min-height:calc(100dvh - 64px); padding-block:0` — the hero owns the first screen
minus the nav. On home the announce bar is lifted out of flow and absolutely overlaid
at `top:64px` (`z-index:90`) so it scrolls away with the page while only the nav pins.

**Z-stack (bottom → top):**

1. **`.hero::before` (z1)** — bloom + 32px ruled grid from `--hero-bp-bloom` (`:1005`).
2. **`.hero-warm` / `.hero-signal` / `.hero-silver` (z2)** — three swappable gradient
   backdrops (`:1018`, `:1048`, `:1085`), each `opacity:0`, crossfaded **480ms
   `--ease-card`** by `[data-active-pillar]` on `.hero` (`:1077`). Each carries its own
   `::before` 32px grid at `rgba(37,37,37,0.020)`. Colours: silver (positioning) =
   `--gradient-bg-silver-faded` (radial `#DCE5EF→#EAF0F7` + linear `#F1F5F9→#FFFFFF`);
   warm (licensing) = `#FFEAD0→#FFF4E6` over `#FFF7EE→#FFF`; signal = `#CFE9FB→#E6F4FF`
   over `#F2F9FF→#FFF`.
3. **`.hero-shader#hero-shader` (z2)** — the **shifting-lines WebGL fragment shader**
   (RGB chromatic sine lines on black), `three.js@0.160.0` imported from `esm.sh` as an
   inline ESM module in `index.html` (`SPEED=0.003`, DPR capped at 2, `RawShaderMaterial`).
   It mounts a `<canvas>`, adds `.is-ready` to crossfade in over **600ms** (`:1114`).
   On any failure the black `.hero` shows through. (The retired ShaderGradient sphere is
   gone — ignore stale "sphere" comments in the CSS.)
4. **`.hero-grid` (z3)** — faint 32px white grid `rgba(255,255,255,0.025)` over the shader.
5. **`.hero-inner` / `.pillar` (z5)** — foreground text.

**Foreground `.pillar`:** left-anchored (`align-items:flex-start`, `max-width:820px`,
`margin-left:32px`, `gap:14px`). `.pillar-title` white; `em` renders a clipped
gradient, re-themed per pillar (positioning = slate `--slate-500→700→900`; the default
`em` is gold→orange `linear-gradient(135deg,#D4A017,#F97316)`, `:1275`). `.pillar-sub`
white 82%, ≤52ch. `.pillar-actions` (`gap:12px`, `:1316`) holds a `btn-primary btn-lg`
+ a `btn-glass btn-lg` (see §6 for the in-hero re-skin). `.hero-scroll-cue` — decorative
chevron at `bottom:28px`, `hero-cue-bounce 2.2s` infinite.

**Reduced motion:** the shader renders a single static frame (time stops advancing),
the scroll cue stops bouncing, backdrop crossfades still resolve to the active slide.

---

## 6. CTAs / buttons

**Base `.btn`** (`styles.css:571`): `inline-flex` centered, `font-weight:700;
letter-spacing:0.10em; line-height:1; border-radius:12px`, transition `100ms linear`
on background/color/transform/box-shadow, `white-space:nowrap`, `:active { transform:
scale(0.95) }`. Touch: `min-height:44px` under `(pointer:coarse)`.

| Variant | Fill | Padding / size | Hover |
|---|---|---|---|
| `.btn-primary` | `--surface-inverse` (#252525), text inverse | `10px 18px`, 12px | `--surface-inverse-hover` |
| `.btn-ghost` | transparent, `--text-primary` | `10px 18px`, 12px | `--surface-tertiary` |
| `.btn-secondary` | `--surface-tertiary`, `--text-primary` | `18px 28px`, 14px | `--surface-quaternary` |
| `.btn-glass` | `--surface-page-translucent` + `backdrop-filter saturate(140%) blur(20px)` + `1px --border-primary` | (pair with `-lg`) | `--surface-secondary` |
| `.btn-lg` | (size modifier) | `18px 28px`, 14px, radius 12 | — |

**In-hero re-skin** (over the black shader, `styles.css:1324`):
- `.hero .btn-primary` → glass-on-dark: `rgba(0,0,0,0.45)` + blur + `1.25px
  rgba(255,255,255,0.26)` border, white text; hover `rgba(0,0,0,0.60)`.
- `.hero .btn-glass` → `rgba(255,255,255,0.10)` + `1.25px rgba(255,255,255,0.32)`
  border, white text; hover `rgba(255,255,255,0.17)`.
- `.hero .btn-secondary` → **gold→orange gradient** `linear-gradient(135deg,#D4A017,#F97316)`,
  white text, re-themed per pillar (signal = cool blue, positioning = slate; `:1148`,
  `:1178`); hover = same gradient `filter:brightness(0.92)`.

**Contact submit override** (`:4536`): `.contact-panel .btn-primary` uses pure `#000`
(hover `#1A1A1A`) to match the card's black field, not the global `#252525`.

---

## 7. Cards

All homepage cards share one recipe: **a dark base + a full-bleed image layer + a
bottom-up black legibility scrim + bottom-anchored white copy**, revealed on scroll and
lifted on hover. The scrim is theme-independent so copy reads in both themes.

**Shared scrim** (offer + report, `:7905` / `:3569`):
`linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.06) 80%)`.

| Card | Base | Min-height | Radius | Pad | Image layer | Hover |
|---|---|---|---|---|---|---|
| `.offer-card` `:7867` | `#0E0E0E` + `--shadow-medium` | `clamp(340px,42vw,432px)` | 18px | 28px | CSS `::before` bg photo (`/assets/imagery/coremap/*.jpg`), per-card `--img-rot` (reports flipped 180°), z −2 | `translateY(-2px)` + `--shadow-high`, image 1→1.06, arrow `translateX(4px)` |
| `.report-card` `:3556` | placeholder-radials + `--surface-tertiary`, `--shadow-stacked-low` | 420px | 18px | 28px | real `<img.report-card-media>` (`object-fit:cover`, z −2) | `translateY(-6px)` (transition 350ms), image 1→1.06 |
| `.about-card` `:3961` | `#000` + `1px rgba(255,255,255,0.08)` | `clamp(192px,18vw,232px)` | 20px | body `clamp(24px,2.6vw,40px)` | dot-cloud PNG bleeds right, masked left; text `max-width:56%` | `translateY(-2px)`, border → `rgba(255,255,255,0.16)` |
| `.content-card` `:3439` | white, `--shadow-stacked-low` | — | 16px | — | `translateY(-8px)` (generic; visible cards are offer/report) |

**Image reveal** (offer + report): image enters at `scale(1.08)` + `opacity:0`, settles
to `scale(1)` over **700ms `--ease-card`** when `.is-in` lands; hover then zooms to
`1.06` (gated on `.is-in` so it never fights the entry). `--img-rot` composes with both
zooms. Reduced motion: image just shows, no zoom.

**Chips & forms.** `.topic-chip` (`:4508`): `padding:8px 16px; border-radius:9999px;
1px --border-tertiary; 13px/600`, native radio visually hidden (`opacity:0; width:0`),
`:has(input:checked)` → filled `--surface-inverse` with `--text-inverse`, `:active
{ scale(0.97) }`, `:focus-within` outline. The mkt popup uses a `.brand-select` custom
listbox; the contact form pairs inquiry-type chips with the black-submit override (§6).

---

## 8. Footer

`.footer`: background `--surface-secondary`, `padding-block:68px`. `.footer-grid` =
`1.4fr 1fr 1fr 1fr`; `.footer-cols { display:contents }` dissolves the three link
columns into that parent grid. Contains: a newsletter block (44px input, arrow → check
success swap), the co-branded **TIS × Innovue** lockup (32px TIS submark + 1px×32px
divider + Innovue wordmark 103×36), and three link columns (Products / Company / Legal)
with 15px Lucide icons. A `.footer-baseline` band carries the centered
"© 2026 Talent Intelligence Strategies" over an inset hairline.

---

## 9. Imagery

- **Behind components** — the signature move: images sit *under* a bottom-up black
  scrim so white copy reads. Offer/contact cards use CSS `background-image` on `::before`;
  report/press cards use a real `<img>`. Per-card rotation via `--img-rot` (reports 180°).
  Contact left panel: `venture.jpg` under a top+bottom scrim (`rgba(0,0,0,0.45…0.55)`).
- **Dot-cloud bleed** — `.about-card` dot PNGs (`/assets/imagery/home/*-dots.png`) bleed
  off the right on a pure-black field, masked left with a `linear-gradient(90deg, #000
  0%, #000 18%, transparent 62%)` so the text half stays clean.
- **Partner logos** — CSS `background-image` from `--partner-*` SVG tokens, treated
  `grayscale(1) invert(1) brightness(1.4)` at `opacity:0.85` on the dark band, full
  colour on hover.
- **Lazy `<img>`** — nav/drawer product-card media set explicit `width`/`height` and use
  `loading="lazy" decoding="async"`. Global: `img { max-width:100%; height:auto }`,
  `object-fit:cover` on media.
- **Logos** are theme + language switched via `--logo-*` / `--partner-*` url() tokens
  (dark/light × eng/ch). OG/Twitter images + favicons are declared in `<head>`.

---

## 10. Motion & reveal

**Three motion techniques ship, not one.** All of them are sanctioned; the constraint
is *where* each is allowed and that each has a fallback.

| Technique | Where | Fallback |
|---|---|---|
| `IntersectionObserver` + CSS transitions (`site.js`) | every page — the default | `prefers-reduced-motion` shows the resolved state |
| GLSL / WebGL via `three.js@0.160.0` (esm.sh) | hero backdrops only (`index.html`, `about/`) | DPR capped at 2; reduced-motion renders one static frame; **must** hold on an opaque background of its own — see §5 |
| GSAP + ScrollTrigger (3-CDN fallback chain) | `product/licensing/index.html` only | reduced-motion branch required |

Prefer the observer. Reach for GSAP only when a timeline genuinely needs
scrub-linked sequencing, and never introduce a fourth library.

The scroll-reveal system below is the default and covers most needs.

- **`[data-reveal]`** (headings, deks, about cards, partner band): fade + 10px rise →
  `.is-revealed` transitions `opacity/transform` over **450ms `--ease-card`**; the dek
  trails the heading by **70ms**. Observer `threshold:0.12, rootMargin:'0px 0px -8% 0px'`
  (`site.js:420`).
- **`.offer-card` → `.is-in`**: image `scale(1.08)→1` + fade over 700ms, **staggered
  `i*90ms`** per card; `threshold:0.25` (`site.js:439`).
- **`.report-card` → `.is-in`**: same 700ms image reveal, per-carousel (not staggered).
- **Hover language** (`(hover:hover) and (pointer:fine)` only): cards lift
  (`-2/-6/-8px`) with a shadow step-up and image zoom to 1.06; nav links darken to
  `#000`; arrows translate; `.arrow-link`/`.contact-email`/`.contact-meta a` share a
  left-origin 1px underline wipe (`scaleX(0)→1`, 280ms `--ease-out`).
- **Partner marquee**: `@keyframes partner-scroll` translateX `0→-50%` over **45s
  linear infinite** (`styles.css:3085`), duplicated set for a seamless loop,
  `animation-play-state:paused` on hover, progressive-blur edge fades.
- **Crossfades**: hero backdrops 480ms, shader 600ms, theme swap 250ms, buttons ~100ms.
- **Counters**: `.counter[data-target]` count-up via `counterObserver` (`threshold:0.3`)
  — the stat block now lives on `/about/`, but the hook is available.

**Every effect has a `@media (prefers-reduced-motion: reduce)` fallback**: reveals show
instantly, image zooms are disabled, the marquee goes static, the shader renders one
frame, the scroll cue stops. Content is **never** hidden behind a never-firing transition.

---

## 11. Page rhythm & weight (buildable rules)

How the page *feels*, expressed as rules a new page must follow — not prose to admire:

1. **Alternate light ground with pure-black image cards.** The page is white/graph-paper
   with occasional bands of dense, near-black image cards (offerings, about, contact).
   That alternation is what gives the page its weight — light air, then a heavy anchored
   block, then air again. Don't fill a whole section with a colour wash; carry weight
   with a black card, not a coloured background.
2. **Left-anchored hero, everything else in the 1440 container.** The hero text hugs the
   left edge (`margin-left:32px`, ≤820px); body sections center in the container. One
   asymmetry (the hero), then order.
3. **One head pattern everywhere:** eyebrow → heading → dek, in that vertical order, with
   `--space-head-gap` before the content. Reduced-scale `.h-section` for offerings/about;
   full scale elsewhere.
4. **One accent family per context, rationed.** The warm gold→orange ramp (and its
   per-pillar swaps: signal cool, positioning slate) appears as a seal/foil — a single
   emphasized `em`, a gradient hero secondary CTA — never as a fill behind body text.
   Everything else is ink on white or white on black.
5. **Restraint in motion.** Reveals *enhance an already-visible default*; stagger only
   within a list, never one uniform reflex per section. Ease-out only, no bounce (the
   scroll cue is the single exception).
6. **Black mass is allowed** on image-backed cards and the hero — that's where the pure
   `#000`/`#fff` exception lives. Nowhere else.

---

## 12. New-page checklist

Run this when composing a new page so it stays consistent with the homepage:

1. **Chrome**: copy the locked `topnav` + `footer` + the `<head>` FOUC theme/lang guard
   verbatim from an existing page (chrome is duplicated per page — no shared include).
2. **Wrap** every section's content in `.container` (1440 / 32 / 20); use `.section`
   for cadence, `.section--tight` (+ the `+ .section` collapse) for embedded strips.
3. **Head pattern**: eyebrow (`.eyebrow`) → heading (`.h-section`, reduced scale for
   soft sections) → dek (`.section-dek`, ≤44ch).
4. **Color from tokens only** (§1). No inline hex except the sanctioned `#000`/`#fff` on
   image-backed dark cards.
5. **Type from tokens only**: `var(--font-sans)` / `var(--font-mono)`, never a literal
   font stack. Then read every mono string back — **if it reads as a word, it is sans**
   (§2). Eyebrows, labels, chips, tags, column heads, and tier / jurisdiction letters
   are all sans; mono is sectional numbering, numerals, and number-prefixed IDs.
6. **Cards**: reuse the base + image + scrim recipe (§7); don't invent a new card shell.
7. **Wire reveals**: add `[data-reveal]` to headings/deks and `.is-in` targets to image
   cards — `site.js` observers pick them up automatically.
8. **Reduced-motion parity**: any new transition needs a `prefers-reduced-motion` branch
   that shows the resolved state.
9. **Bilingual**: author EN in the DOM, ZH in `data-zh` / `data-zh-html`; use
   `.lang-en-only` / `.lang-zh-only` only where line breaks must differ.
10. **Verify locally**: `python3 -m http.server 8000` (root-relative paths need a server),
   check at 360 / 768 / 1280, light + dark, EN + ZH.
