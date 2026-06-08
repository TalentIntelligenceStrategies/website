# Licensing Page — Three-Way Copy Comparison

> **Scope.** A single focused pass over **[website/product/licensing/index.html](../product/licensing/index.html)** only, from the Hero eyebrow (`TIS Licensing Platform` / `泰然專利防護網`) **down to the section directly above the footer** (Contact). Page chrome *above* the hero (top nav, mobile drawer, search modal, IP-drop popup, screen-reader H1, announcement banner) and the footer itself are **out of scope** for this doc — they're canonical-shared and already tracked in [copy-audit-v1.md](copy-audit-v1.md).
>
> **What this doc does.** Lays the live HTML side-by-side against the two reference docs so we can see, per copy element, what each source says:
> - **HTML** = what is actually live in the page (ZH from `data-zh`, plus the visible Site EN).
> - **copy-audit-v1.md** = the bilingual-parity tracker. Noted per-section (does it already cover this block, and does it match HTML?).
> - **chinese-copy-direction.md** = Irene's strategic copy direction (slide-organized; slides 21–27 cover this page). For every relevant element we pull its **proposed ZH + a literal English translation of that ZH**, so the ZH can be compared directly against the HTML's ZH.
>
> **Literal EN.** The `Literal EN` column is a plain, faithful translation of the **HTML's** ZH (for the benefit of non-ZH readers) — *not* marketing copy and *not* the Site EN.

> **Δ (divergence) legend:**
> - ✅ — HTML ZH, Site EN, and direction-doc all agree (or direction has no objection).
> - 🟰 — HTML ZH matches direction-doc's proposed ZH exactly.
> - ⚠️ EN↔ZH — HTML ZH matches direction, but the **Site EN diverges from the ZH meaning** (English not yet re-aligned).
> - 🅰️ asym — intentional EN↔ZH asymmetry (documented product-naming convention, not a bug).
> - ⚠️ ZH — HTML ZH differs from the direction-doc's proposed ZH.
> - 🆕 dir — direction-doc proposes copy the HTML has **not** adopted.
> - — — direction-doc has no entry for this element.
>
> **Status legend** — same as copy-audit-v1.md (☐ pending · ✅ reviewed · 🚀 live). All rows start ☐.

---

## Hero

