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
| `product/signal/index.html` | 1 | audited exception — 76 classes, zero dead rules (see §16.2) |
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

**Chinese line breaks.** Chinese has no word spaces, so the breaker may break between any
two Han characters and will happily strand a two-character tail on a line of its own. The
default is `text-wrap: balance` under `[lang="zh-Hant"]` (`styles.css` §Chinese line
breaking) — it works on CJK, and it is scoped so the EN measure never moves. Reach for a
hard `<br>` in `data-zh` (with `data-zh-html`) only where balance splits a bound compound,
which is mostly short headings: on a ~13-character title balance buys evenness at the cost
of cutting 熱管理 or 組合 in half. A `<br>` is cut for one measure, so guard it with a media
query at whatever width its box stops being that measure — see `.report-card-title`. In
running prose a split compound is ordinary Chinese typesetting; the orphan is the defect.

**No space after `。`、`，`、`、`.** The full-width glyph carries its own trailing space, so an
ASCII space after it renders as a visible hole. This bites when one `<p>` holds two
`data-zh` spans separated by a literal space — EN needs that space between sentences and ZH
does not. Put the whole ZH string in one `data-zh` on the parent instead. `build-search-index.mjs`
enforces the same rule on the index (`cjkTighten`), since `strip()` turns every `<br>` into a
space. Latin↔CJK spacing is deliberate and is left alone. This closes the open question at
`documents/chinese-copy-direction.md:1201`.

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

**The one extension to this list has been withdrawn.** `.mth-panel` on
`product/signal/methodology.html` was added here on 2026-08-26 as the first always-dark
surface that is not image-backed; the methodology rebuild later the same day took the
panels off dark entirely, onto `--surface-tertiary`. So the list is image-backed surfaces
again, which is what it was scoped to in the first place. The reasoning that justified the
extension still holds and is worth keeping for the next case: what governs is the second
half of the sentence above, not the first. A surface that is dark in *both* themes needs a
literal, because `--surface-inverse` flips to `#FAFAFA` in dark theme and would turn
white-on-black data into black-on-white. A literal is the correct tool there; a token is
the bug.

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

**Families** — all self-hosted, `font-display: swap`. The `@font-face` block in
`styles.css` is **generated**: it sits between `/* @generated:fonts:start */` and
`:end` sentinels and is rewritten by `npm run fonts`. Never hand-edit it.

Sources live in `/designs/assets/fonts/` (TTF, read-only brand mirror); what ships is
WOFF2 in `/assets/build/fonts/`. Latin faces are converted whole. **Noto Sans TC is
subset to the glyphs this site actually uses and split across four `unicode-range`
buckets**, so a page downloads only the buckets it renders — the English pages were
otherwise pulling 6.94 MB of CJK to draw the two characters in the language toggle.
That toggle's `中文` label is pinned to a system CJK stack for the same reason
(`.lang-menu button[data-lang-set="zh"]`).

> The subsetting is content-driven, so it can go stale. `scripts/build-fonts.mjs`
> scans every `.html`/`.js` in the tree — including `data-zh` attributes and the
> bilingual string pairs inside `site.js` — and **throws** if a codepoint it found is
> missing from what it emitted. `npm run verify` runs the build, so a stale subset
> fails before it ships.


- **Urbanist** — primary UI/display sans; 400/500/600/700.
- **Inconsolata** — mono; 400/500/600. **Numerals only** — see the rule below.
- **Noto Sans TC** — CJK; 400/500/600/700.

Use the tokens, never a literal stack:

| Token | Value |
|---|---|
| `--font-sans` | `'Urbanist','Inter','Noto Sans TC','PingFang TC','Microsoft JhengHei',system-ui,sans-serif` |
| `--font-mono` | `'Inconsolata',ui-monospace,SFMono-Regular,Menlo,monospace` |

### Dashes

Chinese copy uses **one em dash with a space either side** — `同產業 — 專利強度`, not
the CJK convention of two unspaced dashes. This is a deliberate house choice, matching
the English half of each bilingual pair; the site was mixed (34 double, 5 single) until
2026-08-28. En dashes in ranges are untouched: `S–D`, `2026-04-01 – 2027-03-31`.

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
> `.offer-card-eyebrow--text` — as the Signal report cards do (`The grade` / `The
> evidence` / `The field`).
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
(`.section-dek`, ~44ch)**, with an optional `.eyebrow` above. `text-wrap: balance` on
headings, `pretty` on prose — **in English.** Two corrections for Chinese, both measured on
shipped strings rather than read off the spec:

- **`pretty` is Latin-only.** On six ZH blocks at their real widths it rendered
  byte-identical to `normal`: it tunes only the last line's break, and a Han run offers it
  no orphan to act on. `balance` is the only lever that does anything in Chinese — see §0.4.
- **`balance` does not cross `display: -webkit-box`.** It cannot reach a line-clamped
  element such as `.report-card-dek`, and if it could it would hurt: balance narrows every
  line, so a clamped block would show *fewer* characters before the ellipsis. Fit those by
  copy length — at the desktop clamp of 2 lines, which is the tighter of the two (§7
  relaxes it to 3 at ≤640px).

**Chinese does not drop the negative tracking yet.** `.pillar-title` ships `-0.02em` in both
languages and no `zh-Hant` override exists in `styles.css`. Pending, not shipped — and not
free, because adding it re-measures every balanced ZH block.

> **The eyebrow is optional, and today it is unused.** `.section-head` ships `h2` + dek
> on every live page; the count of standalone `.eyebrow` elements site-wide is **0**.
> Earlier versions of this spec described eyebrow → heading → dek as the pattern
> "everywhere," which was never true of the shipped pages. Treat it as available, not
> required — and if you use it, note that it was retinted to `--text-secondary`:
> `--text-tertiary` `#8A8F98` at 12px measures **3.25:1** on white, under the AA floor,
> and `design-tokens.md` §5 already declares that token UI/decorative-only.

---

### 2.1 Status flag and veil type

| Class | Size | Weight | Tracking | Notes |
| --- | --- | --- | --- | --- |
| `.status-flag` | 12px | 600 | 0.01em, sentence case | `--font-sans`. **Not** `.sig-mockflag`'s mono: it reads as words, so the §2 box rule applies. Sentence case, not the `label-12` role's uppercase: "Coming soon" is a short phrase, not a metadata label, and caps made it shout. Tracking is 0.01em because caps tracking reads loose unshifted. Ink `--text-secondary`, never `--text-tertiary` (3.1:1 on `--surface-tertiary`, fails AA). |
| `.veil__title` | `clamp(28px, 3.4vw, 40px)` | 600 | −0.02em | Deliberately under `.pillar-title`'s hero scale. A page state is a quiet statement, not a claim. |
| `.veil__body` | 16px | — | — | `line-height 1.6`, `max-width: min(52ch, 100%)`. The `min()` matters: bare `52ch` is ~416px and overflows a 390px viewport. |

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

**The drawer carries the language switch, and the Products group opens by default**
(2026-08-27). Two facts drove both:

- The topnav globe is *behind* the drawer once it slides in, so on a phone the language
  switch was unreachable while the menu was open. `.mobile-lang` is a segmented pair in
  the drawer footer above the CTA, using the same `[data-lang-set]` hook as the topnav
  menu — `langButtons` in `site.js` is queried document-wide, not scoped to `#lang-wrap`,
  so one `applyLang` call keeps both sets' `aria-checked` in sync. Choosing a language
  from the drawer also closes it: the swap plays a full-screen shimmer and two stacked
  overlays read as a fight. There is **no theme toggle** anywhere in the UI — dark theme
  is styled but never switchable — so the footer holds language only.
- Collapsed, the drawer was four links over **503px of empty white** on a 844px phone
  (60% of the panel). Expanded it is four links plus two 88px-media product cards.

**The expanded default is measured, not assumed.** The markup ships
`aria-expanded="true"` + `data-open="true"`; `fitProductsDefault()` runs on every
`openDrawer()`, and if `.mobile-list` now overflows its own box it puts the group back.
That matters on short viewports — at 375x667 the expanded sublist pushes the last two nav
rows under the fold, and hidden navigation is a worse fault than empty space. Verified at
390x844, 375x667 (falls back to collapsed), 430x932 and 412x915: no drawer scrolls and
every nav row is visible. A reader who toggles the group sets `data-userToggled` and is
never overridden again.

**Contact-chrome routing rule** (2026-08-18). Three links per page carry a contact
intent — the topnav CTA, the mobile-drawer CTA, and the search-modal "Contact" entry —
and all three follow one rule:

> **If the page has its own `.contact` `#contact` section, all three point at `#contact`
> on that page. If it does not, all three point at `/#contact` on the homepage.**

Never a cross-page link to a *different* page's `#contact`, and never a same-page
`#contact` on a page that has no such anchor. Both failure modes were live before this
rule was written: `methodology.html` pointed at `/product/signal/#contact`, an anchor
that does not exist, so it silently landed at the top of the Signal page; `badge.html`,
`about/`, `patents/` and `reports/` each sent their search-modal link off their own page
despite carrying the form themselves.

**A veiled page counts as being in the `does not` branch** (§17). Its own `#contact`
section is inside an `inert` `<main>` and the page cannot scroll, so a same-page
`#contact` is unreachable twice over. All three links go to `/#contact`. This applies to
`product/licensing/index.html` and `product/licensing/badge.html` while the veil is up,
and reverts with it.

**Signal (`product/signal/index.html`) is the only unveiled page in the `does not` branch.** Its
equivalent slot is `#intake`, a transactional order form that asks which report you want
and takes a card deposit, so it cannot answer a general enquiry. Its two "Start an
evaluation" CTAs stay on `#intake` — that is the order action, and keeping the two
distinct is the point. Add a `.contact` section to that page and all three links move
back to same-page `#contact`.

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

**Mobile floor** (2026-08-27): at `≤640px` the container is `height:auto;
min-height:340px`, down from `460px`. `height:auto` is the half that does the work — the
base rule sets `height: clamp(460px,56vw,580px)`, so lowering `min-height` alone changes
nothing. 460px was holding one to three lines of type on `/about/`, `/reports/` and
`/patents/`, leaving 184–216px of empty grid above the heading and pushing the first real
section off an 844px phone. 340px is a floor, not a height: `badge.html` still sizes to
its taller content (601px), and `/patents/` settles at 380px on its three-line dek. Home
and signal are unaffected — both override with their own full-viewport heroes, and
licensing's `[data-page="licensing"] .hero` already sets `height:auto` itself.

**The announce bar costs no layout.** On both pages that carry it, `.announce` is
`position: absolute; top: 64px; z-index: 90` over the hero — removing it moves nothing
(`h1` top and `scrollHeight` are identical with and without). It covers the hero's empty
upper region, not content, so its height on a phone is a coverage question rather than a
displacement one. Don't cite its height as first-screen cost.

**The announce bar is one nowrap line at desktop widths and wraps at ≤880px.**
`.announce-msg` is `nowrap` + `text-overflow: ellipsis`, which silently cuts a long
message mid-word on a phone — and the tail of the string is usually the part carrying the
substance. The `≤880px` branch switches it to `white-space: normal`, lets
`.announce-cluster` wrap so the CTA drops to its own line, and raises `max-height` to
**160px** to clear three lines. `.is-dismissing` still collapses from whatever that height
is. Keep messages short anyway: the desktop line has room for roughly 75 characters beside
the CTA before it would need the wrap.

**160px, raised from 140px** (2026-08-28). Under `prefers-reduced-motion` the rotator
un-stacks and shows both messages at once (see the `.announce-rotator` override), which in
EN at 390px wants 146px. The old cap cut no text — it ate 6px of the 10px bottom padding
and left the last line 4px off the edge. Since the bar is out of flow, a taller cap costs
nothing.

**`.ticker-pulse` is hidden below 640px.** `.announce-item` is `display:flex; gap:10px`,
which puts the dot beside a one-line message. At phone widths the message wraps to two or
three lines, the item wraps with it, and the dot lands centred on a row of its own above
the text — a stray mark rather than a bullet, in **both** motion modes. It is `aria-hidden`
decoration, so dropping it loses no information and takes 9px off the bar in single-message
mode, 18px in reduced motion. Measured at 390px:

