// src/components/ThemeToggle.jsx
import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function ThemeToggle({ toggleTheme, darkMode }) {
  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-4 right-4 p-4 rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg ${
        darkMode ? "bg-yellow-500 text-yellow-900" : "bg-gray-800 text-gray-200"
      } hover:bg-opacity-80`}
    >
      {darkMode ? (
        <FaSun className="w-6 h-6" />
      ) : (
        <FaMoon className="w-6 h-6" />
      )}
    </button>
  );
}

export default ThemeToggle;

