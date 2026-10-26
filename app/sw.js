// Cache hors ligne : réseau d'abord, cache en secours.
const CACHE = "oa-v16";
const FILES = ["./", "index.html", "style.css", "app.js", "data.js", "srs.js", "legal.js", "articles.js", "films.js", "placement.js", "manifest.json", "icons/icon.svg", "fonts/jakarta.woff2", "words/index.json", "words-legal/index.json"];

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
