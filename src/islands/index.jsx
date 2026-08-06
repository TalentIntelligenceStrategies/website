/**
 * React island mount point — the 21st.dev landing zone.
 *
 * The site is hand-authored static HTML. This file exists so a 21st.dev component
 * (React + Tailwind) can be dropped in as-is instead of being hand-transliterated
 * into styles.css, which is how the CSS accumulated 345 dead classes and 119
 * invented hexes. See DESIGN.md §16 for the boundary rules.
 *
 * A page opts in with a single element and one script tag:
 *
 *   <div data-island="my-widget" data-props='{"tier":"S"}'></div>
 *   <script type="module" src="/assets/build/islands.js"></script>
 *
 * Register the component below. Nothing mounts unless its element is on the page,
 * so every page can load the same bundle without cost.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';

/** name -> lazy loader. Add 21st.dev components here. */
const REGISTRY = {
  // 'my-widget': () => import('./MyWidget.jsx'),
};

function mount(el) {
  const name = el.dataset.island;
  const load = REGISTRY[name];
  if (!load) {
    console.warn(`[islands] no component registered for "${name}"`);
    return;
  }
  let props = {};
  if (el.dataset.props) {
    try { props = JSON.parse(el.dataset.props); }
    catch { console.warn(`[islands] bad data-props JSON on "${name}"`); }
  }
  load().then(({ default: Component }) => {
    createRoot(el).render(<StrictMode><Component {...props} /></StrictMode>);
  }).catch((err) => {
    // Never leave a hole: the island stays empty and the page around it is intact.
    console.error(`[islands] "${name}" failed to load`, err);
  });
}

const boot = () => document.querySelectorAll('[data-island]').forEach(mount);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
