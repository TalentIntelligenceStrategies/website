/**
 * Build layer for tisglobalinc.com.
 *
 * THIS DOES NOT BUILD THE SITE. The pages stay hand-authored static HTML served from the
 * repo root by GitHub Pages. Vite bundles two vendored libraries into `assets/build/`,
 * which the pages load with ordinary <script> tags:
 *
 *   1. vendor/gsap.js   — the licensing page's ScrollTrigger timeline.
 *   2. vendor/lenis.js  — the site-wide smooth-scroll transport, loaded lazily by
 *      assets/site.js. Pinned and same-origin, no CDN.
 *
 * Removed 2026-10-11 (site audit): the hero-shader runner (no page mounted a shader
 * hero any more) and the dormant Tailwind / React-island toolchain (no page ever mounted
 * an island). Restore either from git history if a page needs it again.
 *
 * Output is committed: Pages serves the repo root in `legacy` mode. Asset paths stay
 * root-relative (/assets/...) per website/CLAUDE.md.
 */
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: 'assets/build',
    emptyOutDir: true,
    // No hashing: the HTML references these by stable name, and the pages are
    // hand-authored so there is no manifest step to rewrite them.
    rollupOptions: {
      input: {
        gsap: resolve(import.meta.dirname, 'src/vendor/gsap.js'),
        lenis: resolve(import.meta.dirname, 'src/vendor/lenis.js'),
      },
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunk-[name].js',
        assetFileNames: '[name][extname]',
        // Keep gsap and lenis as self-contained bundles rather than letting
        // Rollup hoist their internals into a shared chunk — each page loads
        // only the one it needs.
        manualChunks: undefined,
      },
      preserveEntrySignatures: 'allow-extension',
    },
    target: 'es2020',
    sourcemap: false,
    minify: 'esbuild',
    reportCompressedSize: false,
  },
});
