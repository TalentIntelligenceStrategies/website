# TIS Website Copy Audit — v2

A clean-start, team-shareable copy review across all six in-scope TIS website pages. Replaces `copy-audit-v1.md` (kept on disk for history). Walks the site top-to-bottom, page by page, with one **Element** label per row so anyone can scan a section and immediately see which row is "Hero Text" vs "CTA (left)" without reading the copy.

The **ZH** column is the canonical column — copy is authored in Chinese first per `brand-voice.md` §6 and `chinese-copy-direction.md`. The **EN** column reflects the live English string on the page. **Literal EN** is a literal back-translation of the ZH cell, used as a translation-fidelity check: when EN diverges from Literal EN, the divergence is intentional or a flag.

---

## Legend

### Status (ZH Status & EN Status columns)

| Symbol | Meaning |
|:---:|---|
| ⚪ | Draft — author's first pass, not yet reviewed |
| 🟡 | In Review — submitted for review, awaiting verdict |
| 🟢 | Approved — reviewer signed off, locked unless re-opened |
| 🔴 | Revise — reviewer flagged for changes |
| ⏸ | Hold — parked, decision deferred (note why in a sibling row or PR) |

### Shipped (Shipped column)

| Symbol | Meaning |
|:---:|---|
| ⬜ | Not shipped — copy isn't in production HTML yet |
| 🟡 | Edited locally — change made in local HTML, not yet pushed |
| 🟢 | Live in production — commit pushed to `main` and Pages has rebuilt |

`🟢` is reserved for live-on-tisglobalinc.com — `git push origin main` plus GitHub Pages rebuild. A local HTML edit stays at `🟡` until the push lands.

### Absence markers (ZH cell)

- `(absent)` — element has no `data-zh` attribute
- `(empty)` — element has `data-zh=""` (intentionally blank, e.g. eyebrow cleared in ZH only)

### Rich-text conventions

- `**bold**` → `<strong>` in HTML
- `*italic*` → `<em>` in HTML
- `↵` → `<br>` inside a single cell (forced line break)

### Row-merging conventions

When one HTML element splits across two `<span>`s separated by `<br>`, render them as a single row with ` / ` between fragments. When one fragment is `<em>`-italicized, mark it `*like this*`. Example: `出口 / *保專利險。*` → `<span>出口</span> <em>保專利險。</em>` on two lines.

### Change history (strikethrough)

When copy changes, preserve the prior version inline: `~~old text~~<br>new text`. If a prior edit skipped this convention, backfill from `git log -p`.

### Canonical & pointer pattern

The top nav, mobile drawer, search modal, partner strip, and full footer are **byte-identical** across 3–6 pages. To avoid editing the same row in multiple places, the **canonical table lives once under Homepage**; every other page's matching section is a pointer stub:

