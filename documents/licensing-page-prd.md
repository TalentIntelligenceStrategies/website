---
title: Licensing Platform landing page — content & flow PRD
owner: marketing / design
surface: website (/product/licensing/index.html)
status: draft
created_at: 2026-06-04
updated_at: 2026-06-04
sources:
  - brand/brand-voice.md
  - website/documents/chinese-copy-direction.md
  - website/documents/copy-audit-v1.md
  - .claude/plans/we-re-going-to-under-lexical-dahl.md
---

# Licensing Platform landing page — content & flow PRD

## 1. Purpose & scope

This PRD governs the **content, storytelling, and conversion flow** of `website/product/licensing/index.html` — the marketing landing page for the **Licensing Platform** (泰然專利防護網). It exists so the page can be **re-rendered with a brand-new visual look** (via the `ui-ux-pro-max` skill) without losing the narrative, the bilingual copy, or the funnel logic.

**What this PRD owns:** who the page is for, the order the story is told in, every section's English **and** Chinese copy, the CTAs, and where the reader lands (`lobby.html`).

**What this PRD defers:** the visual treatment — layout grammar, type scale, color, motion, component styling. Those are the UI skill's call, constrained only by `brand/` tokens. Section layouts named below ("editorial," "scrollytell," "timeline," "scenario cards") are **intent hints, not binding specs**.

**Hard lock:** the **nav header** and **footer** (§5) are byte-locked — preserve markup, classes, `data-zh` attributes, and `href`s verbatim. **Every other section is unlocked.**

This is a website-surface authoring doc (lives alongside `chinese-copy-direction.md`). It is **not** a brand `.md` and **not** a portal app PRD, so it does not trigger the brand-sync hook and needs no consumer-repo snapshot resync.

---

## 2. Target reader (single)

**王董 — Export SME owner.** 48–58, owns a 50–200-person OEM (PCB / mechanical / textile / electronic components). Mental model: *"We make products. We're not a major manufacturer. We worry about being sued only when we get sued."* Budget NT$5–15K/month.

Core anxiety: *"Will I get blocked at the US trade show? Will buyers walk?"* The whole page reads top-to-bottom as the answer to that one anxiety. Frame: **anxiety → resolution** (出國保旅平險。出口保專利險。).

VC (Wang Partner) and grant SME (美玉姐) are **out of scope** for this page — they are served on other surfaces.

---

## 3. Storytelling direction — the 7 beats

The page is one continuous narrative, not a feature list. The reader moves through:

1. **Why patents matter now** — the procurement-team-runs-a-search-on-you moment.
2. **Why filing your own isn't viable** — NT$50,000+ and 18 months, ×30.
3. **What TIS gives you instead** — the bridge: one subscription, 30 patents, active the week you subscribe.
4. **Why the bundle is built the way it is** — why 30; the SABCD split; how AI picks it.
5. **What the week-after looks like** — lived proof, Day 1 → Week 2.
6. **Honest about the edge cases** — three scenarios + playbook, no "never sued" myth.
7. **Pricing → FAQ → contact** — convert.

**Principle — reuse over generate.** Every Chinese string is either lifted verbatim from the live page / `chinese-copy-direction.md`, recombined from locked fragments, or flagged `[ZH NEEDED]` (a Miko-lock decision, never a draft-time guess). The `copy-audit-v1.md` cross-check (§8) confirms which strings are verbatim-sourced.

---

## 4. Voice guardrails

Pointer of record: `brand/brand-voice.md`. Inlined here for the writer's convenience.

**Anchor numbers — render exactly:** `170M-patent database` · `3rd-largest globally` · `30 patents per bundle` · `NT$3,390–9,990/month` · `3 / 6 / 12 / 24 個月` terms · `18 months` (PCT filing-to-grant baseline).

**Banned (EN):** may, could (potentially), helps you, AI-powered, revolutionary, disruptive, game-changing, unlock, empower, seamless, leverage (v.), solutions, world-class, best-in-class, actionable insights, industry-leading, trusted by.

**Banned (ZH):** 革命性、顛覆性、智能 (as a generic prefix)、完全、業界領先、賦能.

**Preferred (ZH):** real numbers (30 件 / 月均不到 1 萬), named institutions (創智 / 資策會 / 陽明交大), specific jurisdictions (美國 / 歐盟 / 日本 / 台灣 / 韓國), full tier tokens (`Tier S`, never a bare letter).

**Locked names:** 泰然專利防護網 = Licensing Platform · CTA verb = 試跑專利包. Credit Innovue **once** near the top (the 170M-patent database / 3rd-largest globally line); after that, TIS voice carries the page.

---

## 5. Locked components — DO NOT ALTER

The UI skill must reproduce these two blocks **verbatim** — markup, classes, `data-zh` attributes, and `href`s unchanged. Everything between them is free to be re-rendered.

### 5.1 Nav header (`header.topnav`)

