# Website Changelog

Deploy-relevant changes to the rendered TIS marketing site (`index.html`, `assets/`, fonts, deploy config). Brand-system `.md` authoring history is tracked separately in the brand monorepo's `brand-changelog.md`.

Format: one short entry per editing session, newest on top.

```
- **YYYY-MM-DD HH:MM +08:00** · one short sentence (~20 words max) describing what changed.
```

## Entries

- **2026-05-28 16:29 +08:00** · Retargeted product-page signup CTAs from `*.tisglobalinc.com/start` to local `/product/<x>/lobby/` (licensing × 3, signal × 5) so the curious-to-signup flow stays in-domain.

- **2026-05-28 14:01 +08:00** · Added Signal lobby at `/product/signal/lobby/` — mirrors the Licensing lobby structurally (stripped topnav, scroll ticker, 1:1 split-screen, partner row, 100vh lock), swaps to cool blue gradient + `--score-b-vivid` bullet accent + SABCD/credits/Brief copy + Signal-specific ticker items + `signal.tisglobalinc.com/start` upstream link.

- **2026-05-28 13:28 +08:00** · Rebuilt the Licensing lobby into a single-viewport surface — stripped topnav to logo + language toggle, replaced the static banner with a continuous-scroll ticker (ISO-dated updates, no dismiss), inlined the Exclusive Patent Access logos (2×2 color-at-rest) in the marketing column, locked 1:1 columns with 420px top-anchored centered blocks, and pinned the page to 100vh with no scroll.

- **2026-05-28 12:47 +08:00** · Tightened the Patent-band CTA's surrounding gaps to 64px each side on both product pages (Pricing's `padding-bottom: 32px` re-applied, FAQ's `padding-top` overridden to 32) — matches the upper-page rhythm so the credibility band reads as part of the product story rather than floating in a chasm. FAQ's bottom stays default 160 so the Contact form keeps its breathing room.

- **2026-05-28 12:23 +08:00** · Repainted each product page's Contact section bloom in the matching pillar palette — licensing → `.hero-warm` stops, signal → `.hero-signal` cool stops — keeping the bottom-origin / upward-linear axis flip from styles.css §Get in touch. Mirrors how the homepage uses identical silver stops between its hero and contact, just inverted.

- **2026-05-28 12:15 +08:00** · Moved the Exclusive Patent Access + paired CTA band above the FAQ on both product pages — new order is Pricing → Patent-band CTA → FAQ → Contact form, so credibility lands before objections rather than after.

- **2026-05-28 12:08 +08:00** · Tightened both product pages' Exclusive Patent Access CTA band into a single horizontal row (headline · 4 color logos · button) at ≥1100px that stacks to 3 rows below; dropped the top-rule "Exclusive Patent Access" caption, switched logos to color-at-rest via `.partner-strip--color`, scaled logos to 180×36 / 40px equidistant gaps (200×40 / 48px in the stacked fallback), tightened outer section gaps to 20px so logos sit closer to the headline + button, and broke each headline into per-line spans — licensing "Find your position on patents / from established institutions", signal "Benchmark against a pool, / drawn from reputable institutions".

- **2026-05-28 11:58 +08:00** · Replaced the themed `.cta-banner` on both product pages with an Exclusive Patent Access hairline band (Innovue · iPIC · III · NYCU) paired with a product-specific CTA — licensing "Stake your position…" + Build your bundle; signal "Benchmark against a pool…" + Get your first Brief. Kept `id="signup"` so the announcement-banner link still resolves.

- **2026-05-28 11:46 +08:00** · Added announcement banner, recent-updates hub, and Exclusive Patent Access partner strip (color-at-rest variant) to the Licensing lobby; swapped the floating logo for an inline header row.

- **2026-05-28 11:41 +08:00** · Aligned both product pages with the homepage layout — dropped the 1080px container override (now inherits the shared 1440/32/20 frame), swapped each hero for the homepage `.hero` chrome with per-pillar gradient (licensing → warm, signal → cool), and appended a local `#contact` form section below `#signup` so CTAs scroll in-page instead of jumping back home.

- **2026-05-28 11:16 +08:00** · Added §Announcement banner across homepage and both product pages — solid `surface-inverse` bar, dead-center message + CTA, close absolute-right, per-session dismiss via `data-announce-id`; page-specific copy (homepage → bundles, licensing → pricing, signal → 50-credits trial).

- **2026-05-27 17:25 +08:00** · Rewrote the About headline to a two-line stack — "An IP intelligence consultancy, / turning the patent landscape into market position." (split into per-line spans so the break survives language toggles).

- **2026-05-27 17:10 +08:00** · Reworked About + Inquiries: dropped both eyebrows, divider, and gradients; gave Inquiries a reversed full-bleed silver glow; added a Board of Directors roster (5 members) under the pillars with full-viewport fading hairlines.

- **2026-05-27 15:50 +08:00** · Reframed the homepage Partner strip as a full-bleed hairline band — "Exclusive Patent Access" caption centered on the top rule, logos centered (kept the 40×200 sizing).

- **2026-05-27 14:36 +08:00** · Added the Licensing lobby page (`product/licensing/lobby/`) — split-screen branded check-in (edge-less warm panel + Sign up/Log in forms, logo-only header) gating entry into `licensing.tisglobalinc.com/start`; standalone (product-page CTAs unchanged), brand tokens, fits one viewport.

- **2026-05-27 14:12 +08:00** · Reframed the homepage Partner strip as "Exclusive patent access" — centered Urbanist eyebrow above a centered logo row (kept the prior 40×200 logo sizing).

- **2026-05-27 14:03 +08:00** · Added per-product entry-flow docs (`product/{signal,licensing}/entry-flow.md`) documenting the marketing→product handoff, the staged "separate-now, SSO-ready" auth model, and the returning-user "Sign in" CTA gap.

