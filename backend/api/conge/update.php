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

if (isset($data['id_conge'], $data['date_debut'], $data['date_fin'], $data['type_conge'], $data['matricule'])) {
    $stmt = $pdo->prepare("UPDATE conge 
                           SET date_debut = ?, date_fin = ?, type_conge = ?, matricule = ?
                           WHERE id_conge = ?");
    $success = $stmt->execute([$data['date_debut'], $data['date_fin'], $data['type_conge'], $data['matricule'], $data['id_conge']]);

    if ($success) {
        echo json_encode(["success" => true, "message" => "Congé modifié avec succès"]);
    } else {
        echo json_encode(["success" => false, "error" => "Erreur lors de la modification"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Champs manquants"]);
}
