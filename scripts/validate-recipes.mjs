// Checks dist/recipes.js against the field reference in README.md.
// Run with `npm run validate`. Exits non-zero if any problem is found.
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

export const DIFFICULTIES = ['Easy', 'Moderate', 'A little practice'];
const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const isText = (value) => typeof value === 'string' && value.trim() !== '';
const isPositiveInt = (value) => Number.isInteger(value) && value > 0;

/**
 * Return a list of human-readable problems with the recipe list (empty if valid).
 * `imageIds` is the set of image basenames found on disk; pass null to skip image checks.
 */
export function validateRecipes(recipes, imageIds = null) {
  const errors = [];
  const seen = new Set();

  if (!Array.isArray(recipes) || recipes.length === 0) {
    return ['recipes must be a non-empty array'];
  }

  for (const [index, r] of recipes.entries()) {
    const where = r && r.id ? `recipe "${r.id}"` : `recipe #${index + 1}`;
    const fail = (message) => errors.push(`${where}: ${message}`);

    if (!r || typeof r !== 'object') {
      errors.push(`${where}: not an object`);
      continue;
    }

    if (!isText(r.id) || !ID_PATTERN.test(r.id)) fail('id must be lowercase letters, digits and hyphens');
    else if (seen.has(r.id)) fail('duplicate id');
    else seen.add(r.id);

    for (const field of ['name', 'sub', 'category', 'description', 'tip']) {
      if (!isText(r[field])) fail(`${field} is required`);
    }
    if (!isPositiveInt(r.time)) fail('time must be a positive whole number of minutes');
    if (!DIFFICULTIES.includes(r.difficulty)) fail(`difficulty must be one of: ${DIFFICULTIES.join(', ')}`);
    if (!isPositiveInt(r.servings)) fail('servings must be a positive whole number (explicit, not defaulted)');

    if (r.featured !== undefined && typeof r.featured !== 'boolean') fail('featured must be true or omitted');

    if (!Array.isArray(r.ingredients) || r.ingredients.length === 0) {
      fail('ingredients must be a non-empty array');
    } else {
      r.ingredients.forEach((ingredient, i) => {
        const valid =
          Array.isArray(ingredient) &&
          ingredient.length === 3 &&
          typeof ingredient[0] === 'number' &&
          ingredient[0] > 0 &&
          typeof ingredient[1] === 'string' &&
          isText(ingredient[2]);
        if (!valid) fail(`ingredient ${i + 1} must be [quantity > 0, unit ('' if none), name]`);
      });
    }

    if (!Array.isArray(r.steps) || r.steps.length === 0 || !r.steps.every(isText)) {
      fail('steps must be a non-empty array of text');
    } else {
      // AGENTS.md: every oven or internal temperature is given in both Fahrenheit and Celsius.
      r.steps.forEach((step, i) => {
        const fahrenheit = (step.match(/°F/g) || []).length;
        const celsius = (step.match(/°C/g) || []).length;
        if (fahrenheit !== celsius) fail(`step ${i + 1} must give each temperature in both °F and °C`);
      });
    }

    for (const field of ['name', 'sub', 'description', 'tip']) {
      if (typeof r[field] === 'string' && /\b(undefined|null|NaN)\b/.test(r[field])) {
        fail(`${field} contains a leaked placeholder value`);
      }
    }

    if (imageIds && r.id && !imageIds.has(r.id)) fail(`missing images/${r.id}.webp`);
  }

  const featuredCount = recipes.filter((r) => r && r.featured === true).length;
  if (featuredCount !== 1) errors.push(`exactly one recipe must have featured: true (found ${featuredCount})`);

  if (imageIds) {
    for (const id of imageIds) {
      if (!seen.has(id)) errors.push(`orphan image images/${id}.webp (no recipe uses it)`);
    }
  }

  return errors;
}

/** Image basenames (without .webp) for the full-size images and the card thumbnails. */
export function imageIdsOnDisk(distDir = dist) {
  const basenames = (dir) =>
    existsSync(dir)
      ? new Set(readdirSync(dir).filter((f) => f.endsWith('.webp')).map((f) => f.slice(0, -'.webp'.length)))
      : new Set();
  return {
    full: basenames(join(distDir, 'images')),
    thumbs: basenames(join(distDir, 'images', 'thumbs')),
  };
}

async function main() {
  const { recipes } = await import(pathToFileURL(join(dist, 'recipes.js')).href);
  const { full, thumbs } = imageIdsOnDisk(dist);
  const errors = validateRecipes(recipes, full);
  for (const id of full) if (!thumbs.has(id)) errors.push(`missing images/thumbs/${id}.webp`);
  for (const id of thumbs) if (!full.has(id)) errors.push(`orphan thumbnail images/thumbs/${id}.webp`);

  if (errors.length) {
    console.error(`Recipe validation failed with ${errors.length} problem(s):`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`Validated ${recipes.length} recipes and their images.`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
