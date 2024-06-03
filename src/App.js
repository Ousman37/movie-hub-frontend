// src/App.jsx
import React, { useState, useEffect } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

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
        <div
          className={`min-h-screen ${
            darkMode
              ? "dark bg-gradient-to-br from-gray-900 via-gray-700 to-black"
              : "bg-gradient-to-br from-customDarkBlue via-customLightBlue to-customTeal"
          } text-white flex flex-col`}
        >
          <Navbar
            toggleTheme={toggleTheme}
            darkMode={darkMode}
            openLoginModal={openLoginModal}
            openRegisterModal={openRegisterModal}
          />
          <main className="container mx-auto p-4 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <LoginModal
                    isOpen={loginModalOpen}
                    onClose={closeLoginModal}
                    openRegisterModal={openRegisterModal}
                  />
                }
              />
              <Route
                path="/register"
                element={
                  <RegisterModal
                    isOpen={registerModalOpen}
                    onClose={closeRegisterModal}
                    openLoginModal={openLoginModal}
                  />
                }
              />
              <Route element={<ProtectedRoute />}>
                <Route path="/popular" element={<Popular />} />
                <Route path="/genres" element={<Genres />} />
                <Route path="/genre/:genreId" element={<MoviesByGenre />} />
                <Route path="/new-releases" element={<NewReleases />} />
                <Route path="/movie/:movieId" element={<MovieDetails />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
