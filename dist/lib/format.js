// Pure helpers shared by the UI and the tests. No DOM access in this file.

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape text for safe interpolation into HTML. */
export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);

/** Lowercase and strip accents so "crème" matches "creme". */
export const normalizeText = (text) =>
  text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

/** The text a search query is matched against: name, subtitle and ingredient names. */
export const recipeSearchText = (recipe) =>
  normalizeText([recipe.name, recipe.sub, ...recipe.ingredients.map((i) => i[2])].join(' '));

export const ALL_CATEGORIES = 'All recipes';

/** Filter recipes by category, saved-only state and search query. */
export function filterRecipes(recipes, { category = ALL_CATEGORIES, savedOnly = false, savedIds = [], query = '' } = {}) {
  const needle = normalizeText(query);
  return recipes.filter(
    (recipe) =>
      (category === ALL_CATEGORIES || recipe.category === category) &&
      (!savedOnly || savedIds.includes(recipe.id)) &&
      recipeSearchText(recipe).includes(needle),
  );
}

/** Unique category names, with the "All recipes" option first. */
export function categoriesOf(recipes) {
  return [ALL_CATEGORIES, ...new Set(recipes.map((recipe) => recipe.category))];
}

/** Scale an ingredient quantity from the recipe's base servings to the chosen servings. */
export function scaleQuantity(quantity, servings, baseServings) {
  return Number(((quantity * servings) / baseServings).toFixed(2));
}

/**
 * Human-readable ingredient line, e.g. [400, 'g', 'baby potatoes'] -> "400 g baby potatoes".
 * An empty unit (counted items such as eggs) is skipped rather than leaving a double space.
 */
export function formatIngredient([quantity, unit, name], servings, baseServings) {
  const amount = scaleQuantity(quantity, servings, baseServings);
  return [amount, unit, name].filter((part) => part !== '' && part != null).join(' ');
}

/** Path to the full-size image, relative to the site root. */
export const imagePath = (id) => `images/${id}.webp`;

/** Path to the card thumbnail, relative to the site root. */
export const thumbPath = (id) => `images/thumbs/${id}.webp`;

/** Text for the result count line above the cards. */
export function resultLabel(count, savedOnly) {
  return `${String(count).padStart(2, '0')} ${savedOnly ? 'SAVED ' : ''}RECIPES TO MAKE YOUR OWN`;
}
