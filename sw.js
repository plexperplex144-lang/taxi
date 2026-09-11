// Service worker — нужен Android/Chrome, чтобы предложить полноценную установку
// приложения (WebAPK), а не просто ярлык-закладку. Кеш минимальный: позволяет
// странице открываться офлайн после первого захода.
const CACHE = 'taxi-widget-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE).then(cache =>
      fetch(event.request)
        .then(response => {
          cache.put(event.request, response.clone());
          return response;
        })
        .catch(() => cache.match(event.request))
    )
  );
});
