<?php
    try{
        $servername = 'localhost';
        $username = 'root';
        $password = '';
        $dbName = 'test';
        $db = new PDO("mysql:host=$servername;dbname=$dbName", $username, $password);
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