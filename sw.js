// Network-only: no account, payment, API or page data is cached.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate' || event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).catch(() => new Response(
    '<!doctype html><html lang="bn"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline</title><body><h2>ইন্টারনেট সংযোগ নেই</h2><p>সংযোগ চালু করে আবার চেষ্টা করুন।</p><button onclick="location.reload()">আবার চেষ্টা করুন</button></body></html>',
    {status: 503, headers: {'Content-Type': 'text/html; charset=utf-8'}}
  )));
});
