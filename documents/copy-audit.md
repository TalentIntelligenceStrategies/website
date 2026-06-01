# Copy Audit — TIS Marketing Site (Bilingual Parity)

> **⚠️ Chinese fidelity rule.** Every ZH cell below is copied **character-for-character** from the source HTML's `data-zh` / `data-zh-html` attributes — same characters, same punctuation (including 、，。「」 and full-width spaces), same order. Nothing is paraphrased, modernized, or converted between traditional/simplified. The only transformation applied is `|` → `\|` to keep table rows intact. **If a Chinese string looks off, the bug is upstream in the HTML** — flag with ❓, do not "fix" the audit doc.
>
> **Review legend** (Status column — tracks the internal review pipeline):
> - ☐ — pending review
> - ✅ — reviewed/approved (in audit doc; not yet shipped to HTML)
> - ✏️ ✅ — English edited + reviewed
> - 🆕 ✅ — Chinese added or changed + reviewed
> - ✏️ 🆕 ✅ — both EN and ZH edited + reviewed
> - 🚀 — live in production on tisglobalinc.com (additive — applied only after `git push origin main` deploys the row; HTML-file-only edits stay at `✏️ ✅` until then). E.g. `✏️ ✅ 🚀` = edited, reviewed, and live.
> - ✏️ / 🆕 — edited, pending re-approval (rare, transient)
> - 🔄 — pull from ZH side
> - ❓ — needs Irene/Miko sign-off
>
> **ZH ✓ column** (separate from Status — tracks *external* ZH review for user-authored Chinese; rolled out per table as we touch them, so not every table has the column yet):
> - *(blank)* — original ZH from source HTML; no external review needed
> - ☐ — user-authored or rewritten ZH; awaiting external review (Irene/Miko/etc.)
> - ✅ — user-authored ZH; externally reviewed and approved
> - ❓ — user-authored ZH; flagged for discussion before approval
>
> **Absence markers:**
> - `(absent)` — no `data-zh` attribute exists; English is unmarked.
> - `(empty)` — `data-zh=""` exists but is intentionally blank (the element disappears on the Chinese side).
>
> **Rich text:** `**bold**` represents `<strong>` from `data-zh-html`. `↵` represents `<br>`.
>
> **Row-merging convention** (applied to multi-span title / subhead blocks): use ` / ` to represent `<br>` between visual lines and `*text*` to represent `<em>` emphasis. Applied identically to ZH, Literal EN, and Site EN columns.
>
> **History preservation:** when EN or ZH copy is changed, the old text stays in the cell as `~~strikethrough~~<br>new text`. Lives in Site EN for ✏️ edits, in ZH (+ Literal EN) for 🆕 edits, in all three for combined edits. `~~(absent)~~<br>新文字` for ZH added where previously absent.
>
> **Retroactive backfill rule:** If a row was edited *before* the strikethrough convention was set (or in a session where it was skipped), retroactively add `~~old~~<br>new` using the prior copy from git history (`git log -p website/documents/copy-audit.md`) — the doc should always reflect the full edit trail, regardless of when the convention was introduced. This applies to any future sessions reopening this doc.

---

# Homepage

> **Source:** [website/index.html](../index.html) · ~253 `data-zh` + 6 `data-zh-html` entries
> Pages 1 of 3. Read top-to-bottom against the live page.

## Top nav

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 產品 | Products | Products | ✅ 🚀 |
| 泰然專利防護網 | TaiRan Patent Protection Net | Licensing Platform | ☐ |
| 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | Curated, matched patent-protection bundle — patent insurance for export goods; fast activation, saves time, effort, budget. | ~~Patent protection by jurisdiction and industry.~~<br>Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | ✏️ ✅ 🚀 |
| 泰然專利強度評級系統 | TaiRan Patent Strength Rating System | Signal Platform | ☐ |
| 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 | Compares against same-industry patents; across 50 indicators that cover both "quantity" and "quality" — grades patents professionally with evidence. | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | ✏️ ✅ 🚀 |
| 報告 | Reports | Reports | ✅ 🚀 |
| 新聞 | News / Press | Press | ✅ 🚀 |
| 關於 | About | About | ✅ 🚀 |
| 聯絡業務 | Contact sales (lit. "contact business") | Contact sales | ✅ 🚀 |

## Mobile drawer

> Identical `data-zh` set to Top nav — duplicated markup for the mobile menu. Same rows; review once and apply to both.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 產品 | Products | Products | ✅ 🚀 |
| 泰然專利防護網 | TaiRan Patent Protection Net | Licensing Platform | ☐ |
| 精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | Curated, matched patent-protection bundle — patent insurance for export goods; fast activation, saves time, effort, budget. | ~~Patent protection by jurisdiction and industry.~~<br>Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | ✏️ ✅ 🚀 |
| 泰然專利強度評級系統 | TaiRan Patent Strength Rating System | Signal Platform | ☐ |
| 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 | Compares against same-industry patents; across 50 indicators that cover both "quantity" and "quality" — grades patents professionally with evidence. | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | ✏️ ✅ 🚀 |
| 報告 | Reports | Reports | ✅ 🚀 |
| 新聞 | News / Press | Press | ✅ 🚀 |
| 關於 | About | About | ✅ 🚀 |
| 聯絡業務 | Contact sales (lit. "contact business") | Contact sales | ✅ 🚀 |

## Search modal

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| ~~(absent)~~<br>搜尋報告、新聞與頁面… | ~~(absent)~~<br>Search reports, press, and pages… | Search reports, press, and pages… | 🆕 ✅ 🚀 |
| 跳至 | Jump to | Jump to | ✅ 🚀 |
| 產品 | Products | Products | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |
| 報告 | Reports | Reports | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |
| 新聞 | News / Press | Press | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |
| 關於 | About | About | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |
| 聯絡 | Contact | Contact | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |

## IP intelligence drop popup

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 重要的專利動態。 | Important patent moves. | The patent moves that matter. | ☐ |
| 一年四份簡報。精選非匯總。 | Four briefs a year. Curated, not aggregated. | Four briefs a year. Curated, not aggregated. | ☐ |
| 角色 | Role | Role | ☐ |
| · 選填 | · Optional | · optional | ☐ |
| 請選擇… | Please select… | Select… | ☐ |
| 創辦人 / 高階主管 | Founder / Senior executive | Founder / C-suite | ☐ |
| 智財 / 法務 | IP / Legal | IP / Legal | ☐ |
| 研發 / 工程 | R&D / Engineering | R&D / Engineering | ☐ |
| 投資人 / 分析師 | Investor / Analyst | Investor / Analyst | ☐ |
| 其他 | Other | Other | ☐ |
| 產業 | Industry | Industry | ☐ |
| · 選填 | · Optional | · optional | ☐ |
| 所有產業 | All industries | All industries | ☐ |
| 電子 | Electronics | Electronics | ☐ |
| 機械 | Mechanical | Mechanical | ☐ |
| 綠能 | Green Energy | Green Energy | ☐ |
| 生醫 | Biomedical | Biomedical | ☐ |
| 材料 | Materials | Materials | ☐ |
| 工作信箱 | Work email | Work email | ☐ |
| (absent) | (absent) | you@company.com | ☐ |
| 訂閱下一份簡報 | Subscribe to the next brief | Get the next brief | ☐ |
| 每季一封信。 | One email per quarter. | One email per quarter. | ☐ |
| 隱私政策 | Privacy policy | Privacy | ☐ |

## Announcement banner

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 即將推出：泰然專利防護網 — 30 件專利組合，涵蓋美國與台灣 | Coming soon: TaiRan Patent Protection Net — 30-patent bundles covering US and Taiwan | Coming soon: TIS Licensing Platform — 30-patent bundles across US and Taiwan | ☐ |
| 探索產業 → | Explore industries → | Explore industries → | ☐ |

## Hero (carousel — 3 slides)

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| (empty) | (intentionally blank on ZH side) | An IP intelligence consultancy | ✅ 🚀 |
| 出國保旅平險。 / 出口 *保專利險。* | Travel insurance for going abroad. / Export, *patent insurance.* | ~~Turning patent complexity / into *market position.*~~<br>You buy travel insurance to travel. / Buy patent insurance *to export.* | ✏️ ✅ 🚀 |
| 律師費 500 萬 + 整批退貨 + 三倍懲罰，水險都買，專利險怎麼能不買？ / 月租不到 1 萬，30 件大廠專利授權，立即生效。 | Lawyer fees NT$5M + full shipment return + triple damages — you buy marine insurance, how can you not buy patent insurance? / Under NT$10K/month, 30 major-vendor patent licenses, effective immediately. | ~~Clarity on IP strength, exposure, and strategic position / — in days, not months.~~<br>Skip patent insurance, pay on three fronts: NT$5M legal fees, full-shipment returns, and treble damages. / Under NT$10K/month. 30 institutional patents. Live immediately. | ✏️ ✅ 🚀 |
| 試跑專利包 | Try out the patent bundle | ~~How we work~~<br>Build a bundle | ✏️ ✅ 🚀 |
| 專利標章加持用法 | Patent badge empowerment / boost usage | ~~Talk to us~~<br>About the badge | ✏️ ✅ 🚀 |
| — | — | — | — |
| (empty) | (intentionally blank on ZH side) | Licensing Platform | ✅ 🚀 |
| 泰然專利包 / 為你的 *補助申請加分。* | TaiRan patent bundle / For your *grant-application boost.* | ~~From patent coverage / to an *offensive claim.*~~<br>License 30 patents. / The edge on your *grant application.* | ✏️ ✅ 🚀 |
| 評審認可的是創智、資策會、陽明交大的優質保證。 / 30 件合法授權專利以你公司名義可用，月租不到 1 萬。 | What reviewers recognize is the quality assurance from ITRI, III, and NYCU. / 30 legally licensed patents usable under your company's name, under NT$10K/month. | ~~Subscribe to a 30-patent bundle, / curated for your jurisdiction and industry.~~<br>Sourced from ITRI, III, NYCU — patents every grant reviewer knows. / 30 patents licensed in your company's name. Under NT$10K/month. | ✏️ ✅ 🚀 |
| 試跑專利包 | Try out the patent bundle | ~~View product~~<br>Build a bundle | ✏️ ✅ 🚀 |
| 了解授權方案 | Learn about the licensing plan | ~~Contact sales~~<br>See licensing plans | ✏️ ✅ 🚀 |
| — | — | — | — |
| (empty) | (intentionally blank on ZH side) | Signal Platform | ✅ 🚀 |
| 技術含金量高不高， / 看 *排名就知道。* | Is the tech's gold content high or not? / Look — *the ranking tells you.* | ~~Grading IP strength / into an *actionable report.*~~<br>How strong is the patent? / *the ranking settles it.* | ✏️ ✅ 🚀 |
| SABCD 五級評分 + 同產業 cohort 排名。 / 一份可直接附入 IC memo 或 LP 季報的標準化報告。 | SABCD five-tier scoring + same-industry cohort ranking. / A standardized report that can be directly attached to an IC memo or LP quarterly report. | ~~Scored across 50 indicators, against its industry peers / — back in hours, not weeks.~~<br>SABCD-graded, ranked against same-industry peers. / Drops into IC memos and LP letters as-is. | ✏️ ✅ 🚀 |
| 免費預覽報告樣本 | Free preview report sample | ~~View product~~<br>See a sample report | ✏️ ✅ 🚀 |
| 專利評級怎麼算 | How patent grading is calculated | ~~Contact sales~~<br>See the methodology | ✏️ ✅ 🚀 |

## Exclusive patent access (partner strip)

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 專屬專利授權 | Exclusive patent licensing | Exclusive Patent Access | ☐ |

## Stats counter

