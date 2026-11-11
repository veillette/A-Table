import { recipes } from './recipes.js';
import { ALL_CATEGORIES, categoriesOf, filterRecipes, resultLabel, escapeHtml } from './lib/format.js';
import { loadFavorites, saveFavorites, toggleFavorite } from './lib/favorites.js';
import { cardsHtml } from './ui/cards.js';
import { createDetail } from './ui/detail.js';

const $ = (selector) => document.querySelector(selector);

const state = {
  category: ALL_CATEGORIES,
  savedOnly: false,
  query: '',
  favorites: loadFavorites(),
};

const detail = createDetail($('#recipe'));

function render() {
  const list = filterRecipes(recipes, { ...state, savedIds: state.favorites });
  $('#cards').innerHTML = cardsHtml(list, state.favorites);
  $('#empty').hidden = list.length > 0;
  $('#result-count').textContent = resultLabel(list.length, state.savedOnly);
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

$('#cards').onclick = (event) => {
  const save = event.target.closest('[data-save]');
  const open = event.target.closest('[data-open]');
  if (save) {
    state.favorites = toggleFavorite(state.favorites, save.dataset.save);
    saveFavorites(state.favorites);
    render();
    // Cards are rebuilt on every change, so put keyboard focus back on the same button.
    $(`[data-save="${CSS.escape(save.dataset.save)}"]`)?.focus();
  }
  if (open) openRecipe(open.dataset.open);
};

function openRecipe(id) {
  const recipe = recipes.find((r) => r.id === id);
  if (recipe) detail.open(recipe);
}

// The hero recipe is the one marked `featured: true` in recipes.js (validated by npm run validate).
const featured = recipes.find((r) => r.featured);
if (featured) $('#featured').onclick = () => detail.open(featured);

renderFilters();
render();
