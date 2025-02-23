<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="title"></title>
    <link rel="stylesheet" href="./css/index.css">
    <script src="./js/lang.js" defer></script>
</head>

<body>
    <?php include "header.php" ?>
    <main class="leaderboard">
        <link re="stylesheet" href="./css/classement.css">
        <h1>Classement des Joueurs</h1>
        <div class="header-boxes">
            <div>Rang</div>
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
    </main>

    <?php include "footer.php" ?>
</body>

</html>