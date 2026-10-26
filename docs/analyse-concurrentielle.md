# Analyse concurrentielle — applications d'apprentissage des langues

> Sources : informations publiques (pages des stores, sites officiels, presse, avis utilisateurs).
> Aucune rétro-ingénierie : on étudie **ce que les applications proposent**, pas leur code.
> Les fonctionnalités évoluent vite ; à revérifier avant toute décision produit.

## 1. Panorama

| | **Duolingo** | **Babbel** | **Mondly** | **Quizlet** |
|---|---|---|---|---|
| Positionnement | Apprentissage ludique, grand public | Cours structurés, adultes, « parler vite » | Conversation et immersion (chatbot, VR/AR) | Révision par cartes mémoire, tous sujets |
| Modèle éco | Freemium (pubs + Super/Max) | Abonnement (essai gratuit) | Freemium, abonnement ou à vie | Freemium (Quizlet Plus) |
| Format d'une session | Leçons de 3–5 min | Leçons de 10–15 min | Leçon quotidienne + conversations | Sessions libres sur un « set » |
| Contenu | Créé par l'éditeur, parcours fixe | Créé par des linguistes, thèmes concrets | Créé par l'éditeur, thèmes du quotidien | Surtout créé par les utilisateurs |
| Niveaux | Débutant → ~B2 (alignement CECRL partiel) | A1 → C1 | Débutant → avancé | Pas de niveaux (dépend des sets) |
| Plateformes | iOS, Android, web | iOS, Android, web | iOS, Android, web, VR | iOS, Android, web |

## 2. Fonctionnalités clés

### Duolingo
- **Parcours linéaire** (« path ») découpé en unités et en leçons très courtes.
- **Exercices variés** : QCM, traduction par tuiles, écoute + dictée, prononciation, association de paires.
- **Gamification forte** : séries quotidiennes (streak), XP, ligues hebdomadaires, badges, cœurs/vies.
- **Révision adaptative** des erreurs (« practice hub »).
- Rappels push très efficaces pour la rétention.
- ➖ Critiques : grammaire peu expliquée, plafonne avant le niveau avancé, la gamification prend parfois le pas sur l'apprentissage.

### Babbel
- **Leçons thématiques** (voyage, travail, etc.) avec **explications de grammaire** claires dans la langue maternelle.
- Dialogues réalistes, focus sur l'oral utile.
- **Révision espacée** du vocabulaire vu en leçon.
- Cours en direct (Babbel Live) et podcasts.
- ➖ Critiques : peu ludique, contenu gratuit limité.

### Mondly
- **Leçon quotidienne** + leçons thématiques.
- **Chatbot conversationnel** avec reconnaissance vocale.
- Conjugaisons, vocabulaire par catégories, mode VR/AR.
- ➖ Critiques : progression moins structurée, peu d'explications de grammaire.

### Quizlet
- **Sets de cartes mémoire** (terme / définition, image, audio).
- **Modes** : cartes (flip), Apprendre (adaptatif), Test (QCM, vrai/faux, réponse écrite), jeux (Associer, Gravity…).
- **Répétition espacée** et suivi de maîtrise par carte.
- Partage, classes, import de listes.
- ➖ Critiques : pas de parcours pédagogique, qualité variable des sets communautaires, fonctions avancées payantes.

## 3. Ce qu'on retient pour Objectif Anglais

| Idée | Inspiration | Notre version |
|---|---|---|
| Leçons courtes en parcours | Duolingo | Parcours **A1 → C2 (CECRL)**, unités thématiques, leçons de 5 min |
| Grammaire expliquée **en français** | Babbel | Une fiche courte au début de chaque leçon |
| Cartes mémoire + répétition espacée | Quizlet / Anki | Algorithme **SM-2** (libre), chaque mot vu en leçon entre dans le paquet |
| Modes de révision | Quizlet | Flip, QCM, saisie (plus tard : écoute) |
| Motivation | Duolingo | Série quotidienne + XP, **sans** système de vies punitif |
| Audio / prononciation | Mondly | Synthèse vocale du navigateur (Web Speech API) ; reconnaissance vocale en V2 |

### Notre différence
1. **Pensé pour les francophones** : explications en français, faux amis, pièges typiques (*actually*, *eventually*, prétérit vs present perfect…).
2. **Va jusqu'au niveau courant (C1–C2)**, là où la plupart des apps plafonnent.
3. **Leçons + cartes mémoire dans une seule app** : ce qu'on apprend en leçon est automatiquement révisé.

## 4. MVP (version 1)
- Parcours par niveau (A1 → C2) avec leçons : fiche + exercices (QCM, traduction, saisie).
- Paquet de cartes mémoire alimenté par les leçons, révision quotidienne SM-2.
- Progression, XP et série enregistrées localement (hors ligne).
- Web + mobile via une **PWA** installable.
