<base href="http://localhost/website/Projet-Web/Projet/">
<?php
session_start();
include_once __DIR__ . "/../config.php";

// Vérifier si l'utilisateur est connecté avec un token valide
$isAdmin = false;
if (isset($_COOKIE['session_token']) && !empty($_COOKIE['session_token'])) {
    function decode_jwt($jwt, $secret_key) {
        list($header, $payload, $signature) = explode('.', $jwt);
        return json_decode(base64_decode($payload), true);
    }

    $sessionToken = $_COOKIE['session_token'];
    $decoded = decode_jwt($sessionToken, SECRET_KEY);

    if ($decoded && isset($decoded['data']['role']) && $decoded['data']['role'] === 'admin') {
        $isAdmin = true;
    }
}
?>


<header class="main-header">
    <nav class="navbar">
        <div class="logo"><img class="logo_img" src="img/logo.png" alt="logo">TaperTapezTaper!</div>
        <div class="menu">
            <a id="accueil" href="index.php"></a>
            <a id="classements" href="header/classement.php"></a>
            <a id="aide" href="header/aide.php"></a>
            <?php if ($isAdmin): ?>
             <a id="admin-panel" href="admin.php" class="admin-button">Admin</a>
            <?php endif; ?>
        </div>
        <div class="icons">
            <div class="flag">
                <button id="lang-button" class="lang-button">
                <img id="flag" src="#" alt="Langue">
                </button>
                <div id="lang-dropdown" class="dropdown-menu hidden">
                <img class="lang-option" data-lang="fr" src="img/flag/fr.png" alt="Français">
                <img class="lang-option" data-lang="en" src="img/flag/en.png" alt="English">
                <img class="lang-option" data-lang="es" src="img/flag/es.png" alt="Espagnol">
                <img class="lang-option" data-lang="de" src="img/flag/de.png" alt="Deutsch">
                <img class="lang-option" data-lang="ch" src="img/flag/ch.png" alt="中文">
            </div>
        </div>
        <div class="profile">
            <button id="profile-button" class="profile-button">
                <img id="profile" src="img/profil.png" alt="Profil">
            </button>
        </div>
    </nav>
    <link rel="stylesheet" href="css/popup.css">
    <script src="js/popup.js"></script>
    <script src="js/gestion-compte.js"></script>

    <!-- Popup de Connexion -->
    <div class="login-popup">
        <div class="popup" id="popup-Form-login">
            <form action="login.php" method="POST" class="form-container">
                <h2 id="message-login"></h2>
                <label for="email">
                    <strong id="msg-email"></strong>
                </label>
                <input type="text" name="email" required />
                <label for="psw">
                    <strong id="msg-psw-login"></strong>
                </label>
                <input type="password" name="psw" required />
                <button type="submit" class="btn" id="connect-button" name="login"></button> <!-- Bouton 'Se connecter' -->
                <button type="button" class="btn cancel" id="cancel-button"></button>
                <h3 class="register-msg" id="register-msg"><a href="javascript:void(0)" id="show-register-form"></a></h3>
            </form>
        </div>

        <!-- Popup d'Inscription -->
        <div class="popup" id="popup-Form-register" style="display: none;">
            <form action="register.php" method="POST" class="form-container">
                <h2 id="message-register"></h2>
                <label for="username">
                    <strong id="user-name"></strong>
                </label>
                <input type="text" name="username" required />
                <label for="email">
                    <strong id="msg-email-register"></strong>
                </label>
                <input type="email" name="email" required />
                <label for="psw">
                    <strong id="msg-psw-register"></strong>
                </label>
                <input type="password" name="psw" required />
                <button type="submit" class="btn" id="sub-button" name="register"></button>
            </form>
        </div>
        <!-- Popup de Compte (lorsque connecté) -->
        <div class="popup" id="popup-Form-account" style="display: none;">
            <div class="form-container">
                <h2 ><d id=Bienvenue></d> <span id="user-name-display"></span></h2>
                <button class="btn" id="account-button"></button>
                <button class="btn cancel" id="logout-button"></button>
            </div>
        </div>
    </div>
</header>