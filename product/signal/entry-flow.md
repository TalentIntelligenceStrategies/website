# Signal — marketing → product entry flow

Covers the **handoff boundary** only: how a visitor moves from the marketing site
(`tisglobalinc.com`) through this product page into Signal's front door at
`signal.tisglobalinc.com`. Signal's internal post-handoff UX (login screen,
query/dashboard) is owned by the Signal repo's TDD phase — not specified here.

## 0. Cross-product auth model

> **Shared block — keep byte-identical with [../licensing/entry-flow.md](../licensing/entry-flow.md) §0.**

- **Staged: separate now, SSO-ready.** Each product keeps its own login, account,
  and billing today (matches both MVP specs). We build only the cheap foundations
  now so a unified SSO lobby can layer on in **Phase 2** without redoing auth.
- **Domain map:** `tisglobalinc.com` (marketing) · `signal.tisglobalinc.com` (Signal) · `licensing.tisglobalinc.com` (Licensing).
- **SSO-ready foundations to honor on both sides:** (a) auth cookies scoped to the
  `.tisglobalinc.com` parent domain; (b) email as the stable identity key, so the
  same email can be claimed across products in Phase 2; (c) each product's lobby
  left as a named route seam (`/start`, `/welcome`) rather than inlined into the
  first business screen.
- **MVP non-goals:** no shared session, no unified checkout, no product picker, no
  cross-product billing.

## 1. Front door — where the CTAs go

Every Signal CTA on this product page points at `https://signal.tisglobalinc.com/start`
(`data-target="signal-signup"`):

| Line | CTA label | Destination |
|---|---|---|
| [product/signal/index.html:1684](index.html#L1684) | Get your first Brief | `signal.tisglobalinc.com/start` |
| [product/signal/index.html:1912](index.html#L1912) | Subscribe (Lite) | `signal.tisglobalinc.com/start` |
| [product/signal/index.html:1937](index.html#L1937) | Subscribe (Standard) | `signal.tisglobalinc.com/start` |
| [product/signal/index.html:1962](index.html#L1962) | Subscribe (Pro) | `signal.tisglobalinc.com/start` |
| [product/signal/index.html:2064](index.html#L2064) | Get your first Brief | `signal.tisglobalinc.com/start` |

`/start` is Signal's own lobby (check-in desk) — the single named seam between
marketing and the product.

## 2. Intended `/start` behavior (Signal's lobby)

- **Signed out** → email self-signup + Stripe; "start querying within ~5 min" (no
  NDA, no sales contact). First user on a company email domain becomes Domain
  Admin; the account is a domain-pooled wallet (≤5 accounts per domain).
- **Signed in** → straight to the query / dashboard (no marketing interstitial).

Reference: [../../../VC-signal/docs/requirements/VC_Signal_PRD_v0.5.md](../../../VC-signal/docs/requirements/VC_Signal_PRD_v0.5.md) §2.5, §8.1.1 (FR-AUTH-01).

## 3. Status

Signal's repo is **docs/specs only** — no scaffold; framework, host, and entry-UX
TDD are undecided. This doc captures *intended* front-door behavior; the actual
`/start` screen design is a Signal-TDD deliverable, not part of the marketing site.

## 4. Gap to close (P1)

Marketing currently exposes **only signup CTAs** — there is no "Sign in" path for
returning users anywhere on the homepage or this page. **Proposed follow-up (not
done here):** add a low-emphasis "Sign in" entry (top-nav or a product-page
secondary link) pointing at `signal.tisglobalinc.com/start` so returning users
have a front door. Editing `index.html` is out of scope for this doc.
