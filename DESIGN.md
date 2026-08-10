# DESIGN.md — how tisglobalinc.com is built

The single design authority for this repo. `index.html` (the homepage) is the reference
implementation; this document captures **everything** about how the site looks and
behaves — tokens, spacing, type hierarchy, hero/nav/CTA treatment, card patterns,
imagery, motion, page weight, principles and accessibility — so a new page matches it
without eyeballing.

## 0. How to use this doc

### 0.1 The red line — who owns what

Exactly two documents are authoritative for this repo. Nothing else is.

| Authority | Owns | Where |
|---|---|---|
| `brand/` (mirrored here as `designs/*-snapshot.md`) | tokens, colour, logo, co-branding, badge, imagery rules, **voice** | [designs/](designs/) — read-only |
| **This file** | layout, spacing, type hierarchy, chrome, cards, CTA, motion, page rhythm, per-page notes | `DESIGN.md` |

- `designs/*` are **read-only mirrors**. Never author there. To change a token or an
  identity rule: edit upstream in `../brand/`, resync the matching `*-snapshot.md`,
  *then* regenerate the rendered CSS/HTML.
- This file does **not** restate brand rules; it composes the tokens the snapshots
  define into page-level patterns.
- [documents/](documents/) holds **copy and script material only** — PRDs, copy audits,
  storyboards, review tools. Nothing in there is a design authority.
- [PRODUCT.md](PRODUCT.md) holds the product register (surface, user, purpose). It is
  not a design authority either; the strategic direction that used to live there is
  §13 below.

### 0.2 Implemented truth vs. spec

The implemented visual truth is **`assets/styles.css`**. Where this document and the
stylesheet disagree, the stylesheet is what ships — fix the document.

- `assets/styles.css` + `assets/site.js` → **implemented truth**.
- **This doc** → the page-authoring reference: read it before building a new page.

> Line numbers below are navigation aids, **not contracts**. They drift on every edit —
> grep for the selector, don't trust the number. Every value below is quoted from
> `styles.css` / `site.js`, not re-derived.

### 0.3 No page-local `<style>` blocks

New pages compose from `styles.css`. A page-local `<style>` block is where drift and
dead CSS accumulate unaudited, and the correlation is not subtle:

| | inline `<style>` blocks | outcome |
|---|---|---|
| `index.html`, `product/signal/methodology.html` | 0 | 0 gradients, 0 mono violations, 0 raw hex |
| `product/signal/index.html` | 1 | audited exception — 63 classes, zero dead rules (see §16.2) |
| `product/licensing/index.html` | 2 | 114 hex literals; **59%** of its inline CSS was dead |

The `product/signal/index.html` row is the one sanctioned exception, and it earned that
standing by audit, not by age — the page it replaced carried the same single block with
**29% of its inline CSS dead**.

The mechanism: 21st.dev components arrive as React + Tailwind and get hand-transliterated,
so each one is re-derived in a different idiom instead of reusing the one that exists.

**Rule.** If a pattern is reusable, it belongs in `styles.css`. If it is genuinely
one-off, it may stay inline — but say so in a comment that names the page and the reason.
An inline block with no such comment is treated as drift and is deleted on the next sweep.

### 0.4 Bilingual authoring pattern

EN is the default DOM text; Traditional Chinese lives in `data-zh` / `data-zh-html`
attributes and is swapped by `site.js` on the language toggle. Urbanist always carries
the Latin run; Noto Sans TC / PingFang TC sit in the fallback chain for CJK code points
only, so toggling `lang` never re-renders Latin glyphs in a CJK face.

Never invent Chinese — EN is the visible fallback where ZH is pending.

> **`.lang-en-only` / `.lang-zh-only` do not exist.** Earlier versions of this spec
> claimed CSS for them. There is none, in `styles.css` or in any page. Where EN and ZH
> need different line breaks in the same heading, solve it in `data-zh-html`.