> **HTML:** [product/licensing/index.html:3509–3523](../product/licensing/index.html#L3509-L3523) (`article.pillar[data-pillar="licensing"]`).
> **copy-audit-v1:** [§ Licensing › Hero](copy-audit-v1.md) — transcribes all 6 rows; **matches HTML** (all ☐).
> **direction-doc:** [Slide 21 — Licensing product page hero](chinese-copy-direction.md) (eyebrow + headline + subhead + CTAs). ZH side shipped 🟢 2026-05-30.
>
> **Reading of the section:** The **ZH is fully aligned** with the direction doc — eyebrow, the insurance-metaphor headline, the single benefit-recap subhead, and the `試跑專利包` primary verb all match slide 21's shipped ZH. The **EN side across the entire hero diverges from the ZH meaning**: the English was preserved structurally from the older positioning while the ZH was swapped to the insurance metaphor. The direction doc itself records EN as "TBD … flagged for Miko-lock." So this section's open work is **EN, not ZH**.

| ZH (HTML) | Literal EN | Site EN (HTML) | Direction guidance (Slide 21) | Δ | Status |
|---|---|---|---|---|---|
| 泰然專利防護網 | TaiRan Patent Protection Net | TIS Licensing Platform | Eyebrow: `泰然專利防護網` (rebadged from `TIS 授權平台`); EN = TBD | 🅰️ asym — ZH matches dir; EN uses the product's English name ("TIS Licensing Platform"), not a translation of the ZH. Intentional per adopted-names. | ☐ |
| 出口買專利險， | Export — buy patent insurance, | 30-patent shield. | Headline L1: `出口買專利險，` (insurance-metaphor); EN = TBD, flagged for Miko-lock | ⚠️ EN↔ZH — ZH 🟰 matches dir; Site EN ("30-patent shield.") does not mirror the ZH meaning. | ☐ |
| 30 件專利包輕裝上陣。 | The 30-patent bundle deploys light. | *Active this week.* (em) | Headline L2: `30 件專利包輕裝上陣。` (em emphasis); EN = TBD | ⚠️ EN↔ZH — ZH 🟰 matches dir; Site EN diverges. | ☐ |
| 1 分鐘勾選國家 × 產業 × 期別，2 種專利包選法，5 類專利評級， | 1 minute to tick country × industry × term, 2 bundle-selection methods, 5 patent grades, | One subscription, thirty SABCD-graded patents, curated for your jurisdiction and industry | Subhead (single ZH paragraph, split across two HTML spans); EN = TBD | ⚠️ EN↔ZH — ZH 🟰 matches dir's single paragraph; Site EN diverges. | ☐ |
| 戴上授權認證標章立刻從被動防禦轉為主動佈局。 | Put on the license-certification badge and instantly switch from passive defense to active positioning. | — passive defense to active position the week you subscribe. | (second half of the same subhead paragraph) | ⚠️ EN↔ZH — ZH 🟰 matches dir; Site EN diverges. | ☐ |
| 試跑專利包 | Try out the patent bundle | Build your bundle | Primary CTA: `試跑專利包` (slide-11 brand verb; supersedes `組建你的組合`) | ⚠️ EN↔ZH — ZH 🟰 matches dir's new verb; Site EN ("Build your bundle") still mirrors the **superseded** ZH `組建你的組合`. | ☐ |
| 聯絡業務 | Contact sales | Talk to sales | Secondary CTA: `聯絡業務`; EN = TBD | ✅ ZH 🟰 matches dir; EN ("Talk to sales") is a fair equivalent of "contact sales." Minor wording only. | ☐ |

---

## ⚠️ Structural drift — read before the section tables

The page has been **rebuilt well past what either reference doc describes.** Both docs were written against an older layout. Net state:

| Section (current HTML) | In copy-audit-v1? | In direction-doc? | Verdict |
|---|---|---|---|
| Hero | ✅ matches | ✅ Slide 21 | ZH aligned; **EN diverges** (Miko-lock) |
| **Deliverables** | ⚠️ tracked as a **4-card grid shared with homepage** | ✗ | **Now 6 licensing-specific cards, all-new copy.** Old audit rows obsolete. |
| **Cover-the-gap** | ✗ absent | ✗ absent | **Brand-new section** — untracked anywhere |
| **Inside the bundle** | ✗ absent | ✗ absent | **Brand-new section** — untracked anywhere |
| **What you walk away with** | ✗ absent | ✗ absent | **Brand-new section** — untracked anywhere |
| **Pricing** | ⚠️ tracked as an **interactive jurisdiction × industry estimator** | ⚠️ Slide 27 (same estimator) | **Estimator removed** (0 matches in HTML). Now a static "Build your bundle" card. Both docs' pricing rows obsolete. |
| **From signup to a live license** | ⚠️ tracked as **"How it works" 5-step rail** (shared w/ homepage) | ⚠️ Slides 22–26 (5-card wizard) | **Now a 6-step onboarding** (Pick/Smart-pick/Bundle/Swap/Payment/Active). ZH drifted from Slides 22–26; **EN checklist diverges hard from ZH.** |
| FAQ | ✅ matches | ✗ | **Cleanest section** — ZH & EN correspond, matches audit |
| Contact | ✅ canonical (shared) | Slide 16 (dropdown) | Form matches homepage; copy-audit-v1's *transcribed* homepage values are stale (now Full Name / Job Title / Phone / Send Inquiry) |

**The recurring pattern across the whole body:** the **ZH follows the strategic Chinese direction** and reads as the primary, authored language; the **EN is a separate, looser marketing register** that no longer mirrors the ZH meaning. For a bilingual-parity goal, the open work is overwhelmingly **EN re-alignment**, plus deciding whether the three new sections + the rewritten onboarding ZH get back-filled into the reference docs.

---

## Deliverables (now 6 cards — copy-audit-v1 says 4)

> **HTML:** [3528–3582](../product/licensing/index.html#L3528-L3582). Six `h4` + `p` cards; card 5's body is wrapped in `<a href="#artifacts">`.
> **copy-audit-v1:** [§ Licensing › Deliverables](copy-audit-v1.md) tracks a **4-card grid shared with the homepage** — those strings are **not on this page anymore.** Obsolete; needs re-baselining to these 6.
> **direction-doc:** no entry. This is new copy.
>
> **Reading:** EN **headings** are a different register from the ZH headings (ZH = punchy metaphor labels; EN = benefit sentences). EN **bodies** roughly track the ZH meaning. Two factual snags flagged below: institution naming (創智 vs "ITRI") and the discount figure (88折/12% here vs 15% in the FAQ).

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| AI 智慧雷達導航 | AI smart-radar navigation | AI does the search — you get a curated 30-patent bundle | ⚠️ EN↔ZH — heading register differs (label vs sentence) | ☐ |
| 依出口國 × 產業別 × 產品線三軸掃描風險缺口，5 分鐘內推薦最相關的 30 件專利。支援人機協作與手動替換，不需懂法律。 | Scans risk gaps across three axes — export country × industry × product line — and recommends the 30 most relevant patents within 5 minutes. Supports human-machine collaboration and manual swapping; no legal knowledge required. | Scans risk gaps across export country × industry × product line and recommends the 30 most relevant patents in 5 minutes. Manual swap supported; no legal expertise required. | ✅ body aligned | ☐ |
| 權威法人聯合授權 | Authoritative-institution joint license | Joint license in your name — non-exclusive, fully legal | ⚠️ EN↔ZH register differs | ☐ |
| 創智、資策會、陽明交大以貴公司名義開立 30 件合法非獨家專利。在國際買家與投資人面前，是機構級 IP 後盾，撕掉「代工小廠」的標籤。 | 創智 (iPIC) / 資策會 (III) / 陽明交大 (NYCU) issue 30 legal, non-exclusive patents in your company's name. In front of international buyers and investors, it's institution-grade IP backing — tears off the "small OEM" label. | ITRI, III and NYCU issue 30 legal, non-exclusive patents directly in your company's name — institution-level IP backing buyers and investors recognize, not a "small OEM" label. | ⚠️ **Fact mismatch** — ZH lists 創智 (=iPIC, matches the partner strip), EN says **ITRI**. One is wrong. | ☐ |
| 主動式防護盾 | Active-type protective shield | Patent-troll defense — passive to active | ⚠️ EN↔ZH register differs | ☐ |
| 專利流氓（NPE）只挑好下手的目標。三家機構的合法 IP 防線拉高攻擊成本，他們自然跳過你。從被動防禦轉為主動佈局。 | Patent trolls (NPEs) pick only easy targets. The legal IP line from three institutions raises the cost of attack — so they naturally skip you. Shift from passive defense to active positioning. | Patent trolls (NPEs) pick easy targets. Three institutions' legal IP line raises the cost of attack — so they skip you. Passive defense becomes active position. | ✅ body aligned | ☐ |
| 付款隔日立即生效 | Effective the day after payment | Active the day after payment — DLC + co-branded badge | ✅ aligned | ☐ |
| 金流確認隔日防護網生效。交付含公證電子簽章的數位授權憑證（DLC），以及「TIS × 權威機構」聯名授權認證標章。 | The day after payment is confirmed, the protection net goes live. Delivers a Digital License Credential (DLC) with a notarized e-signature, plus a "TIS × authoritative institution" co-branded license-certification badge. | Payment confirmed, protection goes live the next day. You receive a Digital License Credential (DLC) with a notarized e-signature and a co-branded "TIS × institution" badge. | ✅ body aligned | ☐ |
| 2 秒驗證，自由展示 | Verify in 2 seconds, display freely | Verify in 2 seconds, display anywhere | ✅ aligned | ☐ |
| 標章內嵌獨一授權編號與 QR Code，2 秒線上即時驗證。可印於國際展位、提案書、官網 Footer 或產品外包裝。 | The badge embeds a unique license number and QR code, verified live online in 2 seconds. Can be printed on international booths, proposals, the website footer, or product packaging. | The badge carries a unique license number and QR code — verified online in 2 seconds. Print it on booth signage, proposals, your website footer, or product packaging. | ✅ body aligned (anchor-wrapped) | ☐ |
| 專利轉化為 OpEx 租賃保險 | Patents turned into OpEx leasing/insurance | Patent licensing as OpEx — under NT$10K/month, flexible terms | ⚠️ EN↔ZH register differs | ☐ |
| 自行申請 1 件專利需 NT$50,000+ 與 18 個月；專職 IP 工程師年成本破百萬。訂閱讓月均不到 1 萬，3 / 6 / 12 / 24 個月彈性期別，2 年方案最高 88 折。 | Filing one patent yourself takes NT$50,000+ and 18 months; a dedicated IP engineer costs over NT$1M a year. A subscription keeps the monthly average under NT$10K — flexible 3/6/12/24-month terms; the 2-year plan is up to 12% off (88折). | Filing one patent yourself runs NT$50,000+ and 18 months; an in-house IP engineer breaks NT$1M a year. A subscription keeps you under NT$10K/month — flexible 3/6/12/24-month terms, up to 12% off on 2-year plans. | ⚠️ **Number mismatch w/ FAQ** — here 24-mo = **88折 / 12% off**; FAQ + Slide 27 say **15% off (85折)**. Reconcile. | ☐ |

## Cover-the-gap (BRAND-NEW section — untracked)

> **HTML:** [3591–3662](../product/licensing/index.html#L3591-L3662) (`.gapcover` asymmetric bento). **Not in copy-audit-v1, not in direction-doc.**
>
> **Reading:** ZH and EN are reasonably parallel here (written together). The CTA `試跑專利包 / Build your bundle` repeats the hero's stale-EN issue (ZH = "try out the bundle", EN = "Build your bundle"). Needs back-filling into both reference docs.

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| 補專利缺口有三條路，只有一條出口商走得起。 | There are three roads to fill the patent gap — only one an exporter can afford. | Three ways to cover the patent gap. One an exporter can afford. | ✅ aligned | ☐ |
| 為什麼是現在 | Why now | Why now | ✅ aligned | ☐ |
| 買家下單前，先對你做專利檢索。 | Before placing the order, the buyer runs a patent search on you. | Your buyer runs a patent search before the PO clears. | ✅ aligned | ☐ |
| 名下專利單薄，整批貨就卡在海關。 | A thin patent name leaves the whole shipment stuck at customs. | A thin name means the order gets held at customs. | ✅ aligned | ☐ |
| 律師費 500 萬，外加三倍懲罰性賠償。 | NT$5M in lawyer's fees, plus treble punitive damages. | Lawyer's fee NT$5M, treble damages on top. | ✅ aligned | ☐ |
| 自己跑 | Go it alone | Go it alone | ✅ aligned | ☐ |
| 自行申請 | File your own | File your own | ✅ aligned | ☐ |
| NT$50,000+／件，等 18 個月核准。1 件不是佈局，是被告的標靶。 | NT$50,000+ per patent, wait 18 months for grant. One patent isn't a position — it's a defendant's target. | NT$50,000+ per patent, 18 months to grant. One patent isn't a position, it's a target. | ✅ aligned | ☐ |
| 聘專職工程師 | Hire a dedicated engineer | Hire the engineer | ✅ aligned | ☐ |
| 專職 IP 工程師年成本破百萬，買到的是薪水，不是防護。 | A dedicated IP engineer costs over NT$1M a year — you buy a salary, not protection. | NT$1M+ a year for a dedicated IP engineer. You get a salary, not coverage. | ✅ aligned | ☐ |
| 訂閱泰然 | Subscribe to TIS | Subscribe to TIS | ✅ aligned | ☐ |
| 月均不到 1 萬。 | Under NT$10K per month on average. | Under NT$10K/month. | ✅ aligned | ☐ |
| 30 件專利，橫跨 5 個評級。 | 30 patents, spanning 5 tiers. | 30 patents, five tiers. | ✅ aligned | ☐ |
| 以貴公司名義合法開立。 | Legally issued in your company's name. | Issued in your company's name. | ✅ aligned | ☐ |
| 訂閱當週生效上線。 | Goes live the week you subscribe. | Active the week you subscribe. | ✅ aligned | ☐ |
| 試跑專利包 | Try out the patent bundle | Build your bundle | ⚠️ EN↔ZH — same stale CTA as hero (EN = superseded `組建你的組合`) | ☐ |

## Inside the bundle (BRAND-NEW section — untracked)

> **HTML:** [3671–3798](../product/licensing/index.html#L3671-L3798) (`.bundlegrid` 2×3 bento). **Not in copy-audit-v1, not in direction-doc.**
>
> **Reading:** ZH/EN written together; EN is a tighter editorial paraphrase, meaning holds. One naming note: ZH credits "Innovue 1.7 億件專利庫" (170M pool) in the AI card; EN keeps "Innovue's 170M-patent pool." Consistent. Needs back-filling.

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| 你的專利包裡有什麼，又是怎麼建起來的。 | What's in your patent bundle, and how it's built. | What's inside your bundle, and how it's built. | ✅ aligned | ☐ |
| 為什麼是 30 件，不是 1 件 | Why 30, not 1 | Why thirty, not one | ✅ aligned | ☐ |
| 1 件不是佈局，是被告的標靶：發證當下，對手就知道要繞開哪一條請求項。30 件是真正能嚇阻的最小數字，再多只是軍備競賽，徒增成本。 | One patent isn't a position, it's a defendant's target: the moment it issues, the other side knows which claim to design around. Thirty is the true minimum that deters; any more is just an arms race, adding cost. | One patent is just a target: the day it issues, the other side knows the one claim to design around. Thirty is the smallest spread that deters; past it, only the bill climbs. | ✅ aligned | ☐ |
| 專利包內容：SABCD | Bundle contents: SABCD | Inside the bundle: SABCD | ✅ aligned | ☐ |
| 30 件分布 5 個評級：5 S、6 A、9 B、6 C、4 D。旗艦級 (S/A) 上談判桌，密度級 (B) 覆蓋戰場，長尾 (C/D) 壓低成本，每季重新平衡。 | 30 patents across 5 tiers: 5 S, 6 A, 9 B, 6 C, 4 D. Flagship (S/A) take the negotiation table, density (B) covers the battlefield, the long tail (C/D) lowers cost — rebalanced quarterly. | Five tiers, thirty patents: 5 S, 6 A, 9 B, 6 C, 4 D. Flagship (S/A) face the counter-party, density (B) covers the field, the long tail (C/D) keeps cost down, rebalanced quarterly. | ✅ aligned | ☐ |
| AI 智選如何組建你的專利包 | How AI Smart-pick builds your bundle | How AI Smart-pick builds your bundle | ✅ aligned | ☐ |
| 泰然 AI 引擎依出口國 × 產業 × 產品線三軸掃描風險缺口，比對 Innovue 1.7 億件專利庫，5 分鐘給出一份評級均衡、來自創智／資策會／陽明交大池的候選 30 件。 | The TIS AI engine scans risk gaps across three axes — export country × industry × product line — matches against Innovue's 170M-patent pool, and in 5 minutes returns a tier-balanced candidate 30 from the 創智/資策會/陽明交大 (iPIC/III/NYCU) pool. | Across three axes (country, industry, product line), the engine scans Innovue's 170M-patent pool and returns a tier-balanced thirty from ITRI / III / NYCU in five minutes. | ⚠️ same **創智 vs ITRI** fact mismatch as Deliverables | ☐ |
| FTO 保選 | FTO guaranteed-pick | FTO-guarded pick | ✅ aligned | ☐ |
| 已有 FTO 報告或產品說明書？上傳後依你的實際暴露風險組建候選 30 件，24 小時內交付。 | Already have an FTO report or product spec? Upload it and we build a candidate 30 based on your actual exposure risk, delivered within 24 hours. | Already have a freedom-to-operate report or product spec? Upload it and we scope the candidate thirty to your real exposure, back within 24 hours. | ✅ aligned | ☐ |
| 你定方向，替換到滿意為止 | You set the direction, swap until satisfied | You set the direction, swap until it fits | ✅ aligned | ☐ |
| AI 推薦，你做主。簽約前可從動態池手動替換任一件，不需懂法律；最後這份專利包是你的決定，不是演算法的猜測。 | AI recommends, you decide. Before signing you can manually swap any item from the dynamic pool — no legal knowledge needed; in the end the bundle is your decision, not the algorithm's guess. | AI proposes; you decide. Swap any pick by hand from the live pool before you sign, no legal expertise needed. The bundle ends up yours, not an algorithm's best guess. | ✅ aligned | ☐ |
| 授權認證標章 | License-certification badge | Verified License Badge | ✅ aligned (ZH = standard licensing term) | ☐ |
| 每組附帶「TIS × 權威機構」聯名標章，內嵌專屬授權編號與 QR Code，買家線上 2 秒驗證。 | Each bundle comes with a "TIS × authoritative institution" co-branded badge, embedded with a dedicated license number and QR code — buyers verify online in 2 seconds. | Every bundle ships a "TIS × institution" badge with a unique license number and QR code, verified online in two seconds. | ✅ aligned | ☐ |

## What you walk away with (BRAND-NEW section — untracked)

> **HTML:** [3806–3854](../product/licensing/index.html#L3806-L3854) (`.walkaway` 4-beat row; eyebrows use `data-zh-html` with a `.wa-num` span). **Not in copy-audit-v1, not in direction-doc.**
>
> **Reading:** ZH/EN parallel and clean. The four `了解更多 → / Learn more →` links repeat. Needs back-filling.

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| 你拿到的是這些。 | This is what you get. | What you walk away with. | ✅ aligned | ☐ |
| 從被動防禦轉為主動佈局。 | Shift from passive defense to active positioning. | Passive defense to active position. | ✅ aligned | ☐ |
| `1.0` 開立 | 1.0 Issued | `1.0` Issued | ✅ aligned (rich-text `wa-num` span) | ☐ |
| 標章以貴公司名義生效 | The badge goes live in your company's name | Your badge goes live, in your name | ✅ aligned | ☐ |
| 憑證與標章同步開立，內嵌授權編號與 QR Code。 | The credential and badge issue together, embedded with a license number and QR code. | The credential and badge issue together — a license number and QR code. | ✅ aligned | ☐ |
| `2.0` 複核 | 2.0 Reviewed | `2.0` Reviewed | ✅ aligned | ☐ |
| 法務複核的是成品，不是草稿 | What your legal team reviews is a finished product, not a draft | Your counsel reviews a finished file | ✅ aligned | ☐ |
| PAdES 簽章的憑證與合約，是成品，不是草稿。 | A PAdES-signed credential and contract — a finished product, not a draft. | A PAdES-signed certificate and contract — a finished file, not a draft. | ✅ aligned | ☐ |
| `3.0` 展示 | 3.0 Displayed | `3.0` Displayed | ✅ aligned | ☐ |
| 上展位，進提案 | On the booth, into the proposal | On the booth, / in the deck | ✅ aligned (`<br>` split) | ☐ |
| 標章可印製於展位、提案書、官網或外包裝，支援 PNG / SVG。 | The badge can be printed on booths, proposals, the website, or packaging — supports PNG / SVG. | Print the badge on booths, proposals, your footer, or the box — PNG or SVG. | ✅ aligned | ☐ |
| `4.0` 驗證 | 4.0 Verified | `4.0` Verified | ✅ aligned | ☐ |
| 買家 2 秒完成驗證 | The buyer completes verification in 2 seconds | A buyer verifies it in two seconds | ✅ aligned | ☐ |
| 買家掃描 QR Code，授權即在線上 2 秒驗證通過。 | The buyer scans the QR code and the license verifies online in 2 seconds. | A buyer scans the QR code and the license verifies online in two seconds. | ✅ aligned | ☐ |
| 了解更多 → | Learn more → | Learn more → | ✅ aligned (×4) | ☐ |

## Pricing (now a static "Build your bundle" card — estimator removed)

> **HTML:** [3859–3946](../product/licensing/index.html#L3859-L3946). **Heading + one pricing card** (term toggle 3/6/12/24, Subscribe), an **Industries (6 sectors)** list, a **Proof & delivery** list, and a partner strip (iPIC / III / NYCU — `aria-label` only, no visible ZH).
> **copy-audit-v1:** [§ Licensing › Pricing](copy-audit-v1.md) tracks an **interactive jurisdiction × industry estimator** (選擇國家 / 選擇產業 / 單包金額預估 / 月均額 …) — **0 matches in current HTML. Obsolete.**
> **direction-doc:** Slide 27 describes the **same removed estimator** (jurisdiction picker, industry picker, estimate panel, discount badges). Largely **superseded**; only the term tabs + inclusions survive in spirit.
>
> **Reading:** the new card's ZH and EN are **internally aligned** (good). But the heading drifted from the docs (HTML `依期間定價。` ≠ Slide 27's `專利授權套件組合` ≠ copy-audit's `專利授權套件組合`). Industry labels were also reworded vs Slide 27 (網路通訊→網通與通訊, 計算機系統→運算系統, 多媒體影音/影像處理→多媒體與影像處理). Re-baseline both docs to this card.

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| 依期間定價。 | Priced by term. | Price by term. | ⚠️ ZH — drifted from Slide 27 heading `專利授權套件組合` | ☐ |
| 打造你的專利包 | Build your patent bundle | Build your bundle | ✅ aligned | ☐ |
| 一次訂閱，30 件 SABCD 評等專利，適用美國或台灣。 | One subscription, 30 SABCD-graded patents, for the US or Taiwan. | One subscription, thirty SABCD-graded patents in the US or Taiwan. | ✅ aligned | ☐ |
| 3 個月 / 6 個月 / 12 個月 / 24 個月 | 3 / 6 / 12 / 24 months | 3 / 6 / 12 / 24 months | ✅ aligned · matches Slide 27 (36-mo removed) | ☐ |
| / 月 | / month | / month | ✅ aligned | ☐ |
| 訂閱 | Subscribe | Subscribe | ✅ aligned | ☐ |
| 適用產業（6 大領域） | Applicable industries (6 major sectors) | Industries (6 sectors) | ✅ aligned | ☐ |
| 半導體設計與製造 | Semiconductor design & manufacturing | Semiconductor design & manufacturing | ✅ aligned (reworded vs Slide 27 `晶片半導體設計製造`) | ☐ |
| 網通與通訊 | Networking & communications | Networking & communications | ✅ aligned (reworded vs `網路通訊`) | ☐ |
| 運算系統 | Computing systems | Computing systems | ✅ aligned (reworded vs `計算機系統`) | ☐ |
| 整合應用（AI · 自駕 · 電動車） | Integrated applications (AI · self-driving · EV) | Integrated applications (AI · AV · EV) | ✅ aligned | ☐ |
| 多媒體與影像處理 | Multimedia & image processing | Multimedia & image processing | ✅ aligned (reworded vs `多媒體影音/影像處理`) | ☐ |
| 淨零與碳管理 | Net-zero & carbon management | Net-Zero & carbon | ✅ aligned (reworded vs `淨零碳排`) | ☐ |
| 憑證與交付 | Credentials & delivery | Proof & delivery | ✅ aligned | ☐ |
| 授權認證標章 + QR 驗證 | License-certification badge + QR verification | Verified License Badge + QR verifier | ✅ aligned | ☐ |
| DLC 數位授權憑證（PAdES · eIDAS） | DLC digital license credential (PAdES · eIDAS) | DLC digital credential (PAdES · eIDAS) | ✅ aligned | ☐ |
| MOICA 政府電子簽章 | MOICA government e-signature | MOICA / government e-signature | ✅ aligned | ☐ |
| 標章可用於展位與宣傳物 | The badge can be used on booths and promo materials | Badge usage on booths & promo | ✅ aligned | ☐ |
| 專利授權自權威機構 | Patents licensed from authoritative institutions | Licensed from established institutions | ✅ aligned · partner strip iPIC / III / NYCU (logos, no ZH text) | ☐ |

## From signup to a live license (6-step onboarding — was "How it works" 5-step)

> **HTML:** [3948–4154](../product/licensing/index.html#L3948-L4154). **Six pills** (選擇/智選/專利包/替換/付款/生效), each with a title, a subtitle, and **three checklist bullets.**
> **copy-audit-v1:** tracks a **5-step rail shared with the homepage** — **stale** (now 6 steps, page-specific).
> **direction-doc:** Slides 22–26 describe a **5-card wizard** (`pick/ways/activate/swap/badge`). The **ZH shipped there no longer matches** this section's ZH (rewritten), and the step count changed 5→6.
>
> **⚠️ This is the most divergent section in the page.** It diverges from **both** the direction-doc's shipped ZH **and** its own EN. The EN bullets in particular are **not translations of the ZH** — several say something different. Below, `Literal EN` = faithful translation of the **HTML ZH**; `Site EN` = the actual English bullet, so you can see the gap. **Site EN needs a full rewrite to match ZH (or vice versa).**

**Heading + step pills**

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| 從註冊到生效授權 | From registration to an active license | From signup to a live license | ✅ aligned | ☐ |
| 選擇 / 智選 / 專利包 / 替換 / 付款 / 生效 | Pick / Smart-pick / Bundle / Swap / Payment / Active | Pick / Smart Pick / Bundle / Swap / Payment / Active | ✅ aligned (6 pills) | ☐ |

**Step 1 — Pick**

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| 選擇你的國家與產業 | Choose your country and industry | Pick your jurisdiction and industry | ✅ aligned (drifted from Slide 22 `選擇法域 × 產業 × 期間`) | ☐ |
| 一包專利包對應一個國家、一個產業，只為你真正需要的市場付費。 | One bundle corresponds to one country, one industry — pay only for the market you actually need. | Pay for the market you're actually entering — one jurisdiction, one industry. | ✅ meaning aligned (drifted from Slide 22 body) | ☐ |
| US、TW，兩個主戰場供專利佈局。 | US, TW — two main battlefields for patent positioning. | Cover the market your customers buy in | ⚠️ EN↔ZH — **different statement** | ☐ |
| 一包專利包對應單一國家 × 單一產業，聚焦不臃腫。 | One bundle maps to a single country × single industry — focused, not bloated. | One jurisdiction × one industry per bundle | ✅ meaning aligned | ☐ |
| 30 件 SABCD 評級專利組合，針對該市場精準佈局。 | A 30 SABCD-graded patent bundle, precisely positioned for that market. | Thirty SABCD-graded patents, scoped to that market | ✅ aligned | ☐ |

**Step 2 — Smart Pick**

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| 兩種建立 30 專利包的方法 | Two methods to build the 30-patent bundle | Two ways to build your 30 | ✅ aligned | ☐ |
| AI 快速取得組合，或提交 FTO 報告精準篩選。 | AI rapidly obtains the bundle, or submit an FTO report for precise filtering. | A bundle in 15 seconds — or hand us your FTO and we'll route around it. | ⚠️ EN↔ZH — EN adds "15 seconds" / "route around"; not in ZH | ☐ |
| 方法 A - AI 智選 (免費)：由 AI 為你智選 30 個符合需求的專利包。 | Method A — AI Smart-pick (free): AI smart-picks 30 patents matching your needs as the bundle. | Let the system recommend a bundle, free | ⚠️ EN↔ZH — heavily compressed | ☐ |
| 方法 B - FTO 保選 (付費)：上傳你的 FTO 報告或加價購委托泰然產出 FTO 報告，針對專利佈局不足之處，精準篩選專利包。 | Method B — FTO guaranteed-pick (paid): upload your FTO report, or pay extra to commission TIS to produce an FTO report; precisely filter the bundle for gaps in your patent positioning. | Or hand us your FTO to guide the pick | ⚠️ EN↔ZH — EN drops the paid-commission option entirely | ☐ |
| 平台提供首選 30 和備選 30 專利清單，供你挑選。 | The platform provides a primary 30 and an alternate 30 patent list for you to choose from. | Either path ships with a same-tier swap pool | ⚠️ EN↔ZH — **different statement** | ☐ |

**Step 3 — Bundle**

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| 檢視你的 30 專利包 | Review your 30-patent bundle | Review your 30-patent bundle | ✅ aligned | ☐ |
| 針對特定商品特定市場選取 30 個最佳專利組合。 | Selects the 30 best patents into a bundle for a specific product and specific market. | 30 SABCD-graded patents, curated to your market in under 15 seconds. | ⚠️ EN↔ZH — EN adds "SABCD" + "15 seconds" not in ZH | ☐ |
| 橫跨 5 個評級 (5S.6A.9B.6C.4D)，有質有量兼備。 | Spans 5 tiers (5S.6A.9B.6C.4D) — both quality and quantity. | Get a tier-balanced bundle, flagship to long tail | ✅ meaning aligned | ☐ |
| 來自國家級創智法人、資策會法人、陽明交大學術單位等優質專利池，品質有保障。 | From premium patent pools such as the national-grade 創智 (iPIC) institution, 資策會 (III) institution, and 陽明交大 (NYCU) academic units — quality assured. | Drawn from the Innovue, iPIC, III & NYCU pool | ⚠️ EN↔ZH — EN adds **Innovue** (not in ZH); ZH lists 創智/iPIC | ☐ |
| 不用等 18 個月或無止盡商務談判，訂閱到生效快速打通關。 | No waiting 18 months or endless business negotiations — fast from subscription to going live. | Go live the week you subscribe | ✅ meaning aligned | ☐ |

**Step 4 — Swap**

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| 鎖定專利包 | Lock the bundle | Swap patents — your call | ⚠️ EN↔ZH — **opposite framing** (ZH "Lock", EN "Swap"). Drifted from Slide 25 (`鎖定專利包`). | ☐ |
| 同評級專利可自選替換，隨你決定，不加價、無等審。 | Same-tier patents can be freely swapped at your discretion — no surcharge, no review wait. | Don't love a pick? Swap it — no surcharge, no review delay. | ✅ meaning aligned | ☐ |
| 平台提供首選 30 和備選 30 專利清單，供你自選替換。 | The platform provides a primary 30 and an alternate 30 patent list for you to swap. | Swap any pick from a same-tier pool | ✅ meaning aligned | ☐ |
| 授權期間內可不限次替換同評級專利，提升企業防禦力。 | Within the license term, unlimited same-tier swaps — raises enterprise defensive capability. | Swap as often as you like, within term | ✅ aligned | ☐ |
| 只要維持評級組合 (5S.6A.9B.6C.4D)，想怎麼換就怎麼換。 | As long as the tier composition (5S.6A.9B.6C.4D) is maintained, swap however you want. | Replace like-for-like — the count stays thirty | ✅ meaning aligned | ☐ |

**Step 5 — Payment**

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| 期間與付款 | Term and payment | Term and payment | ✅ aligned | ☐ |
| 選擇授權期間，以信用卡或電匯付款；款項到帳即刻啟用。 | Choose the license term, pay by credit card or wire transfer; activates the moment payment arrives. | Pick your term, then settle by card or wire — the bundle activates the moment payment clears. | ✅ aligned | ☐ |
| 3、6、12、24 個月期，隨時可升級延長授權期間。 | 3 / 6 / 12 / 24-month terms; upgradable anytime to extend the license period. | Choose the term that fits your runway | ⚠️ EN↔ZH — EN drops the upgrade/extend detail | ☐ |
| 期間越長，月費越低。 | The longer the term, the lower the monthly fee. | Longer terms, lower monthly rate | ✅ aligned | ☐ |
| 信用卡或電匯付款，開立新台幣發票。 | Pay by credit card or wire; an NT$ invoice is issued. | Pay by card or wire — NT$ invoice issued | ✅ aligned | ☐ |

**Step 6 — Active**

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| 展示憑證，展示你的軟實力 | Display the credential, display your soft power | Display the credential — and the full file | ⚠️ EN↔ZH — different framing (drifted from Slide 26 `展示憑證，展示你的軟實力`) | ☐ |
| 高規格授權認證標章，供客戶查詢，拉高被告門檻。 | A high-spec license-certification badge, for customers to verify — raising the threshold for being sued. | One Document Center — everything you need to display, defend, and prove the license. | ⚠️ EN↔ZH — **entirely different statement** | ☐ |
| 高規格公證電子簽章的數位授權憑證，內嵌獨一授權編號與 QR Code，2 秒線上即時驗證。 | A high-spec, notarized-e-signature digital license credential, embedded with a unique license number and QR code — verified live online in 2 seconds. | Embed the credential anywhere, PNG or SVG | ⚠️ EN↔ZH — **entirely different statement** | ☐ |
| 「泰然 × 權威機構」的聯名授權認證標章，可自由印製於國際展位、提案書、官網 Footer 或產品外包裝，讓對手不敢輕易踩線。 | The "TIS × authoritative institution" co-branded license-certification badge — freely printable on international booths, proposals, the website footer, or product packaging — keeps opponents from crossing the line. | Hand over a PAdES-signed contract and certificate | ⚠️ EN↔ZH — **entirely different statement** | ☐ |

## FAQ (cleanest section — ZH & EN correspond)

> **HTML:** [4156–4225](../product/licensing/index.html#L4156-L4225). 5 Q&A, EN uses `<strong>` emphasis (ZH plain).
> **copy-audit-v1:** [§ Licensing › FAQ](copy-audit-v1.md) — transcribed and **matches HTML**.
> **direction-doc:** no FAQ slide for licensing.
>
> **Reading:** the one body section where EN is a faithful rendering of the ZH. Already in the audit doc verbatim — **no re-baseline needed**; just carry the ☐ rows forward. ⚠️ **One cross-section number conflict:** the invalidation answer says **"up to 15% off on 24-month"** (= 85折), but the Deliverables card 6 says **88折 / 12% off**. One of the two is wrong.

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| 常見問題 | Common questions | FAQ | ✅ aligned | ☐ |
| 專利從哪裡來？ | Where do the patents come from? | Where do the patents come from? | ✅ aligned | ☐ |
| 每組組合策展自 Innovue WEBPAT 與策略合作夥伴。所有專利在進入組合池前皆通過 PSS 引擎預先評等。 | Every bundle is curated from Innovue WEBPAT and strategic partners. All patents are pre-scored by the PSS engine before entering the bundle pool. | Every bundle is curated from **Innovue's WEBPAT** and strategic aligned partners. Every patent is pre-scored on the PSS engine before it's eligible for any bundle. | ✅ aligned | ☐ |
| 為什麼每組都是固定的 5/6/9/6/4 分布？ | Why is every bundle a fixed 5/6/9/6/4 distribution? | Why does every bundle have the same 5/6/9/6/4 split? | ✅ aligned | ☐ |
| 初始分布：5 件 S + 6 件 A + 9 件 B + 6 件 C + 4 件 D，依產業池每季再平衡。旗艦級 (S/A) 在談判桌上面對對手；密度級 (B) 覆蓋戰場；長尾 (C/D) 補洞並維持價格。可預測，且能撐住真實授權方所遇到的各種反制。 | Initial distribution: 5 S + 6 A + 9 B + 6 C + 4 D, rebalanced quarterly by industry pool. Flagship (S/A) face opponents at the negotiation table; density (B) covers the battlefield; the long tail (C/D) plugs holes and holds the price. Predictable, and withstands the counter-moves real licensees face. | Thirty patents — initial split **5 S + 6 A + 9 B + 6 C + 4 D**, rebalanced quarterly per industry pool. The flagship tiers (S/A) face the counter-party at the negotiation table. The density tier (B) covers the battlefield. The long tail (C/D) plugs gaps and holds the price down. Predictable, and it holds up under the kind of pushback real licensees see. | ✅ aligned | ☐ |
| 你們怎麼決定我們組合裡的 30 件？ | How do you decide the 30 in our bundle? | How do you decide which 30 patents go into our bundle? | ✅ aligned | ☐ |
| 上傳你的產品說明書或 FTO 報告。24 小時內收到組合候選。同源評分引擎（與 Signal 共用）跨產業池計算交集密度。若有 5–7 件不適配你的產品線，可在簽約前從動態池中替換。 | Upload your product spec or FTO report. Within 24 hours, receive a candidate bundle. The same-source scoring engine (shared with Signal) computes intersection density across the industry pool. If 5–7 don't fit your product line, swap them from the dynamic pool before signing. | Upload your **product spec** or your **FTO report**. Within 24 hours, you get a candidate bundle. The same scoring engine that drives Signal computes overlap density against the industry pool. If 5–7 patents don't fit your product line, you can swap them out from the dynamic pool before you sign. | ✅ aligned | ☐ |
| 合約期內若有專利被撤銷會發生什麼事？ | What happens if a patent is invalidated during the contract period? | What happens if a patent gets invalidated mid-contract? | ✅ aligned | ☐ |
| 同級替換，無需額外費用。S 換 S。A 換 A。整個合約期，30 件就是 30 件。期間 3 / 6 / 12 / 24 個月，24 個月最高省 15%。續約 MSRP。整段非專屬。 | Same-tier replacement, no extra cost. S for S. A for A. For the whole contract, 30 stays 30. Terms 3 / 6 / 12 / 24 months, 24-month saves up to 15%. Renewals at MSRP. Non-exclusive throughout. | **Same-tier replacement at no extra cost.** S replaces S. A replaces A. The number 30 stays 30 for the full term. Terms run 3 / 6 / 12 / 24 months, up to 15% off on 24-month. Renewals at MSRP. Non-exclusive throughout. | ⚠️ **15% here vs 12% (88折) in Deliverables card 6** — reconcile | ☐ |
| 從訂閱到拿到徽章需要多久？ | How long from subscription to getting the badge? | How long from subscribing to having the badge in hand? | ✅ aligned | ☐ |
| 約一週。15 分鐘填完六步引導（法域 → 產業 → 期間 → 路徑 → 公司 → 結果）。AI 24 小時內回傳候選組合。簽約後徽章於 72 小時內以你的名義生效。 | About a week. 15 minutes to complete the six-step wizard (jurisdiction → industry → term → path → company → results). AI returns a candidate bundle within 24 hours. After signing, the badge goes live in your name within 72 hours. | About a week. **Fifteen minutes** to fill out the six-step wizard (jurisdiction → industry → term → path → company → results). AI returns a candidate bundle within **24 hours**. Once you sign, the badge is active in your name within **72 hours**. | ✅ aligned | ☐ |

## Contact (form matches homepage; copy-audit-v1's transcribed values are stale)

> **HTML:** [4226–4305](../product/licensing/index.html#L4226-L4305). Full form: Full Name / Job Title / Email / Phone / Organization / Inquiry Type (dropdown) / Your Inquiry + office hours + Send Inquiry + success message.
> **copy-audit-v1:** [§ Licensing › Contact](copy-audit-v1.md) points to Homepage as canonical and tracks only the **Inquiry Type override.** The form **does** match the homepage byte-for-byte (verified: homepage also has 職稱/Job Title + 電話/Phone) — so the canonical pointer holds. But copy-audit-v1's *transcribed homepage values* (Name / Email / Submit) are **stale** vs the live Full Name / Email Address / Send Inquiry.
> **direction-doc:** Slide 16 covers the Inquiry-Type dropdown (homepage-shared).
>
> **Reading:** ZH/EN fully aligned across the form. No EN-divergence issue here. Action is on the **audit doc**, not the page: refresh the homepage Contact transcription, and confirm the page-specific dropdown override.

| ZH (HTML) | Literal EN | Site EN (HTML) | Δ | Status |
|---|---|---|---|---|
| 與我們聯絡。 | Get in touch with us. | Get in touch. | ✅ aligned | ☐ |
| 姓名 | Name | Full Name | ✅ aligned | ☐ |
| 職稱 | Job title | Job Title | ✅ aligned | ☐ |
| 電子郵件 | Email | Email Address | ✅ aligned | ☐ |
| 電話 | Phone | Phone Number | ✅ aligned | ☐ |
| 機構 | Organization | Organization | ✅ aligned | ☐ |
| 諮詢類型 | Inquiry type | Inquiry Type | ✅ aligned | ☐ |
| 授權組合 | Licensing bundle | Licensing bundle | ✅ aligned (default + option; page-specific override) | ☐ |
| Signal / 估值 | Signal / valuation | Signal / valuation | ✅ aligned | ☐ |
| 媒體採訪 | Media interview | Press & media | ✅ aligned | ☐ |
| 其他 | Other | General | ✅ aligned | ☐ |
| 您的需求 | Your needs | Your Inquiry | ✅ aligned | ☐ |
| 台北 (UTC+8) | Taipei (UTC+8) | Taipei (UTC+8) | ✅ aligned | ☐ |
| 週一至週五 | Monday to Friday | Mon–Fri | ✅ aligned | ☐ |
| 服務時間 | Office hours | Office hours | ✅ aligned | ☐ |
| 送出諮詢 | Submit inquiry | Send Inquiry | ✅ aligned | ☐ |
| 訊息已送出。 | Message sent. | Message sent. | ✅ aligned | ☐ |
| 已收到您的諮詢。我們將於 1–2 個工作天內回覆。 | Your inquiry has been received. We'll reply within 1–2 business days. | Inquiry received. We'll be in touch within 1–2 business days. | ✅ aligned | ☐ |

---

## Summary — what changes, what's irrelevant

**Needs a copy update (EN ↔ ZH divergence — the page's main issue):**
- **Hero** — 6 of 7 rows: EN still on old positioning (incl. CTA "Build your bundle" = superseded ZH).
- **Deliverables** — 3 heading rows read as a different register from ZH (acceptable if intentional, but flag).
- **From signup to a live license (onboarding)** — **the worst.** Step 4 title is *opposite* (Lock vs Swap); Step 6's three bullets + subtitle are *entirely different statements* in EN vs ZH; several Step 2/3/5 bullets diverge. **Site EN needs a full rewrite to mirror ZH.**

**Factual / number conflicts to reconcile (not translation — content bugs):**
- **創智 (iPIC) vs "ITRI"** — ZH says 創智 (matches the iPIC partner strip), EN says ITRI. Appears in Deliverables card 2 **and** Inside-the-bundle AI card. Pick one.
- **Discount: 12% (88折) vs 15% (85折)** — Deliverables card 6 says 12%; FAQ + Slide 27 say 15%. Pick one.
- **Innovue** appears in the EN onboarding pool list and Inside-the-bundle, but the ZH onboarding pool list omits it. Decide whether Innovue is named in the pool or just the engine.

**Reference docs are stale — back-fill / re-baseline (doc work, not page work):**
- **copy-audit-v1.md** §Licensing: Deliverables (4→6 cards), Pricing (estimator removed), How-it-works (5→6 onboarding) all need re-baselining; Contact's homepage transcription needs a refresh.
- **chinese-copy-direction.md** Slides 22–27: the wizard ZH (Slides 22–26) and the pricing estimator (Slide 27) describe UI that **no longer exists**. The three new sections (Cover-the-gap, Inside the bundle, What you walk away with) aren't in the direction doc at all.

**Irrelevant / already fine (leave alone):**
- **FAQ** — ZH & EN correspond; already in the audit doc verbatim.
- **Cover-the-gap, Inside the bundle, What you walk away with** — EN ↔ ZH are well-aligned as written (only the repeated CTA carries the hero's stale-EN issue). The *only* open item is that they're untracked upstream.
- **Contact, Pricing card** — internally bilingual-consistent; no EN-rewrite needed.
- **Page chrome + footer** — out of scope; canonical-shared, tracked in copy-audit-v1.