```html
<header class="topnav" role="banner">
  <div class="container topnav-inner">
    <a href="/" class="topnav-logo-link" aria-label="TIS — home">
      <span class="topnav-logo" aria-hidden="true"></span>
    </a>

    <span class="topnav-spacer"></span>

    <nav class="topnav-links" aria-label="Primary">
      <div class="topnav-dropdown-wrap">
        <button type="button" class="topnav-link has-dropdown" id="products-trigger" aria-haspopup="menu" aria-expanded="false" aria-controls="products-menu">
          <span data-zh="產品">Products</span>
          <svg class="topnav-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div id="products-menu" class="products-menu" role="menu" aria-labelledby="products-trigger">
          <div class="products-menu-grid">
            <a href="/product/licensing/" class="product-card" role="menuitem" aria-current="page">
              <span class="product-card-name" data-zh="泰然專利防護網">Licensing Platform</span>
              <span class="product-card-desc" data-zh="精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。">Patent insurance for exporters. Curated 30 patent bundles, fast to activate.</span>
            </a>
            <a href="/product/signal/" class="product-card" role="menuitem">
              <span class="product-card-name" data-zh="泰然專利強度評級系統">Signal Platform</span>
              <span class="product-card-desc" data-zh="比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。">Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry.</span>
            </a>
          </div>
        </div>
      </div>
      <a href="/#reports"  class="topnav-link" data-zh="報告">Reports</a>
      <a href="/#press"    class="topnav-link" data-zh="新聞">Press</a>
      <a href="/#about"    class="topnav-link" data-zh="關於">About</a>
    </nav>

    <div class="topnav-controls">
      <!-- Language switcher — Lucide `globe` icon (brand/assets/icons/ui/globe.svg) -->
      <div class="lang-wrap" id="lang-wrap">
        <button id="lang-trigger" type="button" class="icon-btn" aria-label="Switch language" aria-haspopup="menu" aria-expanded="false">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
            <path d="M2 12h20"/>
          </svg>
        </button>
        <div class="lang-menu" role="menu">
          <button type="button" data-lang-set="en" role="menuitemradio" aria-checked="true">English</button>
          <button type="button" data-lang-set="zh" role="menuitemradio" aria-checked="false">中文</button>
        </div>
      </div>

      <!-- Search trigger — Lucide `search` icon (brand/assets/icons/ui/search.svg) -->
      <button id="search-trigger" type="button" class="icon-btn" aria-label="Search" aria-haspopup="dialog" aria-expanded="false" aria-controls="search-modal">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m21 21-4.34-4.34"/>
          <circle cx="11" cy="11" r="8"/>
        </svg>
      </button>

      <a href="#contact" class="btn btn-primary topnav-cta" data-zh="聯絡業務">Contact sales</a>

      <!-- Mobile trigger -->
      <button class="topnav-mobile-trigger" id="mobile-trigger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
</header>
```

> The mobile drawer (`aside#mobile-drawer`) mirrors this nav's `data-zh` set and is part of the same lock. The `aria-current="page"` on the Licensing product card is correct for this page — keep it.

### 5.2 Footer (`footer.footer`)

```html
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-nl-block" id="footer-nl-block">
          <div class="footer-nl-label" data-zh="訂閱最新動態">Get Our Latest News</div>
          <form class="footer-nl-form" id="footer-nl-form" novalidate>
            <input type="email" placeholder="Your Email" aria-label="Email address" required />
            <button type="submit" aria-label="Subscribe">
              <svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              <svg class="icon-check" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
          </form>
        </div>
        <div class="footer-logo-row">
          <span class="footer-logo" aria-hidden="true"></span>
          <span class="footer-divider" aria-hidden="true"></span>
          <span class="footer-innovue" role="img" aria-label="Innovue"></span>
        </div>
        <p class="footer-copy">© 2026 Talent Intelligence Strategies</p>
      </div>

      <div class="footer-cols">
        <div class="footer-col">
          <h4 data-zh="產品">Products</h4>
          <ul>
            <li><a href="/product/licensing/" data-zh="泰然專利防護網">Licensing Platform</a></li>
            <li><a href="/product/signal/" data-zh="泰然專利強度評級系統">Signal Platform</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-zh="公司">Company</h4>
          <ul>
            <li><a href="/#about" data-zh="關於">About</a></li>
            <li><a href="/#reports" data-zh="報告">Reports</a></li>
            <li><a href="/#press" data-zh="新聞">Press</a></li>
            <li><a href="#contact" data-zh="聯絡">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-zh="法律">Legal</h4>
          <ul>
            <li><a href="#" data-zh="服務條款">Terms</a></li>
            <li><a href="#" data-zh="隱私政策">Privacy</a></li>
            <li><a href="#" data-zh="揭露聲明">Disclosures</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-col">
        <h4 data-zh="聯絡">Contact</h4>
        <ul>
          <li><a href="mailto:contact@tisglobalinc.com">contact@tisglobalinc.com</a></li>
          <li><a href="#" data-zh="台北 · 台灣">Taipei, Taiwan</a></li>
        </ul>
      </div>
    </div>

  </div>
</footer>
```