> **Known upstream drift (do not inherit).** The jurisdiction ramp in
> `brand/design-tokens.md` has moved ahead of the shipped CSS (brand = US/TW/EU/JP/**CH**
> with teal EU; `styles.css` still ships US/TW/EU/JP/**KR** with slate EU, `--juris-*`
> at `styles.css:140`). The homepage uses no jurisdiction chips, so it is unaffected —
> but if a new page needs that ramp, source the values from `styles.css`, not the brand
> doc. `styles.css` is the lagging side and has not been migrated.

---

## 1. Foundations & tokens

Tokens live in `:root`-level blocks in `styles.css`:

- **`:root, [data-theme="light"]`** — the full light token set (`[data-theme="light"]`
  is hard-set on `<html>`).
- **`[data-theme="dark"]`** — fully defined, not active by default.
- **spacing scale + the two font tokens** — a second `:root` block near `.container`.
- language-scoped asset-url overrides.

### 1.1 Colour tokens (light)

| Group | Token | Value |
|---|---|---|
| Surfaces | `--surface-page` | `#FFFFFF` |
| | `--surface-secondary` | `#FAFAFA` |
| | `--surface-tertiary` | `#F3F3F3` |
| | `--surface-quaternary` | `#EEEEEE` |
| | `--surface-elevated` | `#FFFFFF` |
| | `--surface-recessed` | `#E9E9EC` — the tray a card sits *in*; counterpart to `-elevated` |
| | `--surface-inverse` | `#252525` |
| | `--surface-inverse-hover` | `#292524` |
| | `--surface-inverse-hover-lift` | `#3A3A3A` — see §6 |
| | `--surface-translucent` | `rgba(0,0,0,0.05)` |
| | `--surface-inverse-translucent` | `rgba(255,255,255,0.10)` |
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
| | `--danger-border` / `--danger-border-wash` | `#C0392B` / `rgba(192,57,43,0.055)` — **edges only**, never type |

### 1.2 Surface accents — one flat accent per surface

The three-gradient pillar system was retired 2026-08-06 (`design-tokens.md` §7.5) and
replaced by flat per-surface accents. **There is no gradient accent left on this site.**

| Token | Value | Use |
|---|---|---|
| `--surface-accent-licensing` | `#EC4200` | 3.93:1 on white — large text / UI chrome only |
| `--surface-accent-licensing-text` | `#D93B00` | 4.59:1 on white — body copy |
| `--surface-accent-signal` | `#0EA5E9` | 2.77:1 on white — **dark surfaces only** |
| `--surface-accent-signal-text` | `#0A72B0` | 5.19:1 on white — body copy |
| `--surface-accent-licensing-wash` | `#F1EDE7` | pale warm tint — hover/rest fills |
| `--surface-accent-signal-wash` | `#EEF3F7` | pale cool tint — hover/rest fills |
| `--surface-accent-tis` | `#252525` | TIS overall carries no colour of its own — neutral ink |

Accents are held **off** the SABCD ramp so a surface accent never reads as a tier chip.
Pick the `-text` variant for anything at body size; the vivid values miss AA.

**Data ramps** (chips/dots — they encode real data, never decoration):
SABCD `--score-{s,a,b,c,d}` + `--score-*-bg` tinted pairs; vivid `--score-*-vivid`
(theme-independent: s `#D4A017`, a `#10B981`, b `#0EA5E9`, c `#8B5CF6`, d `#F97316`);
jurisdiction `--juris-*` + `-bg`; `--bronze-mid` `#B8965A`; slate primitives
`--slate-{100,200,400,500,700,900}`.

**Partner brand colours** are externally owned, carry the `-brand-` infix
(`--partner-brand-ipic` `#00AAEA`, `-iii` `#14156D`, `-nycu` `#0033A0`), and appear only
on that partner's own seal or lockup — never as a TIS accent.

> **Token-name trap.** `--partner-<name>` *without* the `-brand-` infix is a **logo
> asset `url()`**, not a colour. Feeding one to `fill` or `background-color` fails
> silently.

**Shadows:** `--shadow-low` `0 2px 4px rgba(0,0,0,0.06)`; `--shadow-medium`
`0 4px 24px rgba(0,0,0,0.08)`; `--shadow-high` `0 7px 32px rgba(0,0,0,0.12)`;
`--shadow-stacked-low` — a 5-layer near-flat stack.

**Easing:** `--ease-card` `cubic-bezier(0.16, 1, 0.3, 1)` — the primary
reveal/hover/crossfade curve. `--ease-out` `cubic-bezier(0.23, 1, 0.32, 1)` — secondary
(also redeclared locally on `.about-card`). **Refer to these by token name.** Calling
`(0.16,1,0.3,1)` "ease-out" in a spec is how the two got swapped in the first place.

### 1.3 The pure-`#000`/`#fff` exception

Always-dark, image-backed surfaces use literal `#000` / `#0E0E0E` / `#fff` (not tokens)
so photographic/black-field imagery blends seamlessly and white copy stays legible in
*both* themes: `.offer-card` (`#0E0E0E`), `.about-card` / `.contact-panel .btn-primary`
(`#000`, hover `#1A1A1A`), `.report-card` scrim, the announce bar, the partner band, and
the hero's in-hero CTA re-skin (§6).

In `styles.css` these are the **only** sanctioned raw-hex literals outside the token
blocks. The count of unique invented hex in the stylesheet is **0**.

### 1.3.1 Frozen one-off decoration (page-inline)

A second, closed list. These are literals inside a page's `<style>` block that are
**deliberately not tokens**, and the reason is the same in every case:

> A token can be retuned later, and retuning it would silently change a piece of
> decoration that was tuned by eye for one composition. A literal is frozen. These are
> decoration, used once, on one page, and they are meant to stay exactly where they are.

Anything not on this list is a violation.

| Page | Literal | What it is |
|---|---|---|
| `patents/` | `#E6E8EC` | `.lamp-glow` — the blurred glow core behind the hero lamp sweep |
| `patents/` | `#F2F3F5` | `.lamp-line` — the 2px resolve line the lamp animates open |
| `patents/` | `#ECECEC` | `--pat-ground` — drafting-paper ground for the blueprint marquee cards; deliberately off-white so the strip doesn't glare against the black page |
| `patents/` | `#17130E` | blueprint overlay ink (name + sub-pill), 2 uses |
| `patents/` | `#0A0A0A` | `.pat-modal` shell — near-black, one step off the `#000` blueprint ground so the modal edge reads |
| `product/signal/index.html` | `#0369A1` | page-local `--sig-blue-deep`. Equals light-theme `--score-b`, but the token flips to `#38BDF8` in dark and this page needs it fixed |

> Retired 2026-08-10: this page also carried an ink literal twice, for a white hover fill
> over an always-dark panel. The 2026-08-10 proof-grid recomposition moved that CTA onto a
> wash ground where `.btn-primary` needs no re-skin, so both uses are gone. The list is
> closed, so an entry that no longer exists is removed rather than left to rot.

**One that is not a colour literal at all:** `patents/index.html` has
`[fill="#FCFAF4"]` — an **attribute selector** matching SVG content emitted by the page's
own drawing code. Tokenizing it breaks the selector. Leave it.

### 1.4 Global background — the graph-paper underlay

`body` paints a fixed **32px graph-paper grid** over `--surface-page`: two
`repeating-linear-gradient`s (0deg + 90deg) at `rgba(37,37,37,0.024)`, 1px line every
32px, `background-attachment: fixed` so it reads as a steady viewport underlay.
Transparent sections show it through; solid sections (cards, footer, the black hero)
cover it. Base body type: `16px / line-height 1.6 / letter-spacing 0.01em`, antialiased.
`html { scroll-behavior: smooth; scroll-padding-top: 80px }`.

---

## 2. Typography

**Families** (all self-hosted `@font-face`, `font-display: swap`, from `/designs/assets/fonts/`):

- **Urbanist** — primary UI/display sans; 400/500/600/700.
- **Inconsolata** — mono; 400/500/600. **Numerals only** — see the rule below.
- **Noto Sans TC** — CJK; 400/500/600/700.

Use the tokens, never a literal stack:

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
> This rule is upstream in [`design-tokens-snapshot.md`](designs/design-tokens-snapshot.md) §3.
> It was violated for a long time because that file's own §7.2 defined `copy-mono-*`
> and `label-mono-*` roles that contradicted it. Those roles are now scoped to numerals.
> Live mono selectors in `styles.css`: **7**, all numerals.

**There are no numeric `--font-size-*` tokens** — every size is set per class. The full scale:

| Role | Class | Size | Weight | Line-height | Tracking | Notes |
|---|---|---|---|---|---|---|
| Section (full) | `.h-section` | `clamp(32px,4vw,48px)` | 700 | 1.1 | −0.02em | the display step on this site |
| Section (reduced) | `.offerings .h-section`, `.about-intro .h-section` | `clamp(24px,2.8vw,36px)` | 600 | 1.15 | −0.015em | offerings/about adopt the smaller "Latest reports" hierarchy |
| Hero title | `.pillar-title` | `clamp(40px,5vw,60px)` | 600 | 1.05 | −0.02em | white in hero; `em` = **flat accent**, see §5 |
| Hero eyebrow | `.pillar-eyebrow` | 16px | 600 | — | 0.02em | `--text-primary`; overridden to `#fff` on the licensing/signal heroes; `:empty` collapses in ZH |
| Hero sub | `.pillar-sub` | `clamp(17px,1.5vw,20px)` | 450 | 1.4 | −0.01em | `max-width:52ch`; white 82% in hero |
| Eyebrow | `.eyebrow` | 12px | 500 | — | 0.10em | uppercase, **Urbanist**, `--text-secondary`, `margin 0 0 16px`. See the note below — no live page uses it |
| Card title | `.offer-card-title` | 21px | 700 | 1.25 | −0.01em | white; about-card title = `clamp(19px,1.5vw,22px)` to match |
| Card desc | `.offer-card-desc` | 15px | 450 | 1.5 | — | white 82%; `min-height:4.5em` (reserves 3 lines) |
| Card eyebrow | `.offer-card-eyebrow` | 12px | 700 | — | 0.10em | uppercase **mono** — the sectional `01`/`02`/`03`, the one sanctioned mono use; white 72%. Words use `.offer-card-eyebrow--text` (Urbanist) |
| Card CTA | `.offer-card-more` | 13px | 600 | — | — | white |
| Nav link | `.topnav-link` | 14px | 600 | — | — | secondary; hover → `#000` |
| Button (default) | `.btn` | 12px | 700 | 1 | 0.10em | — |
| Button large | `.btn-lg` | 14px | 700 | 1 | 0.10em | — |

> **`.h-display` no longer exists.** It was removed with the 827 dead rules in the
> `styles.css` purge. `.h-section` is the top of the scale. Don't reintroduce it.

Head pattern within a section: **heading (`.h-section` or `.section-head h2`) → dek
(`.section-dek`, ~44ch)**, with an optional `.eyebrow` above. Chinese drops the negative
tracking per the existing TC handling. `text-wrap: balance` on headings, `pretty` on prose.

> **The eyebrow is optional, and today it is unused.** `.section-head` ships `h2` + dek
> on every live page; the count of standalone `.eyebrow` elements site-wide is **0**.
> Earlier versions of this spec described eyebrow → heading → dek as the pattern
> "everywhere," which was never true of the shipped pages. Treat it as available, not
> required — and if you use it, note that it was retinted to `--text-secondary`:
> `--text-tertiary` `#8A8F98` at 12px measures **3.25:1** on white, under the AA floor,
> and `design-tokens.md` §5 already declares that token UI/decorative-only.

---

## 3. Spacing, container & rhythm

**Container:** `max-width:1440px; margin:0 auto; padding-inline:32px` → `20px` under
768px. Non-container blocks that must align with `.container` sections (`.about-intro`,
`.about-duo`, `.about-partners`) re-apply the same 1440/32/20 rule.

**Spacing scale** — a 3-tier ratio (~16 : 44 : 80) that encodes hierarchy:

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

8px is the base unit. Group tightly within a beat, separate generously between sections.

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
> `@media (max-width: var(--bp-md))` does not work, so this scale stays a convention in
> `styles.css`, not a token set.
>
> The build layer (§15) does **not** change that. It compiles the islands' Tailwind, where
> the same seven values are real named breakpoints (`xs`…`3xl` in `tailwind.config.js`) —
> but `styles.css` is still hand-authored and served as-is, so its media queries stay
> literal. Compiling the stylesheet too would mean putting the site's only CSS behind the
> build, which is a much larger change than the island boundary and is not planned.
> **Keep the two in sync by hand if you touch either.**

---

## 4. Nav (topnav)

`.topnav`: `position:fixed; z-index:100; height:64px`, background
`--surface-page-translucent`, `backdrop-filter: saturate(140%) blur(20px)`,
`border-bottom:1px solid --border-primary`. `.topnav-inner` is a flex row,
`height:100%`, `gap:32px`.

- **Logo** (`.topnav-logo`): Secondary mark, `height:28px`, `aspect-ratio` from the SVG
  viewBox (eng ≈8.75:1, ch ≈3.74:1), themed/lang-switched via `--logo-secondary`. Below
  640px it falls back to the square submark (`aspect-ratio:1/1`, `height:32px`).
- **Links** (`.topnav-link`): 14px/600, secondary colour, centered, hover → `#000`
  (`#fff` in dark). The Products link is a `.has-dropdown` disclosure (chevron rotates
  180° when `aria-expanded="true"`) holding two `.product-card`s with lazy `<img>` media.
- **Controls cluster**: language globe + search (`.icon-btn`), then "Contact sales"
  primary CTA, then the mobile hamburger (`.topnav-mobile-trigger`, shown at narrow
  widths). The mobile drawer (`.mobile-drawer` + `.mobile-overlay`) mirrors the nav.

`main` reserves `padding-top` for the fixed 64px nav; `scroll-padding-top:80px` keeps
anchored jumps clear of it.

Chrome is **duplicated per page** — there is no shared include. A nav or footer change
means editing every page file.

---

## 5. Hero

Full-viewport on the homepage; a layered z-stack over a WebGL shader on a black field.

**Container** (`.hero`): base `height: clamp(460px,56vw,580px)`, `overflow:hidden`,
flex-centered, `background:#000`. That black is **load-bearing** — it is the fallback if
WebGL or esm.sh fail and the canvas never mounts. Nothing opaque may sit between it and
the shader.

**Homepage override** (`[data-page="home"] .hero`): `height:auto;
min-height:calc(100dvh - 64px); padding-block:0` — the hero owns the first screen minus
the nav. On home the announce bar is lifted out of flow and absolutely overlaid at
`top:64px` (`z-index:90`) so it scrolls away with the page while only the nav pins.

**Z-stack (bottom → top):**

1. **`.hero::before` (z1)** — bloom + 32px ruled grid from `--hero-bp-bloom`.
   `.hero::after` is retired (`content: none`).
2. **`.hero-warm` / `.hero-signal` / `.hero-silver` (z2)** — three swappable slide
   layers, each `opacity:0`, crossfaded **480ms `--ease-card`** by `[data-active-pillar]`
   on `.hero`. **They carry no background.** The per-pillar gradient washes were retired
   2026-08-06; each layer survives purely as the positioned carrier for its own 32px
   ruled-grid `::before` (`rgba(37,37,37,0.020)`, white at `0.025` in dark) and, on
   product pages, the full-bleed static hero image.
3. **`.hero-shader#hero-shader` (z2)** — the **shifting-lines WebGL fragment shader**
   (RGB chromatic sine lines on black), `three.js@0.160.0` imported from `esm.sh` as an
   inline ESM module in `index.html` (`SPEED=0.003`, DPR capped at 2, `RawShaderMaterial`).
   It mounts a `<canvas>`, adds `.is-ready` to crossfade in over **600ms**. On any
   failure the black `.hero` shows through. (Ignore stale "sphere" comments in the CSS —
   the ShaderGradient sphere is gone.)
4. **`.hero-grid` (z3)** — faint 32px white grid `rgba(255,255,255,0.025)` over the shader.
   **Not present on the signal page**, where it would cross the glow band — see §16.
5. **`.hero-inner` / `.pillar` (z5)** — foreground text.

**Foreground `.pillar`:** left-anchored (`align-items:flex-start`, `max-width:820px`,
`margin-left:32px`, `gap:14px`) — the 32px offset matches `.innovue-collab-card`'s
padding so the two left edges line up. `.pillar-title` white; `.pillar-sub` white 82%,
≤52ch. `.pillar-actions` (`gap:12px`) holds a `btn-primary btn-lg` + a `btn-glass btn-lg`
(see §6 for the in-hero re-skin). `.hero-scroll-cue` — decorative chevron at
`bottom:28px`, `hero-cue-bounce 2.2s` infinite.

**`.pillar-title em` is a flat accent, not clipped gradient.** Per pillar:
signal → `--surface-accent-signal`; licensing → `--surface-accent-licensing`;
positioning → `--slate-200` (TIS overall carries no colour, so the silver register is the
light end of the slate ramp). Each also sets `font-style: normal` and
`-webkit-text-fill-color` to clear the inherited fill. `background-clip: text` is **0
site-wide** — do not reintroduce it.

**Reduced motion:** the shader renders a single static frame (time stops advancing),
the scroll cue stops bouncing, backdrop crossfades still resolve to the active slide.

---

## 6. CTAs / buttons

**Base `.btn`:** `inline-flex` centered, `font-weight:700; letter-spacing:0.10em;
line-height:1; border-radius:12px`, transition `100ms linear` on
background/color/transform/box-shadow, `white-space:nowrap`, `:active { transform:
scale(0.95) }`. Touch: `min-height:44px` under `(pointer:coarse)`.

| Variant | Fill | Padding / size | Hover |
|---|---|---|---|
| `.btn-primary` | `--surface-inverse` (#252525), text inverse | `10px 18px`, 12px | `--surface-inverse-hover` |
| `.btn-secondary` | `--surface-tertiary`, `--text-primary` | `18px 28px`, 14px | `--surface-quaternary` |
| `.btn-glass` | `--surface-page-translucent` + `backdrop-filter saturate(140%) blur(20px)` + `1px --border-primary` | (pair with `-lg`) | `--surface-secondary` |
| `.btn-lg` | (size modifier) | `18px 28px`, 14px, radius 12 | — |

> **`.btn-ghost` no longer exists** in `styles.css` — it survives only in a
> product-shot showcase file with its own CSS. Don't cite it as a site variant.

**In-hero re-skin** (over the black shader):
- `.hero .btn-primary` → glass-on-dark: `rgba(0,0,0,0.45)` + blur + `1.25px
  rgba(255,255,255,0.26)` border, white text; hover `rgba(0,0,0,0.60)` + border `0.42`.
- `.hero .btn-glass` → `rgba(255,255,255,0.10)` + `1.25px rgba(255,255,255,0.32)`
  border, white text; hover `rgba(255,255,255,0.17)`.
- `.hero .btn-secondary` → **flat light fill**, `--slate-200` on `--slate-900`, one
  treatment for every surface; hover `--slate-400`, `filter:none`. Dark theme swaps to
  `--slate-700` on `--slate-100`.
  This was a per-pillar gradient fill (warm / cool / slate) until 2026-08-06. The accents
  can't carry button text at AA on a dark hero — `#EC4200` is 3.9:1 against both white
  and ink — so the CTA takes the high-contrast light fill and the accent stays reserved
  for text emphasis.

**Two hovers, one reason.** `--surface-inverse-hover` (`#292524`) is imperceptible
against a `#252525` rest state on dark or image-backed surfaces. Those use
`--surface-inverse-hover-lift` (`#3A3A3A`) instead. On light grounds, keep the standard.

**Contact submit override:** `.contact-panel .btn-primary` uses pure `#000` (hover
`#1A1A1A`) to match the card's black field, not the global `#252525`.

---

## 7. Cards

All homepage cards share one recipe: **a dark base + a full-bleed image layer + a
bottom-up black legibility scrim + bottom-anchored white copy**, revealed on scroll and
lifted on hover. The scrim is theme-independent so copy reads in both themes.

**Shared scrim** (offer + report):
`linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.06) 80%)`.

| Card | Base | Min-height | Radius | Pad | Image layer | Hover |
|---|---|---|---|---|---|---|
| `.offer-card` | `#0E0E0E` + `--shadow-medium` | `clamp(340px,42vw,432px)` | 18px | 28px | CSS `::before` bg photo (`/assets/imagery/coremap/*.jpg`), per-card `--img-rot` (reports flipped 180°), z −2 | `translateY(-2px)` + `--shadow-high`, image 1→1.06, arrow `translateX(4px)` |
| `.report-card` | `--bg-placeholder-radials` + `--surface-tertiary`, `--shadow-stacked-low` | 420px | 18px | 28px | real `<img.report-card-media>` (`object-fit:cover`, z −2) | `translateY(-6px)` (transition 350ms), image 1→1.06 |
| `.about-card` | `#000` + `1px rgba(255,255,255,0.08)` | `clamp(192px,18vw,232px)` | 20px | body `clamp(24px,2.6vw,40px)` | dot-cloud PNG bleeds right, masked left; text `max-width:56%` | `translateY(-2px)`, border → `rgba(255,255,255,0.16)` |
| `.patent-card` | `--surface-recessed` tray (radius 18, pad 5) holding a white `.scard-core` (radius 13, pad 15) | — | 18 / 13 | 5 / 15 | none — data card (tier chip + jurisdiction chip + mono patent number) | `translateY(-3px)`, 3-layer shadow step-up, 700ms |

> **`.content-card` no longer exists** — removed in the dead-rule purge. The visible
> cards are offer / report / about / patent.

**Image reveal** (offer + report): image enters at `scale(1.08)` + `opacity:0`, settles
to `scale(1)` over **700ms `--ease-card`** when `.is-in` lands; hover then zooms to
`1.06` (gated on `.is-in` so it never fights the entry). `--img-rot` composes with both
zooms. Reduced motion: image just shows, no zoom.

**Chips & forms.** `.topic-chip`: `padding:8px 16px; border-radius:9999px;
1px --border-tertiary; 13px/600`, native radio visually hidden (`opacity:0; width:0`),
`:has(input:checked)` → filled `--surface-inverse` with `--text-inverse`, `:active
{ scale(0.97) }`, `:focus-within` outline. The mkt popup uses a `.brand-select` custom
listbox; the contact form pairs inquiry-type chips with the black-submit override (§6).

Cards only where a card is the true affordance. **No nested cards.**

> **Dynamic class construction — static analysis will call these dead.** `site.js`
> builds `ts-tier-${…}` / `ts-juris-${…}`; `product/licensing/index.html` builds
> `patent-card`+`is-dup`, `juris-tile ${juris.toLowerCase()}` and
> `tier-tile ${tier.toLowerCase()}` — so bare `cn` / `ep` / `jp` / `kr` are live classes.
> The only classes actually toggled by name are `is-active`, `is-current`, `is-done`,
> `hiw-anim`.

---

## 8. Footer

`.footer`: background `--surface-secondary`, `padding-block:68px`. `.footer-grid` =
`1.4fr 1fr 1fr 1fr`; `.footer-cols { display:contents }` dissolves the three link
columns into that parent grid. Contains: a newsletter block (44px input, arrow → check
success swap), the co-branded **TIS × Innovue** lockup (32px TIS submark + 1px×32px
divider + Innovue wordmark 103×36), and three link columns (Products / Company / Legal)
with 15px Lucide icons. A `.footer-baseline` band carries the centered
"© 2026 Talent Intelligence Strategies" over an inset hairline.

Attribution phrasing for the Innovue lockup is owned by
[visual-guide-snapshot.md](designs/visual-guide-snapshot.md), not by this file.

---

## 9. Imagery

- **Behind components** — the signature move: images sit *under* a bottom-up black
  scrim so white copy reads. Offer/contact cards use CSS `background-image` on `::before`;
  report/press cards use a real `<img>`. Per-card rotation via `--img-rot` (reports 180°).
  Contact left panel: `venture.jpg` under a top+bottom scrim (`rgba(0,0,0,0.45…0.55)`).
- **Dot-cloud bleed** — `.about-card` dot PNGs (`/assets/imagery/home/*-dots.png`) bleed
  off the right on a pure-black field, masked left with a `linear-gradient(90deg, #000
  0%, #000 18%, transparent 62%)` so the text half stays clean.
- **Partner logos** — CSS `background-image` from `--partner-*` SVG url() tokens, treated
  `grayscale(1) invert(1) brightness(1.4)` at `opacity:0.85` on the dark band, full
  colour on hover.
- **Lazy `<img>`** — nav/drawer product-card media set explicit `width`/`height` and use
  `loading="lazy" decoding="async"`. Global: `img { max-width:100%; height:auto }`,
  `object-fit:cover` on media.
- **Logos** are theme + language switched via `--logo-*` / `--partner-*` url() tokens
  (dark/light × eng/ch). OG/Twitter images + favicons are declared in `<head>`.

Which gradients survive is a **functional** list: ruled-paper grids, legibility scrims,
SABCD seals, mask rings, the QR conic, and `--bg-placeholder-radials`. There is no
decorative gradient left. Don't add one.

---

## 10. Motion & reveal

**Three motion techniques ship, not one.** All are sanctioned; the constraint is *where*
each is allowed and that each has a fallback.

| Technique | Where | Fallback |
|---|---|---|
| `IntersectionObserver` + CSS transitions (`site.js`) | every page — the default | `prefers-reduced-motion` shows the resolved state |
| GLSL / WebGL via `three.js@0.160.0` (esm.sh) | hero backdrops only (`index.html`, `about/`) | DPR capped at 2; reduced-motion renders one static frame; **must** hold on an opaque background of its own — see §5 |
| GSAP + ScrollTrigger (3-CDN fallback chain) | `product/licensing/index.html` only | reduced-motion branch required |

Prefer the observer. Reach for GSAP only when a timeline genuinely needs scrub-linked
sequencing, and never introduce a fourth library.

- **`[data-reveal]`** (headings, deks, about cards, partner band): fade + 10px rise →
  `.is-revealed` transitions `opacity/transform` over **450ms `--ease-card`**; the dek
  trails the heading by **70ms**. Observer `threshold:0.12, rootMargin:'0px 0px -8% 0px'`.
- **`.offer-card` → `.is-in`**: image `scale(1.08)→1` + fade over 700ms, **staggered
  `i*90ms`** per card; `threshold:0.25`.
- **`.report-card` → `.is-in`**: same 700ms image reveal, per-carousel (not staggered).
- **Hover language** (`(hover:hover) and (pointer:fine)` only): cards lift
  (`-2/-6px`) with a shadow step-up and image zoom to 1.06; nav links darken to
  `#000`; arrows translate; `.arrow-link`/`.contact-email`/`.contact-meta a` share a
  left-origin 1px underline wipe (`scaleX(0)→1`, 280ms `--ease-out`).
- **Partner marquee**: `@keyframes partner-scroll` translateX `0→-50%` over **45s
  linear infinite**, duplicated set for a seamless loop,
  `animation-play-state:paused` on hover, progressive-blur edge fades.
- **Crossfades**: hero backdrops 480ms, shader 600ms, theme swap 250ms, buttons ~100ms.
- **Counters**: `.counter[data-target]` count-up via `counterObserver` (`threshold:0.3`),
  driven entirely from `site.js` — there is no `.counter` CSS rule. Live on `/about/`
  (`180`, `100`) and `product/signal/` (`1433`, `50`, `8`).
  Values are formatted with `toLocaleString('en-US')`, so four digits and up get a
  thousands comma. **`data-sep="none"` opts an element out** — used on the Signal pool
  numeral, where at 72px a separator reads as punctuation rather than scale.
  Two rules for any counter with copy set beside it: the markup text must equal what the
  counter lands on (it is the no-JS value), and the element needs a reserved width
  (`min-width` in `ch`, which tracks a `clamp()`ed font-size for free) or the growing
  digit *count* will shove that copy sideways — `tabular-nums` fixes digit width, not
  digit count.

Ease-out only; **no bounce** — the hero scroll cue is the single sanctioned exception.

**Every effect has a `@media (prefers-reduced-motion: reduce)` fallback**: reveals show
instantly, image zooms are disabled, the marquee goes static, the shader renders one
frame, counters show the final value, the scroll cue stops. Content is **never** hidden
behind a never-firing transition, and never gated invisible on JS failure.

> **Verification note.** Motion-frozen screenshots require
> `--force-prefers-reduced-motion`; without it the shader, marquees and sheens produce
> false positives. Never capture below the fold with a tall viewport — it inflates the
> `100vh` heroes and the capture is meaningless. Scroll with URL fragments instead.

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
3. **One head pattern everywhere:** heading → dek, in that vertical order, with
   `--space-head-gap` before the content, and an optional `.eyebrow` above (§2).
   Reduced-scale `.h-section` for offerings/about; full scale elsewhere.
4. **One accent per surface, rationed.** The surface accent (§1.2) appears as a seal or
   foil — a single emphasized `em`, a hairline rule, one chip — on **under 15%** of the
   surface. Never a fill behind body text, never a gradient, never a clipped heading.
   Everything else is ink on white or white on black.
5. **Data colour is data only.** The SABCD and jurisdiction ramps appear where they
   encode a real tier or a real jurisdiction — distribution bars, tier chips, patent
   dots. Never as decoration. And never as the *sole* signal: always pair with the
   letter token.
6. **Restraint in motion.** Reveals *enhance an already-visible default*; stagger only
   within a list, never one uniform reflex per section. Ease-out only, no bounce (§10).
7. **Black mass is allowed** on image-backed cards and the hero — that's where the pure
   `#000`/`#fff` exception lives (§1.3). Nowhere else.

---

## 12. New-page checklist

Run this when composing a new page so it stays consistent with the homepage:

1. **Chrome**: copy the locked `topnav` + `footer` + the `<head>` FOUC theme/lang guard
   verbatim from an existing page (chrome is duplicated per page — no shared include).
2. **No page-local `<style>` block** (§0.3). Compose from `styles.css`; if a rule is
   genuinely one-off, comment it with the page name and why.
3. **Wrap** every section's content in `.container` (1440 / 32 / 20); use `.section`
   for cadence, `.section--tight` (+ the `+ .section` collapse) for embedded strips.
4. **Head pattern**: heading (`.h-section`, reduced scale for soft sections) → dek
   (`.section-dek`, ≤44ch), optional `.eyebrow` above.
5. **Colour from tokens only** (§1). No inline hex except the sanctioned `#000`/`#fff`
   on image-backed dark cards. Check the property, not the value, when picking a token —
   `#252525` is both `--surface-inverse` and `--text-primary`.
6. **Type from tokens only**: `var(--font-sans)` / `var(--font-mono)`, never a literal
   font stack. Then read every mono string back — **if it reads as a word, it is sans**
   (§2). Eyebrows, labels, chips, tags, column heads, and tier / jurisdiction letters
   are all sans; mono is sectional numbering, numerals, and number-prefixed IDs.
7. **Cards**: reuse the base + image + scrim recipe (§7); don't invent a new card shell.
8. **Wire reveals**: add `[data-reveal]` to headings/deks and `.is-in` targets to image
   cards — `site.js` observers pick them up automatically.
9. **Reduced-motion parity**: any new transition needs a `prefers-reduced-motion` branch
   that shows the resolved state.
10. **Bilingual**: author EN in the DOM, ZH in `data-zh` / `data-zh-html`. Never invent ZH.
11. **Accessibility pass** (§14): contrast against the *actual* backdrop, 44px targets,
    visible focus.
12. **Verify locally**: `python3 -m http.server 8000` (root-relative paths need a server),
    check at 390 / 768 / 1280 / 1440, light + dark, EN + ZH.

---

## 13. Brand personality, principles & anti-references

Word-level voice rules live upstream in `brand/brand-voice.md`. What follows is the
*design* register those rules imply.

### 13.1 Personality

**泰然 (tài-rán): composed, methodical, honest.** Three words: *unhurried · precise ·
candid.* The design never oversells — it presents evidence and lets the reader conclude.
Emotional goal: the quiet authority of a private-bank statement or a sealed legal
dossier, not the adrenaline of a SaaS hero.

### 13.2 Design principles

1. **Composed, not loud.** Restraint *with* intent. Premium is generous whitespace,
   exact typography and precise rhythm — not decoration. Colour is rationed like gold
   foil on a black-and-white document.
2. **The dossier, not the brochure.** Present as a chaptered file a methodical advisor
   walks you through. Sectional numbering and monospaced metadata are legitimate here
   because the content literally *is* a sequence of patent IDs, tiers, licence numbers
   and dates.
3. **Evidence over adjectives.** Lead with the real number (30, NT$50,000+, 18 months,
   5·6·9·6·4, 1.7億件). The design's job is to make those numbers land, never to inflate
   them.
4. **Honest about the edges.** The "when it doesn't go to plan" beat is a feature of the
   brand, not fine print. Give it real weight.
5. **Colour earns its place.** The surface accent appears only as a deliberate signal —
   a seal, a single emphasized word, one key CTA. The SABCD palette appears only where
   it encodes real data. Never a wash.

### 13.3 Anti-references

- **Hype-SaaS landing pages.** Gradient-washed heroes, "AI-powered / unlock / seamless"
  copy, the big-gradient-number hero-metric template, fade-in-on-scroll on every block.
  The whole genre the reader distrusts.
- **Editorial-magazine affectation.** Display-serif + italic drop caps + broadsheet ruled
  columns. Wrong register for an IP consultancy; reads as a lifestyle brand.
- **Brutalist / acid-maximalism.** Loud, raw, ironic. Actively repels a conservative
  48–58yo B2B export buyer.
- **The site's own historical tells:** gradient-clipped headings, a tiny uppercase
  tracked kicker above *every* section, near-identical bordered bento cards repeated for
  nine sections. All three have been removed. Don't bring them back.

---

## 14. Accessibility & inclusion

- **WCAG 2.1 AA.** Body text ≥4.5:1, large text ≥3:1, measured against the *actual*
  backdrop — including image-backed and warm-tinted grounds, not the nominal page white.
  Use the `-text` accent variants for anything at body size (§1.2).
- **Colour is never the sole signal.** Tier colours always pair with the letter token
  (S/A/B/C/D); jurisdiction colours always pair with the code.
- **Tap targets ≥44px** (`min-height:44px` under `(pointer:coarse)` on `.btn`).
- **Visible focus** — inherit `--border-focus`; never remove an outline without
  replacing it.
- **`prefers-reduced-motion: reduce` honoured on every animation** (§10). Content is
  legible with zero motion and must never be gated invisible on JS failure.
- **Fully bilingual** via the `data-zh` system; EN is the visible fallback where ZH is
  pending.

**Measured baseline — the dark hero, 2026-08-07.** Every foreground element clears AA
against the `#000` hero field with margin, so the hero is not the risk area it was
assumed to be:

| Element | Ratio | Floor |
|---|---|---|
| `.pillar-title` `#fff` | 21.0:1 | 3.0 |
| `.pillar-sub` white 82% (→ `#D1D1D1`) | 13.8:1 | 4.5 |
| `em` positioning `--slate-200` | 17.0:1 | 3.0 |
| `em` signal `--surface-accent-signal` | 7.6:1 | 3.0 |
| `em` licensing `--surface-accent-licensing` | 5.4:1 | 3.0 |
| `.hero .btn-glass` label | 17.4:1 | 4.5 |
| `.hero .btn-secondary` label | 14.5:1 | 4.5 |

There is **no eyebrow on any hero**. `.pillar-eyebrow` (16px/600) exists only on the
licensing and signal heroes and is forced to `#fff` there; the homepage hero has none.
The one real finding was `.eyebrow` at 3.25:1 — see §2.

---

## 15. The build layer and the React island boundary

**The site is still hand-authored static HTML served from the repo root.** That has not
changed and is not planned to. What exists now is a build layer beside it, not under it.

### 15.1 What the build produces

`npm run build` writes four files into `assets/build/`, which the pages load with ordinary
`<script>` / `<link>` tags:

| Artifact | What it is |
|---|---|
| `three.js` | the hero shader's three.js, pinned 0.160.0 |
| `gsap.js` | gsap + ScrollTrigger, pre-registered, pinned 3.12.5 |
| `islands.js` | the React mount runtime — the 21st.dev landing zone |
| `islands.css` | the Tailwind layer, generated from the brand tokens |

**The output is committed.** Pages serves this repo root in `legacy` mode, so a committed
artifact keeps the deploy byte-for-byte as it is. The cost is that `assets/build/` can drift
from `src/` silently — `npm run verify` rebuilds and diffs to catch that, and the (inactive)
Actions workflow runs it.

### 15.2 Tailwind is generated from the tokens, and the default palette is replaced

`tailwind.config.js` is **generated** by `scripts/gen-tailwind-config.mjs` from
`designs/design-tokens-snapshot.md` §7.4 plus the `:root` block of `styles.css`. Never edit
it by hand — run `npm run tokens`.

The default Tailwind palette is **replaced, not extended**. Scale names a pasted component
is likely to use are aliased onto TIS tokens — `bg-blue-500` resolves to
`--surface-accent-signal`, `bg-slate-900` to `--text-primary`, `text-gray-500` to
`--text-tertiary`. A name that is not mapped, `bg-fuchsia-400` say, **does not exist**, and
the component renders visibly unstyled rather than quietly off-brand. That is the intended
failure: this is the mechanism that let 119 invented hexes in the first time.

The **shadcn/ui semantic names** are aliased the same way, because nearly every 21st.dev
component is built on shadcn and its primitives arrive wearing them: `bg-background`,
`bg-card`, `text-muted-foreground`, `bg-primary`, `bg-destructive`, `border-input`,
`ring-ring`. They map to the nearest TIS token — `primary` is `--surface-inverse` with
`--text-inverse` on top, since the TIS primary action is near-black ink and not a brand hue
(§6). `border-border` and a bare `border` both resolve through `borderColor.DEFAULT`
(`--border-primary`), which the scoped reset in §15.3 also sets.

**The `content` glob scans `src/islands/` and nothing else, and that is a boundary rule, not
a build-speed one.** Tailwind emits a utility for any string in a scanned file that looks
like one, *unscoped*. While the glob also covered `./*.html`, the pages' own class names were
generating Tailwind utilities that then overrode `styles.css`: the site's `.container`
produced `.container{max-width:1100px}`, so the first page to load `islands.css` had its
whole layout pulled in ~90px a side. `.h-section` collided too (a height utility, courtesy of
the `spacing.section` extension), along with `.text-secondary`, `.hidden`, `.visible`,
`.block`, `.flex`, `.uppercase` and a few dozen more. Found by the first real port. If you
ever want Tailwind classes inside a hand-authored page, that is a §15.3 decision — not a glob
edit.

> The corollary bites inside island sources too: comments are scanned. Naming the classes you
> stripped from a port, in that port's own header comment, regenerates them as dead CSS.
> Paraphrase instead.

Two guards worth knowing:

- A §7.4 token with no matching `--var` in `styles.css` is emitted as `var(--x, #hex)` with
  the §7.4 literal as fallback, and the generator **prints every one**. Without the fallback
  an unresolved `var()` invalidates the whole declaration and the value silently falls back
  to inherited (§0.2's trap, and it has cost a session before). **13 tokens are currently in
  this state** — `danger-*`, `warning-*`, `info-*`, `juris-ch*`, `signal-lapsed`,
  `text-link*`, `text-disabled`, `border-divider`. The stylesheet is the lagging side.
- `backgroundImage` is switched **off** as a core plugin. Gradients were retired 2026-08-06
  and Tailwind's gradient utilities are exactly where they would creep back in.

The red line still holds: **`styles.css` custom properties are authoritative; the Tailwind
config is a consumption layer.** On conflict, the stylesheet wins.

### 15.3 The island boundary

A page opts in with one element and one script tag:

```html
<div data-island="my-widget" data-props='{"tier":"S"}'></div>
<script type="module" src="/assets/build/islands.js"></script>
```

Components are registered in `src/islands/index.jsx`. Nothing mounts unless its element is
present, so loading the bundle on a page that uses no island costs nothing.

Rules that keep the two idioms from bleeding:

1. **Islands are leaves, never chrome.** Nav, footer, hero and section shells stay
   hand-authored. An island renders *inside* a section, never wraps one.
2. **No island owns page layout.** `.container`, `.section` and the spacing scale (§3) stay
   in `styles.css`. An island sizes itself to the box it is given.
3. **Tailwind's preflight is off, and a `[data-island]`-scoped reset stands in for it.**
   Preflight is a global reset — `margin: 0` on everything, `list-style: none`,
   `h1..h6 { font-size: inherit }` — so the first page to load `islands.css` would have had
   all of its hand-authored markup restyled. `corePlugins.preflight: false` in the generator
   turns it off; the replacement lives in `src/islands/tailwind.css` under `[data-island]`.
   That block is load-bearing, not tidiness: Tailwind's `border-*` utilities set only a
   *width*, and take `border-style: solid` plus the default colour from preflight. Without
   the scoped reset every ported border silently disappears. The two must move together.
   > Verify with `grep -c blockquote assets/build/islands.css` → `0`. The
   > `*,:before,:after{--tw-…}` block at the top of the file is a different thing — inherited
   > custom-property defaults from Tailwind's internal `defaults` plugin, no visual effect.
4. **An island that fails to load leaves an empty box, never a hole.** `islands.js` catches
   the import and logs; the surrounding page is untouched.
5. **If a pattern gets reused, it graduates.** Two pages needing the same island means it
   belongs in `styles.css` as a real component, not copied. Same rule as §0.3.

### 15.4 What has *not* changed

- No router, no SSR, no framework owning the page.
- Asset references stay root-relative (`/assets/…`).
- Deploy is still `git push origin main` → Pages. `build_type` is still `legacy`.
- The real constraint, replacing "no build step": **output must be static files servable
  from the root of `main` by GitHub Pages.**

### 15.5 Porting a 21st.dev component

The catalog is reachable from this repo through the 21st.dev MCP server (configured
project-scoped, paid tier, unmetered): `search_picker` to browse visually, `get_component`
with a result's `id` for the source. The step-by-step procedure is the `port-21st` skill in
the monorepo's `.claude/skills/`; what belongs *here* is the shape of the target.

**What the rails give you.** `@` resolves to `src/islands/` (`vite.config.js`), so
`@/components/ui/card` and `@/lib/utils` — the two imports nearly every payload carries —
work unedited. `cn` is at `src/islands/lib/utils.ts`. shadcn primitives that come down in
the payload go into `src/islands/components/ui/` **as they arrive**; that directory is
populated by porting and never pre-scaffolded, because a pre-installed set would bind every
later port to whichever variant landed first.

**Dependencies: `lucide-react` only.** Icons are the one thing a ported component needs that
this repo has no equivalent for. Everything else gets rewritten rather than installed:

| Arrives as | Becomes |
|---|---|
| `motion/react`, `framer-motion` | nothing — strip it. See the note below. |
| `@number-flow/react` and other counters | render the number directly. Not `.counter[data-target]`. |
| `next/image`, `next/link` | plain `<img>` / `<a>` — there is no Next here |
| anything else | ask whether the component is worth the dependency; usually it is not |

> **Neither `[data-reveal]` nor `.counter` works inside an island, and it is worth knowing
> why before you reach for them.** Both are one-shot `querySelectorAll` calls in `site.js` at
> `DOMContentLoaded`; an island mounts later, so its nodes are never observed. And
> `[data-reveal]`'s hidden/revealed CSS is defined only for `.h-section`, `.section-dek` and
> `.partner-band` — a bare `[data-reveal]` on some other element has no styles attached and
> does nothing at all. A `.counter` that is never observed never has its text set, so it
> renders empty. If an island genuinely needs an entrance, put it on the host `<div
> data-island>` in the page HTML (which does exist when the observer runs) with its own rule
> in `styles.css` — and treat that as a §0.3 decision, not a port detail.

**What must be stripped, every time.** These are not style preferences, they are the four
ways a port re-introduces the drift §15.2 exists to stop:

- **Layout claims** — `min-h-screen`, `mx-auto`, `max-w-7xl`, section padding. The island
  sizes itself to the box the page gives it (§15.3 rule 2).
- **Inline `style={{…}}`** — the one route that bypasses the replaced palette *and* the
  disabled gradient plugin. Real example from a real payload:
  `style={{ backgroundImage: 'radial-gradient(circle at center, #206ce8 …)' }}`.
- **`dark:` variants** — theming here is `[data-theme]` on `<html>` driving custom
  properties. A `dark:` class is a second, competing system.
- **Colour names outside the ramps** — `fuchsia`, `teal`, `lime`, `pink`, `purple`, `yellow`
  and friends resolve to nothing. If one is load-bearing, pick a real token; do not add the
  name to the generator to make a single component compile.

**Two things about the payload itself.** `npmDependencies` can be empty while the source
imports three packages — derive dependencies by reading the imports, never from that field.
And `registryDependencies.filesWithRegistry` can omit a registry file the component imports;
search for it by name or drop the wrapper.

**Then it graduates or it doesn't.** One page needing the component: it stays an island. A
second page needing it: promote it to a real `styles.css` component and delete the island
(§15.3 rule 5). Copying an island to a second page is how 345 dead classes happened.

---

## 16. Per-page notes

Everything above is site-wide. This section holds what is genuinely scoped to one page.
Keep additions here as subsections — do not split them into separate files.

### 16.1 Licensing Platform landing page — `product/licensing/index.html`

**Aesthetic direction — "the coverage dossier."** A chaptered, instrument-grade document
a composed advisor walks the reader through, replacing vague legal dread with the calm of
someone who already holds coverage. Reference lane, named: **Stripe-restraint precision
meets a sealed private-bank dossier** — monochrome ink on white/warm-white, exact type,
generous air, with the licensing accent rationed like a wax seal.

Why the dossier framing licenses moves that are banned by reflex elsewhere:

- **Sectional numbering** is legitimate: the page *is* an ordered narrative, not
  decorative scaffolding. It replaces the banned "kicker above every section."
- **Inconsolata** is literal, not costume: it sets patent IDs (`US10892431`), tier
  counts, licence numbers, dates and figures — genuine technical registers.
- The accent acts as a **seal/foil**, never a fill behind text.

**Colour.** Licensing accent = `--surface-accent-licensing` (large text / UI),
`--surface-accent-licensing-text` (body copy), `--surface-accent-licensing-wash` (the
warm alternating ground). `--score-*` and `--score-*-vivid` are reserved for SABCD tier
data on this page — distribution bar, tier chips, patent dots — and nothing else.

> There is no `--lic-surface-alt`. Earlier drafts of this spec invented `#FBF7F1` and
> claimed it was already defined; it exists nowhere in code. Use
> `--surface-accent-licensing-wash` (`#F1EDE7`).

**Live composition** (in DOM order): `hero.hero--showcase` → `deliverables` →
`gapcover` → `lic-showcase` → `walkaway` → `pricing` (`section--alt`) → contact. The
page reuses the universal `howitworks` / `acc-*` accordion, the `bp-*` bundle picker,
`brand-select`, `contact-form`, and `patent-card`, all with their markup and JS contracts
intact — only the skin is page-scoped.

**Layout intent that still governs edits here:**

- **Hero** — asymmetric: oversized type left, a framed credential/seal slot right. Accent
  on one word plus a thin rule. All hero copy is forced to `#fff` over the warm photo
  (there is no scrim), which is why the eyebrow, title, `em` and sub are pinned together.
- **Comparison ledger, not a card grid** — the three-way File / Hire / Subscribe
  comparison is hairline-split rows with mono cost figures, the Subscribe row lifted into
  a single warm-white panel with an accent seal rule. Not three equal cards.
- **Figures** render in mono ink with a unit, set on the hairline grid — never as glowing
  numerals.
- **Distribution bar** — proportional tier-coloured segments, animated from 0 width on
  reveal; the tier role-lines are a compact data-coloured legend.
- **Cards only where a card is the true affordance** (scenario panels, inventory rows).
  No nested cards.

**Motion.** This is the **only** page cleared for GSAP + ScrollTrigger (§10), and it must
keep the 3-CDN fallback chain and a reduced-motion branch. One deliberate hero entrance;
`[data-reveal]` for the rest; `.counter[data-target]` for real figures.

**Voice.** Anchor numbers verbatim. Credit Innovue once near the top, in the phrasing
`visual-guide-snapshot.md` approves. No em dashes in *new* copy; existing verbatim copy is
preserved as-is.

### 16.2 Signal — `product/signal/index.html`

Signal accent = `--surface-accent-signal` (dark surfaces only) /
`--surface-accent-signal-text` (body copy on white) / `--surface-accent-signal-wash`.

The page carries **one inline `<style>` block, and it is a sanctioned §0.3 exception —
not drift.** The header comment above the block records the audit: 63 classes, of which 46
are `sig-*` page-namespaced, 5 are modifiers on shared components, and 12 are shared classes
reached through a scoped or descendant selector (`[data-page="signal"] .hero`,
`.sig-phases .btn`). Zero dead rules. Nothing in it is reusable enough to earn a place in
the shared stylesheet; promoting it would repeat the dead-CSS problem rather than fix it.

**The condition attached to the exception: if you change that block, re-run the dead-class
check and update the audit line in its header comment.** An unaudited block loses the
exception and is swept.

Two things are page-scoped because `styles.css` has no equivalent — the signal-gradient
imagery behind the report and contact cards, and the proof grid. The hero is no longer one
of them; it composes the shared `.hero-shader` carrier.

**The hero** (2026-08-11) runs **the homepage's own shifting-lines shader**, recoloured to a
single blue hue and positioned so the band runs behind the CTA row. It uses the **shared
`.hero-shader` carrier**
from `styles.css` — position, `z-index:2`, the 600ms `.is-ready` crossfade — so there is no
page-local backdrop layer at all and the only page-local hero rule left is `.sig-hero-scrim`
(z3). Content is z5, the shared `.hero-inner` value.

Everything before it is gone: a radial ring pulse, then a scanning hex-dot lattice, then a
Stripe-style mesh gradient over a rotated still. Four things to know:

- **The recolour is not the `saturation` uniform.** The homepage splits one line into R/G/B
  and mutes it by blending toward the brightest channel — that is a *chroma* control, so it
  travels between "full RGB" and "grey" and no value of it produces a blue. Here the three
  split strands are multiplied by three steps of one blue (`#06344F` / `#0A72B0` /
  `#0EA5E9` = `--sig-blue`) and summed, so hue is fixed and the split survives as depth.
  `saturation` is deleted rather than set to 0. **These three hex literals are sanctioned
  shader-hex** — GLSL cannot read CSS custom properties (§1.3).
- **Each strand is compressed to 0..1 before tinting.** The raw `1/abs()` glow is unbounded;
  summing three of them clipped every channel at the crest and the core came out white,
  which defeats a single-hue palette. `g/(1+g)` first keeps the sum in range.
- **`yScale` and `yOffset` are a pair, and they encode a composition decision.** The band is
  positioned so its convergence runs **behind the CTA row**, not below it: `yOffset -0.36`,
  `yScale 0.18`, so the reach is `p.y -0.18 … -0.54` against a CTA row spanning about
  `-0.32 … -0.44`. The amplitude is deliberately small — at the top of that range the crest
  grazes the last paragraph lines, and anything wider pushes it further into them. That is
  also why the scrim's bottom lift reaches 56%. Change one of the two and you have to
  re-check the other **across phases**, not in whatever single frame is on screen; the crest
  travels, so a frame that looks clear proves nothing. For the same reason `STATIC_T` is
  `π/2` — it puts the still's crest lowest at frame centre rather than wherever it lands.
  `distortion` is `0.11`, wider than the homepage's `0.05`, because compression costs the
  strands their brightness separation so the split has to carry depth geometrically.
- **Two fixes the homepage copy still needs.** This one drives `time` from
  `performance.now()` (the homepage advances it per frame, so it runs at double speed on a
  120Hz display) and renders a single frame under reduced motion instead of leaving a rAF
  loop spinning on a frozen clock. `index.html` has both quirks and is worth fixing.
- **This page drops `.hero-grid`** (the homepage keeps it) — a square grid crossing the glow
  band reads as interference.

**The proof grid** (2026-08-10) is asymmetric on purpose: a wide black PSS ledger with the
four facts 2×2, a scrim-captioned image card below it, and a full-height
`--surface-accent-signal-wash` panel beside both carrying the process as three phases.
It replaced three black cards in a flex row plus a 7-beat timeline on a spine. Two things
to know before editing it:

- **The vivid `--sig-blue` lives on the black ledger and nowhere else.** It is 7.58:1 on
  `#000` and 2.77:1 on white, which is the entire reason that panel is black. The wash
  panel uses `--surface-accent-signal-text` (4.64:1 on the wash, 8.6:1 on its `#121D24`
  dark-theme value).
- **The two-stage payment structure is carried by the two chips** (`10% deposit` /
  `90% balance`) in the first and last phase. The retired timeline said it with accented
  nodes; don't quietly drop the chips.

The in-page anchors `#reports` and `#intake` are link targets from
`methodology.html` — don't rename them without fixing that page's `.loop-ctas`.
