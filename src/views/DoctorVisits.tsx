import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

interface Visit {
  id_wizyty: string;
  data: string;
  godzina: string;
  imie_uzytkownika: string;
  nazwisko_uzytkownika: string;
  notatka: string;
  opinia: string;
}

const pages = ["O Nas", "Regulamin", "Kontakt"];
const settings = ["Profil", "Wizyty", "Wyloguj"];

function DoctorVisits() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteAdded, setNoteAdded] = useState(false);

  const handleLogout = () => {
    setIsLoggedOut(true);
  };

  const handleVideoCall = (visit: Visit) => {
    console.log(
      "Rozpoczęcie połączenia wideo z:",
      visit.imie_uzytkownika,
      visit.nazwisko_uzytkownika
    );
    setOpenModal(true);
  };

  const handleSettingsClick = (setting: string) => {
    if (setting === "Profil") {
      window.location.href = "/profillekarza";
    } else if (setting === "Wizyty") {
      window.location.href = "/wizytylekarza";
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

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setAuthToken(authToken);
    }
  }, []);

  useEffect(() => {
    const fetchUserVisits = async () => {
      try {
        if (authToken) {
          const response = await fetch(
            "http://localhost/api/wizyty_lekarza.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ authToken }),
            }
          );

          if (response.ok) {
            const visitsData = await response.json();
            setVisits(visitsData);
          } else {
            console.error("Błąd pobierania danych wizyt lekarza");
          }
        }
      } catch (error) {
        console.error(
          "Wystąpił błąd podczas pobierania danych wizyt lekarza:",
          error
        );
      }
    };

    fetchUserVisits();
  }, [authToken]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

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

  const handleDialogClose = () => {
    setSelectedVisit(null);
  };

  const handleNoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Zapobiegnij domyślnemu zachowaniu przeglądarki

    try {
      const response = await fetch("http://localhost/api/dodaj_notatke.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          note: noteContent,
          visitId: selectedVisit?.id_wizyty, // Przyjmując, że visit ma identyfikator "id"
        }),
      });

      if (response.ok) {
        // Pomyślnie wysłano notatkę
        setNoteAdded(true); // Ustawiamy stan, że notatka została dodana
        setNoteContent("");
        console.log("Notatka została pomyślnie dodana.");
        // Tutaj możesz dodać dodatkową logikę, np. odświeżenie listy wizyt
      } else {
        console.error("Błąd podczas dodawania notatki");
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas przetwarzania żądania:", error);
    }
  };

  const renderVisits = () => {
    return visits.map((visit, index) => (
      <Card key={index} sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6">
            Data: {visit.data}, Godzina: {visit.godzina}
          </Typography>
          <Typography variant="body1">
            Pacjent: {visit.imie_uzytkownika} {visit.nazwisko_uzytkownika}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleVideoCall(visit)}
            sx={{ marginTop: "1rem", marginRight: "0.5rem" }}
          >
            Połączenie wideo
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelectedVisit(visit)}
            sx={{ marginTop: "1rem", marginRight: "0.5rem" }}
          >
            Więcej informacji
          </Button>
        </CardContent>
      </Card>
    ));
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
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{ marginTop: 3 }}>
        <Typography variant="h5" sx={{ marginBottom: "5%" }}>
          Historia Wizyt
        </Typography>
        {visits.length > 0 ? (
          renderVisits()
        ) : (
          <Typography variant="body1">Brak wizyt</Typography>
        )}
      </Container>
      <Dialog open={selectedVisit !== null} onClose={handleDialogClose}>
        <DialogTitle>Dodaj notatkę</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Data: {selectedVisit?.data}, Godzina: {selectedVisit?.godzina}
            <br />
            Lekarz: {selectedVisit?.imie_uzytkownika}{" "}
            {selectedVisit?.nazwisko_uzytkownika}
            <br />
            Notatka: {selectedVisit?.notatka}
            <br />
            Opinia pacjenta: {selectedVisit?.opinia}
            <form onSubmit={handleNoteSubmit}>
              <TextField
                label="Notatka"
                variant="outlined"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                Wyślij
              </Button>
            </form>
            {noteAdded && (
              <Typography color="primary">Dodano notatkę</Typography>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Zamknij</Button>
        </DialogActions>
      </Dialog>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="modal-modal-title">
            Łączenie z pacjentem
          </Typography>
          <Typography variant="body2" id="modal-modal-description">
            Trwa łączenie z pacjentem...
          </Typography>
        </Box>
      </Modal>
      <Box
        component="footer"
        sx={{
          marginTop: "20%",
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

export default DoctorVisits;
