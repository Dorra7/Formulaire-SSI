/**
 * GESTIONNAIRE DE DONNÉES (Simulation de Base de Données)
 * Utilise le localStorage pour la persistance des comptes.
 */
const storageService = {
    DB_NAME: 'tp1_ssi',

    // Initialise avec un compte administrateur par défaut
    init() {
        if (!localStorage.getItem(this.DB_NAME)) {
            const defaultUsers = [{ login: "admin", pass: "password" }];
            localStorage.setItem(this.DB_NAME, JSON.stringify(defaultUsers));
        }
    },

    getUsers() {
        return JSON.parse(localStorage.getItem(this.DB_NAME));
    },

    saveUser(login, pass) {
        const users = this.getUsers();
        // Vérification si l'utilisateur existe déjà
        if (users.find(u => u.login === login)) return false;
        
        users.push({ login, pass });
        localStorage.setItem(this.DB_NAME, JSON.stringify(users));
        return true;
    }
};


  // GESTIONNAIRE D'INTERFACE (UI)
 
const uiController = {
    messageElement: document.getElementById('feedback-message'),
    fieldsContainer: document.getElementById('dynamic-fields'),

    displayMessage(text, type) {
        this.messageElement.textContent = text;
        this.messageElement.className = type; 
    },

    reset() {
        document.getElementById('authForm').reset();
        this.displayMessage("En attente d'action...", "message-placeholder");
        // Optionnel : supprimer les champs ajoutés dynamiquement
        const extraFields = this.fieldsContainer.querySelectorAll('.dynamic-input');
        extraFields.forEach(field => field.remove());
    },

    // Fonction pour "Ajouter un compte" 
    addField() {
        const newLogin = prompt("Création de compte - Entrez un identifiant :");
        const newPass = prompt("Création de compte - Entrez un mot de passe :");

        if (!newLogin || !newPass) {
            this.displayMessage("Opération annulée : champs incomplets.", "error");
            return;
        }

        if (storageService.saveUser(newLogin, newPass)) {
            this.displayMessage(`Compte '${newLogin}' créé avec succès.`, "success");
        } else {
            this.displayMessage("Erreur : Cet identifiant est déjà utilisé.", "error");
        }
    }
};

// SERVICE D'AUTHENTIFICATION
const authService = {
    validate() {
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const users = storageService.getUsers();

        const authenticatedUser = users.find(u => u.login === user && u.pass === pass);

        if (authenticatedUser) {
            uiController.displayMessage(`Authentification réussie. Bienvenue, ${user}.`, "success");
        } else {
            uiController.displayMessage("Échec de l'authentification. Identifiants invalides.", "error");
        }
    }
};

// Initialisation au chargement de la page
window.onload = () => storageService.init();