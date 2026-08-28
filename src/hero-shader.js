/**
 * Fullscreen-quad shader runner — the three.js replacement.
 *
 * Every hero that used three.js used it for exactly one thing: compile two shader
 * strings, set a handful of uniforms, and draw a screen-covering quad. Nine symbols
 * and four renderer methods, out of a 447 KB (112 KB gz) library built for scene
 * graphs. This is that subset, at ~2 KB.
 *
 * It reproduces three's semantics deliberately rather than approximately, because the
 * heroes had to come across pixel-identical:
 *
 *   - Context attributes match WebGLRenderer's defaults, NOT getContext's. Raw
 *     getContext defaults alpha:true; three defaults alpha:false. The shaders all
 *     write a=1.0 so it is moot in practice — matching it removes the question.
 *   - webgl2 first, then webgl, which is three 0.160's own order. The shaders are
 *     GLSL ES 1.00 and compile unchanged under either.
 *   - RawShaderMaterial receives no injected boilerplate and no colour-space
 *     conversion — that is its whole purpose — so gl_FragColor reaches the default
 *     framebuffer verbatim. There is nothing to reproduce on that front.
 *   - side: DoubleSide == CULL_FACE disabled.
 *   - setSize(w, h, false) writes the draw buffer and leaves canvas style alone;
 *     styles.css sizes the canvas with `width/height: 100% !important`. setSize()
 *     here does the same, so that rule stays load-bearing.
 *
 * The uniforms object keeps three's `{ name: { value } }` shape on purpose. Callers
 * assign `uniforms.resolution.value = [w, h]` exactly as they did against three, so
 * porting a hero touches its plumbing and not its logic. Only float and vec2 are
 * supported — that is everything the five heroes use.
 *
 * What this deliberately does NOT own: the resize strategy and the animation clock.
 * Those differ per hero on purpose (the homepage and Signal lock the draw buffer
 * against mobile URL-bar collapse, About does not; About runs uncapped DPR, the other
 * two cap at 2; Signal derives both its band offset and its reduced-motion phase from
 * measured DOM). Centralising them would have silently changed three heroes, so each
 * page keeps its own and calls setSize/render here.
 */

const VERTEX = `
attribute vec3 position;
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

// Two triangles, the same six vertices three was given.
const QUAD = new Float32Array([
  -1, -1, 0,
   1, -1, 0,
  -1,  1, 0,
   1, -1, 0,
  -1,  1, 0,
   1,  1, 0,
]);

function compile(gl, type, src, label) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(`${label} shader: ${gl.getShaderInfoLog(s)}`);
  }
  return s;
}

/**
 * @param {HTMLElement} mount       element the canvas is appended to
 * @param {string}      fragment    fragment shader source, GLSL ES 1.00
 * @param {object}      uniforms    three-shaped { name: { value: number | [x, y] } }
 * @returns {{ canvas, setPixelRatio, setSize, render }}
 */
export function createHeroShader(mount, fragment, uniforms) {
  const canvas = document.createElement('canvas');
  const attrs = {
    alpha: false,
    antialias: false,
    premultipliedAlpha: true,
    stencil: false,
    depth: true,
  };
  const gl = canvas.getContext('webgl2', attrs) || canvas.getContext('webgl', attrs);
  if (!gl) throw new Error('no WebGL context');

  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERTEX, 'vertex'));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, fragment, 'fragment'));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw new Error(`link: ${gl.getProgramInfoLog(prog)}`);
  }
  gl.useProgram(prog);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, QUAD, gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'position');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

  // side: DoubleSide.
  gl.disable(gl.CULL_FACE);
  // setClearColor(0x000000) — every hero that used this cleared to black.
  gl.clearColor(0, 0, 0, 1);

  // Resolved once: the uniform set is fixed at construction, as it was with three.
  const locs = {};
  for (const name of Object.keys(uniforms)) {
    locs[name] = gl.getUniformLocation(prog, name);
  }

  let pixelRatio = 1;

  return {
    canvas,

    setPixelRatio(pr) { pixelRatio = pr; },

    /** CSS pixels in, draw buffer out — three's setSize(w, h, false). */
    setSize(w, h) {
      canvas.width = Math.floor(w * pixelRatio);
      canvas.height = Math.floor(h * pixelRatio);
      gl.viewport(0, 0, canvas.width, canvas.height);
    },

    render() {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(prog);
      for (const name of Object.keys(uniforms)) {
        const loc = locs[name];
        if (!loc) continue;
        const v = uniforms[name].value;
        if (Array.isArray(v)) gl.uniform2f(loc, v[0], v[1]);
        else gl.uniform1f(loc, v);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
  };
}
