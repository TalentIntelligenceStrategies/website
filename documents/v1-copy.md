# v1-copy.md — Source of truth for `website/index.html` copy

This document is **authoritative** over the copy that ships into [`../index.html`](../index.html). Edit here first; the HTML is a rendered view.

**Status legend**
- 🟢 live on `index.html` — copy is currently shipping
- 🟡 working draft — in progress in this doc, not yet shipped
- 🔴 not yet worked on — section / row untouched

**Provenance** — Distilled from [`chinese-copy-direction.md`](chinese-copy-direction.md) (Irene's strategic deck, slides 1–33). Design notes preserved verbatim where Irene supplied them.

**Editing protocol** — Edit a row here first. When status flips to 🟢, transcribe both the visible-text and `data-zh` attribute into [`../index.html`](../index.html) in the same commit. Never edit copy directly in `index.html` without back-propagating to this file — the doc will silently desync.

---

## Marketing popup (`#mkt-overlay`)

_(populated in later batch)_

## Announcement banner

_(populated in later batch)_

---

## Hero — Slide A · 王董 · Export SME

**Persona:** Taiwanese export-SME owner. Familiar with 旅平險 / 水險 insurance mindset, unfamiliar with patent jargon. **Source:** [`chinese-copy-direction.md` lines 215–251](chinese-copy-direction.md#L215-L251) (slide 7).

**Architectural note:** Whether this slide *replaces* existing `#hero-slide-0` (positioning), *replaces* `#hero-slide-1` (licensing), or is *added* as a new persona slot is an open UX decision ([`chinese-copy-direction.md:213`](chinese-copy-direction.md#L213)). Element IDs below use a provisional `-A` suffix — revisit once the slot decision lands.

**EN draft source:** EN cells below pulled from existing `#hero-slide-0` (Positioning) — pending persona-tuned EN rewrite for export-SME voice.

### Eyebrow

| 中文 | Literal EN (crib) | EN | Element | Status |
|---|---|---|---|---|
| — | — | An IP intelligence consultancy | `#hero-slide-A .pillar-eyebrow` · key `home-hero-a-eyebrow` | 🟡 |

EN-only — no ZH translation needed. EN pulled from existing `#hero-slide-0`; persona-tuned eyebrow (insurance / export framing) still TBD.

### Headline

| 中文 | Literal EN (crib) | EN | Element | Status |
|---|---|---|---|---|
| 出國保旅平險。出口保專利險。 | Going abroad, insure travel-accident. Exporting, insure patent. | Turning patent complexity into market position. | `#hero-slide-A .pillar-title` · key `home-hero-a-headline` | 🟡 |

### Subhead — line 1

| 中文 | Literal EN (crib) | EN | Element | Status |
|---|---|---|---|---|
| 律師費 500 萬 + 整批退貨 + 三倍懲罰，水險都買，專利險怎麼能不買？ | Lawyer fee NT$5M + whole-batch return + triple-damages — even water insurance you buy; how can you not buy patent insurance? | Clarity on IP strength, exposure, and strategic position | `#hero-slide-A .pillar-sub` line 1 · key `home-hero-a-subhead` | 🟡 |

### Subhead — line 2

| 中文 | Literal EN (crib) | EN | Element | Status |
|---|---|---|---|---|
| 月租不到 1 萬，30 件大廠專利授權，立即生效。 | Monthly rent under NT$10K, 30 large-company patent licenses, immediate activation. | — in days, not months. | `#hero-slide-A .pillar-sub` line 2 · key `home-hero-a-subhead` | 🟡 |

### CTA — primary

| 中文 | Literal EN (crib) | EN | Element | Destination | Status |
|---|---|---|---|---|---|
| 試跑專利包 | try-run patent bundle | How we work | `#hero-slide-A .btn-primary` · key `home-hero-a-cta-primary` | Licensee Portal visitor Feed (FR-01, MVP August) | 🟡 |

### CTA — secondary

| 中文 | Literal EN (crib) | EN | Element | Destination | Status |
|---|---|---|---|---|---|
| 專利標章加持用法 | patent badge empowerment usage | Talk to us | `#hero-slide-A .btn-secondary` · key `home-hero-a-cta-secondary` | `/badge-showcase` page (new, 1–2 weeks) | 🟡 |

### Design notes (Irene)

- 「出國 / 出口」 parallel structure leverages SME owners' familiar insurance mindset.
- Subhead amounts are concrete (NT$5M lawyer fee + monthly rent under NT$10K), no exaggeration.
- 「試跑專利包」 is a brand-able verb; reused as C secondary CTA.

---

## Hero — Slide B · Wang Partner · VC IPDD

**Persona:** Taiwanese VC partner running IP due diligence on portfolio targets. Reads IC memos and LP quarterly reports; "patent strength" is unfamiliar as a structured input. **Source:** [`chinese-copy-direction.md` lines 253–289](chinese-copy-direction.md#L253-L289) (slide 8).

**Architectural note:** Provisional slot is current `#hero-slide-2` (Signal Platform). Same open decision as Slide A.

**EN draft source:** EN cells below pulled from existing `#hero-slide-2` (Signal Platform) — pending persona-tuned EN rewrite for VC-IPDD voice.

### Eyebrow

| 中文 | Literal EN (crib) | EN | Element | Status |
|---|---|---|---|---|
| — | — | Signal Platform | `#hero-slide-B .pillar-eyebrow` · key `home-hero-b-eyebrow` | 🟡 |

EN-only — no ZH translation needed. EN pulled from existing `#hero-slide-2`; per design note, avoid "SABCD" in the eyebrow when persona-tuned rewrite happens.

### Headline

| 中文 | Literal EN (crib) | EN | Element | Status |
|---|---|---|---|---|
| 技術含金量高不高，看排名就知道。 | Whether the tech's gold-content is high — look at the ranking and you'll know. | Grading IP strength into an actionable report. | `#hero-slide-B .pillar-title` · key `home-hero-b-headline` | 🟡 |

### Subhead — line 1

| 中文 | Literal EN (crib) | EN | Element | Status |
|---|---|---|---|---|
| SABCD 五級評分 + 同產業 cohort 排名。 | SABCD five-tier scoring + same-industry cohort ranking. | Scored across 50 indicators, against its industry peers | `#hero-slide-B .pillar-sub` line 1 · key `home-hero-b-subhead` | 🟡 |

**Internal flag:** Irene's design note (below) says "hero doesn't use brand terms like 'SABCD' (reader hasn't been introduced yet)" — but the subhead string above does. Faithful to the source deck; raise with Irene whether to substitute generic "五級評分" for the hero placement.

### Subhead — line 2

| 中文 | Literal EN (crib) | EN | Element | Status |
|---|---|---|---|---|
| 一份可直接附入 IC memo 或 LP 季報的標準化報告。 | A standardized report you can attach directly to an IC memo or LP quarterly report. | — back in hours, not weeks. | `#hero-slide-B .pillar-sub` line 2 · key `home-hero-b-subhead` | 🟡 |

### CTA — primary

| 中文 | Literal EN (crib) | EN | Element | Destination | Status |
|---|---|---|---|---|---|
| 免費預覽報告樣本 | free preview report sample | View product | `#hero-slide-B .btn-primary` · key `home-hero-b-cta-primary` | Signal 5-tier SABCD sample page (live on site) | 🟡 |

### CTA — secondary

| 中文 | Literal EN (crib) | EN | Element | Destination | Status |
|---|---|---|---|---|---|
| 專利評級怎麼算 | how patent rating is calculated | Contact sales | `#hero-slide-B .btn-secondary` · key `home-hero-b-cta-secondary` | `/methodology` page (new, 1–2 weeks) | 🟡 |

### Design notes (Irene)

- Core wedge: lawyers tell you "legal"; TIS tells you "strong / not-strong" — a different product category.
- Don't emphasize speed (VCs aren't rushed; would rather pass than misinvest) — emphasize answer quality.
- Hero doesn't use brand terms like "SABCD" (reader hasn't been introduced yet); CTA uses generic "patent rating."

---

## Hero — Slide C · 美玉姐 · Grant / Tender SME

**Persona:** Taiwanese SME owner pursuing government grants / tenders. Daily work is form-filling against reviewer checklists; "social proof" is institutional names. **Source:** [`chinese-copy-direction.md` lines 291–327](chinese-copy-direction.md#L291-L327) (slide 9).

**Architectural note:** No existing slot — this is a net-new banner. Element IDs below are provisional.

**EN draft source:** EN cells below pulled from existing `#hero-slide-1` (Licensing Platform) — pending persona-tuned EN rewrite for grant/tender-SME voice.

### Eyebrow

| 中文 | Literal EN (crib) | EN | Element | Status |
|---|---|---|---|---|
| — | — | Licensing Platform | `#hero-slide-C .pillar-eyebrow` · key `home-hero-c-eyebrow` | 🟡 |

EN-only — no ZH translation needed. EN pulled from existing `#hero-slide-1`; persona-tuned eyebrow (grant/tender / institutional social proof) still TBD.

### Headline

| 中文 | Literal EN (crib) | EN | Element | Status |
|---|---|---|---|---|
| 泰然專利包為你的補助申請加分。 | Tairan Patent Bundle adds points to your grant application. | From patent coverage to an offensive claim. | `#hero-slide-C .pillar-title` · key `home-hero-c-headline` | 🟡 |

**Shipping blocker:** Whole C-banner ships together; gated by the 三大法人 disclosure scope on subhead line 1 (see below).

### Subhead — line 1

| 中文 | Literal EN (crib) | EN | Element | Status |
|---|---|---|---|---|
| 評審認可的是創智、資策會、陽明交大的優質保證。 | What the reviewers recognize is the quality assurance of 創智 / 資策會 / 陽明交大. | Subscribe to a 30-patent bundle, | `#hero-slide-C .pillar-sub` line 1 · key `home-hero-c-subhead` | 🟡 |

**Shipping blocker:** Names 創智 / 資策會 / 陽明交大 — disclosure scope pending legal + Innovue clearance ([`chinese-copy-direction.md:69`](chinese-copy-direction.md#L69)).

### Subhead — line 2

| 中文 | Literal EN (crib) | EN | Element | Status |
|---|---|---|---|---|
| 30 件合法授權專利以你公司名義可用，月租不到 1 萬。 | 30 legally-licensed patents usable under your company's name, monthly rent under NT$10K. | curated for your jurisdiction and industry. | `#hero-slide-C .pillar-sub` line 2 · key `home-hero-c-subhead` | 🟡 |

### CTA — primary

| 中文 | Literal EN (crib) | EN | Element | Destination | Status |
|---|---|---|---|---|---|
| 試跑專利包 | try-run patent bundle | View product | `#hero-slide-C .btn-primary` · key `home-hero-c-cta-primary` | Licensee Portal visitor Feed (FR-01, MVP August) | 🟡 |

### CTA — secondary

| 中文 | Literal EN (crib) | EN | Element | Destination | Status |
|---|---|---|---|---|---|
| 了解授權方案 | understand licensing options | Contact sales | `#hero-slide-C .btn-secondary` · key `home-hero-c-cta-secondary` | Transparent pricing page (FR-03, MVP August — verify) | 🟡 |

### Design notes (Irene)

- The three institution names (創智 / 資策會 / 陽明交大) are the protagonists — strongest social proof.
- 「加分」 / 「填得滿」 ("add points" / "fill out completely") are form-filling verbs matching 美玉姐's daily work.
- 「加持」 is approved Taiwanese slang; international (EN) version uses "Badge Use Cases" framing instead.

---

## Hero — Slide: Positioning (`#hero-slide-0`)

_(populated in later batch — currently in `index.html`; may be retired pending the architectural decision above)_

## Hero — Slide: Licensing Platform (`#hero-slide-1`)

_(populated in later batch)_

## Hero — Slide: Signal Platform (`#hero-slide-2`)

_(populated in later batch)_

## Exclusive Patent Access (partner strip)

_(populated in later batch)_

## Stats counter

_(populated in later batch)_

## Products — Licensing Platform pillar (`#products`)

_(populated in later batch)_

## Products — Signal Platform pillar

_(populated in later batch)_

## Latest reports (`#reports`)

_(populated in later batch)_

## Press releases (`#press`)

_(populated in later batch)_

## About (`#about`)

_(populated in later batch)_

## Contact form (`#contact`)

_(populated in later batch)_

## Footer

_(populated in later batch)_
