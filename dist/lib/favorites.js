// Saved recipes, kept in the visitor's browser. Storage errors (private mode,
// blocked site data) are ignored so the rest of the site keeps working.

export const STORAGE_KEY = 'atable-saved';

/** Read saved recipe ids. Returns [] for missing, corrupt or non-array data. */
export function loadFavorites(storage = globalThis.localStorage) {
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

/** Persist saved recipe ids. Returns false if the browser refused to store them. */
export function saveFavorites(favorites, storage = globalThis.localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    return true;
  } catch {
    return false;
  }
}

/** Keep only ids that still match a recipe, so removed or renamed recipes stop counting as saved. */
export function pruneFavorites(favorites, knownIds) {
  return favorites.filter((id) => knownIds.has(id));
}

/** Return a new list with the id added or removed. */
export function toggleFavorite(favorites, id) {
  return favorites.includes(id) ? favorites.filter((x) => x !== id) : [...favorites, id];
}
