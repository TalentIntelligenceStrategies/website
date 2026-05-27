---
name: goal-design
description: Generate a /goal condition prompt (≤4000 chars) tailored to TIS marketing-website scenarios — snapshot sync / design-system change / add page or section / bug-fix sweep / deploy or DNS change / perf-SEO-a11y audit / pre-deploy readiness. Each scenario ships a building-block set + template + worked example. This is a STATIC HTML/CSS/JS site on GitHub Pages — no build step, no database, no server framework.
version: 1.0.0
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
portable: true
---

# Goal Design Skill — TIS Marketing Website

> This skill **designs a `/goal` condition prompt**; it does not run the goal. It
> emits a ≤4000-char condition string for the user to paste into Claude Code as
> `/goal <condition>`. `/goal` itself is built into Claude Code — nothing to
> install; this skill only writes good conditions for it.

This workspace is the **TIS marketing website**: static `index.html` +
`product/{licensing,signal}/index.html`, shared `assets/styles.css` +
`assets/site.js`, **no build step, no router, no database**. It deploys via
**GitHub Pages from `main`** to `tisglobalinc.com`. Styling derives from the
read-only `designs/*-snapshot.md` mirrors of the brand monorepo. Every verify
clause and guardrail below is scoped to that reality — no Next.js, AWS, Prisma,
or Lambda anywhere.

## 1. When to use

| Situation | Use this skill to produce a prompt? |
| --- | --- |
| User wants a long-running goal that runs multi-turn without interruption | ✅ |
| Task scope is clear with a measurable end state | ✅ |
| One-line copy edit / single file tweak | ❌ — just do it; no goal needed |
| Read-only research / "where is X" | ❌ — use an Explore agent directly |

## 2. /goal anatomy (per https://code.claude.com/docs/en/goal)

`/goal <condition>` takes a single argument:

- ≤ 4000 chars hard cap (`/goal` rejects longer).
- An evaluator (default Haiku) reads the conversation transcript each turn and
  compares it against the condition.
- **The evaluator cannot run commands** — it only reads chat. So every check
  must be *surfaced via chat*: Claude must run the command and print its output
  into the conversation for the evaluator to see.
- `clear / stop / off / reset / none / cancel` are sub-commands that abort a goal.

Standard condition structure (shared by every template below):

```
Goal: <1-2 sentence what to do>

Done when ALL true (surface via chat — print each command result):
A. <verifiable check 1>
B. <verifiable check 2>
...

Do NOT modify:
- <guardrail 1>
- <guardrail 2>

Scope P0 (must do):
1. <task>
2. ...

Scope P1 (completeness):
N. ...

Read first:
- <doc 1>
- <doc 2>

Method:
- Atomic commit per <unit>: "<type>(<scope>): <message>"
- Push: commit + push main (this deploys live to tisglobalinc.com)
- Failure mode: <how to recover>
- Interaction: confirm before any push to main (it is production)

Stop after <N> turns if <terminal condition> not yet met; report final status.
```

## 3. Building blocks library (reusable verify clauses)

Each block is something Claude will **print to chat** so the evaluator can see
it. Compose per scenario.

### B.1 — Local HTTP smoke

