<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json; charset=utf-8');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "edoktor";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8");

$specjalizacja = isset($_GET['specjalizacja']) ? $conn->real_escape_string($_GET['specjalizacja']) : null;
$miasto = isset($_GET['miasto']) ? $conn->real_escape_string($_GET['miasto']) : null;

$sql = "SELECT id_lekarza, imie, nazwisko, specjalizacja, miasto, zdjecie, opis FROM lekarze WHERE 1=1";

if ($specjalizacja) {
    $sql .= " AND specjalizacja = '$specjalizacja'";
}

if ($miasto) {
    $sql .= " AND miasto = '$miasto'";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $doctors = array();
    while ($row = $result->fetch_assoc()) {
        $doctors[] = $row;
    }

    echo json_encode($doctors);
} else {
    echo json_encode(array());
}

$conn->close();
?>