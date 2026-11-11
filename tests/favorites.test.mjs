import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { loadFavorites, saveFavorites, toggleFavorite, STORAGE_KEY } from '../dist/lib/favorites.js';

function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
  };
}

describe('favorites storage', () => {
  test('returns an empty list when nothing is stored', () => {
    assert.deepEqual(loadFavorites(memoryStorage()), []);
  });

  test('recovers from corrupt or non-array data', () => {
    assert.deepEqual(loadFavorites(memoryStorage({ [STORAGE_KEY]: '{not json' })), []);
    assert.deepEqual(loadFavorites(memoryStorage({ [STORAGE_KEY]: '{"a":1}' })), []);
  });

  test('ignores non-string entries', () => {
    assert.deepEqual(loadFavorites(memoryStorage({ [STORAGE_KEY]: '["salmon", 3, null]' })), ['salmon']);
  });

  test('round-trips through storage', () => {
    const storage = memoryStorage();
    assert.equal(saveFavorites(['salmon', 'pasta'], storage), true);
    assert.deepEqual(loadFavorites(storage), ['salmon', 'pasta']);
  });

  test('reports failure instead of throwing when storage is unavailable', () => {
    const broken = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); } };
    assert.deepEqual(loadFavorites(broken), []);
    assert.equal(saveFavorites(['x'], broken), false);
  });

  test('toggles an id in and out without mutating the input', () => {
    const original = ['a'];
    assert.deepEqual(toggleFavorite(original, 'b'), ['a', 'b']);
    assert.deepEqual(toggleFavorite(original, 'a'), []);
    assert.deepEqual(original, ['a']);
  });
});
