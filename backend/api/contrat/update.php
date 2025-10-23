<?php
// Headers CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Réponse aux requêtes OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../../config/db.php";

// Récupérer les données JSON envoyées
$data = json_decode(file_get_contents("php://input"), true);

// Vérifier que tous les champs obligatoires sont présents
if (
    !empty($data['id_contrat']) &&
    !empty($data['type_contrat']) &&
    !empty($data['date_debut']) &&
    !empty($data['date_fin']) &&
    !empty($data['statut']) &&
    !empty($data['matricule']) // nouvel ajout pour l'employé
) {
    try {
        $stmt = $pdo->prepare("
            UPDATE contrat 
            SET type_contrat = ?, date_debut = ?, date_fin = ?, statut = ?, matricule = ?
            WHERE id_contrat = ?
        ");
        $stmt->execute([
            $data['type_contrat'], 
            $data['date_debut'], 
            $data['date_fin'], 
            $data['statut'], 
            $data['matricule'], 
            $data['id_contrat']
        ]);

        echo json_encode(["success" => true, "message" => "Contrat modifié avec succès"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Champs obligatoires manquants"]);
}
