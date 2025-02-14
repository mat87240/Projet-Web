<header class="main-header">
<nav class="navbar">
        <div class="logo">test!</div>
        <div class="menu">
            <a id="accueil" href="#"></a>
            <a id="classements" href="#"></a>
            <a id="aide" href="#"></a>
        </div>
        <div class="icons">
            <div class="flag">
                <button id="lang-button" class="lang-button">
                <img id="flag" src="#" alt="Langue">
                </button>
                <div id="lang-dropdown" class="dropdown-menu hidden">
                <img class="lang-option" data-lang="fr" src="./img/flag/fr.png" alt="Français">
                <img class="lang-option" data-lang="en" src="./img/flag/en.png" alt="English">
                <img class="lang-option" data-lang="es" src="./img/flag/es.png" alt="Espagnol">
                <img class="lang-option" data-lang="de" src="./img/flag/de.png" alt="Deutsch">
                <img class="lang-option" data-lang="ch" src="./img/flag/ch.png" alt="中文">
            </div>
        </div>
        <div class="profile">
    <button id="profile-button" class="profile-button">
        <img id="profile" src="./img/profil.png" alt="Profil">
    </button>
</div>
</nav>
<link rel="stylesheet" href="./css/popup.css">
<script src="./js/popup.js"></script>

<div class="login-popup">
    <div class="popup" id="popup-Form-login">
        <form action="./index.php" class="form-container">
            <h2 id="message-login"></h2>
            <label for="email">
                <strong id="msg-email"></strong>
            </label>
            <input type="text" name="email" required />
            <label for="psw">
                <strong id="msg-psw-login"></strong>
            </label>
            <input type="password" name="psw" required />
            <button type="submit" class="btn" id="connect-button"></button>
            <button type="button" class="btn cancel" id="cancel-button"></button>
            <h3 class="register-msg" id="register-msg">pas encore de compte ? clique ici pour le crée</h3>
            
        </form>
    </div>
    <div class="popup" id="popup-Form-register" style="display: none;">
    <form action="./index.php" class="form-container">
        <h2>Créer un compte</h2>
        <label for="username">
            <strong>Nom d'utilisateur</strong>
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
        <button type="submit" class="btn">S'inscrire</button>
    </form>
</div>

</div>
</header>


