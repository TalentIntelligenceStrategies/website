// ─── Universal site chrome: theme, language, mobile drawer, search, forms, pillar tabs ───
(() => {
  const root = document.documentElement;

  // Old shared links: the Ecosystem capability band was #fairtech until 2026-10-11 (the
  // partner is unnamed in public copy). Re-point the hash and land on the renamed section.
  if (location.hash === '#fairtech' && document.getElementById('capability')) {
    history.replaceState(null, '', location.pathname + location.search + '#capability');
    addEventListener('load', () => document.getElementById('capability').scrollIntoView());
  }

  // ──────────────── Theme — system / light / dark ────────────────
  // Restored 2026-09-29 (parked 2026-06-01 in ef34f5b). The inline head script sets
  // data-theme before first paint; this keeps it in step with the two controls — the
  // nav pill (aria-pressed) and the drawer radiogroup (aria-checked) — and follows a
  // live OS change while the choice is "system".
  const themeSegs = document.querySelectorAll('[data-theme-set]');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const readTheme = () => { try { return localStorage.getItem('tis-theme'); } catch (e) { return null; } };
  const resolveTheme = (choice) =>
    choice === 'system' ? (prefersDark.matches ? 'dark' : 'light') : choice;
  const applyTheme = (choice, persist) => {
    // A reader's flip snaps in one frame: with every component's own color transition
    // (100-250ms, linear and eased) running at once, the swap used to smear (MOTION-19).
    let hush = null;
    if (persist) {
      hush = document.createElement('style');
      hush.textContent = '*,*::before,*::after{transition:none!important}';
      document.head.appendChild(hush);
    }
    root.setAttribute('data-theme', resolveTheme(choice));
    if (hush) { getComputedStyle(document.body).opacity; requestAnimationFrame(() => hush.remove()); }
    if (persist) { try { localStorage.setItem('tis-theme', choice); } catch (e) {} }
    themeSegs.forEach(b => {
      const on = String(b.dataset.themeSet === choice);
      b.setAttribute(b.getAttribute('role') === 'radio' ? 'aria-checked' : 'aria-pressed', on);
    });
    if (themeMeta) themeMeta.setAttribute('content', getComputedStyle(root).getPropertyValue('--surface-page').trim() || '#FFFFFF');
  };
  const storedTheme = readTheme();
  const themeChoice = () => {
    const t = readTheme();
    return (t === 'system' || t === 'light' || t === 'dark') ? t : 'system';
  };
  applyTheme((storedTheme === 'light' || storedTheme === 'dark') ? storedTheme : 'system', false);
  themeSegs.forEach(b => b.addEventListener('click', () => applyTheme(b.dataset.themeSet, true)));
  prefersDark.addEventListener('change', () => { if (themeChoice() === 'system') applyTheme('system', false); });

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

  // Three independent overlays lock the body (drawer/search, legal dialog, Signal
  // panel; the newsletter popup stopped locking when it went non-modal, 2026-10-12). They cannot each own Lenis's run state — nesting two would
  // let the first to close start scrolling under the second — so they share a depth.
  let scrollPauseDepth = 0;
  const pauseScroll  = () => { if (scrollPauseDepth++ === 0) lenis && lenis.stop(); };
  const resumeScroll = () => { if (scrollPauseDepth > 0 && --scrollPauseDepth === 0) lenis && lenis.start(); };

  // NO `offset` is passed to scrollTo() below, and that is deliberate — do not "fix" it.
  // Given an ELEMENT target, Lenis already reads the target's scroll-margin-top and the
  // scroller's scroll-padding-top and subtracts both itself (lenis 1.3.26, dist/lenis.mjs
  // :783-786). Passing the usual `offset: -80` to clear the fixed topnav — which is what
  // most Lenis guidance tells you to do — double-counts it (measured 2026-08: every
  // jump landed 80px + the target's margin short).
  //
  // So styles.css stays the single source of truth for anchor offsets. An `offset` here
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
    // Touch-only devices: syncTouch is off, so Lenis would run a per-frame loop for nothing.
    if (matchMedia('(pointer: coarse) and (hover: none)').matches) return null;
    // Reduced motion: no wheel inertia either (A11Y-14).
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
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

  // Language swap (2026-10-12 audit, MOTION-11): a ~200ms fade of the page content with
  // the text swapped at its midpoint. It replaced a full-page brand-cube veil that blocked
  // reading for 2.2s on every switch (restore from git history if the cube is wanted back).
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  // ── Licensing "How it works" step mockups are same-origin <iframe> embeds that
  // are themselves bilingual (each ships its own render(lang)). The text swapper
  // below never touches iframe src, so broadcast the active language into them via
  // postMessage — they flip in place, no reload. Re-sent on each frame's `load`
  // too, since they're lazy-loaded and may not exist yet when applyLang first runs.
  const showcaseFrames = document.querySelectorAll('.lic-frame iframe[src]');
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

  const langCodes = document.querySelectorAll('.lang-code');
  const applyLang = (lang, opts = {}) => {
    root.setAttribute('lang', lang === 'zh' ? 'zh-Hant' : 'en');
    langCodes.forEach(el => { el.textContent = lang === 'zh' ? '中文' : 'EN'; });
    // The visible EN / 中文 is part of the trigger's name (label in name, WCAG 2.5.3).
    const lt = document.getElementById('lang-trigger');
    if (lt) lt.setAttribute('aria-label', lang === 'zh' ? '語言：中文' : 'Language: English');
    langButtons.forEach(b => b.setAttribute('aria-checked', String(b.dataset.langSet === lang)));
    // Legal links open a dialog on click, but a new tab or no-JS visit follows the href,
    // so keep it on the reader's language.
    document.querySelectorAll('a[data-legal]').forEach(a => {
      a.href = a.getAttribute('href').replace(/\.(en|zh)\.html/, lang === 'zh' ? '.zh.html' : '.en.html');
    });
    if (opts.animate && !reduceMotion.matches) {
      const myGen = ++langGen;
      root.classList.add('lang-swapping');
      setTimeout(() => { if (myGen === langGen) swapText(lang); }, 100);
      setTimeout(() => { if (myGen === langGen) root.classList.remove('lang-swapping'); }, 120);
    } else {
      swapText(lang);
    }
    try { localStorage.setItem('tis-lang', lang); } catch (e) {}
  };
  // Guarded like readTheme(): a blocked storage read would otherwise throw here and
  // take the nav, drawer, search and forms down with it.
  const readLang = () => { try { return localStorage.getItem('tis-lang'); } catch (e) { return null; } };
  applyLang(readLang() || 'en');  // first paint: no overlay

  // Lock topnav translatable elements to their EN natural width so the lang toggle
  // doesn't shrink them (which would otherwise shift the right cluster rightward via
  // the flex spacer absorbing the slack). Mobile-drawer items live in full-width or
  // flex:1 containers so they don't cause neighbor reflow — left unlocked.
  // `.nav-trigger > [data-zh]` covers the six mega-nav triggers' inner spans.
  const lockables = document.querySelectorAll('.topnav-link[data-zh], .topnav-cta[data-zh], .nav-trigger > [data-zh]');
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

  // Disclosure, not a menu (A11Y-09): Escape or a choice closes it and hands focus back to
  // the trigger, so the next Tab never lands inside the closed list.
  const closeLangMenu = ({ focus = false } = {}) => {
    const was = langWrap.dataset.open === 'true';
    langWrap.dataset.open = 'false';
    langTrigger.setAttribute('aria-expanded', 'false');
    if (focus && was) langTrigger.focus();
  };

  langTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = langWrap.dataset.open === 'true';
    if (open) closeLangMenu();
    else { langWrap.dataset.open = 'true'; langTrigger.setAttribute('aria-expanded', 'true'); }
  });
  langButtons.forEach(b => b.addEventListener('click', () => {
    applyLang(b.dataset.langSet, { animate: true });
    closeLangMenu({ focus: langWrap.contains(b) });
    // The swap plays a full-screen shimmer; leaving the drawer open on top of it
    // reads as two overlays fighting. closeDrawer is declared further down the
    // same scope — this runs on click, long after that line has executed.
    if (typeof closeDrawer === 'function') closeDrawer();
  }));

  document.addEventListener('click', () => closeLangMenu());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLangMenu({ focus: langWrap.contains(document.activeElement) }); });

  // ──────────────── Section map — which nav group a URL belongs to ────────────────
  // Drives aria-current on nav links and which drawer group opens by default.
  // Old URLs are kept (mro/website-page-map.md §4), so the Insights pages are
  // matched by their /product/ and /reports/ paths.
  const sectionOf = (path) => {
    if (/^\/sustain\//.test(path)) return 'sustain';
    if (/^\/protect\//.test(path)) return 'protect';
    // Licensing Platform sits under License since team review 2026-10-06.
    if (/^\/(license|patents|product\/licensing)\//.test(path)) return 'license';
    if (/^\/ecosystem\//.test(path)) return 'ecosystem';
    if (/^\/(reports|product)\//.test(path)) return 'insights';
    if (/^\/(about|engage|why-taiwan)\//.test(path)) return 'about';
    return null;
  };
  const here = location.pathname.replace(/index\.html$/, '');
  const currentSection = sectionOf(here);
  // The one active-state exception in the top nav (components.md §Top nav · Current section):
  // the trigger of the page's own section carries a faint underline at rest.
  document.querySelectorAll('.nav-item[data-nav]').forEach(li => {
    if (li.dataset.nav === currentSection) li.querySelector('.nav-trigger')?.setAttribute('data-current', 'true');
  });
  document.querySelectorAll('.mega-link, .mega-res-link, .mega-hero, .mobile-sub-link, .mobile-row-link').forEach(a => {
    const u = new URL(a.getAttribute('href'), location.origin);
    if (!u.hash && u.pathname.replace(/index\.html$/, '') === here) a.setAttribute('aria-current', 'page');
  });

  // ──────────────── Mega nav — six section links, one open panel ────────────────
  // Disclosure pattern (button[aria-expanded] → region of plain links), not role="menu":
  // the panels hold ordinary navigation links, and menu semantics would make screen
  // readers announce them as application commands and hijack the arrow keys.
  const navItems = Array.from(document.querySelectorAll('.nav-item'));
  const topnav = document.querySelector('.topnav');
  const megaScrim = document.getElementById('mega-scrim');
  let closeMega = () => {};
  if (navItems.length && topnav) {
    const hoverFine = matchMedia('(hover: hover) and (pointer: fine)');
    let current = null;       // the open .nav-item
    let pinned = false;       // opened by click/keyboard (hover-leave must not close it)
    let openTimer = null, closeTimer = null;
    const parts = (item) => ({ trigger: item.querySelector('.nav-trigger'), toggle: item.querySelector('.nav-sub'), panel: item.querySelector('.mega-panel') });
    const cancelTimers = () => {
      if (openTimer)  { clearTimeout(openTimer);  openTimer  = null; }
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    };
    // Nav style A2 (2026-10-06): each panel is a column under its own label. Place it so
    // its text lines up with the label's text (label padding 12px; panel padding 20px +
    // 1px border); near the right edge, right-align it instead and scale from that side.
    const place = (item) => {
      const { trigger, panel } = parts(item);
      const T = topnav.getBoundingClientRect(), b = trigger.getBoundingClientRect();
      const w = panel.offsetWidth;
      let x = b.left - T.left + 12 - 21, origin = 'left';
      if (x + w > T.width - 12) { x = b.right - T.left - 12 + 21 - w; origin = 'right'; }
      panel.style.setProperty('--px', Math.max(12, x) + 'px');
      panel.style.setProperty('--ox', origin);
    };
    // The header photo is fetched on first intent (hover, focus or open), not at page
    // load: six nav photos would otherwise ride along on every page view.
    const prime = (item) => {
      const img = item.querySelector('.mega-hero__img[data-src]');
      if (img) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
    };
    const hide = (item) => {
      const { toggle, panel } = parts(item);
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      delete panel.dataset.open;
    };
    const open = (item, { pin = false } = {}) => {
      cancelTimers();
      if (pin) pinned = true;
      if (current === item) return;
      const switching = !!current;
      if (switching) {
        topnav.classList.add('mega-switching');
        hide(current);
      }
      const { toggle, panel } = parts(item);
      prime(item);
      place(item);
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
      panel.dataset.open = 'true';
      current = item;
      topnav.dataset.megaOpen = 'true';
      if (megaScrim) megaScrim.dataset.open = 'true';
      closeLangMenu();
      if (switching) requestAnimationFrame(() => requestAnimationFrame(() => topnav.classList.remove('mega-switching')));
    };
    closeMega = ({ focusTrigger = false } = {}) => {
      cancelTimers();
      if (!current) return;
      const item = current;
      hide(item);
      current = null;
      pinned = false;
      topnav.dataset.megaOpen = 'false';
      if (megaScrim) megaScrim.dataset.open = 'false';
      if (focusTrigger) (parts(item).toggle || parts(item).trigger).focus();
    };

    navItems.forEach(item => {
      const { trigger, panel } = parts(item);
      // Hover intent (fine pointers only). The panel is a descendant of the item, so
      // the pointer moving from trigger into panel never leaves the item; the short
      // gap between trigger and panel edge is covered by the close delay.
      item.addEventListener('pointerenter', (e) => {
        if (e.pointerType !== 'mouse' || !hoverFine.matches) return;
        prime(item);
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
        if (current === item) return;
        if (current) { open(item); return; }      // already browsing: swap at once
        openTimer = setTimeout(() => { openTimer = null; open(item); }, 120);
      });
      item.addEventListener('pointerleave', (e) => {
        if (e.pointerType !== 'mouse' || !hoverFine.matches) return;
        if (openTimer) { clearTimeout(openTimer); openTimer = null; }
        if (current !== item || pinned) return;
        closeTimer = setTimeout(() => { closeTimer = null; closeMega(); }, 200);
      });
      // The label is the section's page link (2026-10-06): a click navigates, the same
      // place as the panel's photo header. Hover (fine pointers) and ArrowDown open the panel.
      // Touch above the drawer breakpoint has no hover, so the panel's anchors would be
      // unreachable: the first tap opens the panel, the second (or the photo header) navigates.
      trigger.addEventListener('click', (e) => {
        if (!hoverFine.matches && current !== item) { e.preventDefault(); open(item, { pin: true }); return; }
        closeMega();
      });
      // The link navigates; this button beside it (visible on keyboard focus) opens and
      // closes the section's panel, so its links are reachable with Tab (A11Y-11).
      const toggle = item.querySelector('.nav-sub');
      if (toggle) toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (current === item) closeMega(); else open(item, { pin: true });
      });
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          open(item, { pin: true });
          const first = panel.querySelector('a');
          if (first) first.focus();
        }
      });
      trigger.addEventListener('focus', () => prime(item));
      // Focus leaving the item entirely (Tab past the last panel link) closes it.
      item.addEventListener('focusout', (e) => {
        if (current === item && e.relatedTarget && !item.contains(e.relatedTarget)) closeMega();
      });
      panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMega()));
    });

    document.addEventListener('click', (e) => {
      if (current && !current.contains(e.target)) closeMega();
    });
    if (megaScrim) megaScrim.addEventListener('click', () => closeMega());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && current) closeMega({ focusTrigger: true });
    });
    window.addEventListener('scroll', () => {
      if (window.scrollY > 64 && current && !pinned) closeMega();
    }, { passive: true });
    // The triggers are display:none below the drawer breakpoint — never leave a panel
    // open (and the scrim up) on a layout that cannot reach its trigger.
    matchMedia('(max-width: 1080px)').addEventListener('change', (e) => { if (e.matches) closeMega(); });
    window.addEventListener('resize', () => { if (current) place(current); }, { passive: true });
    langTrigger.addEventListener('click', () => closeMega());
  }

  // ──────────────── Mobile drawer accordion — six groups ────────────────
  const mRows = Array.from(document.querySelectorAll('.mobile-list .mobile-row-dropdown'));
  const setRow = (row, openIt) => {
    const sub = document.getElementById(row.getAttribute('aria-controls'));
    if (!sub) return;
    row.setAttribute('aria-expanded', String(openIt));
    if (openIt) sub.dataset.open = 'true'; else delete sub.dataset.open;
  };
  mRows.forEach(row => row.addEventListener('click', () => {
    setRow(row, row.getAttribute('aria-expanded') !== 'true');
    row.dataset.userToggled = 'true';
  }));
  // Default: the group for the page being read opens, so its siblings are one tap away.
  // Never overrides a reader who has toggled a group themselves.
  const fitDrawerDefault = () => {
    if (mRows.some(r => r.dataset.userToggled === 'true')) return;
    mRows.forEach(r => setRow(r, r.dataset.nav === currentSection));
  };

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
    document.querySelector('.topnav'),
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
    fitDrawerDefault();
    closeMega();
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
  // In ZH, a Latin query ("patent", "MRO") should still find the English fields.
  const scoreAny = (entry, q, ts) => {
    const s = score(entry, q, ts);
    if (s || !zhNow() || !entry.zt) return s;
    const t = (entry.t || '').toLowerCase(), b = (entry.b || '').toLowerCase();
    const bonus = entry.page ? 8 : 0;
    if (t.includes(q)) return 90 + bonus - Math.min(t.length, 60) / 100;
    if (ts.every(x => t.includes(x))) return 50 + bonus;
    if (b && ts.every(x => (t + ' ' + b).includes(x))) return 20;
    return 0;
  };

  const ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>';
  const esc = (x) => String(x).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // A typed query gets a spoken count, not just a repainted list (A11Y-12).
  const sStatus = document.getElementById('search-status');
  const say = (msg) => { if (sStatus) sStatus.textContent = msg; };
  const render = (rows) => {
    const zh = zhNow();
    if (!rows.length) {
      sResults.innerHTML = '<p class="search-section-label">' +
        (zh ? '沒有符合的結果' : 'No matches') + '</p>';
      say(zh ? '沒有符合的結果' : 'No matches');
      return;
    }
    say(zh ? `${rows.length} 筆結果` : `${rows.length} result${rows.length === 1 ? '' : 's'}`);
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
      .map(e => ({ e, page: data.pages[e.p], s: scoreAny(e, q, ts) }))
      .filter(r => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12);
    render(rows);
  };

  sInput.addEventListener('input', applySearch);
  // A language switch must re-render whatever is on screen in the new language.
  window.__searchRefresh = () => { if (sInput.value.trim()) applySearch(); else sResults.innerHTML = zeroState; };

  // Count-up timing — design-tokens.md §7.2 (count-up 1200ms linear). Used by fdCount below.
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COUNT_MS = 1200;

  // ──────────────── Front door v2 — reveals + figure count-up ────────────────
  // styles.css "FRONT DOOR v2 · MOTION" owns the looks; this only decides WHEN. A block
  // gets .fd-pre (its hidden "before" state) only if it starts below the fold, so
  // nothing on screen at load ever blinks out, and nothing at all is hidden without
  // JS, under reduced motion, or without IntersectionObserver.
  const fdTargets = [
    // Per component type, not per page (MOTION-22): every grid of cards is a staggered list.
    ['rise', '.fd-statement, .fd-head, .fd-feature__body, .fd-lanes, .fd-platform__body, .fd-note, .fd-strip'],
    ['list', '.fd-mosaic, .fd-stair__steps, .fd-rows, .fd-figures, .fd-partners, .fd-bento, .fd-pledge, .fd-board, .why-tiles__list, .psg-bento, .fd-tray .ptray__pts'],
    ['clip', '.fd-frame, .fd-platform__shot'],
  ];
  const fdCount = (b) => {
    // One number per figure ("48,750", "×21", "30+", "180M"); "9 of 16" and the
    // CJK forms are left as written. Stops, and restores the text, if the
    // language changes mid-count.
    const txt = b.textContent, m = txt.match(/^(\D*)(\d[\d,]*)(\D*)$/);
    if (!m || document.documentElement.lang !== 'en') return;
    const end = parseInt(m[2].replace(/,/g, ''), 10), comma = m[2].includes(',');
    const t0 = performance.now();
    const tick = (now) => {
      if (document.documentElement.lang !== 'en') { b.textContent = b.dataset.zh || txt; return; }
      const t = Math.max(0, Math.min((now - t0) / COUNT_MS, 1));
      const n = Math.floor(t * end);
      b.textContent = m[1] + (comma ? n.toLocaleString('en-US') : n) + m[3];
      if (t < 1) requestAnimationFrame(tick); else b.textContent = txt;
    };
    requestAnimationFrame(tick);
  };
  if (!reduced && 'IntersectionObserver' in window) {
    const fdObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.remove('fd-pre');
        if (el.classList.contains('fd-figures')) el.querySelectorAll('b').forEach(fdCount);
        obs.unobserve(el);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    fdTargets.forEach(([kind, sel]) => {
      document.querySelectorAll(sel).forEach(el => {
        el.dataset.fd = kind;
        if (kind === 'list') Array.from(el.children).forEach((c, i) => c.style.setProperty('--fd-i', i));
        if (el.getBoundingClientRect().top < innerHeight * 0.94) return;   // already in view: leave it be
        el.classList.add('fd-pre');
        fdObs.observe(el);
      });
    });
  }

  // ──────────────── Home v0.5 — KV carousel (APG tabbed carousel) ────────────────
  // styles.css "HOME v0.5" owns the looks. Arrow keys, Home and End move between the tabs.
  // Timing (hero round 2, 2026-10-11; replaces 2026-10-01's "never rotates"): on desktop
  // (>768px, no reduced motion) the KV advances every DWELL ms and loops; the active tab's
  // rule fills over the same span (CSS, keyed on data-playing). It pauses while the pointer
  // is over it, focus is inside it, it is off-screen or the tab is hidden, and it STOPS for
  // good once the reader picks a slide (click, key, swipe) or presses pause, which is the
  // WCAG 2.2.2 control. Phones keep tap/swipe only. Without JS the tabs and the button stay
  // hidden and slide 1 shows alone.
  const kvEl = document.getElementById('kv');
  if (kvEl) {
    const tabs = Array.from(kvEl.querySelectorAll('.kv__tab'));
    const slides = Array.from(kvEl.querySelectorAll('.kv__slide'));
    const layers = Array.from(kvEl.querySelectorAll('.kv__media'));
    const slidesEl = kvEl.querySelector('.kv__slides');
    const pauseBtn = kvEl.querySelector('.kv__pause');
    kvEl.querySelector('.kv__tabs').hidden = false;
    let cur = 0;
    const show = (n, focus) => {
      cur = (n + slides.length) % slides.length;
      tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === cur)); t.tabIndex = k === cur ? 0 : -1; });
      slides.forEach((s, k) => { s.classList.toggle('is-active', k === cur); s.inert = k !== cur; });
      layers.forEach((m, k) => m.classList.toggle('is-active', k === cur));
      kvEl.dataset.active = String(cur);
      if (focus) tabs[cur].focus();
    };

    // ── timer ──
    const DWELL = 7000;   // = --kv-dwell in styles.css
    const desktop = matchMedia('(min-width: 769px)');
    const calm = matchMedia('(prefers-reduced-motion: reduce)');
    let timer = null, startedAt = 0, left = DWELL;
    let stopped = false;                         // the reader took over: never resume on our own
    const holds = new Set();                     // hover / focus / offscreen / hidden
    const allowed = () => desktop.matches && !calm.matches;
    const clear = () => { clearTimeout(timer); timer = null; };
    // Every (re)start goes through run(), so run() banks the time already spent first. Without
    // this a redundant release (focus leaving when it was never held, the observer's first
    // callback) restarted the full DWELL while the CSS fill kept its own clock: the rule
    // finished at 7s and the slide changed at 11s.
    const bank = () => { if (timer) left = Math.max(0, left - (performance.now() - startedAt)); clear(); };
    const tick = () => { timer = null; left = DWELL; show(cur + 1); run(); };
    const run = () => {
      bank();
      if (stopped || !allowed()) { delete kvEl.dataset.playing; slidesEl.setAttribute('aria-live', 'polite'); return; }
      slidesEl.setAttribute('aria-live', 'off');   // APG: an auto-rotating carousel must not announce every slide
      if (holds.size) { kvEl.dataset.playing = 'paused'; return; }
      kvEl.dataset.playing = 'run';
      startedAt = performance.now();
      timer = setTimeout(tick, left);
    };
    const hold = (why) => { if (!holds.has(why)) { holds.add(why); run(); } };
    const release = (why) => { if (holds.delete(why)) run(); };
    const labels = { en: ['Pause slides', 'Play slides'], zh: ['暫停輪播', '播放輪播'] };
    const syncBtn = () => {
      if (!pauseBtn) return;
      pauseBtn.hidden = !allowed();
      // The label says what the button will do; no aria-pressed as well, or a screen reader
      // reads the stopped state as "Play slides, toggle button, pressed".
      pauseBtn.toggleAttribute('data-stopped', stopped);
      const l = labels[document.documentElement.lang === 'zh-Hant' ? 'zh' : 'en'];
      pauseBtn.setAttribute('aria-label', l[stopped ? 1 : 0]);
    };
    const stop = () => { stopped = true; clear(); run(); syncBtn(); };
    if (pauseBtn) pauseBtn.addEventListener('click', () => {
      if (stopped) { stopped = false; left = DWELL; holds.delete('focus'); run(); }
      else stop();
      syncBtn();
    });
    // Re-keying the fill: the rule animates on the selected tab, so restarting the timer on a
    // new slide restarts it too. A resumed pause continues from where both left off.
    // Hover pauses only over the words and the controls, not the photograph: a cursor parked
    // on the picture would otherwise mean the KV never moves. The copy and bar boxes span the
    // full width, so test the element under the pointer, not the box it sits in.
    const READ = '.kv__kicker, .kv__title, .kv__figs li, .pillar-actions > *, .kv__tabs';   // not the pause button: pressing play must visibly play
    kvEl.addEventListener('pointerover', (e) => { e.target.closest(READ) ? hold('hover') : release('hover'); });
    kvEl.addEventListener('pointerleave', () => release('hover'));
    kvEl.addEventListener('focusin', (e) => { if (e.target !== pauseBtn) hold('focus'); });
    kvEl.addEventListener('focusout', (e) => { if (!kvEl.contains(e.relatedTarget)) release('focus'); });
    new IntersectionObserver(([en]) => { en.isIntersecting ? release('offscreen') : hold('offscreen'); }, { threshold: 0.25 }).observe(kvEl);
    document.addEventListener('visibilitychange', () => { document.hidden ? hold('hidden') : release('hidden'); });
    const recheck = () => { syncBtn(); run(); };
    desktop.addEventListener('change', recheck);
    calm.addEventListener('change', recheck);

    tabs.forEach((t, k) => t.addEventListener('click', () => { stop(); show(k); }));
    kvEl.querySelector('.kv__tabs').addEventListener('keydown', (e) => {
      const to = { ArrowRight: cur + 1, ArrowLeft: cur - 1, Home: 0, End: slides.length - 1 }[e.key];
      if (to === undefined) return;
      e.preventDefault(); stop(); show(to, true);
    });
    // Phones: a horizontal swipe on the slide changes it, as the tabs would. Mostly-
    // horizontal and ≥48px only, so a vertical page scroll never flips a slide.
    let sx = null, sy = 0;
    slidesEl.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) { sx = null; return; }
      sx = e.touches[0].clientX; sy = e.touches[0].clientY;
    }, { passive: true });
    slidesEl.addEventListener('touchend', (e) => {
      if (sx === null) return;
      const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      sx = null;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      const to = cur + (dx < 0 ? 1 : -1);
      if (to >= 0 && to < slides.length) { stop(); show(to); }   // a swipe stops at the ends; only the tabs wrap
    }, { passive: true });
    // aria-roledescription has no data-zh-* handler; follow <html lang> here (and the button label).
    const rdEls = [kvEl, ...slides];
    rdEls.forEach(el => { el.dataset.rdEn = el.getAttribute('aria-roledescription'); });
    const syncRd = () => {
      const zh = document.documentElement.lang === 'zh-Hant';
      rdEls.forEach(el => el.setAttribute('aria-roledescription', zh ? el.dataset.rdZh : el.dataset.rdEn));
      syncBtn();
    };
    syncRd();
    new MutationObserver(syncRd).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    run();
  }

  // ──────────────── Home — pillar trays (disclosure, one pill per tray) ────────────────
  // An inline line in the markup adds .is-js before paint, which arms the fold in CSS;
  // this owns the state: aria-expanded, inert on closed tiles, and the hash. Trays open
  // independently. A #sustain / #protect / #license hash, a jump chip or any in-page
  // link to a tray opens it. First sync runs under .is-instant so nothing animates at load.
  document.querySelectorAll('.ptray').forEach(root => {
    const trays = Array.from(root.querySelectorAll('.ptray__ch'));
    const set = (ch, open) => {
      const btn = ch.querySelector('.ptray__tg');
      btn.setAttribute('aria-expanded', String(open));
      ch.classList.toggle('is-open', open);
      document.getElementById(btn.getAttribute('aria-controls')).inert = !open;
    };
    const byHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      return trays.find(ch => ch.id === id) || null;
    };
    const open = (ch) => { if (ch && !ch.classList.contains('is-open')) set(ch, true); };
    root.classList.add('is-js', 'is-instant');
    trays.forEach(ch => set(ch, false));
    const first = byHash();
    if (first) set(first, true);
    void root.offsetHeight;
    root.classList.remove('is-instant');
    // Opening a tray low on a phone grew the drawer below the fold, so nothing visibly
    // happened. If the first tile would start in the bottom quarter, bring it up to
    // mid-screen (through Lenis when it runs, so the two scrollers don't fight).
    const reveal = (ch) => {
      const top = ch.querySelector('.ptray__drawer').getBoundingClientRect().top;
      if (top < innerHeight * 0.75) return;
      const y = scrollY + top - innerHeight * 0.45;
      if (lenis) lenis.scrollTo(y, { immediate: reduced });
      else scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    };
    trays.forEach(ch => ch.querySelector('.ptray__tg').addEventListener('click', () => {
      const opening = !ch.classList.contains('is-open');
      set(ch, opening);
      if (opening) reveal(ch);
    }));
    window.addEventListener('hashchange', () => open(byHash()));
    root.querySelectorAll('.ptray__chip').forEach(a => a.addEventListener('click', () => open(document.getElementById(a.getAttribute('href').slice(1)))));
  });

  // ──────────────── Scroll-reveal — [data-reveal] and the offer-card photos ────────────────
  // One recipe with the front-door reveals (2026-10-12 audit, MOTION-02/03): visible by
  // default; only an element that starts below the fold gets .rv-pre (its hidden state) and
  // is revealed when it enters. Everything else gets .is-revealed / .is-in at once, which
  // capital.tisglobalinc.com's own [data-reveal] CSS waits for.
  const belowFold = (el) => el.getBoundingClientRect().top > innerHeight * 0.94;
  const revealEls = document.querySelectorAll('[data-reveal]');
  const offerCards = document.querySelectorAll('.offer-card');
  const io = (!reduced && 'IntersectionObserver' in window)
    ? new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const grid = el.classList.contains('offer-card') ? el.parentElement : null;
          const i = grid ? Array.prototype.indexOf.call(grid.children, el) : 0;
          setTimeout(() => {
            el.classList.remove('rv-pre');
            el.classList.add(el.classList.contains('offer-card') ? 'is-in' : 'is-revealed');
          }, i * 70);
          obs.unobserve(el);
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' })
    : null;
  [...revealEls, ...offerCards].forEach(el => {
    const done = el.classList.contains('offer-card') ? 'is-in' : 'is-revealed';
    if (!io || !belowFold(el)) { el.classList.add(done); return; }
    el.classList.add('rv-pre');
    io.observe(el);
  });

  // ──────────────── Accordion (single-open within group) — components.md §Accordion ────────────────
  // The `.acc-mark` +/− glyph and the `.howitworks` step-panel sync that used to hang
  // off this handler are gone: no page carries either, and no `.acc-item` carries
  // `data-step`. The chevron is CSS, driven by `.is-open`.
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
  //   · capital/'s Role / Industry are .brand-select divs, invisible to FormData —
  //     their value lives in dataset.value (see the Brand select block above)
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
  // 15s ceiling: a hung Apps Script call used to leave the button on "Sending…" for
  // good. Aborting lands in the caller's catch, which shows the retry message.
  const frontDeskPost = async (payload) => {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 15000);
    let res;
    try {
      res = await fetch(FRONT_DESK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: ctl.signal,
      });
    } finally { clearTimeout(timer); }
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
    form.querySelectorAll('[aria-invalid="true"]').forEach(f => f.removeAttribute('aria-invalid'));
  };
  // Marks the offending field, points it at the message and moves focus there, so a
  // keyboard or screen-reader user lands on what needs fixing rather than the button.
  const flagField = (form, field) => {
    if (!field) return;
    field.setAttribute('aria-invalid', 'true');
    const err = form.querySelector('.form-error');
    if (err) {
      if (!err.id) err.id = (form.id || 'form') + '-error';
      const ids = (field.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
      if (!ids.includes(err.id)) field.setAttribute('aria-describedby', ids.concat(err.id).join(' '));
    }
    field.focus();
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

  // Swaps only the label (a .btn-label span when the button has an icon), and restores the
  // markup it replaced, so a failed send keeps the button's arrow and its data-zh (POP-04).
  const pending = (btn, on) => {
    if (!btn) return;
    const lbl = btn.querySelector('.btn-label') || btn;
    if (on) {
      btn.dataset.prevHtml = lbl.innerHTML;
      lbl.textContent = t('Sending…', '傳送中…');
      btn.disabled = true;
      btn.classList.add('is-pending');
    } else {
      if (btn.dataset.prevHtml !== undefined) lbl.innerHTML = btn.dataset.prevHtml;
      delete btn.dataset.prevHtml;
      btn.disabled = false;
      btn.classList.remove('is-pending');
    }
  };

  // ──────────────── PSG figure tray — prev/next ────────────────
  // /product/signal/ #figures: five tiles in a scroll-snap row. The buttons move one tile
  // and disable at either end; swipe and keyboard scrolling work without them (the track
  // is focusable). Reduced motion jumps instead of gliding.
  const psgTrack = document.querySelector('.psg-track');
  if (psgTrack) {
    const psgBtns = [...document.querySelectorAll('.psg-nav__btn')];
    const psgStep = () => (psgTrack.querySelector('.psg-tile')?.getBoundingClientRect().width || 400) + 12;
    const psgSync = () => {
      const max = psgTrack.scrollWidth - psgTrack.clientWidth - 2;
      psgBtns.forEach(b => { b.disabled = b.dataset.dir === '-1' ? psgTrack.scrollLeft <= 2 : psgTrack.scrollLeft >= max; });
    };
    psgBtns.forEach(b => b.addEventListener('click', () => {
      psgTrack.scrollBy({ left: psgStep() * +b.dataset.dir, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }));
    psgTrack.addEventListener('scroll', psgSync, { passive: true });
    addEventListener('resize', psgSync);
    psgSync();
  }

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

      // One handler, several pages: /engage/ and /ausa/ carry the same form with a
      // data-source, so their rows are distinguishable in the Front Desk sheet.
      const payload = serializeForm(contactForm, { form: 'contact', source: contactForm.dataset.source || 'contact' });
      const [invalid, bad] =
        !payload.name                       ? [t('Please enter your name.', '請填寫姓名。'), 'name'] :
        !EMAIL_RE.test(payload.email || '') ? [t('Please enter a valid email address.', '請填寫有效的電子郵件。'), 'email'] :
        !payload.message                    ? [t('Please tell us briefly what you need.', '請簡述您的需求。'), 'message'] : ['', null];
      if (invalid) {
        showFormError(contactForm, invalid);
        flagField(contactForm, contactForm.querySelector(`[name="${bad}"]`));
        return;
      }

      // Patent Strength Grading: the request fields have no columns in the Front Desk
      // sheet's contact tab (its headers are fixed), so they ride in front of the message
      // as one line, plus the idea on its own. Values are mapped to stable English so a
      // row reads the same whatever language the visitor used. Only the input the chosen
      // status calls for is read: the other two keep whatever was typed before a switch.
      if (payload.source === 'patent-strength-grading') {
        const STATUS = { granted: 'Granted / published', pending: 'Pending draft', idea: 'Just an idea' };
        const REPORT = { 'b-long': 'Study', 'b-advanced': 'Survey', unsure: 'Not sure yet' };
        const type = payload['input-type'] || 'granted';
        const parts = ['[PSG] Status: ' + (STATUS[type] || type), 'Report: ' + (REPORT[payload.report] || 'Not sure yet')];
        if (type === 'granted' && payload.patent) parts.push('Patent: ' + payload.patent);
        if (type === 'pending' && payload.application) parts.push('Application: ' + payload.application);
        parts.push('NDA: ' + (payload.nda === 'yes' ? 'yes' : 'no'));
        const idea = type === 'idea' && payload.idea ? '\nIdea: ' + payload.idea : '';
        payload.message = parts.join(' · ') + idea + '\n\n' + payload.message;
      }

      const succeed = () => {
        // Pin the panel to the height the form occupied BEFORE hiding it, so
        // the card doesn't collapse ~450px and strand the confirmation off
        // the top of the viewport. Measured rather than hardcoded, so it
        // holds at every breakpoint.
        contactSuccess.style.minHeight = contactForm.offsetHeight + 'px';
        // Shim: capital/ is a separate repo still carrying the old subtext.
        // Drop it once that repo has the markup change.
        const stale = contactSuccess.querySelector('p:not(.contact-success__next)');
        if (stale) stale.remove();
        primeCheck(contactSuccess);
        contactForm.style.display = 'none';
        contactSuccess.classList.add('is-shown');
        // The focused submit button just disappeared: move focus to the confirmation so it
        // is announced and keyboard users are not dropped to <body> (A11Y-04).
        const done = contactSuccess.querySelector('h3');
        if (done) { done.tabIndex = -1; done.focus({ preventScroll: true }); }
        // Someone who just wrote to us is not asked to subscribe on this visit (POP-02).
        try { localStorage.setItem('tis-mkt-drop-seen', String(Date.now())); } catch (_) {}
        document.dispatchEvent(new CustomEvent('tis:contact-sent'));
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
  // components.md §Footer — in-place success state.
  const MKT_KEY = 'tis-mkt-drop-seen';
  const markMktSeen = () => { try { localStorage.setItem(MKT_KEY, String(Date.now())); } catch (_) {} };

  const nlBlock = document.getElementById('footer-nl-block');
  const nlForm  = document.getElementById('footer-nl-form');
  if (nlBlock && nlForm) {
    addHoneypot(nlForm);
    const nlInput = nlForm.querySelector('input[type="email"]');
    const nlLabel = nlBlock.querySelector('.footer-nl-label');
    const nlStatus = document.getElementById('footer-nl-status');
    // The label carries the visible state; the sr-only status region announces it (A11Y-13).
    const nlSay = (msg) => { if (nlStatus) nlStatus.textContent = msg; };
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
      nlLabel.textContent = t('Subscribed. Thank you.', '訂閱成功，謝謝您。');
      nlSay(nlLabel.textContent);
      nlInput.value = '';
      // Cross-suppress the newsletter popup: this reader already subscribed in the footer.
      markMktSeen();
    };

    nlInput.addEventListener('input', () => {
      if (!nlBlock.classList.contains('is-error')) return;
      nlBlock.classList.remove('is-error');
      nlInput.removeAttribute('aria-invalid');
      nlRestore();
    });

    nlForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = serializeForm(nlForm, { form: 'newsletter', source: 'footer' });
      if (!EMAIL_RE.test(payload.email || '')) {
        // Used to return silently, which read as a dead button.
        // Stays until the reader edits the field, rather than vanishing on a timer.
        nlBlock.classList.add('is-error');
        nlLabel.textContent = t('Enter a valid email address.', '請填寫有效的電子郵件。');
        nlSay(nlLabel.textContent);
        nlInput.setAttribute('aria-invalid', 'true');
        nlInput.focus();
        clearTimeout(nlTimer);
        return;
      }
      if (!frontDeskLive()) { nlSucceed(); return; }

      nlBtn.disabled = true;
      try {
        await frontDeskPost(payload);
        nlSucceed();
      } catch (err) {
        // The strip has no room for a message node — the label carries it.
        nlBlock.classList.add('is-error');
        nlLabel.textContent = t('Couldn’t subscribe. Try again.', '訂閱失敗，請再試一次。');
        nlSay(nlLabel.textContent);
        clearTimeout(nlTimer);
      } finally {
        nlBtn.disabled = false;
      }
    });
  }

  // ──────────────── Brand select — components.md §Select (custom dropdown wiring) ────────────────
  // Used by capital.tisglobalinc.com only (it loads this file cross-origin); no website page
  // has a .brand-select. Keep it until capital stops depending on this file.
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

  // ──────────────── Newsletter corner popup — components.md §Newsletter corner popup ────────────────
  // Non-modal corner card (a bottom sheet ≤768px) with the page left live behind it: no
  // lockPage(), no inert, no focus steal. Mounted on six front-door pages by build.py.
  //
  // Polite trigger (2026-10-12 audit, POP-01..03). The 45s timer starts only once the reader
  // has scrolled past the hero; 50% scroll still opens it early. It never opens while the
  // contact form or the footer newsletter is in view, the contact form has focus, or the
  // drawer, search or legal dialog is open; if one of those appears while it is showing, it
  // closes and the 30-day mark is withdrawn, so it was never "seen". Seen = shown and then
  // left open or dismissed by the reader.
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
    const unmarkSeen = () => { try { localStorage.removeItem(MKT_KEY); } catch (_) {} };

    // One polite live region per page: announces that the card opened (it does not take focus).
    const live = document.createElement('p');
    live.className = 'sr-only'; live.setAttribute('role', 'status'); live.setAttribute('aria-live', 'polite');
    document.body.appendChild(live);

    let lastFocus = null, timer = null, opened = false, retired = false;

    // Forms in view: tracked, never measured on scroll.
    const blockers = new Set();
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => { if (en.intersectionRatio >= 0.2) blockers.add(en.target); else blockers.delete(en.target); });
        if (opened && blockers.size) yieldPopup();
      }, { threshold: [0, 0.2] });
      ['contact', 'footer-nl-block'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    }
    const chromeOpen = () => {
      const b = document.body.classList;
      return b.contains('nav-lock') || b.contains('lgl-lock') ||
        document.getElementById('search-modal')?.dataset.open === 'true';
    };
    const contactFocused = () => !!document.activeElement?.closest?.('#contact-form');
    const blocked = () => blockers.size > 0 || chromeOpen() || contactFocused();

    let scrollMax = 0;
    const measure = () => {
      // A locked page (drawer, legal dialog) is out of flow; never latch scrollMax at ~0.
      const b = document.body.classList;
      if (b.contains('nav-lock') || b.contains('lgl-lock')) return;
      const doc = document.documentElement;
      scrollMax = doc.scrollHeight - doc.clientHeight;
    };
    const heroEnd = () => {
      const h = document.querySelector('.kv, .fd-hero');
      return h ? h.offsetTop + h.offsetHeight : innerHeight;
    };
    let scrollRaf = null;
    const onScroll = () => {
      if (opened || retired || scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        if (opened || retired) return;
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        // The timer only runs once the reader is past the hero, so it never lands on the CTA.
        if (!timer && y > heroEnd()) timer = setTimeout(openPopup, DELAY_MS);
        if (scrollMax <= 0) measure();
        if (scrollMax > 0 && (y / scrollMax) >= SCROLL_THRESHOLD) openPopup();
      });
    };

    function openPopup() {
      if (opened || retired || isSuppressed()) return;
      // Not now: re-arm and try again shortly, so the reader still sees it later.
      if (blocked()) { clearTimeout(timer); timer = setTimeout(openPopup, 15000); return; }
      opened = true;
      clearTimeout(timer);
      mkt.classList.remove('is-closing');
      mkt.classList.add('is-open');
      mkt.setAttribute('aria-hidden', 'false');
      live.textContent = t('Newsletter sign-up opened at the bottom of the page. Press Escape to dismiss.',
                           '頁面底部已開啟電子報訂閱。按 Esc 可關閉。');
      markMktSeen();
    }

    function hide() {
      const inside = mktCard.contains(document.activeElement);
      mkt.classList.remove('is-open');
      mkt.setAttribute('aria-hidden', 'true');
      const instant = reduceMotion.matches;
      if (!instant) {
        mkt.classList.add('is-closing');
        setTimeout(() => mkt.classList.remove('is-closing'), 220);
      }
      if (inside && lastFocus && lastFocus.focus) lastFocus.focus();
    }
    // Reader dismissed it: stays seen for 30 days.
    function closePopup() { if (!opened) return; hide(); retired = true; }
    // A form or the chrome needs the space: step aside without counting as seen.
    function yieldPopup() {
      if (!opened || mktCard.classList.contains('is-done')) return;
      hide(); unmarkSeen(); opened = false; retired = true;
    }
    new MutationObserver(() => { if (opened && chromeOpen()) yieldPopup(); })
      .observe(document.body, { attributes: true, attributeFilter: ['class'] });
    const sModal = document.getElementById('search-modal');
    if (sModal) new MutationObserver(() => { if (opened && chromeOpen()) yieldPopup(); })
      .observe(sModal, { attributes: true, attributeFilter: ['data-open'] });
    document.addEventListener('focusin', (e) => { if (opened && e.target.closest?.('#contact-form')) yieldPopup(); });
    document.addEventListener('tis:contact-sent', () => { if (opened) closePopup(); retired = true; });

    mktCard.addEventListener('focusin', (e) => {
      if (!mktCard.contains(e.relatedTarget)) lastFocus = e.relatedTarget;
    });
    // Privacy link: close this first; the delegated [data-legal] handler opens the dialog.
    mkt.addEventListener('click', (e) => { if (e.target.closest('[data-legal]')) closePopup(); });

    function showSuccess() {
      // Same card: the text, form and fine print give way to the success block (CSS
      // .is-done), which is announced, and focus moves to the close button (A11Y-03).
      primeCheck(mktCard.querySelector('.mkt-done .seal'));
      mktCard.classList.add('is-done');
      live.textContent = t('Subscribed. Thank you.', '訂閱成功，謝謝您。');
      const close = mktCard.querySelector('[data-mkt-close]');
      if (close && mktCard.contains(document.activeElement)) close.focus();
    }

    // → `newsletter` tab, source=popup. Email only.
    mktForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearFormError(mktForm);
      const payload = serializeForm(mktForm, { form: 'newsletter', source: 'popup' });
      if (!EMAIL_RE.test(payload.email || '')) {
        showFormError(mktForm, t('Enter a valid email address.', '請填寫有效的電子郵件。'));
        flagField(mktForm, mktForm.querySelector('[name="email"]'));
        return;
      }
      if (!frontDeskLive()) { showSuccess(); return; }
      const mktBtn = mktCard.querySelector('.mkt-cta');
      pending(mktBtn, true);
      try {
        await frontDeskPost(payload);
        showSuccess();
      } catch (err) {
        showFormError(mktForm, sendFailed());
      } finally {
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

    if (!isSuppressed()) {
      measure();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', measure, { passive: true });
      // Fetch the photo once the page has settled, so the card never opens on an empty
      // frame (POP-14); suppressed visitors never download it.
      window.addEventListener('load', () => {
        measure();
        const img = mkt.querySelector('[data-mkt-img]');
        if (img) img.loading = 'eager';
      }, { once: true });
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
      document.querySelector('.topnav'),   // same set as landmarksOf(): the header is background too
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
      // A short exit instead of a snap (MOTION-07); CSS keys the fade on "closing".
      lglOverlay.dataset.open = 'closing';
      setTimeout(() => { if (lglOverlay.dataset.open === 'closing') lglOverlay.dataset.open = 'false'; }, 180);
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
  const EASE = 'cubic-bezier(0.16,1,0.3,1)';       // --ease-reveal (the FLIP morph)
  const EASE_OUT = 'cubic-bezier(0.23,1,0.32,1)';  // --ease-out: every enter and exit, no ease-in (MOTION-07)
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
    backdrop.animate([{opacity:0},{opacity:1}], {duration: reduce()?120:220, easing:EASE_OUT, fill:'forwards'});

    if (!morphs()){
      // Reduced motion, or any touch device: fade (plus a short rise when motion is
      // allowed) instead of the FLIP. No geometry to measure, nothing to keep in sync
      // with a card that may have scrolled away underneath.
      const ms = reduce() ? 120 : 200;
      const from = reduce() ? {opacity:0} : {opacity:0, transform:'translateY(12px)'};
      const to   = reduce() ? {opacity:1} : {opacity:1, transform:'none'};
      animating = true;
      settle(panel.animate([from, to], {duration:ms, easing:EASE_OUT, fill:'forwards'}),
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
      { duration:320, delay:130, easing:EASE_OUT, fill:'both' });
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
    backdrop.animate([{opacity:1},{opacity:0}], {duration: reduce()?100:180, easing:EASE_OUT, fill:'forwards'});
    if (!morphs()){
      const ms = reduce() ? 100 : 180;
      animating = true;
      settle(panel.animate([{opacity:1},{opacity:0}], {duration:ms, easing:EASE_OUT, fill:'forwards'}),
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
    // The merged request form (2026-10-11); the separate #intake-form went with the hold.
    const form = document.getElementById('contact-form');
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
  // BUTTON CTAs only: an <a> CTA has to navigate, and binding this would swallow the click.
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
})();

/* Front Desk capture posts to FRONT_DESK_ENDPOINT above. The Apps Script that
   receives it — its source, deployment steps and the trap that redeploying under
   "New deployment" mints a different /exec URL — is in
   documents/front-desk-apps-script.md. It used to sit here as a 129-line comment,
   which shipped ~6 KB of runbook to every visitor on every page. */
