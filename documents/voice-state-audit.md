# Voice-state audit — the shipped site vs `brand-voice.md`

**Audit date:** 2026-08-07 · **Scope:** all 10 live pages · **Status: findings only. No copy was rewritten.**

This is the raw material for the voice rewrite, not the rewrite. It answers one question —
*where does the shipped copy diverge from the voice the brand system claims?* — and records
the answer per finding, with file and line, so the rewrite session can start from evidence
instead of re-reading 11 pages.

## Method

Copy was extracted by parsing each page into a DOM tree and taking, per element, the visible
EN text plus its `data-zh` / `data-zh-html` sibling. **A node counts as translated if it or
any descendant carries `data-zh`** — the ZH usually lives on an inner `<span>`, so a flat
attribute grep reports the homepage H1 as untranslated when it isn't. Every coverage number
below uses the tree, not the grep.

Checked against `brand/brand-voice.md` §2 tone anchor, §3 anti-hype, §4 banned phrases,
§5 anchor numbers, §6 date format, §7 Innovue attribution. That file lives **only** in the
brand monorepo — see finding 7 — so this audit had to read it from outside this repo.

`product/signal/index.v08-concept.html` is excluded — it is a `noindex` concept page.

The Δ-divergence vocabulary is reused from
[`licensing-copy-comparison.md`](licensing-copy-comparison.md) rather than reinvented.

**Corpus:** 1,271 copy units across 10 pages; 365 of them are headline / subhead / dek /
eyebrow / CTA / form label (the appendix inventory), the rest is body prose and UI strings.

---

## Findings, ranked

| # | Finding | Severity | Scope |
|---|---|---|---|
| 1 | A production page ships `[PAGE SCAFFOLDING \| COPY NOT WORKED ON]` in its hero | **Live defect** | `product/licensing/badge.html` |
| 2 | Anchor numbers render four different ways; §5 requires one | **Systematic** | 6 pages |
| 3 | EN and ZH have diverged in meaning — ZH advanced, EN did not | **Systematic** | 59 strings, 10 pages |
| 4 | `brand-voice.md` bans a word that `positioning.md` uses in the locked one-liner | **Brand-system contradiction** | 5 site strings |
| 5 | "starting at NT$3,390/month" — §5 explicitly bans this construction | Rule violation | licensing |
| 6 | Bare tier letters in chips; §4 requires the full `Tier S` token | Rule violation | 2 pages, 6 chips |
| 7 | **`brand-voice.md` is mirrored into no consumer repo** — the voice authority is unreachable from here | **Structural — likely cause of 2 and 3** | all repos |
| 8 | The copy-tracking docs the conventions depend on were deleted | Process gap | `documents/` |
| 9 | ZH coverage is 87% and nothing records which ZH was reviewed | Coverage | all pages |
| 10 | Innovue is credited 0 times on the Licensing page body | Attribution gap | licensing |
| 11 | Five EN strings pair with two different ZH across pages | Consistency | 5 strings |

---

## 1. `badge.html` ships a scaffolding marker to production

`product/licensing/badge.html:236` renders, in the hero, directly under the subhead:

> **[PAGE SCAFFOLDING | COPY NOT WORKED ON]**

This is **live**. `curl https://tisglobalinc.com/product/licensing/badge.html` returns 200,
the page carries **no `noindex`**, it has a canonical URL and OG tags, and the Licensing page
links to it from **five** places (`index.html:2130`, and the four `wa-col` anchors at
`:2389`, `:2401`, `:2413`, `:2425`).

It is also the least-translated page on the site at **64%**.

This is the one finding in this document that is not a voice question. It should not wait
for the rewrite.

---

## 2. Anchor numbers render four ways — §5 requires exactly one

§5 is explicit: *"Render exactly — do not paraphrase, do not round, do not soften… Variation
reads as approximation and breaks the evidence-driven voice."* The site varies all of them,
and the variation is not random: it splits along **numeral vs. spelled-out**, in both languages.

| Anchor (§5 canonical) | Renderings found | Where |
|---|---|---|
| **180M-patent database** | `180M-patent` ×3 · `180M` ×3 · `180M patent` (no hyphen) · `180 m` | signal:2121, home:424, about:502 |
| — ZH side | `1.8 億` ×4 · `一億八千萬` (spelled out) | lobby:364/371/408, home:424 · about:496 |
| **3rd-largest globally** | `3rd-largest` ×2 · `third-largest` | about:496 |
| **50 indicators** | `50 indicators` ×15 · `Fifty indicators` · `fifty indicators` | methodology:225, about:496 |
| — ZH side | `50 項` ×16 · `五十項` ×2 · `50 個` | about:496, home:424 |
| **S to D** | `S to D` ×3 · `S–D` ×6 | about:430/496 · home:355, methodology:226/266 |
| **8 pillars** | `8 pillars` · `Eight pillars` · ZH `8 大支柱` / `八大支柱` | signal:2016, methodology:225 |

The cleanest illustration is `about/index.html:496`, which breaks three anchors in one
sentence — `fifty indicators`, `third-largest`, and `一億八千萬` — while `home:424` says the
same three things as `50 indicators`, `3rd-largest`, `1.8 億`.

**Note for the rewrite:** §5 gives the canonical EN form but is silent on the **ZH** form of
each anchor. `1.8 億` vs `一億八千萬` is currently unadjudicated, so this is a gap in the
rule, not only in the copy. Decide the ZH canon and add it to §5.

---

## 3. EN and ZH have diverged in meaning

**59 strings** carry a number on one side that is absent on the other — an objective signal
of semantic divergence, since an anchor number should survive translation.

| Page | Δnum strings |
|---|---|
| `product/licensing` | 18 |
| `product/signal` | 12 |
| `product/signal/sample-report.html` | 7 |
| `about` | 5 |
| `product/signal/methodology.html` | 5 |
| home · lobby | 3 each |
| patents · badge · reports | 2 each |

The mechanism is already documented in [`licensing-copy-comparison.md`](licensing-copy-comparison.md):
the **ZH was updated to the insurance-metaphor direction and the EN was left on the older
positioning.** That doc marks nearly every hero row `⚠️ EN↔ZH` and records the direction doc's
own note that EN is *"TBD … flagged for Miko-lock."*

Representative pairs:

| Loc | EN (shipped) | ZH (shipped) | Literal ZH |
|---|---|---|---|
| licensing:1972 | Thirty patents, none of the overhead. | 30 件專利包輕裝上陣。 | The 30-patent bundle deploys light. |
| licensing:1975 | Pick country × industry × term — two paths, five SABCD grades. | 1 分鐘勾選國家 × 產業 × 期別，2 種專利包選法，5 類專利評級， | *1 minute* to tick country × industry × term… |
| nav dropdown (all 10 pages) | Patent insurance for exporters. Curated **30** patent bundles, fast to activate. | 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | Curated matching bundles… saves time, effort and budget. *(no "30")* |

