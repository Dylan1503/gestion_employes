<?php
// Headers CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Réponse aux requêtes OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../../config/db.php";

// Récupérer l'id_service passé en paramètre GET ou DELETE
$id_service = $_GET['id_service'] ?? null;

if ($id_service) {
    try {
        $stmt = $pdo->prepare("DELETE FROM service WHERE id_service = ?");
        $stmt->execute([$id_service]);
        echo json_encode(["success" => true, "message" => "Service supprimé avec succès"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID manquant"]);
}
