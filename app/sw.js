// Cache hors ligne : réseau d'abord, cache en secours.
const CACHE = "oa-v2";
const FILES = ["./", "index.html", "style.css", "app.js", "data.js", "srs.js", "manifest.json", "icons/icon.svg"];

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
