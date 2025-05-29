<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

// Connessione al database
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

// Lettura JSON in input
$data = json_decode(file_get_contents("php://input"), true);

// Controlli base
if (!isset($data['action']) || $data['action'] !== "dettagli") {
    echo json_encode(["error" => "Azione non valida"]);
    exit;
}

$nome_viaggio = mysqli_real_escape_string($conn, trim($data['viaggio'] ?? ''));
if ($nome_viaggio === "") {
    echo json_encode(["error" => "Nome del viaggio mancante"]);
    exit;
}

$query = "SELECT organizzatore, partecipanti, destinazione, tempo, conto, trasporto, alloggio, attivita 
          FROM viaggi 
          WHERE nome_viaggio = '$nome_viaggio'";

$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();

    $partecipanti_array = array_map('trim', explode(',', $row['partecipanti']));
    $tempo_array = array_map('trim', explode(',', $row['tempo']));

    echo json_encode([
        "message" => [
            "organizzatore" => $row['organizzatore'],
            "partecipanti" => $partecipanti_array,
            "destinazione" => $row['destinazione'],
            "tempo" => $tempo_array,
            "conto" => $row['conto'],
            "trasporto" => $row['trasporto'],
            "alloggio" => $row['alloggio'],
            "attivita" => $row['attivita']
        ]
    ]);
} else {
    echo json_encode(["error" => "Viaggio non trovato"]);
}

$conn->close();
?>
