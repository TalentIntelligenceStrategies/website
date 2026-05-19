// ─── Universal site chrome: theme, language, mobile drawer, search, forms, pillar tabs ───
(() => {
  // ──────────────── Theme — system / light / dark ────────────────
  const root = document.documentElement;
  const themeSegs = document.querySelectorAll('[data-theme-set]');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)');

  const resolveTheme = (choice) =>
    choice === 'system' ? (prefersDark.matches ? 'dark' : 'light') : choice;

  const applyTheme = (choice) => {
    root.setAttribute('data-theme', resolveTheme(choice));
    localStorage.setItem('tis-theme', choice);
    themeSegs.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.themeSet === choice)));
  };

  const storedChoice = localStorage.getItem('tis-theme');
  const initialChoice = (storedChoice === 'system' || storedChoice === 'light' || storedChoice === 'dark')
    ? storedChoice
    : 'system';
  applyTheme(initialChoice);

  themeSegs.forEach(b => b.addEventListener('click', () => applyTheme(b.dataset.themeSet)));

  // Live-track OS preference while in System mode
  prefersDark.addEventListener('change', () => {
    if (localStorage.getItem('tis-theme') === 'system') applyTheme('system');
  });

  // ──────────────── Language ────────────────
  const langWrap = document.getElementById('lang-wrap');
  const langTrigger = document.getElementById('lang-trigger');
  const langButtons = langWrap.querySelectorAll('[data-lang-set]');

  // Capture each translatable element's source-of-truth EN copy on init so the swap
  // is reversible (data-zh holds the CH form; data-en is the original textContent).
  const i18nEls = document.querySelectorAll('[data-zh]');
  i18nEls.forEach(el => { el.dataset.en = el.textContent.trim(); });

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
  const swapText = (lang) => i18nEls.forEach(el => {
    el.textContent = lang === 'zh' ? el.dataset.zh : el.dataset.en;
  });

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
      if (pdMenu.dataset.open === 'true') pdClose();
      else pdOpen();
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
  const heroSignal = hero && hero.querySelector('#hero-signal');
  const slides     = Array.from(slider.querySelectorAll('.pillar-slide'));
  const dots       = Array.from(slider.querySelectorAll('.hero-slider-dot'));
  if (slides.length < 2 || dots.length !== slides.length) return;

  // ─── Slide 2 (Signal) backdrop — 12 metric tiles. Held as
  // a template-literal string so the browser doesn't parse them at first
  // paint; injected once when slide 2 first activates (or sooner via the
  // idle pre-warm at the bottom of this IIFE). ───
  const HERO_SIGNAL_HTML = `<div class="stage-3d"><div class="strip"><!-- Row 1 · S-tier (cohort 98.3% · rank 4/183 · PSS 62.17) -->
<div class="mt"><span class="lbl">Cohort percentile</span><div class="mid"><div class="arc"><svg viewBox="0 0 148 148" aria-hidden="true"><path class="arc-track" d="M 31.6 116.4 A 60 60 0 1 1 116.4 116.4"/><path class="arc-fill" d="M 31.6 116.4 A 60 60 0 1 1 116.4 116.4" stroke-dasharray="278 283"/></svg><span class="arc-val">98.3<small>%</small></span></div></div><span class="tier-pin s">Tier S</span></div>
<div class="mt"><span class="lbl">Rank in pool</span><div class="mid"><div class="val">4<small>/ 183</small></div><div class="hist"><svg viewBox="0 0 240 120" preserveAspectRatio="none" aria-hidden="true"><line class="baseline" x1="0" y1="112" x2="240" y2="112"/><rect class="bar" x="4" y="104" width="10" height="8"/><rect class="bar" x="17" y="96" width="10" height="16"/><rect class="bar" x="30" y="82" width="10" height="30"/><rect class="bar" x="43" y="64" width="10" height="48"/><rect class="bar" x="56" y="42" width="10" height="70"/><rect class="bar" x="69" y="22" width="10" height="90"/><rect class="bar" x="82" y="10" width="10" height="102"/><rect class="bar" x="95" y="6" width="10" height="106"/><rect class="bar" x="108" y="12" width="10" height="100"/><rect class="bar" x="121" y="26" width="10" height="86"/><rect class="bar" x="134" y="46" width="10" height="66"/><rect class="bar" x="147" y="66" width="10" height="46"/><rect class="bar" x="160" y="82" width="10" height="30"/><rect class="bar" x="173" y="90" width="10" height="22"/><rect class="bar" x="186" y="96" width="10" height="16"/><rect class="bar" x="199" y="100" width="10" height="12"/><rect class="bar is-this" x="212" y="76" width="10" height="36"/><rect class="bar" x="225" y="106" width="10" height="6"/><polygon class="marker" points="212,0 222,0 217,15"/></svg></div></div><span class="tier-pin s">Tier S</span></div>
<div class="mt"><span class="lbl">PSS score</span><div class="mid"><div class="val">62.17</div><div class="meter"><div class="bar" role="img" aria-label="PSS magnitude 62.17 of 100"><span class="tick" aria-hidden="true"></span><div class="fill" style="width:62.17%"></div></div><div class="scale"><span>0</span><span>50</span><span>100</span></div></div></div><span class="tier-pin s">Tier S</span></div>
<!-- Row 2 · A-tier (cohort 88.7% · rank 18/162 · PSS 56.12) -->
<div class="mt"><span class="lbl">Cohort percentile</span><div class="mid"><div class="arc"><svg viewBox="0 0 148 148" aria-hidden="true"><path class="arc-track" d="M 31.6 116.4 A 60 60 0 1 1 116.4 116.4"/><path class="arc-fill" d="M 31.6 116.4 A 60 60 0 1 1 116.4 116.4" stroke-dasharray="251 283"/></svg><span class="arc-val">88.7<small>%</small></span></div></div><span class="tier-pin a">Tier A</span></div>
<div class="mt"><span class="lbl">Rank in pool</span><div class="mid"><div class="val">18<small>/ 162</small></div><div class="hist"><svg viewBox="0 0 240 120" preserveAspectRatio="none" aria-hidden="true"><line class="baseline" x1="0" y1="112" x2="240" y2="112"/><rect class="bar" x="4" y="100" width="10" height="12"/><rect class="bar" x="17" y="90" width="10" height="22"/><rect class="bar" x="30" y="74" width="10" height="38"/><rect class="bar" x="43" y="54" width="10" height="58"/><rect class="bar" x="56" y="32" width="10" height="80"/><rect class="bar" x="69" y="14" width="10" height="98"/><rect class="bar" x="82" y="6" width="10" height="106"/><rect class="bar" x="95" y="10" width="10" height="102"/><rect class="bar" x="108" y="22" width="10" height="90"/><rect class="bar" x="121" y="40" width="10" height="72"/><rect class="bar" x="134" y="60" width="10" height="52"/><rect class="bar" x="147" y="78" width="10" height="34"/><rect class="bar is-this" x="160" y="68" width="10" height="44"/><rect class="bar" x="173" y="92" width="10" height="20"/><rect class="bar" x="186" y="98" width="10" height="14"/><rect class="bar" x="199" y="102" width="10" height="10"/><rect class="bar" x="212" y="104" width="10" height="8"/><rect class="bar" x="225" y="108" width="10" height="4"/><polygon class="marker" points="160,0 170,0 165,15"/></svg></div></div><span class="tier-pin a">Tier A</span></div>
<div class="mt"><span class="lbl">PSS score</span><div class="mid"><div class="val">56.12</div><div class="meter"><div class="bar" role="img" aria-label="PSS magnitude 56.12 of 100"><span class="tick" aria-hidden="true"></span><div class="fill" style="width:56.12%"></div></div><div class="scale"><span>0</span><span>50</span><span>100</span></div></div></div><span class="tier-pin a">Tier A</span></div>
<!-- Row 3 · B-tier (cohort 72.4% · rank 47/198 · PSS 47.30) -->
<div class="mt"><span class="lbl">Cohort percentile</span><div class="mid"><div class="arc"><svg viewBox="0 0 148 148" aria-hidden="true"><path class="arc-track" d="M 31.6 116.4 A 60 60 0 1 1 116.4 116.4"/><path class="arc-fill" d="M 31.6 116.4 A 60 60 0 1 1 116.4 116.4" stroke-dasharray="205 283"/></svg><span class="arc-val">72.4<small>%</small></span></div></div><span class="tier-pin b">Tier B</span></div>
<div class="mt"><span class="lbl">Rank in pool</span><div class="mid"><div class="val">47<small>/ 198</small></div><div class="hist"><svg viewBox="0 0 240 120" preserveAspectRatio="none" aria-hidden="true"><line class="baseline" x1="0" y1="112" x2="240" y2="112"/><rect class="bar" x="4" y="106" width="10" height="6"/><rect class="bar" x="17" y="98" width="10" height="14"/><rect class="bar" x="30" y="86" width="10" height="26"/><rect class="bar" x="43" y="70" width="10" height="42"/><rect class="bar" x="56" y="50" width="10" height="62"/><rect class="bar" x="69" y="28" width="10" height="84"/><rect class="bar" x="82" y="14" width="10" height="98"/><rect class="bar is-this" x="95" y="40" width="10" height="72"/><rect class="bar" x="108" y="8" width="10" height="104"/><rect class="bar" x="121" y="14" width="10" height="98"/><rect class="bar" x="134" y="30" width="10" height="82"/><rect class="bar" x="147" y="52" width="10" height="60"/><rect class="bar" x="160" y="72" width="10" height="40"/><rect class="bar" x="173" y="86" width="10" height="26"/><rect class="bar" x="186" y="94" width="10" height="18"/><rect class="bar" x="199" y="100" width="10" height="12"/><rect class="bar" x="212" y="104" width="10" height="8"/><rect class="bar" x="225" y="108" width="10" height="4"/><polygon class="marker" points="95,0 105,0 100,15"/></svg></div></div><span class="tier-pin b">Tier B</span></div>
<div class="mt"><span class="lbl">PSS score</span><div class="mid"><div class="val">47.30</div><div class="meter"><div class="bar" role="img" aria-label="PSS magnitude 47.30 of 100"><span class="tick" aria-hidden="true"></span><div class="fill" style="width:47.30%"></div></div><div class="scale"><span>0</span><span>50</span><span>100</span></div></div></div><span class="tier-pin b">Tier B</span></div>
<!-- Row 4 · C-tier (cohort 48.5% · rank 88/152 · PSS 38.74) -->
<div class="mt"><span class="lbl">Cohort percentile</span><div class="mid"><div class="arc"><svg viewBox="0 0 148 148" aria-hidden="true"><path class="arc-track" d="M 31.6 116.4 A 60 60 0 1 1 116.4 116.4"/><path class="arc-fill" d="M 31.6 116.4 A 60 60 0 1 1 116.4 116.4" stroke-dasharray="137 283"/></svg><span class="arc-val">48.5<small>%</small></span></div></div><span class="tier-pin c">Tier C</span></div>
<div class="mt"><span class="lbl">Rank in pool</span><div class="mid"><div class="val">88<small>/ 152</small></div><div class="hist"><svg viewBox="0 0 240 120" preserveAspectRatio="none" aria-hidden="true"><line class="baseline" x1="0" y1="112" x2="240" y2="112"/><rect class="bar" x="4" y="108" width="10" height="4"/><rect class="bar" x="17" y="102" width="10" height="10"/><rect class="bar" x="30" y="92" width="10" height="20"/><rect class="bar" x="43" y="78" width="10" height="34"/><rect class="bar" x="56" y="60" width="10" height="52"/><rect class="bar" x="69" y="40" width="10" height="72"/><rect class="bar" x="82" y="22" width="10" height="90"/><rect class="bar" x="95" y="10" width="10" height="102"/><rect class="bar" x="108" y="6" width="10" height="106"/><rect class="bar" x="121" y="14" width="10" height="98"/><rect class="bar is-this" x="134" y="44" width="10" height="68"/><rect class="bar" x="147" y="42" width="10" height="70"/><rect class="bar" x="160" y="62" width="10" height="50"/><rect class="bar" x="173" y="80" width="10" height="32"/><rect class="bar" x="186" y="92" width="10" height="20"/><rect class="bar" x="199" y="100" width="10" height="12"/><rect class="bar" x="212" y="106" width="10" height="6"/><rect class="bar" x="225" y="110" width="10" height="2"/><polygon class="marker" points="134,0 144,0 139,15"/></svg></div></div><span class="tier-pin c">Tier C</span></div>
<div class="mt"><span class="lbl">PSS score</span><div class="mid"><div class="val">38.74</div><div class="meter"><div class="bar" role="img" aria-label="PSS magnitude 38.74 of 100"><span class="tick" aria-hidden="true"></span><div class="fill" style="width:38.74%"></div></div><div class="scale"><span>0</span><span>50</span><span>100</span></div></div></div><span class="tier-pin c">Tier C</span></div>
</div></div>`;

  let signalMounted = false;
  const mountHeroSignal = () => {
    if (signalMounted || !heroSignal) return;
    signalMounted = true;
    heroSignal.innerHTML = HERO_SIGNAL_HTML;
  };

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
    // backdrop layer fades in. Mount hero-signal lazily on first signal.
    const activePillar = slides[active] && slides[active].dataset.pillar;
    if (hero && activePillar) {
      hero.setAttribute('data-active-pillar', activePillar);
      if (activePillar === 'signal') mountHeroSignal();
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

  // Pre-warm hero-signal during idle so a manual jump to slide 2 isn't blocked
  // on innerHTML parse + layout. Bounded by 2.5s timeout in case idle never fires.
  if ('requestIdleCallback' in window) requestIdleCallback(mountHeroSignal, { timeout: 2500 });
  else setTimeout(mountHeroSignal, 1500);

  setActive(0);
  start();
})();

