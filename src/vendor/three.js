/**
 * Local three.js bundle for the hero shifting-lines shader.
 *
 * Replaces `await import('https://esm.sh/three@0.160.0')` in index.html and
 * about/index.html. That import had no alternate source — GSAP has a 3-CDN chain,
 * three.js had none — so an esm.sh outage silently dropped the homepage hero to its
 * black fallback. Pinned to 0.160.0, the version the shader was written against.
 *
 * The export list is exactly the `THREE.*` symbols the shader references. If a new
 * one is used, add it here or the page will throw on an undefined property.
 */
export {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Mesh,
  OrthographicCamera,
  RawShaderMaterial,
  Scene,
  WebGLRenderer,
} from 'three';
