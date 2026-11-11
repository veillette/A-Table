import { escapeHtml, formatIngredient, imagePath } from '../lib/format.js';

const MIN_SERVINGS = 1;

/**
 * Controller for the recipe dialog. The page is rendered once per opened
 * recipe. Changing servings only updates the amounts in place, so the
 * ingredient checkboxes keep their state.
 */
export function createDetail(dialog) {
  const body = dialog.querySelector('#recipe-body');
  let recipe = null;
  let servings = 2;

  function render() {
    const r = recipe;
    body.innerHTML = `<img class="detail-photo" src="${imagePath(r.id)}" alt="${escapeHtml(r.name)}" decoding="async">
<div class="detail">
  <p class="eyebrow">À TABLE / ${escapeHtml(r.category.toUpperCase())}</p>
  <h2 id="recipe-title">${escapeHtml(r.name)}</h2>
  <p>${escapeHtml(r.sub)}<br>${escapeHtml(r.description)}</p>
  <div class="detail-tools">
    <span>◷ ${r.time} minutes · ${escapeHtml(r.difficulty)}</span>
    <button id="minus" aria-label="Fewer servings">−</button>
    <span id="servings-label" aria-live="polite"></span>
    <button id="plus" aria-label="More servings">+</button>
    <button id="print">Print card ↗</button>
  </div>
  <div class="detail-columns">
    <section>
      <h3>What you'll need</h3>
      <ul class="ingredients">
        ${r.ingredients
          .map(
            (_, index) =>
              `<li><label><input type="checkbox"><span data-ingredient="${index}"></span></label></li>`,
          )
          .join('')}
      </ul>
      <p class="tip">Pantry staples: salt and black pepper.</p>
    </section>
    <section>
      <h3>Let's get cooking</h3>
      <ol class="steps">${r.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
      <p class="tip"><strong>A little kitchen wisdom</strong><br>${escapeHtml(r.tip)}</p>
      <p class="scaling-note">Ingredient amounts scale with servings; use a suitably sized pan.</p>
    </section>
  </div>
</div>`;

    body.querySelector('#minus').onclick = () => changeServings(-1);
    body.querySelector('#plus').onclick = () => changeServings(1);
    body.querySelector('#print').onclick = () => window.print();
    updateAmounts();
  }

  /** Refresh ingredient amounts and the servings controls without rebuilding the page. */
  function updateAmounts() {
    recipe.ingredients.forEach((ingredient, index) => {
      body.querySelector(`[data-ingredient="${index}"]`).textContent = formatIngredient(
        ingredient,
        servings,
        recipe.servings,
      );
    });
    body.querySelector('#servings-label').textContent = `${servings} servings`;
    body.querySelector('#minus').disabled = servings <= MIN_SERVINGS;
  }

  function changeServings(delta) {
    const next = Math.max(MIN_SERVINGS, servings + delta);
    if (next === servings) return;
    servings = next;
    updateAmounts();
  }

  function open(next) {
    recipe = next;
    servings = recipe.servings;
    render();
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    dialog.close();
    // Restore scrolling now; the close event also does this for Escape.
    document.body.style.overflow = '';
  }

  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
  });

  // With no padding on the dialog, a click whose target is the dialog itself
  // landed on the backdrop.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
  dialog.querySelector('.close').onclick = close;

  return { open, close };
}
