# Website Changelog

Deploy-relevant changes to the rendered TIS marketing site (`index.html`, `assets/`, fonts, deploy config). Brand-system `.md` authoring history is tracked separately in the brand monorepo's `brand-changelog.md`.

Format: one short entry per editing session, newest on top.

```
- **YYYY-MM-DD HH:MM +08:00** · one short sentence (~20 words max) describing what changed.
```

## Entries

- **2026-05-30 20:15 +08:00** · Applied Irene's slide-28 (Signal homepage snapshot) on `index.html` `#pillar-signal`: replaced the prior 3-feature template with a headline + 2 body paragraphs (image annotations skipped per Miko, content already in body 1); primary CTA `聯絡業務 → #contact` swapped for `免費預覽報告樣本 → /product/signal/`; added ZH `<strong>` ranges via the existing `data-zh-html` opt-in (headline fully bold; body 1 has two bold ranges around `，產出 SABCD 五級評級。`; body 2 bolds `第三方專利評級依據`); double em-dash `——` collapsed to single `—` in 2 places. Also retro-applied the same bolding treatment to slide-20 Licensing snapshot (`拼出口的台灣頭家…` fully bold; `專利蟑螂` inline bold). Stamped slide 28 🟢 and refreshed slide 20 notes.

- **2026-05-30 19:52 +08:00** · Homepage Products section deliverable cards adopt the Licensing/Signal product-page treatment: stripped card chrome (no background/border/padding), 40px icons, 15px semibold titles with per-pillar 2×16 accent line (`--score-d-vivid` warm for Licensing, `--score-b-vivid` cool for Signal), 15px bodies. All 8 ZH titles + bodies ported from `product/licensing/` and `product/signal/` (EN already matched). CSS change is global on `.deliverable-card` in [assets/styles.css](assets/styles.css), making the product pages' inline `<style>` overrides redundant but harmless.

- **2026-05-30 19:38 +08:00** · Finalized slides 21–27 on the Licensing product page after Miko's PDF-verbatim corrections: hero reframed to insurance-metaphor (`出口買專利險，30 件專利包輕裝上陣。`) with single-paragraph benefit-recap subhead; cards 1–5 ZH bullets reworded to PDF-verbatim formatting (half-width parens, `.` separators, `和` ↔ `與`, `創智 / 資策會 / 陽明交大` institution names); card 5 collapsed from 3 → 2 bullets per slide-26 merge; pricing H2 swapped from `定價 — 組建你的組合。` to `專利授權套件組合`; deleted the `bp-section-sub` subheading and the `可訂閱` / `Available` jurisdiction labels; stale `36-month` references in CSS / HTML comments updated to `24-month`. All slide-21-through-27 rows in `documents/chinese-copy-direction.md` stamped 🟢 with per-row variance notes; retired rows marked ⚪ superseded.

- **2026-05-30 18:54 +08:00** · Applied Irene's slides 21–27 to `product/licensing/index.html`: hero rebadge + 試跑專利包 CTA + benefit-recap paragraph (slide 21); ZH copy refresh on all 5 How-it-works cards (slides 22–26: Selector / Methods / Browse / Lock / Credentials); pricing toggle 36mo → 24mo with `Save 15%` discount tier + matching `PRICES` / `TERM_LABEL` / `TERM_SAVE` map updates and a new ZH-side map + `MutationObserver` so dynamic estimate text re-renders on language swap; added `data-zh` to previously-untranslated pricing labels (Jurisdiction / Industry / Single-bundle estimate / row labels / industry names / per-month / save); reframed two bp-includes items per slide 27 annotations; updated FAQ term-blurb to match the new 3/6/12/24 lineup. EN preserved where one-to-one; the new badge-usage includes item carries provisional EN.

- **2026-05-30 18:38 +08:00** · Shortened ZH pillar-tab labels on homepage product section (`#products .pillar-tab`): `泰然專利防護網` → `專利授權`, `泰然專利強度評級系統` → `專利評級` (reused from slide-16 category labels; full product names remain on snapshot H3 + nav dropdown + footer); EN tab labels unchanged.

