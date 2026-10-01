<!-- Snapshot of TIS/brand/visual-guide.md — do NOT edit here. Edit upstream in brand/ and resync. -->

# TIS Visual Guide

Brand-identity reference for TIS — logo meaning, logo usage, Innovue co-branding, and name usage. Scope: the marketing website (front door: Sustain · Protect · License) and the Insights products — Patent Intelligence SaaS and Licensing Platform.

> For the visual system (colors, typography, motion, spacing, components), see [`design-tokens.md`](./design-tokens.md). For voice and copy rules, see [`brand-voice.md`](./brand-voice.md). This file scopes to brand-identity artifacts outside the token system.

---

## Mark & Meaning

The TIS mark is a monochrome isometric cube — strictly constructed at 30°/60°/90°, deliberately built and not rendered. It sits in the design language of tech infrastructure, developer tools, fintech, and architecture — sectors where solidity and systems-thinking are brand values. Four tenets explain why.

**Isometric build, shield read.** Every edge lands at 30°, 60°, or 90° — zero deviation, technical-drawing discipline. Yet the stance is a shield: IP is defensive (block the NPE, survive the letter) and offensive (license out, enter the market). One form, both postures.

**An open cube, not a sealed box.** A notch in the top face breaks the closed form — a container being built into, accessed, unlocked. TIS is not a black box. It invites you in.

**TIS, hidden in plain sight.** Negative space carves *T*, *I*, *S* into the faces — a monogram within the mark. Casual viewers see a cube; attentive viewers find the brand already embedded in its geometry.

**A Rubik's cube, solved.** The geometry hints at rotation and combinatorial complexity — the IP landscape itself. The promise isn't that the cube is simple; it's that TIS turned the faces into alignment for you.

**Personality signals.**

- **Precision** — tight angles, no curves, mathematical construction.
- **Depth** — literally and metaphorically; layers beneath the surface.
- **Structural confidence** — the cube is a universal symbol of building, stability, containment.
- **Modern minimalism** — no gradients, no effects, pure geometry.

Use this framing when writing brand decks, pitch narratives, or any surface that needs to explain *what the mark is for*. Spec-level usage rules follow.

---

## Logo Usage

### Variants

Stored in `brand/assets/logos/tis/`.

| Variant | File | When to use |
|---|---|---|
| **Primary** | `tis_primarylogo_dark.svg` / `tis_primarylogo_light.svg` | Carries "Powered by Innovue" in the artwork, so it is used **only where Innovue is the credited partner** — Insights report covers, Insights product decks, SABCD / Licensing / Signal collateral. Not on front-door surfaces (§Partner Credit by Pillar). Deck cover construction → [`presentations.md`](./presentations.md) §3 |
| **Secondary** | `tis_secondarylogo_{dark,light}_ch.svg` · `SecondaryLogo_Eng_{Dark,Light}_MRO.svg` (EN, front door) · `tis_secondarylogo_{dark,light}_eng.svg` (EN, non-MRO) | **The front-door mark** — website chrome, Home / pillar / About pages, AUSA deck cover and leave-behind, business cards, email signature, letterheads, booth. Also tighter contexts where the Submark alone is too quiet. Choose `_ch` or `_eng` by surface language — never paired together at this tier. Detail in §Secondary below. |
| **Submark** | `tis_cubelogo_submark_dark.svg` / `tis_cubelogo_submark_light.svg` | Space-constrained or secondary: favicon, social profile, mobile-drawer header, report headers/footers, watermarks, product-app top nav (SaaS / Licensing Platform). |

**Minimum submark size:** 24px. Do not stretch, recolour, rotate, or add effects to any logo.

**Top nav header — per surface:**

| Surface | Mark | Why |
|---|---|---|
| Marketing website (above `sm` 640px) | Secondary, single-language by `lang` (`_ch` for `zh-Hant`, `SecondaryLogo_Eng_*_MRO` for `en`) at logo height 28px | First-touchpoint brand surface — the wordmark earns its keep; the cube alone reads as too quiet at site scale. |
| Marketing website (below `sm` 640px) | Submark at 32×32 | The eng wordmark won't fit alongside the controls cluster on narrow viewports; the cube falls back cleanly. |
| Patent Intelligence SaaS · Licensing Platform | Submark at 32×32 | App chrome stays compact; the cube is the navigation identity, page header / breadcrumbs supply context. |
| Mobile drawer header | Submark at 24×24 | Drawer header is space-constrained regardless of surface. |

Implementation in [`components.md`](./components.md) §Top nav.

### Secondary

**Form.** Cube + single-language wordmark. CH wordmark = `泰然策略` (the on-mark short form from §Name Usage). EN wordmark is set inside the `_eng` SVG. No "Powered by Innovue" line; no bilingual stack.

