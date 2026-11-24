import { recipes, recipesById } from './recipes.js';
import { recipeFromSearch, recipeLink } from './lib/recipe-links.js';
import { ALL_CATEGORIES, categoriesOf, filterRecipes, resultLabel, escapeHtml, imagePath } from './lib/format.js';
import { loadFavorites, saveFavorites, toggleFavorite, pruneFavorites } from './lib/favorites.js';
import { cardsHtml, updateFavoriteButton } from './ui/cards.js';
import { createDetail } from './ui/detail.js';

const $ = (selector) => document.querySelector(selector);

const cards = $('#cards');
const storedFavorites = loadFavorites();
const favorites = pruneFavorites(storedFavorites, recipesById);
if (favorites.length !== storedFavorites.length) saveFavorites(favorites);

const state = {
  category: ALL_CATEGORIES,
  savedOnly: false,
  query: '',
  favorites,
};

const detail = createDetail($('#recipe'));

const EMPTY_MESSAGE = 'No recipes found. Try another ingredient or category.';
const NO_SAVED_MESSAGE = 'Tap ♡ on a recipe to save it.';

function render() {
  const list = filterRecipes(recipes, { ...state, savedIds: state.favorites });
  cards.innerHTML = cardsHtml(list, state.favorites);
  updateSummary();
}

function updateSummary() {
  const count = cards.childElementCount;
  $('#empty').hidden = count > 0;
  $('#empty').textContent = state.savedOnly && state.favorites.length === 0 ? NO_SAVED_MESSAGE : EMPTY_MESSAGE;
  $('#result-count').textContent = resultLabel(count, state.savedOnly);
  $('#saved-count').textContent = state.favorites.length;
  $('#saved').setAttribute('aria-pressed', state.savedOnly);
}

function renderFilters() {
  $('#filters').innerHTML = categoriesOf(recipes)
    .map(
      (category) =>
        `<button data-filter="${escapeHtml(category)}" class="${category === state.category ? 'active' : ''}" aria-pressed="${category === state.category}">${escapeHtml(category)}</button>`,
    )
    .join('');
}

$('#filters').onclick = (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  state.category = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach((el) => {
    const selected = el === button;
    el.classList.toggle('active', selected);
    el.setAttribute('aria-pressed', selected);
  });
  render();
};

$('#search').oninput = (event) => {
  state.query = event.target.value;
  render();
};

$('#saved').onclick = () => {
  state.savedOnly = !state.savedOnly;
  render();
  $('#recipes').scrollIntoView({ behavior: 'smooth' });
};

function removeSavedCard(button) {
  const card = button.closest('.card');
  const adjacentCard = card.nextElementSibling ?? card.previousElementSibling;
  const hadFocus = card.contains(document.activeElement);
  card.remove();
  if (hadFocus) {
    const target = adjacentCard?.querySelector('[data-save]') ?? $('#saved');
    target.focus({ preventScroll: true });
  }
}

cards.onclick = (event) => {
  const save = event.target.closest('[data-save]');
  const open = event.target.closest('[data-open]');
  if (save) {
    const recipe = recipesById.get(save.dataset.save);
    state.favorites = toggleFavorite(state.favorites, recipe.id);
    saveFavorites(state.favorites);
    const saved = state.favorites.includes(recipe.id);
    if (state.savedOnly && !saved) {
      removeSavedCard(save);
    } else {
      updateFavoriteButton(save, recipe.name, saved);
    }
    updateSummary();
  }
  if (open) openRecipe(open.dataset.open);
};

function openRecipe(id) {
  const recipe = recipesById.get(id);
  if (!recipe) return;
  detail.open(recipe);
  history.replaceState(null, '', recipeLink(id));
}

$('#recipe').addEventListener('close', () => {
  const url = new URL(location.href);
  if (!url.searchParams.has('recipe')) return;
  url.searchParams.delete('recipe');
  history.replaceState(null, '', url);
});

// The hero recipe is the one marked `featured: true` in recipes.js (validated by npm run validate).
// Its photo, name and subtitle fill the hero, so changing `featured` updates the page.
const featured = recipes.find((r) => r.featured);
if (featured) {
  $('#hero-photo').src = imagePath(featured.id);
  $('#hero-photo').alt = `${featured.name}, ${featured.sub}`;
  $('#hero-name').textContent = featured.name;
  $('#hero-sub').textContent = featured.sub;
  $('#featured').onclick = () => openRecipe(featured.id);
}

renderFilters();
render();

const linkedRecipe = recipeFromSearch(location.search);
if (linkedRecipe) openRecipe(linkedRecipe.id);
