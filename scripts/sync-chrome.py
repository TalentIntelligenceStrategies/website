"""Canonical site chrome: the one source for the top nav + mega panels, the mobile
drawer, the search modal's "Jump to" list and the footer. The chrome is still
duplicated in every page (no include mechanism on GitHub Pages); this script writes
it into each file in PAGES between fixed boundaries, so a nav change is one edit here
plus one run. Spec: DESIGN.md §4 (nav) and §8 (footer).

  python3 scripts/sync-chrome.py            # dry run: prints line counts per page
  python3 scripts/sync-chrome.py --write    # rewrite the pages

Idempotent: a second --write changes nothing. New page? Add it to PAGES with its
footer lockup (True on Insights pages, per visual-guide §Partner Credit by Pillar)
and whether its footer is inert (veiled pages). Run `npm run build` afterwards so
the CJK font subset picks up any new data-zh strings."""
import re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
ARROW = '<svg class="mega-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>'
CHEV = '<svg class="mobile-nav-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>'
FLAG = '<span class="status-flag" data-zh="即將推出">Coming soon</span>'

# (key, EN, ZH, main links, resources) — each link: (href, EN, ZH, flag?).
# The section's page is PAGE_HREF[key]: the panel eyebrow links to it (there is no
# "Overview" row), and the main links are anchors within that page.
NAV = [
    ('sustain', 'Sustain', '維運', [
        ('/sustain/#service-package', 'Service package', '服務項目'),
        ('/sustain/#network', 'Island-wide network', '全台服務網'),
        ('/sustain/#roadmap', 'Capability roadmap', '能力路線圖'),
        ('/sustain/#compliance', 'Compliance: two lanes', '合規：雙軌制'),
    ], [
        ('/why-taiwan/', 'Why Taiwan', '為何是台灣'),
        ('/engage/#phases', 'Engagement phases', '合作階段'),
    ]),
    ('protect', 'Protect', '保護', [
        ('/protect/#why-neutral', 'Why a neutral advisor', '為何需要中立顧問'),
        ('/protect/#capabilities', 'Three capabilities', '三項核心能力'),
        ('/protect/#filing-strategy', 'Taiwan & Asia filing strategy', '台灣與亞洲申請策略'),
    ], [
        ('/reports/', 'Landscape reports', '專利布局報告'),
        ('/engage/#bundle', 'Sustainment Bundle', '維運組合方案'),
    ]),
    ('license', 'License', '授權', [
        ('/license/#portfolio', 'TIS × Innovue UAV patent portfolio', 'TIS × Innovue 無人機專利組合'),
        ('/license/#services', 'Licensing services', '授權服務'),
        ('/license/#commitments', 'Our neutrality commitments', '我們的中立承諾'),
    ], [
        ('/why-taiwan/#patents', 'Taiwan patent picture', '台灣專利現況'),
    ]),
    ('ecosystem', 'Ecosystem', '生態系', [
        ('/ecosystem/#suntek', 'Suntek Group / PG Union', 'Suntek Group / PG Union'),
        ('/ecosystem/#fairtech', 'FairTech', '富蘭登科技'),
        ('/ecosystem/#innovue', 'Innovue', 'Innovue'),
    ], [
        ('/ecosystem/#map', 'How it fits together', '整體架構'),
        ('/engage/', 'Start an engagement', '開始合作'),
    ]),
    ('insights', 'Insights', '洞察', [
        ('/reports/#reports', 'Landscape reports', '專利布局報告'),
        ('/product/signal/methodology.html', 'SABCD rating', 'SABCD 評級方法'),
        ('/product/signal/', 'Patent Intelligence SaaS', '泰然專利強度評級系統'),
        ('/product/licensing/', 'Licensing Platform', '泰然專利防護網', True),
    ], [
        ('/reports/#press', 'Press', '新聞'),
    ]),
    ('about', 'About', '關於', [
        ('/why-taiwan/', 'Why Taiwan', '為何是台灣'),
        ('/about/#governance', 'Governance & neutrality', '治理與中立'),
        ('/about/#board', 'Board of directors', '董事會'),
    ], [
        ('/engage/', 'Engagement model', '合作模式'),
        ('/legal/disclosures.en.html', 'Disclosures', '揭露聲明'),
    ]),
]

