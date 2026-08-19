# Chinese Copy Direction — TIS Website

> Canonical source for the TIS website's Chinese-market copy. Decoupled from the English site — these are **not** 1:1 translations. Every Chinese string is preserved verbatim from Irene's PDF (`TIS官網文案重寫_創意策略提案_簡報_v1_0.pdf`, dated 2026-05-25), paired with a literal word-for-word English translation, plus an "English (TBD)" column that Miko fills in manually one entry at a time.

---

## How to read this doc

**3-column tables (shipping copy):**

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| (exact Chinese from PDF) | (word-for-word EN, preserves rhythm) | (Miko's manual EN, filled in over time) | 🟢 / 🟡 / ⚪ + YYYY-MM-DD |

**Shipped legend (emoji + date, scannable at a glance):**

- 🟢 **YYYY-MM-DD** — ZH copy is live on `index.html` or the matching product page.
- ⚪ — Not yet shipped. Cell may be blank.

**Scope:** This column tracks **copy shipping only**, not destination readiness. A CTA row whose text is live but whose `href` still points at a placeholder (because the target page hasn't been built) is fully 🟢 — note the href TODO as inline metadata after the date, e.g. `🟢 2026-05-30 · href TODO: /badge-showcase`. Destination/build tracking belongs in the surface repo's issue tracker or the "Open sign-off items" §, not in this column.

The `Shipped` column grows on a table the first time any row inside it ships. The block's `Status:` line keeps Irene's original `Strategic direction` / `Direct edit — apply when ready` label — that describes intent, not shipping state.

**Block headers (per copy element):**
- **Key:** machine-parseable copy-key in `surface-section-element` form, used by the future i18n generator
- **File:** path to the HTML that renders this block (or "Not yet on site" for net-new copy)
- **Selector:** CSS selector or `id`
- **Status:** `Strategic direction` (Irene's framing, not direct copy) or `Direct edit — apply when ready`

**Status legend:**
- `Strategic direction` — Irene's reframing for the Chinese market. Discuss before applying.
- `Direct edit — apply when ready` — Direct replacement for existing site copy. Apply once EN side is locked.

**Translation flavor:** literal / word-for-word — preserves Chinese rhythm, idioms, and Taiwanese slang (e.g. `加持` → "empowerment / blessing", not smoothed to "endorsement"). Don't smooth the literal column — that's Miko's job in `English (TBD)`.

---

## Adopted product names + locked brand phrases

Irene's recommendations, locked here so they don't drift across sections.

### Product names

| 中文 | Literal translation | English (TBD) | Maps to | Shipped |
|---|---|---|---|---|
| 泰然專利防護網 | "Tairan Patent Protection Net" | TBD | Licensing Platform (Irene's Option 1, recommended; `泰然` prefix replaces earlier `TIS` per 2026-05-30 decision — `TIS 泰然X` is redundant since 泰然 *is* TIS's Chinese name) | 🟢 2026-05-30 |
| 泰然專利強度評級系統 | "Tairan Patent Strength Rating System" | TBD | SABCD grading (Irene's Option 2, recommended) | 🟢 2026-05-30 |

### Product-line naming triplet (slide 11)

| 中文 | Literal translation | English (TBD) | Audience angle |
|---|---|---|---|
| 泰然專利險 | "Tairan Patent Insurance" | TBD | A-angle (王董, export SME) |
| 泰然 SABCD | "Tairan SABCD" | TBD | B-angle (Wang Partner, VC) |
| 泰然專利包 | "Tairan Patent Bundle" | TBD | C-angle (美玉姐, grant SME) |

### Internal / English contracts (slide 11)

- **TIS Licensing Bundle** — used by A and C personas in contract / international contexts
- **TIS Signal Token** — used by B persona

### Locked brand phrases

| 中文 | Literal translation | English (TBD) | Where it lives |
|---|---|---|---|
| 試跑專利包 | "try-run patent bundle" | TBD | A primary CTA + C secondary CTA (universal verb) |
| 智財防彈衣 | "smart-IP bulletproof vest" | TBD | A-angle metaphor (use sparingly) |
| 看排名就知道 | "look at the ranking and you'll know" | TBD | B-angle hero close |
| 為你的補助申請加分 | "add points to your grant application" | TBD | C-angle hero |
| 標章加持用法 | "badge empowerment usage" | TBD | C-angle secondary CTA (Taiwanese slang `加持` approved by Irene) |

---

## Open sign-off items (block shipping)

From slide 33 — copy cannot ship until these resolve:

1. **三家機構 disclosure scope** — 創智 (Industrial Technology Research Institute / iPIC), 資策會 (III), 陽明交大 (NYCU). Legal + Innovue clearance on what's disclosable in marketing.
2. **Signal Token pricing visibility** — Path 2 (don't disclose amounts) duration; sales pipeline quote mechanism; VC fund-level annual plan availability. Owner: product team.
3. **MVP August timeline** — FR-01 (visitor feed) / FR-03 (transparent pricing page) / FR-24 (badge) / FR-26 (public verification page). These are CTA destinations — any delay blocks copy from shipping. Owner: engineering / product.
4. **New marketing page ownership** — `/badge-showcase` and `/methodology`. Spec in B / C v1.0. Owner: design / marketing.
5. **Innovue rank anchor** (slide 17) — ~~Confirm with Innovue before publishing the "4th-largest patent database" claim.~~ Resolved 2026-06-01: anchor flipped to **3rd-largest** per Irene; site copy + [brand/brand-voice.md](../../brand/brand-voice.md) §5 updated. Owner: BD / Innovue liaison.

---

## Anchor + copy-key conventions (machine-parseable)

The future i18n generator will read this doc to produce `website/i18n/{en,zh}.json` keys. Contract:

- **Copy key format:** kebab-case `surface-section-element`
  - Examples: `home-hero-a-headline`, `home-snapshot-licensing-headline`, `licensing-pricing-cta-primary`, `signal-hero-headline`
- **Anchor strategy** (chosen for this pass): the generator finds elements via the `Selector:` field on each block header (CSS selector or `id`), combined with the existing `data-zh="..."` attribute mechanism the site already uses for inline translations. No new HTML comments are added in this pass — the existing anchor surface is sufficient.
- **If a future block lacks both an `id` and a stable selector** (e.g. a deeply-nested span), add an explicit `<!-- copy:KEY -->` … `<!-- /copy:KEY -->` comment pair around it. This is the fallback, not the default.
- **Why no anchor comments now:** adding 40–60 comment pairs across `index.html` and two product-page HTML files would balloon this commit. The doc + element IDs + `data-zh` attributes already form a complete contract for the future generator; comments can be added incrementally if/when specific elements prove hard to target.

---

## Eventual EN ↔ ZH alignment + cross-check method

The EN and ZH sites are decoupled today (this doc enables that). Eventually we'll re-align them with deliberate cross-checking. Recommended method:

1. **Locked glossary** (product names + brand phrases above) is canonical — both languages must use the locked term every time.
2. **Per-section sign-off** — Irene reviews ZH, Miko reviews EN, both locked before the page ships.
3. **Back-translation spot-check** — for headline-level copy: final EN → translate back to ZH via an independent native speaker (not Irene) → compare to Irene's original. Drift = revisit.
4. **Dual-LLM cross-check** — pass both EN and ZH to two different models with the prompt "do these convey the same proposition, voice, and intent?" Disagreement = human review.
5. **Visual diff per page** — render both languages side-by-side at the section level. Check parallelism (paragraph counts, CTA counts, claim counts match).

Forward-looking — not executed in this pass.

---

## Technical decoupling — next steps

This doc is content direction. The technical layer:

- **Current state:** EN authored inline in `index.html` (and `product/*/index.html`). Some elements carry a `data-zh="…"` attribute for inline manual ZH; auto-translate fills the rest at view-time.
- **Target state:** one `index.html` per page, copy externalized to `website/i18n/{en,zh}.json`, JS language toggle reads JSON and swaps copy at `<!-- copy:KEY -->` anchored nodes (and existing `data-zh`-tagged nodes).
- **Sequence (separate tasks, not this pass):**
  1. Approve content (this doc) ← we are here
  2. Approve language-toggle UX (design pass)
  3. Build i18n JSON generator script (reads this `.md`, emits `website/i18n/{en,zh}.json`)
  4. Wire language toggle (JS layer that reads JSON, swaps anchored nodes)
  5. Disable auto-translate path
  6. QA both languages independently per page

---

# Part A — Strategic context (slides 1–6)

Slides 1–6 of Irene's deck set up the strategic frame. Summaries below; key Chinese phrases preserved as blockquotes where verbatim matters.

## Slide 1: Cover

Title: 官網文案重寫 (Website copy rewrite).
Subtitle: 三 Persona 戰略 · 完整 Landing Page 提案 ("Three-Persona Strategy · Complete Landing Page Proposal").
Pivot: from "talk to people who know patents" → "talk to SME / VC / grant SME separately."
Personas: 出口 王董 (Export Wang Boss) · VC Wang Partner · 補助 美玉姐 (Grant Sister Meiyu).

## Slide 2: Why redo — three structural problems with the current site

The current Hero is written for IP experts, not SMEs. Three problems:

1. **Hero 在跟錯人講話** ("Hero is talking to the wrong people") — current carousel ("License what already won" / "Grade it" / "Start positioning") assumes the reader already knows patents matter, knows what FTO is, knows valuation frameworks. 99% of Taiwan SME owners don't understand a single line.
2. **用 SME 沒有的詞彙** ("Uses vocabulary SMEs don't have") — FTO / claim / family / PCT / SABCD. 90% of SMEs have never heard these. Each term filters out 99% of potential customers.
3. **CTA 太重，跳出率高** ("CTAs too heavy, bounce rate high") — "Contact sales" / "View product" / "Learn more" are all heavy. First-time visitors don't click. Need low-commitment entries like "see sample / try / download."

## Slide 3: Strategic foundation ① — market reality

Taiwan SMEs are an IP desert:

- **98.9%** of Taiwan companies are SMEs
- **< 0.1%** of SMEs file an invention patent per year
- **1 company** (TSMC) files more patents per year than all Taiwan SMEs combined

Implications:
- 99% of SME owners don't have "patent" in their vocabulary
- Pain comes from `出口 / 募資 / 標案` ("export / fundraising / tenders"), not from being sued by NPEs (they've never been sued)
- IP jargon doesn't reach them; copy must use familiar terms to pull them in first, then teach them about patents

## Slide 4: Strategic foundation ② — three personas

Three customer types, three mental OS's.

### Persona A — 王董 (Wang Boss) · Export SME

- **Role:** 48–58 years old, owner of a 50–200-person OEM
- **Industries:** PCB / mechanical / textile / electronic components
- **Mental OS:** 「我們是做產品的，不是大廠。等被告再說。」 ("We make products. We're not a major manufacturer. Worry about being sued when we get sued.")
- **Budget:** NT$ 5–15K / month

### Persona B — Wang Partner · VC IPDD

- **Role:** 35–55 years old, VC / PE / CVC partner
- **Industries:** 30–100 deals per year across multiple tech sectors
- **Mental OS:** 「Term sheet 兩週後到期。我怎麼確定他 IP 真的強？」 ("The term sheet expires in two weeks. How do I confirm their IP is actually strong?")
- **Budget:** LP-funded; cares about answer quality

### Persona C — 美玉姐 (Sister Meiyu) · Grant / Tender SME

- **Role:** 40–55 years old, GM of a 20–100-person company
- **Industries:** deep tech / green energy / medical devices / semiconductor supply chain
- **Mental OS:** 「補助案表單要填 IP 數，我只能空著。」 ("The grant application requires filling in an IP count. I can only leave it blank.")
- **Budget:** NT$ 10–50K / month (project-funded)

## Slide 5: Strategic foundation ③ — shared pain points

Five common pain points across all three personas (by severity):

1. 「我不知道我的風險在哪」 ("I don't know where my risks are")
2. 「我沒錢養 IP 團隊」 ("I can't afford to maintain an IP team")
3. 「我聽不懂專利人講話」 ("I can't understand patent professionals when they speak")
4. 「我買了一堆專利，然後呢？」 ("I bought a pile of patents — then what?")
5. 「沒人告訴我這要花多少錢」 ("Nobody tells me how much it costs")

Persona-specific pain points:
- **王董:** 「我會不會被擋在美國展門外、客戶會不會跑掉」 ("Will I get blocked at the door of the US trade show? Will customers leave?")
- **Wang Partner:** 「Founder 說 strong IP — 我怎麼證明他在說真話、怎麼跟 LP 解釋」 ("Founder claims 'strong IP' — how do I prove they're telling the truth, how do I explain to LPs?")
- **美玉姐:** 「下個標案 IP 欄要怎麼填、評審打分會不會少一塊」 ("How do I fill the IP column in the next tender, will the judges deduct points?")

## Slide 6: Core proposition — one core + three angles

> TIS 把「擁有專利」從 50K + 18 個月 + 天書，改成 月租 < 1 萬 + 下週生效 + 一張看得懂的標章。

Literal: "TIS turns 'owning a patent' from NT$50K + 18 months + a book-from-heaven into rent < NT$10K/month + active next week + one badge you can read."

Three angles:

| Angle | Frame | Scenario | Lead persona |
|---|---|---|---|
| A — 出口保護 (Export protection) | 焦慮 → 解套 (Anxiety → resolution) | COMPUTEX / CES, cross-border orders | 王董 |
| B — VC IPDD | 答案品質 → 不是時間 (Answer quality, not speed) | Term sheet, IC memo, LP quarterly report | Wang Partner |
| C — 公信力外掛 (Credibility add-on) | 填表焦慮 → 立即補上 (Form-filling anxiety → immediately covered) | Grants, tenders, large-customer contracts | 美玉姐 |

> 一個產品（30 件月租 IP + SABCD） · 三個 Persona 入口 · 共用 Brand voice、不同 framing

Literal: "One product (30-piece monthly-rent IP + SABCD) · three persona entry points · shared brand voice, different framing."

---

# Part B — Persona hero banners (slides 7–9)

Three persona-specific hero banner concepts. **These are strategic direction**: the current homepage uses a 3-pillar slider (positioning / licensing / signal). Irene's deck reframes the slider's content around the three personas. Whether to adopt this directly (replace slider content) or as new dedicated banners is a separate UX decision.

## Slide 7: Banner 1 — Persona A (王董) · Export SME

**Status:** Strategic direction (replaces or supplements `index.html` hero slide 1 or 2)

### Headline

- **Key:** `home-hero-a-headline`
- **File:** `website/index.html`
- **Selector:** `.hero #hero-slide-0 .pillar-title` (or a new persona-specific slide)
- **Status:** Strategic direction

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 出國保旅平險。出口保專利險。 | "Going abroad, insure travel-accident. Exporting, insure patent." | TBD | 🟢 2026-05-30 |

### Subhead

- **Key:** `home-hero-a-subhead`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 律師費 500 萬 + 整批退貨 + 三倍懲罰，水險都買，專利險怎麼能不買？ | "Lawyer fee NT$5M + whole-batch return + triple-damages punishment — even water insurance you buy; how can you not buy patent insurance?" | TBD | 🟢 2026-05-30 |
| 月租不到 1 萬，30 件大廠專利授權，立即生效。 | "Monthly rent under NT$10K, 30 large-company patent licenses, immediate activation." | TBD | 🟢 2026-05-30 |

### CTAs

- **Key:** `home-hero-a-cta-primary` / `home-hero-a-cta-secondary`

| 中文原文 | Literal translation | English (TBD) | Role | Shipped |
|---|---|---|---|---|
| 試跑專利包 | "try-run patent bundle" | TBD | Primary — destination: Licensee Portal visitor Feed (FR-01) | 🟢 2026-05-30 · href TODO: FR-01 visitor feed |
| 專利標章加持用法 | "patent badge empowerment usage" | TBD | Secondary — destination: badge-showcase page (new, 1–2 weeks) | 🟢 2026-05-30 · href TODO: /badge-showcase |

**Design notes (Irene):**
- 「出國 / 出口」 parallel structure leverages SME owners' familiar insurance mindset.
- Subhead amounts are concrete (NT$5M lawyer fee + monthly rent under NT$10K), no exaggeration.
- 「試跑專利包」 is brand-able verb; reused as C secondary CTA.

## Slide 8: Banner 2 — Persona B (Wang Partner) · VC IPDD

**Status:** Strategic direction (replaces or supplements `index.html` hero slide 2 or 3)

### Headline

- **Key:** `home-hero-b-headline`
- **File:** `website/index.html`
- **Selector:** `.hero #hero-slide-2 .pillar-title` (Signal Platform slot)
- **Status:** Strategic direction

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 技術含金量高不高，看排名就知道。 | "Whether the tech's gold-content is high — look at the ranking and you'll know." | TBD | 🟢 2026-05-30 |

### Subhead

- **Key:** `home-hero-b-subhead`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| SABCD 五級評分 + 同產業 cohort 排名。 | "SABCD five-tier scoring + same-industry cohort ranking." | TBD | 🟢 2026-05-30 |
| 一份可直接附入 IC memo 或 LP 季報的標準化報告。 | "A standardized report you can attach directly to an IC memo or LP quarterly report." | TBD | 🟢 2026-05-30 |

### CTAs

- **Key:** `home-hero-b-cta-primary` / `home-hero-b-cta-secondary`

| 中文原文 | Literal translation | English (TBD) | Role | Shipped |
|---|---|---|---|---|
| 免費預覽報告樣本 | "free preview report sample" | TBD | Primary — destination: Signal 5-tier SABCD sample page (already on site) | 🟢 2026-05-30 · href `/product/signal/` |
| 專利評級怎麼算 | "how patent rating is calculated" | TBD | Secondary — destination: methodology page (new, 1–2 weeks) | 🟢 2026-05-30 · href TODO: /methodology |

**Design notes (Irene):**
- Core wedge: lawyers tell you "legal"; TIS tells you "strong / not-strong" — a different product category.
- Don't emphasize speed (VCs aren't rushed; would rather pass than misinvest) — emphasize answer quality.
- Hero doesn't use brand terms like "SABCD" (reader hasn't been introduced yet); CTA uses generic "patent rating."

## Slide 9: Banner 3 — Persona C (美玉姐) · Grant / Tender SME

**Status:** Strategic direction (new banner — no existing equivalent on homepage)

### Headline

- **Key:** `home-hero-c-headline`
- **File:** `website/index.html`
- **Selector:** (new persona-specific slide TBD)
- **Status:** Strategic direction

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 泰然專利包為你的補助申請加分。 | "Tairan Patent Bundle adds points to your grant application." | TBD | 🟢 2026-05-30 |

### Subhead

- **Key:** `home-hero-c-subhead`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 評審認可的是創智、資策會、陽明交大的優質保證。 | "What the reviewers recognize is the quality assurance of 創智 / 資策會 / 陽明交大." | TBD | 🟢 2026-05-30 |
| 30 件合法授權專利以你公司名義可用，月租不到 1 萬。 | "30 legally-licensed patents usable under your company's name, monthly rent under NT$10K." | TBD | 🟢 2026-05-30 |

### CTAs

- **Key:** `home-hero-c-cta-primary` / `home-hero-c-cta-secondary`

| 中文原文 | Literal translation | English (TBD) | Role | Shipped |
|---|---|---|---|---|
| 試跑專利包 | "try-run patent bundle" | TBD | Primary — destination: Licensee Portal visitor Feed (FR-01) | 🟢 2026-05-30 · href `/product/licensing/` (surrogate; FR-01 visitor feed pending) |
| 了解授權方案 | "understand licensing options" | TBD | Secondary — destination: transparent pricing page (FR-03) | 🟢 2026-05-30 · href TODO: FR-03 transparent pricing |

**Design notes (Irene):**
- The three institution names (創智 / 資策會 / 陽明交大) are the protagonists — strongest social proof.
- 「加分」 / 「填得滿」 ("add points" / "fill out completely") are form-filling verbs matching 美玉姐's daily work.
- 「加持」 is approved Taiwanese slang; international version uses Badge Use Cases instead.

---

# Part C — CTA pattern, brand inventory, product naming (slides 10–15)

## Slide 10: CTA Pattern + Destination Map

**Status:** Strategic direction

Universal pattern: Primary CTA = visual evidence (low commitment). Secondary CTA = interaction or next step.

| Persona | Primary CTA | Primary destination (current state) | Secondary CTA | Secondary destination |
|---|---|---|---|---|
| A — 出口 SME | 試跑專利包 | Licensee Portal visitor Feed (FR-01, ✓ MVP August) | 標章加持用法 | Badge usage demo page (★ to be built, 1–2 weeks) |
| B — VC IPDD | 預覽免費樣本 | Signal 5-tier SABCD sample page (✓ on site now) | 專利評級怎麼算 | Patent rating methodology page (★ to be built, 1–2 weeks) |
| C — 補助標案 | 試跑專利包 | Licensee Portal visitor Feed (FR-01, ✓ MVP August) | 了解授權方案 | Transparent pricing page (FR-03, ✓ MVP August) |

CTA logic:
- **Primary** = visual evidence (see sample / try / application demo), zero email, zero commitment, lowest bounce
- **Secondary** = interaction / download / hands-on, may capture email or open the pricing page (stage-2 conversion)
- **Heavy CTA** (Contact sales / discuss deal) = footer sticky bar only; not in hero

## Slide 11: Brand assets — memorable phrases + product naming architecture

**Status:** Strategic direction — all locked in glossary at top of this doc. Repeated here for slide-by-slide fidelity.

### Memorable brand phrases

| 中文 | Literal translation | English (TBD) | Where used |
|---|---|---|---|
| 試跑專利包 | "try-run patent bundle" | TBD | A primary + C secondary CTA — Licensing Platform entry verb, shared across personas |
| 智財防彈衣 | "smart-IP bulletproof vest" | TBD | A-angle brand metaphor (legacy voice phrase, kept in inventory) |
| 看排名就知道 | "look at the ranking and you'll know" | TBD | B hero headline close |
| 為你的補助申請加分 | "add points to your grant application" | TBD | C hero headline |
| 標章加持用法 | "badge empowerment usage" | TBD | C primary CTA — Taiwanese slang `加持` approved |

### Product naming architecture

- **A-angle: 泰然專利險** (Tairan Patent Insurance) — verbs: 保 / 租 / 掛 ("insure / rent / hang")
- **B-angle: 泰然 SABCD** (專利評級報告 — patent rating report) — verbs: 查 / 評 / 排 ("check / rate / rank")
- **C-angle: 泰然專利包** (Tairan Patent Bundle) — verbs: 填 / 加分 / 掛 ("fill / add points / hang")

Internal / English contracts:
- A / C share: **TIS Licensing Bundle**
- B uses: **TIS Signal Token**

## Slide 12: Product naming — Licensing Platform

**Status:** Direct edit — adopted name is **泰然專利防護網** (rebadged from Irene's original `TIS 專利防護網` per 2026-05-30 decision — `泰然` prefix prevents `TIS 泰然X` redundancy in inline copy where the announce bar / press cards embed the product name)

### Option 1 (Recommended by Irene): 泰然專利防護網

| 中文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 泰然專利防護網 | "Tairan Patent Protection Net" | TBD | 🟢 2026-05-30 |

Irene's rationale:
- **Why it feels like a product:** Standard high-quality tech product naming (like "enterprise security net," "cloud filter net").
- **頭家 spirit + tech feel:** 「網」 ("net") is familiar and not stiff, but to a boss it's a "tech radar net" that blocks competitor attacks while opening markets.
- **System resonance:** In the system architecture, a Licenser's subscription is like "joining the network"; SABCD-tier patents are the network's "nodes"; the Net Pool's financials sustain the whole net.

### Option 2: TIS 智權互聯網 (or 智權共榮網)

| 中文 | Literal translation | English (TBD) |
|---|---|---|
| TIS 智權互聯網 | "TIS IP Internet" | TBD |
| TIS 智權共榮網 | "TIS IP Co-Prosperity Net" | TBD |

Irene's rationale (not recommended):
- Most intuitive, most folksy platform-style product naming.
- Taiwanese bosses live by 「出外靠朋友、生意大家做」 ("away from home, lean on friends; do business together"). 互聯 / 共榮 sound friendly and non-aggressive, but 「網」 still keeps it high-tech.
- Maps to the End-to-End cash flow: SMEs pay a small monthly fee (OpEx) into the net; IP suppliers gain stable revenue share via the net; mutually-renewing financial ecosystem.

## Slide 13: Licensing Platform KSPs

**Status:** Strategic direction (KSP cards for licensing product page)

### KSP 1 — AI 智慧雷達導航

- **Key:** `licensing-ksp-1-title` / `licensing-ksp-1-body`
- **File:** `website/product/licensing/index.html`
- **Status:** Strategic direction

| 中文原文 | Literal translation | English (TBD) | Element |
|---|---|---|---|
| AI 智慧雷達導航 — 免除繁瑣檢索，人機協作精選專利組合 | "AI intelligent radar navigation — eliminate tedious search; human-machine collaborative curation of patent bundle" | TBD | Title |
| 別把時間浪費在翻閱幾千件請求項（Claims）上。泰然 AI 引擎依據您企業的出口國 × 產業別 × 產品線三軸進行風險缺口掃描，5 分鐘內自動推薦最相關的 30 件專利組建防護包。支援人機協作與手動替換彈性，不需懂法律，大數據直接幫你罩。 | "Don't waste time flipping through thousands of claims. Tairan's AI engine performs risk-gap scanning along three axes — your company's export country × industry × product line — and auto-recommends the most relevant 30 patents to build the protection bundle within 5 minutes. Supports human-machine collaboration and manual-swap flexibility; you don't need to understand law — big data covers you directly." | TBD | Body |

### KSP 2 — 權威法人聯合授權

- **Key:** `licensing-ksp-2-title` / `licensing-ksp-2-body`
- **Status:** Strategic direction

| 中文原文 | Literal translation | English (TBD) | Element |
|---|---|---|---|
| 權威法人聯合授權 — 創智、資策會、陽明交大合法非獨家專利 | "Authoritative legal-entity joint licensing — 創智 / 資策會 / 陽明交大 legal non-exclusive patents" | TBD | Title |
| 由創智、資策會、陽明交大三家權威研發機構，直接以貴公司名義開立 30 件核心專利合法授權。 | "Three authoritative R&D institutions — 創智, 資策會, 陽明交大 — directly issue 30 core patent legal licenses under your company's name." | TBD | Body 1 |
| 對外，是出海搶單的黃金名片。在國際買家、跨國投資人面前撕掉「代工小廠」的標籤，用機構級的真實 IP 後盾，讓客戶審查與合作談判都對你刮目相看。 | "Externally, it's a golden business card for grabbing overseas orders. Tear off the 'small OEM' label in front of international buyers and cross-border investors; with institution-grade real IP backing, client review and partnership negotiations both see you with new eyes." | TBD | Body 2 |
| 對內，是主動式的防啃骨頭盾。專利流氓（NPE）篩選敲詐目標時，一看到你背後拉起三家機構合法 IP 防線、攻擊成本高得多，自然會跳過你，去找更好下手的下家。 | "Internally, it's an active 'bone-gnawing-prevention' shield. When patent trolls (NPEs) screen extortion targets, the moment they see three institutions' legal IP defense lines behind you, the attack cost is much higher — they'll naturally skip you and find an easier next target." | TBD | Body 3 |

### KSP 3 — 付款隔日立即生效

- **Key:** `licensing-ksp-3-title` / `licensing-ksp-3-body`
- **Status:** Strategic direction

| 中文原文 | Literal translation | English (TBD) | Element |
|---|---|---|---|
| 付款隔日立即生效 — DLC 數位憑證與雙品牌動態標章 | "Active the day after payment — DLC digital credential and dual-brand dynamic badge" | TBD | Title |
| 金流確認隔日防護網立即啟動。平台同步交付包含公證電子簽章的數位授權憑證（DLC），以及帶有「TIS × 權威機構」★ 的聯名授權認證標章（Badge）。內嵌獨一授權編號與 QR Code，2 秒線上即時驗證，可自由印製於國際展位、提案書、官網 Footer 或產品外包裝，對手不敢輕易踩線。 | "The day after the payment clears, the protection net activates. The platform simultaneously delivers a digital license credential (DLC) containing a notarized electronic signature, plus a co-branded license certification badge marked 'TIS × authoritative institution' ★. Embedded with a unique license number and QR code; 2-second online live verification; printable freely on international booths, proposal documents, website footers, or product packaging — competitors won't easily cross the line." | TBD | Body |

### KSP 4 — 專利轉化為 OpEx 租賃保險

- **Key:** `licensing-ksp-4-title` / `licensing-ksp-4-body`
- **Status:** Strategic direction

| 中文原文 | Literal translation | English (TBD) | Element |
|---|---|---|---|
| 專利轉化為 OpEx 租賃保險 — 月均不到 1 萬，多樣期別彈性方案 | "Patents converted to OpEx rental insurance — monthly average under NT$10K, multiple-term flexible plans" | TBD | Title |
| 愛拼才會贏，但不需要盲目打軍備競賽。自行申請 1 件專利需花費 NT$50,000+ 與 18 個月等待；聘請專職 IP 工程師年資產營運成本破百萬；而 TIS 訂閱讓您月均支出控制在萬元以下。提供 3 / 6 / 12 / 24 個月彈性期別，2 年方案最高 88 折優惠。 | "You only win if you fight, but you don't need to blindly run an arms race. Filing one patent yourself costs NT$50,000+ and 18 months of waiting; hiring a dedicated IP engineer costs over a million in annual operating costs; while a TIS subscription keeps your monthly spend under NT$10K. Offers 3 / 6 / 12 / 24-month flexible terms, with up to 12% off (88折) on the 2-year plan." | TBD | Body |

## Slide 14: Product naming — SABCD grading

**Status:** Direct edit — adopted name is **泰然專利強度評級系統**

### Option 1: 泰然智權風險雷達

| 中文 | Literal translation | English (TBD) |
|---|---|---|
| 泰然智權風險雷達 | "Tairan IP Risk Radar" | TBD |

Irene's rationale (not recommended):
- Targets the "fear of misinvesting — rather miss 10 than misinvest 1" VC mindset. Positions the product as a "minesweeper / warning system."
- 「風險雷達」 anchors product value in "error-prevention and demining." Through the Study's four-scenario weight stability (licensing / litigation / investment / portfolio), it scans whether a patent will face litigation or invalidation — minimizing investment risk.
- Product feel: similar to Bloomberg Risk or Moody's risk indicators — top-tier financial-risk-control product feel.

### Option 2 (Recommended by Irene): 泰然專利強度評級系統

| 中文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 泰然專利強度評級系統 | "Tairan Patent Strength Rating System" | TBD | 🟢 2026-05-30 |

Irene's rationale:
- Targets the same risk-averse VC mindset, but frames the product as "the objective judge of moat authenticity."
- 「強度評級」 anchors product value in "quantifying real-world combat barriers and ultimate error prevention." By placing the target patent in the industry pool for peer percentile ranking, providing 50-indicator drilldown, and producing an authoritative SABCD tier — it punctures the inflated patent bubble in startup pitches, dispels decision anxiety, and lets the analyst make the most accurate risk-control judgment 泰然自若 (with composure).
- Product feel: similar to S&P or Moody's institutional rating systems — top-tier financial + legal infrastructure hardcore feel.

## Slide 15: SABCD Grading KSPs

**Status:** Strategic direction (KSP cards for SABCD / signal product page)

### KSP 1 — SABCD 五級戰略評定

- **Key:** `signal-ksp-1-title` / `signal-ksp-1-body`
- **File:** `website/product/signal/index.html`
- **Status:** Strategic direction

| 中文原文 | Literal translation | English (TBD) | Element |
|---|---|---|---|
| SABCD 五級戰略評定 — 穿透泡沫，定義技術真實防禦力 | "SABCD five-tier strategic rating — pierce the bubble, define the tech's real defensive power" | TBD | Title |
| 拒絕新創團隊在 Pitch Deck 上的數量堆疊。系統透過 50 項指標聚合，將標的專利放進 TIS 同產業池進行同儕基準快照（Peer Cohort Snapshot）。S 級（前 15% 頂級戰略）到 D 級一目了然。法律顧問只能告訴你這件專利「合不合法」，而泰然評級直接斷定它「強不強、能不能打」 | "Refuse the quantity-stacking that startup teams do in pitch decks. The system aggregates via 50 indicators, places the target patent into the TIS same-industry pool for a peer-cohort snapshot. S-tier (top 15% strategic) to D-tier — clear at a glance. Legal counsel can only tell you whether the patent is 'legal'; Tairan rating directly judges whether it's 'strong / not, can-fight / cannot'." | TBD | Body |

### KSP 2 — 跨標的同儕基準排序

- **Key:** `signal-ksp-2-title` / `signal-ksp-2-body`
- **Status:** Strategic direction

| 中文原文 | Literal translation | English (TBD) | Element |
|---|---|---|---|
| 跨標的同儕基準排序 — 建立投委會統一的風控量尺 | "Cross-target peer benchmark ranking — establish a unified risk-control ruler for the investment committee" | TBD | Title |
| 將新創團隊的專利護城河，丟進同產業同儕池中進行全景對比。無論同時評估 5 家還是 10 家被投標的，全部報告皆基於同一個客觀百分位 scale 進行 cross-compare。讓主觀的技術盲點，轉化為投委會與合夥人能直接採信的量化數據。 | "Toss the startup team's patent moat into the same-industry peer pool for full-landscape comparison. Whether evaluating 5 or 10 target companies simultaneously, all reports are cross-compared on the same objective percentile scale. Turn subjective technical blind spots into quantified data the investment committee and partners can directly trust." | TBD | Body |

### KSP 3 — 同步雙版專利評級

- **Key:** `signal-ksp-3-title` / `signal-ksp-3-body`
- **Status:** Strategic direction

| 中文原文 | Literal translation | English (TBD) | Element |
|---|---|---|---|
| 同步雙版專利評級 — 可附入 IC Memo、Data Room 與 LP 季報 | "Simultaneous dual-version patent rating — attachable to IC Memo, Data Room, and LP quarterly report" | TBD | Title |
| 採 2 SKU 計費（Brief 15 點 / Pro 30 點），1 點 = NT$100。系統同步生成兩版報告——Brief 是執行摘要（給 partner 快㏿ go/no-go），Pro 是深度版（含 50 項指標、跨方案穩定性、授權策略建議）。單買、雙買、按情境配置點數。 | "Uses 2-SKU billing (Brief 15 points / Pro 30 points), 1 point = NT$100. The system simultaneously generates two report versions — Brief is the executive summary (for the partner's quick go/no-go), Pro is the deep version (50 indicators, cross-scenario stability, licensing strategy recommendations). Buy one, buy both, or configure points by scenario." | TBD | Body 1 |
| 一鍵產出含用戶 Email 浮水印、防外流的權威 PDF，可直接附入投資建議書（IC Memo）、Data Room 或向 LP 進行季度風險報告。 | "One-click output of an authoritative PDF containing the user's email watermark and anti-leak protection, directly attachable to investment recommendation memos (IC Memo), Data Room, or LP quarterly risk reports." | TBD | Body 2 |

### KSP 4 — 新穎 1.8 億筆底層大數據

- **Key:** `signal-ksp-4-title` / `signal-ksp-4-body`
- **Status:** Strategic direction
- **Note:** Number drift — slide 17 also references 180M (上 from 170M). Confirm with Innovue before publishing.

| 中文原文 | Literal translation | English (TBD) | Element |
|---|---|---|---|
| 新穎 1.8 億筆底層大數據 — 刺破公開 AI 搜尋的數據盲區 | "Innovue's 180-million-record underlying big data — pierce the data blind spots of public AI search" | TBD | Title |
| 本產品技術由新穎數位支援全球第三大、涵蓋 100+ 國、每日同步的 1.8 億筆 WEBPAT 專利資料庫。客戶只需提供專利號，系統自動從資料庫抽取完整專利文本，進行 50 項指標分析。所有分析在封閉式專業資料庫內完成，公開 AI 工具完全無法觸及的硬核底數據層，確保最嚴苛的盡職調查絕不踩空。 | "This product's technology is supported by Innovue's world's-3rd-largest, 100+-country-covering, daily-synced 180-million-record WEBPAT patent database. Customers only need to provide the patent number; the system automatically extracts the full patent text from the database and runs the 50-indicator analysis. All analysis is completed inside the closed professional database — a hardcore underlying data layer completely unreachable by public AI tools — ensuring the most stringent due diligence never comes up empty." | TBD | Body |

---

# Part D — Direct edits to existing site sections (slides 16–30)

These are direct UI replacements. Each block maps to an existing section of `index.html` or `website/product/*/index.html`. Apply once the EN side is locked.

## Slide 16: Contact form — query type dropdown

**Status:** Direct edit — apply when ready

**Currently on site:** `index.html` line 1585 — the contact-form topic dropdown. Existing options (in `data-zh` attributes): 授權組合 / 專利情報 / 估值 / 服務（仲介 / IP Ascent） / 媒體採訪 / 其他.

Irene proposes 6 new options:

- **Key:** `home-contact-topic-*`
- **File:** `website/index.html`
- **Selector:** `#contact-topic` (also `#contact-topic-trigger` for the trigger label)

| 中文原文 | Literal translation | English (TBD) | Option | Shipped |
|---|---|---|---|---|
| 專利授權 | "patent licensing" | Patent Licensing *(provisional — Title-Cased literal; awaiting Miko-locked final)* | 1 | 🟢 2026-05-30 · data-value `licensing` |
| 專利評級 | "patent rating" | Patent Rating *(provisional)* | 2 | 🟢 2026-05-30 · data-value `rating` |
| 專利評估報告 | "patent evaluation report" | Patent Evaluation Report *(provisional)* | 3 | 🟢 2026-05-30 · data-value `evaluation-report` |
| 產業報告 | "industry report" | Industry Report *(provisional)* | 4 | 🟢 2026-05-30 · data-value `industry-report` |
| 媒體採訪 | "media interview" | Media Interview *(provisional)* | 5 | 🟢 2026-05-30 · data-value `press` (reused from prior option) |
| 其他 | "other" | Other *(provisional)* | 6 | 🟢 2026-05-30 · data-value `general` (reused from prior option) |

> **EN copy is provisional.** Each `English (TBD)` cell above is the literal translation Title-Cased for UI consistency with the rest of the contact form (`Inquiry Type` label, `Send Inquiry` button) — it is a *content reflection* of the ZH option, not Miko's final locked copy. Replace each one row-at-a-time when finalized. The HTML comment above the dropdown in `index.html` lines ~1608–1614 mirrors this caveat for anyone editing the markup directly.

> **Backend handlers.** Two new `data-value`s were introduced (`rating`, `evaluation-report`, `industry-report`); the prior `signal` value was retired. Any server-side router that matched the old 4-value set (`licensing` / `signal` / `press` / `general`) will need to be extended to handle the three new values — otherwise the new inquiry types will hit a default branch.

**Plus form field annotation (Irene):** 「More info. query: Phone no. and title」 — consider adding a Phone Number and Title field to the contact form. (Not addressed in 2026-05-30 dropdown swap; separate task.)

> **Reused beyond the dropdown (2026-05-30).** `專利授權` and `專利評級` are also the ZH labels on the homepage product-section pillar tabs (`#products .pillar-tab`, `index.html` lines ~464–465) — short category names fit the tab UI better than the full product names (`泰然專利防護網` / `泰然專利強度評級系統`, which remain on the snapshot H3, nav dropdown, section heading, footer, etc.). EN side of the tabs still reads `Licensing Platform` / `Signal Platform`.

## Slide 17: About TIS — Innovue stats section

**Status:** Direct edit — apply when ready

**Currently on site:** `index.html` line 409 — `section.section--counter` carries three counters. Per `data-target` attributes, current values are 180 (M), 50, 100+.

Irene's annotations:

### Innovue intro line (TIS website-side prose)

- **Key:** `home-stats-intro`
- **File:** `website/index.html`
- **Selector:** `.section--counter` intro paragraph
- **Status:** Direct edit

| 中文原文 | Literal translation | English (TBD) |
|---|---|---|
| 21年完整智權產業服務經驗，國內唯一深根發展資訊技術 (IT) 應用智權 (IP) 研究的企業，堪稱台灣智權資訊的龍頭公司。 | "21 years of complete IP-industry service experience; the only domestic enterprise deeply rooted in IT-applied IP research; can be called the leading company of Taiwan IP information." | TBD |

### Database count stat

- **Key:** `home-stats-database-count`
- **Selector:** `.stat-num .counter[data-target="180"]`

| 中文原文 | Literal translation | English (TBD) | Note |
|---|---|---|---|
| 180M | "180M" | 180M | Irene: "180M (updated from Innovue website)" — supersedes the prior 170M figure |

### Database stat — subtitle

- **Key:** `home-stats-database-subtitle`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 每日與官方同步更新資料，全球第三大完整專利資料庫，檢索不遺漏任何蛛絲馬跡。 | "Daily-synced with official sources, world's 3rd-largest complete patent database; retrieval misses no traces or clues." | TBD | 🟢 2026-05-30 · shipped with subject-clause prefix added: `Innovue 專屬資料庫所收錄的專利數 - …`. EN still reads `patents powered by Innovue's WEBPAT database — with over 21 years of experience…` (pending Miko-lock). 2026-06-01 · rank anchor flipped 第四大 → 第三大 per Irene (local edit, pending push). |

Irene asks: **Highlight 「每日」** ("daily"). *Honored 2026-05-30 — `每日` wrapped in `<strong>` via new `data-zh-html` opt-in mechanism in `assets/site.js`.*

### Jurisdiction stat — subtitle

- **Key:** `home-stats-jurisdiction-subtitle`
- **Selector:** `.stat-num .counter[data-target="100"]` block

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 專利資料庫囊括全球超過 100 個國家，包含美、歐、日、台、韓，全球專利佈局的最佳夥伴。 | "The patent database covers over 100 countries globally, including US / EU / JP / TW / KR — best partner for global patent positioning." | TBD | 🟢 2026-05-30 · ZH only; EN still reads "indexed daily from official Patent Office sources" — daily-emphasis from Irene's note is now ZH/EN-divergent |

### Analysis-modules stat

Irene's note: 「13 ？？？」 — the middle counter (currently `data-target="50"` per the HTML) and the third value (currently `100+`) don't match Irene's "13 / 100+" layout from her annotation. **Confirm with Irene which counter value she wants for the middle stat** (likely the number of validated analysis modules / source channels).

### Open item flagged on slide

> Need to confirm with Innovue about "Top 4"

→ See Open sign-off items §5 at top of this doc.

## Slide 18: About — leadership / partners / clients

**Status:** Strategic direction (NEW sections, not on site yet)

Slide 18 is a TBD note from Irene:
- Add Key person intro (could be Employee intro or Board member intro). Reference layouts: goldmansachs.com / bcg.com / mckinsey.com / onepagelove.com
- Add business partners intro: IPIC, III, NYCU
- (Future) Add client list

**No copy provided on slide 18 — execution deferred.**

## Slide 19: Product nav dropdown

**Status:** Direct edit — apply when ready

**Currently on site:** `index.html` lines 67–88 — `#products-trigger` dropdown menu (also mobile sub-list at line 158). Two products:

### Licensing card — label + description

- **Key:** `home-nav-product-licensing-title` / `home-nav-product-licensing-body`
- **File:** `website/index.html`
- **Selector:** `#products-menu` item targeting `/product/licensing/`

| 中文原文 | Literal translation | English (TBD) | Element | Shipped |
|---|---|---|---|---|
| 30 件專利防護組合，當週上線。 | "30-piece patent protection bundle, online within the week." | TBD | Headline | |
| 泰然專利防護網 | "Tairan Patent Protection Net" | TBD | Product label | 🟢 2026-05-30 |
| 精選適配專利防護組合，為出口貨物保專利險，快㏿生效，省時省力省預算。 | "Curated, fitted patent protection bundle; insure patent insurance for exported goods; fast activation; saves time, effort, and budget." | TBD | Description | 🟢 2026-05-30 · shipped to desktop + mobile dropdowns; `㏿` → `速` per OCR-fix convention |

### Signal card — label + description

- **Key:** `home-nav-product-signal-title` / `home-nav-product-signal-body`
- **Selector:** `#products-menu` item targeting `/product/signal/`

| 中文原文 | Literal translation | English (TBD) | Element | Shipped |
|---|---|---|---|---|
| 30 分鐘完成 SABCD 估價，比對 1.7 億件專利。 | "Complete SABCD valuation in 30 minutes; compared against 170 million patents." | TBD | Headline | |
| 泰然專利強度評級系統 | "Tairan Patent Strength Rating System" | TBD | Product label | 🟢 2026-05-30 |
| 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 | "Compare against same-industry patents; based on 50 indicators that include both 'quantity' and 'quality'; rate patents professionally with grounded reasoning." | TBD | Description | 🟢 2026-05-30 · shipped to desktop + mobile dropdowns |

**Note:** 1.7 億 = 170M. Slide 17 prefers 180M (`updated from Innovue website`). Reconcile before shipping — pick one number for both places.

## Slide 20: Homepage product snapshot — Licensing Platform

**Status:** Direct edit — apply when ready

**Currently on site:** `index.html` line 440 — `section#products` carries pillar panels including `#pillar-licensing` (line 453).

Irene's note: keep this snapshot block; leave KSPs and how-to detail at the product page to reduce content duplication.

### Snapshot headline (silver pillar tab)

- **Key:** `home-snapshot-licensing-headline`
- **File:** `website/index.html`
- **Selector:** `#pillar-licensing h3` and surrounding intro

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 拼出口的台灣頭家，這裡有一張關鍵名片。 | "Taiwan headmen who hustle for exports — here's one critical business card." | For Taiwan exporters — one critical business card to hand over. *(provisional)* | 🟢 2026-05-30 · replaces the prior 4-feature template in `#pillar-licensing`; entire headline wrapped in `<strong>` via `data-zh-html` (per matching slide-28 bolding pattern) |

### Snapshot body

- **Key:** `home-snapshot-licensing-body`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| AI 依您出口國 × 產業，從創智、資策會、陽明交大三家機構池中挑 30 件合法 IP，付款隔日生效，發您一張可掛展位、報價單、Email 簽名的高規授權標章。月不到 1 萬，不賣「絕對不被告」的神話，但讓 專利蟑螂評估攻擊成本後跳過你找下家。 | "AI picks 30 legal IPs from the three institution pools — 創智 / 資策會 / 陽明交大 — based on your export country × industry; active the day after payment; ships you a high-spec license badge hangable on booths, quotes, Email signatures. Monthly under NT$10K; doesn't sell the 'absolutely never sued' myth, but makes patent cockroaches assess attack cost and skip you for the next target." | AI picks 30 legal IPs from the ITRI / III / NYCU institution pools, matched to your export country × industry. Activates the day after payment and ships a high-spec license badge you can hang on booth signage, quotes, or email signatures. Under NT$10K/month — doesn't sell the "you'll never be sued" myth, but makes patent trolls weigh the attack cost and skip you for an easier target. *(provisional — 創智/資策會/陽明交大 mapped to ITRI/III/NYCU per open-item §1 disclosure; "patent cockroaches" softened to "patent trolls")* | 🟢 2026-05-30 · ZH verbatim from slide; `專利蟑螂` wrapped in `<strong>` via `data-zh-html` (per matching slide-28 bolding pattern) |

### Snapshot annotations (highlight callouts)

| 中文原文 | Literal translation | English (TBD) | Role | Shipped |
|---|---|---|---|---|
| 30 個專利橫跨 5 個評級，有質有量兼備。 | "30 patents span 5 tiers — quality and quantity both present." | 30 patents span 5 tiers — quality and quantity in one bundle. *(provisional)* | Annotation 1 | 🟢 2026-05-30 · folded into pillar-features paragraph (no longer a visual screenshot callout) |
| 提供兩種專利包選法 - AI 智選 / FTO 保選。 | "Provides two bundle-selection methods — AI smart-pick / FTO curated-pick." | Two selection methods — AI smart-pick or FTO-guided curation. *(provisional)* | Annotation 2 | 🟢 2026-05-30 · folded into pillar-features paragraph |

### Snapshot CTAs

- **Key:** `home-snapshot-licensing-cta-primary`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 查看智選專利包 | "view the smart-pick patent bundle" | View Smart-Pick Bundle *(provisional)* | 🟢 2026-05-30 · replaces prior `聯絡業務`/`Talk to sales` primary CTA; href TODO: `/product/licensing/#bundle-browse` (currently lands on page root) |

## Slide 21: Licensing product page hero

**Status:** Direct edit — apply when ready

**Currently on site:** `website/product/licensing/index.html` line 2356 — `section.hero` with `.pillar-title` at line 2364.

> **Transcription correction (2026-05-30).** The doc's earlier framing of "Hero annotation (alt-headline)" + "Hero benefit-bullet annotation" was misleading — Irene's PDF actually positions those two strings as **direct replacements** for the original headline and subhead, not as supplementary annotations. The original headline (`30 件專利防護組合。當週上線。`) and original subhead (`一張訂閱…`) are **superseded**, not preserved. Section headings below have been re-ordered to reflect this.

### Hero headline (insurance-metaphor framing)

- **Key:** `licensing-hero-headline`
- **File:** `website/product/licensing/index.html`
- **Selector:** `.hero .pillar-title`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 出口買專利險，30 件專利包輕裝上陣。 | "Exporting buys patent insurance; the 30-piece patent bundle goes in light-armor." | TBD | 🟢 2026-05-30 · em emphasis on `30 件專利包輕裝上陣。`; EN preserved structurally and now diverges from ZH meaning (flagged for Miko-lock) |
| 30 件專利防護組合。當週上線。 *(superseded)* | "30-piece patent protection bundle. Online within the week." | — | ⚪ replaced by row above |

### Hero subhead

- **Key:** `licensing-hero-subhead`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 1 分鐘勾選國家 × 產業 × 期別，2 種專利包選法，5 類專利評級，戴上授權認證標章立刻從被動防禦轉為主動佈局。 | "1 minute to tick country × industry × term, 2 bundle-selection methods, 5 patent tiers — put on the license-certification badge and immediately turn from passive defense to active positioning." | TBD | 🟢 2026-05-30 · single paragraph; the prior `一張訂閱…` ZH subhead is superseded. EN preserved structurally (One subscription, thirty SABCD-graded patents…) and now diverges from ZH meaning |
| 一張訂閱，30 件 SABCD 評等專利，依法域 × 產業策展。訂閱當週由被動防禦轉為主動佈局。 *(superseded)* | "One subscription, 30 SABCD-tiered patents, curated by jurisdiction × industry. The week you subscribe, you turn from passive defense to active positioning." | — | ⚪ replaced by row above |

### Hero CTAs

- **Key:** `licensing-hero-cta-primary` / `licensing-hero-cta-secondary`

| 中文原文 | Literal translation | English (TBD) | Role | Shipped |
|---|---|---|---|---|
| 試跑專利包 | "try-run patent bundle" | TBD | Primary (universal slide-11 brand verb) | 🟢 2026-05-30 · href `/product/licensing/lobby/` (existing) |
| 聯絡業務 | "contact sales" | TBD | Secondary | 🟢 2026-05-30 · href `#contact` (existing) |
| 組建你的組合 *(superseded)* | "build your bundle" | — | Primary (prior) | ⚪ replaced by `試跑專利包` |

### Eyebrow (page-level product label)

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 泰然專利防護網 | "Tairan Patent Protection Net" | TBD | 🟢 2026-05-30 · rebadged from `TIS 授權平台` per the cross-page product-name swap |

## Slide 22: Licensing product page — Jurisdiction × Industry × Term selector

**Status:** Direct edit — apply when ready

**Currently on site:** `website/product/licensing/index.html` line 2418 — `section "How Licensing works"` (the wizard / picker section). **Also mirrored on `index.html` `.acc-item[data-step="pick"]` (Licensing accordion item 1) — synced 2026-05-31.**

### Selector intro headline

- **Key:** `licensing-selector-headline`
- **File:** `website/product/licensing/index.html`
- **Selector:** in the wizard-step heading area near line 2418
- **Status:** Direct edit

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 選擇法域 × 產業 × 期間 | "Choose jurisdiction × industry × term" | TBD | 🟢 2026-05-30 · `.howit-card[data-step="pick"] h4` |

### Selector body

- **Key:** `licensing-selector-body`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 一包專利包支持一個法域、一個 產業、一種期間，只為你真正需要的組合付費。 | "One bundle supports one jurisdiction, one industry, one term — only pay for the combination you actually need." | TBD | 🟢 2026-05-30 · shipped as card subtitle `<p>` (replaces prior `只為你真正需要的市場與期間付費。`) |
| US、TW，兩個主戰場供專利佈局。 | "US, TW — two main battlefields for patent positioning." | TBD | 🟢 2026-05-30 · shipped as bullet 1 (replaces `US · TW`) |
| 3、6、12、24 個月期，隨時可以升級至可選期別，延長授權期間。 | "3 / 6 / 12 / 24-month terms; upgradable to longer terms at any time to extend the license period." | TBD | 🟢 2026-05-30 · shipped as bullet 2, lightly compressed for bullet UI: `3、6、12、24 個月期，隨時可升級延長授權期間。` (replaces `3、6 或 12 個月期`) |
| 30 件 SABCD 評級專利組合，同評級專利隨時可更換。 | "30 SABCD-tiered patent bundle; patents within the same tier are swappable at any time." | TBD | 🟢 2026-05-30 · shipped as bullet 3 (replaces `30 件 SABCD 評等專利／組合`) |

### Selector summary bullets (prior UI mini-list — *superseded by slide-22 body*)

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 只為你真正需要的市場與期間付費。 *(superseded)* | "Only pay for the market and term you actually need." | — | ⚪ replaced by slide-22 body subtitle |
| US · TW *(superseded)* | "US · TW" | — | ⚪ replaced by slide-22 body bullet 1 |
| 3、6 或 12 個月期 *(superseded)* | "3, 6, or 12 month terms" | — | ⚪ replaced by slide-22 body bullet 2 |
| 30 件 SABCD 評等專利／組合 *(superseded)* | "30 SABCD-tiered patents per bundle" | — | ⚪ replaced by slide-22 body bullet 3 |

## Slide 23: Licensing product page — Two selection methods (AI / FTO)

**Status:** Direct edit — apply when ready

**Currently on site:** `website/product/licensing/index.html` — within the "How Licensing works" section. **Also mirrored on `index.html` `.acc-item[data-step="ways"]` (Licensing accordion item 2) — synced 2026-05-31.**

### Section headline

- **Key:** `licensing-method-headline`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 兩種專利包挑選法 | "Two bundle-selection methods" | TBD | 🟢 2026-05-30 · `.howit-card[data-step="ways"] h4` (replaces prior `兩種挑 30 件的方法`) |

### Section body

- **Key:** `licensing-method-body`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| AI 快㏿取得組合，或提交 FTO 報告精準篩選。 | "AI rapidly delivers the bundle, or submit an FTO report for precision filtering." | TBD | 🟢 2026-05-30 · shipped as card subtitle `<p>` with `㏿ → 速` per OCR-fix convention |
| 方法 A - AI 智選 (免費)：由 AI 為你智選 30 個符合需求的專利包。 | "Method A — AI smart-pick (free): AI smart-picks 30 patents that match your needs as the bundle." | TBD | 🟢 2026-05-30 · shipped verbatim as bullet 1 |
| 方法 B - FTO 保選 (付費)：上傳你的 FTO 報告或加價購委托泰然產出 FTO 報告，針對專利佈局不足之處，精準篩選專利包。 | "Method B — FTO curated-pick (paid): upload your FTO report or pay extra to commission Tairan to produce the FTO report; precision-filter the bundle for gaps in your patent positioning." | TBD | 🟢 2026-05-30 · shipped verbatim as bullet 2 (notably long — wraps in card UI; acceptable per Miko) |
| 平台提供首選 30 和備選 30 專利清單，供你挑選。 | "The platform provides 30 primary picks and 30 alternate picks, for you to choose from." | TBD | 🟢 2026-05-30 · shipped verbatim as bullet 3 |

### Method summary bullets (prior UI mini-list — *superseded by slide-23 body*)

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 兩種挑 30 件的方法 *(superseded)* | "Two ways to pick 30 patents" | — | ⚪ replaced by slide-23 headline |
| 5 秒內取得組合——或交付你的 FTO 報告，由平台繞過已釐清的部分。 *(superseded)* | "Receive the bundle within 5 seconds — or hand over your FTO report; the platform bypasses what you've already cleared." | — | ⚪ replaced by slide-23 body subtitle |
| Path A · System Recommendation（免費） *(superseded)* | "Path A · System Recommendation (free)" | — | ⚪ replaced by slide-23 body bullet 1 |
| Path B · FTO-Guided *(superseded)* | "Path B · FTO-Guided" | — | ⚪ replaced by slide-23 body bullet 2 |
| 兩條路徑都附 30 件同級替換池 *(superseded)* | "Both paths come with a 30-piece same-tier swap pool" | — | ⚪ replaced by slide-23 body bullet 3 |

## Slide 24: Licensing product page — Bundle browse

**Status:** Direct edit — apply when ready · **Also mirrored on `index.html` `.acc-item[data-step="activate"]` (Licensing accordion item 3) — synced 2026-05-31.**

### Section headline

- **Key:** `licensing-browse-headline`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 專利包瀏覽 | "Bundle browse" | TBD | 🟢 2026-05-30 · `.howit-card[data-step="activate"] h4` (replaces prior `相關組合建議`) |

### Section body

- **Key:** `licensing-browse-body`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 針對特定商品特定市場選取 30 個最佳專利組合。 | "Select the 30 best patents into a bundle for a specific product and specific market." | TBD | 🟢 2026-05-30 · shipped as card subtitle `<p>` |
| 橫跨 5 個評級 (5S.6A.9B.6C.4D)，有質有量兼備。 | "Spans 5 tiers (5S.6A.9B.6C.4D) — quality and quantity both present." | TBD | 🟢 2026-05-30 · shipped as bullet 1, formatting preserved (half-width parens, `.` separator) |
| 來自國家級創智法人、資策會法人、陽明交大學術單位等優質專利池，品質有保障。 | "Sourced from premium patent pools including 國家級創智法人 / 資策會法人 / 陽明交大學術單位 — quality assured." | TBD | 🟢 2026-05-30 · shipped as bullet 2 |
| 不用等 18 個月或無止盡商務談判，訂閱到生效快㏿打通關。 | "No need to wait 18 months or endless business negotiations — subscription-to-activation breaks through fast." | TBD | 🟢 2026-05-30 · shipped as bullet 3 with PDF-verbatim variant: `…訂 閱到生效快打通關。` (space inside `訂 閱`, no `速` per Miko's PDF-source confirmation) |

### Browse summary bullets (prior UI mini-list — *superseded by slide-24 body*)

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 相關組合建議 *(superseded)* | "Related bundle recommendations" | — | ⚪ replaced by slide-24 headline |
| 15 秒內取得依市場策展的 30 件 SABCD 評等專利。 *(superseded)* | "Receive 30 SABCD-tiered patents curated by market within 15 seconds." | — | ⚪ replaced by slide-24 body subtitle |
| 典型 5 S · 6 A · 9 B · 6 C · 4 D 分布 *(superseded)* | "Typical 5 S · 6 A · 9 B · 6 C · 4 D distribution" | — | ⚪ replaced by slide-24 body bullet 1 |
| 來源：ITRI、III 及大學夥伴 *(superseded)* | "Sources: ITRI, III, and university partners" | — | ⚪ replaced by slide-24 body bullet 2 |
| 訂閱當週生效 *(superseded)* | "Active the week you subscribe" | — | ⚪ replaced by slide-24 body bullet 3 |

## Slide 25: Licensing product page — Lock / swap bundle

**Status:** Direct edit — apply when ready · **Also mirrored on `index.html` `.acc-item[data-step="swap"]` (Licensing accordion item 4) — synced 2026-05-31.**

### Section headline

- **Key:** `licensing-lock-headline`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 鎖定專利包 | "Lock the bundle" | TBD | 🟢 2026-05-30 · `.howit-card[data-step="swap"] h4` (replaces prior `自選替換──隨你決定`) |

### Section body

- **Key:** `licensing-lock-body`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 同評級專利可自選替換，隨你決定，不加價、無等審。 | "Same-tier patents are swappable at your discretion — no extra cost, no review wait." | TBD | 🟢 2026-05-30 · shipped as card subtitle `<p>` |
| 平台提供首選 30 和備選 30 專利清單，供你自選替換。 | "The platform provides 30 primary and 30 alternate patents for you to swap." | TBD | 🟢 2026-05-30 · shipped as bullet 1 |
| 授權期間內可不限次替換同評級專利，提升企業防禦力。 | "Within the license term, unlimited same-tier swaps; raise your enterprise defensive capability." | TBD | 🟢 2026-05-30 · shipped as bullet 2 |
| 只要維持評級組合 (5S.6A.9B.6C.4D)，想怎麼換就怎麼換。 | "As long as the tier composition (5S.6A.9B.6C.4D) is maintained, swap however you want." | TBD | 🟢 2026-05-30 · shipped as bullet 3, formatting preserved (half-width parens, `.` separator) |

### Lock summary bullets (prior UI mini-list — *superseded by slide-25 body*)

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 不喜歡某一件？可替換——無加價、無等審。 *(superseded)* | "Don't like a particular one? Swappable — no extra cost, no review wait." | — | ⚪ replaced by slide-25 body subtitle |
| 每組附 30 件同級替換池 *(superseded)* | "Each bundle comes with a 30-piece same-tier swap pool" | — | ⚪ replaced by slide-25 body bullet 1 |
| 期內可不限次替換 *(superseded)* | "Unlimited swaps within the term" | — | ⚪ replaced by slide-25 body bullet 2 |
| 同級替換，組成 30 件不變 *(superseded)* | "Same-tier swap; the 30-piece composition stays unchanged" | — | ⚪ replaced by slide-25 body bullet 3 |

## Slide 26: Licensing product page — Certificates + Badge

**Status:** Direct edit — apply when ready · **Also mirrored on `index.html` `.acc-item[data-step="badge"]` (Licensing accordion item 5) — synced 2026-05-31 with the same 3 → 2 bullet collapse.**

### Section headline

- **Key:** `licensing-badge-headline`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 展示憑證，展示你的軟實力 | "Show the credential, show your soft power" | TBD | 🟢 2026-05-30 · `.howit-card[data-step="badge"] h4` (replaces prior `展示憑證──以及完整檔案`) |

### Section body

- **Key:** `licensing-badge-body`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 高規格授權認證標章，供客戶查詢，拉高被告門檻。 | "High-spec license-certification badge — for customers to query, raises the threshold for being sued." | TBD | 🟢 2026-05-30 · shipped as card subtitle `<p>` |
| 高規格公證電子簽章的數位授權憑證，內嵌獨一授權編號與 QR Code，2 秒線上即時驗證。 | "High-spec notarized-e-signature digital license credential — embedded with a unique license number and QR code; 2-second online live verification." | TBD | 🟢 2026-05-30 · shipped as bullet 1 |
| 「泰然 × 權威機構」的聯名授權認證標章，可自由印製於國際展位、提案書、官網 Footer 或產品外包裝，讓對手不敢輕易踩線。 | "The 'Tairan × authoritative institution' co-branded license-certification badge — freely printable on international booths, proposal documents, website footers, or product packaging — keeps competitors from easily crossing the line." | TBD | 🟢 2026-05-30 · shipped as bullet 2 (Card 5 now has 2 bullets total vs 3 on other How-it-works cards — known visual asymmetry) |

### Badge summary bullets (prior UI mini-list — *superseded by slide-26 body*)

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 一處文件中心——展示、辯護、佐證授權所需的一切。 *(superseded)* | "One document center — everything you need to display, defend, and substantiate the license." | — | ⚪ replaced by slide-26 body subtitle |
| PNG + SVG 版本，即用即嵌 *(superseded)* | "PNG + SVG versions — embed-ready" | — | ⚪ rolled into slide-26 body bullet 1 |
| PAdES 簽章的合約與授權證書 *(superseded)* | "PAdES-signed contract and license certificate" | — | ⚪ rolled into slide-26 body bullet 1 |
| 一條連結即可公開驗證 *(superseded)* | "One link for public verification" | — | ⚪ dropped from card; slide-26 specs only 2 bullets after subtitle |

## Slide 27: Licensing product page — Pricing

**Status:** Direct edit — apply when ready

**Currently on site:** `website/product/licensing/index.html` line 2549 — `section#pricing`.

### Pricing section heading

- **Key:** `licensing-pricing-heading`
- **File:** `website/product/licensing/index.html`
- **Selector:** `#lic-pricing-heading`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 專利授權套件組合 | "Patent licensing package bundle" | TBD | 🟢 2026-05-30 · shipped as the H2's `data-zh` (replaces prior `定價 — 組建你的組合。`); EN side of H2 stays `Pricing — Build your bundle.` |
| 定價 — 組建你的組合。 *(superseded)* | "Pricing — Build your bundle." | — | ⚪ replaced by `專利授權套件組合` on the same H2; original ZH text retired |

### Pricing — Product label (panel header — *folded into the H2 above*)

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 專利授權套件組合 | "Patent licensing package bundle" | TBD | 🟢 2026-05-30 · per Miko 2026-05-30, no separate panel-header element — the product label IS the H2 (above). A short-lived `bp-section-sub <p>` was added then removed in the same session. |

### Pricing — Term tabs

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 3 個月 | "3 months" | TBD | 🟢 2026-05-30 · `bp-toggle-seg[data-bp-term="3"]` (pre-existing) |
| 6 個月 | "6 months" | TBD | 🟢 2026-05-30 · `bp-toggle-seg[data-bp-term="6"]` (pre-existing) |
| 12 個月 | "12 months" | TBD | 🟢 2026-05-30 · `bp-toggle-seg[data-bp-term="12"]` (active default) |
| 24 個月 | "24 months" | TBD | 🟢 2026-05-30 · added as `bp-toggle-seg[data-bp-term="24"]`; matching `PRICES['24'] = 8490` and `TERM_SAVE['24'] = 'Save 15%'` (`85折優惠` ZH) are pricing assumptions — confirm with product team |
| 36 個月 *(removed)* | "36 months" | — | ⚪ removed per slide-27 strikethrough; old `bp-term="36"` slot retired in HTML + JS pricing maps + FAQ blurb |

### Pricing — Jurisdiction picker

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 選擇國家 | "Choose country" | TBD | 🟢 2026-05-30 · `data-zh` added to `.bp-group .bp-label` for jurisdiction |
| 美國 | "United States" | TBD | 🟢 2026-05-30 · `data-zh` added to US option `.opt-nm` |
| 台灣 | "Taiwan" | TBD | 🟢 2026-05-30 · `data-zh` added to TW option `.opt-nm` |

`可訂閱` / `Available` right-side label was added then **removed** on Miko's 2026-05-30 sweep — both ZH and EN gone from the picker; no doc row was ever tracked for it.

### Pricing — Industry picker (6 industries)

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 選擇產業 | "Choose industry" | TBD | 🟢 2026-05-30 · `data-zh` added to `.bp-group .bp-label` for industry |
| 晶片半導體設計製造 | "chip & semiconductor design and manufacturing" | TBD | 🟢 2026-05-30 · `[data-bp-value="chip"] .opt-nm` |
| 網路通訊 | "networking & communications" | TBD | 🟢 2026-05-30 · `[data-bp-value="networking"] .opt-nm` |
| 計算機系統 | "computing systems" | TBD | 🟢 2026-05-30 · `[data-bp-value="computing"] .opt-nm` |
| 綜合應用 | "integrated applications" | TBD | 🟢 2026-05-30 · `[data-bp-value="integrated"] .opt-nm` |
| 多媒體影音 / 影像處理 | "multimedia A/V / image processing" | TBD | 🟢 2026-05-30 · shipped as `多媒體影音/影像處理` (slash without surrounding spaces, fits the chip width) |
| 淨零碳排 | "net-zero / carbon" | TBD | 🟢 2026-05-30 · `[data-bp-value="netzero"] .opt-nm` |
| 30 / 包 | "30 / bundle" | TBD | 🟢 2026-05-30 · `data-zh` added to each industry option's `.opt-rgt` |

These industry names are also mirrored in the JS `INDUSTRY_LABEL_ZH` map so the right-side estimate panel re-renders with ZH when the lang toggle flips.

### Pricing — Bundle estimate panel

| 中文原文 | Literal translation | English (TBD) | Element | Shipped |
|---|---|---|---|---|
| 單包金額預估 | "Single-bundle amount estimate" | TBD | Panel heading | 🟢 2026-05-30 · `.bp-estimate-label` |
| 國家 | "Country" | TBD | Row label | 🟢 2026-05-30 · estimate row 1 label |
| 產業 | "Industry" | TBD | Row label | 🟢 2026-05-30 · estimate row 2 label |
| 期別 | "Term" | TBD | Row label | 🟢 2026-05-30 · estimate row 3 label |
| 月均額 | "Monthly average" | TBD | Price row label | 🟢 2026-05-30 · `.bp-estimate-total .lbl` |
| / 月 9 折優惠 | "/ month 10% off" | TBD | Discount badge | 🟢 2026-05-30 · split across two elements — `/ 月` is the unit `data-zh`, `9折優惠` (no space) comes from the new JS `TERM_SAVE_ZH['12']` map; 6-month uses `95折優惠`, 24-month uses `85折優惠` (assumed) |
| 訂閱 | "Subscribe" | TBD | Primary button | 🟢 2026-05-30 · pre-existing `data-zh="訂閱"` on `.bp-estimate-cta` |

### Pricing — Each-bundle inclusions list

- **Key:** `licensing-pricing-includes-*`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 30 件 SABCD 評等專利 | "30 SABCD-tiered patents" | TBD | 🟢 2026-05-30 · pre-existing |
| 授權認證標章 (Verified License Badge + QR 驗證頁) | "License-certification badge (Verified License Badge + QR verification page)" | TBD | 🟢 2026-05-30 · shipped as short form `授權認證標章` (parenthetical EN equivalent dropped per slide-27 visual annotation — Verified License Badge + QR is still in the EN-side text) |
| DLC 數位授權憑證 (PAdES · eIDAS) | "DLC digital license credential (PAdES · eIDAS)" | TBD | 🟢 2026-05-30 · shipped with full-width parens `（PAdES · eIDAS）` (pre-existing) |
| MOICA 政府電子簽章 | "MOICA government e-signature" | TBD | 🟢 2026-05-30 · pre-existing |
| 不限次同級專利替換（動態池補償） | "Unlimited same-tier patent swap (dynamic pool compensation)" | TBD | 🟢 2026-05-30 · shipped as short form `不限次同級專利替換` (parenthetical `（動態池補償）` dropped per slide-27 visual annotation) |
| AI 智選（24 小時）配對 | "AI smart-pick matching (24 hours)" | TBD | 🟢 2026-05-30 · shipped as short form `AI 智選` (parenthetical `（24 小時）` + `配對` dropped per slide-27 visual annotation) |
| 標章運用於參展 / 宣傳物（法域 × 產業策展） | "Badge usage on trade shows / promotional materials (jurisdiction × industry curation)" | TBD | 🟢 2026-05-30 · shipped as short form `標章運用於參展/宣傳物` (parenthetical dropped). This bullet REPLACED the prior `法域 × 產業策展` ZH (which was the parenthetical) — meaning the bullet now talks about badge usage rather than bundle curation. EN side updated provisionally to `Badge usage on booths & promo materials`. |

## Slide 28: Homepage product snapshot — SABCD (Signal)

**Status:** Direct edit — apply when ready

**Currently on site:** `index.html` line 664 — `#pillar-signal`.

Irene's note: keep this snapshot block; leave KSPs and how-to detail at the product page.

### Snapshot headline

- **Key:** `home-snapshot-signal-headline`
- **File:** `website/index.html`
- **Selector:** `#pillar-signal` heading

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 拼募資的 founder、做盡調的 VC、評估護城河的企業 ——專利強不強，看排名就知道。 | "Founders hustling fundraising, VCs running diligence, enterprises evaluating moats — whether the patent is strong, look at the ranking and you'll know." | TBD | 🟢 2026-05-30 · shipped via `data-zh-html` with entire headline wrapped in `<strong>`; double em-dash `——` collapsed to single `—` per Miko |

### Snapshot body

- **Key:** `home-snapshot-signal-body`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 泰然專利強度評級系統把每件專利打進 同產業 cohort 做百分位排序，產出 SABCD 五級評級。客戶無須整理文件，只需提供專利號，系統自動從 1.8 億筆專利資料庫抽取完整資料、跑完 50 項指標分析。短版執行摘要可快㏿初篩判斷強度，長版逐項下鑽。 | "Tairan Patent Strength Rating System knocks every patent into the same-industry cohort for percentile ranking, producing the SABCD five-tier rating. The customer doesn't need to organize documents — just provide the patent number; the system automatically extracts the full data from the 180-million-record patent database and runs the 50-indicator analysis. The short executive summary lets you rapidly initial-screen for strength judgment; the long version drills down item by item." | TBD | 🟢 2026-05-30 · shipped as body paragraph 1 with two `<strong>` ranges via `data-zh-html`: `同產業 cohort 做百分位排序` and `客戶無須整理文件，只需提供專利號，系統自動從 1.8 億筆專利資料庫抽取完整資料、跑完 50 項指標分析` (the `，產出 SABCD 五級評級。` between them stays plain weight per Miko) |
| 報告可附入 IC Memo、盡職調查、LP 季報、政府補助 / 標案等各類文件，作為第三方專利評級依據 ——律師告訴你「合不合法」，我們告訴你「強不強」。 | "The report can be attached to IC Memo, due diligence, LP quarterly report, government grants / tenders, and various other documents — as third-party patent-rating evidence. Lawyers tell you 'legal / not'; we tell you 'strong / not'." | TBD | 🟢 2026-05-30 · shipped as body paragraph 2 with `第三方專利評級依據` wrapped in `<strong>`; double em-dash `——` collapsed to single `—` per Miko |

### Snapshot annotations (image callouts — *skipped on homepage per Miko*)

| 中文原文 | Literal translation | English (TBD) | Role | Shipped |
|---|---|---|---|---|
| 三個面向，一個評級 *(skipped)* | "Three dimensions, one rating" | — | Annotation 1 | ⚪ per Miko 2026-05-30: content is already implicitly captured in body paragraph 1's `同產業 cohort 做百分位排序，產出 SABCD 五級評級` — skipped on homepage snapshot to reduce duplication; revisit if/when the product page wants the callout treatment |
| 同產業作百分位排名，得出相對應的評級。 *(skipped)* | "Run percentile ranking within the same industry; arrive at the corresponding rating." | — | Annotation 1 body | ⚪ skipped per above |
| 一個引擎，兩種深度 *(skipped)* | "One engine, two depths" | — | Annotation 2 | ⚪ per Miko: implicit in body 1's `短版執行摘要可快速初篩判斷強度，長版逐項下鑽` |
| 短版 Brief / 長版 Pro，按需隨選。 *(skipped)* | "Short Brief / long Pro — select on demand." | — | Annotation 2 body | ⚪ skipped per above |

### Snapshot CTAs

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 免費預覽報告樣本 | "free preview report sample" | View Sample Report *(provisional)* | 🟢 2026-05-30 · shipped as primary CTA; href `/product/signal/` (replaces prior `聯絡業務 → #contact`) |
| 聯絡業務 *(retired from snapshot)* | "contact sales" | — | ⚪ removed from `#pillar-signal` primary CTA slot (still exists in topnav + mobile-nav as the global sales-contact path) |
| 深入了解 → | "learn more →" | TBD | 🟢 2026-05-30 · kept as secondary CTA; href `/product/signal/` |

## Slide 29: Signal product page hero

**Status:** Direct edit — apply when ready

**Currently on site:** `website/product/signal/index.html` line 1775 — `section.hero` with `.pillar-title` at line 1783.

> **Transcription correction (2026-05-31).** Same kind of misframing as slide 21 — the doc previously listed `30 分鐘為 IP 打分。不是幾週。` as the headline and `提交專利號…計算同儕百分位。` as the subhead. Per Miko 2026-05-31, those are **superseded** by the slide-29 "side annotations" below, which are actually Irene's direct replacements: the law-vs-strength wedge becomes the H1, the Peer-Cohort-Snapshot sentence becomes the subhead, and `Powered by Innovue` is a small credit line below.

### Hero headline (insurance / law-vs-strength wedge)

- **Key:** `signal-hero-headline`
- **File:** `website/product/signal/index.html`
- **Selector:** `.hero .pillar-title`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 律師告訴你「合不合法」<br>我們告訴你專利「強不強」 | "Lawyers tell you 'legal / not'<br>We tell you the patent is 'strong / not'" | TBD | 🟢 2026-05-31 · two-line H1, second clause em-emphasized; EN preserved structurally (`Grade IP in 30 minutes. / Not weeks.`) and now diverges from ZH meaning — flagged for Miko-lock |
| 30 分鐘為 IP 打分。不是幾週。 *(superseded)* | "30 minutes to score the IP. Not weeks." | — | ⚪ replaced by the row above |

### Hero subhead

- **Key:** `signal-hero-subhead`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 把目標專利打進 產業池做「同儕基準快照（Peer Cohort Snapshot）」百分位排序，產出 SABCD 五級評級。 | "Knock the target patent into the industry pool to do a 'Peer Cohort Snapshot' percentile ranking; produce the SABCD five-tier rating." | TBD | 🟢 2026-05-31 · shipped as `.pillar-sub` paragraph; EN side preserved (`Submit a patent number; the SABCD-graded Brief lands in thirty minutes. Peer percentile drawn from your industry's curated pool — not a week-long analyst engagement.`) and diverges from ZH meaning |
| Powered by Innovue | "Powered by Innovue" | "Powered by Innovue" | 🟢 2026-05-31 · shipped as a second `.pillar-sub.pillar-sub--credit` paragraph on its own visual line (new CSS modifier in `assets/styles.css`: 13px, `--text-tertiary` color, `margin-top: 12px`). Same string in both languages. |
| 提交專利號，半小時內收到 SABCD 評等報告。對 Innovue 1.7 億件全球第四大專利資料庫計算同儕百分位。 *(superseded)* | "Submit a patent number; receive the SABCD rating report within half an hour. Compute the peer percentile against Innovue's 170-million-record, world's-4th-largest patent database." | — | ⚪ replaced by Peer-Cohort-Snapshot row above |

### Hero CTAs

- **Key:** `signal-hero-cta-primary` / `signal-hero-cta-secondary`

| 中文原文 | Literal translation | English (TBD) | Role | Shipped |
|---|---|---|---|---|
| 免費預覽報告樣本 | "free preview report sample" | TBD | Primary | 🟢 2026-05-31 · href `/product/signal/lobby/` (existing) |
| 聯絡業務 | "contact sales" | TBD | Secondary | 🟢 2026-05-31 · href `#contact` (existing, unchanged) |
| 取得第一份 Brief *(superseded)* | "get your first Brief" | — | Primary (prior) | ⚪ replaced by `免費預覽報告樣本` |

### Hero eyebrow (cleared in ZH)

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 代幣制估值 · SABCD 評等 *(retired in ZH)* | "Token-based valuation · SABCD grading" | — | ⚪ ZH `data-zh=""` cleared per Miko 2026-05-31; the existing `.pillar-eyebrow:empty { display: none }` rule hides it. EN side still reads `Token-Based Valuation · SABCD`. |

## Slide 30: Signal product page — Cohort comparison

**Status:** Direct edit — apply when ready

**Currently on site:** `website/product/signal/index.html` line 1826 — `section "How Signal works"`. **Also mirrored on `index.html` `.acc-item[data-step="pool"]` (Signal accordion item 2) — synced 2026-05-31 with the same 3 → 2 bullet collapse.**

### Section headline

- **Key:** `signal-cohort-headline`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 對比同儕池 | "Compare against the peer pool" | TBD | 🟢 2026-05-31 · `.howit-card[data-step="cohort"] h4` (replaces prior `比對到對的同儕池`) |
| 蘋果對蘋果， | "Apples to apples," | TBD | 🟢 2026-05-31 · shipped verbatim as card subtitle `<p>` (trailing `，` preserved per PDF; reads as a fragment but matches Miko's literal text) |

### Section body (badge copy applied verbatim per Miko 2026-05-31)

- **Key:** `signal-cohort-body`

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 高規格公證電子簽章的數位授權憑證，內嵌獨一授權編號與 QR Code，2 秒線上即時驗證。 | "High-spec notarized-e-signature digital license credential — embedded with a unique license number and QR code; 2-second online live verification." | TBD | 🟢 2026-05-31 · shipped as bullet 1 (same string also lives on Licensing page slide-26 card 5) |
| 「泰然 × 權威機構」的聯名授權認證標章，可自由印製於國際展位、提案書、官網 Footer 或產品外包裝，讓對手不敢輕易踩線。 | "The 'Tairan × authoritative institution' co-branded license-certification badge — freely printable on international booths, proposal documents, website footers, or product packaging — keeps competitors from easily crossing the line." | TBD | 🟢 2026-05-31 · shipped as bullet 2 (Card now has 2 bullets total — collapsed from 3) |

**⚠️ Note (2026-05-31):** The body copy on slide 30 duplicates slide-26 (Licensing badge section) verbatim — the same two `<li>` strings now render on both `product/licensing/` and `product/signal/`. Miko reviewed and applied as-spec'd; flagged here for Irene's awareness in case the duplication is unintended. EN-side framing on this card (`Matched against the right peer pool` / `Scores you can trust…`) is untouched and now tells a completely different story from the ZH — the largest EN↔ZH semantic divergence on the site, intentional per Miko (will be addressed in a future EN Miko-lock pass).

### Cohort summary bullets (prior UI mini-list — *superseded by slide-30 swap*)

| 中文原文 | Literal translation | English (TBD) | Shipped |
|---|---|---|---|
| 評分可信賴——校準對象是真正在同一技術範疇競爭的專利，而非全市場攤平。 *(superseded)* | "Scoring is trustworthy — the calibration target is patents actually competing in the same technical scope, not the whole market flattened." | — | ⚪ replaced by slide-30 subtitle `蘋果對蘋果，` |
| IPC 驅動的 12 產業池路由 *(superseded)* | "IPC-driven 12-industry-pool routing" | — | ⚪ replaced by slide-30 body bullet 1 (badge copy) |
| Innovue 1.7 億件專利資料庫（全球第 4 大） *(superseded)* | "Innovue's 170-million-record patent database (world's 4th-largest)" | — | ⚪ replaced by slide-30 body bullet 2 (badge copy) |
| 池內樣本不足會於 Brief 上標示警示 *(retired)* | "If the pool sample is insufficient, a warning is marked on the Brief" | — | ⚪ card collapsed from 3 → 2 bullets; this bullet no longer rendered in either language |

---

# Part E — English copy correction + page TBDs (slides 31–32)

## Slide 31: English copy correction

**Status:** 🟢 2026-05-31 · already-resolved (bug not present in current EN copy)

Irene's note about an English-copy bug on the current site:

> 官網現有英文文案「SABCD scores against 170M patents」與真實產品機制不符。修正成「SABCD ranks against industry cohort drawn from TIS's curated pool. Patent search backed by Innovue's 170M-patent database.」才精準。

Literal: "The existing English copy on the official site 'SABCD scores against 170M patents' doesn't match the real product mechanism. Corrected to 'SABCD ranks against industry cohort drawn from TIS's curated pool. Patent search backed by Innovue's 170M-patent database.' is precise."

**Resolution (2026-05-31):** Audited `index.html` and `product/signal/index.html` for the literal string `SABCD scores against 170M patents` — not present. Current EN copy on the Signal page already uses the corrected `industry pool` / `peer cohort` framing Irene wants:

- Hero subhead: `Peer percentile drawn from your industry's curated pool — not a week-long analyst engagement.`
- Deliverable card: `calibrated against the peers in its industry pool, not the whole market.`
- How-it-works cohort card: `Scores you can trust — graded against the patents that actually compete with yours, not the whole market.`
- Meta description (`index.html` + `product/signal/index.html`): `SABCD scoring against your industry's curated patent pool…`

Irene's flagged bug appears to have been fixed in a prior copy pass before this 2026-05-30/31 session. No HTML edit needed.

*(If Irene re-flags this with a specific location, reopen — slide 31 is mark-closed but not deleted.)*

## Slide 32: New marketing pages (to be built, 1–2 weeks)

**Status:** Strategic direction (NEW pages, not yet built)

Two new pages spec'd here for B/C v1.0 secondary CTAs:

### C secondary CTA destination — Badge usage demo page

- **Path:** `/badge-showcase`
- **Page sections:**
  - Badge body + specifications
  - 6 application scenario mockups (proposal / grant application / large-customer contract / website / quote / Email)
  - QR verification demo animation
  - Three-scenario imagery (grant / tender / large customer)
  - Badge self-generation tool preview

### B secondary CTA destination — Patent rating methodology page

- **Path:** `/methodology`
- **Page sections:**
  - One-sentence summary (lawyer vs TIS wedge)
  - SABCD five-tier scoring system (incl. weighting logic)
  - 8 pillars × 50 indicators detailed
  - Cohort composition / "more usage = more accurate" mechanism
  - Innovue 170-million-record backend role
  - vs law-firm IPDD comparison table

**No copy provided for these pages on slide 32. Spec already in B / C v1.0 documents.** Execution deferred.

---

# Part F — TIS weekly meeting items (slide 33)

**Status:** Open sign-off items — surfaced at top of this doc.

From slide 33 (already captured in §Open sign-off items at the top):

1. Three-institution disclosure scope (legal / Innovue)
2. Signal Token pricing visibility (product)
3. MVP August timeline (engineering / product)
4. New marketing page ownership (design / marketing)

---

# Appendix A: Transcription notes

PDF transcription quirks worth flagging:

- **OCR character**: the character `㏿` appears throughout the PDF in places where `速` is meant (e.g. `快㏿` = `快速`, "fast"). Preserved verbatim from the PDF source. When applying to HTML, replace `㏿` → `速`.
- **OCR artifact in slides 29 / 30**: PDF text shows `同僑` in two places where `同儕` (peer / cohort) is the consistent term used everywhere else (slides 15, 28, 30 bullet). Normalized to `同儕` in this doc. PDF originals say `同僑池` (slide 30 headline) and `同僑基準快照` (slide 29 side annotation) — these are OCR misreads of 儕.
- **× vs x**: slides occasionally render the multiplication sign `×` as lowercase `x` (e.g. slide 21 right-side annotation: `1 分鐘勾選國家x產業x期別`). Preserved as written in PDF source.
- **Spaces after `。`**: PDF includes occasional half-width spaces after sentence-final `。` (e.g. "黃金名片。 在國際買家"). These are Chinese-typesetting artifacts; collapsed to no-space in this doc for readability. Apply Irene's preferred convention on the live site.
- **Slide 30 body copy** appears to be a copy-paste artifact from slide 26 (badge section). Flagged as Open Question 3.

---

# Appendix B: Open questions for Irene

Flagged during transcription, needing her clarification:

1. **Slide 17 middle stat** — slide annotation says "13 ？？？" but current site shows `data-target="50"` and `data-target="100"`. Confirm intended counter values for all 3 stat positions and what the middle one represents.
2. **Slide 19 number drift** — Signal product card description says 1.7 億 (170M); slide 17 prefers 180M. Reconcile to one value before shipping.
3. **Slide 30 cohort-section body copy** — the text on this slide appears identical to slide 26's badge-section copy. Confirm whether this is intentional reuse or a slide-editing artifact, and provide the actual cohort-pool body copy if it's the latter.
4. **Slide 17 Innovue rank anchor** — ~~confirm with Innovue whether the "4th-largest" claim is still accurate before publishing.~~ Resolved 2026-06-01: anchor flipped to **3rd-largest** per Irene.
5. **Persona-A hero slot placement** — should slide 7 banner replace existing hero slide 1 (`#hero-slide-0`, currently 'positioning' pillar), be added as a new slide, or supplement slide 2 (`#hero-slide-1`, currently 'licensing')? Same question for personas B (slide 8) and C (slide 9).