| | EN | ZH |
|---|---|---|
| normal motion | 96 → **87px** | 74 → **65px** |
| reduced motion | 140 (6px squeezed) → **134px** | 130 → **112px** |

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

**A stacked hero pair comes back one width** (2026-08-27). `.pillar-actions` is
`flex-wrap: wrap`, so once the pair wraps each button keeps its own text width — 220px
over 122px on home, 167px over 213px on signal. Two differently-sized pills in a column
read as a mistake, and the fill/outline pair already carries the hierarchy. At `≤480px`
the container becomes `flex-direction: column; align-items: stretch`.

- They equalise to **the wider of the two** (220px home, 213px signal), not to the full
  column: `.pillar-actions` is shrink-to-fit, so `stretch` matches them to their own
  widest rather than going full-bleed.
- Scoped to `[data-page="home"]` and `[data-page="signal"]` — the only two with a stack
  to fix. Licensing's pair (119 + 139) still shares a row at 320px and `badge.html` has a
  single button; forcing a column there would only grow an already-tall hero.
- **480px, not each page's own wrap point** (home ≤390, signal ≤430 in EN), so the two
  languages keep the same shape — the ZH labels are shorter and would otherwise sit in a
  row while EN stacked at the same width. The cost is one pair, home at 431–480px, that
  stacks while it would still have fit across.

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

**Price** (`.offer-card-price`, between title and desc — only the Signal report cards carry
it): a **composed numeral**, Urbanist `clamp(30px, 2.8vw, 40px)` / 700 / -0.03em, `tnum`,
`#FFFFFF`, with the currency symbol in a nested `.offer-card-price__unit` at `0.42em` / 500,
no colour of its own, raised `vertical-align: 0.95em` to sit at the numerals' cap line.

- **Sans, not mono.** `design-tokens.md` §Typography assigns prices to Inconsolata, and
  `.pcard-amt` on the licensing page honours that at 46–58px, where the monospace comma cell
  reads as a display treatment. At card scale it does not — Inconsolata gives `,` a full
  character cell, so `$1,500` renders as `$1 , 500`. Measured against four candidates, sans +
  `tnum` is the only one that reads as a price here, and it matches `brand/components.md`
  §Stat strip, which already specs a value as sans + `tnum`.
- **The split needs a bare `$`.** `US$750` set at two sizes breaks across a meaningless seam;
  `$` + `750` splits where the eye already splits it. EN therefore carries a bare `$`. **ZH
  keeps `NT$`** — in Taiwan a bare `$` reads as NTD, and dropping it would make the two
  currencies indistinguishable.
- **`data-zh-html`, not `data-zh`.** The ZH string carries the unit `<span>`; a plain
  `data-zh` swap writes `textContent` and destroys it on the first EN→ZH toggle. Verified
  across three toggles.
- **Chosen over two alternatives**, both built and compared on the live page: a chip in the
  card's top-right corner, and a price in the CTA row under a hairline. The corner chip
  needed a ground of its own — the card scrim ramps bottom-up and is ~0 at the top, where
  bare white measured 2.05:1 against the Study card's art. The composed numeral sits inside
  the scrim and needs none.
- `.topic-chip__price` (12 / 600, `--text-tertiary`, inverting on the checked fill) stays a
  plain inline string: a composed numeral at that size is fiddly, not expressive.

| Card | Base | Min-height | Radius | Pad | Image layer | Hover |
|---|---|---|---|---|---|---|
| `.offer-card` | `#0E0E0E` + `--shadow-medium` | `clamp(340px,42vw,432px)` | 18px | 28px | CSS `::before` bg photo (`/assets/imagery/coremap/*.jpg`), per-card `--img-rot` (reports flipped 180°), z −2 | `translateY(-2px)` + `--shadow-high`, image 1→1.06, arrow `translateX(4px)` |
| `.report-card` | `--bg-placeholder-radials` + `--surface-tertiary`, `--shadow-stacked-low` | 420px | 18px | 28px | real `<img.report-card-media>` (`object-fit:cover`, z −2) | `translateY(-6px)` (transition 350ms), image 1→1.06 |
| `.about-card` | `#000` + `1px rgba(255,255,255,0.08)` | `clamp(192px,18vw,232px)` | 20px | body `clamp(24px,2.6vw,40px)` | dot-cloud PNG bleeds right, masked left; text `max-width:56%` | `translateY(-2px)`, border → `rgba(255,255,255,0.16)` |
| `.patent-card` | `--surface-recessed` tray (radius 18, pad 5) holding a white `.scard-core` (radius 13, pad 15) | — | 18 / 13 | 5 / 15 | none — data card (tier chip + jurisdiction chip + mono patent number) | `translateY(-3px)`, 3-layer shadow step-up, 700ms |

> **`.content-card` no longer exists** — removed in the dead-rule purge. The visible
> cards are offer / report / about / patent.

**`.report-card-dek` clamps to 2 lines, and to 3 at `≤640px`** (2026-08-27). Two lines is
a *grid* constraint — it keeps the 284px desktop tiles even. Once the cards stack there is
no row to align to, and the clamp was cutting **every** Chinese dek (3 lines wanted) and
most English ones (up to 5). Three lines clears ZH completely and takes EN most of the
way. The third line is free: `.report-card` is a fixed 420px, so the dek grows into slack
that was already inside the card and page height does not move — only the hero change
shows up in `docH`. `-webkit-line-clamp` **and** `line-clamp` both need overriding.

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

**`</main>` closes above `<footer>`** (2026-08-23). It used to close below it, which
meant `role="contentinfo"` was nested inside `main` and was never exposed as a landmark
on any page. Fixed on all 8 pages at once so the skeletons stay identical. The
`.footer-baseline` copyright row moved out with it.

The Products column's Licensing row carries a `.status-flag` (§17). `.footer-col a` is
`inline-flex` with `gap: 8px`, so the flag needs no margin; only the row that has one
gets `flex-wrap: wrap`, so a narrow 2-column footer drops the flag below the label
instead of squeezing it.

---

## 9. Imagery

- **Behind components** — the signature move: images sit *under* a bottom-up black
  scrim so white copy reads. Offer/contact cards use CSS `background-image` on `::before`;
  report/press cards use a real `<img>`. Per-card rotation via `--img-rot` (reports 180°).
  Contact left panel: `venture.jpg` under a top+bottom scrim (`rgba(0,0,0,0.45…0.55)`),
  **plus a second scrim scoped to the meta block** (`.contact-overlay-meta::before`,
  0→0.90 by 21%, bleeding to the padding-box edges). That block grew from two rows to
  four when the address and UBN were published, and because the overlay is
  `justify-content: space-between` a taller block grows *upward* — carrying the original
  Email / Office hours rows off the image's dark foot and onto the bright crest of the
  particle wave. Measured on rendered pixels: white fell from 21:1 to 2.08:1 there. The
  fix is local because the alternative — pulling the shared ramp up hard enough (~0.45
  alpha at 67% down) — flattens the swirl across the band where it actually reads. Two
  things this needs: `isolation: isolate` on the block, so its `::before` at `z-index:-1`
  paints above `.contact-overlay::after`; and a lead-in that **finishes above the first
  label** rather than starting there — at `-30px` the ramp was still climbing under the
  13px `dt`s, which is why the brightest pixel in that row sat at its top edge.
  **The plinth is still load-bearing after the re-order below**: the four items now sit
  on three rows instead of the original two, so the block is shorter and lower than the
  first version and measures 18.5:1 worst-case for values and 7.5:1 for the 13px labels.
  Disable the plinth and Office hours falls straight back to 1.65:1 — the wave crest is
  still exactly there. If rows are added or removed, re-measure; positions move with the
  count.
- **Contact meta rows** — `.contact-overlay-meta` is `grid-template-columns: auto auto 1fr`.
  The third track carries no content; it exists to absorb slack. The two full-width rows
  (Office hours, Address) span `1 / -1`, and a spanning item contributes its width to
  every track it crosses, so with a bare `auto auto` the 62-character address inflated
  both real columns and pushed the UBN out to ~65% of the panel with nothing above it to
  align to. Sending the slack to a `1fr` third track leaves the two auto tracks sized by
  their own content, so the UBN sits just past the email. Row order is Office hours,
  Address, then Email + UBN paired — DOM order matches visual order, so the screen-reader
  pass matches the page. **Office hours holds one line at every width the card is still
  two-column (≥881px), in both languages**; the CJK string is the wider of the two, so
  test that one. `column-gap` is `clamp(28px, 3.4vw, 48px)` rather than a flat 48px: at
  881px the overlay's content box is ~307px, and two fixed gutters left the email's
  column too narrow, so `word-break: break-all` split `contact@tisglobalinc.com` across
  two lines.
- **Dot-cloud bleed** — `.about-card` dot PNGs (`/assets/imagery/home/*-dots.png`) bleed
  off the right on a pure-black field, masked left with a `linear-gradient(90deg, #000
  0%, #000 18%, transparent 62%)` so the text half stays clean.
- **Partner logos** — CSS `background-image` from `--partner-*` SVG url() tokens, treated
  `grayscale(1) invert(1) brightness(1.4)` at `opacity:0.85` on the dark band, full
  colour on hover.
