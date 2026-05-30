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
    $sqlDoctorId = "SELECT id_lekarza FROM lekarze WHERE token_sesji = '$authToken'";
    $resultDoctorId = $conn->query($sqlDoctorId);

    if ($resultDoctorId->num_rows > 0) {
        $doctorData = $resultDoctorId->fetch_assoc();
        $doctorId = $doctorData['id_lekarza'];

        $sqlVisits = "SELECT w.*, u.imie AS imie_uzytkownika, u.nazwisko AS nazwisko_uzytkownika
                      FROM wizyty w
                      INNER JOIN uzytkownicy u ON w.id_uzytkownika = u.id_uzytkownika
                      WHERE w.id_lekarza = '$doctorId'";

        $resultVisits = $conn->query($sqlVisits);

        $visitsData = array();

        if ($resultVisits->num_rows > 0) {
            while ($row = $resultVisits->fetch_assoc()) {
                $visit = array(
                    'id_wizyty' => $row['id_wizyty'],
                    'data' => $row['data'],
                    'godzina' => $row['godzina'],
                    'imie_uzytkownika' => $row['imie_uzytkownika'],
                    'nazwisko_uzytkownika' => $row['nazwisko_uzytkownika'],
                    'notatka' => $row['notatka'],
                    'opinia' => $row['opinia']
                );
                $visitsData[] = $visit;
            }
            echo json_encode($visitsData);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Brak wizyt dla tego lekarza']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Nie znaleziono lekarza']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Brak wymaganego tokenu autoryzacyjnego lekarza']);
}

$conn->close();
?>

