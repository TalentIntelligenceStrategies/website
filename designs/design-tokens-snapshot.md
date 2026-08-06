<!-- Snapshot of TIS/brand/design-tokens.md — do NOT edit here. Edit upstream in brand/ and resync. -->

# TIS Visual System

Source of truth for the look and feel of TIS — primitives, semantic tokens, motion, accessibility, and material presets. Three downstream surfaces consume this system and live in separate repositories: the marketing website, the Patent Intelligence SaaS MVP, and the Licensing Platform MVP (upcoming). §§1–6 describe the system; §7 is the developer appendix. For the shared component catalog, see [`components.md`](./components.md); for tone, [`brand-voice.md`](./brand-voice.md); for logo and name usage, [`visual-guide.md`](./visual-guide.md).

---

## 1. At a glance

White, near-black (`#252525`), and a 10-step gray ladder carry the page. Color appears as status only — success, warning, danger, info. Type is Urbanist (sans) + Inconsolata (mono). Motion eases, never bounces. Borders render at 1px (0.5px on retina). Tone reference: 泰然 — see [`brand-voice.md`](./brand-voice.md) §2.

---

## 2. Palette

### Ink

Primary ink is `#252525` — a near-black warmed off-neutral. Text, primary buttons, logo mark on light backgrounds. Pure black (`#000`) is never used.

### Grays

A 10-step ladder from white to ink, by role:

- **Backgrounds** (N1–N3): page, off-white, sunken surface.
- **Borders** (N4–N6): hairline dividers. Most visible dividers land on `#EEEEEE`.
- **Text** (N8–N10): tertiary `#8A8F98`, secondary `#474747`, primary `#252525`. Nothing lighter than N8 carries body copy.

### Status

Four soft bg + dark fg pairings. The only saturated color on the page.

| State | bg | fg | Use |
|---|---|---|---|
| success | `#F0FDF4` | `#15803D` | confirmations, availability, healthy state |
| warning | `#FEF9C3` | `#A16207` | advisory, soft limits, pre-error |
| danger  | `#FEE2E2` | `#B91C1C` | validation errors, destructive confirmations |
| info    | `#EFF6FF` | `#1E40AF` | tips, callouts, non-urgent guidance |

### Signal dots

Pulsing dots for live system state — dashboards, report status, any live-data surface. More saturated than the status foregrounds (they attract the eye at small sizes). Pulse ring fades over 2s; honors `prefers-reduced-motion`.

| Tone | Hex | Use |
|---|---|---|
| Green | `#22C55E` | live / active |
| Amber | `#F59E0B` | expiring / degraded |
| Red   | `#EF4444` | lapsed / blocked |

### Black and white as vessel

Monochrome is a product decision, not a style preference. TIS is the platform that delivers the result — the color belongs to what clients, IP suppliers, and reports bring forward. Ink + white refuse to compete for attention with the work they frame; saturated tones enter only as status or signal. See [`visual-guide.md`](./visual-guide.md) §Mark & Meaning for the brand-identity framing.

---

## 3. Type

Two families + one Chinese stack:

- **Urbanist** (sans) — headlines, body, UI, buttons.
- **Inconsolata** (mono) — **never used on text.** Reserved for sectional numbering (`01` / `02` / `03`), numerals (prices, counts, dates, percentages), and number-prefixed identifiers (`LIC-12345`, patent IDs). If a string reads as a word, it is Urbanist — eyebrows, labels, metadata, chips, tags, link text, status strings, column heads, and alphabetic codes (`S`, `A`, `US`, `TW`) included.
- **Noto Sans TC** — Traditional Chinese. Size and weight match the Urbanist counterpart 1:1.

Headlines are heavy (700) and tight (line-height 1.0, tracking −0.03em at the top of the scale). As size drops, line-height loosens and tracking opens. Body copy is 16px / 1.6 line-height / +0.01em tracking; feature copy available at 18px / 1.55. Labels run 10–14px with wide tracking (wider at smaller sizes) and are **always Urbanist** — eyebrows, KV label keys, and column headers included. Inconsolata appears only through the four `*-mono-*` roles (`copy-mono-13`, `label-mono-16`, `label-mono-12`, `num-mono-*`), every one of them scoped to numerals or number-prefixed IDs. Button text is Urbanist, heavily tracked, 12px default (14px medium, 16px hero). Case decided per button / per label.

Full role table in §7.2.

---

## 4. Motion & materials

Fades (color) or eases (motion). Nothing bounces, nothing springs.

**Durations:** 100ms (hover color), 150ms (small transforms, modal enter), 250ms (card hover, accordion), 350ms (scroll reveals, hover-lift). `prefers-reduced-motion: reduce` → 0ms.

**Easing:** one curve — `cubic-bezier(0.2, 1, 0.3, 1)`. Linear fades reserved for color.

**Shadows:** three levels (low / medium / high), built on 6–12% black. Low under buttons and tooltips; medium under cards and dropdowns; high under modals.

