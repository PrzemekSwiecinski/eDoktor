import React, { useState } from "react";
import "../App.css";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Grid,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";

const pages = ["O Nas", "Regulamin", "Kontakt"];
const settings = ["Profil", "Historia leczenia", "Wyloguj"];

function TermsAndConditions() {
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    string | null
  >(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(
    null
  );

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

  return (
    <Box className="App" sx={{ textAlign: "left" }}>
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
    <Button
      component="a"
      href="/rejestracja"
      color="inherit"
    >
      Zarejestruj
    </Button>
  </Box>
)}
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          alignItems: "left",
          marginTop: "5%",
          marginLeft: "25%",
          marginRight: "25%",
          marginBottom: "5%",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Regulamin
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "3%" }} paragraph>
          §1. Postanowienia ogólne
        </Typography>
        <Typography paragraph>
          a. Usługi – mają znaczenie nadane w dalszej części Regulaminu.
          <br />
          b. Serwis – serwis internetowy prowadzony przez Usługodawcę pod
          adresem: ...
          <br />
          c. Regulamin – niniejszy regulamin świadczenia usług drogą
          elektroniczną przez Usługodawcę.
          <br />
          d. Użytkownik lub Pacjent – osoba fizyczna, posiadająca pełną zdolność
          do czynności prawnych, która dokonała Rejestracji w Serwisie lub
          dokonała rezerwacji terminu u Profesjonalisty lub skorzystała z
          funkcjonalności zadawania pytań Profesjonalistom. <br />
          e. Profesjonalista – korzystający z Serwisu, będący lekarzem, lekarzem
          dentystą, psychologiem, fizjoterapeutą, położną, dietetykiem,
          psychoterapeutą, a także weterynarzem lub inną osobą niewymienioną
          powyżej udzielającą świadczeń zdrowotnych lub innych świadczeń z
          zakresu ochrony zdrowia. Profesjonalista może, ale nie musi dokonać
          Rejestracji.
          <br />
          f. Profil – zbiór informacji na temat Profesjonalisty umieszczony w
          Serwisie w postaci podstrony Serwisu posiadającej unikalny adres URL.
          <br />
          g. Rejestracja – proces utworzenia Konta Użytkownika lub Konta
          Profesjonalisty.
          <br />
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "3%" }} paragraph>
          §2. Rodzaje i zakres Usług
        </Typography>
        <Typography paragraph>
          1. Usługodawca świadczy dla Użytkowników między innymi następujące
          Usługi:
        </Typography>
        <Typography sx={{ marginLeft: "3%" }} paragraph>
          a. udostępnia wyszukiwarkę Profesjonalistów i Placówek;
          <br />
          b. umożliwia Użytkownikom zadawanie pytań zweryfikowanym
          Profesjonalistom;
          <br />
          c. umożliwia Użytkownikom prowadzenie za pośrednictwem aplikacji
          mobilnej dialogu z Profesjonalistami, którzy udostępnili taką
          możliwość;
          <br />
          d. umożliwia rezerwację terminu wizyty lub terminu badania u
          Profesjonalistów i w Placówkach, które udostępniły taką możliwość;
          <br />
        </Typography>
        <Typography paragraph>
          2. Usługi dla Użytkowników oraz usługi Profilu podstawowego są
          nieodpłatne.
          <br />
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "3%" }} paragraph>
          §3. Warunki świadczenia Usług dla Użytkowników
        </Typography>
        <Typography paragraph>
          1. W celu korzystania z Usług, Użytkownik:
        </Typography>
        <Typography sx={{ marginLeft: "3%" }} paragraph>
          a. musi dokonać Rejestracji,
          <br />
          b. musi posiadać dostęp do sieci Internet,
          <br />
          c. musi posiadać przeglądarkę internetową (jedną z następujących):
          Firefox, Chrome, Safari, IE, Opera, zaktualizowaną do najnowszej
          wersji,
          <br />
          d. umożliwia rezerwację terminu wizyty lub terminu badania u
          Profesjonalistów i w Placówkach, które udostępniły taką możliwość;
          <br />
        </Typography>
        <Typography paragraph>
          2. Każdy korzystający z Internetu może zapoznawać się z informacjami i
          opiniami o Profesjonalistach i Placówkach oraz korzystać z
          wyszukiwarki.
        </Typography>
      </Box>
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

export default TermsAndConditions;
