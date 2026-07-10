# TIS Visual Guide

Brand-identity reference for TIS — logo meaning, logo usage, Innovue co-branding, and name usage. Scope: marketing website + Patent Intelligence SaaS MVP + Licensing Platform MVP.

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
| **Primary** | `tis_primarylogo_dark.svg` / `tis_primarylogo_light.svg` | First-impression contexts: pitch decks, report covers, business cards, email signature. Deck cover construction → [`presentations.md`](./presentations.md) §3 |
| **Secondary** | `tis_secondarylogo_{dark,light}_{ch,eng}.svg` | Wordmark presence in tighter contexts than Primary, where the Submark alone is too quiet. Choose `_ch` or `_eng` by surface language — never paired together at this tier. Detail in §Secondary below. |
| **Submark** | `tis_cubelogo_submark_dark.svg` / `tis_cubelogo_submark_light.svg` | Space-constrained or secondary: favicon, social profile, mobile-drawer header, report headers/footers, watermarks, product-app top nav (SaaS / Licensing Platform). |

**Minimum submark size:** 24px. Do not stretch, recolour, rotate, or add effects to any logo.

**Top nav header — per surface:**

| Surface | Mark | Why |
|---|---|---|
| Marketing website (above `sm` 640px) | Secondary, single-language by `lang` (`_ch` for `zh-Hant`, `_eng` for `en`) at logo height 28px | First-touchpoint brand surface — the wordmark earns its keep; the cube alone reads as too quiet at site scale. |
| Marketing website (below `sm` 640px) | Submark at 32×32 | The eng wordmark won't fit alongside the controls cluster on narrow viewports; the cube falls back cleanly. |
| Patent Intelligence SaaS · Licensing Platform | Submark at 32×32 | App chrome stays compact; the cube is the navigation identity, page header / breadcrumbs supply context. |
| Mobile drawer header | Submark at 24×24 | Drawer header is space-constrained regardless of surface. |

Implementation in [`components.md`](./components.md) §Top nav.

### Secondary

**Form.** Cube + single-language wordmark. CH wordmark = `泰然策略` (the on-mark short form from §Name Usage). EN wordmark is set inside the `_eng` SVG. No "Powered by Innovue" line; no bilingual stack.

**When to use.** Surfaces where the Primary lockup is too heavy and the Submark alone is too quiet — section headers inside long documents, slide footers and section dividers, secondary marketing surfaces, product-page chrome below the top nav, repeating watermarks where wordmark presence still matters. **Not a first-touchpoint variant.** First touchpoints stay Primary (per §Innovue Co-Branding → First Touchpoint Rule).

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