**EN MRO variant.** `SecondaryLogo_Eng_Dark_MRO.svg` (dark ink, for light backgrounds) and `SecondaryLogo_Eng_Light_MRO.svg` (light ink, for dark backgrounds), viewBox 1702.49 × 167.59. Since 2026-09-30 it is the EN front-door Secondary — website top nav and About hero. The dark theme uses the `_Light_` file; never invert or recolour the `_Dark_` file to get it. No CH MRO variant exists — Chinese surfaces keep `_ch`. The non-MRO `_eng` files stay for contexts not yet moved over.

**When to use.** Surfaces where the Primary lockup is too heavy and the Submark alone is too quiet — section headers inside long documents, slide footers and section dividers, secondary marketing surfaces, product-page chrome below the top nav, repeating watermarks where wordmark presence still matters. **Since 2026-09-28 it is also the front-door first-touch mark** (per §Partner Credit by Pillar) — the Primary is reserved for Innovue-credited contexts.

**Why split CH and EN at this tier.** The Primary lockup carries both scripts plus Innovue credit because first-touch surfaces have room for the full identity. The Secondary mark earns its keep at smaller sizes and tighter spaces — bilingual stacking compresses to illegibility, and most secondary surfaces have a single language register anyway. Pick by surface: Chinese-primary pages, decks, and Taiwan-facing collateral take `_ch`; English-primary surfaces take `_eng`. Never composite the two at this tier — that's the Primary's job.

**Innovue pairing.** Deferred. Primary carries "Powered by Innovue"; Submark uses the §Innovue Co-Branding divider+logo lockup. Whether Secondary can pair with Innovue (and how) is **TODO** — flagged for resolution before the marketing site needs co-branded secondary placements.

### Favicon by background

The favicon must render correctly against the browser chrome / OS theme without page-level context. Use the submark files, picked by `prefers-color-scheme` so the mark always contrasts with its surroundings.

| Context | File | Rationale |
|---|---|---|
| Light browser chrome / OS theme | `tis_cubelogo_submark_dark.svg` | Dark-ink mark reads against a light background |
| Dark browser chrome / OS theme | `tis_cubelogo_submark_light.svg` | Light-ink mark reads against a dark background |
| Legacy fallback (non-SVG) | 32×32 PNG exported from the light-context SVG | Covers browsers that ignore `prefers-color-scheme` on `<link>` |

Drop-in HTML — include in the `<head>` of every page; no page-level context required:

```html
<link rel="icon" type="image/svg+xml" href="/brand/assets/logos/tis/tis_cubelogo_submark_dark.svg" media="(prefers-color-scheme: light)" />
<link rel="icon" type="image/svg+xml" href="/brand/assets/logos/tis/tis_cubelogo_submark_light.svg" media="(prefers-color-scheme: dark)" />
<link rel="icon" type="image/png" sizes="32x32" href="/brand/assets/logos/tis/tis_cubelogo_submark_32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/brand/assets/logos/tis/tis_cubelogo_submark_180.png" />
```

Paths above assume the site serves `brand/assets/logos/tis/` from the web root; adjust per deployment. The 32×32 and 180×180 PNGs are not yet generated — export from the dark SVG when needed.

### Open Graph / Social share image

The dark-surface 1200×630 card platforms render when `tisglobalinc.com` is shared on LinkedIn, X, Slack, WhatsApp, Discord, iMessage, Facebook, Pinterest. Referenced via `og:image` and `twitter:image` meta tags in `website/index.html`.

**Asset.** [`brand/assets/imagery/og.png`](./assets/imagery/og.png) — 1200×630 PNG, dark surface (`#252525`). Mirrored read-only at `website/designs/assets/imagery/og.png` (served from `https://tisglobalinc.com/designs/assets/imagery/og.png`).

**Source.** Rendered from [`brand/catalog/imagery-preview.html`](./catalog/imagery-preview.html) §6 via Chrome headless `?og=2b` query param. The §2 cool-signal `.hero` is cloned in by JS so the OG card stays in visual sync with the homepage hero pattern.

