<!DOCTYPE html>
<html lang="fr">
<head>
    <base href="http://localhost/website/Projet-Web/Projet/">
    <?php include_once __DIR__ . "/../config.php"; ?>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="mentions_title"></title>
    <link rel="stylesheet" href="css/M_D_CGU.css">
    <script src="js/lang.js" defer></script>
    <script src="js/scrollTop.js" defer></script>
</head>
<body>
<?php include BASE_PATH . "header/header.php"; ?>

<h1 id="mentions_title1"></h1>
<p><strong id="mentions_last_update"></strong></p>

<!-- Container des sections -->
<div class="sections-wrapper">
    <div class="section">
        <h2 id="mentions_editor"></h2>
        <p ><strong id="mentions_company_name"></strong></p>
        <p><strong id="mentions_address"></strong></p>
        <p><strong id="mentions_siret"></strong></p>
        <p><strong id="mentions_email"></strong> <a href="mailto:contact@TaperTapezTaper.com">contact@TaperTapezTaper.com</a></p>
    </div>

    <div class="section">
        <h2 id="mentions_hosting"></h2>
        <p><strong id="mentions_host"></strong></p>
        <p><strong id="mentions_host_address"></strong></p>
    </div>

    <div class="section">
        <h2 id="mentions_intellectual_property"></h2>
        <p id="mentions_intellectual_text"></p>
    </div>

    <div class="section">
        <h2 id="mentions_data_protection"></h2>
        <p id="mentions_data_text"></p>
    </div>

    <div class="section">
        <h2 id="mentions_cookies"></h2>
        <p id="mentions_cookies_text"></p>
    </div>

    <div class="section">
        <h2 id="mentions_responsibility"></h2>
        <p id="mentions_responsibility_text"></p>
    </div>

    <div class="section">
        <h2 id="mentions_law"></h2>
        <p id="mentions_law_text"></p>
    </div>
</div>

<!-- Bouton de scroll en haut -->
<div id="scrollTopContainer">
    <button id="scrollTopBtn"></button>
</div>

<?php include BASE_PATH . "footer/footer.php" ?>
</body>
</html>
