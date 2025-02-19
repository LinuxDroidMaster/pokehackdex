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
    <html lang="en" className={darkMode ? "dark" : ""}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground dark:bg-gray-900 dark:text-gray-100`}>
        {/* Banner de En Construcción */}
        {showBanner && (
          <div className="bg-yellow-300 dark:bg-yellow-600 text-black dark:text-white text-center p-2 fixed top-0 left-0 w-full z-50 flex justify-between items-center">
            <span className="mx-auto font-semibold">🚧 Site under construction – No real data right now!</span>
            <button onClick={closeBanner} className="text-black dark:text-white px-4">
              ✖
            </button>
          </div>
        )}

        {/* Header */}
        <header className="p-4 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center mt-10">
        <h1 
          className="text-2xl font-bold text-gray-900 dark:text-gray-100 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition"
          onClick={() => window.location.href = "/"}
        >
          PokeHackDex
        </h1>

          {/* Menú en pantallas grandes */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-800 dark:text-gray-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400">Game List</a>
            <a href="/top" className="text-gray-800 dark:text-gray-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400">Top of the Month</a>
            <a href="/about" className="text-gray-800 dark:text-gray-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400">About</a>
          </nav>

          {/* Botón de modo oscuro y menú en móviles */}
          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2 bg-gray-200 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-100">
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded">
              ☰
            </button>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
