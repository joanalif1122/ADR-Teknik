const CACHE_NAME = 'pwa-adr-cache-v1';
const urlsToCache = [
  '/ADR-Teknik/',
  '/ADR-Teknik/index.html',
  '/ADR-Teknik/manifest.json',
  '/ADR-Teknik/icons/icon-192x192.png',
  '/ADR-Teknik/icons/icon-512x512.png',
  '/ADR-Teknik/assets/css/style.css',
  // Tambahkan path file lain yang perlu di-cache di sini
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