| ZH | ZH ✓ | Literal EN | Site EN | Status |
|---|---|---|---|---|
| 專屬資料庫 |  | Proprietary database | Proprietary database | ✅ |
| (absent) |  | (absent) | 180M | ✅ |
| Innovue 專屬資料庫所收錄的專利數 - **每日**與官方同步更新資料，全球第四大完整專利資料庫，檢索不遺漏任何蛛絲馬跡。 |  | The patent count held in Innovue's proprietary database — synced **daily** with official sources; the world's 4th-largest complete patent database, searches that miss no clue. | ~~patents powered by Innovue's WEBPAT database — with over 21 years of experience in providing IP services.~~<br>patents in Innovue's proprietary database — synced **daily** with official patent offices. World's 4th-largest patent index — searches that miss no trace. | ✏️ ✅ |
| ~~專利強度評分 — PSS~~<br>(absent) |  | ~~Patent Strength Score — PSS~~<br>(absent) | Patent Strength Score — PSS | 🆕 ✅ |
| (absent) |  | (absent) | 50 | ✅ |
| ~~項量化指標歸納入八大支柱 — 匯整為 0–100 強度評分，依同業基準評等。~~<br>項指標構成每個 PSS 評級 — 八大加權支柱，0–100 評分，對標同業基準。 | ☐ | ~~Quantitative indicators folded into eight pillars — combined into a 0–100 strength score, graded against industry benchmarks.~~<br>[50] indicators compose every PSS grade — 8 weighted pillars, 0–100 score, benchmarked against industry standards. | ~~quantitative indicators folded into 8 pillars — combined into a 0–100 strength score, graded against industry peers.~~<br>indicators behind every PSS grade — 8 weighted pillars, scored 0–100, calibrated against same-industry peers. | ✏️ 🆕 ✅ |
| ~~覆蓋~~<br>司法管轄區覆蓋 | ☐ | ~~Coverage~~<br>Jurisdiction coverage | ~~Coverage~~<br>Jurisdiction coverage | ✏️ 🆕 ✅ |
| (absent) |  | (absent) | 100+ | ✅ |
| 專利資料庫囊括全球超過 100 個國家，包含美、歐、日、台、韓，全球專利佈局的最佳夥伴。 |  | The patent database covers over 100 countries globally, including US, EU, Japan, Taiwan, Korea — the best partner for global patent positioning. | ~~jurisdictions actively indexed daily from official Patent Office sources — US, TW, EU, JP, KR, and many more.~~<br>jurisdictions in the index — US, EU, Japan, Taiwan, Korea, and more. The foundation of global patent positioning. | ✏️ ✅ |
| ~~技術提供~~<br>(absent) |  | ~~Technology provided by~~<br>(absent) | Powered by | 🆕 ✅ |

## Products › section heading + pillar toggle

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 產品 | Products | Products | ☐ |
| 專利授權 | Patent Licensing | Licensing Platform | ☐ |
| 專利評級 | Patent Rating | Signal Platform | ☐ |

## Products › Licensing › Hero

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 泰然專利防護網 | TaiRan Patent Protection Net | Licensing Platform | ☐ |
| **拼出口的台灣頭家，這裡有一張關鍵名片。** | **Taiwan bosses hustling on exports — here's one critical business card.** | For Taiwan exporters — one critical business card to hand over. | ☐ |
| AI 依您出口國 × 產業，從創智、資策會、陽明交大三家機構池中挑 30 件合法 IP，付款隔日生效，發您一張可掛展位、報價單、Email 簽名的高規授權標章。月不到 1 萬，不賣「絕對不被告」的神話，但讓 **專利蟑螂**評估攻擊成本後跳過你找下家。 | AI selects 30 legal IPs from the ITRI, III, NYCU institution pools by your export country × industry; effective the day after payment; issues you a high-spec license badge to hang on booth signage, quotes, or email signatures. Under NT$10K/month — doesn't sell the "you'll never be sued" myth, but makes **patent trolls** weigh the attack cost and skip you for the next target. | AI picks 30 legal IPs from the ITRI / III / NYCU institution pools, matched to your export country × industry. Activates the day after payment and ships a high-spec license badge you can hang on booth signage, quotes, or email signatures. Under NT$10K/month — doesn't sell the "you'll never be sued" myth, but makes patent trolls weigh the attack cost and skip you for an easier target. | ☐ |
| 30 個專利橫跨 5 個評級，有質有量兼備。 | 30 patents span 5 tiers — quality and quantity both covered. | 30 patents span 5 tiers — quality and quantity in one bundle. | ☐ |
| 提供兩種專利包選法 - AI 智選 / FTO 保選。 | Two bundle-selection methods provided — AI smart-pick / FTO-guarded pick. | Two selection methods — AI smart-pick or FTO-guided curation. | ☐ |
| 查看智選專利包 | View the smart-pick patent bundle | View Smart-Pick Bundle | ☐ |
| 深入了解 → | Learn more → | Learn more → | ☐ |

## Products › Licensing › Deliverables (4-card grid)

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 策展覆蓋，當週上線 | Curated coverage, live the same week | Curated coverage, active this week | ☐ |
| 依司法管轄區 × 產業策展的 30 件專利組合，訂閱當週生效──依你客戶實際所在地，選 US 或 TW。 | A 30-patent bundle curated by jurisdiction × industry, effective the week of subscription — pick US or TW based on where your customers actually are. | Thirty patents, curated by jurisdiction and industry, live the week you subscribe — covering the market your customers actually buy in. | ☐ |
| 帶著 IP 進入新市場 | Enter new markets carrying IP | Enter new markets with IP in hand | ☐ |
| 每張訂閱將相關專利請求項放進你的手中，覆蓋你進入的市場──從上市第一天起，就有可防禦的立足點。 | Each subscription puts the relevant patent claims into your hands, covering the markets you enter — from day one of launch, you have defensible footing. | Each subscription puts real patent claims in your hands for the markets you're entering — defensible ground from the day you ship, not months later. | ☐ |
| 一掃即驗 | Verify in one scan | Verifiable in one scan | ☐ |
| TIS 簽發的數位授權憑證，可即時掃描驗證──向任何要求查驗的人證明你對這些專利的合法使用權。 | A TIS-issued Digital License Credential, scannable for instant verification — proves your legal right to use these patents to anyone who asks. | A TIS-issued Digital License Credential, scannable in two seconds — proof of your right to use the patents, for anyone who asks. | ☐ |
| 看見組合裡的每一件 | See every piece in the bundle | See exactly what's in the bundle | ☐ |
| 每件專利皆由 Innovue SABCD 框架評等──典型 30 件組合分布 5 S · 6 A · 9 B · 6 C · 4 D。不是黑盒。 | Every patent graded under the Innovue SABCD framework — a typical 30-patent bundle distributes 5 S · 6 A · 9 B · 6 C · 4 D. Not a black box. | Every patent graded on Innovue's SABCD framework — a typical bundle splits 5 S · 6 A · 9 B · 6 C · 4 D. No black box, no filler. | ☐ |

## Products › Licensing › How it works (5-step accordion)

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 運作方式 | How it operates | How it works | ☐ |
| 選擇法域 × 產業 × 期間 | Pick jurisdiction × industry × term | Pick your jurisdiction × industry × term | ☐ |
| 一包專利包支持一個法域、一個產業、一種期間，只為你真正需要的組合付費。 | One bundle covers one jurisdiction, one industry, one term — pay only for the combination you actually need. | Pay for the markets and the term you actually need — nothing you don't. | ☐ |
| US、TW，兩個主戰場供專利佈局。 | US, TW — two main battlegrounds for patent positioning. | Cover the market your customers buy in | ☐ |
| 3、6、12、24 個月期，隨時可升級延長授權期間。 | 3, 6, 12, 24-month terms — can upgrade and extend the license period anytime. | Choose the term that fits your runway | ☐ |
| 30 件 SABCD 評級專利組合，同評級專利隨時可更換。 | A 30-patent SABCD-graded bundle — same-tier patents can be swapped anytime. | Get thirty SABCD-graded patents per bundle | ☐ |
| 兩種專利包挑選法 | Two patent-bundle picking methods | Two ways to pick the 30 | ☐ |
| AI 快速取得組合，或提交 FTO 報告精準篩選。 | AI delivers a bundle fast, or submit an FTO report for precise filtering. | A bundle in 15 seconds — or hand us your FTO and we'll route around it. | ☐ |
| 方法 A - AI 智選 (免費)：由 AI 為你智選 30 個符合需求的專利包。 | Method A — AI smart-pick (free): AI smart-picks a 30-patent bundle matching your needs. | Let the system recommend a bundle, free | ☐ |
| 方法 B - FTO 保選 (付費)：上傳你的 FTO 報告或加價購委托泰然產出 FTO 報告，針對專利佈局不足之處，精準篩選專利包。 | Method B — FTO-guarded pick (paid): Upload your FTO report, or pay extra to commission TIS to produce one — precisely filters the bundle to plug gaps in your patent positioning. | Or hand us your FTO to guide the pick | ☐ |
| 平台提供首選 30 和備選 30 專利清單，供你挑選。 | The platform provides a primary 30 and a backup 30 patent list for you to choose from. | Either path ships with a same-tier swap pool | ☐ |
| 專利包瀏覽 | Patent bundle browse | Relevant bundle suggested | ☐ |
| 針對特定商品特定市場選取 30 個最佳專利組合。 | For a specific product in a specific market, pick the best 30-patent bundle. | 30 SABCD-graded patents, curated to your market in under 15 seconds. | ☐ |
| 橫跨 5 個評級 (5S.6A.9B.6C.4D)，有質有量兼備。 | Spans 5 tiers (5S.6A.9B.6C.4D) — quality and quantity both covered. | Get a tier-balanced bundle, flagship to long tail | ☐ |
| 來自國家級創智法人、資策會法人、陽明交大學術單位等優質專利池，品質有保障。 | From national-grade ITRI institution, III institution, NYCU academic units and other premium patent pools — quality assured. | Drawn from the Innovue, iPIC, III & NYCU pool | ☐ |
| 不用等 18 個月或無止盡商務談判，訂 閱到生效快打通關。 | No need to wait 18 months or endure endless commercial negotiations — subscription to activation clears fast. | Go live the week you subscribe | ☐ |
| 鎖定專利包 | Lock the patent bundle | Swap patents — your call | ☐ |
| 同評級專利可自選替換，隨你決定，不加價、無等審。 | Same-tier patents can be self-swapped — your call — no surcharge, no review wait. | Don't love a pick? Swap it — no surcharge, no review delay. | ☐ |
| 平台提供首選 30 和備選 30 專利清單，供你自選替換。 | The platform provides a primary 30 and backup 30 patent list for you to self-swap. | Swap any pick from a same-tier pool | ☐ |
| 授權期間內可不限次替換同評級專利，提升企業防禦力。 | Within the license term, swap same-tier patents an unlimited number of times — boosts corporate defensibility. | Swap as often as you like, within term | ☐ |
| 只要維持評級組合 (5S.6A.9B.6C.4D)，想怎麼換就怎麼換。 | As long as the tier mix is maintained (5S.6A.9B.6C.4D), swap however you like. | Replace like-for-like — the count stays thirty | ☐ |
| 展示憑證，展示你的軟實力 | Display the credential, display your soft power | Display the credential — and the full file | ☐ |
| 高規格授權認證標章，供客戶查詢，拉高被告門檻。 | High-spec license-certification badge, for customer lookup — raises the threshold of being sued. | One Document Center — everything you need to display, defend, and prove the license. | ☐ |
| 高規格公證電子簽章的數位授權憑證，內嵌獨一授權編號與 QR Code，2 秒線上即時驗證。 | High-spec notarized e-signature Digital License Credential — embeds a unique license number and QR code; 2-second online instant verification. | Embed the credential anywhere, PNG or SVG | ☐ |
| 「泰然 × 權威機構」的聯名授權認證標章，可自由印製於國際展位、提案書、官網 Footer 或產品外包裝，讓對手不敢輕易踩線。 | The "TIS × authoritative institutions" co-branded license-certification badge — freely printable on international booths, proposals, website footer, or product packaging; competitors won't dare to cross the line easily. | Hand over a PAdES-signed contract and certificate | ☐ |

