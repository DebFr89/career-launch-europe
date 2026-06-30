/* Service worker — cache-first app shell (mirrors sky-career).
   BUMP CACHE_VERSION on every deploy so clients pick up changes. */
const CACHE_VERSION = 'cle-v2';
const CACHE_NAME = `career-launch-europe-${CACHE_VERSION}`;

/* Same-origin core. (Google Fonts + the Microsoft Bookings iframe are cross-origin
   and intentionally NOT pre-cached; they load at runtime / network-first.) */
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.svg',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon-180.png',
  './assets/debanjan-portrait.jpg',
  './assets/debanjan-avatar.jpg',
  './assets/og-image.png',
  './src/main.js',
  './src/config.js',
  './src/data/journey.js',
  './src/data/pricing.js',
  './src/data/faq.js',
  './src/data/stats.js',
  './src/data/nodes.js',
  './src/data/i18n.js',
  './src/lib/dom.js',
  './src/lib/easing.js',
  './src/lib/raf.js',
  './src/components/Nav.js',
  './src/components/Reveal.js',
  './src/components/Counter.js',
  './src/components/TrajectoryChart.js',
  './src/components/NetworkHero.js',
  './src/components/EmeaMap.js',
  './src/components/Scorecard.js',
  './src/components/Pricing.js',
  './src/components/Faq.js',
  './src/components/Booking.js',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // addAll is atomic; use individual puts so one 404 can't break install
      Promise.all(SHELL.map((url) =>
        cache.add(url).catch((err) => console.warn('[sw] skip', url, err))
      ))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Never intercept cross-origin (fonts, Bookings iframe, analytics) — let the network handle it.
  if (url.origin !== self.location.origin) return;

  // HTML: network-first so content updates promptly; fall back to cache offline.
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Everything else (JS modules, images, icons): cache-first, then network, then cache the result.
  event.respondWith(
    caches.match(request).then((cached) =>
      cached ||
      fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(request, copy));
        return res;
      })
    )
  );
});
