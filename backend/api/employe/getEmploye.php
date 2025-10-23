<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
require_once "../../config/db.php";

if (isset($_GET['matricule'])) {
    $matricule = $_GET['matricule'];
    try {
        $stmt = $pdo->prepare("SELECT * FROM employe WHERE matricule = ?");
        $stmt->execute([$matricule]);
        $employe = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($employe) {
            echo json_encode(["success" => true, "employe" => $employe]);
        } else {
            echo json_encode(["success" => false, "error" => "Employé introuvable"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Matricule manquant"]);
}
