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

  const animate = (el, end) => {
    if (reduced) { el.textContent = end; return; }
    const startT = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startT) / COUNT_MS, 1);
      el.textContent = Math.floor(t * end).toString();
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
    counters.forEach(el => el.textContent = el.dataset.target);
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

  // ──────────────── Contact form — demo: preventDefault + show success ────────────────
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      contactSuccess.classList.add('is-shown');
    });
  }

  // ──────────────── Footer newsletter — components.md §Footer (in-place success, 1.6s auto-reset) ────────────────
  const MKT_KEY = 'tis-mkt-drop-seen';
  const markMktSeen = () => { try { localStorage.setItem(MKT_KEY, String(Date.now())); } catch (_) {} };

  const nlBlock = document.getElementById('footer-nl-block');
  const nlForm  = document.getElementById('footer-nl-form');
  if (nlBlock && nlForm) {
    const nlInput = nlForm.querySelector('input');
    const nlLabel = nlBlock.querySelector('.footer-nl-label');
    const nlOrig  = nlLabel.textContent;
    let nlTimer = null;
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!nlInput.checkValidity() || !nlInput.value.trim()) return;
      nlBlock.classList.add('is-success');
      nlLabel.textContent = "Thanks — you're subscribed";
      // Cross-suppress the IP-intel drop popup — already engaged via footer.
      markMktSeen();
      clearTimeout(nlTimer);
      nlTimer = setTimeout(() => {
        nlBlock.classList.remove('is-success');
        nlLabel.textContent = nlOrig;
        nlInput.value = '';
      }, 1600);
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
  if (mkt && mktCard && mktForm) {
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

    function showSuccess() {
      // Drop layout-modifying class so success renders centered without the hero image.
      mktCard.classList.remove('with-hero');
      mktCard.innerHTML =
        '<button class="mkt-close" type="button" aria-label="Close" data-mkt-close>' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
        '</button>' +
        '<div class="mkt-success">' +
          '<div class="seal"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></div>' +
          '<h3>You’re on the list.</h3>' +
          '<p>The next brief lands in your inbox in roughly six weeks. Until then, watch for the early-access note when new bundles drop.</p>' +
        '</div>';
    }

    mktForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = mktForm.querySelector('input[type="email"]');
      if (!email || !email.checkValidity() || !email.value.trim()) return;
      showSuccess();
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
initCardCarousel('reports-carousel');
initCardCarousel('press-carousel');

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
   Report Card Stack — cursor-tracked specular sheen (sample-report hero).
   The splay (rest deck ↔ horizontal fan) is CSS-only (:hover / :focus-within),
   so it works with JS disabled. This block ONLY moves each card's --sx/--sy
   highlight toward the pointer while the stage is hovered. Honors
   prefers-reduced-motion and skips coarse/no-hover pointers (touch).
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  const stages = document.querySelectorAll('.rcs-stage');
  if (!stages.length) return;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer  = matchMedia('(hover: hover) and (pointer: fine)');

  const initStage = (stage) => {
    const cards  = Array.from(stage.querySelectorAll('.rcs-card'));
    if (!cards.length) return;
    const sheens = cards.map(c => c.querySelector('.rcs-sheen'));
    let hovered = false, raf = null, lastX = 0, lastY = 0;

    const paint = () => {
      raf = null;
      for (let i = 0; i < cards.length; i++) {
        const sheen = sheens[i];
        if (!sheen) continue;
        const r = cards[i].getBoundingClientRect();
        if (!r.width || !r.height) continue;
        sheen.style.setProperty('--sx', ((lastX - r.left) / r.width)  * 100 + '%');
        sheen.style.setProperty('--sy', ((lastY - r.top)  / r.height) * 100 + '%');
      }
    };
    const onMove = (e) => {
      if (!hovered) return;
      lastX = e.clientX; lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);   // one paint per frame
    };
    const onEnter = () => {
      if (reduceMotion.matches || !finePointer.matches) return;
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      sheens.forEach(s => { if (s) { s.style.removeProperty('--sx'); s.style.removeProperty('--sy'); } });
    };

    stage.addEventListener('mouseenter', onEnter);
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);

    const sync = () => { if (reduceMotion.matches || !finePointer.matches) onLeave(); };
    reduceMotion.addEventListener('change', sync);
    finePointer.addEventListener('change', sync);
  };

  stages.forEach(initStage);
})();

/* ════════════════════════════════════════════════════════════════════════
   Sample-report flyout — "View Brief / View Pro report" opens a full-screen
   viewer showing a static render of the real report, with an ungated
   Download-PDF action. Mirrors the search-modal open/close pattern
   (dataset.open + backdrop-click + Escape). Images are set on first open so
   the large PNGs never load on initial paint.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  const overlay = document.getElementById('smpl-overlay');
  const modal   = document.getElementById('smpl-modal');
  if (!overlay || !modal) return;

  const img      = document.getElementById('smpl-img');
  const dl       = document.getElementById('smpl-download');
  const titleEl  = document.getElementById('smpl-title');
  const closeBtn = document.getElementById('smpl-close');
  const triggers = document.querySelectorAll('.smpl-view[data-sample]');

  const BASE = '/assets/imagery/signal-reports/sample-';
  const LABEL = {
    brief: { en: 'Brief report — sample', zh: 'Brief 報告 — 樣本' },
    pro:   { en: 'Pro report — sample',   zh: 'Pro 報告 — 樣本' },
  };
  let lastTrigger = null;

  const open = (kind, trigger) => {
    const isZh = document.documentElement.getAttribute('lang') === 'zh-Hant';
    titleEl.textContent = (LABEL[kind] || LABEL.brief)[isZh ? 'zh' : 'en'];
    // Lazy-load: only (re)set src when the kind changes.
    const src = BASE + kind + '.png';
    if (img.getAttribute('src') !== src) { img.setAttribute('src', src); img.alt = titleEl.textContent; }
    dl.setAttribute('href', BASE + kind + '.pdf');
    dl.setAttribute('download', 'TIS-Signal-' + kind + '-sample.pdf');
    overlay.dataset.open = modal.dataset.open = 'true';
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('smpl-lock');
    lastTrigger = trigger || null;
    setTimeout(() => closeBtn.focus(), 50);
  };
  const close = () => {
    overlay.dataset.open = modal.dataset.open = 'false';
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('smpl-lock');
    const body = modal.querySelector('.smpl-modal-body'); if (body) body.scrollTop = 0;
    if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
  };

  triggers.forEach(t => t.addEventListener('click', () => open(t.dataset.sample, t)));
  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.dataset.open === 'true') close(); });
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