**Corners:** 6px (chips, tooltips), 8–12px (buttons, inputs), 16px (cards), 24px (hero). Nothing ships at 0px.

**Borders:** 1px default; 0.5px on retina.

---

## 5. Accessibility floor

Non-negotiable:

- **Contrast** — every text / surface pair meets WCAG AA (4.5:1 body, 3:1 large and UI). N7 (`#A5A5A5`) and N8 (`#8A8F98`) are UI/decorative only; never body.
- **Tap targets** — ≥ 44×44 px on mobile. Small button variant requires `min-height: 44px` when standalone.
- **Focus rings** — always visible. 1px outline, 2px offset, `#252525` (primary ink); `#FFFFFF` on inverse surfaces. Never removed without a visible replacement.
- **Reduced motion** — `prefers-reduced-motion: reduce` collapses transitions to 0ms and stops signal-dot pulsing.
- **Language** — Chinese content uses the Noto Sans TC stack; tracking constraint in §7.2.

---

## 6. Deferred

- **Dark mode** — not built. Tokens support it structurally via `[data-theme=dark]` overrides. Revisit when a dark surface ships.
- **Font swap** — if Urbanist / Inconsolata are replaced, only two token values change; everything else cascades.
- **Verified License Badge — expired-state visual treatment** — the active-state spec is finalized: stadium pill wrapping issuer + licensee §Seal · Standalone marks + QR, light-locked, identity in [`visual-guide.md`](./visual-guide.md) §Verified License Badge, implementation in [`components.md`](./components.md) §Verified License Badge. Open sub-question: how an expired badge reads — greyscale? overlay label? replacement stamp? Ship-blocker for the Licensing Platform because licenses will lapse. Tracked in the trailing TODO of [`components.md`](./components.md) §Verified License Badge.
- **Chart / data-visualization palette** — deliberately monochrome by default. The two pillar-score components (Radar chart, Threshold bar in [`components.md`](./components.md)) carry tier as a typographic chip (`STRONG` · `MID` · `WEAK`) over neutral fills — no colour is load-bearing on the radar / threshold panel. `signal-active` / `signal-warning` / `signal-lapsed` in §7.4 remain for status-dot use (live / degraded / lapsed indicators), not for score encoding. **Deck-scope categorical palette resolved in §7.4** (`--chart-deck-1` … `--chart-deck-5`) — chart-semantic; deck data-viz consumer spec deferred (presentations.md trimmed to layout + chrome). **SABCD tier ramp resolved in §7.4** (`--score-s` / `-a` / `-b` / `-c` / `-d`) as a five-hue quality ladder — gold (S) → emerald (A) → sky (B) → violet (C) → orange (D). Each hue is held off the status / signal palette so a Tier chip and a Status chip on the same row never read as the same family — gold sits clearly off the warning amber `#A16207`, emerald is cyan-shifted off the success forest-green, sky is lighter than the info royal-blue, and orange reads softer than the danger red. Violet, formerly tier S's primitive, moves down to tier C as a mid-rank caution tone. The ramp maps onto patent-quality intuition (premium / strong / solid / caution / weak) and recovers instant tier-readability on dense surfaces (Licensing Platform recommendation grid, license detail tables, Patent Intelligence SaaS scorecards). Threshold-bar's monochrome rule still applies inside the radar/threshold panel — colour-coded SABCD chips and the monochrome P1–P8 readout coexist without conflict. **Jurisdiction accent ramp resolved in §7.4** (`--juris-us` / `-tw` / `-eu` / `-jp` / `-ch`) as a five-hue regional palette — indigo (US) → olive (TW) → teal (EU) → fuchsia (JP) → cherry (CH). The dominant pairing (`US × Tier S` — indigo against gold) sits firmly off-axis. CH sits in the cherry-red region — only adjacency is the danger status chip `#B91C1C`, but danger reads as a brighter / more saturated pure red while CH reads as a deeper / pinker rose. TW sits in the olive (yellow-green) region with two adjacencies: Tier S gold (both warm yellow-tones) and Tier A emerald (yellow-green vs cyan-green) — separable by saturation and value at chip scale. EU moved off slate to teal so it no longer reads against the silver brand ramp (`--slate-*`). JP fuchsia ↔ Tier C violet separates the same way. Jurisdiction-semantic, never status. (KR / Korea dropped for now.) Used for jurisdiction chips on the Licensing Platform (catalog, recommendation grid, license inventory, license detail). **SaaS-scope multi-series palette remains deferred** (Patent Intelligence SaaS data-viz; Licensing Platform). Paired visual spec in [`visual-guide.md`](./visual-guide.md) §Iconography → Data Visualization.
- **Imagery — full spec** — photography, AI / generated, illustrations, product screenshots, patterns / textures / backgrounds, jurisdiction maps, and non-data diagrams are all unspec'd. Working flag in [`visual-guide.md`](./visual-guide.md) §Imagery. (Gradients are **retired** — §7.5 below now specs static imagery + one flat accent per surface; surface mapping in [`visual-guide.md`](./visual-guide.md) §Imagery → Surface identity. Static imagery carrying surface identity makes the photography / pattern spec *more* urgent, not less.)

