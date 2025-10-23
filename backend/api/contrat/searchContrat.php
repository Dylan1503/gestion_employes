<?php
// Permet à ton frontend React (localhost:3000) d'accéder à l'API
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET, OPTIONS"); 
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

    // Requête avec LIKE pour recherche partielle
    $stmt = $pdo->prepare("SELECT * FROM contrat WHERE matricule LIKE ?");
    $stmt->execute(["%$matricule%"]);
    $contrats = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($contrats) {
        echo json_encode(["success" => true, "contrats" => $contrats]);
    } else {
        echo json_encode(["success" => false, "contrats" => [], "error" => "Aucun contrat trouvé pour ce matricule"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Matricule manquant"]);
}
