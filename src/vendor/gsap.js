/**
 * Local GSAP + ScrollTrigger bundle for the licensing page's scrub timeline.
 *
 * Replaces the 3-CDN fallback chain in product/licensing/index.html. The chain was
 * a workaround for not having a build step; with one, the dependency is just pinned.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
export default gsap;