## Products › Signal › Hero

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 泰然專利強度評級系統 | TaiRan Patent Strength Rating System | Signal Platform | ☐ |
| **拼募資的 founder、做盡調的 VC、評估護城河的企業 —專利強不強，看排名就知道。** | **Founders pushing for funding, VCs doing diligence, enterprises assessing moats — whether a patent is strong, look at the ranking and you'll know.** | For founders pitching, VCs running diligence, and enterprises assessing moats — patent strength shows in the ranking. | ☐ |
| 泰然專利強度評級系統把每件專利打進 **同產業 cohort 做百分位排序**，產出 SABCD 五級評級。**客戶無須整理文件，只需提供專利號，系統自動從 1.8 億筆專利資料庫抽取完整資料、跑完 50 項指標分析**。短版執行摘要可快速初篩判斷強度，長版逐項下鑽。 | The TaiRan Patent Strength Rating System places every patent into **its same-industry cohort for percentile sorting**, producing a SABCD five-tier grade. **Clients need not prepare documents — just provide the patent number; the system automatically pulls the full record from the 180M-patent database and runs all 50 indicators**. The short executive summary enables fast strength triage; the long version drills down item by item. | The Tairan Patent Strength Rating System places every patent into its same-industry cohort for percentile ranking, producing a SABCD five-tier grade. No document prep — provide a patent number and the system pulls the full record from the 180M-patent database and runs all 50 indicators. The Brief gives a fast strength read; the Pro version drills down item-by-item. | ☐ |
| 報告可附入 IC Memo、盡職調查、LP 季報、政府補助 / 標案等各類文件，作為**第三方專利評級依據** —律師告訴你「合不合法」，我們告訴你「強不強」。 | Reports can attach into IC memos, due-diligence files, LP quarterly reports, government grants / tenders, and other documents — as a **third-party patent-rating basis**. Lawyers tell you "legal or not," we tell you "strong or not." | Reports attach to IC memos, due diligence files, LP quarterly reports, or grant / tender submissions as a third-party patent rating — lawyers tell you "legal or not," we tell you "strong or not." | ☐ |
| 免費預覽報告樣本 | Free preview report sample | View Sample Report | ☐ |
| 深入了解 → | Learn more → | Learn more → | ☐ |

## Products › Signal › Deliverables (4-card grid)

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 看見你的專利排在哪裡 | See where your patent ranks | See how your patent measures up | ☐ |
| SABCD 評等將每件專利從 Tier S 排到 Tier D，以 Innovue 1.8 億件專利資料庫的同產業池為校準基準。 | SABCD grading ranks every patent from Tier S to Tier D — calibrated against Innovue's 180M-patent database's same-industry pool. | One SABCD letter, Tier S to Tier D, that your whole team reads the same way — calibrated against the peers in its industry pool, not the whole market. | ☐ |
| 壓力測試專利的真實強度 | Pressure-test a patent's true strength | Pressure-test a patent's strength | ☐ |
| 並列比對請求項、專利家族與引用，對標技術相近的同儕專利，檢驗其有效性與真實強度是否經得起審視。 | Side-by-side compare claims, patent families, and citations; benchmarked against technology-similar peer patents; tests whether validity and true strength withstand scrutiny. | Claim, family, and citation, side by side against technology-similar peers — so you see whether a patent's strength holds up before you bet on it. | ☐ |
| 策略佈局你的路徑 | Strategically position your path | Strategically position your path | ☐ |
| 每件專利拆解為 8 大加權支柱──引用影響力（Citation Impact）、前瞻價值（Forward-Looking Value）等──Pro 報告再展開 50 項指標深度分析，協助策略決策。 | Each patent breaks into 8 weighted pillars — Citation Impact, Forward-Looking Value, etc. — and the Pro report expands all 50 indicators for deep analysis, supporting strategic decisions. | Every patent breaks into 8 weighted pillars — Citation Impact, Forward-Looking Value, and more. Pro opens all 50 indicators beneath them, so you see exactly what anchors the grade. | ☐ |
| 下注前，先摸清地形 | Before placing the bet, get a feel for the terrain | Know the terrain before you bet | ☐ |
| 補上會帶來風險與昂貴錯誤的盲點。依產業與司法管轄區預製──免委派分析師專案。 | Fill in the blind spots that bring risk and costly mistakes. Pre-built by industry and jurisdiction — no need to commission an analyst project. | Pre-built landscapes by industry and jurisdiction — concentration, whitespace, filing surge. The blind spots that turn into expensive mistakes, closed before you commit. | ☐ |

## Products › Signal › How it works (5-step accordion)

> ⚠️ **Flagged copy-paste leak.** In step 2 ("Matched against the right peer pool"), the two check-item ZH strings appear to be mistakenly copied from the Licensing "Display the credential" step — they describe license badges, not peer matching. Marked ❓ for review. The bug is upstream in [index.html](../index.html) lines 1312–1313.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 運作方式 | How it operates | How it works | ☐ |
| 提交一個專利號 | Submit a patent number | Submit a patent number | ☐ |
| Brief 30 分鐘內寄達──免分析師，免等一整週。 | Brief arrives within 30 minutes — no analyst needed, no week-long wait. | Your Brief lands in 30 minutes — no analyst, no week-long wait. | ☐ |
| USPTO · TW · EPO · WO | USPTO · TW · EPO · WO | Grade patents from any major office | ☐ |
| 可平行 submit | Can submit in parallel | Score a whole batch at once | ☐ |
| P95 寄達 ≤ 30 分鐘 | P95 delivery ≤ 30 minutes | Skip the week-long analyst wait | ☐ |
| 對比同儕池 | Compare against the peer pool | Matched against the right peer pool | ☐ |
| 蘋果對蘋果， | Apples to apples, | Scores you can trust — graded against patents that actually compete in the same category. | ☐ |
| 高規格公證電子簽章的數位授權憑證，內嵌獨一授權編號與 QR Code，2 秒線上即時驗證。 | High-spec notarized e-signature Digital License Credential — embeds a unique license number and QR code; 2-second online instant verification. | Get matched to your exact technical category | ❓ |
| 「泰然 × 權威機構」的聯名授權認證標章，可自由印製於國際展位、提案書、官網 Footer 或產品外包裝，讓對手不敢輕易踩線。 | The "TIS × authoritative institutions" co-branded license-certification badge — freely printable on international booths, proposals, website footer, or product packaging; competitors won't dare to cross the line easily. | Benchmark against the Innovue, iPIC, III & NYCU pool | ❓ |
| Brief 還是 Pro──你決定 | Brief or Pro — you decide | Brief or Pro — your call | ☐ |
| 同一個評分引擎、兩種深度──當下付當下要的，事後可補繳升級。 | One scoring engine, two depths — pay now for what you need now, top up later to upgrade. | One scoring engine, two depths — pay for what you need today, top up later. | ☐ |
| Brief · 15 點 · 30 分鐘郵件 | Brief · 15 points · 30-minute email | Start with the fast Brief verdict | ☐ |
| Pro · 30 點 · 即時渲染 | Pro · 30 points · real-time render | Go deeper with Pro when you need it | ☐ |
| 事後升級無加價 | Upgrade later — no surcharge | Upgrade anytime — no switching premium | ☐ |
| Brief 報告呈現什麼 | What the Brief report shows | What the Brief report shows you | ☐ |
| 一分鐘掃完──無需編輯，直接轉發給投資委員會。 | Scannable in a minute — no editing needed, forward directly to the IC. | Scannable in a minute — forward it to your IC without editing. | ☐ |
| 等級判定 + PSS 分數 | Tier verdict + PSS score | See the tier verdict at a glance | ☐ |
| 池內百分位 + 池內排名 | In-pool percentile + in-pool rank | Know exactly where it ranks among peers | ☐ |
| 狀態 · 家族 · IPC · 剩餘年限 · AI 摘要 | Status · Family · IPC · Remaining term · AI summary | Forward it to your IC as-is | ☐ |
| Pro 將 PSS 拆解成 50 項指標 | Pro breaks the PSS down into 50 indicators | Pro unpacks the PSS into 50 indicators | ☐ |
| 可承受法務審視──看清哪些面向錨定評等、敏感度落在哪裡。 | Withstands legal review — see clearly which dimensions anchor the grade and where the sensitivities lie. | Defensible enough for legal — see which dimensions anchor the verdict and where the sensitivities sit. | ☐ |
| 八大支柱 × 4–8 項指標 = 50 項 | 8 pillars × 4–8 indicators = 50 items | See what anchors the grade | ☐ |
| 每項指標：原值、百分位、權重 | Each indicator: raw value, percentile, weight | Trace every score to its formula | ☐ |
| Top 10 驅動因子 + Top 5 敏感度標出 | Top 10 drivers + Top 5 sensitivities marked | Spot the top drivers and risks fast | ☐ |

## Latest reports

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 近期 | Recent | Recent | ☐ |
| 最新報告 | Latest reports | Latest reports | ☐ |
| 焦點 · 2026 Q2 | Featured · 2026 Q2 | Featured · Q2 2026 | ☐ |
| 半導體 | Semiconductors | Semiconductors | ☐ |
| 台 × 美 | TW × US | TW × US | ☐ |
| 14 分鐘 | 14 minutes | 14 min read | ☐ |
| 外國公司對台灣 PCB 的專利申請量為本地的 4 倍。 | Foreign companies' patent filing volume on Taiwan PCB is 4× the local volume. | Foreign filings into Taiwan PCB outpaced domestic 4-to-1. | ☐ |
| 三年外國對台灣 PCB 群聚的專利申請，與本地反向申請進行比對。護城河在哪裡正在收緊——又在哪裡沒有。 | Three years of foreign patent filings on Taiwan PCB clusters, compared with domestic reverse filings. Where the moat is tightening — and where it isn't. | Three years of foreign filings against Taiwan PCB clusters, mapped against domestic counter-filings. Where the moat is closing — and where it isn't. | ☐ |
| 更多報告 | More reports | More reports | ☐ |
| 查看全部 | See all | See all | ☐ |
| 對 14 家 Series A 公司套用 SABCD。 | SABCD applied to 14 Series A companies. | SABCD applied to a 14-company Series A cohort. | ☐ |
| VC IPDD · SABCD · 12 分鐘 | VC IPDD · SABCD · 12 minutes | VC IPDD · SABCD · 12 min | ☐ |
| MedTech IP 群聚：生物辨識與植入式專利在哪裡交會。 | MedTech IP clusters: where biometric and implantable patents converge. | MedTech IP clusters: where biometric and implantable patents converge. | ☐ |
| MedTech · 跨司法管轄區 · 10 分鐘 | MedTech · Cross-jurisdiction · 10 minutes | MedTech · Cross-jurisdiction · 10 min | ☐ |
| 電動車動力總成請求項家族在台灣與德國 OEM 之間交會。 | EV powertrain claim families converge between Taiwan and German OEMs. | EV powertrain claim families converge between Taiwan and German OEMs. | ☐ |
| 汽車 · 台 × 德 · 9 分鐘 | Automotive · TW × DE · 9 minutes | Automotive · TW × DE · 9 min | ☐ |
| 太陽能 PV 申請在 CBAM 實施前集中於三個歐盟司法管轄區。 | Solar PV filings concentrate in three EU jurisdictions before CBAM enforcement. | Solar PV filings concentrate in three EU jurisdictions ahead of CBAM enforcement. | ☐ |
| 再生能源 · 跨歐盟 · 11 分鐘 | Renewables · Cross-EU · 11 minutes | Renewables · Cross-EU · 11 min | ☐ |

## Press releases

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 媒體報導 | Media coverage | In the press | ☐ |
| 新聞稿 | Press release(s) | Press releases | ☐ |
| 查看全部新聞 | See all press | See all press | ☐ |
| 合作 | Partnership / Collaboration | Partnership | ☐ |
| (absent) | (absent) | 2026-03-05 | ☐ |
| TIS 與 Innovue 正式結盟，撐起 1.8 億件專利情報層。 | TIS and Innovue formally allied, propping up the 180M-patent intelligence layer. | TIS and Innovue formalize the alliance behind the 180M-patent intelligence layer. | ☐ |
| 平台上線 | Platform launch | Platform launch | ☐ |
| (absent) | (absent) | 2026-02-12 | ☐ |
| 泰然專利防護網上線——以司法管轄區 × 產業為單位的 30 件專利組合。 | TaiRan Patent Protection Net launches — 30-patent bundles per jurisdiction × industry. | TIS launches the Licensing Platform — 30-patent bundles per jurisdiction × industry. | ☐ |
| DigiTimes · 專訪 | DigiTimes · Interview | DigiTimes · Interview | ☐ |
| (absent) | (absent) | 2026-03-18 | ☐ |
| TIS 為何將授權視為佈局，而非保險。 | Why TIS treats licensing as positioning, not insurance. | Why TIS treats licensing as offense, not insurance. | ☐ |

