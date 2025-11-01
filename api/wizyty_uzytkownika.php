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

$authToken = isset($data['authToken']) ? $data['authToken'] : null;

if ($authToken !== null) {
    // Pobranie id_uzytkownika na podstawie tokena sesji
    $sqlUserId = "SELECT id_uzytkownika FROM uzytkownicy WHERE token_sesji = '$authToken'";
    $resultUserId = $conn->query($sqlUserId);

    if ($resultUserId->num_rows > 0) {
        $userData = $resultUserId->fetch_assoc();
        $userId = $userData['id_uzytkownika'];

        // Pobranie wizyt użytkownika na podstawie id_uzytkownika
        $sqlVisits = "SELECT w.*, l.imie AS imie_lekarza, l.nazwisko AS nazwisko_lekarza
                      FROM wizyty w
                      INNER JOIN lekarze l ON w.id_lekarza = l.id_lekarza
                      WHERE w.id_uzytkownika = '$userId'";

        $resultVisits = $conn->query($sqlVisits);

        if ($resultVisits->num_rows > 0) {
            $visitsData = array();
            while ($row = $resultVisits->fetch_assoc()) {
                $visitsData[] = $row;
            }
            echo json_encode($visitsData);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Brak wizyt dla tego użytkownika']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Nie znaleziono użytkownika']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Brak wymaganego tokenu sesji']);
}

$conn->close();
?>


