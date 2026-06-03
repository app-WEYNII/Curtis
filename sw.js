/* ============================================================
   Service Worker — Ma Grossesse
   Stratégie : cache-first pour la coquille, network-first pour
   les ressources externes (fonts).
   ============================================================ */
const CACHE_VERSION = 'ma-grossesse-v4';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      // addAll échoue en bloc si une seule ressource manque, donc on fait du best-effort
      return Promise.all(
        CORE_ASSETS.map(url =>
          cache.add(url).catch(err => console.warn('[SW] skip', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== CACHE_VERSION)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  // On ne cache que les GET
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Stratégie 1 : navigation HTML → cache-first avec fallback réseau
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then(cached =>
        cached || fetch(request).catch(() =>
          caches.match('./').then(c => c || new Response('Hors ligne', { status: 503 }))
        )
      )
    );
    return;
  }

  // Stratégie 2 : assets de l'app → cache-first
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          // Cache à la volée les ressources de l'origine
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then(c => c.put(request, copy));
          }
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Stratégie 3 : ressources externes (Google Fonts) → network-first avec fallback cache
  if (url.host.includes('fonts.googleapis.com') || url.host.includes('fonts.gstatic.com')) {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then(c => c.put(request, copy));
        }
        return response;
      }).catch(() => caches.match(request))
    );
    return;
  }
});
