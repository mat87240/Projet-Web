let currentLang = "fr"; // Langue par défaut
let isDropdownOpen = false; // État du menu déroulant (ouvert ou fermé)

// Fonction pour charger les traductions depuis un fichier JSON
async function loadTranslations(lang) {
    try {
        const response = await fetch(`translations/${lang}.txt`);
        if (!response.ok) throw new Error("Erreur de chargement du fichier");

        const data = await response.text();
        const translations = JSON.parse(data);

        updatePageContent(translations);
    } catch (error) {
        console.error("Erreur lors du chargement des traductions :", error);
    }
}

// Fonction pour mettre à jour les éléments de la page avec les nouvelles traductions
function updatePageContent(translations) {
    document.getElementById("flag").alt = translations.flagAlt;
    document.getElementById("flag").src = `./img/flag/${currentLang}.png`;

    // Si le menu déroulant est ouvert, ne pas mettre à jour la propriété --flag
    if (!isDropdownOpen) {
        document.documentElement.style.setProperty("--flag", `"${translations.flagAlt}"`);
    }

    // Mise à jour des variables CSS pour les tooltips
    document.documentElement.style.setProperty("--Profil-text", `"${translations["Profil-text"]}"`);

    // Mise à jour de la navigation
    Object.keys(translations.nav).forEach(id => {
        let element = document.getElementById(id);
        if (element) element.textContent = translations.nav[id];
    });

    // Mise à jour du form
    Object.keys(translations.form).forEach(id => {
        let element = document.getElementById(id);
        if (element) element.textContent = translations.form[id];
    });

    // Mise à jour des éléments du footer
    const footerLinks = [
        "accessibilite",
        "mentions",
        "donnees",
        "cgu",
        "cookies",
        "plan"
    ];

    footerLinks.forEach(id => {
        let element = document.getElementById(`footer-${id}`);
        if (element) element.textContent = translations.footer[id];
    });
}

// Fonction pour changer la langue
function changeLanguage(lang) {
    currentLang = lang;
    loadTranslations(currentLang);
    toggleDropdown(false); // Ferme le menu après la sélection
}

// Fonction pour ouvrir ou fermer le menu déroulant
function toggleDropdown(forceClose = null) {
    const dropdown = document.getElementById("lang-dropdown");
    const flag = document.querySelector(".flag"); // Sélectionner l'élément .flag

    // Ouvre ou ferme le menu déroulant
    if (forceClose === null) {
        isDropdownOpen = !isDropdownOpen; // Inverse l'état du menu
    } else {
        isDropdownOpen = !forceClose;
    }

    // Affiche ou masque le menu
    dropdown.classList.toggle("hidden", !isDropdownOpen);

    // Ajoute ou retire la classe 'menu-open' sur l'élément .flag
    if (isDropdownOpen) {
        flag.classList.add("menu-open"); // Ajoute la classe pour désactiver le tooltip
    } else {
        flag.classList.remove("menu-open"); // Retire la classe pour réactiver le tooltip
    }
}

// Ajout des événements après le chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
    loadTranslations(currentLang); // Charger la langue par défaut

    const langButton = document.getElementById("lang-button");
    const dropdown = document.getElementById("lang-dropdown");

    // Vérification que les éléments existent
    if (langButton && dropdown) {
        // Clic sur le bouton pour ouvrir/fermer le menu
        langButton.addEventListener("click", () => toggleDropdown());

        // Clic sur un drapeau pour changer la langue
        document.querySelectorAll(".lang-option").forEach(flag => {
            flag.addEventListener("click", (event) => {
                const selectedLang = event.target.getAttribute("data-lang");
                changeLanguage(selectedLang);
                toggleDropdown(true);
            });
        });

        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener("click", (event) => {
            if (!dropdown.contains(event.target) && !langButton.contains(event.target)) {
                toggleDropdown(true);
            }
        });
    } else {
        console.error("❌ Erreur : Le menu déroulant ou le bouton de langue est introuvable !");
    }
});
