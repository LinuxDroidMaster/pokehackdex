"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [romhacks, setRomhacks] = useState([]);
  const [filteredRomhacks, setFilteredRomhacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConsole, setSelectedConsole] = useState("");
  const [selectedFeature, setSelectedFeature] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

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

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter((rom) =>
        rom.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrar por consola
    if (selectedConsole) {
      filtered = filtered.filter((rom) => rom.console === selectedConsole);
    }

    // Filtrar por características
    if (selectedFeature) {
      filtered = filtered.filter((rom) => rom.features.includes(selectedFeature));
    }

    // Filtrar por idioma
    if (selectedLanguage) {
      filtered = filtered.filter((rom) => rom.language === selectedLanguage);
    }

    // Filtrar por estado
    if (selectedStatus) {
      filtered = filtered.filter((rom) => rom.status === selectedStatus);
    }

    setFilteredRomhacks(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [searchQuery, selectedConsole, selectedFeature, selectedLanguage, selectedStatus]);

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">PokeHackDex</h1>

      {/* Barra de Búsqueda */}
      <div className="max-w-4xl mx-auto mb-4">
        <input
          type="text"
          placeholder="Search for a ROM Hack..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-400 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Filtros */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-center mb-6">
        {/* Filtrar por Consola */}
        <select
          value={selectedConsole}
          onChange={(e) => setSelectedConsole(e.target.value)}
          className="p-2 border border-gray-400 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">All Consoles</option>
          <option value="GBC">Game Boy Color</option>
          <option value="GBA">Game Boy Advance</option>
          <option value="NDS">Nintendo DS</option>
          <option value="RPG Maker">RPG Maker</option>
        </select>

        {/* Filtrar por Feature */}
        <select
          value={selectedFeature}
          onChange={(e) => setSelectedFeature(e.target.value)}
          className="p-2 border border-gray-400 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">All Features</option>
          <option value="Mega Evolutions">Mega Evolutions</option>
          <option value="New Region">New Region</option>
          <option value="Physical/Special Split">Physical/Special Split</option>
          <option value="New Storyline">New Storyline</option>
        </select>

        {/* Filtrar por Idioma */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="p-2 border border-gray-400 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">All Languages</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
        </select>

        {/* Filtrar por Estado */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="p-2 border border-gray-400 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">All Status</option>
          <option value="Completed">Completed</option>
          <option value="In Development">In Development</option>
        </select>
      </div>

      {/* Lista de Juegos Filtrados */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {filteredRomhacks.length > 0 ? (
          filteredRomhacks.map((rom) => (
            <div key={rom.id} className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded-lg border border-gray-200 w-full sm:w-60">
              <img src={rom.image} alt={rom.name} className="w-full sm:w-60 h-60 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{rom.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>🎮 Console:</strong> {rom.console}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>🌍 Language:</strong> {rom.language}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>📌 Status:</strong> {rom.status}</p>
                <button 
                  onClick={() => window.open(`/romhacks/${rom.id}`, "_blank")}
                  className="mt-3 w-full bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">No ROM hacks found.</p>
        )}
      </div>
    </main>
  );
}
