// Service worker untuk Arcade Tembak-tembakan 2D.
// Cache HANYA file aplikasi (index.html, manifest, ikon). Data Firebase
// (leaderboard, teman, chat, akun, klan, turnamen) SELALU lewat jaringan.
const CACHE = 'arcade-tembak-2d-v1';
const SHELL = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Hanya tangani request ke origin yang sama (file aplikasi). Firebase dan
  // semua host lain dibiarkan lewat jaringan apa adanya.
  if (url.origin !== self.location.origin) return;
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // index.html: jaringan dulu, jatuh ke cache kalau offline.
      if (url.pathname.endsWith('index.html') || url.pathname === '/' || url.pathname.endsWith('/')) {
        return fetch(event.request)
          .then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
            return res;
          })
          .catch(() => cached || caches.match('./index.html'));
      }
      // Aset lain (manifest, ikon): cache dulu, jaringan sebagai cadangan.
      return cached || fetch(event.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return res;
      });
    })
  );
});
