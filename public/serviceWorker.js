
// Service Worker for offline capabilities
const CACHE_NAME = 'regimark-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/lovable-uploads/b5b79438-1e8e-447e-9c8f-c886b1ed204a.png',
  '/lovable-uploads/f982833e-8c6b-48cc-9a93-ee1953b1517d.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request because it's a stream and can only be consumed once
        const fetchRequest = event.request.clone();
        
        // For non-API requests, try the network first, then fall back to cache
        if (!fetchRequest.url.includes('/api/')) {
          return fetch(fetchRequest).then(
            response => {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clone the response because it's a stream and can only be consumed once
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
                
              return response;
            }
          ).catch(() => {
            // If fetch fails (offline), try to get it from the cache
            return caches.match(event.request);
          });
        }
        
        // For API requests, just try the network
        return fetch(fetchRequest);
      })
  );
});

// Clear old caches when a new service worker activates
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle messages from the client
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
