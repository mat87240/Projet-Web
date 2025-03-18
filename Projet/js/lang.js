let currentLang = "fr"; // Langue par défaut
let isDropdownOpen = false; // État du menu déroulant

// ✅ Fonction pour créer un cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

// ✅ Fonction pour récupérer un cookie
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

// ✅ Fonction pour charger les traductions
async function loadTranslations(lang) {
    try {
        const response = await fetch(`http://localhost/website/Projet-Web/Projet/translations/${lang}.txt`);
        if (!response.ok) throw new Error("Erreur de chargement du fichier");

        const data = await response.text();
        const translations = JSON.parse(data);

        updatePageContent(translations);
        showMessageFromURL(translations);
    } catch (error) {
        console.error("Erreur lors du chargement des traductions :", error);
    }
}

// ✅ Fonction pour mettre à jour les éléments de la page avec les traductions
function updatePageContent(translations) {
    document.getElementById("flag").alt = translations.flagAlt;
    if (document.getElementById("fullscreenBtn")){
        document.getElementById("fullscreenBtn").textContent = translations.fullscreenBtn;
    }
    if (document.getElementById("classement_title")){
        document.getElementById("classement_title").textContent = translations.classement_title;
    }
    document.getElementById("flag").src = `http://localhost/website/Projet-Web/Projet/img/flag/${currentLang}.png`;

    if (!isDropdownOpen) {
        document.documentElement.style.setProperty("--flag", `"${translations.flagAlt}"`);
    }

    Object.keys(translations.nav).forEach(id => {
        let element = document.getElementById(id);
        if (element) element.textContent = translations.nav[id];
    });

    Object.keys(translations.form).forEach(id => {
        let element = document.getElementById(id);
        if (element) element.textContent = translations.form[id];
    });

    ["accessibilite", "mentions", "donnees", "cgu", "cookies", "plan"].forEach(id => {
        let element = document.getElementById(`footer-${id}`);
        if (element) element.textContent = translations.footer[id];
    });

    ["mentions_legal", "CGU", "donnee_perso", "plan_site" , "aide" , "account"].forEach(section => {
        if (translations[section]) {
            let titleElement = document.getElementById("title");
            if (titleElement) titleElement.textContent = translations[section].title;

            Object.keys(translations[section]).forEach(key => {
                if (key !== "title") {
                    let element = document.getElementById(key);
                    if (element) element.textContent = translations[section][key];
                }
            });
        }
    });
    
       Object.keys(translations.placeholders).forEach(id => {
            let element = document.getElementById(id);
            if (element) {
                element.placeholder = translations.placeholders[id];
            }
        });
        
    }
// Fonction pour afficher un message sous forme de popup depuis l'URL
function showMessageFromURL(translations) {

    const urlParams = new URLSearchParams(window.location.search);
    const messageKey = urlParams.get('message'); // Récupère la clé du message

    if (messageKey && translations.messages[messageKey]) {
        const popup = document.createElement('div');
        popup.classList.add('popup_url');

        popup.innerHTML = `
            <div class="popup_url_content">
                <p>${translations.messages[messageKey]}</p>
                <button id="close_popup_url">OK</button>
            </div>
        `;
        document.body.appendChild(popup);

        document.getElementById('close_popup_url').addEventListener('click', () => {
            popup.remove();
            removeUrlParam('message');
        });
    }
}


// Fonction pour supprimer le paramètre message de l'URL
function removeUrlParam(param) {
    const url = new URL(window.location);
    url.searchParams.delete(param);  // Supprimer le paramètre "message"
    window.history.replaceState({}, document.title, url.toString());  // Met à jour l'URL sans recharger la page
}

// ✅ Fonction pour changer la langue et stocker dans un cookie
function changeLanguage(lang) {
    currentLang = lang;
    setCookie("lang", lang, 30); // Stocker la langue pour 30 jours
    loadTranslations(currentLang);
    toggleDropdown(false);
}

// ✅ Fonction pour ouvrir/fermer le menu déroulant
function toggleDropdown(forceClose = null) {
    const dropdown = document.getElementById("lang-dropdown");
    const flag = document.querySelector(".flag");

    if (forceClose === null) {
        isDropdownOpen = !isDropdownOpen;
    } else {
        isDropdownOpen = !forceClose;
    }

    dropdown.classList.toggle("hidden", !isDropdownOpen);
    flag.classList.toggle("menu-open", isDropdownOpen);
}
// ✅ Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    currentLang = getCookie("lang") || "fr"; // Récupérer la langue depuis le cookie

    loadTranslations(currentLang);

    const langButton = document.getElementById("lang-button");
    const dropdown = document.getElementById("lang-dropdown");

    if (langButton && dropdown) {
        langButton.addEventListener("click", () => toggleDropdown());

        document.querySelectorAll(".lang-option").forEach(flag => {
            flag.addEventListener("click", (event) => {
                const selectedLang = event.target.getAttribute("data-lang");
                changeLanguage(selectedLang);
                toggleDropdown(true);
            });
        });

        document.addEventListener("click", (event) => {
            if (!dropdown.contains(event.target) && !langButton.contains(event.target)) {
                toggleDropdown(true);
            }
        });
    } else {
        console.error("❌ Erreur : Le menu déroulant ou le bouton de langue est introuvable !");
    }
});