- **2026-05-30 18:34 +08:00** · Restructured homepage Licensing pillar snapshot (`#pillar-licensing` `.pillar-hero-copy`) to slide-20 shape: replaced 4-feature bold-label template with 1 headline + 1 body paragraph + 2 annotation paragraphs (Irene's screenshot callouts folded into paragraph copy); primary CTA `聯絡業務 → #contact` swapped for `查看智選專利包 → /product/licensing/`; EN provisional per literal column with HTML-comment flag; stamped all 5 slide-20 rows 🟢.

- **2026-05-30 18:26 +08:00** · Replaced Products dropdown description ZH copy on both desktop + mobile nav per chinese-copy-direction.md slide 19: Licensing → `精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。`; Signal → `比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。`. EN preserved; stamped slide-19 description rows.

- **2026-05-30 18:23 +08:00** · Added `data-zh-html` opt-in to `assets/site.js` swapText so flagged elements use innerHTML on ZH swap; wrapped `每日` in `<strong>` on the 180M database stat-body to honor Irene's slide-17 highlight ask. EN swap continues to use textContent.

- **2026-05-30 18:20 +08:00** · Replaced 180M database stat-body ZH subtitle (`index.html` line 434) with slide-17 framing plus user-added subject prefix (`Innovue 專屬資料庫所收錄的專利數 - 每日與官方同步更新資料，全球第四大完整專利資料庫，檢索不遺漏任何蛛絲馬跡。`); EN preserved; stamped slide-17 database row with prefix-divergence note.

- **2026-05-30 18:16 +08:00** · Replaced jurisdiction stat-body ZH subtitle (`index.html` line 444) with slide-17 framing (`專利資料庫囊括全球超過 100 個國家…全球專利佈局的最佳夥伴。`); EN preserved; stamped slide-17 jurisdiction row.

- **2026-05-30 18:07 +08:00** · Replaced contact-form inquiry-type dropdown per chinese-copy-direction.md slide 16: 4 options → 6 options (專利授權 / 專利評級 / 專利評估報告 / 產業報告 / 媒體採訪 / 其他); EN labels are Title-Cased literal translations marked PROVISIONAL via inline HTML comment + slide-16 doc note; three new `data-value`s introduced (`rating`, `evaluation-report`, `industry-report`) — backend form-routing may need extending.

- **2026-05-30 17:55 +08:00** · Swapped ZH product labels site-wide on `index.html`: `授權平台` → `泰然專利防護網` (×5 direct slots + announce-bar + press-card sentences with TIS prefix dropped); `Signal 平台` → `泰然專利強度評級系統` (×5 direct slots). EN labels untouched. Reconciled `documents/chinese-copy-direction.md` to rebadge Irene's `TIS 專利防護網` to `泰然專利防護網` (slide 12 + top-of-doc) and stamped slide 12 / 14 / 19 product-label rows.

- **2026-05-30 17:41 +08:00** · Adopted Irene's slide-9 (Persona C · 美玉姐 · Grant SME) ZH framing on homepage hero slide 2 (Licensing slot); cleared `data-zh` on all three hero pillar-eyebrows and added `.pillar-eyebrow:empty { display: none; }` to `assets/styles.css` so ZH hero rides without eyebrow; stamped slide-9 rows.

- **2026-05-30 17:28 +08:00** · Adopted Irene's slide-8 (Persona B · VC IPDD) ZH framing on homepage hero slide 3 (Signal slot) — `data-zh` only (EN preserved); primary href stays `/product/signal/`, secondary stays `#contact` pending `/methodology`; stamped slide-8 rows in `documents/chinese-copy-direction.md`.

- **2026-05-30 17:21 +08:00** · Adopted Irene's slide-7 (Persona A · Export SME) ZH framing on homepage hero slide A — `data-zh` only (EN preserved); CTA hrefs unchanged pending FR-01 + `/badge-showcase`; added per-row `✓` tracking convention to `documents/chinese-copy-direction.md` and stamped the slide-7 rows.

- **2026-05-30 14:56 +08:00** · Refactored homepage Licensing + Signal product-panel hero copy — replaced dense paragraph + floating side callouts with bold-label feature lists (4 features for Licensing, 3 for Signal); added `.pillar-features` CSS; renamed Signal tab + heading to "Signal Platform" / "Signal 平台" for parallelism with "Licensing Platform".

- **2026-05-30 14:38 +08:00** · Added `documents/chinese-copy-direction.md` as the canonical source for TIS website's Chinese-market copy (33-slide PDF from Irene transcribed verbatim with literal-EN + TBD-EN columns); resynced all four `designs/*-snapshot.md` mirrors to track the upstream `brand-voice.md` rename + section renumber.

- **2026-05-29 00:18 +08:00** · Propagated Innovue database size bump from 170M → 180M (1.7 億 → 1.8 億) across the Signal product page (hero subhead, deliverable, How-it-works check) and Signal lobby ticker — homepage already updated under the prior commit.

- **2026-05-29 00:09 +08:00** · Replaced the homepage stat-card 3-up with a bordered frame + internal dividers + "Powered by Innovue" footer (Option 1 from brand counter preview); numbers now flow into body sentences (180M patents…, 50 quantitative indicators…, 100+ jurisdictions…); dropped dead `.stats-grid` / `.stat-card` / `.stats-grid--4up` CSS and `num-word`/`num-suffix` spans.

- **2026-05-28 22:22 +08:00** · Rewrote homepage hero carousel (three slides), products nav dropdown, and announcement banner copy + zh; eyebrow typography moved to Urbanist normal-case, subhead bumped to deck-style, pillar container widened to 820px, scoped warm gradient for the Licensing slide.

- **2026-05-28 16:50 +08:00** · Dropped redundant Contact link from top nav + mobile drawer on home, licensing, and signal pages (Contact Sales CTA covers it); stripped the per-step gradient backdrop wrapping homepage How-it-works screenshots — now a subtle border + shadow on the image only.

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