PAGE_HREF = {'sustain': '/sustain/', 'protect': '/protect/', 'license': '/license/',
             'ecosystem': '/ecosystem/', 'insights': '/reports/', 'about': '/about/'}

def esc(s): return s.replace('&', '&amp;')

# Lucide glyphs for footer links, keyed by href. Survivors keep their pre-restructure icon.
FOOTER_ICONS = {
    '/sustain/': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',  # wrench
    '/protect/': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',  # shield
    '/license/': '<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5"/>',  # key-round
    '/ecosystem/': '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',  # network
    '/about/': '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',  # box
    '/why-taiwan/': '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',  # map-pin
    '/engage/': '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',  # mail
    '/reports/': '<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/>',  # paperclip
    '/product/signal/methodology.html': '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',  # chart-line
    '/product/signal/': '<path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z"/><path d="m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845"/>',  # layers
    '/product/licensing/': '<path d="M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0"/><path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2"/>',
    'terms': '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
    'privacy': '<path d="M12 3v18"/><path d="m19 8 3 8a5 5 0 0 1-6 0zV7"/><path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"/><path d="m5 8 3 8a5 5 0 0 1-6 0zV7"/><path d="M7 21h10"/>',
    'disclosures': '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/>',
}
def ficon(key):
    return f'<svg class="footer-ico" viewBox="0 0 24 24" aria-hidden="true">{FOOTER_ICONS[key]}</svg>'


def link(l, cls, arrow=False):
    href, en, zh = l[0], l[1], l[2]
    flag = (' ' + FLAG) if len(l) > 3 and l[3] else ''
    legal = ' data-legal="disclosures"' if 'disclosures' in href else ''
    return (f'<a href="{href}" class="{cls}"{legal}><span data-zh="{zh}">{esc(en)}</span>{flag}'
            + (ARROW if arrow else '') + '</a>')

def header():
    items = []
    for key, en, zh, main, res in NAV:
        mains = '\n'.join(f'              <li>{link(l, "mega-link", True)}</li>' for l in main)
        ress = '\n'.join(f'              <li>{link(l, "mega-res-link")}</li>' for l in res)
        items.append(f'''      <li class="nav-item" data-nav="{key}">
        <button type="button" class="topnav-link nav-trigger" id="nav-t-{key}" aria-expanded="false" aria-controls="mega-{key}"><span data-zh="{zh}">{en}</span></button>
        <div class="mega-panel" id="mega-{key}" role="region" aria-labelledby="nav-t-{key}">
          <div class="mega-main">
            <a class="mega-eyebrow mega-eyebrow--page" href="{PAGE_HREF[key]}"><span data-zh="{zh}">{en}</span>{ARROW}</a>
            <ul class="mega-list">
{mains}
            </ul>
          </div>
          <div class="mega-aside">
            <p class="mega-eyebrow" data-zh="資源">Resources</p>
            <ul class="mega-res">
{ress}
            </ul>
          </div>
        </div>
      </li>''')
    items = '\n'.join(items)
    return f'''<header class="topnav" role="banner">
  <div class="container topnav-inner">
    <a href="/" class="topnav-logo-link" aria-label="TIS — home" data-zh-aria="泰然策略解密 — 首頁">
      <span class="topnav-logo" aria-hidden="true"></span>
    </a>

    <span class="topnav-spacer"></span>

    <nav class="topnav-links" aria-label="Primary" data-zh-aria="主要導覽">
      <ul class="nav-items">
{items}
      </ul>
    </nav>

    <div class="topnav-controls">
      <!-- Theme toggle — 3-segment pill: System / Light / Dark (restored 2026-09-29 from ef34f5b^) -->
      <div id="theme-toggle" class="theme-toggle" role="group" aria-label="Theme" data-zh-aria="主題">
        <button class="theme-seg" type="button" data-theme-set="system" aria-label="System theme" data-zh-aria="跟隨系統" aria-pressed="false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        </button>
        <button class="theme-seg" type="button" data-theme-set="light" aria-label="Light theme" data-zh-aria="淺色主題" aria-pressed="false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        </button>
        <button class="theme-seg" type="button" data-theme-set="dark" aria-label="Dark theme" data-zh-aria="深色主題" aria-pressed="false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
      </div>

      <!-- Language switcher — Lucide `globe` icon (brand/assets/icons/ui/globe.svg) -->
      <div class="lang-wrap" id="lang-wrap">
        <button id="lang-trigger" type="button" class="icon-btn icon-btn--code" aria-label="Switch language" data-zh-aria="切換語言" aria-haspopup="menu" aria-expanded="false">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
            <path d="M2 12h20"/>
          </svg>
          <span class="lang-code" aria-hidden="true">EN</span>
        </button>
        <div class="lang-menu" role="menu">
          <button type="button" data-lang-set="en" role="menuitemradio" aria-checked="true">English</button>
          <button type="button" data-lang-set="zh" role="menuitemradio" aria-checked="false">中文</button>
        </div>
      </div>

      <!-- Search trigger — Lucide `search` icon (brand/assets/icons/ui/search.svg) -->
      <button id="search-trigger" type="button" class="icon-btn" aria-label="Search" data-zh-aria="搜尋" aria-haspopup="dialog" aria-expanded="false" aria-controls="search-modal">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m21 21-4.34-4.34"/>
          <circle cx="11" cy="11" r="8"/>
        </svg>
      </button>

      <a href="/engage/#contact" class="btn btn-primary topnav-cta" data-zh="聯絡我們">Contact</a>

      <!-- Mobile trigger -->
      <button class="topnav-mobile-trigger" id="mobile-trigger" type="button" aria-label="Open menu" data-zh-aria="開啟選單" aria-expanded="false" aria-controls="mobile-drawer">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
</header>
<!-- Mega-panel scrim. Outside the header on purpose: .topnav's backdrop-filter makes it
     the containing block for fixed descendants, so a fixed scrim inside it would be
     clipped to the 64px bar. z-index 99 sits under the nav (100), over the veil (95). -->
<div class="mega-scrim" id="mega-scrim" aria-hidden="true"></div>'''

