<!-- Snapshot of TIS/brand/primitives.md — do NOT edit here. Edit upstream in brand/ and resync. -->

# TIS Primitives

Atomic UI elements catalog across the three downstream surfaces that consume the TIS brand system: the marketing website, the Patent Intelligence SaaS MVP, and the Licensing Platform MVP. Primitives are the small, single-purpose building blocks (Button, Input, Toggle, chips, etc.) — composed components (Modal, Top nav, Footer, Patent card, Pillar, etc.) live in [components.md](./components.md). Each consumer repo carries a read-only `primitives-snapshot.md` mirror of this file.

> Primitives here are shared across all three surfaces unless a surface-specific variant is explicitly named. They consume semantic tokens from [`design-tokens.md`](./design-tokens.md) via **material presets** (see §7.3 there). For logo / co-branding / badge identity, see [`visual-guide.md`](./visual-guide.md).

**Entry shape.** Each primitive carries four metadata lines — *consumes*, *surfaces*, *variants*, *states* — then the spec. Consumes names semantic tokens from [`design-tokens.md`](./design-tokens.md) §7.4 (never raw primitives). Surfaces names which MVPs use it.

**Handoff rule.** Primitives consume semantic tokens, never raw hex. If a primitive references a raw value, the token is missing — add it to `design-tokens.md` first.

---

## Button

Three styles. Primary: ink bg, white text, shrinks slightly on press. Secondary: light gray fill, dark text (used when primary would be too loud). Ghost: transparent, dark text, fills subtly on hover. All share heavy tracking, 100ms color transitions, 1px focus ring offset 2px.

- **Consumes:** `surface-inverse`, `surface-inverse-hover`, `text-inverse`, `surface-tertiary` (secondary), `text-primary`, `border-focus`
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** primary / secondary / ghost; `sm` / `md` / `lg`
- **States:** default, hover, active (`scale(0.95)`), focus, disabled
- **Class signature:** `.btn` + variant `.btn-primary` / `.btn-secondary` / `.btn-ghost` + size `.btn-sm` / `.btn-md` / `.btn-lg`. Single-dash, never BEM `.btn--primary`.

Sizes:
- `sm` — padding 16×12, type `button-12`, radius 8
- `md` — padding 20×16, type `button-12`, radius 12
- `lg` — padding 32×20, type `button-14`, radius 12

All: `transition-all 100ms linear`, `active:scale(0.95)`. Case decided per button.

---

## Link

Primary ink with a thin underline always visible, drawn from the font itself (not browser default). No distinct link color; the underline does the work.

- **Consumes:** `text-primary`, `text-secondary`
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** inline only
- **States:** default, hover; no `:visited` change

Color `text-primary`, `text-decoration: underline` with `text-decoration-thickness: clamp(1px, 0.0625em, 3px)` and `text-underline-offset: 2px`. On hover, color shifts to `text-secondary` and offset increases by 2px.

---

## Input

Two variants. **Box** (default) for product chrome — hairline-bordered field, 8px radius, focus darkens border to ink. **Underline** for editorial / marketing — single bottom hairline that darkens on focus. Both share the same label / hint / error patterns.

- **Consumes:** `border-tertiary`, `border-focus`, `surface-page`, `surface-tertiary`, `text-primary`, `text-secondary`, `text-tertiary`, `text-quaternary`, danger-fg from status pairing ([`design-tokens.md`](./design-tokens.md) §2)
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** box (default) / underline; `md` (default) / `lg`
- **States:** default, focus, error, disabled

**Box** — 1px `border-tertiary`, radius 8, background `surface-page`, type `copy-14`. Sizes: `md` height 36 padding 8×12; `lg` height 40 padding 10×14. Focus: border → `border-focus` (no halo, no shadow). Error: border → `danger-fg`. Disabled: background `surface-tertiary`, text `text-quaternary`, cursor `not-allowed`.

**Underline** — 1px bottom border only (default `border-tertiary`, `border-focus` on focus, `danger-fg` on error). No side / top borders. Padding `12 0`. Disabled: bottom border `text-quaternary`, text `text-quaternary`.