That last row is **shared chrome duplicated across every page** (nav + mobile drawer, 20
instances). The ZH drops the `30` anchor entirely and adds a benefit claim the EN doesn't
make. One fix lands site-wide.

If "the voice is outdated" refers to anything specific, this is the strongest candidate:
**the English is a layer behind the Chinese.**

---

## 4. The brand system contradicts itself on "unlock"

`brand-voice.md` §4 bans **"Unlock"** — *"Corporate fog. Replace with the concrete action."*

`positioning.md` uses it in the **locked EN one-liner**:

> "Patents are the most undervalued asset of our time. We make their value seen, measured,
> and unlocked."

and builds the verb triad **seen · measured · unlocked / 被看見 · 被衡量 · 被釋放** on it,
mapping to the three parts of the business model. The root `CLAUDE.md` repeats it as the
founding idea.

So all five site hits are **faithful to positioning.md**, not drift:

| Loc | String |
|---|---|
| home:319 | We make their value seen, measured, and unlocked. |
| home:346 | We unlock the value of patents. |
| home:402 | …here to make patent value seen, measured, and unlocked. |
| about:442 | Three ways we unlock value |

**This is not a copy fix.** One of the two brand docs has to yield: either §4 carves out the
positioning triad by name, or positioning.md picks a different verb — which would mean
re-cutting the triad, the ZH `被釋放`, and the root CLAUDE.md line. Recommend the carve-out.

The only other banned-phrase hit site-wide is ZH **`完全`** at `patents:695`
(`泰然完全自有的專利…`). That is genuinely one to fix.

**Everything else is clean** — zero hits for AI-powered, revolutionary, disruptive,
game-changing, empower/賦能, seamless, cutting-edge, world-class, best-in-class, leverage,
actionable insights, "solutions" as a category, trusted by, industry-leading, or the
may/could/helps-you hedges. The anti-hype discipline is holding; the problems are elsewhere.

---

## 5. Price rendering violates §5

§5 gives the band as **`NT$3,390–9,990/month`** and says explicitly: *"Not 'starting at NT$X,'
not 'from NT$X.'"*

- `product/licensing:1943` — "30-patent bundles **starting at** NT$3,390/month." / ZH「每月 NT$3,390 **起**。」 Both sides use the banned construction.
- `product/signal/lobby.html:394` — "Credit packs **from** NT$4,900–9,900/mo." This is Signal
  credit packs, a different product, so the band is not the Licensing one — but "from" is the
  same banned pattern, and **§5 has no anchor entry for Signal pricing at all.** Worth adding
  so this stops being unadjudicated.
- `product/licensing:2472` — `NT$8,990` renders with no ZH.

---

## 6. Bare tier letters

§4: *"render the full token — `Tier S`, `Tier A`… never the bare letter; the letter alone
loses meaning when the chip travels out of context."*

| Loc | Element | Content |
|---|---|---|
| `methodology.html:257–261` | `.tier-chip--{s,a,b,c,d}` | `S` `A` `B` `C` `D` |
| `product/signal:2057` | `.vb2-tier` | `A` |

These are also six of the untranslated strings, so the fix closes two findings.

---

## 7. The voice authority is not reachable from this repo

`website/CLAUDE.md`'s red line, and `DESIGN.md` §0.1, both say the same thing:

> `brand/` (mirrored here as `designs/*-snapshot.md`) owns tokens, colour, logo, imagery
> rules, **voice**.

`designs/` contains four snapshots — `design-tokens`, `primitives`, `components`,
`visual-guide`. **There is no voice snapshot.** `brand-voice.md` exists only at
`brand/brand-voice.md` and is mirrored into **no** consumer repo — not `website/`, not
`vc-signal/`, not `licensing-platform/worktemp/brand-snapshots/`.

So every rule this audit measured against — the banned-phrase list, the anchor numbers, the
Innovue registers — is invisible to anyone working inside the website repo, and to any agent
that reads `CLAUDE.md` and then looks in `designs/` for the thing it names.

That is the most plausible mechanical explanation for findings 2, 3 and 5: **the tokens
stayed consistent because their spec is mirrored where the work happens, and the voice
drifted because its spec is not.** The design system got the DAG; the voice never did.

Two ways to close it — mirror `brand-voice.md` into each consumer `designs/` as
`brand-voice-snapshot.md` on the existing resync flow, or amend the red line in both
`CLAUDE.md` and `DESIGN.md` to say voice lives upstream only and give the path. The first is
consistent with how every other brand doc is handled.

Note the same gap applies to `positioning.md`, which finding 4 shows is load-bearing for
site copy and is likewise mirrored nowhere.

---

## 8. The copy-tracking infrastructure was deleted

The conventions this project works by — `🚀` = live in production only after `git push`
lands, a local edit staying `✏️ ✅`, and the ZH `✓` column tracking *external* review of
user-authored Chinese (`☐` pending / `✅` approved / `❓` flagged / blank = original) — lived
in `documents/copy-audit-v1.md` and `copy-audit-v2.md`.

**Both were deleted** in commit `7c62e59` ("Signal pricing rework… copy-audit cleanup").

`licensing-copy-comparison.md` still cites `copy-audit-v1.md` throughout — its Status legend
says *"same as copy-audit-v1.md"* — and `CHANGELOG.md` references it twice. Those are all
dangling. Anyone following the convention has nowhere to look it up, which is why the
convention now survives only in operator memory.

Related: `documents/licensing-page-prd.md` is cited by `licensing-copy-review.html` and was
cited by `DESIGN.md` and `PRODUCT.md` until 2026-08-07. It has never existed in this repo.

Decide during the rewrite whether the tracker comes back or the comparison doc absorbs it.
Do not leave it pointing at a deleted file.

---

## 9. ZH coverage — 87%, and unverified

| Page | Units | Translated | Gap | Coverage |
|---|---|---|---|---|
| `product/licensing` | 208 | 199 | 9 | **96%** |
| `home` · `lobby` | 144 / 28 | 134 / 26 | 10 / 2 | 93% |
| `product/signal` | 239 | 219 | 20 | 92% |
| `sample-report.html` | 94 | 86 | 8 | 91% |
| `reports` | 97 | 87 | 10 | 90% |
| `patents` | 70 | 62 | 8 | 89% |
| `about` | 99 | 87 | 12 | 88% |
| `methodology.html` | 197 | 146 | 51 | **74%** |
| `badge.html` | 95 | 61 | 34 | **64%** |
| **All** | **1,271** | **1,107** | **164** | **87%** |

Pure-numeral strings are excluded (a sectional `01` needs no translation).

**Four of every page's gaps are shared chrome and are correct as-is:** the `Skip to content`
skip-link, the `English` / `中文` toggle labels (each must render in its own language), and
the `Esc` key name. That is ~40 of the 164. The real gap is ~124, concentrated in
`badge.html` and `methodology.html`.

Nothing in the HTML marks which of the 1,107 translated strings has been reviewed by a native
speaker. The `✓` column existed to record that and is gone (finding 8).

