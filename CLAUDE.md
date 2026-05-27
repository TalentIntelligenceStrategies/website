# TIS Marketing Website — Workspace Context

## What this is

The deployable marketing site for **Talent Intelligence Strategies** (泰然策略解密),
a Taiwan-rooted IP intelligence consultancy. **Static multi-page site — plain
HTML/CSS/JS, no build step, no router, no database.** Each page is self-contained
HTML; shared chrome (top nav, footer, theme toggle, language switcher) is
duplicated across pages, so a chrome change means editing every page file.

## Deploy

Hosted on **GitHub Pages from the `main` branch**, served live at
**[tisglobalinc.com](https://tisglobalinc.com/)** (custom domain via the root
[CNAME](CNAME) + DNS at Squarespace; HTTPS active). Flow: commit + push to `main`
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
| [designs/](designs/) | **Read-only** brand snapshots + fonts/logos/icons mirrored from the brand monorepo |

A small inline `<script>` at the top of each page's `<head>` sets theme + lang
from `localStorage` before paint to avoid FOUC — keep it in sync across pages.

## Design source of truth (red line)

This repo is a **rendered view** of the private TIS brand monorepo (at
`../brand/`). Styling derives from `designs/*-snapshot.md`:
`design-tokens-snapshot.md`, `primitives-snapshot.md`, `components-snapshot.md`,
`visual-guide-snapshot.md`.

- `designs/*` are **read-only mirrors** — never author there.
- **No invented colors / inline hex** — use the tokens defined in the snapshots.
- To change visual design: edit upstream in `../brand/`, resync the matching
  `*-snapshot.md` here, *then* regenerate the rendered HTML/CSS. Never fix a
  rendered artifact or a snapshot without propagating back upstream.

(This mirrors the source-of-truth rule in the parent `../CLAUDE.md`.)

## Local preview

```
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. A plain file-open won't work — root-relative
paths need a server.

## Changelog

Deploy-relevant changes (HTML / asset / deploy-config) go in [CHANGELOG.md](CHANGELOG.md),
newest on top: `- **YYYY-MM-DD HH:MM +08:00** · one sentence`. Fetch the stamp
with `TZ='Asia/Taipei' date "+%Y-%m-%d %H:%M %z"`. Brand `.md` authoring history
lives upstream in the brand monorepo, not here.

## Skills

- `/goal` (built-in) — set a long-running, multi-turn goal.
- `/goal-design` (this workspace) — generate a tailored `/goal` condition prompt
  for static-site scenarios. See [.claude/skills/goal-design/SKILL.md](.claude/skills/goal-design/SKILL.md).
