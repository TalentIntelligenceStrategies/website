# Licensing — marketing → product entry flow

Covers the **handoff boundary** only: how a visitor moves from the marketing site
(`tisglobalinc.com`) through this product page into the Licensing Platform's front
door at `licensing.tisglobalinc.com`. The internal post-handoff flow (the
`/welcome` lobby and the 12 portal routes) is owned by the licensing repo — this
doc references it rather than re-specifying it.

## 0. Cross-product auth model

> **Shared block — keep byte-identical with [../signal/entry-flow.md](../signal/entry-flow.md) §0.**

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

Every Licensing CTA on this product page points at `https://licensing.tisglobalinc.com/start`
(`data-target="licensing-signup"`):

| Line | CTA label | Destination |
|---|---|---|
| [product/licensing/index.html:2265](index.html#L2265) | Build your bundle | `licensing.tisglobalinc.com/start` |
| [product/licensing/index.html:2591](index.html#L2591) | Subscribe | `licensing.tisglobalinc.com/start` |
| [product/licensing/index.html:2690](index.html#L2690) | Build your bundle | `licensing.tisglobalinc.com/start` |

## 2. Intended front-door behavior (hands into the internal lobby)

The front door is an **auth-aware lobby** (check-in desk) that routes by login
state — do **not** re-spec it here:

- **Signed in** → routed by license state: ≥1 ACTIVE → dashboard; expired or no
  contract → purchase + a reactivate/first-purchase banner.
- **Signed out** → two CTAs: Register / Sign in.

Authoritative internal spec (single source of truth, downstream in the licensing
repo): [../../../operations-site/worktemp/journey/entry-flow-userflow.md](../../../operations-site/worktemp/journey/entry-flow-userflow.md) §2–§5.

A static **lobby prototype** of this front door lives at [lobby/index.html](lobby/index.html)
(`/product/licensing/lobby/`) — a branded split-screen check-in (marketing panel +
Sign up/Log in) whose "Continue" hands off to `licensing.tisglobalinc.com/start`.
It is a visual mock (no backend); product-page CTAs are not yet routed through it.

## 3. Route-name reconciliation (open)

Marketing links to `/start`; the internal doc names the lobby `/welcome`
(placeholder, open question Q-EF1 in that doc). When licensing builds its lobby
route, the front-door route name **must be reconciled** so the marketing CTA and
the live route agree (pick one of `/start` / `/welcome`, or alias).

## 4. Gap to close (P1)

Marketing currently exposes **only signup CTAs** — there is no "Sign in" path for
returning users anywhere on the homepage or this page, even though the internal
lobby already handles returning/signed-in users. **Proposed follow-up (not done
here):** add a low-emphasis "Sign in" entry (top-nav or a product-page secondary
link) pointing at the licensing lobby for returning users. Editing `index.html` is
out of scope for this doc.
