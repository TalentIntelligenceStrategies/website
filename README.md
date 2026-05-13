# TIS Marketing Website

The deployable marketing site for **Talent Intelligence Strategies** (泰然策略解密) — a Taiwan-rooted IP intelligence consultancy. Currently a single static `index.html` that loads its assets (fonts, logos, icons) from [`designs/assets/`](designs/assets/) — the read-only mirror of the brand monorepo's `brand/assets/`.

## Source of truth

This repo is a **rendered view** of the TIS brand monorepo (kept private), where tokens, primitives, components, identity, and the website PRD are authored. The brand `.md` files are authoritative; this repo ships the resulting page.

Authored upstream in the brand monorepo, mirrored in `designs/` here:

- Design tokens — `design-tokens.md` (mirrored as [`designs/design-tokens-snapshot.md`](designs/design-tokens-snapshot.md))
- Primitives — `primitives.md` (mirrored as [`designs/primitives-snapshot.md`](designs/primitives-snapshot.md))
- Components — `components.md` (mirrored as [`designs/components-snapshot.md`](designs/components-snapshot.md)) — includes website-specific entries (Pillar, Deliverable card, How it works, IP intelligence drop popup) tagged via `Surfaces:`
- Visual / identity guide — `visual-guide.md` (mirrored as [`designs/visual-guide-snapshot.md`](designs/visual-guide-snapshot.md))

Authored upstream, not mirrored here:

- Website PRD — `website-prd.md` (stays at TIS root)

There are **no editable files** in `designs/` — all authoring happens upstream in the brand monorepo. If something in the page needs to change, edit the upstream brand `.md` first, then refresh the matching `*-snapshot.md` here, then regenerate the rendered HTML. Don't fix the rendered HTML or a snapshot without propagating back.

## Local preview

```
open index.html
```

No build step. Fonts are self-hosted from `designs/assets/fonts/` (Urbanist, Inconsolata, Noto Sans TC). Logos and favicons resolve from `designs/assets/logos/`. Icons (when used by the page) come from `designs/assets/icons/`.

## Deploy

Hosted on GitHub Pages from the `main` branch — live at [talentintelligencestrategies.github.io/website](https://talentintelligencestrategies.github.io/website/). Custom domain `tisglobalinc.com` planned; DNS wiring pending. Until the custom domain resolves, the canonical URL declared in `index.html` (`https://tisglobalinc.com/`) won't match the live host — expected, no action needed.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for deploy-relevant changes (HTML / asset / font updates that ship to the live site). Brand-system authoring history is tracked separately in the brand monorepo's `brand-changelog.md`.
