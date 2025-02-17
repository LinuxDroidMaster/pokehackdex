"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaTwitter, FaDiscord, FaGlobe, FaYoutube } from "react-icons/fa"; // 📌 Importamos los iconos

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

  if (!romhack) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* 📌 Columna Izquierda */}
        <aside className="md:col-span-3 flex flex-col items-center">
          <img src={romhack.image} alt={romhack.name} className="w-full max-w-xs rounded-lg shadow-lg" />

          {/* 🔗 Redes Sociales con Iconos */}
          <div className="mt-4 flex justify-center gap-4">
            {romhack.socials?.twitter && (
              <a href={romhack.socials.twitter} target="_blank" rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 text-3xl">
                <FaTwitter />
              </a>
            )}
            {romhack.socials?.discord && (
              <a href={romhack.socials.discord} target="_blank" rel="noopener noreferrer"
                className="text-indigo-500 hover:text-indigo-600 text-3xl">
                <FaDiscord />
              </a>
            )}
            {romhack.socials?.website && (
              <a href={romhack.socials.website} target="_blank" rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-3xl">
                <FaGlobe />
              </a>
            )}
            {romhack.socials?.youtube && (
              <a href={romhack.socials.youtube} target="_blank" rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 text-3xl">
                <FaYoutube />
              </a>
            )}
          </div>

          {/* ⬇️ Botón de Descarga */}
          {romhack.downloads && romhack.downloads.google_drive && (
            <a
              href={romhack.downloads.google_drive}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
            >
              Download
            </a>
          )}
        </aside>

        {/* 📌 Columna Central (Título y Descripción) */}
        <section className="md:col-span-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{romhack.name}</h1>
          <p className="text-gray-800 dark:text-gray-300 mt-4">{romhack.summary}</p>

          {/* 📷 Galería de imágenes */}
          {romhack.gallery && romhack.gallery.length > 0 && (
            <div className="mt-10 max-w-lg mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-4">Screenshots</h2>
              <Carousel showThumbs={false} infiniteLoop autoPlay className="rounded-lg">
                {romhack.gallery.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`Screenshot ${index + 1}`} className="rounded-lg max-h-64 object-contain mx-auto" />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </section>

        {/* 📌 Columna Derecha (Etiquetas y Features) */}
        <aside className="md:col-span-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Game Details</h2>
          <div className="mt-4 space-y-2">
            <p className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-1 rounded-lg text-sm font-semibold">
              🎮 Console: {romhack.console}
            </p>
            <p className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-1 rounded-lg text-sm font-semibold">
              🌍 Language: {romhack.language}
            </p>
            <p className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-1 rounded-lg text-sm font-semibold">
              📌 Status: {romhack.status}
            </p>
          </div>

          {/* ⭐ Features */}
          {romhack.features && romhack.features.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Features</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {romhack.features.map((feature, index) => (
                  <span key={index} className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-white text-xs px-3 py-1 rounded-lg">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