---

## 10. Innovue attribution

§7 sets two registers: co-developer/shareholder framing on About and first-touch marketing;
credential-only (`Powered by Innovue`, `Innovue's 180M-patent database`) on product and
transactional surfaces. And: *"not every repeated mention on a long page — once at the top,
then TIS voice takes over."*

| Page | Mentions in source | Register |
|---|---|---|
| `home` | 28 | co-developer ×1 — correct for first-touch, but 28 raw occurrences on one page is well past "once at the top" |
| `about` | 24 | co-developer ×2 — correct register |
| `product/signal` | 15 | credential ×1 — correct register |
| `reports` | 7 | — |
| `lobby` | 6 | credential (`Innovue 180M base`) |
| `patents` | 5 | — |
| `methodology.html` | 3 | — |
| **`product/licensing`** | **2** | **both in the footer lockup — zero in the page body** |
| `badge.html` · `sample-report.html` | 2 each | — |

Two things to settle:

- **Licensing credits Innovue nowhere in its body**, yet `DESIGN.md` §15.1 states "Credit
  Innovue once near the top." Either the page is wrong or the per-page note is.
- At `product/signal:1931` the attribution is **split across elements** — a `<span>` reading
  `Powered by` with no `data-zh`, adjacent to the mark. It reads correctly in EN and silently
  half-translates in ZH.

The §7 rule *"never merge into 'Powered by Innovue and ITRI'"* is not violated anywhere.

---

## 11. Same EN, different ZH across pages

The standing pre-edit check. Only **5** collisions, and three are benign:

| EN | ZH variants | Verdict |
|---|---|---|
| **How it works** | 如何運作 (licensing ×4) · 運作方式 (methodology:455) | **Fix** — same label, two translations |
| **Features** | 方案內容 (licensing:2488) · 功能比較 (signal:2425) | **Check** — "plan contents" vs "feature comparison" are different claims |
| **Build your bundle** | 試跑專利包 (licensing:1979) · 打造你的專利包 (licensing:2469) | **Fix** — same page. `licensing-copy-comparison.md` records 試跑專利包 as the adopted slide-11 verb; 打造 is the superseded form |
| See a sample report → | 檢視報告樣本 → · 看一份評級報告 → | Acceptable — different destinations |
| About | 關於 · 關於 + TIS mark span | Benign — markup difference, not copy |

---

## Dates

**Clean.** Every date on the site renders ISO `YYYY-MM-DD` (`2026-03-26`, `2026-01-15`,
`2025-11-20`, `2025-09-04`). No `MM/DD/YYYY`, no `Jan 15, 2026`, no `2026年1月`. §6 holds.

---

## What this feeds

The rewrite session should take these in order, because the later ones depend on the earlier:

1. **Ship the `badge.html` fix now** — it is a live defect, not a voice decision (§1).
2. **Adjudicate the two brand-system questions** before touching page copy: the `unlock`
   carve-out (§4) and the ZH canon for each anchor number (§2). Both are `brand/` edits, and
   writing page copy against unresolved rules just moves the problem.
3. **Decide the EN↔ZH direction of travel** (§3). Every remaining decision depends on whether
   EN is brought up to the ZH's insurance-metaphor positioning or the ZH is pulled back. This
   is the actual "voice is outdated" question.
4. Then the mechanical passes: anchor-number normalisation, the `starting at` / `from`
   constructions, tier tokens, the 5 cross-page ZH collisions, and the ~124 real ZH gaps.
5. **Restore or replace the copy tracker** (finding 8) before the rewrite starts, so the work has
   somewhere to record status and ZH review.

---

## Appendix — copy inventory

365 rows: every headline, subhead, dek, eyebrow, CTA and form label on the 10 live pages, in
EN and ZH, with flags. Shared chrome (nav, drawer, search, footer, announce bar, IP-drop
popup) is excluded — it is identical on every page and would triple the table.

Flags: `` `ZH GAP` `` no ZH · `` `Δnum` `` a number appears on one side only · `` `banned` ``
a §4 phrase.

Line numbers are navigation aids, not contracts — grep the string, not the number.

### `index.html` — 57 rows

