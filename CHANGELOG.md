# Website Changelog

Deploy-relevant changes to the rendered TIS marketing site (`index.html`, `assets/`, fonts, deploy config). Brand-system `.md` authoring history is tracked separately in the brand monorepo's `brand-changelog.md`.

Format: one short entry per editing session, newest on top.

```
- **YYYY-MM-DD HH:MM +08:00** · one short sentence (~20 words max) describing what changed.
```

## Entries

- **2026-05-19 14:42 +08:00** · Added a Linear-style Products dropdown to the topnav across `index.html`, `/product/licensing/`, and `/product/signal/` — chevron-trigger button replaces the flat Products link, opening a 2-card panel (Licensing + Signal) with eyebrow + bold statement copy and `aria-current="page"` on the active product card; CSS adds `.topnav-link.has-dropdown`, `.products-menu` (left-anchored to the trigger, dropped 24px below the topnav so it clears the 64px row, transparent `::before` bridge over the gap), `.products-menu-grid`, `.product-card` (rest / hover / aria-current variants), and a `.mobile-row-dropdown` + `.mobile-sublist` accordion inside the mobile drawer; site.js wires hover-intent (120ms open / 200ms close, gated to `hover: hover and pointer: fine`) on both wrap and panel, click toggle, ArrowDown/Enter/Escape keyboard, outside-click + `scroll > 64` close, and the mobile accordion toggle; the existing min-width lockables selector now also picks up the trigger's inner text span so the topnav row stays stable across EN ↔ CH toggles.

- **2026-05-19 12:45 +08:00** · Updated `/product/licensing/` and `/product/signal/` copy to match locked specs (Licensing v9.1.0 / Signal v0.3): rebuilt licensing pricing with 3-mo/6-mo/1-yr term toggle plus a six-row industry × tier matrix, dropped the cancelled 3-yr term, swapped the vague industry list for the locked six (chip · networking · computing · integrated apps · multimedia · net-zero), dropped KR from the jurisdiction line, added a dedicated DLC + Verified Badge artifacts section (PAdES e-sign, MOICA, blockchain timestamp, 5-channel badge), collapsed the now-redundant Term-flexibility deliverable card; on signal, replaced subscription pricing (Lite NT$4,900/49pt · Standard NT$7,900/83pt · Pro NT$9,900/110pt, all 5-seat pooled wallet), fixed the 50-pt top-up to NT$4,500/10%, swapped "token" for "point" sitewide, repointed the trial to the 2026-07–12 pilot window, and added a VC + CVC use-case persona row; CSS adds `.prod-term-toggle` segmented control, `.artifacts-split` 2-up cards, and a `.usecase-persona-foot` modifier; inline JS in licensing page wires the term toggle to per-card `data-term-prices` maps.

- **2026-05-18 10:42 +08:00** · Restructured the site into a multi-page layout — split inline CSS / JS into shared `assets/styles.css` + `assets/site.js` (root-relative paths), renamed the "Intelligence" pillar to "Signal" across the homepage (data attrs, IDs, CSS scopes, labels, footer link, JS literals), added new `/product/signal/` and `/product/licensing/` deep-dive pages with hero + audience + how-it-works + deliverables + pricing + FAQ + CTA sections sourced from the corresponding repo `docs/` folders, added "Learn more →" CTAs inside each homepage pillar panel, dropped a sync `<head>` theme-init script to prevent dark-mode FOUC; homepage Products section content otherwise unchanged. Brand `.md` files keep "Patent Intelligence SaaS" as internal name — rename is website-only.

- **2026-05-14 19:09 +08:00** · Baked a soft 0.5px white halo into the four `designs/assets/signature/` PNGs (`tis-logo`, `icon-phone`, `icon-mail`, `icon-globe`) so the dark glyphs stay legible on Gmail's `#1F1F1F` dark-mode surface without altering their light-mode rendering.