---

## 7. Developer appendix

Enough to rebuild the CSS/Tailwind surface from scratch.

### 7.1 Architecture

Three layers:

1. **Primitives** — raw values (hex, px, ms).
2. **Semantic tokens** — named intents resolving to primitives (`surface-page`, `text-primary`, `border-focus`). Components consume these, never primitives.
3. **Components** — compose semantic tokens via **material presets** (radius + elevation + border bundled as a single named decision).

Color scales are role-based 1–10 per hue: 1–3 backgrounds, 4–6 borders, 7–8 high-contrast, 9 secondary text, 10 primary text.

**Handoff rule:** CSS custom properties are authoritative. Tailwind config is a consumption layer — if they disagree, CSS vars win.

### 7.2 Raw values

**Neutrals (1 → 10):**

| Step | Hex | Role |
|---|---|---|
| N1  | `#FFFFFF` | page background |
| N2  | `#FAFAFA` | off-white surface |
| N3  | `#F3F3F3` | sunken surface |
| N4  | `#EEEEEE` | border primary |
| N5  | `#E8E8E8` | border secondary |
| N6  | `#D5D5D5` | border tertiary |
| N7  | `#A5A5A5` | text quaternary (decorative / large only) |
| N8  | `#8A8F98` | text tertiary (UI only) |
| N9  | `#474747` | text secondary |
| N10 | `#252525` | ink / text primary |

**Status pairings (bg / fg):**

| State | bg | fg |
|---|---|---|
| success | `#F0FDF4` | `#15803D` |
| warning | `#FEF9C3` | `#A16207` |
| danger  | `#FEE2E2` | `#B91C1C` |
| info    | `#EFF6FF` | `#1E40AF` |

**Signal dots:**

| Tone | Hex | CSS var | Use |
|---|---|---|---|
| Green | `#22C55E` | `--signal-dot`       | live / active |
| Amber | `#F59E0B` | `--signal-dot-amber` | expiring / degraded |
| Red   | `#EF4444` | `--signal-dot-red`   | lapsed / blocked |

Pulse animation: 2s infinite, box-shadow ring fades from `rgba(<rgb>,0.6)` at 0 → `rgba(<rgb>,0)` at 10px over 70% of the cycle. Each tone has its own keyframe so the glow color matches the dot.

**Tier accent (SABCD ramp — S / A / B / C / D):**

Five distinct hues for the SABCD quality ladder, each lifted off the status / signal palette so a `Tier A` chip never reads as the success status chip and a `Tier D` chip never reads as danger. AA-passing on white; soft backgrounds for chip use.

| Tier | Hex | Soft bg | Tone |
|---|---|---|---|
| S | `#8B6914` | `#FAF3DC` | deep aged gold — premium / strategic. Bronze-leaning so it never reads as yellow or as the warning amber `#A16207`. |
| A | `#047857` | `#ECFDF5` | emerald — strong. Cyan-shifted off the success forest-green `#15803D` and the signal lime `#22C55E`. |
| B | `#0369A1` | `#F0F9FF` | sky — solid. Lighter and cooler than the info royal-blue `#1E40AF` and the indigo jurisdiction `#4338CA`. |
| C | `#6D28D9` | `#F5F3FF` | violet — caution / mid. Held one step lighter than the prior tier-S violet `#5B21B6` to read as middle-rank, not premium. |
| D | `#C2410C` | `#FFF7ED` | orange — weak. True orange so it reads softer than the danger red `#B91C1C` and clearly distinct from the signal amber `#F59E0B`. |

Tier-semantic, never status. The ramp is deliberately decoupled from status / signal hex — a Tier chip and a Status chip on the same row read as two separate palettes. The full semantic mapping lives in §7.4.

**Tier vivid (500-level — accent source):**

A saturated companion ramp to the SABCD deep colors above. Never a solid fill on a Tier chip — solid Tier chips always use the deep §7.2 ramp. Formerly gradient stops; with gradients retired (§7.5) the ramp survives because `score-b-vivid` `#0EA5E9` is the source value for `--surface-accent-signal`. Treat the rest as available-but-unused: don't reach for them without a stated role.

| Tier | Hex | Tone |
|---|---|---|
| S | `#D4A017` | bright bronze-gold (not yellow) |
| A | `#10B981` | emerald-500 |
| B | `#0EA5E9` | sky-500 |
| C | `#8B5CF6` | violet-500 |
| D | `#F97316` | orange-500 |

**Slate ramp (silver register — flat use):**

