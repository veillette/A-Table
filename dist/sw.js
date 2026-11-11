// Service worker for À Table: lets the site work offline after the first visit.
//
// Strategy:
// - App shell and code (HTML, JS, CSS, JSON): network first, so recipe changes
//   appear after a deploy. The cache is used only when the network fails.
// - Images and fonts: stale-while-revalidate, so they load instantly and
//   refresh in the background. The image cache keeps at most MAX_MEDIA_ENTRIES
//   entries, dropping the oldest first.
// - Install precaches SHELL (including the fonts), so the first repeat visit
//   works offline without waiting for images. Bump SHELL_VERSION whenever SHELL
//   changes; tests/shell.lock.json must be updated in the same change.
//
// Paths are relative to this file, so the site works under a subpath such as
// username.github.io/A-Table/.

const SHELL_VERSION = 'v2';
const SHELL_CACHE = `a-table-shell-${SHELL_VERSION}`;
const MEDIA_CACHE = `a-table-media-${SHELL_VERSION}`;
const MAX_MEDIA_ENTRIES = 200;

// Keep this list valid JSON: tests/pwa.test.mjs reads it and checks each file exists.
const SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./fonts.css",
  "./fonts/dm-sans-400-latin.woff2",
  "./fonts/dm-sans-400-latin-ext.woff2",
  "./fonts/dm-sans-500-latin.woff2",
  "./fonts/dm-sans-500-latin-ext.woff2",
  "./fonts/dm-sans-600-latin.woff2",
  "./fonts/dm-sans-600-latin-ext.woff2",
  "./fonts/dm-sans-700-latin.woff2",
  "./fonts/dm-sans-700-latin-ext.woff2",
  "./fonts/libre-caslon-display-400-latin.woff2",
  "./fonts/libre-caslon-display-400-latin-ext.woff2",
  "./theme.js",
  "./pwa.js",
  "./app.js",
  "./recipes.js",
  "./lib/format.js",
  "./lib/favorites.js",
  "./ui/cards.js",
  "./ui/detail.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png"
];

const NETWORK_FIRST_EXTENSIONS = ['.html', '.js', '.css', '.json', '.webmanifest'];
const MEDIA_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.woff2'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL.map((path) => new Request(path, { cache: 'reload' }))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name.startsWith('a-table-') && name !== SHELL_CACHE && name !== MEDIA_CACHE)
            .map((name) => caches.delete(name)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const pathname = url.pathname.toLowerCase();
  const isNavigation = request.mode === 'navigate';
  const isCode = pathname.endsWith('/') || NETWORK_FIRST_EXTENSIONS.some((ext) => pathname.endsWith(ext));

  if (isNavigation || isCode) {
    event.respondWith(networkFirst(request));
    return;
  }
  if (MEDIA_EXTENSIONS.some((ext) => pathname.endsWith(ext))) {
    event.respondWith(staleWhileRevalidate(request, MEDIA_CACHE));
  }
});

async function networkFirst(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached =
      (await cache.match(request)) ||
      (request.mode === 'navigate' ? await cache.match(new URL('./index.html', self.location).href) : undefined);
    if (cached) return cached;
    return new Response('Offline', { status: 503, statusText: 'Offline', headers: { 'Content-Type': 'text/plain' } });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then(async (response) => {
      if (response.ok) {
        await cache.put(request, response.clone());
        await trimCache(cache, MAX_MEDIA_ENTRIES);
      }
      return response;
    })
    .catch(() => undefined);
  if (cached) return cached;
  const response = await refresh;
  return response || new Response('Offline', { status: 503, statusText: 'Offline' });
}

/** Delete the oldest entries (cache.keys() returns them in insertion order) until at most `max` remain. */
async function trimCache(cache, max) {
  const keys = await cache.keys();
  for (const key of keys.slice(0, Math.max(0, keys.length - max))) {
    await cache.delete(key);
  }
}
