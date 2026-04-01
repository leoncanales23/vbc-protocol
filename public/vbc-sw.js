/* ══════════════════════════════════════════════
   VBC Protocol · Service Worker
   Cache-first para assets estáticos
   Network-first para datos del ranking
   ══════════════════════════════════════════════ */

var CACHE_NAME   = "vbc-protocol-v1";
var CACHE_STATIC = [
  "/vbc-protocol/",
  "/vbc-protocol/index.html",
  "/vbc-protocol/manifest.json",
  "https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@400;500;700;800&display=swap",
];

/* ── INSTALL ── */
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_STATIC).catch(function() {});
    })
  );
  self.skipWaiting();
});

/* ── ACTIVATE ── */
self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
          .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

/* ── FETCH ── */
self.addEventListener("fetch", function(e) {
  var url = e.request.url;

  /* Firebase + Anthropic → siempre network */
  if(url.includes("firebaseio.com") || url.includes("googleapis.com/google.firestore") || url.includes("anthropic.com")) {
    return;
  }

  /* Face-api models → cache-first */
  if(url.includes("cdn.jsdelivr.net/npm/face-api")) {
    e.respondWith(
      caches.match(e.request).then(function(cached) {
        return cached || fetch(e.request).then(function(res) {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function(c){ c.put(e.request, clone); });
          return res;
        });
      })
    );
    return;
  }

  /* Fonts → cache-first */
  if(url.includes("fonts.gstatic.com") || url.includes("fonts.googleapis.com")) {
    e.respondWith(
      caches.match(e.request).then(function(cached) {
        return cached || fetch(e.request).then(function(res) {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function(c){ c.put(e.request, clone); });
          return res;
        });
      })
    );
    return;
  }

  /* App shell → stale-while-revalidate */
  if(url.includes("/vbc-protocol")) {
    e.respondWith(
      caches.match(e.request).then(function(cached) {
        var fetchPromise = fetch(e.request).then(function(res) {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function(c){ c.put(e.request, clone); });
          return res;
        }).catch(function() { return cached; });
        return cached || fetchPromise;
      })
    );
  }
});