Tailwind-style slate ramp, off the SABCD ladder. The "silver" register for TIS-overall surfaces. With gradients retired (§7.5) these are used as **flat** colors — `slate-700` `#334155` for silver-register body copy on light surfaces, `slate-200` `#E2E8F0` on dark. The former three-tier gradient treatment (gunmetal / brushed chrome / luminous) is gone.

| Stop | Hex | Use |
|---|---|---|
| slate-100 | `#F1F5F9` | luminous text shimmer entry (dark-surface) |
| slate-200 | `#E2E8F0` | luminous text mid (dark-surface) |
| slate-300 | `#CBD5E1` | faded text shimmer entry |
| slate-400 | `#94A3B8` | faded text mid · luminous text resolve |
| slate-500 | `#64748B` | solid text entry |
| slate-600 | `#475569` | faded text resolve |
| slate-700 | `#334155` | solid text mid · silver pair-panel body color |
| slate-900 | `#0F172A` | solid text resolve |

**Bronze ramp (retired):**

Custom four-stop ramp tuned to harmonize with the warm S-tier gold. **Retired 2026-08-06** alongside the gradient system (§7.5). Its only consumer was the Services · Ascent / Brokerage surfaces, which the rating-at-core positioning in [`positioning.md`](./positioning.md) superseded. Values kept for recovery; do not build on them.

| Stop | Hex | Use |
|---|---|---|
| bronze-light | `#E8D8A8` | faded text shimmer entry (pale honey) |
| bronze-mid | `#B8965A` | faded text mid · solid text entry |
| bronze-deep | `#8B6914` | faded text resolve · solid text mid (= canonical `--score-s` deep) |
| bronze-darker | `#5C4509` | solid text resolve · bronze pair-panel body color |

**Dot pastels (retired):**

**Retired 2026-08-06** with the dot-gradient fields they fed (§7.5). Static imagery now carries that atmospheric weight. Values kept for recovery; do not build on them.

| Pillar | Pastel | Hex | Dark-mode swap (vivid) |
|---|---|---|---|
| Warm (Licensing Platform) | peach | `#FFD7B0` | `#F97316` D-orange |
| Warm | cream | `#FEDCBE` | `#D4A017` S-gold |
| Warm | gold | `#F5E4A8` | — |
| Cool (Patent Intelligence SaaS) | lavender | `#E9D5FF` | `#8B5CF6` C-violet |
| Cool | sky | `#BFDBFE` | `#0EA5E9` B-sky |
| Cool | mint | `#D1FAE5` | `#10B981` A-emerald |

**Jurisdiction accent (Licensing Platform — US / TW / EU / JP / CH):**

