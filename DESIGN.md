# Design — Licensing Platform landing page

Surface-local working spec for the redesign of `product/licensing/index.html`. This is the build contract: it composes the shared system in `assets/styles.css` (tokens, locked chrome, universal components) into a page-scoped visual language. It is **not** a mirror of `brand/*.md`; it is the direction the redesign commits to.

## Aesthetic direction — "The coverage dossier"

A chaptered, instrument-grade document a composed advisor (泰然) walks 王董 through, replacing a vague legal dread with the calm of someone who already holds coverage. Reference lane, named: **Stripe-restraint precision meets a sealed private-bank dossier** — monochrome ink on white/warm-white, exact type, generous air, with the warm gold→orange ramp rationed like a wax seal. Explicitly **not** hype-SaaS, **not** editorial-serif, **not** brutalist.

Why the dossier framing licenses the moves impeccable bans by reflex:
- **Numbered chapter markers (01–07)** are legitimate: the page *is* a single 7-beat narrative (PRD §3), a real ordered sequence, not decorative scaffolding. They replace the banned "kicker above every section."
- **Monospace (Inconsolata)** is literal, not costume: it sets patent IDs (`US10892431`), tier counts, license numbers, dates, figures — genuine technical registers.
- The warm ramp as a **seal/foil**, never a fill behind text.

## Theme

Light default, dark supported (tokens already themed in `styles.css`). The body carries on white + `#252525` ink + the N-grayscale. "Warmth" is carried by *accent, a few warm-white section grounds, and the seal* — never by a cream body wash (that warm-near-white band is the AI default the page must avoid).

## Color

Strategy: **Restrained** — tinted-neutral grounds + one accent system used <15% of surface. Map to existing `styles.css` tokens; introduce no raw hex beyond the page-scoped warm-ramp tokens (already defined in `design-tokens.md`).

| Role | Token | Use |
|---|---|---|
| Ink / body | `--text-primary` #252525, `--text-secondary` #474747 | All copy. Body ≥ secondary for ≥4.5:1. |
| Muted meta | `--text-tertiary` #8A8F98 | Labels, captions only — never body. |
| Page ground | `--surface-page` #FFFFFF | Default sections. |
| Warm ground | page-scoped `--lic-surface-alt` #FBF7F1 | *Alternating* dossier sections, sparingly. |
| Hairlines | `--border-primary` #EEEEEE | Rules, dividers, the dossier grid. |
| **Seal accent** | warm ramp `#8B6914 → #C2410C` | Hero accent, chapter index tick, one emphasized word per major heading (solid, not clipped), primary-CTA underglow, the distribution bar origin. Rationed. |
| Tier data | `--score-{s,a,b,c,d}` / `-vivid` | SABCD distribution bar, tier chips, patent dots **only**. |
| Status | `--warning-*`, `--info-*`, `--success-*` | §11 scenario chips, save badges. |

**Banned here (carried over and enforced):**
- **No gradient-clipped text.** The current `.lic-h2 em` and `.lic-stat-num` gradient fills are removed. Emphasis = weight + the *one* solid warm word, or a thin warm rule under the word — never `background-clip:text`.
- **No hero-metric gradient template.** Numbers render in mono ink with a unit, set in the dossier grid, not as glowing gradient numerals.

## Typography

One family, committed weight/scale contrast. **Urbanist** (display + body), **Inconsolata** (mono: IDs, figures, chapter numbers, dates), **Noto Sans TC** (中文) — all already self-hosted. No fourth family.

Fluid modular scale, ratio ≥1.25, heading max ≤ ~84px, letter-spacing floor −0.04em:

| Step | clamp | weight / tracking | role |
|---|---|---|---|
| Display (hero) | `clamp(40px, 6vw, 76px)` | 700 / −0.035em / lh 1.04 | hero h1 |
| H2 (chapter title) | `clamp(30px, 4vw, 50px)` | 700 / −0.025em / lh 1.1 | section headings |
| H3 | `clamp(20px, 2vw, 26px)` | 600 / −0.015em | tile / beat titles |
| Lead | `clamp(17px, 1.6vw, 21px)` | 400 / lh 1.6 | section subheads |
| Body | 16px (15px dense) | 400 / lh 1.6 | prose, max 68ch |
| Figure (mono) | `clamp(30px, 4vw, 52px)` | 700 / −0.02em | NT$, counts |
| Meta / label (mono) | 12px | 600 / 0.14em / uppercase | chapter no., tier counts, eyebrows-as-index |

