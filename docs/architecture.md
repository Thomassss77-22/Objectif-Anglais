# Architecture

## Choix : PWA d'abord
Une seule base de code pour le **web et le mobile** : une Progressive Web App installable
sur Android/iOS (« Ajouter à l'écran d'accueil »), qui fonctionne **hors ligne**.

- **V1 (prototype, ce dépôt)** : HTML/CSS/JavaScript sans framework ni build. Données dans `localStorage`.
- **V2** : migration vers React + Vite (ou Expo/React Native si on veut publier sur les stores),
  backend (ex. Supabase) pour les comptes et la synchronisation entre appareils.

## Structure
```
app/
  index.html      coquille de l'app
  style.css       styles (mobile d'abord, mode sombre)
  data.js         contenu : niveaux, leçons, vocabulaire, exercices
  srs.js          répétition espacée (SM-2)
  app.js          navigation, écrans, progression
  manifest.json   métadonnées PWA
  sw.js           service worker (cache hors ligne)
```

## Modèle de données
- **Niveau** (`A1`…`C2`) → **leçons**.
- **Leçon** : `id`, `title`, `tip` (fiche en français), `words` (paires fr/en), `exercises`.
- **Exercice** : `qcm` (choix), `translate` (saisie libre, plusieurs réponses acceptées).
- **Carte** (paquet) : `en`, `fr`, état SM-2 `{ ef, interval, reps, due }`.
- **Progression** : leçons terminées, XP, série (`streak`, `lastDay`).

## Répétition espacée (SM-2)
Note de 0 à 5 après chaque carte (dans l'UI : *Raté* = 1, *Difficile* = 3, *Bien* = 4, *Facile* = 5).
- Note < 3 → `reps = 0`, intervalle 1 jour.
- Sinon intervalle 1 → 6 → `interval × ef` jours.
- `ef = max(1.3, ef + 0.1 − (5−q)(0.08 + (5−q)·0.02))`.

## Lancer en local
```bash
cd app && python3 -m http.server 8000
# puis http://localhost:8000
```
