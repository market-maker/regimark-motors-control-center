
// Service Worker for offline capabilities and performance
const CACHE_NAME = 'regimark-v2';
const APP_SHELL_CACHE = 'regimark-app-shell-v2';
const DATA_CACHE_NAME = 'regimark-data-v2';

// App shell files to cache for immediate loading
const appShellFiles = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/lovable-uploads/b5b79438-1e8e-447e-9c8f-c886b1ed204a.png',
  '/lovable-uploads/f982833e-8c6b-48cc-9a93-ee1953b1517d.png'
];

// Assets to preload and cache
const assetFiles = [
  // Add main JS and CSS bundles here
];

// Combined files for initial cache
const urlsToCache = [...appShellFiles, ...assetFiles];

// Cache version timestamp for cache busting
const CACHE_VERSION = Date.now().toString();

self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  // Speed up service worker installation and activation
  self.skipWaiting();
  
  event.waitUntil(
    Promise.all([
      // Cache app shell for instant loading
      caches.open(APP_SHELL_CACHE).then(cache => {
        console.log('Service Worker: Caching App Shell');
        return cache.addAll(appShellFiles);
      }),
      
      // Cache other assets
      caches.open(CACHE_NAME).then(cache => {
        console.log('Service Worker: Caching Assets');
        return cache.addAll(assetFiles);
      })
    ])
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  // Take control of clients immediately
  self.clients.claim();
  
  // Clear old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (
            cacheName !== CACHE_NAME && 
            cacheName !== APP_SHELL_CACHE && 
            cacheName !== DATA_CACHE_NAME
          ) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Handle API requests differently
  if (requestUrl.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(event.request));
    return;
  }
  
  // For app shell resources (HTML, CSS, JS) - use Cache First strategy
  if (isAppShellRequest(event.request)) {
    event.respondWith(handleAppShellRequest(event.request));
    return;
  }
  
  // For other requests, use a Stale While Revalidate strategy
  event.respondWith(handleNormalRequest(event.request));
});

// Check if the request is for an app shell resource
function isAppShellRequest(request) {
  const url = new URL(request.url);
  return appShellFiles.some(file => url.pathname === file);
}

// App Shell requests - Cache First strategy
async function handleAppShellRequest(request) {
  const cache = await caches.open(APP_SHELL_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    // Cache the response for future use
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    // If offline and no cache, return fallback
    return new Response('App is offline', { status: 503 });
  }
}

// API requests - Network First with cache fallback
async function handleApiRequest(request) {
  try {
    const response = await fetch(request);
    
    // Only cache successful responses
    if (response.ok) {
      const cache = await caches.open(DATA_CACHE_NAME);
      await cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cache = await caches.open(DATA_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline data indicator
    return new Response(
      JSON.stringify({ error: 'Network error', offline: true }), 
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}

// Normal requests - Stale While Revalidate strategy
async function handleNormalRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  // Start fetching the resource in the background
  const fetchPromise = fetch(request)
    .then(networkResponse => {
      // Update the cache with the new response
      cache.put(request, networkResponse.clone());
      return networkResponse;
    })
    .catch(error => {
      console.error('Fetch failed:', error);
      // If both cache and network fail, return the error
      if (!cachedResponse) {
        throw error;
      }
    });
  
  // Return the cached response immediately if available
  return cachedResponse || fetchPromise;
}

// Handle messages from the client
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
