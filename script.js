
//  SÉCURITÉ 
//  Hachage de mot de passe 
 
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Simulation de Base de Données

const storageService = {
    DB_NAME: 'tp1_ssi',

    // Initialisation avec un compte administrateur 
    async init() {
        if (!localStorage.getItem(this.DB_NAME)) {
            const hashedAdminPass = await hashPassword("password123"); 
            const defaultUsers = [{ login: "admin", pass: hashedAdminPass }];
            localStorage.setItem(this.DB_NAME, JSON.stringify(defaultUsers));
        }
    },

    getUsers() {
        const data = localStorage.getItem(this.DB_NAME);
        return data ? JSON.parse(data) : [];
    },

    async saveUser(login, pass) {
        const users = this.getUsers();
        if (users.find(u => u.login === login)) return false;
        
        // Hachage du mot de passe avant stockage
        const hashedPassword = await hashPassword(pass);
        users.push({ login, pass: hashedPassword });
        
        localStorage.setItem(this.DB_NAME, JSON.stringify(users));
        return true;
    }
};

// INTERFACE UTILISATEUR 
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
        // Suppression des champs dynamiques si nécessaire
        const extraFields = this.fieldsContainer.querySelectorAll('.dynamic-input-wrapper');
        extraFields.forEach(field => field.remove());
    },

    async addField() {
        const newLogin = prompt("Création de compte - Entrez un identifiant :");
        const newPass = prompt("Création de compte - Entrez un mot de passe :");

        if (!newLogin || !newPass) {
            this.displayMessage("Opération annulée : informations manquantes.", "error");
            return;
        }

        const success = await storageService.saveUser(newLogin, newPass);
        if (success) {
            this.displayMessage(`Compte '${newLogin}' créé avec succès.`, "success");
        } else {
            this.displayMessage("Erreur : Cet identifiant est déjà utilisé.", "error");
        }
    }
};

//SERVICE D'AUTHENTIFICATION

const authService = {
    async validate() {
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        if (!user || !pass) {
            uiController.displayMessage("Veuillez remplir tous les champs.", "error");
            return;
        }

        const users = storageService.getUsers();
        
        const inputHash = await hashPassword(pass);
        const authenticatedUser = users.find(u => u.login === user && u.pass === inputHash);

        if (authenticatedUser) {
            uiController.displayMessage(`Authentification réussie. Session établie pour ${user}.`, "success");
        } else {
            uiController.displayMessage("Échec : Identifiants invalides ou inexistants.", "error");
        }
    }
};

// Initialisation 
window.onload = async () => {
    await storageService.init();
};