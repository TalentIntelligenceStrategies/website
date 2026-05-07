# Website Changelog

Deploy-relevant changes to the rendered TIS marketing site (`index.html`, `assets/`, fonts, deploy config). Brand-system `.md` authoring history is tracked separately in the brand monorepo's `brand-changelog.md`.

Format: one short entry per editing session, newest on top.

```
- **YYYY-MM-DD HH:MM +08:00** · one short sentence (~20 words max) describing what changed.
```

## Entries

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
