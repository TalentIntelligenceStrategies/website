// ─── Universal site chrome: language, mobile drawer, search, forms, pillar tabs ───
// Note: dark mode is parked for the MVP. `[data-theme="dark"]` token blocks and
// component overrides remain in styles.css as dormant infrastructure — re-enable
// later by restoring the toggle markup + a `data-theme` setter here.
(() => {
  const root = document.documentElement;

  // ──────────────── Language ────────────────
  const langWrap = document.getElementById('lang-wrap');
  const langTrigger = document.getElementById('lang-trigger');
  const langButtons = langWrap.querySelectorAll('[data-lang-set]');

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
    // Re-render any state-driven labels that don't use data-zh (e.g. the
    // inventory teaser's filter pills, which read their values from JS state).
    if (typeof window.__inventoryTeaserRefresh === 'function') window.__inventoryTeaserRefresh();
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
  if (mProductsRow) {
    const sublistId = mProductsRow.getAttribute('aria-controls');
    const mSublist  = sublistId ? document.getElementById(sublistId) : null;
    if (mSublist) {
      mProductsRow.addEventListener('click', () => {
        const open = mProductsRow.getAttribute('aria-expanded') === 'true';
        mProductsRow.setAttribute('aria-expanded', String(!open));
        if (open) delete mSublist.dataset.open;
        else mSublist.dataset.open = 'true';
      });
    }
  }

  // ──────────────── Mobile drawer ────────────────
  const mTrigger = document.getElementById('mobile-trigger');
  const mDrawer  = document.getElementById('mobile-drawer');
  const mOverlay = document.getElementById('mobile-overlay');
  const mClose   = document.getElementById('mobile-close');
  const openDrawer  = () => { mDrawer.dataset.open = mOverlay.dataset.open = 'true'; mTrigger.setAttribute('aria-expanded','true'); };
  const closeDrawer = () => { mDrawer.dataset.open = mOverlay.dataset.open = 'false'; mTrigger.setAttribute('aria-expanded','false'); };
  mTrigger.addEventListener('click', openDrawer);
  mClose.addEventListener('click', closeDrawer);
  mOverlay.addEventListener('click', closeDrawer);
  mDrawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  // ──────────────── Search modal ────────────────
  const sTrigger = document.getElementById('search-trigger');
  const sModal   = document.getElementById('search-modal');
  const sOverlay = document.getElementById('search-overlay');
  const sInput   = document.getElementById('search-input');
  const openSearch = () => {
    sModal.dataset.open = sOverlay.dataset.open = 'true';
    sTrigger.setAttribute('aria-expanded', 'true');
    setTimeout(() => sInput.focus(), 50);
  };
  const closeSearch = () => {
    sModal.dataset.open = sOverlay.dataset.open = 'false';
    sTrigger.setAttribute('aria-expanded', 'false');
  };
  sTrigger.addEventListener('click', (e) => { e.stopPropagation(); openSearch(); });
  sOverlay.addEventListener('click', closeSearch);
  sModal.querySelectorAll('a').forEach(a => a.addEventListener('click', closeSearch));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

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
  document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.acc-item');
      const group = item.parentElement;
      const wasOpen = item.classList.contains('is-open');
      group.querySelectorAll('.acc-item').forEach(el => {
        el.classList.remove('is-open');
        const m = el.querySelector('.acc-mark');
        if (m) m.textContent = '+';
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        const m = item.querySelector('.acc-mark');
        if (m) m.textContent = '−';
      }
      // Sync sibling step-panel if this accordion has a partner visual (e.g. /product/licensing/ How it works).
      const stepKey = item.dataset.step;
      if (stepKey) {
        const howitworks = group.closest('.howitworks');
        const visual = howitworks && howitworks.querySelector('.howitworks-visual--steps');
        if (visual) {
          // If we just closed the only open item, fall back to the first panel as default.
          const activeKey = wasOpen ? (visual.querySelector('.howitworks-step-panel').dataset.step || stepKey) : stepKey;
          visual.querySelectorAll('.howitworks-step-panel').forEach(panel => {
            panel.classList.toggle('is-active', panel.dataset.step === activeKey);
          });
        }
      }
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

    const onScroll = () => {
      if (opened) return;
      const doc = document.documentElement;
      const scrolled = (doc.scrollTop || document.body.scrollTop);
      const max = (doc.scrollHeight - doc.clientHeight);
      if (max > 0 && (scrolled / max) >= SCROLL_THRESHOLD) openPopup();
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
      document.body.style.overflow = 'hidden';
      markMktSeen();
      const email = mktCard.querySelector('input[type="email"]');
      if (email) setTimeout(() => email.focus(), 50);
    }

    function closePopup() {
      mkt.classList.remove('is-open');
      mkt.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
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
      window.addEventListener('scroll', onScroll, { passive: true });
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
        .then(html => { cache.set(key, html); inflight.delete(key); return html; })
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
      landmarks().forEach(el => { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); });
      paint(doc);
      lglOverlay.dataset.open = 'true';
      lglClose.focus({ preventScroll: true });
    }

    function lglCloseFn() {
      if (lglOverlay.dataset.open !== 'true') return;
      lglOverlay.dataset.open = 'false';
      document.body.classList.remove('lgl-lock');
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
  document.querySelectorAll('.announce').forEach((bar) => {
    const key = 'tis-announce-dismissed:' + bar.dataset.announceId;
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(key) === '1'; } catch (_) {}
    if (dismissed) { bar.hidden = true; return; }

    // Rotator — cross-fade between the bar's announcement items.
    // Both items are always in the DOM and in the a11y tree, so nothing depends
    // on catching the right moment; this only drives which one is painted.
    // Skipped entirely under reduced motion, where CSS shows both side by side.
    const items = [...bar.querySelectorAll('.announce-item')];
    if (items.length > 1) {
      let i = 0, timer = null;
      const advance = () => {
        items[i].classList.remove('is-active');
        i = (i + 1) % items.length;
        items[i].classList.add('is-active');
      };
      const start = () => { if (!timer) timer = setInterval(advance, 6000); };
      const stop  = () => { clearInterval(timer); timer = null; };
      const rotating = () => !reduceMotion.matches;
      const sync = () => {
        if (rotating()) { start(); return; }
        // Not rotating (reduced motion): park on the first item, so if the
        // preference is switched back the cycle resumes from the top rather
        // than mid-swap.
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
      sync();
    }

    const close = bar.querySelector('.announce-close');
    if (!close) return;
    close.addEventListener('click', () => {
      try { sessionStorage.setItem(key, '1'); } catch (_) {}
      const done = () => { bar.hidden = true; bar.classList.remove('is-dismissing'); };
      if (reduceMotion.matches) { done(); return; }
      bar.classList.add('is-dismissing');
      bar.addEventListener('transitionend', done, { once: true });
    });
  });
})();

// ─── Patent inventory teaser ─────────────────────────────────────────
// Bordered card with ticker rows + search input + Industry / Jurisdiction /
// Tier filter dropdowns (AND logic with the search query). Each rendered
// card links to /product/licensing/lobby.html. Two modes share
// the same chrome — variant chosen by markup:
//   • Tiered (default `.v2-section`) — 3 rows, one per tier (S / A / B).
//   • Flat (`.v2-section.is-flat`)   — 2 rows, cards distributed by a
//     seeded Fisher–Yates shuffle so the random split is deterministic
//     across reloads.
// Class names (.v2-*, .v1-fb-*, .ts-*) come from the iteration sheet that
// produced this component. This IIFE sits at top level so it runs on any
// page with a `.v2-section`, not just pages that have a hero slider.
(() => {
  const teaserSection = document.querySelector('.v2-section');
  if (!teaserSection) return;

  // Seed — 37 patents spanning all 5 tiers, two jurisdictions (US/TW),
  // iPIC/NYCU/III assignees. Edit this list to swap displayed inventory.
  const SEED = [
      // Chip & semiconductor (10)
      {id:'US10142368', title:'Thin-film capacitor electrode formation on multilayer ceramic substrate', ass:'iPIC', juris:'US', ipc:'H01G 4/30',    ind:'chip',       tier:'S'},
      {id:'US10218547', title:'Low-loss high-frequency connector with shielded contact array for 5G',    ass:'NYCU', juris:'US', ipc:'H01R 13/02',   ind:'chip',       tier:'S'},
      {id:'US10456789', title:'Self-aligned contact for sub-3nm gate-all-around transistors',            ass:'NYCU', juris:'US', ipc:'H01L 21/768',  ind:'chip',       tier:'S'},
      {id:'TWI678234',  title:'Printed-circuit-board lamination with reduced thermal stress',            ass:'iPIC', juris:'TW', ipc:'H05K 3/46',    ind:'chip',       tier:'S'},
      {id:'US10456823', title:'EMI suppression layer for high-density flexible printed circuit',         ass:'iPIC', juris:'US', ipc:'H05K 9/00',    ind:'chip',       tier:'A'},
      {id:'US10567823', title:'High-density interposer for 2.5D advanced packaging',                     ass:'iPIC', juris:'US', ipc:'H01L 23/498',  ind:'chip',       tier:'A'},
      {id:'TWI734512',  title:'High-aspect-ratio etch profile control for 3D NAND flash',                ass:'NYCU', juris:'TW', ipc:'H01L 21/3065', ind:'chip',       tier:'B'},
      {id:'TWI745623',  title:'Wafer-to-wafer bonding alignment using fiducial pattern interferometry',  ass:'iPIC', juris:'TW', ipc:'H01L 21/02',   ind:'chip',       tier:'B'},
      {id:'US11098723', title:'Coplanar-waveguide-fed patch antenna with tunable dielectric',            ass:'NYCU', juris:'US', ipc:'H01Q 9/04',    ind:'chip',       tier:'C'},
      {id:'US11412678', title:'Solder-pad geometry for assembly yield at 0201 component pitch',          ass:'NYCU', juris:'US', ipc:'H05K 3/34',    ind:'chip',       tier:'D'},

      // Integrated applications (7)
      {id:'US10334528', title:'Vibration-damping bearing mount for industrial spindle assembly',         ass:'NYCU', juris:'US', ipc:'F16F 15/00',   ind:'integrated', tier:'S'},
      {id:'US10723891', title:'Wearable continuous glucose monitor with optical sensing',                ass:'NYCU', juris:'US', ipc:'A61B 5/145',   ind:'integrated', tier:'S'},
      {id:'US10487291', title:'Modular linear-motion stage with integrated load-sensing element',        ass:'III',  juris:'US', ipc:'B23Q 1/00',    ind:'integrated', tier:'A'},
      {id:'TWI723891',  title:'Microneedle patch for transdermal vaccine delivery',                      ass:'NYCU', juris:'TW', ipc:'A61M 37/00',   ind:'integrated', tier:'A'},
      {id:'TWI712456',  title:'Vibration-damped industrial bearing housing structure',                   ass:'III',  juris:'TW', ipc:'F16F 15/00',   ind:'integrated', tier:'A'},
      {id:'US11034789', title:'Wearable EEG headband with dry-contact electrodes',                       ass:'III',  juris:'US', ipc:'A61B 5/291',   ind:'integrated', tier:'B'},
      {id:'US11256812', title:'Disposable lateral-flow test with smartphone readout',                    ass:'III',  juris:'US', ipc:'G01N 33/558',  ind:'integrated', tier:'C'},

      // Net-zero & carbon (5)
      {id:'US10712389', title:'Pitch-control algorithm for variable-speed wind turbine in turbulent inflow', ass:'iPIC', juris:'US', ipc:'F03D 7/04',ind:'netzero',    tier:'S'},
      {id:'US10876543', title:'Thermal management for grid-tied photovoltaic inverter',                  ass:'NYCU', juris:'US', ipc:'H02M 1/00',    ind:'netzero',    tier:'A'},
      {id:'US10987234', title:'Modular battery-string control for utility-scale energy storage',         ass:'III',  juris:'US', ipc:'H02J 7/00',    ind:'netzero',    tier:'A'},
      {id:'US11023456', title:'Grid-forming converter with virtual-inertia control for weak grids',      ass:'iPIC', juris:'US', ipc:'H02M 7/12',    ind:'netzero',    tier:'A'},
      {id:'US11198345', title:'Yaw-bearing condition-monitoring sensor for offshore wind turbines',      ass:'NYCU', juris:'US', ipc:'F03D 17/00',   ind:'netzero',    tier:'B'},

      // Multimedia & display (5)
      {id:'US10589234', title:'Micro-LED transfer process with selective laser lift-off',                ass:'NYCU', juris:'US', ipc:'H01L 33/00',   ind:'multimedia', tier:'S'},
      {id:'US10712567', title:'Pixel-array driver IC for high-density VR microdisplays',                 ass:'III',  juris:'US', ipc:'G09G 3/32',    ind:'multimedia', tier:'A'},
      {id:'US10812789', title:'OLED stack with extended blue-emitter lifetime',                          ass:'iPIC', juris:'US', ipc:'H10K 50/11',   ind:'multimedia', tier:'A'},
      {id:'TWI812456',  title:'Micro-LED interposer with active matrix driving',                         ass:'NYCU', juris:'TW', ipc:'H01L 33/62',   ind:'multimedia', tier:'A'},
      {id:'TWI789234',  title:'Foldable OLED encapsulation with multi-layer barrier film',               ass:'III',  juris:'TW', ipc:'H10K 50/84',   ind:'multimedia', tier:'B'},

      // Networking & comms (5)
      {id:'US10678912', title:'Massive-MIMO beamforming algorithm for 5G base stations',                 ass:'III',  juris:'US', ipc:'H04B 7/06',    ind:'networking', tier:'S'},
      {id:'US11034567', title:'WiFi-7 channel-bonding scheduler for low-latency XR',                     ass:'III',  juris:'US', ipc:'H04W 28/08',   ind:'networking', tier:'A'},
      {id:'TWI856789',  title:'Multi-band antenna array for 5G smartphone integration',                  ass:'III',  juris:'TW', ipc:'H01Q 21/06',   ind:'networking', tier:'A'},
      {id:'US11145789', title:'Hybrid beamforming codebook design for mmWave 5G',                        ass:'iPIC', juris:'US', ipc:'H04B 7/06',    ind:'networking', tier:'B'},
      {id:'US11456789', title:'Reconfigurable-intelligent-surface placement optimization',               ass:'III',  juris:'US', ipc:'H04B 7/04',    ind:'networking', tier:'C'},

      // Computing & AI (5)
      {id:'US10812456', title:'On-device neural-network quantization for embedded inference',            ass:'III',  juris:'US', ipc:'G06N 3/063',   ind:'computing',  tier:'S'},
      {id:'US10923567', title:'Federated learning protocol for cross-silo healthcare data',              ass:'NYCU', juris:'US', ipc:'G06N 20/00',   ind:'computing',  tier:'A'},
      {id:'US11034678', title:'Adversarial-robustness training for vision-model deployment',             ass:'iPIC', juris:'US', ipc:'G06N 3/08',    ind:'computing',  tier:'A'},
      {id:'US11145723', title:'Memory-bandwidth-aware transformer inference scheduling',                 ass:'III',  juris:'US', ipc:'G06F 9/50',    ind:'computing',  tier:'B'},
      {id:'TWI867812',  title:'Domain-adaptation fine-tuning for industrial vision models',              ass:'III',  juris:'TW', ipc:'G06N 3/08',    ind:'computing',  tier:'B'},
    ];

    const DEST = '/product/licensing/lobby.html';
    const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

    const cardHtml = (p, dup) => {
      const tierEl  = `<span class="ts-tier ts-tier-${p.tier.toLowerCase()}">Tier ${p.tier}</span>`;
      const jurisEl = `<span class="ts-juris ts-juris-${p.juris.toLowerCase()}">${p.juris}</span>`;
      const hay     = `${p.id} ${p.title} ${p.ass} ${p.ipc} tier ${p.tier} ${p.juris} ${p.ind || ''}`.toLowerCase();
      return `<a class="ts-card" href="${DEST}" tabindex="0"`
           +   ` data-search="${esc(hay)}"`
           +   ` data-ind="${esc(p.ind || '')}"`
           +   ` data-juris="${esc(p.juris)}"`
           +   ` data-tier="${esc(p.tier)}"${dup ? ' data-dup="1"' : ''}>`
           + `<div class="ts-card-top">`
           +   `<span class="ts-pid">${esc(p.id)}</span>`
           +   `<div class="ts-chips">${tierEl}${jurisEl}</div>`
           + `</div>`
           + `<div class="ts-title">${esc(p.title)}</div>`
           + `<div class="ts-meta">${esc(p.ass)} · ${esc(p.ipc)}</div>`
           + `</a>`;
    };

    // Render a list of patents into a track. Cards are rendered twice so the
    // translateX(-50%) marquee loops seamlessly; duplicates carry data-dup="1"
    // so the unique-count math in applyFilter() divides cleanly.
    const renderInto = (trackId, list) => {
      const html = list.map(p => cardHtml(p, false)).join('') +
                   list.map(p => cardHtml(p, true)).join('');
      const track = document.getElementById(trackId);
      if (track) track.innerHTML = html;
    };

    // Two modes share the same chrome:
    //   • Tiered (default) — 3 rows, one per tier (S / A / B).
    //   • Flat (`.v2-section.is-flat`) — 2 rows, cards distributed by a
    //     seeded Fisher–Yates shuffle so the random split is deterministic
    //     across reloads.
    if (teaserSection.classList.contains('is-flat')) {
      const shuffleSeeded = (arr, seed) => {
        const a = arr.slice();
        let s = seed >>> 0;
        for (let i = a.length - 1; i > 0; i--) {
          s = (s * 1664525 + 1013904223) >>> 0;
          const j = s % (i + 1);
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };
      const shuffled = shuffleSeeded(SEED, 42);
      const half     = Math.ceil(shuffled.length / 2);
      renderInto('v2-track-flat-top',    shuffled.slice(0, half));
      renderInto('v2-track-flat-bottom', shuffled.slice(half));
    } else {
      renderInto('v2-track-s', SEED.filter(p => p.tier === 'S'));
      renderInto('v2-track-a', SEED.filter(p => p.tier === 'A'));
      renderInto('v2-track-b', SEED.filter(p => p.tier === 'B'));
    }

    // ── Search + filter wiring ──
    const input          = document.getElementById('v2-search');
    const searchClearBtn = document.getElementById('v2-search-clear');
    const filterClearBtn = document.getElementById('v2-fb-clear');
    const status         = document.getElementById('v2-search-status');
    const cards          = teaserSection.querySelectorAll('.ts-card');
    const groups         = Array.from(teaserSection.querySelectorAll('.v1-fb-group'));

    const state = { ind: '', juris: '', tier: '' };

    const SHORT_EN = {
      ind:   { '': 'All', chip: 'Chip', integrated: 'Integrated', netzero: 'Net-zero', multimedia: 'Multimedia', networking: 'Networking', computing: 'Computing' },
      juris: { '': 'All', US: 'US', TW: 'TW' },
      tier:  { '': 'All', S: 'Tier S', A: 'Tier A', B: 'Tier B', C: 'Tier C', D: 'Tier D' },
    };
    const SHORT_ZH = {
      ind:   { '': '所有', chip: '晶片', integrated: '整合應用', netzero: '淨零', multimedia: '多媒體', networking: '網路', computing: '運算' },
      juris: { '': '所有', US: '美國', TW: '台灣' },
      tier:  { '': '所有', S: 'Tier S', A: 'Tier A', B: 'Tier B', C: 'Tier C', D: 'Tier D' },
    };
    const isZh = () => (document.documentElement.getAttribute('lang') || 'en').startsWith('zh');
    const labelFor = (key, value) => (isZh() ? SHORT_ZH : SHORT_EN)[key][value] || (isZh() ? '所有' : 'All');

    const closeAllMenus = () => {
      teaserSection.querySelectorAll('.v1-fb-menu').forEach(m => { m.hidden = true; });
      teaserSection.querySelectorAll('.v1-fb-pill').forEach(p => p.setAttribute('aria-expanded', 'false'));
    };

    const renderLabels = () => {
      groups.forEach(group => {
        const pill    = group.querySelector('.v1-fb-pill');
        const valueEl = pill.querySelector('.v1-fb-value');
        const key     = group.dataset.filterKey;
        valueEl.textContent = labelFor(key, state[key]);
        pill.classList.toggle('is-active', state[key] !== '');
      });
    };

    const applyFilter = () => {
      const q         = (input.value || '').trim().toLowerCase();
      const hasQuery  = q !== '';
      const hasFilter = state.ind !== '' || state.juris !== '' || state.tier !== '';
      const hasAny    = hasQuery || hasFilter;

      teaserSection.classList.toggle('is-searching', hasAny);
      searchClearBtn.hidden   = !hasQuery;
      filterClearBtn.disabled = !hasFilter;

      let dupedMatchCount = 0;
      cards.forEach(card => {
        const haystack   = card.dataset.search || '';
        const matchQuery = !hasQuery || haystack.includes(q);
        const matchInd   = state.ind   === '' || card.dataset.ind   === state.ind;
        const matchJur   = state.juris === '' || card.dataset.juris === state.juris;
        const matchTier  = state.tier  === '' || card.dataset.tier  === state.tier;
        const isMatch    = matchQuery && matchInd && matchJur && matchTier;
        card.classList.toggle('is-match', isMatch);
        if (isMatch) dupedMatchCount++;
      });

      renderLabels();

      if (!hasAny) { status.textContent = ''; return; }
      const unique = Math.ceil(dupedMatchCount / 2); // cards render twice
      if (unique === 0)      status.textContent = isZh() ? '無符合' : 'No matches';
      else if (unique === 1) status.textContent = isZh() ? '1 件符合' : '1 match';
      else                   status.textContent = isZh() ? unique + ' 件符合' : unique + ' matches';
    };

    // Wire each dropdown
    groups.forEach(group => {
      const pill = group.querySelector('.v1-fb-pill');
      const menu = group.querySelector('.v1-fb-menu');
      const key  = group.dataset.filterKey;
      pill.addEventListener('click', e => {
        e.stopPropagation();
        const wasOpen = !menu.hidden;
        closeAllMenus();
        menu.hidden = wasOpen;
        pill.setAttribute('aria-expanded', String(!wasOpen));
      });
      menu.querySelectorAll('.v1-fb-option').forEach(opt => {
        opt.addEventListener('click', e => {
          e.stopPropagation();
          state[key] = opt.dataset.value;
          menu.querySelectorAll('.v1-fb-option').forEach(o => {
            o.setAttribute('aria-selected', o === opt ? 'true' : 'false');
          });
          closeAllMenus();
          applyFilter();
        });
      });
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.v2-section .v1-fb-group')) closeAllMenus();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeAllMenus();
    });

    filterClearBtn.addEventListener('click', () => {
      state.ind = ''; state.juris = ''; state.tier = '';
      groups.forEach(group => {
        group.querySelectorAll('.v1-fb-option').forEach(o => {
          o.setAttribute('aria-selected', o.dataset.value === '' ? 'true' : 'false');
        });
      });
      applyFilter();
    });

    input.addEventListener('input', applyFilter);
    searchClearBtn.addEventListener('click', () => {
      input.value = '';
      applyFilter();
      input.focus();
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') { input.value = ''; applyFilter(); input.blur(); }
    });

    // Pill labels are state-driven (not data-zh), so the page-wide language
    // toggle needs to re-render them after swapping the `lang` attribute.
    window.__inventoryTeaserRefresh = applyFilter;

  applyFilter(); // initialize
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
  const dots = cells.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'report-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to report ${i + 1}`);
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
    dots.forEach((d, i) => d.setAttribute('aria-selected', String(i === active)));
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

/* ════════════════════════════════════════════════════════════════════════
   Board of Directors showcase (/about/) — correlated hover/focus highlight.
   The photo grid and the name list each carry [data-member] ids. Pointing at
   or focusing any member adds .is-active to every element sharing that id and
   .is-dimmed to all the others, so the highlight mirrors across both columns.
   Event-delegated on the .board-roster container; no-ops on pages without it.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  const board = document.querySelector('.board-roster');
  if (!board) return;

  const members = Array.from(board.querySelectorAll('[data-member]'));
  if (!members.length) return;

  const setActive = (id) => {
    members.forEach((el) => {
      const match = el.dataset.member === id;
      el.classList.toggle('is-active', match);
      el.classList.toggle('is-dimmed', id !== null && !match);
    });
  };
  const clear = () => setActive(null);

  // Pointer
  board.addEventListener('pointerover', (e) => {
    const el = e.target.closest('[data-member]');
    if (el) setActive(el.dataset.member);
  });
  board.addEventListener('pointerleave', clear);

  // Keyboard focus
  board.addEventListener('focusin', (e) => {
    const el = e.target.closest('[data-member]');
    if (el) setActive(el.dataset.member);
  });
  board.addEventListener('focusout', (e) => {
    if (!board.contains(e.relatedTarget)) clear();
  });
})();

/* ════════════════════════════════════════════════════════════════════════
   Partner band sparkles — silver/white drifting + twinkling particle field
   behind the partner marquee (homepage). Vanilla canvas port of the source
   tsParticles effect. Honors prefers-reduced-motion (no canvas), pauses the
   RAF when the band is off-screen, and rebuilds the field on resize.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  const canvas = document.querySelector('.partner-band__sparkles');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  let particles = [];
  let raf = null;
  let visible = false;
  let w = 0, h = 0;

  // Build the field — count scales with the band's area (~1 per 2200px²,
  // matching the source's dense feel without overloading low-end devices).
  const build = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    w = rect.width; h = rect.height;
    if (!w || !h) return;
    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(420, Math.round((w * h) / 2200));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.4 + Math.random() * 1.1,
      baseA: 0.15 + Math.random() * 0.6,
      // twinkle
      phase: Math.random() * Math.PI * 2,
      tw: 0.6 + Math.random() * 1.8,
      // slow drift
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      // ~1 in 5 carries the silver tint, the rest pure white
      silver: Math.random() < 0.2,
    }));
  };

  const draw = (t) => {
    // Frozen while a legal dialog is open: that overlay's backdrop-filter re-blurs the
    // whole viewport for every frame anything behind it paints. Last frame stays put.
    if (document.body.classList.contains('lgl-lock')) { raf = requestAnimationFrame(draw); return; }
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x += w; else if (p.x > w) p.x -= w;
      if (p.y < 0) p.y += h; else if (p.y > h) p.y -= h;
      const a = p.baseA * (0.55 + 0.45 * Math.sin(p.phase + t * 0.001 * p.tw));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.silver
        ? `rgba(226,232,240,${a.toFixed(3)})`   // silver-luminous mid
        : `rgba(255,255,255,${a.toFixed(3)})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  };

  const start = () => {
    if (raf || reduceMotion.matches || !visible) return;
    if (!particles.length) build();
    raf = requestAnimationFrame(draw);
  };
  const stop = () => {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    ctx.clearRect(0, 0, w, h);
  };

  // Only animate while the band is on-screen.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }, { threshold: 0 }).observe(canvas);
  } else {
    visible = true;
    start();
  }

  // Rebuild on resize (debounced); keep animating if visible.
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      stop();
      build();
      start();
    }, 200);
  });

  // Live reduced-motion toggle.
  const onMotionChange = () => { reduceMotion.matches ? stop() : start(); };
  reduceMotion.addEventListener
    ? reduceMotion.addEventListener('change', onMotionChange)
    : reduceMotion.addListener(onMotionChange);
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
  const backdrop = document.getElementById('sig-xbackdrop');
  const cards = [...document.querySelectorAll('.offer-card[data-report]')];
  const EASE = 'cubic-bezier(0.16,1,0.3,1)';
  let activeCard = null, activePanel = null, lastFocus = null, animating = false;
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const focusables = el => [...el.querySelectorAll('button,a[href],input,textarea,select,[tabindex]:not([tabindex="-1"])')]
    .filter(n => !n.hasAttribute('disabled') && n.offsetParent !== null);

  function open(card){
    if (animating || activePanel) return;
    const panel = document.getElementById(card.getAttribute('aria-controls'));
    if (!panel) return;
    activeCard = card; activePanel = panel; lastFocus = card;
    card.setAttribute('aria-expanded', 'true');

    const sb = window.innerWidth - document.documentElement.clientWidth;
    if (sb > 0) document.body.style.paddingRight = sb + 'px';
    document.body.classList.add('sig-xlock');

    overlay.dataset.open = 'true';
    panel.hidden = false;
    backdrop.animate([{opacity:0},{opacity:1}], {duration: reduce()?120:260, easing:'ease-out', fill:'forwards'});

    if (reduce()){
      panel.animate([{opacity:0},{opacity:1}], {duration:120, fill:'forwards'}).onfinish = finishOpen;
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
    a.onfinish = () => { a.cancel(); animating = false; finishOpen(); };
  }
  function finishOpen(){
    if (!activePanel) return;
    const btn = activePanel.querySelector('.sig-xclose');
    (btn || activePanel).focus({ preventScroll:true });
  }
  function close(after){
    if (!activePanel || animating) return;
    const panel = activePanel, card = activeCard;
    const done = () => {
      panel.hidden = true;
      overlay.dataset.open = 'false';
      document.body.classList.remove('sig-xlock');
      document.body.style.paddingRight = '';
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
    if (reduce()){ panel.animate([{opacity:1},{opacity:0}], {duration:100, fill:'forwards'}).onfinish = done; return; }
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
    a.onfinish = () => { animating = false; done(); };
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
    document.getElementById('intake')
      ?.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block:'start' });
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

/* ══════════════════════════════════════════════════════════════════════════
   FRONT DESK — Google Apps Script backend

   Captures the contact form, the footer newsletter and the IP-drop popup into
   a Google Sheet named "TIS Front Desk", owned by contact@tisglobalinc.com.

   ── ONE-TIME SETUP (~10 min) ─────────────────────────────────────────────
   0. Sign in as contact@tisglobalinc.com in a SEPARATE Chrome profile or an
      incognito window. Google's account switcher will otherwise happily let
      you create the Sheet as contact@ but deploy as someone else, and
      "Execute as: Me" binds the endpoint to whoever clicks Deploy — forever.
   1. Open the "TIS Front Desk" Sheet. Confirm Share lists contact@ as Owner
      and nobody else. Leave the default tab alone — the tabs below are
      created automatically on first submission.
   2. Extensions -> Apps Script. Delete the stub, paste everything between the
      SCRIPT markers below. Rename the project "TIS Front Desk — Capture". Save.
   3. Deploy -> New deployment -> gear -> Web app
         Description:     v1
         Execute as:      Me (contact@tisglobalinc.com)
         Who has access:  Anyone
      "Anyone" must be literally Anyone — not "Anyone with a Google account",
      not "Anyone at Talent Intelligence Strategies". Both require the visitor
      to be signed in, so every real submission would fail.
      If "Anyone" is missing, it is Workspace policy. As an admin, check
      Admin console -> Apps -> Google Workspace -> Drive and Docs -> Sharing
      settings (external sharing must be allowed), and the Google Apps Script
      entry in the same list. Allow a few minutes to propagate.
   4. Authorize -> "Google hasn't verified this app" is expected for your own
      script: Advanced -> Go to TIS Front Desk — Capture (unsafe) -> Allow.
   5. Copy the Web app URL ending in /exec. Open it in a browser tab; it must
      return {"ok":true,"service":"tis-front-desk"}. Paste it into
      FRONT_DESK_ENDPOINT near the top of this file.

   ── EDITING THE SCRIPT LATER ─────────────────────────────────────────────
   Saving does NOT update the live endpoint. Deploy -> Manage deployments ->
   pencil -> Version: New version -> Deploy. That keeps the same /exec URL.
   Picking "New deployment" instead mints a DIFFERENT URL while the site keeps
   posting to the old one — the usual reason a fix appears to be ignored.

   ── ADDING A FORM LATER ──────────────────────────────────────────────────
   Add one entry to ROUTES and post { form: '<key>', ... } from the page. The
   tab and its header row are created on the first submission. No redeploy of
   the site, no schema migration. To send a form to a DIFFERENT spreadsheet
   (e.g. Signal), give its route a spreadsheetId and open it by ID.

   ── SECURITY ─────────────────────────────────────────────────────────────
   The /exec URL sits in this public file, so anyone can find it and POST.
   Same accepted trade-off as documents/platform-copy-review.html. The
   honeypot and validation blunt casual abuse; they don't eliminate it.
   doGet only ever returns a health check — rows are never readable.

   ─────────────────────── SCRIPT — paste from here ────────────────────────

const ROUTES = {
  contact: {
    tab: 'contact',
    headers: ['ts','name','title','email','phone','org','topic','message','source','page','lang','ua'],
  },
  newsletter: {
    tab: 'newsletter',
    headers: ['ts','email','role','industry','source','page','lang','ua'],
  },
};

const ERROR_HEADERS = ['ts','raw','error'];

// Returns the tab, creating it and seeding its header row on first use.
function tab_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Health check — paste the /exec URL into a browser to confirm the deployment.
function doGet() {
  return json_({ ok: true, service: 'tis-front-desk' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);                       // serialise concurrent appends
  try {
    const raw = (e && e.postData && e.postData.contents) || '';
    let b;
    try {
      b = JSON.parse(raw);                    // text/plain body, JSON inside
    } catch (err) {
      tab_('_errors', ERROR_HEADERS).appendRow([new Date(), raw.slice(0, 4000), 'unparseable JSON']);
      return json_({ ok: false, error: 'bad payload' });
    }

    // Honeypot tripped. Accept silently — never tell a bot it was caught.
    if (b._hp) return json_({ ok: true });

    const route = ROUTES[b.form];
    if (!route) {
      tab_('_errors', ERROR_HEADERS).appendRow([new Date(), raw.slice(0, 4000), 'unknown form: ' + b.form]);
      return json_({ ok: false, error: 'unknown form' });
    }

    b.ts = new Date();                        // server-stamped; client clocks lie
    // Map by header name, never by key order, so a missing field (e.g. an
    // unselected topic radio) leaves a blank cell instead of shifting the row.
    tab_(route.tab, route.headers)
      .appendRow(route.headers.map(function (h) { return b[h] !== undefined ? b[h] : ''; }));

    return json_({ ok: true });
  } catch (err) {
    try {
      tab_('_errors', ERROR_HEADERS).appendRow([new Date(), '', String(err)]);
    } catch (ignored) {}
    return json_({ ok: false, error: 'server error' });
  } finally {
    lock.releaseLock();
  }
}

   ──────────────────────── SCRIPT — paste to here ─────────────────────────
   ══════════════════════════════════════════════════════════════════════════ */
