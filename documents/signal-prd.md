# Signal — Product Page PRD (index · methodology · sample-report)

> **Surface:** Patent Intelligence SaaS / 泰然專利強度評級系統 (VC-facing "Signal Platform")
> **Scope:** the three pages under `website/product/signal/` — `index.html`, `methodology.html`, `sample-report.html`
> **Status:** 🔵 Draft · authoring spec · 2026-06-10
> **Purpose:** a single copy-deck + structure spec so the two stub pages can be populated with real, voice-correct EN + 繁中 (zh-TW) copy and correct layout — grounded in the real PSS methodology and the preview's report visuals, not invented filler.

This doc is an **authoring spec**, not a rendered artifact. It is surface-scoped (lives beside
`chinese-copy-direction.md`), not a brand `.md` — editing it triggers no snapshot resync. The HTML
page builds are the downstream step this PRD enables.

---

## 0. Guardrails & source-of-truth

### 0.1 Source-of-truth map

| Need | Source | Notes |
| --- | --- | --- |
| Voice, tone, bilingual phrasing | `product/signal/index.html` (live, complete) | The register every new section must match. **Audited, not rewritten.** |
| Voice law (anti-hype, anchor numbers, ISO dates, Innovue attribution) | `brand/brand-voice.md` | 泰然 anchor: composed, evidence-driven, never salesy. |
| Locked Signal persona copy / CTAs | `website/documents/chinese-copy-direction.md` (Signal / Persona-B, KSP 1–4) | Product name 泰然專利強度評級系統 is locked; methodology CTA = 專利評級怎麼算. |
| **Methodology content (REAL)** — 8 pillars, 50 indicators (codes · weights · types), normalization, tiers | the attached **TIS Investor Presentation** (appendix indicator table = authoritative) | Pillar Chinese names + indicator-level detail come from here. |
| **Sample-report visuals + worked data** | `brand/previews/signal-flow-preview.html` (`REPORTS['aichip-c']`, `PILLAR_DEFS`, `TIER_INFO`, the report renderer + STX explainer panels) | Every component, label, and number in §C is lifted verbatim from here. |
| Existing methodology demo section | `product/signal/methodology.html` (Companies-by-strength) | Already built; documented here so it isn't re-derived. |

### 0.2 Voice guardrails (enforce on every copy cell)

- **Banned (brand-voice §3):** *AI-powered, revolutionary, unlock, empower, seamless, leverage (v.),
  world-class, actionable insights, trusted by, solutions,* hedging *may/could.* Every claim attaches
  to a number, a named counterparty, a jurisdiction, or a framework output.
- **Anchor numbers — render verbatim:** **50 indicators**, **8 pillars**, **SABCD**, **0–100 PSS**,
  Innovue **180M-patent**, **3rd-largest globally** (see §D for the 170M/180M reconciliation).
- **Dates:** ISO `YYYY-MM-DD` everywhere, including report issue dates.
- **Innovue attribution:** credit once near the top of a page (hero / first methodology line), then
  TIS voice carries the rest. Don't re-credit in every section.
- **Speed is not the wedge for VCs.** index.html uses "30 minutes" as a hook, but the persuasion
  centre is *peer-relative objectivity* (護城河真偽 / 量化量尺), not turnaround. Methodology and
  sample-report lead with rigor and comparability, not speed.

### 0.3 Pillar taxonomy — reconciliation (decided)

Website English labels are canonical (already live in `index.html` / preview); the deck supplies the
Chinese names + indicator detail. Clean 1:1:

| Code | EN label (canonical) | 中文 | Indicators |
| --- | --- | --- | --- |
| P1 | Citation Impact | 引用影響力 | 7 |
| P2 | Legal Strength | 法律強度 | 8 |
| P3 | Technical Value | 技術價值 | 7 |
| P4 | Market Coverage | 市場覆蓋 | 5 |
| P5 | Text Quality | 文本品質 | 8 |
| P6 | Network Centrality | 網路中心性 | 4 |
| P7 | Licensing Potential | 授權潛力 | 6 |
| P8 | Forward-Looking Value | 前瞻價值 | 5 |

