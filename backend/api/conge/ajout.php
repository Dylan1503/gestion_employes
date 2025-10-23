<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['date_debut'], $data['date_fin'], $data['type_conge'], $data['matricule'])) {
    $matricule = $data['matricule'];

    // Vérifier si le matricule existe dans la table employe
    $stmt = $pdo->prepare("SELECT * FROM employe WHERE matricule = ?");
    $stmt->execute([$matricule]);
    $employe = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$employe) {
        echo json_encode(["success" => false, "error" => "Le matricule n'existe pas dans la table employé"]);
        exit();
    }

    // Insérer le congé
    $stmt = $pdo->prepare("INSERT INTO conge (date_debut, date_fin, type_conge, matricule) VALUES (?, ?, ?, ?)");
    $success = $stmt->execute([$data['date_debut'], $data['date_fin'], $data['type_conge'], $data['matricule']]);

    if ($success) {
        echo json_encode(["success" => true, "message" => "Congé ajouté avec succès"]);
    } else {
        echo json_encode(["success" => false, "error" => "Erreur lors de l'ajout"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Champs manquants"]);
}
