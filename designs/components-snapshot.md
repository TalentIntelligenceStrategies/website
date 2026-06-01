# TIS Components

Composed components catalog across the three downstream surfaces that consume the TIS brand system: the marketing website, the Patent Intelligence SaaS MVP, and the Licensing Platform MVP. Components are built from primitives (see [primitives.md](./primitives.md)) — they include both shared composed elements (Modal, Top nav, Footer, Tabs) and surface-specific compositions (Patent card, Pillar, IP intelligence drop popup, Verified License Badge). The `Surfaces:` line on each entry says who uses it. Each consumer repo carries a read-only `components-snapshot.md` mirror of this file.

> Components compose primitives + semantic tokens from [`design-tokens.md`](./design-tokens.md) via **material presets** (see §7.3 there). For logo / co-branding / badge identity, see [`visual-guide.md`](./visual-guide.md).

**Entry shape.** Each component carries four metadata lines — *consumes*, *surfaces*, *variants*, *states* — then the spec. Consumes names semantic tokens from [`design-tokens.md`](./design-tokens.md) §7.4 (never raw primitives). Surfaces names which MVPs use it.

**Handoff rule.** Components compose semantic tokens + primitives, never raw hex. If a component references a raw value, the token is missing — add it to `design-tokens.md` first.

---

## Date picker

Input-box trigger with a calendar icon; popover shows a month grid for single-date or date-range selection.

- **Consumes:** Input-box tokens plus `surface-tertiary` (range fill, hover cell), `border-primary`, shadow `medium`, `text-secondary`, `text-tertiary`, `text-inverse`, `surface-inverse`
- **Surfaces:** Patent Intelligence SaaS · Licensing Platform (primary); website contact forms where dates apply
- **Variants:** single-date / date-range
- **States:** closed, open, focus, error, disabled

Trigger: Input box (md 36 / lg 40), `icon-sm` `calendar` right-aligned in `text-tertiary`. Popover: `menu` preset (radius 12, shadow `medium`, 1px `border-primary`), padding 16, offset 4 below trigger, width ~288. Header: month + year centered (`heading-18`); `chevron-left` / `chevron-right` (`icon-sm`) as prev / next buttons in `text-secondary`. Day-of-week row: `label-mono-11 / text-tertiary`. Day grid: 7 columns × 6 rows, each cell 32×32 radius 6, `copy-14` centered. Today: underline on the number. Selected: background `surface-inverse`, text `text-inverse`. Range endpoints: filled like selected; range body: background `surface-tertiary`, text `text-primary`. Hover cell: `surface-tertiary`. Disabled dates: opacity 0.4. Keyboard: ←/→/↑/↓ move by day / week, Enter selects, Esc closes. Date format follows [`brand-voice.md`](./brand-voice.md) §6 (ISO `YYYY-MM-DD`).

---

## File upload

Default as a dashed drop zone; compact alt as a button + filename inline. Same validation and disabled patterns as Input.

- **Consumes:** `border-tertiary`, `border-focus`, `border-primary`, `surface-page`, `surface-secondary`, `surface-tertiary`, `text-primary`, `text-secondary`, `text-tertiary`, `text-quaternary`, danger-fg
- **Surfaces:** Patent Intelligence SaaS · Licensing Platform (primary); website contact (attachments)
- **Variants:** drop zone (default) / compact (Button + filename)
- **States:** empty, hover, drag-over, attached, uploading, error, disabled

**Drop zone** — radius 12, padding 32, background `surface-page`, border 1px **dashed** `border-tertiary`. Centered column, gap 12: `icon-lg` (24px) `upload` in `text-secondary`; primary line "Drag a file or click to browse" (`copy-14 / text-primary`); hint line (types + size limit) (`copy-13 / text-tertiary`). Hover: border solid `border-tertiary`, background `surface-secondary`. Drag-over: border solid `border-focus`, background `surface-tertiary`. Attached: border solid `border-primary`, padding 16×20; row = file-icon + filename (`copy-14`) + size (`label-mono-12 / text-tertiary`) on the left, `icon-sm` `x` remove button on the right (hover background `surface-tertiary`, radius 6). Uploading: 1px progress bar along the inner bottom edge, ink fill, 250ms medium linear on each tick. Error: border and primary line `danger-fg`; hint retains type rules. Disabled: opacity 0.4, cursor `not-allowed`.

**Compact** — secondary Button "Choose file" + filename inline (`copy-14 / text-secondary`, or "No file chosen" in `text-quaternary` when empty). Standard `<input type="file">` under the hood with visible Button substitution.

---

## Table

Dense, hairline-separated rows with no vertical dividers. Sticky column header carrying uppercase labels and inline sort arrows. 44px default row height (single density — no compact / relaxed until a surface demands it).

