"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaDiscord, FaTwitter, FaGlobe, FaYoutube } from "react-icons/fa"; // Iconos de redes sociales

export default function RomhackDetails() {
  const { id } = useParams();
  const [romhack, setRomhack] = useState(null);

  useEffect(() => {
    fetch("/data/romhacks.json")
      .then((res) => res.json())
      .then((data) => {
        const foundRomhack = data.find((rom) => rom.id === id);
        setRomhack(foundRomhack);
      });
  }, [id]);

  if (!romhack) return <p className="text-center text-gray-600 dark:text-gray-300 mt-10">Loading...</p>;

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex justify-center">
      <div className="max-w-4xl bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row gap-6">
        
        {/* 📸 Imagen y Redes Sociales */}
        <div className="w-full md:w-1/3">
          <img src={romhack.image} alt={romhack.name} className="w-full rounded-lg" />
          <div className="mt-4 flex justify-center gap-4">
            {romhack.socials?.discord && <a href={romhack.socials.discord} target="_blank"><FaDiscord className="text-blue-600 text-3xl hover:text-blue-700" /></a>}
            {romhack.socials?.twitter && <a href={romhack.socials.twitter} target="_blank"><FaTwitter className="text-blue-400 text-3xl hover:text-blue-500" /></a>}
            {romhack.socials?.website && <a href={romhack.socials.website} target="_blank"><FaGlobe className="text-gray-600 dark:text-gray-300 text-3xl hover:text-gray-700 dark:hover:text-gray-400" /></a>}
            {romhack.socials?.youtube && <a href={romhack.socials.youtube} target="_blank"><FaYoutube className="text-red-500 text-3xl hover:text-red-600" /></a>}
          </div>
        </div>

        {/* 📌 Título, Descripción y Características */}
        <div className="w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{romhack.name}</h1>
        <div className="mt-2 text-gray-700 dark:text-gray-300">
          <p><strong>🎮 Console:</strong> {romhack.console}</p>
          <p><strong>🌍 Language:</strong> {romhack.language}</p>
          <p><strong>📌 Status:</strong> {romhack.status}</p>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-4">{romhack.summary}</p>

          {/* 🎮 Features */}
          <h2 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-100">Features</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {romhack.features.map((feature, index) => (
              <span key={index} className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow">
                {feature}
              </span>
            ))}
          </div>

          {/* ⬇️ Download Button */}
          <div className="mt-6">
            <a 
              href={romhack.downloads.google_drive} 
              className="block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded transition"
            >
              Download ROM Hack
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
