<?php
// 1) En tout premier, déclarer les headers CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// 2) Répondre immédiatement aux requêtes OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 3) Chargement de la configuration et de la connexion PDO
require_once __DIR__ . "/../../config/db.php";

try {
    // 4) Exécution de la requête et récupération des données
    $stmt     = $pdo->query("SELECT * FROM service ORDER BY id_service ASC");
    $services = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 5) Retourner le JSON
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode($services, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
} catch (\PDOException $e) {
    // En cas d’erreur PDO, renvoyer un code 500 et un message
    http_response_code(500);
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode([
        "error"   => true,
        "message" => "Erreur : " . $e->getMessage()
    ]);
}