```
A. `python3 -m http.server 8000 &` then `curl -sI http://localhost:8000/<path>` returns `200 OK` for each P0 page (/, /product/licensing/, /product/signal/)
B. `curl -s http://localhost:8000/<path> | grep -q "<unique DOM marker for the change>"` succeeds (key element/section present); kill the server after
```

### B.2 — Design-token compliance (no invented hex)

```
C. `grep -nE 'style="[^"]*#[0-9a-fA-F]{3,6}' index.html product/*/index.html` returns 0 matches (no inline hex in markup)
D. Any new color used in assets/styles.css resolves to a `var(--…)` token defined in :root, cross-checked against designs/design-tokens-snapshot.md — no new raw hex outside the :root token block
```

### B.3 — Asset byte-perfect vs brand mirror

```
E. `diff -rq designs/assets/fonts /Users/miko/Desktop/TIS/brand/assets/fonts` is clean (and similarly for logos / icons if touched)
```

### B.4 — Git push verify

```
F. `git push origin main` succeeds (no --force / --force-with-lease; no --no-verify)
```

### B.5 — GitHub Pages deploy verify (live serve)

```
G. ~60s after F, `curl -sI https://tisglobalinc.com/<path>` returns `HTTP/2 200`
H. `curl -s https://tisglobalinc.com/<path> | grep -q "<unique marker shipped in this change>"` succeeds (live site serves the new content)
```

### B.6 — DNS / CNAME verify

```
I. `cat CNAME` shows `tisglobalinc.com`
J. `dig tisglobalinc.com +short` returns GitHub Pages IPs (185.199.108–111.153); `dig www.tisglobalinc.com CNAME +short` returns `talentintelligencestrategies.github.io.`
```

### B.7 — Performance / SEO / accessibility verify

```
K. Lighthouse run per page prints scores; Performance & Accessibility & SEO each ≥ <target> (e.g. 90)
L. axe-core (or Chrome DevTools a11y pass) prints 0 critical violations per page
```
(If `lighthouse` / `axe` aren't installed, fall back to Chrome DevTools manually and paste the score panel — still surfaced via chat.)

### B.8 — CHANGELOG bump

```
M. CHANGELOG.md has a new top entry `- **<YYYY-MM-DD HH:MM +08:00>** · <sentence>` (stamp from `TZ='Asia/Taipei' date "+%Y-%m-%d %H:%M %z"`)
```

### B.9 — Snapshot parity vs brand monorepo

```
N. `diff designs/<name>-snapshot.md /Users/miko/Desktop/TIS/brand/<name>.md` is clean for each of the 4 snapshots (design-tokens / primitives / components / visual-guide)
```

### B.10 — Shared-chrome parity across pages

```
O. The top-nav / footer / theme-init block is structurally identical across index.html and both product/*/index.html (only the intentional /#anchor routing + aria-current deltas differ) — verified by diffing the extracted chrome region
```

### B.11 — Link & HTML integrity

```
P. No broken internal links: every href/src in the 3 pages resolves (root-relative path exists on disk or is a valid #anchor) — print the offending list (must be empty)
```

## 4. Constraints library (reusable guardrails)

### C.1 — designs/ read-only red line (always include)

```
- designs/*-snapshot.md and designs/assets/* are READ-ONLY mirrors of ../brand/ — never edit here. Change visuals upstream in ../brand/, resync the snapshot, then regenerate HTML/CSS.
```

### C.2 — No invented color (design scenarios)

```
- No raw/inline hex and no invented colors — use the --… tokens from designs/design-tokens-snapshot.md only.
```

### C.3 — Root-relative asset paths (always include)

```
- Keep asset refs root-relative (/assets/…, /designs/assets/…). Do NOT convert to relative paths — two-level-deep product pages would break.
```

### C.4 — Shared-chrome sync (page/chrome scenarios)

```
- Top nav / footer / theme-init are duplicated across all 3 pages — a chrome change must be applied to every page identically (mind the intentional /#anchor + aria-current deltas).
```

### C.5 — Destructive ops (always include)

```
- No force-push to main (--force / --force-with-lease forbidden) — main deploys live.
- No --no-verify; no --amend on existing commits (except when the user explicitly asks).
- Do not delete the CNAME file or change GitHub Pages source branch without an explicit deploy/infra goal.
```

### C.6 — Skill / config self-edit (always include)

```
- .claude/skills/* — this skill does not edit itself; flag to the user if an update is needed.
```

## 5. Scenario templates

### A — Sync design snapshots from brand monorepo

**Trigger**: `../brand/*.md` changed; refresh `designs/*-snapshot.md` here.
**Stop after**: 8 turns (read + 4 file copies + parity check).

```
Goal: Resync designs/*-snapshot.md from the brand monorepo (../brand/) so all 4 mirrors match upstream, and verify parity.

Done when ALL true (surface via chat):
<B.9 snapshot parity — clean diff for all 4>
+ Each changed snapshot copied verbatim from ../brand/<name>.md (no manual edits)
<B.8 CHANGELOG bump — "docs(designs): resync snapshots to brand <date/sha>">
<B.4 git push>

Do NOT modify:
<C.1 designs read-only — only resync, never hand-edit>
<C.5 destructive>
<C.6 skill self-edit>

Read first:
- README.md (source-of-truth section)
- designs/README.md (editing rules)
- ../CLAUDE.md (snapshot sync rule)

Method:
- Copy each upstream ../brand/<name>.md over designs/<name>-snapshot.md (and designs/assets/* if assets changed)
- Confirm B.9 diff clean before commit
- Commit + push main: "docs(designs): resync snapshots to brand <date>"
- Interaction: confirm before push (deploys live)

Stop after 8 turns if any snapshot diff not clean; report which.
```

### B — Apply a design-system change to rendered HTML/CSS

**Trigger**: a token / primitive / component changed upstream → propagate into
the rendered pages. **Stop after**: 25 turns.

```
Goal: Propagate <design change: e.g. brand primary token shift / primitive restyle> from the latest designs/*-snapshot.md into index.html + assets/styles.css (+ product pages if affected), then ship to tisglobalinc.com.

Done when ALL true (surface via chat):
<B.2 token compliance — no invented hex>
<B.3 asset byte-perfect — if assets changed>
<B.1 local HTTP smoke — 3 pages 200 + new marker present>
<B.10 chrome parity — if the change touches nav/footer>
<B.8 CHANGELOG bump>
<B.4 git push> + <B.5 GitHub Pages live serve>

Do NOT modify:
<C.1 designs read-only>
<C.2 no invented color>
<C.3 root-relative paths>
<C.4 shared-chrome sync>
<C.5 destructive>

Scope P0 (must do):
1. <specific token/primitive/component deltas from the snapshot>
2. Apply to assets/styles.css token block + affected rules
3. Apply markup deltas to index.html + product/*/index.html as needed

