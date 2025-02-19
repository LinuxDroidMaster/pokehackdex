"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }

    // Verificar si el usuario ya cerró el banner
    const bannerClosed = localStorage.getItem("bannerClosed");
    if (bannerClosed === "true") {
      setShowBanner(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const closeBanner = () => {
    setShowBanner(false);
    localStorage.setItem("bannerClosed", "true");
  };

  return (
    <html lang="en" className={`${darkMode ? "dark" : ""}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased 
                        bg-gradient-to-br from-blue-50 via-white to-purple-100 
                        dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                        text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>

        {/* 🚧 Banner de En Construcción */}
        {showBanner && (
          <div className="bg-red-500 dark:bg-red-700 text-white text-center p-2 fixed top-0 left-0 w-full z-50 flex justify-between items-center">
            <span className="mx-auto font-semibold">🚧 Site under construction – No real data right now!</span>
            <button onClick={closeBanner} className="px-4 text-white">✖</button>
          </div>
        )}

        {/* 📌 Header Modernizado */}
        <header className="fixed top-0 left-0 w-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg shadow-md p-4 flex justify-between items-center z-50">
          {/* 📌 Título Clickable */}
          <h1 
            className="text-2xl font-bold text-gray-900 dark:text-gray-100 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition"
            onClick={() => window.location.href = "/"}
          >
            PokeHackDex
          </h1>

          {/* 📌 Menú de Navegación */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-800 dark:text-gray-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">Game List</a>
            <a href="/top" className="text-gray-800 dark:text-gray-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">Top of the Month</a>
            <a href="/about" className="text-gray-800 dark:text-gray-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">About</a>
          </nav>

          {/* 📌 Botón de Modo Oscuro con Animación */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full transition bg-gray-200 dark:bg-gray-700 
                         hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-110"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>
        </header>

        {/* 📌 Contenido de la Página */}
        <main className="flex-1 w-full mt-16">{children}</main>
        
      </body>
    </html>
  );
}