- **Every raster is a `<picture>`.** `scripts/build-images.mjs` emits WebP at 400 /
  800 / 1600 (plus the source's native width when that is not already close to a step)
  beside each original under `assets/imagery/`; the original stays the `<img src>`
  fallback. `sizes` is set from the width the element actually renders at, measured at
  390 / 768 / 1440 — not guessed. **`picture { display: contents }` is load-bearing**:
  it keeps the `<img>` a direct flex/grid item of whatever contained it, so the wrapper
  is a no-op for every existing rule.
- **CSS grounds use `image-set()`** — a plain `url()` declaration first, then an
  `image-set()` naming the WebP with the original as its typed fallback. One size per
  background: a 1x/2x pair changes which file renders at DPR 1 and quietly softened the
  licensing hero.
- The build **only processes imagery something references**, and prunes any variant no
  `srcset` or `image-set` names — otherwise it mints derivatives for orphans (it made
  80 files, 3.2 MB, for seven unreferenced sources on its first run). Render harnesses
  (`assets/product-shots/`, `assets/badges/`), `documents/` and the gitignored root
  probes do not count as references.
- **Lazy `<img>`** — `loading="lazy" decoding="async"`, and explicit `width`/`height`
  on every image so nothing reflows as it decodes. Global:
  `img { max-width:100%; height:auto }`, `object-fit:cover` on media.
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
sequencing, and do not add a fourth *animation* library.

**Lenis (`lenis@1.3.26`) is the one addition to that list, and it is not an animation
technique — it is scroll transport.** It replaces how the page scrolls; it animates
nothing. Where the three techniques above decide what moves, Lenis only decides how the
scroll position gets from A to B, so it composes with all of them rather than competing.

| | |
|---|---|
| **Where** | site-wide, from `assets/site.js`; `/assets/build/lenis.js` (~5.7 KB gzipped) |
| **Feel** | `lerp: 0.18` — ~0.27s to settle. Restrained on purpose; the community default of `0.05` is ~1.0s and reads as an effect rather than as weight. Settle time is ~`3/(lerp*60)` seconds, so a **higher** number is lighter. |
| **Fallback** | library-handled reduced motion (below), plus native scroll if the module fails to load — the `.lenis` class is never added, so every Lenis CSS rule stays inert |

Three rules that are load-bearing, each of which was a measured bug before it was a rule:

- **Never pass an `offset` to `lenis.scrollTo()` for an element target.** Lenis already
  subtracts the target's `scroll-margin-top` and the scroller's `scroll-padding-top`
  itself. Adding the usual `offset: -80` to clear the fixed topnav double-counts it —
  every methodology pipe-nav jump landed 285px short and showed the wrong figure in the
  pinned card. `styles.css` stays the single source of truth for anchor offsets.
- **Never add a horizontal track to the `prevent` list.** `gestureOrientation` is
  `vertical`, so Lenis never touches a horizontal gesture and those tracks already work.
  `prevent` is per-node and blocks *both* axes, so listing the reports carousel made an
  ordinary vertical wheel over it jump 400px natively instead of easing.
- **Nothing Lenis touches may be unconditional in `assets/site.js` or `styles.css`.**
  `capital.tisglobalinc.com` hot-links both files from this domain. Init is gated on the
  script's own origin and every CSS rule is `.lenis`-scoped, which keeps that site on
  native scroll.

**Reduced motion is the one effect here without a hand-written `@media` fallback, and
that is correct** — `respectReducedMotion` defaults to `true` and Lenis reads the query
*per scroll* rather than through a listener, so the preference applies live without a
reload: user scroll goes 1:1, programmatic scroll becomes a jump cut. Do not wrap it in a
`matchMedia` branch. (The licensing page's separate `isStatic()` guard is unrelated — that
governs the ScrollTrigger scrub, not scroll transport.)

On the licensing page the two must be wired together or the pin and the scrub drift apart
by a frame: `lenis.on('scroll', ScrollTrigger.update)`, `lenis.raf` driven from
`gsap.ticker`, and `lagSmoothing(0)`. That page is veiled today, so the handshake is
dormant until the veil lifts.

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

**One carve-out (2026-08-23).** §17's veil is content *deliberately* covered, and it is
the one case that works **because** it needs no JS rather than despite it. It never
animates, and everything inside a veiled `<main>` gets
`animation-play-state: paused` — a live keyframe under a `backdrop-filter` forces a
full-viewport re-blur every frame.

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

0. **Head**: alongside the chrome below, a page needs `<meta name="theme-color">`
   matching its ground (`#FFFFFF`, or `#0E0E0E` on a `data-theme="dark"` page), a
   canonical, and the OG/Twitter set. Add the page to `sitemap.xml` and to `PAGES` in
   `scripts/build-search-index.mjs` — a page absent from that list is unsearchable.
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
   Imagery goes in as `<picture>` with a WebP `srcset` and a measured `sizes` (§9) —
   run `npm run images`, then point the `srcset` at what it emitted.
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

13. **If the page carries a state veil (§17)**, six things follow: `data-veil` on
    `<body>`; the `.veil` div immediately before `<main>`; `inert aria-hidden="true"` on
    `<main>`, `<footer>` and `.footer-baseline`; skip-link retargeted to `#veil-card`;
    all three contact-chrome links pointed at `/#contact` (§4); and a
    `robots` `noindex` meta. Bump the `styles.css?v=` query in the same commit.

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
- **Tap targets ≥44px under `(pointer: coarse)`** — a dedicated block at the very
  **end** of `styles.css` covering `.report-dot`, `.icon-btn`,
  `.topnav-mobile-trigger`, `.topnav-logo-link`, `.announce-close`, `.search-input`,
  `.search-link`, `.footer-col a`, `.contact-meta a`, `.arrow-link`,
  `.lang-menu button`, `.bp-toggle-seg` and `.footer-nl-form button`, alongside `.btn`.
  **Keep that block last.** Several of these override an explicit `width`/`height` set
  further down the sheet (`.footer-nl-form button` is 32×32 at its own rule) and at
  equal specificity source order decides — moving the block up silently un-fixes
  whatever it lands above.
  Scoped to coarse pointers on purpose: the desktop chrome is tuned to a mouse.
  Links **inline in a sentence** are left alone — WCAG 2.5.8 exempts them, and padding
  them breaks the line box (the III / iPIC / NYCU links in the licensing copy).
  `.pat-modal-close` is not in the block: `patents/index.html` already extends it with
  a `::after` overlay, which keeps the 32px visual.
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

**Page-state veil (§17).** `inert aria-hidden="true"` on `<main>`, `<footer>` and
`.footer-baseline`; skip link retargeted to `#veil-card`; nav left reachable so the page
is not a dead end and the language toggle still works. Measured on rendered pixels:
`.status-flag` 8.9:1 base and 16.3:1 `--on-image` in light, 9.8:1 and 16.3:1 in dark.
The state is carried in words in every one of the six marker contexts, so nothing depends
on a visual-only cue.

**`</main>` now closes above `<footer>` on all 8 pages** (§8). `role="contentinfo"` nested
inside `main` was never exposed as a landmark; this was a live defect on every page,
unrelated to the veil.

---

## 14.1 Status chips — the container has to read, not just the type

`.status-flag` and `.sig-phase__chip` both passed text contrast comfortably (8.37:1
and 9.29:1) while reading as "too light", because the failure was never the type — it
was the **container**. `.status-flag`'s `--surface-tertiary` fill against the `#FAFAFA`
footer is 1.06:1, so the badge body was invisible and only the words showed.

- **Fill is `--surface-recessed`, edge is a `--border-tertiary` hairline.** No light
  fill in the ramp clears ~1.2:1 against all three grounds a flat chip lands on
  (`#FFFFFF`, `#FAFAFA`, the veil's 70% white). The hairline sits at 1.32–1.47:1 on
  every one of them, and that is what makes the shape resolve. Fill sets the mood;
  the edge does the work.
- **The hairline is `box-shadow: inset`, not `border`.** A border would add 2px to the
  box and reflow the row it sits in. Verified: chip geometry unchanged at 89×20.
- **`--sig-phase__chip` keeps its white fill.** It sits on a `--surface-tertiary` card,
  so white is already the direction that separates it (1.13:1); darkening it would drop
  that to 1.09. Only its hairline moved, `--border-secondary` → `--border-tertiary`.
- **`.status-flag--on-image` is exempt** and explicitly resets `box-shadow: none`. At
  92% white over photography the fill already separates, and an edge would fight the
  image.

## 14.2 The type floor is 11px, and 12px on a phone

Nothing in `<main>` renders below **11px** at any width, and below 640px nothing renders
below **12px**. Two rules carry the phone floor (2026-08-28):

| Rule | Where | Desktop | ≤640px |
|---|---|---|---|
| `.board-member__role` | `about/index.html` page block | 10px | **12px** |
| `.mth-note` | `styles.css` | 10.5px | **12px** |

Both were the only sub-11px **prose** on the site — a person's job title beside their name,
and a chart caption. Uppercase at 0.16em / 0.08em tracking, which buys a smaller size than
body copy but not 10px on a phone (≈1.7mm of cap height). Verified: no role rewraps at
12px, the two-line one stays two lines, `/about/` grows 13px and methodology 1px.

**The ~70 elements at exactly 11px are deliberate and stay.** Those are chips, axis labels
and card metadata — `.pat-domain` / `.pat-sub` (56 across 28 patent cards), the methodology
diagram labels, `.sig-phase__chip`, `.pcard-save`, `.lic-no`, `.placeholder-meta`. 11px is a
defensible label size, and raising it would reflow the patent grid and the charts: a design
change, not a legibility fix. SVG text inside diagrams is furniture and is excluded from the
floor entirely.

## 15. The build layer and the React island boundary

**The site is still hand-authored static HTML served from the repo root.** That has not
changed and is not planned to. What exists now is a build layer beside it, not under it.

### 15.1 What the build produces

`npm run build` runs five steps — `tokens`, `vite build`, `fonts`, `images`, `search` —
and writes into `assets/build/`, which the pages load with ordinary `<script>` /
`<link>` tags:

| Artifact | What it is | Step |
|---|---|---|
| `three.js` | the hero shader's three.js, pinned 0.160.0 | `vite build` |
| `gsap.js` | gsap + ScrollTrigger, pre-registered, pinned 3.12.5 | `vite build` |
| `islands.js` | the React mount runtime — the 21st.dev landing zone | `vite build` |
| `islands.css` | the Tailwind layer, generated from the brand tokens | `vite build` |
| `fonts/*.woff2` | 23 subset faces + the generated `@font-face` block in `styles.css` | `npm run fonts` |
| `search-index.json` | the search modal's index, and heading ids written back into the pages | `npm run search` |

`assets/imagery/*.webp` is a sixth output, written beside the originals rather than
into `assets/build/` — see §9.

**Order matters.** `vite build` runs with `emptyOutDir: true`, so `fonts` and `search`
run *after* it or their output is wiped. `fonts` and `search` also write back into
`assets/styles.css` and the page HTML respectively, which is why both are idempotent
by construction: an existing heading id is never rewritten, and the font block is
replaced between sentinels.

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

## 15.6 The legal modal — the site's first shared dialog

Terms / Privacy / Disclosures open from the footer of all 8 pages. `.lgl-overlay` /
`.lgl-dialog` in `styles.css` is the **first implementation of `components.md` §Modal** on
this site — before it, there were six bespoke overlays (`.search-modal`, `.mobile-drawer`,
`.mkt-overlay`, `.pat-modal`, `.sig-xpanel`, `#lang-overlay`) and no shared dialog at all.
It is `xl` 800, per spec.

- **Shell never scrolls; `.lgl-body` does.** `display:flex; flex-direction:column;
  overflow:hidden` on the dialog, one scrolling child with `min-height:0`, and the close
  button on the *shell* so it stays pinned. Copied from `.sig-xpanel`, the only shipped shell
  that got this right. `.pat-modal` scrolls its whole shell, which is why its close button
  disappears on long content — not the model.
- **`min-height: 0` on the body is load-bearing.** Flex children floor at min-content, so
  without it the shell overflows instead of the body scrolling.
- **`inert` + `aria-hidden` on `<main>` / `.footer` / `.footer-baseline` while open**, per
  §17.6. `aria-modal` alone is a promise the DOM doesn't keep; `inert` is what actually stops
  focus reaching the page behind. None of the six older overlays does this.
- **z-index 1100, deviating from the spec's 700.** The registry tops out at `.mkt-overlay`
  1000, and that newsletter popup fires on its own 45s timer — at 700 a marketing card would
  land on top of Terms mid-read. `site.js` also defers the mkt trigger while `body.lgl-lock`
  is set, re-arming rather than dropping it.
- **Content is fetched, one document per language** — `/legal/{doc}.{en|zh}.html`, six
  files. They are **full HTML documents**, not fragments: the footer links to them
  directly, so a long-press "open in new tab" has to render as a readable page rather
  than unstyled text at desktop width on a phone. `load()` parses the response and
  injects only its `<body>`; `.lgl-page` styles the standalone view and stands down
  when the same wrapper arrives inside the dialog.
  Not `data-zh` attributes: `site.js` collects its i18n nodes **once at init**, so injected
  content renders correctly and then refuses to translate on the next toggle. Per-language
  fragments sidestep that entirely; a toggle while open re-fetches via the `MutationObserver`
  on `documentElement[lang]`. **Test the language swap with the modal open** — that is where
  this breaks if anyone "simplifies" it back to one fragment.
- **Content before reveal, and that order is load-bearing.** Revealing first and filling in
  after rendered a 144px dialog that faded in and then snapped to ~680px mid-animation —
  measured, and the flash people reported. `lglOpen` now fills `.lgl-body` *before* setting
  `data-open`. Three same-origin fragments (~5KB) are prefetched for the on-screen language
  on `requestIdleCallback`, so the fill is normally synchronous; a cold cache gets 200ms to
  land before the dialog opens on its loading state, so a slow connection never leaves the
  click feeling dead. A language toggle while open keeps the current text on screen until the
  other language lands (`paint(doc, keepOld)`) rather than blinking through that state.
  `inflight` dedupes, so a click during the prefetch joins that request instead of firing a
  second one. **`min-height: min(520px, …)` on the shell** is the backstop for anything that
  still renders short — an error state, a fragment trimmed to nothing.
- **`body.lgl-lock` is a motion flag, not just a scroll lock.** The overlay carries a
  `backdrop-filter` across the whole viewport, so anything that keeps painting behind it makes
  the compositor re-blur the entire viewport every frame — a shimmer on the dialog and input
  latency that builds the longer it stays open. CSS motion under `main` / `.footer` is paused
  declaratively in `styles.css`; the four WebGL heroes (`index`, `about`, `reports`,
  `product/signal`) and the particle band in `site.js` each check `body.lgl-lock` inside their
  own rAF loop, because a paused keyframe cannot reach a `renderer.render()` call. The two
  wall-clock loops subtract held time so they resume on the phase they stopped on. **Verified
  by counting `drawArrays`/`drawElements`: normal cadence → 0 while open → normal on close.**
- **The close button carries a 44px hit target on a 32px box** — a `::before` at `inset: -6px`,
  plus `pointer-events: none` on the glyph. The icon is stroke-only (`fill: none`), so without
  both, a pointer inside the icon box resolves to a 2px stroke or falls through to `.lgl-head`.
- **The footer links keep a real `href`** to their fragment, so with JS off, for a crawler, or
  for a payment-gateway reviewer, they still resolve. JS intercepts and opens the dialog.
- **Prose is styled by element under `.lgl-body`,** not by class, so the six content files
  stay plain semantic HTML that someone can edit after a lawyer marks them up.

The two Privacy links inside the newsletter popup fine print (`index.html`,
`product/licensing/index.html`) **are** wired, as of 2026-08-24 — a privacy link sitting
directly under an email field has to work. They were `href="#"` because the legal dialog
inerts only `<main>` and the footer, and the popup sits outside both, so the two overlays
would stack. The fix is a listener on `mkt` that closes the popup on any `[data-legal]`
click; it fires earlier in the bubble than the delegated legal handler, so the dialog opens
on the same click. `lglCloseFn` checks `getClientRects()` before restoring focus, because by
then the trigger is in the DOM but hidden.

---

## 15.7 The shared overlay lock — nav drawer + search

Both were `role="dialog" aria-modal="true"` and neither backed it up: the page scrolled
behind them and Tab walked straight out into it. `site.js` now has one lock, used by
both, built from the same idiom as §15.6 — `inert` + `aria-hidden` on `<main>`,
`.footer` and `.footer-baseline`, a Tab cycle inside the panel, focus returned to the
trigger on close — with two additions those two need.

- **`body.nav-lock` is `position: fixed`, not `overflow: hidden`.** iOS Safari keeps
  scrolling the document behind an overflow-hidden body. The scroll offset is carried
  on `top` and restored on release; without it, closing the drawer on an iPhone
  returns you to the top of the page.
- **The lock is refcounted and the open/close pair is guarded on `dataset.open`.** The
  Escape handler is global and fires whether or not that overlay is the one open, so
  an unbalanced close would strand the page locked.
- Drawer links call `closeDrawer` **before** the browser follows them, so an in-page
  `#anchor` is not scrolled to while the body is still pinned.

The legal dialog keeps its own `body.lgl-lock` (plain `overflow: hidden`). It has extra
concerns this lock does not — scrollbar-width compensation, a MutationObserver for
injected i18n — and it is verified as-is; it would benefit from the same
`position: fixed` treatment on iOS.

## 16. Per-page notes

### 404 — `404.html`

GitHub Pages serves it for any unmatched path under the domain. Built from the
`reports/` chrome with `<main>` replaced; composes `.section` / `.container` /
`.section-head`, and the only new CSS is `.nf-list` / `.nf-actions`. It carries
`noindex` and **no canonical** — a 404 must not claim to be a real page — and its
`#contact` links are rewritten to `/#contact`, since it has no contact section of
its own (the same treatment `/product/signal/` uses).

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

#### Veiled — coming soon (2026-08-23)

TIS shifted focus away from the Licensing Platform. This page and `badge.html` are covered
by the §17 veil: the narrative below the veil is intact and unedited except for the three
CTAs and the announce bar, so lifting the veil restores a working page rather than
requiring a rewrite. `noindex, follow` on both — `follow` so link equity keeps flowing to
`/` and `/product/signal/` and re-indexing after the revert is fast.

The three `license.tisglobalinc.com/welcome` CTAs now point at `/#contact` and read "Talk
to us". They stay real anchors on purpose: a veil is presentation, not access control, so
the markup has to be correct on its own merits. Removing `href` would make them
unfocusable and unannounced; reusing `.btn:disabled` would conflate "product unavailable"
with "form in flight". The original hrefs are in an HTML comment beside each.

`NT$3,390` is gone. It lived only in this page's announce bar and contradicted the
picker's own `NT$8,490` floor, so it was **removed rather than corrected** — re-asserting a
live price on a page that is no longer selling would be worse. The dead
`data-target="licensing-signup"` went with it, as did the duplicate `sr-only` `<h1>` that
disagreed with the visible one.

Revert list: §17.10.

---

### 16.2 Signal — `product/signal/index.html`

Signal accent = `--surface-accent-signal` (dark surfaces only) /
`--surface-accent-signal-text` (body copy on white) / `--surface-accent-signal-wash`.

The page carries **one inline `<style>` block, and it is a sanctioned §0.3 exception —
not drift.** The header comment above the block records the audit: 76 classes, of which 52
are `sig-*` page-namespaced and 24 are shared classes reached through a scoped or descendant
selector, or as modifiers on shared components (`[data-page="signal"] .hero`,
`.sig-phases__foot .btn`, `.contact-form .field[hidden]`). One is applied at runtime rather
than in the markup — `.is-revealed`, by `site.js`. Zero dead rules. What is left is not
reusable enough to earn a place in the shared stylesheet; promoting it would repeat the
dead-CSS problem rather than fix it.

**It was 102 until 2026-08-27, and the 26 that left are the shape of the rule.** The report
sample overlay (`.sig-x*` / `.sig-doc` / `.sig-sheet`) moved to `styles.css`, and its FLIP
driver to `site.js`, the moment `methodology.html` started opening the same panels — a
one-page pattern earns the exception, a two-page pattern does not. The trigger cards stayed:
`.offer-card[data-report]:focus-visible` resolves `--sig-blue`, declared in this block, and
methodology's cards take the shared `.offer-card:focus-visible` instead. Watch for the
neighbours that were interleaved in that line range and are **not** part of the dialog —
`.sig-due`, `.sig-seller`, `.sig-mockflag` all belong to the intake form and the retrieve
widget and all stayed.

**The condition attached to the exception: if you change that block, re-run the dead-class
check and update the audit line in its header comment.** An unaudited block loses the
exception and is swept.

Two things are page-scoped because `styles.css` has no equivalent — the imagery behind the
report and contact cards, and the proof grid. The hero is no longer one of them; it composes
the shared `.hero-shader` carrier.

**The two contact cards are deliberately not the same treatment.** Retrieve is full-bleed —
one signal gradient stretched across the whole card, the overlay's own image and scrim killed
so there is no column seam. Intake runs the **homepage** treatment instead
(`index.html .contact-card--venture`): `coremap/reports.jpg` framed in the left overlay column
only, the card's black base filling the rest, the shared scrim and meta row intact. Its scrim
is the one local deviation — the shared ramp ends at 0.55 because `venture.jpg` is already
black at the foot, and `reports.jpg` is not, so the last third is steepened to seat the meta row.

**Intake form — the input type is a mode switch, not a filter.** A segmented track
(`.sig-seg`) picks granted / pending / idea, and exactly one input renders further down:
patent number, PDF upload, or free text. Asking for all three at once made the user answer
the same question twice. The report pills stay pills because they are a choice that can be
*ruled out*; `#intake-gate-note` states the PRD routing rule in copy and appears only when
it bites.

Order is **input type → report → the input → email**: both selections resolve as one block
before any data entry starts, which is also the heading's order ("Choose a report, upload
your input"). The overlay carries **one** `.contact-meta` pair at the foot: label
`Amount due today (10%)`, value the deposit figure, written by the gate script at the foot
of the page from the selected report's price. It was two pairs (`Pay today / 10% deposit`
plus `Amount due / $150`) and they said one thing between them, with the percentage set
loud and the figure — the number that actually leaves the card — set at label size.

- The value uses `.sig-due`, the same composed numeral and the same `clamp(30px, 2.8vw,
  40px)` as `.offer-card-price`, so the amount charged is set at the scale of the price
  that produced it. **It must be written `.contact-meta dd.sig-due`**: the shared
  component's `.contact-meta dd` is specificity (0,1,1), so a bare `.sig-due` at (0,1,0)
  loses in every source order and the figure silently stays at 15px.
- The empty state (`.sig-due--empty`) is an em dash at the **same 40px**, dimmed to 40%
  white. It keeps the slot's exact size and position, so nothing shifts when a price
  arrives, and the eyebrow already says what the slot is. It was "Select a report" at label
  size, which read as though the figure had never been enlarged at all.
- `data-zh-html`, not `data-zh`: the filled state carries a unit `<span>`. The script
  writes `data-zh` beside the visible text, because `site.js` collects its i18n nodes once
  at init — a JS-updated node without it renders correctly and then refuses to translate.
  Test the language swap **after** picking a report, which is where that breaks.

**The intake card holds the homepage card's exact height, at every width and in every input
state.** It is not a pinned pixel table — the homepage's own height is
`#contact-form + 2 × .contact-panel padding + 2 × .contact-panel margin`, and the last two are
`vw` clamps, so the min-height restates that formula and tracks `index.html` through every
width rather than at four sampled ones. Verified equal at 881 / 1280 / 1440 / 1600 (1 px apart
at 1024, sub-pixel). **Only `#contact-form`'s own height is a literal, and it takes one step:**
the homepage's six inquiry chips sit on three rows to 1298 px and two rows from 1299 px, so
640 → 593 there. If the homepage's inquiry chips or field count change, those two numbers go
stale and the cards drift — re-measure `#contact-form` on `index.html` and update them.

**Matching the height is not matching the spacing.** The first version spread the slack with
`justify-content:space-between`, which hit the homepage's height with ~55 px gaps against its
18 px — same box, wrong rhythm, and it read sparse. The gap now stays the shared 18 px and the
slack goes into the **two textareas** (`.sig-notes` and the idea input), the only fields with
no natural height. Both are `flex:1 1 0%`; every other child is `flex-shrink:0`. A zero basis
keeps them out of the base sum, so the leftover is always positive and simply gets split — the
form never has to claw height back out of a fixed field. This also absorbs the ~50 px swing
between a text input and a 3-row textarea, which is why the card, the panel and the button hold
still when you switch input type.

**Three things had to be true for that to resolve, and each failed on its own first:**

1. `height`, not `min-height`, on the card — a floor caps nothing.
2. `grid-template-rows: minmax(0, 1fr)` — a definite container height still leaves an `auto`
   row sizing to content and overflowing. `.contact-card` is `overflow:hidden`, so the excess
   was *clipped*: the submit button lost its bottom edge in the idea state.
3. `min-height: 0` on the panel and the form — flex and grid items floor at min-content unless
   told otherwise, so the constraint stops there instead of reaching the textareas.

Below 881 px the shared component collapses to one column, the height goes back to
content-driven, and none of this applies.

**Retrieve is one centred column, and deliberately not the two-column card.** Intake *asks*
for things, so a fixed frame suits it. Retrieve *returns* something whose size isn't known
until the lookup resolves — a status line, or a status line plus a locked report and a
seven-chapter outline — so it keeps the shared frame (radius, shadow, the full-bleed
gradient) and drops the columns: heading centred, `.sig-lookup` bar under it, result growing
beneath. It is the one card on the site with **no fixed height**, by design.

Three things this composition needs:

- **The image is `signal-cool-rot.jpg` — `signal-cool.jpg` turned 180°** (the repo's own
  `-flip` / `-rot` asset convention). Un-rotated, the image's near-white end sits at the top,
  exactly where the centred heading landed, and white measured well under 4.5:1 there; the
  two-column version never hit this because the heading sat on the deep-blue side. Rotated,
  the deep blue is under the heading and the pale cyan at the foot, so the composition does
  the work. `::before` still carries a light top-down scrim as insurance, because the image's
  dark corner is top-*right* and the left half of a centred heading still crosses mid-blue.
  **Any future image swap here has to be re-checked against that scrim.**
- **`background-position: center top`.** The card grows ~370 px → ~1290 px when a result
  opens. A centred `cover` image re-frames the whole card mid-interaction; anchoring to the
  top holds the heading's band still and grows downward into more image.
- **`grid-template-rows: 0fr → 1fr`** for the reveal, so it animates to the panel's own
  height. A `max-height` guess either clips the tall state or eases against a wrong number.

The free preview is **blurred on purpose**: PRD §8.8.0b AC-3 gives away the report's *shape*
for free (各章節將涵蓋內容之全貌) and never its content. The page mock stays unreadable; the
chapter list beside it is the accessible equivalent and carries the actual scope, in both
languages. Chapter names are PRD §8.6.1 verbatim.

### The report panels carry the offer (2026-08-25)

> The `.sig-x*` CSS described in this subsection and the next lives in **`styles.css`** as of
> 2026-08-27, not in this page's inline block — `methodology.html` opens the same panels. The
> composition notes below still hold; only the address changed. Methodology's copies drop
> `.sig-xprice` and swap the CTA for an `<a>` (see §17).

`.sig-xpanel`'s banner was a 200px decorative image strip (`.sig-xpanel__media`) with the
title block stacked underneath. It now carries the whole offer — eyebrow, name, lede, price
and a CTA — so the buy decision is reachable without scrolling past two full-page report
renders to find it. `.sig-xpanel__media` and `.sig-xpanel__head` are retired.

- **One composition, `.sig-xbanner`, on all three panels.** Arrived at by building three
  and comparing them live, twice: first over a split-column and a strip-plus-card layout,
  then over a full-width buy rail and a price-leads-the-name variant. The winner is folded
  into the bare class — a modifier with nothing left to distinguish it is noise.
- **Copy left, buy block bottom-right.** `.sig-xbanner__inner` is a row with
  `align-items: flex-end`, so the copy column and the buy column sit on a shared baseline;
  the price stacks over the CTA, both right-aligned. That alignment is load-bearing — the
  copy runs three or four lines and the buy block two, so anything else leaves the price
  floating mid-air beside the lede. The copy reads left to right and stops, and the price
  and the action wait at the end of that line instead of interrupting it. Band is
  `clamp(250px, 30vw, 310px)`; a full-width rail under the copy needed ~40px more.
- **`.sig-xclose` is untouched by any of it.** It stays `position:absolute` top/right 14px on
  `.sig-xpanel` at `z-index:3`, and carries its own surface plus border so it reads on image
  or on page ground.
- **It needs its own scrim and a light CTA.** The card's scrim lives on `.offer-card::after`
  and does not come along in the FLIP, so without one the copy sits on unmodified photo; and
  `.btn-primary` is a black fill that disappears into a dark image.
  (While the variants coexisted, the shared type rules had to sit *above* them: `.sig-xbanner
  h2` and `.sig-xbanner--bleed h2` had identical specificity, so source order alone decided
  them, and with the shared block last the title rendered dark-on-dark. Folding to one class
  removed the hazard.)
- **The CTA is split in two on purpose.** The *selection* happens synchronously on click, so
  the form is correct the instant the button is pressed; only the *scroll* waits for the
  close to finish, because a scroll issued while `body.sig-xlock` is still set is swallowed.
  If the morph's finish callback were ever missed, the reader still lands on a form with the
  right report chosen. It also clears the input-type gate first — otherwise pressing
  "Choose this report" for Snapshot or Study while the form sat on "Just an idea" would
  appear to do nothing.
- **The three "Here's what a X looks like… mock …" disclaimers are gone.** `.sig-mockflag`
  stays live: the retrieve preview still flags its placeholder data.

> **Verifying the panels headlessly:** `close()` resolves through a Web Animations
> `onfinish`, and that callback **does not fire under `--virtual-time-budget`** — the
> pre-existing X button fails the same way, so a panel that will not close in a headless
> harness is the harness, not the page. Test open/close by hand in a real browser.

### The samples read as a document (2026-08-25)

`.sig-xpanel__body` was two bare `<img>` at `border-radius:12px` with a 1px
`border-primary` hairline. White renders on the white panel ground gave the paper no
visible edge at all, and the cover sheet — 90% margin by design — read as the panel
dissolving into void before the reader reached anything. Radius 12 plus a hairline is
card chrome, and paper is not a card. It is now `.sig-doc`: a bar, a stage, captioned
sheets, and a closing line.

- **The bar states the artefact once** — a lucide `file-text` glyph, the filename in
  Inconsolata, and `N pages · N sections · watermarked` pushed right. The length is what
  was missing where it mattered: the retrieve widget below it has published
  "4 sections / 7 chapters" since 2026-08-18 (`TIERS`), while the panel a buyer actually
  opens said nothing at all, so all three tiers read as two images each and the 24-page
  Study looked no heavier than the 8-page Snapshot. Page totals are **8 / 24 / 12**;
  section counts stay 4 / 7 / 4 and `chapters` / `章` stays exclusive to Study, per the
  distinction already drawn in the `TIERS` comment.
- **The bar is deliberately NOT `position: sticky`.** Pinned to `top:0` of
  `.sig-xpanel__scroll` it passes under `.sig-xclose` (absolute, top/right 14px, 40px
  square, `z-index:3`) and the close button parks on the page count — the one string the
  component exists to show. Captions carry continuous orientation instead, which is the
  better answer regardless. Don't "fix" this later.
- **`.sig-doc__stage` uses `--surface-recessed`**, the token documented as the tray a
  card sits *in*. It is the darkest neutral tray token available; `surface-tertiary` and
  `surface-quaternary` are both lighter and leave the paper edgeless again. The sheets
  stay `#FFFFFF` in both themes, because paper does not invert.
- **`.sig-xreport` was restyled in place, not replaced** — radius 12 to 2, hairline
  swapped for `shadow-medium`. It is still deliberately unblurred, the inverse of
  `.sig-rt__page img`. Preserve that inverse.
- **Nothing in the component goes below `--text-secondary`.** `--text-tertiary` is
  **2.68:1** on `--surface-recessed` and **3.11:1** on `--surface-secondary` in the light
  theme — both under the 4.5:1 floor, and every string here is 12–14px. `--text-secondary`
  is 8.90:1 on the bar and 7.67:1 on the stage. `.sig-rt__pagemeta` below *does* set
  tertiary at 12px; that is the mistake not to copy.
- **The closing line is a boundary statement, not a contents list.** A list was built
  here first and thrown away: every page-1 render already prints its own `CONTENTS` block,
  numerals and page numbers included, so a list under the sheet restated what the reader
  had just looked at. It also sidesteps the arithmetic — "the remaining 6 pages" invites
  the question of whether the cover counts as page 1, which nothing on this site answers.
  Naming what is shown and what is delivered avoids it. This revives
  `.sig-xpanel__body p`, dead since the panel disclaimers were removed; it is not those
  disclaimers returning, since it states what you get rather than flagging a mock.
- **Every new string is static markup with `data-zh`.** Nothing is injected, for the same
  reason the per-tier outlines are not: `site.js` collects its i18n elements once at init.

> **Verifying:** open/close still resolves through a Web Animations `onfinish`, so the
> headless caveat above still applies — a panel that will not close in a harness is the
> harness. Opening *does* work headlessly under `--force-prefers-reduced-motion`, which is
> enough to check the static composition. Note also that **dark mode does not ship** —
> `site.js` parks it and nothing sets `data-theme`; the component is token-only, so it
> follows whenever dark is restored, but it cannot be verified today.

### The preview is per-tier (2026-08-18)

Signal sells three tiers, so the preview shows what each one actually contains. `ORDERS` in
the page's retrieve script carries a `tier` (`A` / `B` / `BX`, matching the order number's
TIER field per PRD §8.8.0c), and `TIERS` maps that to a thumbnail and a page-count label.
Four things worth knowing before editing it:

