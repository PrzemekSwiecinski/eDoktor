import React from "react";
import MainPage from "./views/MainPage";
import LoginView from "./views/LoginView";
import LoginViewDoctor from "./views/LoginViewDoctor";
import LoginViewAdmin from "./views/LoginViewAdmin";
import RegisterView from "./views/RegisterView";
import AboutUs from "./views/AboutUs";
import TermsAndConditions from "./views/TermsAndConditions";
import Contact from "./views/Contact";
import UserView from "./views/UserView";
import DoctorView from "./views/DoctorView";
import AdminPanel from "./views/AdminPanel";
import AddDoctor from "./views/AddDoctor";
import UsersVisits from "./views/UsersVisits";
import DoctorVisits from "./views/DoctorVisits";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/paneladmina" element={<AdminPanel />} />
        <Route path="/dodawanie_lekarzy" element={<AddDoctor />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/login_lekarz" element={<LoginViewDoctor />} />
        <Route path="/login_admin" element={<LoginViewAdmin />} />
        <Route path="/rejestracja" element={<RegisterView />} />
        <Route path="/onas" element={<AboutUs />} />
        <Route path="/regulamin" element={<TermsAndConditions />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/profiluzytkownika" element={<UserView />} />
        <Route path="/profillekarza" element={<DoctorView />} />
        <Route path="/wizytyuzytkownika" element={<UsersVisits />} />
        <Route path="/wizytylekarza" element={<DoctorVisits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
