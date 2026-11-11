// Registers the service worker that makes the site available offline and installable.
// The site works without it, so any failure is ignored.
(() => {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // Offline support is an enhancement; the site works without it.
    });
  });
})();