- **`.sig-rt__preview` is `260px 1fr`, not `200px 1fr`.** The page is the artefact being
  bought; at 200 it read as a chip beside the outline. 260×346 against a 564px text column
  still keeps every chapter scope-line on one line at 1440.
- **All three outlines live in the markup, hidden, and the JS only flips `hidden`.** They are
  *not* injected. `site.js` collects its i18n elements once at init, so an injected list
  renders correctly and then refuses to translate. The same reason drives the
  `pageMeta.dataset.zh` write beside the visible text — test the language swap **after** a
  lookup, which is where this breaks.
- **Each tier's outline must match the contents printed on its own cover render.** The
  outline is a description of the report; if they drift, the free preview stops describing
  the thing it previews.
- **The covers must stay structurally distinguishable through the blur.** Source of truth is
  [assets/product-shots/signal/signal-report-covers.html](assets/product-shots/signal/signal-report-covers.html),
  rendered to `assets/imagery/signal-reports/signal-report-p1-*.png` at 1136×1512. Form is a
  credit-rating action: masthead, the finding as a sentence, a summary box, issuer facts,
  metric readouts, the tier's own chapter block, contents, basis of rating.

  **The masthead, facts grid, percentile arc, rank histogram, PSS meter and radar are ported
  from the June Pro Report** (`brand/catalog/signal-reports-preview.html`, whose page-1
  grammar is the older `.r-titlebar` / `.r-cover` / `.r-metricstrip` stack now surviving
  there only as dead CSS). They are rebuilt on hairlines rather than in rounded card boxes;
  the stacked 14px-radius containers are what made that page read as a dashboard. Charts
  stay **monochrome** per `design-tokens.md` §7.2 — colour never encodes score.

  **The Innovue wordmark in the masthead is the SVG, never text.** An earlier revision set
  the string `INNOVUE` in letterspaced Urbanist; a text substitute for a partner wordmark is
  a brand-identity defect (`visual-guide.md` owns Innovue attribution). A 404 on that `<img>`
  renders its `alt` and silently reproduces the bug, so check the rendered PNG, not the DOM.

  **The grade is a letter, not a tile, and its colour is the SABCD ramp.** No fill: the cell
  sits on the page ground and the letter alone carries the grade, with its two small labels
  in the same colour. Two filled treatments were tried and both failed — a cream panel made
  the grade something you read *around*, and a solid `#252525` panel was the heaviest shape
  in the blurred retrieve thumbnail.

  Because the ground is light, the ramp takes its **light-surface** value: `--score-s`
  `#8B6914` for the tier-S sample, 5.09:1 on white. Not the `#D4A017` dark-surface value,
  which only applies on a dark ground; getting that backwards is the likely mistake. The
  colour is the tier and nothing else, so a grade-A report renders `--score-a` `#047857`,
  B `#0369A1`, C `#6D28D9`, D `#C2410C`. The June sample is green purely because it is an A.
  Never substitute a decorative gold.

  **All three tiers carry a letter grade, the same subject, the same facts and the same
  metric row, so none of those can carry the difference between them.** The tier's chapter
  block does:

  | Tier | Chapter block | Blurred silhouette |
  | --- | --- | --- |
  | Snapshot `A` | 8-pillar radar, paired with the rationale | soft circular mass, sparse page |
  | Study `B` | 8 pillar bars + top strengths / risks | hard dark band across the middle |
  | Survey `BX` | 10 descending similarity rows | stepped ladder, right-hand bar column |

  Snapshot gets the radar and Study does not, because that is what their chapters are:
  Snapshot ch.3 is "Eight pillars at a glance", Study ch.3 is "Eight pillars, all 50 indicators". At-a-glance
  is a radar; the drill-down is per-pillar values. Giving both a radar was the first attempt
  and made the two thumbnails near-identical. For the same reason the facts grid appears on
  Snapshot and Study but not Survey — those two open on "Patent facts & family" and Survey
  opens on "PSS overview".

  Change a cover and re-run the blur test at 260px with `blur(4px)`. If the three are not
  tellable apart, the thumbnail has stopped carrying information and is decoration.

  **Sample data is the canonical record, not invented.** Facts, pillar values and the top
  indicator / risk rows come from `REPORTS['macrosilicon-s']` in the preview file, i.e. the
  same fictional patent the June render documents. The one deliberate divergence is the pool
  size: the covers say 1,433 where the preview file uses its own 183-patent industry cohort.
  Both figures are now out of step with the site, which writes the pool `1433` with no
  separator — the covers are rendered artifacts and need a re-render to catch up.

  The sheet is a fixed-height flex column, so every block in it is `flex:none`. Without that
  a long page silently *compresses* its children instead of overflowing — which cropped the
  Survey grade cell in half. Note that `.contents` carries `margin-top:auto`, which
  absorbs all remaining slack and pins every total to exactly 1512: to read the real natural
  height, zero that margin first, then sum `.sheet`'s children. Current headroom is Snapshot 9px,
  Study 42px, Survey 35px. A headline breaking to a third line costs ~50px and is the single
  most expensive thing that can happen to these sheets.

