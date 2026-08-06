/**
 * GENERATED — do not edit by hand. Run `npm run tokens` to regenerate.
 * Source: designs/design-tokens-snapshot.md §7.4 + assets/styles.css :root
 *
 * Red line (DESIGN.md §0.1): the CSS custom properties in styles.css are
 * authoritative. This file is a consumption layer — on conflict, the stylesheet wins.
 *
 * The default Tailwind palette is REPLACED, not extended. Scale names such as
 * blue/slate/gray are aliased onto TIS tokens so a pasted 21st.dev component cannot
 * introduce a colour that is in no TIS ramp. A name that is not mapped here does not
 * exist, and the component will render visibly unstyled rather than off-brand.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './*.html',
    './*/**/*.html',
  ],
  // No dark: variant — theming is done with [data-theme] on <html>, driven by the
  // CSS custom properties. A Tailwind dark: class would be a second, competing system.
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    screens: {
          "xs": "480px",
          "sm": "560px",
          "md": "640px",
          "lg": "768px",
          "xl": "880px",
          "2xl": "980px",
          "3xl": "1100px"
    },
    colors: {
          "inherit": "inherit",
          "current": "currentColor",
          "transparent": "transparent",
          "black": "#000",
          "white": "#fff",
          "surface": {
                "page": "var(--surface-page)",
                "secondary": "var(--surface-secondary)",
                "tertiary": "var(--surface-tertiary)",
                "quaternary": "var(--surface-quaternary)",
                "elevated": "var(--surface-elevated)",
                "recessed": "var(--surface-recessed)",
                "inverse": "var(--surface-inverse)",
                "inverse-hover": "var(--surface-inverse-hover)",
                "inverse-hover-lift": "var(--surface-inverse-hover-lift)",
                "translucent": "var(--surface-translucent)",
                "page-translucent": "var(--surface-page-translucent)",
                "inverse-translucent": "var(--surface-inverse-translucent)",
                "accent-licensing": "var(--surface-accent-licensing)",
                "accent-licensing-text": "var(--surface-accent-licensing-text)",
                "accent-signal": "var(--surface-accent-signal)",
                "accent-signal-text": "var(--surface-accent-signal-text)",
                "accent-tis": "var(--surface-accent-tis)",
                "accent-licensing-wash": "var(--surface-accent-licensing-wash)",
                "accent-signal-wash": "var(--surface-accent-signal-wash)"
          },
          "text": {
                "primary": "var(--text-primary)",
                "secondary": "var(--text-secondary)",
                "tertiary": "var(--text-tertiary)",
                "quaternary": "var(--text-quaternary)",
                "inverse": "var(--text-inverse)",
                "link": "var(--text-link, #252525)",
                "link-hover": "var(--text-link-hover, #474747)",
                "disabled": "var(--text-disabled)"
          },
          "border": {
                "primary": "var(--border-primary)",
                "secondary": "var(--border-secondary)",
                "tertiary": "var(--border-tertiary)",
                "focus": "var(--border-focus)",
                "divider": "var(--border-divider, #EEEEEE)"
          },
          "score": {
                "s": "var(--score-s)",
                "a": "var(--score-a)",
                "b": "var(--score-b)",
                "c": "var(--score-c)",
                "d": "var(--score-d)",
                "s-bg": "var(--score-s-bg)",
                "a-bg": "var(--score-a-bg)",
                "b-bg": "var(--score-b-bg)",
                "c-bg": "var(--score-c-bg)",
                "d-bg": "var(--score-d-bg)",
                "s-vivid": "var(--score-s-vivid)",
                "a-vivid": "var(--score-a-vivid)",
                "b-vivid": "var(--score-b-vivid)",
                "c-vivid": "var(--score-c-vivid)",
                "d-vivid": "var(--score-d-vivid)"
          },
          "juris": {
                "us": "var(--juris-us)",
                "tw": "var(--juris-tw)",
                "eu": "var(--juris-eu)",
                "jp": "var(--juris-jp)",
                "ch": "var(--juris-ch, #BE123C)",
                "us-bg": "var(--juris-us-bg)",
                "tw-bg": "var(--juris-tw-bg)",
                "eu-bg": "var(--juris-eu-bg)",
                "jp-bg": "var(--juris-jp-bg)",
                "ch-bg": "var(--juris-ch-bg, #FFF1F2)"
          },
          "success-bg": "var(--success-bg)",
          "success-fg": "var(--success-fg)",
          "warning-bg": "var(--warning-bg, #FEF9C3)",
          "warning-fg": "var(--warning-fg, #A16207)",
          "danger-bg": "var(--danger-bg, #FEE2E2)",
          "danger-fg": "var(--danger-fg, #B91C1C)",
          "danger-border": "var(--danger-border)",
          "danger-border-wash": "var(--danger-border-wash)",
          "info-bg": "var(--info-bg, #EFF6FF)",
          "info-fg": "var(--info-fg, #1E40AF)",
          "signal-active": "var(--signal-active)",
          "signal-warning": "var(--signal-warning)",
          "signal-lapsed": "var(--signal-lapsed, #EF4444)",
          "blue": {
                "400": "var(--surface-accent-signal)",
                "500": "var(--surface-accent-signal)",
                "600": "var(--surface-accent-signal-text)",
                "700": "var(--surface-accent-signal-text)",
                "DEFAULT": "var(--surface-accent-signal)"
          },
          "sky": {
                "400": "var(--score-b-vivid)",
                "500": "var(--score-b-vivid)",
                "600": "var(--score-b)",
                "DEFAULT": "var(--score-b-vivid)"
          },
          "orange": {
                "400": "var(--surface-accent-licensing)",
                "500": "var(--surface-accent-licensing)",
                "600": "var(--surface-accent-licensing-text)",
                "DEFAULT": "var(--surface-accent-licensing)"
          },
          "red": {
                "500": "var(--danger-border)",
                "600": "var(--danger-fg, #B91C1C)",
                "700": "var(--danger-fg, #B91C1C)",
                "DEFAULT": "var(--danger-fg, #B91C1C)"
          },
          "green": {
                "500": "var(--signal-active)",
                "600": "var(--success-fg)",
                "700": "var(--success-fg)",
                "DEFAULT": "var(--success-fg)"
          },
          "amber": {
                "500": "var(--signal-warning)",
                "600": "var(--warning-fg, #A16207)",
                "DEFAULT": "var(--signal-warning)"
          },
          "violet": {
                "500": "var(--score-c-vivid)",
                "600": "var(--score-c)",
                "DEFAULT": "var(--score-c-vivid)"
          },
          "gray": {
                "50": "var(--surface-secondary)",
                "100": "var(--surface-tertiary)",
                "200": "var(--surface-quaternary)",
                "300": "var(--border-tertiary)",
                "400": "var(--text-quaternary)",
                "500": "var(--text-tertiary)",
                "600": "var(--text-secondary)",
                "700": "var(--text-secondary)",
                "800": "var(--text-primary)",
                "900": "var(--text-primary)",
                "950": "var(--text-primary)"
          },
          "slate": {
                "50": "var(--surface-secondary)",
                "100": "var(--surface-tertiary)",
                "200": "var(--surface-quaternary)",
                "300": "var(--border-tertiary)",
                "400": "var(--text-quaternary)",
                "500": "var(--text-tertiary)",
                "600": "var(--text-secondary)",
                "700": "var(--text-secondary)",
                "800": "var(--text-primary)",
                "900": "var(--text-primary)",
                "950": "var(--text-primary)"
          },
          "zinc": {
                "50": "var(--surface-secondary)",
                "100": "var(--surface-tertiary)",
                "200": "var(--surface-quaternary)",
                "300": "var(--border-tertiary)",
                "400": "var(--text-quaternary)",
                "500": "var(--text-tertiary)",
                "600": "var(--text-secondary)",
                "700": "var(--text-secondary)",
                "800": "var(--text-primary)",
                "900": "var(--text-primary)",
                "950": "var(--text-primary)"
          },
          "neutral": {
                "50": "var(--surface-secondary)",
                "100": "var(--surface-tertiary)",
                "200": "var(--surface-quaternary)",
                "300": "var(--border-tertiary)",
                "400": "var(--text-quaternary)",
                "500": "var(--text-tertiary)",
                "600": "var(--text-secondary)",
                "700": "var(--text-secondary)",
                "800": "var(--text-primary)",
                "900": "var(--text-primary)",
                "950": "var(--text-primary)"
          },
          "stone": {
                "50": "var(--surface-secondary)",
                "100": "var(--surface-tertiary)",
                "200": "var(--surface-quaternary)",
                "300": "var(--border-tertiary)",
                "400": "var(--text-quaternary)",
                "500": "var(--text-tertiary)",
                "600": "var(--text-secondary)",
                "700": "var(--text-secondary)",
                "800": "var(--text-primary)",
                "900": "var(--text-primary)",
                "950": "var(--text-primary)"
          },
          "indigo": {
                "400": "var(--surface-accent-signal)",
                "500": "var(--surface-accent-signal)",
                "600": "var(--surface-accent-signal-text)",
                "700": "var(--surface-accent-signal-text)",
                "DEFAULT": "var(--surface-accent-signal)"
          },
          "cyan": {
                "400": "var(--score-b-vivid)",
                "500": "var(--score-b-vivid)",
                "600": "var(--score-b)",
                "DEFAULT": "var(--score-b-vivid)"
          },
          "emerald": {
                "500": "var(--signal-active)",
                "600": "var(--success-fg)",
                "700": "var(--success-fg)",
                "DEFAULT": "var(--success-fg)"
          },
          "rose": {
                "500": "var(--danger-border)",
                "600": "var(--danger-fg, #B91C1C)",
                "700": "var(--danger-fg, #B91C1C)",
                "DEFAULT": "var(--danger-fg, #B91C1C)"
          }
    },
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      boxShadow: {
        low: 'var(--shadow-low)',
        medium: 'var(--shadow-medium)',
        high: 'var(--shadow-high)',
        'stacked-low': 'var(--shadow-stacked-low)',
      },
      transitionTimingFunction: {
        card: 'var(--ease-card)',
        out: 'var(--ease-out)',
      },
      maxWidth: { container: '1440px' },
      spacing: { section: 'var(--space-section)', 'head-gap': 'var(--space-head-gap)' },
    },
  },
  corePlugins: {
    // The site's own graph-paper underlay owns the page background gradient.
    // Tailwind gradient utilities are off: gradients were retired 2026-08-06
    // (design-tokens.md §7.5) and this is where they would creep back in.
    backgroundImage: false,
  },
  plugins: [],
};
