<?php
session_start();
include_once "config.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Charger la langue sélectionnée
$lang = isset($_SESSION['lang']) ? $_SESSION['lang'] : 'fr';
if (isset($_GET['lang'])) {
    $_SESSION['lang'] = $_GET['lang'];
    $lang = $_GET['lang'];
}

// Charger le fichier de traduction
$lang_file = "lang.json";
$translations = json_decode(file_get_contents($lang_file), true);
$T = $translations[$lang];

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $T["db_error"], "error" => $conn->connect_error]);
    exit;
}

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function generate_jwt($payload, $secret_key) {
    $header = json_encode(["alg" => "HS256", "typ" => "JWT"]);
    $base64UrlHeader = base64url_encode($header);
    $base64UrlPayload = base64url_encode(json_encode($payload));
    $signature = hash_hmac('sha256', "$base64UrlHeader.$base64UrlPayload", $secret_key, true);
    $base64UrlSignature = base64url_encode($signature);
    return "$base64UrlHeader.$base64UrlPayload.$base64UrlSignature";
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["email"]) && isset($_POST["psw"])) {
        $input = trim($_POST["email"]);
        $password = trim($_POST["psw"]);
        
        if (!empty($input) && !empty($password)) {
            $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ? OR username = ?");
            $stmt->bind_param("ss", $input, $input);
            $stmt->execute();
            $stmt->store_result();
            
            if ($stmt->num_rows > 0) {
                $stmt->bind_result($userId, $username, $hashedPassword);
                $stmt->fetch();
                
                if (password_verify($password, $hashedPassword)) {
                    $payload = [
                        "iss" => "localhost",
                        "aud" => "localhost",
                        "iat" => time(),
                        "exp" => time() + 604800,
                        "data" => ["id" => $userId, "username" => $username, "email" => $input]
                    ];
                    
                    $jwt = generate_jwt($payload, SECRET_KEY);
                    header("Location: index.php?message=login_success");
                    exit;
                } else {
                    header("Location: index.php?message=login_error");
                    exit;
                }
            } else {
                header("Location: index.php?message=login_error");
                exit;
            }
            $stmt->close();
        } else {
            header("Location: index.php?message=missing_data");
            exit;
        }
    } else {
        header("Location: index.php?message=missing_data");
        exit;
    }
} else {
    header("Location: index.php?message=method_not_allowed");
    exit;
}

$conn->close();
?>
