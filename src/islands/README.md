# React islands — currently not built, not shipped

`src/islands/` is the landing zone for 21st.dev component ports (see the `/port-21st`
skill). The machinery is intact, but **it is not in the build and nothing on the site
mounts it.**

## Why it was switched off

On 2026-08-28 the audit found `assets/build/islands.js` (144.6 KB), `islands.css`
(7.7 KB) and `chunk-PricingSection.js` (29.5 KB) committed and served, with **no page
in the tree referencing any of them** — 182 KB of build output that had never been
loaded by a visitor. The React toolchain existed solely to produce it. Dependencies
should describe what actually ships, so the entry and its dependencies came out
together.

## How to switch it back on

When a page genuinely mounts an island:

```sh
npm i -D @vitejs/plugin-react
npm i react react-dom clsx tailwind-merge lucide-react
```

Then in `vite.config.js` restore three things:

```js
import react from '@vitejs/plugin-react';
// ...
plugins: [react()],
resolve: {
  // 21st.dev components ship shadcn/ui import paths — `@/components/ui/card`,
  // `@/lib/utils`. Aliasing `@` to src/islands (not src/) makes both resolve with
  // zero edits to the pasted source.
  alias: { '@': resolve(import.meta.dirname, 'src/islands') },
},
// ...and in rollupOptions.input:
islands: resolve(import.meta.dirname, 'src/islands/index.jsx'),
```

`npm run build`, then load `/assets/build/islands.js` and `islands.css` from the page
that needs them. If a port lands and no page ends up mounting it, take it back out —
that is how 182 KB accumulated the first time.
