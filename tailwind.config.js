/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{jsx,tsx,js,html}",  // Scan all JS/JSX/TSX/HTML files
    "./src/components/**/*.{jsx,tsx,js,html}",  // Scan components folder too
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
      },
    },
  },
  plugins: [],
}