`text-wrap: balance` on h1–h3; `text-wrap: pretty` on prose. Chinese (`html[lang=zh-Hant]`) drops the negative tracking and tightens line-height per the existing TC handling.

## Spacing & rhythm

8px base. Section padding fluid `clamp(72px, 9vw, 128px)`; vary deliberately — the honest-edges (§11) and pricing (§14) beats get more air; rapid proof beats (§10 timeline) get less. The unifying structure is a **dossier spine**: a thin left rule / chapter index that threads the narrative sections, giving the page a documentary backbone instead of a stack of identical cards. Group tightly within a beat, separate generously between chapters.

## Layout & composition

Break the "everything is a bordered card" monotony — each chapter gets the affordance that fits, not a default tile:
- **§2 Hero** — asymmetric: oversized type left, a framed credential/seal slot right (IMAGE SLOT A). Warm seal accent on one word + a thin rule.
- **§3 Why now** — editorial two-column: argument prose + a single pulled figure (NT$50,000+), no card.
- **§4 Cost of going alone** — a 3-row *comparison ledger* (not three equal cards): File / Hire / Subscribe, the TIS row weighted by treatment (warm seal rule + ground), figures in mono.
- **§5 What TIS gives** — 4 numbered beats as a stepped list with a credential-badge slot (IMAGE SLOT B), not a 4-card grid.
- **§6 Why thirty** — 1 / 100 / 30 as a three-stop argument with count-up figures in the dossier grid (no gradient).
- **§7 SABCD** — the proportional distribution bar (5·6·9·6·4) is the hero element; 5 tier role-lines as a compact legend, data-colored.
- **§8 How AI picks** — three axes as a labeled triple + one wide output panel; add the 5-min-vs-24-hr framing line.
- **§9 How it works** — keep the universal `howitworks` accordion + step-shot component (byte-identical copy to homepage; reuses screenshots 01–05).
- **§10 The week after** — horizontal timeline rail Day 1 → Week 2 along the dossier spine.
- **§11 When it doesn't go to plan** — three scenario panels with real weight + status chips; the coda gets a full-width composed line.
- **§12 Inventory ticker / §13 partner band / §14 pricing builder / §15 FAQ / §16 contact** — keep the working universal components; restyle to the dossier language, preserve all JS contracts.

Responsive: single fluid system, `clamp()` everywhere, `repeat(auto-fit, minmax())` for any true grid. Test hero + chapter headings at 360 / 768 / 1280 — no overflow.

## Components (page-scoped)

- **Chapter head**: mono index (`01` … warm tick) + H2 with one solid warm word + lead. Replaces `.lic-eyebrow` repeated-kicker grammar.
- **Dossier figure**: mono numeral + unit + caption, on hairline grid. Replaces gradient stat tiles.
- **Comparison ledger row** (§4): label · figure · note, full hairline borders, TIS row weighted.
- **Distribution bar** (§7): keep the tier-colored proportional segments; animate widths on reveal.
- **Timeline rail** (§10): day marker + headline + body threaded on the spine.
- **Reused universal**: `topnav`, `footer`, `announce`, `howitworks/acc-*`, `v2-section` ticker, `partner-strip`, `bp-*` bundle picker, `brand-select`, `contact-form`, `tier-chip` — all keep their markup/JS contracts; only page-scoped skin changes.

Cards only where a card is the true affordance (scenario panels, inventory rows). No nested cards.

## Motion

Composed = orchestrated restraint, not micro-interaction confetti. Ease-out only (`cubic-bezier(0.16,1,0.3,1)`); no bounce.
- One deliberate hero entrance (type + seal settle).
- Scroll reveals that **enhance an already-visible default** — keep `[data-reveal]` driven by `site.js` (it falls back to instant under reduced-motion / no-IO); stagger only within a list, never one uniform reflex per section.
- Count-up on real figures via the existing `.counter[data-target]` hook (reduced-motion shows final value).
- Distribution-bar segments grow from 0 width on reveal.
- `prefers-reduced-motion: reduce` → all reveals instant, counters final, bar static. Content never hidden behind a never-firing transition.

## Voice (enforced in copy)

泰然, anti-hype. Banned EN (may/could, AI-powered, revolutionary, disruptive, unlock, empower, seamless, leverage v., solutions, world-class, actionable insights, trusted by) and ZH (革命性/顛覆性/智能-prefix/完全/業界領先/賦能). No em dashes in *new* copy (existing verbatim PRD copy is preserved as-is). Anchor numbers verbatim. Credit Innovue once near the top. Never invent ZH — EN visible fallback + `<!-- TODO ZH -->` for every `[ZH NEEDED]` gap.
