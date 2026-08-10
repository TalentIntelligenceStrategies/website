/**
 * Ported from 21st.dev — "Pricing Section" by uilayout.contact (demo id 6247).
 *
 * This is the pilot port for the island pipeline, and it was chosen because the original
 * trips every single rule in DESIGN.md §15.5 at once. What was removed and why:
 *
 *   - `motion/react` (a `layoutId` sliding pill + blurred stagger) and its
 *     `TimelineContent` wrapper, which was a registry dependency the payload did not
 *     actually include. Motion inside an island cannot use the site's [data-reveal] or
 *     .counter contracts — both are one-shot querySelectorAll calls at DOMContentLoaded,
 *     so island nodes are never observed. Stripped rather than reimplemented.
 *   - The number-flow counter on the price. Renders the number directly.
 *   - An inline `style` radial gradient built from a raw hex — the one path that bypasses
 *     both the replaced Tailwind palette and the disabled backgroundImage core plugin.
 *   - Gradient fills on both buttons, and their coloured shadows → flat tokens plus the
 *     shadow scale.
 *   - Full-viewport height, page padding, centring and a max-width: the island sizes to
 *     the box the page gives it (§15.3 rule 2).
 *   - A neutral page ground. The page owns its own ground.
 *
 * Deliberately paraphrased rather than quoted: Tailwind's extractor scans this file
 * including its comments, so naming a removed class here would generate the utility again
 * and ship it as dead CSS.
 *
 * Kept as-is: the shadcn `Card` primitive (`bg-card` / `text-card-foreground` /
 * `text-muted-foreground` now resolve through the generated config), `lucide-react` icons,
 * and the aliased scale names — `blue-*` lands on the Signal accent, `neutral-*` on the
 * TIS greys.
 *
 * Plans are a prop so the component is quantity-agnostic; the default is the demo data.
 */
import { useState } from 'react';
import { Briefcase, CheckCheck, Database, Server } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

const ICONS = { briefcase: Briefcase, database: Database, server: Server };

const DEFAULT_PLANS = [
  {
    name: 'Starter',
    description: 'For a first look at how the rating reads against a small portfolio.',
    price: 12,
    yearlyPrice: 99,
    buttonText: 'Get started',
    features: [
      { text: 'Up to 10 boards per workspace', icon: 'briefcase' },
      { text: 'Up to 10GB storage', icon: 'database' },
      { text: 'Limited analytics', icon: 'server' },
    ],
    includes: ['Free includes:', 'Unlimited cards', 'Custom background & stickers', '2-factor authentication'],
  },
  {
    name: 'Business',
    description: 'For teams running the rating across an active portfolio.',
    price: 48,
    yearlyPrice: 399,
    buttonText: 'Get started',
    popular: true,
    features: [
      { text: 'Unlimited boards', icon: 'briefcase' },
      { text: 'Storage (250MB/file)', icon: 'database' },
      { text: '100 workspace command runs', icon: 'server' },
    ],
    includes: ['Everything in Starter, plus:', 'Advanced checklists', 'Custom fields', 'Serverless functions'],
  },
  {
    name: 'Enterprise',
    description: 'For institutional portfolios with their own review process.',
    price: 96,
    yearlyPrice: 899,
    buttonText: 'Get started',
    features: [
      { text: 'Unlimited boards', icon: 'briefcase' },
      { text: 'Unlimited storage', icon: 'database' },
      { text: 'Unlimited workspaces', icon: 'server' },
    ],
    includes: ['Everything in Business, plus:', 'Multi-board management', 'Multi-board guest', 'Attachment permissions'],
  },
];

function PricingSwitch({ yearly, onChange }) {
  return (
    <div className="flex justify-center">
      <div className="relative flex w-fit rounded-full border border-border bg-surface-secondary p-1">
        {[
          { value: false, label: 'Monthly' },
          { value: true, label: 'Yearly' },
        ].map(({ value, label }) => {
          const active = yearly === value;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onChange(value)}
              className={`h-10 rounded-full px-6 text-sm font-medium transition-colors sm:h-12 ${
                active
                  ? 'bg-surface-inverse text-text-inverse'
                  : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              <span className="flex items-center gap-2">
                {label}
                {value && (
                  <span className="rounded-full bg-surface-accent-signal-wash px-2 py-0.5 text-xs font-medium text-surface-accent-signal-text">
                    Save 20%
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PricingSection({ plans = DEFAULT_PLANS }) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div>
      <PricingSwitch yearly={isYearly} onChange={setIsYearly} />

      <div className="grid gap-4 py-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${plan.popular ? 'border-border-focus shadow-medium' : 'shadow-low'}`}
          >
            <CardHeader className="text-left">
              <div className="flex justify-between">
                <h3 className="mb-2 text-3xl font-semibold text-text-primary">{plan.name}</h3>
                {plan.popular && (
                  <span className="h-fit rounded-full bg-surface-accent-signal px-3 py-1 text-sm font-medium text-white">
                    Popular
                  </span>
                )}
              </div>
              <p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>
              <div className="flex items-baseline">
                <span className="font-mono text-4xl font-semibold text-text-primary">
                  ${isYearly ? plan.yearlyPrice : plan.price}
                </span>
                <span className="ml-1 text-text-tertiary">/{isYearly ? 'year' : 'month'}</span>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <button
                type="button"
                className={`mb-6 w-full rounded-lg p-4 text-base font-medium transition-colors ${
                  plan.popular
                    ? 'bg-surface-inverse text-text-inverse hover:bg-surface-inverse-hover'
                    : 'border border-border-tertiary text-text-primary hover:bg-surface-secondary'
                }`}
              >
                {plan.buttonText}
              </button>

              <ul className="space-y-2 py-5 font-medium">
                {plan.features.map((feature) => {
                  const Icon = ICONS[feature.icon] ?? Briefcase;
                  return (
                    <li key={feature.text} className="flex items-center">
                      <span className="mr-3 grid place-content-center text-text-secondary">
                        <Icon size={20} />
                      </span>
                      <span className="text-sm text-text-secondary">{feature.text}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="space-y-3 border-t border-border pt-4">
                <h4 className="mb-3 text-base font-medium text-text-primary">{plan.includes[0]}</h4>
                <ul className="space-y-2 font-medium">
                  {plan.includes.slice(1).map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="mr-3 grid h-6 w-6 flex-shrink-0 place-content-center rounded-full bg-surface-accent-signal-wash">
                        <CheckCheck className="h-4 w-4 text-surface-accent-signal-text" />
                      </span>
                      <span className="text-sm text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