## About

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 一間 IP 情報顧問公司， | An IP intelligence consultancy, | An IP intelligence consultancy, | ☐ |
| 將專利地形轉化為市場佈局。 | turning the patent landscape into market positioning. | turning the patent landscape into market position. | ☐ |
| 01 / 立場 | 01 / Stance | 01 / Stance | ☐ |
| 主動佈局，而非被動防禦。 | Active positioning, not passive defense. | Active offense, not passive defense. | ☐ |
| 我們的客戶要進入的市場，專利地形早已被人測繪——而且通常不利於他們。我們把那片地形變成策略。 | The markets our clients want to enter — the patent terrain has already been mapped by others, and usually against them. We turn that terrain into strategy. | Our clients sell into markets where the patent terrain is already mapped — often against them. We turn that terrain into strategy. | ☐ |
| 02 / 資料來源 | 02 / Source | 02 / Source | ☐ |
| 紮根於 1.8 億件專利。 | Rooted in 180M patents. | Grounded in 180M patents. | ☐ |
| 營運全球第四大的專利索引——專屬、持續更新，且任何標準 AI 工具都觸及不到。 | Operates the world's 4th-largest patent index — proprietary, continuously updated, and unreachable by any standard AI tool. | maintains the world's 4th-largest patent index — proprietary, continuously refreshed, and unreachable by any standard AI tool. | ☐ |
| 03 / 方法 | 03 / Method | 03 / Method | ☐ |
| 交付成果，而非工具。 | Deliver outcomes, not tools. | Deliverables, not tools. | ☐ |
| 壓力之下泰然處之，依循證據逐步推進。客戶不必懂專利——那是我們的事。 | Under pressure, stay TaiRan (composed); advance step by step with evidence. Clients need not understand patents — that's our job. | Composed under pressure, methodical through evidence. Clients shouldn't need patent expertise — that's what we're for. | ☐ |
| 董事會 | Board (of Directors) | Board of Directors | ☐ |
| (absent) | (absent) | Dr. Eric Huang | ☐ |
| 董事 | Board Director | Board Director | ☐ |
| (absent) | (absent) | Ray Wu | ☐ |
| 董事 | Board Director | Board Director | ☐ |
| (absent) | (absent) | Ming-I Peng | ☐ |
| 董事長 / 董事 | Chairman / Board Director | Chairman / Board Director | ☐ |
| (absent) | (absent) | Jackson Hwang | ☐ |
| 董事 | Board Director | Board Director | ☐ |
| (absent) | (absent) | Ming Cheng | ☐ |
| 監察人 / 董事 | Supervisor / Board Director | Supervisor / Board Director | ☐ |

## Contact

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 與我們聯絡。 | Contact us. | Get in touch. | ☐ |
| (absent) | (absent) | contact@tisglobalinc.com | ☐ |
| 姓名 | Name / Full name | Full Name | ☐ |
| (absent) | (absent) | e.g. Alexander Chen | ☐ |
| 電子郵件 | Email | Email Address | ☐ |
| (absent) | (absent) | name@company.com | ☐ |
| 機構 | Organization / Institution | Organization | ☐ |
| (absent) | (absent) | Company | ☐ |
| 諮詢類型 | Inquiry type | Inquiry Type | ☐ |
| 請選擇… | Please select… | Select… | ☐ |
| 專利授權 | Patent Licensing | Patent Licensing | ☐ |
| 專利評級 | Patent Rating | Patent Rating | ☐ |
| 專利評估報告 | Patent Evaluation Report | Patent Evaluation Report | ☐ |
| 產業報告 | Industry Report | Industry Report | ☐ |
| 媒體採訪 | Media Interview | Media Interview | ☐ |
| 其他 | Other | Other | ☐ |
| 您的需求 | Your requirements | Your Inquiry | ☐ |
| (absent) | (absent) | Briefly describe your requirements… | ☐ |
| 台北 (UTC+8) | Taipei (UTC+8) | Taipei (UTC+8) | ☐ |
| 週一至週五 | Mon–Fri | Mon–Fri | ☐ |
| 服務時間 | Service hours | Office hours | ☐ |
| (absent) | (absent) | 09:00 – 18:00 | ☐ |
| 送出諮詢 | Submit inquiry | Send Inquiry | ☐ |
| 訊息已送出。 | Message sent. | Message sent. | ☐ |
| 已收到您的諮詢。我們將於 1–2 個工作天內回覆。 | Your inquiry has been received. We'll reply within 1–2 business days. | Inquiry received. We'll be in touch within 1–2 business days. | ☐ |

## Footer

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 訂閱最新動態 | Subscribe to the latest updates | Get Our Latest News | ☐ |
| (absent) | (absent) | Your Email | ☐ |
| (absent) | (absent) | © 2026 Talent Intelligence Strategies | ☐ |
| 產品 | Products | Products | ☐ |
| 泰然專利防護網 | TaiRan Patent Protection Net | Licensing Platform | ☐ |
| 泰然專利強度評級系統 | TaiRan Patent Strength Rating System | Signal Platform | ☐ |
| 公司 | Company | Company | ☐ |
| 關於 | About | About | ☐ |
| 報告 | Reports | Reports | ☐ |
| 新聞 | News / Press | Press | ☐ |
| 聯絡 | Contact | Contact | ☐ |
| 法律 | Legal | Legal | ☐ |
| 服務條款 | Terms of Service | Terms | ☐ |
| 隱私政策 | Privacy Policy | Privacy | ☐ |
| 揭露聲明 | Disclosure(s) | Disclosures | ☐ |
| 聯絡 | Contact | Contact | ☐ |
| (absent) | (absent) | contact@tisglobalinc.com | ☐ |
| 台北 · 台灣 | Taipei · Taiwan | Taipei, Taiwan | ☐ |

---

# Licensing

> **Source:** [website/product/licensing/index.html](../product/licensing/index.html) · 176 `data-zh` entries (no `data-zh-html`)
> Page 2 of 3. Read top-to-bottom against the live page.
>
> **✅ Cross-page divergence resolved (2026-06-01)** — standardized to full forms (`泰然專利防護網` / `泰然專利強度評級系統`) across all pages, matching Homepage. Product descriptions also standardized to long form (resolved 2026-05-31). Originally Licensing's nav/drawer/footer used short forms; reconciled to one canonical form.

## Top nav

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 產品 | Products | Products | ✅ 🚀 |
| ~~授權平台~~<br>泰然專利防護網 | ~~Licensing Platform (lit. "Licensing Platform")~~<br>TaiRan Patent Protection Net | Licensing Platform | 🆕 ✅ 🚀 |
| ~~依司法管轄區與產業的專利防護。~~<br>精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | ~~Patent protection by jurisdiction and industry.~~<br>Curated, matched patent-protection bundle — patent insurance for export goods; fast activation, saves time, effort, budget. | ~~Patent protection by jurisdiction and industry.~~<br>Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | ✏️ ✅ 🚀 |
| ~~Signal 平台~~<br>泰然專利強度評級系統 | ~~Signal Platform~~<br>TaiRan Patent Strength Rating System | Signal Platform | 🆕 ✅ 🚀 |
| 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 | Compares against same-industry patents; across 50 indicators that cover both "quantity" and "quality" — grades patents professionally with evidence. | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | ✏️ ✅ 🚀 |
| 報告 | Reports | Reports | ✅ 🚀 |
| 新聞 | News / Press | Press | ✅ 🚀 |
| 關於 | About | About | ✅ 🚀 |
| 聯絡業務 | Contact sales | Contact sales | ✅ 🚀 |

## Mobile drawer

> Same `data-zh` set as Top nav above — duplicated markup for the mobile menu.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 產品 | Products | Products | ✅ 🚀 |
| ~~授權平台~~<br>泰然專利防護網 | ~~Licensing Platform~~<br>TaiRan Patent Protection Net | Licensing Platform | 🆕 ✅ 🚀 |
| ~~依司法管轄區與產業的專利防護。~~<br>精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | ~~Patent protection by jurisdiction and industry.~~<br>Curated, matched patent-protection bundle — patent insurance for export goods; fast activation, saves time, effort, budget. | ~~Patent protection by jurisdiction and industry.~~<br>Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | ✏️ ✅ 🚀 |
| ~~Signal 平台~~<br>泰然專利強度評級系統 | ~~Signal Platform~~<br>TaiRan Patent Strength Rating System | Signal Platform | 🆕 ✅ 🚀 |
| 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 | Compares against same-industry patents; across 50 indicators that cover both "quantity" and "quality" — grades patents professionally with evidence. | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | ✏️ ✅ 🚀 |
| 報告 | Reports | Reports | ✅ 🚀 |
| 新聞 | News / Press | Press | ✅ 🚀 |
| 關於 | About | About | ✅ 🚀 |
| 聯絡業務 | Contact sales | Contact sales | ✅ 🚀 |

## Search modal

> Verified identical to Homepage › Search modal. Same 11 rows (1 absent input placeholder + 10 marked entries).

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| ~~(absent)~~<br>搜尋報告、新聞與頁面… | ~~(absent)~~<br>Search reports, press, and pages… | Search reports, press, and pages… | 🆕 ✅ 🚀 |
| 跳至 | Jump to | Jump to | ✅ 🚀 |
| 產品 | Products | Products | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |
| 報告 | Reports | Reports | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |
| 新聞 | News / Press | Press | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |
| 關於 | About | About | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |
| 聯絡 | Contact | Contact | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |

## IP intelligence drop popup

> Verified identical to Homepage › IP intelligence drop popup. Same 22 rows + 1 absent email placeholder.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 重要的專利動態。 | Important patent moves. | The patent moves that matter. | ☐ |
| 一年四份簡報。精選非匯總。 | Four briefs a year. Curated, not aggregated. | Four briefs a year. Curated, not aggregated. | ☐ |
| 角色 | Role | Role | ☐ |
| · 選填 | · Optional | · optional | ☐ |
| 請選擇… | Please select… | Select… | ☐ |
| 創辦人 / 高階主管 | Founder / Senior executive | Founder / C-suite | ☐ |
| 智財 / 法務 | IP / Legal | IP / Legal | ☐ |
| 研發 / 工程 | R&D / Engineering | R&D / Engineering | ☐ |
| 投資人 / 分析師 | Investor / Analyst | Investor / Analyst | ☐ |
| 其他 | Other | Other | ☐ |
| 產業 | Industry | Industry | ☐ |
| · 選填 | · Optional | · optional | ☐ |
| 所有產業 | All industries | All industries | ☐ |
| 電子 | Electronics | Electronics | ☐ |
| 機械 | Mechanical | Mechanical | ☐ |
| 綠能 | Green Energy | Green Energy | ☐ |
| 生醫 | Biomedical | Biomedical | ☐ |
| 材料 | Materials | Materials | ☐ |
| 工作信箱 | Work email | Work email | ☐ |
| (absent) | (absent) | you@company.com | ☐ |
| 訂閱下一份簡報 | Subscribe to the next brief | Get the next brief | ☐ |
| 每季一封信。 | One email per quarter. | One email per quarter. | ☐ |
| 隱私政策 | Privacy policy | Privacy | ☐ |

## H1 (screen-reader only)

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 泰然專利防護網 — 30 件 SABCD 評等專利組合，當週上線 | TaiRan Patent Protection Net — 30 SABCD-graded patent bundles, live the same week | TIS Licensing — 30-patent shield, active the week you subscribe | ☐ |

## Announcement banner

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 泰然專利防護網正式上線 — 30 件專利組合，每月 NT$3,390 起。 | TaiRan Patent Protection Net officially live — 30-patent bundles starting at NT$3,390/month. | Licensing is now live — 30-patent bundles starting at NT$3,390/month. | ☐ |
| 查看定價 → | View pricing → | View pricing → | ☐ |

