import { store } from './storage.js';

export const STORAGE_KEY = 'atable-saved';

/** Read saved recipe ids. Returns [] for missing, corrupt or non-array data. */
export function loadFavorites(storage) {
  const value = store.get(STORAGE_KEY, [], storage);
  return Array.isArray(value) ? value.filter((id) => typeof id === 'string') : [];
}

/** Persist saved recipe ids. Returns false if the browser refused to store them. */
export function saveFavorites(favorites, storage) {
  return store.set(STORAGE_KEY, favorites, storage);
}

/** Keep only ids that still match a recipe, so removed or renamed recipes stop counting as saved. */
export function pruneFavorites(favorites, knownIds) {
  return favorites.filter((id) => knownIds.has(id));
}

/** Return a new list with the id added or removed. */
export function toggleFavorite(favorites, id) {
  return favorites.includes(id) ? favorites.filter((x) => x !== id) : [...favorites, id];
}
