<?php
header('Content-Type: application/json');

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

$sql = "SELECT destinazione, COUNT(*) AS contatore
FROM viaggi
GROUP BY destinazione
ORDER BY contatore DESC
LIMIT 10;";
$result = $conn->query($sql);

$mete = [];

while ($row = $result->fetch_assoc()) {
    $mete[] = $row;
}

$conn->close();

echo json_encode($mete);
?>
