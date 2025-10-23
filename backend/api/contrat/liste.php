<?php
// Headers CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Réponse pour les requêtes OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../../config/db.php";

try {
    $stmt = $pdo->query("SELECT * FROM contrat ORDER BY id_contrat ASC");
    $contrats = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "contrats" => $contrats]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
