<?php
session_start();
include_once "config.php";

// Vérifier si le cookie session_token est défini
if (!isset($_COOKIE['session_token']) || empty($_COOKIE['session_token'])) {
    header("Location: index.php?message=not_logged_in");
    exit();
}

// Fonction pour décoder un JWT
function decode_jwt($jwt, $secret_key) {
    list($header, $payload, $signature) = explode('.', $jwt);
    $decodedPayload = json_decode(base64_decode($payload), true);
    return $decodedPayload;
}

$userId = null;
$username = null;
$email = null;
$profileImage = null;

// Connexion à la base de données
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($conn->connect_error) {
    die("Erreur de connexion à la base de données : " . $conn->connect_error);
}

// Récupérer le session_token du cookie
$sessionToken = $_COOKIE['session_token'];

// Décoder le JWT pour obtenir les informations de l'utilisateur
$decoded = decode_jwt($sessionToken, SECRET_KEY);

// Vérifier que le JWT est valide
if ($decoded && isset($decoded['data']['id'])) {
    $userId = $decoded['data']['id'];
    $username = $decoded['data']['username'];
    $email = $decoded['data']['email'];
} else {
    // Si le JWT est invalide, rediriger vers la page de connexion
    header("Location: index.php?message=session_invalid");
    exit();
}

// Préparer la requête pour récupérer les informations de l'utilisateur
$stmt = $conn->prepare("SELECT username, email, image FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$stmt->store_result();

// Vérifier si une ligne correspond à l'ID de l'utilisateur
if ($stmt->num_rows == 1) {
    $stmt->bind_result($username, $email, $profileImage);
    $stmt->fetch();
} else {
    // Si aucun utilisateur n'est trouvé avec cet ID, rediriger vers la page de connexion
    header("Location: index.php?message=session_invalid");
    exit();
}

$stmt->close();

// Traitement des modifications
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Mise à jour du nom d'utilisateur, de l'email et du mot de passe
    if (isset($_POST['update_username']) || isset($_POST['update_email']) || isset($_POST['update_password'])) {
        $newUsername = $_POST['username'] ?? $username;
        $newEmail = $_POST['email'] ?? $email;
        $newPassword = $_POST['password'] ?? null;

        // Validation du nom d'utilisateur et de l'email
        if (!empty($newUsername) && !empty($newEmail) && filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {

            // Mettre à jour le mot de passe si fourni
            if ($newPassword) {
                $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            } else {
                $hashedPassword = null;
            }

            // Préparer la mise à jour
            $updateQuery = "UPDATE users SET username = ?, email = ?" . ($newPassword ? ", password = ?" : "") . " WHERE id = ?";
            $stmt = $conn->prepare($updateQuery);
            if ($newPassword) {
                $stmt->bind_param("sssi", $newUsername, $newEmail, $hashedPassword, $userId);
            } else {
                $stmt->bind_param("ssi", $newUsername, $newEmail, $userId);
            }

            if ($stmt->execute()) {
                header("Location: account.php?message=update_success");
            } else {
                header("Location: account.php?message=update_error");
            }
            $stmt->close();
        } else {
            header("Location: account.php?message=invalid_input");
        }
    }

    // Mise à jour de l'image de profil
    /*if (isset($_FILES['image'])) {
        $image = $_FILES['image'];
        if ($image['error'] === 0) {
            // Validation de l'image
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            $imageExtension = pathinfo($image['name'], PATHINFO_EXTENSION);
            if (in_array(strtolower($imageExtension), $allowedExtensions)) {
                $uploadDir = 'uploads/';
                $imagePath = $uploadDir . basename($image['name']);
                if (move_uploaded_file($image['tmp_name'], $imagePath)) {
                    // Mettre à jour l'image de profil
                    $stmt = $conn->prepare("UPDATE users SET image = ? WHERE id = ?");
                    $stmt->bind_param("si", $imagePath, $userId);
                    if ($stmt->execute()) {
                        header("Location: account.php?message=image_success");
                    } else {
                        header("Location: account.php?message=image_error");
                    }
                    $stmt->close();
                } else {
                    header("Location: account.php?message=image_upload_error");
                }
            } else {
                header("Location: account.php?message=image_invalid_format");
            }
        } else {
            header("Location: account.php?message=image_error");
        }
    }*/

    // Suppression du compte
    if (isset($_POST['delete_account'])) {
        $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
        $stmt->bind_param("i", $userId);
        if ($stmt->execute()) {
            // Supprimer le cookie de session
            setcookie("session_token", "", time() - 3600, "/");
            header("Location: index.php?message=account_deleted");
        } else {
            header("Location: account.php?message=delete_error");
        }
        $stmt->close();
    }
}

$conn->close();

?>
<!doctype html>
<html lang="fr">
<head>
  <base href="http://localhost/website/Projet-Web/Projet/">
  <?php include_once "config.php"; ?>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Account</title>
  <link rel="stylesheet" href="css/account.css">
  <script src="js/lang.js"></script>
</head>
<body>
<?php include BASE_PATH . "header/header.php"; ?>
<div class ="account">
<h2>Modifier mon profil</h2>
    <form method="POST" enctype="multipart/form-data">
        <label for="username">Nom d'utilisateur :</label>
        <input type="text" id="username" name="username" value="<?= htmlspecialchars($username) ?>" required><br>

        <label for="email">Email :</label>
        <input type="email" id="email" name="email" value="<?= htmlspecialchars($email) ?>" required><br>

        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" placeholder="Laissez vide pour ne pas modifier"><br>

        <button type="submit" name="update_username" value="1">Mettre à jour</button>
    </form>

    <h2>Supprimer mon compte</h2>
    <form method="POST">
        <p>Attention : cette action supprimera définitivement votre compte.</p>
        <button type="submit" name="delete_account" value="1">Supprimer mon compte</button>
    </form>
</div>
<?php include BASE_PATH . "footer/footer.php" ?>
</body>
</html>