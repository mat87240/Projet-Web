<!DOCTYPE html>
<html lang="fr">

<head>
    <base href="http://localhost/website/Projet-Web/Projet/">
    <?php include_once __DIR__ . "/../config.php"; ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="title"></title>
    <script src="js/lang.js" defer></script>
    <link rel="stylesheet" href="css/aide.css">
    
</head>

<body>
<?php include BASE_PATH . "header/header.php"; ?>

<h1 id="Aide_title1"></h1>
    <p><strong id="Aide_last_update"></strong></p>

    <!-- Container des sections -->
    <div class="sections-wrapper">
        <div class="section">
            <h2 id="Aide_accueil"></h2>
            <p id="Aide_accueil_text"></p>
        </div>

        <div class="section">
            <h2 id="Aide_connexion"></h2>
            <p id="Aide_connexion_text"></p>
        </div>

        <div class="section">
            <h2 id="Aide_classement"></h2>
            <p id="Aide_classement_text"></p>
        </div>

        <div class="section">
            <h2 id="Aide_contact"></h2>
            <p><d id="Aide_contact_text"></d><a href="mailto:contact@TaperTapezTaper.com">contact@TaperTapezTaper.com</a></p>
        </div>
    </div>

    <!-- Bouton de scroll en haut -->
    <div id="scrollTopContainer">
        <button id="scrollTopBtn"></button>
    </div>

<?php include BASE_PATH . "footer/footer.php"; ?>
</body>
</html>