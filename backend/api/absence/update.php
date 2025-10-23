<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id_abs'], $data['matricule'], $data['date_absence'], $data['motif'])) {

    // Vérifier si le matricule existe
    $stmtCheck = $pdo->prepare("SELECT * FROM employe WHERE matricule = ?");
    $stmtCheck->execute([$data['matricule']]);
    if ($stmtCheck->rowCount() === 0) {
        echo json_encode(["success" => false, "error" => "Matricule introuvable"]);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE absence SET matricule=?, date_absence=?, motif=? WHERE id_abs=?");
    $success = $stmt->execute([$data['matricule'], $data['date_absence'], $data['motif'], $data['id_abs']]);

    if ($success) {
        echo json_encode(["success" => true, "message" => "Absence modifiée avec succès"]);
    } else {
        echo json_encode(["success" => false, "error" => "Erreur lors de la modification"]);
    }

} else {
    echo json_encode(["success" => false, "error" => "Champs manquants"]);
}
