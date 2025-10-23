<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../../config/db.php";

try {
    $stmt = $pdo->query("SELECT * FROM conge ORDER BY id_conge ASC");
    $conges = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "conges" => $conges]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}


