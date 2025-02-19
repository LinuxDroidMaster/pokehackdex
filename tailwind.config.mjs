/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFCC00", // Amarillo Pokémon
        secondary: "#E63946", // Rojo Pokémon
        accent: "#457B9D", // Azul Suave
        success: "#4CAF50", // Verde Correcto
        dark: "#1D1D1D", // Fondo Oscuro
        light: "#F8F8F8", // Texto en Modo Oscuro
      },
      backgroundImage: {
        "gradient-light": "linear-gradient(135deg, #FFCC00 0%, #FFF 100%)",
        "gradient-dark": "linear-gradient(135deg, #1D1D1D 0%, #457B9D 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
