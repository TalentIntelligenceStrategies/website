/**
 * Local Lenis bundle for the site-wide smooth-scroll transport.
 *
 * Same rationale as the three.js and gsap entries beside it: pin the dependency and
 * serve it from our own origin rather than a CDN. Loaded lazily by assets/site.js —
 * if this import fails the page keeps native scroll and the `html { scroll-behavior:
 * smooth }` base rule, because the `.lenis` class that switches it off is only ever
 * added by a live instance.
 *
 * Pinned to 1.3.26. The 1.3.x line is where `anchors`, `allowNestedScroll` and
 * `respectReducedMotion` landed — do not downgrade into 1.2.x, the options differ.
 */
export { default } from 'lenis';
export { default as Lenis } from 'lenis';