## Hero

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 泰然專利防護網 | TaiRan Patent Protection Net | TIS Licensing Platform | ☐ |
| 出口買專利險， | Export — buy patent insurance, | 30-patent shield. | ☐ |
| 30 件專利包輕裝上陣。 | 30-patent bundle, deployed light. | Active this week. | ☐ |
| 1 分鐘勾選國家 × 產業 × 期別，2 種專利包選法，5 類專利評級，戴上授權認證標章立刻從被動防禦轉為主動佈局。 | 1 minute to pick country × industry × term, 2 bundle-selection methods, 5 patent grades — put on the license-certification badge and switch instantly from passive defense to active positioning. | One subscription, thirty SABCD-graded patents, curated for your jurisdiction and industry — passive defense to active position the week you subscribe. | ☐ |
| 試跑專利包 | Try out the patent bundle | Build your bundle | ☐ |
| 聯絡業務 | Contact sales | Talk to sales | ☐ |

## Deliverables (4-card grid)

> All 4 cards have identical `data-zh` / Site EN to Homepage › Licensing › Deliverables. **Extra row** on card 3 (Verifiable in one scan) wraps the body text in an `<a href="#artifacts">` with its own `data-zh` — included below.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 策展覆蓋，當週上線 | Curated coverage, live the same week | Curated coverage, active this week | ☐ |
| 依司法管轄區 × 產業策展的 30 件專利組合，訂閱當週生效──依你客戶實際所在地，選 US 或 TW。 | A 30-patent bundle curated by jurisdiction × industry, effective the week of subscription — pick US or TW based on where your customers actually are. | Thirty patents, curated by jurisdiction and industry, live the week you subscribe — covering the market your customers actually buy in. | ☐ |
| 帶著 IP 進入新市場 | Enter new markets carrying IP | Enter new markets with IP in hand | ☐ |
| 每張訂閱將相關專利請求項放進你的手中，覆蓋你進入的市場──從上市第一天起，就有可防禦的立足點。 | Each subscription puts the relevant patent claims into your hands, covering the markets you enter — from day one of launch, you have defensible footing. | Each subscription puts real patent claims in your hands for the markets you're entering — defensible ground from the day you ship, not months later. | ☐ |
| 一掃即驗 | Verify in one scan | Verifiable in one scan | ☐ |
| TIS 簽發的數位授權憑證，可即時掃描驗證──向任何要求查驗的人證明你對這些專利的合法使用權。 | A TIS-issued Digital License Credential, scannable for instant verification — proves your legal right to use these patents to anyone who asks. | A TIS-issued Digital License Credential, scannable in two seconds — proof of your right to use the patents, for anyone who asks. | ☐ |
| 可掃描驗證的數位授權憑證。 | Scannable, verifiable Digital License Credential. | (same anchor — wraps the body above; no separate visible text) | ☐ |
| 看見組合裡的每一件 | See every piece in the bundle | See exactly what's in the bundle | ☐ |
| 每件專利皆由 Innovue SABCD 框架評等──典型 30 件組合分布 5 S · 6 A · 9 B · 6 C · 4 D。不是黑盒。 | Every patent graded under the Innovue SABCD framework — a typical 30-patent bundle distributes 5 S · 6 A · 9 B · 6 C · 4 D. Not a black box. | Every patent graded on Innovue's SABCD framework — a typical bundle splits 5 S · 6 A · 9 B · 6 C · 4 D. No black box, no filler. | ☐ |

## How it works (5-step horizontal rail)

> Identical to Homepage › Products › Licensing › How it works — same 5 steps, same headers, same body, same check items. Verified verbatim against source.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 運作方式 | How it operates | How it works | ☐ |
| 選擇法域 × 產業 × 期間 | Pick jurisdiction × industry × term | Pick your jurisdiction × industry × term | ☐ |
| 一包專利包支持一個法域、一個產業、一種期間，只為你真正需要的組合付費。 | One bundle covers one jurisdiction, one industry, one term — pay only for the combination you actually need. | Pay for the markets and the term you actually need — nothing you don't. | ☐ |
| US、TW，兩個主戰場供專利佈局。 | US, TW — two main battlegrounds for patent positioning. | Cover the market your customers buy in | ☐ |
| 3、6、12、24 個月期，隨時可升級延長授權期間。 | 3, 6, 12, 24-month terms — can upgrade and extend the license period anytime. | Choose the term that fits your runway | ☐ |
| 30 件 SABCD 評級專利組合，同評級專利隨時可更換。 | A 30-patent SABCD-graded bundle — same-tier patents can be swapped anytime. | Get thirty SABCD-graded patents per bundle | ☐ |
| 兩種專利包挑選法 | Two patent-bundle picking methods | Two ways to pick the 30 | ☐ |
| AI 快速取得組合，或提交 FTO 報告精準篩選。 | AI delivers a bundle fast, or submit an FTO report for precise filtering. | A bundle in 15 seconds — or hand us your FTO and we'll route around it. | ☐ |
| 方法 A - AI 智選 (免費)：由 AI 為你智選 30 個符合需求的專利包。 | Method A — AI smart-pick (free): AI smart-picks a 30-patent bundle matching your needs. | Let the system recommend a bundle, free | ☐ |
| 方法 B - FTO 保選 (付費)：上傳你的 FTO 報告或加價購委托泰然產出 FTO 報告，針對專利佈局不足之處，精準篩選專利包。 | Method B — FTO-guarded pick (paid): Upload your FTO report, or pay extra to commission TIS to produce one — precisely filters the bundle to plug gaps in your patent positioning. | Or hand us your FTO to guide the pick | ☐ |
| 平台提供首選 30 和備選 30 專利清單，供你挑選。 | The platform provides a primary 30 and a backup 30 patent list for you to choose from. | Either path ships with a same-tier swap pool | ☐ |
| 專利包瀏覽 | Patent bundle browse | Relevant bundle suggested | ☐ |
| 針對特定商品特定市場選取 30 個最佳專利組合。 | For a specific product in a specific market, pick the best 30-patent bundle. | 30 SABCD-graded patents, curated to your market in under 15 seconds. | ☐ |
| 橫跨 5 個評級 (5S.6A.9B.6C.4D)，有質有量兼備。 | Spans 5 tiers (5S.6A.9B.6C.4D) — quality and quantity both covered. | Get a tier-balanced bundle, flagship to long tail | ☐ |
| 來自國家級創智法人、資策會法人、陽明交大學術單位等優質專利池，品質有保障。 | From national-grade ITRI institution, III institution, NYCU academic units and other premium patent pools — quality assured. | Drawn from the Innovue, iPIC, III & NYCU pool | ☐ |
| 不用等 18 個月或無止盡商務談判，訂 閱到生效快打通關。 | No need to wait 18 months or endure endless commercial negotiations — subscription to activation clears fast. | Go live the week you subscribe | ☐ |
| 鎖定專利包 | Lock the patent bundle | Swap patents — your call | ☐ |
| 同評級專利可自選替換，隨你決定，不加價、無等審。 | Same-tier patents can be self-swapped — your call — no surcharge, no review wait. | Don't love a pick? Swap it — no surcharge, no review delay. | ☐ |
| 平台提供首選 30 和備選 30 專利清單，供你自選替換。 | The platform provides a primary 30 and backup 30 patent list for you to self-swap. | Swap any pick from a same-tier pool | ☐ |
| 授權期間內可不限次替換同評級專利，提升企業防禦力。 | Within the license term, swap same-tier patents an unlimited number of times — boosts corporate defensibility. | Swap as often as you like, within term | ☐ |
| 只要維持評級組合 (5S.6A.9B.6C.4D)，想怎麼換就怎麼換。 | As long as the tier mix is maintained (5S.6A.9B.6C.4D), swap however you like. | Replace like-for-like — the count stays thirty | ☐ |
| 展示憑證，展示你的軟實力 | Display the credential, display your soft power | Display the credential — and the full file | ☐ |
| 高規格授權認證標章，供客戶查詢，拉高被告門檻。 | High-spec license-certification badge, for customer lookup — raises the threshold of being sued. | One Document Center — everything you need to display, defend, and prove the license. | ☐ |
| 高規格公證電子簽章的數位授權憑證，內嵌獨一授權編號與 QR Code，2 秒線上即時驗證。 | High-spec notarized e-signature Digital License Credential — embeds a unique license number and QR code; 2-second online instant verification. | Embed the credential anywhere, PNG or SVG | ☐ |
| 「泰然 × 權威機構」的聯名授權認證標章，可自由印製於國際展位、提案書、官網 Footer 或產品外包裝，讓對手不敢輕易踩線。 | The "TIS × authoritative institutions" co-branded license-certification badge — freely printable on international booths, proposals, website footer, or product packaging; competitors won't dare to cross the line easily. | Hand over a PAdES-signed contract and certificate | ☐ |

## Pricing (Build your bundle)

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 專利授權套件組合 | Patent licensing bundle / kit / combo | Pricing — Build your bundle. | ☐ |
| 3 個月 | 3 months | 3 months | ☐ |
| 6 個月 | 6 months | 6 months | ☐ |
| 12 個月 | 12 months | 12 months | ☐ |
| 24 個月 | 24 months | 24 months | ☐ |
| 選擇國家 | Pick country | Jurisdiction | ☐ |
| 美國 | United States | United States | ☐ |
| (absent) | (absent) | 61M filings | ☐ |
| 台灣 | Taiwan | Taiwan | ☐ |
| (absent) | (absent) | 2.1M + IP Bank | ☐ |
| 選擇產業 | Pick industry | Industry | ☐ |
| 晶片半導體設計製造 | Chip & semiconductor design & manufacturing | Chip & semiconductor | ☐ |
| (absent) | (absent) | 2.4M in pool | ☐ |
| 30 / 包 | 30 / bundle | 30 / bundle | ☐ |
| 網路通訊 | Network communications | Networking & communications | ☐ |
| (absent) | (absent) | 1.9M in pool | ☐ |
| 30 / 包 | 30 / bundle | 30 / bundle | ☐ |
| 計算機系統 | Computing systems | Computing systems | ☐ |
| (absent) | (absent) | 1.5M in pool | ☐ |
| 30 / 包 | 30 / bundle | 30 / bundle | ☐ |
| 綜合應用 | Integrated applications | Integrated apps (AI · AV · EV) | ☐ |
| (absent) | (absent) | 1.2M in pool | ☐ |
| 30 / 包 | 30 / bundle | 30 / bundle | ☐ |
| 多媒體影音/影像處理 | Multimedia A/V / image processing | Multimedia & imaging | ☐ |
| (absent) | (absent) | 980K in pool | ☐ |
| 30 / 包 | 30 / bundle | 30 / bundle | ☐ |
| 淨零碳排 | Net-zero carbon emissions | Net-zero / carbon | ☐ |
| (absent) | (absent) | 820K in pool | ☐ |
| 30 / 包 | 30 / bundle | 30 / bundle | ☐ |
| 單包金額預估 | Single-bundle amount estimate | Single-bundle estimate | ☐ |
| 國家 | Country / Jurisdiction | Jurisdiction | ☐ |
| (absent) | (absent) | US | ☐ |
| 產業 | Industry | Industry | ☐ |
| (absent) | (absent) | Computing systems | ☐ |
| 期別 | Term / Period | Term | ☐ |
| (absent) | (absent) | 12 months | ☐ |
| 月均額 | Per-month average | Per month | ☐ |
| (absent) | (absent) | NT$8,990 | ☐ |
| / 月 | / month | / month | ☐ |
| (absent) | (absent) | Save 10% | ☐ |
| 訂閱 | Subscribe | Subscribe | ☐ |
| 每組組合內含 | Each bundle includes | Every bundle includes | ☐ |
| 30 件 SABCD 評等專利 | 30 SABCD-graded patents | 30 SABCD-graded patents | ☐ |
| 授權認證標章 | License certification badge | Verified License Badge + QR verifier | ☐ |
| DLC 數位授權憑證（PAdES · eIDAS） | DLC Digital License Credential (PAdES · eIDAS) | DLC digital credential (PAdES · eIDAS) | ☐ |
| MOICA 政府電子簽章 | MOICA government e-signature | MOICA / government e-signature | ☐ |
| 不限次同級專利替換 | Unlimited same-tier patent replacements | Dynamic-pool compensation | ☐ |
| AI 智選 | AI smart-pick | AI matching (24-hr turnaround) | ☐ |
| 標章運用於參展/宣傳物 | Badge use on exhibits / promotional materials | Badge usage on booths & promo materials | ☐ |

