/**
 * Build layer for tisglobalinc.com.
 *
 * THIS DOES NOT BUILD THE SITE. The 11 pages stay hand-authored static HTML served
 * from the repo root by GitHub Pages, exactly as before. Vite builds three things
 * into `assets/build/`, which the pages load with ordinary <script>/<link> tags:
 *
 *   1. vendor/three.js  — the hero shader's dependency, previously imported live
 *      from esm.sh with no alternate source.
 *   2. vendor/gsap.js   — same, for the licensing page's ScrollTrigger timeline.
 *   3. islands.js + islands.css — the React mount point for 21st.dev components,
 *      plus the Tailwind layer generated from the brand tokens.
 *
 * Output is committed. That is deliberate: Pages serves the repo root in `legacy`
 * mode, so a committed artifact keeps the deploy exactly as it is today. Switching
 * to a GitHub Actions deploy is a separate, reversible decision — the workflow is
 * already written at .github/workflows/pages.yml but is dispatch-only.
 *
 * Asset paths stay root-relative (/assets/...) per website/CLAUDE.md.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // 21st.dev components ship shadcn/ui import paths — `@/components/ui/card`,
    // `@/lib/utils`. Aliasing `@` to src/islands (not src/) makes both resolve with
    // zero edits to the pasted source, which is the point: the fewer hand-rewrites a
    // port needs, the fewer chances to re-derive the component in a private idiom.
    alias: { '@': resolve(import.meta.dirname, 'src/islands') },
  },
  build: {
    outDir: 'assets/build',
    emptyOutDir: true,
    // No hashing: the HTML references these by stable name, and the pages are
    // hand-authored so there is no manifest step to rewrite them.
    rollupOptions: {
      input: {
        islands: resolve(import.meta.dirname, 'src/islands/index.jsx'),
        three: resolve(import.meta.dirname, 'src/vendor/three.js'),
        gsap: resolve(import.meta.dirname, 'src/vendor/gsap.js'),
      },
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunk-[name].js',
        assetFileNames: '[name][extname]',
        // Keep three and gsap as self-contained bundles rather than letting
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
