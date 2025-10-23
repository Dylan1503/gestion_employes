<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");

require_once "../../config/db.php";

if (isset($_GET['id_contrat'])) {
    $id = intval($_GET['id_contrat']);
    try {
        // Récupérer le contrat avec le matricule de l'employé
        $stmt = $pdo->prepare("SELECT * FROM contrat WHERE id_contrat = ?");
        $stmt->execute([$id]);
        $contrat = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($contrat) {
            // On renvoie seulement le contrat avec le matricule inclus
            echo json_encode(["success" => true, "contrat" => $contrat]);
        } else {
            echo json_encode(["success" => false, "error" => "Contrat introuvable"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID manquant"]);
}