| Line | Kind | EN | ZH | Flags |
|---|---|---|---|---|
| 149 | dek | Licensing Platform | 泰然專利防護網 |  |
| 152 | dek | Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | `Δnum` |
| 159 | dek | Patent Evaluation | 泰然專利強度評級系統 |  |
| 162 | dek | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 |  |
| 170 | CTA | Contact sales | 聯絡業務 |  |
| 223 | headline | The patent moves that matter. | 重要的專利動態。 |  |
| 322 | CTA | See the methodology | 看我們的評分方法 |  |
| 323 | CTA | See how | 看我們怎麼做 |  |
| 346 | headline | We unlock the value of patents. | 我們釋放專利的價值。 | `banned` |
| 347 | dek | Three ways we put patent value to work. | 我們把專利價值化為實用的三種方式。 |  |
| 353 | eyebrow | 01 | — | `ZH GAP` |
| 365 | eyebrow | 02 | — | `ZH GAP` |
| 377 | eyebrow | 03 | — | `ZH GAP` |
| 401 | headline | Who we are | 我們是誰 |  |
| 402 | dek | Taiwan-rooted, globally active — here to make patent value seen, measured, and unlocked. | 根植台灣、放眼全球——讓專利的價值被看見、被衡量、被釋放。 | `banned` |
| 409 | headline | About | 關於 <span class="tis-mark" role="img" aria-label="TIS"></span> |  |
| 423 | headline | Partnership | <span class="innovue-wm" role="img" aria-label="Innovue"></span> 夥伴關係 |  |
| 424 | dek | Co-developed with our shareholder Innovue, the SABCD rating engine grades every patent S to D across 50 indicators — against Innovue's 180M-patent database. | 我們與股東 Innovue 共同開發的 SABCD 評級引擎，以五十項指標為每件專利評出 S 到 D 的等級，背後是 Innovue 的 1.8 億件專利資料庫。 | `Δnum` |
| 447 | headline | Strategic Partners | 策略合作夥伴 |  |
| 476 | headline | Latest reports | 最新報告 |  |
| 477 | dek | Quarterly reads on the IP landscape — how patent positions shift across industries and jurisdictions. | 每季解讀 IP 地形——專利佈局如何在各產業與司法管轄區之間移動。 |  |
| 497 | eyebrow | Q1 2026 | — | `ZH GAP` |
| 498 | subhead | Taiwan Drone Patent Landscape Report | 台灣無人機專利地形分析 |  |
| 499 | dek | A read on Taiwan's UAV patent terrain — who holds the flight-control, propulsion, and payload claim families, and where the white space remains. | 盤點台灣無人機專利地形——飛控、動力與酬載請求項家族的持有分布，以及尚未佈局的空白地帶。 |  |
| 508 | eyebrow | Q4 2025 | — | `ZH GAP` |
| 509 | subhead | Japanese Enterprise Patent Sell-Off Flow Report | 日本企業專利出清流向分析 |  |
| 510 | dek | Tracking the patents Japanese corporates are divesting and where they land — the acquirers, the brokers, and the jurisdictions absorbing the outflow. | 追蹤日本企業出清專利的流向——買方、仲介，以及吸納這波釋出的司法管轄區。 |  |
| 519 | eyebrow | Q3 2025 | — | `ZH GAP` |
| 520 | subhead | Taiwan Patent Transfer Market Report | 台灣專利轉讓市場：買家、賣家與仲介商分析報告 |  |
| 521 | dek | The players moving patents through Taiwan's assignment market — who's buying, who's selling, and the brokers sitting between them. | 解構台灣專利轉讓市場的參與者——誰在買、誰在賣，以及居中促成交易的仲介商。 |  |
| 530 | eyebrow | Q2 2025 | — | `ZH GAP` |
| 531 | subhead | Power & Thermal Management Patent Report | 能源電源管理與熱管理專利技術分析 |  |
| 532 | dek | A technology read on power-management and thermal-management patents across energy systems — where claim density concentrates and where positions overlap. | 能源系統中電源管理與熱管理專利的技術解讀——請求項密度集中之處，以及佈局重疊的區段。 |  |
| 550 | headline | Press releases | 新聞稿 |  |
| 551 | dek | Company news, partnership announcements,and select press coverage. | 公司動態、合作公告與精選媒體報導。 |  |
| 571 | eyebrow | 2026-03-26 | — | `ZH GAP` |
| 572 | subhead | NYCU research patents enter the TIS licensing pipeline. | 陽明交大研究專利進入 TIS 授權管道。 |  |
| 573 | dek | A direct channel from the university's labs to commercial licensing, opening NYCU-held research patents to TIS clients. | 一條從陽明交大實驗室直通商業授權的管道，將校方持有的研究專利開放給 TIS 客戶。 |  |
| 583 | eyebrow | 2026-01-15 | — | `ZH GAP` |
| 584 | subhead | III and TIS turn digital-transformation research into licensable IP. | 資策會與 TIS 將數位轉型研究轉化為可授權的智財。 |  |
| 585 | dek | Joint work to package III's digital-transformation research into IP that Taiwan's industries can license and build on. | 攜手將資策會的數位轉型研究，整理為台灣產業可授權、可延伸應用的智財。 |  |
| 595 | eyebrow | 2025-11-20 | — | `ZH GAP` |
| 596 | subhead | ITRI's iPIC brings industrial-grade patents into the TIS licensing network. | 工研院 iPIC 將工業級專利導入 TIS 授權網絡。 |  |
| 597 | dek | ITRI's patent-pool arm feeds applied, industry-tested patents into the TIS network, deepening the bundles available to license. | 工研院專利池為 TIS 網絡注入經產業驗證的應用型專利，擴充可供授權的組合深度。 |  |
| 607 | eyebrow | 2025-09-04 | — | `ZH GAP` |
| 608 | subhead | TIS and Innovue forge the founding partnership behind every deliverable. | TIS 與 Innovue 締結奠基合作，撐起每一項交付成果。 |  |
| 609 | dek | The founding alliance: Innovue's IP intelligence platform and expertise underpin every analysis and report TIS produces. | 奠基的結盟——Innovue 的 IP 情報平台與專業，撐起 TIS 每一份分析與報告。 |  |
| 629 | headline | Get in touch. | 與我們聯絡。 |  |
| 630 | dek | From one patent to a whole portfolio, tell us what you need. | 從一件專利到整個專利組合，告訴我們您的需求。 |  |
| 648 | form label | Full Name | 姓名 |  |
| 652 | form label | Job Title | 職稱 |  |
| 658 | form label | Email Address | 電子郵件 |  |
| 662 | form label | Phone Number | 電話 |  |
| 667 | form label | Organization | 機構 |  |
| 686 | form label | Your Inquiry | 您的需求 |  |
| 690 | CTA | Send Inquiry | 送出諮詢 |  |
| 699 | subhead | Message sent. | 訊息已送出。 |  |

### `about/index.html` — 32 rows

| Line | Kind | EN | ZH | Flags |
|---|---|---|---|---|
| 322 | dek | Licensing Platform | 泰然專利防護網 |  |
| 325 | dek | Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | `Δnum` |
| 332 | dek | Patent Evaluation | 泰然專利強度評級系統 |  |
| 335 | dek | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 |  |
| 343 | CTA | Contact sales | 聯絡業務 |  |
| 401 | headline | About Talent Intelligence Strategies | 關於泰然策略解密 |  |
| 418 | headline | Why we exist | 我們為何存在 |  |
| 421 | form label | The problem | 問題所在 |  |
| 425 | form label | Our response | 我們的回應 |  |
| 429 | form label | The rating engine | 評級引擎 |  |
| 433 | form label | The cornerstone | 一切的基石 |  |
| 442 | headline | Three ways we unlock value | 釋放價值的三種方式 | `banned` |
| 447 | eyebrow | 01 | — | `ZH GAP` |
| 457 | eyebrow | 02 | — | `ZH GAP` |
| 467 | eyebrow | 03 | — | `ZH GAP` |
| 495 | headline | Built with . | 與 <span class="innovue-wordmark" role="img" aria-label="Innovue"></span> 共同打造。 |  |
| 500 | eyebrow | Proprietary database | 專屬資料庫 |  |
| 501 | headline | M 0 | — | `ZH GAP` |
| 505 | eyebrow | Jurisdiction coverage | 司法管轄區覆蓋 |  |
| 506 | headline | + 0 | — | `ZH GAP` |
| 512 | CTA | See the PSS methodology | 看 PSS 評分方法 |  |
| 524 | headline | Board of Directors | 董事會成員 |  |
| 566 | headline | Get in touch. | 與我們聯絡。 |  |
| 567 | dek | From one patent to a whole portfolio, tell us what you need. | 從一件專利到整個專利組合，告訴我們您的需求。 |  |
| 585 | form label | Full Name | 姓名 |  |
| 589 | form label | Job Title | 職稱 |  |
| 595 | form label | Email Address | 電子郵件 |  |
| 599 | form label | Phone Number | 電話 |  |
| 604 | form label | Organization | 機構 |  |
| 623 | form label | Your Inquiry | 您的需求 |  |
| 627 | CTA | Send Inquiry | 送出諮詢 |  |
| 636 | subhead | Message sent. | 訊息已送出。 |  |

### `reports/index.html` — 43 rows

