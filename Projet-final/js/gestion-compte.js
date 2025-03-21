document.addEventListener("DOMContentLoaded", function () {
    function getCookie(name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    }

    function updateHeader() {
        let sessionToken = getCookie("session_token");
        let accountPopup = document.getElementById("popup-Form-account");
        let loginPopup = document.getElementById("popup-Form-login");
        let registerPopup = document.getElementById("popup-Form-register");
        let userNameDisplay = document.getElementById("user-name-display");

        if (sessionToken) {
            try {
                let userData = JSON.parse(atob(sessionToken.split(".")[1])); // Décode le JWT
                if (userData && userData.data && userData.data.username) {
                    userNameDisplay.textContent = userData.data.username;
                    accountPopup.style.display = "none";
                    loginPopup.style.display = "none";
                    registerPopup.style.display = "none";
                } else {
                    throw new Error("Données utilisateur invalides");
                }
            } catch (e) {
                console.error("Erreur lors de l'analyse du token : ", e);
                setCookie("session_token", "", -1); // Supprimer le cookie si le token est invalide
                window.location.reload();
            }
        }
    }

    document.getElementById("logout-button")?.addEventListener("click", function () {
        setCookie("session_token", "", -1);
        window.location.href = "index.php?message=logged_out";
    });

    updateHeader();
});
