<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Préflight pour CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../../config/db.php";

if (isset($_GET['query'])) {
    $query = "%" . $_GET['query'] . "%";

    try {
        $stmt = $pdo->prepare(
            "SELECT * FROM employe 
             WHERE nom LIKE ? OR prenoms LIKE ? OR matricule LIKE ? 
             ORDER BY matricule ASC"
        );
        $stmt->execute([$query, $query, $query]);
        $employes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["success" => true, "employes" => $employes]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Paramètre query manquant"]);
}
