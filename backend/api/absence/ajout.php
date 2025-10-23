<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['matricule'], $data['date_absence'], $data['motif'])) {

    // Vérifier si le matricule existe dans employe
    $stmtCheck = $pdo->prepare("SELECT * FROM employe WHERE matricule = ?");
    $stmtCheck->execute([$data['matricule']]);
    if ($stmtCheck->rowCount() === 0) {
        echo json_encode(["success" => false, "error" => "Matricule introuvable"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO absence (matricule, date_absence, motif) VALUES (?, ?, ?)");
    $success = $stmt->execute([$data['matricule'], $data['date_absence'], $data['motif']]);

    if ($success) {
        echo json_encode(["success" => true, "message" => "Absence ajoutée avec succès"]);
    } else {
        echo json_encode(["success" => false, "error" => "Erreur lors de l'ajout"]);
    }

} else {
    echo json_encode(["success" => false, "error" => "Champs manquants"]);
}
