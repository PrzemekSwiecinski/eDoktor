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

$login = isset($data['username']) ? $data['username'] : null;
$password = isset($data['password']) ? $data['password'] : null;
$passwordRepeat = isset($data['passwordRepeat']) ? $data['passwordRepeat'] : null;
$firstName = isset($data['firstName']) ? $data['firstName'] : null;
$lastName = isset($data['lastName']) ? $data['lastName'] : null;
$phone = isset($data['phone']) ? $data['phone'] : null;
$specialization = isset($data['specialization']) ? $data['specialization'] : null;
$city = isset($data['city']) ? $data['city'] : null;
$photo = isset($data['photo']) ? $data['photo'] : null;
$description = isset($data['description']) ? $data['description'] : null;

if ($login !== null && $password !== null && $passwordRepeat !== null && $firstName !== null && $lastName !== null && $specialization !== null && $city !== null && $photo !== null) {
    if ($password === $passwordRepeat) {
        $token = bin2hex(random_bytes(32));

        $sql = "INSERT INTO lekarze (login, haslo, imie, nazwisko, telefon, specjalizacja, miasto, zdjecie, opis, token_sesji) VALUES ('$login',
        '$password', '$firstName', '$lastName', '$phone', '$specialization', '$city', '$photo', '$description', '$token')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['message' => 'Rejestracja pomyślna']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Błąd dodawania: ' . $conn->error]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Hasła nie pasują do siebie']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Brak wymaganych danych rejestracji']);
}

$conn->close();
?>