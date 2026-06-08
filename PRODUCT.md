# Product

## Register

brand

## Surface

`website/product/licensing/index.html` — the Licensing Platform (泰然專利防護網) marketing landing page. A static, no-build page on the TIS marketing site. Content + funnel are owned by `website/documents/licensing-page-prd.md`; this file owns the strategic *why* behind the visual redesign.

## Users

**王董 — export-SME owner, 48–58.** Runs a 50–200-person Taiwan OEM (PCB / mechanical / textile / electronic components). Mental model: *"We make products. We worry about being sued only when we get sued."* Reads the page on the anxiety *"Will I get blocked at the US trade show? Will buyers walk?"* Budget NT$5–15K/month. Not a developer, not a lawyer; a pragmatic operator who trusts evidence, named institutions, and real numbers — and distrusts hype. Reads bilingually (EN/中文 toggle).

## Product Purpose

Convert that one anxiety into the calm of someone who already has coverage. The page sells a *deliverable* (a 30-patent, SABCD-graded, institution-licensed bundle activating the week you subscribe), not a tool. Success = 王董 reaches `lobby.html` believing TIS is the composed, methodical, honest party in a market full of fear-selling.

## Brand Personality

**泰然 (tài-rán): composed, methodical, honest.** Three words: *unhurried · precise · candid.* The voice never oversells — it states evidence and lets the reader conclude. It is explicitly anti-hype: it refuses the "never sued" myth and tells you what happens when things go sideways. Emotional goal: the quiet authority of a private-bank statement or a sealed legal dossier, not the adrenaline of a SaaS hero.

## Anti-references

- **Hype-SaaS landing pages.** Gradient-washed heroes, "AI-powered / unlock / seamless" copy, the big-gradient-number hero-metric template, fade-in-on-scroll on every block. The whole genre 王董 distrusts.
- **Editorial-magazine affectation.** Display-serif + italic drop caps + broadsheet ruled columns. Wrong register for an IP consultancy; reads as a lifestyle brand.
- **Brutalist / acid-maximalism.** Loud, raw, ironic. Actively repels a conservative 48–58yo B2B export buyer.
- **The current page's tells:** gradient-clipped headings, a tiny uppercase tracked kicker above *every* section, near-identical bordered bento cards repeated for nine sections.

## Design Principles

1. **Composed, not loud.** Restraint *with* intent. Premium is generous whitespace, exact typography, and precise rhythm — not decoration. Color is rationed like gold foil on a black-and-white document.
2. **The dossier, not the brochure.** Present as a chaptered coverage file a methodical advisor walks you through. Numbered chapters and monospaced metadata are legitimate here because the content literally *is* a sequence of patent IDs, tiers, license numbers, and dates.
3. **Evidence over adjectives.** Lead with the real number (30, NT$50,000+, 18 months, 5·6·9·6·4, 1.7億件). The design's job is to make those numbers land, never to inflate them.
4. **Honest about the edges.** The "when it doesn't go to plan" beat is a feature of the brand, not fine print. Give it real weight.
5. **Color earns its place.** The warm gradient (S-gold → D-orange) appears only as a deliberate signal — a seal, a single emphasized word, the hero accent, the key CTA. The SABCD palette appears only where it encodes real data (the distribution bar, tier chips, patent dots). Never a wash.

## Accessibility & Inclusion

- WCAG 2.1 AA: body text ≥4.5:1, large text ≥3:1, against actual (often warm-tinted) backgrounds. Tier colors never the *sole* signal — always paired with the letter token (S/A/B/C/D).
- Tap targets ≥44px. Visible focus rings (inherit `--border-focus`).
- `prefers-reduced-motion: reduce` honored on every animation (instant / crossfade fallback). Content is legible with zero motion and must never be gated invisible on JS failure.
- Fully bilingual via the `data-zh` system; never invent Chinese — EN is the visible fallback where ZH is pending.
