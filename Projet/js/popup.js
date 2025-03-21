document.addEventListener("DOMContentLoaded", () => {
    // Sélection des éléments du DOM
    const profileButton = document.getElementById("profile-button");
    const popupForm = document.getElementById("popup-Form-login");
    const cancelButton = document.getElementById("cancel-button");
    const registerMsg = document.getElementById("register-msg");
    const registerForm = document.getElementById("popup-Form-register");
    const accountPopup = document.getElementById("popup-Form-account");
    const accountButton = document.getElementById("account-button");

    // Vérification si les éléments existent
    if (!profileButton || !popupForm || !cancelButton || !registerMsg || !registerForm || !accountPopup) {
        console.error("❌ Erreur : Les éléments nécessaires ne sont pas trouvés !");
        return;
    }

    // Fonction pour fermer tous les formulaires
    function closeForm() {
        popupForm.style.display = "none";
        registerForm.style.display = "none";
        accountPopup.style.display = "none";
        document.body.classList.remove("popup-open");
    }

    // Fermer toutes les popups dès que la page est chargée (actualisation)
    closeForm();

    // Vérification si l'utilisateur est connecté via un cookie
    function getCookie(name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }

    // Vérification de la présence du cookie de session
    const sessionToken = getCookie('session_token');

    // Ajouter un événement au clic sur le texte d'inscription
    registerMsg.addEventListener("click", () => {
        popupForm.style.display = "none";
        registerForm.style.display = "block";
    });

    // Vérification si l'utilisateur est connecté
    if (sessionToken) {
        // Si l'utilisateur est connecté, ne gérer que le popup du compte
        profileButton.addEventListener("click", () => {
            // Si le popup de compte est ouvert, on le ferme
            if (accountPopup.style.display === "block") {
                closeAccountPopup();
            } else {
                openAccountPopup();
            }
        });

    } else {
        // Si l'utilisateur n'est pas connecté, gérer les autres popups
        profileButton.addEventListener("click", () => {
            // Si un formulaire est ouvert, le fermer
            if (popupForm.style.display === "block" || registerForm.style.display === "block") {
                closeForm(); // Si un formulaire est ouvert, le fermer
            } else if (accountPopup.style.display === "block") {
                closeAccountPopup(); // Si le popup de compte est ouvert, le fermer
            } else {
                openForm(); // Ouvrir le formulaire de connexion
            }
        });
    }

    // Écouteur d'événement pour fermer le formulaire
    cancelButton.addEventListener("click", () => {
        closeForm();
    });
    accountButton.addEventListener("click", () => {
        window.location.href = "account.php"; // Redirige vers la page account.php
    });
    

    // Fermer le formulaire en cliquant à l'extérieur
    document.addEventListener("click", (event) => {
        if (!popupForm.contains(event.target) && !profileButton.contains(event.target) && !registerForm.contains(event.target) && !accountPopup.contains(event.target)) {
            closeForm();
        }
    });

    // Fonction pour ouvrir le formulaire de connexion
    function openForm() {
        popupForm.style.display = "block";
        document.body.classList.add("popup-open");
    }

    // Fonction pour fermer uniquement le popup de compte
    function closeAccountPopup() {
        accountPopup.style.display = "none";
        document.body.classList.remove("popup-open");
    }

    // Fonction pour ouvrir le popup du compte
    function openAccountPopup() {
        accountPopup.style.display = "block";
        document.body.classList.add("popup-open");
    }
});
