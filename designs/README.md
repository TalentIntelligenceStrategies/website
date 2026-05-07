# website/designs/

Read-only snapshot mirrors of the TIS brand `.md`s. Reference material for building the marketing site against the TIS brand system.

## What lives here

- **`primitives-snapshot.md`** — read-only mirror of `TIS/brand/primitives.md` (atomic UI elements: Button, Input, Toggle, Tooltip, Stat card, Image frame, Chip family with Status chip + Signal dot subsections).
- **`components-snapshot.md`** — read-only mirror of `TIS/brand/components.md` (composed components: Modal, Top nav, Footer, Tabs, etc., AND surface-specific compositions like Patent card / Pillar / Verified License Badge / IP intelligence drop popup with `Surfaces:` tag annotating who uses each).
- **`design-tokens-snapshot.md`** — read-only mirror of `TIS/brand/design-tokens.md` (color, type, motion, semantic tokens).
- **`visual-guide-snapshot.md`** — read-only mirror of `TIS/brand/visual-guide.md` (logo, identity, name usage, badge construction).
- **`previews/`** — `components-preview.html` (the component catalog preview). Hero exploration HTMLs (blueprint / pattern) were moved to `brand/archive/previews/` upstream and intentionally aren't mirrored here. Asset paths in this preview point at `../assets/` and were authored to live under `brand/previews/`, so font / logo paths may not resolve — read the source as spec, not as live render.

## Editing rules

- **Never edit any file in this folder.** All four `.md`s are read-only mirrors. There is no editable file in this folder. To change a primitive or component, edit upstream in `TIS/brand/` and resync the matching `*-snapshot.md` here.
- **Adding a website-specific component** (e.g. another marketing-surface composition like Pillar) — author it upstream in `brand/components.md` with `Surfaces: website` tagged, then resync `components-snapshot.md` in both consumer repos.

## Source of truth

The TIS brand monorepo (kept private) is authoritative. See [../README.md](../README.md) for the full source-of-truth pointer and the marketing-site repo intro.
