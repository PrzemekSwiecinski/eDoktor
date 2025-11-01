-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2024 at 11:52 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edoktor`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `admini`
--

CREATE TABLE `admini` (
  `id_admina` int(11) NOT NULL,
  `login` varchar(30) NOT NULL,
  `haslo` varchar(30) NOT NULL,
  `imie` varchar(20) NOT NULL,
  `nazwisko` varchar(30) NOT NULL,
  `token_sesji` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `admini`
--

INSERT INTO `admini` (`id_admina`, `login`, `haslo`, `imie`, `nazwisko`, `token_sesji`) VALUES
(1, 'admin', 'admin', 'Adam', 'Kot', '5184d36f24c96bda9696fc817aac18738aa832d10d2f6ea42aebddb83937a864');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lekarze`
--

CREATE TABLE `lekarze` (
  `id_lekarza` int(11) NOT NULL,
  `login` varchar(30) NOT NULL,
  `haslo` varchar(30) NOT NULL,
  `imie` varchar(20) NOT NULL,
  `nazwisko` varchar(30) NOT NULL,
  `telefon` varchar(10) NOT NULL,
  `specjalizacja` varchar(20) NOT NULL,
  `miasto` varchar(20) NOT NULL,
  `zdjecie` varchar(20) NOT NULL,
  `opis` text NOT NULL,
  `token_sesji` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `lekarze`
--

INSERT INTO `lekarze` (`id_lekarza`, `login`, `haslo`, `imie`, `nazwisko`, `telefon`, `specjalizacja`, `miasto`, `zdjecie`, `opis`, `token_sesji`) VALUES
(1, 't', '123', 'Tomasz', 'Filipkowski', '964123765', 'Stomatolog', 'Białystok', '1.jpg', 'Doktor Tomasz Filipkowski to doświadczony stomatolog w Białymstoku z ponad 15-letnim doświadczeniem. Ukończył Akademię Medyczną w Warszawie. Jego pasja do stomatologii zrodziła się w młodości, pomagając w ojcowej praktyce stomatologicznej. Po studiach rozpoczął praktykę w prywatnym gabinecie w centrum Białegostoku, gdzie zdobył uznanie dzięki profesjonalizmowi i empatii. Jest aktywnym członkiem lokalnego środowiska stomatologicznego, angażującym się w działania promujące zdrowie jamy ustnej. Jego praca to nie tylko zawód, ale także sposób na pomoc innym i budowanie zdrowszej społeczności.', '2358a637524a783c35fccec7f75b0687db95a6929004401e2848c4afd897b2a5'),
(2, 'a', '123', 'Anna', 'Waszczyk', '567111821', 'Laryngolog', 'Łomża', '2.jpg', 'Doktor Anna Waszczuk to ceniona laryngolog praktykująca w Łomży. Posiada bogate doświadczenie w dziedzinie otolaryngologii, które zdobyła podczas wieloletniej praktyki klinicznej i pracy badawczej. Ukończyła renomowany program specjalizacyjny z otorynolaryngologii, zdobywając niezbędną wiedzę i umiejętności w leczeniu schorzeń gardła, nosa i uszu.\r\n\r\nJako zaangażowany lekarz, doktor Waszczuk regularnie uczestniczy w konferencjach naukowych i szkoleniach, aby być na bieżąco z najnowszymi osiągnięciami w dziedzinie laryngologii. Jej gabinet w Łomży cieszy się uznaniem pacjentów dzięki profesjonalizmowi, empatii i trosce o dobro każdego, kto zwraca się do niej o pomoc.\r\n\r\nDoktor Anna Waszczuk to nie tylko specjalista w swojej dziedzinie, ale także osoba zaangażowana w promocję zdrowia i edukację pacjentów na temat profilaktyki schorzeń związanych z układem oddechowym. Jej praca ma istotny wpływ na poprawę jakości życia mieszkańców Łomży i okolic.', ''),
(3, 'a', '123', 'Arkadiusz', 'Kowalczyk', '654876999', 'Dermatolog', 'Suwałki', '3.jpg', 'Doktor Arkadiusz Kowalczyk to doświadczony dermatolog praktykujący w Suwałkach. Po ukończeniu studiów medycznych z wyróżnieniem, specjalizował się w dermatologii, zdobywając obszerną wiedzę i umiejętności w diagnozowaniu oraz leczeniu schorzeń skóry.\r\n\r\nJego praktyka opiera się na indywidualnym podejściu do każdego pacjenta oraz na stosowaniu najnowszych osiągnięć w dziedzinie dermatologii. Dr Kowalczyk jest znany z empatii oraz troski o dobro pacjenta, co sprawia, że gabinet dermatologiczny w Suwałkach cieszy się uznaniem wśród mieszkańców regionu.\r\n\r\nPonadto doktor Kowalczyk regularnie uczestniczy w szkoleniach i konferencjach naukowych, aby być na bieżąco z najnowszymi metodami leczenia i diagnostyki schorzeń skórnych. Jego zaangażowanie w poprawę zdrowia skóry oraz doświadczenie sprawiają, że jest wysoko cenionym specjalistą w Suwałkach i okolicach.', ''),
(4, 'k', '123', 'Karolina', 'Kowal', '632215619', 'Ortopeda', 'Warszawa', '4.jpg', 'Doktor Karolina Kowal to renomowany ortopeda praktykujący w Warszawie. Po ukończeniu studiów medycznych specjalizowała się w ortopedii, zdobywając bogate doświadczenie w leczeniu schorzeń układu kostno-stawowego.\r\n\r\nJej praktyka opiera się na holistycznym podejściu do pacjenta, gdzie ważną rolę odgrywa diagnostyka oraz indywidualne planowanie leczenia. Doktor Kowal jest znana z profesjonalizmu, empatii i troski o dobro pacjenta, co sprawia, że jest wysoko cenionym specjalistą w Warszawie.\r\n\r\nDzięki regularnemu uczestnictwu w szkoleniach i konferencjach naukowych, doktor Kowal jest na bieżąco z najnowszymi osiągnięciami w dziedzinie ortopedii, co pozwala jej oferować pacjentom najwyższą jakość opieki medycznej.\r\n\r\nJej praktyka ortopedyczna w Warszawie stanowi miejsce, gdzie pacjenci mogą liczyć na kompleksową i profesjonalną pomoc w leczeniu dolegliwości związanych z układem kostno-stawowym.', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `id_uzytkownika` int(11) NOT NULL,
  `login` varchar(100) NOT NULL,
  `haslo` varchar(100) NOT NULL,
  `imie` varchar(20) NOT NULL,
  `nazwisko` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefon` varchar(9) NOT NULL,
  `pesel` varchar(11) NOT NULL,
  `token_sesji` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `uzytkownicy`
--

INSERT INTO `uzytkownicy` (`id_uzytkownika`, `login`, `haslo`, `imie`, `nazwisko`, `email`, `telefon`, `pesel`, `token_sesji`) VALUES
(1, 'tomasz', '123', 'Tomasz', 'Kowalczyk', 'tkowalczyk@op.pl', '693772172', '01080103411', '7528da72af696a4da6deadf9a4b4db1c42a771ae5ade5077373604ca54aceb6b'),
(2, 'ola', 'pocoto123', 'Aleksandra', 'Nowak', 'an@op.pl', '589589345', '0282875431', ''),
(3, 'asd', 'asd', 'asd', 'asd', 'asd', '567330229', '99090807561', 'b0fa3854713fcee706925a1d9b6f9ed2a4fefa63f33cf638f87414cb6ec8cda3');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wizyty`
--

CREATE TABLE `wizyty` (
  `id_wizyty` int(11) NOT NULL,
  `id_uzytkownika` int(11) NOT NULL,
  `id_lekarza` int(11) NOT NULL,
  `data` varchar(10) NOT NULL,
  `godzina` varchar(5) NOT NULL,
  `notatka` text NOT NULL,
  `opinia` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `wizyty`
--

INSERT INTO `wizyty` (`id_wizyty`, `id_uzytkownika`, `id_lekarza`, `data`, `godzina`, `notatka`, `opinia`) VALUES
(1, 1, 2, '2024-01-05', '15:00', 'U pacjenta stwierdzono chrypkę, suchość gardła oraz uczucie pieczenia podczas mówienia. Objawy utrzymują się od około 2 tygodni. W trakcie badania laryngologicznego stwierdzono łagodne zaczerwienienie błony śluzowej krtani, bez widocznych zmian patologicznych.\r\n', 'polecaaaam'),
(2, 1, 3, '2024-01-23', '13:30', 'Pacjent zgłosił się z rumieniem i swędzeniem skóry na twarzy oraz łokciach. W trakcie badania dermatologicznego stwierdzono rumień na policzkach oraz grudkowate zmiany na łokciach. Podejrzenie: łuszczycowe zapalenie skóry. Zalecono stosowanie emolientów i kortykosteroidów miejscowo oraz kontrolę po dwóch tygodniach.', 'Polecam serdecznie'),
(3, 1, 4, '2023-12-13', '14:00', 'Pacjent prezentuje się z bólem w okolicy dolnej części pleców oraz promieniującym bólem do prawej kończyny dolnej. W trakcie badania ortopedycznego stwierdzono ograniczoną ruchomość w odcinku lędźwiowym oraz pozytywny objaw nogi podnoszonej. Podejrzenie: dyskopatia lędźwiowa z objawami rwy kulszowej.', 'Polecam'),
(6, 1, 1, '2024-01-29', '10:30', 'W dniu 01.02 pacjent zgłosił się z z bólem brzucha i zostało wystawione Laxigen na przeczyszczenie.', 'Polecam'),
(7, 1, 1, '2024-01-28', '10:30', 'Pacjent skarży się na krwawienie dziąseł podczas szczotkowania zębów oraz nieświeży oddech. W trakcie badania stomatologicznego stwierdzono objawy zapalenia dziąseł oraz płytki nazębnej. Zalecono higienę jamy ustnej, regularne usuwanie kamienia nazębnego oraz płukanki przeciwbakteryjne.', 'Polecam'),
(8, 1, 1, '2024-01-30', '10:30', 'Pacjent prezentuje się z luźnymi oraz krwawiącymi zębami, szczególnie w dolnej szczęce. W trakcie badania stomatologicznego stwierdzono zaawansowaną chorobę przyzębia. Zalecono leczenie periodontologiczne, w tym skaling, piaskowanie oraz instruktaż higieny jamy ustnej.', ''),
(9, 1, 1, '2024-01-31', '11:00', 'Pacjent zgłosił się z zainteresowaniem wybieleniem zębów. W trakcie badania stomatologicznego stwierdzono przebarwienia powierzchniowe zębów, głównie spowodowane spożywaniem kawy i paleniem papierosów. Zalecono profesjonalne wybielanie zębów oraz edukację dotyczącą utrzymania efektów.', 'polecaaaam :)'),
(10, 1, 1, '2024-01-31', '12:00', 'Pooolecam', 'witam i pozdrawiam');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `admini`
--
ALTER TABLE `admini`
  ADD PRIMARY KEY (`id_admina`);

--
-- Indeksy dla tabeli `lekarze`
--
ALTER TABLE `lekarze`
  ADD PRIMARY KEY (`id_lekarza`);

--
-- Indeksy dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`id_uzytkownika`);

--
-- Indeksy dla tabeli `wizyty`
--
ALTER TABLE `wizyty`
  ADD PRIMARY KEY (`id_wizyty`),
  ADD KEY `id_uzytkownika` (`id_uzytkownika`) USING BTREE,
  ADD KEY `id_lekarza` (`id_lekarza`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admini`
--
ALTER TABLE `admini`
  MODIFY `id_admina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lekarze`
--
ALTER TABLE `lekarze`
  MODIFY `id_lekarza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `id_uzytkownika` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wizyty`
--
ALTER TABLE `wizyty`
  MODIFY `id_wizyty` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `wizyty`
--
ALTER TABLE `wizyty`
  ADD CONSTRAINT `wizyty_ibfk_1` FOREIGN KEY (`id_lekarza`) REFERENCES `lekarze` (`id_lekarza`),
  ADD CONSTRAINT `wizyty_ibfk_2` FOREIGN KEY (`id_uzytkownika`) REFERENCES `uzytkownicy` (`id_uzytkownika`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