| Line | Kind | EN | ZH | Flags |
|---|---|---|---|---|
| 165 | dek | Licensing Platform | 泰然專利防護網 |  |
| 168 | dek | Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | `Δnum` |
| 175 | dek | Patent Evaluation | 泰然專利強度評級系統 |  |
| 178 | dek | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 |  |
| 186 | CTA | Contact sales | 聯絡業務 |  |
| 262 | headline | Latest reports | 最新報告 |  |
| 263 | dek | Quarterly reads on the IP landscape — how patent positions shift across industries and jurisdictions. | 每季解讀 IP 地形——專利佈局如何在各產業與司法管轄區之間移動。 |  |
| 283 | eyebrow | Q1 2026 | — | `ZH GAP` |
| 284 | subhead | Taiwan Drone Patent Landscape Report | 台灣無人機專利地形分析 |  |
| 285 | dek | A read on Taiwan's UAV patent terrain — who holds the flight-control, propulsion, and payload claim families, and where the white space remains. | 盤點台灣無人機專利地形——飛控、動力與酬載請求項家族的持有分布，以及尚未佈局的空白地帶。 |  |
| 294 | eyebrow | Q4 2025 | — | `ZH GAP` |
| 295 | subhead | Japanese Enterprise Patent Sell-Off Flow Report | 日本企業專利出清流向分析 |  |
| 296 | dek | Tracking the patents Japanese corporates are divesting and where they land — the acquirers, the brokers, and the jurisdictions absorbing the outflow. | 追蹤日本企業出清專利的流向——買方、仲介，以及吸納這波釋出的司法管轄區。 |  |
| 305 | eyebrow | Q3 2025 | — | `ZH GAP` |
| 306 | subhead | Taiwan Patent Transfer Market Report | 台灣專利轉讓市場：買家、賣家與仲介商分析報告 |  |
| 307 | dek | The players moving patents through Taiwan's assignment market — who's buying, who's selling, and the brokers sitting between them. | 解構台灣專利轉讓市場的參與者——誰在買、誰在賣，以及居中促成交易的仲介商。 |  |
| 316 | eyebrow | Q2 2025 | — | `ZH GAP` |
| 317 | subhead | Power & Thermal Management Patent Report | 能源電源管理與熱管理專利技術分析 |  |
| 318 | dek | A technology read on power-management and thermal-management patents across energy systems — where claim density concentrates and where positions overlap. | 能源系統中電源管理與熱管理專利的技術解讀——請求項密度集中之處，以及佈局重疊的區段。 |  |
| 336 | headline | Press releases | 新聞稿 |  |
| 337 | dek | Company news, partnership announcements,and select press coverage. | 公司動態、合作公告與精選媒體報導。 |  |
| 357 | eyebrow | 2026-03-26 | — | `ZH GAP` |
| 358 | subhead | NYCU research patents enter the TIS licensing pipeline. | 陽明交大研究專利進入 TIS 授權管道。 |  |
| 359 | dek | A direct channel from the university's labs to commercial licensing, opening NYCU-held research patents to TIS clients. | 一條從陽明交大實驗室直通商業授權的管道，將校方持有的研究專利開放給 TIS 客戶。 |  |
| 369 | eyebrow | 2026-01-15 | — | `ZH GAP` |
| 370 | subhead | III and TIS turn digital-transformation research into licensable IP. | 資策會與 TIS 將數位轉型研究轉化為可授權的智財。 |  |
| 371 | dek | Joint work to package III's digital-transformation research into IP that Taiwan's industries can license and build on. | 攜手將資策會的數位轉型研究，整理為台灣產業可授權、可延伸應用的智財。 |  |
| 381 | eyebrow | 2025-11-20 | — | `ZH GAP` |
| 382 | subhead | ITRI's iPIC brings industrial-grade patents into the TIS licensing network. | 工研院 iPIC 將工業級專利導入 TIS 授權網絡。 |  |
| 383 | dek | ITRI's patent-pool arm feeds applied, industry-tested patents into the TIS network, deepening the bundles available to license. | 工研院專利池為 TIS 網絡注入經產業驗證的應用型專利，擴充可供授權的組合深度。 |  |
| 393 | eyebrow | 2025-09-04 | — | `ZH GAP` |
| 394 | subhead | TIS and Innovue forge the founding partnership behind every deliverable. | TIS 與 Innovue 締結奠基合作，撐起每一項交付成果。 |  |
| 395 | dek | The founding alliance: Innovue's IP intelligence platform and expertise underpin every analysis and report TIS produces. | 奠基的結盟——Innovue 的 IP 情報平台與專業，撐起 TIS 每一份分析與報告。 |  |
| 415 | headline | Get in touch. | 與我們聯絡。 |  |
| 416 | dek | From one patent to a whole portfolio, tell us what you need. | 從一件專利到整個專利組合，告訴我們您的需求。 |  |
| 434 | form label | Full Name | 姓名 |  |
| 438 | form label | Job Title | 職稱 |  |
| 444 | form label | Email Address | 電子郵件 |  |
| 448 | form label | Phone Number | 電話 |  |
| 453 | form label | Organization | 機構 |  |
| 472 | form label | Your Inquiry | 您的需求 |  |
| 476 | CTA | Send Inquiry | 送出諮詢 |  |
| 485 | subhead | Message sent. | 訊息已送出。 |  |

### `patents/index.html` — 16 rows

| Line | Kind | EN | ZH | Flags |
|---|---|---|---|---|
| 603 | dek | Licensing Platform | 泰然專利防護網 |  |
| 606 | dek | Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | `Δnum` |
| 613 | dek | Patent Evaluation | 泰然專利強度評級系統 |  |
| 616 | dek | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 |  |
| 624 | CTA | Contact sales | 聯絡業務 |  |
| 709 | headline | Patent Bank | 專利庫 |  |
| 733 | headline | Get in touch. | 與我們聯絡。 |  |
| 734 | dek | From one patent to a whole portfolio, tell us what you need. | 從一件專利到整個專利組合，告訴我們您的需求。 |  |
| 752 | form label | Full Name | 姓名 |  |
| 756 | form label | Job Title | 職稱 |  |
| 762 | form label | Email Address | 電子郵件 |  |
| 766 | form label | Phone Number | 電話 |  |
| 771 | form label | Organization | 機構 |  |
| 790 | form label | Your Inquiry | 您的需求 |  |
| 794 | CTA | Send Inquiry | 送出諮詢 |  |
| 803 | subhead | Message sent. | 訊息已送出。 |  |

### `product/licensing/index.html` — 57 rows

