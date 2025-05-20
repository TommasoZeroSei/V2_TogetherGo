<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // solo in sviluppo
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

// Leggi il corpo della richiesta
$data = json_decode(file_get_contents("php://input"), true);

// Validazione campi base
if (!isset($data['action'])) {
    echo json_encode(["error" => "Azione non specificata"]);
    exit;
}

$action = $data['action'];

// Funzione per sanitizzare l'input
function clean_input($conn, $input) {
    return mysqli_real_escape_string($conn, trim($input));
}

if ($action === "login") {
    $username = clean_input($conn, $data['username'] ?? '');
    $password = clean_input($conn, $data['password'] ?? '');

    if ($username === "" || $password === "") {
        echo json_encode(["error" => "Username e password obbligatori"]);
        exit;
    }

    $query = "SELECT password FROM utenti WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Password errata"]);
        }
    } else {
        echo json_encode(["error" => "Utente non trovato"]);
    }

    $stmt->close();

} elseif ($action === "registrazione") {
    $username = clean_input($conn, $data['username'] ?? '');
    $email = clean_input($conn, $data['email'] ?? '');
    $password = clean_input($conn, $data['password'] ?? '');

    if ($username === "" || $email === "" || $password === "") {
        echo json_encode(["error" => "Tutti i campi sono obbligatori"]);
        exit;
    }

    // Verifica se username o email esistono già
    $check_query = "SELECT id FROM utenti WHERE username = ? OR email = ?";
    $stmt = $conn->prepare($check_query);
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(["error" => "Username o email già in uso"]);
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $insert_query = "INSERT INTO utenti (username, email, password) VALUES (?, ?, ?)";
        $insert_stmt = $conn->prepare($insert_query);
        $insert_stmt->bind_param("sss", $username, $email, $hashed_password);
        if ($insert_stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Errore nella registrazione"]);
        }
        $insert_stmt->close();
    }

    $stmt->close();

} else {
    echo json_encode(["error" => "Azione non valida"]);
}

$conn->close();
?>