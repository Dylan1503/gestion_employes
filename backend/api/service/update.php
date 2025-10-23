<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id_service'], $data['libelle']) && !empty(trim($data['libelle']))) {
    $id_service = $data['id_service'];
    $libelle = trim($data['libelle']);

    try {
        $stmt = $pdo->prepare("UPDATE service SET libelle = ? WHERE id_service = ?");
        $stmt->execute([$libelle, $id_service]);
        echo json_encode(["success" => true, "message" => "Service modifié avec succès"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID ou libellé manquant"]);
}
