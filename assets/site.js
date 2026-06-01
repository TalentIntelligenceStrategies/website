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

  // Capture each translatable element's source-of-truth EN copy on init so the swap
  // is reversible (data-zh holds the CH form; data-en is the original textContent).
  const i18nEls = document.querySelectorAll('[data-zh]');
  i18nEls.forEach(el => { el.dataset.en = el.textContent.trim(); });

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

  // ──────────────── Product pillar toggle ────────────────
  const pillarTabs = document.querySelectorAll('[data-pillar-tab]');
  const pillarPanels = document.querySelectorAll('.pillar-panel');
  const productsSection = document.getElementById('products');
  const showPillarPanel = (id) => {
    pillarPanels.forEach(p => p.classList.toggle('is-active', p.id === 'pillar-' + id));
    pillarTabs.forEach(t => t.setAttribute('aria-selected', String(t.dataset.pillarTab === id)));
    if (productsSection) productsSection.setAttribute('data-pillar', id);
  };
  pillarTabs.forEach(t => t.addEventListener('click', () => showPillarPanel(t.dataset.pillarTab)));

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

// ─── Hero pillar slider: auto-advance 6s, dots manual, pause on hover ───
(() => {
  const slider = document.getElementById('hero-slider');
  if (!slider) return;
  const hero       = slider.closest('.hero');
  const slides     = Array.from(slider.querySelectorAll('.pillar-slide'));
  const dots       = Array.from(slider.querySelectorAll('.hero-slider-dot'));
  if (slides.length < 2 || dots.length !== slides.length) return;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const INTERVAL_MS = 6000;
  let active = 0;
  let timer = null;

  const setActive = (idx) => {
    active = ((idx % slides.length) + slides.length) % slides.length;
    slides.forEach((s, i) => {
      const on = i === active;
      s.classList.toggle('is-active', on);
      if (on) { s.removeAttribute('aria-hidden'); s.removeAttribute('inert'); }
      else    { s.setAttribute('aria-hidden', 'true'); s.setAttribute('inert', ''); }
    });
    // Crossfade backdrop — set data-active-pillar on .hero so the matching
    // gradient layer fades in.
    const activePillar = slides[active] && slides[active].dataset.pillar;
    if (hero && activePillar) {
      hero.setAttribute('data-active-pillar', activePillar);
    }
    dots.forEach((d, i) => {
      d.setAttribute('aria-selected', String(i === active));
      d.setAttribute('tabindex', i === active ? '0' : '-1');
    });
    // Restart the progress-bar animation across a frame so the keyframe replays.
    slider.removeAttribute('data-running');
    if (!reduceMotion.matches) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => slider.setAttribute('data-running', 'true'));
      });
    }
  };

  const start = () => {
    stop();
    if (reduceMotion.matches) return;
    timer = setInterval(() => setActive(active + 1), INTERVAL_MS);
    slider.setAttribute('data-running', 'true');
    slider.removeAttribute('data-paused');
  };
  const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
  const pause = () => { if (!timer) return; stop(); slider.setAttribute('data-paused', 'true'); };
  const resume = () => {
    if (timer || reduceMotion.matches) return;
    slider.removeAttribute('data-paused');
    timer = setInterval(() => setActive(active + 1), INTERVAL_MS);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { setActive(i); start(); });
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); setActive(active + 1); start(); dots[active].focus(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); setActive(active - 1); start(); dots[active].focus(); }
      else if (e.key === 'Home') { e.preventDefault(); setActive(0); start(); dots[0].focus(); }
      else if (e.key === 'End') { e.preventDefault(); setActive(slides.length - 1); start(); dots[slides.length - 1].focus(); }
    });
  });

  slider.addEventListener('mouseenter', pause);
  slider.addEventListener('mouseleave', resume);
  slider.addEventListener('focusin', pause);
  slider.addEventListener('focusout', (e) => { if (!slider.contains(e.relatedTarget)) resume(); });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else if (!slider.matches(':hover') && !slider.contains(document.activeElement)) resume();
  });
  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) { stop(); slider.removeAttribute('data-running'); }
    else start();
  });

  setActive(0);
  start();

  // ──────────────── Announcement banner — per-session dismiss ────────────────
  // Keyed by data-announce-id so a NEW announcement re-shows even within the
  // same session; sessionStorage so it returns on the next visit.
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
