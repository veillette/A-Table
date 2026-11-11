// Pure helpers shared by the UI and the tests. No DOM access in this file.

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape text for safe interpolation into HTML. */
export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);

/** Lowercase and strip accents so "crème" matches "creme". */
export const normalizeText = (text) =>
  text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

/** The text a search query is matched against: name, subtitle, category and ingredient names. */
export const recipeSearchText = (recipe) =>
  normalizeText([recipe.name, recipe.sub, recipe.category, ...recipe.ingredients.map((i) => i[2])].join(' '));

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

const FRACTIONS = [
  [1 / 8, '⅛'],
  [1 / 4, '¼'],
  [1 / 3, '⅓'],
  [1 / 2, '½'],
  [2 / 3, '⅔'],
  [3 / 4, '¾'],
];
const FRACTION_TOLERANCE = 0.02;

/**
 * Show an amount with a kitchen fraction where one fits: 0.5 -> "½", 1.33 -> "1 ⅓".
 * Other values keep their decimal form, e.g. 0.37 -> "0.37".
 */
export function formatAmount(value) {
  if (value < FRACTION_TOLERANCE) return String(value);
  const whole = Math.floor(value);
  const rest = value - whole;
  if (rest < FRACTION_TOLERANCE) return String(whole);
  if (1 - rest < FRACTION_TOLERANCE) return String(whole + 1);
  const match = FRACTIONS.find(([fraction]) => Math.abs(rest - fraction) < FRACTION_TOLERANCE);
  if (!match) return String(value);
  return whole === 0 ? match[1] : `${whole} ${match[1]}`;
}

/**
 * Human-readable ingredient line, e.g. [400, 'g', 'baby potatoes'] -> "400 g baby potatoes".
 * An empty unit (counted items such as eggs) is skipped rather than leaving a double space.
 */
export function formatIngredient([quantity, unit, name], servings, baseServings) {
  const amount = formatAmount(scaleQuantity(quantity, servings, baseServings));
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
