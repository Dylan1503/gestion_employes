<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../../config/db.php";
$matricule = $_GET['matricule'] ?? null;

if ($matricule) {
    try {
        $stmt = $pdo->prepare("DELETE FROM employe WHERE matricule=?");
        $stmt->execute([$matricule]);
        echo json_encode(["success" => true, "message" => "Employé supprimé"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Matricule manquant"]);
}