- **One asset set serves both surfaces.** The same three renders are the blurred retrieve
  thumbnail *and* the full-size sample behind "See a sample report" (`#sig-xoverlay`
  panels A / B / C). `.sig-xreport` is deliberately **unblurred** — the inverse of
  `.sig-rt__page img`: the sample is readable, the report you have bought but not yet paid
  the balance on is not. Preserve that inverse.

  Before this, the overlay showed `signal-pro-report-compact-a/-b.png`, which are SABCD
  *grade* variants of one report type rather than three report types, so it sold the first
  two tiers with two images differing only by letter. Panel C had no render at all and carried a
  hand-authored `<ul class="sig-xsimlist">` on an unrelated fictional patent. Both are gone;
  `.sig-xsimlist` / `.sig-score` were removed with it. All five `signal-pro-report-compact-*`
  PNGs are now unreferenced — kept on disk as valid grade specimens, live on no page.

**The hero** (2026-08-11, reworked 2026-08-25) runs **the homepage's own shifting-lines
shader**, recoloured to a single blue hue and positioned so the band runs **above** the copy.
It uses the **shared `.hero-shader` carrier**
from `styles.css` — position, `z-index:2`, the 600ms `.is-ready` crossfade — so there is no
page-local backdrop layer at all and the only page-local hero rule left is `.sig-hero-scrim`
(z3). Content is z5, the shared `.hero-inner` value.