> Note the preview uses terse forms (e.g. "Citation Impact", "Text Quality"); `index.html` and some
> deck sections use longer forms ("Forward Citations & Technology Impact", "Claim & Specification
> Quality"). **Use the terse `PILLAR_DEFS` forms** above so the methodology page and the rendered
> report agree — the report renderer is the binding reference.

---

## A. `index.html` — audit (do not rewrite)

The page is complete and is the voice reference. Captured here so the two new pages match its
register, and to log the cross-link fixes it needs.

### A.1 Section arc

`announce bar → hero → deliverables (6) → "three ways" gapcover (3) → what's-inside bundlegrid →
walkaway (4 steps) → how-it-works carousel (6) → pricing (3 tiers + credit table) → FAQ (5) → contact`.

### A.2 Verbatim anchor copy (register reference)

| Slot | EN | 中文 (zh-TW) |
| --- | --- | --- |
| Hero H1 | Grade IP in 30 minutes. / *Not weeks.* | 律師告訴你「合不合法」/ 我們告訴你專利「強不強」 |
| Hero sub | Submit a patent number; the SABCD-graded Brief lands in thirty minutes. Peer percentile drawn from your industry's curated pool — not a week-long analyst engagement. | 把目標專利打進產業池做「同儕基準快照（Peer Cohort Snapshot）」百分位排序，產出 SABCD 五級評級。 |
| Deliverable | SABCD 5-tier rating | SABCD 五級評定 |
| Deliverable | Strong-or-not, not legal-or-not | 不只「合不合法」，更是「強不強」 |
| Deliverable | Peer-cohort benchmarking | 跨標的同儕基準排序 |
| Deliverable | Innovue's 180M-patent database | 新穎 1.8 億筆專利資料庫 |
| Three-ways H2 | Three ways to read a patent's real strength — only one scales across a portfolio. | 判斷專利真實強度有三條路——只有一條撐得起整個投資組合。 |
| Bundlegrid H2 | What's inside your report, and how it's built. | 報告裡有什麼，又是怎麼算出來的。 |
| Walkaway H2 | Submit a patent number. You leave with… | 提交一個專利號，你帶走的是…… |

These four are the tonal anchors the new pages inherit: the **lawyer/strength wedge**, the
**peer-cohort percentile**, the **50-indicator/8-pillar** spine, and the **deal-doc deliverable**.

### A.3 Cross-link fixes (page-edit follow-ups, not part of this PRD's authoring)

1. **Hero CTA mismatch.** "Get your first Brief" (`label`) links to `sample-report.html` — copy and
   destination disagree. Resolve when building: either relabel to "免費預覽報告樣本 / See a sample
   report" (matches the locked chinese-copy-direction CTA) or repoint. **Recommend relabel** — the
   sample page is a preview, not a sign-up.
2. **No link into `methodology.html`.** Add a "專利評級怎麼算 / How the rating is calculated" link
   from the SABCD-verdict or 50-indicator bundlegrid card → `methodology.html` (locked CTA already
   exists in chinese-copy-direction).

---

## B. `methodology.html` — full build spec

**Scope = scoring engine only.** No FTO claim-charts, no revenue-share waterfall, no SABCD economic
multipliers. Lead with rigor and comparability.

Existing page state: hero (with `[SCAFFOLDING]` line) + one "Companies by patent strength" demo
section + footer. Sections B.1 and B.2–B.7 are new; B.8 documents the existing demo.

### B.1 Hero — keep structure, replace the scaffolding line

| Slot | EN | 中文 |
| --- | --- | --- |
| Eyebrow | Token-Based Valuation · SABCD | *(unchanged; eyebrow has no zh)* |
| H1 | SABCD Methodology. | SABCD 評級方法 |
| Sub (keep) | Eight pillars. Fifty indicators. One PSS score on a 0–100 scale. | 8 大支柱 · 50 項量化指標 · 0–100 分綜合評分。 |
| **Replace `[SCAFFOLDING]` with lede** | The same scoring engine behind every Signal report — what each pillar measures, how the 50 indicators are weighted, and how a 0–100 PSS resolves to an S–D tier against industry peers. | 每一份 Signal 報告背後的同一套評分引擎——每根支柱量測什麼、50 項指標如何加權，以及 0–100 分的 PSS 如何在同產業同儕中對應到 S–D 評級。 |

Keep the existing "Back to Signal / 回到 Signal" secondary button.

### B.2 Why peer-relative grading (the wedge)

Carry the index.html lawyer/strength contrast into a methodology frame.

| Slot | EN | 中文 |
| --- | --- | --- |
| H2 | A rating, not an opinion | 評級，而非意見 |
| Body | Counsel tells you whether a patent is *legal*. Signal tells you whether it is *strong* — and says so on a scale every reviewer reads the same way. The score is **pool-relative**: a patent is graded against peers in its own industry, so a percentile means the same thing in semiconductors as it does in biotech. | 律師告訴你專利「合不合法」；Signal 告訴你它「強不強」——並用一把每位審閱者都讀得一樣的量尺說清楚。分數是**同儕相對**的：專利只與同產業的同儕比較，因此半導體裡的百分位，和生技裡的百分位，意義一致。 |
| Callout | Same patent, same number, every time. The pool and the formula are fixed — there is no "expert-to-expert" drift. | 同一件專利、同一個號碼，結果每次一致。同儕池與公式固定——沒有「專家對專家」的判斷漂移。 |

### B.3 The PSS engine (how a score is built)

A three-step flow + the normalization table. Mirror the index.html "how it's built" register.

**Flow (3 steps):** `原始值計算 Raw values → 同儕池正規化 In-pool normalization → 加權聚合 Weighted aggregation → PSS 0–100`.

| Slot | EN | 中文 |
| --- | --- | --- |
| H2 | How the PSS score is built | PSS 分數怎麼算出來 |
| Lede | Every patent is graded on **50 indicators**, grouped into **8 pillars**. Each indicator is normalised against peers in the same cohort, the pillar scores combine into a **PSS (0–100)**, and the PSS maps to a **SABCD tier**. Cohort percentile and rank fall out of the same comparison step. | 每件專利依 **50 項指標**評分，歸入 **8 大支柱**。每項指標對同一同儕池正規化，支柱分數聚合為 **PSS（0–100）**，PSS 再對應 **SABCD 評級**。同儕百分位與池內排名，皆由同一次比較得出。 |
| Split | Of the 50 indicators, **34 draw from structured data** (citations, family, legal status, network graph) and **16 are graded by NLP** against a fixed rubric. | 50 項指標中，**34 項來自結構化資料**（引用、家族、法律狀態、引用網路），**16 項由 NLP 依固定評分標準評定**。 |

> **34/16 vs 33/16/1** — see §D.1. Resolve the structured-count wording before this line ships.

**Normalization types (from the deck — 4 kinds):**

| Type | EN | 中文 | Applies to |
| --- | --- | --- | --- |
| Continuous percentile | Most indicators — ranked against the pool, percentile by tie-aware rank | 連續型 — 對同儕池排名取百分位 | majority |
| Scarcity / inverse | Rarer = higher (e.g. triadic filing) | 稀缺型 — 越罕見分數越高（如三方專利） | P4.3 三方專利指標 |
| NLP rubric | 1–10 rubric score → secondary in-pool normalization | NLP 型 — 1–10 評分標準，再做池內二次正規化 | the 16 NLP indicators |
| Disqualifying screen | Weight 0; a gate, not a score (legal status must be *granted/active*) | 棄權型 — 權重 0，為篩選門檻而非計分（法律狀態須為有效授權） | P2.4 法律狀態 |

### B.4 The eight pillars (one block each)

Render as 8 cards. Each: code · EN label · 中文 · one-line role · indicator count. Pull roles from
the deck's pillar intros.

| Code | EN / 中文 | Role (EN) | 角色 (中) | n |
| --- | --- | --- | --- | --- |
| P1 | Citation Impact / 引用影響力 | How much the prior art leans on this patent — volume, velocity, quality, structure. | 後續技術對本專利的依賴：量、速度、品質、結構。 | 7 |
| P2 | Legal Strength / 法律強度 | Protection breadth and durability — family, claims, remaining life, prosecution. | 保護範圍與存續：家族、請求項、剩餘年限、審查歷程。 | 8 |
| P3 | Technical Value / 技術價值 | The substance behind the grant — disclosure depth and NLP-graded novelty. | 授權背後的實質：說明書深度與 NLP 評定的新穎性。 | 7 |
| P4 | Market Coverage / 市場覆蓋 | Where it is enforceable — GDP-weighted, key-market footprint. | 可主張的地理範圍：GDP 加權、關鍵市場覆蓋。 | 5 |
| P5 | Text Quality / 文本品質 | The pillar only deep prosecution review used to reach — claim clarity, support, hierarchy. | 過去須資深審閱才觸及的支柱：請求項明確性、支持度、層次。 | 8 |
| P6 | Network Centrality / 網路中心性 | Position in the citation graph — PageRank, betweenness, hub/authority. | 引用網路中的位置：PageRank、中介、樞紐/權威。 | 4 |
| P7 | Licensing Potential / 授權潛力 | Whether it can be monetised — detectability, design-around, damages basis. | 能否變現：可偵測性、迴避難度、損害賠償基礎。 | 6 |
| P8 | Forward-Looking Value / 前瞻價值 | Future trajectory — maturity, citation trend, adoption, runway. | 未來軌跡：成熟度、引用趨勢、產業採用、延展性。 | 5 |

### B.5 The fifty indicators (credibility centrepiece — full table)

The authoritative appendix, lifted from the deck. Columns: **Pillar · Code · Indicator (EN / 中文) ·
Type · Weight**. Type legend: `結構化 Structured · NLP · 衍生 Derived · 選用 Optional · 棄權 Disqualifying`.
Weights are within-pillar.

**P1 Citation Impact / 引用影響力**

| Code | EN / 中文 | Type | Wt |
| --- | --- | --- | --- |
| P1.1 | Forward citation count / 前向引用次數 | 結構化 | 20% |
| P1.2 | Citation velocity / 引用速度（年化被引） | 結構化 | 20% |
| P1.3 | Generality index / 通用性指數（IPC 分布） | 結構化 | 15% |
| P1.4 | Originality index / 原創性指數 | 結構化 | 10% |
| P1.5 | Disruptiveness (CD Index) / 顛覆性指數 | 結構化 | 10% |
| P1.6 | Backward citations / 後向引用數 | 結構化 | 5% |
| P1.7 | Examiner citation ratio / 審查員引用率 | 結構化 | 20% |

**P2 Legal Strength / 法律強度**

| Code | EN / 中文 | Type | Wt |
| --- | --- | --- | --- |
| P2.1 | Patent family size / 專利家族規模 | 結構化 | 10% |
| P2.2 | Claim count / 請求項數量 | 結構化 | 10% |
| P2.3 | Independent claim count / 獨立請求項數量 | 結構化 | 15% |
| P2.4 | Legal status / 法律狀態 | 棄權 Disqualifying | 0% |
| P2.5 | Remaining patent life / 剩餘專利年限 | 結構化 | 25% |
| P2.6 | Maintenance-fee status / 維護費狀態 | 結構化 | 10% |
| P2.7 | Continuation / divisional / 接續、分割申請 | 結構化 | 10% |
| P2.8 | Prosecution intensity / 審查歷程強度 | 結構化 | 20% |

**P3 Technical Value / 技術價值**

| Code | EN / 中文 | Type | Wt |
| --- | --- | --- | --- |
| P3.1 | IPC breadth / IPC 分類廣度 | 結構化 | 10% |
| P3.2 | Technology-convergence index / 技術融合指數 | 結構化 | 15% |
| P3.3 | Inventor-team size / 發明人團隊規模 | 結構化 | 5% |
| P3.4 | Specification depth / 說明書深度 | 結構化 | 10% |
| P3.5 | Technical novelty / 技術新穎性評估 | NLP | 30% |
| P3.6 | Invention level (TRIZ) / 發明層級分類 | NLP | 20% |
| P3.7 | SEP essentiality / SEP 必要性 | 選用 Optional | 10% |

**P4 Market Coverage / 市場覆蓋**

| Code | EN / 中文 | Type | Wt |
| --- | --- | --- | --- |
| P4.1 | Family geographic breadth / 家族地理廣度 | 結構化 | 15% |
| P4.2 | GDP-weighted market coverage / GDP 加權市場覆蓋 | 結構化 | 30% |
| P4.3 | Triadic patent indicator / 三方專利指標 | 稀缺 Scarcity | 20% |
| P4.4 | Key-market hit rate / 關鍵市場命中率（US·CN·EP·JP·KR） | 結構化 | 20% |
| P4.5 | Emerging-market footprint / 新興市場布局 | 結構化 | 15% |

**P5 Text Quality / 文本品質**

| Code | EN / 中文 | Type | Wt |
| --- | --- | --- | --- |
| P5.1 | Claim clarity / 請求項明確性 | NLP | 15% |
| P5.2 | Specification support / 說明書支持度 | NLP | 15% |
| P5.3 | Means-plus-function ratio / 功能性語言比例 | NLP | 10% |
| P5.4 | Multiple-dependent-claim efficiency / 多重附屬效率 | NLP | 8% |
| P5.5 | Claim-scope breadth / 請求項範圍寬度 | NLP | 15% |
| P5.6 | Claim-hierarchy completeness (Defense in Depth) / 請求項層次結構完整性 | NLP | 12% |
| P5.7 | Multilingual consistency / 多語言一致性 | NLP · 選用 | 10% |
| P5.8 | Specification-quality composite / 說明書品質綜合 | NLP | 15% |

**P6 Network Centrality / 網路中心性**

| Code | EN / 中文 | Type | Wt |
| --- | --- | --- | --- |
| P6.1 | PageRank centrality / PageRank 中心性 | 結構化 | 25% |
| P6.2 | Betweenness centrality / 中介中心性 | 結構化 | 25% |
| P6.3 | Hub / Authority score (HITS) / 樞紐 / 權威分數 | 結構化 | 25% |
| P6.4 | Community-bridging position / 社群橋接位置 | 結構化 | 25% |

**P7 Licensing Potential / 授權潛力**

| Code | EN / 中文 | Type | Wt |
| --- | --- | --- | --- |
| P7.1 | Infringement detectability / 侵權可偵測性 | NLP | 20% |
| P7.2 | Design-around difficulty / 迴避設計難度 | NLP | 20% |
| P7.3 | Damages basis / 損害賠償基礎 | NLP | 15% |
| P7.4 | Licensing-history signal / 授權歷史信號 | NLP | 15% |
| P7.5 | Patent-thicket density / 專利叢集密度 | 結構化 | 15% |
| P7.6 | Choke-point index / 壟斷位置指數 (P1.7×0.6 + P6.2×0.4) | 衍生 Derived | 15% |

**P8 Forward-Looking Value / 前瞻價值**

| Code | EN / 中文 | Type | Wt |
| --- | --- | --- | --- |
| P8.1 | Technology maturity / 技術成熟度 | NLP | 15% |
| P8.2 | Citation-trend slope / 引用趨勢斜率 | 結構化 | 20% |
| P8.3 | Industry adoption / 產業採用度 | NLP | 25% |
| P8.4 | Patent-age efficiency / 專利年齡效率 | 結構化 | 15% |
| P8.5 | Future-application potential / 未來應用潛力 | NLP | 25% |

> Count check: 7+8+7+5+8+4+6+5 = **50** ✓. Type tally and the headline "34 structured / 16 NLP"
> wording must be reconciled per §D.1 before publish.

### B.6 SABCD tiers (bands only — no economic multipliers)

From the preview `TIER_INFO`. **Drop the licensing-multiplier column** (out of scope). Reuse the
preview SABCD colour tokens (S gold / A emerald / B sky / C violet / D orange).

| Tier | Band | EN meaning | 中文 |
| --- | --- | --- | --- |
| S | ≥ P85 | Premier strategic | 頂級戰略 |
| A | P65–84 | High-value core | 高價值核心 |
| B | P35–64 | Practical technology | 實用技術 |
| C | P15–34 | General defense | 一般防禦 |
| D | < P15 | Foundation layout | 基礎布局 |

| Slot | EN | 中文 |
| --- | --- | --- |
| Note | A tier is a discretisation of cohort percentile. S is the top ~15% of the pool — the threshold the homepage cites as "S (top 15%)". | 評級是同儕百分位的分級。S 為同儕池前約 15%——即首頁所述的「S 級（前 15%）」。 |

> §D.3: exact band cut-points (≥P85 etc.) need final sign-off before they appear as hard numbers on
> a public page.

### B.7 Transparency note (close with rigor + CTA)

| Slot | EN | 中文 |
| --- | --- | --- |
| H2 | Transparency over precision | 透明優先於精準 |
| Body | Every score traces to a formula. Structured indicators show their raw inputs; NLP indicators carry a rubric score and a reasoning trail you can audit. Pillar weights are fixed and published. The cohort re-ranks **weekly** — rank and percentile can move as patents enter or lapse, even when a patent's own indicators don't. | 每個分數都可追溯到公式。結構化指標揭示原始輸入；NLP 指標附帶評分標準與可稽核的推理軌跡。支柱權重固定且公開。同儕池**每週**重新排名——專利進池或失效時，即使本身指標未變，排名與百分位仍可能變動。 |
| Innovue line | All indicators draw from the **Innovue 180M-patent index**, spanning 100+ jurisdictions, refreshed daily. Industry assignment uses the patent's primary IPC code. | 所有指標取自 **新穎 1.8 億筆專利索引**，涵蓋 100 多個司法管轄區，每日更新。產業歸屬依專利主要 IPC 分類。 |
| CTA | See a graded report → | 看一份評級報告 → |

CTA links to `sample-report.html`.

### B.8 Companies-by-strength (existing demo — documented, keep as-is)

Already built and live: 5 company cards (Macrosilicon S / Vivid Imaging A / Yuan Bio B / AIChip C /
Hongchen D), each a monochrome arc gauge (mean PSS) + tier chip + S–D distribution strip. Keep its
header verbatim:

| Slot | EN | 中文 |
| --- | --- | --- |
| H2 | Companies by patent strength | 依專利強度排序的公司 |
| Dek | Each gauge is the mean PSS across a company's graded patents, resolved to one aggregate SABCD tier — the same eight-pillar method, rolled up to a portfolio. The strip below shows how it distributes across S–D. | 每個量規為該公司已評分專利的 PSS 平均值，彙整為單一 SABCD 聚合等級——同一套八大支柱方法，延伸至整個專利組合。下方分布條顯示 S–D 的構成。 |

Place after B.6 (the tier table contextualises the gauges) or as the closing visual before B.7.

> §D.2: the AIChip Co. card here uses a **67-patent** pool / 19 graded patents, while the
> sample-report's AIChip patent (§C) uses the preview's **183-patent G06N** pool. Align the pool
> size across the two pages, or keep them deliberately distinct (company portfolio vs. single
> patent) and footnote it. **Recommend** aligning to 183/G06N for consistency.

---

## C. `sample-report.html` — full build spec

**Anchor patent (from `REPORTS['aichip-c']`, authoritative):**

| Field | Value |
| --- | --- |
| Patent | EP3821456 · AIChip Semiconductor GmbH (display assignee "AIChip Co.") |
| Title | Hardware accelerator architecture for neural-network inference with sparse-weight compression |
| Tier · PSS · percentile · rank | **C** · **28.42** · cohort **21.8%** (seal shows "Top 78.2%") · **143 / 183** |
| Cohort | AI accelerator hardware · G06N · 183 patents · indicators graded 50 / 50 |
| Status · IPC · family | Active · G06N 3/063 (Neural-network hardware accelerator) · EP · US · CN |
| Filed · Granted · Life | 2019-02-11 · 2022-06-15 · ~13 yrs · until 2039-02-11 |
| Claims | 22 (3 indep · 19 dep) |
| Issued (report date) | 2026-05-06 |

**Coverage = full Brief + full Pro, end-to-end**, as two comparable samples (tab or stacked toggle:
"Brief 報告 / Pro 報告"). Brief = report pages 1–2; Pro = pages 1–3. All component markup lifts from
`signal-flow-preview.html` — this page is a static render of that report, not a new design.

### C.1 Page intro (above the rendered report)

| Slot | EN | 中文 |
| --- | --- | --- |
| Eyebrow (keep) | Token-Based Valuation · SABCD | — |
| H1 (keep) | Report Sample. | 報告樣本 |
| Sub (replace `[SCAFFOLDING]`) | A complete SABCD-graded report — the same Brief and Pro a Signal subscriber receives — shown here free, end to end. | 一份完整的 SABCD 評級報告——與 Signal 訂閱者收到的 Brief 與 Pro 版本相同——在此免費、完整呈現。 |
| Brief-vs-Pro line | Same scoring engine. **Brief** is the verdict, the eight pillars, and the cohort context. **Pro** adds the 50 underlying indicators in full, Top-10 drivers and sensitivities, a five-scenario stability band, and recommended actions. | 同一套評分引擎。**Brief** 給你評定結果、八大支柱與同儕脈絡；**Pro** 再補上完整 50 項指標、Top 10 強項與敏感項、五情境穩定度區間，以及行動建議。 |
| Sample notice | Illustrative example. Figures are representative of the report format, not a recommendation on any real company. | 示意範例。數據用以呈現報告格式，非對任何實際公司的建議。 |

### C.2 Brief sample — report pages 1–2 (component-by-component)

All labels are EN in the rendered report (the report renderer is English-only; the page chrome is
bilingual). Components map 1:1 to preview classes — listed in C.4.

**Page 1 — Cover & Rationale**
- **Letterhead** — TIS cube + Innovue logos · meta line `Brief report · Issued 2026-05-06`.
- **Title bar** — `titleLong` + subtitle `EP3821456 · AIChip Semiconductor GmbH`.
- **Seal (`r-seal` tier=c)** — PSS badge `PSS 28.42`; large letterform **C**; tier label `143 / 183 · Top 78.2%`.
- **Issuer grid (6 cells)** — Status `Active` (pulsing green pill) · Filing jurisdiction `EP` · Owner
  `AIChip Semiconductor GmbH` · Family `EP · US · CN` · IPC `G06N 3/063` · IPC category
  `Neural-network hardware accelerator` · Filed `2019-02-11` · Granted `2022-06-15` · Claims
  `22 (3 indep · 19 dep)` · Remaining life `~13 yrs · until 2039-02-11`.
- **Metric strip (3)** — (1) Cohort-percentile arc `21.8%` + sub `183-patent ai accelerator hardware
  pool`; (2) Rank histogram `143 / 183` + sub `Re-ranked weekly as cohort updates`; (3) PSS meter
  `28.42`, tick at 50, scale 0/50/100 + sub `Composite of 8 pillars · 50 indicators`.
- **Cohort meta (5)** — Indicators graded `50 / 50` · Cohort number `G06N` · Cohort name
  `AI accelerator hardware` · Cohort size `183 patents` · Family jurisdictions `EP · US · CN`.
- **Abstract** — eyebrow `Summary`; body (verbatim): *"A **weight-compression scheme** for
  neural-network inference accelerators that combines block-sparse quantisation with index-stream
  encoding, reducing on-chip SRAM footprint at the cost of decoder latency. Targets edge-inference
  SoCs where memory bandwidth, not compute, is the bottleneck."*
- **Rating Rationale (`r-section`)** — verbatim: *"Below median at the 22nd percentile. The score is
  **broadly weak across all eight pillars** — no single anchor pulls the rating up. **Market Coverage
  (P4 · 22.80)** and **Licensing Potential (P7 · 24.60)** are the deepest sensitivities; the
  three-jurisdiction footprint and the easy-design-around posture together cap the asset's strategic
  value. The patent reads as a **general-defense filing** — useful for a freedom-to-operate narrative
  around block-sparse weight encoding, not an anchor for an offensive licensing thesis."* + link
  `How is this calculated?` → methodology overview.

**Page 2 — Pillars & Indicators**
- **Part cover** — H2 `Pillars & Indicators` · subtitle `Eight pillars · 50 indicators graded — how
  the patent strength score is decomposed.`
- **Radar (`r-radar-card`)** — 8-axis, rings 25/50/75/100. AIChip pillar scores (P1→P8):
  **25.40 · 34.20 · 32.10 · 22.80 · 30.90 · 26.50 · 24.60 · 31.40** (all low-band — a small tight
  polygon, the visual signature of a weak asset).
- **Pillar table (`r-factor-table`)** — rows from the scores above; columns Pillar · Score ·
  Profile-vs-cohort-median bar · Read. All eight read **Sensitivity** (band `l`) except P2 `34.20`
  (`neutral`). Bar colour = orange (low band). Pillar comments (verbatim from preview):
  P1 "Few forward citations; technology overtaken by transformers." · P2 "Small family; thin
  continuation pipeline." · P3 "Narrow technical claim; superseded by quantisation advances." ·
  P4 "EP·US·CN only; no Asia-Pacific manufacturing markets." · P5 "Claim hierarchy thin; rigid
  dependent structure." · P6 "Peripheral position in AI hardware citation graph." · P7 "Design-around
  easy; multiple competing compression schemes." · P8 "Citation slope negative as field shifts to
  transformer accelerators."
- **Factor legend** — `≥ 70 · Top quartile` / `35–70 · Mid band` / `< 35 · Below median` / `Cohort median (50)`.
- **Pillar Deep Dive (`r-deepdive`)** — 8 tabs (P1–P8); each panel = indicator table (Code ·
  Indicator · Value · Percentile · Weight) using the §B.5 indicator names + weights, with per-pillar
  values synthesised consistent with the pillar score, plus a one-line note. *(Build note: the
  preview generates these deterministically from the pillar score; reproduce that, or hand-fix the
  P1/P4 indicators to match the drivers/sensitivities lists below so the two pages don't contradict.)*
- **Disclosures (`r-disclosures`)** — three paragraphs, verbatim from preview (see C.5 for the
  170M→180M and 34/16 reconciliation that must be applied here).

### C.3 Pro sample — adds Page 3 (Risk & Action)

Identical pages 1–2, then:
- **Part cover** — H2 `Risk & Action` · subtitle `What anchors the rating, what could move it under
  stress, and where to focus next.`
- **Key Drivers / Sensitivities (`r-drivers-grid`)** — two `r-driver-card`s.
  - *Key Rating Drivers* (tag `Top 10 positive`): P2.3 Independent claim count 58.4% · P5.1 Claim
    clarity (NLP) 51.2% · P2.5 Years remaining 48.7% · P1.1 Forward citations 42.0% · P3.4
    Specification depth 38.5% · P2.7 Continuation / division 36.2% · P5.2 Specification support (NLP)
    34.0% · P1.6 Backward citations 32.4% · P2.6 Maintenance fee status 30.8% · P5.8 Specification
    quality composite 28.5%.
  - *Key Rating Sensitivities* (tag `Top 10 negative`): P8.2 Citation-trend slope 8.5% · P4.5
    Emerging-market footprint 10.2% · P3.2 Tech convergence index 12.8% · P7.2 Design-around
    difficulty 13.5% · P6.1 PageRank centrality 14.0% · P8.5 Future application potential 15.6% ·
    P4.1 Family geographic breadth 16.2% · P7.6 Choke-point position 18.4% · P1.2 Citation velocity
    19.7% · P3.1 IPC breadth 22.0%.
- **Scenario Sensitivity (`r-scenario-band-wrap` + `r-stress-table`)** — eyebrow `PSS spread across 5
  scenarios`; summary `6.75 pt range · 24.10 – 30.85 · anchor at 28.42`; band chart anchor 28.42.
  Five rows (Scenario · Weight stack · PSS · Cohort % · Rank · Verdict):
  - Licensing — Original · Balanced baseline · 28.42 · 21.8% · #143 / 183 · **Anchor**
  - Licensing — Expert · P1↑ · P7↑ · P4↑ · 25.30 · 19.2% · #148 / 183 · Softened
  - Litigation strength · P2↑ · P5↑ · P7↑ · 29.80 · 23.6% · #140 / 183 · Affirmed
  - Investment / M&A · P1↑ · P6↑ · P8↑ · 24.10 · 18.4% · #149 / 183 · Softened
  - Tech layout · P3↑ · P6↑ · P8↑ · 30.85 · 22.6% · #141 / 183 · Highest read
  - Takeaway (verbatim): *"All five scenarios land between **18.4–23.6%** — the rating is robust to
    perspective but stays firmly in Tier-C territory. **Tech layout (P3↑ P6↑ P8↑)** gives the highest
    read at 30.85, still below median; **Investment / M&A** is the softest at 24.10. The asset reads
    consistently as general-defense IP across every decision lens."*
- **Action Considerations (`r-actions-grid`)** — *Recommended Actions* (4) and *Watch Items* (4),
  verbatim from `actions.supportive` / `actions.watch` in the data block (FTO baseline, defensive
  ballast, transformer-era continuation, bundle; citation-slope cleanup, design-around weakness,
  emerging-market gap, future-potential warning).
- **Disclosures** — same three paragraphs.

> The summary range readout in the preview source reads "2.75 pt range" but 30.85 − 24.10 = **6.75**.
> Use **6.75** (the preview's own bug) — logged in §D.4.

### C.4 Component inventory (lift markup from the preview)

| Component | Preview class | Brief | Pro |
| --- | --- | --- | --- |
| Letterhead / colophon | `r-letterhead` | ✓ | ✓ |
| SABCD seal | `r-seal` | ✓ | ✓ |
| Issuer grid | `r-issuer` | ✓ | ✓ |
| Metric strip (arc / histogram / meter) | `r-metric-arc`, `r-metric-hist`, `r-metric-meter` | ✓ | ✓ |
| Cohort meta | `r-cohort-meta` | ✓ | ✓ |
| Abstract + rationale | `r-section` | ✓ | ✓ |
| Pillar radar | `r-radar-card` | ✓ | ✓ |
| Pillar table | `r-factor-table` | ✓ | ✓ |
| Factor legend | `r-factor-legend` | ✓ | ✓ |
| Pillar deep-dive tabs | `r-deepdive` | ✓ | ✓ |
| Drivers / sensitivities | `r-drivers-grid`, `r-driver-card` | — | ✓ |
| Scenario band + stress table | `r-scenario-band-wrap`, `r-stress-table`, `r-takeaway` | — | ✓ |
| Action considerations | `r-actions-grid`, `r-action-card` | — | ✓ |
| Disclosures | `r-disclosures` | ✓ | ✓ |
| Pro-tease (Brief-only upsell) | `brief-pro-tease` | optional* | — |

\* If the page renders **full** Brief *and* full Pro side by side, the Brief's `brief-pro-tease`
upsell block (with "+15 points · NT$1,500" pricing) is redundant and should be **dropped** here — the
visitor already sees the Pro content. Keep it only if Brief and Pro are shown on separate routes.

### C.5 Closing CTA (page chrome, below the report)

| Slot | EN | 中文 |
| --- | --- | --- |
| H2 | This is what lands in your inbox. | 這就是寄到你信箱的報告。 |
| Body | Every Signal report is a standardised SABCD grade you can attach to an IC memo, a data room, or an LP quarterly. | 每一份 Signal 報告都是標準化的 SABCD 評級，可直接附入 IC memo、Data Room 或 LP 季報。 |
| Primary CTA | See pricing → | 查看方案 → |
| Secondary CTA | Talk to sales | 聯絡業務 |

Primary → `/product/signal/#pricing`; secondary → `/product/signal/#contact`. Keep the "Back to
Signal / 回到 Signal" button in the hero.

---

## D. Reconciliation & open items (resolve before/while building)

1. **Indicator-type count (D.1).** Preview disclosure says "**34** structured + 16 NLP"; the deck
   appendix tallies **33 structured + 16 NLP + 1 derived = 50** (P7.6 is derived; P3.7 + P5.7 are
   optional; P2.4 is a disqualifying screen). The two also disagree on whether P5.7 counts as NLP.
   **Decision needed:** pick one canonical split and use it on *both* the methodology "split" line
   (§B.3) and the rendered disclosure (§C.2/C.3). Recommend stating "**50 indicators — 33 from
   structured data, 16 graded by NLP, 1 derived**" and dropping the "34" wording.
2. **Innovue scale number (D.2 / number).** Preview disclosure still says "Innovue **170M**-patent
   index"; the live site + deck + this PRD use **180M / 1.8 億**, "3rd-largest globally."
   **When rendering §C disclosures, change 170M → 180M.** (Brand-voice.md still says 170M and is
   pending its own sync — out of scope here, but the page must ship 180M.)
3. **AIChip pool size mismatch (D.3).** methodology.html company card = 67-patent pool / 19 graded;
   sample-report patent = 183-patent G06N pool. Align to **183 / G06N** on both, or footnote the
   distinction (portfolio cohort vs. single-patent cohort).
4. **SABCD band cut-points (D.4).** Preview `TIER_INFO` gives ≥P85 / P65–84 / P35–64 / P15–34 / <P15.
   Confirm these are the real, sign-off-ready thresholds before printing them as hard numbers on a
   public methodology page (the deck only published economic multipliers, not band edges).
5. **Scenario range readout bug (D.5).** Preview prints "2.75 pt range" for 24.10–30.85; correct is
   **6.75**. Use 6.75 in the rendered sample and (separately) flag the preview for a fix upstream.
6. **English-only report body.** The rendered report (seal, tables, rationale) is English-only in the
   preview; only the page chrome is bilingual. Confirm that's acceptable for a zh-TW visitor, or
   decide whether report labels need a zh pass (larger effort — would also touch the preview).

---

## E. Build sequencing (downstream of this PRD)

1. `methodology.html` — sections B.1→B.7, keep B.8. Highest-value: it's the credibility layer and the
   missing destination for the index cross-link.
2. `sample-report.html` — port the preview report renderer for `aichip-c`, render Brief + Pro, apply
   the §D reconciliations, add C.1 intro + C.5 CTA.
3. `index.html` — apply the two A.3 cross-link fixes.

Each is a separate page edit; per `website/CLAUDE.md`, pushing `main` deploys to production — treat
each as a live release and log deploy-relevant changes in `website/CHANGELOG.md`.
