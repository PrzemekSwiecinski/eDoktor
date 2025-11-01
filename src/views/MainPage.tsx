import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import "../App.css";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Menu,
  Tooltip,
  TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const pages = ["O Nas", "Regulamin", "Kontakt"];
const settings = ["Profil", "Historia leczenia", "Wyloguj"];

interface Doctor {
  id_lekarza: number;
  imie: string;
  nazwisko: string;
  specjalizacja: string;
  miasto: string;
  zdjecie: string;
  opis: string;
}

function MainPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    string | null
  >(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isAppointmentSuccess, setIsAppointmentSuccess] = useState(false);

  useEffect(() => {
    let url = "http://localhost/api/pobierz_lekarzy.php";
    const authToken = localStorage.getItem("authToken");
    setAuthToken(authToken);

    const params = new URLSearchParams();
    if (selectedSpecialization) {
      params.append("specjalizacja", selectedSpecialization);
    }
    if (selectedCity) {
      params.append("miasto", selectedCity);
    }

    axios
      .get(url, { params })
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Błąd pobierania danych lekarzy:", error);
      });
  }, [selectedSpecialization, selectedCity]);

  const handleLogout = () => {
    setIsLoggedOut(true);
  };

  const handleSettingsClick = (setting: string) => {
    if (setting === "Profil") {
      window.location.href = "/profiluzytkownika";
    } else if (setting === "Historia leczenia") {
      window.location.href = "/wizytyuzytkownika";
    } else if (setting === "Wyloguj") {
      handleLogoutConfirm();
    } else {
      handleCloseUserMenu();
    }
  };

  const handlePagesClick = (page: string) => {
    if (page === "O Nas") {
      window.location.href = "/onas";
    } else if (page === "Regulamin") {
      window.location.href = "/regulamin";
    } else if (page === "Kontakt") {
      window.location.href = "/kontakt";
    }
  };

  const handleLogoutConfirm = async () => {
    try {
      const response = await fetch("http://localhost/api/wyloguj.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Usuń token z localStorage po wylogowaniu
        localStorage.removeItem("authToken");
        setAuthToken(null);
        setIsLoggedOut(true);
      } else {
        console.error("Błąd wylogowania");
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas wylogowywania:", error);
    }
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleAppointment = async () => {
    try {
      // Pobierz token sesji pacjenta
      const authToken = localStorage.getItem("authToken");

      // Sprawdź, czy jest zalogowany
      if (!authToken) {
        console.error("Nie można umówić wizyty. Brak autoryzacji.");
        return;
      }

      // Utwórz obiekt danych do wysłania
      const appointmentData = {
        doctorId: selectedDoctor?.id_lekarza,
        patientToken: authToken,
        date: value?.format("YYYY-MM-DD"),
        time: selectedTime,
      };

      // Wyślij zapytanie do API w celu umówienia wizyty
      const response = await axios.post(
        "http://localhost/api/umow_wizyte.php",
        appointmentData
      );

      if (response.status === 200) {
        console.log("Wizyta została umówiona pomyślnie!");
        setIsAppointmentSuccess(true);
      } else {
        console.error("Wystąpił problem podczas umawiania wizyty.");
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas umawiania wizyty:", error);
    }
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDoctorClick = (doctor: Doctor) => {
    if (doctor && doctor.id_lekarza !== undefined) {
      console.log("Selected doctor id:", doctor.id_lekarza);
    } else {
      console.error("Nie można pobrać identyfikatora wybranego lekarza");
    }
    setSelectedDoctor(doctor);
  };

  const handleCloseDialog = () => {
    setSelectedDoctor(null);
  };

  return (
    <Box className="App">
      <AppBar
        position="static"
        sx={{ marginBottom: "5%", backgroundColor: "#4863E8" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              sx={{ marginLeft: "2%", marginRight: "2%" }}
              alt="logo"
              src="/assets/logo.png"
            />
            <Typography
              variant="h6"
              noWrap
              href="/"
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              eDoktor
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              ></IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handlePagesClick(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Avatar
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              alt="profile_pic"
              src="/assets/profile.jpg"
            />
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                marginLeft: "2rem",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePagesClick(page)}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    marginLeft: "1%",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {authToken ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="profile_pic" src="/assets/profile.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleSettingsClick(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  component="a"
                  href="/login"
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  Zaloguj
                </Button>
                <Button component="a" href="/rejestracja" color="inherit">
                  Zarejestruj
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Typography variant="h5" sx={{ marginTop: "2%", marginBottom: "2%" }}>
        Wybierz swojego specjalistę
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <FormControl variant="outlined" sx={{ width: "50%" }}>
            <InputLabel>Specjalista</InputLabel>
            <Select
              value={selectedSpecialization || ""}
              onChange={(e) =>
                setSelectedSpecialization(e.target.value as string)
              }
            >
              <MenuItem value="">Wszystkie</MenuItem>
              <MenuItem value="Stomatolog">Stomatolog</MenuItem>
              <MenuItem value="Laryngolog">Laryngolog</MenuItem>
              <MenuItem value="Dermatolog">Dermatolog</MenuItem>
              <MenuItem value="Psycholog">Psycholog</MenuItem>
              <MenuItem value="Ortopeda">Ortopeda</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Miasto</InputLabel>
            <Select
              sx={{ width: "50%" }}
              value={selectedCity || ""}
              onChange={(e) => setSelectedCity(e.target.value as string)}
            >
              <MenuItem value="">Wszystkie</MenuItem>
              <MenuItem value="Białystok">Białystok</MenuItem>
              <MenuItem value="Suwałki">Suwałki</MenuItem>
              <MenuItem value="Łomża">Łomża</MenuItem>
              <MenuItem value="Augustów">Augustów</MenuItem>
              <MenuItem value="Warszawa">Warszawa</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        sx={{
          flexDirection: "column",
          alignContent: "center",
          marginTop: "1%",
          marginBottom: "5%",
        }}
        container
        spacing={2}
        justifyContent="center"
      >
        {doctors.map((doctor) => (
          <Grid
            sx={{ width: "100%" }}
            item
            key={doctor.id_lekarza}
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Card
              sx={{
                width: "100%",
                display: "flex",
                height: "100%",
                cursor: "pointer",
              }}
              onClick={() => handleDoctorClick(doctor)}
            >
              <CardMedia
                sx={{ width: "30%" }}
                component="img"
                alt={`${doctor.imie} ${doctor.nazwisko}`}
                height="150"
                image={`/assets/${doctor.zdjecie}`}
              />
              <CardContent>
                <Typography variant="subtitle1">
                  {doctor.imie} {doctor.nazwisko}
                </Typography>
                <Typography
                  sx={{ marginTop: "10%" }}
                  variant="body1"
                  color="text.secondary"
                >
                  {doctor.specjalizacja}
                </Typography>
                <Typography
                  sx={{ marginTop: "10%" }}
                  variant="body1"
                  color="text.secondary"
                >
                  {doctor.miasto}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={Boolean(selectedDoctor)}
        onClose={handleCloseDialog}
        aria-labelledby="doctor-modal"
        aria-describedby="doctor-modal-description"
      >
        <Box
          sx={{
            textAlign: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "2%" }}>
            {selectedDoctor?.imie} {selectedDoctor?.nazwisko}
          </Typography>
          <img
            src={`/assets/${selectedDoctor?.zdjecie}`}
            alt={`${selectedDoctor?.imie} ${selectedDoctor?.nazwisko}`}
            style={{ width: "100%", maxHeight: "150px", objectFit: "contain" }}
          />
          <Typography
            sx={{ marginTop: "2%" }}
            variant="body2"
            id="doctor-modal-description"
          >
            {selectedDoctor?.opis || "Brak opisu"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  sx={{ marginTop: "2%" }}
                  disablePast
                  value={value}
                  onChange={(newValue) => setValue(newValue as Dayjs)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Godzina</InputLabel>
                <Select
                  sx={{ width: "80%" }}
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value as string)}
                >
                  <MenuItem value="10:00">10:00</MenuItem>
                  <MenuItem value="10:30">10:30</MenuItem>
                  <MenuItem value="11:00">11:00</MenuItem>
                  <MenuItem value="11:30">11:30</MenuItem>
                  <MenuItem value="12:00">12:00</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button sx={{ marginRight: "10%" }} onClick={handleAppointment}>
            Umów wizytę
          </Button>
          <Button onClick={handleCloseDialog}>Zamknij</Button>
          {isAppointmentSuccess && (
            <Typography
              variant="body2"
              sx={{ color: "green", marginTop: "1%" }}
            >
              Wizyta została umówiona pomyślnie!
            </Typography>
          )}
        </Box>
      </Modal>

      <Box
        component="footer"
        sx={{
          backgroundColor: "#4863E8",
          color: "white",
          textAlign: "center",
          padding: "1.5rem 0",
          bottom: 0,
          width: "100%",
        }}
      >
        <Typography variant="h6">
          eDoktor &copy; {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}

export default MainPage;
