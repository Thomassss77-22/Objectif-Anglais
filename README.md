# Objectif Anglais

Application d'apprentissage de l'anglais **pour les francophones**, du niveau débutant (A1) au niveau courant (C2).
Leçons courtes avec explications en français + cartes mémoire à répétition espacée.

- 📊 [Analyse concurrentielle](docs/analyse-concurrentielle.md) (Duolingo, Babbel, Mondly, Quizlet)
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
