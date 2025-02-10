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
                <button onclick="seconnecter()" class="profile-button">
                    <img id="profile" src="./img/profil.png" alt="Profil">
                </button>
            </div>
        </div>
    </nav>
    <div class="popup" id="popup-Form">
        <form index="/index.php" class="form-container">
            <h2>Veuillez vous connecter</h2>
            <label for="email">
                <strong>E-mail/Pseudo</strong>
            </label>
            <input type="text" placeholder="Votre Email/Pseudo" name="email" required />
            <label for="psw">
                <strong>Mot de passe</strong>
            </label>
            <input type="password" placeholder="Votre mot de passe" name="psw" required />
            <button type="submit" class="btn">Se connecter</button>
            <button type="submit" class="btn cancel" onclick="closeForm()">Annuler</button>
        </form>
    </div>
</header>


