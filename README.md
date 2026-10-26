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
- Parcours A1 → C2 (une leçon par niveau pour l'instant) : fiche de grammaire, vocabulaire avec audio, exercices (QCM, traduction).
- Les mots de chaque leçon rejoignent le paquet de **cartes mémoire**, révisées avec l'algorithme **SM-2**.
- XP, série quotidienne, progression sauvegardée localement, fonctionne hors ligne.

## Mode CRFPA (anglais juridique)
Activable dans **Profil → Mode d'apprentissage**. Il prépare l'oral d'anglais de l'examen d'accès au CRFPA
(article de presse, 15 min de préparation, 15 min d'exposé et d'entretien) :
- un parcours en 4 modules (l'épreuve et la méthode, la langue, la culture juridique anglo-saxonne, le vocabulaire actif) ;
- un entraînement : simulation chronométrée avec enregistrement, questions du jury, grille d'auto-évaluation ;
- 10 articles d'entraînement originaux (`app/articles.js`, 450-550 mots, inspirés de faits réels et datés), chacun avec son corrigé ;
- « Mon article » : coller un sujet, qui reste uniquement sur l'appareil ;
- une banque de vocabulaire juridique (`tools/words-legal`, compilée par `python3 tools/build_words.py legal`).

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
