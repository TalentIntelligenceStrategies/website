# TIS Marketing Website

The deployable marketing site for **Talent Intelligence Strategies** (泰然策略解密) — a Taiwan-rooted IP intelligence consultancy. Currently a single static `index.html` with a self-contained `assets/` folder.

## Source of truth

This repo is a **rendered view** of the TIS brand monorepo (kept private), where tokens, components, voice, identity, and the website PRD are authored. The brand `.md` files are authoritative; this repo ships the resulting page.

Authored upstream (not in this repo):

- Design tokens — `design-tokens.md`
- Component catalog — `components.md`
- Voice & messaging — `voice-and-messaging.md`
- Visual / identity guide — `visual-guide.md`
- Website PRD — `website-prd.md`

If something in the page needs to change, the brand `.md` is edited first; this repo is regenerated afterward. Don't fix the rendered HTML without propagating back.

## Local preview

```
open index.html
```

No build step. Fonts load from the Google Fonts CDN (Urbanist, Inconsolata, Noto Sans TC). Logos and favicons resolve from `assets/logos/`.

## Deploy

TBD — Vercel / Netlify / GitHub Pages decision pending. The repo has no host-specific config yet, so it's portable.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for deploy-relevant changes (HTML / asset / font updates that ship to the live site). Brand-system authoring history is tracked separately in the brand monorepo's `brand-changelog.md`.