// ─── Hero blueprint backdrop: 30 patent figure tiles in 3D perspective ───
(() => {
  const PATENTS = [
    { id: 'US10892431', tier: 's' },
    { id: 'TW I783922', tier: 's' },
    { id: 'US11456778', tier: 's' },
    { id: 'EP3987654',  tier: 's' },
    { id: 'US10987112', tier: 'a' },
    { id: 'TW I765444', tier: 'a' },
    { id: 'US11234556', tier: 'a' },
    { id: 'US10661220', tier: 'a' },
    { id: 'US10334221', tier: 'a' },
    { id: 'EP3812998',  tier: 'a' },
    { id: 'TW I714005', tier: 'a' },
    { id: 'US10665021', tier: 'a' },
    { id: 'TW I812445', tier: 'a' },
    { id: 'TW I798220', tier: 'b' },
    { id: 'US10421889', tier: 'b' },
    { id: 'US10772114', tier: 'b' },
    { id: 'EP3656770',  tier: 'b' },
    { id: 'TW I799015', tier: 'b' },
    { id: 'US10999241', tier: 'b' },
    { id: 'US11098334', tier: 'b' },
    { id: 'EP3422119',  tier: 'b' },
    { id: 'TW I720332', tier: 'b' },
    { id: 'US10551987', tier: 'b' },
    { id: 'US10889553', tier: 'b' },
    { id: 'US11005612', tier: 'c' },
    { id: 'EP3801559',  tier: 'c' },
    { id: 'TW I801772', tier: 'c' },
    { id: 'US10778445', tier: 'c' },
    { id: 'US11111223', tier: 'd' },
    { id: 'EP3445120',  tier: 'd' },
  ];

  const FIGS = [
    // 1. Recursive Lattice
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.1</text>
     <g transform="translate(34,26)">
       <line x1="0" y1="0" x2="120" y2="0" class="stroke-thin"/>
       <line x1="0" y1="20" x2="120" y2="20" class="stroke-thin"/>
       <line x1="0" y1="40" x2="120" y2="40" class="stroke-thin"/>
       <line x1="0" y1="60" x2="120" y2="60" class="stroke-thin"/>
       <line x1="0" y1="0" x2="0" y2="60" class="stroke-thin"/>
       <line x1="30" y1="0" x2="30" y2="60" class="stroke-thin"/>
       <line x1="60" y1="0" x2="60" y2="60" class="stroke-thin"/>
       <line x1="90" y1="0" x2="90" y2="60" class="stroke-thin"/>
       <line x1="120" y1="0" x2="120" y2="60" class="stroke-thin"/>
       <circle cx="30" cy="20" r="2" class="fill-mark"/>
       <circle cx="60" cy="0"  r="2" class="fill-mark"/>
       <circle cx="90" cy="40" r="2" class="fill-mark"/>
       <circle cx="120" cy="60" r="2" class="fill-mark"/>
       <line x1="30" y1="20" x2="60" y2="0" class="stroke-bold"/>
       <line x1="60" y1="0" x2="90" y2="40" class="stroke-bold"/>
       <line x1="90" y1="40" x2="120" y2="60" class="stroke-bold"/>
       <rect x="-6" y="-6" width="132" height="72" class="stroke-construction"/>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">1</text>`,

    // 2. Pressure Vessel
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.2</text>
     <g transform="translate(64,26)">
       <ellipse cx="35" cy="6" rx="35" ry="6" class="stroke-bold"/>
       <line x1="0" y1="6" x2="0" y2="64" class="stroke-bold"/>
       <line x1="70" y1="6" x2="70" y2="64" class="stroke-bold"/>
       <ellipse cx="35" cy="64" rx="35" ry="6" class="stroke-bold"/>
       <ellipse cx="35" cy="6" rx="35" ry="6" stroke-dasharray="1 1.5" class="stroke-construction"/>
       <circle cx="35" cy="35" r="3" class="fill-mark"/>
       <line x1="-10" y1="35" x2="0" y2="35" class="stroke-thin"/>
       <line x1="70" y1="35" x2="80" y2="35" class="stroke-thin"/>
       <rect x="-14" y="32" width="4" height="6" class="stroke-mid"/>
       <rect x="80" y="32" width="4" height="6" class="stroke-mid"/>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">2</text>`,

    // 3. Spur gear
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.3</text>
     <g transform="translate(100,60)">
       <circle cx="0" cy="0" r="32" class="stroke-bold"/>
       <circle cx="0" cy="0" r="24" class="stroke-thin"/>
       <circle cx="0" cy="0" r="6" class="stroke-mid"/>
       <circle cx="0" cy="0" r="2" class="fill-mark"/>
       ${Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;const x1=Math.cos(a)*32,y1=Math.sin(a)*32;const x2=Math.cos(a)*38,y2=Math.sin(a)*38;return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="stroke-bold"/>`;}).join('')}
       <line x1="-50" y1="0" x2="-32" y2="0" class="stroke-construction"/>
       <line x1="32" y1="0" x2="50" y2="0" class="stroke-construction"/>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">3</text>`,

    // 4. Circuit block diagram
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.4</text>
     <g transform="translate(20,30)">
       <rect x="0" y="0" width="38" height="20" class="stroke-bold"/>
       <rect x="60" y="0" width="38" height="20" class="stroke-bold"/>
       <rect x="120" y="0" width="38" height="20" class="stroke-bold"/>
       <rect x="30" y="42" width="38" height="20" class="stroke-bold"/>
       <rect x="90" y="42" width="38" height="20" class="stroke-bold"/>
       <line x1="38" y1="10" x2="60" y2="10" class="stroke-thin"/>
       <line x1="98" y1="10" x2="120" y2="10" class="stroke-thin"/>
       <line x1="19" y1="20" x2="49" y2="42" class="stroke-thin"/>
       <line x1="79" y1="20" x2="109" y2="42" class="stroke-thin"/>
       <line x1="139" y1="20" x2="109" y2="42" class="stroke-thin"/>
       <circle cx="49" cy="42" r="1.5" class="fill-mark"/>
       <circle cx="109" cy="42" r="1.5" class="fill-mark"/>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">4</text>`,

    // 5. Sine wave + harmonics
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.5</text>
     <g transform="translate(20,60)">
       <line x1="0" y1="0" x2="160" y2="0" class="stroke-thin"/>
       <line x1="0" y1="-26" x2="0" y2="26" class="stroke-thin"/>
       <path d="M 0 0 Q 10 -26 20 0 T 40 0 T 60 0 T 80 0 T 100 0 T 120 0 T 140 0 T 160 0" class="stroke-bold"/>
       <line x1="20" y1="-3" x2="20" y2="3" class="stroke-thin"/>
       <line x1="60" y1="-3" x2="60" y2="3" class="stroke-thin"/>
       <line x1="100" y1="-3" x2="100" y2="3" class="stroke-thin"/>
       <line x1="140" y1="-3" x2="140" y2="3" class="stroke-thin"/>
       <text x="20" y="10" text-anchor="middle" class="label-fade">f₀</text>
       <text x="100" y="10" text-anchor="middle" class="label-fade">2f₀</text>
       <circle cx="10" cy="-22" r="1.5" class="fill-mark"/>
       <circle cx="50" cy="22" r="1.5" class="fill-mark"/>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">5</text>`,

    // 6. Optical lens
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.6</text>
     <g transform="translate(100,60)">
       <ellipse cx="0" cy="0" rx="12" ry="34" class="stroke-bold"/>
       <line x1="-66" y1="-30" x2="-12" y2="-30" class="stroke-thin"/>
       <line x1="-12" y1="-30" x2="60" y2="0" class="stroke-thin"/>
       <line x1="-66" y1="-15" x2="-12" y2="-15" class="stroke-thin"/>
       <line x1="-12" y1="-15" x2="60" y2="0" class="stroke-thin"/>
       <line x1="-66" y1="0" x2="60" y2="0" class="stroke-mid"/>
       <line x1="-66" y1="15" x2="-12" y2="15" class="stroke-thin"/>
       <line x1="-12" y1="15" x2="60" y2="0" class="stroke-thin"/>
       <line x1="-66" y1="30" x2="-12" y2="30" class="stroke-thin"/>
       <line x1="-12" y1="30" x2="60" y2="0" class="stroke-thin"/>
       <circle cx="60" cy="0" r="2.5" class="fill-mark"/>
       <line x1="60" y1="-6" x2="60" y2="6" class="stroke-construction"/>
       <text x="62" y="-8" class="label-fade">F</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">6</text>`,

    // 7. Heat sink
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.7</text>
     <g transform="translate(40,28)">
       <rect x="0" y="58" width="120" height="10" class="stroke-bold"/>
       <rect x="2" y="14" width="6" height="44" class="stroke-bold"/>
       <rect x="18" y="14" width="6" height="44" class="stroke-bold"/>
       <rect x="34" y="14" width="6" height="44" class="stroke-bold"/>
       <rect x="50" y="14" width="6" height="44" class="stroke-bold"/>
       <rect x="66" y="14" width="6" height="44" class="stroke-bold"/>
       <rect x="82" y="14" width="6" height="44" class="stroke-bold"/>
       <rect x="98" y="14" width="6" height="44" class="stroke-bold"/>
       <rect x="114" y="14" width="6" height="44" class="stroke-bold"/>
       <line x1="-12" y1="76" x2="132" y2="76" class="stroke-construction"/>
       <path d="M 50 6 q 4 -6 8 0 q -4 4 0 8" class="stroke-thin"/>
       <path d="M 70 6 q 4 -6 8 0 q -4 4 0 8" class="stroke-thin"/>
       <text x="-8" y="68" class="label-fade">base</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">7</text>`,

    // 8. PCB meander
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.8</text>
     <g transform="translate(20,24)">
       <rect x="0" y="0" width="160" height="76" class="stroke-construction"/>
       <path d="M 8 14 H 38 V 30 H 8 V 46 H 38 V 62 H 70" class="stroke-bold"/>
       <path d="M 90 8 H 130 V 24 H 100 V 40 H 130 V 60 H 152" class="stroke-bold"/>
       <circle cx="8" cy="14" r="2.5" class="stroke-mid" fill="#FCFAF4"/>
       <circle cx="70" cy="62" r="2.5" class="stroke-mid" fill="#FCFAF4"/>
       <circle cx="90" cy="8" r="2.5" class="stroke-mid" fill="#FCFAF4"/>
       <circle cx="152" cy="60" r="2.5" class="stroke-mid" fill="#FCFAF4"/>
       <rect x="58" y="20" width="22" height="16" class="stroke-bold"/>
       <line x1="60" y1="24" x2="78" y2="24" class="stroke-thin"/>
       <line x1="60" y1="30" x2="78" y2="30" class="stroke-thin"/>
       <text x="-6" y="-2" class="label-fade">U1</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">8</text>`,

    // 9. Honeycomb cell array
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.9</text>
     <g transform="translate(100,60)">
       <polygon points="-10,0 -5,-8.66 5,-8.66 10,0 5,8.66 -5,8.66" class="stroke-bold"/>
       <polygon points="20,0 25,-8.66 35,-8.66 40,0 35,8.66 25,8.66" class="stroke-bold"/>
       <polygon points="-40,0 -35,-8.66 -25,-8.66 -20,0 -25,8.66 -35,8.66" class="stroke-bold"/>
       <polygon points="5,17.32 10,8.66 20,8.66 25,17.32 20,25.98 10,25.98" class="stroke-bold"/>
       <polygon points="-25,17.32 -20,8.66 -10,8.66 -5,17.32 -10,25.98 -20,25.98" class="stroke-bold"/>
       <polygon points="5,-17.32 10,-25.98 20,-25.98 25,-17.32 20,-8.66 10,-8.66" class="stroke-bold"/>
       <polygon points="-25,-17.32 -20,-25.98 -10,-25.98 -5,-17.32 -10,-8.66 -20,-8.66" class="stroke-bold"/>
       <circle cx="0" cy="0" r="2" class="fill-mark"/>
       <circle cx="-30" cy="17.32" r="1.5" class="fill-mark"/>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">9</text>`,

    // 10. Horn antenna
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.10</text>
     <g transform="translate(40,60)">
       <rect x="0" y="-8" width="30" height="16" class="stroke-bold"/>
       <line x1="30" y1="-8" x2="110" y2="-30" class="stroke-bold"/>
       <line x1="30" y1="8" x2="110" y2="30" class="stroke-bold"/>
       <line x1="110" y1="-30" x2="110" y2="30" class="stroke-bold"/>
       <line x1="0" y1="0" x2="-12" y2="0" class="stroke-mid"/>
       <line x1="-12" y1="-3" x2="-12" y2="3" class="stroke-mid"/>
       <path d="M 110 -10 q 14 0 20 -10" class="stroke-thin"/>
       <path d="M 110 0 q 18 0 24 -2" class="stroke-thin"/>
       <path d="M 110 10 q 14 0 20 10" class="stroke-thin"/>
       <text x="14" y="-12" class="label-fade">WG</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">10</text>`,

    // 11. Helical coil / inductor
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.11</text>
     <g transform="translate(40,60)">
       <line x1="0" y1="0" x2="14" y2="0" class="stroke-bold"/>
       <ellipse cx="22" cy="0" rx="8" ry="14" class="stroke-bold"/>
       <ellipse cx="38" cy="0" rx="8" ry="14" class="stroke-bold"/>
       <ellipse cx="54" cy="0" rx="8" ry="14" class="stroke-bold"/>
       <ellipse cx="70" cy="0" rx="8" ry="14" class="stroke-bold"/>
       <ellipse cx="86" cy="0" rx="8" ry="14" class="stroke-bold"/>
       <ellipse cx="102" cy="0" rx="8" ry="14" class="stroke-bold"/>
       <line x1="110" y1="0" x2="124" y2="0" class="stroke-bold"/>
       <line x1="14" y1="-14" x2="110" y2="-14" class="stroke-construction"/>
       <line x1="14" y1="14" x2="110" y2="14" class="stroke-construction"/>
       <circle cx="0" cy="0" r="2" class="fill-mark"/>
       <circle cx="124" cy="0" r="2" class="fill-mark"/>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">11</text>`,

    // 12. MEMS cantilever
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.12</text>
     <g transform="translate(28,40)">
       <rect x="0" y="0" width="14" height="40" class="stroke-bold"/>
       <line x1="-2" y1="40" x2="16" y2="40" class="stroke-thin"/>
       <line x1="-2" y1="42" x2="0" y2="44" class="stroke-thin"/>
       <line x1="2" y1="42" x2="4" y2="44" class="stroke-thin"/>
       <line x1="6" y1="42" x2="8" y2="44" class="stroke-thin"/>
       <line x1="10" y1="42" x2="12" y2="44" class="stroke-thin"/>
       <line x1="14" y1="42" x2="16" y2="44" class="stroke-thin"/>
       <rect x="14" y="14" width="100" height="6" class="stroke-bold"/>
       <path d="M 14 17 q 50 22 100 0" class="stroke-construction"/>
       <rect x="60" y="32" width="40" height="6" class="stroke-mid"/>
       <line x1="80" y1="20" x2="80" y2="32" class="stroke-construction"/>
       <text x="120" y="20" class="label-fade">beam</text>
       <text x="120" y="38" class="label-fade">elec</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">12</text>`,

    // 13. Microfluidic Y-junction
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.13</text>
     <g transform="translate(30,32)">
       <circle cx="0" cy="6" r="6" class="stroke-bold"/>
       <circle cx="0" cy="50" r="6" class="stroke-bold"/>
       <line x1="6" y1="6" x2="60" y2="28" class="stroke-bold"/>
       <line x1="6" y1="50" x2="60" y2="28" class="stroke-bold"/>
       <line x1="6" y1="10" x2="56" y2="30" class="stroke-thin"/>
       <line x1="6" y1="46" x2="56" y2="26" class="stroke-thin"/>
       <line x1="60" y1="28" x2="120" y2="28" class="stroke-bold"/>
       <line x1="60" y1="32" x2="120" y2="32" class="stroke-bold"/>
       <rect x="120" y="20" width="20" height="20" class="stroke-bold"/>
       <circle cx="130" cy="30" r="2" class="fill-mark"/>
       <text x="-10" y="6" class="label-fade">A</text>
       <text x="-10" y="52" class="label-fade">B</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">13</text>`,

    // 14. Semiconductor stack
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.14</text>
     <g transform="translate(30,24)">
       <rect x="0" y="0" width="120" height="10" class="stroke-bold"/>
       <rect x="0" y="14" width="120" height="10" class="stroke-thin"/>
       <rect x="0" y="28" width="120" height="10" class="stroke-bold"/>
       <rect x="0" y="42" width="120" height="10" class="stroke-thin"/>
       <rect x="0" y="56" width="120" height="14" class="stroke-bold"/>
       <line x1="124" y1="5" x2="140" y2="5" class="stroke-construction"/>
       <line x1="124" y1="19" x2="140" y2="19" class="stroke-construction"/>
       <line x1="124" y1="33" x2="140" y2="33" class="stroke-construction"/>
       <line x1="124" y1="47" x2="140" y2="47" class="stroke-construction"/>
       <line x1="124" y1="63" x2="140" y2="63" class="stroke-construction"/>
       <text x="142" y="7" class="label-fade">M1</text>
       <text x="142" y="21" class="label-fade">D</text>
       <text x="142" y="35" class="label-fade">M2</text>
       <text x="142" y="49" class="label-fade">D</text>
       <text x="142" y="65" class="label-fade">SUB</text>
       <rect x="40" y="-6" width="8" height="6" class="stroke-bold"/>
       <rect x="80" y="-6" width="8" height="6" class="stroke-bold"/>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">14</text>`,

    // 15. Ball bearing
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.15</text>
     <g transform="translate(100,60)">
       <circle cx="0" cy="0" r="36" class="stroke-bold"/>
       <circle cx="0" cy="0" r="30" class="stroke-thin"/>
       <circle cx="0" cy="0" r="14" class="stroke-thin"/>
       <circle cx="0" cy="0" r="8" class="stroke-bold"/>
       <circle cx="0" cy="0" r="3" class="fill-mark"/>
       ${Array.from({length:8},(_,i)=>{const a=i*45*Math.PI/180;const x=Math.cos(a)*22,y=Math.sin(a)*22;return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" class="stroke-mid" fill="#FCFAF4"/>`;}).join('')}
       <line x1="-50" y1="0" x2="-36" y2="0" class="stroke-construction"/>
       <line x1="36" y1="0" x2="50" y2="0" class="stroke-construction"/>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">15</text>`,

    // 16. Truss frame
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.16</text>
     <g transform="translate(20,40)">
       <line x1="0" y1="0" x2="160" y2="0" class="stroke-bold"/>
       <line x1="0" y1="40" x2="160" y2="40" class="stroke-bold"/>
       <line x1="0" y1="0" x2="0" y2="40" class="stroke-bold"/>
       <line x1="40" y1="0" x2="40" y2="40" class="stroke-bold"/>
       <line x1="80" y1="0" x2="80" y2="40" class="stroke-bold"/>
       <line x1="120" y1="0" x2="120" y2="40" class="stroke-bold"/>
       <line x1="160" y1="0" x2="160" y2="40" class="stroke-bold"/>
       <line x1="0" y1="40" x2="40" y2="0" class="stroke-thin"/>
       <line x1="40" y1="40" x2="80" y2="0" class="stroke-thin"/>
       <line x1="120" y1="40" x2="80" y2="0" class="stroke-thin"/>
       <line x1="160" y1="40" x2="120" y2="0" class="stroke-thin"/>
       <polygon points="-6,46 6,46 0,40" class="stroke-mid" fill="#FCFAF4"/>
       <polygon points="154,46 166,46 160,40" class="stroke-mid" fill="#FCFAF4"/>
       <line x1="-12" y1="46" x2="172" y2="46" class="stroke-construction"/>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">16</text>`,

    // 17. State machine
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.17</text>
     <g transform="translate(30,30)">
       <circle cx="20" cy="20" r="14" class="stroke-bold"/>
       <circle cx="80" cy="20" r="14" class="stroke-bold"/>
       <circle cx="50" cy="60" r="14" class="stroke-bold"/>
       <text x="20" y="22" text-anchor="middle">S1</text>
       <text x="80" y="22" text-anchor="middle">S2</text>
       <text x="50" y="62" text-anchor="middle">S3</text>
       <line x1="34" y1="20" x2="66" y2="20" class="stroke-thin"/>
       <polygon points="66,20 62,18 62,22" class="fill-mark"/>
       <line x1="74" y1="32" x2="58" y2="48" class="stroke-thin"/>
       <polygon points="58,48 62,46 60,50" class="fill-mark"/>
       <line x1="42" y1="48" x2="26" y2="32" class="stroke-thin"/>
       <polygon points="26,32 30,32 28,36" class="fill-mark"/>
       <path d="M 80 6 q 14 -10 14 6" class="stroke-thin"/>
       <polygon points="94,12 90,14 92,18" class="fill-mark"/>
       <line x1="-6" y1="20" x2="6" y2="20" class="stroke-mid"/>
       <polygon points="6,20 4,18 4,22" class="fill-mark"/>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">17</text>`,

    // 18. Cam profile
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.18</text>
     <g transform="translate(70,60)">
       <path d="M 0 -22 C 16 -22 22 -10 22 0 C 22 14 14 22 0 22 C -16 22 -22 12 -22 0 C -22 -14 -16 -22 0 -22 Z" class="stroke-bold"/>
       <circle cx="0" cy="0" r="4" class="stroke-mid"/>
       <circle cx="0" cy="0" r="1.5" class="fill-mark"/>
       <line x1="-8" y1="0" x2="-32" y2="0" class="stroke-construction"/>
       <line x1="8" y1="0" x2="32" y2="0" class="stroke-construction"/>
       <rect x="40" y="-6" width="14" height="12" class="stroke-bold"/>
       <line x1="22" y1="-2" x2="40" y2="-2" class="stroke-mid"/>
       <line x1="22" y1="2" x2="40" y2="2" class="stroke-mid"/>
       <rect x="50" y="-22" width="10" height="20" class="stroke-thin"/>
       <line x1="55" y1="-22" x2="55" y2="-32" class="stroke-construction"/>
       <text x="60" y="-26" class="label-fade">F</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">18</text>`,

    // 19. Pulley + belt drive
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.19</text>
     <g transform="translate(40,60)">
       <circle cx="0" cy="0" r="20" class="stroke-bold"/>
       <circle cx="0" cy="0" r="3" class="fill-mark"/>
       <circle cx="100" cy="0" r="14" class="stroke-bold"/>
       <circle cx="100" cy="0" r="2" class="fill-mark"/>
       <line x1="0" y1="-20" x2="100" y2="-14" class="stroke-bold"/>
       <line x1="0" y1="20" x2="100" y2="14" class="stroke-bold"/>
       <line x1="-20" y1="-2" x2="-20" y2="2" class="stroke-thin"/>
       <line x1="20" y1="-2" x2="20" y2="2" class="stroke-thin"/>
       <line x1="-26" y1="0" x2="-22" y2="0" class="stroke-construction"/>
       <line x1="22" y1="0" x2="26" y2="0" class="stroke-construction"/>
       <text x="0" y="32" text-anchor="middle" class="label-fade">D1</text>
       <text x="100" y="28" text-anchor="middle" class="label-fade">D2</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">19</text>`,

    // 20. Heat exchanger
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.20</text>
     <g transform="translate(20,32)">
       <rect x="0" y="0" width="160" height="50" class="stroke-bold" rx="4"/>
       <line x1="10" y1="12" x2="150" y2="12" class="stroke-thin"/>
       <line x1="10" y1="20" x2="150" y2="20" class="stroke-thin"/>
       <line x1="10" y1="30" x2="150" y2="30" class="stroke-thin"/>
       <line x1="10" y1="38" x2="150" y2="38" class="stroke-thin"/>
       <line x1="-12" y1="6" x2="0" y2="6" class="stroke-bold"/>
       <line x1="160" y1="44" x2="172" y2="44" class="stroke-bold"/>
       <line x1="40" y1="-10" x2="40" y2="0" class="stroke-mid"/>
       <line x1="120" y1="50" x2="120" y2="60" class="stroke-mid"/>
       <polygon points="40,0 38,-4 42,-4" class="fill-mark"/>
       <polygon points="120,60 118,56 122,56" class="fill-mark"/>
       <text x="-12" y="2" class="label-fade">in</text>
       <text x="170" y="40" class="label-fade">out</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">20</text>`,

    // 21. Cyclone separator
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.21</text>
     <g transform="translate(70,18)">
       <line x1="0" y1="0" x2="60" y2="0" class="stroke-bold"/>
       <line x1="0" y1="0" x2="0" y2="40" class="stroke-bold"/>
       <line x1="60" y1="0" x2="60" y2="40" class="stroke-bold"/>
       <line x1="0" y1="40" x2="30" y2="80" class="stroke-bold"/>
       <line x1="60" y1="40" x2="30" y2="80" class="stroke-bold"/>
       <line x1="-20" y1="6" x2="0" y2="6" class="stroke-mid"/>
       <polygon points="0,6 -2,4 -2,8" class="fill-mark"/>
       <line x1="30" y1="-12" x2="30" y2="0" class="stroke-mid"/>
       <polygon points="30,-12 28,-8 32,-8" class="fill-mark"/>
       <line x1="30" y1="80" x2="30" y2="92" class="stroke-mid"/>
       <polygon points="30,92 28,88 32,88" class="fill-mark"/>
       <path d="M 30 12 q 16 8 0 16 q -16 -8 0 -16" class="stroke-construction"/>
       <path d="M 30 32 q 12 6 0 12 q -12 -6 0 -12" class="stroke-construction"/>
       <path d="M 30 50 q 8 4 0 8 q -8 -4 0 -8" class="stroke-construction"/>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">21</text>`,

    // 22. T-junction valve
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.22</text>
     <g transform="translate(20,44)">
       <line x1="0" y1="14" x2="60" y2="14" class="stroke-bold"/>
       <line x1="0" y1="24" x2="60" y2="24" class="stroke-bold"/>
       <line x1="100" y1="14" x2="160" y2="14" class="stroke-bold"/>
       <line x1="100" y1="24" x2="160" y2="24" class="stroke-bold"/>
       <line x1="65" y1="0" x2="65" y2="38" class="stroke-bold"/>
       <line x1="95" y1="0" x2="95" y2="38" class="stroke-bold"/>
       <polygon points="60,8 80,19 60,30" class="stroke-bold" fill="#FCFAF4"/>
       <polygon points="100,8 80,19 100,30" class="stroke-bold" fill="#FCFAF4"/>
       <line x1="80" y1="19" x2="80" y2="-10" class="stroke-mid"/>
       <circle cx="80" cy="-12" r="4" class="stroke-bold"/>
       <line x1="76" y1="-14" x2="84" y2="-10" class="stroke-thin"/>
       <text x="-6" y="20" class="label-fade">in</text>
       <text x="164" y="20" class="label-fade">out</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">22</text>`,

    // 23. Hydraulic cylinder
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.23</text>
     <g transform="translate(20,40)">
       <rect x="0" y="0" width="100" height="40" class="stroke-bold"/>
       <line x1="0" y1="6" x2="100" y2="6" class="stroke-thin"/>
       <line x1="0" y1="34" x2="100" y2="34" class="stroke-thin"/>
       <rect x="40" y="0" width="14" height="40" class="stroke-bold"/>
       <line x1="54" y1="20" x2="160" y2="20" class="stroke-bold"/>
       <line x1="54" y1="22" x2="160" y2="22" class="stroke-bold"/>
       <rect x="160" y="14" width="6" height="14" class="stroke-bold"/>
       <line x1="-10" y1="14" x2="0" y2="14" class="stroke-mid"/>
       <polygon points="0,14 -2,12 -2,16" class="fill-mark"/>
       <line x1="-10" y1="28" x2="0" y2="28" class="stroke-mid"/>
       <polygon points="-10,28 -8,26 -8,30" class="fill-mark"/>
       <text x="-6" y="6" class="label-fade">A</text>
       <text x="-6" y="40" class="label-fade">B</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">23</text>`,

    // 24. Solar cell
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.24</text>
     <g transform="translate(28,28)">
       <rect x="0" y="0" width="140" height="64" class="stroke-bold"/>
       <line x1="0" y1="20" x2="140" y2="20" class="stroke-mid"/>
       <line x1="0" y1="44" x2="140" y2="44" class="stroke-mid"/>
       <line x1="6" y1="0" x2="6" y2="64" class="stroke-thin"/>
       <line x1="20" y1="0" x2="20" y2="64" class="stroke-thin"/>
       <line x1="34" y1="0" x2="34" y2="64" class="stroke-thin"/>
       <line x1="48" y1="0" x2="48" y2="64" class="stroke-thin"/>
       <line x1="62" y1="0" x2="62" y2="64" class="stroke-thin"/>
       <line x1="76" y1="0" x2="76" y2="64" class="stroke-thin"/>
       <line x1="90" y1="0" x2="90" y2="64" class="stroke-thin"/>
       <line x1="104" y1="0" x2="104" y2="64" class="stroke-thin"/>
       <line x1="118" y1="0" x2="118" y2="64" class="stroke-thin"/>
       <line x1="132" y1="0" x2="132" y2="64" class="stroke-thin"/>
       <polygon points="68,-12 76,-4 60,-4" class="fill-mark"/>
       <polygon points="80,-12 88,-4 72,-4" class="fill-mark"/>
       <text x="146" y="22" class="label-fade">+</text>
       <text x="146" y="46" class="label-fade">−</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">24</text>`,

    // 25. DNA double helix
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.25</text>
     <g transform="translate(70,18)">
       <path d="M 0 0 Q 40 20 0 40 Q -40 60 0 80" class="stroke-bold"/>
       <path d="M 0 0 Q -40 20 0 40 Q 40 60 0 80" class="stroke-bold"/>
       <line x1="-12" y1="6" x2="12" y2="6" class="stroke-thin"/>
       <line x1="-22" y1="14" x2="22" y2="14" class="stroke-thin"/>
       <line x1="-22" y1="22" x2="22" y2="22" class="stroke-thin"/>
       <line x1="-12" y1="30" x2="12" y2="30" class="stroke-thin"/>
       <line x1="-12" y1="46" x2="12" y2="46" class="stroke-thin"/>
       <line x1="-22" y1="54" x2="22" y2="54" class="stroke-thin"/>
       <line x1="-22" y1="62" x2="22" y2="62" class="stroke-thin"/>
       <line x1="-12" y1="70" x2="12" y2="70" class="stroke-thin"/>
       <circle cx="0" cy="0" r="2" class="fill-mark"/>
       <circle cx="0" cy="40" r="2" class="fill-mark"/>
       <circle cx="0" cy="80" r="2" class="fill-mark"/>
       <text x="32" y="22" class="label-fade">A·T</text>
       <text x="32" y="62" class="label-fade">G·C</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">25</text>`,

    // 26. Logic gates
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.26</text>
     <g transform="translate(20,40)">
       <path d="M 0 0 H 20 A 12 12 0 0 1 20 24 H 0 Z" class="stroke-bold"/>
       <line x1="-8" y1="6" x2="0" y2="6" class="stroke-thin"/>
       <line x1="-8" y1="18" x2="0" y2="18" class="stroke-thin"/>
       <line x1="32" y1="12" x2="48" y2="12" class="stroke-thin"/>
       <text x="10" y="40" text-anchor="middle" class="label-fade">AND</text>
       <path d="M 50 0 Q 60 12 50 24 Q 64 24 78 12 Q 64 0 50 0 Z" class="stroke-bold"/>
       <line x1="48" y1="6" x2="55" y2="6" class="stroke-thin"/>
       <line x1="48" y1="18" x2="55" y2="18" class="stroke-thin"/>
       <line x1="78" y1="12" x2="94" y2="12" class="stroke-thin"/>
       <text x="62" y="40" text-anchor="middle" class="label-fade">OR</text>
       <polygon points="98,2 98,22 116,12" class="stroke-bold" fill="#FCFAF4"/>
       <circle cx="119" cy="12" r="2" class="stroke-bold" fill="#FCFAF4"/>
       <line x1="94" y1="12" x2="98" y2="12" class="stroke-thin"/>
       <line x1="121" y1="12" x2="140" y2="12" class="stroke-thin"/>
       <text x="108" y="40" text-anchor="middle" class="label-fade">NOT</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">26</text>`,

    // 27. Robot arm
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.27</text>
     <g transform="translate(34,90)">
       <rect x="-10" y="0" width="20" height="6" class="stroke-bold"/>
       <line x1="-14" y1="6" x2="14" y2="6" class="stroke-thin"/>
       <line x1="-14" y1="8" x2="-12" y2="10" class="stroke-thin"/>
       <line x1="-10" y1="8" x2="-8" y2="10" class="stroke-thin"/>
       <line x1="-6" y1="8" x2="-4" y2="10" class="stroke-thin"/>
       <line x1="-2" y1="8" x2="0" y2="10" class="stroke-thin"/>
       <line x1="2" y1="8" x2="4" y2="10" class="stroke-thin"/>
       <line x1="6" y1="8" x2="8" y2="10" class="stroke-thin"/>
       <line x1="10" y1="8" x2="12" y2="10" class="stroke-thin"/>
       <circle cx="0" cy="0" r="4" class="stroke-bold" fill="#FCFAF4"/>
       <circle cx="0" cy="0" r="1.5" class="fill-mark"/>
       <line x1="0" y1="0" x2="36" y2="-30" class="stroke-bold"/>
       <line x1="2" y1="-2" x2="38" y2="-32" class="stroke-bold"/>
       <circle cx="36" cy="-30" r="4" class="stroke-bold" fill="#FCFAF4"/>
       <circle cx="36" cy="-30" r="1.5" class="fill-mark"/>
       <line x1="36" y1="-30" x2="80" y2="-44" class="stroke-bold"/>
       <line x1="38" y1="-32" x2="82" y2="-46" class="stroke-bold"/>
       <circle cx="80" cy="-44" r="4" class="stroke-bold" fill="#FCFAF4"/>
       <circle cx="80" cy="-44" r="1.5" class="fill-mark"/>
       <line x1="80" y1="-44" x2="110" y2="-30" class="stroke-bold"/>
       <rect x="106" y="-34" width="10" height="8" class="stroke-bold"/>
       <line x1="116" y1="-30" x2="120" y2="-34" class="stroke-thin"/>
       <line x1="116" y1="-28" x2="120" y2="-24" class="stroke-thin"/>
       <path d="M 0 -8 a 8 8 0 0 1 8 -4" class="stroke-construction"/>
       <text x="14" y="-12" class="label-fade">θ₁</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">27</text>`,

    // 28. Spring-mass-damper
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.28</text>
     <g transform="translate(20,28)">
       <line x1="0" y1="0" x2="140" y2="0" class="stroke-bold"/>
       <line x1="0" y1="2" x2="2" y2="6" class="stroke-thin"/>
       <line x1="6" y1="2" x2="8" y2="6" class="stroke-thin"/>
       <line x1="12" y1="2" x2="14" y2="6" class="stroke-thin"/>
       <line x1="18" y1="2" x2="20" y2="6" class="stroke-thin"/>
       <line x1="24" y1="2" x2="26" y2="6" class="stroke-thin"/>
       <line x1="30" y1="2" x2="32" y2="6" class="stroke-thin"/>
       <line x1="36" y1="2" x2="38" y2="6" class="stroke-thin"/>
       <line x1="42" y1="2" x2="44" y2="6" class="stroke-thin"/>
       <line x1="60" y1="2" x2="62" y2="6" class="stroke-thin"/>
       <line x1="66" y1="2" x2="68" y2="6" class="stroke-thin"/>
       <line x1="72" y1="2" x2="74" y2="6" class="stroke-thin"/>
       <line x1="78" y1="2" x2="80" y2="6" class="stroke-thin"/>
       <line x1="84" y1="2" x2="86" y2="6" class="stroke-thin"/>
       <path d="M 4 30 L 8 22 L 14 38 L 20 22 L 26 38 L 32 22 L 38 38 L 44 30" class="stroke-bold"/>
       <line x1="4" y1="30" x2="0" y2="30" class="stroke-bold"/>
       <line x1="44" y1="30" x2="84" y2="30" class="stroke-bold"/>
       <rect x="60" y="22" width="20" height="16" class="stroke-bold"/>
       <line x1="70" y1="22" x2="70" y2="38" class="stroke-thin"/>
       <line x1="0" y1="6" x2="84" y2="6" class="stroke-thin"/>
       <rect x="84" y="14" width="44" height="32" class="stroke-bold"/>
       <text x="106" y="34" text-anchor="middle">m</text>
       <line x1="106" y1="46" x2="106" y2="58" class="stroke-mid"/>
       <polygon points="106,58 104,54 108,54" class="fill-mark"/>
       <text x="112" y="58" class="label-fade">x</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">28</text>`,

    // 29. Diaphragm pump
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.29</text>
     <g transform="translate(30,32)">
       <rect x="20" y="20" width="80" height="40" class="stroke-bold"/>
       <path d="M 20 30 q 40 -10 80 0" class="stroke-bold"/>
       <line x1="60" y1="20" x2="60" y2="0" class="stroke-mid"/>
       <rect x="56" y="-8" width="8" height="10" class="stroke-bold"/>
       <line x1="56" y1="-12" x2="64" y2="-4" class="stroke-thin"/>
       <line x1="0" y1="40" x2="20" y2="40" class="stroke-bold"/>
       <line x1="0" y1="48" x2="20" y2="48" class="stroke-bold"/>
       <polygon points="10,40 14,44 6,44" class="stroke-mid" fill="#FCFAF4"/>
       <line x1="100" y1="40" x2="120" y2="40" class="stroke-bold"/>
       <line x1="100" y1="48" x2="120" y2="48" class="stroke-bold"/>
       <polygon points="110,48 114,44 106,44" class="stroke-mid" fill="#FCFAF4"/>
       <line x1="-12" y1="44" x2="0" y2="44" class="stroke-thin"/>
       <polygon points="0,44 -2,42 -2,46" class="fill-mark"/>
       <line x1="120" y1="44" x2="132" y2="44" class="stroke-thin"/>
       <polygon points="132,44 130,42 130,46" class="fill-mark"/>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">29</text>`,

    // 30. Fresnel lens
    `<rect x="6" y="6" width="188" height="108" class="stroke-thin"/>
     <text x="170" y="13" class="label-fade">FIG.30</text>
     <g transform="translate(80,60)">
       <circle cx="0" cy="0" r="4" class="stroke-bold"/>
       <circle cx="0" cy="0" r="10" class="stroke-bold"/>
       <circle cx="0" cy="0" r="16" class="stroke-bold"/>
       <circle cx="0" cy="0" r="22" class="stroke-bold"/>
       <circle cx="0" cy="0" r="28" class="stroke-bold"/>
       <circle cx="0" cy="0" r="34" class="stroke-bold"/>
       <circle cx="0" cy="0" r="40" class="stroke-thin"/>
       <line x1="-50" y1="0" x2="50" y2="0" class="stroke-construction"/>
       <line x1="0" y1="-50" x2="0" y2="50" class="stroke-construction"/>
       <line x1="40" y1="0" x2="78" y2="-18" class="stroke-thin"/>
       <line x1="40" y1="0" x2="78" y2="0" class="stroke-mid"/>
       <line x1="40" y1="0" x2="78" y2="18" class="stroke-thin"/>
       <circle cx="0" cy="0" r="1.5" class="fill-mark"/>
       <text x="80" y="-20" class="label-fade">F</text>
     </g>
     <circle cx="180" cy="50" r="4.5" class="stroke-mid" fill="#FCFAF4"/>
     <text x="180" y="52" text-anchor="middle" font-size="5" font-weight="600">30</text>`,
  ];

  const tierLabel = (t) => t.toUpperCase();

  function renderBlueprint(node){
    node.innerHTML = PATENTS.map((p, i) => `
      <div class="bptile">
        <div class="fig"><svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">${FIGS[i % FIGS.length]}</svg></div>
        <div class="meta"><span class="pid">${p.id}</span><span class="tier-chip ${p.tier}">${tierLabel(p.tier)}</span></div>
      </div>`).join('');
  }

  // Defer the 30-tile build past first paint so the headline appears
  // instantly; tiles fade in shortly after. Bounded 1.5s in case idle
  // never fires (background tab, throttled mobile, etc.).
  const initBlueprint = () => {
    document.querySelectorAll('[data-grid="blueprint"]').forEach(renderBlueprint);
  };
  if ('requestIdleCallback' in window) requestIdleCallback(initBlueprint, { timeout: 1500 });
  else setTimeout(initBlueprint, 0);
})();

