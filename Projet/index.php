<!doctype html>
<html lang="fr">
<head>
  <base href="http://localhost/website/Projet-Web/Projet/">
  <?php include_once "config.php"; ?>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Game</title>
  <link rel="stylesheet" href="css/index.css">
  <script src="js/lang.js"></script>
</head>
<body>
<?php include BASE_PATH . "header/header.php"; ?>
<main>
    <?php if (isset($_COOKIE['session_token'])): ?>
        <!-- Si l'utilisateur est connecté, afficher l'iframe -->
        <iframe id="gameIframe" src="Rythm/mainMenu/mainMenu.html"></iframe>
        <button id="fullscreenBtn"></button>
    <script>
    document.getElementById("fullscreenBtn").addEventListener("click", function() {
    let iframe = document.getElementById("gameIframe");

    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen();
    }
});
</script>
    <?php else: ?>
        <!-- Si l'utilisateur n'est pas connecté, afficher une image -->
        <img src="./img/Logo_site_screen.png" alt="Veuillez vous connecter">
    <?php endif; ?>
    

</main>
<?php include BASE_PATH . "footer/footer.php" ?>
</body>
</html>