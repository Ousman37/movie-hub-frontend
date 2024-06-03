// src/components/Navbar.jsx
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import LoginModal from "./auth/LoginModal";
import LogoutButton from "./auth/LogoutButton";

function Navbar({ toggleTheme, darkMode, openLoginModal, openRegisterModal }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { currentUser } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openLoginModalHandler = () => {
    setLoginModalOpen(true);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-white text-3xl font-bold">
            <a href="/">
              <span role="img" aria-label="clapperboard">
                🎬
              </span>{" "}
              MovieHub
            </a>
          </div>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <a href="/" className="text-white text-lg hover:text-gray-400">
            Home
          </a>
          <a href="/genres" className="text-white text-lg hover:text-gray-400">
            Genres
          </a>
          <a href="/popular" className="text-white text-lg hover:text-gray-400">
            Popular
          </a>
          <a
            href="/new-releases"
            className="text-white text-lg hover:text-gray-400"
          >
            New Releases
          </a>
          {currentUser ? (
            <>
              <span className="text-white text-lg">
                Welcome, {currentUser.email}
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <button
                onClick={openLoginModalHandler}
                className="block bg-blue-600 text-white text-lg px-4 py-2 rounded hover:bg-blue-700 mt-2 transition duration-300"
              >
                Login
              </button>
            </>
          )}
          <ThemeToggle toggleTheme={toggleTheme} darkMode={darkMode} />
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden fixed top-0 right-0 h-full w-2/3 bg-gray-800 text-white p-4 shadow-lg z-50">
          <div className="flex justify-end">
            <button
              onClick={toggleMenu}
              className="text-white text-2xl focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <nav className="mt-8">
            <a
              href="/"
              className="block text-white text-lg hover:text-gray-400 mt-2"
            >
              Home
            </a>
            <a
              href="/genres"
              className="block text-white text-lg hover:text-gray-400 mt-2"
            >
              Genres
            </a>
            <a
              href="/popular"
              className="block text-white text-lg hover:text-gray-400 mt-2"
            >
              Popular
            </a>
            <a
              href="/new-releases"
              className="block text-white text-lg hover:text-gray-400 mt-2"
            >
              New Releases
            </a>
            {currentUser ? (
              <>
                <span className="block text-white text-lg mt-2">
                  Welcome, {currentUser.email}
                </span>
                <LogoutButton />
              </>
            ) : (
              <>
                <button
                  onClick={openLoginModalHandler}
                  className="block bg-blue-600 text-white text-lg px-4 py-2 rounded hover:bg-blue-700 mt-2 transition duration-300"
                >
                  Login
                </button>
              </>
            )}
            <ThemeToggle toggleTheme={toggleTheme} darkMode={darkMode} />
          </nav>
        </div>
      )}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={closeLoginModal}
        openRegisterModal={openRegisterModal}
      />
    </nav>
  );
}

export default Navbar;