## Patent band CTA

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 從這些機構所授權的 | Licensed from these institutions — | Find your position on patents | ☐ |
| 專利中，找到你的位置。 | among the patents, find your position. | from established institutions | ☐ |
| 組建你的組合 | Build your bundle | Build your bundle | ☐ |

## FAQ

> Rich-text formatting: `**bold**` represents `<strong>` (used in the EN side only — ZH side is plain text).

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 常見問題 | Common questions / FAQ | FAQ | ☐ |
| 專利從哪裡來？ | Where do the patents come from? | Where do the patents come from? | ☐ |
| 每組組合策展自 Innovue WEBPAT 與策略合作夥伴。所有專利在進入組合池前皆通過 PSS 引擎預先評等。 | Every bundle is curated from Innovue WEBPAT and strategic partners. All patents are pre-scored by the PSS engine before entering the bundle pool. | Every bundle is curated from **Innovue's WEBPAT** and strategic aligned partners. Every patent is pre-scored on the PSS engine before it's eligible for any bundle. | ☐ |
| 為什麼每組都是固定的 5/6/9/6/4 分布？ | Why is every bundle a fixed 5/6/9/6/4 distribution? | Why does every bundle have the same 5/6/9/6/4 split? | ☐ |
| 初始分布：5 件 S + 6 件 A + 9 件 B + 6 件 C + 4 件 D，依產業池每季再平衡。旗艦級 (S/A) 在談判桌上面對對手；密度級 (B) 覆蓋戰場；長尾 (C/D) 補洞並維持價格。可預測，且能撐住真實授權方所遇到的各種反制。 | Initial distribution: 5 S + 6 A + 9 B + 6 C + 4 D, rebalanced quarterly by industry pool. The flagship tier (S/A) faces opponents at the negotiation table; the density tier (B) covers the battlefield; the long tail (C/D) plugs holes and holds the price. Predictable, and can withstand the kinds of counter-moves real licensees face. | Thirty patents — initial split **5 S + 6 A + 9 B + 6 C + 4 D**, rebalanced quarterly per industry pool. The flagship tiers (S/A) face the counter-party at the negotiation table. The density tier (B) covers the battlefield. The long tail (C/D) plugs gaps and holds the price down. Predictable, and it holds up under the kind of pushback real licensees see. | ☐ |
| 你們怎麼決定我們組合裡的 30 件？ | How do you decide the 30 patents in our bundle? | How do you decide which 30 patents go into our bundle? | ☐ |
| 上傳你的產品說明書或 FTO 報告。24 小時內收到組合候選。同源評分引擎（與 Signal 共用）跨產業池計算交集密度。若有 5–7 件不適配你的產品線，可在簽約前從動態池中替換。 | Upload your product spec or FTO report. Within 24 hours, receive a candidate bundle. The same-source scoring engine (shared with Signal) computes intersection density across the industry pool. If 5–7 patents don't fit your product line, you can swap them from the dynamic pool before signing. | Upload your **product spec** or your **FTO report**. Within 24 hours, you get a candidate bundle. The same scoring engine that drives Signal computes overlap density against the industry pool. If 5–7 patents don't fit your product line, you can swap them out from the dynamic pool before you sign. | ☐ |
| 合約期內若有專利被撤銷會發生什麼事？ | What happens if a patent is invalidated during the contract period? | What happens if a patent gets invalidated mid-contract? | ☐ |
| 同級替換，無需額外費用。S 換 S。A 換 A。整個合約期，30 件就是 30 件。期間 3 / 6 / 12 / 24 個月，24 個月最高省 15%。續約 MSRP。整段非專屬。 | Same-tier replacement, no additional cost. S replaces S. A replaces A. Throughout the contract, 30 stays 30. Terms 3 / 6 / 12 / 24 months, 24-month saves up to 15%. Renewals at MSRP. Non-exclusive throughout. | **Same-tier replacement at no extra cost.** S replaces S. A replaces A. The number 30 stays 30 for the full term. Terms run 3 / 6 / 12 / 24 months, up to 15% off on 24-month. Renewals at MSRP. Non-exclusive throughout. | ☐ |
| 從訂閱到拿到徽章需要多久？ | How long from subscription to having the badge? | How long from subscribing to having the badge in hand? | ☐ |
| 約一週。15 分鐘填完六步引導（法域 → 產業 → 期間 → 路徑 → 公司 → 結果）。AI 24 小時內回傳候選組合。簽約後徽章於 72 小時內以你的名義生效。 | About a week. 15 minutes to fill out the six-step wizard (jurisdiction → industry → term → path → company → results). AI returns a candidate bundle within 24 hours. After signing, the badge becomes active in your name within 72 hours. | About a week. **Fifteen minutes** to fill out the six-step wizard (jurisdiction → industry → term → path → company → results). AI returns a candidate bundle within **24 hours**. Once you sign, the badge is active in your name within **72 hours**. | ☐ |

## Contact

> Same form structure as Homepage › Contact, but the Inquiry Type dropdown is **different** — 4 options here (Licensing bundle / Signal valuation / Press & media / General) vs Homepage's 6.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 與我們聯絡。 | Contact us. | Get in touch. | ☐ |
| (absent) | (absent) | contact@tisglobalinc.com | ☐ |
| 姓名 | Name / Full name | Full Name | ☐ |
| (absent) | (absent) | e.g. Alexander Chen | ☐ |
| 電子郵件 | Email | Email Address | ☐ |
| (absent) | (absent) | name@company.com | ☐ |
| 機構 | Organization / Institution | Organization | ☐ |
| (absent) | (absent) | Company | ☐ |
| 諮詢類型 | Inquiry type | Inquiry Type | ☐ |
| 授權組合 | Licensing bundle | Licensing bundle | ☐ |
| 授權組合 | Licensing bundle | Licensing bundle | ☐ |
| Signal / 估值 | Signal / Valuation | Signal / valuation | ☐ |
| 媒體採訪 | Media interview | Press & media | ☐ |
| 其他 | Other | General | ☐ |
| 您的需求 | Your requirements | Your Inquiry | ☐ |
| (absent) | (absent) | Briefly describe your requirements… | ☐ |
| 台北 (UTC+8) | Taipei (UTC+8) | Taipei (UTC+8) | ☐ |
| 週一至週五 | Mon–Fri | Mon–Fri | ☐ |
| 服務時間 | Service hours | Office hours | ☐ |
| (absent) | (absent) | 09:00 – 18:00 | ☐ |
| 送出諮詢 | Submit inquiry | Send Inquiry | ☐ |
| 訊息已送出。 | Message sent. | Message sent. | ☐ |
| 已收到您的諮詢。我們將於 1–2 個工作天內回覆。 | Your inquiry has been received. We'll reply within 1–2 business days. | Inquiry received. We'll be in touch within 1–2 business days. | ☐ |

## Footer

> **✅ Resolved (2026-06-01):** Product link names standardized to full forms (`泰然專利防護網` / `泰然專利強度評級系統`) matching Homepage.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 訂閱最新動態 | Subscribe to the latest updates | Get Our Latest News | ☐ |
| (absent) | (absent) | Your Email | ☐ |
| (absent) | (absent) | © 2026 Talent Intelligence Strategies | ☐ |
| 產品 | Products | Products | ☐ |
| ~~授權平台~~<br>泰然專利防護網 | ~~Licensing Platform~~<br>TaiRan Patent Protection Net | Licensing Platform | 🆕 ✅ 🚀 |
| ~~Signal 平台~~<br>泰然專利強度評級系統 | ~~Signal Platform~~<br>TaiRan Patent Strength Rating System | Signal Platform | 🆕 ✅ 🚀 |
| 公司 | Company | Company | ☐ |
| 關於 | About | About | ☐ |
| 報告 | Reports | Reports | ☐ |
| 新聞 | News / Press | Press | ☐ |
| 聯絡 | Contact | Contact | ☐ |
| 法律 | Legal | Legal | ☐ |
| 服務條款 | Terms of Service | Terms | ☐ |
| 隱私政策 | Privacy Policy | Privacy | ☐ |
| 揭露聲明 | Disclosure(s) | Disclosures | ☐ |
| 聯絡 | Contact | Contact | ☐ |
| (absent) | (absent) | contact@tisglobalinc.com | ☐ |
| 台北 · 台灣 | Taipei · Taiwan | Taipei, Taiwan | ☐ |

---

# Signal

> **Source:** [website/product/signal/index.html](../product/signal/index.html) · 179 `data-zh` entries (no `data-zh-html`)
> Page 3 of 3.
>
> **⚠️ Same step-2 leak as Homepage.** "Matched against the right peer pool" reuses the two licensing-credential ZH strings as check items (lines 1885–1886 in the source) — exactly the same copy-paste error flagged in the Homepage section. Marked ❓ below.

## Top nav

> Same `data-zh` set as Licensing › Top nav (short product names). Different from Homepage › Top nav.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 產品 | Products | Products | ✅ 🚀 |
| ~~授權平台~~<br>泰然專利防護網 | ~~Licensing Platform~~<br>TaiRan Patent Protection Net | Licensing Platform | 🆕 ✅ 🚀 |
| ~~依司法管轄區與產業的專利防護。~~<br>精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | ~~Patent protection by jurisdiction and industry.~~<br>Curated, matched patent-protection bundle — patent insurance for export goods; fast activation, saves time, effort, budget. | ~~Patent protection by jurisdiction and industry.~~<br>Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | ✏️ ✅ 🚀 |
| ~~Signal 平台~~<br>泰然專利強度評級系統 | ~~Signal Platform~~<br>TaiRan Patent Strength Rating System | Signal Platform | 🆕 ✅ 🚀 |
| 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 | Compares against same-industry patents; across 50 indicators that cover both "quantity" and "quality" — grades patents professionally with evidence. | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | ✏️ ✅ 🚀 |
| 報告 | Reports | Reports | ✅ 🚀 |
| 新聞 | News / Press | Press | ✅ 🚀 |
| 關於 | About | About | ✅ 🚀 |
| 聯絡業務 | Contact sales | Contact sales | ✅ 🚀 |

## Mobile drawer

> Same as Top nav above.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 產品 | Products | Products | ✅ 🚀 |
| ~~授權平台~~<br>泰然專利防護網 | ~~Licensing Platform~~<br>TaiRan Patent Protection Net | Licensing Platform | 🆕 ✅ 🚀 |
| ~~依司法管轄區與產業的專利防護。~~<br>精選適配專利防護組合，為出口貨物保專利險，快速生效，省時省力省預算。 | ~~Patent protection by jurisdiction and industry.~~<br>Curated, matched patent-protection bundle — patent insurance for export goods; fast activation, saves time, effort, budget. | ~~Patent protection by jurisdiction and industry.~~<br>Patent insurance for exporters. Curated 30 patent bundles, fast to activate. | ✏️ ✅ 🚀 |
| ~~Signal 平台~~<br>泰然專利強度評級系統 | ~~Signal Platform~~<br>TaiRan Patent Strength Rating System | Signal Platform | 🆕 ✅ 🚀 |
| 比對同產業專利，針對「量」「質」兼備的50 個指標，有理有據地為專利作專業評級。 | Compares against same-industry patents; across 50 indicators that cover both "quantity" and "quality" — grades patents professionally with evidence. | Patent grading for investors. 50 evidence-based indicators, peer-ranked against its industry. | ✏️ ✅ 🚀 |
| 報告 | Reports | Reports | ✅ 🚀 |
| 新聞 | News / Press | Press | ✅ 🚀 |
| 關於 | About | About | ✅ 🚀 |
| 聯絡業務 | Contact sales | Contact sales | ✅ 🚀 |

## Search modal

> Verified identical to Homepage / Licensing search modals.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| ~~(absent)~~<br>搜尋報告、新聞與頁面… | ~~(absent)~~<br>Search reports, press, and pages… | Search reports, press, and pages… | 🆕 ✅ 🚀 |
| 跳至 | Jump to | Jump to | ✅ 🚀 |
| 產品 | Products | Products | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |
| 報告 | Reports | Reports | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |
| 新聞 | News / Press | Press | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |
| 關於 | About | About | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |
| 聯絡 | Contact | Contact | ✅ 🚀 |
| 頁面 | Page | Page | ✅ 🚀 |

## IP intelligence drop popup

