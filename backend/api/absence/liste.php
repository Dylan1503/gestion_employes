<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../../config/db.php";

try {
    $stmt = $pdo->query("SELECT * FROM absence ORDER BY id_abs ASC");
    $absences = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "absences" => $absences]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