**Composition.** §2 cool-signal `.hero` cloned in as backdrop; cool radial wash overridden to top-down silver-luminous gradient (`slate-200 → slate-300 → transparent at 65%`). White two-line headline (**stale** — the shipped card reads `Turn IP into market position, / grounded in 170M patents`, an old tagline and the retired 170M figure; re-render with the Sustain · Protect · License line and no database figure when the site is restructured) left-anchored, vertically centered. Co-branded TIS|Innovue lockup beneath per [§Co-Branded Lockup](#co-branded-lockup) (**also stale** — the homepage card is a front-door surface and re-renders TIS-only per §Partner Credit by Pillar), **with an OG-tightened clear-space of `2cqw` each side of the divider** (vs the default minimum of submark-height) to fit the card's constrained vertical space. Submark and Innovue both rendered at `5cqw` height (peer weight).

**Per-surface variants (TODO).** Currently a single homepage variant. LinkedIn supports a separate 1200×628 size; product-pages, pricing, and report-pages may eventually want their own copy. Add siblings to `brand/assets/imagery/` as `og-{surface}.png` and update `website/index.html` to reference the per-page version (either inline per-page meta tags or JS-injected `<meta>` rewrites).

### Profile avatars (socials)

The small, circle-cropped identity slot — used on any social platform where TIS maintains a profile. This is where the submark earns its keep: a primary logo read at 48×48 loses its wordmark and dies. The submark does not.

**Rules.**

- **Use the submark only.** The primary logo never goes in a social avatar slot — it reads as texture, not a mark.
- **Square source file.** Export square; every platform applies its own circle or rounded mask. Leave the platform to crop.
- **Safe area: 20% inset.** The cube sits inside the centre 60% of the canvas so a circle crop cannot clip an edge.
- **Background is part of the mark.** Two approved backgrounds only: `#FAFAFA` (`surface-secondary`) with `tis_cubelogo_submark_dark.svg`, or `#252525` (ink) with `tis_cubelogo_submark_light.svg`. No gradients, no photography, no partner co-branding — that is the homepage strip's job, not the avatar's.
- **One brand, one avatar.** Use the same avatar across every TIS social presence. Team members link back to the company avatar through their own headshots, not through variant marks.

**Export sizing.** 400 × 400 square is the default — large enough to stay crisp after any platform's downscale, and above every common avatar display size. Minimum rendered size is the 24px submark rule in reverse: if a platform displays smaller than 24px at any breakpoint, the avatar is still the submark — do not substitute a simplified variant.

---

## Iconography

Icons are geometry, not illustration — they carry the same precision as the TIS cube mark. Size tokens and stroke rules: [`design-tokens.md`](./design-tokens.md) §7.2 *Iconography*.

### Style

- **Outline, not filled.** Strokes on transparent fills. Filled variants exist only for binary-state toggles (bookmark on / off, notification on / off) where the filled form is the semantics.
- **1.5px nominal stroke.** Thin enough to read at 16px, heavy enough to hold at 32px+. Rounded linecaps and joins — softens the architecture without adding flourish.
- **24px grid, 2px minimum padding.** Every icon sits in a 24×24 box with ≥ 2px clear on each edge; the optical form lives inside 20×20.
- **`currentColor` only.** Icons inherit the text token of their container. Never hard-coded hex. Status / signal colors apply only when the icon *is* the status carrier (destructive trash, success check).
- **No shadows, no gradients, no multi-weight treatment.** Same mono-line discipline as the logo.

### Library

**Primary source: [Lucide](https://lucide.dev).** ISC-licensed, 24px native grid, geometric-humanist construction that sits cleanly next to Urbanist. Pull from `lucide-react` (or the SVG distribution) and override the default 2px stroke to 1.5px globally.

Do not mix libraries. Mixing Lucide with Phosphor, Heroicons, Material, or Font Awesome produces visible stylistic drift at small sizes and breaks system coherence.

### Approved set

Curated SVGs live in three purpose-scoped subfolders, all pulled from Lucide and committed under canonical Lucide names (no aliasing), canonical 2px stroke preserved at file level. The 1.5px global override is a per-consumer CSS choice (`stroke-width: 1.5`); don't pre-modify the SVGs. All sets share the same style discipline above — the split is a routing convention, not a stylistic divergence.

**UI set** — [`brand/assets/icons/ui/`](./assets/icons/ui/). Interaction affordances consumed by [`components.md`](./components.md).

| Group | Icons |
|---|---|
| Navigation | `chevron-up` · `chevron-down` · `chevron-left` · `chevron-right` · `more-horizontal` |
| State | `x` · `check` · `check-circle` · `alert-triangle` · `x-circle` · `info` |
| Action | `search` · `calendar` · `upload` · `menu` · `log-out` · `globe` · `maximize-2` · `file-text` · `sparkles` |

**Presentation set** — [`brand/assets/icons/presentation/`](./assets/icons/presentation/). Concept carriers consumed by [`presentations.md`](./presentations.md) §Card image presets §Icon. Curated against the TIS pillars (licensing × jurisdiction, patent intelligence) and audience tones rather than UI chrome.

| Group | Icons |
|---|---|
| IP & Legal | `shield` · `shield-check` · `scale` · `lightbulb` · `book-marked` · `vault` · `fingerprint` · `file-lock` |
| Strategy | `target` · `trending-up` · `trending-down` · `swords` · `route` · `milestone` · `git-branch` · `radar` |
| Geography | `globe` · `map` · `map-pin` · `flag` · `compass` · `plane` · `waypoints` · `earth` |
| Audiences | `building-2` · `factory` · `users` · `warehouse` · `rocket` · `circle-user` · `handshake` · `landmark` |
| Data | `database` · `layers` · `network` · `chart-bar` · `chart-line` · `chart-pie` · `gauge` · `boxes` |
| Commerce | `coins` · `banknote` · `wallet` · `credit-card` · `receipt` · `package` · `key-round` · `activity` |

**Industry set** — [`brand/assets/icons/industry/`](./assets/icons/industry/). One glyph per Licensing-Platform patent-bundle domain — a fixed, closed set of exactly six (not a growing library). Consumed by the licensing surface wherever an industry is named (bundle picker, scope recap, cart, license detail/list, browse cards). `layers` also appears in the Presentation set's Data group; it is duplicated here so the six-industry mapping is documented as one coherent set.

| Domain (ZH / EN) | Icon |
|---|---|
| 晶片半導體 / Chip & Semiconductor | `cpu` |
| 網路與通訊 / Networking & Communications | `satellite-dish` |
| 淨零碳排 / Net Zero | `leaf` |
| 計算機系統 / Computing Systems | `circuit-board` |
| 綜合應用 / Integrated Applications | `layers` |
| 多媒體影音 / Multimedia | `audio-lines` |

Each icon ships at Lucide's native 24×24 viewBox with `stroke="currentColor"`. Status / signal colours apply via the consuming component, not at file level.

### Adding a new icon

1. Confirm Lucide has a clean match at [lucide.dev](https://lucide.dev). If it doesn't, see §Custom Icons below — don't reach for a different library.
2. Download the SVG and commit to `brand/assets/icons/<set>/<name>.svg` (where `<set>` is `ui` for interaction affordances, `presentation` for deck concept carriers, or `industry` for the closed six-glyph bundle-domain set) under its exact Lucide name. No aliasing, no re-export.
3. Update the matching Approved-set table above (UI set, Presentation set, or Industry set).
4. Log the addition in [`brand-changelog.md`](./brand-changelog.md) under the `## visual-guide.md` section.

### Custom Icons — deferred post-MVP

For MVP, **Lucide is the only icon source.** Do not draw custom icons. If a concept has no Lucide match, solve it another way:

- **Type-led affordance.** A letter or abbreviation inside a chip or pill handles most identity markers — SABCD grades render as `A`/`B`/`C`/`D` inside [Status chip](./components.md); no icon needed.
- **Closest generic with explicit label.** If the closest Lucide icon is near-but-not-perfect (e.g., `coins` for "tokens"), use it with a clear text label alongside. Ambiguity is absorbed by the label, not by the icon.
- **The Verified License Badge is the canonical "verified" mark.** No separate "verified" icon is required.

Custom-icon commissioning reopens once the three MVP surfaces ship. Any candidate then follows the library rules (24px grid, 1.5px stroke, rounded linecaps, `currentColor`, SVG only) and lands only after design-director review — each custom icon is a long-term maintenance commitment and a stylistic precedent.

### Data Visualization

> **TODO (pending PRD):** This section is the Patent Intelligence SaaS blocker. Needs: SABCD grade visual system (chip vs. full card vs. color coding against status tokens or a new scale), patent family tree layout (node / edge / hierarchy), citation network map (forward/backward encoding), work-around diagram, chart primitives (bar / line / area / distribution) with a palette that extends the neutrals + status pairings rather than introducing raw hex. Paired token additions land in [`design-tokens.md`](./design-tokens.md) §7.2 (chart palette) and §7.4 (SABCD semantic tokens).

### Export and File Structure

| Use | Format | Source |
|---|---|---|
| Product surfaces (website / Patent Intelligence SaaS / Licensing) | `lucide-react` components (primary) or inline SVG | npm package |
| Static marketing / print / pitch decks | SVG exported at intended size | derived from Lucide on demand |
| Brand documentation examples | Inline SVG in HTML / MD | derived on demand |

Naming follows Lucide's own names — don't rename or alias icons at import.

### State Variations

Icons carry no state of their own. States live on the consuming component (button hover, disabled input, active nav item) and reach the icon through `currentColor` inheritance. Exceptions:

- **Toggle icons** — filled vs. outline as binary state (`star` vs. `star-filled`). Use only where binary state is the primary semantics.
- **Destructive intent** — the trash / delete icon may pair with `danger-fg` directly when surrounding UI does not already communicate destructive intent.

---

## Imagery

> **TODO (pending PRD):** Imagery standardization is unspec'd across all surfaces. Pending categories:
>
> - **Photography** — when photos appear (corporate / archival / abstract), treatment (mono / duotone / full colour), framing, sourcing.
> - **Generated / AI imagery** — policy (allowed or banned), house-style if allowed, content bans (faces, text-in-image), labelling.
> - **Illustrations** — positive marketing rule. Current rule is only the negative — see [`components.md`](./components.md) §Empty state.
> - **Product screenshots** — how Patent Intelligence SaaS / Licensing Platform UI is rendered in marketing and decks (frame chrome, annotation, mockup vs real device).
> - **Gradients** — **retired 2026-08-06.** Replaced by static imagery + one flat accent per surface; see §Surface identity below and [`design-tokens.md`](./design-tokens.md) §7.5. Not a pending category any more.
> - **Patterns / textures / backgrounds** — geometric patterns, dotted grids, ink washes; generalize the deck-cover hero-cube precedent ([`presentations.md`](./presentations.md) §Cover) and define report / client-PDF cover treatments.
> - **Maps (jurisdiction)** — geographic visuals for Licensing Platform jurisdiction × industry bundles; currently zero spec.
> - **Non-data diagrams** — flowcharts, architecture, process diagrams. Distinct from the SaaS data-viz blocker tracked in §Iconography → Data Visualization above.
>
> OG / social-share image spec is flagged separately under §Logo Usage. SABCD grade visual system and patent-network maps remain in §Iconography → Data Visualization above.

### Surface identity — static imagery + one flat accent

**Gradients were retired 2026-08-06.** Surface identity is now carried by a **static image** plus **one flat accent**: the image evokes the colour, the accent states it. This replaced the `theme × style` gradient system (silver / warm / cool / bronze × solid / faded / luminous). Token spec: [`design-tokens.md`](./design-tokens.md) §7.5.

Why: gradients had become a second, parallel colour system — 181 declarations in the marketing stylesheet — that drifted from what actually shipped and taught every new session to reach for a sweep instead of a considered flat colour. Imagery does the atmospheric work better and survives a screenshot, a print, and a dark-mode flip without re-tuning.

| Surface | Accent | Imagery |
|---|---|---|
| **TIS overall** — front door (Home, Sustain, Protect, License, Ecosystem, About), hero, global chrome | Neutral ink `--surface-accent-tis`. Silver register available as flat `--slate-700` / `--slate-200`. | The WebGL shifting-lines shader on the homepage hero; black image-backed cards elsewhere. TIS speaks in ink, not in a colour of its own. |
| **Patent Intelligence SaaS** *(Insights)* | `--surface-accent-signal` `#0EA5E9` on dark; `--surface-accent-signal-text` `#0A72B0` on light | Blue-register stills — `assets/imagery/signal/signal-cool.jpg` is the reference. |
| **Licensing Platform** *(Insights)* | `--surface-accent-licensing` `#EC4200`; `--surface-accent-licensing-text` `#D93B00` on light | Orange-register stills — `assets/imagery/coremap/licensing-warm-v2.png` is the reference. |

**Services · Ascent / Brokerage removed.** The bronze theme existed only for those surfaces. The bronze ramp is retired in `design-tokens.md` §7.2. The Sustain · Protect · License pillars ([`positioning.md`](./positioning.md) §2) speak in TIS-overall neutral ink; no new pillar accents are defined.

**Don't cross-cast.** A surface's accent is its identity — Signal surfaces don't carry orange, Licensing surfaces don't carry blue. Neutral ink is the only register that speaks across surfaces, and it's reserved for TIS-overall.

**Ration the accent.** Flat `color` / `background-color` / `border-color` only. One emphasized run, an eyebrow, a chart series, one CTA — never a wash behind body copy, and never a multi-stop sweep. Check the contrast note in §7.5 before placing `#0EA5E9` on a light surface: it fails AA there.

Canonical implementation: [`../website/index.html`](../website/index.html) — shader hero, ink chrome, black image-backed cards. Per-surface accent usage on the product pages under `../website/product/`.

---

## Partner Credit by Pillar

**Replaces the First Touchpoint Rule (2026-09-28).** Partner credit follows the **pillar a surface speaks for**, not whether it is a first touch. There is no blanket "Powered by Innovue" rule: each partner is credited where its work is, and nowhere else. Positioning source: [`positioning.md`](./positioning.md) §2, §7.

| Surface | Partner credited | Form |
|---|---|---|
| **Front door** — Home, About, Ecosystem overview, `/ausa`, AUSA deck cover, leave-behind front, business cards, letterheads, booth | None in the mark | **Secondary** logo, TIS only. Partners are named in prose next to the pillar they serve. |
| **Sustain** (MRO and sustainment) | **Suntek Group / PG Union** (service capacity); **FairTech** (capability lifter, trainer) | Names in text. **Logos: not used — open.** |
| **Protect** (patent consulting) | **Innovue** (database and analytics) | Name in text; §Co-Branded Lockup allowed where the claim is the database. |
| **License** (UAV portfolio + licensing services) | **Innovue** (portfolio co-applicant) | Name in text; §Co-Branded Lockup allowed on the portfolio block. |
| **Insights** (SABCD, Licensing Platform, Patent Intelligence SaaS, reports) | **Innovue** | "Powered by Innovue" — Primary logo, §Co-Branded Lockup, footer lockup, as before. |
| **Product UI** (license.tisglobalinc.com, Signal app) | **Innovue** | "Powered by Innovue" credential, unchanged. |

**Rules**

- **"Powered by" is Innovue-only and Insights / product-UI-only.** Never "Powered by Suntek", "Powered by FairTech", or "Powered by" on a front-door or Sustain surface.
- **Never merge partners.** On pages that span pillars (Home, Ecosystem, the AUSA deck), each partner sits beside its own pillar. No single "partners" row implying every partner stands behind every service.
  - **The homepage ecosystem diagram and partner introduction** (sheet v0.5) may show all three partners in one figure, because each sits in its own labelled layer: service capacity = Suntek Group / PG Union, capability lifting = FairTech, IP services = TIS × Innovue. They feed TIS as orchestrator, which delivers Sustain · Protect · License.
  - The TIS × Innovue patent portfolio sits in a **dashed frame**, as a separate asset (the separation rule, `positioning.md` §2).
  - Names in text only. No partner logos, and no Innovue lockup on the front door.
- **Footer.** Front-door pages carry the TIS submark alone in the footer; the TIS|Innovue footer lockup stays on Insights pages ([`components.md`](./components.md) §Footer).
- **Service-partner logos** (Suntek Group, PG Union, FairTech) are **not used** until approved. Names are cleared; logos are an open item.
- **FairTech** is named as trainer and maintenance specialist only — never as a UAV maker, and its own products never appear.

When-to-apply logic in copy: [`brand-voice.md`](./brand-voice.md) §7.

## Innovue Co-Branding

Innovue is a visible technology partner, **shareholder**, and co-applicant on the TIS × Innovue UAV patent portfolio — not a hidden technology layer, and not a partner in the Sustain (MRO) services. *Where* Innovue is credited is governed by §Partner Credit by Pillar above; this section governs *how*.

- **Logo-lockup credit text:** "Powered by Innovue" — no variations. Travels with the co-branded *mark* on Insights and product-UI surfaces only.
- **Narrative attribution:** on Protect and License, prose names Innovue as **technology partner** (database) and **UAV-portfolio co-applicant**. Co-developer-of-SABCD framing is allowed on the SABCD pages under Insights only.

Innovue's role in the positioning: [`positioning.md`](./positioning.md) §7.

### Co-Branded Lockup

For Innovue-credited placements (Protect, License, Insights, product UI — per §Partner Credit by Pillar): **TIS Submark** + thin vertical divider + **Innovue Logo**.

```
[TIS Submark]  |  [Innovue Logo]
```

### Spacing Rules

| Rule | Spec |
|---|---|
| Divider height | ~80% of TIS Submark height, centred vertically |
| Clear space (each side of divider) | Equal to TIS Submark height — minimum |
| Innovue logo height | Visually balanced with TIS Submark — optical weight, not pixel match |
| Minimum lockup size | TIS Submark no smaller than 24px |

**Surface-specific overrides.** The default optical-balance rule covers in-product chrome, header lockups, and pitch-deck content slides where Innovue is *present* alongside TIS. Two surfaces deliberately over-weight Innovue because attribution is the point of the placement, not just a credit:

| Surface | Override | Source |
|---|---|---|
| Marketing footer (Insights pages only) | Innovue 36px tall × 172px wide against the 32px TIS submark — Innovue reads dominant; the lockup *is* the "Powered by Innovue" attribution for the page | [`components.md`](./components.md) §Footer |
| Pitch-deck content-slide footer (Insights decks only) | Innovue logotype targeted at 40px (~1.25× submark height) for projection legibility | [`presentations.md`](./presentations.md) §3 Footer |

A third override — distinct in kind, not size — applies to the **Open Graph card**: clear-space each side of the divider is tightened from the submark-height default to `2cqw` (~24px) to fit the card's constrained vertical space. Innovue stays at peer weight (no over-weighting). See §Open Graph / Social share image above.

### Innovue Logo Variants

Stored in `brand/assets/logos/partners/innovue/`.

| File | Use |
|---|---|
| `Innovue_Logo_Blue.svg` | Default — all light-background co-branded placements |
| `Innovue_Logo_Dark.svg` | Light backgrounds where colour cohesion with TIS palette requires it |
| `Innovue_Logo_Light.svg` | Dark backgrounds |

---

## Collaborator Partners

Distinct tier from Innovue and from the service partners. Collaborators (institutional patent sources) are **materially involved** in specific Insights deliverables and credited only in those contexts.

**Current collaborators:**

| Partner | Full name | Role |
|---|---|---|
| **ITRI** | Industrial Technology Research Institute ([itri.org.tw](https://www.itri.org.tw/english/index.aspx)) | Taiwan's largest applied-research institution. Patent source on the Licensing Platform; potential co-author on deep-technology reports. |
| **III** | Institute for Information Industry ([iii.org.tw](https://www.iii.org.tw/en)) | Taiwan's ICT-focused research institution. Patent source for ICT-domain bundles; potential co-author on information-industry reports. |

### Collaborator Logo Variants

Stored in `brand/assets/logos/partners/`.

| Partner | File | Use |
|---|---|---|
| ITRI | `itri/itrilogo.svg` | Primary — all contexts |
| III | `iii/logo_iii_dark_en.svg` | Primary — all contexts (English) |

### Where Collaborator Logos Appear

| Surface | ITRI / III use |
|---|---|
| Homepage partner strip | Always — monochrome, return to own brand colour on hover |
| Licensing Platform pages | When the partner is the IP source for bundles on the page |
| Bundle detail pages and Verified License Badges | When the partner is the issuing institution for licensed patents |
| Co-published reports (covers + footers) | When the partner is a named co-author or data source |
| Pitch decks / investor materials | Partnership slide only — shows Taiwan institutional alignment. Construction → [`presentations.md`](./presentations.md) §2 (Partner-strip closer layout) |
| Verified License Badge on customer surfaces | When the partner is the IP source for the licensed patents (see §Verified License Badge below) |
| General marketing / non-Licensing-Platform pages | Not used |
| Transactional emails, in-product chrome | Not used |

### Sizing

- **On the homepage partner strip:** ITRI, III, and Innovue render at **equal height** — peers on the row. Hierarchy comes from context, not size. For container styling, see [`components.md`](./components.md) §Partner strip.
- **Everywhere else:** collaborator logos optically balance with the nearest TIS submark or Innovue logo. Never larger than TIS or Innovue on the same surface.

### Rules

- **"Powered by" phrasing is Innovue-only.** Never apply to ITRI or III.
- **Use only the supplied variants.** No recolouring, cropping, or redrawing.
- **Collaborator credit requires a specific engagement context.** Do not use logos as generic "endorsement" decoration.
- **Get approval before using a collaborator logo on a new public-facing surface.** Each partner has their own identity guidelines to respect.

---

## Verified License Badge

A co-branded credential TIS issues to licensees, analogous to CE / UL marks. The canonical form is a **certificate card**: the TIS issuer seal and credential line above, and beneath it a tray holding one seal for each institution whose patents the licence covers. Visual implementation (seal construction, card dimensions, expired state): [`components.md`](./components.md) §Seal · Standalone and §Verified License Badge. This section owns identity: what goes in, how it pluralises, what each seal carries.

**Form factor.** Certificate card, light-locked: it does not invert in dark mode and uses no theme tokens. The credential reads as a stamped artifact wherever it lands: screens, packaging, exhibition boards. Reference lane is the certification plaque (UL Listed, an appellation neck label, a museum accession plate). Rank is carried by structure: TIS sits alone above the rule with the statement beside it, and the suppliers are listed below a label.

**Content.**

- **Issuer zone.** The TIS seal, plus the credential line `已驗證授權` / `VERIFIED LICENSE` and the validity date beside it.
- **Tray.** Label `專利授權來源` / `LICENSED PATENTS FROM`, then one supplier seal per patent-source institution on the licence, three to a row.
- **Every seal carries three things:**
  - its institution's own primary colour
  - its initials in white at the centre
  - its full registered name on the top arc, with the validity line on the bottom arc

**Each seal carries its licensor's primary colour.** The colour is the institution's own, taken from a published or supplied brand source and recorded in [`components.md`](./components.md) §Seal · Standalone. It is never a TIS palette colour and never adjusted for contrast.

**Top-arc strings per seal** (rendered exactly; the source of truth for `textPath` content):

| Seal | ZH | EN |
|---|---|---|
| TIS issuer | 泰然策略解密 | `TALENT INTELLIGENCE STRATEGIES` |
| NCKU | 國立成功大學 | `NATIONAL CHENG KUNG UNIVERSITY` |
| NYCU | 國立陽明交通大學 | `NATIONAL YANG MING CHIAO TUNG UNIVERSITY` |
| NTU | 國立臺灣大學 | `NATIONAL TAIWAN UNIVERSITY` |
| III | 資訊工業策進會 | `INSTITUTE FOR INFORMATION INDUSTRY` |
| ITRI | 工業技術研究院 | `INDUSTRIAL TECHNOLOGY RESEARCH INSTITUTE` |
| NTHU | 國立清華大學 | `NATIONAL TSING HUA UNIVERSITY` |

When a new institution onboards, add its registered legal name (ZH and uppercase EN) and its sourced colour before any seal renders. Acronyms appear only as the centre initials, never on the arc: the full name carries the institutional weight.

**Content formats**

- **Validity date.** Generated by the licensing engine from the licence expiry in Asia/Taipei, never typed. Written `YYYY.MM.DD` on the badge: `有效期至 2027.07.27` / `Valid through 2027.07.27`, and on each seal's bottom arc `已驗證授權 · 有效期至 2027.07.27` / `VERIFIED LICENSE · VALID THROUGH 2027.07.27`. **Open:** this departs from [`brand-voice.md`](./brand-voice.md) §6, which requires ISO `YYYY-MM-DD` for credentials. The adopted workbook seal and the live card both use dots. Resolve by adding a badge exception to §6 or by moving the seal to hyphens.
- **No licence number, patent count or QR** on the badge. Those live on the licence detail and verification pages.

**Construction rules**

- One seal construction for every issuer (Direction 1, "Medium · larger initials", workbook `website/assets/badges/badge-preview.html`). Institutions differ only in colour, initials and name.
- No submark on the seal. The centre is type.
- "Powered by Innovue" does not appear on the badge. The badge credits the patent-source institution, not the technology platform.

### Combined badges (multiple suppliers)

The certificate card IS the combined form. A licence with one supplier and a licence with six share one card; there is no separate single-supplier variant.

**Layout rules.**

- **Two zones, one rule.** The issuer zone sits above a hairline and the tray sits below it. Supplier seals are peers under TIS: equal size, no dividers between them.
- **Fixed supplier order.** `NCKU → NYCU → NTU → III → ITRI → NTHU`, filtered to the suppliers present. The order is set by colour separation (closest adjacent pair ΔE 30.1). It is not issuance, alphabetical or patent-count order; any of those would put NTU next to NCKU or NYCU next to III.
- **The card grows downward only.** It is always 380 wide, with three seals per row. Six institutions exist today, so the card has at most two rows. The height formula carries on for more rows if more institutions onboard.
- **No suppliers.** The card collapses to the issuer zone alone.

**Anti-counterfeit.** Bound to the badge as a whole at generation. Lapsing the licence invalidates it, and the verification page reflects the state at lookup time. Server-side; not a visual spec.

### Surfaces

| Surface | Format |
|---|---|
| Website footer / product page | Digital PNG/SVG with embedded verification link |
| Exhibition booth | High-resolution print (PDF/AI) for backdrops, tabletop signs |
| Marketing collateral | Embedded in catalogs, brochures, company profiles |
| Product packaging / labels | Small-format badge (CE/UL-style), 100 px seal floor |

### Lifecycle

- **Active** — auto-generated on license purchase; auto-updates on renewal.
- **Expired** — the card turns greyscale with a red `EXPIRED` stamp beside the issuer seal, and supplier initials stay uncovered. Construction in [`components.md`](./components.md) §Verified License Badge.
- **Anti-counterfeit** — invisible watermark embedded at generation; the TIS verification page shows real-time status and authorized scope.

For copy attribution rules, see [`brand-voice.md`](./brand-voice.md) §7.

---

## In Real Life (In Process)

Physical and offline brand surfaces — anywhere TIS appears outside a screen. Placeholder section; specs land as each surface is commissioned. Until then, the digital construction rules above (logo variants, co-branding lockup, badge construction, name usage) translate one-to-one into physical media.

| Surface | Pending |
|---|---|
| **Convention booths** | Backwall, header banner, table runners, tabletop signage. Aspect ratios for common booth sizes (3×3m, 6×3m), TIS submark scale relative to booth height, partner credit per §Partner Credit by Pillar (a Sustain-led booth such as AUSA carries no Innovue lockup on the backwall), Verified License Badge surfacing, partner-logo treatment on side panels. |
| **Signage** | Office plaques, doorway, conference / event wayfinding. Monochrome vs. colour rules per environment, substrate options (acrylic / metal / vinyl), minimum mark sizes for sightlines. |
| **Stationery** | Business cards, envelopes, notepads, folders. Paper stock, ink (spot black vs. CMYK), bleed and safe area, how the cube mark anchors each format. |
| **Letterheads** | Cover letters, contracts, MOUs, formal correspondence. Header: TIS Secondary logo (front-door mark, no partner credit), footer with full legal name (per §Name Usage), margins, font fallbacks for Word / Google Docs templates. |
| **Merchandise** | T-shirts, totes, notebooks, stickers, event swag. Which mark variant per item (submark on small items / primary where there is room), monochrome vs. inverse on dark substrates, minimum sizes after embroidery / screen-print. |

Until each row is spec'd, defer to: §Logo Usage (variants, minimum sizes, no recolour / stretch), §Partner Credit by Pillar and §Innovue Co-Branding, §Collaborator Partners (when ITRI / III appear), §Verified License Badge (when the badge appears on a physical surface), §Name Usage (which name form on which document).

---

## Name Usage

| Form | Chinese | English | Use |
|---|---|---|---|
| Full legal name | 泰然策略解密股份有限公司 | Talent Intelligence Strategies MRO Global Inc. | Legal documents, and the seller-identity block published for payment-gateway verification |
| Trade name | 泰然策略解密 | — | Formal trade documents |
| Logo mark | 泰然策略 | — | On-mark only |
| Verbal shorthand | 泰然 | Talent Intelligence Strategies | First reference, formal docs, footer |
| Acronym | — | TIS | Primary short-form across all English touchpoints |

**Where the full legal name is used publicly.** Two surfaces, both for the same reason — a
reader is being asked to identify the legal person they are dealing with:

1. **The seller-identity block** on the Signal intake panel. A payment gateway matches the
   name it is shown against the name on the UBN's registration; the verbal shorthand would
   state a name the registration does not carry.
2. **Terms of Service, Privacy Policy and Disclosures.** These are legal documents by
   definition, and each opens by naming the contracting entity.

Everywhere else the shorthand still applies, footer included.