def drawer():
    groups = []
    for key, en, zh, main, res in NAV:
        mains = '\n'.join(f'      {link(l, "mobile-sub-link")}' for l in main)
        ress = '\n'.join(f'      {link(l, "mobile-sub-link mobile-sub-link--res")}' for l in res)
        groups.append(f'''    <button type="button" class="mobile-row-dropdown" id="m-t-{key}" data-nav="{key}" aria-expanded="false" aria-controls="m-sub-{key}">
      <span data-zh="{zh}">{en}</span>
      {CHEV}
    </button>
    <div id="m-sub-{key}" class="mobile-sublist">
      <a href="{PAGE_HREF[key]}" class="mobile-sub-link mobile-sub-link--page"><span data-zh="{zh}">{en}</span>{ARROW}</a>
{mains}
      <p class="mobile-sub-label" data-zh="資源">Resources</p>
{ress}
    </div>''')
    groups = '\n'.join(groups)
    return f'''<div class="mobile-overlay" id="mobile-overlay"></div>
<aside class="mobile-drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu" data-zh-aria="選單">
  <div class="mobile-header">
    <span class="mobile-header-logo" aria-hidden="true"></span>
    <button class="icon-btn" id="mobile-close" type="button" aria-label="Close menu" data-zh-aria="關閉選單">
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
  </div>
  <nav class="mobile-list" aria-label="Primary mobile" data-zh-aria="主要導覽（行動版）">
{groups}
  </nav>
  <div class="mobile-auth">
    <!-- Language sits in the drawer footer because the topnav globe is hidden
         behind the drawer once it is open, leaving the switch unreachable on a
         phone. Same hook the topnav menu uses, so site.js picks these up and
         keeps aria-checked in sync across both. -->
    <div class="mobile-lang mobile-theme" role="radiogroup" aria-label="Theme" data-zh-aria="主題">
      <button type="button" data-theme-set="system" role="radio" aria-checked="false"><span data-zh="系統">System</span></button>
      <button type="button" data-theme-set="light" role="radio" aria-checked="false"><span data-zh="淺色">Light</span></button>
      <button type="button" data-theme-set="dark" role="radio" aria-checked="false"><span data-zh="深色">Dark</span></button>
    </div>
    <div class="mobile-lang" role="radiogroup" aria-label="Language" data-zh-aria="語言">
      <button type="button" data-lang-set="en" role="radio" aria-checked="true">English</button>
      <button type="button" data-lang-set="zh" role="radio" aria-checked="false">中文</button>
    </div>
    <a href="/engage/#contact" class="btn btn-primary" data-zh="聯絡我們">Contact</a>
  </div>
</aside>'''

