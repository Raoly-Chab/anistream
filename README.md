
# Anistream

Anistream est une application web de gestion et découverte d’animes, développée avec React, Vite, Tailwind CSS et Dexie (IndexedDB) pour le stockage local.

## Fonctionnalités principales

- Découverte d’animes populaires et de saison
- Recherche d’animes par nom
- Détail complet d’un anime (titre, image, score, recommandations…)
- Ajout/suppression d’animes dans une watchlist personnelle
- Classement de la watchlist par statut (À voir, En cours, Terminé)
- Authentification locale (Dexie) avec gestion de profil (pseudo, avatar)
- Interface responsive et moderne

## Technologies utilisées

- React
- Vite
- Tailwind CSS
- Dexie (IndexedDB)

## Installation

1. Clone le dépôt :
	```bash
	git clone https://github.com/Raoly-Chab/anistream.git
	cd anistream
	```
2. Installe les dépendances :
	```bash
	npm install
	```
3. Lance le serveur de développement :
	```bash
	npm run dev
	```
4. Ouvre [http://localhost:5173](http://localhost:5173) dans ton navigateur.

## Structure du projet

- `src/pages/` : pages principales (Accueil, Découverte, Détail, Watchlist, Profil…)
- `src/components/` : composants réutilisables (cartes, carrousels, formulaires…)
- `src/services/` : gestion de l’API et de la base Dexie
- `src/styles/` : fichiers CSS personnalisés

