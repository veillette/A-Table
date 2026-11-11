import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  escapeHtml,
  normalizeText,
  recipeSearchText,
  filterRecipes,
  categoriesOf,
  scaleQuantity,
  formatIngredient,
  resultLabel,
} from '../dist/lib/format.js';

const sample = [
  { id: 'a', name: 'Crème brûlée', sub: 'vanilla', category: 'Dessert', time: 40, difficulty: 'Easy', servings: 2,
    description: 'd', ingredients: [[2, '', 'eggs'], [200, 'ml', 'cream']], steps: ['s'], tip: 't' },
  { id: 'b', name: 'Lemon salmon', sub: 'with rice', category: 'Fish', time: 20, difficulty: 'Easy', servings: 4,
    description: 'd', ingredients: [[2, '', 'salmon fillets']], steps: ['s'], tip: 't' },
];

describe('escapeHtml', () => {
  test('escapes markup-significant characters', () => {
    assert.equal(escapeHtml(`<img src=x onerror="a&'b">`), '&lt;img src=x onerror=&quot;a&amp;&#39;b&quot;&gt;');
  });
});

describe('search', () => {
  test('ignores accents and case', () => {
    assert.equal(normalizeText('  Crème BRÛLÉE '), 'creme brulee');
  });

  test('matches ingredient names, not only titles', () => {
    assert.ok(recipeSearchText(sample[0]).includes('cream'));
  });

  test('matches the category name, so searching "fish" finds fish recipes', () => {
    assert.deepEqual(filterRecipes(sample, { query: 'fish' }).map((r) => r.id), ['b']);
    assert.deepEqual(filterRecipes(sample, { query: 'dessert' }).map((r) => r.id), ['a']);
  });

  test('filters by query, category and saved state together', () => {
    assert.deepEqual(filterRecipes(sample, { query: 'creme' }).map((r) => r.id), ['a']);
    assert.deepEqual(filterRecipes(sample, { query: 'salmon' }).map((r) => r.id), ['b']);
    assert.deepEqual(filterRecipes(sample, { category: 'Fish' }).map((r) => r.id), ['b']);
    assert.deepEqual(filterRecipes(sample, { savedOnly: true, savedIds: ['a'] }).map((r) => r.id), ['a']);
    assert.deepEqual(filterRecipes(sample, { savedOnly: true, savedIds: [] }), []);
    assert.deepEqual(filterRecipes(sample, { query: '   ' }).length, 2);
  });

  test('lists categories with "All recipes" first and no duplicates', () => {
    assert.deepEqual(categoriesOf(sample), ['All recipes', 'Dessert', 'Fish']);
  });
});

describe('servings and amounts', () => {
  test('scales quantities linearly and rounds to two decimals', () => {
    assert.equal(scaleQuantity(400, 3, 2), 600);
    assert.equal(scaleQuantity(1, 1, 3), 0.33);
  });

  test('formats amounts with and without units', () => {
    assert.equal(formatIngredient([400, 'g', 'baby potatoes'], 2, 2), '400 g baby potatoes');
    assert.equal(formatIngredient([2, '', 'eggs'], 4, 2), '4 eggs');
  });

  test('does not leave a double space when the unit is empty', () => {
    assert.ok(!formatIngredient([2, '', 'eggs'], 2, 2).includes('  '));
  });
});

describe('labels', () => {
  test('result count is zero-padded and mentions saved recipes', () => {
    assert.equal(resultLabel(3, false), '03 RECIPES TO MAKE YOUR OWN');
    assert.equal(resultLabel(1, true), '01 SAVED RECIPES TO MAKE YOUR OWN');
  });
});