- **Consumes:** `surface-page`, `surface-tertiary`, `surface-inverse`, `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`
- **Surfaces:** Patent Intelligence SaaS (patent results, saved searches, token history) · Licensing Platform (license inventory, bundle catalogs) · website (report listings where Content card doesn't fit)
- **Variants:** default; selectable (first-column Checkbox); with row actions (last-column `chevron-right` or menu trigger)
- **States:** row default, row hover, row selected, sort-active column, empty, loading

Container: `border-collapse: collapse`, `width: 100%`. Optional 1px `border-primary` + radius 12 wrapper when the table sits inside a card-like surface; flush when it spans a page. No vertical dividers — horizontal 1px `border-primary` between rows only.

Header: height 40, sticky, 1px bottom `border-primary`, cell padding 12×16, text-align inherits from column. Column labels `label-12 / text-tertiary`. Sort-active column: label → `text-primary`, followed by `chevron-up` or `chevron-down` (`icon-sm`) inline with 4px gap; inactive columns show no arrow. Click column to toggle sort.

Body row: height 44, 1px bottom `border-primary`, cell padding 12×16. Cell type `copy-14 / text-primary` by default; `copy-mono-13` for patent numbers, IDs, hashes, timestamps. Numeric columns right-aligned. Hover: background `surface-tertiary` over 100ms linear. Selected: background `surface-tertiary` + 2px left-edge `surface-inverse` bar (draw via `::before` on the first cell so it tracks row height).

First column (optional): Checkbox cell, width 40, padding `0 16`, checkbox vertically centered; header checkbox drives select-all and carries the indeterminate state when a subset is selected. Last column (optional): width 48, right-aligned icon button (e.g. `more-horizontal` or `chevron-right`, `icon-sm`).

Empty state: table body replaced by the Empty state component, spanning all columns. Loading: Skeleton rows matching the visible row count (3–5 typical), each cell filled with a text-line skeleton sized to its column.

---

## Empty state

Centered column explaining why a data surface is empty and what to do next. Type + optional Lucide icon only — no illustrations (per [`brand-voice.md`](./brand-voice.md) §3 anti-hype rule).

- **Consumes:** `text-primary`, `text-secondary`, `text-tertiary`
- **Surfaces:** Patent Intelligence SaaS · Licensing Platform · website (any data surface that can be empty)
- **Variants:** inline (inside Table / Card / section, padding 64) / page-level (full viewport section, padding 80)
- **States:** default

Flex column, `align-items: center`, `gap: 16`. Optional icon at `icon-xl` (inline) or `icon-2xl` (page-level), color `text-tertiary`. Heading `heading-18 / text-primary` (inline) or `heading-24` (page-level). Body `copy-14 / text-secondary`, `max-width: 400`, `text-align: center`. Optional primary Button beneath, 24px top gap.

---

## Toast

Transient white card with a 3px left-edge accent in the status color. Fixed bottom-right; auto-dismisses in 5s.

- **Consumes:** `surface-page`, `surface-tertiary`, `surface-inverse`, `border-primary`, `text-primary`, `text-secondary`, shadow `medium`; status pairing fg from [`design-tokens.md`](./design-tokens.md) §2 for the accent bar + icon
- **Surfaces:** Patent Intelligence SaaS · Licensing Platform · website (any surface firing async operations)
- **Variants:** default (neutral accent `surface-inverse`) / success / warning / danger / info
- **States:** entering, resting, exiting; hover (auto-dismiss paused)

Card: background `surface-page`, 1px `border-primary`, radius 12, shadow `medium`, padding 12×16, max-width 400, min-width 320. Position `fixed`, bottom 24, right 24, z-index 800 (toasts layer). Stack: `flex-direction: column-reverse`, gap 8 — newest on top.

Accent bar: 3px wide, full card height, positioned on the left edge, color = status-fg for the variant or `surface-inverse` for default. Draw via `::before` pseudo-element; card `overflow: hidden` clips it to the card radius.

Row content left→right, gap 12: status icon (`icon-sm`, color matches accent — `check-circle` / `alert-triangle` / `x-circle` / `info`, or no icon for default) · stacked column (title `copy-14 / weight 500 / text-primary`; body `copy-13 / text-secondary`, optional; inline Link action "Undo" / "View" optional) · close button (`icon-sm` `x`, color `text-secondary`, 24×24 hit target, radius 6, hover background `surface-tertiary`).

Motion: enter 250ms emphasized (`translateY(8 → 0)` + `opacity: 0 → 1`). Exit 100ms linear (`opacity: 1 → 0`). Auto-dismiss: 5000ms; pauses while hovered or focus-within; resumes on leave. Reduced-motion: no translate; opacity only.

---

## Content card

4:3 image on a neutral surface, 1px hairline above a meta block with a 24px headline and a small mono metadata row.

- **Consumes:** `surface-page`, `surface-secondary`, `surface-tertiary`, `border-primary`, `text-primary`, `text-tertiary`, `text-quaternary`, shadow `stacked-low` → `medium`
- **Surfaces:** website (reports, press); reusable on Patent Intelligence SaaS / Licensing Platform for report surfaces
- **Variants:** default
- **States:** default, hover (lifts 8px, shadow deepens)

Card sits on `stacked-low` shadow; on hover, lifts 8px and shadow deepens to `medium` over 350ms emphasized. Radius 16, background `surface-page`, `overflow: hidden`. Thumb on `surface-secondary`/`surface-tertiary` with 1px bottom hairline. Meta block padding 24px. Title `heading-24` (24 / 600 / −0.01em / 1.3 / `text-primary`), margin-bottom 12px. Metadata row `label-mono-12` (Inconsolata / 12 / 500 / +0.10em / uppercase / `text-tertiary`) with `·` separator via `::before { content: "·" }` (8px right margin, `text-quaternary`), suppressed on first child.

---

## Patent card

Single-patent tile in a gapped recommendation grid — the unit cell of the Licensing Platform 30-patent bundle view. Title-led, with a Jurisdiction → Tier chip stack in the top-right corner; the whole card is one click target that opens the §Patent detail Sheet (next entry). Replaces an earlier shared-border catalog grid; the gap-and-radius treatment makes a 30-card surface visually scannable instead of dense. Composes the canonical [detail-surface register](./design-tokens.md) (12 / 15 / 18) at the 12 (meta) and 15 (title) steps. Canonical reference: [`brand/previews/patent-card-preview.html`](./previews/patent-card-preview.html).

- **Consumes:** `surface-page`, `surface-tertiary` (Swap microbadge bg + pin-flag bg), `border-tertiary` (rest border), `border-focus` (selected state border + inset stroke), `text-primary` (hover border + ring + selected fg), `text-secondary` (meta row + Swap microbadge fg + pin-flag fg), `shadow-medium` (rest), `shadow-high` (hover + selected); inner Tier chip pulls `score-*` / `score-*-bg`, inner Jurisdiction chip pulls `juris-*` / `juris-*-bg` — all from [`design-tokens.md`](./design-tokens.md) §7.4. **Composes** §Checkbox primitive (top-row selection, 18×18 card-grid override on the primitive's 16×16 default) and pulls [`brand/assets/icons/ui/pin.svg`](./assets/icons/ui/pin.svg) for the pin-flag modifier per [`visual-guide.md`](./visual-guide.md) §Iconography → UI set.
- **Surfaces:** Licensing Platform (30-patent recommendation grid, license inventory expanded view); Patent Intelligence SaaS (saved-set browse)
- **Variants:** interactive (default; click opens detail Sheet) / read-only (no click target, used post-issuance when the bundle is locked and Swap is gone) / pinned modifier (`data-pinned="true"` — locks the card against §Batch action bar bulk-swap and regenerate flows; renders the pin-flag pill inline with the PID. Pin state is orthogonal to selection.)
- **States:** default (1px `border-tertiary`, `shadow-medium`), hover (border → `text-primary`, shadow → `shadow-high`, `transform: translateY(-1px)`), focus-visible (1px `text-primary` ring at 0 offset on top of the rest border, paired with `shadow-high`), pressed, selected (`aria-selected="true"` — set by the top-row checkbox or §Batch action bar `Select all`; border → `border-focus`, background → `surface-secondary`, `box-shadow: shadow-high` plus a 1px inset `border-focus` stroke for the inner outline)

Container: padding 20×22, radius 12, 1px `border-tertiary`, background `surface-page`, `box-shadow: shadow-medium` at rest, `min-height: 160`. Render the card as a `<button type="button">` (or div with `role="button"`, `tabindex="0"`) so focus and keyboard activation are native — the whole tile is the click target, no inline CTAs. Inner layout `flex-direction: column`, `gap: 10`. The grid container uses `display: grid; grid-template-columns: repeat(3, 1fr); gap: 16` — no shared borders, no `overflow: hidden` on the grid (cards must be free to lift on hover). Collapses to 2 columns at ≤1024 and 1 column at ≤640.

Anatomy (top → bottom):

- **Top row** — left cluster of `[checkbox] [pin-flag?] [patent ID]` (flex row, `align-items: center`, gap 10) on the left; chip stack on the right in canonical Jurisdiction → Tier order (see §Chip family / stacking order), 6px gap between chips. Checkbox composes §Checkbox primitive at 18×18 (a card-grid override on the primitive's 16×16 default — boosts the hit weight inside a dense 30-card surface) and lives in its own hit area; its click handler MUST `stopPropagation()` so the body click continues to open the §Patent detail Sheet unaffected. Pin-flag is conditional (see *Pin-flag* below). Patent ID is mono 12 / 600 / +0.05em / `text-primary`, ellipsis on overflow. **Title and meta share the same left edge as the checkbox** (no indent) — selection visibility is signalled through the checkbox glyph + the `[aria-selected="true"]` shell treatment, never by indenting downstream content. Status chip is omitted at this scale — it's only added on the §Patent detail Sheet, where the full Status → Jurisdiction → Tier stack reads cleanly.
- **Title** — body register (15 / 500 / line-height 1.5 / `text-primary`), clamped to 2 lines via `-webkit-line-clamp: 2` + `-webkit-box-orient: vertical` + `overflow: hidden`. Long titles truncate with no ellipsis-substitute glyph; the full title is available in the detail Sheet.
- **Bot row** — anchored to the bottom via `margin-top: auto`, padding-top 8. Flex row (`justify-content: space-between; align-items: center; gap: 8`) carrying the **meta line** on the left and an optional **Swap microbadge** on the right. The meta line is mono 12 / 1.5 / +0.05em tracking / `text-secondary`, ellipses at narrow widths via `min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap`. Composition: `IPC · N cites · N family`. **No patent owner** at this scale — the full institutional name lives on the detail Sheet only; placeholder names like ITRI / III / NTU TT are not relevant for at-a-glance scanning across the 30-card grid. **No validity remaining** — that lives in the Sheet's lifecycle block. The three card metrics that survive to the scan view are the ones buyers compare same-tier alternates against: IPC (topic), forward citations (strength), family size (coverage).

**Swap microbadge.** Optional bottom-right pill that appears only when the card has been replaced via §Swap picker (i.e. it diverges from the system's original recommendation). **Urbanist** sans 12 / 700 / sentence-case `Swapped` in `text-secondary` on a `surface-tertiary` pill (padding 3×8, radius 6, no border, `flex-shrink: 0`). Tier-agnostic neutral colors so the badge **never overrides the card's tier color** — a swapped Tier S card stays gold, a swapped Tier A card stays green, etc. Earlier iterations used a green border + gradient fill; that collided with the tier color system and is deprecated. The badge is also tier-aware in placement (`flex-shrink: 0` keeps it intact while the meta ellipses); pair it with a `title="Swapped from the system pick"` for hover affordance.

**Pin-flag.** Conditional inline pill sitting between the checkbox and the patent ID when `data-pinned="true"`. Box 20×20, radius 5, `surface-tertiary` bg, `text-secondary` fg, holding a 12px [`pin.svg`](./assets/icons/ui/pin.svg) glyph at stroke-width 2.2 (per [`visual-guide.md`](./visual-guide.md) §Iconography — global stroke-width override per consumer surface). Pin state is set by the §Batch action bar `Pin` action and persists across the batch's lifetime. It is **orthogonal to selection** — pinned cards may or may not be currently selected, and the two visual signals do not collide (pin lives in the top-row left cluster, selection lives in the checkbox + shell treatment). Pinned cards are skipped by bulk-swap and regenerate flows.

**No inline actions on the card.** Earlier builds inlined a Swap button in the meta row; that's deprecated. The card is a single, full-bleed click target — Swap, family size detail, citation count detail, and the full title all live on the §Patent detail Sheet that opens on click. Removing the inline button keeps a 30-card grid free of competing tap zones and gives the click affordance the whole tile to absorb errant taps. The Swap microbadge above is a passive marker, not a button.

Hover transition: `border-color 100ms linear, box-shadow 100ms linear, transform 100ms emphasized`. The 1px lift and shadow change disable cleanly under `prefers-reduced-motion: reduce` via the global rule.

Pairs with §Tier stat card on the recommendation surface — together they form the bundle composition view — and with §Patent detail Sheet (the surface that opens on click). Don't combine the gap-and-radius pattern with the older shared-border catalog grid on the same page; pick one and stay with it.

---

## Patent detail Sheet

Right-side slide-in panel surfaced on patent-card click — the "more info" view of a single patent in a 30-patent bundle. Composes §Sheet (geometry / motion) with §Chip family (chip row at the lede), an Abstract prose block, a streaming AI Insight prose block, a flat 2-col KV mosaic for facts, and a footer-mounted **AI Summary** toggle that streams an LLM-generated insight live into the body. Sits on the [detail-surface register](./design-tokens.md) (12 / 15 / 18) — eyebrows / KV labels / chips at 12, body prose / KV values / header ID at 15, body title at 18. Informational; the footer carries an AI toggle, Close, and Swap — never a Subscribe / upgrade CTA. Canonical reference: [`brand/previews/patent-card-preview.html`](./previews/patent-card-preview.html).

- **Consumes:** §Sheet shell (`surface-page`, `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`, `shadow-medium`, overlay `rgba(0,0,0,0.4)` + `backdrop-filter: blur(4px)`); chip row pulls Tier + Jurisdiction tokens per §Chip family; AI Summary toggle uses [`brand/assets/icons/ui/sparkles.svg`](./assets/icons/ui/sparkles.svg) per [`visual-guide.md`](./visual-guide.md) §Iconography → UI set
- **Surfaces:** Licensing Platform (30-patent recommendation grid result, license inventory expanded row, post-issuance bundle inspection); Patent Intelligence SaaS (saved-set browse) — same Sheet shape so the patent-detail surface is consistent across both products
- **Variants:** Swap-enabled (default; pre-issuance recommendation grid) / read-only (post-issuance; footer shows AI Summary + Close only, no Swap)
- **States:** hidden, entering, open, exiting — per §Sheet motion spec; AI Summary independently tracks `is-active` (footer button pressed) and `ai-on` (sheet exposing the AI Insight block) and `is-streaming` (sheet currently revealing tokens)

**Geometry.** §Sheet `md` width (480px on desktop, `min(480px, 90vw)` on narrower viewports), pinned right. 64px header / scrollable body / footer per §Sheet zones. Header title is the patent ID in mono 15 / 600 / +0.05em / `text-primary` — the headline of the surface is the *number*, not the title, because that's what the bundle tracks, exports, and contracts under. Title belongs in the body lede where it has room to wrap.

**Body anatomy** (padding 24, gap 24, top → bottom):

- **Lede block** (gap 12) — chip row in canonical Status → Jurisdiction → Tier order (Status omitted at MVP; render Jurisdiction → Tier, 6px gap). Below the chip row, the full patent title at heading-18 (18 / 600 / 1.4 / −0.005em / `text-primary`; no clamp — the Sheet has the room).
- **Abstract** — eyebrow `ABSTRACT` (mono 12 / 600 / +0.15em / uppercase / `text-secondary`) above the abstract paragraph (sans 15 / 400 / 1.6 / `text-secondary`). The abstract follows the structured form patent front-pages use — `This invention discloses … (a) … (b) … (c) … This method is suitable for …` — so the prose register is reference, not marketing.
- **AI Insight (preview)** — hidden by default. Same prose-block shape as Abstract (eyebrow + paragraph) but the eyebrow carries a 13×13 sparkles glyph before the label `AI INSIGHT (PREVIEW)`. Reveals when the AI Summary toggle in the footer is pressed and the body **streams in live** (see *Streaming cadence* below). When toggled off, the block hides and any in-flight stream is cancelled.
- **KV mosaic** — under a 1px `border-primary` hairline (padding-top 20). 2-col grid `1fr 1fr` with gap `18px 24px`. Nine fields in a fixed reading order, with `Patent owner` spanning both columns on the first row so the institutional name has full breathing room (apply `grid-column: 1 / -1` to that single cell):
  1. **Patent owner** *(spans 2 cols)* — render the **full institutional name** (`Industrial Technology Research Institute`), never the acronym (`ITRI`). Acronyms read as code on a card scan view; the full name on the detail Sheet contextualizes the licensor's institutional weight.
  2. **Industry** | **IPC** — Industry is the human-readable IPC counterpart (e.g. `Electronic Components`); IPC sits to its right as the technical companion (`H01G 4/30`).
  3. **Application date** | **Released date** — ISO full-day form (`2018-03-14`).
  4. **Date of issue** | **Validity remaining** — Validity rendered as `N years`.
  5. **Family size** | **Citation count**.

  Each KV cell: label sans 12 / 500 / sentence case / `text-tertiary`, margin-bottom 6, over a value mono 15 / 500 / `text-primary`. **Labels are sentence case sans, not all-caps mono** — sentence case + sans is the conventional register for KV labels (mono with uppercase tracking is reserved for `eyebrow` section markers like ABSTRACT / AI INSIGHT, which mark sections, not individual fields). **IPC is a KV cell, not a chip** — IPC codes are categorical reference data of the same shape as Patent owner; a pill would over-promote them next to the Tier/Jurisdiction signal chips. Numeric values use `font-feature-settings: "tnum"`. Dates render as `YYYY-MM-DD`.

**Streaming cadence (AI Summary).** When the toggle activates the AI Insight reveal, the prose body streams in word-by-word like a live LLM response. Tokenization is `text.match(/\S+\s*/g)` (word + trailing whitespace). Timing values:

| Beat | Value |
|---|---|
| Thinking pause (before first token) | **260ms** |
| Per-token cadence | **32–76ms** (`32 + Math.random() * 44`) |
| Sentence-boundary breath (after `.` `!` `?`) | **210ms** |
| Streaming caret | 2px-wide bar at the tail, blink `0.9s steps(2) infinite` (50% opacity at 50%); removed on done |
| Sparkles-icon pulse on the toggle while streaming | `1.2s ease-in-out infinite`, opacity 1 ↔ 0.55, scale 1 ↔ 0.92 |

Toggling off mid-stream cancels the timer, hides the AI Insight block, removes the caret, and stops the icon pulse. Closing the Sheet also cancels any active stream — no orphaned timers. Under `prefers-reduced-motion: reduce`, the caret blink and icon pulse become static (animation-duration 0); per-token reveal still runs since it's a setTimeout chain, but the visual chrome stops moving.

**Footer.** §Sheet footer geometry (padding 16×24, 1px top hairline). Layout `display: flex; justify-content: space-between; align-items: center; gap: 12` — split row with **AI Summary** (outline + sparkles icon, left) and a `.ftr-right` cluster (`gap: 12`) holding **Close** (ghost) + **Swap** (primary). AI Summary is a press-toggle (`aria-pressed`) — `text-primary` text on transparent bg with a 1px `border-primary` outline at rest, fills `surface-tertiary` with a `border-tertiary` border in the active / hovered state. **Swap** opens §Swap picker docked to the right edge while this Sheet shifts left; not a confirmation modal. Read-only variant drops Swap; AI Summary + Close remain.

**Dismissal.** Overlay click, Escape, the header `×`, or the footer Close — all four routes per §Sheet, all cancel any in-flight stream first. Focus returns to the originating card on dismissal.

Pairs with §Patent card (the trigger surface), §Chip family (the chip vocabulary), and §Swap picker (which docks to the right while this Sheet shifts left when the footer **Swap** action fires). Don't reach for §Modal for this surface — patent detail is reference content the user wants to scan against the bundle behind it, which is exactly the criterion §Sheet exists for.

---

## Swap picker

Second sheet that docks to the right edge while the §Patent detail Sheet shifts left — composes §Sheet (geometry / motion) with a list-rail of same-tier alternates and a staged-detail pane. Surfaced on click of the §Patent detail Sheet's `Swap` footer action; lets the buyer pick a same-tier replacement against the live reference (the original patent's detail stays open on the left for direct comparison). Replaces an earlier single-modal swap pattern that didn't surface the comparison. Canonical reference: [`brand/previews/bundle-page-preview.html`](./previews/bundle-page-preview.html).

- **Consumes:** §Sheet shell tokens (`surface-page`, `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`, `shadow-high`, overlay `rgba(0,0,0,0.4)` + `backdrop-filter: blur(4px)`); rail uses `surface-secondary`; alt rows pull `border-primary`, `border-tertiary`, `border-focus`, `surface-tertiary`; staged-detail mirrors §Patent detail Sheet's body register; staged banner uses `surface-tertiary` + `text-secondary`; AI Summary toggle uses [`brand/assets/icons/ui/sparkles.svg`](./assets/icons/ui/sparkles.svg) per [`visual-guide.md`](./visual-guide.md) §Iconography → UI set
- **Surfaces:** Licensing Platform (recommendation grid swap flow only) — pre-issuance only; not used in Patent Intelligence SaaS (no swap concept there)
- **Variants:** default (4 same-tier alternates per tier); the picker is gone post-issuance when the bundle is locked and the §Patent detail Sheet's Swap action is dropped
- **States:** entering · open (no staged) · open (staged) · committing · exiting

**Geometry.** 680px wide (`min(680px, 90vw)`), pinned right at the overlay's right edge. The §Patent detail Sheet ahead of it transitions from `right: 0` to `right: 680px` so the picker takes the active right edge — new content is always on the right, matching the §Sheet pattern. Motion: detail's `right` transition + picker's `transform: translateX(100% → 0)` run in lockstep over 250ms `ease-emphasized`. At ≤1240px the detail hides under the picker (`visibility: hidden`) rather than pushing off-screen; at ≤640px the picker takes the full viewport width and the rail collapses above the staged-detail.

**Internal layout.** Picker body is a 2-column flex row, each column an independent scroll region:

- **List-rail (200px, left)** — `surface-secondary` bg, 1px right `border-primary`, padding 12, gap 6. Each alt row is a `<button>` with: ID (mono 11 / 600 / +0.05em), Tier label (sans 10 / 700, color follows tier), title (sans 13 / 500 / 1.4, clamped to 2 lines), meta line (mono 11 / `text-secondary` — `assignee · N cites · N family`). Rest: 1px `border-primary`, radius 10, background `surface-page`. Hover: border → `border-tertiary`. Staged: `border-color: border-focus` + `background: surface-tertiary` — neutral brand selector treatment, **never tier-color** (the picker's selection state must not collide with the tier color system). The rail extends to the picker's bottom edge — no footer beneath it.
- **Staged-detail pane (480px, right)** — full mirror of §Patent detail Sheet's body register at the same 480px width, so the user is doing a like-for-like comparison against the patent on the left. Empty state ahead of staging: small centered prompt `COMPARISON PANEL · Pick an alternate from the list to compare it against the current patent.` Once staged, renders a neutral `Staged · {ID}` banner pill (sans 12 / 700 / `text-secondary` on `surface-tertiary`, **not green** — staged state is tier-agnostic) above the standard Lede + Abstract + AI Insight + KV mosaic. The KV mosaic uses 7 cells (Patent owner spanning, IPC, Application date, Date of issue, Validity remaining, Family size, Citation count) — drops `Industry` and `Released date` versus the full patent detail mosaic, since both are redundant within a same-tier comparison.

**Header.** §Sheet header geometry (padding 16×24, 1px bottom hairline). Title `Replace tier-X patent` (sans 15 / 600 / `text-primary`), subtitle `N same-tier alternate(s)` (mono 12 / `text-tertiary`) on the left, close `×` on the right. **No breadcrumb** — the picker is local to the open detail sheet, the header text is enough orientation.

**Footer (split layout).** Mounted *inside* the staged-detail pane only — the rail extends past it to the picker's bottom. This makes the staged-detail's footer mirror §Patent detail Sheet's footer 1:1: AI Summary press-toggle on the left; `.ftr-right` cluster (gap 12) holding `Cancel` (ghost) + `Confirm swap →` (primary) on the right. The AI Summary toggle is **disabled until an alternate is staged** (so the toggle has a target block to reveal); on stage, it activates with the staged alternate as its target. Streaming cadence is identical to §Patent detail Sheet — 260ms thinking pause, 32–76ms per-token, 210ms sentence breath, 0.9s caret blink. Picking a different alternate resets the toggle so it doesn't appear pre-pressed on the new selection. Closing the picker cancels any in-flight stream.

**Dismissal.** Overlay click, Escape, header `×`, or the footer `Cancel` — all four close the picker only and slide the detail sheet back to `right: 0`. The detail sheet stays open. `Confirm swap` commits the replacement, fires a `Patent swapped` toast (`from.id → to.id`), and closes both sheets. Confirm is gated by a non-null staged alternate (`disabled` + `aria-disabled="true"` until then).

Pairs with §Patent detail Sheet (entry point) and §Patent card (target of the resulting swap — see the §Patent card swap microbadge note). Don't compose with §Modal — modal-only swap can't surface the live reference, which is the entire point of this picker.

---

## Batch action bar

Floating glass toolbar that surfaces multi-select operations on a recommendation grid — the bulk-action partner to the per-card §Swap picker. Appears only when one or more §Patent cards are selected via the top-row checkbox; pinned to bottom-center of the viewport, persists across the §Patent detail Sheet overlay so selection survives an inspect detour. Replaces an earlier "single-action only" pattern that forced subscribers to swap, pin, or remove patents one at a time across a 30-patent bundle. Canonical reference: [`brand/previews/licensing-flow-preview.html`](./previews/licensing-flow-preview.html).

- **Consumes:** `surface-page-translucent` (base; bar adds its own `backdrop-filter: blur(24px) saturate(180%)` on top — sister to §Top nav's translucent treatment), `text-primary` (count num + action labels on hover + selected-pin state), `text-secondary` (action labels at rest), `text-tertiary` (count tail + select-all link + close ✕ at rest), `border-primary` (surface hairline), `danger-fg` / `danger-bg` (Remove action), `shadow-medium` (near drop), `shadow-high` (far drop) — all from [`design-tokens.md`](./design-tokens.md) §7.4. **Composes** §Checkbox primitive upstream (the bar reflects the cards' top-row checkbox state — it is the canonical readout of "what's selected") and pulls Lucide UI icons [`arrow-left-right.svg`](./assets/icons/ui/arrow-left-right.svg), [`pin.svg`](./assets/icons/ui/pin.svg), [`trash-2.svg`](./assets/icons/ui/trash-2.svg), [`download.svg`](./assets/icons/ui/download.svg), [`x.svg`](./assets/icons/ui/x.svg) per [`visual-guide.md`](./visual-guide.md) §Iconography → UI set.
- **Surfaces:** Licensing Platform (30-patent recommendation grid, Step 4 of the purchase wizard); Patent Intelligence SaaS (saved-set browse, portfolio review grid) — anywhere a §Patent card grid supports multi-select.
- **Variants:** default (4 actions: Swap / Pin / Remove / Export). The `Pin` action is a press-toggle — when every selected card is already pinned, the label and tooltip flip to `Unpin`; otherwise `Pin`.
- **States:** hidden (resting; `opacity: 0`, `pointer-events: none`, `transform: translateY(12px)`), entering, on (`opacity: 1`, `pointer-events: auto`, `transform: translateY(0)`), exiting

**Glass surface.** `surface-page-translucent` base + `backdrop-filter: blur(24px) saturate(180%)` (and `-webkit-` prefix). 1px `border-primary` hairline. Drop-shadow stack pairs near-shadow with far-shadow to lift the bar off the canvas: inset top-edge highlight (1px white inset) + `shadow-medium` + `shadow-high` doubled. The translucency only reads cleanly against a non-flat canvas — pair with the wizard's warm radial-gradient background (see [`design-tokens.md`](./design-tokens.md) §Material presets). Container radius 16, padding `10 12 10 18` (asymmetric — the count label gets a 6px extra leading; the trailing close ✕ tucks tight against the right edge).

**Geometry.** Fixed-positioned at `bottom: 28px`, `left: 50%`, `transform: translateX(-50%)`. `z-index: 60` — above the grid but **below** the §Sheet overlay (which is 710), so opening the §Patent detail Sheet covers the bar with its blurred overlay; the selection state and the bar persist underneath, restored on sheet dismissal. At ≤720px the bar wraps to two rows and caps at `calc(100% - 32px)` width.

**Anatomy** (left → right, 10px gaps, two `border-primary` 1px×28px dividers separating three groups):

- **Count + select-all link.** `{N} selected` (sans 14 / 500 / `text-primary`, the `{N}` rendered with `font-variant-numeric: tabular-nums` at 15 / 700) followed by a `Select all {total}` link (sans 13 / `text-tertiary`, underlined, `text-underline-offset: 3px`). When `N === total`, the link flips to `Clear`. Hover lifts the link color to `text-primary`. **The count + select-all label lives only here** — duplicating it in the §Filter bar was deprecated 2026-05-19 as redundant.
- **Action cluster.** Four `<button>` actions with leading 18×18 Lucide glyphs at native 2px stroke. Labels are sans 14 / 600 / `text-secondary` at rest, gap 8 between glyph and label, padding `10×12`, radius 10. Hover fills `surface-translucent` and bumps color to `text-primary`. The `Pin` action's `aria-pressed="true"` state (all selected already pinned) fills `surface-translucent` and lifts to `text-primary`. The `Remove` action is the **danger variant** — `danger-fg` color at rest, `danger-bg` fill on hover; it stays `danger-fg` (no white text) so the bar never reads as a critical-action banner — destructive intent is signalled only on hover. Action order is fixed: **Swap → Pin → Remove → Export**. Swap iterates the same-tier §Swap picker per selected card; Pin toggles `data-pinned` on every selected §Patent card; Remove fires a §Confirm dialog and on commit drops the cards (with §Toast undo trailer); Export copies the selected patent IDs to the clipboard as a comma-separated list and surfaces a `success` §Toast.
- **Close.** 36×36 ✕ button at `text-tertiary`, hover fills `surface-translucent` and lifts to `text-primary`. Click clears the entire selection set and dismisses the bar.

**Motion.** Enter and exit transition both `opacity` and `transform: translateY` over 250ms `ease-emphasized`. Bar slides up from below on first selection; reverses on last deselect. Under `prefers-reduced-motion: reduce` the slide is suppressed by the global rule — the bar fades instead.

**Keyboard.** `Esc` clears all selection and dismisses the bar (same as the close ✕). Tab order: count link → Swap → Pin → Remove → Export → Close.

**Behavior under the §Patent detail Sheet.** The Sheet overlay (`z-index: 710`, `backdrop-filter: blur(4px)`) sits above the bar (`z-index: 60`). Opening the Sheet does *not* clear selection — the bar persists underneath. Closing the Sheet (overlay click, Escape, header ×, footer Close) restores visibility. A subscriber can pick three patents, open one to inspect, dismiss the Sheet, and the bar is still primed with the original three. **Don't change this** — losing selection on inspect would create a "select-twice" tax during scanning.

Pairs with §Patent card (the selectable unit; top-row checkbox is the entry point), §Swap picker (Swap action delegates to it per selected card), §Confirm dialog (Remove gates through it), and §Toast (action feedback). Don't compose with §Filter bar selection patterns — selection summary lives here, filtering lives there; the two roles are deliberately separated.

---

## Tier stat card

Connected horizontal row of five tier cells reading the SABCD distribution of a 30-patent bundle. Each cell pairs a Tier chip with a mono count over its slot capacity (`5 / 5`, `6 / 6`, `9 / 9`, `6 / 6`, `4 / 4`). Sister to Tier chip — the chip is the in-line label, this is the row-form rollup. Used above the 30-patent recommendation grid as the bundle composition summary.

- **Consumes:** `surface-page`, `border-primary`, `text-primary`, `text-tertiary`; inner Tier chip pulls `score-*` foregrounds + `score-*-bg` tints from [`design-tokens.md`](./design-tokens.md) §7.4
- **Surfaces:** Licensing Platform (recommendation summary above the 30-patent grid; post-issuance bundle composition); Patent Intelligence SaaS (cohort dashboard SABCD distribution)
- **Variants:** none — variant lives only on the inner chip; the surrounding strip stays neutral
- **States:** default

Container: `display: inline-flex; align-items: stretch`, 1px `border-primary`, radius 10, background `surface-page`, `overflow: hidden`. No outer gap — cells share internal hairline dividers, so the five tiers read as one continuous primitive instead of five separate cards.

Each cell: `display: inline-flex; align-items: center; gap: 8`, padding 8×12, with a 1px `border-primary` right-divider (suppressed on the last child). `font-family: mono`, font-size 13, `white-space: nowrap`. Three inline tokens per cell:

1. **Tier chip** — the canonical `tier-chip` (see [`primitives.md`](./primitives.md) §Chip family / Tier chip), full label `Tier S` / `Tier A` / etc. Tier color lives entirely in the chip; the surrounding strip stays neutral so the row reads as a uniform summary primitive instead of a colored streak.
2. **Count** — mono 13 / 600 / `text-primary` with `font-feature-settings: "tnum"`. The achieved number is the cell's primary signal.
3. **Denominator** — mono 13 / 500 / `text-tertiary`, in the form `/N` (e.g. `/5`). Lighter weight and lower contrast than the count so the eye lands on the achieved number first; the slot capacity sits beside it as a quiet reference. Useful when bundles are under-recommended or mid-swap and a count of `5 / 6` reads more clearly than a bare `5`.

Pairs with §Patent card on the recommendation surface.

---

## Stat strip

Connected horizontal row of 4 stat cells reading the topline state of a dashboard — `Active licenses · Patents covered · Monthly run rate · Badge embeds` on the Licensing Platform first-fold, or any 4-up topline composition on a SaaS dashboard. Cells share internal hairlines — no gap — so the row reads as one continuous primitive. Sister to §Tier stat card (the SABCD distribution rollup, which carries inner chips) and to §Stat card (the marketing 3-up bordered composition); orthogonal in use.

- **Consumes:** `surface-page`, `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`, `shadow-low`
- **Surfaces:** Patent Intelligence SaaS · Licensing Platform (dashboard first-fold, under §Dashboard header)
- **Variants:** 4-up (default); 3-up and 2-up are allowed when the dashboard topline carries fewer facts — the row stays one continuous container, only the column count changes
- **States:** rest (no hover — the strip is read-only signal, not interactive)

Container: `display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; background: surface-page; border: 1px solid border-primary; border-radius: 10; overflow: hidden; box-shadow: shadow-low`. The single radius and outer border give the row its card identity; the inner cells do not carry their own border-radius. Margin-bottom 20 separates the strip from the panel grid below.

Cell: `padding: 18px 22px 20; border-right: 1px solid border-primary; display: flex; flex-direction: column; gap: 8`. The last cell's `border-right` drops to 0. No hover state — the strip is read-only. **Inner stack (top → bottom):**

1. **Label** — sans 14 / 600 / +0.04em / `text-secondary`, sentence-case (not uppercase eyebrow — the strip is not a marketing eyebrow construct). Optional `icon-sm` glyph in `text-tertiary` to the left of the label, `gap: 8`.
2. **Value** — sans 30 / 600 / -0.02em / `text-primary`, line-height 1.1, `font-feature-settings: "tnum"; font-variant-numeric: tabular-nums`. Optional inline unit suffix (`NT$`, `M`, `+`) sits as a `<span class="unit">` after the value at sans 16 / 500 / `text-tertiary` / letter-spacing 0 — large value · small unit reads as one composed numeral.
3. **Description** — mono 14 / `text-tertiary`, line-height 1.4. One terse fact (renewal window, jurisdiction count, post-discount note). Don't pile two facts in here; if the strip needs more context, raise it to the panel below.

**Responsive collapse.** Below `1100px` the 4-up grid drops to 2-up; cells in the first row gain a `border-bottom: 1px solid border-primary` and the second cell's `border-right` drops to 0. Below `640px` the grid collapses to 1-up — every cell gets a bottom hairline except the last, and `border-right` drops to 0 on all cells.

**Composition rules.** The strip is the dashboard's first surface under the header — no eyebrow, no panel title above it. The values are the headline. Don't compose the strip inside another panel (it owns its container shell), and don't pair it with §Stat card on the same surface — they're parallel primitives for different surfaces.

---

## Your licenses

Active-license panel from the Licensing Platform dashboard. Each subscribed bundle is one tabular row reading ID · jurisdiction · industry · patent count · term · renewal countdown · live status · chevron, with columns aligned across rows so the panel reads as a table. Empty state gates the first-purchase CTA.

- **Consumes:** `surface-page`, `surface-tertiary` (row hover), `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`, `text-quaternary`, `warning-fg` (urgent renewal countdown), `shadow-low`; inner Jurisdiction chip pulls `juris-*` / `juris-*-bg` from [`design-tokens.md`](./design-tokens.md) §7.4; Status indicator pulls `signal-active` from §7.4
- **Surfaces:** Licensing Platform (dashboard, license inventory)
- **Variants:** populated / empty
- **States:** row default, row hover (background `surface-tertiary`), urgent (renewal countdown < 7 days flips to `warning-fg` / weight 600)

Container: `panel` shell — radius 10, 1px `border-primary`, background `surface-page`, `box-shadow: shadow-low`, `overflow: hidden`. Header (padding 14×20, 1px bottom hairline, `display: flex; justify-content: space-between; align-items: center`) carries the panel title at sans 16 / 600 / `text-primary` (with an optional mono 13 / 600 / `text-secondary` count chip on a `surface-tertiary` pill, radius 9999, padding 2×8) and an optional `See all →` link at sans 14 / 500 / `text-secondary` with inline `chevron-right` `icon-sm`. The link has no underline — the chevron carries the affordance.

Body rows: `display: grid; grid-template-columns: 104px 54px 1fr 96px 86px 134px 94px 18px; align-items: center; column-gap: 18; padding: 13×20; border-bottom: 1px solid border-primary; cursor: pointer`. Hover applies background `surface-tertiary`. The eight columns, in order:

1. **License ID** — mono 15 / 600 / `text-primary` (e.g. `LIC-00042`). The ID is the row's primary anchor and the only mono cell in the row — every other data column reads as sans tabular so the row's body weight stays calm and the ID's mono density is the column-edge anchor. ISO ID convention follows [`brand-voice.md`](./brand-voice.md) §6.
2. **Jurisdiction chip** — `juris-chip`, two-letter code (`US` / `TW` / `EU` / `JP` / `KR`) per [`primitives.md`](./primitives.md) §Chip family / Jurisdiction chip. The full region name is **not** repeated in the row — the chip carries the signal and the industry / context that follows is the human-readable text.
3. **Industry** — sans 15 / 500 / `text-secondary` (human-readable, e.g. `Electronics`). Takes the `1fr` slack column so long industry names breathe; all other columns are content-sized fixed widths so column edges align across rows.
4. **Patent count** — sans 15 / 500 / `text-secondary` with `font-feature-settings: "tnum"; font-variant-numeric: tabular-nums` (`30 patents`). Reads as a calm tabular fact, not a hard mono numeric — the License ID owns the mono density.
5. **Term** — sans 15 / 500 / `text-secondary` / tnum (`1 year`, `3 months`, `3 years`).
6. **Renewal countdown** — sans 15 / 500 / `text-secondary` / tnum (`Renews in 18d`). When the countdown drops below 7 days, the cell flips to `warning-fg` / weight 600 to communicate urgency at-a-glance — the only conditional color in the row.
7. **Status** — Signal dot (Active variant — pulsing `signal-active` per §Signal dot, 8×8) followed by an `Active` mono 12 / 500 / +0.16em / uppercase / `text-secondary` label, gap 7.
8. **Chevron** — `chevron-right` icon-sm in `text-tertiary`, signalling the row opens a detail surface.

**No `·` separators between columns.** The grid does the spacing — separators are reserved for inline meta lines that don't have column structure (e.g. a single Patent card's meta row).

**Mono density rule.** Only the License ID cell uses mono in this panel. Every other data cell is sans 15 with tabular-nums — the dashboard density wants warm sans tabular for the body, and a single mono anchor (the ID) per row reads cleaner than a row of mixed mono cells.

Empty state: `display: flex; flex-direction: column; align-items: center; gap: 16; padding: 64×24; text-align: center`. Title sans 18 / 600 / `text-primary`, body sans 14 / 400 / `text-secondary` with `max-width: 400`, primary CTA button per §Button (e.g. `Start a subscription`).

Pairs with §Lifecycle (the right-rail surface that opens on row click), §Verified License Badge (the issuance / verification anchor on the same detail surface), §Stat strip (the topline numbers above the panel on the dashboard), §Notifications panel (the right-column sibling on the dashboard grid), and §Quick actions list (the secondary panel below).

---

## Notifications panel

Right-column dashboard panel listing the most recent unread + read notifications, with a count chip on the title and an "Open inbox" link to the full inbox route. Each row is a 3-column grid: state dot · category + title stack · timestamp. The dashboard caps the panel at 3 rows; the Open-inbox link is the overflow affordance.

- **Consumes:** `surface-page`, `surface-tertiary` (row hover, count chip background), `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`, `text-quaternary`, `info-fg` (unread dot), `shadow-low`
- **Surfaces:** Patent Intelligence SaaS · Licensing Platform (dashboard right-column, post sign-in)
- **Variants:** populated (1–3 rows shown, link to inbox below); empty (single line, no link)
- **States:** title-count visible / hidden (visible when unread > 0), row default / hover / unread

Container: `panel` shell — radius 10, 1px `border-primary`, background `surface-page`, `box-shadow: shadow-low`, `overflow: hidden`. Header (padding 14×20, 1px bottom hairline, `display: flex; justify-content: space-between; align-items: center`):

- **Left cluster** — title `Notifications` at sans 16 / 600 / `text-primary` · optional unread count chip at mono 13 / 600 / `text-secondary` over `surface-tertiary` pill (radius 9999, padding 2×8) — only renders when unread > 0.
- **Right** — `Open inbox →` link in sans 14 / 500 / `text-secondary` with inline `chevron-right` `icon-sm`. Hover darkens to `text-primary`. No underline — the chevron carries the affordance.

Body: vertical stack of inbox rows. Each row: `display: grid; grid-template-columns: 7px 1fr auto; gap: 12; padding: 12×18; border-bottom: 1px solid border-primary; align-items: flex-start; cursor: pointer`. Last row's hairline drops. Hover: `background: surface-tertiary`. Unread rows do **not** tint the background — the dot carries the state. Row tinting is reserved for the full /inbox route, where unread density is higher and a tinted background helps grouping.

**Row anatomy:**

1. **State dot** — 7×7 round, `margin-top: 7`. Unread: filled `info-fg`. Read: transparent (the slot still occupies its column so titles stay aligned across read/unread rows).
2. **Body stack** — column 1: category eyebrow at mono 12 / +0.16em / `text-tertiary` (categories: `license`, `payment`, `contract`, `system`); column 2: title at sans 15 / 500 / `text-primary` / line-height 1.4. No body text — the panel is a glance surface; full body lives on the /inbox route.
3. **Timestamp** — sans 12 / `text-quaternary` / +0.04em / `white-space: nowrap`, right-aligned. Relative form (`2h ago`, `3d ago`); absolute ISO date appears on the /inbox detail.

Empty state (when no notifications exist): single sans 14 / `text-secondary` line `No notifications` centered with padding 32×24 — no CTA, no illustration; the inbox is a passive surface and an empty state shouldn't push interaction.

**Click behavior.** Clicking a row marks it read (the dot drops on next render — no animation; the change is acknowledged by the dot disappearing) and routes to the row's destination based on category: `license` → /badge, `payment | contract` → /licenses/<id>, otherwise /inbox.

Pairs with §Your licenses (the main-column sibling on the dashboard 2-up), §Quick actions list (the same-column sibling, stacked below), and the §Dashboard header bell + indicator dot (the parallel signal channel for unread state).

---

## Quick actions list

Flat dense list of dashboard quick actions — each row a 3-column grid (icon tile · title + description stack · trailing chevron). Used as a secondary panel under the main-column primary surface (§Your licenses) on the Licensing Platform dashboard, surfacing 2–3 single-click flows that aren't already represented in the §Dashboard header CTA cluster.

- **Consumes:** `surface-page`, `surface-tertiary` (icon tile background, row hover), `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`, `text-quaternary`, `shadow-low`
- **Surfaces:** Patent Intelligence SaaS · Licensing Platform (dashboard main-column, post sign-in)
- **Variants:** default (2–4 rows)
- **States:** row default, row hover (background `surface-tertiary`)

Container: `panel` shell — radius 10, 1px `border-primary`, background `surface-page`, `box-shadow: shadow-low`, `overflow: hidden`. Header (padding 14×20, 1px bottom hairline) carries the panel title `Quick actions` at sans 16 / 600 / `text-primary` — no count chip, no `See all` link (the panel *is* the list).

Body: `display: flex; flex-direction: column; gap: 0`. Each row: `display: grid; grid-template-columns: 38px 1fr auto; gap: 14; align-items: center; padding: 14×20; border-bottom: 1px solid border-primary; cursor: pointer; text-decoration: none; color: inherit; transition: background-color 100ms linear`. Last row's hairline drops. Hover: `background: surface-tertiary`.

**Row anatomy:**

1. **Icon tile** — 38×38, radius 8, `background: surface-tertiary`, `display: inline-flex; align-items: center; justify-content: center; color: text-primary`. Inner glyph: 18×18 Lucide icon. The tile is neutral by default (no per-action color tinting) — the row's interaction is the title and the tile is a categorical anchor, not a state signal.
2. **Body stack** — column 1: title at sans 16 / 600 / `text-primary` / line-height 1.3; column 2: description at sans 14 / `text-tertiary` / line-height 1.4 / margin-top 3. Description is one terse phrase (the time / outcome / proof, e.g. `15 minutes — pick jurisdiction, industry, term.`).
3. **Trailing chevron** — `chevron-right` 18×18 in `text-quaternary`. The whole row is one click target — no inline buttons, no nested CTAs.

**Composition.** 2–4 rows. Each row is a single-click flow (a route, not a multi-step). Don't compose two rows that route to the same destination. If a row is conditional (e.g. "Resume draft" only when a draft exists), it lives in its own draft banner (not in the quick-actions list) — quick-actions is canonical and stable across session state.

Pairs with §Your licenses (the primary panel above it in the same column), §Notifications panel (the right-column sibling), and §Dashboard header (the persistent topbar that owns the primary `New subscription` CTA — quick-actions does not duplicate that CTA).

---
## Lifecycle

License-detail vertical-spine timeline. Renders the four canonical milestones of a license — Issued, Mid-term review, Renewal window opens, Term ends — anchored to dates from the license record. Read-only state mirror; no edit affordances.

- **Consumes:** `surface-page`, `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`, `text-quaternary`, `signal-active` (done dots / done rails), `signal-warning` (active dot / dashed rail) — both from [`design-tokens.md`](./design-tokens.md) §7.4 signal palette
- **Surfaces:** Licensing Platform (license detail right-rail)
- **Variants:** default
- **States:** done (past, completed) · active (current milestone in window) · future (pending, not yet reached) · ghost (far-future, beyond the active step) · muted (de-emphasized row)

**Color discipline.** Dot and rail colors track the §Signal dot palette (`signal-active` #22C55E "live / active", `signal-warning` #F59E0B "expiring / degraded") — the same tokens the §Your licenses panel's Active indicator uses — so a license's Active status and its current Lifecycle milestone read as the same green / amber family. The deeper status-fg pairings (`success-fg` #15803D, `warning-fg` #A16207) are reserved for status badges and prose status text and are **not** used here. Per [`design-tokens.md`](./design-tokens.md) §3 / §7.4: signal palette = live-state indicators on dashboards / detail surfaces; status-fg = status text and chips.

Container: `panel` shell wrapping a `tl` block (padding 8×24×16). Each row: `position: relative; padding: 0 0 26 28; min-height: 28`.

**Dot** (left rail anchor): `position: absolute; left: 0; top: 4; width: 12; height: 12; border-radius: 50%; border: 2px solid; box-sizing: border-box; z-index: 2`. State map:

| State | Dot |
|---|---|
| done | background + border `signal-active` (filled bright green) |
| active | background + border `signal-warning` (filled bright amber, **no halo / no glow** — the row's natural prominence is enough) |
| future | background `surface-page`, 2px **dashed** `text-tertiary` border |
| ghost | background `surface-page`, 2px solid `text-quaternary` border, opacity 0.55 |

**Rail** (segment from the current dot down to the next): `position: absolute; left: 5; top: 16; bottom: -4; width: 2; z-index: 1`. State map:

| State | Rail |
|---|---|
| done | solid `signal-active` |
| dashed | repeating `signal-warning` (linear-gradient stripes, 2×6 background-size) |
| ghost | `text-tertiary` at opacity 0.3 |
| none | `display: none` (last row, or no connector to far-future) |

Row content (right of the dot): a head row (`display: flex; justify-content: space-between; align-items: baseline; gap: 8; margin-bottom: 2`) with the milestone title at sans 14 / 500 / `text-primary` on the left and the date at mono 12 / 400 / `text-tertiary` (+0.05em) on the right. Dates render ISO `YYYY-MM-DD` per [`brand-voice.md`](./brand-voice.md) §6. Below the head, an optional note at sans 12 / 400 / `text-secondary` / line-height 1.5 explains what the milestone unlocks (e.g. `30 days before expiry · 2.5–5% discount`).

The `muted` row modifier (opacity 0.5) de-emphasizes the row beyond the active milestone (e.g. Term ends after Renewal window opens) so the active step stays the row that draws the eye.

Pairs with §Your licenses (the trigger surface that opens this right-rail) and §Verified License Badge (the visual anchor on the same detail surface).

---

## Top nav

Full-width bar, flush to top, translucent fill with 20px backdrop blur, 1px bottom hairline. Logo left; primary nav links centered between logo and the right-side **controls cluster**; the controls cluster carries the theme toggle, language switcher, and auth area, separated from the primary nav by a single 1×20 vertical hairline on the cluster's left edge.

- **Consumes:** `surface-page-translucent`, `border-primary`, `text-primary`, `text-secondary`, `text-inverse`, `surface-tertiary` (active link pill, theme track, icon-button hover), `surface-inverse`, `surface-inverse-hover`
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Auth-cluster variants** (three patterns — the cluster's right-side composition changes by surface, not its overall structure): **marketing** (search + single Request-a-demo CTA, used by the website), **product unauthenticated** (search + Log in text + Sign up pill, used by SaaS / Licensing Platform), **product authenticated** (search + account menu trigger, used by SaaS / Licensing Platform after sign-in). All three keep the theme toggle + language switcher upstream of the search trigger.
- **Cluster density variants:** slim cluster (auth-only) vs. standard cluster (theme + language + search + auth); with / without mobile trigger
- **States:** link default, link hover, link active (pill), auth button states inherit from §Button

Height 64px, `position: fixed; top: 0; left: 0; right: 0; z-index: 100`. Background `surface-page-translucent` with `backdrop-filter: saturate(140%) blur(20px)`. `border-bottom: 1px solid border-primary`, radius 0, no shadow. Inner row inherits the page container — `max-width: 1440`, `padding-inline: 32` (20 below `md`), `display: flex; align-items: center; gap: 32px`. Logo per surface (full picker in [`visual-guide.md`](./visual-guide.md) §Logo Usage → Top nav header): the marketing website carries the **Secondary** mark at 28px height, single-language by document `lang` (`_ch` for `zh-Hant`, `_eng` for `en`), and falls back to the **Submark** at 32×32 below `sm` 640px so the bar stays balanced against the controls cluster; Patent Intelligence SaaS and Licensing Platform stay on the Submark at 32×32 across all viewports.

**Structure (left→right):** logo · `flex: 1` spacer · primary nav links · controls cluster.

- **Primary nav links** — inline, `gap: 4px`, `button-14` weight 600 no tracking, color `text-secondary` → `text-primary` on hover over 100ms linear. Each link padding 6×14 radius 9999px so the active pill fits without layout shift.
- **Active link** — `background: surface-tertiary; border-radius: 9999px; padding: 6×14` — label stays `text-primary`, no underline, no color change.
- **Controls cluster** — `display: inline-flex; align-items: center; padding-left: 24px; margin-left: -8px; position: relative`. A 1px × 20px `border-primary` hairline sits at `left: 0` via `::before` — this is the *only* divider in the bar, and it sits on the cluster's left edge, not between sub-groups inside the cluster. The negative `margin-left` tightens the outer flex gap from 32→24 so whitespace flanking the divider reads equal (24px from the last primary nav link to the hairline, 24px from the hairline to the first cluster item).

Inside the cluster, the leading items are constant across all surfaces; only the trailing auth sub-group changes by surface. Canonical order: **theme toggle** (§Theme toggle, 32px tall) · **language switcher** (§Language switcher, 32×32 icon button) · **search trigger** (§Search bar → compact icon-trigger variant, 32×32 icon button) · *auth sub-group per the variant table below*.

The cluster is one block — keeping theme/language/search and auth on the same side of the divider avoids a second hairline in the same region (the topnav's bottom hairline already carries all the edge work).

**Auth-cluster variants:**

| Variant | Surface | Auth sub-group composition |
|---|---|---|
| Marketing | website | Single primary CTA pill (`Contact sales`, padding 10×18, radius 12, bg `surface-inverse`, text `text-inverse`, `button-12`, hover → `surface-inverse-hover`, active `scale(0.95)`). Anchors to the in-page contact form (`#contact`) until a self-serve flow goes live. |
| Product unauthenticated | Patent Intelligence SaaS · Licensing Platform | `Log in` text link (`button-14` weight 600, no underline, padding 6×4, color `text-primary` → `text-secondary` on hover) followed by `Sign up` primary pill (same construction as the Marketing CTA). |
| Product authenticated | Patent Intelligence SaaS · Licensing Platform (post sign-in) | §Account menu trigger only — the Log in / Sign up pair drops out. The search trigger upstream stays. |

**Cluster gap variants:**

| Variant | gap | When |
|---|---|---|
| Slim cluster | 16px | Cluster carries 1–2 items after auth (e.g. authenticated dashboards: search + account menu, or language switcher + account menu) |
| Standard cluster | 8px | Cluster carries 3+ items (theme + language + search + auth, or any with a mobile trigger) — the denser rhythm keeps the row from drifting |

**Mobile collapse breakpoints:**

| Variant | Threshold | Use |
|---|---|---|
| Slim cluster | `md` (768) | Patent Intelligence SaaS / Licensing Platform topbars |
| Marketing cluster | 980 | website topbar (logo + 6 primary links + theme toggle + language switcher + search + Contact sales + mobile trigger doesn't fit at 768) |

Below the threshold, primary nav links and the auth sub-group of the cluster collapse into a right-side drawer (§Mobile nav). The theme toggle, language switcher, and search trigger remain visible in the bar — they're surface-level state, not navigation, and dropping them would force users to open the drawer just to flip the theme or run a search.

**Language switching (marketing topnav).**

The marketing topnav swaps content live with the document `lang` attribute (`en` ↔ `zh-Hant`). Only the logo's aspect ratio and the glyphs visibly change — every layout metric (size, padding, gap, position) is invariant.

| Element | EN | CH (zh-Hant) |
|---|---|---|
| Logo | Secondary `_eng` mark, ≈8.75:1, height 28px | Secondary `_ch` mark, ≈3.74:1, height 28px |
| Logo (below `sm` 640px) | Submark 32×32 | Submark 32×32 |
| Primary nav | Products · Services · Reports · Press · About · Contact | 產品 · 服務 · 報告 · 新聞 · 關於 · 聯絡 |
| Auth — Marketing cluster | Contact sales | 聯絡業務 |
| Auth — Product unauthenticated cluster | Log in · Sign up | 登入 · 註冊 |

- **Stable footprint.** Each translatable item (`.topnav-link`, plus whichever of the auth sub-group items render on this surface — the `Contact sales` pill on the marketing cluster, or the `Log in` text + `Sign up` pill on the product-unauthenticated cluster) carries a JS-locked `min-width` set to its EN natural width measured after `document.fonts.ready` — so toggling `lang` never shrinks any item and the right cluster never reflows via the `flex: 1` spacer absorbing slack. Nav-link and the `Log in` text variant use `text-align: center` so the shorter CH form sits centered inside its EN-sized box; the `Contact sales` and `Sign up` pills inherit centering from `.btn` (`inline-flex` / `justify-content: center`).
- **Type.** Per [`design-tokens.md`](./design-tokens.md) §3 / §7.2 the Noto Sans TC ramp matches the Urbanist counterpart 1:1, so nav-link sizes don't step between languages. CJK code points cascade to Noto Sans TC via the body fallback stack (`'Urbanist', 'Inter', 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif`) — no per-lang `font-family` swap, so Latin runs in either mode keep Urbanist metrics. CJK glyphs read slightly heavier optically; accepted trade-off for the fully seamless toggle.
- **Selector authority.** The `[lang="zh-Hant"] .topnav-logo` aspect-ratio override has higher specificity (0,2,0) than the `@media` submark fallback at 640px; the fallback selector explicitly lists `[lang="zh-Hant"] .topnav-logo` alongside `.topnav-logo` to tie specificity so source order wins inside the media query and the submark renders square in both languages on small screens.

---

## Announcement banner

Full-width single-line notice that sits **directly below the §Top nav and above the hero** — the first in-flow block of page content. One announcement per surface: a slim **solid dark-ink bar** carrying a short message and one inline link, dismissible for the session. **One spec, per-surface content** — the markup, CSS, and dismiss behaviour are shared; each surface fills its own `data-announce-id`, message, and link, and signals its pillar through a small leading dot in that pillar's accent colour (the bar itself is the same `surface-inverse` everywhere — a deliberate choice so the banner reads as TIS-system-level chrome no matter which surface it appears on, with the dot carrying the per-pillar cue). Not a §Toast (transient, async-fired, bottom-right) and not a §Modal (blocking) — this is ambient, always-at-top page chrome the reader can scroll past or close.

- **Consumes:** `surface-inverse` (bar fill — dark ink on light pages, inverts to light on dark pages per the surface-inverse semantic; either way the bar reads as a high-contrast strip against the page), `text-inverse` (message + inline link + close glyph; pairs with the bar fill in both themes), `surface-inverse-translucent` (close hover overlay — the dark-theme equivalent of `surface-tertiary` for the inverse bar) — all from [`design-tokens.md`](./design-tokens.md) §7.4. Close button reuses the §Toast close pattern (`icon-sm` `x`, 24×24, radius 6).
- **Surfaces:** website (homepage + marketing lobbies — **silver dot**, TIS-overall) · Patent Intelligence SaaS lobby (**cool dot**) · Licensing Platform lobby (**warm dot**). Bar fill is the same `surface-inverse` across all three; the dot is the only per-pillar signal — see *Per-surface theming* below.
- **Variants:** default (dot + message + inline link + close) / message-only (no link, dot retained) / no-dismiss modifier (`data-dismissible="false"` — close button drops, reserved for time-critical or legal notices; default is dismissible)
- **States:** shown, dismissing (collapse + fade), hidden (removed from flow; sessionStorage flag set)

**Placement & flow.** In-flow, not fixed: the bar is the first child of the page content region (which already carries `padding-top: 64` to clear the fixed §Top nav). It therefore renders flush under the nav's bottom hairline and **scrolls away with the page** — it does not pin. No own `z-index`; it sits in normal stacking below the `z-100` nav. Full-bleed background, inner row inherits the page container (`max-width: 1440`, `padding-inline: 32`, `20` below `md`). **No bottom hairline** — the dark bar against the white page surface is its own boundary; adding `border-primary` underneath would draw a visible 1px line on top of the dark fill that reads as a glitch.

**Anatomy (single row, `position: relative`, `display: flex; align-items: center; justify-content: center`, `min-height: 44`, padding-block `10`, padding-inline `56`).** Message + CTA sit dead-center of the bar; the close button is absolutely positioned at the right edge so its width never shifts the cluster off-axis. The symmetric `padding-inline: 56` reserves matching empty space on both sides — visually balances the close button at the right edge and lets the cluster's mathematical center align with the bar's optical center.

- **Message** — `copy-14 / weight 500 / text-inverse`, single line, `text-overflow: ellipsis` at narrow widths. Keep it to one clause; this is a headline, not a paragraph.
- **Inline link** — `copy-14 / weight 600 / text-inverse` with a trailing ` →` arrow, `text-decoration: none`, hover underline. The whole bar is **not** the click target — only the link is, so the close button and any text selection stay unambiguous.
- **Close** — `position: absolute; right: 20; top: 50%; transform: translateY(-50%)` — taken out of flow so it never pulls the cluster off-center. `icon-sm` `x` glyph, `text-inverse` at 75% opacity, 24×24 hit target, radius 6, hover background `surface-inverse-translucent` with glyph at full opacity. `aria-label="Dismiss announcement"`. Dropped under the `no-dismiss` modifier.

**Per-surface theming.** The **bar is identical on every surface** — `surface-inverse` fill, `text-inverse` content, no per-pillar mark. A deliberate departure from the pillar-gradient pattern that governs hero backdrops and section washes (per [`visual-guide.md`](./visual-guide.md) §Gradient architecture): announcements are **TIS-system-level chrome**, not pillar-scoped — the same colour band on every property tells the reader *TIS is speaking*, with the message itself doing the work of saying what about. Earlier iterations carried a per-pillar accent dot; that was dropped because the bar's per-surface signal added decoding overhead without informational value (the reader already knows which surface they're on). The bar inverts with theme like other inverse-surface chrome — dark ink strip on light pages, light strip on dark pages — `text-inverse` flips with it and stays legible against both.

**Dismissal (per session).** Close sets `sessionStorage["tis-announce-dismissed"] = announceId`; on load the bar checks the stored id against its own `data-announce-id` and stays hidden only if they match. Keying by id means a **new** announcement re-appears even within the same session (the stored id no longer matches), while a re-render of the same notice stays closed. Session scope (not `localStorage`) means the bar returns on the next visit — chosen so announcements get a fresh impression each session without nagging within one. Closing collapses the bar (`max-height → 0` + `opacity → 0`, 200ms emphasized) then sets `hidden`; under `prefers-reduced-motion: reduce` the collapse is instant (opacity only, no height animation).

**Accessibility.** Wrap in `role="region"` with `aria-label="Site announcement"`. The notice is informational, not urgent — do **not** use `role="alert"`/`aria-live` (that would interrupt screen-reader flow on every page load). Close button is a real `<button>`, keyboard-focusable, focus-visible ring per the global rule; on dismiss, focus moves to the §Top nav so it doesn't land in void.

Pairs with §Top nav (sits flush beneath it) and the §Hero on each lobby (sits flush above it). Don't reach for §Toast (transient async feedback) or §Modal (blocking) for standing announcements — this bar is the ambient, dismissible, top-of-page channel. One banner per page; don't stack two.

---

## Dashboard header

Authenticated app-shell topbar for the SaaS / Licensing Platform dashboard. Sticky 64px row carrying brand mark · primary nav · search input · bell · user pill, in that order. Distinct from §Top nav (the marketing-surface top nav with controls cluster) — the Dashboard header is left-anchored, single-language by login state, and the search lives inline (not behind a trigger). Reach for §Top nav on the marketing site and on logged-out product surfaces; reach for §Dashboard header once the user is authenticated and inside the product shell.

- **Consumes:** `surface-page`, `surface-tertiary`, `border-primary`, `border-tertiary`, `text-primary`, `text-secondary`, `text-tertiary`, `text-quaternary`, `text-inverse`, `surface-inverse`, `signal-lapsed` (unread bell dot)
- **Surfaces:** Patent Intelligence SaaS · Licensing Platform (post sign-in only)
- **Variants:** default; with-unread-indicator (bell carries the small `signal-lapsed` dot when notifications are unread)
- **States:** brand-hover, nav-link default / hover / active, search rest / hover / focus, icon-button rest / hover, user-pill rest / hover

Container: `<header class="app-topbar">`, height 64, `flex-shrink: 0`, `position: sticky; top: 0; z-index: 50`. Background `surface-page`, `border-bottom: 1px solid border-primary`, `padding: 0 24`, `display: flex; align-items: center; gap: 24`. No backdrop blur — the dashboard surface below is a flat tint, not a translucent gradient like the marketing topnav.

**Structure (left→right):** brand block · primary nav · `flex: 1` slack absorbed by the nav's overflow-scroll · right cluster.

- **Brand block** — TIS submark only (28×28, never the full Secondary mark — the dashboard is post-sign-in chrome, brand recognition is already established). Padding `5 10 5 0`, `border-right: 1px solid border-primary`, `margin-right: 6`. Click navigates to the dashboard root.
- **Primary nav** — `display: flex; align-items: center; gap: 2; flex: 1; min-width: 0; overflow-x: auto` with hidden scrollbar. Each link: padding 8×12, radius 7, `copy-15 / weight 500 / text-secondary`, transition 100ms linear on `background-color, color`. Hover: `background: surface-tertiary; color: text-primary`. Active: `background: surface-inverse; color: text-inverse` — solid ink pill, the only saturated element in the row by default. Optional inline numeric badge per link: mono 12 / 600 / `text-secondary` over `surface-tertiary` pill (radius 9999, padding 2×7); on the active link the badge inverts to `rgba(255,255,255,0.18)` / `text-inverse`.
- **Right cluster** — `display: flex; align-items: center; gap: 8; flex-shrink: 0`. Order: search input · bell · `border-primary` 1×22 vertical divider · user pill.
  - **Search input** — inline, not a trigger. Width 300, padding `7 10 7 12`, radius 7, background `surface-tertiary`, 1px transparent border. Search glyph `icon-sm` in `text-tertiary` left, input field `copy-15 / text-primary` (placeholder `text-quaternary`), trailing `⌘K` kbd hint at mono 12 / 600 / `text-tertiary` over `surface-page` chip (radius 4, 1px `border-primary`). Hover: background one rung darker than `surface-tertiary`. Focus-within: background `surface-page`, border `border-tertiary`. Below `1100px` collapses to width 160; below `720px` collapses to width 120.
  - **Bell** — 36×36 icon-button, radius 7, `text-secondary` glyph, hover `surface-tertiary` background + `text-primary` glyph. When unread > 0, a 7×7 `signal-lapsed` dot with 1.5px `surface-page` halo sits at top:8 right:8 inside the button. Click opens the inbox route. The bell carries the same unread signal as the §Notifications panel title-count chip — two parallel channels surfacing the same state, by design (the chip is read in context, the dot is glanceable from any route).
  - **User pill** — `display: inline-flex; align-items: center; gap: 10; padding: 5 10 5 5; border-radius: 9999`, transparent fill / transparent border at rest. Hover: `background: surface-tertiary; border: 1px solid border-primary`. Inner: 32×32 round avatar (initials at sans 13 / 600 / `text-inverse` over a `surface-inverse` fill) · first name at `copy-15 / weight 600 / text-primary` (max-width 160, ellipsis) · 12×12 chevron-down in `text-quaternary`. Click navigates to `/account`.

**Responsive collapse.** Below `md` 768 the search shrinks to width 120 and the user pill's name span hides — only the avatar + chevron remain. Primary nav items remain inline and scroll horizontally; they do **not** collapse into a drawer. The drawer pattern from §Mobile nav is reserved for marketing-surface collapses where the link count is denser; the dashboard header's link count is short enough to scroll.

Pairs with §Stat strip and §Your licenses (the canonical first-fold composition under the header on the Licensing Platform dashboard) and §Notifications panel / §Quick actions list (the right-rail and quick-action surfaces beside them). Replaces §Top nav once the user is authenticated inside the product shell — the two top-of-page primitives are mutually exclusive, never composed on the same surface.

---

## Mobile nav

Right-side drawer that replaces the collapsed Top nav links on small viewports. Contains nav links plus the auth area.

- **Consumes:** `surface-page`, `surface-tertiary`, `border-primary`, `text-primary`, `text-secondary`, shadow `medium`, `rgba(0,0,0,0.4)` overlay
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform (below `md` 768)
- **Variants:** right-side (default)
- **States:** hidden, entering, open, exiting

Trigger: `menu` Lucide icon (`icon-md`) button in the Top nav, visible only below `md`.

Overlay: `rgba(0,0,0,0.4)` + `backdrop-filter: blur(4px)`, z-index 500 (overlay layer per [`design-tokens.md`](./design-tokens.md) §7.2), fade 150ms linear.

Drawer: background `surface-page`, 1px left `border-primary`, shadow `medium`, position fixed right 0 top 0 bottom 0, width `min(360px, 85vw)`, z-index 700 (dialog layer). Enter: `translateX(100% → 0)` over 250ms emphasized + overlay fade. Exit: 150ms linear reverse.

Structure:
- **Header** — height 64, padding 0 20, 1px bottom `border-primary`. TIS submark 24 left; close button (`icon-md` `x`, 32×32, radius 6, hover `surface-tertiary`) right.
- **Nav list** — each link one row, height 48, `copy-16 / weight 500 / text-primary`, 1px bottom `border-primary`. Active row: `text-primary` plus an inline `chevron-right` `icon-sm` in `text-tertiary` on the far right.
- **Auth area** — flush to bottom, padding 20, 1px top `border-primary`. Log in (ghost) + Sign up (primary), stacked or inline.

Close: overlay click, Escape, or close button. Focus trap identical to Modal.

---

## Account menu

Avatar / initials trigger in the authenticated Top nav; opens a short menu with identity info and account actions.

- **Consumes:** `surface-page`, `surface-tertiary`, `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`, shadow `medium`; material preset `menu` from [`design-tokens.md`](./design-tokens.md) §7.3
- **Surfaces:** Patent Intelligence SaaS · Licensing Platform · website (authenticated)
- **Variants:** default
- **States:** closed, open, item-hover, item-focus, item-disabled

Trigger: 32×32 button, radius 50%, background `surface-tertiary`, user initials in `copy-14 / weight 600 / text-primary` (or an avatar image). Replaces the Log in / Sign up group when authenticated.

Menu: `menu` preset (radius 12, shadow `medium`, 1px `border-primary`), width 240, offset 8 below trigger, anchored right, z-index 600 (popover layer), padding 4 0.

**Group 1 — identity** (non-interactive, 1px bottom `border-primary`). Padding 12. Name `copy-14 / weight 500 / text-primary`; email `copy-13 / text-secondary`, margin-top 2.

**Group 2 — account actions**. Each item: padding 8×12, `copy-14 / text-primary`, optional leading icon (`icon-sm / text-tertiary`). Hover / keyboard-focus: background `surface-tertiary`. Items: Settings, Billing, Team.

**Group 3 — sign out** (1px top `border-primary`). Same item style; leading icon `log-out`.

Keyboard: Tab opens into menu; ↑/↓ navigate; Enter activates; Esc closes and restores focus to trigger.

---

## Language switcher

Globe icon trigger in the Top nav; opens a short menu with language options. **One canonical pattern across all surfaces** — no text-trigger fallback: the icon-plus-menu form keeps every translatable neighbor (nav links, auth) on a stable footprint regardless of language, since the trigger itself never reflows.

- **Consumes:** `surface-page`, `surface-tertiary`, `border-primary`, `text-primary`, `text-tertiary`, shadow `medium`; material preset `menu`
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** icon trigger + menu (only)
- **States:** closed, open, item-hover, item-focus, item-checked

Trigger: 32×32 icon button, radius 6, background transparent, hover `surface-tertiary`; `globe` (Lucide) `icon-sm` in `text-secondary`. Positioned just before the auth area inside the controls cluster (no separate divider — the cluster's left-edge hairline is the only one). The trigger glyph does not change with the active language; current language is read from the menu's `aria-checked` row, not from the trigger.

Menu: `menu` preset (radius 12, shadow `medium`, 1px `border-primary`), width 180, offset 8 below trigger, anchored right, z-index 600 (popover layer per [`design-tokens.md`](./design-tokens.md) §7.2). Items: padding 8×12, `copy-14 / text-primary`; labelled in their own language (`English`, `中文`). Current selection: `check` `icon-sm` right-aligned in `text-primary` (rendered as a `::after` mask glyph on `[aria-checked="true"]`). Hover / focus: background `surface-tertiary`. Enter: opacity 0→1 + `translateY(-4px → 0)` over 150ms emphasized; Exit: 150ms reverse.

Behavior: clicking a menu item sets `lang` on `<html>` (`en` ↔ `zh-Hant`) and translates every `[data-en]/[data-ch]` element in place. Width-locking on translatable nav items (per §Top nav → Stable footprint) keeps the bar 1:1 with the EN layout — only character glyphs change, never positions.

Keyboard: Tab focuses the trigger; Enter / Space opens; ↑/↓ navigate menu items; Enter activates and closes; Esc closes and restores focus to trigger; outside click closes.

Name usage follows [`visual-guide.md`](./visual-guide.md) §Name Usage — English UI uses the Urbanist stack; Chinese UI uses Noto Sans TC per [`design-tokens.md`](./design-tokens.md) §7.2.

---

## Theme toggle

Three-segment pill in the Top nav: System · Light · Dark, icon-only. The active segment renders as a raised pill against the track; System mode follows OS appearance and updates live.

- **Consumes:** `surface-tertiary` (track), `surface-elevated` (active pill), `text-tertiary`, `text-primary`, shadow `low`, `border-focus`
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** icon-only (default)
- **States:** default, hover, active (`aria-pressed="true"`), focus

Container: `display: inline-flex; align-items: center`, height 32, padding 2, background `surface-tertiary`, radius 9999, border 0. Role `group`, `aria-label="Theme"`.

Segment: 28×28 button, radius 9999, background transparent, color `text-tertiary`. Each segment carries `data-theme-set="system | light | dark"` and a Lucide glyph at `icon-sm` (`monitor` / `sun` / `moon`). Transitions `background / color / box-shadow 100ms linear`. Hover (when not active): color → `text-primary`. Active (`aria-pressed="true"`): background `surface-elevated`, color `text-primary`, shadow `low` — `surface-elevated` is the only surface that reads as lifted above the track in both themes (see [`design-tokens.md`](./design-tokens.md) §7.4). Focus ring: 1px `border-focus`, 2px offset, radius 9999.

Behavior:
- Persists choice (`system | light | dark`) in `localStorage`; first paint defaults to `system`.
- `system` resolves to `prefers-color-scheme` and live-tracks OS appearance changes via `matchMedia('(prefers-color-scheme: dark)')` while selected. `light` / `dark` pin the resolved theme regardless of OS preference.
- Only the resolved theme is written to `data-theme` on `<html>`; the user's *choice* is the persisted value.

Placement: Top-nav controls cluster, before the auth divider (alongside the Language switcher). Spec for the divider lives in §Top nav.

Keyboard: Tab between segments; Enter or Space activate.

---

## Breadcrumb

Horizontal path of text links separated by chevrons. Shows depth without a full back-button stack.

- **Consumes:** `text-primary`, `text-secondary`, `text-tertiary`
- **Surfaces:** Patent Intelligence SaaS (report drill-down, patent detail) · Licensing Platform (catalog → bundle → license detail)
- **Variants:** default; truncated (middle levels collapsed into `…`)
- **States:** link default, link hover, current (non-interactive)

Row: `display: flex`, `align-items: center`, gap 8, wraps on narrow viewports. Parent links: `copy-14 / text-secondary`; hover → `text-primary` with underline 1px offset 2. Current page: `copy-14 / text-primary`, no underline, not a link. Separator: `chevron-right` `icon-sm / text-tertiary`, 4px gap either side.

Truncation: when levels > 3, render `first › … › current`; the `…` is a button that expands the full path inline on click.

---

## Tabs

Horizontal row of text labels; the active tab sits on a 2px ink bar; the full strip has a 1px hairline beneath.

- **Consumes:** `surface-inverse`, `surface-tertiary`, `border-primary`, `border-focus`, `text-primary`, `text-secondary`, `text-tertiary`
- **Surfaces:** Patent Intelligence SaaS · Licensing Platform · website
- **Variants:** default (underline); with leading icon; with trailing count chip
- **States:** default, hover, active, focus, disabled

Container: `display: flex`, gap 4, `border-bottom: 1px solid border-primary`, horizontal scroll on narrow viewports.

Tab: padding 12×16, type `copy-14 / weight 500`, color `text-secondary`. Hover: color → `text-primary`. Active: color `text-primary` + `box-shadow: inset 0 -2px 0 0 surface-inverse` (the 2px bar draws inside the container so it overlays the 1px hairline). Focus ring: 1px `border-focus`, 2px offset, radius 4.

Optional leading icon: `icon-sm`, inherits tab color. Optional trailing count chip: `label-mono-11`, padding 2×6, radius 9999, background `surface-tertiary`, fg `text-secondary` — neutral, not a status pairing.

Disabled: opacity 0.4, cursor `not-allowed`.

Keyboard: ←/→ navigate, Home / End jump to first / last, Enter or Space activate.

---

## Search bar

Input-box with a leading search icon; nav-trigger variant opens a command palette.

- **Consumes:** Input-box tokens plus `surface-page`, `surface-tertiary`, `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`, `text-quaternary`, shadow `high`, `rgba(0,0,0,0.4)` overlay
- **Surfaces:** Patent Intelligence SaaS (global patent search) · Licensing Platform (catalog search) · website (site search)
- **Variants:** inline input (full-width) · bordered nav trigger (compact button with ⌘K hint) · compact icon trigger (32×32 icon button, marketing topnav cluster)
- **States:** default, focus, filled, loading, error, disabled

**Inline** — Input-box (md 36 / lg 40) with `search` (`icon-sm`, `text-tertiary`) left-anchored at padding-left 12; input text padding-left 36 to clear the icon. Placeholder `copy-14 / text-quaternary`. Filled state adds a trailing `x` clear button (`icon-sm`, 24×24 radius 6, hover `surface-tertiary`).

**Native decoration suppression.** When the underlying field is `<input type="search">`, suppress the browser's built-in clear button so only the custom `x` renders: `::-webkit-search-cancel-button` and `::-webkit-search-decoration` set to `-webkit-appearance: none`; the input itself keeps `-webkit-appearance: textfield` so it inherits the Input-box chrome. Applies equally to the command-palette input below.

**Bordered nav trigger** — button styled as an Input-box: height 36, padding 0 12, `surface-page` bg, 1px `border-primary`, radius 8, flex row. Left: `search` `icon-sm / text-tertiary` + "Search" in `copy-14 / text-tertiary`. Right: keyboard hint — `⌘K` in a pill (1px `border-primary`, radius 6, padding 2×6, `label-mono-11 / text-tertiary`). Hover: border → `border-tertiary`. Click opens the command palette. Use when the topnav has horizontal headroom — Patent Intelligence SaaS and Licensing Platform topbars where the trigger reads as a real input affordance.

**Compact icon trigger** — 32×32 icon button (matches the §Language switcher trigger geometry), radius 6, transparent background, `search` `icon-sm` glyph in `text-secondary`. Hover: background `surface-tertiary`, glyph → `text-primary`. Click opens the same command palette as the bordered variant — the trigger is the only thing that changes. Use on the marketing topnav cluster where the bordered ⌘K input would crowd the row alongside the theme toggle, language switcher, and the auth sub-group; the icon-only form keeps the cluster rhythmic and reduces visual weight ahead of the auth CTA.

**Command palette** — overlay `rgba(0,0,0,0.4)` + `backdrop-filter: blur(4px)`, z-index 500. Card: centered top (margin-top 15vh), max-width 560, `surface-page`, radius 12, shadow `high`, z-index 650 (command-menu layer). Card inner: input at top, no borders, height 48, padding 16, `copy-16 / text-primary`, left-anchored `search` `icon-md / text-tertiary`; 1px bottom `border-primary` divider. Results listbox: padding 4 0, max-height 320, internal scroll. Results grouped by section — group header `label-12 / text-tertiary`, padding 8 12; item padding 8 12, `copy-14 / text-primary`, optional leading icon (`icon-sm / text-tertiary`), trailing metadata (`copy-mono-13 / text-tertiary`). Hover / keyboard focus: background `surface-tertiary`.

Keyboard (palette): typing filters results; ↑/↓ move selection; Enter activates; Esc closes and restores focus.

---

## Filter bar

Single-row controller above filterable grids — combines a multi-toggle pill group with single-select dropdowns and a sort / clear / count tail anchored right. Used above the Licensing Platform 30-patent recommendation grid to slice the bundle by tier and numeric thresholds. Composes §Select for the dropdowns and the Tier palette (without consuming the [`primitives.md`](./primitives.md) §Chip family / Tier chip itself — the pills are interactive toggles, not labels). Canonical reference: [`brand/previews/bundle-page-preview.html`](./previews/bundle-page-preview.html).

- **Consumes:** `surface-page`, `surface-tertiary`, `border-primary`, `border-tertiary`, `border-focus`, `text-primary`, `text-secondary`, `text-tertiary`; selected pills pull `score-*` / `score-*-bg` per tier from [`design-tokens.md`](./design-tokens.md) §7.4
- **Surfaces:** Licensing Platform (recommendation grid, license inventory); Patent Intelligence SaaS (saved-set browse)
- **Variants:** default (single row, wraps at narrow viewports)
- **States:** rest; with one or more filters active (Clear button enabled); cleared (Clear disabled but visible — never collapses out of the row)

Container: `display: flex; align-items: center; gap: 16; flex-wrap: wrap`, padding 10×14, 1px `border-primary`, radius 12, background `surface-page`. Wraps automatically on narrow viewports — no manual second row.

Anatomy (left → right):

1. **Tier multi-toggle** — pill group, one pill per tier (S A B C D), all in **Urbanist** (no mono in the bar). Each pill: sans 12 / 600, padding 5×11, radius 9999, 1px `border-primary` at rest, `surface-page` bg, `text-secondary` fg. Pill content is the literal label `Tier {S/A/B/C/D}` followed by an integer count of bundle slots filled in that tier (sans 12 / 500 / `text-tertiary`). Hover: border → `border-tertiary`, fg → `text-primary`. Selected: border + bg flip to `score-*-bg`, fg flips to `score-*` foreground; the count goes to `currentColor` at 0.7 opacity. Carried as `aria-pressed` on a `<button>`. **Multi-select** — clicking adds to the tier filter set; clicking again removes. The §Chip family Tier chip and this pill share palette but are different roles: Tier chip is a static label, this pill is an interactive toggle.
2. **Hairline divider** — 1px × 24px column in `border-primary`, `align-self: center`, separates the categorical multi-toggle from the numeric thresholds.
3. **Numeric threshold dropdowns** — `Cites`, `Family`, `Filed` group. Each is a §Select trigger (32-height variant) wired to a preset list:
   - **Cites** — `Any` / `10 +` / `25 +` / `50 +` (filters to patents with citations ≥ N)
   - **Family** — `Any` / `3 +` / `5 +` / `10 +` (filters to patents with family size ≥ N)
   - **Filed** — `Any time` / `Last 2 yrs` / `Last 5 yrs` / `Last 10 yrs` (filters to patents filed in the last N years)

   Presets, not free numeric input — buyers don't need to scan ranges, they need to slice by "strong / mid / weak" thresholds at scan speed.
4. **Spacer** — `flex: 1` to push the tail right.
5. **Sort + Clear + count tail** — `Sort` (§Select trigger, 32-height, anchor-right menu, options: `By tier (S → D)` / `By citations` / `By family size` / `By filing date`); `Clear` (small ghost text button, sans 12 / 500 / `text-tertiary` at rest, hover lifts to `text-primary` + `surface-tertiary` bg, **stays in place when no filters active** — opacity drops via `disabled`, but the button never collapses out of the row); count display `N / N shown` in **Urbanist** sans 12 / 500 / `text-tertiary`.

**All text in Urbanist.** No mono inside the bar — counts on the pills, the count tail, and dropdown labels are all sans. Mono is reserved for tabular data inside cards and the §Patent detail Sheet KV mosaic; the filter bar is chrome and reads as a single typeface.

Group labels ahead of each control are sans 11 / 600 / +0.20em / uppercase / `text-tertiary` (matches the `eyebrow` register), padding-right 4. Read aloud, the bar parses as: `Tier [S A B C D] · Cites [...] · Family [...] · Filed [...] · Sort [...] · Clear · 3 / 3 shown`.

Pairs with §Patent card grid (the surface this controls) and §Select (the dropdown primitive). Don't combine with §Search bar inline filters on the same surface — pick one entry point per surface.

---

## Pagination

Previous / next row with either numbered pages or a page-of-total indicator.

- **Consumes:** `surface-page`, `surface-tertiary`, `surface-inverse`, `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`, `text-inverse`
- **Surfaces:** Patent Intelligence SaaS · Licensing Platform · website
- **Variants:** numbered (default, page sets up to ~20); compact ("Page X of Y", for larger sets or space-constrained)
- **States:** default, hover, current (numbered only), disabled

Row: `display: flex`, `align-items: center`, gap 4.

**Numbered** — `Previous` ghost button (`chevron-left` `icon-sm` + "Previous" in `button-12 / text-primary`; padding 8×12; radius 8; hover `surface-tertiary`). Number buttons: 36×36 min, radius 6, `copy-mono-13 / text-secondary`, hover `surface-tertiary`. Current: background `surface-inverse`, fg `text-inverse`. Gap markers: `…` in `text-tertiary`, width 36, non-interactive. `Next` ghost button mirrors Previous.

**Compact** — `Previous` ghost + `Page 3 of 42` in `copy-mono-13 / text-secondary` (padding 0 12) + `Next` ghost.

Disabled (at first / last page): opacity 0.4, cursor `not-allowed`.

Keyboard: Tab between controls; Enter or Space activate.

---

## Wizard step bar

Connected horizontal track for multi-step flows — the "where am I in the sequence" primitive used by the Licensing Platform's purchase wizard (Pick → Path → Details → Recommendation → Checkout → Issue). Six numbered circles connected by a 2px rail, each with its label below. Done circles are filled with a check; the active circle is a hollow ring with the step number; future circles are hollow outlines. Replaces an earlier single-pill stepper (rounded capsule with the active step on `surface-tertiary`) — the pill's filled active background read as "these steps are all current" when scanned at speed, while the connected track's filled-rail pattern reads "you've completed these steps, you're working on this one." Canonical reference: [`brand/previews/bundle-page-preview.html`](./previews/bundle-page-preview.html).

- **Consumes:** `surface-page`, `surface-inverse`, `border-primary`, `border-tertiary`, `text-primary`, `text-tertiary`, `text-inverse`
- **Surfaces:** Licensing Platform (purchase wizard, all six steps)
- **Variants:** default (six steps, full labels); collapses to first-letter labels at narrow viewports if needed
- **States:** done (past, completed) · active (current) · upcoming (not yet reached)

Container: 1px `border-primary`, radius 12, background `surface-page`, padding 20×16 (top) / 16 (bottom), `display: flex; align-items: flex-start`. No outer gap; the connecting rail is drawn between adjacent circles by each step's `::after` pseudo, vertically centered on the circle row.

Each step: `flex: 1`, column-stack of circle + label, `gap: 10`, `align-items: center`. The connecting rail (per non-last step's `::after`) is a 2px line running from the right edge of the current step's circle to the left edge of the next step's circle (`top: 13`, `left: calc(50% + 16px)`, `right: calc(-50% + 16px)`); colored `border-primary` by default, `surface-inverse` when the step is `.done` (solid filled segment marking completed legs of the path).

Circle: 28×28, `border-radius: 50%`, 2px `border-tertiary`, background `surface-page`. Glyph register is mono 11 / 600 in `text-tertiary`. Done: background + border `surface-inverse`, glyph swaps to a 14×14 check icon in `text-inverse`. Active: border → `surface-inverse`, glyph stays as the step number but flips to `text-primary` — the circle reads as a hollow ring (the step is "in progress, not yet checked off"). Upcoming: unchanged from default.

Label (under each circle): sans 12 / 500 / line-height 1.3 / center-aligned / `text-tertiary` at rest. `.done` and `.active` flip the label to `text-primary`; `.active` adds weight 600 to mark the user's current location. Labels carry the full step name (`Pick bundle`, `Choose path`, `Details`, `Recommendation`, `Checkout`, `Issue`) — abbreviations are reserved for the inline navigation primitives (§Tabs, §Breadcrumb), not the wizard.

The wizard bar is the first element on the page above the H1 — page heading should not duplicate "Step X of N" since the bar already visualizes that. The H1 names the step semantically (`Pick a bundle`, `Your 30-patent bundle.`).

Pairs with the broader purchase wizard surface — see [`brand/previews/licensing-flow-preview.html`](./previews/licensing-flow-preview.html). Not used outside the multi-step purchase flow; in-product navigation uses §Tabs and §Breadcrumb.

---

## Accordion

Hairline-separated rows; 24px vertical padding; cross toggle collapses to "−" on open.

- **Consumes:** `border-primary`, `text-primary`, `text-secondary`
- **Surfaces:** website (FAQ, long-form pages); Patent Intelligence SaaS (report sections, method disclosures)
- **Variants:** single-open (optional, not enforced)
- **States:** collapsed, open

Summary `heading-18` (18 / 600 / −0.01em / `text-primary`). Toggle icon 24×24 cross — two 1px rules × 14px, built as `::before` (horizontal) and `::after` (vertical) on a `.mark` element, both on `background: text-primary`. On open, the vertical rule rotates 90° and fades to opacity 0 over `medium (250ms) emphasized`. Body `copy-15` (15 / 400 / 1.6 / `text-secondary`), 16px top padding. Rows expand via `grid-template-rows: 0fr → 1fr` over `medium emphasized`.

---

## Modal

Overlay with backdrop blur + centered dialog; close button top-right. Four size variants; optional header + footer zones; focus trap on open.

- **Consumes:** `surface-page`, `surface-tertiary`, `border-primary`, `text-primary`, `text-secondary`, shadow `high`, `rgba(0,0,0,0.4)` overlay
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** `sm` 400 / `md` 480 (default) / `lg` 640 / `xl` 800; with / without header; with / without footer; responsive `calc(100% - 40px)` below `sm`
- **States:** entering (opacity 0→1 + translateY 8px→0 over 150ms emphasized), open, exiting (100ms linear)

Overlay `rgba(0,0,0,0.4)` + `backdrop-filter: blur(4px)`, z-index 700, fade 150ms linear. Dialog: background `surface-page`, radius 16, shadow `high`, width per variant (400 / 480 / 640 / 800), max-height `calc(100vh - 80px)`, body scrolls internally when content overflows.

**Zones** — all optional; a default dialog carries just a body.

- **Header** — padding `20 24 16 24`, 1px bottom `border-primary`. Title `heading-20 / text-primary`; optional subtitle `copy-14 / text-secondary`, margin-top 4.
- **Body** — padding 24 when header or footer is present; padding 32 when standalone. Content inherits `copy-14 / text-primary`.
- **Footer** — padding `16 24`, 1px top `border-primary`; flex row, `justify-content: flex-end`, gap 12. Button order: secondary (ghost) left of the cluster, primary right.

Close button: 32×32, radius 6, top 16 right 16, transparent background, `icon-md` `x` in `text-secondary`, hover background `surface-tertiary`. Present on every modal unless blocking (see Confirm dialog). Always dismissable via overlay click or Escape for non-blocking modals.

Focus trap: on open, focus moves to the first focusable element inside the dialog (or the dialog container if none). Tab cycles within the dialog; Shift+Tab cycles backward; Escape closes and returns focus to the trigger element.

Motion respects `prefers-reduced-motion: reduce` — no translate; opacity only.

---

## Confirm dialog

Modal variant for destructive or consequential actions. Blocks interaction with the underlying page until the user picks.

- **Consumes:** Modal tokens; status pairing fg from [`design-tokens.md`](./design-tokens.md) §2 for destructive variant accent
- **Surfaces:** website · Patent Intelligence SaaS · Licensing Platform
- **Variants:** default / destructive
- **States:** entering, open, exiting, action-pending

Uses Modal `sm` (400). No close-X button in the header — user must choose an action.

Structure:
- **Header** — optional status icon (`icon-md`): `alert-triangle` in `danger-fg` for destructive; `info` in `info-fg` for default. Title `heading-20 / text-primary` follows.
- **Body** — 1–2 sentences, `copy-14 / text-secondary`, explaining consequences. Never fluff; never hype. Per [`brand-voice.md`](./brand-voice.md) §3.
- **Footer** — ghost "Cancel" on the left of the cluster; primary action on the right. **Destructive variant** replaces the primary button background with `danger-fg` and keeps `text-inverse` white.

Action-pending state: primary button shows a small inline spinner and disables both buttons until the operation resolves.

Escape and overlay click default to Cancel unless the dialog is explicitly blocking (e.g. required confirmation step in a paid flow).

---

## Sheet

Slide-in side panel from the right, used for detail views that should not block the page.

- **Consumes:** `surface-page`, `surface-tertiary`, `border-primary`, `text-primary`, `text-secondary`, shadow `medium`, `rgba(0,0,0,0.4)` overlay
- **Surfaces:** Patent Intelligence SaaS (patent detail, filter sidebar on tablet+) · Licensing Platform (license detail, bundle detail where routing is overkill)
- **Variants:** `sm` 400 / `md` 560 / `lg` 720; with overlay (default) / pinned (no overlay, content remains interactive)
- **States:** hidden, entering, open, exiting

Overlay (default variant): `rgba(0,0,0,0.4)` + `backdrop-filter: blur(4px)`, z-index 500, fade 150ms linear.

Sheet: background `surface-page`, width per variant, position fixed right 0 top 0 bottom 0, shadow `medium`, 1px left `border-primary`, z-index 700. Enter: `translateX(100% → 0)` over 250ms emphasized + overlay fade. Exit: 150ms linear, reverse.

Structure — same zones as Modal:
- **Header** — height 64, padding `0 24`, 1px bottom `border-primary`, flex row. Title `heading-20 / text-primary` left; close button (`icon-md` `x`, 32×32, radius 6, hover `surface-tertiary`) right.
- **Body** — padding 24, scrolls internally.
- **Footer** — optional, padding `16 24`, 1px top `border-primary`, flex row, `justify-content: flex-end`, gap 12.

Close: overlay click (default variant only), Escape, or close button. Focus trap identical to Modal.

Choose a Sheet over a Modal when content is long-scrolling, when the user needs to reference the underlying page, or when the entity has its own URL and the sheet can deep-link.

---

## IP intelligence drop popup

Marketing-site lead-capture overlay. Hybrid newsletter signup + soft self-segmentation: captures email (required) plus optional Role + Industry so subscribers self-segment without the friction of a demo gate. Trigger candidates: 50% scroll on home or pillar pages, 45-second time-on-site, or exit-intent — rate-limited to once per visitor per 30 days.

- **Consumes:** `surface-page`, `surface-secondary`, `surface-tertiary`, `surface-inverse`, `border-primary`, `border-tertiary`, `text-primary`, `text-secondary`, `text-tertiary`, `text-quaternary`, `text-inverse`, `success-bg`, `success-fg`, shadow `high`; the overlay backdrop is `rgba(0,0,0,0.55)` + `backdrop-filter: blur(4px)`. Form fields use §Input and §Select (the brand dropdown, not the native `<select>`)
- **Surfaces:** marketing website (home, pillar pages)
- **Variants:** **F** top hero band (image above editorial, ~520px wide) · **G** side panel (image left 240px, form right ~480px, ~720px wide)
- **States:** entering · open · exiting · success (post-submit confirmation card)

Both variants share a single card primitive (`mkt-card`, radius 20, shadow `high`, background `surface-page`, `overflow: hidden`) and the same form atoms; they differ only in image placement.

**Variant F · top hero band.** `mkt-card.with-hero`, max-width 520. The image (`mkt-img`, height 160, `border-radius: 0` so it spans the rounded card top edge under `overflow: hidden`) sits at the top of the card. Below: `mkt-band` (padding 32×32×0) with the headline at sans 22 / 600 / line-height 1.25 / `text-primary` and a one-line subhead at sans 14 / 400 / `text-secondary`. **No eyebrow line above the headline** — the hero image carries the marketing register, the headline is the editorial hook.

**Variant G · side panel.** `mkt-card.split`, max-width 720, `display: grid; grid-template-columns: 240px 1fr`. The left column is the `mkt-img` (`min-height: 100%`); the right column is `mkt-main` carrying the band + form + foot stack as `flex-direction: column`. Padding values shift to 28×28×0 / 20×28×8 / 16×28×24 to match the narrower form column. No eyebrow line, same as F.

**Form (shared).** Inside `mkt-body` (padding 24×32×8 on F; 20×28×8 on G), the form is a `flex-direction: column; gap: 14` stack of three rows:

1. A `field-row.cols-2` (`display: grid; grid-template-columns: 1fr 1fr; gap: 12`) carrying **Role** (optional) and **Industry** (optional) side-by-side, each rendered as a §Select using the brand dropdown — custom trigger + styled menu, **not** the native `<select>` (per §Select).
2. A single **Work email** input, required (per §Input box variant).

Role and Industry are NOT wrapped in a tinted band — they sit in the flat form area between the headline and the email. Optional flags read `Role · optional` with the `· optional` set in `text-quaternary` / weight 500 / non-uppercase to keep the label clean.

**Foot.** `mkt-foot` (padding 16×32×24 on F; 16×28×24 on G) carries the primary `Get the next brief` button — full-width §Button primary with `btn-block` — and a fine-print line beneath it: mono 11 / `text-tertiary` / line-height 1.5 / +0.02em, with the privacy link in `text-secondary` underline.

**Close.** `mkt-close` button at top:14 right:14 — 32×32 hit area, radius 8, `text-tertiary` color; hovers to `surface-tertiary` / `text-primary`. On the F variant the close button gets a translucent white backdrop (`rgba(255,255,255,0.85)`) so it stays legible over the dark hero image.

**Image content.** Until real assets ship, the `mkt-img` is a CSS-only patent-grid placeholder — `surface-inverse` (n10) anchor with a `radial-gradient` dot grid at 14×14 and a soft inverse-tint overlay (`linear-gradient(180deg, transparent 30%, rgba(37,37,37,0.55))` on F's top-hero; diagonal `linear-gradient(135deg, transparent 40%, rgba(37,37,37,0.65))` on G's side panel). Swap to a real image when the asset is ready — keep `overflow: hidden` on the card so the image inherits the rounded corners.

**Success state.** On submit, the card content is replaced by a centered success block: 56×56 seal with background `success-bg` / color `success-fg` carrying a check glyph; sans 20 / 600 headline (`You're on the list.`); sans 14 / `text-secondary` body line with `max-width: 340`. The variant's layout-modifying classes (`split` / `with-hero`) are dropped on submit so the success state always renders in the standard centered form regardless of source variant.

**Motion.** Overlay fade-in 150ms linear; card enter 250ms emphasized, `translateY(12px → 0)` + `scale(0.98 → 1)` + opacity 0 → 1; close drops the overlay with the inverse 150ms exit. Honors the global reduced-motion rule.

**Dismissal.** Overlay click outside the card, Escape, or the close-X. The success state retains a close-X that dismisses normally.

Pairs with §Footer (the marketing-site newsletter signup is the permanent always-on peer of this rate-limited overlay) and §Select (the canonical dropdown applied to Role + Industry).

---

## Pillar

Centered hero region for a product pillar — eyebrow with live signal-dot, large display title, optional gradient-text run, sub-line, action row, and a meta strip below the actions. Marketing-surface only.

- **Consumes:** `text-primary`, `text-secondary`, `text-tertiary`, `signal-active`
- **Surfaces:** website (homepage hero, products section)
- **Variants:** default; `pillar-meta-juris` (markets sub-stat with "N markets · US TW EU JP KR" two-row variant)
- **States:** rest

Layout `flex column; align-items: center; gap: 28px; max-width: 760px; text-align: center`. Title `clamp(36, 5vw, 60)px / 700 / -0.03em / 1.1` (line-height loosened from `none 1.0` so descenders clear under `background-clip: text`). Sub `clamp(18, 1.6vw, 22)px / 400 / 1.45 text-secondary, max-width: 56ch`. Eyebrow `Inconsolata 12 / 500 / +0.10em / uppercase / text-tertiary`, leading 8×8 dot in `signal-active` with the canonical 2s pulse keyframe. Meta strip `Inconsolata 12 / 500 / +0.10em / uppercase / text-tertiary`, `display: flex; gap: 24px; justify-content: center`; per-stat strong line `Urbanist 18 / 600 / -0.01em / text-primary` block above the label.

Pairs with the §Top nav (header) and §Footer; the homepage hero and the Products tab-switched panels are the canonical surfaces.

---

## Deliverable card

"What you get" grid card on marketing pages — 4-up grid of icon + title + body that lists tangible artifacts the buyer receives.

- **Consumes:** `surface-secondary`, `border-primary`, `border-secondary`, `text-primary`, `text-secondary`
- **Surfaces:** website (Products → Licensing & SaaS pillars)
- **Variants:** default
- **States:** rest, hover (border lifts to `border-secondary`, icon `scale(1.10)`)

Grid: `grid-template-columns: repeat(4, 1fr); gap: 24px`; collapses to 2-up at `max-width: 1100px`, 1-up at `640px`. Card: `surface-secondary`, 1px `border-primary` hairline, radius 16, padding 32, `flex column; gap: 20px`. Icon block 48×48 housing a 28×28 stroked Lucide glyph (`stroke-width: 1.5; currentColor`), color `text-primary`. Title `Urbanist 20 / 700 / -0.01em / 1.3 text-primary`. Body `14 / 1.55 text-secondary`. Border + icon transition over `medium (250ms) emphasized`.

---

## How it works

Two-column section pairing a left visual (placeholder until imagery lands) with a right accordion that walks through the process steps.

- **Consumes:** `surface-secondary`, `surface-tertiary`, `surface-quaternary`, `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`
- **Surfaces:** website (Products → Licensing & SaaS pillars)
- **Variants:** default
- **States:** rest

Section heading `clamp(32, 4vw, 48)px / 700 / -0.02em / 1.1`, margin-bottom 64. Grid `grid-template-columns: 1fr 1fr; gap: 64px; align-items: start`; collapses to 1-up at `max-width: 980px`. Visual panel `aspect-ratio: 16/11`, radius 16, 1px `border-primary`, monochrome placeholder layered radials over `surface-secondary` (deduped utility — see §Image frame imagery placeholders). Right column composes §Accordion items keyed to numbered steps.

---

## Search modal

Top-anchored full-page search overlay invoked by the nav search trigger. Placeholder until search index lands — wire when content is indexed.

- **Consumes:** `surface-page`, `surface-tertiary`, `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`, `shadow-high`
- **Surfaces:** website (global, triggered from §Top nav)
- **Variants:** default
- **States:** closed (hidden), open (`data-open="true"`)

Backdrop `.search-overlay`: `position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 800`; opacity 0 → 1 in 150ms linear on open. Modal `.search-modal`: `position: fixed; top: 96px; left: 50%; transform: translate(-50%, -8px) → translate(-50%, 0)`, `width: min(560px, calc(100vw - 32px))`, `surface-page`, 1px `border-primary`, radius 16, `shadow-high`, `z-index: 900`, `overflow: hidden`. Open transition `opacity 150ms` + `transform 150ms` `cubic-bezier(0.2,1,0.3,1)`. Composition: `.search-input-row` (16-padding, hairline-bottom, 18×18 stroked search glyph + transparent input + Esc keycap chip in `surface-tertiary`) above `.search-results` (12 8 padding, `max-height: min(50vh, 480px)`, scrollable; section labels in `Inconsolata 11 / +0.10em / uppercase`; result rows 10 12 padding, radius 8, hover `surface-tertiary`).

---

## Footer

Off-white `surface-secondary` background with a 1px top hairline. Three-region grid that anchors a newsletter-signup-plus-co-branded identity block on the left, a stack of link columns in the middle, and a single contact column on the right.

- **Consumes:** `surface-page`, `surface-secondary`, `surface-tertiary`, `surface-quaternary`, `border-primary`, `border-tertiary`, `border-focus`, `text-primary`, `text-secondary`, `text-tertiary`, `success-bg`, `success-fg`
- **Surfaces:** website only (Patent Intelligence SaaS and Licensing Platform use in-product chrome, not a marketing footer)
- **Variants:** default
- **States:** link states inherit from §Link; newsletter form has default + success states (in-place, no toast)

Container `padding-block: 64px`; inner row inherits the page container (`max-width: 1440`, `padding-inline: 32` / 20 below `md`). Grid `grid-template-columns: 1.5fr 2fr 1fr; gap: 48px`.

**Region 1 — Identity block (left, 1.5fr).** Stacked, top to bottom: newsletter signup → TIS|Innovue lockup → copyright.

**Newsletter signup** (above the lockup, `margin-bottom: 24px`).

- **Label** — `label-mono-12` in `text-tertiary`, `margin-bottom: 12px`. Marketing copy: `Get Our Latest News` (CH: `獲取最新消息`).
- **Form** — single-row inline-arrow construction: a 100% width / 340px max-width container with the email input filling the row and the submit button absolutely positioned 6px from the right inside it.
  - **Input** — height 44, padding `0 48px 0 14px` (right padding clears the inset button), `surface-page` fill, 1px `border-primary` border, radius 10, `copy-14` text in `text-primary`. Placeholder `Your Email` (CH: `您的電子郵件`) in `text-tertiary`. Focus: `border-color: border-focus`.
  - **Button** — 32×32, radius 8, `surface-tertiary` fill, hover `surface-quaternary`, active `transform: scale(0.95)`, `aria-label: Subscribe`. Carries two icons (`arrow-right` / `check`); only the arrow renders by default.
- **Success state** — submit on a valid email flips the block to `.is-success` for 1.6s, then auto-resets. In-place affordance, no toast: label colour → `success-fg`; input border → `success-fg`; button background → `success-bg` and color → `success-fg`; button icon swaps from arrow to check; success-state label copy: `Thanks — you're subscribed` (CH: `感謝訂閱`). The whole transition is `dur-base linear` (CSS-driven; no JS animation timing).

**Co-branded lockup.** TIS|Innovue per [`visual-guide.md`](./visual-guide.md) §Co-Branded Lockup, sized for footer prominence:

- **TIS submark** 32×32, sourced from `--logo-submark` (light/dark variant)
- **Hairline divider** 1px × 32px, `border-tertiary`, with 24px clear space each side
- **Innovue logo** rendered in **full color** (`Innovue_Logo_Blue.svg` on light; `Innovue_Logo_Light.svg` filtered `brightness(1.6)` on dark), in a **103×36 box** — *not* the partner-strip grayscale treatment; this is the anchored "Powered by Innovue" credit. The 36px height is the footer-variant over-weight (vs the 32px submark); the 103px width follows from the SVG's natural aspect (300:105) — i.e. **the box hugs the glyphs**, no internal whitespace. This is what makes the *visual* clear-space from the divider to the Innovue glyphs read ≈24px, matching the 24px clear-space from the submark to the divider on the other side: TIS submark and Innovue glyphs sit equidistant from the hairline. **Do not** size the Innovue box wider than its natural rendered width (e.g. 172×36) — any extra width pushes the glyphs visually rightward by the SVG's centered offset (≈34.5px on each side at 172) and breaks the equidistant-from-divider rhythm.
- **Copyright** 24px below the lockup: `© YYYY Talent Intelligence Strategies` in `label-mono-12` (Inconsolata 12 / 500 / +0.10em / uppercase / `text-tertiary`)

> **Footer-variant override on Innovue size.** [`visual-guide.md`](./visual-guide.md) §Spacing Rules calls for Innovue to optically balance with the TIS Submark. The footer over-weights Innovue (36px vs the 32px submark) deliberately — this is the surface where attribution is most load-bearing, not just present. Track the override against §Spacing Rules.

**Region 2 — Link columns (center, 2fr).** Three sub-columns: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px`. Each sub-column:

- **Header** — `label-mono-12` in `text-tertiary`, `margin-bottom: 16`
- **List** — `display: flex; flex-direction: column; gap: 10px`, `list-style: none`, padding 0
- **Items** — `copy-14` (Urbanist 14 / 400 / `text-secondary`), hover → `text-primary` over 100ms linear, no underline

Canonical headers for the marketing surface: `Products` · `Company` · `Legal`. Items match the surface's information architecture.

**Region 3 — Contact column (right, 1fr).** Header in `label-mono-12` (matches link-column headers); items in `copy-14` (matches link-column items). Typical entries: email mailto, location, primary social link.

**Responsive.** At `lg` (980): grid collapses to `grid-template-columns: 1fr 1fr` — the link-columns block stays internally 3-up (the inner sub-grid drops to 2-up only at `sm` 640). At `sm` (640): outer grid collapses to `grid-template-columns: 1fr; gap: 32px`; the link-columns inner sub-grid drops to `repeat(2, 1fr)`.

Per [`visual-guide.md`](./visual-guide.md) §First Touchpoint Rule, the footer co-branded lockup *is* the "Powered by Innovue" attribution on surfaces where the top nav uses submark only — no separate credit strip needed.

---

## Partner strip

Row of partner marks — Innovue, ITRI, III — rendered monochrome, returning to own brand color on hover. Innovue renders first to anchor the bound-partner status; ITRI and III follow as collaborators (per [`visual-guide.md`](./visual-guide.md) §Collaborator Partners).

- **Consumes:** `surface-page`, `border-primary`
- **Surfaces:** website homepage (always); Licensing Platform pages (when a partner is the IP source)
- **Variants:** default
- **States:** rest (grayscale, 55% opacity), hover (full color, 100% opacity)

Container `surface-page`, border `1px solid border-primary`, radius 16, padding 48 × 32. Layout `display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 48px`. Each item is a fixed `200×40` box; image `max-height: 40px; max-width: 200px; width: auto`. Rest `filter: grayscale(1); opacity: 0.55`; hover `filter: none; opacity: 1`. Transition: `filter` + `opacity` over `medium (250ms) emphasized`; `opacity` fades linear.

Per [`visual-guide.md`](./visual-guide.md) Collaborator Partners: ITRI, III, and Innovue render at **equal height** on this row — peers, not a hierarchy.

---

## Innovue collaboration card

Single-row credit card introducing the Innovue partnership. Two columns separated by a vertical hairline: tight "Powered by" eyebrow + Innovue logo lockup on the left, introduction sentence on the right rendered with the silver text gradient (TIS-overall theme per [`visual-guide.md`](./visual-guide.md) §Imagery → Gradient architecture). Sibling to §Partner strip — shares the same container shell (`surface-page`, 1px `border-primary`, radius 16, padding 48 × 32) but carries different content: §Partner strip is the multi-mark peer row; this card is the Innovue-specific introduction. Both can coexist on the same surface — partner strip up top as the row of collaborators, this card below as the dedicated Innovue credit.

- **Consumes:** `surface-page`, `border-primary`, `text-secondary`, `--gradient-text-silver-solid` (light) / `--gradient-text-silver-luminous` (dark) per [`design-tokens.md`](./design-tokens.md) §7.5
- **Surfaces:** website homepage (Innovue partnership section); first-touch surfaces requiring Innovue credit per [`brand-voice.md`](./brand-voice.md) §7
- **Variants:** default
- **States:** rest only

Container `surface-page`, `1px solid border-primary`, radius 16, padding `48 × 32`. Layout `display: flex; align-items: center; gap: 40px`. Three children: lockup, vertical divider, body copy.

**Lockup.** Flex column, `align-items: flex-start`, `gap: 0`, `flex-shrink: 0`. Eyebrow `<span>` "Powered by" — Urbanist `14 / 400 / 0`, `text-secondary`, `line-height: 1`, `margin-left: -1px` (so the lowercase "P" stem sits flush with the leftmost edge of the Innovue glyphs below), `margin-bottom: -2px` (closes the visual gap to the logo). Innovue `<img>` at `height: 48px`, source `Innovue_Logo_Blue_eng.svg`; `[data-theme="dark"]` applies `filter: brightness(1.6)` per the §Footer Innovue treatment rule (full-color blue mark, brightened in dark mode — never inverted to grayscale here, distinct from the legacy partner-strip treatment).

**Divider.** 1px `border-primary`, `align-self: stretch` — fills the full padded card height.

**Body copy.** `flex: 1; min-width: 0`. Single `<p>`: Urbanist `20 / 500 / -0.005em / 1.45`. Silver text gradient via `background: var(--gradient-text-silver-solid); background-clip: text; -webkit-background-clip: text; color: transparent; -webkit-text-fill-color: transparent` (light); `--gradient-text-silver-luminous` on `[data-theme="dark"]`. Line-height 1.45 (loosened from 1.0) so descenders clear under `background-clip: text`.

**Canonical copy.** "Innovue is an intellectual property company that maintains the world's 3rd-largest patent index — a proprietary, continuously refreshed archive of global patent activity." The "3rd-largest" anchor is load-bearing per [`brand-voice.md`](./brand-voice.md) §5 — do not paraphrase.

**Centering note.** Lockup is geometrically centered with the divider midpoint (60px stack — 14px eyebrow − 2px overlap + 48px logo — centered against the v-rule's stretch). Visually, because the eyebrow is light and the logo heavy, the logo glyphs sit ~6px below the divider midpoint. An optical-centering variant — `transform: translateY(-6px)` on the lockup — lands the logo center on the divider with the eyebrow floating above. Both versions referenced in [`archive/previews/partner-strip-preview.html`](./archive/previews/partner-strip-preview.html); geometric centering is the default unless a consumer surface decides otherwise.

**Responsive.** At ≤760px: layout collapses to `flex-direction: column; align-items: flex-start; gap: 32px`; vertical divider hides.

---

## Seal · Standalone

Round seal — TIS's translation of LEED-style certification badges. Thin outer ring, 1px white gap, filled disc, smaller white inner disc holding the issuer or partner submark; curved sans text on top and bottom arcs carries the issuer line and the per-seal credential count. Atomic: each seal stands alone or composes inside the §Verified License Badge pill.

- **Consumes:** `surface-inverse` (TIS disc), `surface-page` (inner disc), `text-inverse` (curved text), `border-primary`, `--logo-submark` (TIS) plus partner submark URLs (NYCU / ITRI / III). The TIS variant pins these four tokens to light values via `.is-tis` so the issuer mark stays dark-on-white in dark mode (LEED / UL precedent — credential marks must not invert with theme).
- **Surfaces:** Licensing Platform (issuance, packaging, exhibition) · website (Credentials section) · Patent Intelligence SaaS (verification page)
- **Variants:** issuer (TIS) · partner (NYCU · ITRI · III, brand color as disc fill); standalone 176×176 · ×0.65 (114×114, the embeddable size used inside the Verified License Badge pill)
- **States:** default (no hover or interactive states — credential mark, not a control)

**Construction (200×200 viewBox, scaled to render size):**
- Outer thin ring at `r=98`, `stroke-width: 1.25`, `vector-effect: non-scaling-stroke`
- Filled disc at `r=92`
- Inner white disc at `r=48`
- Top-arc text on path `M 45,146 A 72,72 0 1,1 155,146`, `text-anchor: middle`, `startOffset: 50%`
- Bottom-arc text on path `M 24,100 A 76,76 0 0,0 176,100`, `text-anchor: middle`, `startOffset: 50%`
- Submark centered on inner disc via flex on the seal container; sized per the partner table below

**Partner colour map:**

| Partner | Disc fill | Submark file | Submark size (standalone / ×0.65) | Bottom-arc content |
|---|---|---|---|---|
| TIS | `surface-inverse` (#252525, light-locked) | per `--logo-submark` (light-locked to dark-cube file) | 50 / 33 | `LIC-NNNNN` |
| NYCU | `#0033A0` | `partners/nycu/nycu_seal.svg` | 50 / 33 | `N PATENTS` |
| ITRI | `#00AAEA` | `partners/itri/itrilogo_submark.svg` | 40 / 26 | `N PATENTS` |
| III | `#14156D` | `partners/iii/logo_iii_submark.svg` | 50 / 33 | `N PATENTS` |

ITRI's box runs smaller than its peers because its wordmark fills its own viewBox edge-to-edge; the other partners' submarks carry built-in padding or radial decoration, so the larger 50 / 33 box keeps the visible glyph at parity. Top-arc strings are standardized per [`visual-guide.md`](./visual-guide.md) §Verified License Badge — never inline literal arc text here.

**×0.65 variant** — every dimension multiplied by 0.65: disc 114×114, submarks per the table, font-size 13. Keeps the curved text legible while shrinking the seal for embedding. This is the size used inside §Verified License Badge.

---

## Verified License Badge

Stadium-shaped credential pill that wraps the issuer seal, three licensee seals, and a verification QR — TIS's CE / UL analog for IP. Emitted by the Licensing Platform on issuance; embeddable on customer surfaces (product pages, packaging, exhibition materials). The pill is **light-locked**: it does not invert in dark mode. The credential is meant to read as a stamped artifact on whatever surface it lands on, never as themed UI.

- **Consumes:** `surface-tertiary` (pill body), `border-primary`, `border-tertiary` (internal dividers), `text-secondary` (LIC text), `text-primary` (QR pattern); composes §Seal · Standalone (×0.65)
- **Surfaces:** Licensing Platform (primary issuance) · embedded across customer surfaces · website (Credentials section)
- **Variants:** combined (issuer + 1–N licensee seals + QR — current canonical shape)
- **States:** active (expired-state visual treatment deferred — see [`design-tokens.md`](./design-tokens.md) §6)

**Container.** Full stadium pill (`border-radius: 999px`), `background: surface-tertiary` (tinted), 1px `border-primary` hairline, soft elevation: `box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)`. Padding `18px 24px`, gap `14px`. Width hugs content (`width: max-content`); the parent row must apply `align-self: flex-start` to prevent flex stretch from blowing the pill out to the column max-width and stranding the QR mid-pill.

**Light-lock construction.** The pill scopes the eight tokens it relies on to light-mode values via local CSS-variable overrides on `.seal-pill`: `--surface-page`, `--surface-tertiary`, `--surface-inverse`, `--text-primary`, `--text-secondary`, `--text-inverse`, `--border-primary`, `--border-tertiary`, plus `--logo-submark` pinned to the dark cube file. Children inherit through the cascade — the issuer seal stays dark-disc / dark-cube-submark, the chassis stays tinted, the QR pattern reads dark-on-light, regardless of `[data-theme]`. The TIS seal's `.is-tis` modifier carries the same lock at the seal level for standalone use outside the pill.

**Layout (left → right):**
1. Issuer seal — TIS at ×0.65
2. Vertical divider — 1px × 80px, `border-tertiary` at 70% opacity
3. Licensee seals — N × ×0.65 (NYCU, ITRI, III in canonical issuance-ledger order)
4. Vertical divider
5. Credential stack — 72×72 QR (1px `border-primary`, radius 8) above mono `LIC-NNNNN` (`label-mono-11 / text-secondary`)

**Curved-text contract.** Each seal's top arc carries its standardized identifier per [`visual-guide.md`](./visual-guide.md) §Verified License Badge — TIS issuer reads `TIS ISSUED VERIFIED LICENSE`; licensee seals read the partner's full registered name from that file's top-arc table (NYCU / ITRI / III strings, uppercase, never the acronym). Bottom arc carries the per-seal credential count. The TIS seal's bottom-arc `LIC-NNNNN` must match the credential stack's `lic-no` literal — the same identifier rendered in two registers (curved on the seal, mono below the QR). If they drift, treat it as a defect.

**Anti-counterfeit** (server-side, not a visual spec): invisible watermark embedded at generation; QR resolves to the TIS verification page.

> **TODO (pending PRD):** **expired-state visual treatment** (greyscale? overlay stamp? replacement label? — deferred in [`design-tokens.md`](./design-tokens.md) §6, ship-blocker because licenses will expire). **Digital embed snippet** — the script tag / iframe / PNG-with-link pattern customers paste onto their own sites to render a live badge.

---

## Carousel

Horizontal slideshow with a native scroll-snap track, optional arrow controls, and thin line-segment indicators below. Carries Image frames, Content cards, or any slide-shaped child; the carousel itself is layout, not chrome.

- **Consumes:** `surface-translucent`, `border-focus`, `text-primary`, `text-secondary`, `text-quaternary`
- **Surfaces:** website (press, reports, hero figure sets) · Patent Intelligence SaaS (figure galleries on patent detail) · Licensing Platform (bundle / license detail figure sets)
- **Variants:** single-track (default); auto-advance (optional, pauses on hover / focus-within)
- **States:** slide default, transitioning; indicator default / active / hover / focus; arrow default / hover / disabled-at-bounds

Track: `display: flex`, `scroll-snap-type: x mandatory`, `overflow-x: auto`, gap 16, scrollbar hidden on desktop (`scrollbar-width: none`). Slides: `scroll-snap-align: start`, `flex: 0 0 100%` by default (multi-up galleries declare an explicit width). Programmatic advance uses `scrollLeft` over `medium (250ms) emphasized`.

**Arrows** (optional, `md` breakpoint and above) — `chevron-left` / `chevron-right` as 32×32 ghost buttons, radius 6, `icon-sm / text-secondary`, anchored left / right centered vertically, 12 inside the track padding. Hover background `surface-translucent`. Disabled at track bounds: opacity 0.4, `cursor: not-allowed`. Below `md`, arrows are hidden — touch swipe carries navigation.

**Indicator (line segments)** — flex row beneath the track, margin-top 16, `justify-content: center`, gap 8. One segment per slide:

- Inactive: width 24, height 1, background `text-quaternary`, radius 0.5.
- Active: width 24, height 2, background `text-primary`; vertically centered against the inactive baseline. Height and color transition 100ms linear.
- Hit target: 32×16 wrapper around the visible rule, cursor `pointer`; click jumps the track to the matching slide.
- Hover (inactive): background darkens to `text-secondary` over 100ms linear.
- Focus: 1px `border-focus` ring, 2px offset, radius 2 around the wrapper.

**Auto-advance variant** — each indicator segment hosts an internal fill bar animating width 0 → 100% over the dwell duration (5000ms default) on the active segment only. Fill color `text-primary` over inactive bg `text-quaternary`. Pauses on hover or focus-within; resets when the user manually advances. Dwell respects `prefers-reduced-motion: reduce` → auto-advance disabled entirely.

Keyboard: ←/→ move between slides when focus is on the track or an indicator; Home / End jump to first / last; Tab cycles through indicator segments in order; Enter or Space on a segment jumps.

Accessibility: `role="region" aria-roledescription="carousel"` on the track wrapper; each slide `role="group" aria-roledescription="slide" aria-label="3 of 12"`; indicator container `role="tablist"` with each segment `role="tab" aria-controls=<slide-id>`. Arrow controls carry `aria-label="Previous slide"` / `"Next slide"`.

---

## Radar chart

Eight-axis polygon across the eight patent-scoring pillars. Purely static — no mount animation, no hover or focus. Monochrome by design: grid, polygon, points, and score numerals all render in the neutral system. Tier is read in the Threshold bar directly beneath, so the radar is a **shape-reader**, not a tier-reader — the viewer takes in the silhouette, then drops down to the bars for the tier call-outs.

- **Consumes:** `surface-page`, `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`
- **Surfaces:** Patent Intelligence SaaS (patent detail — primary; portfolio rows) · website (report previews carrying a patent score visualization)
- **Variants:** single-patent (default, 8 axes, fixed pillar set below)
- **States:** default, no-data (grid only), loading (Skeleton octagon)

Canvas: square, `width: 100%`, `aspect-ratio: 1 / 1`, min 280 × 280 inline, up to 440 × 440 on dedicated sections. Rendered as SVG (`vector-effect: non-scaling-stroke` on every stroked element). No pre-chart note — the radar is self-evident when it sits immediately above the Threshold bar panel.

**Pillars** — fixed order, rendered **clockwise from 12 o'clock** (start angle `−90°`, step `+45°`). Each axis carries a short one-word label plus the `P<n>` prefix — long forms live in the Threshold bar beneath:

| # | Position      | Radar label       | Full name (in Threshold bar) |
|---|---------------|-------------------|------------------------------|
| 1 | top           | `P1 Citation`     | Citation Impact              |
| 2 | upper-right   | `P2 Legal`        | Legal Strength               |
| 3 | right         | `P3 Technical`    | Technical Value              |
| 4 | lower-right   | `P4 Market`       | Market Coverage              |
| 5 | bottom        | `P5 Text`         | Text Quality                 |
| 6 | lower-left    | `P6 Network`      | Network Centrality           |
| 7 | left          | `P7 Licensing`    | Licensing Potential          |
| 8 | upper-left    | `P8 Forward`      | Forward Value                |

**Grid** — minimal. One outer octagon ring at 100% radius, 1px `border-primary`. One inner dashed ring at 50% radius, 1px dashed `border-primary` (`stroke-dasharray: 3 3`) — the only concession to internal scale. Eight radial spokes from center to outer ring, 1px `border-primary`. No 25%, 75% rings.

**Axis labels** — single-line only. `copy-13 / weight 500 / text-secondary`. 14px gap outside the outer ring. Anchor flips by position: top / bottom `middle`, right-side axes `start`, left-side axes `end`. Labels never wrap — the short-form table above is the contract.

**Score polygon** — fill `none`. Stroke 1px `text-tertiary`, `stroke-linejoin: round`. No color, no fill — the silhouette is the signal.

**Value points** — 3.5px filled circles in `text-primary` at each axis's value radius (`radius = score / 100 × max_radius`). No outline ring — the monochrome dot sits on top of the polygon stroke.

**Score numeral** — hairline pill anchored inside the polygon along each axis, 12px offset from the value point toward the center. Pill 20 × 13, rx 2, fill `surface-page`, 1px `border-primary`. Content: numeric score in `label-mono-11 / text-primary`. No tier color anywhere on the radar — the pill is uniform, the number does the reading.

**No-data** — grid and axis labels render; center hosts the inline Empty state variant ("No score yet."). **Loading** — Skeleton block shaped as an octagon at 100% radius while the grid and labels render normally.

**Accessibility** — whole chart is a single `<figure>` with `role="img"` and `aria-label` summarising the 8 scores (e.g. *"Patent score radar: P1 Citation 83, P2 Legal 79, …"*). No interactive targets; readers consume the summary, not individual axes.

Palette note: colour is deliberately absent. Tier encoding lives exclusively in the Threshold bar chip that follows, meeting WCAG 1.4.1 by carrying no colour-only signal.

---

## Threshold bar

Score row — label on the left, tier chip and numeric value on the right, hairline track underneath. The track fill is always neutral `text-primary`; tier is carried by a small mono chip (`STRONG` · `MID` · `WEAK`), never by the bar's color. This is a deliberate monochrome call: color stops being load-bearing, typography does the work.

- **Consumes:** `surface-tertiary`, `border-primary`, `text-primary`, `text-secondary`, `text-tertiary`
- **Surfaces:** Patent Intelligence SaaS (scorecards, "Score & Weight" panels — primary) · Licensing Platform (valuation readouts) · website (report preview blocks)
- **Variants:** one — default (label + weight % + tier chip + value + neutral track)
- **States:** default; at-max (fill 100%); over-max (fill pinned to 100%, value suffixed `+`)

**Row layout** — two lines stacked above a track.

- Top line: `display: flex; align-items: baseline; gap: 12px`. Left: label `copy-14 / weight 500 / text-primary` (e.g. `P1 Citation Impact`). Right cluster (right-aligned via `margin-left: auto`): tier chip, then value. Value `copy-16 / weight 600 / text-primary`, tabular numerals (`font-feature-settings: "tnum"`). Gap between chip and value: 10px.
- Second line: weight `label-mono-11 / text-tertiary` (e.g. `12.5%`), margin-top 4.
- Track: margin-top 10.

**Tier chip** — inline, above the track, between label and value. `label-mono-11`, uppercase, `letter-spacing: +0.20em`, `text-tertiary`, no background, no border. Vertical-align baseline with label. Three values only:

- `STRONG` — score ≥ 80
- `MID` — 50 ≤ score < 80
- `WEAK` — score < 50

**Track** — height 2, background `surface-tertiary`, radius 1, `position: relative`, `display: block`, `width: 100%`. Hairline by intent — the bar is a chart axis, not a visual weight.

**Fill** — absolutely positioned, `left: 0`, height 2, radius 1, background `text-primary`. Width `= value / max × 100%`. One color, regardless of tier.

Over-max (rare): fill pinned to 100%, value suffixed `+`. Under-zero: fill width 0.

**Row gap** — rows stack with 24px gap. A touch more airy than the dense 20px so the monochrome panel reads as a list, not a bar chart.

**Section header** — when a stack of score rows forms a panel (the "SCORE & WEIGHT" layout), a header sits above the stack: `label-mono-11 / text-tertiary`, uppercase (e.g. `SCORE & WEIGHT`), followed by a 1px bottom `border-primary` divider. 20px spacing below the divider before the first row.

**Accessibility** — track exposed as `role="progressbar"` with `aria-valuenow` / `aria-valuemin` / `aria-valuemax` and `aria-label` naming the metric (e.g. *"P1 Citation Impact"*). The tier chip word (`STRONG` / `MID` / `WEAK`) is the tier signal for all readers, colour-blind or otherwise — there is no colour-only signal anywhere in the component, meeting WCAG 1.4.1 by construction.
