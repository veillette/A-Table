# Working on À Table

À Table is a static recipe collection. Read [README.md](README.md) for the full
data reference and local setup. The files in `dist/` are the editable site source
and the deployment artifact; there is no build step.

## Project map

- `dist/recipes.js`: the exported `recipes` array, the source of truth for recipes.
- `dist/images/<id>.webp`: full-size recipe photos.
- `dist/images/thumbs/<id>.webp`: recipe card thumbnails.
- `dist/lib/format.js`: search, categories, serving quantities and image paths.
- `dist/ui/cards.js` and `dist/ui/detail.js`: recipe cards and recipe dialogs.
- `dist/app.js`: application wiring; `dist/index.html`: the page and fixed hero.
- `dist/sw.js`: service worker and offline cache configuration.
- `scripts/validate-recipes.mjs` and `tests/`: existing validation and tests.

## Adding a recipe

1. Search `dist/recipes.js` for the dish, alternative spellings and its main
   ingredients. Preserve existing recipes unless the request calls for replacing
   one. A substantially different preparation can be a separate recipe.
2. Add one object to the `recipes` array, following the existing formatting.
   Choose a unique, stable lowercase ID with hyphens, such as `chicken-banh-mi`.
3. Write a complete ingredient list and method for the explicit base servings.
   Two servings is the usual starting point here. Follow the content rules below.
4. Add both required WebP images using exactly the same ID as the recipe. Follow
   the photo workflow below.
5. Run the checks and inspect the recipe in a browser. Search, categories, recipe
   counts and image paths are derived from the array and need no manual entries.
6. Report the recipe id, name and category, where its photo came from (with
   attribution if reused), each check run and its result, and whether anything
   is committed. Do not commit or push unless asked.

The step-by-step checklist is the same for every agent. In Claude Code, the
`add-recipe` skill in `.claude/skills/` points here.

Every recipe needs these fields:

| Field | Requirement |
| --- | --- |
| `id` | Unique lowercase letters, digits and single hyphens between words. |
| `name` | Correctly spelled display name; accents are supported in search. |
| `sub` | Short subtitle describing accompaniments or the preparation. |
| `category` | Reuse a suitable existing category. Categories become filter buttons automatically. |
| `time` | Positive whole number of total minutes, including required preparation and waiting. |
| `difficulty` | `Easy`, `Moderate` or `A little practice`. |
| `servings` | Positive whole number; never rely on an implicit default. |
| `description` | One or two useful sentences describing the dish. |
| `ingredients` | Nonempty array of `[quantity, unit, name]` rows. |
| `steps` | Nonempty array of method strings, in cooking order. |
| `tip` | A practical cooking, substitution or serving suggestion. |

`featured: true` is optional, and exactly one recipe in the collection must have
it. Keep the existing featured recipe when adding ordinary recipes. If changing
the featured recipe is requested, the hero updates itself from that recipe's data.
Check the hero in the browser after the change.

### Recipe content

- Use numeric quantities greater than zero. Use decimals for fractions and `""`
  for the unit on counted items, for example `[0.5, "", "cucumber, sliced"]`.
- Put quantities in ingredient rows so serving controls can scale them. In the
  method, use relative instructions such as "half the oil" or "remaining stock".
  Cooking temperatures, thicknesses and timings can stay explicit in the steps.
- Use the established metric units (`g`, `ml`) and kitchen measures (`tsp`,
  `tbsp`). Give oven settings in both Fahrenheit and Celsius.
- Include ingredients needed for promised accompaniments, such as rice or
  potatoes, and explain their preparation. Salt and black pepper are already
  listed as pantry staples in the recipe dialog.
- Make the method agree with the ingredients and photo: cuts of meat, raw versus
  cooked rice, sauces and garnishes should be consistent.
- Give realistic total times, including marinating, braising, cooling and
  resting. If timing assumes an ingredient is already cooked, say so.
- Include appropriate internal cooking temperatures and resting instructions for
  meat. Refrigerate raw-meat marinades and discard used marinade unless the
  method explains how to cook it safely. Use properly chilled rice for fried rice.
- Keep the tone warm, concise and practical, consistent with existing recipes.

### Recipe photos

Every recipe needs two real image files; do not leave a missing image or use a
photo of an unrelated dish. Match the warm cookbook style of existing photos:
natural light, neutral surfaces, ceramic dishes and a clear view of the food.
Landscape images around 3:2 crop well in the current cards and dialogs.

Use an available image generation skill for a new photo, or use a photo with
verified reuse permission and retain any required source, creator and license
attribution. Inspect the photo for agreement with the recipe. Copy generated
project assets into the repository before finishing.

With ImageMagick, create the full image and thumbnail from the chosen source
(replace the example paths and ID):

```sh
magick /path/to/source.png -resize '1200x1200>' -quality 82 -define webp:method=6 dist/images/new-recipe.webp
npm run thumbs -- new-recipe
```

## Verification

Use Node.js 26 or newer. Install dependencies with `npm ci` when needed, then run:

```sh
npm test
npm run test:offline
git diff --check
```

`npm test` checks recipe fields, unique IDs, exactly one featured recipe, missing
and orphan images, thumbnails, helpers, PWA assets and HTML. The offline test
requires Chromium; install it with `npx playwright install chromium` if missing.
These checks also run in CI. A recipe-only change can use the existing tests.

For a browser preview:

```sh
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000/`. For each added recipe, check that search and its
category find it, its card and dialog photos load, ingredients and steps read
correctly, serving controls scale quantities and checked ingredients stay
checked. Check a narrow mobile viewport as well. A passing data validator does
not establish that a recipe is practical or its photo is accurate.

## Offline support and delivery

- Keep local URLs relative so deployment under a subpath works.
- New recipe objects and photos use existing application files and image caching;
  they do not need entries in `SHELL` or a cache version bump.
- If adding or renaming JavaScript, CSS or font files, update `SHELL` in
  `dist/sw.js`. Keep the array valid JSON, bump `SHELL_VERSION`, and update
  `tests/shell.lock.json` with the matching version and SHA-256 hash reported by
  the PWA test. Re-run checks after the update.
- Photos are cached as they load while the service worker controls the page;
  visiting once does not guarantee every recipe photo is available offline.
- Preserve existing user changes. Commit, push or publish only when requested.
- When reporting completion, name the recipes added, summarize validation and
  disclose any remaining failures or missing assets.