Scope P1 (completeness):
N. <secondary surfaces / responsive states>

Read first:
- designs/design-tokens-snapshot.md (changed §)
- designs/primitives-snapshot.md OR components-snapshot.md (changed entry)
- CHANGELOG.md (recent entries for context)

Method:
- Edit CSS tokens first, then dependent rules, then markup
- Local smoke after each batch; fix → re-run
- Commit per logical unit: "refactor(design): align <X> to <snapshot §>"
- Push main, wait ~60s, verify B.5 live
- Interaction: confirm before push (deploys live)

Stop after 25 turns if B.5 (live serve of new content) not met; report each verify ✓/✗.
```

### C — Add a page or section

**Trigger**: new product page / case study / team section / nav entry.
**Stop after**: 30 turns.

```
Goal: Add <new page or section: brief description> as static HTML wired into nav/links, styled from the snapshots, and ship it live.

Done when ALL true (surface via chat):
+ New file/section exists with content matching the brief
+ Nav + relevant links updated across all 3 pages (and footer if applicable)
<B.10 chrome parity — nav/footer remain identical across pages>
<B.11 link integrity — no broken internal links>
<B.2 token compliance>
<B.1 local HTTP smoke — new path 200 + key DOM present>
<B.8 CHANGELOG bump>
<B.4 git push> + <B.5 GitHub Pages live serve>

Do NOT modify:
<C.1 designs read-only>
<C.2 no invented color>
<C.3 root-relative paths>
<C.4 shared-chrome sync>
<C.5 destructive>

Scope P0 (must do):
1. Author the new page/section markup (self-contained HTML, root-relative assets)
2. Reuse existing components from components-snapshot.md — don't invent layout
3. Wire nav/footer/links across all 3 pages
4. Add the page-scoped CSS to assets/styles.css (token-driven)

Read first:
- designs/components-snapshot.md (relevant compositions + Surfaces: tag)
- index.html (chrome + an existing analogous section to mirror)
- README.md (Pages table + root-relative path rule)

Method:
- Mirror an existing page's structure for chrome consistency
- Local smoke as you go
- Commit per unit: "feat(<page>): add <section>"
- Push main, verify B.5 live
- Interaction: confirm before push

Stop after 30 turns if new path not serving live with correct content; report status.
```

### D — Bug-fix sweep (visual / responsive / broken-link)

**Trigger**: reported visual break, responsive glitch, dead link, or theme/lang bug.
**Stop after**: 15 turns.

```
Goal: Root-cause and fix <bug description> on <page(s)>, verify the fix locally, and ship it live.

Done when ALL true (surface via chat):
+ Root cause identified and stated to user (which file/rule, why)
+ Minimum-diff fix applied
<B.11 link integrity — if a link/anchor bug>
<B.2 token compliance — if a style fix>
<B.1 local HTTP smoke — affected page 200 + fixed behavior observable>
<B.10 chrome parity — if the fix touches shared chrome>
<B.8 CHANGELOG bump>
<B.4 git push> + <B.5 GitHub Pages live serve>

Do NOT modify:
<C.1 designs read-only>
<C.2 no invented color>
<C.3 root-relative paths>
<C.4 shared-chrome sync>
<C.5 destructive>

