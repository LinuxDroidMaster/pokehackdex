"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSlidersH } from "react-icons/fa"; // Icono para el botón de filtros avanzados

export default function Home() {
  const [romhacks, setRomhacks] = useState([]);
  const [filteredRomhacks, setFilteredRomhacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem("searchQuery") || "");
  const [selectedConsole, setSelectedConsole] = useState(localStorage.getItem("selectedConsole") || "");
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);

  // Filtros avanzados
  const [selectedLanguages, setSelectedLanguages] = useState(JSON.parse(localStorage.getItem("selectedLanguages")) || []);
  const [selectedStatus, setSelectedStatus] = useState(localStorage.getItem("selectedStatus") || "");
  const [selectedFeatures, setSelectedFeatures] = useState(JSON.parse(localStorage.getItem("selectedFeatures")) || []);

  const router = useRouter();

  useEffect(() => {
    fetch("/data/romhacks.json")
      .then((res) => res.json())
      .then((data) => {
        setRomhacks(data);
        setFilteredRomhacks(data);
      });
  }, []);

  const handleFilterChange = () => {
    let filtered = romhacks;

    if (searchQuery) {
      filtered = filtered.filter((rom) =>
        rom.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedConsole) {
      filtered = filtered.filter((rom) => rom.console === selectedConsole);
    }

    if (selectedStatus) {
      filtered = filtered.filter((rom) => rom.status === selectedStatus);
    }

    if (selectedLanguages.length > 0) {
      filtered = filtered.filter((rom) => selectedLanguages.includes(rom.language));
    }

    if (selectedFeatures.length > 0) {
      filtered = filtered.filter((rom) => selectedFeatures.some(feature => rom.features.includes(feature)));
    }

    setFilteredRomhacks(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [searchQuery, selectedConsole, selectedLanguages, selectedStatus, selectedFeatures]);

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">PokeHackDex</h1>

      {/* 🔍 Barra de Búsqueda y Filtros Principales */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a ROM Hack..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-400 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />

        <select
          value={selectedConsole}
          onChange={(e) => setSelectedConsole(e.target.value)}
          className="p-2 border border-gray-400 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">All Consoles</option>
          <option value="GB">Game Boy</option>
          <option value="GBC">Game Boy Color</option>
          <option value="GBA">Game Boy Advance</option>
          <option value="NDS">Nintendo DS</option>
          <option value="RPG Maker">RPG Maker</option>
        </select>

        {/* Botón de Filtros Avanzados */}
        <button
          onClick={() => setAdvancedFiltersOpen(true)}
          className="p-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded flex items-center gap-2"
        >
          <FaSlidersH /> More Filters
        </button>
      </div>

      {/* Fondo Oscuro para Evitar Superposición */}
      {advancedFiltersOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setAdvancedFiltersOpen(false)}></div>
      )}

      {/* Sidebar de Filtros Avanzados */}
      {advancedFiltersOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-800 shadow-lg p-6 z-50 text-gray-900 dark:text-gray-100">
          <button
            onClick={() => setAdvancedFiltersOpen(false)}
            className="absolute top-4 right-4 text-gray-900 dark:text-gray-100 text-xl"
          >
            ✖
          </button>
          <h2 className="text-lg font-semibold mb-4">Advanced Filters</h2>

          {/* 🌍 Idioma */}
          <label className="block font-semibold">Language:</label>
          <div className="flex flex-col">
            {["English", "Spanish", "French"].map((lang) => (
              <label key={lang} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(lang)}
                  onChange={() => {
                    setSelectedLanguages(prev =>
                      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
                    );
                  }}
                />
                {lang}
              </label>
            ))}
          </div>

          {/* 📌 Estado */}
          <label className="block font-semibold mt-2">Status:</label>
          <div className="flex flex-col">
            {["Completed", "In Development"].map((status) => (
              <label key={status} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  checked={selectedStatus === status}
                  onChange={() => setSelectedStatus(status)}
                />
                {status}
              </label>
            ))}
          </div>

          {/* ⭐ Features */}
          <label className="block font-semibold mt-2">Features:</label>
          <div className="flex flex-col">
            {["Mega Evolutions", "New Region", "Physical/Special Split", "Hard Mode"].map((feature) => (
              <label key={feature} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature)}
                  onChange={() => {
                    setSelectedFeatures(prev =>
                      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
                    );
                  }}
                />
                {feature}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 📌 Lista de ROM Hacks */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {filteredRomhacks.length > 0 ? filteredRomhacks.map((rom) => (
          <div key={rom.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg border w-full sm:w-60">
            <img 
              src={rom.image} 
              alt={rom.name} 
              className="w-full h-60 object-cover rounded-t-lg"
              style={{ aspectRatio: "1 / 1", objectFit: "cover" }} 
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{rom.name}</h2>
              <p className="text-sm text-gray-800 dark:text-gray-300"><strong>🎮 Console:</strong> {rom.console}</p>
              <button 
                onClick={() => window.open(`/romhacks/${rom.id}`, "_blank")}
                className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded"
              >
                View Details
              </button>
            </div>
          </div>
        )) : <p className="text-center">No ROM hacks found.</p>}
      </div>
    </main>
  );
}
