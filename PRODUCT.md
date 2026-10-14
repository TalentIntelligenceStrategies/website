# Product

The product register for tisglobalinc.com: who the site is for, what it has to do, and
what success looks like. Design skills (`impeccable` and others) read this first.

**This is not a design authority.** Layout, spacing, type, chrome, CTA, motion and the
per-page notes live in [DESIGN.md](DESIGN.md). Tokens, colour, logo and voice live
upstream in `brand/` (mirrored read-only into [designs/](designs/)). Positioning is owned
by `brand/positioning.md`; this file summarises it for the site and never overrides it.

## Register

brand

## What TIS is

Talent Intelligence Strategies (泰然策略解密) is **Taiwan's ecosystem service provider
for unmanned-vehicle makers**: air, surface, ground and underwater; commercial, dual-use
and military. One contract, three pillars, TIS as orchestrator:

- **Sustain 維護**: MRO and sustainment for fielded UV systems, island-wide, through a
  partner service network (Suntek Group / PG Union) brought to UV standard by a Taiwan
  leading UAV manufacturer.
- **Protect 防護**: patent consulting in Taiwan and Asia, on a retainer that does not
  depend on how much you file.
- **License 授權**: the TIS × Innovue UAV patent portfolio, and licensing services for
  the customer's own patents.

The patent portfolio and the MRO business are separate assets. No MRO contract is ever
conditioned on a licence. Wherever the two appear together, the site says so.

## Surfaces

| Surface | Path | Built from |
| --- | --- | --- |
| Front door | `/`, `/sustain/`, `/protect/`, `/license/`, `/ecosystem/`, `/why-taiwan/`, `/about/` | `mro/website-build/build.py` + `home_about.py` (generated; edit those, not the HTML) |
| Insights | `/product/signal/` (Patent Strength Grading); `/product/licensing/` (veiled) | hand-authored |
| Chrome | nav, drawer, search, footer on every page | `scripts/sync-chrome.py` |

Every front-door page ends in its own contact form; there is no other conversion path.

## Users

Priority segment: **US and allied UV makers fielding systems in Taiwan** (FMS, DCS or
commercial). The homepage addresses them as "US makers entering Taiwan". Also served:
Taiwanese makers in the military-use, commercial-spec program; integrators and operators;
foreign makers entering Taiwan commercially. (`brand/positioning.md` §4.)

Inside a customer, four readers each need their answer:

- **VP Sustainment**: who keeps my fielded systems flying in Taiwan, how fast, and under
  what SLA.
- **Indo-Pacific BD lead**: what it takes to win and hold Taiwan contracts without
  building a local organisation first. Often reads on a phone at a show (AUSA).
- **Trade-compliance officer**: how the engagement fits my export licence (two lanes,
  one compliance program; no export-controlled data through the web form).
- **IP counsel**: where TIS's own patents are, and whether TIS is neutral toward mine.

All are senior, time-poor and allergic to hype. They trust named partners, real numbers
with their source, and plain statements of what TIS will not do. Many read bilingually
(EN / 中文 toggle).

## Product purpose

Turn "we will have systems in Taiwan and our customer will ask who sustains them" into a
scoping conversation under NDA. The site sells one partner and one contract, not a
service menu.

Success: a reader from the priority segment reaches the contact form on the page they are
reading and sends it, believing TIS is the calm, specific, compliance-literate party.
Secondary: they can find, in one or two taps, the answer for their own role (SLA,
compliance lane, neutrality line, portfolio separation).

## Tone

Calm, specific, evidence first (泰然). Anti-hype rules, banned phrases and anchor
numbers: `brand/brand-voice.md`. Partner credit per pillar: `brand/visual-guide.md`
§Partner Credit by Pillar.

## Licensing Platform page (Insights, veiled)

[product/licensing/index.html](product/licensing/index.html), the Licensing Platform
(泰然專利防護網) landing page, has been **veiled since 2026-08-23**: a coming-soon cover;
the product is not sold from the site (DESIGN.md §17 mechanism, §16.1 revert list). While
veiled, its only job is to route interest to the contact form. Its original reader was an
export-SME owner buying a graded patent bundle. That brief is kept in git history for
when the veil lifts; it is not the site's audience.
