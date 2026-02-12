# Module : Sécurité des Systèmes d'Informations (SSI)

## Livrable N°1 : Développement d'une Interface d'Authentification Persistante

### 1. Présentation du Projet

Ce projet consiste en la réalisation d'une interface d'authentification sécurisée, conçue sans l'utilisation de frameworks tiers (Vanilla JS). L'objectif est de démontrer la mise en place d'un mécanisme de contrôle d'accès avec gestion dynamique des données utilisateurs.

### 2. Architecture Technique

Le projet respecte une séparation stricte des préoccupations (**Separation of Concerns**) pour garantir la maintenabilité du code :

- **Couche de Présentation (`index.html` & `style.css`)** : Utilisation d'un balisage sémantique HTML5 et d'un design moderne (Flexbox/Grid) assurant une expérience utilisateur fluide.
- **Logique de Persistance (`storageService`)** : Implémentation de l'API **Web Storage (LocalStorage)** pour simuler une base de données côté client. Cela permet une persistance des données entre les sessions de navigation.
- **Couche d'Abstraction UI (`uiController`)** : Gestionnaire d'interface centralisé pour la manipulation du DOM et les retours d'état (feedback).
- **Service d'Authentification (`authService`)** : Moteur de vérification des identifiants par rapport au registre stocké.

### 3. Fonctionnalités Implémentées

- **Authentification Sécurisée** : Validation des couples identifiant/mot de passe avec gestion des erreurs contextuelles.
- **Gestion Dynamique des Comptes** : Possibilité d'enregistrer de nouveaux utilisateurs en temps réel via une interface interactive.
- **Persistance des Données** : Contrairement à une simple variable en mémoire, les comptes créés sont conservés après le rafraîchissement de la page.
- **Réinitialisation du Formulaire** : Fonction de purge des champs et de l'état du système.

### 4. Protocole d'Évaluation

Pour tester le système, veuillez suivre les étapes suivantes :

1. **Chargement** : Ouvrez `index.html` dans un navigateur moderne.
2. **Accès par défaut** :
   - **Identifiant** : `admin`
   - **Mot de passe** : `password`
3. **Création de compte** : Cliquez sur le bouton "Ajouter Compte", renseignez les informations demandées, puis tentez de vous connecter avec ces nouveaux identifiants.
4. **Vérification de la persistance** : Rafraîchissez la page (F5) ; le compte créé précédemment restera fonctionnel.

### 5. Analyse Critique (Perspective SSI)

Bien que ce prototype réponde aux exigences du premier rendu, il est important de noter les points suivants dans une perspective de production sécurisée :

- **Hachage** : Dans ce rendu, les mots de passe sont stockés en clair dans le `localStorage`. Une itération future nécessiterait l'usage de fonctions de hachage (type SHA-256 ou BCrypt).
- **Côté Client** : La logique étant exclusivement côté client, elle est vulnérable à l'inspection. Un passage vers une architecture Client-Serveur (Node.js/PHP) est la suite logique pour sécuriser les données.

---
