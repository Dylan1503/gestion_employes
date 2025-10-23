<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Répond aux requêtes OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../../config/db.php";

if (isset($_GET['start'], $_GET['end'])) {
    $start = $_GET['start'];
    $end = $_GET['end'];

    try {
        $stmt = $pdo->prepare("SELECT * FROM employe WHERE date_embauche BETWEEN ? AND ? ORDER BY date_embauche ASC");
        $stmt->execute([$start, $end]);
        $employes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["success" => true, "employes" => $employes]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Paramètres start ou end manquants"]);
}
