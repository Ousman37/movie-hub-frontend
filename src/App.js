import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";
import LoginModal from "./components/auth/LoginModal";
import RegisterModal from "./components/auth/RegisterModal";
import Popular from "./components/Popular";
import Genres from "./components/Genres";
import MoviesByGenre from "./components/MoviesByGenre";
import NewReleases from "./components/NewReleases";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-customDarkBlue via-customLightBlue to-customTeal text-white flex flex-col">
          <Navbar
            openLoginModal={openLoginModal}
            openRegisterModal={openRegisterModal}
            loginModalOpen={loginModalOpen}
            registerModalOpen={registerModalOpen}
          />
          <main className="container mx-auto p-4 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/genre/:genreId" element={<MoviesByGenre />} />
              <Route path="/new-releases" element={<NewReleases />} />
              <Route path="/movie/:movieId" element={<MovieDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <LoginModal
          isOpen={loginModalOpen}
          onClose={closeLoginModal}
          openRegisterModal={openRegisterModal}
        />
        <RegisterModal
          isOpen={registerModalOpen}
          onClose={closeRegisterModal}
          openLoginModal={openLoginModal}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
