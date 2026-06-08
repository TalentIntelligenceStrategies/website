# Copy Workflow Playbook — ZH → EN Matching

> How we go through a product page **section by section**, match the live English to the authored Chinese, and edit it safely. Open this at the start of a copy session. Built from the licensing-page pass; applies to any of the three surfaces.

---

## The sources (and what each one is for)

| Source | Role |
|---|---|
| `website/product/<surface>/index.html` | **Ground truth.** Whatever is live is what we work with. ZH lives in `data-zh="…"`; English is the visible text. |
| `website/documents/chinese-copy-direction.md` | Irene's **strategic ZH direction** — slide-organized (e.g. Slides 21–27 = licensing page; Slides 7–9 = persona banners). Tells us the *intent* and which persona a section speaks to. |
| `website/documents/copy-audit-v1.md` | The **bilingual-parity tracker** (may be stale if the page was rebuilt — verify against the HTML). |
| `website/documents/licensing-copy-comparison.md` | The **per-page 3-way reference table** we build (HTML vs audit vs direction, with literal translations). Keep it open as the running reference; update at the end. |

---

## Golden rules

1. **Chinese is frozen.** Never change a `data-zh` value. We only edit the **English** between the tags. (Exception: a genuine *factual* error in ZH — only with explicit sign-off.)
2. **HTML is truth.** Don't trust the audit/direction docs for *what's live* — they drift. Re-read the HTML.
3. **Faithful first, then natural.** The English should carry the ZH meaning; flag (don't silently drop) anything the ZH says that the EN omits — let the user choose to cut it.
4. **One section at a time.** Build the reference table for the section, then go line-by-line / card-by-card. Wait for the user's pick before applying.
5. **Edits are local.** Changes are not live until `git push origin main`. Don't push unless asked.

---

## Step-by-step flow (per section)

1. **Scope it.** Name the section and its boundaries (e.g. "Hero," "Deliverables," "Cover-the-gap"). Find its line range in the HTML.
2. **Extract the ZH.** Pull every `data-zh` in that range:
   ```
   awk 'NR>=START && NR<=END' index.html | grep -o 'data-zh="[^"]*"'
   ```
3. **Cross-reference the docs.** Search the direction doc for the section's key ZH strings to find the source slide / persona:
   ```
   grep -nE '中文片語1|中文片語2' website/documents/chinese-copy-direction.md
   ```
   Note: is it verbatim from a slide, or section-specific copy that *echoes* a persona? Is it tracked (and current) in `copy-audit-v1.md`?
4. **Build the reference table** — one row per copy element:

   | ZH | Literal EN | Site EN (now) | Δ / status |
   |---|---|---|---|

   - **Literal EN** = a faithful plain translation of the **HTML's ZH** (for the non-ZH reader) — *not* marketing copy, *not* the Site EN.
   - **Δ** = ✅ aligned · ⚠️ EN diverges from ZH · factual bug · drops something.
5. **Go line/card by line.** For each: show ZH + Literal + current Site EN + "what's going on." User picks **keep / reword / streamline / bold**. Workshop the wording (fix typos, flag ZH drops, match house style). Apply on their go-ahead.
6. **Apply — English only.** Edit the visible text; leave `data-zh` byte-for-byte identical.
7. **Verify & move on.** Grep to confirm the change landed; reference the table; next line.

---

## Editing cheat-sheet (the technical gotchas)

**Plain text edit (no formatting):** just replace the English between the tags. `data-zh` untouched.

**Inline formatting in English (bold, links) → needs `data-zh-html`.**
- Why: the language toggle swaps plain `data-zh` elements via `textContent`, which **strips inline tags** (your `<strong>`/`<a>` would vanish at page load). Elements with the **`data-zh-html`** attribute swap via `innerHTML`, so the EN markup survives.
- So: add `data-zh-html` to the element, keep the `data-zh` value unchanged (Chinese has no tags → renders identically), and wrap the English phrase.
  ```html
  <p data-zh-html data-zh="中文不變">English with <strong style="font-weight:600">emphasis</strong>.</p>
  ```
- Links are EN-only this way (ZH stays plain, since adding `<a>` into `data-zh` would edit the Chinese).

**Emphasis weight.** Loaded weights: 400 / 500 / 600 / 700. We settled on **semi-bold 600** for glance-emphasis: `<strong style="font-weight:600">…</strong>`. (`<strong>` alone = 700/bold, usually too thick.)

**Links.** Match the partner-strip URLs; open in a new tab:
`<a href="…" target="_blank" rel="noopener noreferrer">III</a>` (iPIC `https://www.ipic.tw/`, III `https://www.iii.org.tw/en`, NYCU `https://www.nycu.edu.tw/`).

**Factual / number bugs are page-wide.** When a number or name is wrong (e.g. the 12% vs 15% discount, or iPIC vs ITRI), grep the **whole file** and fix **every** occurrence — including JS maps and screen mockups — so the page is internally consistent:
```
grep -nE '[0-9]+\s*%|[0-9]+\s*折|Save [0-9]|TERM_SAVE' index.html
```

**House style.** Em dash `—` (not `-`); bullets end with periods; product terms exact ("Verified License Badge," DLC, SABCD); `×` for the axis separator (country × industry × term).

---

## Layout / visual reimagining (separate track — *not* copy)

When the ask is to "reimagine" or restructure a section (not reword it):
1. **Copy stays frozen** — this is HTML structure + CSS only.
2. Use **AskUserQuestion** to lock the direction (framing / hierarchy / treatment) before building.
3. For unfamiliar visual ideas, build a **standalone scratch preview** (`_preview-*.html`, links `/assets/styles.css` for real fonts/tokens) so it can be seen rendered, iterated on, then **deleted**; port the winner into `index.html`.
4. Weight by **emphasis, not invented color** — the palette is B&W + strategic warm. Recede/spotlight via opacity, surface tokens, borders, shadow. (Off-palette accents like the danger-red hover are deliberate, flagged exceptions.)
5. **Preview locally:** `cd website && python3 -m http.server 8000` → open the page. Nothing is live until pushed.

---

## End-of-session

- Update the per-page comparison doc (and `copy-audit-v1.md` if its rows are now stale).
- These `documents/*.md` are **not deployed** and aren't brand `.md`s — no changelog entry or snapshot resync needed.
- Only `git push origin main` makes HTML changes live (production).
