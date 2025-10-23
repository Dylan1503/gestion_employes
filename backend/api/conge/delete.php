<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id_conge'])) {
    $stmt = $pdo->prepare("DELETE FROM conge WHERE id_conge = ?");
    $success = $stmt->execute([$data['id_conge']]);

    if ($success) {
        echo json_encode(["success" => true, "message" => "Congé supprimé avec succès"]);
    } else {
        echo json_encode(["success" => false, "error" => "Erreur lors de la suppression"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID manquant"]);
}
