# TIS Marketing Website — Workspace Context

## What this is

The deployable marketing site for **Talent Intelligence Strategies** (泰然策略解密),
a Taiwan-rooted IP intelligence consultancy. **Static multi-page site — hand-authored
HTML/CSS/JS, no router, no database.** Each page is self-contained HTML; shared chrome
(top nav, footer, theme toggle, language switcher) is duplicated across pages, so a
chrome change means editing every page file.

There **is** a build step now, but it does not build the site. `npm run build` produces
five files into `assets/build/` — a local three.js, a local gsap, a local lenis, and the
React-island runtime plus its token-generated Tailwind layer. The 11 pages stay hand-authored and load
those with ordinary tags. See [DESIGN.md](DESIGN.md) §15.

> The real constraint, replacing "no build step": **output must be static files servable
> from the root of `main` by GitHub Pages.**

## Deploy

Hosted on **GitHub Pages from the `main` branch**, served live at
**[tisglobalinc.com](https://tisglobalinc.com/)** (custom domain via the root
[CNAME](CNAME) + DNS in AWS Route 53; HTTPS active). Flow: commit + push to `main`
→ GitHub Pages auto-rebuilds (~30s) → live.

> **Pushing to `main` deploys to production.** There is no staging branch. Treat
> every `main` push as a live release. Never force-push `main`.

Remote: `github.com/TalentIntelligenceStrategies/website`. Asset references are
**root-relative** (`/assets/…`, `/designs/assets/…`) — works because the custom
domain serves the repo at root. Don't switch to relative paths; subpages two
levels deep would break.

## Structure

| Path | What it is |
| --- | --- |
| [index.html](index.html) | Homepage |
| [product/licensing/index.html](product/licensing/index.html) | Licensing Platform deep-dive |
| [product/signal/index.html](product/signal/index.html) | Signal deep-dive (= "Patent Intelligence SaaS" internally) |
| [assets/styles.css](assets/styles.css) | All CSS — tokens, components, page layouts |
| [assets/site.js](assets/site.js) | All JS — theme toggle, language switcher, drawer, search, slider, forms |
| [DESIGN.md](DESIGN.md) | **The design authority for this repo** — layout, spacing, type hierarchy, chrome, cards, CTA, motion, page rhythm, principles, a11y, per-page notes |
| [PRODUCT.md](PRODUCT.md) | Product register for the licensing page (surface, user, purpose). Not a design authority. |
| [designs/](designs/) | **Read-only** brand snapshots + fonts/logos/icons mirrored from the brand monorepo |
| [documents/](documents/) | Copy and script material only — PRDs, copy audits, storyboards, review tools. **Nothing here is authoritative for design.** |

A small inline `<script>` at the top of each page's `<head>` sets theme + lang
from `localStorage` before paint to avoid FOUC — keep it in sync across pages.

## Design source of truth (red line)

**Exactly two documents are authoritative. Nothing else is.**

| Authority | Owns |
| --- | --- |
| `brand/`, mirrored here as [designs/](designs/)`*-snapshot.md` | tokens, colour, logo, co-branding, badge, imagery rules, **voice** |
| [DESIGN.md](DESIGN.md) | layout, spacing, type hierarchy, chrome, cards, CTA, motion, page rhythm, per-page notes |

The snapshots are `design-tokens-snapshot.md`, `primitives-snapshot.md`,
`components-snapshot.md`, `visual-guide-snapshot.md`.

- `designs/*` are **read-only mirrors** — never author there. To change a token
  or an identity rule: edit upstream in `../brand/`, resync the matching
  `*-snapshot.md` here, *then* regenerate the rendered HTML/CSS. Never fix a
  rendered artifact or a snapshot without propagating back upstream.
  (This mirrors the source-of-truth rule in the parent `../CLAUDE.md`.)
- **No invented colors / inline hex** — use the tokens. The only sanctioned raw
  literals are the pure `#000`/`#fff` on always-dark image-backed surfaces
  (DESIGN.md §1.3).
- Where `DESIGN.md` and `assets/styles.css` disagree, **the stylesheet is what
  ships** — fix the doc. It is the implemented truth; DESIGN.md is the
  page-authoring reference.
- **No page-local `<style>` blocks.** Compose from `styles.css`. Inline blocks
  are where drift and dead CSS accumulate — the two pages that had them carried
  59% and 29% dead CSS. DESIGN.md §0.3 has the rule and the one exception.
- `documents/` is copy and script material. It has never been a design
  authority; don't treat a doc in there as one.

## Local preview & build

```
python3 -m http.server 8000     # preview — root-relative paths need a server
npm run build                   # regenerate tailwind.config.js + assets/build/
npm run verify                   # fail if committed assets/build/ has drifted from src/
```

Then open <http://localhost:8000/>. A plain file-open won't work.

`assets/build/` is **committed** — Pages serves the repo root, so the artifacts have to
be in the tree. That means they can go stale silently; run `npm run verify` before
committing anything under `src/`. `tailwind.config.js` is generated — edit
`scripts/gen-tailwind-config.mjs`, never the config.

**Deploy is unchanged:** Pages `build_type` is still `legacy`, still serving the root of
`main`. A broken build therefore still ships, because the committed artifact is what gets
served. [.github/workflows/pages.yml](.github/workflows/pages.yml) would change that —
under Actions a broken build blocks the deploy instead — but it is `workflow_dispatch`
only and not wired up. Switching is a deliberate, reversible step documented in that file;
do it from a branch and confirm the custom domain, CNAME and certificate survive first.

## Changelog

Deploy-relevant changes (HTML / asset / deploy-config) go in [CHANGELOG.md](CHANGELOG.md),
newest on top: `- **YYYY-MM-DD HH:MM +08:00** · one sentence`. Fetch the stamp
with `TZ='Asia/Taipei' date "+%Y-%m-%d %H:%M %z"`. Brand `.md` authoring history
lives upstream in the brand monorepo, not here.

## Skills

- `/goal` (built-in) — set a long-running, multi-turn goal.
- `/goal-design` (this workspace) — generate a tailored `/goal` condition prompt
  for static-site scenarios. See [.claude/skills/goal-design/SKILL.md](.claude/skills/goal-design/SKILL.md).