| Line | Kind | EN | ZH | Flags |
|---|---|---|---|---|
| 1807 | dek | Licensing Platform | 泰然專利防護網 |  |
| 1810 | dek | Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | `Δnum` |
| 1817 | dek | Patent Evaluation | 泰然專利強度評級系統 |  |
| 1820 | dek | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 |  |
| 1828 | CTA | Contact sales | 聯絡業務 |  |
| 1881 | headline | The patent moves that matter. | 重要的專利動態。 |  |
| 1938 | headline | TIS Licensing — 30-patent shield, active the week you subscribe | 泰然專利防護網 — 30 件 SABCD 評等專利組合，當週上線 |  |
| 1979 | CTA | Build your bundle | 試跑專利包 |  |
| 1980 | CTA | Talk to sales | 聯絡業務 |  |
| 1987 | form label | Licensed from established institutions | 專利授權自權威機構 |  |
| 2105 | subhead | Patent Bundle by AI Smart-Pick | AI 智慧雷達導航 |  |
| 2111 | subhead | Co-licensed in your name | 權威法人聯合授權 |  |
| 2117 | subhead | An active IP shield | 主動式防護盾 |  |
| 2123 | subhead | Live the day after payment | 付款隔日立即生效 |  |
| 2129 | subhead | Verify in 2 seconds, display anywhere | 2 秒驗證，自由展示 |  |
| 2135 | subhead | Patents turned into OpEx | 專利轉化為 OpEx 租賃保險 |  |
| 2165 | subhead | File your own | 自行申請 |  |
| 2166 | dek | One patent isn't a position, it's a target. NT$50,000+ per patent, 18 months to grant. | 1 件不是佈局，是被告的標靶。每件 NT$50,000 起，等 18 個月核准。 | `Δnum` |
| 2172 | subhead | Hire the engineer | 聘專職工程師 |  |
| 2173 | dek | You get a salary, not coverage. NT$1M+ a year for a dedicated IP engineer. | 買到的是薪水，不是防護。專職 IP 工程師年成本破百萬。 | `Δnum` |
| 2179 | subhead | Subscribe to a Patent Bundle | 訂閱專利包 |  |
| 2180 | dek | Legally issued in your name, live the week you subscribe. Under NT$10K/month. | 以貴公司名義合法開立，訂閱當週生效上線。月均不到 1 萬。 | `Δnum` |
| 2219 | subhead | Scoped to a single jurisdiction | 鎖定單一出口國 |  |
| 2223 | subhead | Scoped to a single industry | 鎖定單一產業 |  |
| 2227 | subhead | Your inputs define the bundle | 這些輸入界定您的專利包 |  |
| 2247 | subhead | Why thirty, not one | 為什麼是 30 件，不是 1 件 | `Δnum` |
| 2251 | subhead | Inside the bundle: SABCD | 專利包內容：SABCD |  |
| 2271 | subhead | AI proposes; you decide | AI 推薦，你做主 |  |
| 2291 | subhead | One price, all-in | 單一價格，全包 |  |
| 2295 | subhead | Nothing locks until you say so | 你確認前不會鎖定 |  |
| 2315 | subhead | A binding licence, not a promise | 具約束力的授權，而非口頭承諾 |  |
| 2319 | subhead | Backed by the patent owner | 由專利權人背書 |  |
| 2339 | subhead | You stop being the easy target | 你不再是好下手的目標 |  |
| 2343 | subhead | Freedom to Operate, activated | 營運自由度，即刻啟動 |  |
| 2347 | subhead | A credential you can show | 可出示的憑證 |  |
| 2363 | CTA | Build a bundle | 試跑專利包 |  |
| 2379 | headline | What you walk away with. | 你拿到的是這些。 |  |
| 2380 | dek | Passive defense to active position. | 從被動防禦轉為主動佈局。 |  |
| 2393 | subhead | Your badge goes live, in your name | 標章以貴公司名義生效 |  |
| 2405 | subhead | A credential with legal weight | 具法律效力的授權憑證 |  |
| 2417 | subhead | On the booth,in the deck | 上展位，<br>進提案 |  |
| 2429 | subhead | A buyer verifies it in two seconds | 買家 2 秒完成驗證 | `Δnum` |
| 2452 | headline | Price by term. | 依期間定價。 |  |
| 2469 | subhead | Build your bundle | 打造你的專利包 |  |
| 2479 | CTA | Subscribe | 訂閱 |  |
| 2544 | subhead | FAQ | 常見問題 |  |
| 2545 | dek | Can't find what you're looking for? Contact our support team → | 找不到需要的資訊嗎？<br><a href="#contact">聯絡我們的支援團隊 →</a> |  |
| 2618 | headline | Get in touch. | 與我們聯絡。 |  |
| 2619 | dek | From one patent to a whole portfolio, tell us what you need. | 從一件專利到整個專利組合，告訴我們您的需求。 |  |
| 2637 | form label | Full Name | 姓名 |  |
| 2641 | form label | Job Title | 職稱 |  |
| 2647 | form label | Email Address | 電子郵件 |  |
| 2651 | form label | Phone Number | 電話 |  |
| 2656 | form label | Organization | 機構 |  |
| 2675 | form label | Your Inquiry | 您的需求 |  |
| 2679 | CTA | Send Inquiry | 送出諮詢 |  |
| 2688 | subhead | Message sent. | 訊息已送出。 |  |

### `product/licensing/badge.html` — 29 rows

| Line | Kind | EN | ZH | Flags |
|---|---|---|---|---|
| 155 | dek | Licensing Platform | 泰然專利防護網 |  |
| 158 | dek | Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | `Δnum` |
| 165 | dek | Patent Evaluation | 泰然專利強度評級系統 |  |
| 168 | dek | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 |  |
| 176 | CTA | Contact sales | 聯絡業務 |  |
| 231 | eyebrow | TIS Licensing Platform | 泰然專利防護網 |  |
| 235 | dek | Verify in 2 seconds. Display anywhere. The DLC badge turns a license into proof. | 2 秒線上驗證，自由印製。DLC 標章把授權變成可被看見的證明。 |  |
| 238 | CTA | Back to Licensing | 回到專利防護網 |  |
| 338 | headline | Your badge goes live, in your name | — | `ZH GAP` |
| 345 | form label | Issued badge | — | `ZH GAP` |
| 360 | headline | A credential with legal weight | — | `ZH GAP` |
| 367 | form label | Notarized credential | — | `ZH GAP` |
| 381 | headline | On the booth, in the deck | — | `ZH GAP` |
| 388 | form label | Booth signage | — | `ZH GAP` |
| 395 | form label | Proposals / deck | — | `ZH GAP` |
| 402 | form label | Website | — | `ZH GAP` |
| 409 | form label | Product box | — | `ZH GAP` |
| 423 | headline | A buyer verifies it in two seconds | — | `ZH GAP` |
| 430 | form label | Verify in 2 seconds | — | `ZH GAP` |
| 445 | headline | Get in touch. | 與我們聯絡。 |  |
| 446 | dek | From one patent to a whole portfolio, tell us what you need. | 從一件專利到整個專利組合，告訴我們您的需求。 |  |
| 464 | form label | Full Name | 姓名 |  |
| 468 | form label | Job Title | 職稱 |  |
| 474 | form label | Email Address | 電子郵件 |  |
| 478 | form label | Phone Number | 電話 |  |
| 483 | form label | Organization | 機構 |  |
| 502 | form label | Your Inquiry | 您的需求 |  |
| 506 | CTA | Send Inquiry | 送出諮詢 |  |
| 515 | subhead | Message sent. | 訊息已送出。 |  |

### `product/signal/index.html` — 73 rows

