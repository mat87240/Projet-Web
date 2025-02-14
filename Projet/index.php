<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Game</title>
  <link rel="stylesheet" href="./css/index.css">
  <script src="./js/lang.js"></script>
</head>
<body>
  <?php include "header.php" ?>
  <p>contenu page</p>
  <?php
    try{
        $servername = 'localhost';
        $username = 'root';
        $password = '';
        $dbName = 'test';
        $db = new PDO("mysql:host=$servername;dbname=$dbName", $username, $password);
        //echo 'connexion reussi';
    } catch (PDOException $e) {
        die('Erreur : ' . $e->getMessage());
    }
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $username = htmlspecialchars($_POST['username']);
      $password = $_POST['password'];
      
      $query = $db->prepare("SELECT * FROM users WHERE username = :username");
      $query->bindParam(':username', $username);
      $query->execute();
      $user = $query->fetch(PDO::FETCH_ASSOC);

      if ($user && password_verify($password, $user['password'])) {
          echo "Connexion réussie. Bienvenue, " . $username . " !";
      } else {
          echo "Nom d'utilisateur ou mot de passe incorrect.";
      }
  }
?>
  <?php include "footer.php" ?>
  
</body>
</html>