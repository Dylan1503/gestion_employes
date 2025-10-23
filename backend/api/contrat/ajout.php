<?php
// Headers CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Répondre immédiatement aux requêtes OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../../config/db.php";

// Récupérer les données JSON envoyées
$data = json_decode(file_get_contents("php://input"), true);

// Vérifier que tous les champs obligatoires sont présents
if (!empty($data['matricule']) && !empty($data['type_contrat']) && !empty($data['date_debut']) && !empty($data['date_fin']) && !empty($data['statut'])) {
    $matricule = $data['matricule'];
    $type_contrat = $data['type_contrat'];
    $date_debut = $data['date_debut'];
    $date_fin = $data['date_fin'];
    $statut = $data['statut'];
    
    $stmt = $pdo->prepare("SELECT * FROM employe WHERE matricule = ?");
    $stmt->execute([$matricule]);
    $employe = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$employe) {
        echo json_encode(["success" => false, "error" => "Le matricule n'existe pas dans la table employé"]);
        exit();
    }

    try {
        // Insérer le contrat avec la référence à l'employé
        $stmt = $pdo->prepare("INSERT INTO contrat (matricule, type_contrat, date_debut, date_fin, statut) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$matricule, $type_contrat, $date_debut, $date_fin, $statut]);

        echo json_encode(["success" => true, "message" => "Contrat ajouté avec succès"]);
    } catch (PDOException $e) {
        // Gestion des erreurs SQL, par exemple violation de clé étrangère
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Champs obligatoires manquants"]);
}