> **Canonical content lives at [Homepage › Top Nav](#homepage--top-nav).** Edits to any row must land in all N HTML files. Do not edit copy in this section — edit in the canonical section.

---

## Scope

### In-scope (6 pages)

| # | Page | File |
|---|---|---|
| 1 | Homepage | `website/index.html` |
| 2 | Licensing Platform | `website/product/licensing/index.html` |
| 3 | Licensing Lobby (auth) | `website/product/licensing/lobby.html` |
| 4 | Signal Platform | `website/product/signal/index.html` |
| 5 | Signal Lobby (auth) | `website/product/signal/lobby.html` |

### Out-of-scope — not yet built

The following pages exist as link targets but are **not yet built**. When they're built, source their copy from **already-approved blocks** on the in-scope pages (Hero, CTA Band, Footer, etc.) rather than authoring fresh ZH/EN strings:

- `website/product/licensing/badge.html`
- `website/product/signal/methodology.html`
- `website/product/signal/sample-report.html`

### Skipped — filler / placeholder content

These sections render demo content (invented patent IDs, placeholder report titles, placeholder press dates, board-member initials). No copy review is needed; capture each as a skip note with no table:

- Homepage › Reports Section (4 rail items)
- Homepage › Press Section (3 cards)
- Homepage › About › Board Roster (5 members — placeholder initials)
- Homepage › Patent Inventory Teaser › Ticker Cards (data-driven patent IDs)
- Licensing Index › Migrated Pillar Showcase › Browser-frame tile grid (data-driven patent IDs)
- Licensing Index › Patent Inventory Teaser › Ticker Cards
- Patent-Preview › Patent Grid + Table + Pagination (data-driven, EN-only)
- Patent-Preview › Shortlist Sheet body + Batch Action Bar + Detail Modal body (mostly system labels)
- Signal Index › Migrated Pillar Showcase › Report-card stack (data-driven PSS scores)
- Signal Index › Credits Reference Table › numeric values (only header labels are audit-worthy)

When real content lands, replace the placeholder HTML and expand each header into the standard 7-column audit format.

---

## How to use this doc

1. **Author** writes a new row at `⚪ Draft`.
2. **Reviewer** bumps to `🟡 In Review` while inspecting, then to `🟢 Approved` or `🔴 Revise`.
3. After local HTML edit lands, bump **Shipped** to `🟡`.
4. After `git push origin main` and Pages rebuild, bump **Shipped** to `🟢`.
5. When changing approved copy, preserve history inline: `~~old~~<br>new`.

The 7-column table format throughout this doc:

```
| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
```

---

## Homepage  (`website/index.html`)

### Homepage > Top Nav

**Canonical for all 5 pages.** Byte-identical block appears in `index.html`, `product/licensing/index.html`, `product/signal/index.html`. Lobby pages (`*/lobby.html`) use a stripped variant (logo + lang only) — covered in their own sections. Every edit to a row below must land in all 3 full-nav files.

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Nav Trigger (Products dropdown) | 產品 | ⚪ | Product | Products | ⚪ | 🟢 |
| Dropdown Card Title (Licensing) | 泰然專利防護網 | ⚪ | TIS Patent Shield Net | Licensing Platform | ⚪ | 🟢 |
| Dropdown Card Desc (Licensing) | 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | ⚪ | Curated, fitted patent-protection bundles — patent insurance for export goods, fast to activate, saves time, effort, and budget. | Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | ⚪ | 🟢 |
| Dropdown Card Title (Signal) | 泰然專利強度評級系統 | ⚪ | TIS Patent Strength Rating System | Signal Platform | ⚪ | 🟢 |
| Dropdown Card Desc (Signal) | 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 | ⚪ | Compares same-industry patents against 50 indicators that cover both quantity and quality — rigorous, evidence-based patent rating. | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | ⚪ | 🟢 |
| Nav Link (Reports) | 報告 | ⚪ | Report | Reports | ⚪ | 🟢 |
| Nav Link (Press) | 新聞 | ⚪ | News | Press | ⚪ | 🟢 |
| Nav Link (About) | 關於 | ⚪ | About | About | ⚪ | 🟢 |
| CTA primary (Contact sales) | 聯絡業務 | ⚪ | Contact sales | Contact sales | ⚪ | 🟢 |
| Language Option (EN) | (absent) | — | — | English | ⚪ | 🟢 |
| Language Option (ZH) | (absent) | — | — | 中文 | ⚪ | 🟢 |

### Homepage > Mobile Drawer

**Canonical for all 3 full-nav pages** (homepage + licensing index + signal index). Mobile drawer markup is duplicated alongside the desktop top nav on each page. Lobby pages have no mobile drawer.

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Mobile Nav Trigger (Products) | 產品 | ⚪ | Product | Products | ⚪ | 🟢 |
| Mobile Sub Title (Licensing) | 泰然專利防護網 | ⚪ | TIS Patent Shield Net | Licensing Platform | ⚪ | 🟢 |
| Mobile Sub Desc (Licensing) | 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | ⚪ | (same as desktop dropdown) | Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | ⚪ | 🟢 |
| Mobile Sub Title (Signal) | 泰然專利強度評級系統 | ⚪ | TIS Patent Strength Rating System | Signal Platform | ⚪ | 🟢 |
| Mobile Sub Desc (Signal) | 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 | ⚪ | (same as desktop dropdown) | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | ⚪ | 🟢 |
| Mobile Nav Link (Reports) | 報告 | ⚪ | Report | Reports | ⚪ | 🟢 |
| Mobile Nav Link (Press) | 新聞 | ⚪ | News | Press | ⚪ | 🟢 |
| Mobile Nav Link (About) | 關於 | ⚪ | About | About | ⚪ | 🟢 |
| CTA primary (Contact sales) | 聯絡業務 | ⚪ | Contact sales | Contact sales | ⚪ | 🟢 |

### Homepage > Search Modal

**Canonical for all 4 full-nav pages.** Byte-identical search-modal markup duplicated across homepage + 3 product pages.

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Field Placeholder (search input) | 搜尋報告、新聞與頁面… | ⚪ | Search reports, news, and pages… | Search reports, press, and pages… | ⚪ | 🟢 |
| Section Heading (Jump to) | 跳至 | ⚪ | Jump to | Jump to | ⚪ | 🟢 |
| Link Label (Products) | 產品 | ⚪ | Product | Products | ⚪ | 🟢 |
| Meta Label (Products) | 頁面 | ⚪ | Page | Page | ⚪ | 🟢 |
| Link Label (Reports) | 報告 | ⚪ | Report | Reports | ⚪ | 🟢 |
| Meta Label (Reports) | 頁面 | ⚪ | Page | Page | ⚪ | 🟢 |
| Link Label (Press) | 新聞 | ⚪ | News | Press | ⚪ | 🟢 |
| Meta Label (Press) | 頁面 | ⚪ | Page | Page | ⚪ | 🟢 |
| Link Label (About) | 關於 | ⚪ | About | About | ⚪ | 🟢 |
| Meta Label (About) | 頁面 | ⚪ | Page | Page | ⚪ | 🟢 |
| Link Label (Contact) | 聯絡 | ⚪ | Contact | Contact | ⚪ | 🟢 |
| Meta Label (Contact) | 頁面 | ⚪ | Page | Page | ⚪ | 🟢 |

### Homepage > IP Intelligence Popup

**Canonical for all 4 full-nav pages.** Trigger: 45s OR 50% scroll, whichever first; 30-day localStorage suppression.

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 重要的專利動態。 | ⚪ | Important patent moves. | The patent moves that matter. | ⚪ | 🟢 |
| Body Para | 一年四份簡報。精選非匯總。 | ⚪ | Four briefs a year. Curated, not aggregated. | Four briefs a year. Curated, not aggregated. | ⚪ | 🟢 |
| Field Label (Role) | 角色 | ⚪ | Role | Role | ⚪ | 🟢 |
| Field Label (Role, optional) | · 選填 | ⚪ | · optional | · optional | ⚪ | 🟢 |
| Field Placeholder (Role) | 請選擇… | ⚪ | Please select… | Select… | ⚪ | 🟢 |
| Dropdown Option (Role · Founder) | 創辦人 / 高階主管 | ⚪ | Founder / C-suite | Founder / C-suite | ⚪ | 🟢 |
| Dropdown Option (Role · Legal) | 智財 / 法務 | ⚪ | IP / Legal | IP / Legal | ⚪ | 🟢 |
| Dropdown Option (Role · R&D) | 研發 / 工程 | ⚪ | R&D / Engineering | R&D / Engineering | ⚪ | 🟢 |
| Dropdown Option (Role · Investor) | 投資人 / 分析師 | ⚪ | Investor / Analyst | Investor / Analyst | ⚪ | 🟢 |
| Dropdown Option (Role · Other) | 其他 | ⚪ | Other | Other | ⚪ | 🟢 |
| Field Label (Industry) | 產業 | ⚪ | Industry | Industry | ⚪ | 🟢 |
| Field Label (Industry, optional) | · 選填 | ⚪ | · optional | · optional | ⚪ | 🟢 |
| Field Placeholder (Industry) | 所有產業 | ⚪ | All industries | All industries | ⚪ | 🟢 |
| Dropdown Option (Industry · Electronics) | 電子 | ⚪ | Electronics | Electronics | ⚪ | 🟢 |
| Dropdown Option (Industry · Mechanical) | 機械 | ⚪ | Mechanical | Mechanical | ⚪ | 🟢 |
| Dropdown Option (Industry · Green) | 綠能 | ⚪ | Green Energy | Green Energy | ⚪ | 🟢 |
| Dropdown Option (Industry · Biomedical) | 生醫 | ⚪ | Biomedical | Biomedical | ⚪ | 🟢 |
| Dropdown Option (Industry · Materials) | 材料 | ⚪ | Materials | Materials | ⚪ | 🟢 |
| Field Label (Work email) | 工作信箱 | ⚪ | Work mailbox | Work email | ⚪ | 🟢 |
| CTA primary (Get the next brief) | 訂閱下一份簡報 | ⚪ | Subscribe to the next brief | Get the next brief | ⚪ | 🟢 |
| Disclaimer (cadence) | 每季一封信。 | ⚪ | One letter per quarter. | One email per quarter. | ⚪ | 🟢 |
| Link Label (Privacy) | 隱私政策 | ⚪ | Privacy Policy | Privacy | ⚪ | 🟢 |

### Homepage > Announcement Banner

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Body Para (message) | 即將推出：泰然專利防護網 — 30 件專利組合，涵蓋美國與台灣 | ⚪ | Coming soon: TIS Patent Shield Net — 30-patent bundles covering US and Taiwan | Coming soon: TIS Licensing Platform — 30-patent bundles across US and Taiwan | ⚪ | 🟢 |
| Link Label | 探索產品 → | ⚪ | Explore products → | Explore industries → | ⚪ | 🟢 |

### Homepage > Hero Carousel · Slide 1 (Strategic Positioning)

ZH copy per `chinese-copy-direction.md` slide 7 — Persona A (王董 · Export SME) · insurance metaphor.

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Eyebrow | (empty) | — | — | An IP intelligence consultancy | ⚪ | 🟢 |
| Hero Text | 出國保旅平險。 / *出口 / 保專利險。* | ⚪ | Going abroad? Get travel insurance. / *Exporting? / Get patent insurance.* | Buy travel insurance to travel. / Buy patent insurance / *to export.* | ⚪ | 🟢 |
| Hero Subtext (line 1) | 律師費 500 萬 + 整批退貨 + 三倍懲罰，水險都買，專利險怎麼能不買？ | ⚪ | NT$5M in legal fees + full-shipment returns + treble damages — you buy ocean insurance, how can you not buy patent insurance? | Skip patent insurance, pay on three fronts: NT$5M legal fees, full-shipment returns, and treble damages. | ⚪ | 🟢 |
| Hero Subtext (line 2) | 月租不到 1 萬，30 件大廠專利授權，立即生效。 | ⚪ | Under NT$10K/month rent — 30 institutional patents licensed, effective immediately. | Under NT$10K/month. 30 institutional patents. Live immediately. | ⚪ | 🟢 |
| CTA primary | 試跑專利包 | ⚪ | Test-drive the patent bundle | Build a bundle | ⚪ | 🟢 |
| CTA secondary | 專利標章加持用法 | ⚪ | Patent-badge advantage usage | About the badge | ⚪ | 🟢 |

### Homepage > Hero Carousel · Slide 2 (Licensing)

ZH copy per `chinese-copy-direction.md` slide 9 — Persona C (美玉姐 · Grant/Tender SME) · "adds points to your grant application".

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Eyebrow | (empty) | — | — | Licensing Platform | ⚪ | 🟢 |
| Hero Text | 泰然專利包 / 為你的 / *補助申請加分。* | ⚪ | TIS patent bundle / for your / *grant application — extra points.* | License 30 patents. / The edge↵ on your / *grant application.* | ⚪ | 🟢 |
| Hero Subtext (line 1) | 評審認可的是創智、資策會、陽明交大的優質保證。 | ⚪ | Reviewers recognize the quality guarantee of ITRI, III, and NYCU. | Sourced from ITRI, III, NYCU — patents every grant reviewer knows. | ⚪ | 🟢 |
| Hero Subtext (line 2) | 30 件合法授權專利以你公司名義可用，月租不到 1 萬。 | ⚪ | 30 legally licensed patents usable in your company's name, under NT$10K/month rent. | 30 patents licensed in your company's name. Under NT$10K/month. | ⚪ | 🟢 |
| CTA primary | 試跑專利包 | ⚪ | Test-drive the patent bundle | Build a bundle | ⚪ | 🟢 |
| CTA secondary | 了解授權方案 | ⚪ | Learn licensing plans | See licensing plans | ⚪ | 🟢 |

### Homepage > Hero Carousel · Slide 3 (Signal)

ZH copy per `chinese-copy-direction.md` slide 8 — Persona B (Wang Partner · VC IPDD) · "look at the ranking and you'll know".

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Eyebrow | (empty) | — | — | Signal Platform | ⚪ | 🟢 |
| Hero Text | 技術含金量高不高， / 看 / *排名就知道。* | ⚪ | Is the technical value high? / Look at / *the ranking and you'll know.* | How strong is the patent? / *the ranking settles it.* | ⚪ | 🟢 |
| Hero Subtext (line 1) | SABCD 五級評分 + 同產業 cohort 排名。 | ⚪ | SABCD five-tier scoring + same-industry cohort ranking. | SABCD-graded, ranked against same-industry peers. | ⚪ | 🟢 |
| Hero Subtext (line 2) | 一份可直接附入 IC memo 或 LP 季報的標準化報告。 | ⚪ | A standardized report that drops straight into IC memos or LP quarterly letters. | Drops into IC memos and LP letters as-is. | ⚪ | 🟢 |
| CTA primary | 免費預覽報告樣本 | ⚪ | Free preview of a sample report | See a sample report | ⚪ | 🟢 |
| CTA secondary | 專利評級怎麼算 | ⚪ | How is patent rating calculated | See the methodology | ⚪ | 🟢 |

### Homepage > Partner Strip

**Canonical for 4 pages**: homepage + both lobbies + (inline variants on licensing index + signal index). The label below is identical across all locations.

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Eyebrow (Partner Strip label) | 泰然策略合作夥伴 | ⚪ | TIS Strategic Partners | TIS Strategic Partners | ⚪ | 🟢 |

### Homepage > Patent Inventory Teaser

The eyebrow + search/filter labels are byte-identical with Licensing Index's flat-variant teaser. **Canonical here.**

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Eyebrow | **泰然專利庫存** — 1,000+ 件專利，涵蓋美國與台灣 — 依產業、地區、SABCD 等級篩選 | ⚪ | **TIS Patent Inventory** — 1,000+ patents covering US and Taiwan — filter by industry, region, and SABCD tier | **TIS Patent Inventory** — 1,000+ patents across U.S. and Taiwan — filter by industry, jurisdiction, and SABCD tier | ⚪ | 🟢 |
| Field Placeholder (search) | 依專利編號、名稱、權利人、IPC 搜尋… | ⚪ | Search by patent number, name, rights-holder, IPC… | Search by ID, title, owner, IPC… | ⚪ | 🟢 |
| Field Label (Industry filter) | 產業： | ⚪ | Industry: | Industry: | ⚪ | 🟢 |
| Dropdown Option (Industry · All) | 所有產業 | ⚪ | All industries | All industries | ⚪ | 🟢 |
| Dropdown Option (Industry · Chip) | 晶片與半導體 | ⚪ | Chip & semiconductor | Chip & semiconductor | ⚪ | 🟢 |
| Dropdown Option (Industry · Integrated) | 整合應用 | ⚪ | Integrated applications | Integrated applications | ⚪ | 🟢 |
| Dropdown Option (Industry · Net-zero) | 淨零與碳 | ⚪ | Net-zero & carbon | Net-zero & carbon | ⚪ | 🟢 |
| Dropdown Option (Industry · Multimedia) | 多媒體與顯示 | ⚪ | Multimedia & display | Multimedia & display | ⚪ | 🟢 |
| Dropdown Option (Industry · Networking) | 網路與通訊 | ⚪ | Networking & comms | Networking & comms | ⚪ | 🟢 |
| Dropdown Option (Industry · Computing) | 運算與 AI | ⚪ | Computing & AI | Computing & AI | ⚪ | 🟢 |
| Field Label (Jurisdiction filter) | 地區： | ⚪ | Region: | Jurisdiction: | ⚪ | 🟢 |
| Dropdown Option (Jurisdiction · All) | 所有地區 | ⚪ | All regions | All jurisdictions | ⚪ | 🟢 |
| Dropdown Option (Jurisdiction · US) | (absent) | — | — | United States | ⚪ | 🟢 |
| Dropdown Option (Jurisdiction · TW) | 台灣 | ⚪ | Taiwan | Taiwan | ⚪ | 🟢 |
| Field Label (Tier filter) | 等級： | ⚪ | Tier: | Tier: | ⚪ | 🟢 |
| Dropdown Option (Tier · All) | 所有等級 | ⚪ | All tiers | All tiers | ⚪ | 🟢 |
| Dropdown Option (Tier S/A/B/C/D) | (absent ×5) | — | — | Tier S / Tier A / Tier B / Tier C / Tier D | ⚪ | 🟢 |
| Button Label (Clear) | 清除 | ⚪ | Clear | Clear | ⚪ | 🟢 |

**Filler note.** The three ticker rows below the search bar are populated by JS with placeholder patent cards (system-generated IDs, titles, owners). No copy review — when real data lands, expand into a separate audit section.

### Homepage > Stats Counter

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Eyebrow (Stat 1) | 專屬資料庫 | ⚪ | Proprietary database | Proprietary database | ⚪ | 🟢 |
| Body Para (Stat 1) | Innovue 專屬資料庫所收錄的專利數 - **每日**與官方同步更新資料，全球第三大完整專利資料庫，檢索不遺漏任何蛛絲馬跡。 | ⚪ | Patents in Innovue's proprietary database — synced **daily** with official sources; the world's 3rd-largest complete patent database — searches miss no trace. | patents in Innovue's proprietary database — synced **daily** with official patent offices. World's 3rd-largest patent index — searches that miss no trace. | ⚪ | 🟢 |
| Eyebrow (Stat 2) | (absent) | — | — | Patent Strength Score — PSS | ⚪ | 🟢 |
| Body Para (Stat 2) | 項指標構成每個 PSS 評級 — 八大加權支柱，0–100 評分，對標同業基準。 | ⚪ | indicators making up each PSS rating — 8 weighted pillars, 0–100 score, benchmarked against same-industry peers. | indicators behind every PSS grade — 8 weighted pillars, scored 0–100, calibrated against same-industry peers. | ⚪ | 🟢 |
| Eyebrow (Stat 3) | 司法管轄區覆蓋 | ⚪ | Jurisdiction coverage | Jurisdiction coverage | ⚪ | 🟢 |
| Body Para (Stat 3) | 專利資料庫囊括全球超過 100 個國家，包含美、歐、日、台、韓，全球專利佈局的最佳夥伴。 | ⚪ | The patent database covers over 100 countries globally — including US, EU, Japan, Taiwan, Korea — the best partner for global patent positioning. | jurisdictions in the index — US, EU, Japan, Taiwan, Korea, and more. The foundation of global patent positioning. | ⚪ | 🟢 |

### Homepage > Reports Section

> **Skipped — filler.** The featured report and 4 rail items are placeholder copy invented to illustrate the section. No copy edits needed. When real reports publish, replace the HTML and expand this header into the standard 7-column audit format. The two **section-header** strings below are real and are audited:

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Eyebrow | 近期 | ⚪ | Recent | Recent | ⚪ | 🟢 |
| Section Heading | 最新報告 | ⚪ | Latest reports | Latest reports | ⚪ | 🟢 |
| Section Heading (rail) | 更多報告 | ⚪ | More reports | More reports | ⚪ | 🟢 |
| Link Label (See all) | 查看全部 | ⚪ | See all | See all | ⚪ | 🟢 |

### Homepage > Press Section

> **Skipped — filler.** The 3 press cards are placeholder copy. Real article titles + dates TBD. The two **section-header** strings below are real and are audited:

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Eyebrow | 媒體報導 | ⚪ | Media coverage | In the press | ⚪ | 🟢 |
| Section Heading | 新聞稿 | ⚪ | Press releases | Press releases | ⚪ | 🟢 |
| Link Label (See all press) | 查看全部新聞 | ⚪ | See all news | See all press | ⚪ | 🟢 |

### Homepage > About Section

> **Board roster: filler.** The 5 board members render placeholder initials (EH, RW, MP, JH, MC); real headshots + names TBD. Only the section H2 + 3 stance cards + role label below are audited.

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading (line 1) | 一間 IP 情報顧問公司， | ⚪ | An IP intelligence consultancy, | An IP intelligence consultancy, | ⚪ | 🟢 |
| Section Heading (line 2) | 將專利地形轉化為市場佈局。 | ⚪ | Turning the patent landscape into market positioning. | turning the patent landscape into market position. | ⚪ | 🟢 |
| Meta Label (Pos 01) | 01 / 立場 | ⚪ | 01 / Stance | 01 / Stance | ⚪ | 🟢 |
| Card Title (Pos 01) | 主動佈局，而非被動防禦。 | ⚪ | Active positioning, not passive defense. | Active offense, not passive defense. | ⚪ | 🟢 |
| Card Body (Pos 01) | 我們的客戶要進入的市場，專利地形早已被人測繪——而且通常不利於他們。我們把那片地形變成策略。 | ⚪ | The markets our clients enter — the patent terrain is already mapped, and usually unfavorable to them. We turn that terrain into strategy. | Our clients sell into markets where the patent terrain is already mapped — often against them. We turn that terrain into strategy. | ⚪ | 🟢 |
| Meta Label (Pos 02) | 02 / 資料來源 | ⚪ | 02 / Source | 02 / Source | ⚪ | 🟢 |
| Card Title (Pos 02) | 紮根於 1.8 億件專利。 | ⚪ | Grounded in 180M patents. | Grounded in 180M patents. | ⚪ | 🟢 |
| Card Body (Pos 02) | 營運全球第三大的專利索引——專屬、持續更新，且任何標準 AI 工具都觸及不到。 | ⚪ | Operating the world's 3rd-largest patent index — proprietary, continuously updated, and unreachable by any standard AI tool. | maintains the world's 3rd-largest patent index — proprietary, continuously refreshed, and unreachable by any standard AI tool. | ⚪ | 🟢 |
| Meta Label (Pos 03) | 03 / 方法 | ⚪ | 03 / Method | 03 / Method | ⚪ | 🟢 |
| Card Title (Pos 03) | 交付成果，而非工具。 | ⚪ | Deliver outcomes, not tools. | Deliverables, not tools. | ⚪ | 🟢 |
| Card Body (Pos 03) | 壓力之下泰然處之，依循證據逐步推進。客戶不必懂專利——那是我們的事。 | ⚪ | Composed under pressure, advancing step-by-step on evidence. Clients don't need to understand patents — that's our job. | Composed under pressure, methodical through evidence. Clients shouldn't need patent expertise — that's what we're for. | ⚪ | 🟢 |
| Section Heading (Board) | 董事會成員 | ⚪ | Board of Directors | Board of Directors | ⚪ | 🟢 |
| Meta Label (Board role · Director) | 董事 | ⚪ | Director | Board Director | ⚪ | 🟢 |
| Meta Label (Board role · Chair) | 董事長 / 董事 | ⚪ | Chairman / Director | Chairman / Board Director | ⚪ | 🟢 |
| Meta Label (Board role · Supervisor) | 監察人 / 董事 | ⚪ | Supervisor / Director | Supervisor / Board Director | ⚪ | 🟢 |

### Homepage > Contact Form

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 與我們聯絡。 | ⚪ | Contact us. | Get in touch. | ⚪ | 🟢 |
| Field Label (Name) | 姓名 | ⚪ | Full Name | Full Name | ⚪ | 🟢 |
| Field Label (Title) | 職稱 | ⚪ | Job Title | Job Title | ⚪ | 🟢 |
| Field Label (Email) | 電子郵件 | ⚪ | Email | Email Address | ⚪ | 🟢 |
| Field Label (Phone) | 電話 | ⚪ | Phone | Phone Number | ⚪ | 🟢 |
| Field Label (Org) | 機構 | ⚪ | Organization | Organization | ⚪ | 🟢 |
| Field Label (Inquiry type) | 諮詢類型 | ⚪ | Inquiry Type | Inquiry Type | ⚪ | 🟢 |
| Field Placeholder (Inquiry trigger) | 請選擇… | ⚪ | Please select… | Select… | ⚪ | 🟢 |
| Dropdown Option (Licensing) | 專利授權 | ⚪ | Patent Licensing | Patent Licensing | ⚪ | 🟢 |
| Dropdown Option (Rating) | 專利評級 | ⚪ | Patent Rating | Patent Rating | ⚪ | 🟢 |
| Dropdown Option (Evaluation report) | 專利評估報告 | ⚪ | Patent Evaluation Report | Patent Evaluation Report | ⚪ | 🟢 |
| Dropdown Option (Industry report) | 產業報告 | ⚪ | Industry Report | Industry Report | ⚪ | 🟢 |
| Dropdown Option (Press) | 媒體採訪 | ⚪ | Media Interview | Media Interview | ⚪ | 🟢 |
| Dropdown Option (Other) | 其他 | ⚪ | Other | Other | ⚪ | 🟢 |
| Field Label (Inquiry) | 您的需求 | ⚪ | Your needs | Your Inquiry | ⚪ | 🟢 |
| Meta Label (Office tz) | 台北 (UTC+8) | ⚪ | Taipei (UTC+8) | Taipei (UTC+8) | ⚪ | 🟢 |
| Meta Label (Office days) | 週一至週五 | ⚪ | Mon–Fri | Mon–Fri | ⚪ | 🟢 |
| Meta Label (Office hours label) | 服務時間 | ⚪ | Office hours | Office hours | ⚪ | 🟢 |
| CTA primary (Submit) | 送出諮詢 | ⚪ | Submit inquiry | Send Inquiry | ⚪ | 🟢 |
| Toast / Success Msg (heading) | 訊息已送出。 | ⚪ | Message sent. | Message sent. | ⚪ | 🟢 |
| Toast / Success Msg (body) | 已收到您的諮詢。我們將於 1–2 個工作天內回覆。 | ⚪ | Your inquiry received. We will reply within 1–2 business days. | Inquiry received. We'll be in touch within 1–2 business days. | ⚪ | 🟢 |

### Homepage > Footer

**Canonical for 3 pages**: homepage + licensing index + signal index. Byte-identical (in-page anchors prefixed with `/` on subpages — copy strings unchanged). Edits to any row must land in all 3 files.

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Footer Heading (Newsletter) | 訂閱最新動態 | ⚪ | Subscribe to latest updates | Get Our Latest News | ⚪ | 🟢 |
| Field Placeholder (Newsletter email) | (absent) | — | — | Your Email | ⚪ | 🟢 |
| Footer Heading (Products col) | 產品 | ⚪ | Product | Products | ⚪ | 🟢 |
| Footer Link (Licensing) | 泰然專利防護網 | ⚪ | TIS Patent Shield Net | Licensing Platform | ⚪ | 🟢 |
| Footer Link (Signal) | 泰然專利強度評級系統 | ⚪ | TIS Patent Strength Rating System | Signal Platform | ⚪ | 🟢 |
| Footer Heading (Company col) | 公司 | ⚪ | Company | Company | ⚪ | 🟢 |
| Footer Link (About) | 關於 | ⚪ | About | About | ⚪ | 🟢 |
| Footer Link (Reports) | 報告 | ⚪ | Report | Reports | ⚪ | 🟢 |
| Footer Link (Press) | 新聞 | ⚪ | News | Press | ⚪ | 🟢 |
| Footer Link (Contact, col link) | 聯絡 | ⚪ | Contact | Contact | ⚪ | 🟢 |
| Footer Heading (Legal col) | 法律 | ⚪ | Legal | Legal | ⚪ | 🟢 |
| Footer Link (Terms) | 服務條款 | ⚪ | Terms of Service | Terms | ⚪ | 🟢 |
| Footer Link (Privacy) | 隱私政策 | ⚪ | Privacy Policy | Privacy | ⚪ | 🟢 |
| Footer Link (Disclosures) | 揭露聲明 | ⚪ | Disclosure statement | Disclosures | ⚪ | 🟢 |
| Footer Heading (Contact col) | 聯絡 | ⚪ | Contact | Contact | ⚪ | 🟢 |
| Footer Link (Location) | 台北 · 台灣 | ⚪ | Taipei · Taiwan | Taipei, Taiwan | ⚪ | 🟢 |
| Footer Body (Copyright) | (absent) | — | — | © 2026 Talent Intelligence Strategies | ⚪ | 🟢 |

---

## Licensing Index  (`website/product/licensing/index.html`)

### Licensing Index > Top Nav

> **Canonical content lives at [Homepage › Top Nav](#homepage--top-nav).** Byte-identical block. Edits to any row must land in all 3 full-nav files (homepage, licensing index, signal index).

### Licensing Index > Mobile Drawer

> **Canonical content lives at [Homepage › Mobile Drawer](#homepage--mobile-drawer).** Byte-identical.

### Licensing Index > Search Modal

> **Canonical content lives at [Homepage › Search Modal](#homepage--search-modal).** Byte-identical.

### Licensing Index > IP Intelligence Popup

> **Canonical content lives at [Homepage › IP Intelligence Popup](#homepage--ip-intelligence-popup).** Byte-identical.

### Licensing Index > H1 (sr-only)

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Hero Text (sr-only H1) | 泰然專利防護網 — 30 件 SABCD 評等專利組合，當週上線 | ⚪ | TIS Patent Shield Net — 30 SABCD-graded patent bundles, live in the week | TIS Licensing — 30-patent shield, active the week you subscribe | ⚪ | 🟢 |

### Licensing Index > Announcement Banner

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Body Para (message) | 30 件專利組合，每月 NT$3,390 起。 | ⚪ | 30-patent bundle, from NT$3,390 per month. | 30-patent bundles starting at NT$3,390/month. | ⚪ | 🟢 |
| Link Label | 查看定價 → | ⚪ | View pricing → | View pricing → | ⚪ | 🟢 |

### Licensing Index > Hero

Hero copy per `chinese-copy-direction.md` slide 21 (Persona A · export-SME framing). ZH title swapped to insurance-metaphor headline `出口買專利險，30 件專利包輕裝上陣。`; ZH subhead is the single slide-21 benefit-recap paragraph (`1 分鐘勾選…`).

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Eyebrow | 泰然專利防護網 | ⚪ | TIS Patent Shield Net | TIS Licensing Platform | ⚪ | 🟢 |
| Hero Text | 出口買專利險， / *30 件專利包輕裝上陣。* | ⚪ | Buy patent insurance to export, / *roll out with a 30-patent bundle, light and ready.* | 30-patent shield. / *Active this week.* | 🔴 | 🟢 |
| Hero Subtext (line 1) | 1 分鐘勾選國家 × 產業 × 期別，2 種專利包選法，5 類專利評級， | ⚪ | One minute to pick country × industry × term; 2 ways to choose; 5 patent rating tiers, | One subscription, thirty SABCD-graded patents, curated for your jurisdiction and industry | 🔴 | 🟢 |
| Hero Subtext (line 2) | 戴上授權認證標章立刻從被動防禦轉為主動佈局。 | ⚪ | Don the License Badge and shift from passive defense to active positioning. | — passive defense to active position the week you subscribe. | 🔴 | 🟢 |
| CTA primary | 試跑專利包 | ⚪ | Test-drive the patent bundle | Build your bundle | ⚪ | 🟢 |
| CTA secondary | 聯絡業務 | ⚪ | Contact sales | Talk to sales | ⚪ | 🟢 |

> **Note** — EN flagged `🔴 Revise`: per the source comment in `index.html`, the prior EN no longer mirrors the ZH meaning. Awaiting Miko-lock pass.

### Licensing Index > Deliverables

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Card Title (Deliv 1) | AI 智慧雷達導航 — 免除繁瑣檢索，人機協作精選專利組合 | ⚪ | AI smart-radar navigation — skip tedious searches; human-AI collaboration to curate a patent bundle | AI does the search — you get a curated 30-patent bundle | ⚪ | 🟢 |
| Card Body (Deliv 1) | 別把時間浪費在翻閱幾千件請求項（Claims）上。泰然 AI 引擎依據您企業的出口國 × 產業別 × 產品線三軸進行風險缺口掃描，5 分鐘內自動推薦最相關的 30 件專利組建防護包。支援人機協作與手動替換彈性，不需懂法律，大數據直接幫你罩。 | ⚪ | Don't waste time poring over thousands of Claims. The TIS AI engine scans risk gaps across three axes (export country × industry × product line) and auto-recommends the 30 most relevant patents to build a protection bundle in 5 minutes. Human-AI collaboration + manual-swap flexibility supported; no legal expertise required — big-data has you covered. | Don't waste time reading thousands of claims. The TIS AI engine scans risk gaps across three axes (export country × industry × product line) and auto-recommends the 30 most relevant patents in 5 minutes. Manual swap supported; no legal expertise required. | ⚪ | 🟢 |
| Card Title (Deliv 2) | 權威法人聯合授權 — 創智、資策會、陽明交大合法非獨家專利 | ⚪ | Authoritative institutional joint license — ITRI, III, NYCU legal non-exclusive patents | Joint license from reputable institutions — non-exclusive, fully legal | ⚪ | 🟢 |
| Card Body (Deliv 2) | 由創智、資策會、陽明交大三家權威研發機構，直接以貴公司名義開立 30 件核心專利合法授權。 對外，是出海搶單的黃金名片。 在國際買家、跨國投資人面前撕掉「代工小廠」的標籤，用機構級的真實 IP 後盾，讓客戶審查與合作談判都對你刮目相看。 對內，是主動式的防啃骨頭盾。 專利流氓（NPE）篩選敲詐目標時，一看到你背後拉起三家機構合法 IP 防線、攻擊成本高得多，自然會跳過你，去找更好下手的下家。 | ⚪ | ITRI, III, and NYCU — three authoritative R&D institutions — issue 30 core patents legally licensed directly in your company's name. Outward, a gold business card for going overseas — strip the "small OEM" label in front of international buyers and cross-border investors, with institutional-grade real-IP backing that changes how clients review and negotiate. Inward, a proactive shield against patent-troll attacks — NPEs scanning for targets see three institutions' legal IP defense and skip you for an easier mark. | ITRI / III / NYCU issue 30 legal IPs directly in your company's name — one credential, every front. International buyers and investors see institution-level IP backing, not a "small OEM" label. **Patent trolls** (NPEs) see a defense too costly to attack. | ⚪ | 🟢 |
| Card Title (Deliv 3) | 付款隔日立即生效 — DLC 數位憑證與雙品牌動態標章 | ⚪ | Active the day after payment — DLC digital credential + co-branded dynamic badge | Active the day after payment — Digital License Credential (DLC) + co-branded badge | ⚪ | 🟢 |
| Card Body (Deliv 3) | 金流確認隔日防護網立即啟動。平台同步交付包含公證電子簽章的數位授權憑證（DLC），以及帶有「TIS × 權威機構」★ 的聯名授權認證標章（Badge）。內嵌獨一授權編號與 QR Code，2 秒線上即時驗證，可自由印製於國際展位、提案書、官網 Footer 或產品外包裝，對手不敢輕易踩線。 | ⚪ | Day after payment confirms, the shield activates. Platform delivers the notarized e-signature Digital License Credential (DLC) plus the "TIS × institution" ★ co-branded License Badge. Embeds a unique license number + QR code, 2-second online verification; freely printable on international booths, proposals, website footers, or product packaging — competitors think twice. | The DLC carries a notarized e-signature; the "TIS × institution" badge carries a unique license number and QR code — verified online in 2 seconds. Print on booth signage, proposals, website footer, or product packaging. Competitors think twice. | ⚪ | 🟢 |
| Card Title (Deliv 4) | 專利轉化為 OpEx 租賃保險 — 月均不到 1 萬，多樣期別彈性方案 | ⚪ | Convert patents to OpEx lease insurance — under NT$10K/mo, flexible terms | Patent licensing as OpEx — under NT$10K/month, flexible terms | ⚪ | 🟢 |
| Card Body (Deliv 4) | 愛拼才會贏，但不需要盲目打軍備競賽。自行申請 1 件專利需花費 NT$50,000+ 與 18 個月等待；聘請專職 IP 工程師年資產營運成本破百萬；而 TIS 訂閱讓您月均支出控制在萬元以下。提供 3 / 6 / 12 / 24 個月彈性期別，2 年方案最高 88 折優惠。 | ⚪ | Effort wins, but you don't need a blind arms race. Filing 1 patent yourself runs NT$50,000+ and 18 months of waiting; a dedicated IP engineer runs NT$1M+ a year; a TIS subscription keeps monthly spend under NT$10K. 3 / 6 / 12 / 24-month flexible terms; 2-year plans up to 12% off. | Filing 1 patent yourself runs NT$50,000+ and 18 months. Hiring a dedicated IP engineer breaks NT$1M a year. A TIS subscription keeps you under NT$10K/month — flexible 3-24 month terms, up to 12% off on 2-year plans. | ⚪ | 🟢 |

### Licensing Index > Pillar Showcase

> **Filler note** — the right-side browser-frame tile grid is data-driven (placeholder patent IDs across 5 tiers). The audited copy is the left-side text + CTA below.

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 泰然專利防護網 | ⚪ | TIS Patent Shield Net | Licensing Platform | ⚪ | 🟢 |
| Body Para (lede) | **拼出口的台灣頭家，這裡有一張關鍵名片。** | ⚪ | **For Taiwan founders pushing exports — here's the key business card.** | **For exporters pushing into new markets — one credential that covers every front.** | ⚪ | 🟢 |
| Body Para (feature 1) | AI 依您出口國 × 產業，從創智、資策會、陽明交大三家機構池中挑 30 件合法 IP，付款隔日生效，發您一張可掛展位、報價單、Email 簽名的高規授權標章。月不到 1 萬，不賣「絕對不被告」的神話，但讓 **專利蟑螂**評估攻擊成本後跳過你找下家。 | ⚪ | AI picks 30 legal IPs from the ITRI / III / NYCU pools based on your export country × industry, active day after payment; delivers a high-spec License Badge for booth, quote, and email signature. Under NT$10K/month — doesn't sell the "never sued" myth, but makes **patent cockroaches** evaluate attack cost and skip you. | AI picks 30 legal IPs from the ITRI / III / NYCU pools — matched to your export country × industry, active the day after payment. A high-spec badge for booth, quote, and email signature. Under NT$10K/month — doesn't sell the "never sued" myth, but deters **patent trolls**. | ⚪ | 🟢 |
| Body Para (feature 2) | 30 個專利橫跨 5 個評級，有質有量兼備。 | ⚪ | 30 patents spanning 5 tiers — quality and quantity together. | 30 patents span 5 tiers — quality and quantity in one bundle. | ⚪ | 🟢 |
| Body Para (feature 3) | 提供兩種專利包選法 - AI 智選 / FTO 保選。 | ⚪ | Two ways to pick — AI smart-pick / FTO-guarded pick. | Two selection methods — AI smart-pick or FTO-guarded pick. | ⚪ | 🟢 |
| CTA primary | 查看智選專利包 | ⚪ | View AI-pick bundle | View Smart-Pick Bundle | ⚪ | 🟢 |

### Licensing Index > How It Works

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 運作方式 | ⚪ | How it works | How it works | ⚪ | 🟢 |
| Card Title (Step 1) | 選擇國家 × 產業 × 期間 | ⚪ | Choose country × industry × term | Pick your country × industry × term | ⚪ | 🟢 |
| Card Body (Step 1) | 一包專利包支持一個國家、一個產業、一種期間，只為你真正需要的組合付費。 | ⚪ | One bundle covers one country, one industry, one term — pay only for the combo you actually need. | Pay for the markets and the term you actually need — nothing you don't. | ⚪ | 🟢 |
| Card Bullet (Step 1·a) | US、TW，兩個主戰場供專利佈局。 | ⚪ | US, TW — two main battlefields for patent positioning. | Cover the market your customers buy in | ⚪ | 🟢 |
| Card Bullet (Step 1·b) | 3、6、12、24 個月期，隨時可升級延長授權期間。 | ⚪ | 3 / 6 / 12 / 24-month terms; upgrade and extend any time. | Choose the term that fits your runway | ⚪ | 🟢 |
| Card Bullet (Step 1·c) | 30 件 SABCD 評級專利組合，同評級專利隨時可更換。 | ⚪ | 30 SABCD-graded patents per bundle; same-tier swaps any time. | Get thirty SABCD-graded patents per bundle | ⚪ | 🟢 |
| Card Title (Step 2) | 兩種專利包挑選法 | ⚪ | Two ways to pick the bundle | Two ways to pick the 30 | ⚪ | 🟢 |
| Card Body (Step 2) | AI 快速取得組合，或提交 FTO 報告精準篩選。 | ⚪ | AI delivers a bundle fast, or submit an FTO report for precise filtering. | A bundle in 15 seconds — or hand us your FTO and we'll route around it. | ⚪ | 🟢 |
| Card Bullet (Step 2·a) | 方法 A - AI 智選 (免費)：由 AI 為你智選 30 個符合需求的專利包。 | ⚪ | Method A — AI smart-pick (free): AI selects 30 patents fitting your needs. | Let the system recommend a bundle, free | ⚪ | 🟢 |
| Card Bullet (Step 2·b) | 方法 B - FTO 保選 (付費)：上傳你的 FTO 報告或加價購委托泰然產出 FTO 報告，針對專利佈局不足之處，精準篩選專利包。 | ⚪ | Method B — FTO-guarded pick (paid): upload your FTO report or pay TIS to produce one; precision-filter the bundle around your gaps. | Or hand us your FTO to guide the pick | ⚪ | 🟢 |
| Card Bullet (Step 2·c) | 平台提供首選 30 和備選 30 專利清單，供你挑選。 | ⚪ | The platform offers a top-pick 30 and a backup 30 for you to choose from. | Either path ships with a same-tier swap pool | ⚪ | 🟢 |
| Card Title (Step 3) | 專利包瀏覽 | ⚪ | Browse the bundle | Relevant bundle suggested | ⚪ | 🟢 |
| Card Body (Step 3) | 針對特定商品特定市場選取 30 個最佳專利組合。 | ⚪ | Select the best 30-patent combo for a specific product and market. | 30 SABCD-graded patents, curated to your market in under 15 seconds. | ⚪ | 🟢 |
| Card Bullet (Step 3·a) | 橫跨 5 個評級 (5S.6A.9B.6C.4D)，有質有量兼備。 | ⚪ | Spans 5 tiers (5S · 6A · 9B · 6C · 4D) — quality and quantity together. | Get a tier-balanced bundle, flagship to long tail | ⚪ | 🟢 |
| Card Bullet (Step 3·b) | 來自國家級創智法人、資策會法人、陽明交大學術單位等優質專利池，品質有保障。 | ⚪ | Sourced from national-grade ITRI, III, and NYCU pools — quality guaranteed. | Drawn from the Innovue, iPIC, III & NYCU pool | ⚪ | 🟢 |
| Card Bullet (Step 3·c) | 不用等 18 個月或無止盡商務談判，訂 閱到生效快速打通關。 | ⚪ | No 18-month waits or endless negotiations — subscribe-to-live, fast. | Go live the week you subscribe | ⚪ | 🟢 |
| Card Title (Step 4) | 鎖定專利包 | ⚪ | Lock the bundle | Swap patents — your call | ⚪ | 🟢 |
| Card Body (Step 4) | 同評級專利可自選替換，隨你決定，不加價、無等審。 | ⚪ | Same-tier patents are swappable at your discretion — no surcharge, no review wait. | Don't love a pick? Swap it — no surcharge, no review delay. | ⚪ | 🟢 |
| Card Bullet (Step 4·a) | 平台提供首選 30 和備選 30 專利清單，供你自選替換。 | ⚪ | The platform offers a top-pick 30 and a backup 30 for self-swap. | Swap any pick from a same-tier pool | ⚪ | 🟢 |
| Card Bullet (Step 4·b) | 授權期間內可不限次替換同評級專利，提升企業防禦力。 | ⚪ | Unlimited same-tier swaps within term — strengthens defense. | Swap as often as you like, within term | ⚪ | 🟢 |
| Card Bullet (Step 4·c) | 只要維持評級組合 (5S.6A.9B.6C.4D)，想怎麼換就怎麼換。 | ⚪ | As long as the tier mix (5S · 6A · 9B · 6C · 4D) holds, swap freely. | Replace like-for-like — the count stays thirty | ⚪ | 🟢 |
| Card Title (Step 5) | 展示憑證，展示你的軟實力 | ⚪ | Display the credential, display your soft power | Display the credential — and the full file | ⚪ | 🟢 |
| Card Body (Step 5) | 高規格授權認證標章，供客戶查詢，拉高被告門檻。 | ⚪ | High-spec License Badge for client lookup — raises the bar for being sued. | One Document Center — everything you need to display, defend, and prove the license. | ⚪ | 🟢 |
| Card Bullet (Step 5·a) | 高規格公證電子簽章的數位授權憑證，內嵌獨一授權編號與 QR Code，2 秒線上即時驗證。 | ⚪ | High-spec notarized e-signature DLC with unique license # + QR code, 2-second online verification. | Embed the credential anywhere, PNG or SVG | ⚪ | 🟢 |
| Card Bullet (Step 5·b) | 「泰然 × 權威機構」的聯名授權認證標章，可自由印製於國際展位、提案書、官網 Footer 或產品外包裝，讓對手不敢輕易踩線。 | ⚪ | "TIS × institution" co-branded License Badge — freely printable on booths, proposals, website footers, packaging — competitors think twice. | Hand over a PAdES-signed contract and certificate | ⚪ | 🟢 |

### Licensing Index > Patent Inventory Teaser (flat variant)

> **1:1 with [Homepage › Patent Inventory Teaser](#homepage--patent-inventory-teaser)** for the eyebrow + all search/filter labels (the data-zh strings are byte-identical). The only structural difference is the underlying ticker layout (flat random vs tier-organized) — copy unchanged. Edits land on both pages.

### Licensing Index > CTA Band (Build your bundle)

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading (line 1) | 從這些機構所授權的 | ⚪ | From the patents licensed by these institutions, | Find your position on patents | ⚪ | 🟢 |
| Section Heading (line 2) | 專利中，找到你的位置。 | ⚪ | find your position. | from established institutions | ⚪ | 🟢 |
| CTA primary | 組建你的組合 | ⚪ | Build your bundle | Build your bundle | ⚪ | 🟢 |

### Licensing Index > Pricing

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 專利授權套件組合 | ⚪ | Patent-license bundle packages | Pricing — Build your bundle. | ⚪ | 🟢 |
| Tab Label (Term · 3mo) | 3 個月 | ⚪ | 3 months | 3 months | ⚪ | 🟢 |
| Tab Label (Term · 6mo) | 6 個月 | ⚪ | 6 months | 6 months | ⚪ | 🟢 |
| Tab Label (Term · 12mo) | 12 個月 | ⚪ | 12 months | 12 months | ⚪ | 🟢 |
| Tab Label (Term · 24mo) | 24 個月 | ⚪ | 24 months | 24 months | ⚪ | 🟢 |
| Field Label (Jurisdiction) | 選擇國家 | ⚪ | Choose country | Jurisdiction | ⚪ | 🟢 |
| Dropdown Option (US) | 美國 | ⚪ | United States | United States | ⚪ | 🟢 |
| Dropdown Option (TW) | 台灣 | ⚪ | Taiwan | Taiwan | ⚪ | 🟢 |
| Field Label (Industry) | 選擇產業 | ⚪ | Choose industry | Industry | ⚪ | 🟢 |
| Dropdown Option (Industry · Chip) | 晶片半導體設計製造 | ⚪ | Chip semiconductor design/manufacturing | Chip semiconductor design/manufacturing | ⚪ | 🟢 |
| Dropdown Option (Industry · Networking) | 網路通訊 | ⚪ | Networking & communications | Networking & communications | ⚪ | 🟢 |
| Dropdown Option (Industry · Computing) | 計算機系統 | ⚪ | Computing systems | Computing systems | ⚪ | 🟢 |
| Dropdown Option (Industry · Integrated) | 綜合應用 | ⚪ | Integrated applications | Integrated applications (AI · AV · EV) | ⚪ | 🟢 |
| Dropdown Option (Industry · Multimedia) | 多媒體影音/影像處理 | ⚪ | Multimedia A/V & image processing | Multimedia A/V & image processing | ⚪ | 🟢 |
| Dropdown Option (Industry · Net-zero) | 淨零碳排 | ⚪ | Net-zero & carbon | Net-zero & carbon | ⚪ | 🟢 |
| Meta Label (bundle qty) | 30 / 包 | ⚪ | 30 / bundle | 30 / bundle | ⚪ | 🟢 |
| Meta Label (estimate eyebrow) | 單包金額預估 | ⚪ | Single-bundle estimate | Single-bundle estimate | ⚪ | 🟢 |
| Meta Label (estimate · Jurisdiction) | 國家 | ⚪ | Country | Jurisdiction | ⚪ | 🟢 |
| Meta Label (estimate · Industry) | 產業 | ⚪ | Industry | Industry | ⚪ | 🟢 |
| Meta Label (estimate · Term) | 期別 | ⚪ | Term | Term | ⚪ | 🟢 |
| Meta Label (estimate · Per month) | 月均額 | ⚪ | Monthly average | Per month | ⚪ | 🟢 |
| Meta Label (estimate · unit) | / 月 | ⚪ | / month | / month | ⚪ | 🟢 |
| Meta Label (Save · 6mo, JS) | 95折優惠 | ⚪ | 5% off | Save 5% | ⚪ | 🟢 |
| Meta Label (Save · 12mo, JS) | 9折優惠 | ⚪ | 10% off | Save 10% | ⚪ | 🟢 |
| Meta Label (Save · 24mo, JS) | 85折優惠 | ⚪ | 15% off | Save 15% | ⚪ | 🟢 |
| CTA primary (Subscribe) | 訂閱 | ⚪ | Subscribe | Subscribe | ⚪ | 🟢 |
| Meta Label (Every bundle includes) | 每組組合內含 | ⚪ | Each bundle includes | Every bundle includes | ⚪ | 🟢 |
| Card Bullet (Inc · 1) | 30 件 SABCD 評等專利 | ⚪ | 30 SABCD-graded patents | 30 SABCD-graded patents | ⚪ | 🟢 |
| Card Bullet (Inc · 2) | 授權認證標章 | ⚪ | License Badge | Verified License Badge + QR verifier | ⚪ | 🟢 |
| Card Bullet (Inc · 3) | DLC 數位授權憑證（PAdES · eIDAS） | ⚪ | DLC digital license credential (PAdES · eIDAS) | DLC digital credential (PAdES · eIDAS) | ⚪ | 🟢 |
| Card Bullet (Inc · 4) | MOICA 政府電子簽章 | ⚪ | MOICA government e-signature | MOICA / government e-signature | ⚪ | 🟢 |
| Card Bullet (Inc · 5) | 不限次同級專利替換 | ⚪ | Unlimited same-tier swaps | Dynamic-pool compensation | ⚪ | 🟢 |
| Card Bullet (Inc · 6) | AI 智選 | ⚪ | AI smart-pick | AI matching (24-hr turnaround) | ⚪ | 🟢 |
| Card Bullet (Inc · 7) | 標章運用於參展/宣傳物 | ⚪ | Badge usage on exhibitions/promo materials | Badge usage on booths & promo materials | ⚪ | 🟢 |

### Licensing Index > FAQ

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 常見問題 | ⚪ | FAQ | FAQ | ⚪ | 🟢 |
| Card Title (Q1) | 專利從哪裡來？ | ⚪ | Where do the patents come from? | Where do the patents come from? | ⚪ | 🟢 |
| Card Body (Q1) | 每組組合策展自 Innovue WEBPAT 與策略合作夥伴。所有專利在進入組合池前皆通過 PSS 引擎預先評等。 | ⚪ | Each bundle is curated from Innovue WEBPAT and strategic partners. All patents are pre-graded by the PSS engine before entering the bundle pool. | Every bundle is curated from **Innovue's WEBPAT** and strategic aligned partners. Every patent is pre-scored on the PSS engine before it's eligible for any bundle. | ⚪ | 🟢 |
| Card Title (Q2) | 為什麼每組都是固定的 5/6/9/6/4 分布？ | ⚪ | Why is every bundle a fixed 5/6/9/6/4 split? | Why does every bundle have the same 5/6/9/6/4 split? | ⚪ | 🟢 |
| Card Body (Q2) | 初始分布：5 件 S + 6 件 A + 9 件 B + 6 件 C + 4 件 D，依產業池每季再平衡。旗艦級 (S/A) 在談判桌上面對對手；密度級 (B) 覆蓋戰場；長尾 (C/D) 補洞並維持價格。可預測，且能撐住真實授權方所遇到的各種反制。 | ⚪ | Initial split: 5 S + 6 A + 9 B + 6 C + 4 D, rebalanced quarterly per industry pool. Flagship (S/A) faces opponents at the negotiation table; density (B) covers the battlefield; long-tail (C/D) plugs gaps and holds price. Predictable, and holds under real-world pushback. | Thirty patents — initial split **5 S + 6 A + 9 B + 6 C + 4 D**, rebalanced quarterly per industry pool. The flagship tiers (S/A) face the counter-party at the negotiation table. The density tier (B) covers the battlefield. The long tail (C/D) plugs gaps and holds the price down. Predictable, and it holds up under the kind of pushback real licensees see. | ⚪ | 🟢 |
| Card Title (Q3) | 你們怎麼決定我們組合裡的 30 件？ | ⚪ | How do you decide on the 30 patents in our bundle? | How do you decide which 30 patents go into our bundle? | ⚪ | 🟢 |
| Card Body (Q3) | 上傳你的產品說明書或 FTO 報告。24 小時內收到組合候選。同源評分引擎（與 Signal 共用）跨產業池計算交集密度。若有 5–7 件不適配你的產品線，可在簽約前從動態池中替換。 | ⚪ | Upload your product spec or FTO report. Within 24 hours, receive a candidate bundle. The same scoring engine (shared with Signal) computes overlap density across the industry pool. If 5–7 patents don't fit your product line, swap them from the dynamic pool before signing. | Upload your **product spec** or your **FTO report**. Within 24 hours, you get a candidate bundle. The same scoring engine that drives Signal computes overlap density against the industry pool. If 5–7 patents don't fit your product line, you can swap them out from the dynamic pool before you sign. | ⚪ | 🟢 |
| Card Title (Q4) | 合約期內若有專利被撤銷會發生什麼事？ | ⚪ | What happens if a patent is invalidated within the term? | What happens if a patent gets invalidated mid-contract? | ⚪ | 🟢 |
| Card Body (Q4) | 同級替換，無需額外費用。S 換 S。A 換 A。整個合約期，30 件就是 30 件。期間 3 / 6 / 12 / 24 個月，24 個月最高省 15%。續約 MSRP。整段非專屬。 | ⚪ | Same-tier replacement, no extra fee. S replaces S. A replaces A. 30 stays 30 for the full term. 3 / 6 / 12 / 24-month terms; up to 15% off on 24-month. Renewal at MSRP. Non-exclusive throughout. | **Same-tier replacement at no extra cost.** S replaces S. A replaces A. The number 30 stays 30 for the full term. Terms run 3 / 6 / 12 / 24 months, up to 15% off on 24-month. Renewals at MSRP. Non-exclusive throughout. | ⚪ | 🟢 |
| Card Title (Q5) | 從訂閱到拿到徽章需要多久？ | ⚪ | How long from subscribing to receiving the badge? | How long from subscribing to having the badge in hand? | ⚪ | 🟢 |
| Card Body (Q5) | 約一週。15 分鐘填完六步引導（法域 → 產業 → 期間 → 路徑 → 公司 → 結果）。AI 24 小時內回傳候選組合。簽約後徽章於 72 小時內以你的名義生效。 | ⚪ | About one week. 15 minutes to fill the six-step wizard (jurisdiction → industry → term → path → company → result). AI returns a candidate within 24 hours. Once signed, the badge is active in your name within 72 hours. | About a week. **Fifteen minutes** to fill out the six-step wizard (jurisdiction → industry → term → path → company → results). AI returns a candidate bundle within **24 hours**. Once you sign, the badge is active in your name within **72 hours**. | ⚪ | 🟢 |

### Licensing Index > Contact Form

> **1:1 with [Homepage › Contact Form](#homepage--contact-form)** for every field label, success message, and office-hours block — byte-identical `data-zh` and EN. The only differences are the Inquiry Type default (`licensing` vs `(none)`) and the dropdown option set:

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Field Label (Inquiry default) | 授權組合 | ⚪ | License bundle | Licensing bundle | ⚪ | 🟢 |
| Dropdown Option (Licensing) | 授權組合 | ⚪ | License bundle | Licensing bundle | ⚪ | 🟢 |
| Dropdown Option (Signal) | Signal / 估值 | ⚪ | Signal / Valuation | Signal / valuation | ⚪ | 🟢 |
| Dropdown Option (Press) | 媒體採訪 | ⚪ | Media Interview | Press & media | ⚪ | 🟢 |
| Dropdown Option (General) | 其他 | ⚪ | Other | General | ⚪ | 🟢 |

All other contact-form rows: see [Homepage › Contact Form](#homepage--contact-form).

### Licensing Index > Footer

> **Canonical content lives at [Homepage › Footer](#homepage--footer).** Byte-identical (in-page anchors prefixed with `/` for subpages — copy unchanged).

---

## Licensing Lobby  (`website/product/licensing/lobby.html`)

A stripped marketing surface between the product index and the external auth app (`licensing.tisglobalinc.com/start`).

### Licensing Lobby > Top Nav (stripped)

This page uses the `.topnav` chrome from the homepage but stripped to **logo + language toggle only**. No Products dropdown, Reports/Press/About links, search, theme toggle, Contact-sales CTA, or mobile drawer.

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Language Option (EN) | (absent) | — | — | English | ⚪ | 🟢 |
| Language Option (ZH) | (absent) | — | — | 中文 | ⚪ | 🟢 |

### Licensing Lobby > H1 (sr-only)

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Hero Text (sr-only H1) | 授權平台 — 開始使用 | ⚪ | Licensing platform — get started | Licensing Platform — get started | ⚪ | 🟢 |

### Licensing Lobby > Announcement Ticker

Scrolling ticker — 3 update items duplicated in markup for seamless loop. No dismiss.

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Meta Label (Date · 1) | (absent) | — | — | 2026-05-22 | ⚪ | 🟢 |
| Body Para (Ticker 1) | 台灣 × 半導體專利組合正式上線 | ⚪ | Taiwan × Semiconductor patent bundle officially live | Taiwan × Semiconductor bundle now live | ⚪ | 🟢 |
| Meta Label (Date · 2) | (absent) | — | — | 2026-05-10 | ⚪ | 🟢 |
| Body Para (Ticker 2) | 日本 FTO 涵蓋擴增至 30 件專利 | ⚪ | Japan FTO coverage expanded to 30 patents | Japan FTO coverage expanded to 30 patents | ⚪ | 🟢 |
| Meta Label (Date · 3) | (absent) | — | — | 2026-04-28 | ⚪ | 🟢 |
| Body Para (Ticker 3) | 新增歐盟司法管轄區，橫跨 6 個產業 | ⚪ | EU jurisdiction added, spanning 6 industries | EU jurisdiction added across 6 industries | ⚪ | 🟢 |

### Licensing Lobby > Left Panel (Marketing)

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Hero Text | 同儕池專利來自國家級法人及學術研究單位 | ⚪ | Peer-pool patents from national-grade institutions and academic research units | Peer-pool patents, from national institutions and academic research | ⚪ | 🟢 |
| Card Bullet (Prop 1) | 依司法管轄區 × 產業精選的 30 件專利組合。 | ⚪ | 30-patent bundles curated by jurisdiction × industry. | 30-patent bundles, curated per jurisdiction × industry. | ⚪ | 🟢 |
| Card Bullet (Prop 2) | 數小時內啟用 Freedom to Operate，而非數月。 | ⚪ | Freedom to Operate activated in hours, not months. | Freedom to Operate, active in hours — not months. | ⚪ | 🟢 |
| Card Bullet (Prop 3) | 非專屬授權，3 至 36 個月彈性期程，每月 NT$7,990–9,990。 | ⚪ | Non-exclusive licenses, 3 to 36 months flexible, NT$7,990–9,990/month. | Non-exclusive terms from 3 to 36 months, NT$7,990–9,990/mo. | ⚪ | 🟢 |

### Licensing Lobby > Partner Strip

> **1:1 with [Homepage › Partner Strip](#homepage--partner-strip).** Byte-identical eyebrow string — `泰然策略合作夥伴` / `TIS Strategic Partners`. Only the 4 partner logos render in a 2×2 inline grid here (vs single-row band on homepage). Copy unchanged.

### Licensing Lobby > Right Panel (Auth) — Sign-up tab

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 建立你的帳號 | ⚪ | Create your account | Create your account | ⚪ | 🟢 |
| Section Subheading | 建立帳號以組建你的第一個 30 件專利組合，或登入管理你的防護範圍。 | ⚪ | Create an account to build your first 30-patent bundle, or sign in to manage your coverage. | Create an account to build your first 30-patent bundle, or sign in to manage your coverage. | ⚪ | 🟢 |
| Field Label (Company) | 公司 | ⚪ | Company | Company | ⚪ | 🟢 |
| Field Label (Work email) | 公司電子郵件 | ⚪ | Company email | Work email | ⚪ | 🟢 |
| Field Label (Password) | 密碼 | ⚪ | Password | Password | ⚪ | 🟢 |
| CTA primary (Create) | 建立帳號 | ⚪ | Create account | Create account | ⚪ | 🟢 |
| Body Para (cross-link prefix) | 已有帳號？ | ⚪ | Already have an account? | Already have an account? | ⚪ | 🟢 |
| Link Label (cross-link · Log in) | 登入 | ⚪ | Log in | Log in | ⚪ | 🟢 |

### Licensing Lobby > Right Panel (Auth) — Log-in tab

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 歡迎回來 | ⚪ | Welcome back | Welcome back | ⚪ | 🟢 |
| Section Subheading | 你的組合都在原處等你。 | ⚪ | Your bundles are right where you left them. | Your bundles are right where you left them. | ⚪ | 🟢 |
| Field Label (Work email) | 公司電子郵件 | ⚪ | Company email | Work email | ⚪ | 🟢 |
| Field Label (Password) | 密碼 | ⚪ | Password | Password | ⚪ | 🟢 |
| Link Label (Forgot password) | 忘記密碼？ | ⚪ | Forgot password? | Forgot password? | ⚪ | 🟢 |
| CTA primary (Log in) | 登入 | ⚪ | Log in | Log in | ⚪ | 🟢 |
| Body Para (cross-link prefix) | 第一次使用 TIS 授權？ | ⚪ | First time using TIS Licensing? | New to TIS Licensing? | ⚪ | 🟢 |
| Link Label (cross-link · Create) | 建立帳號 | ⚪ | Create account | Create an account | ⚪ | 🟢 |

### Licensing Lobby > Slim Footer

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Footer Body (Copyright) | © 2026 泰然策略解密 | ⚪ | © 2026 Tai-Ran Strategy Decryption | © 2026 Talent Intelligence Strategies | ⚪ | 🟢 |
| Link Label (Back) | ← 返回授權產品頁 | ⚪ | ← Back to Licensing product page | ← Back to Licensing | ⚪ | 🟢 |

---

## Signal Index  (`website/product/signal/index.html`)

### Signal Index > Top Nav

> **Canonical content lives at [Homepage › Top Nav](#homepage--top-nav).** Byte-identical.

### Signal Index > Mobile Drawer

> **Canonical content lives at [Homepage › Mobile Drawer](#homepage--mobile-drawer).** Byte-identical.

### Signal Index > Search Modal

> **Canonical content lives at [Homepage › Search Modal](#homepage--search-modal).** Byte-identical.

### Signal Index > IP Intelligence Popup

> **Canonical content lives at [Homepage › IP Intelligence Popup](#homepage--ip-intelligence-popup).** Byte-identical.

### Signal Index > H1 (sr-only)

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Hero Text (sr-only H1) | Signal — 30 分鐘為專利做 SABCD 評等 | ⚪ | Signal — SABCD-grade a patent in 30 minutes | Signal — Grade patents with SABCD in 30 minutes | ⚪ | 🟢 |

### Signal Index > Announcement Banner

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Body Para (message) | SABCD 報告 30 分鐘到手 — 含同產業 cohort 排名。 | ⚪ | SABCD report in hand in 30 minutes — includes same-industry cohort ranking. | SABCD report in hand in 30 minutes — same-industry rank per patent. | ⚪ | 🟢 |
| Link Label | 立即試用 → | ⚪ | Try now → | Try Signal → | ⚪ | 🟢 |

### Signal Index > Hero

Hero copy per `chinese-copy-direction.md` slide 29 (Miko-provided swaps 2026-05-31). ZH pivots to the law-vs-strength wedge headline + Peer-Cohort-Snapshot subhead. EN preserved structurally — will diverge in meaning until Miko-lock.

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Eyebrow | (empty) | — | — | Token-Based Valuation · SABCD | ⚪ | 🟢 |
| Hero Text | 律師告訴你「合不合法」 / *我們告訴你專利「強不強」* | ⚪ | Lawyers tell you "legal or not" / *we tell you patents "strong or not"* | Grade IP in 30 minutes. / *Not weeks.* | 🔴 | 🟢 |
| Hero Subtext | 把目標專利打進 產業池做「同儕基準快照（Peer Cohort Snapshot）」百分位排序，產出 SABCD 五級評級。 | ⚪ | Drop the target patent into the industry pool, run a "Peer Cohort Snapshot" percentile ranking, produce a SABCD 5-tier grade. | Submit a patent number; the SABCD-graded Brief lands in thirty minutes. Peer percentile drawn from your industry's curated pool — not a week-long analyst engagement. | 🔴 | 🟢 |
| Body Para (Powered by) | Powered by | ⚪ | Powered by | Powered by | ⚪ | 🟢 |
| CTA primary | 免費預覽報告樣本 | ⚪ | Free preview of a sample report | Get your first Brief | ⚪ | 🟢 |
| CTA secondary | 聯絡業務 | ⚪ | Contact sales | Talk to sales | ⚪ | 🟢 |

> **Note** — EN flagged `🔴 Revise`: per the source comment in `index.html`, ZH diverges in meaning; awaiting Miko-lock.

### Signal Index > Deliverables

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Card Title (Deliv 1) | SABCD 五級戰略評定 — 穿透泡沫，定義技術真實防禦力 | ⚪ | SABCD 5-tier strategic verdict — through the bubble, define real technical defensibility | SABCD 5-tier rating — past the pitch deck, real defensibility | ⚪ | 🟢 |
| Card Body (Deliv 1) | 拒絕新創團隊在 Pitch Deck 上的數量堆疊。系統透過 50 項指標聚合，將標的專利放進 TIS 同產業池進行同儕基準快照（Peer Cohort Snapshot）。S 級（前 15% 頂級戰略）到 D 級一目了然。法律顧問只能告訴你這件專利「合不合法」，而泰然評級直接斷定它「強不強、能不能打」 | ⚪ | Reject startups' Pitch-Deck count-stacking. The system aggregates 50 indicators, drops the target into the TIS same-industry pool, runs a Peer Cohort Snapshot. S-tier (top 15% strategic) to D-tier — at a glance. Legal counsel can only tell you "legal or not"; TIS rating tells you "strong or not, can it fight" | Ditch the pitch deck. 50 indicators aggregate into one rating — your patent compared against same-industry peers in a Peer Cohort Snapshot, S (top 15%) to D. Lawyers tell you legal-or-not; we tell you strong-or-not. | ⚪ | 🟢 |
| Card Title (Deliv 2) | 跨標的同儕基準排序 — 建立投委會統一的風控量尺 | ⚪ | Cross-deal peer-benchmark ranking — a unified IC risk yardstick | Peer-cohort benchmarking — one comparable score across deals | ⚪ | 🟢 |
| Card Body (Deliv 2) | 將新創團隊的專利護城河，丟進同產業同儕池中進行全景對比。無論同時評估 5 家還是 10 家被投標的，全部報告皆基於同一個客觀百分位 scale 進行 cross-compare。讓主觀的技術盲點，轉化為投委會與合夥人能直接採信的量化數據。 | ⚪ | Drop the startup's patent moat into the same-industry peer pool for panoramic comparison. Evaluating 5 deals or 10 simultaneously — every report cross-compares on the same objective percentile scale. Transforms subjective technical blind spots into quantitative data the IC and partners can trust. | Every patent moat lands in its industry's peer pool for a panoramic comparison. 5 deals at once, or 10 — same percentile scale, cross-compared. Subjective blind spots become numbers the IC and partners can act on. | ⚪ | 🟢 |
| Card Title (Deliv 3) | 同步雙版專利評級 — 可附入 IC Memo、Data Room 與 LP 季報 | ⚪ | Synchronized dual-version patent rating — attach to IC Memo, Data Room, LP quarterly | Brief + Pro reports — IC Memo, Data Room, LP-quarterly ready | ⚪ | 🟢 |
| Card Body (Deliv 3) | 採 2 SKU 計費（Brief 15 點 / Pro 30 點），1 點 = NT$100。系統同步生成兩版報告——Brief 是執行摘要（給 partner 快速 go/no-go），Pro 是深度版（含 50 項指標、跨方案穩定性、授權策略建議）。單買、雙買、按情境配置點數。 一鍵產出含用戶 Email 浮水印、防外流的權威 PDF，可直接附入投資建議書（IC Memo）、Data Room 或向 LP 進行季度風險報告。 | ⚪ | 2-SKU billing (Brief 15 pts / Pro 30 pts), 1 pt = NT$100. The system generates both reports simultaneously — Brief is the executive summary (fast partner-grade go/no-go), Pro is the deep dive (50 indicators, cross-scenario stability, licensing strategy). Single, both, or allocate by situation. One-click leak-resistant Email-watermarked PDF — drops into IC Memo, Data Room, or LP quarterly risk report. | Brief is 15 points; Pro is 30 points; 1 point = NT$100. Brief is partner-grade go/no-go. Pro unpacks 50 indicators, cross-plan stability, and licensing-strategy recommendations. Buy single, both, or allocate by deal. One-click leak-resistant PDF with Email watermark — drops into IC Memo, Data Room, or LP quarterly. | ⚪ | 🟢 |
| Card Title (Deliv 4) | 新穎 1.8 億筆底層大數據 — 刺破公開 AI 搜尋的數據盲區 | ⚪ | Innovue's 180M-record big-data foundation — past public AI's data blind spots | Innovue's 180M-patent database — past public AI's blind spots | ⚪ | 🟢 |
| Card Body (Deliv 4) | 本產品技術由新穎數位支援全球第三大、涵蓋 100+ 國、每日同步的 1.8 億筆 WEBPAT 專利資料庫。客戶只需提供專利號，系統自動從資料庫抽取完整專利文本，進行 50 項指標分析。所有分析在封閉式專業資料庫內完成，公開 AI 工具完全無法觸及的硬核底數據層，確保最嚴苛的盡職調查絕不踩空。 | ⚪ | Technology backed by Innovue's 180M-record, 100+ country, daily-synced WEBPAT database (3rd-largest globally). Customers submit a patent number; the system extracts the full patent text and runs 50 indicators. Analyses run in a closed professional database — a hardcore data layer untouchable by public AI tools, ensuring stringent due-diligence never trips. | Innovue's WEBPAT database backs every analysis — 180M patents, 3rd-largest globally, 100+ countries, daily-synced. Submit a patent number; the system extracts the full text and runs 50 indicators in a closed environment, with DD-grade rigor. Unscrapable by public AI tools. | ⚪ | 🟢 |

### Signal Index > Pillar Showcase

> **Filler note** — the right-side report-card stack is data-driven (5 mocked PSS reports across D/C/B/A/S tiers, radar charts, distribution charts). The audited copy is the left-side text below.

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 泰然專利強度評級系統 | ⚪ | TIS Patent Strength Rating System | Signal Platform | ⚪ | 🟢 |
| Body Para (lede) | **拼募資的 founder、做盡調的 VC、評估護城河的企業 —專利強不強，看排名就知道。** | ⚪ | **Founders chasing funding, VCs running DD, enterprises assessing moats — strong or not, the ranking shows you.** | **Founders pitching, VCs running diligence, enterprises assessing moats — the ranking settles it.** | ⚪ | 🟢 |
| Body Para (feature 1) | 泰然專利強度評級系統把每件專利打進 **同產業 cohort 做百分位排序**，產出 SABCD 五級評級。**客戶無須整理文件，只需提供專利號，系統自動從 1.8 億筆專利資料庫抽取完整資料、跑完 50 項指標分析**。短版執行摘要可快速初篩判斷強度，長版逐項下鑽。 | ⚪ | The TIS Patent Strength Rating System drops every patent into a **same-industry cohort for percentile ranking**, producing a SABCD 5-tier grade. **Customers don't prepare documents — submit a patent number and the system extracts everything from the 180M-record database and runs all 50 indicators.** Brief = fast strength read; Pro = item-by-item drill-down. | Every patent slots into its same-industry cohort for percentile ranking, producing a SABCD grade. **Skip the document prep — provide a patent number and the system pulls the full record from the 180M-patent database and runs all 50 indicators.** Brief gives the fast read; Pro drills down item-by-item. | ⚪ | 🟢 |
| Body Para (feature 2) | 報告可附入 IC Memo、盡職調查、LP 季報、政府補助 / 標案等各類文件，作為**第三方專利評級依據** —律師告訴你「合不合法」，我們告訴你「強不強」。 | ⚪ | Reports attach to IC Memos, due-diligence files, LP quarterlies, grant / tender submissions — a **third-party patent-rating basis**. Lawyers tell you "legal or not"; we tell you "strong or not". | Attach a report to your IC Memo, due-diligence files, LP quarterly, or grant / tender submission — a **third-party patent rating**. Lawyers tell you legal-or-not; we tell you strong-or-not. | ⚪ | 🟢 |
| CTA primary | 免費預覽報告樣本 | ⚪ | Free preview of a sample report | View Sample Report | ⚪ | 🟢 |

### Signal Index > How It Works

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 運作方式 | ⚪ | How it works | How it works | ⚪ | 🟢 |
| Card Title (Step 1) | 提交一個專利號 | ⚪ | Submit a patent number | Submit a patent number | ⚪ | 🟢 |
| Card Body (Step 1) | 只要有專利號，就能評級專利強度，免分析師，免等事務所排號。 | ⚪ | A patent number is enough — grade patent strength without an analyst or law-firm queue. | Your Brief lands in 30 minutes — no analyst, no week-long wait. | ⚪ | 🟢 |
| Card Bullet (Step 1·a) | Innovue 全球第 3 大專利資料庫，囊括 USPTO、TW、EPO、WO 等官方即時更新資料，專利家族一把抓。 | ⚪ | Innovue's 3rd-largest global patent database — USPTO, TW, EPO, WO real-time official data; family rolled up. | Grade patents from any major office | ⚪ | 🟢 |
| Card Bullet (Step 1·b) | 可同時申請多個專利強度評級報告，不需要排隊。 | ⚪ | Submit multiple ratings simultaneously — no queue. | Score a whole batch at once | ⚪ | 🟢 |
| Card Bullet (Step 1·c) | 免等分析師安排資源和報價，申請、付款、取報告一次完成。 | ⚪ | No analyst-resource-and-quote wait; request, pay, fetch — done. | Skip the week-long analyst wait | ⚪ | 🟢 |
| Card Title (Step 2) | 對比同儕池 | ⚪ | Compare against the peer pool | Matched against the right peer pool | ⚪ | 🟢 |
| Card Body (Step 2) | 蘋果對蘋果才公平。 | ⚪ | Apples to apples — fair. | Apples to apples — fair comparison, by design. | ⚪ | 🟢 |
| Card Bullet (Step 2·a) | 6 大類專利池 - 晶片半導體設計製造、網路通訊、計算機系統、綜合應用、多媒體影音/影像處理、淨零碳排。 | ⚪ | 6 patent pools — chip semiconductor design/manufacturing, networking & communications, computing systems, integrated applications, multimedia A/V & image processing, net-zero & carbon. | 6 patent pools — chip, network, compute, integrated, multimedia, net-zero | ⚪ | 🟢 |
| Card Bullet (Step 2·b) | 評級專利對應正確專利池，不跨行，只跟同行比。 | ⚪ | Rated patents map to the right pool — no cross-industry; peers only. | Graded inside its own pool — peers only, no cross-industry | ⚪ | 🟢 |
| Card Bullet (Step 2·c) | 專利評級內容對標 Innovue 全球第 3 大專利資料庫，只評估官方記錄。 | ⚪ | Patent ratings benchmark to Innovue's 3rd-largest global database — official records only. | Benchmarked against Innovue's 3rd-largest patent database — official records only | ⚪ | 🟢 |
| Card Title (Step 3) | Brief (短版) / Pro (深度版) 報告，按需隨選。 | ⚪ | Brief (short) / Pro (deep) reports, on demand. | Brief or Pro — pick by need | ⚪ | 🟢 |
| Card Bullet (Step 3·a) | Brief 短版報告馬上告訴你專利強不強，提供執行摘要讓你快速作決定。 | ⚪ | Brief short report tells you strong-or-not immediately; executive summary for fast decisions. | Brief — fast strong/weak verdict, executive summary | ⚪ | 🟢 |
| Card Bullet (Step 3·b) | Pro 深度版報告包含全部評級指標深度分析說明，豐富你的投資或盡職報告。 | ⚪ | Pro deep report contains all rating-indicator deep-dive analysis, enriching your investment or DD report. | Pro — full indicator deep-dive for your IC memo or DD pack | ⚪ | 🟢 |
| Card Bullet (Step 3·c) | Brief 版不夠，加買 Pro 版，只要付 Pro 版差額即可獲得雙版。 | ⚪ | Brief not enough? Pay the Pro delta to unlock both versions. | Started with Brief? Pay the Pro delta to unlock both | ⚪ | 🟢 |
| Card Title (Step 4) | Brief 報告呈現什麼 | ⚪ | What the Brief report shows | What the Brief report shows you | ⚪ | 🟢 |
| Card Body (Step 4) | 一分鐘掃完──無需編輯，直接轉發給投資委員會。 | ⚪ | Scan in a minute — forward to the IC as-is, no editing. | Scannable in a minute — forward it to your IC without editing. | ⚪ | 🟢 |
| Card Bullet (Step 4·a) | 等級判定 + PSS 分數 | ⚪ | Tier verdict + PSS score | See the tier verdict at a glance | ⚪ | 🟢 |
| Card Bullet (Step 4·b) | 池內百分位 + 池內排名 | ⚪ | Pool percentile + pool rank | Know exactly where it ranks among peers | ⚪ | 🟢 |
| Card Bullet (Step 4·c) | 狀態 · 家族 · IPC · 剩餘年限 · AI 摘要 | ⚪ | Status · family · IPC · remaining years · AI summary | Forward it to your IC as-is | ⚪ | 🟢 |
| Card Title (Step 5) | Pro 將 PSS 拆解成 50 項指標 | ⚪ | Pro breaks PSS into 50 indicators | Pro unpacks the PSS into 50 indicators | ⚪ | 🟢 |
| Card Body (Step 5) | 可承受法務審視──看清哪些面向錨定評等、敏感度落在哪裡。 | ⚪ | Defensible under legal review — see which dimensions anchor the verdict and where sensitivities sit. | Defensible enough for legal — see which dimensions anchor the verdict and where the sensitivities sit. | ⚪ | 🟢 |
| Card Bullet (Step 5·a) | 八大支柱 × 4–8 項指標 = 50 項 | ⚪ | 8 pillars × 4–8 indicators = 50 items | See what anchors the grade | ⚪ | 🟢 |
| Card Bullet (Step 5·b) | 每項指標：原值、百分位、權重 | ⚪ | Each indicator: raw value, percentile, weight | Trace every score to its formula | ⚪ | 🟢 |
| Card Bullet (Step 5·c) | Top 10 驅動因子 + Top 5 敏感度標出 | ⚪ | Top 10 drivers + top 5 sensitivities flagged | Spot the top drivers and risks fast | ⚪ | 🟢 |

### Signal Index > Pricing

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 定價 — 按報告付費，或月訂閱。 | ⚪ | Pricing — pay per report, or monthly subscription. | Pricing — Pay per report. Or subscribe. | ⚪ | 🟢 |
| Tier Name (Standard) | Standard | ⚪ | Standard | Standard | ⚪ | 🟢 |
| Tier Price (Standard · Monthly label) | 月費 | ⚪ | Monthly fee | Monthly | ⚪ | 🟢 |
| Tier Credit (Standard · Credits label) | 點數 / 月 | ⚪ | Credits / month | Credits / mo | ⚪ | 🟢 |
| Tier Credit (Standard · approx) | 約 3 份 Brief | ⚪ | About 3 Briefs | Roughly 3 Briefs | ⚪ | 🟢 |
| Tier Bullet (Standard · 1) | 信箱送達 + 儀表板存取 | ⚪ | Email delivery + dashboard access | Email delivery + dashboard access | ⚪ | 🟢 |
| Tier Bullet (Standard · 2) | PDF 浮水印 + 稽核軌跡 | ⚪ | Watermarked PDFs + audit trail | Watermarked PDFs + audit trail | ⚪ | 🟢 |
| Tier Bullet (Standard · 3) | 月底未用點數歸零 | ⚪ | Unused credits reset at month end | Credits reset monthly | ⚪ | 🟢 |
| CTA primary (Standard) | 訂閱 | ⚪ | Subscribe | Subscribe | ⚪ | 🟢 |
| Tier Name (Pro · eyebrow) | 推薦 | ⚪ | Recommended | Recommended | ⚪ | 🟢 |
| Tier Price (Pro · Monthly label) | 月費 | ⚪ | Monthly fee | Monthly | ⚪ | 🟢 |
| Tier Credit (Pro · Credits label) | 點數 / 月 | ⚪ | Credits / month | Credits / mo | ⚪ | 🟢 |
| Tier Credit (Pro · approx) | 約 5 份 Brief | ⚪ | About 5 Briefs | Roughly 5 Briefs | ⚪ | 🟢 |
| Tier Bullet (Pro · 1, inherit) | Standard 全部 + 以下 | ⚪ | All of Standard, plus the below | Everything in Standard, plus: | ⚪ | 🟢 |
| Tier Bullet (Pro · 2) | 批次提交：早上 8 份 deck，當天回 | ⚪ | Batch submit: 8 decks in the morning, answered same-day | Batch submit — 8 morning decks, scored by EOD | ⚪ | 🟢 |
| Tier Bullet (Pro · 3) | 優先處理佇列（30 分鐘 SLA） | ⚪ | Priority queue (30-min SLA) | Priority queue (30-min SLA) | ⚪ | 🟢 |
| Tier Bullet (Pro · 4) | PDF + JSON 匯出 | ⚪ | PDF + JSON export | PDF + JSON export | ⚪ | 🟢 |
| CTA primary (Pro) | 訂閱 | ⚪ | Subscribe | Subscribe | ⚪ | 🟢 |
| Tier Price (Max · Monthly label) | 月費 | ⚪ | Monthly fee | Monthly | ⚪ | 🟢 |
| Tier Credit (Max · Credits label) | 點數 / 月 | ⚪ | Credits / month | Credits / mo | ⚪ | 🟢 |
| Tier Credit (Max · approx) | 約 7 份 Brief | ⚪ | About 7 Briefs | Roughly 7 Briefs | ⚪ | 🟢 |
| Tier Bullet (Max · 1, inherit) | Pro 全部 + 以下 | ⚪ | All of Pro, plus the below | Everything in Pro, plus: | ⚪ | 🟢 |
| Tier Bullet (Max · 2) | 專屬同儕池（自選 IPC 範圍） | ⚪ | Custom peer pool (self-select IPC scope) | Custom cohort selection (IPC / time bands) | ⚪ | 🟢 |
| Tier Bullet (Max · 3) | 月度 LP-report 摘要 | ⚪ | Monthly LP-report summary | Monthly LP-letter summary | ⚪ | 🟢 |
| Tier Bullet (Max · 4) | Slack / Teams 整合 | ⚪ | Slack / Teams integration | Slack / Teams hook for new Briefs | ⚪ | 🟢 |
| CTA primary (Max) | 訂閱 | ⚪ | Subscribe | Subscribe | ⚪ | 🟢 |

### Signal Index > Credits Reference Table

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Subheading | 按報告價目 | ⚪ | Per-report price list | Credits per query | ⚪ | 🟢 |
| Field Label (col · Action) | 動作 | ⚪ | Action | Action | ⚪ | 🟢 |
| Field Label (col · Credits) | 點數 | ⚪ | Credits | Credits | ⚪ | 🟢 |
| Field Label (col · Price) | 價格 | ⚪ | Price | Price | ⚪ | 🟢 |
| Field Label (col · Discount) | 折扣 | ⚪ | Discount | Top-up discount | ⚪ | 🟢 |
| Meta Label (Row · Brief) | Brief 評等報告 | ⚪ | Brief grade report | Brief grade report | ⚪ | 🟢 |
| Meta Label (Row · Pro upgrade) | Pro 深度升級（從 Brief） | ⚪ | Pro deep-dive upgrade (from Brief) | Pro deep-dive upgrade (from a Brief) | ⚪ | 🟢 |
| Meta Label (Row · Pro direct) | Pro 直接購買（累計 30 點） | ⚪ | Pro direct purchase (30 credits cumulative) | Pro direct purchase (30 cumulative) | ⚪ | 🟢 |
| Meta Label (Row · 50 pack) | 50 點頂入包 | ⚪ | 50-credit top-up pack | 50-credit top-up pack | ⚪ | 🟢 |
| Meta Label (Row · 150 pack) | 150 點頂入包 | ⚪ | 150-credit top-up pack | 150-credit top-up pack | ⚪ | 🟢 |
| Meta Label (Row · 500 pack) | 500 點頂入包 | ⚪ | 500-credit top-up pack | 500-credit top-up pack | ⚪ | 🟢 |

### Signal Index > CTA Band (Get your first Brief)

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading (line 1) | 同儕池專利來自國家級 | ⚪ | Peer-pool patents from national-grade | Peer-pool patents, from national | ⚪ | 🟢 |
| Section Heading (line 2) | 法人及學術研究單位 | ⚪ | institutions and academic research units | institutions and academic research | ⚪ | 🟢 |
| CTA primary | 取得第一份 Brief | ⚪ | Get your first Brief | Get your first Brief | ⚪ | 🟢 |

### Signal Index > FAQ

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 常見問題 | ⚪ | FAQ | FAQ | ⚪ | 🟢 |
| Card Title (Q1) | SABCD 等級是怎麼算出來的？ | ⚪ | How is the SABCD grade calculated? | How is the SABCD grade actually calculated? | ⚪ | 🟢 |
| Card Body (Q1) | Patent Strength Score (PSS) 引擎將每件專利分解為 50 個量化訊號——引用影響、法律強度、市場覆蓋、授權潛力、技術前瞻、同族廣度、維護生命力、競爭密度。八大支柱,各自獨立加權。透明 > 精準。 | ⚪ | The PSS engine decomposes every patent into 50 quantitative signals — citation impact, legal strength, market coverage, licensing potential, forward tech, family breadth, maintenance vitality, competitive density. 8 pillars, each independently weighted. Transparency > precision. | The **Patent Strength Score (PSS)** engine decomposes every patent into **50 quantitative signals** — citation impact, legal robustness, market coverage, licensing potential, forward technology, family breadth, maintenance vitality, competitive density. Eight pillars, each independently weighted. **Transparency over precision.** | ⚪ | 🟢 |
| Card Title (Q2) | 比較的同儕池是什麼？ | ⚪ | What's the peer pool I'm being compared against? | What pool are you comparing my patent against? | ⚪ | 🟢 |
| Card Body (Q2) | Signal 讀取你專利的 IPC 分類、技術領域與申請年代區間,配對 TIS 池內 100+ 同儕——由 Innovue WEBPAT 預先評分。同樣的 IP 池支援 TIS 授權平台的捆綁。這不是「對全球所有專利的百分位」。這是對你真正會競爭的對手的百分位。 | ⚪ | Signal reads your patent's IPC class, technical domain, and filing window, then matches 100+ peers from the TIS pool — pre-scored on Innovue WEBPAT. The same pool backs TIS Licensing bundles. This isn't "percentile vs every patent on Earth"; it's percentile vs the competitors you'll actually face. | Signal reads your patent's IPC class, technical domain, and filing window, then matches it to **100+ peers from the TIS pool** — pre-scored on Innovue WEBPAT. The same pool feeds bundles on the TIS Licensing Platform. This isn't "percentile vs every patent on Earth." It's percentile **vs the companies you'll actually compete with**. | ⚪ | 🟢 |
| Card Title (Q3) | 我可以看到每個分數是怎麼算出來的嗎？ | ⚪ | Can I see how each score is calculated? | Can I see how each score was calculated? | ⚪ | 🟢 |
| Card Body (Q3) | 可以。點開任一支柱：看到 5–8 項底層指標。點開任一指標：看到計算公式、原始數值、與同儕中位數。沒有「我們的模型說」。Signal 報告為資訊參考用途,並非法律或投資建議。 | ⚪ | Yes. Click any pillar to see 5–8 underlying indicators. Click any indicator to see the formula, raw value, and cohort median. No "our model says". Signal reports are informational reference — not legal or investment advice. | Yes. Click any pillar to see its 5–8 underlying indicators. Click any indicator to see the formula, the raw value, and the cohort median. **No "our model says."** Signal Briefs are informational — not legal or investment advice. | ⚪ | 🟢 |
| Card Title (Q4) | Brief 跟 Pro 擴充差在哪裡？ | ⚪ | What's the difference between Brief and Pro upgrade? | What's in a Brief vs the Pro extension? | ⚪ | 🟢 |
| Card Body (Q4) | Brief(15 點)涵蓋：SABCD 評等、PSS 強度、同儕百分位、組內排名、八大支柱雷達圖。Pro(+15 點)再加：50 指標摘要計分卡、評等理由、前 10 大強項(含貢獻百分比)、前 10 大風險(含敏感度分析)、跨場景穩定矩陣(授權／訴訟／併購)、授權策略 + 對手地圖、工作迴避指引(FTO hints)、50 指標完整透明、PDF + JSON 匯出。+15 點,30 秒內解鎖。 | ⚪ | Brief (15 pts) covers: SABCD verdict, PSS strength, peer percentile, cohort rank, 8-pillar radar. Pro (+15 pts) adds: 50-indicator summary scorecard, rating rationale, top 10 strengths (with contribution %), top 10 risks (with sensitivity analysis), cross-scenario stability matrix (licensing/litigation/M&A), licensing strategy + counter-party map, work-around guidance (FTO hints), full 50-indicator transparency, PDF + JSON export. +15 pts unlocks in 30 seconds. | **Brief (15 credits)** covers the SABCD verdict, PSS magnitude, peer percentile, cohort rank, and eight-pillar radar. **Pro (+15 credits)** adds the 50-indicator summary scorecard, rating rationale, top 10 strengths with contribution percentages, top 10 risks with sensitivity analysis, cross-scenario stability matrix (licensing / litigation / M&A), licensing strategy with counter-party map, work-around guidance (FTO hints), full 50-indicator drilldown with formulas, and PDF + JSON export. +15 credits upgrades a Brief to Pro in under thirty seconds. | ⚪ | 🟢 |
| Card Title (Q5) | 從送出到收到 Brief 需要多久？ | ⚪ | How long from submitting to receiving the Brief? | How long until the Brief lands in my inbox? | ⚪ | 🟢 |
| Card Body (Q5) | 三十分鐘。送出專利號 → PSS 引擎評分(15–20 min)→ Brief 寄達(30 min)。離開桌前,回來時 Brief 已在信箱。 | ⚪ | Thirty minutes. Submit a patent number → PSS engine scores (15–20 min) → Brief arrives (30 min). Walk away from your desk; come back to a finished Brief. | **Thirty minutes.** Submit a patent number → the PSS engine scores it (15–20 min) → the Brief lands in your inbox (30 min). Walk away from your desk; come back to a finished report. | ⚪ | 🟢 |

### Signal Index > Contact Form

> **1:1 with [Homepage › Contact Form](#homepage--contact-form)** for every field label, success message, and office-hours block. The only differences are the Inquiry Type default (`signal` vs `(none)`) and the dropdown option set — same as [Licensing Index › Contact Form](#licensing-index--contact-form) but defaulting to Signal:

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Field Label (Inquiry default) | Signal / 估值 | ⚪ | Signal / Valuation | Signal / valuation | ⚪ | 🟢 |

All other contact-form rows: see [Homepage › Contact Form](#homepage--contact-form). All dropdown options (Licensing / Signal / Press / General) are 1:1 with [Licensing Index › Contact Form](#licensing-index--contact-form) — edits to those rows land in both pages.

### Signal Index > Footer

> **Canonical content lives at [Homepage › Footer](#homepage--footer).** Byte-identical.

---

## Signal Lobby  (`website/product/signal/lobby.html`)

A stripped marketing surface between the product index and the external auth app (`signal.tisglobalinc.com/start`). Structurally mirrors `licensing/lobby.html` — only the gradient, accent, copy, pricing, and upstream link differ.

### Signal Lobby > Top Nav (stripped)

> **1:1 with [Licensing Lobby › Top Nav (stripped)](#licensing-lobby--top-nav-stripped).** Byte-identical stripped chrome (logo + language toggle only).

### Signal Lobby > H1 (sr-only)

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Hero Text (sr-only H1) | Signal — 開始使用 | ⚪ | Signal — get started | Signal — get started | ⚪ | 🟢 |

### Signal Lobby > Announcement Ticker

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Meta Label (Date · 1) | (absent) | — | — | 2026-05-22 | ⚪ | 🟢 |
| Body Para (Ticker 1) | 半導體產業池更新（Innovue 1.8 億件基底） | ⚪ | Semiconductor industry pool refreshed (Innovue 180M base) | Semiconductor industry pool refreshed (Innovue 180M base) | ⚪ | 🟢 |
| Meta Label (Date · 2) | (absent) | — | — | 2026-05-10 | ⚪ | 🟢 |
| Body Para (Ticker 2) | Pro 報告現可於 25 分鐘內交付 | ⚪ | Pro reports can now ship in 25 minutes | Pro reports now ship in 25 minutes | ⚪ | 🟢 |
| Meta Label (Date · 3) | (absent) | — | — | 2026-04-28 | ⚪ | 🟢 |
| Body Para (Ticker 3) | 生醫 IPC 子類別加入同儕比對 | ⚪ | Biomedical IPC sub-class added to peer comparison | Biomedical IPC sub-class added to peer matching | ⚪ | 🟢 |

### Signal Lobby > Left Panel (Marketing)

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Hero Text | 你的 SABCD 評等，從這裡開始。 | ⚪ | Your SABCD grade starts here. | Your SABCD grade starts here. | ⚪ | 🟢 |
| Card Bullet (Prop 1) | SABCD 評等簡報直送信箱 — 30 分鐘內，而非數週。 | ⚪ | SABCD-graded Brief sent direct to inbox — within 30 minutes, not weeks. | SABCD-graded Briefs in your inbox — in 30 minutes, not weeks. | ⚪ | 🟢 |
| Card Bullet (Prop 2) | 同儕池基準比對 — 對齊產業群組，而非全市場。 | ⚪ | Peer-pool benchmark — aligned to industry group, not whole market. | Peer-pool benchmarks — apples to apples against your industry cohort. | ⚪ | 🟢 |
| Card Bullet (Prop 3) | 點數方案每月 NT$4,900–9,900，依需求逐次付費，彈性擴張。 | ⚪ | Credit plans NT$4,900–9,900/month — pay per usage, scale flexibly. | Credit packs from NT$4,900–9,900/mo. Pay per Brief, scale on demand. | ⚪ | 🟢 |

### Signal Lobby > Partner Strip

> **1:1 with [Homepage › Partner Strip](#homepage--partner-strip).** Same byte-identical eyebrow — `泰然策略合作夥伴` / `TIS Strategic Partners`.

### Signal Lobby > Right Panel (Auth) — Sign-up tab

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 建立你的帳號 | ⚪ | Create your account | Create your account | ⚪ | 🟢 |
| Section Subheading | 建立帳號以在 30 分鐘內取得你的第一份 Brief，或登入管理你的點數。 | ⚪ | Create an account to get your first Brief in 30 minutes, or log in to manage your credits. | Create an account to get your first Brief in 30 minutes, or sign in to manage your credits. | ⚪ | 🟢 |
| Field Label (Company) | 公司 | ⚪ | Company | Company | ⚪ | 🟢 |
| Field Label (Work email) | 公司電子郵件 | ⚪ | Company email | Work email | ⚪ | 🟢 |
| Field Label (Password) | 密碼 | ⚪ | Password | Password | ⚪ | 🟢 |
| CTA primary (Create) | 建立帳號 | ⚪ | Create account | Create account | ⚪ | 🟢 |
| Body Para (cross-link prefix) | 已有帳號？ | ⚪ | Already have an account? | Already have an account? | ⚪ | 🟢 |
| Link Label (cross-link · Log in) | 登入 | ⚪ | Log in | Log in | ⚪ | 🟢 |

> **Note** — Section Heading + Field Labels + Sign-up CTA + cross-link are **byte-identical** with [Licensing Lobby › Right Panel (Sign-up tab)](#licensing-lobby--right-panel-auth--sign-up-tab). Only the **Section Subheading** differs (Brief in 30 minutes vs 30-patent bundle).

### Signal Lobby > Right Panel (Auth) — Log-in tab

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Section Heading | 歡迎回來 | ⚪ | Welcome back | Welcome back | ⚪ | 🟢 |
| Section Subheading | 你的 Brief 與點數餘額都在原處等你。 | ⚪ | Your Briefs and credit balance are right where you left them. | Your Briefs and credit balance are right where you left them. | ⚪ | 🟢 |
| Field Label (Work email) | 公司電子郵件 | ⚪ | Company email | Work email | ⚪ | 🟢 |
| Field Label (Password) | 密碼 | ⚪ | Password | Password | ⚪ | 🟢 |
| Link Label (Forgot password) | 忘記密碼？ | ⚪ | Forgot password? | Forgot password? | ⚪ | 🟢 |
| CTA primary (Log in) | 登入 | ⚪ | Log in | Log in | ⚪ | 🟢 |
| Body Para (cross-link prefix) | 第一次使用 TIS Signal？ | ⚪ | First time using TIS Signal? | New to TIS Signal? | ⚪ | 🟢 |
| Link Label (cross-link · Create) | 建立帳號 | ⚪ | Create account | Create an account | ⚪ | 🟢 |

> **Note** — Section Heading + Field Labels + Log-in CTA + Forgot-password link are **byte-identical** with [Licensing Lobby › Right Panel (Log-in tab)](#licensing-lobby--right-panel-auth--log-in-tab). Only the **Section Subheading** and **cross-link prefix** differ (Briefs+credits vs bundles; TIS Signal vs TIS Licensing).

### Signal Lobby > Slim Footer

| Element | ZH | ZH Status | Literal EN | EN | EN Status | Shipped |
|---|---|---|---|---|---|---|
| Footer Body (Copyright) | © 2026 泰然策略解密 | ⚪ | © 2026 Tai-Ran Strategy Decryption | © 2026 Talent Intelligence Strategies | ⚪ | 🟢 |
| Link Label (Back) | ← 返回 Signal 產品頁 | ⚪ | ← Back to Signal product page | ← Back to Signal | ⚪ | 🟢 |

> **Note** — Copyright string is **byte-identical** with [Licensing Lobby › Slim Footer](#licensing-lobby--slim-footer). Only the **back-link** differs (product href + visible page name).
