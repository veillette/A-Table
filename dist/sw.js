// Service worker for À Table: lets the site work offline after the first visit.
//
// Strategy:
// - App shell and code (HTML, JS, CSS, JSON): network first, so recipe changes
//   appear after a deploy. The cache is used only when the network fails.
// - Images and Google Fonts: stale-while-revalidate, so they load instantly and
//   refresh in the background.
// - Install precaches SHELL. Bump SHELL_VERSION whenever SHELL changes.
//
// Paths are relative to this file, so the site works under a subpath such as
// username.github.io/A-Table/.

const SHELL_VERSION = 'v1';
const SHELL_CACHE = `a-table-shell-${SHELL_VERSION}`;
const MEDIA_CACHE = `a-table-media-${SHELL_VERSION}`;

// Keep this list valid JSON: tests/pwa.test.mjs reads it and checks each file exists.
const SHELL = [
  "./",
  "./index.html",
  "./style.css",
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
const FONT_HOSTS = new Set(['fonts.googleapis.com', 'fonts.gstatic.com']);

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
  const pathname = url.pathname.toLowerCase();
  const isNavigation = request.mode === 'navigate';

  if (url.origin === self.location.origin) {
    const isCode = pathname.endsWith('/') || NETWORK_FIRST_EXTENSIONS.some((ext) => pathname.endsWith(ext));
    if (isNavigation || isCode) {
      event.respondWith(networkFirst(request));
      return;
    }
    if (MEDIA_EXTENSIONS.some((ext) => pathname.endsWith(ext))) {
      event.respondWith(staleWhileRevalidate(request, MEDIA_CACHE));
    }
    return;
  }

  if (FONT_HOSTS.has(url.hostname)) {
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
    .then((response) => {
      // Opaque responses (cross-origin, e.g. Google Fonts) have status 0; they are still usable.
      if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
      return response;
    })
    .catch(() => undefined);
  if (cached) return cached;
  const response = await refresh;
  return response || new Response('Offline', { status: 503, statusText: 'Offline' });
}
