<!DOCTYPE html>
<html lang="fr">
<head>
    <base href="http://localhost/website/Projet-Web/Projet/">
    <?php include_once __DIR__ . "/../config.php"; ?>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="aide_title"></title>
    <link rel="stylesheet" href="css/M_D_CGU.css">
    <script src="js/lang.js" defer></script>
    <script src="js/scrollTop.js" defer></script>
</head>
<body>
    <?php include BASE_PATH . "header/header.php"; ?>

    <h1 id="aide_title1"></h1>
    <p><strong id="aide_last_update"></strong></p>

    <!-- Container des sections -->
    <div class="sections-wrapper">
        <div class="section">
            <h2 id="aide_accueil"></h2>
            <p id="aide_accueil_text"></p>
        </div>

        <div class="section">
            <h2 id="aide_connexion"></h2>
            <p id="aide_connexion_text"></p>
        </div>

        <div class="section">
            <h2 id="aide_classement"></h2>
            <p id="aide_classement_text"></p>
        </div>

        <div class="section">
            <h2 id="aide_contact"></h2>
            <p><d id="aide_contact_text"></d><a href="mailto:contact@TaperTapezTaper.com">contact@TaperTapezTaper.com</a></p>
        </div>
    </div>

    <!-- Bouton de scroll en haut -->
    <div id="scrollTopContainer">
        <button id="scrollTopBtn"></button>
    </div>

    <?php include BASE_PATH . "footer/footer.php"; ?>
</body>
</html>
