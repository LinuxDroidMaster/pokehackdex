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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
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

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground dark:bg-gray-900 dark:text-gray-100`}>
        {/* Header */}
        <header className="p-4 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">PokeHackDex</h1>

          {/* Menú en pantallas grandes */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-800 dark:text-gray-100 font-semibold hover:text-blue-700 dark:hover:text-blue-400">Game List</a>
            <a href="/top" className="text-gray-900 dark:text-gray-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400">Top of the Month</a>
            <a href="/about" className="text-gray-900 dark:text-gray-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400">About</a>
          </nav>

          {/* Botón de modo oscuro + Menú en móviles */}
          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2 bg-gray-200 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-100">
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded">
              ☰
            </button>
          </div>
        </header>

        {/* Menú desplegable en móviles */}
        {menuOpen && (
          <nav className="md:hidden bg-white dark:bg-gray-800 p-4 shadow-md flex flex-col gap-4">
            <a href="/" className="text-gray-900 dark:text-gray-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400">Game List</a>
            <a href="/top" className="text-gray-900 dark:text-gray-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400">Top of the Month</a>
            <a href="/about" className="text-gray-900 dark:text-gray-100 font-semibold hover:text-blue-600 dark:hover:text-blue-400">About</a>
          </nav>
        )}

        <main>{children}</main>
      </body>
    </html>
  );
}
