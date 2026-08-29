// ─── Universal site chrome: language, mobile drawer, search, forms, pillar tabs ───
// Note: dark mode is parked for the MVP. `[data-theme="dark"]` token blocks and
// component overrides remain in styles.css as dormant infrastructure — re-enable
// later by restoring the toggle markup + a `data-theme` setter here.
(() => {
  const root = document.documentElement;

  // ──────────────── Lenis smooth scroll ────────────────
  // Transport, not animation: Lenis writes the REAL scroll position every frame
  // (`wrapper.scrollTo({behavior:'instant'})`) rather than transforming content, so
  // position:sticky, position:fixed, IntersectionObserver, find-in-page and keyboard
  // scroll all behave natively. The CSS half is in styles.css under the same heading.
  //
  // `lerp: 0.18` settles in ~0.27s — just enough to take the staircase off a wheel
  // tick, and short enough that most people would not name it as an effect. Started
  // at 0.13 (~0.38s) and lightened a notch; the community default of 0.05 is ~1.0s
  // and is firmly in glide territory. Settle time is roughly 3/(lerp*60) seconds, so
  // raising this number makes the page LIGHTER, not heavier.
  //
  // Two things deliberately NOT set:
  //   · no `duration`/`easing`. Contrary to the README, those OVERRIDE `lerp`, and
  //     time-based easing animates every wheel tick over a fixed wall clock — that is
  //     what produces the sluggish feel on a long flick. (`lerp: 0` is not "fall back
  //     to duration" either; it is falsy, meaning no smoothing at all.)
  //   · no `wheelMultiplier`/`touchMultiplier` change. Altering scroll DISTANCE per
  //     gesture is what users actually experience as broken; smoothing its arrival is
  //     not. `syncTouch` stays off for the same reason — native mobile momentum is
  //     better than anything synthesized, and disorientation complaints concentrate
  //     there.
  //
  // `respectReducedMotion` defaults to true and is read per-scroll rather than through
  // a listener, so an OS preference change applies live without a reload. This is the
  // one motion effect on the site with no hand-written @media fallback — DESIGN.md §10.

  // capital.tisglobalinc.com loads THIS FILE cross-origin from the main domain
  // (capital/index.html:1285), so anything unconditional here ships there too.
  // Comparing the script's own origin to the page's keeps Lenis on this site without
  // hardcoding a hostname, and auto-excludes any future hot-linker. Has to be read
  // synchronously — document.currentScript is null once we are inside a callback.
  const OWN_ORIGIN = (() => {
    const src = document.currentScript && document.currentScript.src;
    try { return !!src && new URL(src).origin === location.origin; } catch (_) { return false; }
  })();

  // VERTICALLY scrolling nested areas Lenis must not hijack. The `prevent` predicate
  // rather than `data-lenis-prevent` attributes because the chrome is duplicated across
  // 9 pages — markup would mean 9 edits and a standing drift risk. Not
  // `allowNestedScroll: true` either: that walks the composed path on every scroll event.
  //
  // HORIZONTAL tracks (.report-carousel-track, .pat-marquee) are deliberately NOT here.
  // They need no protection — `gestureOrientation` defaults to 'vertical', so Lenis never
  // consumes a horizontal gesture and those tracks keep scrolling natively. Worse, listing
  // them actively hurts: `prevent` is per-node and blocks BOTH axes, so an ordinary
  // vertical wheel with the cursor over the carousel fell through to native scroll and
  // jumped the full 400px in one frame instead of easing. Measured, not assumed.
  //
  // This is also why Lenis's lack of scroll-snap support is moot here: every
  // scroll-snap-type on the site sits on one of those horizontal tracks, never on the
  // root scroller.
  const NESTED_SCROLLERS = [
    '.mobile-list',           // mobile drawer
    '.search-results',        // search modal
    '.sig-xpanel__scroll',    // Signal report panel
    '.lgl-body',              // legal dialog
    '.brand-select-menu',     // custom select — the one that opens with NO page lock
  ].join(',');

  let lenis = null;

  // Four independent overlays lock the body (drawer/search, legal dialog, newsletter
  // popup, Signal panel). They cannot each own Lenis's run state — nesting two would
  // let the first to close start scrolling under the second — so they share a depth.
  let scrollPauseDepth = 0;
  const pauseScroll  = () => { if (scrollPauseDepth++ === 0) lenis && lenis.stop(); };
  const resumeScroll = () => { if (scrollPauseDepth > 0 && --scrollPauseDepth === 0) lenis && lenis.start(); };

  // NO `offset` is passed to scrollTo() below, and that is deliberate — do not "fix" it.
  // Given an ELEMENT target, Lenis already reads the target's scroll-margin-top and the
  // scroller's scroll-padding-top and subtracts both itself (lenis 1.3.26, dist/lenis.mjs
  // :783-786). Passing the usual `offset: -80` to clear the fixed topnav — which is what
  // most Lenis guidance tells you to do — double-counts it. Measured on methodology.html:
  // every pipe-nav jump landed 285px (= 80 pad + 205 margin) short, which showed the
  // WRONG figure in the pinned card for all five links.
  //
  // So styles.css stays the single source of truth for anchor offsets, including
  // .mth-stage__step's proportional `max(40px, calc(30vh - 80px))`. An `offset` here
  // would silently override that arithmetic at every viewport height.

  // The licensing page drives lenis.raf from gsap.ticker so its ScrollTrigger scrub
  // stays in step, which means the internal loop has to go. `raf()` re-arms itself from
  // `options.autoRaf` every frame, so flipping the flag is enough; cancelling the
  // pending frame just avoids a single double-step on handover.
  const takeOverRaf = () => {
    if (!lenis) return null;
    lenis.options.autoRaf = false;
    if (lenis._rafId) cancelAnimationFrame(lenis._rafId);
    return lenis;
  };

  async function initLenis() {
    if (!OWN_ORIGIN) return null;                 // capital.tisglobalinc.com
    if (document.body.dataset.veil) return null;  // DESIGN.md §17 — deliberately covered
    try {
      const { default: Lenis } = await import('/assets/build/lenis.js');
      lenis = new Lenis({
        lerp: 0.18,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        anchors: false,       // handled per-target below
        autoRaf: true,
        prevent: (node) => !!(node && node.matches && node.matches(NESTED_SCROLLERS)),
      });
      // An overlay may have opened while the module was still loading.
      if (scrollPauseDepth > 0) lenis.stop();
      return lenis;
    } catch (_) {
      // Native scroll and the base `scroll-behavior: smooth` rule remain: the .lenis
      // class is never added, so the entire CSS block stays inert. Nothing to undo.
      return null;
    }
  }

  // A promise rather than the instance: the import is async, and the licensing page's
  // inline module runs immediately after this file. It awaits this.
  const lenisReady = initLenis();
  window.__tisLenis = lenisReady;
  window.__tisLenisTakeOverRaf = takeOverRaf;
  // Exported for blocks that live OUTSIDE this IIFE — currently the .sig-x* report
  // dialog, which was moved out on 2026-08-27 so methodology.html could share it and
  // has been calling these as bare globals ever since. Keep the refcount here: it is
  // the only thing that knows how many overlays are stacked.
  window.__tisScrollPause  = pauseScroll;
  window.__tisScrollResume = resumeScroll;

  // Same-page anchors — the skip link, the ~15 #contact links, #intake, and the six
  // methodology pipe-nav targets. Lenis swallows these clicks by default, and its own
  // `anchors` option cannot express the per-target offset above.
  document.addEventListener('click', (e) => {
    if (!lenis || e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!href || href.charAt(0) !== '#' || href === '#') return;
    let el = null;
    try { el = document.getElementById(decodeURIComponent(href.slice(1))); } catch (_) { return; }
    if (!el) return;
    e.preventDefault();
    lenis.scrollTo(el);
    if (location.hash !== href) history.pushState(null, '', href);
  });


  // ──────────────── Language ────────────────
  const langWrap = document.getElementById('lang-wrap');
  const langTrigger = document.getElementById('lang-trigger');
  // Document-wide, not langWrap-scoped: the mobile drawer footer carries a second
  // pair of these (the topnav globe is covered once the drawer is open), and both
  // sets have to stay aria-checked in sync off one applyLang call.
  const langButtons = document.querySelectorAll('[data-lang-set]');

  // Capture each translatable element's source-of-truth EN copy on init so the
  // swap is reversible. Elements opting into `data-zh-html` carry inline markup
  // (e.g. <strong>) in their EN content too, so capture innerHTML for those —
  // otherwise the markup would be stripped on the first EN→ZH→EN cycle.
  const i18nEls = document.querySelectorAll('[data-zh]');
  i18nEls.forEach(el => {
    el.dataset.en = el.hasAttribute('data-zh-html')
      ? el.innerHTML.trim()
      : el.textContent.trim();
  });

  // Same pattern for `<input>` / `<textarea>` placeholders — data-zh-placeholder
  // holds the CH form, data-en-placeholder snapshots the original EN placeholder.
  const i18nPlaceholderEls = document.querySelectorAll('[data-zh-placeholder]');
  i18nPlaceholderEls.forEach(el => { el.dataset.enPlaceholder = el.placeholder; });

  // Same pattern again for alt text. Added 2026-08-29: until then there was no handler
  // at all, so every informative image on the site described itself in English under
  // 中文 — the six licensing step stills and the six sample-report sheets, which are
  // whole sentences, not labels. Board-member portraits and the TIS mark are
  // deliberately NOT given data-zh-alt: their visible captions carry no data-zh either,
  // and translating only the alt would make image and caption disagree.
  const i18nAltEls = document.querySelectorAll('[data-zh-alt]');
  i18nAltEls.forEach(el => { el.dataset.enAlt = el.getAttribute('alt') || ''; });

  // Same pattern for aria-label. The attribute was already in the markup (the patents
  // modal's close button) with nothing reading it, so that control stayed announced
  // in English under 中文; the search close button uses it too.
  const i18nAriaEls = document.querySelectorAll('[data-zh-aria]');

  // <title data-zh-title="…">. Captured like the rest so the swap is reversible.
  const titleEl = document.querySelector('title[data-zh-title]');
  if (titleEl) titleEl.dataset.enTitle = document.title;
  i18nAriaEls.forEach(el => { el.dataset.enAria = el.getAttribute('aria-label') || ''; });

  // ── Shimmer cube — extracted from brand/previews/loading-animation-preview.html.
  // Used as a brand-mark transition during user-triggered EN<->ZH language swaps.
  // Skipped on first paint and when prefers-reduced-motion: reduce.
  const langOverlay = document.getElementById('lang-overlay');
  const langCube    = document.getElementById('lang-cube');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const FACES = {
    top:   { A:[501,3],   B:[925,293], C:[501,563], D:[74,293] },
    left:  { A:[74,293],  B:[501,563], C:[501,997], D:[74,727] },
    right: { A:[501,563], B:[925,293], C:[925,727], D:[501,997] },
  };
  const bilerp = (face, u, v) => {
    const {A,B,C,D} = face;
    const w00=(1-u)*(1-v), w10=u*(1-v), w11=u*v, w01=(1-u)*v;
    return [
      w00*A[0]+w10*B[0]+w11*C[0]+w01*D[0],
      w00*A[1]+w10*B[1]+w11*C[1]+w01*D[1],
    ];
  };
  const TOP_POLY   = '638.46,455.19 638.64,455.19 776.68,364.9 777.05,364.67 639.63,273.74 502.39,182.97 638.69,92.59 639.05,92.36 501.84,2.62 501.68,2.53 87.46,273.37 87.09,273.63 227.16,365.22 227.32,365.34 364.81,274.18 501.7,364.72 638.36,455.14';
  const LEFT_POLY  = '74.44,292.6 74.44,444.7 212.46,530.2 212.46,674.02 74.88,588.77 74.44,588.52 74.44,726.72 488.06,997.17 488.5,997.47 488.5,843.46 352.78,759.38 352.78,617.98 488.06,701.78 488.5,702.06 488.5,563.35 74.88,292.9';
  const RIGHT_POLY = '925.42,443.57 925.56,443.48 925.56,292.6 511.64,563.26 511.5,563.35 511.5,795.06 718.53,667.3 718.53,715.98 511.64,845.21 511.5,845.3 511.5,997.47 925.42,726.81 925.56,726.72 925.56,493.26 720.83,619.62 720.83,571.38';

  const shimmerCube = (() => {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 1000 1000');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    const cellsG = document.createElementNS(SVG_NS, 'g');
    const cells = [];
    for (const [faceName, face] of Object.entries(FACES)) {
      for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) {
        const u0=i/3, v0=j/3, u1=(i+1)/3, v1=(j+1)/3;
        const corners = [
          bilerp(face, u0, v0), bilerp(face, u1, v0),
          bilerp(face, u1, v1), bilerp(face, u0, v1),
        ];
        const poly = document.createElementNS(SVG_NS, 'polygon');
        poly.setAttribute('points', corners.map(p => p.map(n => n.toFixed(2)).join(',')).join(' '));
        poly.setAttribute('stroke-width', '1');
        cellsG.appendChild(poly);
        cells.push({ face: faceName, i, j, poly });
      }
    }
    svg.appendChild(cellsG);
    const logoG = document.createElementNS(SVG_NS, 'g');
    logoG.style.opacity = '0';
    for (const pts of [TOP_POLY, LEFT_POLY, RIGHT_POLY]) {
      const p = document.createElementNS(SVG_NS, 'polygon');
      p.setAttribute('points', pts);
      logoG.appendChild(p);
    }
    svg.appendChild(logoG);
    langCube.appendChild(svg);
    return { cells, logoG };
  })();

  const playShimmer = () => {
    const all = shimmerCube.cells.map(c => c.poly).concat([shimmerCube.logoG]);
    all.forEach(el => el.getAnimations().forEach(a => a.cancel()));
    shimmerCube.logoG.style.opacity = '0';
    const FACE_OFFSET = { top: 0, left: 3, right: 6 };
    for (const c of shimmerCube.cells) {
      c.poly.style.opacity = '1';
      c.poly.style.transform = 'scale(1)';
      const phase = (c.i + c.j) + FACE_OFFSET[c.face] * 0.4;
      c.poly.animate(
        [
          { opacity: 0,    transform: 'scale(0.7)' },
          { opacity: 1,    transform: 'scale(1.06)', offset: 0.55 },
          { opacity: 0.35, transform: 'scale(1)',    offset: 0.75 },
          { opacity: 1,    transform: 'scale(1)' },
        ],
        { duration: 1100, delay: phase * 70, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }
      );
    }
    setTimeout(() => {
      shimmerCube.logoG.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 420, easing: 'ease-out', fill: 'forwards' }
      );
      for (const c of shimmerCube.cells) {
        c.poly.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 420, easing: 'ease-out', fill: 'forwards' }
        );
      }
    }, 1700);
  };

  // ── Licensing "How it works" step mockups are same-origin <iframe> embeds that
  // are themselves bilingual (each ships its own render(lang)). The text swapper
  // below never touches iframe src, so broadcast the active language into them via
  // postMessage — they flip in place, no reload. Re-sent on each frame's `load`
  // too, since they're lazy-loaded and may not exist yet when applyLang first runs.
  const showcaseFrames = document.querySelectorAll('.lic-frame iframe[src], .hero-dash iframe[src]');
  let currentLang = 'en';
  const postLang = (frame, lang) => {
    try { frame.contentWindow?.postMessage({ type: 'tis-lang', lang }, location.origin); }
    catch (_) { /* contentWindow not ready/blocked — the load listener retries */ }
  };
  showcaseFrames.forEach(frame => {
    frame.addEventListener('load', () => postLang(frame, currentLang));
  });

  // Generation token guards against rapid back-to-back clicks: late
  // setTimeout callbacks bail if a newer swap has started.
  let langGen = 0;
  // Elements with `data-zh-html` opt into innerHTML on swap so their `data-zh`
  // can contain inline markup (e.g. `<strong>` to emphasize a Chinese phrase
  // that has no equivalent in the EN string). EN side still uses textContent
  // since `data-en` is captured from plain textContent at init.
  const swapText = (lang) => {
    i18nEls.forEach(el => {
      const target = lang === 'zh' ? el.dataset.zh : el.dataset.en;
      if (el.hasAttribute('data-zh-html')) {
        el.innerHTML = target;
      } else {
        el.textContent = target;
      }
    });
    i18nPlaceholderEls.forEach(el => {
      el.placeholder = lang === 'zh' ? el.dataset.zhPlaceholder : el.dataset.enPlaceholder;
    });
    i18nAriaEls.forEach(el => {
      el.setAttribute('aria-label', lang === 'zh' ? el.dataset.zhAria : el.dataset.enAria);
    });
    i18nAltEls.forEach(el => {
      el.setAttribute('alt', lang === 'zh' ? el.dataset.zhAlt : el.dataset.enAlt);
    });
    // The tab and the bookmark. Until 2026-08-28 the whole page swapped to 中文 while its
    // title stayed English, so a reader with several TIS tabs open picked between them in a
    // language they had just switched away from.
    // This is the ONLY metadata worth swapping at runtime. og:title and og:description are
    // deliberately left alone: no unfurler executes JS, so every crawler and every link
    // preview reads the served EN regardless. Rewriting them here would look like i18n and
    // do nothing. Real per-language metadata needs separate /zh/ URLs — see DESIGN.md.
    if (titleEl && titleEl.dataset.zhTitle) {
      document.title = lang === 'zh' ? titleEl.dataset.zhTitle : titleEl.dataset.enTitle;
    }
    // Search results are rendered from the JSON index, not from data-zh attributes,
    // so the i18n pass above cannot reach them — re-render them here instead.
    if (typeof window.__searchRefresh === 'function') window.__searchRefresh();
    // Keep the embedded step mockups in the same language (text + iframe swap in sync).
    currentLang = lang;
    showcaseFrames.forEach(frame => postLang(frame, lang));
  };

  const applyLang = (lang, opts = {}) => {
    root.setAttribute('lang', lang === 'zh' ? 'zh-Hant' : 'en');
    langButtons.forEach(b => b.setAttribute('aria-checked', String(b.dataset.langSet === lang)));
    if (opts.animate && !reduceMotion.matches) {
      const myGen = ++langGen;
      langOverlay.dataset.active = 'true';
      requestAnimationFrame(playShimmer);
      // Mid-animation swap: text changes while overlay masks the page.
      setTimeout(() => { if (myGen === langGen) swapText(lang); }, 900);
      // Total = 200ms fade-in + ~1900ms cube cycle + 200ms fade-out.
      setTimeout(() => { if (myGen === langGen) langOverlay.dataset.active = 'false'; }, 2200);
    } else {
      swapText(lang);
    }
    localStorage.setItem('tis-lang', lang);
  };
  applyLang(localStorage.getItem('tis-lang') || 'en');  // first paint: no overlay

  // Lock topnav translatable elements to their EN natural width so the lang toggle
  // doesn't shrink them (which would otherwise shift the right cluster rightward via
  // the flex spacer absorbing the slack). Mobile-drawer items live in full-width or
  // flex:1 containers so they don't cause neighbor reflow — left unlocked.
  // `.topnav-link.has-dropdown > [data-zh]` covers the Products dropdown trigger's
  // inner span (the button itself wraps text + chevron, so we lock the text span
  // rather than the button to keep the chevron stable across language toggles).
  const lockables = document.querySelectorAll('.topnav-link[data-zh], .topnav-cta[data-zh], .topnav-link.has-dropdown > [data-zh]');
  const lockI18nWidths = () => {
    lockables.forEach(el => {
      if (el.dataset.locked) return;
      const restore = el.textContent;
      el.textContent = el.dataset.en;
      const w = el.getBoundingClientRect().width;
      el.textContent = restore;
      el.style.minWidth = `${Math.ceil(w)}px`;
      el.dataset.locked = '1';
    });
  };
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(lockI18nWidths);
  } else {
    window.addEventListener('load', lockI18nWidths);
  }

  const closeLangMenu = () => {
    langWrap.dataset.open = 'false';
    langTrigger.setAttribute('aria-expanded', 'false');
  };

  langTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = langWrap.dataset.open === 'true';
    if (open) closeLangMenu();
    else { langWrap.dataset.open = 'true'; langTrigger.setAttribute('aria-expanded', 'true'); }
  });
  langButtons.forEach(b => b.addEventListener('click', () => {
    applyLang(b.dataset.langSet, { animate: true });
    closeLangMenu();
    // The swap plays a full-screen shimmer; leaving the drawer open on top of it
    // reads as two overlays fighting. closeDrawer is declared further down the
    // same scope — this runs on click, long after that line has executed.
    if (typeof closeDrawer === 'function') closeDrawer();
  }));

  document.addEventListener('click', closeLangMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLangMenu(); });

  // ──────────────── Products dropdown — Linear-style mega menu ────────────────
  const pdWrap = document.querySelector('.topnav-dropdown-wrap');
  if (pdWrap) {
    const pdTrigger = pdWrap.querySelector('#products-trigger');
    const pdMenu    = pdWrap.querySelector('#products-menu');
    const pdCards   = Array.from(pdMenu.querySelectorAll('.product-card'));
    const hoverFine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    let openTimer = null, closeTimer = null;

    const pdOpen = () => {
      pdMenu.dataset.open = 'true';
      pdTrigger.setAttribute('aria-expanded', 'true');
    };
    const pdClose = () => {
      pdMenu.dataset.open = 'false';
      pdTrigger.setAttribute('aria-expanded', 'false');
    };
    const cancelTimers = () => {
      if (openTimer)  { clearTimeout(openTimer);  openTimer  = null; }
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    };

    if (hoverFine) {
      // Wrap covers only the trigger's bounding box (the panel is absolute,
      // outside the wrap). Listen on both — entering either cancels close;
      // leaving either schedules close. The 8px gap is bridged by .products-menu::before.
      const onEnter = () => {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
        if (pdMenu.dataset.open === 'true') return;
        openTimer = setTimeout(() => { openTimer = null; pdOpen(); }, 120);
      };
      const onLeave = () => {
        if (openTimer) { clearTimeout(openTimer); openTimer = null; }
        if (pdMenu.dataset.open !== 'true') return;
        closeTimer = setTimeout(() => { closeTimer = null; pdClose(); }, 200);
      };
      pdWrap.addEventListener('pointerenter', onEnter);
      pdWrap.addEventListener('pointerleave', onLeave);
      pdMenu.addEventListener('pointerenter', onEnter);
      pdMenu.addEventListener('pointerleave', onLeave);
    }

    pdTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      cancelTimers();
      // Click only opens — it never closes. A click while the panel is already
      // open (e.g. surfaced by hover) confirms intent and moves focus into the
      // panel instead of toggling it shut. Close paths are outside-click / Esc /
      // scroll / card-select, all wired below.
      if (pdMenu.dataset.open === 'true') {
        const current = pdMenu.querySelector('.product-card[aria-current="page"]') || pdCards[0];
        if (current) current.focus();
      } else {
        pdOpen();
      }
    });

    pdTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || (e.key === 'Enter' && pdMenu.dataset.open !== 'true')) {
        e.preventDefault();
        cancelTimers();
        pdOpen();
        const current = pdMenu.querySelector('.product-card[aria-current="page"]') || pdCards[0];
        if (current) current.focus();
      } else if (e.key === 'Escape') {
        cancelTimers();
        pdClose();
      }
    });

    pdCards.forEach((card, i) => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          pdCards[(i + 1) % pdCards.length].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          pdCards[(i - 1 + pdCards.length) % pdCards.length].focus();
        } else if (e.key === 'Escape') {
          cancelTimers();
          pdClose();
          pdTrigger.focus();
        }
      });
      card.addEventListener('click', () => { cancelTimers(); pdClose(); });
    });

    document.addEventListener('click', (e) => {
      if (pdMenu.dataset.open !== 'true') return;
      if (pdWrap.contains(e.target)) return;
      pdClose();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && pdMenu.dataset.open === 'true') {
        pdClose();
        pdTrigger.focus();
      }
    });
    window.addEventListener('scroll', () => {
      if (window.scrollY > 64 && pdMenu.dataset.open === 'true') pdClose();
    }, { passive: true });
  }

  // ──────────────── Mobile drawer accordion — Products ────────────────
  const mProductsRow = document.querySelector('.mobile-list .mobile-row-dropdown');
  let fitProductsDefault = () => {};
  if (mProductsRow) {
    const sublistId = mProductsRow.getAttribute('aria-controls');
    const mSublist  = sublistId ? document.getElementById(sublistId) : null;
    if (mSublist) {
      mProductsRow.addEventListener('click', () => {
        const open = mProductsRow.getAttribute('aria-expanded') === 'true';
        mProductsRow.setAttribute('aria-expanded', String(!open));
        if (open) delete mSublist.dataset.open;
        else mSublist.dataset.open = 'true';
        // Once the reader has an opinion, stop imposing one.
        mProductsRow.dataset.userToggled = 'true';
      });

      // The markup ships expanded: collapsed, the drawer was 503px of empty white
      // below four links on a 844px phone. But the two product cards are 308px, so
      // on a shorter viewport (SE-class, 667px) expanding pushes the last nav rows
      // under the fold — hidden navigation is a worse fault than empty space.
      // Measure rather than guess a breakpoint: expand, and if the list now
      // overflows its own box, put it back. Runs per open, so rotating the phone
      // re-decides, and never overrides a reader who has toggled it themselves.
      fitProductsDefault = () => {
        const mList = mProductsRow.closest('.mobile-list');
        if (!mList || mProductsRow.dataset.userToggled === 'true') return;
        mProductsRow.setAttribute('aria-expanded', 'true');
        mSublist.dataset.open = 'true';
        if (mList.scrollHeight > mList.clientHeight + 1) {
          mProductsRow.setAttribute('aria-expanded', 'false');
          delete mSublist.dataset.open;
        }
      };
    }
  }

  // ──────────────── Overlay lock — shared by the drawer and search ────────────────
  // Both are role="dialog" aria-modal="true", and until now neither backed that up:
  // the page scrolled behind them and Tab walked straight out into it. This is the
  // same idiom the legal dialog uses (DESIGN.md §17.6) — inert on the landmarks,
  // a Tab cycle inside the panel, focus returned to the trigger — with one addition
  // it needs and the legal dialog does not: iOS Safari ignores `overflow:hidden` on
  // <body> for touch scrolling, so the body is pinned with position:fixed and the
  // scroll offset is carried on `top` and restored on release. Without that, closing
  // the drawer on an iPhone returns you to the top of the page.
  const landmarksOf = () => [
    document.querySelector('main'),
    document.querySelector('.footer'),
    document.querySelector('.footer-baseline')
  ].filter(Boolean);

  const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

  let lockDepth = 0;
  let lockedY = 0;

  const lockPage = () => {
    if (lockDepth++) return;
    lockedY = window.scrollY;
    // The scrollbar the lock removes would otherwise let the fixed topnav jump.
    const sb = window.innerWidth - document.documentElement.clientWidth;
    if (sb > 0) document.body.style.paddingRight = sb + 'px';
    document.body.style.top = `-${lockedY}px`;
    document.body.classList.add('nav-lock');
    pauseScroll();
    landmarksOf().forEach(el => { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); });
  };

  // Exported for the same reason as __tisScrollPause above: page-local dialogs that
  // live outside this IIFE need the ONE lock, not a private `body.style.overflow`.
  // patents/index.html's .pat-modal is the current caller. The refcount, the
  // position:fixed offset restore and the `inert` on <main>/.footer all live here — a
  // second implementation gets one of the three wrong, which is how the sample-report
  // and newsletter dialogs each ended up broken on iOS.
  const unlockPage = () => {
    if (!lockDepth || --lockDepth) return;
    document.body.classList.remove('nav-lock');
    document.body.style.top = '';
    document.body.style.paddingRight = '';
    landmarksOf().forEach(el => { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); });
    // `instant` because this is a restoration, not a navigation — html carries
    // scroll-behavior:smooth, which would otherwise animate the page back. Under Lenis
    // the same reasoning holds, plus two extra steps: position:fixed collapsed the
    // document while locked, so the cached scroll limit is stale, and the scroll has to
    // be issued with `force` because the instance is still stopped at this point.
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(lockedY, { immediate: true, force: true });
      resumeScroll();
    } else {
      window.scrollTo({ top: lockedY, behavior: 'instant' });
      resumeScroll();
    }
  };
  window.__tisLockPage   = lockPage;
  window.__tisUnlockPage = unlockPage;

  // Tab cycles within `panel`. Bound per-panel rather than globally so the two
  // overlays cannot fight over the same handler.
  const cycleFocus = (panel) => (e) => {
    if (e.key !== 'Tab') return;
    const f = [...panel.querySelectorAll(FOCUSABLE)].filter(el => el.getClientRects().length);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  // ──────────────── Mobile drawer ────────────────
  const mTrigger = document.getElementById('mobile-trigger');
  const mDrawer  = document.getElementById('mobile-drawer');
  const mOverlay = document.getElementById('mobile-overlay');
  const mClose   = document.getElementById('mobile-close');
  const mDrawerTab = cycleFocus(mDrawer);
  // Guarded on dataset.open: the Escape handler below is global and fires whether or
  // not this drawer is the thing that is open, and an unbalanced close would leave
  // the page locked.
  const openDrawer = () => {
    if (mDrawer.dataset.open === 'true') return;
    // Decide the Products default against this viewport before the panel slides
    // in — the drawer is laid out off-canvas, so the measurement is valid here.
    fitProductsDefault();
    mDrawer.dataset.open = mOverlay.dataset.open = 'true';
    mTrigger.setAttribute('aria-expanded','true');
    lockPage();
    mDrawer.addEventListener('keydown', mDrawerTab);
    mClose.focus({ preventScroll: true });
  };
  const closeDrawer = () => {
    if (mDrawer.dataset.open !== 'true') return;
    mDrawer.dataset.open = mOverlay.dataset.open = 'false';
    mTrigger.setAttribute('aria-expanded','false');
    mDrawer.removeEventListener('keydown', mDrawerTab);
    unlockPage();
    mTrigger.focus({ preventScroll: true });
  };
  mTrigger.addEventListener('click', openDrawer);
  mClose.addEventListener('click', closeDrawer);
  mOverlay.addEventListener('click', closeDrawer);
  // Release before the browser follows the link: an in-page #anchor would otherwise
  // be scrolled to while the body is still pinned, and unlockPage would then restore
  // the offset the anchor just replaced.
  mDrawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  // ──────────────── Search modal ────────────────
  const sTrigger = document.getElementById('search-trigger');
  const sModal   = document.getElementById('search-modal');
  const sOverlay = document.getElementById('search-overlay');
  const sInput   = document.getElementById('search-input');
  const sResults = sModal.querySelector('.search-results');
  // The authored "Jump to" list is the empty-query state, kept verbatim.
  const zeroState = sResults.innerHTML;
  const sModalTab = cycleFocus(sModal);
  const openSearch = () => {
    if (sModal.dataset.open === 'true') return;
    sModal.dataset.open = sOverlay.dataset.open = 'true';
    sTrigger.setAttribute('aria-expanded', 'true');
    lockPage();
    sModal.addEventListener('keydown', sModalTab);
    setTimeout(() => sInput.focus(), 50);
  };
  const closeSearch = () => {
    if (sModal.dataset.open !== 'true') return;
    sModal.dataset.open = sOverlay.dataset.open = 'false';
    sTrigger.setAttribute('aria-expanded', 'false');
    sModal.removeEventListener('keydown', sModalTab);
    sInput.value = '';
    sResults.innerHTML = zeroState;
    unlockPage();
    sTrigger.focus({ preventScroll: true });
  };
  sTrigger.addEventListener('click', (e) => { e.stopPropagation(); openSearch(); });
  sOverlay.addEventListener('click', closeSearch);
  document.getElementById('search-close')?.addEventListener('click', closeSearch);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });
  // Delegated, because the result rows are replaced on every keystroke — binding to
  // the static rows at init would stop closing the modal the moment they are.
  sResults.addEventListener('click', (e) => { if (e.target.closest('a')) closeSearch(); });

  // ── Query ───────────────────────────────────────────────────────────────
  // The index is built at build time (scripts/build-search-index.mjs) and fetched on
  // FIRST OPEN, never on page load — the cold-load budget is the point of the whole
  // font/image pass and a search nobody has asked for yet must not spend it.
  let idx = null, idxPending = null;
  const loadIndex = () => {
    if (idx) return Promise.resolve(idx);
    if (!idxPending) {
      idxPending = fetch('/assets/build/search-index.json')
        .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(j => { idx = j; return j; })
        .catch(() => { idxPending = null; return null; });
    }
    return idxPending;
  };

  const zhNow = () => document.documentElement.getAttribute('lang') === 'zh-Hant';

  // CJK has no spaces, so a whitespace split would make the whole query one term.
  // Latin runs stay whole; each Han character is its own term.
  const terms = (q) => (q.toLowerCase().match(/[a-z0-9]+|[\u3400-\u9fff\uf900-\ufaff]/g) || []);

  const score = (entry, q, ts) => {
    const zh = zhNow();
    const t = ((zh && entry.zt) || entry.t || '').toLowerCase();
    const b = ((zh && entry.zb) || entry.b || '').toLowerCase();
    if (!t) return 0;
    const bonus = entry.page ? 8 : 0;                               // a page outranks its own sections
    if (t.includes(q)) return 100 + bonus - Math.min(t.length, 60) / 100;
    if (ts.every(x => t.includes(x))) return 60 + bonus;
    if (b && ts.every(x => (t + ' ' + b).includes(x))) return 30;
    return 0;
  };

  const ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>';
  const esc = (x) => String(x).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const render = (rows) => {
    const zh = zhNow();
    if (!rows.length) {
      sResults.innerHTML = '<p class="search-section-label">' +
        (zh ? '沒有符合的結果' : 'No matches') + '</p>';
      return;
    }
    sResults.innerHTML = '<p class="search-section-label">' + (zh ? '搜尋結果' : 'Results') + '</p>' +
      rows.map(({ e, page }) => {
        const title = esc((zh && e.zt) || e.t);
        const meta  = esc(e.page ? (zh ? '頁面' : 'Page') : ((zh && page.zh) || page.en));
        const flag  = page.v ? '<span class="status-flag">' + (zh ? '即將推出' : 'Coming soon') + '</span>' : '';
        return `<a href="${esc(e.u)}" class="search-link">${ICON}<span>${title}</span>${flag}` +
               `<span class="search-link-meta">${meta}</span></a>`;
      }).join('');
  };

  const applySearch = async () => {
    const q = sInput.value.trim().toLowerCase();
    if (!q) { sResults.innerHTML = zeroState; return; }
    const data = await loadIndex();
    if (!data) { sResults.innerHTML = zeroState; return; }   // offline / 404 — the Jump-to list still works
    if (sInput.value.trim().toLowerCase() !== q) return;      // superseded while fetching
    const ts = terms(q);
    const rows = data.e
      .map(e => ({ e, page: data.pages[e.p], s: score(e, q, ts) }))
      .filter(r => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12);
    render(rows);
  };

  sInput.addEventListener('input', applySearch);
  // A language switch must re-render whatever is on screen in the new language.
  window.__searchRefresh = () => { if (sInput.value.trim()) applySearch(); else sResults.innerHTML = zeroState; };

  // ──────────────── Count-up — design-tokens.md §7.2 (count-up 1200ms linear) ────────────────
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const counters = document.querySelectorAll('.counter');
  const COUNT_MS = 1200;

  // Thousands separators by default (e.g. 1,234). data-sep="none" opts a counter
  // out — for figures that read as an unformatted quantity rather than a
  // presented number (the Signal pool numeral set inline in a sentence).
  const fmt = (n, el) => el.dataset.sep === 'none' ? String(n) : n.toLocaleString('en-US');
  const animate = (el, end) => {
    if (reduced) { el.textContent = fmt(end, el); return; }
    const startT = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startT) / COUNT_MS, 1);
      el.textContent = fmt(Math.floor(t * end), el);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animate(el, parseInt(el.dataset.target, 10));
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(el => counterObserver.observe(el));
  } else {
    counters.forEach(el => el.textContent = fmt(parseInt(el.dataset.target, 10), el));
  }

  // ──────────────── Scroll-reveal — [data-reveal] fades/rises into view once ────────────────
  // Guarded so it no-ops on pages without [data-reveal] elements (homepage, signal).
  // Under prefers-reduced-motion or no IntersectionObserver, elements show immediately.
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('is-revealed'));
    } else {
      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(el => revealObserver.observe(el));
    }
  }

  // ──────────────── Offer-card reveal — image zooms 1.08 → 1.0 + fades in on entry ────────────────
  // Adds .is-in (CSS owns the settle + later hover zoom). Staggered per card via a
  // per-element delay so the stagger never bleeds into the hover transition.
  // Reduced motion / no IntersectionObserver → reveal immediately, no stagger.
  const offerCards = document.querySelectorAll('.offer-card');
  if (offerCards.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      offerCards.forEach(el => el.classList.add('is-in'));
    } else {
      const offerObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const grid = entry.target.parentElement;
            const i = grid ? Array.prototype.indexOf.call(grid.children, entry.target) : 0;
            setTimeout(() => entry.target.classList.add('is-in'), i * 90);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
      offerCards.forEach(el => offerObserver.observe(el));
    }
  }

  // ──────────────── Report-card reveal — image zooms 1.08 → 1.0 + fades in on entry ────────────────
  // Adds .is-in (CSS owns the settle + hover zoom); NOT staggered. Observed at the
  // CAROUSEL level, not per card: the track scrolls horizontally, so cards parked
  // off the right edge have zero viewport intersection and would stay hidden if
  // observed individually — revealing all of a carousel's cards when the carousel
  // itself enters view keeps every tile from being stuck at opacity:0.
  // Reduced motion / no IntersectionObserver → reveal immediately.
  const reportCarousels = document.querySelectorAll('.report-carousel');
  if (reportCarousels.length) {
    const revealCards = root => root.querySelectorAll('.report-card').forEach(c => c.classList.add('is-in'));
    if (reduced || !('IntersectionObserver' in window)) {
      reportCarousels.forEach(revealCards);
    } else {
      const reportObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            revealCards(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      reportCarousels.forEach(el => reportObserver.observe(el));
    }
  }

  // ──────────────── Methodology stage — the figure pins and swaps (DESIGN.md §16.3) ────────────────
  // Guarded so it no-ops on every page but product/signal/methodology.html.
  //
  // .is-live means ACTUALLY PINNED, not "the script ran". The stage only pins above
  // 980px wide and only on a viewport tall enough to hold the card (the tallest of
  // the six is 583px and the pin sits 84–148px down, so under ~700px its bottom
  // would be off-screen). Asking the media queries here rather than leaving CSS to
  // undo a live stage keeps one source of truth — and stops the card, which while
  // pinned belongs to the stage, from wrapping all six stacked figures.
  //
  // The markup's default is the no-JS state: steps and figures stacked, every figure
  // visible. Going live is purely additive.
  const mthStage = document.querySelector('.mth-stage__stage');
  if (mthStage && 'IntersectionObserver' in window) {
    const mthMQ = ['(prefers-reduced-motion: reduce)', '(max-width: 980px)', '(max-height: 700px)']
      .map(q => matchMedia(q));
    const mthPinnable = () => !mthMQ.some(m => m.matches);
    const mthFigs  = [...mthStage.querySelectorAll('.mth-stage__fig')];
    const mthSteps = [...document.querySelectorAll('.mth-stage__step')];
    let mthObs = null;

    const mthSync = () => {
      if (mthObs) { mthObs.disconnect(); mthObs = null; }
      if (!mthPinnable()) {
        mthStage.classList.remove('is-live');
        mthFigs.forEach(f => f.classList.remove('is-on'));
        return;
      }
      mthStage.classList.add('is-live');
      const show = n => mthFigs.forEach((f, i) => f.classList.toggle('is-on', i === n));
      show(0);
      // IntersectionObserver, never a scroll listener: no per-frame work, no jank.
      mthObs = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) show(+entry.target.dataset.step); });
      }, { rootMargin: '-45% 0px -45% 0px' });
      mthSteps.forEach(el => mthObs.observe(el));
    };

    // Re-evaluate on the media queries themselves, not on resize.
    mthMQ.forEach(m => m.addEventListener('change', mthSync));
    mthSync();
  }

  // ──────────────── Accordion (single-open within group) — components.md §Accordion ────────────────
  // The `.acc-mark` +/− glyph and the `.howitworks` step-panel sync that used to hang
  // off this handler are gone: no page carries either, and no `.acc-item` carries
  // `data-step` (methodology's `data-step` lives on `.mth-stage__*`, a different
  // component). The chevron is CSS, driven by `.is-open`.
  //
  // The trigger used to announce nothing at all: no aria-expanded, so a screen reader
  // read five identical buttons with no indication that any of them had opened. And
  // the panel collapses with `grid-template-rows: 0fr` + overflow:hidden, which hides
  // it visually but leaves every answer in the accessibility tree and any link inside
  // it in the tab order — so all five answers were being read out regardless of state.
  // `inert` on the closed panel fixes both halves of that.
  let accId = 0;
  const accSync = (item) => {
    const trigger = item.querySelector('.acc-trigger');
    const panel = item.querySelector('.acc-content');
    if (!trigger) return;
    const open = item.classList.contains('is-open');
    trigger.setAttribute('aria-expanded', String(open));
    if (panel) {
      if (!panel.id) panel.id = `acc-panel-${++accId}`;
      trigger.setAttribute('aria-controls', panel.id);
      panel.inert = !open;
    }
  };
  document.querySelectorAll('.acc-item').forEach(accSync);
  document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.acc-item');
      const group = item.parentElement;
      const wasOpen = item.classList.contains('is-open');
      group.querySelectorAll('.acc-item').forEach(el => el.classList.remove('is-open'));
      if (!wasOpen) item.classList.add('is-open');
      group.querySelectorAll('.acc-item').forEach(accSync);
    });
  });

  // ───────── Roving tabindex + arrow keys for any [role="radiogroup"] ─────────
  //
  // The drawer's .mobile-lang carried role="radiogroup" + role="radio" with none of
  // the keyboard behaviour those roles promise: all options were separate tab stops
  // and arrow keys did nothing. A screen reader announced "radio group, 1 of 2" and
  // the obvious next keypress was inert.
  //
  // Written against [role="radiogroup"] rather than .mobile-lang so it is one helper
  // and not a special case. It is deliberately NOT what fixed the licensing pricing
  // toggle: that control is four toggle buttons, so it dropped the radio roles for
  // role="group" + aria-pressed instead. Adding roles you then have to service is the
  // expensive fix; use this one only where the control is a genuine radio group.
  //
  // State is never written here — arrow keys call .click() and let whatever already
  // owns the group do the work (for .mobile-lang that is applyLang, which sets
  // aria-checked on BOTH switchers at once). aria-checked is therefore observed, not
  // assumed, so the roving tab stop follows a change this handler did not make.
  document.querySelectorAll('[role="radiogroup"]').forEach(group => {
    const radios = () => [...group.querySelectorAll('[role="radio"]')];
    const syncTabstop = () => {
      const rs = radios();
      if (!rs.length) return;
      const checked = rs.find(r => r.getAttribute('aria-checked') === 'true') || rs[0];
      rs.forEach(r => { r.tabIndex = r === checked ? 0 : -1; });
    };
    syncTabstop();
    new MutationObserver(syncTabstop)
      .observe(group, { subtree: true, attributes: true, attributeFilter: ['aria-checked'] });

    group.addEventListener('keydown', (e) => {
      const rs = radios();
      const i = rs.indexOf(document.activeElement);
      if (i < 0) return;
      let n;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % rs.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + rs.length) % rs.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = rs.length - 1;
      else return;
      e.preventDefault();          // stop the page scrolling under the drawer
      rs[n].focus();
      rs[n].click();
    });
  });

  // ════════════════ Front Desk — form capture → Google Sheet ════════════════
  // One Apps Script Web App, routed server-side on the `form` key. The script
  // source and the full deploy walkthrough live in the block comment at the
  // foot of this file.
  //
  // While ENDPOINT is empty every form falls back to its previous local-only
  // behaviour, so a half-configured deploy cannot break the live site.
  const FRONT_DESK_ENDPOINT = 'https://script.google.com/macros/s/AKfycby0iyNlKyFl6F03VC4AQesH9L8e454kxmr6QU4YrRyC2AI9wxB9ueGo8dyedIXTvDp-/exec';

  const frontDeskLive = () => FRONT_DESK_ENDPOINT.length > 10;
  const isZh = () => (root.getAttribute('lang') || '').toLowerCase().startsWith('zh');
  const t = (en, zh) => (isZh() ? zh : en);
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sendFailed = () => t(
    'Couldn’t send. Please try again, or email contact@tisglobalinc.com.',
    '傳送失敗，請再試一次，或來信 contact@tisglobalinc.com。'
  );

  // Bots fill every field they can reach. Off-canvas, unfocusable, out of the
  // tab order; a non-empty value makes the server drop the row silently.
  const addHoneypot = (form) => {
    if (form.querySelector('input[name="_hp"]')) return;
    const hp = document.createElement('input');
    hp.type = 'text';
    hp.name = '_hp';
    hp.tabIndex = -1;
    hp.autocomplete = 'off';
    hp.setAttribute('aria-hidden', 'true');
    hp.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
    form.appendChild(hp);
  };

  // FormData alone loses two of the three forms:
  //   · the footer and popup email inputs ship without a name attribute
  //   · Role / Industry are .brand-select divs, invisible to FormData — their
  //     value lives in dataset.value (see the Brand select block above)
  // The bare-email fallback is load-bearing: capital/ is a separate repo that
  // loads this file cross-origin and will run it before its markup catches up.
  const serializeForm = (form, extra) => {
    const out = {};
    new FormData(form).forEach((v, k) => {
      if (typeof v === 'string') out[k] = v.trim();
    });
    form.querySelectorAll('.brand-select[data-name]').forEach(sel => {
      out[sel.dataset.name] = sel.dataset.value || '';
    });
    if (!out.email) {
      const mail = form.querySelector('input[type="email"]');
      if (mail) out.email = mail.value.trim();
    }
    out.page = location.host + location.pathname;   // distinguishes capital. from www
    out.lang = isZh() ? 'zh' : 'en';
    out.ua   = navigator.userAgent;
    return Object.assign(out, extra);
  };

  // text/plain keeps this a CORS *simple request*, so the browser skips the
  // preflight OPTIONS that Apps Script cannot answer. Deliberately NOT
  // mode:'no-cors' — the response has to stay readable, or every failure
  // would be indistinguishable from a success.
  const frontDeskPost = async (payload) => {
    const res = await fetch(FRONT_DESK_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data || !data.ok) throw new Error((data && data.error) || 'write failed');
  };

  // Injected rather than authored, so the eight pages carrying the contact
  // form need no markup change.
  const showFormError = (form, msg) => {
    let el = form.querySelector('.form-error');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-error';
      el.setAttribute('role', 'alert');
      const actions = form.querySelector('.contact-actions');
      if (actions) form.insertBefore(el, actions); else form.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-shown');
  };
  const clearFormError = (form) => {
    const el = form.querySelector('.form-error');
    if (el) el.classList.remove('is-shown');
  };

  // Normalises every check SVG to pathLength="1" so the CSS can draw it with
  // stroke-dashoffset 1 → 0 regardless of the path's real geometry — no
  // measuring, and it covers the contact arc, the popup tick and the footer
  // <polyline> identically. The .is-primed class is the CSS's signal that the
  // attribute is set; without it the dash rules stay off, so markup that never
  // meets this JS still renders a normal, undashed check.
  // Accepts either an <svg> itself or a container holding one.
  const primeCheck = (scope) => {
    if (!scope) return;
    const svgs = scope.tagName && scope.tagName.toLowerCase() === 'svg'
      ? [scope]
      : scope.querySelectorAll('svg');
    svgs.forEach(svg => {
      svg.querySelectorAll('path, polyline').forEach(p => p.setAttribute('pathLength', '1'));
      svg.classList.add('is-primed');
    });
  };

  // Restores whatever label was there before rather than a hardcoded string,
  // so a language swap mid-request can't strand the button in one language.
  const pending = (btn, on) => {
    if (!btn) return;
    if (on) {
      btn.dataset.prevLabel = btn.textContent;
      btn.textContent = t('Sending…', '傳送中…');
      btn.disabled = true;
      btn.classList.add('is-pending');
    } else {
      if (btn.dataset.prevLabel !== undefined) btn.textContent = btn.dataset.prevLabel;
      delete btn.dataset.prevLabel;
      btn.disabled = false;
      btn.classList.remove('is-pending');
    }
  };

  // ──────────────── Contact form → `contact` tab ────────────────
  // The markup carries `novalidate` and no `required` attributes, so validation
  // belongs here. Until now an entirely empty form reported success.
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm && contactSuccess) {
    addHoneypot(contactForm);
    const contactBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearFormError(contactForm);

      const payload = serializeForm(contactForm, { form: 'contact', source: 'contact' });
      const invalid =
        !payload.name                       ? t('Please enter your name.', '請填寫姓名。') :
        !EMAIL_RE.test(payload.email || '') ? t('Please enter a valid email address.', '請填寫有效的電子郵件。') :
        !payload.message                    ? t('Please tell us briefly what you need.', '請簡述您的需求。') : '';
      if (invalid) { showFormError(contactForm, invalid); return; }

      const succeed = () => {
        // Pin the panel to the height the form occupied BEFORE hiding it, so
        // the card doesn't collapse ~450px and strand the confirmation off
        // the top of the viewport. Measured rather than hardcoded, so it
        // holds at every breakpoint.
        contactSuccess.style.minHeight = contactForm.offsetHeight + 'px';
        // Shim: capital/ is a separate repo still carrying the old subtext.
        // Drop it once that repo has the markup change.
        const stale = contactSuccess.querySelector('p');
        if (stale) stale.remove();
        primeCheck(contactSuccess);
        contactForm.style.display = 'none';
        contactSuccess.classList.add('is-shown');
      };
      if (!frontDeskLive()) { succeed(); return; }   // endpoint unset — prior behaviour

      pending(contactBtn, true);
      try {
        await frontDeskPost(payload);
        succeed();
      } catch (err) {
        showFormError(contactForm, sendFailed());
      } finally {
        pending(contactBtn, false);
      }
    });
  }

  // ──────────────── Footer newsletter → `newsletter` tab, source=footer ────────────────
  // components.md §Footer — in-place success, 1.6s auto-reset.
  const MKT_KEY = 'tis-mkt-drop-seen';
  const markMktSeen = () => { try { localStorage.setItem(MKT_KEY, String(Date.now())); } catch (_) {} };

  const nlBlock = document.getElementById('footer-nl-block');
  const nlForm  = document.getElementById('footer-nl-form');
  if (nlBlock && nlForm) {
    addHoneypot(nlForm);
    const nlInput = nlForm.querySelector('input[type="email"]');
    const nlLabel = nlBlock.querySelector('.footer-nl-label');
    const nlBtn   = nlForm.querySelector('button[type="submit"]');
    const nlOrig  = nlLabel.textContent;
    let nlTimer = null;

    // Read the label back from data-en/data-zh (captured on init) so a reset
    // after a language swap restores the right one.
    const nlRestore = () => {
      nlLabel.textContent = (isZh() ? nlLabel.dataset.zh : nlLabel.dataset.en) || nlOrig;
    };

    // Persists rather than auto-reverting. The old 1.6s reset made sense when
    // nothing was actually being sent; now that it is, a confirmation you can
    // miss by looking away is the wrong signal. Input clears immediately so the
    // state can't be resubmitted.
    const nlSucceed = () => {
      clearTimeout(nlTimer);
      nlBlock.classList.remove('is-error');
      primeCheck(nlForm.querySelector('.icon-check'));
      nlBlock.classList.add('is-success');
      nlLabel.textContent = t("Thanks — you're subscribed", '訂閱成功，感謝您');
      nlInput.value = '';
      // Cross-suppress the IP-intel drop popup — already engaged via footer.
      markMktSeen();
    };

    nlForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = serializeForm(nlForm, { form: 'newsletter', source: 'footer' });
      if (!EMAIL_RE.test(payload.email || '')) return;
      if (!frontDeskLive()) { nlSucceed(); return; }

      nlBtn.disabled = true;
      try {
        await frontDeskPost(payload);
        nlSucceed();
      } catch (err) {
        // The strip has no room for a message node — the label carries it.
        nlBlock.classList.add('is-error');
        nlLabel.textContent = t('Couldn’t subscribe — try again', '訂閱失敗，請再試一次');
        clearTimeout(nlTimer);
        nlTimer = setTimeout(() => {
          nlBlock.classList.remove('is-error');
          nlRestore();
        }, 2600);
      } finally {
        nlBtn.disabled = false;
      }
    });
  }

  // ──────────────── Brand select — components.md §Select (custom dropdown wiring) ────────────────
  const closeAllBrandSelects = (except) => {
    document.querySelectorAll('.brand-select.open').forEach(el => {
      if (el === except) return;
      el.classList.remove('open');
      const t = el.querySelector('.brand-select-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  };
  document.querySelectorAll('.brand-select').forEach(el => {
    const trigger = el.querySelector('.brand-select-trigger');
    const label = el.querySelector('.brand-select-label');
    if (!trigger || !label) return;
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = el.classList.contains('open');
      closeAllBrandSelects(wasOpen ? null : el);
      if (wasOpen) {
        el.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        el.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
    el.querySelectorAll('.brand-select-item').forEach(item => {
      item.addEventListener('click', () => {
        el.querySelectorAll('.brand-select-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        const text = item.querySelector('span:first-child');
        if (text) {
          label.textContent = text.textContent;
          label.classList.remove('placeholder');
        }
        el.dataset.value = item.dataset.value || '';
        el.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  });
  document.addEventListener('click', () => closeAllBrandSelects());

  // ──────────────── IP intelligence drop popup — components.md §IP intelligence drop popup ────────────────
  // Trigger: 45s OR 50% scroll, whichever fires first. 30-day localStorage suppression.
  const mkt = document.getElementById('mkt-overlay');
  const mktCard = document.getElementById('mkt-card');
  const mktForm = document.getElementById('mkt-form');
  if (mkt && mktCard && mktForm && !document.body.dataset.veil) {
    addHoneypot(mktForm);
    const TTL_MS = 30 * 24 * 60 * 60 * 1000;
    const DELAY_MS = 45000;
    const SCROLL_THRESHOLD = 0.50;

    const isSuppressed = () => {
      try {
        const ts = parseInt(localStorage.getItem(MKT_KEY) || '0', 10);
        return ts && (Date.now() - ts) < TTL_MS;
      } catch (_) { return true; }
    };

    let lastFocus = null;
    let timer = null;
    let opened = false;

    // Cached, and rAF-coalesced (2026-08-29). `doc.scrollHeight` is a forced synchronous
    // layout flush, and this ran it on EVERY scroll event, un-throttled. It is
    // `passive: true` so it never blocked the gesture, but the flush still landed on the
    // main thread mid-scroll — and the listener is only armed when the popup is not
    // suppressed, i.e. on a FIRST VISIT, which is exactly when the site was reported to
    // stutter. The document height cannot change under a scroll, only under a resize or
    // a reveal, so measure it there instead.
    let scrollMax = 0;
    const measure = () => {
      // Never measure while the page is locked. body.nav-lock and the legal lock are
      // `position: fixed; overflow: hidden`, which takes <body> out of flow and makes
      // scrollHeight - clientHeight collapse to ~0. A resize while the mobile drawer is
      // open (orientation change, iOS URL-bar collapse, soft keyboard) would otherwise
      // latch scrollMax at 0 — and closing the drawer fires no resize, so the trigger
      // stayed dead for the rest of the session.
      const b = document.body.classList;
      if (b.contains('nav-lock') || b.contains('lgl-lock')) return;
      const doc = document.documentElement;
      scrollMax = doc.scrollHeight - doc.clientHeight;
    };
    let scrollRaf = null;
    const onScroll = () => {
      if (opened || scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        if (opened) return;
        // Self-heal: any path that left the cache non-positive (a missed resize, a
        // measurement taken while locked) re-measures once here. Still off the hot
        // path — this only runs when the cached value is unusable, and it is inside
        // the rAF, so the forced layout lands with the frame rather than mid-gesture.
        if (scrollMax <= 0) measure();
        const scrolled = window.scrollY || document.documentElement.scrollTop || 0;
        if (scrollMax > 0 && (scrolled / scrollMax) >= SCROLL_THRESHOLD) openPopup();
      });
    };

    function openPopup() {
      if (opened || isSuppressed()) return;
      // Never over an open legal dialog. This popup runs on a 45s timer of its own,
      // so without this it lands on top of Terms mid-read. Re-arm rather than drop
      // the trigger, so the visitor still sees it once they close the dialog.
      if (document.body.classList.contains('lgl-lock')) { timer = setTimeout(openPopup, 20000); return; }
      opened = true;
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      lastFocus = document.activeElement;
      mkt.classList.add('is-open');
      mkt.setAttribute('aria-hidden', 'false');
      // lockPage(), not `body.style.overflow = 'hidden'`. Two reasons, both mobile:
      // iOS Safari keeps scrolling the document behind an overflow-hidden body (the
      // reason nav-lock uses position:fixed with the offset carried on `top`), and
      // lockPage also inerts <main> and the footer — without which this aria-modal
      // dialog left the entire page behind it readable and tabbable. #mkt-overlay is a
      // sibling of <main>, not a descendant, so it is not inerted by its own lock.
      // lockPage calls pauseScroll itself; a second call here would not be balanced by
      // closePopup, because unlockPage only resumes on the lenis path.
      lockPage();
      markMktSeen();
      const email = mktCard.querySelector('input[type="email"]');
      if (email) setTimeout(() => email.focus(), 50);
    }

    function closePopup() {
      mkt.classList.remove('is-open');
      mkt.setAttribute('aria-hidden', 'true');
      unlockPage();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    // Privacy in the fine print. The legal dialog is a separate overlay and it inerts
    // only <main> and the footer — this popup sits outside both, so the two would stack.
    // Close this one first; the delegated [data-legal] handler then opens the dialog on
    // the same click, because this listener is on `mkt` and fires earlier in the bubble.
    mkt.addEventListener('click', (e) => {
      if (e.target.closest('[data-legal]')) closePopup();
    });

    function showSuccess() {
      // Drop layout-modifying class so success renders centered without the hero image.
      mktCard.classList.remove('with-hero');
      // Built after init, so this heading isn't in the static i18nEls NodeList
      // and won't follow a later language toggle. Resolving it through t() at
      // creation is the correct fix — the modal is dismissed long before that
      // would matter. Until now it was hardcoded English for ZH readers too.
      mktCard.innerHTML =
        '<button class="mkt-close" type="button" aria-label="Close" data-mkt-close>' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
        '</button>' +
        '<div class="mkt-success">' +
          '<div class="seal"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></div>' +
          '<h3>' + t('You’re on the list.', '已加入訂閱名單。') + '</h3>' +
        '</div>';
      // Only the tick — not the close button's X, which shouldn't draw itself.
      primeCheck(mktCard.querySelector('.seal'));
    }

    // → `newsletter` tab, source=popup. Role and Industry come from the
    // .brand-select widgets, which serializeForm() reads via dataset.value.
    mktForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearFormError(mktForm);

      const payload = serializeForm(mktForm, { form: 'newsletter', source: 'popup' });
      if (!EMAIL_RE.test(payload.email || '')) {
        showFormError(mktForm, t('Please enter a valid work email.', '請填寫有效的公司電子郵件。'));
        return;
      }
      if (!frontDeskLive()) { showSuccess(); return; }

      // The CTA lives in .mkt-foot, outside the form, wired via form="mkt-form".
      const mktBtn = mktCard.querySelector('.mkt-cta');
      pending(mktBtn, true);
      try {
        await frontDeskPost(payload);   // must land before showSuccess() wipes the card
        showSuccess();                  // card innerHTML replaced — no un-pending needed
      } catch (err) {
        showFormError(mktForm, sendFailed());
        pending(mktBtn, false);
      }
    });
    mkt.addEventListener('click', (e) => {
      if (e.target === mkt) closePopup();
      if (e.target.closest('[data-mkt-close]')) closePopup();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mkt.classList.contains('is-open')) closePopup();
    });

    // Arm triggers if not suppressed.
    if (!isSuppressed()) {
      timer = setTimeout(openPopup, DELAY_MS);
      measure();
      window.addEventListener('scroll', onScroll, { passive: true });
      // Reveals and lazy images change the document height after load, so re-measure on
      // resize and once the page has settled rather than trusting the value taken here.
      window.addEventListener('resize', measure, { passive: true });
      window.addEventListener('load', measure, { once: true });
    }
  }

  // ──────────────── Legal modal — components.md §Modal (xl 800) ────────────────
  // Terms / Privacy / Disclosures, opened from the footer of every page. The copy
  // lives in /legal/*.html fragments, ONE PER LANGUAGE, fetched on first open.
  //
  // Per-language files rather than data-zh inside the markup, and that is not a
  // preference: the language switcher above collects its i18n nodes ONCE at init
  // (see i18nEls), so anything injected later renders correctly and then refuses to
  // translate on the next toggle. Fetching the language-matched fragment sidesteps
  // that system entirely and halves each payload. The trade is that a toggle while
  // open must re-fetch — handled below.
  //
  // The footer links keep a real href to the fragment, so with JS off, or for a
  // crawler or a payment-gateway reviewer, they still resolve to readable content.
  const lglOverlay = document.getElementById('legal-overlay');
  if (lglOverlay) {
    const lglDialog  = lglOverlay.querySelector('.lgl-dialog');
    const lglTitle   = lglOverlay.querySelector('.lgl-head h2');
    const lglBody    = lglOverlay.querySelector('.lgl-body');
    const lglClose   = lglOverlay.querySelector('.lgl-close');
    const cache = new Map();      // key -> fragment html
    const inflight = new Map();   // key -> in-flight fetch, so parallel callers share one request
    let lglLast = null, lglDoc = null;

    const isZh = () => document.documentElement.getAttribute('lang') === 'zh-Hant';
    const TITLES = {
      terms:       { en: 'Terms of Service', zh: '服務條款' },
      privacy:     { en: 'Privacy Policy',   zh: '隱私政策' },
      disclosures: { en: 'Disclosures',      zh: '揭露聲明' }
    };
    // Everything inside <main>/<footer> goes inert while the dialog is open — the
    // house idiom from DESIGN.md §17.6. aria-modal alone is a promise the DOM does
    // not keep; inert is what actually stops focus reaching the page behind, and it
    // is a content attribute, so it holds without JS once set.
    const landmarks = () => [
      document.querySelector('main'),
      document.querySelector('.footer'),
      document.querySelector('.footer-baseline')
    ].filter(Boolean);

    const keyFor = (doc) => doc + '.' + (isZh() ? 'zh' : 'en');
    const onIdle = (fn) => (window.requestIdleCallback
      ? window.requestIdleCallback(fn, { timeout: 2000 })
      : setTimeout(fn, 1200));

    // One request per fragment per session, deduped: the prefetch, lglOpen() and paint()
    // all come through here, so a click that lands mid-prefetch joins that promise
    // instead of firing a second request.
    function load(key) {
      if (cache.has(key)) return Promise.resolve(cache.get(key));
      if (inflight.has(key)) return inflight.get(key);
      const p = fetch('/legal/' + key + '.html', { cache: 'no-cache' })
        .then(res => { if (!res.ok) throw new Error(res.status); return res.text(); })
        // The /legal/*.html files are full documents now, so that opening one directly —
        // a long-press "open in new tab", or the fallback link below — renders a real
        // page instead of unstyled text at desktop width on a phone. Only the <body>
        // goes into the dialog. DOMParser handles a bare fragment identically, so this
        // is safe whichever shape a file is in.
        .then(html => {
          const body = new DOMParser().parseFromString(html, 'text/html').body.innerHTML;
          cache.set(key, body); inflight.delete(key); return body;
        })
        .catch(err => { inflight.delete(key); throw err; });
      inflight.set(key, p);
      return p;
    }

    // keepOld: a language toggle with the dialog open holds the text already on screen
    // until the other language lands, so the swap is a swap rather than a blink through
    // the loading state.
    function paint(doc, keepOld) {
      const key = keyFor(doc);
      lglTitle.textContent = isZh() ? TITLES[doc].zh : TITLES[doc].en;
      if (cache.has(key)) { lglBody.innerHTML = cache.get(key); lglBody.scrollTop = 0; return; }
      if (!keepOld) lglBody.innerHTML = '<p class="lgl-loading">' + (isZh() ? '載入中…' : 'Loading…') + '</p>';
      // Superseded while in flight — another document opened, or the language changed.
      const stale = () => lglDoc !== doc || keyFor(doc) !== key;
      load(key).then(html => {
        if (stale()) return;
        lglBody.innerHTML = html;
        lglBody.scrollTop = 0;
      }).catch(() => {
        if (stale()) return;
        // Give the reader the working URL rather than a dead end.
        lglBody.innerHTML = '<p class="lgl-loading">' + (isZh()
          ? '無法載入。請前往 <a href="/legal/' + key + '.html">' + key + '.html</a>。'
          : 'Could not load. Open <a href="/legal/' + key + '.html">' + key + '.html</a> instead.') + '</p>';
      });
    }

    // Warm the cache for the language on screen so the first open of each document is
    // synchronous. Three same-origin fragments, ~5KB each, fetched off the critical path.
    const prefetch = () => ['terms', 'privacy', 'disclosures'].forEach(d => load(keyFor(d)).catch(() => {}));
    onIdle(prefetch);

    const lglFocusables = () => [...lglDialog.querySelectorAll('button,a[href],[tabindex]:not([tabindex="-1"])')]
      .filter(n => !n.hasAttribute('disabled') && n.offsetParent !== null);

    // Content BEFORE reveal, and that order is the fix for a measured flash: opening
    // first and filling in after renders a 144px dialog that fades in and then snaps to
    // ~680px mid-animation. The prefetch above means the cache is normally warm and this
    // is synchronous; a cold cache gets 200ms to land before the dialog opens on its
    // loading state, so a slow connection still never leaves the click feeling dead.
    async function lglOpen(doc, trigger) {
      lglDoc = doc;
      lglLast = trigger || document.activeElement;
      const key = keyFor(doc);
      if (!cache.has(key)) {
        await Promise.race([load(key).catch(() => {}), new Promise(r => setTimeout(r, 200))]);
        if (lglDoc !== doc) return;            // a second trigger won while this one waited
      }
      // Compensate for the scrollbar the lock removes, or the fixed topnav jumps.
      const sb = window.innerWidth - document.documentElement.clientWidth;
      if (sb > 0) document.body.style.paddingRight = sb + 'px';
      document.body.classList.add('lgl-lock');
      pauseScroll();
      landmarks().forEach(el => { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); });
      paint(doc);
      lglOverlay.dataset.open = 'true';
      lglClose.focus({ preventScroll: true });
    }

    function lglCloseFn() {
      if (lglOverlay.dataset.open !== 'true') return;
      lglOverlay.dataset.open = 'false';
      document.body.classList.remove('lgl-lock');
      resumeScroll();
      document.body.style.paddingRight = '';
      landmarks().forEach(el => { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); });
      lglDoc = null;
      // getClientRects() rather than a null check: the trigger may still be in the DOM
      // but hidden, as the marketing popup's Privacy link is once that popup closes.
      if (lglLast && lglLast.focus && lglLast.getClientRects().length) lglLast.focus({ preventScroll: true });
      lglLast = null;
    }

    // One delegated listener for all 24 footer links across the 8 pages.
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-legal]');
      if (!link) return;
      e.preventDefault();
      lglOpen(link.dataset.legal, link);
    });
    lglClose.addEventListener('click', lglCloseFn);
    lglOverlay.addEventListener('click', (e) => { if (e.target === lglOverlay) lglCloseFn(); });
    document.addEventListener('keydown', (e) => {
      if (lglOverlay.dataset.open !== 'true') return;
      if (e.key === 'Escape') { e.preventDefault(); lglCloseFn(); return; }
      if (e.key === 'Tab') {
        const f = lglFocusables();
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // A language toggle while open swaps the whole document, and relabels the close
    // button — neither is reachable by the i18n pass, since this content was injected.
    new MutationObserver(() => {
      lglClose.setAttribute('aria-label', isZh() ? '關閉' : 'Close');
      if (lglDoc) paint(lglDoc, true);
      onIdle(prefetch);            // the other language is now the one on screen
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    lglClose.setAttribute('aria-label', isZh() ? '關閉' : 'Close');
  }
})();

// ─── Announcement banner — per-session dismiss ───────────────────────
// Keyed by data-announce-id so a NEW announcement re-shows even within the
// same session; sessionStorage so it returns on the next visit.
// (Formerly nested in the hero-slider IIFE, retired with the carousel 2026-06-24.)
(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  // Below 881px the bar is a travelling ticker driven entirely by CSS, not a
  // crossfade rotator. The 6s timer has nothing to do there — every item is painted
  // at once — so it stands down rather than toggling .is-active into the void.
  // Must match the TICKER breakpoint in styles.css.
  const tickerMQ = matchMedia('(max-width: 880px)');
  document.querySelectorAll('.announce').forEach((bar) => {
    const key = 'tis-announce-dismissed:' + bar.dataset.announceId;
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(key) === '1'; } catch (_) {}
    if (dismissed) { bar.hidden = true; return; }

    // Rotator — cross-fade between the bar's announcement items.
    // Both items are always in the DOM and in the a11y tree, so nothing depends
    // on catching the right moment; this only drives which one is painted.
    // Skipped entirely under reduced motion, where CSS shows both side by side.
    // :not(--dup) matters. The ticker's loop duplicate is real markup, and without
    // this the cycle would spend half its slots on items that are display:none above
    // 880px — the bar would simply go blank for 6s at a time.
    const items = [...bar.querySelectorAll('.announce-item:not(.announce-item--dup)')];
    if (items.length > 1) {
      let i = 0, timer = null;
      const advance = () => {
        items[i].classList.remove('is-active');
        i = (i + 1) % items.length;
        items[i].classList.add('is-active');
      };
      const start = () => { if (!timer) timer = setInterval(advance, 6000); };
      const stop  = () => { clearInterval(timer); timer = null; };
      const rotating = () => !reduceMotion.matches && !tickerMQ.matches;
      const sync = () => {
        if (rotating()) { start(); return; }
        // Not rotating (reduced motion, or the ticker owns the bar): park on the
        // first item, so if the preference or the width changes back the cycle
        // resumes from the top rather than mid-swap. In ticker mode .is-active is
        // inert anyway — CSS paints every item — but parking keeps the two modes
        // from disagreeing about which item is "current" when the width crosses back.
        stop();
        i = 0;
        items.forEach((el, n) => el.classList.toggle('is-active', n === 0));
      };
      // Pause while a pointer is over the bar or focus is inside it, so a slow
      // reader is never fighting the timer. The close button is the WCAG 2.2.2
      // "hide" mechanism for anyone who wants it gone outright.
      bar.addEventListener('mouseenter', stop);
      bar.addEventListener('mouseleave', () => { if (rotating()) start(); });
      bar.addEventListener('focusin', stop);
      bar.addEventListener('focusout', () => { if (rotating()) start(); });
      reduceMotion.addEventListener('change', sync);
      tickerMQ.addEventListener('change', sync);
      sync();

      // WCAG 2.2.2 for the ticker. mouseenter/focusin cover the desktop rotator, but
      // a phone fires neither, so the travelling copy had no pause at all. Holding a
      // finger on the bar stops the track; lifting resumes it on the same phase.
      // The rotator is a JS timer and the ticker is a CSS animation, so this pauses
      // the animation directly rather than going through stop()/start().
      const rot = bar.querySelector('.announce-rotator');
      if (rot) {
        const hold = () => { rot.style.animationPlayState = 'paused'; };
        const release = () => { rot.style.animationPlayState = ''; };
        bar.addEventListener('pointerdown', hold);
        bar.addEventListener('pointerup', release);
        bar.addEventListener('pointercancel', release);
        bar.addEventListener('pointerleave', release);
      }
    }

    const close = bar.querySelector('.announce-close');
    if (!close) return;
    close.addEventListener('click', () => {
      try { sessionStorage.setItem(key, '1'); } catch (_) {}
      const done = () => { bar.hidden = true; bar.classList.remove('is-dismissing'); };
      if (reduceMotion.matches) { done(); return; }
      bar.classList.add('is-dismissing');
      // Guarded and timed out. `transitionend` fires per property and .announce
      // transitions both max-height and opacity; they share a 200ms duration today,
      // so the unguarded version happened to be correct, but any future change to
      // either duration would fire `done` early. The timeout is the real backstop —
      // if the bar is display:none'd or the transition is interrupted, no
      // transitionend ever arrives and the bar would sit at opacity 0 forever,
      // still occupying its box.
      let settled = false;
      const finish = () => { if (settled) return; settled = true; done(); };
      bar.addEventListener('transitionend', (e) => {
        if (e.target === bar && e.propertyName === 'max-height') finish();
      });
      setTimeout(finish, 400);
    });
  });
})();

/* ══════════════════════════════════════════════════════════════════════════
   PARTNER STRIP — touch autoplay  (coarse pointers only)

   On desktop this strip is pure CSS: a max-content track with a 34s linear keyframe
   translating -50%, paused on :hover. That gave a phone nothing — :hover is unreliable
   and sticky on iOS, and `overflow: hidden` meant the logos could not be dragged at all.

   A transform and a native scroller cannot share an element, so on coarse pointers the
   CSS animation is switched off (see styles.css) and the same motion is driven here by
   incrementing scrollLeft, wrapping at half the track. The markup already duplicates
   the four marks exactly once for the -50% loop, which is what makes the wrap seamless
   — if the number of marks ever changes, both halves must change together.

   `data-partner-marquee` was a dead hook until now: it was in the markup with zero
   references anywhere in this file.
   ══════════════════════════════════════════════════════════════════════════ */
(() => {
  const coarse = matchMedia('(pointer: coarse)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const PX_PER_SEC = 29;          // matches the 34s CSS duration over a ~992px half-track

  document.querySelectorAll('[data-partner-marquee]').forEach((box) => {
    const track = box.querySelector('.partner-marquee__track');
    if (!track) return;

    let raf = null, last = 0, down = false;
    // Position is tracked here as a float rather than read back from scrollLeft each
    // frame. At 29px/s and 60fps each step is ~0.48px, and reading scrollLeft back
    // quantises it away — the strip advanced ~2px in 1.6s instead of ~46px. Writing
    // an accumulated float keeps the sub-pixel remainder.
    let pos = 0;
    const running = () => coarse.matches && !reduce.matches;

    // ── The pause gate watches the SCROLLER, not the pointer (2026-08-29) ──────────
    //
    // This used to be a refcount incremented on pointerdown and decremented on
    // pointerup / pointercancel / pointerleave, and it could not survive a native
    // scroll gesture. `touch-action` hands a horizontal pan to the compositor, and the
    // browser marks that handover by firing POINTERCANCEL — so the refcount hit zero
    // the instant the drag actually started, autoplay resumed mid-drag, and from the
    // next frame the loop was writing an absolute scrollLeft on top of the browser's
    // own scroll. The two fought for the same property every frame: the strip juddered,
    // refused to follow the finger, and killed the momentum fling on release. Reported
    // as "the whole thing spasms and doesn't work".
    //
    // Watching `scroll` fixes the whole class at once, because it observes the OUTCOME
    // instead of trying to infer the gesture: finger drag, momentum fling, wheel and
    // trackpad all produce scroll events, and pointercancel is no longer a signal we
    // have to interpret. The loop distinguishes its own writes by remembering the value
    // it last wrote — see the scroll handler for why a flag will not do.
    let userScrolling = false, idleTimer = null, lastWritten = -1;
    const IDLE_MS = 900;      // long enough to outlast an iOS momentum fling

    // ── Wrap ──────────────────────────────────────────────────────────────────────
    // Position X and X + half render IDENTICALLY — that is what the duplicated mark set
    // buys — so normalising into [0, half) is invisible by construction. The old
    // `if (pos >= half) pos -= half` is correct only while the value overshoots by less
    // than one half-track; that holds at today's four marks (max scrollLeft 1636 < 2 ×
    // 968) but silently stops holding if the strip ever gets narrower relative to its
    // track. A modulo is correct for any overshoot and costs the same.
    //
    // The teleport this was blamed for was not the arithmetic. It was `release()`
    // adopting scrollLeft mid-gesture and the loop then WRITING that normalised value
    // back while the finger was still moving — the visible jump was the write, not the
    // wrap. The scroll-idle gate above is what actually fixes it.
    const norm = (v, half) => (half > 0 ? ((v % half) + half) % half : 0);

    const step = (t) => {
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;   // clamp after a tab switch
      last = t;
      if (!down && !userScrolling) {
        const half = track.scrollWidth / 2;
        if (half > 0) {
          pos = norm(pos + PX_PER_SEC * dt, half);               // seamless wrap
          box.scrollLeft = pos;
          // Read back rather than remembering `pos`: the browser rounds and clamps the
          // value it actually stores, and the scroll handler below compares against it
          // exactly. The read is free here — a scroll write does not dirty layout, so
          // this is not a forced reflow.
          lastWritten = box.scrollLeft;
        }
      }
      raf = requestAnimationFrame(step);
    };

    const start = () => { if (!raf && running()) { last = 0; raf = requestAnimationFrame(step); } };
    // `down` is reset here as well as in sync(): the two teardown paths were asymmetric,
    // and a press still latched when the IntersectionObserver stopped the loop left the
    // strip frozen on the way back in.
    const stop  = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } down = false; };

    box.addEventListener('scroll', () => {
      // Our own write, echoed back — ignore it, or the loop would permanently pause
      // itself on its first frame.
      //
      // Compared by VALUE, not by a "this one is mine" flag. Scroll events are
      // coalesced and dispatched at the next rendering opportunity, so a flag set by
      // the loop can be consumed by an event that actually carries the user's position
      // too, and the drag is silently swallowed — every frame, for as long as the drag
      // lasts. Any position that is not the one we last wrote came from the user.
      if (Math.abs(box.scrollLeft - lastWritten) < 1) return;
      userScrolling = true;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        userScrolling = false;
        // Adopt where the scroll actually came to rest, or the next frame would snap
        // the strip back to wherever the accumulator had got to meanwhile.
        pos = norm(box.scrollLeft, track.scrollWidth / 2);
      }, IDLE_MS);
    }, { passive: true });

    // ── Drag vs tap ───────────────────────────────────────────────────────────────
    // The four real marks are target="_blank" anchors, so without this a swipe that
    // happens to start on a logo opens innovue.ltd on release.
    //
    // TWO independent signals, because neither alone covers both pointer types:
    //
    //   `moved`  — pointer travel while the button/finger is down. Gated on `down`,
    //              which is what makes it safe on a mouse: an ungated pointermove
    //              turns every hover across the strip into a "drag" and then eats the
    //              next genuine click on a logo.
    //   `scrolled` — how far the strip itself travelled during the gesture. This is the
    //              touch safety net. A horizontal pan ends in POINTERCANCEL, after
    //              which no further pointermove arrives, so `moved` can still be false
    //              when the finger has clearly dragged. Comparing scrollLeft against
    //              its value at pointerdown sees the drag regardless. Safe to read here
    //              because the loop is paused for the whole gesture — `down` covers the
    //              press and the scroll-idle gate covers the fling — so any delta is
    //              the user's, never autoplay's. On desktop the strip is not a scroller
    //              at all (overflow: hidden, CSS transform), so this term is always 0.
    //   `pointered` — whether a pointer sequence actually preceded this click. Without
    //              it, a keyboard Enter (which dispatches click with no pointerdown) is
    //              measured against a stale `downLeft` while autoplay writes scrollLeft
    //              continuously, so `scrolled` is effectively always true and the link
    //              is silently preventDefault'd. `moved` alone was false for keyboard,
    //              which is why the pre-scrolled version did not have this problem.
    let downX = 0, downY = 0, downLeft = 0, moved = false, pointered = false;

    // A finger on the strip stops it immediately, before any scroll event exists — a
    // plain boolean, not a refcount, because the release paths are no longer symmetric
    // with the press. `pointerleave` is gone: on a scroller whose content moves under a
    // stationary finger it fires unprompted, and each spurious call re-adopted `pos`.
    box.addEventListener('pointerdown', (e) => {
      down = true; moved = false; pointered = true;
      downX = e.clientX; downY = e.clientY; downLeft = box.scrollLeft;
    });
    const lift = () => { down = false; };
    box.addEventListener('pointerup', lift);
    box.addEventListener('pointercancel', lift);   // hands off to the scroll-idle gate
    // Failsafe release. A mouse gets no implicit pointer capture, so press → drag off the
    // strip → release fires neither event on `box`, `down` stays true, and step()'s gate
    // is false for the rest of the session. window sees the release wherever it lands.
    // NOT pointerleave, which is what this replaces: on a scroller whose content moves
    // under a stationary finger it fires unprompted and re-adopts `pos` each time.
    window.addEventListener('pointerup', lift);
    window.addEventListener('pointercancel', lift);

    box.addEventListener('pointermove', (e) => {
      if (!down || moved) return;
      if (Math.abs(e.clientX - downX) > 8 || Math.abs(e.clientY - downY) > 8) moved = true;
    });
    box.addEventListener('click', (e) => {
      const scrolled = Math.abs(box.scrollLeft - downLeft) > 8;
      // Only a click that a pointer actually produced can be a swallowed drag. Keyboard
      // and assistive-tech activation fall straight through to the anchor.
      if (pointered && (moved || scrolled)) { e.preventDefault(); e.stopPropagation(); }
      moved = false;
      pointered = false;
      downLeft = box.scrollLeft;
    }, true);   // capture, so it beats the anchor's own navigation

    // Nothing to animate while the section is off-screen.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((es) => {
        es.forEach(en => en.isIntersecting ? start() : stop());
      }, { rootMargin: '100px' }).observe(box);
    } else { start(); }

    const sync = () => {
      stop();
      clearTimeout(idleTimer);
      userScrolling = false;
      down = false;
      pos = 0;
      box.scrollLeft = 0;
      lastWritten = box.scrollLeft;
      if (running()) start();                 // else desktop/reduced-motion: CSS owns it again
    };
    coarse.addEventListener('change', sync);
    reduce.addEventListener('change', sync);
  });
})();

