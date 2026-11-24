import assert from 'node:assert/strict';
import test from 'node:test';
import { recipeFromSearch, recipeLink } from '../dist/lib/recipe-links.js';
import { recipesById } from '../dist/recipes.js';

test('recipe links keep their query parameter and resolve under a Pages subpath', () => {
  const id = 'salmon';
  const expected = recipesById.get(id);
  assert.ok(expected);
  assert.equal(recipeLink(id), '?recipe=salmon');
  const url = new URL(recipeLink(id), 'https://example.github.io/A-Table/?old=value');
  assert.equal(url.pathname, '/A-Table/');
  assert.equal(recipeFromSearch(url.search), expected);
  assert.equal(recipeFromSearch('?recipe=%73almon'), expected);
});

test('missing, malformed and obsolete recipe IDs do not resolve', () => {
  for (const search of ['', '?other=salmon', '?recipe=', '?recipe=%ZZ', '?recipe=retired-recipe']) {
    assert.equal(recipeFromSearch(search), undefined, search);
  }
});