**Shared** — placeholder `text-quaternary`. Label above: `label-12` (margin-bottom 8). Hint below: 13 / 400 / `text-secondary` (margin-top 8); on error → `danger-fg`. Keyboard focus ring (1px `border-focus`, 2px offset) applies over both variants.

---

## Textarea

Multi-line input. Inherits the Input **box** variant — same border, radius, focus, label, and hint patterns — with a minimum height and fixed resize by default.

- **Consumes:** `border-tertiary`, `border-focus`, `surface-page`, `surface-tertiary`, `text-primary`, `text-secondary`, `text-tertiary`, `text-quaternary`, danger-fg
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** fixed-height (default) / resize-vertical; with or without char-count
- **States:** default, focus, error, disabled

1px `border-tertiary`, radius 8, background `surface-page`, padding 10×12, type `copy-14`, min-height 80. `resize: none` by default; `resize: vertical` where multi-paragraph input is the primary task. Focus / error / disabled match Input box. Optional char-count sits bottom-right in `label-mono-12 / text-tertiary`; flips to `danger-fg` when over limit.

---

## Select

Single- or multi-select dropdown. Trigger looks identical to Input **box** with a right-aligned chevron; menu uses the `menu` material preset on open.

- **Consumes:** Input-box tokens plus `surface-tertiary` (item hover), `border-primary`, shadow `medium`
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** single / multi; default / searchable
- **States:** closed, open, focus, error, disabled

Trigger: Input box (md 36 / lg 40) with `icon-sm` `chevron-down` right-aligned in `text-tertiary`; rotates 180° on open over 150ms emphasized. Menu: `menu` preset (radius 12, shadow `medium`, 1px `border-primary`), min-width matches trigger, max-height ~320 with internal scroll, offset 4 below trigger. Items: `copy-14`, padding 8×12, no dividers. Hover row: background `surface-tertiary`. Selected row: `icon-sm` `check` right-aligned in `text-primary`. Multi-select: Checkbox left of each row (see Checkbox). Searchable: input row sticky at menu top (36 height, padded 8×12, 1px bottom `border-primary`). Keyboard: ↑/↓ move, Enter selects, Esc closes; typing filters when searchable.

---

## Checkbox

16×16 square with a 4px radius. Transparent when unchecked; ink-filled with a white check when checked.

- **Consumes:** `border-tertiary`, `border-focus`, `surface-page`, `surface-inverse`, `text-inverse`, `text-primary`
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** default; group (vertical stack)
- **States:** unchecked, checked, indeterminate, focus, disabled

Box 16×16, radius 4, background `surface-page`, border 1px `border-tertiary`. Checked: background + border `surface-inverse`, a 12px `check` glyph centered in `text-inverse` (sized inline for the 16×16 box — does not consume an icon-scale token). Indeterminate: background `surface-inverse`, horizontal 1.5×8 white rule centered. Focus: 1px `border-focus` ring, 2px offset. Disabled: opacity 0.4, cursor `not-allowed`. Label: right of box, gap 8, `copy-14`, `text-primary`. Wrapper padding expands the clickable area to ≥ 44×44. Group: `flex-direction: column; gap: 12`.

---

## Radio

16×16 circle with a centered ink dot when selected. Grouped vertically.

- **Consumes:** `border-tertiary`, `border-focus`, `surface-page`, `surface-inverse`, `text-primary`
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** default; group (vertical stack)
- **States:** unselected, selected, focus, disabled

Outer 16×16, `border-radius: 50%`, background `surface-page`, border 1px `border-tertiary`. Selected: border `surface-inverse`, inner 8×8 dot `surface-inverse` centered. Focus: 1px `border-focus` ring, 2px offset. Disabled: opacity 0.4, cursor `not-allowed`. Label: right of dot, gap 8, `copy-14`, `text-primary`. Wrapper padding expands the clickable area to ≥ 44×44. Group: `flex-direction: column; gap: 12`.

---

## Toggle

32×18 pill track with a sliding thumb. Off = hairline border + white thumb left; on = ink track + thumb right.

- **Consumes:** `border-tertiary`, `border-focus`, `surface-page`, `surface-inverse`, shadow `stacked-low`
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** default
- **States:** off, on, focus, disabled