Five distinct hues for the jurisdictions TIS sells bundles in. The dominant pairing (`US × Tier S` — indigo against gold) sits firmly off-axis so the most-used chip pair never collides. CH sits in the cherry-red region — its only adjacency is to the danger status chip `#B91C1C`, but danger reads as a brighter / more saturated pure red while CH reads as a deeper / pinker rose, so the two stay distinct on a license-row even when co-occurring. TW sits in the olive (yellow-green) region — its closest adjacencies are Tier S gold (both warm yellow-tones) and Tier A emerald (both green-family but olive is yellow-green vs emerald's cyan-green) — separable by saturation and value at chip scale. EU moved off slate to **teal** so it no longer collides with the silver brand ramp (`--slate-*`). The remaining tier ↔ jurisdiction adjacency (JP fuchsia ↔ Tier C violet) separates cleanly the same way. AA-passing on white; soft backgrounds for chip use.

| Code | Hex | Soft bg | Use |
|---|---|---|---|
| US | `#4338CA` | `#EEF2FF` | indigo — United States |
| TW | `#3F6212` | `#ECFCCB` | olive — Taiwan |
| EU | `#0F766E` | `#F0FDFA` | teal — European Union |
| JP | `#A21CAF` | `#FAE8FF` | fuchsia — Japan |
| CH | `#BE123C` | `#FFF1F2` | cherry-red — China |

These are jurisdiction-semantic, never status. The full semantic mapping lives in §7.4. (KR / Korea dropped for now — see brand-changelog.)

**UI-only values:**

| Use | Value |
|---|---|
| Primary button bg | `#252525` (primary ink) |
| Primary button hover | `#292524` |
| Focus ring | `#252525` (primary ink) · `#FFFFFF` on inverse surfaces |

**Alpha:** black 5/10/20/40/66% (hover fills, overlays); white 5/10/20/30% (inner highlights).

**Fonts:**
- Sans: `'Urbanist', 'Inter', system-ui, sans-serif`
- Mono: `'Inconsolata', ui-monospace, 'SF Mono', Menlo, monospace`
- Chinese: `'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif`

Self-hosted at [`brand/assets/fonts/`](./assets/fonts/) (SIL OFL) in the Google Fonts ZIP-extracted layout — per-weight static TTFs in `<Family>/static/`. Consumer surfaces should reference these as the canonical source rather than the Google Fonts CDN — same files, no external dependency at render. See [`brand/assets/fonts/README.md`](./assets/fonts/README.md) for the structure, and a future-woff2-migration note when a converter is available.

**Weights:** 400 / 500 / 600 / 700.

**Type sizes (px):** 11, 12, 13, 14, 15, 16, 20, 24, 28, 32, 40, 48, 56, 72.

**Line-heights:** none 1.0 · tight 1.1 · snug 1.25 · normal 1.4 · relaxed 1.6.

**Tracking:** tightest −0.03em · tighter −0.02em · tight −0.01em · normal 0 · wide +0.01em · wider +0.05em · widest +0.15em · mono +0.20em.

**Type role pairings — explicit values:**

| Role | Size | Weight | Tracking | Line-height | Case |
|---|---|---|---|---|---|
| heading-96 | 96 | 700 | −0.03em | 0.95 | sentence (deck cover hero) |
| heading-88 | 88 | 700 | −0.03em | 1.0  | sentence (deck cover alt) |
| heading-72 | 72 | 700 | −0.03em | 1.0  | sentence |
| heading-56 | 56 | 700 | −0.03em | 1.05 | sentence |
| heading-48 | 48 | 700 | −0.02em | 1.1  | sentence |
| heading-40 | 40 | 700 | −0.02em | 1.1  | sentence |
| heading-32 | 32 | 600 | −0.01em | 1.2  | sentence |
| heading-24 | 24 | 600 | −0.01em | 1.3  | sentence |
| heading-20 | 20 | 600 |  0      | 1.35 | sentence |
| heading-18 | 18 | 600 | −0.01em | 1.3  | sentence (accordion summary) |
| copy-24 | 24 | 400 |  0      | 1.55 | sentence (deck body — projection-distance floor candidate) |
| copy-22 | 22 | 400 |  0      | 1.55 | sentence (deck body — projection-distance mid floor) |
| copy-20 | 20 | 400 |  0      | 1.55 | sentence |
| copy-18 | 18 | 400 |  0      | 1.55 | sentence |
| copy-16 | 16 | 400 | +0.01em | 1.6  | sentence |
| copy-15 | 15 | 400 |  0      | 1.6  | sentence (accordion body) |
| copy-14 | 14 | 400 |  0      | 1.55 | sentence |
| copy-13 | 13 | 400 |  0      | 1.55 | sentence (captions, hints, toast / tooltip body) |
| copy-mono-13 | 13 | 400 | +0.20em | 1.4 | numerals and IDs only — patent numbers, hashes, timestamps (never prose) |
| num-mono-40 | 40 | 600 | −0.01em | 1.1 | as content (Inconsolata; deck metric-strip hero numerals) |
| num-mono-32 | 32 | 600 | −0.01em | 1.2 | as content (Inconsolata; deck metric-strip hero numerals, denser strips) |
| label-13 | 13 | 500 | +0.05em | 1.2 | sentence |
| label-12 | 12 | 600 | +0.15em | 1.2 | UPPERCASE |
| label-mono-16 | 16 | 500 | +0.10em | 1.2 | deck numerals only — page numbers, dates, metric figures (never eyebrows) |
| label-mono-12 | 12 | 500 | +0.10em | 1.2 | UPPERCASE (sectional numerals and number-prefixed IDs only, e.g., `01` / `LIC-12345`) |
| button-16 | 16 | 700 | +0.10em | 1.0 | per button |
| button-14 | 14 | 700 | +0.10em | 1.0 | per button |
| button-12 | 12 | 700 | +0.10em | 1.0 | per button |

**UI floor.** **12px is the minimum size for any rendered UI text** on product surfaces (cards, sheets, tables, controls, chips). Sub-12 sizes (the `11` in the size ramp) are reserved for fine-print decorative use only (legal lines, watermark IDs, deck-footer page numerals): never load-bearing for scanning, comparison, or task completion. The floor applies across both Latin (Urbanist / Inconsolata) and Chinese (Noto Sans TC) tracks; sub-12 hits the legibility threshold for both at 1× DPR and on small-laptop screens. When fine-print is genuinely warranted, compose inline at 11px — Urbanist for legal lines and text labels, Inconsolata only when the content is numeric or a number-prefixed ID.

**Detail-surface register (12 / 15 / 18).** Cards and detail Sheets compose three type sizes:

| Step | Size | Role on the surface |
|---|---|---|
| Label | **12** | metadata, chips, eyebrows, KV labels, supporting strings (`label-12`); number-prefixed IDs use `label-mono-12` |
| Body | **15** | card titles, sheet prose, KV values, header IDs (`copy-15` and 15-size variants in 500 weight, mono or sans per role) |
| Focal | **18** | expanded titles inside detail Sheets (`heading-18`) |

The 12 / 15 / 18 ladder is the canonical detail-surface register. When the user clicks from a card (15-register title) into a Sheet (18-register title), the eye recalibrates one step up — small enough to feel coherent, large enough to mark the focal change. Within a single surface, mixing sizes outside the ladder (e.g., 14, 17) breaks the rhythm and should be a last resort. Reference render: [`brand/previews/patent-card-preview.html`](./previews/patent-card-preview.html).

**Noto Sans TC:** size and weight match the Urbanist counterpart 1:1. Never exceed +0.05em tracking.

| Role | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|
| zh-h-32    | 32 | 600 | −0.01em | 1.3 |
| zh-body-16 | 16 | 400 |  0      | 1.7 |

**Iconography**

Icons render as geometric outlines on a 24px grid — monochrome, `currentColor`, 1.5px nominal stroke with rounded linecaps and joins. Stroke holds visually constant across sizes via `vector-effect: non-scaling-stroke`. Style rules, library choice, and custom-icon policy: [`visual-guide.md`](./visual-guide.md) §Iconography.

| Token | Size | Use |
|---|---|---|
| icon-sm  | 16px | input affordances, chips, small buttons, dense meta rows |
| icon-md  | 20px | default UI — nav, table cells, menu rows, standard buttons |
| icon-lg  | 24px | primary controls, modals, prominent UI |
| icon-xl  | 32px | empty states, feature rows |
| icon-2xl | 48px | marketing and hero moments |

**Spacing (4px grid, px):** 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128, 160.

**Radius (px):** 4, 6, 8, 12, 16, 24, 32 · plus `9999px` (pill) and `50%` (circle).

**Border widths:** 1px default (0.5px retina) · 1.5px (card accents) · 2px (underline accents).

**Shadows:**
- Low: `0 2px 4px rgba(0,0,0,0.06)`
- Medium: `0 4px 24px rgba(0,0,0,0.08)`
- High: `0 7px 32px rgba(0,0,0,0.12)`
- Focus: `0 0 0 1px #252525`
- Inner highlight: `inset 0 1px 0 rgba(255,255,255,0.4)`
- Stacked low (content cards):
  ```
  0 8px 2px 0 rgba(0,0,0,0),
  0 5px 2px 0 rgba(0,0,0,0.01),
  0 3px 2px 0 rgba(0,0,0,0.03),
  0 1px 1px 0 rgba(0,0,0,0.05),
  0 0 1px 0 rgba(0,0,0,0.06)
  ```

**Motion durations:** fast 100ms · base 150ms · medium 250ms · slow 350ms · count-up 1200ms (linear).

**Easings:**

| Name | Curve | Use |
|---|---|---|
| linear | `linear` | color fades |
| out | `cubic-bezier(0, 0, 0.2, 1)` | enter |
| in | `cubic-bezier(0.4, 0, 1, 1)` | exit |
| emphasized | `cubic-bezier(0.2, 1, 0.3, 1)` | lifts, CTAs (default) |

**Breakpoints (px):** sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536 · site-max 1440.

**Section content width.** Every section's content sits inside the page container at `site-max` (1440px) with `padding-inline: 32px` (20px below md). Inner blocks within a section — hero grids, card rows, accordion panels, footers — inherit that width; do **not** introduce a local `max-width` cap and `margin: 0 auto` inside a section, since sibling sections must share a left edge. Per-element reading-comfort caps (`max-width: 56ch` on body copy, `max-width: 60ch` on lead copy) are correct and unaffected — those cap *text*, not the block.

**Aspect ratios:** `--aspect-deck-16-9: 16 / 9` (default for slide canvases). Consumed by [`presentations.md`](./presentations.md) §2 Layout.

**Z-index:** footer 50 · scrollbar 75 · header 100 · overlay 500 · popover 600 · command-menu 650 · dialog 700 · toasts 800 · tooltip 1100 · context-menu 1200 · skip-nav 5000 · debug 5100 · max 10000.

**Opacity scale:** 0, 0.05, 0.10, 0.20, 0.40, 0.60, 0.80, 1.0.

### 7.3 Material presets

| Material | Radius | Shadow | Border | Use |
|---|---|---|---|---|
| base | 6 | none | hairline | flat surfaces |
| small | 6 | low | none | subtle hover lifts |
| medium | 12 | stacked-low | hairline | content cards |
| tooltip | 6 | low | none | tooltips |
| menu | 12 | medium | hairline | dropdowns |
| modal | 16 | high | none | dialogs |
| hero | 24 or 0 | none | none | hero containers |
| top-nav | 0 | none | 1px bottom hairline | full-width top nav bar |
| deck-cover | 0 | none | none | full-bleed cover slide — bleeds to canvas edge |
| deck-content | 0 | none | none | content slide canvas — bleeds to canvas edge |

### 7.4 Semantic token map

| Semantic | Value |
|---|---|
| surface-page | `#FFFFFF` |
| surface-secondary | `#FAFAFA` |
| surface-tertiary | `#F3F3F3` |
| surface-quaternary | `#EEEEEE` |
| surface-elevated | `#FFFFFF` (raised surface that must read as lifted above `surface-tertiary` tracks — segmented controls, popovers, command-palette inner cards. Same hex as `surface-page` in light. Note for dark-mode consumers: dark `surface-page` is the *darkest* surface and would recess against the track, so `surface-elevated` must alias to a *lighter* dark surface; full dark-mode mapping deferred per §6.) |
| surface-inverse | `#252525` |
| surface-inverse-hover | `#292524` |
| surface-translucent | `rgba(0,0,0,0.05)` |
| surface-page-translucent | `rgba(255,255,255,0.70)` (for backdrop-blur chrome — top nav, sticky bars) |
| surface-inverse-translucent | `rgba(255,255,255,0.10)` (interaction overlay on inverse surfaces — e.g. close-button hover on the §Announcement banner where `surface-tertiary` would vanish against the dark fill; dark-theme equivalent of `surface-translucent`) |
| text-primary | `#252525` |
| text-secondary | `#474747` |
| text-tertiary | `#8A8F98` (UI only) |
| text-quaternary | `#A5A5A5` (decorative / large only) |
| text-inverse | `#FFFFFF` |
| text-link | `#252525` (primary ink — no distinct link color) |
| text-link-hover | `#474747` |
| text-disabled | `text-quaternary` @ 60% opacity |
| border-primary | `#EEEEEE` |
| border-secondary | `#E8E8E8` |
| border-tertiary | `#D5D5D5` |
| border-focus | `#252525` (primary ink) · `#FFFFFF` on inverse surfaces |
| border-divider | `#EEEEEE` |
| focus ring | 1px solid `border-focus`, 2px offset |
| selection-bg | `#EEEEEE` |
| success-bg | `#F0FDF4` |
| success-fg | `#15803D` |
| warning-bg | `#FEF9C3` |
| warning-fg | `#A16207` |
| danger-bg | `#FEE2E2` |
| danger-fg | `#B91C1C` |
| info-bg | `#EFF6FF` |
| info-fg | `#1E40AF` |
| signal-active | `#22C55E` (live / active — `--signal-dot`; also **score-strong**, ≥ 80) |
| signal-warning | `#F59E0B` (expiring / degraded — `--signal-dot-amber`; also **score-mid**, 50–79) |
| signal-lapsed | `#EF4444` (lapsed / blocked — `--signal-dot-red`; also **score-weak**, < 50) |
| chart-deck-1 | `#252525` (primary series — ink) |
| chart-deck-2 | `#1E40AF` (secondary series — chart-semantic; same hex as `info-fg`, never used as status on a deck surface) |
| chart-deck-3 | `#15803D` (tertiary series — chart-semantic; same hex as `success-fg`) |
| chart-deck-4 | `#A16207` (quaternary series — chart-semantic; same hex as `warning-fg`) |
| chart-deck-5 | `#B91C1C` (quinary series — chart-semantic; same hex as `danger-fg`) |
| score-s | `#8B6914` (SABCD tier S — deep aged gold; tier-semantic, decoupled from status / signal) |
| score-a | `#047857` (SABCD tier A — emerald; cyan-shifted off `success-fg` `#15803D`) |
| score-b | `#0369A1` (SABCD tier B — sky; lighter and cooler than `info-fg` `#1E40AF`) |
| score-c | `#6D28D9` (SABCD tier C — violet; one step lighter than the prior tier-S violet `#5B21B6`) |
| score-d | `#C2410C` (SABCD tier D — orange; distinct from `danger-fg` `#B91C1C` and signal amber `#F59E0B`) |
| score-s-bg | `#FAF3DC` (paired soft background for tier S chip — warm cream) |
| score-a-bg | `#ECFDF5` (paired soft background for tier A chip; not the same as `success-bg` `#F0FDF4`) |
| score-b-bg | `#F0F9FF` (paired soft background for tier B chip; not the same as `info-bg` `#EFF6FF`) |
| score-c-bg | `#F5F3FF` (paired soft background for tier C chip — violet-50) |
| score-d-bg | `#FFF7ED` (paired soft background for tier D chip — orange-50; not the same as `danger-bg` `#FEE2E2`) |
| score-s-vivid | `#D4A017` (vivid companion — never a solid fill on a tier chip) |
| score-a-vivid | `#10B981` (vivid companion — emerald) |
| score-b-vivid | `#0EA5E9` (vivid companion — sky) |
| score-c-vivid | `#8B5CF6` (vivid companion — violet) |
| score-d-vivid | `#F97316` (vivid companion — orange) |
| juris-us | `#4338CA` (jurisdiction accent — United States; indigo) |
| juris-tw | `#3F6212` (jurisdiction accent — Taiwan; olive) |
| juris-eu | `#0F766E` (jurisdiction accent — European Union; teal, moved off slate to clear the silver brand ramp) |
| juris-jp | `#A21CAF` (jurisdiction accent — Japan; fuchsia) |
| juris-ch | `#BE123C` (jurisdiction accent — China; cherry-red) |
| juris-us-bg | `#EEF2FF` (paired soft background for US chip) |
| juris-tw-bg | `#ECFCCB` (paired soft background for TW chip) |
| juris-eu-bg | `#F0FDFA` (paired soft background for EU chip) |
| juris-jp-bg | `#FAE8FF` (paired soft background for JP chip) |
| juris-ch-bg | `#FFF1F2` (paired soft background for CH chip) |
| shadow-low | `0 2px 4px rgba(0,0,0,0.06)` (buttons, tooltips, light hover lifts) |
| shadow-medium | `0 4px 24px rgba(0,0,0,0.08)` (cards at rest on the gapped recommendation grid, dropdowns, sheet shell) |
| shadow-high | `0 7px 32px rgba(0,0,0,0.12)` (cards on hover, modals, popovers) |
| shadow-stacked-low | five-layer composite (see §7.2 *Shadows*) — content cards on the marketing site |
| surface-accent-licensing | `#EC4200` (Licensing Platform accent — vivid; UI chrome, eyebrows, large text. Sampled from the shipped nav-dropdown imagery) |
| surface-accent-licensing-text | `#D93B00` (Licensing accent, text-safe on white — 4.59:1) |
| surface-accent-signal | `#0EA5E9` (Patent Intelligence SaaS accent — vivid; **dark surfaces only**, 5.53:1 on `#252525` but only 2.77:1 on white) |
| surface-accent-signal-text | `#0A72B0` (Signal accent, text-safe on white — 5.19:1) |
| surface-accent-tis | `#252525` (TIS-overall — neutral ink; TIS speaks in ink, not in a colour of its own) |

Dark-theme shadow alphas escalate to compensate for the dark surface — `0.4` / `0.5` / `0.6` for low / medium / high respectively (see preview-scope tokens in `brand/previews/color-system.html` and `patent-card-preview.html`).

### 7.5 Surface accents & static imagery

**Gradients are retired.** The `theme × style` gradient system (nine text utilities, four background washes, eight dot fields, four faded-bg × solid-text pairings) was removed 2026-08-06. Surface identity is now carried by **static imagery plus one flat accent per surface** — the imagery evokes the colour, the accent states it. Pillar mapping and when-to-use rules live in [`visual-guide.md`](./visual-guide.md) §Imagery.

Nothing was lost silently: the retired compositions remain in this file's history and in `brand-changelog.md`.

**The accents** (semantic tokens in §7.4):

| Surface | Vivid | Text-safe on white | Reads as |
|---|---|---|---|
| Licensing Platform | `--surface-accent-licensing` `#EC4200` | `--surface-accent-licensing-text` `#D93B00` | Red-leaning orange. Sampled from the shipped nav-dropdown imagery. |
| Patent Intelligence SaaS | `--surface-accent-signal` `#0EA5E9` | `--surface-accent-signal-text` `#0A72B0` | True azure. Vivid value is **dark-surface only** — see the contrast note below. |
| TIS overall | `--surface-accent-tis` `#252525` | same | Neutral ink. TIS speaks across surfaces, so it carries no colour of its own. |

**Contrast — read this before using an accent.** `#0EA5E9` measures **2.77:1 on white**, which fails the §5 AA floor even for large text and UI. It is a *dark-surface* accent (5.53:1 on `#252525`) and that is how the shipped Signal hero uses it. On any light surface, use `--surface-accent-signal-text` instead. Licensing's `#EC4200` is more forgiving — 3.93:1 on white and 3.90:1 on ink — so it clears AA for large text and UI on both, but body copy on white still needs the `-text` sibling.

**Held off the SABCD ramp, with one adjacency to respect.** Accents are surface identity; `--score-*` is patent quality. They must never read as the same family. The two live closest together are `--surface-accent-licensing-text` `#D93B00` and `--score-d` `#C2410C` — separable because the accent is a hotter, redder orange while tier D is a browner burnt orange. On marketing surfaces they never co-occur (tier chips don't appear there). On the Licensing Platform they can, so prefer the vivid accent for chrome and let the tier chip own the burnt register.

**Application.** Flat `color` / `background-color` / `border-color` only — no `background-clip: text`, no multi-stop sweeps. An accent is rationed: a single emphasized run, an eyebrow, a chart series, one CTA. Never a wash behind body copy.

**Static imagery** carries the atmospheric weight the background washes used to. Per-surface image assignment, framing, and scrim rules are owned by [`visual-guide.md`](./visual-guide.md) §Imagery.

### 7.6 Components

Moved to [`components.md`](./components.md). Each component there lists the semantic tokens it consumes (from §7.4), which surfaces use it, its variants, and its states.

