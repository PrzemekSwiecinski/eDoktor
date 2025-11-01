<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: text/plain; charset=utf-8");

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
    echo "Błąd połączenia z bazą danych";
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

$doctorId = isset($data['doctorId']) ? $data['doctorId'] : null;
$patientToken = isset($data['patientToken']) ? $data['patientToken'] : null;
$date = isset($data['date']) ? $data['date'] : null;
$time = isset($data['time']) ? $data['time'] : null;

if ($doctorId !== null && $patientToken !== null && $date !== null && $time !== null) {
    $sqlUserId = "SELECT id_uzytkownika FROM uzytkownicy WHERE token_sesji = '$patientToken'";
    $resultUserId = $conn->query($sqlUserId);

    if ($resultUserId->num_rows > 0) {
        $userData = $resultUserId->fetch_assoc();
        $userId = $userData['id_uzytkownika'];

        $sqlInsertVisit = "INSERT INTO wizyty (id_uzytkownika, id_lekarza, data, godzina)
                           VALUES ('$userId', '$doctorId', '$date', '$time')";

        if ($conn->query($sqlInsertVisit) === TRUE) {
            http_response_code(200);
            echo "Wizyta została umówiona pomyślnie";
        } else {
            http_response_code(500);
            echo "Błąd podczas umawiania wizyty: " . $conn->error;
        }
    } else {
        http_response_code(404);
        echo "Nie znaleziono użytkownika";
    }
} else {
    http_response_code(400);
    echo "Brak wymaganych danych do umówienia wizyty";
}

$conn->close();
?>
