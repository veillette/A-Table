import { recipesById } from '../recipes.js';

const RECIPE_PARAM = 'recipe';

export function recipeLink(id) {
  return '?' + new URLSearchParams({ [RECIPE_PARAM]: id });
}

export function recipeFromSearch(search) {
  const id = new URLSearchParams(search).get(RECIPE_PARAM);
  return recipesById.get(id);
}
