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
| `category` | string | Used for the filter buttons. Existing: Fish, Chicken, Vegetarian, Beef, Pork, Turkey, Breakfast, Dessert, Lamb. |
| `time` | whole number | Minutes. |
| `difficulty` | string | One of `Easy`, `Moderate`, `A little practice`. |
| `servings` | whole number | Base servings the ingredient amounts are written for. Always set explicitly. |
| `description` | string | One or two sentences shown in the dialog. Required. |
| `ingredients` | array | Rows of `[quantity, unit, name]`, e.g. `[400, 'g', 'baby potatoes']`. Use `''` for the unit on counted items, e.g. `[2, '', 'eggs']`. Quantities must be greater than zero. |
| `steps` | array of strings | Method steps, in order. |
| `tip` | string | Shown under "A little kitchen wisdom". |

Images: each recipe needs two WebP files with the same name as its `id`:

- `dist/images/<id>.webp`: full size (about 1200 px wide), used in the dialog.
- `dist/images/thumbs/<id>.webp`: card thumbnail (about 720 px wide), used in the grid.

To create a thumbnail from a new full-size image, for example with ImageMagick:

```sh
magick dist/images/<id>.webp -resize '720x720>' -quality 72 -define webp:method=6 dist/images/thumbs/<id>.webp
```

Fonts load from Google Fonts. Saved favorites remain in the visitor's browser.

## Project layout

- `dist/`: the site. `index.html`, `style.css`, `theme.js` (theme picker), `app.js` (wiring), `recipes.js` (data).
- `dist/lib/`: pure helpers (search, filtering, scaling, escaping) and favorites storage. No DOM access.
- `dist/ui/`: card and dialog rendering.
- `tests/`: unit tests for the helpers and the recipe data.
- `scripts/validate-recipes.mjs`: checks the recipe data and image files.

## Checks

```sh
npm ci          # first time only; installs html-validate for the HTML check
npm test        # recipe validation, unit tests and HTML validation
```

`npm test` runs in CI before the site is deployed. A pull request that breaks the data or the markup will not deploy.

The site itself has no build step. Deploy `dist/` to a static host. For GitHub Pages, publish from the included GitHub Actions workflow.