Read first:
- The implicated file (index.html / product/*/index.html / assets/styles.css / assets/site.js)
- `git log --oneline -10` for the regressing change
- designs/<relevant>-snapshot.md if a spec mismatch is suspected

Method:
- Reproduce locally first (python3 -m http.server; observe)
- Minimum diff; if shared chrome, apply across all 3 pages
- Commit: "fix(<scope>): <bug>"
- Push main, verify B.5 live
- Interaction: print root cause + diff, confirm before push

Stop after 15 turns if not fixed/live; report what was tried + remaining hypothesis.
```

### E — Deploy / infra change (Pages settings, CNAME, DNS)

**Trigger**: custom-domain / DNS change, Pages source branch change, HTTPS issue.
**Stop after**: 20 turns.

```
Goal: Execute <infra change: e.g. DNS record update / CNAME / Pages config>, verify resource state, and confirm the live site still serves.

Done when ALL true (surface via chat):
<B.6 DNS / CNAME verify>
<B.5 GitHub Pages live serve — / returns 200 over HTTPS>
+ Change committed if it touches repo files (CNAME / config)
<B.8 CHANGELOG bump>
<B.4 git push — if repo files changed>

Do NOT modify:
<C.5 destructive — do not delete CNAME or flip Pages source without intent>
<C.1 designs read-only>
+ Page content (this goal is infra-only)

Read first:
- README.md (Deploy section — domain + DNS provider)
- CNAME (current value)
- GitHub Pages settings (describe via gh / the Pages UI state to user)

Method:
- Print intended DNS/config change + confirm before applying (user-side at Squarespace / GitHub)
- After each change verify state (dig / curl)
- Allow DNS propagation time; re-check
- Rollback: keep the prior record values noted before changing
- Interaction: confirm before any push or external config change

Stop after 20 turns if DNS/live-serve not verified; report current resolved state + rollback values.
```

### F — Performance / SEO / accessibility audit + fix

**Trigger**: quality milestone or pre-launch polish.
**Stop after**: 30 turns.

```
Goal: Audit the 3 pages (/, /product/licensing/, /product/signal/) for performance, SEO, and accessibility; fix the top N issues; verify improvement.

Done when ALL true (surface via chat):
+ Baseline scores captured per page (before)
+ Top N issues fixed (P0 = a11y semantics / aria / contrast; P1 = LCP / CLS / image weight; SEO = meta/canonical/og)
<B.2 token compliance — contrast fixes use tokens>
<B.1 local HTTP smoke>
<B.7 perf/SEO/a11y verify — after scores > before, 0 critical a11y>
<B.8 CHANGELOG bump>
<B.4 git push> + <B.5 GitHub Pages live serve>

Do NOT modify:
<C.1 designs read-only>
<C.2 no invented color>
<C.3 root-relative paths>
<C.4 shared-chrome sync>
<C.5 destructive>

Read first:
- designs/design-tokens-snapshot.md (contrast/typography)
- designs/visual-guide-snapshot.md (identity/contrast rules)
- index.html <head> (existing meta/og/canonical to extend)

Method:
- Tool: lighthouse + axe-core (install if absent) OR Chrome DevTools manually with pasted score panel
- Atomic commit per fix: "fix(a11y|perf|seo): <page> — <issue>"
- Re-audit only after all fixes; print before/after
- Push main, verify B.5 live
- Interaction: confirm before push

Stop after 30 turns if scores not improved; report what was fixed + remaining gaps.
```

### G — Pre-deploy readiness check

**Trigger**: about to ship a batch of changes live.
**Stop after**: 10 turns.

```
Goal: Verify the site is deploy-ready, update CHANGELOG, and ship to tisglobalinc.com.

Done when ALL true (surface via chat):
<B.1 local HTTP smoke — all 3 pages 200 + key DOM>
<B.2 token compliance>
<B.11 link integrity>
<B.10 chrome parity>
+ `git status` clean after commit
+ `git log --oneline -5` shows the release-prep commit
<B.8 CHANGELOG bump>
<B.4 git push> + <B.5 GitHub Pages live serve>

Do NOT modify:
<C.5 destructive>
<C.1 designs read-only>

Read first:
- CHANGELOG.md (format + recent entries)
- README.md (Deploy flow)

Method:
- Run all gates first; fix any gap before pushing
- One CHANGELOG entry summarizing the batch
- Push main, wait ~60s, verify B.5 live
- Interaction: confirm before push (this is the production release)

Stop after 10 turns if any gate fails; report the blocker.
```

## 6. Composition workflow (new scenario not in §5)

When a scenario isn't A–G, build the condition like this:

1. **Identify trigger** — what event starts this goal?
2. **Identify done state** — what can the evaluator see in the chat transcript?
3. **Pick building blocks (§3)** — choose verify clauses B.1–B.11.
4. **Pick constraints (§4)** — choose guardrails C.1–C.6 (C.1/C.3/C.5/C.6 are
   near-always-on for this repo).
5. **Define scope** — P0 must-do vs P1 completeness (defer P2+).
6. **Identify read-first docs** — at least 2–3 (README / snapshot / CHANGELOG).
7. **Choose method** — atomic commits, push timing, confirm-before-push gate.
8. **Choose stop-after cap** — simple 8–15, complex 25–30.
9. **Compose condition string** — < 4000 chars.
10. **Test parse** — `wc -c` to confirm ≤ 4000; re-read for evaluator-friendliness
    (is every verify genuinely surfaceable to chat?).

## 7. Worked example — Scenario B, propagate a brand primary-color token change

User asks: "The brand primary token shifted in the monorepo — push it into the
live site."

Apply the Scenario B template and fill in:

- `<design change>` = "Update `--color-primary` (+ hover/active derivatives) in
  `assets/styles.css` :root to match the new value in
  `designs/design-tokens-snapshot.md` §color."
- Verify blocks: B.2 (no invented hex — new value lives only in the :root token),
  B.1 (3 pages 200 + a button/CTA renders the new color), B.8 (CHANGELOG), B.4 +
  B.5 (push + live serve of new content).
- Constraints: C.1 + C.2 + C.3 + C.5.
- P0 = swap the token value(s) in the :root block; confirm no rule hard-codes the
  old hex (grep). P1 = check dark-theme token pair if one exists.
- Read first = `design-tokens-snapshot.md` §color, `index.html` (a CTA to eyeball),
  `CHANGELOG.md`.
- Method = edit token → local smoke → commit `refactor(design): align primary
  token to snapshot` → push main → verify live.
- Stop after = 25 turns.

→ Emits a ~2,400-char condition. Run `wc -c` on the fenced block to confirm ≤ 4000
before handing it to the user.

## 8. Common pitfalls

| Pitfall | Why it breaks | Avoid |
| --- | --- | --- |
| Abstract condition ("make the site look nicer") | Evaluator can't判定; goal runs forever | Use measurable end state (curl returns 200, marker present, pushed) |
| Check requires the evaluator to run a command | The evaluator only reads chat | Have Claude run `<cmd>` and **print** the output; evaluator reads the print |
| No stop-after cap | Pages rebuild lag / DNS flake → infinite retry burns tokens | Always add `Stop after N turns … report final status` |
| Scope too big (P0+P1+P2 all in) | 30+ turns won't finish; partial results lost | Defer P2 to a later goal; keep this one to P0 + essential P1 |
| Editing designs/* or inventing hex | Violates the source-of-truth red line | Always include C.1 + C.2; change upstream in ../brand/ first |
| Treating a `main` push as harmless | `main` deploys live to tisglobalinc.com | Always include C.5; confirm-before-push gate; verify B.5 after |
| Switching to relative asset paths | Two-level product pages break | Always include C.3 |
| Forgetting GitHub Pages rebuild lag | B.5 fails if checked too soon | Wait ~60s after push before curling the live URL |
| 4000-char overflow | `/goal` rejects it | `wc -c` to verify; tighten method/scope; cite read-first docs by path, not content |

## 9. Skill invocation pattern

User typically says: "Give me a `/goal` condition to do X" or "design a `/goal`
prompt for Y."

Steps:

1. Confirm scenario type (A–G or custom).
2. Gather scenario-specific data:
   - `<design change>` — which token / primitive / component, which snapshot §?
   - `<new page/section>` — what content, which nav placement?
   - `<bug>` — which page, what symptom?
   - `<infra change>` — DNS / CNAME / Pages config?
3. Apply the template and fill the blocks.
4. Run `wc -c` on the composed condition to confirm ≤ 4000.
5. Print the fenced condition for the user to copy into `/goal <condition>`.

## 10. Changelog

- **2026-05-27** · v1.0 — first version, tailored to the TIS marketing website.
  7 scenarios (A–G) + 11 building blocks (B.1–B.11) + 6 constraints (C.1–C.6) +
  composition workflow + worked example (brand primary-token propagation).
  Re-scoped from the operations-site licensing-app skill: dropped Amplify /
  Lambda / Prisma / Next.js / sibling-spec-repo blocks; replaced with static-site
  smoke, GitHub Pages deploy verify, DNS/CNAME, snapshot parity, and chrome-parity
  checks. Source: official `/goal` docs at https://code.claude.com/docs/en/goal.