> Verified identical to Homepage / Licensing IP popup.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 重要的專利動態。 | Important patent moves. | The patent moves that matter. | ☐ |
| 一年四份簡報。精選非匯總。 | Four briefs a year. Curated, not aggregated. | Four briefs a year. Curated, not aggregated. | ☐ |
| 角色 | Role | Role | ☐ |
| · 選填 | · Optional | · optional | ☐ |
| 請選擇… | Please select… | Select… | ☐ |
| 創辦人 / 高階主管 | Founder / Senior executive | Founder / C-suite | ☐ |
| 智財 / 法務 | IP / Legal | IP / Legal | ☐ |
| 研發 / 工程 | R&D / Engineering | R&D / Engineering | ☐ |
| 投資人 / 分析師 | Investor / Analyst | Investor / Analyst | ☐ |
| 其他 | Other | Other | ☐ |
| 產業 | Industry | Industry | ☐ |
| · 選填 | · Optional | · optional | ☐ |
| 所有產業 | All industries | All industries | ☐ |
| 電子 | Electronics | Electronics | ☐ |
| 機械 | Mechanical | Mechanical | ☐ |
| 綠能 | Green Energy | Green Energy | ☐ |
| 生醫 | Biomedical | Biomedical | ☐ |
| 材料 | Materials | Materials | ☐ |
| 工作信箱 | Work email | Work email | ☐ |
| (absent) | (absent) | you@company.com | ☐ |
| 訂閱下一份簡報 | Subscribe to the next brief | Get the next brief | ☐ |
| 每季一封信。 | One email per quarter. | One email per quarter. | ☐ |
| 隱私政策 | Privacy policy | Privacy | ☐ |

## H1 (screen-reader only)

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| Signal — 30 分鐘為專利做 SABCD 評等 | Signal — 30 minutes to grade patents with SABCD | Signal — Grade patents with SABCD in 30 minutes | ☐ |

## Announcement banner

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| Signal Beta 開放 — 首次專利評估免費贈送 50 點。 | Signal Beta open — first patent valuation free, 50 credits gifted. | Signal beta is open — try your first patent valuation free with 50 credits. | ☐ |
| 立即試用 → | Try now → | Try Signal free → | ☐ |

## Hero

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| (empty) | (intentionally blank on ZH side) | Token-Based Valuation · SABCD | ☐ |
| 律師告訴你「合不合法」 | Lawyers tell you "legal or not" | Grade IP in 30 minutes. | ☐ |
| 我們告訴你專利「強不強」 | We tell you whether a patent is "strong or not" | Not weeks. | ☐ |
| 把目標專利打進 產業池做「同儕基準快照（Peer Cohort Snapshot）」百分位排序，產出 SABCD 五級評級。 | Place the target patent into the industry pool for "Peer Cohort Snapshot" percentile sorting, producing a SABCD five-tier grade. | Submit a patent number; the SABCD-graded Brief lands in thirty minutes. Peer percentile drawn from your industry's curated pool — not a week-long analyst engagement. | ☐ |
| Powered by Innovue | Powered by Innovue | Powered by Innovue | ☐ |
| 免費預覽報告樣本 | Free preview report sample | Get your first Brief | ☐ |
| 聯絡業務 | Contact sales | Talk to sales | ☐ |

## Deliverables (4-card grid)

> Verified identical to Homepage › Products › Signal › Deliverables.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 看見你的專利排在哪裡 | See where your patent ranks | See how your patent measures up | ☐ |
| SABCD 評等將每件專利從 Tier S 排到 Tier D，以 Innovue 1.8 億件專利資料庫的同產業池為校準基準。 | SABCD grading ranks every patent from Tier S to Tier D — calibrated against Innovue's 180M-patent database's same-industry pool. | One SABCD letter, Tier S to Tier D, that your whole team reads the same way — calibrated against the peers in its industry pool, not the whole market. | ☐ |
| 壓力測試專利的真實強度 | Pressure-test a patent's true strength | Pressure-test a patent's strength | ☐ |
| 並列比對請求項、專利家族與引用，對標技術相近的同儕專利，檢驗其有效性與真實強度是否經得起審視。 | Side-by-side compare claims, patent families, and citations; benchmarked against technology-similar peer patents; tests whether validity and true strength withstand scrutiny. | Claim, family, and citation, side by side against technology-similar peers — so you see whether a patent's strength holds up before you bet on it. | ☐ |
| 策略佈局你的路徑 | Strategically position your path | Strategically position your path | ☐ |
| 每件專利拆解為 8 大加權支柱──引用影響力（Citation Impact）、前瞻價值（Forward-Looking Value）等──Pro 報告再展開 50 項指標深度分析，協助策略決策。 | Each patent breaks into 8 weighted pillars — Citation Impact, Forward-Looking Value, etc. — and the Pro report expands all 50 indicators for deep analysis, supporting strategic decisions. | Every patent breaks into 8 weighted pillars — Citation Impact, Forward-Looking Value, and more. Pro opens all 50 indicators beneath them, so you see exactly what anchors the grade. | ☐ |
| 下注前，先摸清地形 | Before placing the bet, get a feel for the terrain | Know the terrain before you bet | ☐ |
| 補上會帶來風險與昂貴錯誤的盲點。依產業與司法管轄區預製──免委派分析師專案。 | Fill in the blind spots that bring risk and costly mistakes. Pre-built by industry and jurisdiction — no need to commission an analyst project. | Pre-built landscapes by industry and jurisdiction — concentration, whitespace, filing surge. The blind spots that turn into expensive mistakes, closed before you commit. | ☐ |

## How it works (5-step horizontal rail)

> ⚠️ **Step 2 leak (same as Homepage).** Lines 1885–1886 in source have two `data-zh` strings copy-pasted from the Licensing "Display the credential" step — they describe license badges, not peer matching. Marked ❓.
>
> One small EN-side divergence vs Homepage on step 2 body: Signal says `Scores you can trust — graded against the patents that actually compete with yours, not the whole market.` (Homepage: `Scores you can trust — graded against patents that actually compete in the same category.`). ZH side (`蘋果對蘋果，`) is identical.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 運作方式 | How it operates | How it works | ☐ |
| 提交一個專利號 | Submit a patent number | Submit a patent number | ☐ |
| Brief 30 分鐘內寄達──免分析師，免等一整週。 | Brief arrives within 30 minutes — no analyst needed, no week-long wait. | Your Brief lands in 30 minutes — no analyst, no week-long wait. | ☐ |
| USPTO · TW · EPO · WO | USPTO · TW · EPO · WO | Grade patents from any major office | ☐ |
| 可平行 submit | Can submit in parallel | Score a whole batch at once | ☐ |
| P95 寄達 ≤ 30 分鐘 | P95 delivery ≤ 30 minutes | Skip the week-long analyst wait | ☐ |
| 對比同儕池 | Compare against the peer pool | Matched against the right peer pool | ☐ |
| 蘋果對蘋果， | Apples to apples, | Scores you can trust — graded against the patents that actually compete with yours, not the whole market. | ☐ |
| 高規格公證電子簽章的數位授權憑證，內嵌獨一授權編號與 QR Code，2 秒線上即時驗證。 | High-spec notarized e-signature Digital License Credential — embeds a unique license number and QR code; 2-second online instant verification. | Get matched to your exact technical category | ❓ |
| 「泰然 × 權威機構」的聯名授權認證標章，可自由印製於國際展位、提案書、官網 Footer 或產品外包裝，讓對手不敢輕易踩線。 | The "TIS × authoritative institutions" co-branded license-certification badge — freely printable on international booths, proposals, website footer, or product packaging; competitors won't dare to cross the line easily. | Benchmark against the Innovue, iPIC, III & NYCU pool | ❓ |
| Brief 還是 Pro──你決定 | Brief or Pro — you decide | Brief or Pro — your call | ☐ |
| 同一個評分引擎、兩種深度──當下付當下要的，事後可補繳升級。 | One scoring engine, two depths — pay now for what you need now, top up later to upgrade. | One scoring engine, two depths — pay for what you need today, top up later. | ☐ |
| Brief · 15 點 · 30 分鐘郵件 | Brief · 15 points · 30-minute email | Start with the fast Brief verdict | ☐ |
| Pro · 30 點 · 即時渲染 | Pro · 30 points · real-time render | Go deeper with Pro when you need it | ☐ |
| 事後升級無加價 | Upgrade later — no surcharge | Upgrade anytime — no switching premium | ☐ |
| Brief 報告呈現什麼 | What the Brief report shows | What the Brief report shows you | ☐ |
| 一分鐘掃完──無需編輯，直接轉發給投資委員會。 | Scannable in a minute — no editing needed, forward directly to the IC. | Scannable in a minute — forward it to your IC without editing. | ☐ |
| 等級判定 + PSS 分數 | Tier verdict + PSS score | See the tier verdict at a glance | ☐ |
| 池內百分位 + 池內排名 | In-pool percentile + in-pool rank | Know exactly where it ranks among peers | ☐ |
| 狀態 · 家族 · IPC · 剩餘年限 · AI 摘要 | Status · Family · IPC · Remaining term · AI summary | Forward it to your IC as-is | ☐ |
| Pro 將 PSS 拆解成 50 項指標 | Pro breaks the PSS down into 50 indicators | Pro unpacks the PSS into 50 indicators | ☐ |
| 可承受法務審視──看清哪些面向錨定評等、敏感度落在哪裡。 | Withstands legal review — see clearly which dimensions anchor the grade and where the sensitivities lie. | Defensible enough for legal — see which dimensions anchor the verdict and where the sensitivities sit. | ☐ |
| 八大支柱 × 4–8 項指標 = 50 項 | 8 pillars × 4–8 indicators = 50 items | See what anchors the grade | ☐ |
| 每項指標：原值、百分位、權重 | Each indicator: raw value, percentile, weight | Trace every score to its formula | ☐ |
| Top 10 驅動因子 + Top 5 敏感度標出 | Top 10 drivers + Top 5 sensitivities marked | Spot the top drivers and risks fast | ☐ |

## Pricing (3-tier — Standard / Pro / Max)

> Numeric values (prices, credit counts, save percentages) and the tier names `Pro` and `Max` have **no `data-zh`** — flagged `(absent)`. Shared labels (Monthly, Credits / mo, Subscribe) are marked.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 定價 — 按報告付費，或月訂閱。 | Pricing — pay per report, or monthly subscription. | Pricing — Pay per report. Or subscribe. | ☐ |
| Standard | Standard | Standard | ☐ |
| 月費 | Monthly fee | Monthly | ☐ |
| (absent) | (absent) | NT$4,900 | ☐ |
| 點數 / 月 | Credits / month | Credits / mo | ☐ |
| (absent) | (absent) | 49 | ☐ |
| 約 3 份 Brief | About 3 Briefs | Roughly 3 Briefs | ☐ |
| 信箱送達 + 儀表板存取 | Inbox delivery + dashboard access | Email delivery + dashboard access | ☐ |
| PDF 浮水印 + 稽核軌跡 | PDF watermark + audit trail | Watermarked PDFs + audit trail | ☐ |
| 月底未用點數歸零 | Unused credits zero out at month-end | Credits reset monthly | ☐ |
| 訂閱 | Subscribe | Subscribe | ☐ |
| 推薦 | Recommended | Recommended | ☐ |
| (absent) | (absent) | Pro | ☐ |
| 月費 | Monthly fee | Monthly | ☐ |
| (absent) | (absent) | NT$7,900 | ☐ |
| (absent) | (absent) | Save 5% | ☐ |
| 點數 / 月 | Credits / month | Credits / mo | ☐ |
| (absent) | (absent) | 83 | ☐ |
| 約 5 份 Brief | About 5 Briefs | Roughly 5 Briefs | ☐ |
| Standard 全部 + 以下 | All of Standard + the following | Everything in Standard, plus: | ☐ |
| 批次提交：早上 8 份 deck，當天回 | Batch submit: 8 decks in the morning, back same-day | Batch submit — 8 morning decks, scored by EOD | ☐ |
| 優先處理佇列（30 分鐘 SLA） | Priority processing queue (30-min SLA) | Priority queue (30-min SLA) | ☐ |
| PDF + JSON 匯出 | PDF + JSON export | PDF + JSON export | ☐ |
| 訂閱 | Subscribe | Subscribe | ☐ |
| (absent) | (absent) | Max | ☐ |
| 月費 | Monthly fee | Monthly | ☐ |
| (absent) | (absent) | NT$9,900 | ☐ |
| (absent) | (absent) | Save 10% | ☐ |
| 點數 / 月 | Credits / month | Credits / mo | ☐ |
| (absent) | (absent) | 110 | ☐ |
| 約 7 份 Brief | About 7 Briefs | Roughly 7 Briefs | ☐ |
| Pro 全部 + 以下 | All of Pro + the following | Everything in Pro, plus: | ☐ |
| 專屬同儕池（自選 IPC 範圍） | Custom peer pool (self-pick IPC range) | Custom cohort selection (IPC / time bands) | ☐ |
| 月度 LP-report 摘要 | Monthly LP-report summary | Monthly LP-letter summary | ☐ |
| Slack / Teams 整合 | Slack / Teams integration | Slack / Teams hook for new Briefs | ☐ |
| 訂閱 | Subscribe | Subscribe | ☐ |

