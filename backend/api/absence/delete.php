<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id_abs'])) {
    $stmt = $pdo->prepare("DELETE FROM absence WHERE id_abs = ?");
    $success = $stmt->execute([$data['id_abs']]);

    if ($success) {
        echo json_encode(["success" => true, "message" => "Absence supprimée"]);
    } else {
        echo json_encode(["success" => false, "error" => "Erreur lors de la suppression"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID manquant"]);
}
