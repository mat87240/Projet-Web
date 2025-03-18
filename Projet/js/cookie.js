//Gestion des cookies de session
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; Secure; HttpOnly";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Gestion de la session après connexion
function setSessionToken(token) {
    setCookie("session_token", token, 7);
}

function getSessionToken() {
    return getCookie("session_token");
}

function logout() {
    eraseCookie("session_token");
    window.location.href = "index.php?message=logged_out";
}

// Vérification de la session à chaque chargement de page
document.addEventListener("DOMContentLoaded", () => {
    const token = getSessionToken();
    if (!token) {
        window.location.href = "login.php";
    }
});