The 2026-08-25 pass closed the gap with the homepage: the glow maths, the sweep and the
strand split are now the homepage's own values, and the band sits above the copy rather than
under the CTA row. What had drifted was the *bloom* — the fork read as a thin cyan line under
a diffuse wash where the homepage reads as light. Everything before that is gone: a radial
ring pulse, then a scanning hex-dot lattice, then a Stripe-style mesh gradient over a rotated
still. Things to know:

- **The recolour is not the `saturation` uniform.** The homepage splits one line into R/G/B
  and mutes it by blending toward the brightest channel — that is a *chroma* control, so it
  travels between "full RGB" and "grey" and no value of it produces a blue. Here the three
  split strands are multiplied by three steps of one blue (`#06344F` / `#0A72B0` /
  `#0EA5E9` = `--sig-blue`) and summed, so hue is fixed and the split survives as depth.
  `saturation` is deleted rather than set to 0. **These three hex literals are sanctioned
  shader-hex** — GLSL cannot read CSS custom properties (§1.3).
- **The glow term is unbounded, exactly as the homepage writes it.** `0.05/abs(...)` running
  past 1.0 at the crest *is* the glow: it is what gives the band a blown-out core and a
  falloff wide enough to read as light rather than as a line. Each strand used to be
  compressed with `g/(1+g)` before tinting, to keep the sum inside a single hue — but that
  maps 20 to 0.95, which flattens the whole bright region into one thin strand. **Do not
  reintroduce a ceiling here**; the hue is protected by the dial below instead.
- **`coreWhite` is that dial** (`0.65`). It mixes the crest toward `vec3(v)` — the brightest
  channel — not toward `vec3(1.0)`: that is the homepage's own `saturation` trick run
  backwards, dropping hue *without* touching brightness, so the glow keeps its thickness
  while the core goes white. A `smoothstep(CORE_LO, CORE_HI, v)` gate over that same
  brightness is what keeps the whitening on the core instead of washing the band. At 0 the
  band blooms in pure blue; raising it grows the hot core toward the homepage's.
- **`yOffset` is measured off the copy block, not a constant** (2026-08-17, re-anchored
  2026-08-25). The band's centre rides **the top of `.pillar`** — eyebrow included, not the
  headline and not the CTA row — plus `BAND_LIFT` (`0.18`), which is the gap the homepage's
  own constant leaves between its band centre and the top of its copy at 1440×900. Anchoring
  on the block rather than the `h1` keeps the eyebrow out of the core when the headline
  re-wraps. It has to be derived: `yOffset` lives in shader space, normalised to `min(w, h)`,
  while the copy is a roughly fixed ~400 px content stack centred in a `100dvh` hero — so the
  two only agree at one viewport. The constant this replaced (`-0.36`) sat on the CTA row at
  1440×900, drifted *below* it at 1440×1080, and fell outside the row entirely at 1280×800;
  it survives as the fallback when `.pillar` can't be found, degrading to the old
  band-below-the-copy composition rather than to 0. The maths: the canvas is stretched
  to the mount, so a fraction `f` down the mount is `h * (1 - 2f) / min(w, h)` in shader
  space — and it must use the same `w`/`h` `resize()` computes, because on coarse pointers
  `h` is the locked tall buffer, not `clientHeight`.
- **`yScale 0.5` and `distortion 0.05` are the homepage's**, replacing a flat `0.18` / `0.11`
  bar. `0.11` existed only because compression cost the strands their brightness separation,
  so the split had to carry depth geometrically; the bloom carries it now. Change either and
  re-check **across phases**, not in whatever single frame is on screen — the crest travels,
  so a frame that looks clear proves nothing.
- **The band crosses the copy once a cycle, and that is the homepage's behaviour too.** At
  `yScale 0.5` the crest travels half the frame, which is wider than the headroom above the
  copy. Rendering both shaders offline at eight phases (2026-08-25) shows the homepage's own
  core running through its headline zone at four of them; it simply ships without a scrim.
  Do not "fix" this by shrinking the sweep — it is the effect.
- **The reduced-motion still is derived too.** `staticPhase(w, h)` freezes the clock at
  `-p.x` of the copy block's **right edge**. Two choices there, both got wrong once. `-p.x`
  rather than `π - p.x`: this phase rises over the left half and descends to the right, so
  the band lifts away from the copy and crosses only the empty right side — the opposite of
  the choice made when the band lived *under* the CTA row, flipped because the copy is now
  below the band. And the right edge rather than the centre: the band descends across the
  copy's own width, so anchoring at the centre put it on the anchor at mid-headline and
  ~150 px lower by the end of the line, running the core through the last word. The animated
  path starts on the same phase, so first paint has the band over the copy rather than
  arriving mid-sweep. `STATIC_T = π/2` remains only as the unmeasurable-copy fallback.
- **The scrim is a pool under the copy, not a wash over the hero.** `.sig-hero-scrim` is an
  ellipse seated on the copy column (`66% 44% at 24% 52%`, peak `0.52`) plus a `0.30` bottom
  lift that stops at 16% to seat the scroll cue. It replaced a full-width floor reaching 56%
  and a left guard reaching 56%, which between them dimmed half the frame to hold copy
  against a band that ran *below* it. Aiming it let the total come down: nothing outside the
  copy's footprint is touched, so the band keeps full brightness where there is nothing to
  read. This page keeps a scrim where the homepage has none because its copy block is taller
  — eyebrow, two-line headline, two-line sub — so more of it sits in the crest's path.
- **Two fixes the homepage copy still needs.** This one drives `time` from
  `performance.now()` (the homepage advances it per frame, so it runs at double speed on a
  120Hz display) and renders a single frame under reduced motion instead of leaving a rAF
  loop spinning on a frozen clock. `index.html` has both quirks and is worth fixing.
- **This page drops `.hero-grid`** (the homepage keeps it) — a square grid crossing the glow
  band reads as interference.

**The proof grid** was recomposed on **2026-08-25**, then split. It is now **two sections**:
the proof (stacked head + the black PSS ledger) and **How it works** (its own head + a
three-across phase row on a white card). It replaced a two-column head over an
asymmetric three-panel grid (wide ledger, tall wash process spanning both rows,
scrim-captioned image card), which itself replaced three black cards in a flex row plus a
7-beat timeline on a spine.

**There is no blue left in either section.** The `--surface-accent-signal-wash` panel, the
phase-name accent and the chip ink all went when the process left the card; `SABCD` reads
white like the other three facts. The ledger stays black for contrast and hierarchy, not to
host an accent. `--sig-blue` is still live further down the page (retrieve status timeline,
report-card focus rings), so the token is not dead.

Three things drove the rebuild, and they are the constraints to preserve:

- **Both section dividers sit on the same step, and that costs no CSS.** The head's `h2`
  took the full `.h-section` display scale while its own peer twelve hundred pixels above
  ("Three reports.", inside `.section.offerings`) took the reduced one — an accident of that
  section borrowing `.offerings` for its card grid. The dek diverged too (58ch vs the base
  44ch, a wider head gap, `text-wrap: balance` where its peer had none). The fix is
  `.section-head`, whose `h2` rule already resolves to `clamp(24px,2.8vw,36px)/600/-0.015em`
  and beats `.h-section` on both specificity (0,1,1 vs 0,1,0) and source order (4012 vs 414).
  **Do not add a `max-width` to that dek** — inheriting `.section-dek`'s own 44ch is what
  keeps the pair matched.
- **`1433` heads the ledger, not the header.** It is the denominator the `0–100` note is
  percentile-ranked against and the pool `SABCD` discretises; both notes say so. It sat in
  a right-hand column stacking three unrelated registers (72px numeral, 14px credit,
  `.btn-secondary`) aligned to nothing.
- **The four facts run as ONE row** — `50 → 8 → 0–100 → SABCD`, input to output. That
  ordering is why the tracked-caps "THE PSS PIPELINE" kicker is gone: the row states it, and
  the `<ol>` keeps its label as an `.sr-only <h3>` so `aria-labelledby` and the list
  semantics survive. The row only fits because the panel is full width; at the old
  `1.75fr` the cells were ~180px and the notes shredded. It folds to 2×2 at `1100px`.

And the rest:

- **The section carries exactly one Innovue credit**, corner-set on the ledger. It carried
  three — there, in the dek, and in the Produce phase — against `brand-voice.md` §7's *"once
  at the top, then TIS voice takes over."* It is the sanctioned credit text, **not a badge**:
  `visual-guide.md` §Innovue Co-Branding defines two constructions (this credit, and the
  submark│divider│logo lockup) and a bordered chip is neither. `.innovue-wordmark` only
  swaps to its light SVG under `[data-theme="dark"]`, so the ledger pins it theme-agnostically
  or light theme paints Innovue Blue on black.
- **The colophon states what the reference pool is.** `legal/disclosures.en.html` declares
  the pool is TIS-and-partner patents that TIS licenses commercially, and *"not an independent
  third-party benchmark."* The `0–100` note therefore no longer says "benchmark" or
  "cross-industry" — marketing copy cannot contradict the disclosure it links to.
- **The process card is white, and its heading is a peer divider.** The card was
  `--surface-accent-signal-wash`; it is now `--surface-elevated` with the ledger's own 20px
  corner and a `--border-secondary` hairline, so the two blocks read as one family down the
  page. No shadow: `body` carries a faint 32px graph-paper grid that any solid surface
  covers, which is what makes a white card read on a white page. The heading moved out of the
  card to a `.section-head`, matching the proof section above (head on the page ground, panel
  beneath it).
- **The phase name separates from its title by size and weight, not hue**, and **the chip's
  fill is `--surface-tertiary`, not white.** White lifted the chip off the wash; on a white
  card it would vanish. Do not "restore" it.
- **The page now runs four matched dividers**: "Three reports.", "A patent score you can
  trace all the way to the number.", "How it works.", "Get started." All four are
  `.section-head`, so all four inherit the same step and the same 44ch dek.
- **The two-stage payment structure is carried by the two chips** (`10% deposit` /
  `90% balance`) in the first and last phase. The retired timeline said it with accented
  nodes; don't quietly drop the chips.
- **The ledger's labels sit beside the numerals and are deliberately not column-aligned**
  (2026-08-17). Aligning them needs a shared numeral track — `min-width:5ch` or subgrid,
  either works — but the values run from one mono glyph (`8`) to five (`0–100`, `SABCD`),
  so a shared track strands `8` ~90 px from its own label and the pair stops reading as a
  phrase. Right-aligning inside that track closes the gap but unmoors the numeral from the
  note beneath, which starts at the cell edge. Per-`<li>` `max-content` keeps every pair
  tight; the notes' common left edge is what carries the column.
- **The ledger notes take `text-wrap: balance`, not `pretty`.** `pretty` only guards the
  last line against an orphan, which left them at 44/25 characters; `balance` evens them.
  The rest of the page's running copy stays `pretty`.
- **The image card is retired.** `signal-cool.jpg` and its `center bottom` anchor, the
  scrim ramp and the `--sig-spring` hover are all gone; the human + AI trade-off it captioned
  now closes the process panel, where it argues rather than decorates. The image is still in
  use on five other pages, so nothing is orphaned.

The in-page anchors `#reports` and `#intake` are link targets from
`methodology.html` — three of them now: both `.mth-reports` cards point at `#reports` and
the exit button points at `#intake`. Don't rename either without fixing that page. The reverse dependency also exists now: `.sig-colophon`'s "How the pool is composed"
exit points at `methodology.html#pool`, so that anchor is load-bearing (§16.3).

