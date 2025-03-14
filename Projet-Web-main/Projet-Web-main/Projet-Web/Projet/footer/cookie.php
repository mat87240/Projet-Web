<!DOCTYPE html>
<html lang="fr">
<head>
    <base href="http://localhost/website/Projet-Web/Projet/">
    <?php include_once __DIR__ . "/../config.php"; ?>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="don_title"></title>
    <link rel="stylesheet" href="css/cookie.css">
    <script src="js/lang.js" defer></script>
    <script src="js/scrollTop.js" defer></script>
    <script src="js/cookie_page.js" defer></script>
</head>
<body>
<?php include BASE_PATH . "header/header.php"; ?>

<div class="cookie">
    <p>Nous utilisons des cookies pour améliorer votre expérience. Acceptez vous les cookies ?</p>
    <button class="cookie-btn" onclick="setCookieConsent(true)">Oui</button>
    <button class="cookie-btn" onclick="setCookieConsent(false)">Non</button>
</div>

<?php include BASE_PATH . "footer/footer.php"; ?>
</body>
</html>