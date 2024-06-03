/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode with the 'class' strategy
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customDarkBlue: "#1e3a8a",
        customLightBlue: "#3b82f6",
        customTeal: "#0f766e",
      },
    },
  },
  plugins: [],
};

