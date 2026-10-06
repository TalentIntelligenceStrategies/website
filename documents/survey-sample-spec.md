# Survey Report — Sample Report, corrected

> Filed 2026-10-06 from the team's "Survey_Report_sample_spec". Copy material only, not a design
> authority (see `CLAUDE.md`). Rendered as `#cover-landscape` in
> `assets/product-shots/signal/signal-report-cover-variant-b.html` and `#p-landscape` in
> `assets/product-shots/signal/signal-report-covers.html`, shown in panel C of `/product/signal/`.
>
> **Filing corrections.** Patent numbers aligned to the live sample's ten (the original draft
> carried typos: US9314885, US8915211, US8877061, KR102338144, US8154992, WO2018241477,
> TW I712245, US8482018). The old sample's "why it matches" was on p.5, not p.9 (p.9 was the
> technology cluster). Rows 6–10 now carry their own one-line "why", and assignee / IPC / year
> are filled in for the sample (illustrative, fictional assignees).
>
> **Against the PRD.** `vc-signal` PRD v0.7 §8.10 already says the customer's patent is not
> graded; this spec agrees. It departs from AC-2 ("rank only, no absolute score"): the sample
> shows the similarity score as Innovue returns it. The PRD needs reconciling upstream.

*Based on the live sample at /product/signal/ (Survey panel). Keeps the same example patent and the same ten results; fixes three things and shows the "why it matches" written out so the sample pages/PDF can be rebuilt.*

---

## What's wrong in the current sample

1. **It grades the customer's patent (Rated S · PSS 78.91 · rank 4/1433 · cohort 97.8%).** Survey's promise is *any input* — a granted patent, a draft, or just an idea. An idea or draft can't be scored (no PSS), so a grade can't be part of Survey. The grade + the 1433-pool percentile belong to Snapshot / Study. **Survey maps the field; it does not score your patent.**
2. **It conflates two different "scores."** The sample stamps a **patent-strength grade** at the top *and* a per-result similarity score. The grade is the thing that doesn't belong (see #1). The **similarity score is correct and should stay** — Innovue's own live system (PI-域見通 v1.0.15) displays it per result (分數 0.8600 …), and that system is what gets re-skinned for US customers, so Survey shows **rank + the similarity score + the "why,"** one score per patent. Just don't dress it up as a cross-report-comparable precision metric: it's the closeness of *this* result to *this* input.
3. **The "why it matches" is buried on p.5.** That explanation is the entire value of the report and the only part *we* author — the engine returns just a ranked list. It should sit **with each patent**, not pages later.

**Who produces what (state it plainly in the report):**
- **Innovue vector engine →** the ten closest patents, ranked closest-first, + each patent's full text (abstract, claims, spec). Nothing more.
- **TIS (AI-assisted, human-reviewed) →** the plain-English "why it matches" for each, and the read of the field.

---

## Corrected structure