## Pricing › Credits per query table

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 按報告價目 | Per-report price list | Credits per query | ☐ |
| 動作 | Action | Action | ☐ |
| 點數 | Credits | Credits | ☐ |
| 價格 | Price | Price | ☐ |
| 折扣 | Discount | Top-up discount | ☐ |
| Brief 評等報告 | Brief grade report | Brief grade report | ☐ |
| (absent) | (absent) | 15 | ☐ |
| (absent) | (absent) | NT$1,500 | ☐ |
| (absent) | (absent) | — | ☐ |
| Pro 深度升級（從 Brief） | Pro deep-dive upgrade (from a Brief) | Pro deep-dive upgrade (from a Brief) | ☐ |
| (absent) | (absent) | +15 | ☐ |
| (absent) | (absent) | NT$1,500 | ☐ |
| (absent) | (absent) | — | ☐ |
| Pro 直接購買（累計 30 點） | Pro direct purchase (cumulative 30 credits) | Pro direct purchase (30 cumulative) | ☐ |
| (absent) | (absent) | 30 | ☐ |
| (absent) | (absent) | NT$3,000 | ☐ |
| (absent) | (absent) | — | ☐ |
| 50 點頂入包 | 50-credit top-up pack | 50-credit top-up pack | ☐ |
| (absent) | (absent) | 50 | ☐ |
| (absent) | (absent) | NT$4,500 | ☐ |
| (absent) | (absent) | 10% | ☐ |
| 150 點頂入包 | 150-credit top-up pack | 150-credit top-up pack | ☐ |
| (absent) | (absent) | 150 | ☐ |
| (absent) | (absent) | NT$13,000 | ☐ |
| (absent) | (absent) | 13% | ☐ |
| 500 點頂入包 | 500-credit top-up pack | 500-credit top-up pack | ☐ |
| (absent) | (absent) | 500 | ☐ |
| (absent) | (absent) | NT$42,000 | ☐ |
| (absent) | (absent) | 16% | ☐ |

## Patent band CTA

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 對照同儕池來評等， | Benchmark against a peer pool, | Benchmark against a pool, | ☐ |
| 池由可信機構策展。 | the pool curated by trusted institutions. | drawn from reputable institutions | ☐ |
| 取得第一份 Brief | Get the first Brief | Get your first Brief | ☐ |

## FAQ

> Rich-text formatting: `**bold**` represents `<strong>` (used in EN side only — ZH side is plain text). `>` symbol in the ZH cell on Q1 is the actual character used in source (HTML-escaped as `&gt;`).

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 常見問題 | Common questions / FAQ | FAQ | ☐ |
| SABCD 等級是怎麼算出來的？ | How is the SABCD grade calculated? | How is the SABCD grade actually calculated? | ☐ |
| Patent Strength Score (PSS) 引擎將每件專利分解為 50 個量化訊號——引用影響、法律強度、市場覆蓋、授權潛力、技術前瞻、同族廣度、維護生命力、競爭密度。八大支柱,各自獨立加權。透明 > 精準。 | The Patent Strength Score (PSS) engine decomposes every patent into 50 quantitative signals — citation impact, legal robustness, market coverage, licensing potential, forward technology, family breadth, maintenance vitality, competitive density. Eight pillars, each independently weighted. Transparent > precise. | The **Patent Strength Score (PSS)** engine decomposes every patent into **50 quantitative signals** — citation impact, legal robustness, market coverage, licensing potential, forward technology, family breadth, maintenance vitality, competitive density. Eight pillars, each independently weighted. **Transparency over precision.** | ☐ |
| 比較的同儕池是什麼？ | What is the peer pool being compared to? | What pool are you comparing my patent against? | ☐ |
| Signal 讀取你專利的 IPC 分類、技術領域與申請年代區間,配對 TIS 池內 100+ 同儕——由 Innovue WEBPAT 預先評分。同樣的 IP 池支援 TIS 授權平台的捆綁。這不是「對全球所有專利的百分位」。這是對你真正會競爭的對手的百分位。 | Signal reads your patent's IPC class, technical domain, and filing window, then matches to 100+ peers in the TIS pool — pre-scored by Innovue WEBPAT. The same IP pool feeds bundles on the TIS Licensing Platform. This is not "percentile against all patents in the world." It's percentile against the competitors you'll actually compete with. | Signal reads your patent's IPC class, technical domain, and filing window, then matches it to **100+ peers from the TIS pool** — pre-scored on Innovue WEBPAT. The same pool feeds bundles on the TIS Licensing Platform. This isn't "percentile vs every patent on Earth." It's percentile **vs the companies you'll actually compete with**. | ☐ |
| 我可以看到每個分數是怎麼算出來的嗎？ | Can I see how each score was calculated? | Can I see how each score was calculated? | ☐ |
| 可以。點開任一支柱：看到 5–8 項底層指標。點開任一指標：看到計算公式、原始數值、與同儕中位數。沒有「我們的模型說」。Signal 報告為資訊參考用途,並非法律或投資建議。 | Yes. Click any pillar: see 5–8 underlying indicators. Click any indicator: see the formula, raw value, and the peer median. No "our model says." Signal reports are for informational reference; not legal or investment advice. | Yes. Click any pillar to see its 5–8 underlying indicators. Click any indicator to see the formula, the raw value, and the cohort median. **No "our model says."** Signal Briefs are informational — not legal or investment advice. | ☐ |
| Brief 跟 Pro 擴充差在哪裡？ | What's the difference between Brief and the Pro extension? | What's in a Brief vs the Pro extension? | ☐ |
| Brief(15 點)涵蓋：SABCD 評等、PSS 強度、同儕百分位、組內排名、八大支柱雷達圖。Pro(+15 點)再加：50 指標摘要計分卡、評等理由、前 10 大強項(含貢獻百分比)、前 10 大風險(含敏感度分析)、跨場景穩定矩陣(授權／訴訟／併購)、授權策略 + 對手地圖、工作迴避指引(FTO hints)、50 指標完整透明、PDF + JSON 匯出。+15 點,30 秒內解鎖。 | Brief (15 credits) covers: SABCD grade, PSS strength, peer percentile, in-group rank, eight-pillar radar chart. Pro (+15 credits) adds: 50-indicator summary scorecard, grade rationale, top 10 strengths (with contribution %), top 10 risks (with sensitivity analysis), cross-scenario stability matrix (licensing / litigation / M&A), licensing strategy + counter-party map, work-around guidance (FTO hints), full 50-indicator transparency, PDF + JSON export. +15 credits, unlocked within 30 seconds. | **Brief (15 credits)** covers the SABCD verdict, PSS magnitude, peer percentile, cohort rank, and eight-pillar radar. **Pro (+15 credits)** adds the 50-indicator summary scorecard, rating rationale, top 10 strengths with contribution percentages, top 10 risks with sensitivity analysis, cross-scenario stability matrix (licensing / litigation / M&A), licensing strategy with counter-party map, work-around guidance (FTO hints), full 50-indicator drilldown with formulas, and PDF + JSON export. +15 credits upgrades a Brief to Pro in under thirty seconds. | ☐ |
| 從送出到收到 Brief 需要多久？ | How long from submitting to receiving the Brief? | How long until the Brief lands in my inbox? | ☐ |
| 三十分鐘。送出專利號 → PSS 引擎評分(15–20 min)→ Brief 寄達(30 min)。離開桌前,回來時 Brief 已在信箱。 | Thirty minutes. Submit patent number → PSS engine scores (15–20 min) → Brief delivered (30 min). Step away from your desk; the Brief is in your inbox when you return. | **Thirty minutes.** Submit a patent number → the PSS engine scores it (15–20 min) → the Brief lands in your inbox (30 min). Walk away from your desk; come back to a finished report. | ☐ |

## Contact

> Same form structure as Licensing › Contact. Default inquiry value is `Signal / 估值` instead of `授權組合`.

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 與我們聯絡。 | Contact us. | Get in touch. | ☐ |
| (absent) | (absent) | contact@tisglobalinc.com | ☐ |
| 姓名 | Name / Full name | Full Name | ☐ |
| (absent) | (absent) | e.g. Alexander Chen | ☐ |
| 電子郵件 | Email | Email Address | ☐ |
| (absent) | (absent) | name@company.com | ☐ |
| 機構 | Organization / Institution | Organization | ☐ |
| (absent) | (absent) | Company | ☐ |
| 諮詢類型 | Inquiry type | Inquiry Type | ☐ |
| Signal / 估值 | Signal / Valuation | Signal / valuation | ☐ |
| 授權組合 | Licensing bundle | Licensing bundle | ☐ |
| Signal / 估值 | Signal / Valuation | Signal / valuation | ☐ |
| 媒體採訪 | Media interview | Press & media | ☐ |
| 其他 | Other | General | ☐ |
| 您的需求 | Your requirements | Your Inquiry | ☐ |
| (absent) | (absent) | Briefly describe your requirements… | ☐ |
| 台北 (UTC+8) | Taipei (UTC+8) | Taipei (UTC+8) | ☐ |
| 週一至週五 | Mon–Fri | Mon–Fri | ☐ |
| 服務時間 | Service hours | Office hours | ☐ |
| (absent) | (absent) | 09:00 – 18:00 | ☐ |
| 送出諮詢 | Submit inquiry | Send Inquiry | ☐ |
| 訊息已送出。 | Message sent. | Message sent. | ☐ |
| 已收到您的諮詢。我們將於 1–2 個工作天內回覆。 | Your inquiry has been received. We'll reply within 1–2 business days. | Inquiry received. We'll be in touch within 1–2 business days. | ☐ |

## Footer

> Same as Licensing footer (short product-name forms).

| ZH | Literal EN | Site EN | Status |
|---|---|---|---|
| 訂閱最新動態 | Subscribe to the latest updates | Get Our Latest News | ☐ |
| (absent) | (absent) | Your Email | ☐ |
| (absent) | (absent) | © 2026 Talent Intelligence Strategies | ☐ |
| 產品 | Products | Products | ☐ |
| ~~授權平台~~<br>泰然專利防護網 | ~~Licensing Platform~~<br>TaiRan Patent Protection Net | Licensing Platform | 🆕 ✅ 🚀 |
| ~~Signal 平台~~<br>泰然專利強度評級系統 | ~~Signal Platform~~<br>TaiRan Patent Strength Rating System | Signal Platform | 🆕 ✅ 🚀 |
| 公司 | Company | Company | ☐ |
| 關於 | About | About | ☐ |
| 報告 | Reports | Reports | ☐ |
| 新聞 | News / Press | Press | ☐ |
| 聯絡 | Contact | Contact | ☐ |
| 法律 | Legal | Legal | ☐ |
| 服務條款 | Terms of Service | Terms | ☐ |
| 隱私政策 | Privacy Policy | Privacy | ☐ |
| 揭露聲明 | Disclosure(s) | Disclosures | ☐ |
| 聯絡 | Contact | Contact | ☐ |
| (absent) | (absent) | contact@tisglobalinc.com | ☐ |
| 台北 · 台灣 | Taipei · Taiwan | Taipei, Taiwan | ☐ |

---

# Audit complete

> All three pages extracted. See section-specific flags above for the issues that need attention.