**Composition.** §2 cool-signal `.hero` cloned in as backdrop; cool radial wash overridden to top-down silver-luminous gradient (`slate-200 → slate-300 → transparent at 65%`). White two-line headline (`Turn IP into market position, / grounded in 170M patents`) left-anchored, vertically centered. Co-branded TIS|Innovue lockup beneath per [§Co-Branded Lockup](#co-branded-lockup), **with an OG-tightened clear-space of `2cqw` each side of the divider** (vs the default minimum of submark-height) to fit the card's constrained vertical space. Submark and Innovue both rendered at `5cqw` height (peer weight).

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
- **The TIS submark is the canonical "verified" mark.** The Verified License Badge already uses the submark; no separate "verified" icon is required.

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
> - **Gradients** — promoted out of pending. Pillar architecture (which theme belongs to which surface) resolved below in §Gradient architecture; style-tier when-to-use rules (solid / faded / luminous) below in same section; token spec + utility catalog in [`design-tokens.md`](./design-tokens.md) §7.2 + §7.5; visual reference in [`brand/previews/gradients-preview.html`](./previews/gradients-preview.html).
> - **Patterns / textures / backgrounds** — geometric patterns, dotted grids, ink washes; generalize the deck-cover hero-cube precedent ([`presentations.md`](./presentations.md) §Cover) and define report / client-PDF cover treatments.
> - **Maps (jurisdiction)** — geographic visuals for Licensing Platform jurisdiction × industry bundles; currently zero spec.
> - **Non-data diagrams** — flowcharts, architecture, process diagrams. Distinct from the SaaS data-viz blocker tracked in §Iconography → Data Visualization above.
>
> OG / social-share image spec is flagged separately under §Logo Usage. SABCD grade visual system and patent-network maps remain in §Iconography → Data Visualization above.

### Gradient architecture

Each gradient theme is the visual signature of a TIS surface or pillar — the colour family signals which part of the business is speaking. Use the theme assigned to the pillar; don't cross-cast.

| Surface | Theme | Notes |
|---|---|---|
| TIS overall — marketing, hero, global chrome | Silver | Off-pillar metallic neutral. Lets all four product lines and Services breathe under one roof; default for hero and global chrome where no single pillar is speaking. |
| Patent Intelligence SaaS | Cool | Emerald → sky → violet (A → B → C of the SABCD vivid palette). The analytical, diligence-grade pillar. |
| Licensing Platform | Warm | Gold → orange (S → D). Gold anchors the premium S-tier signal that licensing bundles trade on. |
| Services · Ascent program | Bronze | Lacquered bronze — solid text on bronze-faded bg. Assertive, headline-forward register for the 24-month consulting program. |
| Services · Brokerage | Bronze | Polished bronze — faded text on bronze-faded-up bg. Softer, supporting register for the rights-holder ↔ acquirer matchmaking surface. |

**Style tiers — when to use which.** Each theme renders in one of three style tiers; pick by surface register, not by aesthetic preference.

| Style | When to use | Surfaces |
|---|---|---|
| `solid` | Primary brand surfaces where the gradient itself is the headline. Vivid throughout, no pale entry — confident, deep, readable at hero scale. Default for hero text on light bg, faded-bg × solid-text pairings, and any surface where the gradient is being *read* as content. | Hero h1s, pillar landing headlines, faded-pair panel headlines |
| `faded` | Decorative gradient text where the type is large enough that a pale shimmer entry adds register without losing legibility. Pale entry → vivid resolve, left-to-right warm-up. Use when the surface is otherwise quiet (off-white bg, generous whitespace) and the headline can carry a soft entry. | Pillar section eyebrows + display heads, marketing aside heads, content-card overlays |
| `luminous` | **Silver only.** High-key slate ramp tuned for dark surfaces. Near-white shimmer entry resolving to soft slate — keeps silver text legible against `#0E0E0E` without lifting alpha. Don't use `luminous` on warm / cool / bronze; those themes don't have a luminous companion in §7.5 and would need a separate spec. | Dark-hero silver headlines, dark-mode display copy on the marketing site |

**Don't cross-cast.** A pillar's theme is its identity — Patent Intelligence SaaS surfaces don't carry warm gradients, Licensing Platform surfaces don't carry cool gradients. Silver is the only theme that can speak across pillars (because it represents *no single pillar*) and is reserved for TIS-overall surfaces.

The full token spec — CSS class names, exact stops, dot-field compositions, dark-mode counterparts — lives in [`design-tokens.md`](./design-tokens.md) §7.5. Visual reference: [`brand/previews/gradients-preview.html`](./previews/gradients-preview.html).

Canonical implementations on a live surface: [`../website/index.html`](../website/index.html) — silver on the hero, warm on `#products[data-pillar="licensing"]`, cool on `#products[data-pillar="intelligence"]`, bronze on the `#services` Ascent + Brokerage banners.

---

## Innovue Co-Branding

Innovue is a visible strategic partner and **shareholder** — not a hidden technology layer.

Innovue credit comes in two registers, scoped by surface (the hybrid rule):

- **Logo-lockup credit text:** "Powered by Innovue" — no variations. This is the credit that travels with the co-branded *mark* (header lockups, marketing footer, in-product chrome, OG card). Use everywhere a lockup appears.
- **Narrative attribution (About / profile / first-touch marketing only):** in *prose* on these surfaces, Innovue may be credited as **shareholder and co-developer of the SABCD rating engine** — e.g. "the patent-strength rating engine we co-developed with our shareholder Innovue." Do **not** extend co-developer framing into product UI or in-app chrome — those stay on the "Powered by Innovue" credential only.

When-to-apply logic for both registers: [`brand-voice.md`](./brand-voice.md) §7. Canonical positioning copy that uses the co-developer framing: [`positioning.md`](./positioning.md) §4.

### First Touchpoint Rule

On the first customer-facing touchpoint, use the **TIS Primary Logo**. Its lockup already includes "Powered by Innovue" — partnership credit is built in.

> Deck application: cover slide is a first-touchpoint surface. See [`presentations.md`](./presentations.md) §3 for cover construction; credit-when logic is in [`brand-voice.md`](./brand-voice.md) §7.

### Co-Branded Lockup

For all subsequent or space-constrained placements: **TIS Submark** + thin vertical divider + **Innovue Logo**.

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
| Marketing footer | Innovue 36px tall × 172px wide against the 32px TIS submark — Innovue reads dominant; the lockup *is* the "Powered by Innovue" attribution for the page | [`components.md`](./components.md) §Footer |
| Pitch-deck content-slide footer | Innovue logotype targeted at 40px (~1.25× submark height) for projection legibility | [`presentations.md`](./presentations.md) §3 Footer |

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

Distinct tier from Innovue. TIS is contractually **bound** to Innovue — "Powered by Innovue" credit always visible. Collaborators are **materially involved** in specific deliverables, credited only in those contexts.

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

A co-branded credential TIS issues to licensees, analogous to CE / UL marks. The current canonical form is a stadium-shaped pill that wraps the TIS issuer seal, one or more licensee seals, and a verification QR. Visual implementation (dimensions, tokens, light-lock construction): [`components.md`](./components.md) §Verified License Badge. This section owns identity — what goes in, how it pluralises, what each seal carries.

**Form factor.** Stadium pill (full `border-radius`), light-locked: it does not invert in dark mode. The credential is meant to read as a stamped artifact wherever it lands — on screens, packaging, exhibition boards — not as themed UI. Each constituent mark is a §Seal · Standalone at ×0.65, sized to keep the curved arc text legible.

**Content (left → right):**

- TIS issuer seal — top arc `TIS ISSUED VERIFIED LICENSE`, bottom arc `LIC-NNNNN`
- 1–N licensee seals — one per IP supplier on the credential, in issuance-ledger order; top arc carries the partner's standardized full registered name (table below), bottom arc carries that partner's patent count (`N PATENTS`)
- Verification QR — 72×72 square; license number (`LIC-NNNNN`) sits below in mono. Resolves to the TIS verification page.

**Top-arc strings per seal** (uppercase, rendered exactly — the source of truth for `tspan` / `textPath` content on the seal SVGs):

| Seal | Top arc |
|---|---|
| TIS issuer | `TIS ISSUED VERIFIED LICENSE` |
| ITRI licensee | `INDUSTRIAL TECHNOLOGY RESEARCH INSTITUTE` |
| III licensee | `INSTITUTE FOR INFORMATION INDUSTRY` |
| NYCU licensee | `NATIONAL YANG MING CHIAO TUNG UNIVERSITY` |

When a new licensee onboards, extend this table with the partner's registered legal name in uppercase before any seal renders. Acronyms (ITRI / III / NYCU) never appear on the arc — the registered full name carries the institutional weight the credential is meant to project.

**Content formats**

- **License #** — `LIC-NNNNN` (5-digit zero-padded, e.g., `LIC-00042`). The same identifier appears in two registers on the badge: curved on the TIS seal's bottom arc, and mono below the QR. They must match — treat any drift as a defect.
- **Patent count** — per-licensee, integer + `PATENTS` (e.g., `18 PATENTS`). On the licensee seal's bottom arc.
- **Validity period** — when surfaced (verification page, not on the badge itself): `YYYY-MM-DD – YYYY-MM-DD` per [`brand-voice.md`](./brand-voice.md) §6; en-dash separator with a single space on each side.

**Construction rules**

- TIS seal follows §Seal · Standalone (`is-tis` modifier locks the dark-disc / dark-cube-submark look in any theme — credential marks must not invert).
- Licensee seals use the partner colour map (`is-itri` / `is-iii` / `is-nycu`); add new partner variants in [`components.md`](./components.md) when a new licensee onboards.
- "Powered by Innovue" does not appear on the badge — it credits the patent-source institution, not the underlying technology platform.
- The pill itself is light-locked via local CSS-variable scope (full token list in [`components.md`](./components.md) §Verified License Badge). Identity rule: the stamped artifact reads consistently across surface and theme.

### Combined badges (multiple licensees)

The canonical pill IS the combined form. Single-licensee and multi-licensee badges share one chassis: TIS issuer seal · divider · 1–N licensee seals · divider · QR + LIC. The licensee zone grows with each supplier; no separate "single" variant.

**Layout rules.**

- **Two dividers, three zones.** A vertical hairline separates the issuer (TIS) from the licensee zone, and a second hairline separates the licensee zone from the credential stack (QR + LIC). Inside the licensee zone, seals sit at equal optical weight with no dividers between them — they're peers under TIS.
- **Issuance-ledger order.** Licensee seals render left-to-right in the order they were issued, not alphabetically. The badge is a record, not a directory.
- **One QR, one lookup.** A single QR resolves to a multi-licensee verification page that lists every licensee — supplier, scope, jurisdiction, status. One mark, one registry lookup — matching the CE / UL convention.
- **Guidance cap.** The pill scales horizontally with each added licensee seal. Above ~5 licensees the pill grows beyond standard preview / packaging widths — route those holders to a dedicated bundle-detail page instead of a single combined badge.

**Anti-counterfeit.** The invisible watermark is bound to the combined badge as a whole. Lapsing any license invalidates the watermark, and the verification page reflects the new state at scan time.

### Surfaces

| Surface | Format |
|---|---|
| Website footer / product page | Digital PNG/SVG with embedded verification link |
| Exhibition booth | High-resolution print (PDF/AI) for backdrops, tabletop signs |
| Marketing collateral | Embedded in catalogs, brochures, company profiles |
| Product packaging / labels | Small-format badge + QR code (CE/UL-style) |

### Lifecycle

- **Active** — auto-generated on license purchase; auto-updates on renewal.
- **Expired** — visual treatment deferred. See [`design-tokens.md`](./design-tokens.md) §6.
- **Anti-counterfeit** — invisible watermark embedded at generation; QR code resolves to the TIS verification page showing real-time status and authorized scope.

For copy attribution rules, see [`brand-voice.md`](./brand-voice.md) §7.

---

## In Real Life (In Process)

Physical and offline brand surfaces — anywhere TIS appears outside a screen. Placeholder section; specs land as each surface is commissioned. Until then, the digital construction rules above (logo variants, co-branding lockup, badge construction, name usage) translate one-to-one into physical media.

| Surface | Pending |
|---|---|
| **Convention booths** | Backwall, header banner, table runners, tabletop signage. Aspect ratios for common booth sizes (3×3m, 6×3m), TIS submark scale relative to booth height, Innovue co-branded lockup placement on backdrop, Verified License Badge surfacing, partner-logo treatment on side panels. |
| **Signage** | Office plaques, doorway, conference / event wayfinding. Monochrome vs. colour rules per environment, substrate options (acrylic / metal / vinyl), minimum mark sizes for sightlines. |
| **Stationery** | Business cards, envelopes, notepads, folders. Paper stock, ink (spot black vs. CMYK), bleed and safe area, how the cube mark anchors each format. |
| **Letterheads** | Cover letters, contracts, MOUs, formal correspondence. Header lockup (TIS primary logo + "Powered by Innovue"), footer with full legal name (per §Name Usage), margins, font fallbacks for Word / Google Docs templates. |
| **Merchandise** | T-shirts, totes, notebooks, stickers, event swag. Which mark variant per item (submark on small items / primary where there is room), monochrome vs. inverse on dark substrates, minimum sizes after embroidery / screen-print. |

Until each row is spec'd, defer to: §Logo Usage (variants, minimum sizes, no recolour / stretch), §Innovue Co-Branding (Powered by Innovue lockup), §Collaborator Partners (when ITRI / III appear), §Verified License Badge (when the badge appears on a physical surface), §Name Usage (which name form on which document).

---

## Name Usage

| Form | Chinese | English | Use |
|---|---|---|---|
| Full legal name | 泰然策略解密股份有限公司 | Talent Intelligence Strategies Global Inc. | Legal documents only |
| Trade name | 泰然策略解密 | — | Formal trade documents |
| Logo mark | 泰然策略 | — | On-mark only |
| Verbal shorthand | 泰然 | Talent Intelligence Strategies | First reference, formal docs, footer |
| Acronym | — | TIS | Primary short-form across all English touchpoints |
