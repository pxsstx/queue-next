// Service Worker for Queue Management System
const CACHE_NAME = 'queue-cache-v1';
const urlsToCache = [
  '/',
  '/join',
  '/status',
  '/admin',
  '/login'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Handle app updates
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle offline/online events
self.addEventListener('online', () => {
  console.log('Service worker: Online');
});

self.addEventListener('offline', () => {
  console.log('Service worker: Offline');
}); 