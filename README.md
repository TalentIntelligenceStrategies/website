# TIS Marketing Website

The deployable marketing site for **Talent Intelligence Strategies** (泰然策略解密) — a Taiwan-rooted IP intelligence consultancy. A static multi-page site that loads its fonts, logos, and icons from [`designs/assets/`](designs/assets/) — the read-only mirror of the brand monorepo's `brand/assets/`.

## Pages

| URL                          | File                                                     |
| ---------------------------- | -------------------------------------------------------- |
| `/`                          | [`index.html`](index.html) — homepage                    |
| `/product/signal/`           | [`product/signal/index.html`](product/signal/index.html) — Signal deep-dive (token-based patent valuation, comparison, reports) |
| `/product/licensing/`        | [`product/licensing/index.html`](product/licensing/index.html) — Licensing Platform deep-dive (30-patent bundles, jurisdiction × industry) |

Each page is self-contained HTML — no router, and the pages themselves are hand-authored. There **is** a build step beside them (`npm run build`) that produces minified twins of `styles.css` and `site.js` (the files the pages actually load), the hero shader runner, the vendored GSAP and Lenis bundles, the subset WOFF2 fonts, the responsive WebP variants and the search index; see [DESIGN.md](DESIGN.md) §15. Edit `assets/styles.css` and `assets/site.js` — never the generated twins under `assets/build/`. Shared chrome (top nav, footer, language switcher) is duplicated across all nine pages; a change there means editing every page file.

## Shared assets

| Path                     | What it is                                               |
| ------------------------ | -------------------------------------------------------- |
| [`assets/styles.css`](assets/styles.css) | All CSS — tokens, components, page layouts. Single source of truth for visual design. Its `@font-face` block is generated between sentinels — don't hand-edit it. |
| [`assets/site.js`](assets/site.js)       | All JS — language switcher, mobile drawer, search, carousels, form handlers. |
| [`designs/`](designs/)   | Read-only brand snapshots + fonts, logos, icons mirrored from the brand monorepo. |

**Asset paths are root-relative** — every reference uses `/assets/...` or `/designs/assets/...`. This works because GitHub Pages with a custom domain serves the repo at the domain root. Don't change to relative paths — subpages two levels deep would break.

A small inline `<script>` block lives at the top of each page's `<head>` to read `tis-theme` and `tis-lang` from `localStorage` and set `<html data-theme>` / `<html lang>` before paint. This prevents flash-of-unstyled-content on dark mode. Keep it in sync across pages; everything else lives in `assets/site.js`.

## Form capture — "Front Desk"

The contact form, the footer newsletter and the IP-drop popup post to a Google Apps Script Web App ([its source and setup runbook](documents/front-desk-apps-script.md), moved out of `site.js` on 2026-08-28) that appends to a Google Sheet named **TIS Front Desk**, owned by `contact@tisglobalinc.com`. One endpoint serves all three; the server routes on a `form` key in the payload and creates each tab, with its header row, on first submission — **adding a form later needs no server change.**

The Apps Script source and the full deploy walkthrough live in a block comment at the **foot of [`assets/site.js`](assets/site.js)**. The endpoint itself is the `FRONT_DESK_ENDPOINT` constant near the capture module in the same file.

Two things to know before touching it:

- **While `FRONT_DESK_ENDPOINT` is empty, every form falls back to its old local-only behaviour** — it shows success without sending anything. That is a safe half-configured state, not a working one. Don't ship it believing submissions are being captured.
- **Editing the Apps Script does not update the live endpoint.** You must `Deploy → Manage deployments → pencil → Version: New version`. Picking "New deployment" instead mints a different URL while the site keeps posting to the old one.

## Source of truth

This repo is a **rendered view** of the TIS brand monorepo (kept private), where tokens, primitives, components, identity, and the website PRD are authored. The brand `.md` files are authoritative; this repo ships the resulting pages.

Authored upstream in the brand monorepo, mirrored in `designs/` here:

- Design tokens — `design-tokens.md` (mirrored as [`designs/design-tokens-snapshot.md`](designs/design-tokens-snapshot.md))
- Primitives — `primitives.md` (mirrored as [`designs/primitives-snapshot.md`](designs/primitives-snapshot.md))
- Components — `components.md` (mirrored as [`designs/components-snapshot.md`](designs/components-snapshot.md)) — includes website-specific entries (Pillar, Deliverable card, How it works, IP intelligence drop popup) tagged via `Surfaces:`
- Visual / identity guide — `visual-guide.md` (mirrored as [`designs/visual-guide-snapshot.md`](designs/visual-guide-snapshot.md))

Authored upstream, not mirrored here:

- Website PRD — `website-prd.md` (stays at TIS root)
- Product copy / pricing — sourced from `vc-signal/docs/` (Signal page) and `licensing-platform/docs/` (Licensing page)

There are **no editable files** in `designs/` — all authoring happens upstream in the brand monorepo. If something in the page needs to change, edit the upstream brand `.md` first, then refresh the matching `*-snapshot.md` here, then regenerate the rendered HTML. Don't fix the rendered HTML or a snapshot without propagating back.

## Local preview

```
python3 -m http.server 8000
```

Then open [http://localhost:8000/](http://localhost:8000/). A simple file open (`open index.html`) won't work for the product pages — root-relative paths need a server.

No build step. Fonts are self-hosted from `designs/assets/fonts/` (Urbanist, Inconsolata, Noto Sans TC). Logos and favicons resolve from `designs/assets/logos/`.

## Deploy

Hosted on **GitHub Pages from the `main` branch**, served live at **[tisglobalinc.com](https://tisglobalinc.com/)**. The custom domain is configured via the [`CNAME`](CNAME) file at the repo root + DNS records pointing at GitHub's IPs (DNS hosted in **AWS Route 53** — the `tisglobalinc.com` hosted zone; Squarespace is the registrar but is *not* authoritative, so DNS edits must be made in Route 53). HTTPS is active.

The GitHub Pages preview URL ([talentintelligencestrategies.github.io/website](https://talentintelligencestrategies.github.io/website/)) still resolves but is no longer the canonical host.

Deploy flow:

1. Commit + push to `main`
2. GitHub Pages auto-rebuilds (~30 seconds)
3. New version live at `tisglobalinc.com`

## Naming convention — Signal vs Patent Intelligence SaaS

The Signal product page (`/product/signal/`) is the consumer-facing surface for what the brand system internally calls "Patent Intelligence SaaS." The brand `.md` files still use the internal name; the marketing site uses **Signal**. This dual naming is intentional and documented in the brand monorepo's `CLAUDE.md`.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for deploy-relevant changes (HTML / asset / font updates that ship to the live site). Brand-system authoring history is tracked separately in the brand monorepo's `brand-changelog.md`.