Track 32×18, radius 9999, background `surface-page` + border 1px `border-tertiary` (off); background `surface-inverse`, no border (on). Thumb 14×14, radius 50%, background `surface-page`, shadow `stacked-low`; translates 2 → 16 on state change over 150ms emphasized. Focus: 1px `border-focus` ring on the track, 2px offset. Disabled: opacity 0.4, cursor `not-allowed`. Label: left column (label `copy-14` and optional description `copy-13 / text-secondary`); toggle right-aligned in its row. Row wrapper ≥ 44×44.

---

## Skeleton

Neutral rectangles that mirror the final component's layout, pulsing opacity under 1500ms.

- **Consumes:** `surface-tertiary`
- **Surfaces:** Patent Intelligence SaaS · Licensing Platform · website
- **Variants:** text-line / title-line / avatar / thumb / block — composed as a tree to mirror the loading component
- **States:** default (pulse); static under `prefers-reduced-motion: reduce`

Base: background `surface-tertiary`, `animation: tis-skeleton-pulse 1500ms linear infinite`. Keyframes: `0% { opacity: 0.6 } 50% { opacity: 1 } 100% { opacity: 0.6 }`. Reduced-motion: `animation: none; opacity: 0.8`.

Shapes:

- **text-line** — height 14, radius 4; width 40–100% (randomized for realism).
- **title-line** — height 24, radius 6; width 40–60%.
- **avatar** — 32×32, radius 50%.
- **thumb** — aspect-ratio 4/3, radius 12 (matches Content card thumb).
- **block** — explicit width/height per call site, radius 8.

Usage pattern: compose shapes into a tree matching the target component. Table skeleton = header row + N body rows of 4–6 text-lines. Content card skeleton = thumb + title-line + two text-lines.

---

## Loading animation

Branded loader that lands on the locked TIS submark. Twenty-seven cells (three faces × 3×3) fade in along a diagonal opacity wave, peak with a 6% scale lift, dim, settle, then dissolve into the solid logo. Every loop ends on identity.

- **Consumes:** TIS submark SVG ([`visual-guide.md`](./visual-guide.md) §Logo) — `tis_cubelogo_submark_dark.svg` on light surfaces, `_light.svg` on inverse; `text-primary` for cell + logo fill. Easings are loader-local (see below) and intentionally sit outside the standard §7.2 set, since loading is a sustained loop rather than a short transition.
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform — sustained waits where branded reassurance pays (app-shell boot, report generation, multi-second fetches). Use the unbranded Skeleton above for sub-second waits and content-shaped placeholders.
- **Variants:** none in production — Shimmer is the only kept variant. Five exploratory siblings (Converge / Ripple / Cascade / Counterflow / Spiral) are preserved in [`previews/loading-animation-preview.html`](./previews/loading-animation-preview.html) for archival reference, not shipped.
- **States:** playing · resolved (locked logo); static under `prefers-reduced-motion: reduce`

Geometry: SVG `viewBox="0 0 1000 1000"`, default render 96×96 px. The 27 cells are bilerp'd from the three submark face quads (top / left / right) into a 3×3 grid each. Cell + logo fill is `text-primary`; on inverse surfaces, swap to `text-inverse`. Cells render beneath a `<g class="logo">` group that holds opacity 0 until the resolve.

