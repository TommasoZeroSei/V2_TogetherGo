<?php

header("Content-Type: application/json");

$host = "panzeri.tommaso.tave.osdb.it";
$db = "c367_TogetherGo";
$user = "c367_admin";
$pass = "tr3moon!";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Errore di connessione"]);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);
$trend = $input["trend"] ?? "";

$data = [];

switch ($trend) {
    case "citta":
        
        $sql = "SELECT destinazione AS nome, COUNT(*) AS contatore
        FROM viaggi
        GROUP BY destinazione
        ORDER BY contatore DESC
        LIMIT 10;";

        break;

    case "nazioni":

        $sql = "SELECT 
        TRIM(SUBSTRING_INDEX(destinazione, ',', -1)) AS nazione,
        COUNT(*) AS contatore
        FROM viaggi
        GROUP BY nazione
        ORDER BY contatore DESC
        LIMIT 10;
        ";
        break;

    case "trasporti":
        $sql = "SELECT trasporto, 
            COUNT(*) AS contatore
            FROM viaggi
            GROUP BY trasporto
            ORDER BY contatore DESC;";
        break;

    case "sorpresa":
        $sql = "SELECT destinazione AS nome
                FROM viaggi
                ORDER BY RAND()
                LIMIT 10;";
        break;

    default:
        echo json_encode(["errore" => "Trend non valido"]);
        exit;
}

$result = $conn->query($sql);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    http_response_code(500);
    echo json_encode(["errore" => "Errore nella query"]);
    exit;
}

$conn->close();

echo json_encode($data);

?>