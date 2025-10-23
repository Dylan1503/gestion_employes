<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Répond immédiatement aux requêtes OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../../config/db.php";

if (isset($_GET['matricule'])) {
    $matricule = $_GET['matricule'];

    // Recherche partielle avec LIKE
    $stmt = $pdo->prepare("SELECT * FROM conge WHERE matricule LIKE ? ORDER BY date_debut DESC");
    $stmt->execute(["%$matricule%"]);
    $conges = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($conges) {
        echo json_encode(["success" => true, "conges" => $conges]);
    } else {
        echo json_encode(["success" => false, "conges" => [], "error" => "Aucun congé trouvé pour ce matricule"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Veuillez fournir le matricule"]);
}
?>
