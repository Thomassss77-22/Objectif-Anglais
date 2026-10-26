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
  legal.js        mode CRFPA : modules, questions du jury, grille d'auto-évaluation
  words-legal/    banque de vocabulaire juridique (même format que words/)
  words/          banque de mots générée (index.json + un fichier par catégorie, chargés à la demande)
  srs.js          répétition espacée (SM-2)
  app.js          écrans (parcours, leçon, exercices, révision, profil), progression
  fonts/          police Plus Jakarta Sans (licence OFL), embarquée pour le hors ligne
  manifest.json   métadonnées PWA
  sw.js           service worker (cache hors ligne)
```

## Modèle de données
- **Niveau** (`A1`…`C2`) → **leçons**.
- **Leçon** : `id`, `title`, `tip` (fiche en français), `words` (paires fr/en), `exercises`.
- **Exercice** : `qcm` (choix), `translate` (saisie libre, plusieurs réponses acceptées).
- **Carte** (paquet) : `en`, `fr`, état SM-2 `{ ef, interval, reps, due }`.
- **Progression** : leçons terminées, XP, série (`streak`, `lastDay`).

## Modes
- `state.mode` : `general` ou `legal`. `P()` renvoie la progression du mode actif (`done`, `deck`, nouvelles cartes du jour) ;
  `xp`, `streak` et `days` sont partagés.
- Le mode CRFPA a sa propre identité visuelle (`[data-mode="legal"]`) et ses outils d'entraînement
  (simulation chronométrée 5/3/7 puis exposé, enregistrement via MediaRecorder, questions du jury, grille sur 20).

## Banque de mots
- Sources : `tools/words/*.txt`, compilées par `tools/build_words.py` vers `app/words/`.
- Mot : `{ id, en, fr, ex, lv }` (+ `alt` si le même mot anglais a un autre sens dans une autre catégorie).
- Niveau : donné à la main, sinon déduit du rang de fréquence à l'oral
  (≤ 800 A1, ≤ 2 000 A2, ≤ 4 000 B1, ≤ 8 000 B2, ≤ 15 000 C1, au-delà C2).
- Clé de carte : le mot anglais (commune avec les leçons), ou « mot (sens) » pour un mot à plusieurs sens.
- Au plus 20 nouvelles cartes introduites par jour en révision.
- Leçons de vocabulaire : le script découpe la banque en `units` (dans `index.json`) de 6 à 15 mots,
  par niveau et par catégorie (les petits restes d'un niveau forment des leçons « Vocabulaire varié ») ;
  en CRFPA, par catégorie, dans un module 5. Chaque mot est dans exactement une leçon (`node tools/check_lessons.mjs` le vérifie).
- `app.js` intercale ces leçons entre les leçons de grammaire de chaque niveau ; leurs exercices
  (QCM dans les deux sens, écoute, traduction, phrase à compléter) sont générés à l'ouverture, et les mots
  rejoignent les cartes à la fin de la leçon.

## Répétition espacée (SM-2)
Note de 0 à 5 après chaque carte (dans l'UI : *Raté* = 1, *Difficile* = 3, *Bien* = 4, *Facile* = 5).
- Note < 3 → `reps = 0`, intervalle 1 jour.
- Sinon intervalle 1 → 6 → `interval × ef` jours (première révision notée *Facile* : 4 jours).
- `ef = max(1.3, ef + 0.1 − (5−q)(0.08 + (5−q)·0.02))`.

## Lancer en local
```bash
cd app && python3 -m http.server 8000
# puis http://localhost:8000
```
