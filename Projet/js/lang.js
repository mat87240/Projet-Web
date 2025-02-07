const translations = {
    "fr": {
        "flagAlt": "Français",
        "Profil-text": "Clique pour te connecter",
        "nav": {
            "accueil": "Acceuil",
            "classements": "Classement",
            "aide": "aide"
        }
    },
    "en": {
        "flagAlt": "English",
        "Profil-text": "Click to log in",
        "nav": {
            "accueil": "Home",
            "classements": "Rankings",
            "aide": "Help"
        }
    }
};

let currentLang = "fr"; // Langue par défaut

function changeLanguage() {
    // Changer de langue (basculer entre fr et en)
    currentLang = (currentLang === "fr") ? "en" : "fr";

    // Mettre à jour l'attribut alt de l'image
    document.getElementById("flag").alt = translations[currentLang]["flagAlt"];

    // Mettre à jour l'image du drapeau
    document.getElementById("flag").src = `./img/flag/${currentLang}.png`;

    // Mettre à jour les variables CSS
    document.documentElement.style.setProperty("--Profil-text", `"${translations[currentLang]["Profil-text"]}"`);
    document.documentElement.style.setProperty("--flag", `"${translations[currentLang]["flagAlt"]}"`);

    // Mettre à jour la navigation
    document.getElementById("accueil").textContent = translations[currentLang]["nav"]["accueil"];
    document.getElementById("classements").textContent = translations[currentLang]["nav"]["classements"];
    document.getElementById("aide").textContent = translations[currentLang]["nav"]["aide"];
}
