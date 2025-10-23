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

if (isset($_GET['id_conge'])) {
    $id_conge = intval($_GET['id_conge']);

    try {
        // Récupérer uniquement le congé
        $stmt = $pdo->prepare("SELECT * FROM conge WHERE id_conge = ?");
        $stmt->execute([$id_conge]);
        $conge = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($conge) {
            // Formater les dates pour <input type="date">
            $conge['date_debut'] = date('Y-m-d', strtotime($conge['date_debut']));
            $conge['date_fin']   = date('Y-m-d', strtotime($conge['date_fin']));

            echo json_encode(["success" => true, "conge" => $conge]);
        } else {
            echo json_encode(["success" => false, "error" => "Congé introuvable"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID manquant"]);
}
