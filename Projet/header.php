<header class="main-header">
</div>
<nav class="navbar">
        <div class="logo">test!</div>
        <div class="menu">
            <a id=accueil href="#">accueil</a>
            <a id=classements href="#">classements</a>
            <a id= aide href="#">aide</a>
        </div>
        <div class="icons">
            <div class="flag">
                <button onclick="changeLanguage()" class="lang-button"><img id="flag" src="./img/flag/fr.png" alt="Langue"></button>

            </div>
            <div class="profile">
               <button onclick="seconnecter()" class="profile-button"><img src="./img/profil.png" alt="Profil"></button>
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