| Line | Kind | EN | ZH | Flags |
|---|---|---|---|---|
| 1715 | dek | Licensing Platform | 泰然專利防護網 |  |
| 1718 | dek | Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | `Δnum` |
| 1725 | dek | Patent Evaluation | 泰然專利強度評級系統 |  |
| 1728 | dek | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 |  |
| 1736 | CTA | Contact sales | 聯絡業務 |  |
| 1789 | headline | The patent moves that matter. | 重要的專利動態。 |  |
| 1846 | headline | Signal — Grade patents with SABCD in 30 minutes | Signal — 30 分鐘為專利做 SABCD 評等 |  |
| 1877 | dek | Submit a patent number. Signal returns an SABCD tier ranked against its industry — strength, landscape, and a verdict a deal team can act on. | 提交一個專利號，Signal 回傳對比同產業的 SABCD 評級——專利強度、周邊布局，以及投資團隊可據以行動的結論。 |  |
| 1879 | CTA | See a sample report | 免費預覽報告樣本 |  |
| 1880 | CTA | Talk to sales | 聯絡業務 |  |
| 1910 | CTA | See a sample report | 免費預覽報告樣本 |  |
| 1921 | dek | Your patent receives one letter grade — its Patent Strength Score, built from 50 quantitative indicators across 8 weighted pillars and ranked against industry peers. | 你的專利會得到一個字母評級——即 Patent Strength Score，由橫跨 8 大加權支柱的 50 項量化指標構成，並對標同產業專利。 |  |
| 1935 | CTA | See the methodology → | 看我們的評分方法 → |  |
| 1945 | dek | Brief gives you the SABCD grade and its 8-pillar breakdown. Pro adds the Risk & Action layer a deal team takes to investment committee. | Brief 給你 SABCD 等級與 8 大支柱的完整拆解；Pro 再加上投資團隊提交投資委員會所需的「風險與行動」決策層。 |  |
| 1947 | CTA | See a sample report → | 檢視報告樣本 → |  |
| 1997 | headline | You do one thing. We handle the rest. | 你只做一件事，其餘交給我們。 |  |
| 2004 | eyebrow | You give | 你提供 |  |
| 2071 | eyebrow | You get | 你收到 |  |
| 2073 | dek | in 30 minutes | 30 分鐘內 |  |
| 2079 | CTA | Get started | 立即開始 |  |
| 2137 | headline | Three ways to read a patent's real strength — only one scales across a portfolio. | 判斷專利真實強度有三條路——只有一條撐得起整個投資組合。 |  |
| 2149 | subhead | Trust the pitch deck | 相信投影片 |  |
| 2167 | subhead | Hire an analyst | 請分析師 |  |
| 2185 | subhead | Subscribe to Signal | 訂閱 Signal |  |
| 2193 | CTA | How we'd score your patent → | 看我們如何評分你的專利 → |  |
| 2206 | headline | What's inside your report, and how it's built. | 報告裡有什麼，又是怎麼算出來的。 |  |
| 2212 | subhead | SABCD verdict | SABCD 評定 |  |
| 2227 | subhead | Peer-cohort percentile | 同儕池百分位 |  |
| 2242 | subhead | 8-pillar radar | 八大支柱雷達 | `Δnum` |
| 2257 | subhead | 50 indicators | 50 項指標 |  |
| 2272 | subhead | Brief vs Pro | Brief 對 Pro |  |
| 2287 | subhead | Leak-resistant PDF | 防外流 PDF |  |
| 2302 | CTA | See a sample report | 免費預覽報告樣本 |  |
| 2310 | headline | Submit a patent number. You leave with… | 提交一個專利號，你帶走的是…… |  |
| 2311 | dek | Four moments, one uninterrupted story. | 四個環節，一個連貫的故事。 |  |
| 2316 | eyebrow | The verdict 1.0 | <span class="wa-num">1.0</span> 評定結果 |  |
| 2318 | subhead | The verdict | 評定結果 |  |
| 2325 | eyebrow | The percentile 2.0 | <span class="wa-num">2.0</span> 同儕百分位 |  |
| 2327 | subhead | The percentile | 同儕百分位 |  |
| 2334 | eyebrow | The indicators 3.0 | <span class="wa-num">3.0</span> 指標明細 |  |
| 2336 | subhead | The indicators | 指標明細 |  |
| 2343 | eyebrow | The deliverable 4.0 | <span class="wa-num">4.0</span> 可交付文件 |  |
| 2345 | subhead | The deliverable | 可交付文件 |  |
| 2353 | CTA | See our methodology → | 看我們的評分方法 → |  |
| 2354 | CTA | See your deliverable → | 看你會收到的報告 → |  |
| 2363 | headline | Pricing — Pay per report. Or subscribe. | 定價 — 按報告付費，或月訂閱。 |  |
| 2391 | form label | Show more | — | `ZH GAP` |
| 2407 | CTA | Subscribe | 訂閱 |  |
| 2414 | CTA | Subscribe | 訂閱 |  |
| 2421 | CTA | Subscribe | 訂閱 |  |
| 2431 | form label | Credits / mo | 點數 / 月 |  |
| 2437 | form label | Briefs / mo | 每月 Brief 數 |  |
| 2443 | form label | Email delivery + dashboard | 信箱送達 + 儀表板存取 |  |
| 2449 | form label | Watermarked PDFs + audit trail | PDF 浮水印 + 稽核軌跡 |  |
| 2455 | form label | Credits reset monthly | 月底未用點數歸零 |  |
| 2461 | form label | PDF + JSON export | PDF + JSON 匯出 |  |
| 2467 | form label | Batch submit — 8 morning decks, EOD | 批次提交（早上 8 份 deck，當天回） |  |
| 2473 | form label | Priority queue (30-min SLA) | 優先處理佇列（30 分鐘 SLA） |  |
| 2479 | form label | Custom cohort selection (IPC / time bands) | 專屬同儕池（自選 IPC 範圍） |  |
| 2485 | form label | Monthly LP-letter summary | 月度 LP-report 摘要 |  |
| 2491 | form label | Slack / Teams hook for new Briefs | Slack / Teams 整合 |  |
| 2525 | CTA | Get your first report → | 取得你的第一份報告 → |  |
| 2539 | subhead | FAQ | 常見問題 |  |
| 2611 | headline | Get in touch. | 與我們聯絡。 |  |
| 2612 | dek | From one patent to a whole portfolio, tell us what you need. | 從一件專利到整個專利組合，告訴我們您的需求。 |  |
| 2630 | form label | Full Name | 姓名 |  |
| 2634 | form label | Job Title | 職稱 |  |
| 2640 | form label | Email Address | 電子郵件 |  |
| 2644 | form label | Phone Number | 電話 |  |
| 2649 | form label | Organization | 機構 |  |
| 2668 | form label | Your Inquiry | 您的需求 |  |
| 2672 | CTA | Send Inquiry | 送出諮詢 |  |
| 2681 | subhead | Message sent. | 訊息已送出。 |  |

### `product/signal/lobby.html` — 3 rows

