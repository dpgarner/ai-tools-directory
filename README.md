# AI Atlas — dev notes

A static directory of AI tools: 10 categories, 103 tools, search + filters,
editorial picks, computed recommendations, and favorites stored in `localStorage`.
No backend, no external requests at runtime (strict-CSP static hosting ready).

## Structure

```
ai-tools-directory/
├── site/                  the deployable site root — copy its contents to a static host
│   ├── index.html         shell: nav, three views, footer, icon sprite
│   └── assets/
│       ├── styles.css     tokens + components (fonts declared at top)
│       ├── app.js         views, routing (#/ · #/browse · #/favorites · #/tool/<id>), favorites store
│       ├── data.js        window.ATLAS_DATA — categories, picks, shelf, tools
│       ├── favicon.svg
│       └── fonts/         self-hosted woff2 (latin subsets)
├── tools/                 dev-only checks (not deployed)
│   ├── validate-data.mjs  data integrity + copy rules (banned words, counts)
│   ├── audit.mjs          external refs, emoji, raw colors, reference integrity
│   ├── contrast.mjs       WCAG contrast gate for text token pairings
│   └── serve.mjs          local static server for preview screenshots
└── README.md
```

## Checks

```powershell
node tools/validate-data.mjs
node tools/audit.mjs
node tools/contrast.mjs
node --check site/assets/app.js
node --check site/assets/data.js
```

## Fonts

Self-hosted from Google Fonts (latin subsets, OFL): Instrument Serif (400 + italic),
Geist (variable), Geist Mono (variable). Declared in `styles.css` with local
`url("fonts/…")` refs. Unused duplicate weight files remain in `assets/fonts/`
(same variable file served per request); they are unreferenced and harmless.

## Notes & limitations

- Favorites live in `localStorage` (`aiatlas.favorites.v1`); the "For you" strip and
  the favorites-page recommendations are computed client-side from saved tools.
- Pricing labels (Free / Freemium / Paid) are indicative editorial labels, not live plan data.
- Tool links open the official sites in a new tab; no data is fetched by the page.
- Routing is hash-based by design, so the site works from any static root.
- `_diag/` — dev-only diagnostic helpers (iframe-based viewport checks and a local logging server); not part of the site.
