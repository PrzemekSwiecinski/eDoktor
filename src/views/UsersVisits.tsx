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
  imie_lekarza: string;
  nazwisko_lekarza: string;
  notatka: string;
  opinia: string;
}

const pages = ["O Nas", "Regulamin", "Kontakt"];
const settings = ["Profil", "Historia leczenia", "Wyloguj"];

function UsersVisits() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [opinionContent, setOpinionContent] = useState("");
  const [opinionAdded, setOpinionAdded] = useState(false);

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

  useEffect(() => {
    const fetchUserVisits = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch(
          "http://localhost/api/wizyty_uzytkownika.php",
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
          console.error("Błąd pobierania danych wizyt użytkownika");
        }
      } catch (error) {
        console.error(
          "Wystąpił błąd podczas pobierania danych wizyt użytkownika:",
          error
        );
      }
    };
    if (authToken) {
      fetchUserVisits();
    }
  }, [authToken]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuthToken(authToken);
  });

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

  const handleVisitClick = (visit: Visit) => {
    setSelectedVisit(visit);
  };

  const handleDialogClose = () => {
    setSelectedVisit(null);
  };

  const handleOpinionSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // Zapobiegnij domyślnemu zachowaniu przeglądarki

    try {
      const response = await fetch("http://localhost/api/dodaj_opinie.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opinion: opinionContent,
          visitId: selectedVisit?.id_wizyty, // Przyjmując, że visit ma identyfikator "id"
        }),
      });

      if (response.ok) {
        // Pomyślnie wysłano notatkę
        setOpinionAdded(true); // Ustawiamy stan, że notatka została dodana
        setOpinionContent("");
        console.log("Opinia została pomyślnie dodana.");
        // Tutaj możesz dodać dodatkową logikę, np. odświeżenie listy wizyt
      } else {
        console.error("Błąd podczas dodawania opinia");
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas przetwarzania żądania:", error);
    }
  };

  const renderVisits = () => {
    return visits.map((visit, index) => (
      <Card
        key={index}
        sx={{ marginBottom: 3 }}
        onClick={() => handleVisitClick(visit)}
      >
        <CardContent>
          <Typography variant="h6">
            Data: {visit.data}, Godzina: {visit.godzina}
          </Typography>
          <Typography variant="body1">
            Lekarz: {visit.imie_lekarza} {visit.nazwisko_lekarza}
          </Typography>
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
      <Container maxWidth="md" sx={{ marginTop: 3 }}>
        <Typography variant="h5" sx={{ marginBottom: "5%" }}>
          Historia Wizyt
        </Typography>
        {visits.length > 0 ? (
          renderVisits()
        ) : (
          <Typography variant="body1">Brak wizyt do wyświetlenia</Typography>
        )}
      </Container>

      <Dialog open={selectedVisit !== null} onClose={handleDialogClose}>
        <DialogTitle>Informacje o wizycie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Data: {selectedVisit?.data}, Godzina: {selectedVisit?.godzina}
            <br />
            Lekarz: {selectedVisit?.imie_lekarza}{" "}
            {selectedVisit?.nazwisko_lekarza}
            <br />
            Notatka: {selectedVisit?.notatka}
            <br />
            Opinia: {selectedVisit?.opinia}
            <form onSubmit={handleOpinionSubmit}>
              <TextField
                label="Opinia o wizycie"
                variant="outlined"
                value={opinionContent}
                onChange={(e) => setOpinionContent(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                Wyślij
              </Button>
            </form>
            {opinionAdded && (
              <Typography color="primary">Dodano opinię</Typography>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Zamknij</Button>
        </DialogActions>
      </Dialog>

      <Box
        component="footer"
        sx={{
          marginTop: "16%",
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

export default UsersVisits;
