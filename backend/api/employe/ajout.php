<?php
// Headers CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Réponse pour OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../../config/db.php";

// Récupérer les données JSON
$data = json_decode(file_get_contents("php://input"), true);

// Vérifier les champs obligatoires
if (!empty($data['matricule']) && !empty($data['nom']) && !empty($data['prenoms']) && !empty($data['sexe']) && !empty($data['id_service'])) {
    try {
        $stmt = $pdo->prepare("INSERT INTO employe (matricule, nom, prenoms, sexe, date_naissance, adresse, telephone, email, date_embauche, salaire_base, id_service) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['matricule'],
            $data['nom'],
            $data['prenoms'],
            $data['sexe'],
            $data['date_naissance'] ?? null,
            $data['adresse'] ?? null,
            $data['telephone'] ?? null,
            $data['email'] ?? null,
            $data['date_embauche'] ?? null,
            $data['salaire_base'] ?? null,
            $data['id_service']
        ]);
        echo json_encode(["success" => true, "message" => "Employé ajouté avec succès"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Champs obligatoires manquants"]);
}