### 16.3 Methodology — `product/signal/methodology.html`

Rebuilt 2026-08-26, twice. It answers one question, *how is the score calculated*, and
carries nothing else. Three inbound links land here: the homepage hero's primary CTA, the
Signal page's ledger foot, and `.sig-colophon`'s "How the pool is composed" — the last two
anchored at **`#pool`**, so that id is load-bearing.

**This page has no `.hero`, and it is the only content page that doesn't.** It opens on
`.mth-masthead`: `h1` at `.h-section` scale rather than `.pillar-title`'s hero clamp, one
lede line, then the stage band. That scale choice is the same reasoning §2.1 gives
`.veil__title` — a reference document consulted under scrutiny is a quiet statement, not a
claim. Because there is no `100vh` block anywhere on the page, it is also the one page
where a **tall-viewport screenshot is safe** (§10's verification note otherwise forbids it).

#### The second rebuild: one pinned instrument, and no dark surface at all

The page used to be **six alternating `.feature-row` sections**, light copy against a dark
`#0E0E0E` `.mth-panel`, down its whole length. Both halves of that are gone.

It is now **one stage**: a column of six copy steps beside a single figure card that pins
and swaps as the reader scrolls. The forms inside the card are the reference report's own
(`assets/imagery/signal-reports/signal-pro-report-compact-a.png`) — an arc for a
percentile, a histogram with a marker for a rank, a radar for the pillars, a big tier
letter in a tinted seal — and each is **composed** as figure-plus-labelled-readout rather
than centred in a box it cannot fill. That composition is the fix for a measured defect:
four of the six figures were intrinsically-sized objects floating in a 681×340 cell, the
arc filling 27% of it.

**The panels are no longer dark, and nothing else on the page is either.** They take
`--surface-tertiary` `#F3F3F3` — the same token as the masthead band, so the strip at the
top and the figure below it read as one material. §11.1's "weight comes from the panels"
no longer describes this page: its weight is the pinned grey field plus that band. A dark
band above the figures was built and rejected; a dark card around them was built and
rejected. Don't reintroduce either without asking.

Three consequences, all easy to get wrong:

- **`.mth-panel` came back off §1.3's always-dark list.** See the note there.
- **Every mark colour resolves a `--mth-*` custom property declared once on
  `.mth-panel`.** Change the ground there and the marks follow. Hardcode a hex in a figure
  rule and they don't.
- **The accent is `--surface-accent-signal-text` (`#0A72B0`), not
  `--surface-accent-signal`.** The vivid one is **2.66:1** on `#F3F3F3` and fails even the
  3:1 graphical floor. For the same reason the SABCD ramp is the AA-on-white `--score-*`
  steps, not `--score-*-vivid`. Measured against `#F3F3F3`: marks 13.81:1, captions
  6.12:1, labels 4.80:1, accent 4.68:1, SABCD 4.58–6.40:1. Labels are the tightest, and
  they have to clear AA on their own because a label is read, not just seen.

#### The stage

`.mth-pipe` is lifted **out of `.container`** into `.mth-pipe-band`, which then holds its
own `.container`. The strip reads as one continuous measure only if it runs edge to edge,
and a full-bleed child cannot live inside a padded, max-width, centred box: a negative
margin only reaches the container edge, and `100vw` overflows the moment a real scrollbar
exists. `.announce` is the site's other full-bleed in-flow band and the same shape — reuse
that pattern, don't invent one. The band also took over the pipe's `margin-top` and
`border-block`, because a rule sitting on the top edge of the tint reads as a seam.

**The six anchors moved onto the six steps**, each of which is a real `<section>` with its
own `aria-labelledby`, so every `h2` still sits inside a labelled region.

**Copy and figure are in different columns, so the reading order is six steps then six
figures.** This is the one thing the sticky pattern costs. Every `<figure>` is therefore
labelled by its own step's `h2` — the adjacency that used to carry the association is gone,
so the association is stated. All six figures stay exposed to assistive tech; opacity-0
content still reads, and six labelled figures in order is more than a sighted reader gets,
not less. Don't "fix" that with `visibility: hidden`.

**The stage is a grid whose six figures all sit in cell `1/1`** — never a fixed height. It
is then exactly as tall as the tallest of the six. A `height: clamp(420px, 62vh, 620px)`
was tried and it was a measured bug: the tallest panel is 583px, so a 693px-tall viewport
produced a 430px stage and squeezed four of the six panels past their own edges.

**While pinned the card belongs to the stage, not to each figure**, and the swap is
**sequenced, not crossfaded**. Both are one fix for one symptom — a visible flash on every
swap — and they only work together:

- A symmetric crossfade holds both figures at part opacity for the whole overlap, and no
  two steps draw the same thing, so the reader gets a double exposure: the radar showing
  through the arc at half strength. The incoming figure now waits 130ms for the outgoing
  one to clear.
- That handover passes through a moment with no figure at full opacity, so a card riding
  on the figure would blink out with it. Moving the card to the stage also kills a second,
  smaller pulse — two stacked opaque fills at 0.5 composite to `#F6F6F6`, not `#F3F3F3`,
  across the card's whole area — and makes the frame stable for free, which matters because
  the six differ by ~170px and a frame that resized on every swap would jump.

**`.is-live` means *actually pinned*, not "the script ran."** `site.js` asks three media
queries — `prefers-reduced-motion`, `(max-width: 980px)`, `(max-height: 700px)` — and
declines to add the class if any matches. The height one is measured: the tallest card is
583px and the pin sits 84–148px down, so under ~700px its bottom would be off-screen. It
re-evaluates on those queries' own `change` events, **never on `resize`**, and there is no
scroll listener anywhere — the swap is an `IntersectionObserver` with
`rootMargin: '-45% 0px -45% 0px'` over the six steps. The CSS carries the same three
conditions as belt and braces, and hands the card back to the panels there, because a stage
that is no longer pinned is just a tall column and one grey box around six stacked figures
is not the fallback anyone wants.

**The markup default is the no-JS state**: everything stacked, all six figures visible.
Nothing on this page is hidden unless the swap is genuinely running.

#### `#pillars` draws the counts, and that is the point

The radar plots the **eight indicator counts**, not the eight pillar scores. This is the
one figure on the page that is not about a patent, and the distinction is load-bearing:

- The eight pillar **scores** are the paid deliverable — Study chapter 3 is the eight
  pillars in depth — so drawing them here would hand over the thing the report sells. The
  page that preceded this one refused a radar for exactly that reason, and it was right.
- The copy beside this panel is about **counts**: *"Text Quality and Legal Strength carry
  eight indicators each, Network Centrality carries four."* A score radar under that
  paragraph contradicted it.
- Counts are **PRD §8.3 verbatim** (7 / 8 / 7 / 5 / 8 / 4 / 6 / 5, summing to 50) and the
  shape is a property of the **method**, identical for every patent.

Which is why `#pillars` alone carries **no subject strip, no illustrative flag and no
caption** — there is nothing to flag, the axis labels are the readout, and the prose
already states the fact. Rings are at 0.25/0.5/0.75/1.0 of an eight-indicator maximum, so
one ring is two indicators. If you edit a count, edit the sum.

#### The worked patent

Five of the six panels carry a subject strip, and the repetition is what makes them read as
one evaluation end to end rather than five unrelated diagrams. It is **`US10148981` /
Vivid Imaging Systems**, which is not invented for this page: `US10148981` is already the
intake placeholder at `product/signal/index.html`, and Vivid Imaging is an example company
graded **A** in `documents/signal-prd.md`. The numbers agree with each other and with the
PRD's own bands, which the page does not print: PSS 62.17 → composite percentile 78.4 →
top 21.6% → rank 310 / 1433 → tier A. The four scenario scores straddle the composite, and
their spread is exactly **19** because the caption says "a 19-point spread" in both
languages and a number that keeps that true costs nothing.

**`#indicators` has four columns: Indicator / Raw / Pctl / Wt.** `Wt` is redacted, not
omitted — the copy says each indicator carries a weight and this page withholds it, so the
column has to be visibly there and visibly withheld. There is deliberately **no
"normalised" column**: raw value → in-pool percentile is the whole chain, and a number
between them would invent a step the PRD does not have. One was briefly built (percentile
× 0.83) and it contradicted the page's own copy, which says *three* numbers.

**What this page must never publish:**

- **An individual indicator name.** Chapter 3 of the Study report is the paid deliverable.
  The page this replaced named PageRank, betweenness, hub/authority, triadic filings,
  GDP-weighted coverage, detectability, design-around and damages basis, several of which
  were not even in the PRD. `#indicators` shows the *shape* of an indicator row with the
  names redacted, which is why its caption has to say the redaction is deliberate.
- **The eight pillar scores.** New with this rebuild, and the reason `#pillars` draws
  counts. Before it, the page published a full pillar breakdown.
- **SABCD cut-points.** PRD §8.3 marks the percentile bands illustrative and states the
  real split is calibrated on the live distribution (「本文件不載明最終閾值」). `.mth-shares`
  therefore *draws* the shares (D 15 · C 20 · B 30 · A 20 · S 15) and prints no threshold.
  The shares themselves are safe — they are the PRD's own `占比` column, and the Signal
  page already publishes "S is the top 15%".
- **"benchmark", "cross-industry", or 180M as the ranking basis.** The two figures have
  different jobs: **180M** is where indicator values are computed from, **1433** is what a
  patent is ranked *inside*. The old page fused them and contradicted
  `legal/disclosures.en.html`, which the page links to. `#pool`'s copy is that disclosure's
  claims, and its ZH is sourced from `legal/disclosures.zh.html` rather than translated.

**The number is written `1433`, no separator, everywhere on the site.** That is how PRD
v0.7 writes it. The Signal page's prose used to keep `1,433` while its display counter
carried `data-sep="none"`; the split is gone. Still outstanding: the 16 occurrences in the
rendered report-cover shots under `assets/product-shots/signal/`, which need a re-render.

**The exit is the two PSS-backed reports, not a sample-report button.** Only Snapshot and
Study are built on this scoring; Survey is a vector-similarity search against a larger
index and computes no PSS, so a generic "see a sample" CTA pointed a reader who had just
learned the method at a set of three. `.mth-reports` reuses the shared `.offer-card` recipe
with **no prices** — price is off-topic on a methodology page, and `product/signal/index.html`
already warns the three figures must stay in step with the intake chips and the deposit line.

**The cards open the sample in place (2026-08-27).** They were `<a href>` for one release,
and the label lied: *both* pointed at `/product/signal/#reports`, so "See sample report"
opened no sample and dropped the reader on a band of three cards to re-find the one they
had already picked. They are now `<button data-report aria-controls>` triggers for the same
FLIP-morph dialog the Signal page uses, and that dialog moved to `styles.css` + `site.js` to
serve both — the two-page rule in §0.3, applied. Two panels, not three; Survey stays
excluded, matching the copy directly above the cards.

The panels drop `.sig-xprice`, so the no-prices rule holds inside the dialog too, and their
CTA is an `<a href="/product/signal/?report=…#intake">` rather than the Signal page's
`<button>`, because there is no intake form on this page to fill. `site.js` binds its
select-and-scroll handler to `button.sig-xcta` specifically so it does not swallow that
navigation, and reads `?report=` on arrival to pre-select the chip and drive the deposit
figure. **That reader is why the block lives in `site.js` and not inline on the Signal
page** — deferred, it runs after that page's inline intake script has bound its listeners;
fired earlier the radio would be checked and the deposit would stay on "Select a report".

The trigger rules are still **not promoted** from the Signal page's `[data-report]` /
`--sigA|B|C` set: one resolves `--sig-blue`, a page-local variable. `.mth-reports` carries
its own scoped equivalents and takes the shared `.offer-card:focus-visible`.

**`.mth-pipe` is the table of contents and the diagram at once.** Five stages
(`50 → 8 → 1433 → 0–100 → S–D`), each an anchor into its step. Because the sequence is
stated there, once, **no step below carries a numbered eyebrow** — the `01 / 02 / 03`
scaffold would be saying a second time what the masthead already says. The five pipeline
steps take short verb labels in `.feature-row__num` (the badge.html usage), and the
`#scenarios` coda takes **none**, because it is not stage six: it is the pipeline run again
under different weights. Don't add one for symmetry; the asymmetry is the point.

**Motion — the trap this page exposed.** `site.js` adds `.is-revealed` to *any*
`[data-reveal]`, but the transition CSS is scoped to `.h-section` / `.section-dek` /
`.partner-band`. A new namespaced element gets the class and no transition, so it would
ship invisible. `.mth-exit__line[data-reveal]` carries its own rule plus a
`prefers-reduced-motion` branch. **Any future `.mth-*` element that takes `[data-reveal]`
needs the same.** The panels deliberately carry **none** any more: the stage owns their
opacity and a reveal transition on the same property would fight the swap.

**Retired with the first rebuild** (methodology was the sole consumer of all five):
`.grad-text-silver-solid`, `.prod-ref-table*`, `.coscore-*` / `.cs-*`, `.r-metric-arc*`,
`.loop-ctas`. Roughly 6.8KB of CSS. **Retired with the second:** `.mth-pillar*` (the count
bars and their stagger reveal), `.mth-rank*`, `.mth-band*` and this page's `.tier-chip`
usage, `.mth-panel--light`, `.mth-pool`, and the panels' `[data-reveal]` rules.

**Assets.** `assets/imagery/signal-methodology/pool-1433.svg` — 1433 marks, one lit, ink
on transparent (`#252525` at 24%, which lands 49/255 off `#F3F3F3` — the same distance the
white version landed off `#0E0E0E`). It is a background-image on `.mth-field__img`, not an
`<img>`, so the field scales with its column instead of sitting at its intrinsic 340px
inside a 681px cell. Generated, not drawn: the last row is short (12 of 49) because 1433 is
an exact count. Everything else on the page is live HTML/CSS, so it is theme-aware and
translatable and there is nothing to re-render when a figure changes.

**One note for whenever dark mode is unparked.** The collision this section used to warn
about — dark `--surface-page` being `#0E0E0E`, the same literal the panels used — has
dissolved, because the panels are light now. What replaces it is the mirror image:
`--surface-tertiary` is a *light* token, so under a restored dark theme the panels and the
band would both need to step to a dark tint rather than staying `#F3F3F3`. Nothing to do
while `site.js` keeps dark mode parked and `data-theme="light"` is hardcoded in the markup.

---

## 17. Page state — the veil

For a product that exists but is not open yet. The page stays in the document as
*texture*; a fixed full-viewport layer covers it. Live on
`product/licensing/index.html` and `product/licensing/badge.html` since 2026-08-23.

### 17.1 The contract

**CSS-only.** No script creates, positions or activates the veil. Verified by stripping
all five `<script>` tags from the page and re-rendering: identical output. This is the
one case in this codebase where content is deliberately covered, and it is the reason
§10's rule ("content is never gated invisible on JS failure") has a carve-out here: the
veil works *because* it needs no JS, not despite it.

**The veil never animates.** An entrance transition would be exactly the flash the
markup position is arranged to prevent, so there is nothing for
`prefers-reduced-motion` to branch on. Do not add one.

### 17.2 Why `backdrop-filter` on the veil, not `filter` on `<main>`

Three reasons, all load-bearing:

1. A `filter` on `<main>` makes it a containing block for `position: fixed` descendants
   and a new stacking context. The licensing page has `position: sticky` +
   `isolation: isolate` + a `z-index: -1` child on `.lic-stage`; an ancestor filter is
   precisely what breaks that class of layout.
2. `filter` rasterises and blurs the whole ~15,000px document. `backdrop-filter` on a
   fixed layer samples one viewport. On a page nobody can scroll, only one of those is
   defensible.
3. No `scale(1.06)` edge hack needed. `.sig-rt__page` needs it because a `filter` on a
   bounded element leaves a soft transparent edge at its own frame; a fixed layer flush
   with the viewport has no visible frame.

Values: `blur(28px) saturate(0.6)` over `--surface-page-translucent`. The floor is
whatever makes body text unreadable at 1440 *and* 390 in both themes — verify by
zooming a crop, not by eye at 100%.

**`@supports not (backdrop-filter)` → fully opaque `--surface-page`.** Without it the
0.70 wash alone leaves large type legible. This branch must be *tested*, not assumed:
temporarily flip the condition to `@supports (display: block)` and confirm the texture
region samples to a single flat colour.

### 17.3 z-index 95

The only free band. `.topnav` is 100 and every chrome overlay is above it; the licensing
page lifts its own announce bar to 90. So 95 covers everything inside `<main>` while
leaving nav, drawer, search, `#lang-overlay` and the mkt popup reachable.

**The nav is deliberately not covered.** It is the only way off a sealed page, and the
language toggle lives there, so covering it would strand a ZH reader in English. The
`#lang-overlay` shimmer (z-999) correctly plays over the veil, and the language swap
still works while `<main>` is `inert` because `swapText` writes `textContent` regardless.

### 17.4 Markup position and the flash

The `.veil` div goes **immediately before `<main>`**. The stylesheet is a synchronous
`<link>`, so no frame paints before the rules exist; the only remaining vector is HTML
streaming. `<main>` begins at byte 92,518 of 180,041 on the licensing page, so every
paintable content byte arrives after the veil. Everything preceding it is chrome that is
`opacity: 0` at rest. It also yields the right tab order for free:
skip-link → nav → veil CTA.

### 17.5 Scroll lock

```css
html:has(body[data-veil]) { overflow: hidden; scrollbar-gutter: stable; }
body[data-veil]           { overflow: hidden; height: 100dvh; }
```

Root-level `overflow` is what iOS Safari honours for the document scroller; the `body`
rule is the fallback, not the primary. Both are declarative at parse time, so unlike a JS
lock there is no before-state and **CLS is 0 by construction**. `scrollbar-gutter` is not
about CLS: without it, navigating from an unveiled page jumps the fixed topnav's right
cluster ~15px on platforms where scrollbars take space.

### 17.6 A11y contract

| Element | Attributes |
| --- | --- |
| `<main>`, `<footer>`, `.footer-baseline` | `inert aria-hidden="true"` |
| `.veil__card` | `id="veil-card" tabindex="-1"` — programmatic target, **not** `0` |
| skip link | `href="#veil-card"` — `#main` lands focus unpredictably inside an inert subtree |
| `.veil` | nothing. Not a dialog; `role="dialog"`/`aria-modal` would imply dismissibility |

All three landmarks are inerted, not just `<main>`. The footer sits outside `<main>` since
2026-08-23, and leaving it live would put focusable links off-screen behind an opaque
layer — focus you cannot see is worse than focus you cannot reach. (Terms / Privacy /
Disclosures now resolve to real fragments rather than the `href="#"` placeholders this note
originally cited, so inerting the footer does cost a veiled visitor three reachable
documents. Accepted: they are reachable from every unveiled page.)

`inert` is a content attribute, so it holds with JS disabled. `aria-hidden` is
belt-and-braces and is safe *only because* `inert` guarantees nothing inside can hold
focus.

### 17.7 What must be neutralised behind the glass

Not for the veil's sake:

- **Six showcase `<iframe>`s** and **six `.lic-still` `<img>`s**: `src` → `data-src`.
  `inert`'s propagation into a nested browsing context is engine-dependent, so the frames
  are the one thing it may not seal. `loading="lazy"` does **not** save you here — the
  stills were measured fetching 1.3 MB on a page nobody can scroll.
- **Five inline scripts** get `if (document.body.dataset.veil) return;` — the hero
  marquee, the bundle picker, the how-it-works rail, the how-it-works carousel and the
  GSAP scrub module. The last one otherwise `import()`s a whole bundle.
- **`animation-play-state: paused`** on everything inside `main`. A live keyframe under a
  `backdrop-filter` forces a full-viewport re-blur every frame. `paused`, not `none`, so
  mid-keyframe state holds as texture.
- **`site.js`**: the mkt popup is gated on `!data-veil` (z-1000, it would fire *above* the
  veil after 45s), and `postLang` selects `iframe[src]` so it stops posting into
  `about:blank`.

Verify with the server access log: zero requests to `product-shots/` or
`assets/build/gsap.js`.

### 17.8 The cache-bust hazard

**The one thing that can actually hurt.** Ship `data-veil` to a visitor holding a cached
`styles.css?v=12` and the veil markup lands with no veil CSS: the card renders as a plain
block at the top of the document and `<main>` is invisible to assistive tech but fully
visible and scrollable to everyone else.

Bump the query to a **never-requested** value in the *same commit* as the flip. A URL no
client has cached always fetches fresh; and stale HTML has no `data-veil`, so it renders
the old page correctly. All 8 pages were normalised to `?v=17` (they had been bare,
`?v=12`, `?v=13` and `?v=16`) so this cannot drift again silently.

### 17.9 The marker

`.status-flag` / `.status-flag--on-image`. One component, two modifiers, six contexts:
nav dropdown, mobile drawer, search modal, footer, offerings tile, About compact tile.

Named "flag" not "chip" to avoid colliding with the brand's product-side §Status chip
(license Active/Expiring/Lapsed). No value modifier — the value is the text, which is the
a11y contract: the marker is real text inside the link, so the accessible name becomes
"Licensing Platform Coming soon" and no `sr-only` copy is needed.

**`--on-image` is an opaque light chip with dark ink, and that is not a style
preference.** It has to survive two opposite grounds: the nav dropdown art is bright warm
orange, the offerings tile is `#0E0E0E`. A 10% white fill vanishes on the first; a dark
transparency vanishes on the second (tried, measured, rejected). An opaque light chip
reads on both — 12.8:1 over the orange, 11.6:1 over the near-black — and keeps the same
light-fill/dark-ink logic as the base variant instead of inverting it. Its literals are
the §1.3 image-backed allowance: the chip must not flip with the theme, because the
ground under it doesn't.

**Shape: a 6px rounded rectangle, not a pill.** 6px is the base material preset and
matches `.product-card-media` / `.mobile-sub-media` exactly. It is deliberately *less*
round than `.offer-card`'s 18px: an inset badge should be squarer than its host, and in
any case 18px on a ~20px-tall chip is clamped to half the height and renders as a pill,
which is the shape being avoided. Sentence case, not the `label-12` role's uppercase —
"Coming soon" is a short phrase, not a metadata label.

**Placement is the top-right corner on every card-shaped host**, and inline after the
label on the two text-row hosts (footer, search modal). The corner is not a preference on
the media boxes: the name row has no spare width, since "Licensing Platform" at 18px plus
the flag overflows a 260px card.

**The corner insets differ, and the reason is a CSS subtlety worth writing down.** An
absolutely positioned child resolves against its positioned ancestor's *padding box*, and
these cards have **no border**, so the padding box is the card's outer rectangle —
`padding` does **not** push the chip inward. `top/right: 0` therefore lands it on the
card's corner, colliding with the 18px radius and getting clipped by `overflow: hidden`.
Hence 20px on `.offer-card` (clears the radius, reads as a badge against copy that sits
at 28px, and lands exactly on `--compact`'s 20px content margin) and 8px on the two
6px-radius media boxes.

### 17.10 Lifting the veil

1. Drop `data-veil` from `<body>` on both pages.
2. Delete the `.veil` block from both pages.
3. Remove `inert aria-hidden="true"` from `<main>`, `<footer>`, `.footer-baseline`.
4. Skip link back to `#main`.
5. `data-src` → `src` on 6 iframes and 6 `.lic-still` images.
6. Remove the five `if (document.body.dataset.veil) return;` guards.
7. Remove the `robots` `noindex` meta from both pages; restore `<title>` / OG / Twitter.
8. Re-point the three CTAs at `license.tisglobalinc.com/welcome` (the original hrefs are
   recorded in an HTML comment beside each one) and restore their labels.
9. Contact chrome back to same-page `#contact` (§4).
10. Drop the `.status-flag` from all 32 chrome instances and both tiles; restore the
    tile desc and CTA copy.
11. Revisit the announce bars on both pages, and `PRODUCT.md`'s success criterion.
12. Bump `styles.css?v=`.

Not on the revert list, because they were defects independent of the pivot: the
`</main>` hoist, the 40 redundant `.search-link` `data-zh` attributes, the removed
duplicate `sr-only` `<h1>`, the `badge.html` `[PAGE SCAFFOLDING]` line, the three
untranslated `badge.html` strings, the retired `ticker-pulse--warning`, and the
`noindex` on the 10 render sources under `assets/product-shots/licensing/`.
