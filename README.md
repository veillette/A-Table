# À Table

A responsive recipe collection with editorial food cards, search and category filters, locally saved favorites, adjustable servings, ingredient checklists, and printable recipes.

## Run locally

Serve `dist/` with any static HTTP server, for example `python3 -m http.server 8000 --directory dist`.

## Content

Recipes live in `dist/recipes.js`. Each recipe is one object in the `recipes` array:

| Field | Type | Notes |
|---|---|---|
| `id` | string | Lowercase letters, digits and hyphens. Must be unique. Also names the image files. |
| `name` | string | Card and dialog title. |
| `sub` | string | Short subtitle shown under the title. |
| `category` | string | Used for the filter buttons and search. Filter buttons are built from the categories in use in `recipes.js`. |
| `time` | whole number | Minutes. |
| `difficulty` | string | One of `Easy`, `Moderate`, `A little practice`. |
| `servings` | whole number | Base servings the ingredient amounts are written for. Always set explicitly. |
| `description` | string | One or two sentences shown in the dialog. Required. |
| `ingredients` | array | Rows of `[quantity, unit, name]`, e.g. `[400, 'g', 'baby potatoes']`. Use `''` for the unit on counted items, e.g. `[2, '', 'eggs']`. Quantities must be greater than zero. |
| `steps` | array of strings | Method steps, in order. |
| `tip` | string | Shown under "A little kitchen wisdom". |
| `featured` | `true` (optional) | Exactly one recipe must have it. It is the recipe behind the hero's "View recipe" button. |

Images: each recipe needs two WebP files with the same name as its `id`:

- `dist/images/<id>.webp`: full size (about 1200 px wide), used in the dialog.
- `dist/images/thumbs/<id>.webp`: card thumbnail (about 720 px wide), used in the grid.

To create missing thumbnails from the full-size photos (needs ImageMagick's `magick` command):

```sh
npm run thumbs                 # only missing thumbnails
npm run thumbs -- --force      # rebuild all thumbnails
npm run thumbs -- salmon       # one recipe
```

The hero at the top of the page takes its photo, name and subtitle from the `featured` recipe, so changing which recipe is featured needs no other edit. Its static text in `dist/index.html` is only a placeholder until the script runs.

Fonts (DM Sans and Libre Caslon Display) are self-hosted in `dist/fonts/`, and `dist/fonts.css` declares them. Nothing is loaded from Google. The font files are open-source (SIL Open Font License). To update them, fetch new files from Google Fonts and regenerate `fonts.css`.

Saved favorites remain in the visitor's browser.

## Install and offline use (PWA)

The site is a Progressive Web App. Visitors can install it from the browser (Add to Home Screen, or the install icon in the address bar). After one visit the pages, styles, fonts and recipe data work without a connection. Card and dialog images are cached when they load under the service worker, which starts controlling the page from the second load, so images are fully available offline from the second visit on.

- `dist/manifest.webmanifest` sets the name, colours and icons. Paths are relative, so the app also works under a subpath such as `username.github.io/A-Table/`.
- `dist/sw.js` is the service worker. On install it precaches the app shell and fonts listed in `SHELL`. Pages, scripts and styles use network first, so recipe changes appear after a deploy, with the cache used only when offline. Images use stale-while-revalidate. The image cache keeps at most 200 entries and drops the oldest first.
- `dist/pwa.js` registers the service worker. The site works without it.
- `dist/icons/` holds the icons: ink green `#243a31` with a cream "À" in Noto Serif Bold. Regenerate with ImageMagick, for example `magick -size 512x512 xc:none -fill '#243a31' -draw "roundrectangle 0,0 511,511 96,96" -font <serif-bold.ttf> -fill '#f7f4ec' -pointsize 330 -gravity center -annotate +0+-10 'À' dist/icons/icon-512.png`, then resize for `icon-192.png`.

When you add or rename a `.js`, `.css` or font file, add it to `SHELL` in `dist/sw.js`. `npm test` fails if a script or stylesheet is missing from the list. Whenever `SHELL` changes, bump `SHELL_VERSION` in `dist/sw.js` so old caches are replaced, then update `tests/shell.lock.json` with the new version and the hash shown in the failing test message. `npm test` checks both.

The offline browser test (`npm run test:offline`) covers the main path. After manual changes, also check install in a real browser: load the site, wait for it to finish, switch the network off, and reload.

## Project layout

- `dist/`: the site. `index.html`, `style.css`, `fonts.css` and `fonts/` (self-hosted fonts), `theme.js` (theme picker), `app.js` (wiring), `recipes.js` (data).
- `dist/manifest.webmanifest`, `dist/icons/`, `dist/sw.js`, `dist/pwa.js`: the installable web app and offline support (see below).
- `dist/lib/`: pure helpers (search, filtering, scaling, escaping) and favorites storage. No DOM access.
- `dist/ui/`: card and dialog rendering.
- `tests/`: unit tests for the helpers, the recipe data and the PWA files. `tests/shell.lock.json` records the precache version.
- `tests/browser/`: the offline browser test, run separately (see below).
- `scripts/validate-recipes.mjs`: checks the recipe data and image files.
- `.github/`: the deploy workflow (actions pinned to commit SHAs) and Dependabot settings.

## Checks

```sh
npm ci                       # first time only; installs html-validate and Playwright
npm test                     # recipe validation, unit tests and HTML validation
npx playwright install chromium   # first time only, for the browser test
npm run test:offline         # loads the site with the network off (needs Chromium)
```

`npm test` and `npm run test:offline` both run in CI before the site is deployed. A pull request that breaks the data, the markup or offline use will not deploy.

The site itself has no build step. Deploy `dist/` to a static host. For GitHub Pages, publish from the included GitHub Actions workflow.