Cell keyframes: `{opacity:0, scale:0.7} → {opacity:1, scale:1.06, offset:0.55} → {opacity:0.35, scale:1, offset:0.75} → {opacity:1, scale:1}`. Per-cell duration 1100ms, easing `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard ease-in-out — symmetric pulse, no overshoot). Per-cell delay = `phase × 70ms` where `phase = (i + j) + face_offset × 0.4` and `face_offset = { top: 0, left: 3, right: 6 }` — produces a single diagonal wave that washes top → left → right.

Resolve: at 1700ms the locked logo group fades 0→1 over 420ms (easing `ease-out`, the CSS keyword) while every cell fades 1→0 over the same window. Loop the full sequence (~2120ms cycle) for indeterminate waits, or hold the locked end-state per call site. Reduced-motion: skip the wave; render the locked submark immediately at full opacity.

---

## Alert

Inline banner using the soft status background. The only place outside Status chip where TIS uses saturated bg. Persistent — does not auto-dismiss.

- **Consumes:** status pairings (`success` / `warning` / `danger` / `info`) bg + fg from [`design-tokens.md`](./design-tokens.md) §2; `text-primary`, `text-secondary`, `surface-translucent`
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** success / warning / danger / info; dismissible / persistent
- **States:** default; dismissed (removed from DOM)

Container: background status-bg, radius 8, padding 12×16, display `flex`, gap 12, `align-items: flex-start`. No border — the soft bg is the edge. Stack vertically with 8px gap when multiple.

Row content left→right: status icon (`icon-sm`, color status-fg — `check-circle` / `alert-triangle` / `x-circle` / `info`; 2px top margin so it aligns with title baseline) · stacked column (title `copy-14 / weight 500 / text-primary`; body `copy-14 / text-secondary`, optional; inline Link action optional) · dismiss button (`icon-sm` `x`, color `text-secondary`, 24×24 hit target, radius 6, hover background `surface-translucent`).

---

## Tooltip

Short inverse-surface popover explaining a trigger. Dark card, appears on hover or focus.

- **Consumes:** `surface-inverse`, `text-inverse`; material preset `tooltip` from [`design-tokens.md`](./design-tokens.md) §7.3 (radius 6, shadow `low`, no border)
- **Surfaces:** Patent Intelligence SaaS · Licensing Platform · website
- **Variants:** default (arrow pointing at trigger)
- **States:** hidden, entering, visible, exiting

Card: background `surface-inverse`, color `text-inverse`, radius 6, padding 6×10, type `copy-13 / weight 400`, `max-width: 240`, shadow `low`. Arrow: 6×6 square rotated 45°, same bg, positioned on the side facing the trigger with its center aligned to the trigger center. Distance from trigger: 8 (accommodates arrow).

Placement: above the trigger by default; flip to below when viewport clipping would occur.

Motion: enter after 400ms hover delay (or on focus) — 150ms emphasized (`opacity: 0 → 1` + `translateY(4 → 0)` toward the trigger). Exit 100ms linear on mouse leave, blur, or Escape.

Accessibility: trigger carries `aria-describedby` pointing to the tooltip id; tooltip is `role="tooltip"`. Tooltip may not contain interactive content (buttons, links) — those belong in a future Popover component (§1.3).

---

## Stat card

Bordered numeric block — eyebrow / large mono numeral / body — composed in a 3-up grid for "by-the-numbers" sections that anchor a marketing page to a few quiet facts. Sister to §Tier stat card (the SABCD row-form rollup) but orthogonal in use: this one is a free-standing brand-stat surface, not a tier distribution.

- **Consumes:** `surface-secondary`, `border-primary`, `text-primary`, `text-tertiary`, `text-quaternary`, `shadow-medium`
- **Surfaces:** website (homepage by-the-numbers section under the Partner strip); candidate for SaaS / Licensing landing pages when a stat strip is wanted
- **Variants:** default (3-up); single-card (used inline inside a longer narrative)
- **States:** rest, hover (lifts `shadow-medium` over 250ms emphasized)

Container: 3-column grid, `grid-template-columns: repeat(3, 1fr)`, `gap: 24px`. Below `880px` the grid collapses to a single column. Each card: `surface-secondary` fill, 1px `border-primary`, radius 16, padding 32. Transition `box-shadow 250ms cubic-bezier(0.2,1,0.3,1)`. Hover lifts `shadow-medium`; no border-color shift, no transform — the lift is the only feedback so the row stays calm. No interactive role on the cards themselves; they don't link.

**Inner stack (top → bottom):**

1. **Eyebrow** — `Inconsolata 10 / 500 / +0.20em / uppercase / text-quaternary`, margin `0 0 12px`. Sets the category (`Proprietary database`, `Analytical system`, `Jurisdictional coverage`).
2. **Numeral** — `Inconsolata 700 / clamp(40px, 4.5vw, 56px) / line-height 1.0 / letter-spacing -0.01em / text-primary`. Optional inline suffix (`M`, `+`, etc.) sits as a `<span>` after the counted span and inherits the same type, so the suffix always tracks the numeral's metrics on resize.
3. **Body** — `Urbanist 14 / 400 / line-height 1.55 / text-tertiary`, margin-top 20, `max-width: 32ch`. One sentence, one stat. Don't pile additional facts in here — that's what additional cards are for.

**Count-up motion.** Numerals can compose with the `count-up` motion token from [`design-tokens.md`](./design-tokens.md) §7.2 — `IntersectionObserver` at a 30% threshold drives a 1200ms linear count from `0` → target on first visibility; the suffix span stays static. Reduced-motion paints the target value directly. Wrap the numeric span in a `.counter` class with a `data-target="<int>"` attribute so the motion script can find it without owning the surrounding markup.

**Numeral size rationale.** Set deliberately one rung below the §Tier stat card's count (mono 13) and the §Lifecycle dot timeline (large but un-numeric) so the three "stat-shaped" components in the system don't collide visually when they share a page. The card frame supplies most of the visual weight here; pushing the numeral toward `clamp(56px, 7vw, 88px)` (which an earlier left-rule variant carried) overcompensated against the bordered card and read as a stat-strip from a different system.

**Composition rules.** 3-up by default. Single-card composition is allowed when a stat anchors a longer narrative paragraph (e.g. inline within an About section). Don't compose 2-up — the asymmetry against the surrounding grid tokens reads as a layout mistake; either drop to one card or recover the third stat. Don't nest §Tier stat card or §Patent card inside this primitive; if the use case wants a tier rollup or a patent surface, reach for those primitives directly.

---

## Image frame

Hairline-bordered container for patent figures, technical diagrams, and product screenshots. The chrome is intentionally quiet — a 1px border and a neutral backing surface so transparent PNGs don't bleed onto page white. Optional caption and source credit below; zoomable variant opens a full-viewport lightbox on click.

- **Consumes:** `surface-secondary`, `surface-translucent`, `border-primary`, `border-tertiary`, `text-secondary`, `text-tertiary`, `text-inverse`, `rgba(0,0,0,0.4)` overlay
- **Surfaces:** Patent Intelligence SaaS (patent detail, comparison views) · website (reports where patent figures appear) · Licensing Platform (bundle detail)
- **Variants:** default / with caption / zoomable (opens lightbox)
- **States:** default, hover (zoomable only — faint cursor + control reveal), lightbox open, focus (zoomable only)

Frame: radius 12, 1px `border-primary`, background `surface-secondary`, `overflow: hidden`. Image: `width: 100%`, `height: auto`, `display: block`, `object-fit: contain` (technical diagrams preserve aspect); `object-fit: cover` only when a fixed aspect crop is explicit on the call site. Tall figures cap at `max-height: 640` — content above the cap routes users to the lightbox.

**Caption** — below frame, margin-top 12, `copy-13 / text-secondary`, max-width matches frame. Optional figure number prefix in `label-mono-11 / text-tertiary` inline ("Fig. 3  " with 8px right gap). Optional source / credit line beneath caption in `label-mono-11 / text-tertiary`.

**Zoomable** — cursor `zoom-in`; 100ms linear border darken to `border-tertiary` on hover. Top-right control: 24×24 button, radius 6, `icon-sm` `maximize-2` in `text-tertiary`, hover background `surface-translucent`; appears on hover or keyboard focus of the frame. Click anywhere on the image opens the lightbox.

**Lightbox** — overlay `rgba(0,0,0,0.4)` + `backdrop-filter: blur(4px)`, z-index 700. Image centers, `max-width: 90vw`, `max-height: 90vh`, scales up only to intrinsic size (no upscaling). Close button `icon-md` `x` top-right, 24 viewport offset, 32×32 radius 6, color `text-inverse`, hover background `surface-translucent`. Dismiss via overlay click, Escape, or close button. Focus-trap identical to Modal. Motion: 150ms emphasized enter (`opacity: 0 → 1`), 100ms linear exit. Reduced-motion: opacity only.

---

## Chip family

Four small visual primitives that share the same geometry but live in different semantic palettes — Status chip (status pairings), Tier chip (SABCD), Jurisdiction chip (regional accents), and Signal dot (live system state). **Whenever any of these is referenced elsewhere in the system — voice and messaging, design tokens, presentations, downstream surfaces — the canonical spec lives here.**

### Shared geometry

The three chip pills (Status / Tier / Jurisdiction) render at the same size and shape so they read as one family on a row, table cell, or detail surface. Signal dot is a smaller circular sibling; geometry diverges, palette family is distinct.

| Property | Chip pills (Status / Tier / Jurisdiction) | Signal dot |
|---|---|---|
| Size | Padding 4×10 | 6×6 px |
| Radius | 9999px (pill) | 50% (circle) |
| Type | Urbanist 12 / weight per chip / no uppercase / no extra tracking / line-height 1.2 | n/a (no text) |
| Layout | `display: inline-flex; align-items: center` | `display: inline-block` |

### Weight asymmetry

Within the chip-pill trio, **Status chip uses font-weight 600**; **Tier chip and Jurisdiction chip use font-weight 700**. The 100-step bump compensates for lower fg/bg contrast on the lighter SABCD and Jurisdiction palettes (notably Tier S gold at ~4.1:1 against its cream bg) so all three chips read as the same optical weight when set side-by-side. Status chip's status-pairing palette is dark enough that 600 already reads heavy.

### Palette decoupling

Each chip family draws from a distinct semantic palette in [`design-tokens.md`](./design-tokens.md) §7.4 — they never share hex, so a Status chip on the same row as a Tier chip never reads as the same family.

| Family | Palette source | §7.4 tokens |
|---|---|---|
| Status chip | Status pairings | `success-bg`/`-fg` · `warning-bg`/`-fg` · `danger-bg`/`-fg` · `info-bg`/`-fg` |
| Tier chip | SABCD ramp | `score-s` … `score-d` foregrounds + paired `score-*-bg` |
| Jurisdiction chip | Jurisdiction ramp | `juris-us` … `juris-kr` foregrounds + paired `juris-*-bg` |
| Signal dot | Signal palette | `signal-active` · `signal-warning` · `signal-lapsed` |

The dominant cross-family pairing on a license row is `US × Tier S` (indigo against gold) — held off-axis by design. Remaining adjacencies (KR cherry ↔ danger status; TW olive ↔ Tier S gold and Tier A emerald; JP fuchsia ↔ Tier C violet) separate by saturation and value at chip scale rather than hue alone.

### Stacking order

When two or more chip pills appear in the same row (catalog, recommendation grid, license inventory, license detail), the canonical order is **Status → Jurisdiction → Tier**, left-to-right. Spatial order maps to scope: status is the outer condition (is this thing live?), jurisdiction is the bundle's territorial scope, and tier is the quality grade. Signal dot sits adjacent to the row's primary timestamp or live-state counter, never inline with the other chip pills.

### Sheet — canonical detail surface

A patent or license detail row typically renders the full chip set on the §Sheet (see below). On that surface the chips appear in stacking order with the row title and metadata, and the surrounding card stays neutral so the chip palette carries the entire signal load.

---

### Status chip

Inline-flex pill carrying a status pairing. The only saturated color on the page (per [`design-tokens.md`](./design-tokens.md) §2).

- **Consumes:** status pairings (`success` / `warning` / `danger` / `info`) — bg + fg from §2
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** success / warning / danger / info; with or without leading dot
- **States:** default

Geometry per §Chip family above. **Font-weight 600** (the canonical chip weight, vs 700 on Tier and Jurisdiction). Background + foreground from the status pairing. Optional leading dot: 6×6, `border-radius: 50%`, `background: currentColor`, 6px right gap — visually borrows the Signal-dot vocabulary but is decorative on a status pill, not a live-state indicator.

---

### Jurisdiction chip

Inline-flex pill rendering a jurisdiction code — `US` (indigo) / `TW` (olive) / `EU` (slate) / `JP` (fuchsia) / `KR` (cherry).

- **Consumes:** `juris-us` / `juris-tw` / `juris-eu` / `juris-jp` / `juris-kr` foregrounds; `juris-us-bg` / `juris-tw-bg` / `juris-eu-bg` / `juris-jp-bg` / `juris-kr-bg` soft backgrounds — both from [`design-tokens.md`](./design-tokens.md) §7.4
- **Surfaces:** Licensing Platform (catalog rows, recommendation grid header, cart, license inventory and detail, bundle summary, dashboard license rows — anywhere a jurisdiction needs to be recognised at a glance)
- **Variants:** `us` / `tw` / `eu` / `jp` / `kr`
- **States:** default

Geometry per §Chip family above. **Font-weight 700**, matching Tier chip.

**Content convention.** Always render the two-letter code (`US`, `TW`, `EU`, `JP`, `KR`) as the chip content — full region names sit alongside the chip in the surrounding row, never inside it. The two-letter form is naturally uppercase, so the chip reads correctly without a CSS `text-transform` rule. The chip is the at-a-glance signal; the full name is the human-readable label.

**Pairing order.** Within a row, Jurisdiction precedes Tier (jurisdiction = outer container, tier = inner grade). Within the broader chip stack, the canonical order is Status → Jurisdiction → Tier — see §Chip family / stacking order.

---

### Tier chip

Inline-flex pill rendering an SABCD quality tier — five tones drawn from the SABCD ramp in [`design-tokens.md`](./design-tokens.md) §7.4: gold (S) → emerald (A) → sky (B) → violet (C) → orange (D).

- **Consumes:** `score-s` / `score-a` / `score-b` / `score-c` / `score-d` foregrounds; `score-s-bg` / `score-a-bg` / `score-b-bg` / `score-c-bg` / `score-d-bg` soft backgrounds — both from [`design-tokens.md`](./design-tokens.md) §7.4
- **Surfaces:** Licensing Platform (recommendation grid corners, license inventory and detail tables, bundle summary cells, patent feed cards, public verify page); Patent Intelligence SaaS scorecards
- **Variants:** `s` / `a` / `b` / `c` / `d`
- **States:** default

Geometry per §Chip family above. **Font-weight 700** (one step heavier than Status chip's 600 — see §Chip family / weight asymmetry).

**Label convention.** Always render the full token: `Tier S`, `Tier A`, `Tier B`, `Tier C`, `Tier D` — never the bare letter. The letter alone loses meaning when the chip travels out of context (CSV exports, screenshots, embed badges, paste into a deck), and the word "Tier" anchors the chip to a defined framework instead of to a pricing label like Premium / Pro / Plus. Same rule in prose — see [`brand-voice.md`](./brand-voice.md) §4.

**Coexistence with Threshold bar.** The Threshold bar in [`components.md`](./components.md) §Threshold bar carries its own monochrome `STRONG` / `MID` / `WEAK` chip — that's the P1–P8 pillar score on the radar/threshold panel, a separate scoring system from SABCD tiers. Both coexist on the same page without conflict; Threshold bar's monochrome rule still applies inside the radar panel.

---

### Signal dot

Pulsing 6×6 circle for live system state — dashboards, report status, any live-data surface. More saturated than status chip foregrounds so it attracts the eye at small sizes. Geometry diverges from the chip-pill trio (no text, smaller, circular); palette family is distinct from Status / Tier / Jurisdiction.

- **Consumes:** `signal-active`, `signal-warning`, `signal-lapsed`
- **Surfaces:** Patent Intelligence SaaS (primary); Licensing Platform (license lifecycle); website status pages
- **Variants:** `signal-active` (live / active), `signal-warning` (expiring / degraded), `signal-lapsed` (lapsed / blocked)
- **States:** default; pulse stops under `prefers-reduced-motion: reduce`

Pulse animation: 2s infinite, box-shadow ring fades from `rgba(<rgb>,0.6)` at 0 → `rgba(<rgb>,0)` at 10px over 70% of the cycle. Each tone has its own keyframe so the glow color matches the dot. Keyframe values live in [`design-tokens.md`](./design-tokens.md) §7.2 *Signal dots*.

---

