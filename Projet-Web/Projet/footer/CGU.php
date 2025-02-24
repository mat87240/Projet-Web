<!DOCTYPE html>
<html lang="fr">
<head>
    <base href="http://localhost/website/Projet-Web/Projet/">
    <?php include_once __DIR__ . "/../config.php"; ?>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="cgu_title"></title>
    <link rel="stylesheet" href="css/M_D_CGU.css">
    <script src="js/lang.js" defer></script>
    <script src="js/scrollTop.js" defer></script>
</head>
<body>
    <?php include BASE_PATH . "header/header.php"; ?>

    <h1 id="cgu_title1"></h1>
    <p><strong id="cgu_last_update"></strong></p>
    
    <div class="section">
        <h2 id="cgu_intro_title"></h2>
        <p id="cgu_intro_text"></p>
    </div>
    
    <div class="section">
        <h2 id="cgu_access_title"></h2>
        <p id="cgu_access_text"></p>
    </div>
    
    <div class="section">
        <h2 id="cgu_responsibility_title"></h2>
        <p id="cgu_responsibility_text"></p>
    </div>
    
    <div class="section">
        <h2 id="cgu_ip_title"></h2>
        <p id="cgu_ip_text"></p>
    </div>
    
    <div class="section">
        <h2 id="cgu_modifications_title"></h2>
        <p id="cgu_modifications_text"></p>
    </div>
    <div id="scrollTopContainer">
    <button id="scrollTopBtn"></button>
    </div>

    
    <?php include BASE_PATH . "footer/footer.php"; ?>
</body>
</html>
