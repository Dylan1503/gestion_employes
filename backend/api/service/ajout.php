<?php
// 1) Headers CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 2) Réponse immédiate aux requêtes OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../../config/db.php";

// 3) Récupération des données envoyées
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['libelle']) && !empty(trim($data['libelle']))) {
    $libelle = trim($data['libelle']);

    try {
        $stmt = $pdo->prepare("INSERT INTO service (libelle) VALUES (?)");
        $stmt->execute([$libelle]);

        echo json_encode(["success" => true, "message" => "Service ajouté avec succès"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Libellé manquant"]);
}
