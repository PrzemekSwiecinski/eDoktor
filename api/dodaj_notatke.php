<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "edoktor";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(['error' => 'Błąd połączenia z bazą danych']));
}

$data = json_decode(file_get_contents('php://input'), true);

$note = isset($data['note']) ? $data['note'] : null;
$visitId = isset($data['visitId']) ? $data['visitId'] : null;

if ($note !== null && $visitId !== null) {
    $note = $conn->real_escape_string($note);
    $visitId = $conn->real_escape_string($visitId);

    $sql = "UPDATE wizyty SET notatka = '$note' WHERE id_wizyty = '$visitId'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => 'Notatka została pomyślnie dodana']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Błąd podczas dodawania notatki: ' . $conn->error]);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Nieprawidłowe dane przesłane do serwera']);
}

$conn->close();
?>
