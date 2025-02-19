/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Habilitamos modo oscuro con clases
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "2rem",
              fontWeight: "bold",
              marginTop: "1.5rem",
              color: "rgb(31 41 55)", // gris oscuro (modo claro)
            },
            h2: {
              fontSize: "1.75rem",
              fontWeight: "bold",
              marginTop: "1.25rem",
              color: "rgb(31 41 55)", 
            },
            h3: {
              fontSize: "1.5rem",
              fontWeight: "semibold",
              marginTop: "1rem",
              color: "rgb(55 65 81)", // gris medio
            },
            "h1, h2, h3": {
              dark: {
                color: "rgb(229 231 235)", // gris claro en modo oscuro
              },
            },
            p: {
              marginBottom: "1rem", // Más separación entre párrafos
            },
            ul: {
              paddingLeft: "1.5rem", // Asegurar indentación de listas
              listStyleType: "disc", // Asegurar viñetas en listas
            },
            li: {
              marginBottom: "0.5rem",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")], // 📌 Agrega el plugin de tipografía
};
