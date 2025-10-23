<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../../config/db.php";

if (isset($_GET['start']) && isset($_GET['end'])) {
    $start = $_GET['start'];
    $end = $_GET['end'];

    $stmt = $pdo->prepare(" SELECT * FROM conge 
        WHERE date_debut >= ? AND date_fin <= ?
        ORDER BY date_debut ASC");
    $stmt->execute([$start, $end]);
    $conges = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "conges" => $conges]);
} else {
    echo json_encode(["success" => false, "error" => "Veuillez fournir les deux dates"]);
}
?>
