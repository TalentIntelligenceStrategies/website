/**
 * Build layer for tisglobalinc.com.
 *
 * THIS DOES NOT BUILD THE SITE. The 11 pages stay hand-authored static HTML served
 * from the repo root by GitHub Pages, exactly as before. Vite builds four things
 * into `assets/build/`, which the pages load with ordinary <script>/<link> tags:
 *
 *   1. hero-shader.js   — the fullscreen-quad shader runner the heroes use. It
 *      replaced a vendored three.js (447 KB / 112 KB gz) that existed to compile two
 *      shader strings and draw six vertices; see src/hero-shader.js for why the port
 *      is pixel-identical rather than merely similar.
 *   2. vendor/gsap.js   — same, for the licensing page's ScrollTrigger timeline.
 *   3. vendor/lenis.js  — the site-wide smooth-scroll transport, loaded lazily by
 *      assets/site.js. Same reason as the two above: pinned, same-origin, no CDN.
 * The React island entry (islands.js + islands.css, 182 KB across three files) was
 * dropped on 2026-08-28: it had been built, committed and served for months without a
 * single page referencing it. src/islands/ and the /port-21st skill stay — that is the
 * documented path for porting a 21st.dev component — but the bundle only goes back into
 * this input list when a page actually mounts one.
 *
 * Output is committed. That is deliberate: Pages serves the repo root in `legacy`
 * mode, so a committed artifact keeps the deploy exactly as it is today. Switching
 * to a GitHub Actions deploy is a separate, reversible decision — the workflow is
 * already written at .github/workflows/pages.yml but is dispatch-only.
 *
 * Asset paths stay root-relative (/assets/...) per website/CLAUDE.md.
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
        'hero-shader': resolve(import.meta.dirname, 'src/hero-shader.js'),
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
