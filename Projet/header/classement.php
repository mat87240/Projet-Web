<!DOCTYPE html>
<html lang="fr">

<head>
    <base href="http://localhost/website/Projet-Web/Projet/">
    <?php include_once __DIR__ . "/../config.php"; ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="title"></title>
    <script src="js/lang.js" defer></script>
    <link rel="stylesheet" href="css/classement.css">
    
</head>


<body>
<?php include BASE_PATH . "header/header.php"; ?>
<div class="leader">
    <main class="leaderboard">
        <h1 id="classement_title"></h1>
        <div class="header-boxes">
            <div>Rank</div>
            <div>Pseudo</div>
            <div>Score</div>
        </div>
        <div class="player-card">
            <div>1</div>
            <div>#pseudo1</div>
            <div>#score1</div>
        </div>
        <div class="player-card">
            <div>2</div>
            <div>#pseudo2</div>
            <div>#score2</div>
        </div>
        <div class="player-card">
            <div>3</div>
            <div>#pseudo3</div>
            <div>#score3</div>
        </div>
        <div class="player-card">
            <div>4</div>
            <div>#pseudo4</div>
            <div>#score4</div>
        </div>
        <div class="player-card">
            <div>5</div>
            <div>#pseudo5</div>
            <div>#score5</div>
        </div>
    </main>
</div>

    <?php include BASE_PATH . "footer/footer.php" ?>
</body>

</html>