- **2026-05-14 18:44 +08:00** · Repointed the 12 signature image URLs in `designs/assets/signature/email-signature-setup.html` from `talentintelligencestrategies.github.io/website/...` to `tisglobalinc.com/...` so Gmail-rendered signatures stop breaking on GH Pages' 301-redirect of the legacy host (Gmail won't follow redirects for inline images).

- **2026-05-14 18:11 +08:00** · Removed the `services` (Services / Brokerage / IP Ascent) option from the contact form's Inquiry Type dropdown in `index.html`, completing the Services retirement that the 2026-05-12 16:01 entry deferred.

- **2026-05-14 00:03 +08:00** · Replaced Patent Intelligence pillar's "Product visualization coming soon" placeholder with `brand/catalog/imagery-preview.html` §2.1 spread-read · cascade · medium peek: five-card SABCD ladder (D→C→B→A→S) on a cool-light flat canvas, S deliberately bleeds past the bottom-right edge; two cool-variant callouts ("Three readings · One verdict" + "Two depths · Same engine"); `.r-*` Pro-report primitives (page-card, letterhead, seal, metric cells, mini 8-axis radar + P1–P8 thresholds); `#pillar-intelligence`-scoped overrides — letterhead pinned to always-dark banner regardless of theme, dark-mode frame border + callout bg use cool sky tint (no longer inheriting Licensing's warm gold); fixed `.shot-inner` transform from `scale(calc(100cqi / 1376))` to `scale(calc(100cqi / 1376px))` so the unit-bearing calc resolves to a unitless ratio — also unclips Licensing's 30-tile grid, which had silently been rendering only its top-left ~9 tiles since the unit bug shipped.

- **2026-05-13 21:58 +08:00** · Pinned `.innovue-collab-card__logo` and `.footer-innovue` to `Innovue_Logo_Blue_eng.svg` (and `Light_eng.svg` in dark) instead of the lang-aware `--partner-innovue*` tokens, and dropped the `data-zh="技術支援"` swap on the `.innovue-collab-card__powered` eyebrow, so the "Powered by" + INNOVUE lockup renders identically in EN and CH — matches `brand/components.md` §Innovue collaboration card §Lockup + §Footer §Co-branded lockup.

- **2026-05-13 17:02 +08:00** · Tightened `.hero` in `index.html` to `height: clamp(460px, 56vw, 580px)` + `padding-block: 32px 0` (matches `brand/catalog/imagery-preview.html`'s frame) so the tile-grid backdrop crops cleanly at the bottom on tall viewports; mobile breakpoints unchanged.

- **2026-05-13 15:13 +08:00** · Added `designs/assets/signature/` with `tis-logo.png` (400×112, from `tis_secondarylogo_dark_dual.svg`) + `icon-{phone,mail,globe}.png` (28×28, stroke `#474747`) so brand catalog's Gmail-signature Variant B can reference hosted `https://` URLs instead of base64 data URIs (eliminates Gmail send-flicker from CID re-uploads).

- **2026-05-13 14:50 +08:00** · **TEMP** · Repointed `og:image` + `twitter:image` from `https://tisglobalinc.com/...` to `https://talentintelligencestrategies.github.io/website/designs/assets/imagery/og.png` so social-card validators (opengraph.xyz, LinkedIn Post Inspector, Meta Sharing Debugger) can fetch the asset before DNS resolves; `og:url` + `<link rel="canonical">` left at `tisglobalinc.com` (those are display strings, not fetched). **Revert both image URLs to `tisglobalinc.com/designs/assets/imagery/og.png` once DNS is wired.**

- **2026-05-13 14:42 +08:00** · Added `designs/assets/imagery/og.png` (mirror of `brand/assets/imagery/og.png`) — 1200×630 social-share card built from the §2 cool-signal hero backdrop with silver-luminous overlay, white two-line headline, and a TIS|Innovue co-branded lockup beneath; `index.html` `og:image` + `twitter:image` repointed from the previously stubbed `/assets/og/tis-og-1200x630.png` to `/designs/assets/imagery/og.png`; resync'd `visual-guide-snapshot.md` for the upstream OG spec.

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
