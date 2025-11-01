/* service-worker.js
   Service worker yoroheje yateguwe kugirango PWA ikore offline kuri GitHub Pages.
   Ibisobanuro mu Kinyarwanda:
   - Caches core assets ku gihe cyo kwishyiriraho (install)
   - Igera ku ma-cache mbere y'igihe (cache-first) kuri assets, ariko inoze update mu background
   - Irasubiza index.html kuri navigation requests igihe nta network ihari
   - Izi paths zateganyijwe ziba ku root ya repository kuri GitHub Pages
*/

/* Izina rya cache hamwe na list y'ibanze yo kubika */
const CACHE_NAME = 'bdm-cache-v1';
const CORE_ASSETS = [
  '/',                    // index.html (navigation fallback)
  '/index.html',
  '/style.css',
  '/main.js',
  '/products.js',
  '/jokes.js',
  '/manifest.json',
  '/placeholder-poster.jpg',
  '/placeholder-bg.mp4',
  '/placeholder-product-1.jpg',
  '/placeholder-product-2.jpg',
  '/placeholder-product-3.jpg',
  '/placeholder-product-4.jpg',
  '/placeholder-product-5.jpg',
  '/placeholder-product-6.jpg',
  '/placeholder-qr.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

/* Install event: buzuza cache y'ibanze */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Gerageza kongeramo assets; niba hari 404, tukomeza kugirango install itangire neza
        return cache.addAll(CORE_ASSETS).catch(err => {
          // Mu gihe hari imwe itabonekamo muri dev, twiyemeza ko install itarangirika
          return Promise.resolve();
        });
      })
  );
  // Ohereza service worker nshya kugirango ibe active ako kanya
  self.skipWaiting();
});

/* Activate event: gusiba za cache zishaje */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(oldKey => caches.delete(oldKey))
      );
    })
  );
  self.clients.claim();
});

/* Fetch event: cache-first strategy hamwe na network fallback
   - Niba asset iri muri cache turayisubiza (harimo update mu background)
   - Niba itaboneka mu cache tugerageza gufata network, hanyuma dukoporore mu cache
   - Ku navigation requests (HTML), niba nta network, dusubiza index.html muri cache
*/
self.addEventListener('fetch', event => {
  const req = event.request;

  // Only handle GET requests
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then(cachedResponse => {
      if (cachedResponse) {
        // Serve cached response immediately
        // Background update: fetch latest and update cache
        event.waitUntil(
          fetch(req).then(networkResp => {
            if (networkResp && networkResp.ok) {
              caches.open(CACHE_NAME).then(cache => cache.put(req, networkResp.clone()));
            }
          }).catch(() => {
            // network update failed; ignore silently
          })
        );
        return cachedResponse;
      }

      // Not cached -> try network
      return fetch(req).then(networkResp => {
        // If invalid response, just pass it through
        if (!networkResp || networkResp.status !== 200 || networkResp.type === 'opaque') {
          return networkResp;
        }
        // Put a copy in cache for future
        const copy = networkResp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return networkResp;
      }).catch(() => {
        // Network failed. If request looks like navigation (HTML), return cached index.html if available
        if (req.mode === 'navigate' || (req.headers && req.headers.get('accept') && req.headers.get('accept').includes('text/html'))) {
          return caches.match('/index.html');
        }
        // Otherwise try to return a fallback asset (e.g., poster image) if available
        return caches.match('/placeholder-poster.jpg');
      });
    })
  );
});

/* Message handler (optional) - yakira messages zivuye ku page (nko kuvugurura SW) */
self.addEventListener('message', event => {
  if (!event.data) return;
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/* NOTE:
   - Iyi service-worker.js igomba kuba iri ku root y'ububiko bwa GitHub Pages (ntabwo izakora neza niba iri mu subfolder).
   - Mbere yo gushyira kuri production, shyira mu repo ama-placeholder yose yagaragajwe muri CORE_ASSETS.
   - Niba ushaka aggressive caching (API responses, images), ongera logic cyangwa routes zihariye.
*/
