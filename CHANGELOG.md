# Website Changelog

Deploy-relevant changes to the rendered TIS marketing site (`index.html`, `assets/`, fonts, deploy config). Brand-system `.md` authoring history is tracked separately in the brand monorepo's `brand-changelog.md`.

Format: one short entry per editing session, newest on top.

```
- **YYYY-MM-DD HH:MM +08:00** · one short sentence (~20 words max) describing what changed.
```

## Entries

- **2026-05-13 13:04 +08:00** · Rewrote `<head>` SEO + social meta in `index.html`: verb-led title (`TIS — Turn patents into market position`), activity-led description, added `<link rel="canonical">` plus Open Graph (og:type/site_name/url/title/description/image/locale) and Twitter (summary_large_image card) tag blocks; `og:image` stubs `/assets/og/tis-og-1200x630.png` pending the asset.

- **2026-05-12 16:01 +08:00** · Retired the Services section (Ascent program + Brokerage ticker) from `index.html`: removed `#services` from all four nav surfaces (top nav, mobile drawer, search modal, footer) and the full section markup; standalone snapshot archived at `brand/archive/previews/services-section-preview.html`; services-specific CSS left dormant in `<style>`; contact-form Services inquiry option preserved.

- **2026-05-12 10:52 +08:00** · Replaced Licensing pillar's "Product visualization coming soon" placeholder with `brand/previews/imagery-preview.html` §1.1 catalog read: bare browser-frame at 688px hosting the 30-tile warm-light flat grid (1376×860 native @ 0.5 scale, container-query fluid below 1180px), two overhanging callouts (bundle composition bottom-left, System / FTO pick paths top-right, -24px overhang), Licensing-only `grid-template-columns: 1fr 688px` with 1180px collapse breakpoint, dark-mode parity inherited from source.

- **2026-05-11 23:35 +08:00** · Folded `brand/archive/previews/redesign-hero-homepage-preview.html` into `index.html`: replaced single-backdrop hero with the 3-pillar carousel on warm-blueprint / cool-signal / silver crossfade; new `--hero-bp-bg` / `--hero-bp-bloom` / `--hero-spotlight` tokens (light+dark); dropped `signal-dot`, `pillar-meta*`, `card-strip-3d` + procedural generator and their token blocks (`--card-*`, `--blueprint-*`, `--spotlight*`, `--dur-card`, `--grad-bg-silver-faded`); slide 2's 12 metric tiles lazy-mount via `requestIdleCallback`, slide 1's 30-tile patent grid deferred the same way, non-active pillar slides get `content-visibility: auto`.

- **2026-05-08 11:33 +08:00** · Swapped `.partner-strip` for `.innovue-collab-card` on `index.html` per upstream §Innovue collaboration card — full bilingual (lang-aware Innovue Blue logo via `--partner-innovue-color`, `data-zh` on eyebrow + body copy); `--partner-*` token definitions retained for other consumers; section spacing preserved via the existing `.section--tight` wrapper.

- **2026-05-07 19:28 +08:00** · Resync'd designs/components-snapshot.md after upstream addition of `§Innovue collaboration card` — new sibling to `§Partner strip`, same container shell, silver-wash intro copy.

- **2026-05-07 17:18 +08:00** · Removed stale designs/previews/components-preview.html — catalog previews are brand-internal per new two-tier preview-sync rule in TIS/CLAUDE.md; only surface-flow previews mirror.

- **2026-05-07 16:59 +08:00** · Resync'd design-tokens-snapshot.md and components-snapshot.md after upstream removal of the Verification checklist sections (§7.7 in design-tokens, trailing `## Verification checklist` in components).

- **2026-05-07 16:48 +08:00** · Resync'd all four design snapshots (primitives / components / design-tokens / visual-guide) to track upstream brand-system pass: chip family completed, gradients promoted out of exploration into design-tokens.md §7.5 + visual-guide.md.

- **2026-05-07 13:30 +08:00** · Consolidated assets — added designs/assets/ as the full read-only brand mirror (fonts / logos / icons), deleted the redundant top-level assets/, and repointed all index.html href / url() references from `assets/` to `designs/assets/`.

- **2026-05-07 11:16 +08:00** · Added designs/ — read-only snapshot mirrors of brand primitives, components, design-tokens, and visual-guide; components-preview.html in previews/.

- **2026-05-06 23:01 +08:00** · Pre-handoff cleanup: removed 8 orphan status-token CSS vars (warning/danger/info bg+fg, signal-warning, signal-lapsed) and added Urbanist-Bold preload for hero LCP.
- **2026-05-06 22:37 +08:00** · Replaced native Inquiry-Type select with §Select brand dropdown (underline trigger variant) and added html scroll-padding-top so top-nav anchors land below the fixed 64px nav.
- **2026-05-06 21:23 +08:00** · Shifted .section padding-block onto the contained .container for Latest-reports + About so the gradient covers the full vertical extent (no exposed page-surface strip top/bottom).
- **2026-05-06 21:19 +08:00** · Contained Latest-reports / About / Contact backgrounds + borders within the 1440px container (moved off the full-bleed section), matching the Products framing.
- **2026-05-06 21:15 +08:00** · Extended Services-section bronze top, ticker, and bronze bottom out to the container's outer edge (margin-inline breakout) and bumped inner padding 64px → 96px to keep the inner frame proportional.
- **2026-05-06 21:06 +08:00** · Reworked Services-section ticker to page surface + hairline rules; added ITRI dark-mode SVG variants (white wordmark) for featured logo and partner strip.
- **2026-05-06 16:42 +08:00** · Self-hosted Urbanist, Inconsolata, Noto Sans TC TTFs from brand monorepo; removed Google Fonts CDN links, added preload for Urbanist Regular.
- **2026-05-06 16:29 +08:00** · Initial repo split out of TIS brand monorepo; PRD moved to TIS root, README + this changelog seeded.