| Line | Kind | EN | ZH | Flags |
|---|---|---|---|---|
| 354 | headline | Signal — get started | Signal — 開始使用 |  |
| 382 | headline | Patent Evaluation | 泰然專利強度評級系統 |  |
| 432 | headline | Create your account | 建立你的帳號 |  |

### `product/signal/methodology.html` — 36 rows

| Line | Kind | EN | ZH | Flags |
|---|---|---|---|---|
| 145 | dek | Licensing Platform | 泰然專利防護網 |  |
| 148 | dek | Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | `Δnum` |
| 155 | dek | Patent Evaluation | 泰然專利強度評級系統 |  |
| 158 | dek | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 |  |
| 166 | CTA | Contact sales | 聯絡業務 |  |
| 221 | eyebrow | Token-Based Valuation · SABCD | — | `ZH GAP` |
| 225 | dek | Eight pillars. Fifty indicators. One PSS score on a 0–100 scale. | 8 大支柱 · 50 項量化指標 · 0–100 分綜合評分。 | `Δnum` |
| 226 | dek | The same scoring engine behind every Signal report — what each pillar measures, how the 50 indicators work, and how a 0–100 PSS resolves to an S–D tier against industry peers. | 每一份 Signal 報告背後的同一套評分引擎——每根支柱量測什麼、50 項指標如何運作，以及 0–100 分的 PSS 如何在同產業同儕中對應到 S–D 評級。 |  |
| 228 | CTA | Back to Signal | 回到 Signal |  |
| 244 | headline | SABCD tiers | SABCD 評級 |  |
| 245 | dek | A tier is a discretisation of cohort percentile. S is the top 15% of the pool — the "S (top 15%)" the homepage cites. | 評級是同儕百分位的分級。S 為同儕池前 15%——即首頁所述的「S 級（前 15%）」。 |  |
| 266 | dek | And rolled up to a portfolio — each gauge is the mean PSS across a company's graded patents, resolved to one aggregate SABCD tier. The strip below shows how it distributes across S–D. | 同一套評級延伸至整個專利組合——每個量規是該公司已評分專利的 PSS 平均值，彙整為單一 SABCD 等級，下方分布條顯示 S–D 的構成。 |  |
| 274 | subhead | Macrosilicon Mfg | — | `ZH GAP` |
| 303 | subhead | Vivid Imaging | — | `ZH GAP` |
| 332 | subhead | Yuan Bio Tech | — | `ZH GAP` |
| 361 | subhead | AIChip Co. | — | `ZH GAP` |
| 390 | subhead | Hongchen Power | — | `ZH GAP` |
| 424 | headline | How the PSS score is built | PSS 分數怎麼算出來 |  |
| 425 | dek | Every patent is graded on 50 indicators across 8 pillars. Raw values are normalised against the same-industry pool, aggregated into a 0–100 PSS, and mapped to a SABCD tier — cohort percentil | 每件專利依 8 大支柱、50 項指標評分。原始值先對同產業同儕池正規化，聚合為 0–100 的 PSS，再對應 SABCD 評級——同儕百分位與池內排名，皆由同一次比較得出。 |  |
| 473 | headline | Pillars & indicators | 八大支柱與 50 項指標 | `Δnum` |
| 474 | dek | The PSS is a weighted composite of eight pillars; each pillar decomposes into 4–8 indicators, every one traceable to its formula. | PSS 是八大支柱的加權綜合；每根支柱再拆解為 4–8 項指標，每項都可追溯到計算公式。 |  |
| 509 | headline | Transparency over precision | 透明優先於精準 |  |
| 510 | dek | Every score traces to a formula. Structured indicators show their raw inputs; NLP indicators carry a rubric score and a reasoning trail you can audit. The cohort re-ranks weekly — rank and p | 每個分數都可追溯到公式。結構化指標揭示原始輸入；NLP 指標附帶評分標準與可稽核的推理軌跡。同儕池每週重新排名——專利進池或失效時，即使本身指標未變，排名與百分位仍可能變動。 |  |
| 511 | dek | All indicators draw from the Innovue 180M-patent index — 100+ jurisdictions, refreshed daily. Industry assignment uses the patent's primary IPC code. | 所有指標取自新穎 1.8 億筆專利索引——涵蓋 100 多個司法管轄區，每日更新。產業歸屬依專利主要 IPC 分類。 | `Δnum` |
| 516 | CTA | See a sample report → | 看一份評級報告 → |  |
| 517 | CTA | Get your report → | 取得你的報告 → |  |
| 528 | headline | Get in touch. | 與我們聯絡。 |  |
| 529 | dek | From one patent to a whole portfolio, tell us what you need. | 從一件專利到整個專利組合，告訴我們您的需求。 |  |
| 547 | form label | Full Name | 姓名 |  |
| 551 | form label | Job Title | 職稱 |  |
| 557 | form label | Email Address | 電子郵件 |  |
| 561 | form label | Phone Number | 電話 |  |
| 566 | form label | Organization | 機構 |  |
| 585 | form label | Your Inquiry | 您的需求 |  |
| 589 | CTA | Send Inquiry | 送出諮詢 |  |
| 598 | subhead | Message sent. | 訊息已送出。 |  |

### `product/signal/sample-report.html` — 19 rows

| Line | Kind | EN | ZH | Flags |
|---|---|---|---|---|
| 145 | dek | Licensing Platform | 泰然專利防護網 |  |
| 148 | dek | Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | `Δnum` |
| 155 | dek | Patent Evaluation | 泰然專利強度評級系統 |  |
| 158 | dek | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 |  |
| 166 | CTA | Contact sales | 聯絡業務 |  |
| 256 | headline | One report, two editions | 一份報告，兩種版本 |  |
| 257 | dek | Every Signal report grades one patent on the same PSS engine. gives you the verdict and its full decomposition; adds the Risk & Action layer a deal team takes to investment committee. Engine | 每份 Signal 報告都以同一套 PSS 引擎為單一專利評分。Brief 給你結論與完整拆解；Pro 再加上投資委員會所需的「風險與行動」決策層。引擎細節見 |  |
| 317 | CTA | See the methodology → | 看我們的評分方法 → |  |
| 318 | CTA | Submit a patent number to get started → | 提交專利號，立即開始 → |  |
| 329 | headline | Get in touch. | 與我們聯絡。 |  |
| 330 | dek | From one patent to a whole portfolio, tell us what you need. | 從一件專利到整個專利組合，告訴我們您的需求。 |  |
| 348 | form label | Full Name | 姓名 |  |
| 352 | form label | Job Title | 職稱 |  |
| 358 | form label | Email Address | 電子郵件 |  |
| 362 | form label | Phone Number | 電話 |  |
| 367 | form label | Organization | 機構 |  |
| 386 | form label | Your Inquiry | 您的需求 |  |
| 390 | CTA | Send Inquiry | 送出諮詢 |  |
| 399 | subhead | Message sent. | 訊息已送出。 |  |

