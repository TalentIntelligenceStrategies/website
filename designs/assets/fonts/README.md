# Fonts

Self-hosted font files for the TIS brand stack. Layout is the Google Fonts ZIP-extracted structure: one folder per family, each containing per-weight TTFs in `static/` plus the family's variable-font TTF and license/README files at the folder root.

All three families ship under the [SIL Open Font License](https://openfontlicense.org/) — fine to redistribute. Source: download family ZIP from [Google Fonts](https://fonts.google.com), unzip into this folder.

## Structure

```
brand/assets/fonts/
├── Urbanist/
│   ├── OFL.txt
│   ├── README.txt
│   ├── Urbanist-VariableFont_wght.ttf
│   ├── Urbanist-Italic-VariableFont_wght.ttf
│   └── static/
│       ├── Urbanist-Regular.ttf      (weight 400)
│       ├── Urbanist-Medium.ttf       (weight 500)
│       ├── Urbanist-SemiBold.ttf     (weight 600)
│       └── Urbanist-Bold.ttf         (weight 700)
├── Inconsolata/
│   ├── OFL.txt
│   ├── README.txt
│   ├── Inconsolata-VariableFont_wdth,wght.ttf
│   └── static/
│       ├── Inconsolata-Regular.ttf   (weight 400)
│       ├── Inconsolata-Medium.ttf    (weight 500)
│       └── Inconsolata-Bold.ttf      (weight 700)
└── Noto Sans TC/
    ├── OFL.txt
    ├── README.txt
    ├── NotoSansTC-VariableFont_wght.ttf
    └── static/
        ├── NotoSansTC-Regular.ttf    (weight 400)
        ├── NotoSansTC-Medium.ttf     (weight 500)
        ├── NotoSansTC-SemiBold.ttf   (weight 600)
        └── NotoSansTC-Bold.ttf       (weight 700)
```

Per-weight static TTFs are the canonical consumption path. The variable-font files at each family root and the `static/` weights outside the four/three/four list above (ExtraBold, Italic, condensed/expanded Inconsolata variants) are unused by [`@font-face` declarations in the deck](../../brand-showcase.html) but are retained for future use.

## `@font-face` consumption

Eleven declarations in [brand-showcase.html](../../brand-showcase.html) reference these files via:

```
url('assets/fonts/<Family>/static/<Family>-<Weight>.ttf') format('truetype')
```

The "Noto Sans TC" path has spaces — kept as-is and quoted in CSS `url(...)`. Modern browsers handle this; if a downstream surface complains, URL-encode the spaces (`Noto%20Sans%20TC`).

## Why self-hosted

- Brand bundle is self-contained — no external network call at render.
- Decks shared as files load correctly offline.
- Three downstream surfaces all point at the same canonical files; no version drift.
- CSP / privacy: no third-party font CDN.

If a family is replaced, only the two token values in [design-tokens.md §7.2](../../design-tokens.md) change; everything else cascades.

## Future migration to woff2

TTF works but is ~3× larger than woff2. When a converter is available (`brew install woff2` → `woff2_compress <file.ttf>`), regenerate the eleven needed weights as flat woff2 files at this folder's root, update the deck's `@font-face` `src` and `format(...)` lines, and the family folders here can stay as license provenance.