**Cover** — Survey Report · *The field* · input patent/idea · order no · date. *(Drop "Patent strength rating"; Survey isn't a rating.)*

**Page 1 — The ten closest, and why**
- Header line: *The ten patents closest to your input, and why.* (No grade.)
- Input line: the patent / draft / idea, + one sentence of our plain-English read of the technology.
- Small meta strip: **Matches returned · Search corpus (TW + US, granted + published) · Retrieved date.** (No SABCD, no PSS, no 1433 rank, no cohort percentile.)
- **The ten**, closest first — each row: rank · patent no / title · assignee · main IPC · year · the **similarity score** (as Innovue returns it, e.g. 0.86) · and a **1–2 line "why it matches."**

**Later pages (the full PDF)**
- §2 **The ten closest — in full** (each with the longer "why it matches," grounded in that patent's claims).
- §3 **The field, read as a whole** (clusters / common ground / what's different / density / players).
- §Notes — ranked by semantic similarity vs live TW+US data; "why it matches" is an **AI-assisted technical comparison, not a legal / FTO opinion**; watermarked.

---

## Worked example (same patent + same ten as the live sample)

**Input:** US9876543 — *Process control methods for fin-FET gate uniformity at sub-7-nanometre nodes* · Macrosilicon Manufacturing Corp.

**Our read of the technology:** a closed-loop process-control method that holds fin-FET gate critical dimension uniform across a wafer at sub-7 nm nodes, feeding in-line metrology back into etch on a per-die basis.

**The ten closest — with the "why" written out** *(assignee / IPC / year are illustrative for the sample)*:

| # | Patent / title | Assignee · IPC · year | Score | Why it matches (TIS-authored) |
|---|---|---|---|---|
| 1 | **US9214887** · Adaptive etch dwell control for FinFET gate modules | Northgate Semiconductor · H01L 21/3065 · 2019 | 0.96 | Claims the same per-die feedback loop at the core of your method — adjusting etch dwell from in-line CD measurement (claim 1). The closest on the list, and a near-direct read onto your gate-uniformity claim. |
| 2 | **US9019233** · In-line CD metrology with per-die process correction | Corvane Instruments · H01L 21/66 · 2018 | 0.94 | The measurement-and-correction half of your loop, claimed in its own right (claims 1–3): per-die CD metrology driving a process adjustment. Overlaps on *how you sense and correct*, less on the etch step itself. |
| 3 | **EP3140219** · Gate critical-dimension uniformity at advanced nodes | Varo Lithography BV · G03F 7/70 · 2017 | 0.91 | Same objective — holding gate CD at advanced nodes — but via litho-side correction rather than etch dwell. Converges on the goal, diverges on the lever. |
| 4 | **US8877661** · Wafer-level variance compensation in plasma etch | Kestrel Process Systems · H01J 37/32 · 2016 | 0.88 | Compensates wafer-level etch variance; your method is per-die, so the overlap is the control principle, not the resolution. Relevant prior art on the compensation concept. |
| 5 | **KR102330144** · Real-time etch endpoint detection for 5 nm logic | Hanseo Semicon Co. · H01L 21/3065 · 2021 | 0.85 | Shares the real-time etch-control context at the same node; the claimed invention is endpoint detection, adjacent to — not the same as — your uniformity loop. |
| 6 | **US8654902** · Feed-forward lithography correction from etch data | Aldmoor Systems · G03F 7/20 · 2015 | 0.83 | Feeds etch data forward into lithography; your loop runs the other way, from metrology back into etch. |
| 7 | **WO2018201477** · Statistical process control for multi-patterning | Lumet Fab Technologies · G05B 19/418 · 2018 | 0.80 | Statistical control of CD drift across patterning steps; shares the uniformity goal, not the per-die loop. |
| 8 | **TW I712345** · Chamber-matching for high-volume logic fabrication | Jinhe Foundry Co. · H01J 37/32 · 2020 | 0.77 | Matches etch results chamber to chamber rather than die to die; tool-level, a step removed. |
| 9 | **US8402118** · Overlay control using post-etch inspection feedback | Halden Microdevices · G03F 7/70 · 2014 | 0.74 | Post-etch inspection as feedback, but to correct overlay rather than gate CD. |
| 10 | **JP6553311** · Gate profile tuning across multi-chamber toolsets | Kōsei Plasma K.K. · H01L 21/8234 · 2019 | 0.71 | Same gate module, tuned at toolset level; the furthest from your per-die etch loop. |

**The field, read as a whole (TIS-authored):**
> The ten cluster tightly on in-line, per-die process control for advanced-node logic — the space your patent sits in is crowded, not open. The three closest (US9214887, US9019233, EP3140219) all claim per-die correction, which is exactly where your independent claims sit, so that's where overlap risk is highest. The rest split between upstream metrology and downstream overlay/profile control — related, but a step removed. The clearest differentiator in your input is the *etch-dwell lever driven by per-die CD*; only US9214887 reads directly onto it.

---

## Card / lede — corrected (replaces the "SABCD grade" wording)
> **Survey Report — The field.** The ten patents closest to your input, each with a **similarity score** and a read on *why* it matches — the overlapping claims, the approach, the players. Works from a granted patent, a draft, or just an idea. *Survey maps the field; it doesn't grade your patent.*

---

## One decision for Troy — resolved 2026-10-06
The live sample bundled a **grade** into Survey. Settled:
- **Adopted:** Survey carries **no grade** (it accepts ideas/drafts that can't be graded; grading is Snapshot/Study). Clean and consistent with "Any input."
- Rejected: a **conditional** grade for granted-patent inputs only (absent for drafts/ideas) — messier, and it blurs Survey into Snapshot.
