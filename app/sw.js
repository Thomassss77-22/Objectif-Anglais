// Cache hors ligne : réseau d'abord, cache en secours.
const CACHE = "oa-v36";
const FILES = ["./", "index.html", "style.css", "app.js", "contenu.js", "data.js", "lessons-extra.js", "srs.js", "legal.js", "legal-extra.js", "articles.js", "films.js", "reading.js", "placement.js", "match.js", "manifest.json", "icons/logo-mark.png", "icons/favicon.png", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "fonts/jakarta.woff2", "words/index.json", "words-legal/index.json",
  // Toutes les catégories de mots : sans elles, une leçon de vocabulaire jamais ouverte ne se charge pas hors ligne.
  "words/adjectives.json", "words/body.json", "words/business.json", "words/city.json", "words/clothes.json", "words/collocations.json", "words/connectors.json", "words/conversation.json", "words/environment.json", "words/falsefriends.json", "words/feelings.json", "words/food.json", "words/formal.json", "words/home.json", "words/idioms.json", "words/leisure.json", "words/media.json", "words/nature.json", "words/nuances.json", "words/opinion.json", "words/people.json", "words/phrasal.json", "words/proverbs.json", "words/school.json", "words/science.json", "words/shopping.json", "words/slang.json", "words/society.json", "words/tech.json", "words/time.json", "words/travel.json", "words/verbs.json", "words/work.json", "words-legal/arguing.json", "words-legal/business.json", "words-legal/civil.json", "words-legal/collocations.json", "words-legal/courtroom.json", "words-legal/criminal.json", "words-legal/debates.json", "words-legal/falsefriends.json", "words-legal/figures.json", "words-legal/institutions.json", "words-legal/international.json", "words-legal/interview.json", "words-legal/politics.json", "words-legal/press.json", "words-legal/profession.json", "words-legal/rights.json", "words-legal/sources.json", "words-legal/tax.json", "words-legal/verbs.json"];

// Un fichier absent (contenu réservé, livré par le coffre privé) ne doit pas empêcher l'installation.
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => Promise.all(FILES.map((f) => c.add(f).catch(() => {}))))));
// Les anciens caches sont supprimés quand une nouvelle version prend la main.
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))));
self.addEventListener("fetch", (e) => {
  // Seules les lectures de ce site passent par le cache : ni les envois, ni les appels au service de comptes.
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
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
