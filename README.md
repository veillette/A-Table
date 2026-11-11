# À Table

A responsive recipe collection with editorial food cards, search and category filters, locally saved favorites, adjustable servings, ingredient checklists, and printable recipes.

## Run locally

Serve `dist/` with any static HTTP server, for example `python3 -m http.server 8000 --directory dist`.

## Content

Recipes are stored in `dist/app.js`. Edit the recipe objects to add or update cards. Recipe images are stored in `dist/images/` as WebP files. Fonts load from Google Fonts. Saved favorites remain in the visitor's browser.

The site uses plain HTML, CSS, and JavaScript with no build dependencies. Deploy `dist/` to a static host. For GitHub Pages, publish from the included GitHub Actions workflow.
