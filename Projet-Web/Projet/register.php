<?php
include_once "config.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($conn->connect_error) {
    die("Erreur de connexion à la base de données: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["username"]) && isset($_POST["email"]) && isset($_POST["psw"])) {
        $username = trim($_POST["username"]);
        $email = trim($_POST["email"]);
        $password = trim($_POST["psw"]);

        // Validation de l'email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            header("Location: index.php?message=email_invalide");
            exit;
        }

        // Vérifier si l'email existe déjà
        $checkEmail = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $checkEmail->bind_param("s", $email);
        $checkEmail->execute();
        $checkEmail->store_result();

        if ($checkEmail->num_rows > 0) {
            http_response_code(409); // Code 409 : Conflict
            header("Location: index.php?message=email_use");
            exit;
        }

        // Vérifier si le nom d'utilisateur existe déjà
        $checkUsername = $conn->prepare("SELECT id FROM users WHERE username = ?");
        $checkUsername->bind_param("s", $username);
        $checkUsername->execute();
        $checkUsername->store_result();

        if ($checkUsername->num_rows > 0) {
            http_response_code(409); // Code 409 : Conflict
            header("Location: index.php?message=username_use");
            exit;
        }

        $checkEmail->close();
        $checkUsername->close();

        // Hachage sécurisé du mot de passe
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insérer l'utilisateur dans la base de données
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $hashedPassword);

        if ($stmt->execute()) {
            http_response_code(201); // Code 201 : Created
            header("Location: index.php?message=register_succes");
            exit;
        } else {
            http_response_code(500);
            header("Location: index.php?message=register_error");
            exit;
        }

        $stmt->close();
    } else {
        http_response_code(400);
        header("Location: index.php?message=register_empty");
        exit;
    }
} else {
    http_response_code(405);
    header("Location: index.php?message=method_not_allowed");
    exit;
}

$conn->close();
?>