- **2026-05-27 13:53 +08:00** · Hero carousel: removed the Licensing/Signal backdrop figures (all three slides now use the positioning-style gradient + 32px grid, recolored warm/cool/silver); reordered slides to Positioning → Licensing → Signal.

- **2026-05-27 13:33 +08:00** · Footer cleanup across all pages — removed the LinkedIn link (Contact column) and the Verified License Badge link (Products column).

- **2026-05-27 13:23 +08:00** · Unified the four deliverable cards per pillar — homepage now matches the product pages' (benefit-led) headings, bodies, and icons (Licensing card-4 icon swapped to bar-chart); EN + symbols only, data-zh left for the Chinese pass.

- **2026-05-27 13:06 +08:00** · Converted all how-it-works checklist bullets (homepage + both product pages) from raw specs to verb-led benefit phrasing (Stripe style); deliverable-card bodies pushed further into the cadence; data-zh untouched.

- **2026-05-27 12:51 +08:00** · Voice rewrite (EN) across homepage + both product pages — Stripe-style confident, benefit-cascade cadence with TIS-compliant words; kept the lines already on-voice, lifted heroes/intros/stats/cards, scrubbed banned words ("platform"/"powering"/"unlock"). data-zh untouched.

- **2026-05-27 12:18 +08:00** · Licensing pricing: added a 36-month term and flattened price to be industry-independent (duration only) — NT$9,990 / 9,490 / 8,990 / 7,990 per mo at 3 / 6 / 12 / 36, up to 20% off.

- **2026-05-27 11:47 +08:00** · Corrected SABCD comparison framing across homepage + both product pages (EN only) — scoring/ranking now reads "against your industry pool" not the 170M database; retired stale ITRI for Innovue/iPIC/III/NYCU.

- **2026-05-27 11:10 +0800** · About: folded the Innovue description (inline logo replacing the name) into the 02/Source card and removed the separate closing Innovue card.

- **2026-05-27 10:48 +0800** · Partner strip: iPIC replaces ITRI, NYCU added as 4th mark (Innovue · iPIC · III · NYCU); light-mode desktop only.

- **2026-05-27 10:21 +08:00** · Homepage reorder: moved the Innovue credit out of the post-hero slot and folded it into the About section as a closing attribution; restored the Partner strip (Innovue · ITRI · III) under the hero, with its dropped --partner-itri/--partner-iii tokens and .partner CSS brought back.

- **2026-05-27 09:48 +08:00** · Made the desktop Products dropdown click open-only — clicking the trigger while the hover-opened panel is showing no longer toggles it shut (it now focuses the first card); close stays on outside-click / Esc / scroll.

- **2026-05-25 17:02 +08:00** · Rebased the topnav apparatus on `/product/licensing/` and `/product/signal/` onto the canonical homepage version — the product-page navs were stale (older 4-entry search modal missing Press + About, no inline HTML section comments, and missing the entire `#mkt-overlay` IP-intelligence drop popup with its role/industry brand-selects + email form + 45s/50%-scroll trigger wired via site.js). Now structurally identical to `index.html` lines 57–276 with only two intentional deltas: all `href="#anchor"` (nav links + Contact-sales CTAs + search modal Jump-to entries) converted to `href="/#anchor"` so they still resolve back to homepage sections, and `aria-current="page"` added on each page's own product card + mobile sub-row. Footer is also structurally identical to the homepage's (only the same intentional `/#anchor` routing delta). Width-parity fix in each product page's inline style block: the `.container { max-width: 1080px }` rule (inherited from the brand preview, intended to narrow body sections like Stripe) was silently narrowing the topnav and footer too — the original `:not(.topnav-inner)` only excluded topnav from the padding override, not from max-width, and footer was never considered; added an explicit `.topnav-inner, .footer .container { max-width: 1440px; padding-inline: 32px }` reset (with mobile padding) so the chrome matches the homepage edge-to-edge while body sections keep their 1080px Stripe frame.

- **2026-05-25 16:53 +08:00** · Wired homepage entry points to the now-substantive product pages — topnav TIS logo on `index.html` switched from `href="#"` to `href="/"` (matches the product-page topnav convention), and the two hero-carousel "View product" CTAs (Licensing + Signal slides) repointed from the in-page `#products` anchor to `/product/licensing/` and `/product/signal/` respectively; the Strategic Positioning slide still anchors to `#about` (no positioning page) and the remaining `#products` anchors (search modal "Jump to → Products", footer "Verified License Badge" category link) stay intra-page by design.

- **2026-05-25 16:40 +08:00** · Folded `brand/previews/licensing-product-page-preview.html` and `brand/previews/signal-product-page-preview.html` into `/product/licensing/index.html` and `/product/signal/index.html` — swapped each page's `<main>` body content for the canonical preview content (build-a-bundle picker + 5-step horizontal scroll rail with screenshot crops for licensing; submit/pool/delivery/report walkthrough + Lite/Standard/Pro pricing for signal), appended each preview's page-scoped inline `<style>` block (`.howit-*` warm-orange / cool-blue rules) before `</head>`, and replaced trailing inline scripts (build-a-bundle picker + howit carousel for licensing; howit carousel for signal); kept the website's existing topnav + mobile drawer + search modal + footer + theme-init verbatim; rewrote 10 screenshot `src=` paths and 3 CSS `url("../assets/logos/...")` refs (TIS submark + ITRI + III seals on the licensing VLB swatch) onto the root-relative `/designs/assets/...` frame, and mirrored the 10 source screenshot PNGs into `designs/assets/imagery/screenshots/{licensing,signal}/`; archived both source previews under `brand/archive/previews/`.

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
