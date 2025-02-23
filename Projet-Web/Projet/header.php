<header class="main-header">
<nav class="navbar">
        <div class="logo">test!</div>
        <div class="menu">
            <a id="accueil" href="index.php"></a>
            <a id="classements" href="classement.php"></a>
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
        <form action="./index.php" method="POST" class="form-container">
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
            <h3 class="register-msg" id="register-msg"></h3>
            
        </form>
    </div>
    <div class="popup" id="popup-Form-register" style="display: none;">
    <form action="./index.php" class="form-container">
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
        <button type="submit" class="btn" id="sub-button"></button>
    </form>
</div>

</div>
</header>

<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $dbName = 'test';
    $db = new PDO("mysql:host=$servername;dbname=$dbName", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    die('Erreur : ' . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Vérification des variables POST
    if (!isset($_POST['email']) || !isset($_POST['psw'])) {
        die("Données manquantes !");
    }

    $username = htmlspecialchars($_POST['email']);
    $password = $_POST['psw'];

    $query = $db->prepare("SELECT * FROM users WHERE username = :username");
    $query->bindParam(':username', $username);
    $query->execute();
    $user = $query->fetch(PDO::FETCH_ASSOC);

    //if ($user && password_verify($password, $user['password'])) {
      if ($user && $password == $user['password']) {
        echo "Connexion réussie. Bienvenue, " . htmlspecialchars($username) . " !";
    } else {
        echo "Nom d'utilisateur ou mot de passe incorrect.";
    }
}
?>


