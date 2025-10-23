<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
require_once "../../config/db.php";

try {
    $stmt = $pdo->query("SELECT * FROM employe ORDER BY matricule ASC");
    $employes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "employes" => $employes]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
