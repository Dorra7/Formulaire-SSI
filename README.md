# TP1 - Sécurité des Systèmes d'Informations

Ce projet implémente une interface d'authentification persistante permettant la gestion de comptes utilisateur en local.

## Installation et Lancement

1. Cloner le dépôt sur votre machine locale :
   git clone https://github.com/Dorra7/Formulaire-d-authentification---S-curit-des-syst-mes-d-informations.git

2. Accéder au dossier du projet :
   cd Formulaire-d-authentification---S-curit-des-syst-mes-d-informations

3. Lancer l'application :
   L'application peut être lancée en ouvrant directement le fichier index.html dans un navigateur ou via un serveur local (type Live Server).

## Guide d'utilisation pour l'évaluation

Les fonctionnalités suivantes peuvent être testées par le correcteur :

1. Connexion avec les identifiants par défaut :
   - Identifiant : admin
   - Mot de passe : password
   - Cliquez sur le bouton "Valider".

2. Création d'un nouveau compte :
   - Cliquez sur le bouton "Ajouter Compte".
   - Renseignez l'identifiant et le mot de passe dans les fenêtres contextuelles.
   - Le système confirme l'enregistrement et le compte devient immédiatement actif pour une connexion.

3. Vérification de la persistance des données :
   - Après avoir créé un compte, actualisez la page (touche F5).
   - Tentez de vous connecter avec le compte créé : l'accès est maintenu grâce à l'utilisation du localStorage.

4. Réinitialisation :
   - Le bouton "Réinitialiser" vide les champs de saisie et réinitialise le panneau de statut.

## Détails techniques

Le projet est réalisé en HTML5, CSS3 et JavaScript Vanilla. La persistance est assurée par l'API Web Storage (localStorage), permettant de répondre à la contrainte d'absence de base de données externe tout en conservant les données entre les sessions.

---
