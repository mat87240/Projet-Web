<?php
include_once "config.php";

// Check if the user is an administrator (add your own authentication logic here)
if (!isset($_COOKIE['session_token']) || empty($_COOKIE['session_token'])) {
    header("Location: index.php?message=not_logged_in");
    exit();
}

// Function to decode a JWT
function decode_jwtD($jwt, $secret_key) {
    list($header, $payload, $signature) = explode('.', $jwt);
    $decodedPayload = json_decode(base64_decode($payload), true);
    return $decodedPayload;
}

$sessionToken = $_COOKIE['session_token'];
$decoded = decode_jwtD($sessionToken, SECRET_KEY);

if (!$decoded || !isset($decoded['data']['id']) || $decoded['data']['role'] !== 'admin') {
    header("Location: index.php?message=unauthorized");
    exit();
}

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($conn->connect_error) {
    die("Database connection error: " . $conn->connect_error);
}

// Delete a user
if (isset($_POST['delete_user'])) {
    $userIdToDelete = intval($_POST['user_id']);
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $userIdToDelete);
    $stmt->execute();
    $stmt->close();
}

// Search for users
$search = $_GET['search'] ?? '';
$sql = "SELECT id, username, email FROM users WHERE username LIKE ? OR email LIKE ?";
$stmt = $conn->prepare($sql);
$searchTerm = "%$search%";
$stmt->bind_param("ss", $searchTerm, $searchTerm);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Panel</title>
    <link rel="stylesheet" href="./css/admin.css">
    <script src="js/lang.js" defer></script>
</head>
<body>
<?php include BASE_PATH . "header/header.php"; ?>
    <h2>User Management</h2>
    <form method="GET">
        <input type="text" name="search" placeholder="Search for a user..." value="<?= htmlspecialchars($search) ?>">
        <button type="submit">Search</button>
    </form>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?= $row['id'] ?></td>
            <td><?= htmlspecialchars($row['username']) ?></td>
            <td><?= htmlspecialchars($row['email']) ?></td>
            <td>
                <form method="POST" onsubmit="return confirm('Are you sure you want to delete this user?');">
                    <input type="hidden" name="user_id" value="<?= $row['id'] ?>">
                    <button type="submit" name="delete_user">Delete</button>
                </form>
            </td>
        </tr>
        <?php endwhile; ?>
    </table>
    <?php include BASE_PATH . "footer/footer.php" ?>
</body>
</html>
<?php $conn->close(); ?>