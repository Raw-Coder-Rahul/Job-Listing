/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: { primary: { light: "#3b82f6", dark: "#ef4444" } },
    },
  },
  plugins: [],
};