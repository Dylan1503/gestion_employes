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
$id_contrat = $_GET['id_contrat'] ?? null;

if ($id_contrat) {
    try {
        $stmt = $pdo->prepare("DELETE FROM contrat WHERE id_contrat = ?");
        $stmt->execute([$id_contrat]);
        echo json_encode(["success" => true, "message" => "Contrat supprimé"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID manquant"]);
}

