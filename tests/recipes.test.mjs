import { test } from 'node:test';
import assert from 'node:assert/strict';
import { recipes } from '../dist/recipes.js';
import { validateRecipes, imageIdsOnDisk } from '../scripts/validate-recipes.mjs';

test('every recipe passes the data schema and has its images', () => {
  const { full, thumbs } = imageIdsOnDisk();
  assert.deepEqual(validateRecipes(recipes, full), []);
  for (const r of recipes) assert.ok(thumbs.has(r.id), `missing thumbnail for ${r.id}`);
});

test('validator catches the problems that used to ship', () => {
  const base = {
    id: 'x', name: 'X', sub: 's', category: 'C', time: 10, difficulty: 'Easy', servings: 2,
    description: 'd', ingredients: [[1, '', 'egg']], steps: ['go'], tip: 't',
  };
  assert.deepEqual(validateRecipes([base]), []);
  assert.match(validateRecipes([{ ...base, description: '' }]).join('\n'), /description is required/);
  assert.match(validateRecipes([{ ...base, servings: undefined }]).join('\n'), /servings must be/);
  assert.match(validateRecipes([{ ...base, description: 'undefined' }]).join('\n'), /placeholder/);
  assert.match(validateRecipes([base, base]).join('\n'), /duplicate id/);
  assert.match(validateRecipes([base], new Set()).join('\n'), /missing images\/x.webp/);
});
