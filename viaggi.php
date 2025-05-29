<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

$host = 'panzeri.tommaso.tave.osdb.it';
$user = 'c367_admin';
$password = 'tr3moon!';
$dbname = 'c367_TogetherGo';

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connessione al database fallita"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['action']) || $data['action'] !== "elenco") {
    echo json_encode(["error" => "Azione non valida"]);
    exit;
}

$username = mysqli_real_escape_string($conn, trim($data['username'] ?? ''));

if ($username === "") {
    echo json_encode(["error" => "Username mancante"]);
    exit;
}

$query = "SELECT nome_viaggio, organizzatore FROM viaggi WHERE partecipanti LIKE ?";
$stmt = $conn->prepare($query);
$search = "%" . $username . "%";
$stmt->bind_param("s", $search);
$stmt->execute();
$result = $stmt->get_result();

$viaggi = [];
while ($row = $result->fetch_assoc()) {
    $viaggi[$row['nome_viaggio']] = $row['organizzatore'];
}

echo json_encode($viaggi);
$stmt->close();
$conn->close();
?>