SEARCH_JUMP = [
    ('/sustain/', 'Sustain', '維運', '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'),
    ('/protect/', 'Protect', '保護', '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
    ('/license/', 'License', '授權', '<path d="M20 7h-9M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>'),
    ('/ecosystem/', 'Ecosystem', '生態系', '<circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="m7 7 3 3M17 7l-3 3M7 17l3-3M17 17l-3-3"/>'),
    ('/why-taiwan/', 'Why Taiwan', '為何是台灣', '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>'),
    ('/reports/', 'Insights', '洞察', '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>'),
    ('/product/signal/methodology.html', 'SABCD rating', 'SABCD 評級方法', '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>'),
    ('/about/', 'About', '關於', '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'),
    ('/engage/#contact', 'Contact', '聯絡我們', '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/>'),
]

def search():
    rows = '\n'.join(f'''    <a href="{h}" class="search-link">
      <svg viewBox="0 0 24 24" aria-hidden="true">{ico}</svg>
      <span data-zh="{zh}">{en}</span>
      <span class="search-link-meta" data-zh="頁面">Page</span>
    </a>''' for h, en, zh, ico in SEARCH_JUMP)
    return f'''<div class="search-overlay" id="search-overlay"></div>
<div class="search-modal" id="search-modal" role="dialog" aria-modal="true" aria-label="Search" data-zh-aria="搜尋">
  <div class="search-input-row">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m21 21-4.34-4.34"/>
      <circle cx="11" cy="11" r="8"/>
    </svg>
    <input id="search-input" type="text" class="search-input" aria-label="Search" data-zh-aria="搜尋" data-zh-placeholder="搜尋頁面、報告與新聞…" placeholder="Search pages, reports and press…" autocomplete="off" spellcheck="false" />
    <button type="button" class="search-esc" id="search-close" aria-label="Close search" data-zh-aria="關閉搜尋"><span aria-hidden="true">Esc</span></button>
  </div>
  <div class="search-results">
    <p class="search-section-label" data-zh="跳至">Jump to</p>
{rows}
  </div>
</div>'''

FOOTER_COLS = [
    ('Services', '服務', [('/sustain/', 'Sustain', '維運'), ('/protect/', 'Protect', '保護'), ('/license/', 'License', '授權')]),
    ('Company', '公司', [('/ecosystem/', 'Ecosystem', '生態系'), ('/why-taiwan/', 'Why Taiwan', '為何是台灣'), ('/about/', 'About', '關於'), ('/engage/', 'Engage', '合作')]),
    ('Insights', '洞察', [('/reports/', 'Reports & press', '報告與新聞'), ('/product/signal/methodology.html', 'SABCD rating', 'SABCD 評級方法'), ('/product/signal/', 'Patent Intelligence SaaS', '泰然專利強度評級系統'), ('/product/licensing/', 'Licensing Platform', '泰然專利防護網', True)]),
]

def footer(lockup, inert):
    cols = []
    for h, hz, links in FOOTER_COLS:
        lis = '\n'.join(f'              <li>{link(l, "footer-link").replace(">", ">" + ficon(l[0]), 1)}</li>' for l in links)
        cols.append(f'''          <div class="footer-col">
            <h2 data-zh="{hz}">{h}</h2>
            <ul>
{lis}
            </ul>
          </div>''')
    cols.append(f'''          <div class="footer-col">
            <h2 data-zh="法律">Legal</h2>
            <ul>
              <li><a href="/legal/terms.en.html" data-legal="terms">{ficon('terms')}<span data-zh="服務條款">Terms</span></a></li>
              <li><a href="/legal/privacy.en.html" data-legal="privacy">{ficon('privacy')}<span data-zh="隱私政策">Privacy</span></a></li>
              <li><a href="/legal/disclosures.en.html" data-legal="disclosures">{ficon('disclosures')}<span data-zh="揭露聲明">Disclosures</span></a></li>
            </ul>
          </div>''')
    cols = '\n'.join(cols)
    # Per-pillar partner credit (brand/visual-guide.md §Partner Credit by Pillar):
    # Insights pages keep the TIS|Innovue lockup; front-door pages carry the submark alone.
    if lockup:
        logo = '''          <div class="footer-logo-row">
            <span class="footer-logo" aria-hidden="true"></span>
            <span class="footer-divider" aria-hidden="true"></span>
            <span class="footer-innovue" role="img" aria-label="Innovue"></span>
          </div>'''
    else:
        logo = '''          <div class="footer-logo-row">
            <span class="footer-logo" role="img" aria-label="TIS" data-zh-aria="泰然策略解密"></span>
          </div>'''
    ia = ' inert aria-hidden="true"' if inert else ''
    return f'''<footer class="footer" role="contentinfo"{ia}>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-identity">
          <div class="footer-nl-block" id="footer-nl-block">
            <div class="footer-nl-label" data-zh="訂閱最新動態">Get our latest news</div>
            <form class="footer-nl-form" id="footer-nl-form" novalidate>
              <input type="email" name="email" placeholder="Your email" data-zh-placeholder="你的電子郵件" aria-label="Email address" data-zh-aria="電子郵件" required />
              <button type="submit" aria-label="Subscribe" data-zh-aria="訂閱">
                <svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                <svg class="icon-check" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              </button>
            </form>
          </div>
{logo}
        </div>

        <div class="footer-cols">
{cols}
        </div>
      </div>
    </div>
  </footer>

  <div class="footer-baseline"{ia}>
    <div class="container">
      <p class="footer-copy">© 2026 Talent Intelligence Strategies MRO Global Inc.</p>
    </div>
  </div>'''

# Page config: (file, Innovue footer lockup, inert footer)
PAGES = [
    ('index.html', False, False),
    ('about/index.html', False, False),
    ('patents/index.html', False, False),
    ('reports/index.html', True, False),
    ('product/signal/index.html', True, False),
    ('product/signal/methodology.html', True, False),
    ('product/licensing/index.html', True, True),
    ('product/licensing/badge.html', True, True),
    ('404.html', False, False),
    ('sustain/index.html', False, False),
    ('protect/index.html', False, False),
    ('license/index.html', False, False),
    ('ecosystem/index.html', False, False),
    ('engage/index.html', False, False),
    ('why-taiwan/index.html', False, False),
    ('ausa/index.html', False, False),
]

def swap(src, start_pat, end_pat, new, label):
    m = re.search(start_pat, src)
    if not m: raise SystemExit(f'{label}: start not found')
    e = re.compile(end_pat).search(src, m.start())
    if not e: raise SystemExit(f'{label}: end not found')
    return src[:m.start()] + new + src[e.end():]

def apply(path, lockup, inert, write):
    p = ROOT / path
    s = p.read_text(encoding='utf-8')
    orig = s
    s = swap(s, r'<header class="topnav"', r'</header>(\n<!-- Mega-panel scrim\.(?s:.*?)-->\n<div class="mega-scrim"[^>]*></div>)?', header(), path + ' header')
    s = swap(s, r'<div class="mobile-overlay"', r'</aside>', drawer(), path + ' drawer')
    # search modal: from overlay to the modal's closing </div> at column 0
    m = re.search(r'<div class="search-overlay"', s)
    if not m: raise SystemExit(path + ': search not found')
    e = s.find('\n</div>', s.find('<div class="search-results">', m.start()))
    # results' own close is indented ("\n  </div>"), so the first column-0 close is the modal's
    s = s[:m.start()] + search() + s[e + len('\n</div>'):]
    s = swap(s, r'<footer class="footer"', r'<div class="footer-baseline"[^>]*>\s*<div class="container">\s*<p class="footer-copy">[^<]*</p>\s*</div>\s*</div>', footer(lockup, inert), path + ' footer')
    if write and s != orig:
        p.write_text(s, encoding='utf-8')
    return orig, s

if __name__ == '__main__':
    write = '--write' in sys.argv
    for f, lk, inert in PAGES:
        o, n = apply(f, lk, inert, write)
        print(f'{f}: {len(o.splitlines())} -> {len(n.splitlines())} lines' + (' (written)' if write else ''))
