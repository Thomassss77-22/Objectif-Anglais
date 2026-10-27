// Cache hors ligne : réseau d'abord, cache en secours.
const CACHE = "oa-v32";
const FILES = ["./", "index.html", "style.css", "app.js", "data.js", "lessons-extra.js", "srs.js", "legal.js", "legal-extra.js", "articles.js", "films.js", "reading.js", "placement.js", "match.js", "manifest.json", "icons/logo-mark.png", "icons/favicon.png", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "fonts/jakarta.woff2", "words/index.json", "words-legal/index.json"];

self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))));
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        const copy = r.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return r;
      })
      .catch(() => caches.match(e.request))
  );
});
