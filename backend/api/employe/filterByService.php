<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");

require_once "../../config/db.php";

if (isset($_GET['id_service'])) {
    $id_service = $_GET['id_service'];

    try {
        $stmt = $pdo->prepare("
            SELECT e.*, s.libelle 
            FROM employe e 
            JOIN service s ON e.id_service = s.id_service
            WHERE e.id_service = ?
            ORDER BY e.nom ASC
        ");
        $stmt->execute([$id_service]);
        $employes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($employes) {
            echo json_encode(["success" => true, "employes" => $employes]);
        } else {
            echo json_encode(["success" => false, "employes" => []]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Paramètre id_service manquant."]);
}
?>
