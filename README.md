# Objectif Anglais

Application d'apprentissage de l'anglais **pour les francophones**, du niveau débutant (A1) au niveau courant (C2).
Leçons courtes avec explications en français + cartes mémoire à répétition espacée.

- 📊 [Analyse concurrentielle](docs/analyse-concurrentielle.md) (Duolingo, Babbel, Mondly, Quizlet, MosaLingua)
- 🏗️ [Architecture](docs/architecture.md)

## Prototype (PWA web + mobile)
```bash
cd app && python3 -m http.server 8000
```
Ouvre http://localhost:8000. Sur mobile : menu du navigateur → « Ajouter à l'écran d'accueil ».

Fonctionnalités :
- Parcours A1 → C2 : fiche de grammaire, vocabulaire avec audio, exercices (QCM, traduction, oral) ; leçons supplémentaires dans `app/lessons-extra.js`, vérifiées par `node tools/check_lessons.mjs`.
- **Toute la banque de mots est dans le parcours** : 187 leçons de vocabulaire (2 002 mots) intercalées entre les leçons de grammaire,
  et un module 5 « Vocabulaire juridique » de 53 leçons (623 termes) en mode CRFPA.
- Les mots de chaque leçon rejoignent le paquet de **cartes mémoire**, révisées avec l'algorithme **SM-2**.
- XP, série quotidienne, progression sauvegardée localement, fonctionne hors ligne.

## Test de niveau
Test adaptatif A1 → C2 (`app/placement.js`) : 72 questions (grammaire, vocabulaire, compréhension écrite et orale),
estimation probabiliste du niveau après chaque réponse, arrêt entre 16 et 28 questions à 90 % de confiance.
Au départ, le test demande si l'on peut écouter. Avec le son : 16 à 28 questions, dont de la compréhension orale.
Sans le son : pas de questions d'écoute, mais 20 à 34 questions et un seuil de confiance de 93 %.
Validation par simulation (`node tools/simulate_placement.mjs`, `NOAUDIO=1` sans écoute) : environ 86 % (avec son)
et 88 % (sans son) de candidats classés au niveau exact, plus de 99 % à un niveau près. Ne mesure pas l'expression orale ou écrite ; ce n'est pas une certification.

## Ciné et séries
Dans l'onglet **Mots** (et sur l'accueil) en anglais général : 10 films et séries (`app/films.js`) avec un pitch sans spoiler,
l'accent, le niveau, 22 à 27 mots classés par thème et un quiz « Suis-je prêt ? ». Aucune réplique ni extrait n'est reproduit.

## Mode CRFPA (anglais juridique)
Activable dans **Profil → Mode d'apprentissage**. Il prépare l'oral d'anglais de l'examen d'accès au CRFPA
(article de presse, 15 min de préparation, 15 min d'exposé et d'entretien) :
- un parcours de 40 leçons en 4 modules (l'épreuve et la méthode, la langue, la culture juridique anglo-saxonne, le vocabulaire actif ; leçons ajoutées dans `app/legal-extra.js`), plus un module 5 de vocabulaire juridique ;
- un entraînement : simulation chronométrée avec enregistrement, questions du jury, grille d'auto-évaluation ;
- 10 articles d'entraînement originaux (`app/articles.js`, 450-550 mots, inspirés de faits réels et datés), chacun avec son corrigé ;
- « Mon article » : coller un sujet, qui reste uniquement sur l'appareil ;
- des exercices oraux : collocations à compléter, termes à dire en anglais, fautes classiques à corriger (40), phrases à traduire (40) ; les erreurs rejoignent les cartes ;
- une banque de vocabulaire juridique de 623 termes en 19 catégories, pensée pour l'oral (`tools/words-legal`, compilée par `python3 tools/build_words.py legal`).

Le mode a ses propres leçons et cartes ; l'XP et la série sont communes.

## Banque de mots
Les mots sont rédigés dans `tools/words/<catégorie>.txt` (une ligne : `anglais | français | exemple | niveau`),
puis compilés vers `app/words/` :
```bash
python3 tools/build_words.py
```
Le script vérifie le format et les doublons, et calcule le niveau CECRL (si absent) à partir de la fréquence
du mot dans l'anglais parlé.

## Crédits
- Fréquences de l'anglais parlé : [FrequencyWords](https://github.com/hermitdave/FrequencyWords) (Hermit Dave),
  d'après OpenSubtitles 2018 — CC BY-SA 4.0. Utilisées uniquement pour estimer le niveau des mots.
- Police : Plus Jakarta Sans — SIL Open Font License.
