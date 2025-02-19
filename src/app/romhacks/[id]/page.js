  "use client";
  import { useEffect, useState } from "react";
  import { useParams } from "next/navigation";
  import { Carousel } from "react-responsive-carousel";
  import "react-responsive-carousel/lib/styles/carousel.min.css";
  import { FaTwitter, FaDiscord, FaGlobe, FaYoutube } from "react-icons/fa";

  export default function RomhackDetails() {
    const { id } = useParams();
    const [romhack, setRomhack] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    // Función para navegar entre imágenes
    const handleNextImage = () => {
      if (selectedImageIndex !== null && romhack.gallery.length > 0) {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % romhack.gallery.length);
      }
    };

    const handlePrevImage = () => {
      if (selectedImageIndex !== null && romhack.gallery.length > 0) {
        setSelectedImageIndex((prevIndex) =>
          prevIndex === 0 ? romhack.gallery.length - 1 : prevIndex - 1
        );
      }
    };

    // Cerrar con tecla ESC
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          setSelectedImageIndex(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

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

    // 🎨 Colores para las categorías
    const categoryColors = {
      "Catchable Pokémon": "bg-green-300 dark:bg-green-700 text-green-900 dark:text-white",
      "Pokedex": "bg-yellow-300 dark:bg-yellow-700 text-yellow-900 dark:text-white",
      "Sprites": "bg-purple-300 dark:bg-purple-700 text-purple-900 dark:text-white",
      "New Content": "bg-blue-300 dark:bg-blue-700 text-blue-900 dark:text-white",
      "Altered Gameplay": "bg-red-300 dark:bg-red-700 text-red-900 dark:text-white",
      "Quality of Life": "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white",
      "Gameplay & Difficulty": "bg-pink-300 dark:bg-pink-700 text-pink-900 dark:text-white",
      "Game Scale": "bg-indigo-300 dark:bg-indigo-700 text-indigo-900 dark:text-white",
      "Tone": "bg-orange-300 dark:bg-orange-700 text-orange-900 dark:text-white",
      "Completion Status": "bg-teal-300 dark:bg-teal-700 text-teal-900 dark:text-white",
    };

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
            {romhack.downloads?.google_drive && (
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
    
            {/* 🎖️ Versión del juego */}
            <span className="mt-2 inline-block bg-blue-600 text-white text-sm px-4 py-1 rounded-full">
              Version: {romhack.version}
            </span>
    
            {/* 📌 Descripción con Formato */}
            <div className="prose max-w-none text-left mt-6 leading-relaxed 
              text-gray-900 dark:text-gray-200 
              prose-h1:text-gray-900 dark:prose-h1:text-white 
              prose-h2:text-gray-900 dark:prose-h2:text-white 
              prose-h3:text-gray-900 dark:prose-h3:text-white 
              prose-strong:text-gray-900 dark:prose-strong:text-gray-100 
              prose-ul:list-disc prose-ul:pl-5 prose-li:mb-2">
            <div dangerouslySetInnerHTML={{ __html: romhack.description }} />
          </div>


            {/* 📷 Galería de imágenes */}
            {romhack.gallery?.length > 0 && (
              <div className="mt-10 max-w-lg mx-auto">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-4">Screenshots</h2>
                <Carousel showThumbs={false} infiniteLoop autoPlay className="rounded-lg">
                  {romhack.gallery.map((image, index) => (
                    <div key={index} onClick={() => setSelectedImageIndex(index)} className="cursor-pointer">
                      <img 
                        src={image} 
                        alt={`Screenshot ${index + 1}`} 
                        className="rounded-lg max-h-64 object-contain mx-auto"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </section>
    
          {/* 📌 Columna Derecha (Categorías y Features) */}
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
              <p className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-1 rounded-lg text-sm font-semibold">
                🏆 Created by: {romhack.creator}
              </p>
              <p className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-1 rounded-lg text-sm font-semibold">
                📅 Updated: {romhack.date_updated}
              </p>
            </div>
    
            {/* 🎨 Features organizadas por categorías */}
            {romhack.features && Object.keys(romhack.features).length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Features</h2>
                {Object.entries(romhack.features).map(([category, features], index) => (
                  <div key={index} className="mt-4">
                    <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100">{category}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {features.map((feature, i) => (
                        <span key={i} className={`text-xs px-3 py-1 rounded-lg ${categoryColors[category] || "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white"}`}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
    
        {/* 📌 Modal para ver la imagen en grande */}
        {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative flex items-center">
            {/* Botón Anterior */}
            <button
              className="absolute left-2 text-white text-3xl bg-gray-900 bg-opacity-50 p-3 rounded-full"
              onClick={handlePrevImage}
            >
              ❮
            </button>

            {/* Imagen Ampliada */}
            <img
              src={romhack.gallery[selectedImageIndex]}
              alt="Expanded Screenshot"
              className="max-w-full max-h-screen rounded-lg shadow-lg"
            />

            {/* Botón Siguiente */}
            <button
              className="absolute right-2 text-white text-3xl bg-gray-900 bg-opacity-50 p-3 rounded-full"
              onClick={handleNextImage}
            >
              ❯
            </button>

            {/* Botón Cerrar */}
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={() => setSelectedImageIndex(null)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
      </main>
    );    
  }