> Footer text is byte-identical across all three site pages; only `href`s differ (product pages use `/#about` etc. to point back to homepage anchors). The `Terms / Privacy / Disclosures / Taipei` `href="#"` placeholders are pre-existing TODOs, not part of this work.

---

## 6. Section-by-section spec (17 sections)

Layout grammar in parentheses is **guidance only**. CTA convention: primary = `Build your bundle` / `試跑專利包` → `/product/licensing/lobby.html`. Source tags: **[verbatim]** = matches a live `data-zh` row (per copy-audit-v1.md); **[recombined]** = assembled from locked fragments; **[ZH NEEDED]** = Miko-lock, do not draft.

### §1 — Announcement banner (keep)

- **EN:** `30-patent bundles starting at NT$3,390/month.`
- **ZH:** `30 件專利組合，每月 NT$3,390 起。` **[verbatim — short form locked canonical; no 「泰然專利防護網正式上線 —」 prefix]**
- **Link:** `View pricing →` / `查看定價 →` → `#pricing` **[verbatim]**
- Dismissible; `data-announce-id="2026-q2-licensing-pricing"`.

### §2 — Hero (keep, light tighten)

- **Eyebrow / product name ZH:** `泰然專利防護網` **[verbatim]**
- **Heading EN:** `30-patent shield. Active this week.`
- **Heading ZH:** `出口買專利險，` + `30 件專利包輕裝上陣。` (two spans) **[verbatim]**
- **Subhead EN:** ~~`One subscription, thirty SABCD-graded patents, curated for your jurisdiction and industry — passive defense to active position the week you subscribe.`~~ → `One subscription. Thirty SABCD-graded patents, picked for your export market and industry — issued in your company's name the week you subscribe.`
- **Subhead ZH:** `1 分鐘勾選國家 × 產業 × 期別，2 種專利包選法，5 類專利評級，戴上授權認證標章立刻從被動防禦轉為主動佈局。` **[verbatim]**
- **Primary CTA:** `Build your bundle` / `試跑專利包` → `lobby.html` **[verbatim]**
- **Secondary CTA:** `Talk to sales` / `聯絡業務` → `#contact` **[verbatim — resolved 2026-06-04; supersedes the storytelling plan's "View pricing →"]**

### §3 — Why this matters now (editorial)

- **Eyebrow:** `Why now` / `為什麼是現在` **[ZH NEEDED]**
- **Heading:** `Exporting buys patent insurance.` / `出國保旅平險。出口保專利險。` **[verbatim — chinese-copy-direction.md]**
- **Subhead:** `Lawyer's fee NT$5M, the whole batch turned back at customs, treble damages on top. You'd buy travel insurance for the trip — patent insurance is the same risk class.` / `律師費 500 萬 + 整批退貨 + 三倍懲罰，水險都買，專利險怎麼能不買？` **[verbatim — chinese-copy-direction.md]**
- **Body (3 paras, ~640px column):**
  1. EN `You ship from Taiwan. Your buyer is in Texas, Frankfurt, Yokohama. Their procurement team runs a patent search on you before the PO clears. If your name returns thin, the order gets held.` / ZH `拼出口的台灣頭家，這裡有一張關鍵名片。` **[verbatim]** + procurement-search sentence **[ZH NEEDED]**
  2. EN `Filing one patent yourself runs NT$50,000+ and 18 months. Hiring a dedicated IP engineer breaks NT$1M a year. And you still won't have coverage the week a customer asks for it.` / ZH `自行申請 1 件專利需花費 NT$50,000+ 與 18 個月等待；聘請專職 IP 工程師年資產營運成本破百萬。` **[verbatim]**
  3. EN `Passive defense to active position the week you subscribe.` / ZH `從被動防禦轉為主動佈局。` **[verbatim]**
- **CTA:** `Build your bundle` / `試跑專利包`

### §4 — Why filing your own isn't viable (editorial, 3-column)

- **Eyebrow:** `The cost of going it alone` / `自己跑的代價` **[ZH NEEDED]**
- **Heading:** `Filing one patent yourself runs NT$50,000+ and 18 months. Now do that thirty times.` / `自行申請 1 件專利需花費 NT$50,000+ 與 18 個月等待 — 然後再做 30 次。` (lead clause [verbatim]; tail **[ZH NEEDED]**)
- **Three paths:**

  | Path | EN | ZH |
  |---|---|---|
  | File your own | NT$50,000+ per patent. 18 months to grant. One patent isn't a position — it's a target. | NT$50,000+ / 件 · 18 個月等待 · 1 件不是佈局，是被告的標靶。 **[recombined]** |
  | Hire the engineer | NT$1M+ a year for a dedicated IP engineer. You get a salary, not coverage. | 聘請專職 IP 工程師年資產營運成本破百萬。 **[verbatim]** |
  | Subscribe to TIS | Under NT$10K/month. Active the week you subscribe. Thirty patents, five tiers. | 月均不到 1 萬。當週上線。30 件，5 個評級。 **[recombined — flag for ZH lock]** |

- **Closing line:** `You only win if you fight. You don't have to fight blind.` / `愛拼才會贏，但不需要盲目打軍備競賽。` **[verbatim]**

### §5 — The bridge: what TIS gives you instead (scrollytell)

- **Eyebrow:** `What TIS gives you instead` / `泰然專利防護網` **[verbatim]**
- **Heading:** `One subscription. Thirty patents. Active the week you subscribe.` / `出口買專利險，30 件專利包輕裝上陣。` **[verbatim]**
- **Beat 1 — AI does the search.** EN ~~`Don't waste time reading thousands of claims. The TIS AI engine scans risk gaps across three axes (export country × industry × product line) and auto-recommends the 30 most relevant patents in 5 minutes.`~~ → `Don't waste time reading thousands of claims. The TIS AI engine scans risk gaps across three axes — export country × industry × product line — and recommends your 30 most relevant patents in 5 minutes.` / ZH `別把時間浪費在翻閱幾千件請求項（Claims）上。泰然 AI 引擎依據您企業的出口國 × 產業別 × 產品線三軸進行風險缺口掃描，5 分鐘內自動推薦最相關的 30 件專利組建防護包。支援人機協作與手動替換彈性，不需懂法律，大數據直接幫你罩。` **[verbatim — Deliverables card 1]**
- **Beat 2 — Joint license, your name on it.** EN ~~`ITRI / III / NYCU issue 30 legal IPs directly in your company's name — one credential, every front. International buyers and investors see institution-level IP backing, not a "small OEM" label.`~~ → `ITRI, III, and NYCU license thirty patents directly in your company's name — one credential that holds on every front. Buyers and investors see institution-grade IP standing behind you, not a small-OEM label.` / ZH `由創智、資策會、陽明交大三家權威研發機構，直接以貴公司名義開立 30 件核心專利合法授權。對外，是出海搶單的黃金名片。在國際買家、跨國投資人面前撕掉「代工小廠」的標籤，用機構級的真實 IP 後盾，讓客戶審查與合作談判都對你刮目相看。對內，是主動式的防啃骨頭盾。專利流氓（NPE）篩選敲詐目標時，一看到你背後拉起三家機構合法 IP 防線、攻擊成本高得多，自然會跳過你，去找更好下手的下家。` **[verbatim — Deliverables card 2]**
- **Beat 3 — Active the day after payment.** EN ~~`Active the day after payment — a Digital License Credential plus a "TIS × institution" badge. Verified online in 2 seconds. Print it on booth signage, proposals, website footer, or product packaging.`~~ → `Pay today, protected tomorrow. You get a Digital License Credential and a "TIS × institution" badge — any buyer verifies it online in 2 seconds. Print it on booth signage, proposals, your website footer, or the product box itself.` / ZH `金流確認隔日防護網立即啟動。平台同步交付包含公證電子簽章的數位授權憑證（DLC），以及帶有「TIS × 權威機構」★ 的聯名授權認證標章（Badge）。內嵌獨一授權編號與 QR Code，2 秒線上即時驗證，可自由印製於國際展位、提案書、官網 Footer 或產品外包裝，對手不敢輕易踩線。` **[verbatim — Deliverables card 3]**
- **Beat 4 — The honest beat.** EN ~~`Under NT$10K/month — doesn't sell the "never sued" myth, but deters patent trolls.`~~ → `Under NT$10K/month. It won't promise you'll never be sued — no one honest can. What it does: make you the expensive target patent trolls skip.` / ZH `月均不到 1 萬，不賣『絕對不被告』的神話，但讓專利蟑螂評估攻擊成本後跳過你找下家。` **[verbatim]**

### §6 — Why thirty, not one, not a hundred (scrollytell)

- **Eyebrow:** `The number is the argument` / `30 件就是 30 件` **[verbatim]**
- **Heading:** `Why thirty. Not one. Not a hundred.` / `為什麼是 30 件？不是 1 件，也不是 100 件。` **[ZH NEEDED]**
- **Beat 1 (numeral 1):** EN ~~`One patent isn't a position — it's a target. Filing one runs NT$50,000+ and 18 months, and the moment it issues, the counter-party knows exactly which claim to design around.`~~ → `One patent isn't a position — it's a target. NT$50,000+ and 18 months to file, and the day it issues, the counter-party knows the one claim to design around.` / ZH `1 件不是佈局，是被告的標靶。自行申請 1 件專利需花費 NT$50,000+ 與 18 個月等待，發證的當下，對手已經知道要繞開哪一條請求項。` **[recombined]**
- **Beat 2 (numeral 100):** EN ~~`A hundred is overkill — an arms race you don't need. The marginal deterrent above thirty flattens; the cost doesn't.`~~ → `A hundred is an arms race you don't need. Past thirty, the deterrence stops climbing — the bill doesn't.` / ZH `愛拼才會贏，但不需要盲目打軍備競賽。30 件之上，嚇阻力的邊際收益遞減，成本卻不會。` **[recombined; lead clause verbatim]**
- **Beat 3 (numeral 30):** EN ~~`Thirty is the smallest number that holds a five-tier distribution — 5 S + 6 A + 9 B + 6 C + 4 D. Flagship tiers face the counter-party. The density tier covers the battlefield. The long tail holds the price down.`~~ → `Thirty is the smallest number that holds a full five-tier spread — 5 S + 6 A + 9 B + 6 C + 4 D. The flagship tiers face the counter-party. The density tier covers the battlefield. The long tail keeps the price down.` / ZH `30 件是能撐起 5 個評級分布的最小數字 — 5 件 S + 6 件 A + 9 件 B + 6 件 C + 4 件 D。旗艦級 (S/A) 在談判桌上面對對手；密度級 (B) 覆蓋戰場；長尾 (C/D) 補洞並維持價格。` **[verbatim — FAQ Q2 fragment]**
- **Closing anchor (unit economics):** EN ~~`Subscription keeps you under NT$10K/month. Same coverage takes NT$1.5M+ to self-file and over a year to land.`~~ → `One subscription, under NT$10K/month. The same thirty patents cost NT$1.5M+ to file yourself — and over a year before the first one lands.` / ZH `訂閱讓您月均支出控制在萬元以下；同等覆蓋自行申請，三十件就是一年半起跳、150 萬上下。` (multiplication tail **[ZH NEEDED]**)

### §7 — Inside the bundle: SABCD, explained (scrollytell)

- **Eyebrow:** `Tier S · A · B · C · D` / `橫跨 5 個評級` **[verbatim]**
- **Heading:** ~~`Thirty SABCD-graded patents, curated for your jurisdiction and industry.`~~ → `Thirty SABCD-graded patents, picked for your export market and industry.` / `5 類專利評級，30 件 SABCD 評等專利組合，依您出口國 × 產業而調。` **[verbatim]**
- **Subhead (FAQ Q2 narrative):** EN ~~`Initial split 5 S + 6 A + 9 B + 6 C + 4 D, rebalanced quarterly per industry pool. The flagship tiers (S/A) face the counter-party at the negotiation table. The density tier (B) covers the battlefield. The long tail (C/D) plugs gaps and holds the price down.`~~ → `It starts at 5 S + 6 A + 9 B + 6 C + 4 D, rebalanced every quarter against your industry pool. The flagship tiers (S/A) face the counter-party at the negotiation table. The density tier (B) covers the battlefield. The long tail (C/D) plugs the gaps and keeps the price down.` / ZH `初始分布：5 件 S + 6 件 A + 9 件 B + 6 件 C + 4 件 D，依產業池每季再平衡。旗艦級 (S/A) 在談判桌上面對對手；密度級 (B) 覆蓋戰場；長尾 (C/D) 補洞並維持價格。` **[verbatim — FAQ Q2]**
- **Five tier role-lines** (Tier chip + count + role):

  | Tier | Role EN | Role ZH |
  |---|---|---|
  | Tier S (5/5) | Flagship — faces the counter-party at the negotiation table | 旗艦級 — 在談判桌上面對對手 **[recombined — split of FAQ-Q2 run-on; ZH lock]** |
  | Tier A (6/6) | Flagship — faces the counter-party at the negotiation table | 旗艦級 — 在談判桌上面對對手 **[recombined — ZH lock]** |
  | Tier B (9/9) | Density — covers the battlefield | 密度級 — 覆蓋戰場 **[recombined — ZH lock]** |
  | Tier C (6/6) | Long tail — plugs gaps | 長尾 — 補洞 **[recombined — ZH lock]** |
  | Tier D (4/4) | Long tail — holds the price down | 長尾 — 維持價格 **[recombined — ZH lock]** |

- **Closing line:** ~~`Predictable, and it holds up under the kind of pushback real licensees see.`~~ → `Predictable — and built to hold up under the pushback real licensees actually face.` / `可預測，且能撐住真實授權方所遇到的各種反制。` **[verbatim — FAQ Q2 tail]**

### §8 — How AI picks your bundle (scrollytell)

- **Eyebrow:** `Three axes, five minutes` / `三軸掃描，5 分鐘內自動推薦` **[verbatim]**
- **Heading:** `Don't waste time reading thousands of claims.` / `別把時間浪費在翻閱幾千件請求項（Claims）上。` **[verbatim]**
- **Beat 1 — Three axes.** EN ~~`Risk gaps scanned across three axes: your export country, your industry, your product line. The same scoring engine that drives Signal computes overlap density against the industry pool.`~~ → `Three axes, scanned for risk gaps: your export country, your industry, your product line. The same scoring engine behind Signal measures how densely your exposure overlaps the industry pool.` / ZH `泰然 AI 引擎依據您企業的出口國 × 產業別 × 產品線三軸進行風險缺口掃描。同源評分引擎（與 Signal 共用）跨產業池計算交集密度。` **[verbatim]**
- **Beat 2 — The output.** EN ~~`Five minutes in, you get a candidate 30-patent bundle — 5 S + 6 A + 9 B + 6 C + 4 D — drawn from the Innovue, iPIC, III & NYCU pool, sourced from Innovue's 170M-patent database (3rd-largest globally).`~~ → `Five minutes in, you have a candidate 30-patent bundle — 5 S + 6 A + 9 B + 6 C + 4 D — drawn from the Innovue, iPIC, III & NYCU pool and the 170M-patent database behind it, the 3rd-largest globally.` / ZH `5 分鐘內自動推薦最相關的 30 件專利組建防護包 — 5 件 S + 6 件 A + 9 件 B + 6 件 C + 4 件 D — 來自國家級創智法人、資策會法人、陽明交大學術單位等優質專利池，引擎背靠 Innovue 1.7 億件專利資料庫（全球第三大）。` (ZH `1.7 億件` / `全球第三大` **[ZH NEEDED — recommend locking as a new anchor pair in chinese-copy-direction.md]**)
- **Beat 3 — Human in the loop.** EN ~~`Manual swap supported; no legal expertise required — big data covers you. If 5–7 picks don't fit your product line, you can swap them out from the dynamic pool before you sign.`~~ → `Swap by hand anytime — no legal expertise needed. If 5–7 of the picks don't fit your product line, replace them from the live pool before you sign.` / ZH `支援人機協作與手動替換彈性，不需懂法律，大數據直接幫你罩。若有 5–7 件不適配你的產品線，可在簽約前從動態池中替換。` **[verbatim]**

> **Timing note (Open Item, §8 list):** Beat 2 says `5 分鐘`; §9 / §10 / FAQ say a vetted candidate bundle arrives within `24 小時` and the badge in `72 小時`. Add a framing line distinguishing the on-screen recommendation (5 min) from the vetted candidate delivery (24 hr) so the two don't read as contradictory.

### §9 — How it works (keep, light edit)

- **Heading:** `How it works` / `運作方式` **[verbatim]**
- 5-step rail (existing, copy byte-identical to homepage Licensing pillar): pick country × industry × term → two ways to pick the 30 → relevant bundle suggested → swap patents → display the credential. Full step copy lives in `copy-audit-v1.md` lines 201–225 — reuse verbatim.

### §10 — The week after you subscribe (timeline)

- **Eyebrow:** `What the first week looks like` / `訂閱後第一週，發生這些事` **[ZH NEEDED]**
- **Heading:** `Passive defense to active position — the week you subscribe.` / `從被動防禦轉為主動佈局 — 就在你訂閱的這一週。` (lead clause [verbatim]; tail **[ZH NEEDED]**)
- **Markers:**

  | Marker | EN headline | ZH headline | Body |
  |---|---|---|---|
  | Day 1 | Badge live in your name | 第 1 天 · 標章以貴公司名義生效 **[ZH NEEDED]** | EN: Payment clears — the Digital License Credential and the "TIS × institution" badge issue the same day, carrying a unique license number and QR code. / ZH: `金流確認隔日防護網立即啟動。平台同步交付包含公證電子簽章的數位授權憑證（DLC），以及帶有「TIS × 權威機構」★ 的聯名授權認證標章（Badge）。內嵌獨一授權編號與 QR Code。` **[verbatim]** |
  | Day 3 | DLC at your counsel's desk | 第 3 天 · 授權檔送進法務手中 **[ZH NEEDED]** | EN: Hand over the PAdES-signed certificate and contract — your counsel reviews a finished file, not a draft. / ZH: `高規格公證電子簽章的數位授權憑證，交予您的法務團隊複核。` **[recombined; verb ZH NEEDED]** |
  | Day 7 | On the booth, in the deck | 第 7 天 · 展位上、提案書裡、簽名檔下 **[ZH NEEDED]** | EN: Print the badge on booth signage, proposals, website footer, or product packaging — embed anywhere, PNG or SVG. / ZH: `「泰然 × 權威機構」的聯名授權認證標章，可自由印製於國際展位、提案書、官網 Footer 或產品外包裝，讓對手不敢輕易踩線。` **[verbatim]** |
  | Week 2 | First buyer audit passes in 2 seconds | 第 2 週 · 首次買家審查 2 秒過關 **[ZH NEEDED]** | EN: Your buyer's procurement team scans the QR code on your booth signage — the license verifies online in 2 seconds. / ZH: `買家採購團隊掃描你展位上的 QR Code，2 秒線上即時驗證。` (verify clause [verbatim]; lead **[ZH NEEDED]**) |

### §11 — When it doesn't go to plan (3 scenario cards)

- **Eyebrow:** `What TIS can't promise` / `誠實話` **[ZH NEEDED]**
- **Heading:** `Doesn't sell the "never sued" myth. Tells you what happens when things go sideways.` / `不賣「絕對不被告」的神話。出狀況時，我們是這樣處理的。` (lead clause [verbatim]; second **[ZH NEEDED]**)
- Each card: SITUATION · WHAT TIS DOES · WHAT YOU DO · OUTCOME, with a small Status chip (no `danger`).

**Card 1 — A competitor sues anyway** (chip: warning)
- Situation: `A competitor files a suit despite the bundle.` / `即便有專利包，對手仍然提起訴訟。` **[ZH NEEDED]**
- What TIS does: `The 30-patent bundle becomes counter-claim ammunition. ITRI / III / NYCU stand behind the IP — institution-level backing on the record.` / `30 件專利組合成為反訴籌碼。創智、資策會、陽明交大三家機構的合法 IP 後盾留在卷宗上。` (`反訴籌碼` **[ZH NEEDED]**)
- What you do: `Hand the DLC and the chain-of-title to your counsel. The PAdES signature and the public QR-verifiable badge are evidence.` / `將 DLC 與授權鏈交予您的法務團隊。公證電子簽章與可線上查驗的標章即是證據。` **[recombined]**
- Outcome: `Most patent trolls weigh the attack cost and skip to an easier target. Genuine disputes settle from a stronger position.` / `專利蟑螂評估攻擊成本後跳過你找下家。真實爭議從更強的位置和解。` (lead clause [verbatim]; second **[ZH NEEDED]**)

**Card 2 — A bundled patent is invalidated mid-contract** (chip: info)
- Situation: `A patent in your bundle gets invalidated during the term.` / `合約期內若有專利被撤銷。` **[verbatim]**
- What TIS does: `Same-tier replacement at no extra cost. S replaces S. A replaces A. The number 30 stays 30 for the full term.` / `同級替換，無需額外費用。S 換 S。A 換 A。整個合約期，30 件就是 30 件。` **[verbatim — FAQ Q4]**
- What you do: `Approve the swap from the same-tier pool — no surcharge, no review delay.` / `平台提供首選 30 和備選 30 專利清單，供你自選替換 — 不加價、無等審。` **[verbatim]**
- Outcome: `Coverage stays at thirty, your badge stays live, your DLC re-issues with the new patent number in the chain-of-title.` / `30 件就是 30 件，標章持續有效，DLC 自動更新授權鏈。` (lead clause [verbatim]; tail **[ZH NEEDED]**)

**Card 3 — Accused of infringing a patent outside your bundle** (chip: info)
- Situation: `A claim names a patent your bundle doesn't carry.` / `被告侵權的專利不在你的專利包內。` **[ZH NEEDED]**
- What TIS does: `The bundle doesn't cover what it doesn't cover — TIS doesn't sell the myth that it does. What it does cover: the SABCD-graded 30 in your jurisdiction.` / `專利包只覆蓋它能覆蓋的範圍。泰然不賣『絕對不被告』的神話。它覆蓋的是您出口國的 30 件 SABCD 評等專利組合。` (myth clause [verbatim]; combinator **[ZH NEEDED]**)
- What you do: `Run a Signal scan on the disputed claim to map the actual exposure, then decide: extend your bundle to that adjacent industry pool, or treat it as a separate matter with your counsel.` / `透過 Signal 對爭議專利進行掃描，確定真實風險敞口；再決定是擴充專利包至相鄰產業池，或交由法務團隊另行處理。` **[ZH NEEDED]**
- Outcome: `You have evidence-driven options, not a blank-check insurance fiction.` / `你拿到的是基於證據的選項，而非空頭保險。` **[ZH NEEDED]**

**Coda (below grid):** `Composed under pressure. Methodical about coverage. Honest about the edge cases.` / `泰然 — 在壓力下從容，覆蓋範圍中按部就班，邊界情境裡誠實以告。` **[ZH NEEDED]**

### §12 — Patent inventory ticker (keep, reframe eyebrow)

- Eyebrow reframed for export-SME read; ZH `看看池子有多深 — 1,000+ 件專利…`
- Search + filter dropdowns: Industry / Jurisdiction / Tier; two horizontal scroll tracks. Filters reuse Tier + Jurisdiction chip components (`brand/components.md`).

### §13 — Who stands behind this (keep)

- Partner attribution band: Innovue + 創智 / 資策會 / 陽明交大.
- EN ~~`Find your position on patents from established institutions`~~ → `Find your position among patents licensed by established institutions.` / ZH `從這些機構所授權的專利中，找到你的位置。` **[verbatim]**
- CTA: `Build your bundle` / `組建你的組合` → `lobby.html` **[verbatim]**

### §14 — Pricing: build your bundle (keep)

- `#pricing`. EN `Pricing — Build your bundle.` / ZH `專利授權套件組合` **[verbatim]**
- Jurisdiction × industry × term builder. Terms `3 / 6 / 12 / 24 個月`. Band NT$3,390–9,990/month. Every-bundle-includes list per `copy-audit-v1.md` lines 490–497.
- **Open Item:** reconcile max-discount figure — Deliverables card 4 says `最高 88 折` (12%); FAQ Q4 says `24 個月最高省 15%`. Pick one before this section ships.
- Builder's `Subscribe` / `試跑專利包` action → `lobby.html`.

### §15 — FAQ (keep, light expansion)

- ZH `常見問題`. Five Q&A kept verbatim (`copy-audit-v1.md` lines 513–523): where patents come from · the 5/6/9/6/4 split · how the 30 are chosen · invalidation mid-contract · time from subscribe to badge.

### §16 — Contact (keep)

- `#contact`. EN `Get in touch.` / ZH `與我們聯絡。`
- Shared form structure (matches homepage byte-for-byte). Inquiry Type dropdown override: page default `授權組合 / Licensing bundle`; options Licensing bundle · Signal / valuation · Press & media · General.

### §17 — Footer (LOCKED)

See §5.2.

---

## 7. Funnel & CTA logic

One reader, one path, one endpoint.

- **Primary CTA** — `Build your bundle` / `試跑專利包` → `/product/licensing/lobby.html` — repeats at the hero (§2) and after each persuasion beat (§3, §4, §5, §6, §7, §10, §11) and in the partner band (§13). Pricing's `Subscribe` (§14) resolves to the same `lobby.html`.
- **Secondary CTAs** — hero (§2) → `Talk to sales` / `聯絡業務` → `#contact`; announcement banner (§1) → `View pricing →` → `#pricing`.

**Reader journey:** anxiety surfaced (§3) → self-file ruled out (§4) → bridge offered (§5) → bundle justified (§6–§8) → mechanics shown (§9) → outcome made concrete (§10) → objections pre-empted honestly (§11) → depth + credibility proven (§12–§13) → price made transparent (§14) → questions cleared (§15) → contact / **sign up at `lobby.html`**.

`lobby.html` is the page's **single conversion endpoint** — a split-screen surface (left marketing rail + right OAuth/email auth card). The UI skill must keep every primary CTA pointed at it and must not invent alternate destinations.

---

## 8. Open items

**`[ZH NEEDED]` — Miko-lock, do not draft:**
- §3 eyebrow (`為什麼是現在`) + procurement-search body sentence
- §4 eyebrow (`自己跑的代價`) + heading tail (`— 然後再做 30 次`)
- §6 heading (`為什麼是 30 件？…`) + unit-economics multiplication tail
- §7 five tier role-lines (recombined split of the FAQ-Q2 run-on) + §4 `月均不到 1 萬。當週上線。30 件，5 個評級。` cell
- §8 ZH `1.7 億件` / `全球第三大` — **recommend locking as a new anchor pair in `chinese-copy-direction.md`**
- §10 eyebrow + heading tail + Day-1/3/7/Week-2 ZH headlines + Day-3 verb + Week-2 lead clause
- §11 eyebrow (`誠實話`) + heading clause 2 + several card cells (`反訴籌碼`, Card 1/3 situations & outcomes, Card 3 what-you-do & outcome, coda)

**Copy reconciliations (resolve before copy ships):**
- **Timing:** §8 `5 分鐘` vs FAQ `24 小時 / 72 小時 / ~一週` — add a framing line (on-screen pick vs vetted candidate delivery).
- **Discount:** `最高 88 折` (12%, Deliverables card 4) vs `24 個月最高省 15%` (FAQ Q4) — pick one figure for §14.

**Resolved (2026-06-04):**
- Banner ZH → short form `30 件專利組合，每月 NT$3,390 起。` (no product-name prefix) is canonical.
- Hero secondary CTA → `Talk to sales` / `聯絡業務` → `#contact`.

**Inherited sign-off blockers (from `chinese-copy-direction.md`):**
- 三家機構 (創智 / 資策會 / 陽明交大) disclosure scope — legal + Innovue clearance on what's disclosable in marketing.
- Badge / public-verification page MVP timeline (Aug).
- Ownership of `/badge` showcase + methodology pages.

---

## 9. Verification

- **Structure:** all 17 sections present in order; each carries purpose + EN + ZH + CTA; nav (§5.1) and footer (§5.2) reproduced verbatim and labelled LOCKED.
- **Voice scan:** grep EN copy for banned phrases (`may`, `could`, `AI-powered`, `seamless`, `leverage`, `solutions`, `unlock`, `empower`, etc.) and ZH for 革命性 / 顛覆性 / 賦能 / 業界領先 — expect zero hits in shipped copy.
- **Anchor numbers:** confirm `170M-patent database`, `3rd-largest globally`, `30 patents`, `NT$3,390–9,990/month`, `18 months`, `3 / 6 / 12 / 24 個月` render exactly.
- **Funnel:** every primary CTA resolves to `/product/licensing/lobby.html`; hero secondary → `#contact`; banner → `#pricing`; no orphan/invented destinations.
- **Open items:** every `[ZH NEEDED]` in §6 appears in the §8 list (no silent gaps).
- **Cross-page copy:** before editing any shared EN/ZH pair, grep all three site HTML files (`index.html`, `product/licensing/index.html`, `product/signal/index.html`) — shared rows (nav, footer, Deliverables, How-it-works, FAQ) must stay 1:1; land edits in all files that carry them.
- **Downstream:** website-surface authoring doc — no brand-sync hook, no consumer-repo snapshot resync. After the UI skill re-renders the page, reconcile its copy back against this PRD and add a `copy-audit-v2.md`-style tracking pass.
```
