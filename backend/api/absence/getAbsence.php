<?php



// Permet à ton frontend React (localhost:3000) d'accéder à l'API
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

if (isset($_GET['id_abs'])) {
    $id_abs = intval($_GET['id_abs']);
    $stmt = $pdo->prepare("SELECT * FROM absence WHERE id_abs = ?");
    $stmt->execute([$id_abs]);
    $absence = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($absence) {
        echo json_encode(["success" => true, "absence" => $absence]);
    } else {
        echo json_encode(["success" => false, "error" => "Absence introuvable"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID manquant"]);
}
