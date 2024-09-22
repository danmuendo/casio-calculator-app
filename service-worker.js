const CACHE_NAME = 'fx82ms-cache-v1';
const urlsToCache = [
  '/',
  '/casio.html',
  '/styles.css',
  '/script.js',
  '/icons/calculator-icon.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