// ─── Card carousel: scroll-snap track, prev/next arrows, dot indicators ───
// Drives both the Reports and Press sections — same markup classes, two IDs.
function initCardCarousel(carouselId) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;
  const track = carousel.querySelector('.report-carousel-track');
  const cells = Array.from(carousel.querySelectorAll('.report-card-cell'));
  if (!track || cells.length < 2) return;

  const section  = carousel.closest('section');
  const prevBtn  = section && section.querySelector('.report-nav-btn[data-dir="prev"]');
  const nextBtn  = section && section.querySelector('.report-nav-btn[data-dir="next"]');
  const dotsWrap = section && section.querySelector('.report-dots');

  // Build one dot per card.
  //
  // These are pagination, not tabs. They used to carry role="tab" inside a
  // role="tablist", with no tabpanel and no aria-controls anywhere on the page — so a
  // screen reader announced "tab 1 of 4" and then had nowhere to send you. A labelled
  // group of buttons with aria-current is what this control actually is.
  //
  // The name comes from the card's own <h3> via aria-labelledby rather than a written
  // string. Two reasons: the hardcoded "Go to report N" was also announcing on the
  // Press carousel, and a written label would need its own data-zh-aria to survive the
  // language toggle. Pointing at the heading borrows a node that already swaps, so the
  // dot is named "Japanese Enterprise Patent Sell-Off Flow Report" in English and the
  // Chinese title in Chinese, with no extra i18n plumbing.
  const dots = cells.map((cell, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'report-dot';
    const title = cell.querySelector('.report-card-title[id]');
    if (title) dot.setAttribute('aria-labelledby', title.id);
    else {
      // Unreached today — every cell on both carousels has a titled <h3> — and here
      // only so a dot can never be nameless. It deliberately does NOT take
      // data-zh-aria: this file collects its i18n nodes once at init and these
      // buttons are built afterwards, so an attribute set here would never swap.
      // Read the live lang instead, and warn: landing here means a card shipped
      // without a heading, which is the actual bug to fix.
      const zh = document.documentElement.lang === 'zh-Hant';
      dot.setAttribute('aria-label', zh ? `前往第 ${i + 1} 張` : `Go to slide ${i + 1}`);
      console.warn('[carousel] cell has no .report-card-title[id]; dot fell back to a positional label', cell);
    }
    dot.addEventListener('click', () => scrollToCell(i));
    if (dotsWrap) dotsWrap.appendChild(dot);
    return dot;
  });

  const cellStep = () => {
    if (cells.length < 2) return cells[0].offsetWidth;
    return cells[1].offsetLeft - cells[0].offsetLeft; // card width + gap
  };

  const nearestIndex = () => {
    const x = track.scrollLeft;
    let best = 0, bestDist = Infinity;
    cells.forEach((cell, i) => {
      const d = Math.abs(cell.offsetLeft - track.offsetLeft - x);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  };

  const scrollToCell = (i) => {
    const idx = Math.max(0, Math.min(cells.length - 1, i));
    track.scrollTo({ left: cells[idx].offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  const sync = () => {
    const active = nearestIndex();
    // aria-current, not aria-selected: aria-selected is only meaningful on a tab,
    // option or gridcell, and these are none of those. Styling keys off the same
    // attribute (see .report-dot[aria-current="true"] in styles.css).
    dots.forEach((d, i) => {
      if (i === active) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
    const atStart = track.scrollLeft <= 2;
    const atEnd   = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    if (prevBtn) prevBtn.disabled = atStart;
    if (nextBtn) nextBtn.disabled = atEnd;
  };

  if (prevBtn) prevBtn.addEventListener('click', () => track.scrollBy({ left: -cellStep(), behavior: 'smooth' }));
  if (nextBtn) nextBtn.addEventListener('click', () => track.scrollBy({ left:  cellStep(), behavior: 'smooth' }));

  let raf = null;
  track.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = null; sync(); });
  });
  window.addEventListener('resize', sync);

  sync();
}
// Auto-init every card carousel with an id (Reports: reports-/press-carousel;
// Capital & IP: capital-focus-/capital-why-carousel; any future page too).
document.querySelectorAll('.report-carousel[id]').forEach(c => initCardCarousel(c.id));

/* ════════════════════════════════════════════════════════════════════════
   Verified License Badge — 3D idle-float + mouse-follow tilt + shine.
   At rest the pill sways gently in 3D; on hover it leans toward the cursor
   (refined ±~11°) while a specular highlight tracks the pointer. Respects
   prefers-reduced-motion (static, flat) with a live change listener.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  const stages = document.querySelectorAll('.badge-stage');
  if (!stages.length) return;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  const initStage = (stage) => {
  const card  = stage.querySelector('.badge-tilt');
  if (!card) return;
  const sheen = card.querySelector('.seal-pill-sheen');

  // Idle sway state — very subtle bounded oscillation (the at-rest "breathe").
  const rot   = { x: 1.6, y: -2.2, z: 0.5 };
  const speed = { x: 0.022, y: 0.03, z: 0.006 };
  const IDLE_LIMIT = { x: 2, y: 2.6, z: 0.8 };
  const TILT_MAX = 11; // hover cap, degrees — refined/premium

  let hovered = false;
  let raf = null;

  const apply = (scale) => {
    card.style.transform =
      `rotateX(${rot.x.toFixed(2)}deg) rotateY(${rot.y.toFixed(2)}deg) rotateZ(${rot.z.toFixed(2)}deg)` +
      (scale ? ` scale(${scale})` : '');
  };

  const idleStep = () => {
    if (hovered) { raf = null; return; }
    rot.x += speed.x; rot.y += speed.y; rot.z += speed.z;
    if (Math.abs(rot.x) > IDLE_LIMIT.x) speed.x *= -1;
    if (Math.abs(rot.y) > IDLE_LIMIT.y) speed.y *= -1;
    if (Math.abs(rot.z) > IDLE_LIMIT.z) speed.z *= -1;
    apply();
    raf = requestAnimationFrame(idleStep);
  };

  const startIdle = () => { if (!raf) raf = requestAnimationFrame(idleStep); };
  const stopIdle  = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };

  const onMove = (e) => {
    if (!hovered) return;
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);   // -1 … 1
    const dy = (e.clientY - cy) / (r.height / 2);  // -1 … 1
    rot.x = -dy * TILT_MAX;
    rot.y =  dx * TILT_MAX;
    rot.z = Math.max(-3, Math.min(3, dx * dy * 4));
    apply(1.015);
    if (sheen) {
      sheen.style.setProperty('--sx', `${((e.clientX - r.left) / r.width) * 100}%`);
      sheen.style.setProperty('--sy', `${((e.clientY - r.top) / r.height) * 100}%`);
    }
  };

  const onEnter = () => {
    if (reduceMotion.matches) return;
    hovered = true;
    stopIdle();
  };

  const onLeave = () => {
    hovered = false;
    if (sheen) { sheen.style.removeProperty('--sx'); sheen.style.removeProperty('--sy'); }
    if (reduceMotion.matches) return;
    startIdle();
  };

  const enable = () => {
    if (reduceMotion.matches) {
      stopIdle();
      hovered = false;
      card.style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
      return;
    }
    startIdle();
  };

  stage.addEventListener('mouseenter', onEnter);
  stage.addEventListener('mousemove', onMove);
  stage.addEventListener('mouseleave', onLeave);
  reduceMotion.addEventListener('change', enable);

  enable();
  };

  stages.forEach(initStage);
})();

/* ══════════════════════════════════════════════════════════════════════════
   REPORT SAMPLE OVERLAY — .sig-x* FLIP morph  (Web Animations API)

   The report cards (.offer-card[data-report]) are the triggers; each opens its
   #sig-panel-* dialog with a measure→invert→play FLIP. Shared by both Signal
   pages — product/signal/index.html (three panels) and .../methodology.html
   (two). Early-returns without #sig-xoverlay, so the other six pages skip it.

   Lived inline on the Signal page until 2026-08-27, when methodology.html
   started opening the same panels. CSS is in styles.css under the matching
   header. The load-order note at the foot is load-bearing — read it before
   moving this back inline.
   ══════════════════════════════════════════════════════════════════════════ */
(() => {
  const overlay = document.getElementById('sig-xoverlay');
  if (!overlay) return;

  /* ── THE BUG THIS BLOCK SHIPPED WITH ───────────────────────────────────────
     `pauseScroll`, `resumeScroll` and `lenis` are declared inside the main IIFE at
     the top of this file. This block is NOT inside it — it was lifted out on
     2026-08-27 so methodology.html could open the same panels — so all three were
     bare, undeclared identifiers, and every one of them threw a ReferenceError.

     open() called pauseScroll() immediately after `document.body.classList.add
     ('sig-xlock')`. So every click on a report card added the scroll lock and then
     threw, before `overlay.dataset.open = 'true'` and before `panel.hidden = false`.
     The result was a page locked at `overflow: hidden` with no dialog on screen and
     nothing to dismiss — indistinguishable from a freeze, and only a reload cleared
     it. That is the reported "See sample reports breaks the site / I have to refresh".

     The dialog has therefore not opened at all, on any device, since that refactor.
     ────────────────────────────────────────────────────────────────────────── */
  const pauseScroll  = () => { if (typeof window.__tisScrollPause  === 'function') window.__tisScrollPause();  };
  const resumeScroll = () => { if (typeof window.__tisScrollResume === 'function') window.__tisScrollResume(); };
  let lenis = null;
  (window.__tisLenis || Promise.resolve(null)).then(l => { lenis = l; }).catch(() => {});

  const backdrop = document.getElementById('sig-xbackdrop');
  const cards = [...document.querySelectorAll('.offer-card[data-report]')];
  const EASE = 'cubic-bezier(0.16,1,0.3,1)';
  let activeCard = null, activePanel = null, lastFocus = null, animating = false;
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  // A finger, not a mouse. The 440ms FLIP scales a panel holding two 1136px report
  // sheets while .sig-xbackdrop blurs the whole viewport behind it — on a phone that
  // is a full-viewport re-composite every frame, and it is what made this dialog hang.
  // Touch gets a short fade instead; the morph stays on desktop where it is affordable.
  const touch = () => matchMedia('(pointer: coarse)').matches;
  const morphs = () => !reduce() && !touch();

  // `animating` used to be cleared ONLY inside a Web Animations `onfinish`. Under the
  // load described above that callback can be missed — and close() bailed on
  // `animating`, so the X, the backdrop tap and Escape all silently did nothing while
  // the body stayed locked. A reload was the only way out. Every animation that owns
  // the flag now goes through here: it settles on finish, on cancel, or on a timer,
  // whichever comes first, and it can only settle once.
  const settle = (anim, fn, ms) => {
    let done = false;
    const run = () => { if (done) return; done = true; animating = false; fn(); };
    anim.onfinish = run;
    anim.oncancel = run;
    setTimeout(run, ms);
    return run;
  };

  // Scroll lock. `overflow: hidden` alone does not hold iOS Safari — it keeps scrolling
  // the document behind the dialog — and Lenis runs with syncTouch:false, so lenis.stop()
  // does not intercept touch either. Same position:fixed idiom as body.nav-lock, kept
  // local because that one lives in another IIFE.
  let lockedY = 0;
  const lock = () => {
    lockedY = window.scrollY || window.pageYOffset || 0;
    const sb = window.innerWidth - document.documentElement.clientWidth;
    if (sb > 0) document.body.style.paddingRight = sb + 'px';
    document.body.style.top = `-${lockedY}px`;
    document.body.classList.add('sig-xlock');
    pauseScroll();
  };
  const unlock = () => {
    if (!document.body.classList.contains('sig-xlock')) return;
    document.body.classList.remove('sig-xlock');
    document.body.style.top = '';
    document.body.style.paddingRight = '';
    // position:fixed collapsed the document while locked, so Lenis's cached limit is
    // stale and the instance is still stopped — resize, then scroll with force.
    if (lenis) { lenis.resize(); lenis.scrollTo(lockedY, { immediate:true, force:true }); }
    else { window.scrollTo({ top: lockedY, behavior:'instant' }); }
    resumeScroll();
  };
  const focusables = el => [...el.querySelectorAll('button,a[href],input,textarea,select,[tabindex]:not([tabindex="-1"])')]
    .filter(n => !n.hasAttribute('disabled') && n.offsetParent !== null);

  function open(card){
    if (animating || activePanel) return;
    const panel = document.getElementById(card.getAttribute('aria-controls'));
    if (!panel) return;
    activeCard = card; activePanel = panel; lastFocus = card;
    card.setAttribute('aria-expanded', 'true');

    lock();

    overlay.dataset.open = 'true';
    panel.hidden = false;
    backdrop.animate([{opacity:0},{opacity:1}], {duration: reduce()?120:260, easing:'ease-out', fill:'forwards'});

    if (!morphs()){
      // Reduced motion, or any touch device: fade (plus a short rise when motion is
      // allowed) instead of the FLIP. No geometry to measure, nothing to keep in sync
      // with a card that may have scrolled away underneath.
      const ms = reduce() ? 120 : 200;
      const from = reduce() ? {opacity:0} : {opacity:0, transform:'translateY(12px)'};
      const to   = reduce() ? {opacity:1} : {opacity:1, transform:'none'};
      animating = true;
      settle(panel.animate([from, to], {duration:ms, easing:'ease-out', fill:'forwards'}),
             finishOpen, ms + 400);
      return;
    }
    animating = true;
    const first = card.getBoundingClientRect();
    const last = panel.getBoundingClientRect();
    const sx = first.width / last.width, sy = first.height / last.height;
    const tx = first.left - last.left, ty = first.top - last.top;
    const a = panel.animate(
      [{ transform:`translate(${tx}px,${ty}px) scale(${sx},${sy})`, opacity:.55 },
       { transform:'translate(0,0) scale(1)', opacity:1 }],
      { duration:440, easing:EASE, fill:'both' });
    const body = panel.querySelector('.sig-xpanel__body');
    if (body) body.animate([{opacity:0, transform:'translateY(10px)'},{opacity:1, transform:'none'}],
      { duration:320, delay:130, easing:'ease-out', fill:'both' });
    settle(a, () => { a.cancel(); finishOpen(); }, 440 + 400);
  }
  function finishOpen(){
    if (!activePanel) return;
    const btn = activePanel.querySelector('.sig-xclose');
    (btn || activePanel).focus({ preventScroll:true });
  }
  function close(after){
    if (!activePanel) return;
    // NOT `|| animating`. That guard is what turned a missed onfinish into a page you
    // had to reload: every dismissal path checked it and returned. An in-flight open
    // is cancelled instead — its settle() handler clears the flag on the way out.
    activePanel.getAnimations().forEach(a => a.cancel());
    animating = false;
    const panel = activePanel, card = activeCard;
    const done = () => {
      panel.hidden = true;
      overlay.dataset.open = 'false';
      unlock();
      if (card) card.setAttribute('aria-expanded', 'false');
      panel.getAnimations().forEach(a => a.cancel());
      activeCard = activePanel = null;
      (lastFocus || card)?.focus({ preventScroll:true });
      lastFocus = null;
      // Runs after the morph has landed and the scroll lock is off — a scroll issued
      // while body.sig-xlock is still set goes nowhere.
      if (typeof after === 'function') after();
    };
    backdrop.animate([{opacity:1},{opacity:0}], {duration: reduce()?100:220, easing:'ease-in', fill:'forwards'});
    if (!morphs()){
      const ms = reduce() ? 100 : 180;
      animating = true;
      settle(panel.animate([{opacity:1},{opacity:0}], {duration:ms, easing:'ease-in', fill:'forwards'}),
             done, ms + 400);
      return;
    }
    animating = true;
    const first = panel.getBoundingClientRect();
    const target = card.getBoundingClientRect();
    const sx = target.width / first.width, sy = target.height / first.height;
    const tx = target.left - first.left, ty = target.top - first.top;
    const body = panel.querySelector('.sig-xpanel__body');
    if (body) body.getAnimations().forEach(a => a.cancel());
    const a = panel.animate(
      [{ transform:'translate(0,0) scale(1)', opacity:1 },
       { transform:`translate(${tx}px,${ty}px) scale(${sx},${sy})`, opacity:.4 }],
      { duration:360, easing:EASE, fill:'forwards' });
    settle(a, done, 360 + 400);
  }

  // The panel's CTA is a request for THAT report: land the reader in the intake form
  // with the choice already made rather than making them find and re-pick it.
  //
  // Split in two on purpose. The SELECTION happens synchronously on click, so the form
  // is correct the instant the button is pressed; only the SCROLL waits for the close
  // to finish, because a scroll issued while body.sig-xlock is still set is swallowed.
  // If the morph's finish callback were ever missed, the reader still arrives at a form
  // with the right report chosen — the failure mode is a missing scroll, not a lie
  // about what they picked.
  //
  // The gate is handled deliberately: a gated report cannot be selected while the input
  // type excludes it, so the type moves back to `granted` first. Without that, pressing
  // "Choose this report" for Snapshot or Study while the form sat on "Just an idea"
  // would appear to do nothing at all.
  function selectReport(value){
    const form = document.getElementById('intake-form');
    const radio = form && form.querySelector('input[name="report"][value="' + value + '"]');
    if (!radio) return false;
    if (radio.dataset.requires === 'granted'){
      const g = form.querySelector('input[name="input-type"][value="granted"]');
      if (g && !g.checked){ g.checked = true; g.dispatchEvent(new Event('change', { bubbles:true })); }
    }
    radio.checked = true;
    radio.dispatchEvent(new Event('change', { bubbles:true }));   // drives the deposit figure
    return radio;
  }
  function revealIntake(radio){
    const el = document.getElementById('intake');
    // Lenis reproduces the native hash-jump offset on its own (see the anchor block
    // above) and handles reduced motion itself with a hard jump cut, so there is no
    // offset and no reduce() branch here. The scrollIntoView fallback stays for when
    // the module did not load.
    if (el && lenis) lenis.scrollTo(el);
    else if (el) el.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block:'start' });
    if (radio) radio.focus({ preventScroll:true });
  }

  cards.forEach(c => c.addEventListener('click', () => open(c)));
  backdrop.addEventListener('click', () => close());
  overlay.querySelectorAll('.sig-xclose').forEach(b => b.addEventListener('click', () => close()));
  // BUTTON CTAs only. On methodology.html the panel CTA is an <a> pointing at
  // /product/signal/?report=…#intake, because that page has no intake form to fill —
  // it has to navigate. Binding this handler to it would swallow the click.
  overlay.querySelectorAll('button.sig-xcta').forEach(b => b.addEventListener('click', () => {
    const radio = selectReport(b.dataset.report);
    close(() => revealIntake(radio));
  }));
  document.addEventListener('keydown', e => {
    if (!activePanel) return;
    if (e.key === 'Escape'){ e.preventDefault(); close(); return; }
    if (e.key === 'Tab'){
      const f = focusables(activePanel);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });
  const relabel = () => overlay.querySelectorAll('.sig-xclose').forEach(b =>
    b.setAttribute('aria-label', document.documentElement.getAttribute('lang') === 'zh-Hant' ? '關閉' : 'Close'));
  relabel();
  new MutationObserver(relabel).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });

  // Arriving from methodology.html's panel CTA: /product/signal/?report=a-short#intake.
  // The browser handles the scroll to #intake; this only pre-selects the report, reusing
  // the same selectReport() the in-page CTAs call, gate handling included.
  //
  // This is the reason the block lives in site.js rather than inline on the Signal page.
  // site.js is deferred, so it runs AFTER that page's inline intake script has bound its
  // change listeners. Fired from the old inline position — above that script — the radio
  // would be checked and the deposit figure would stay on "Select a report".
  //
  // The query is then dropped from the URL: it describes an arrival, not a page state, and
  // leaving it in makes a shared or refreshed link re-assert a choice the reader may have
  // since changed.
  const wanted = new URLSearchParams(location.search).get('report');
  if (wanted && selectReport(wanted)) {
    history.replaceState(null, '', location.pathname + location.hash);
  }
})();

/* Front Desk capture posts to FRONT_DESK_ENDPOINT above. The Apps Script that
   receives it — its source, deployment steps and the trap that redeploying under
   "New deployment" mints a different /exec URL — is in
   documents/front-desk-apps-script.md. It used to sit here as a 129-line comment,
   which shipped ~6 KB of runbook to every visitor on every page. */
