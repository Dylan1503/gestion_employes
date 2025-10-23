<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../../config/db.php";

if (isset($_GET['id_service'])) {
    $id_service = $_GET['id_service'];
    $stmt = $pdo->prepare("SELECT * FROM service WHERE id_service = ?");
    $stmt->execute([$id_service]);
    $service = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($service) {
        echo json_encode(["success" => true, "service" => $service]);
    } else {
        echo json_encode(["success" => false, "error" => "Service non trouvé"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID manquant"]);
}
