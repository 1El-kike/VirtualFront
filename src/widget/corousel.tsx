import { useEffect, useState, useCallback, type FC } from "react"
import type { Property } from "../types";
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { getFirstImageUrl } from "../utils/imageHelper";

interface TypeCarousel {
    element: Property[];
    autoDeslizar: boolean;
    intervalo: number;
    mostrarPuntos: boolean;
    mostrarFlechas: boolean;
    className: string;
}

const Carousel: FC<TypeCarousel> = ({
    element = [],
    autoDeslizar = true,
    intervalo = 4000,
    mostrarPuntos = true,
    mostrarFlechas = true,
    className = ""
}) => {

    const [indiceActual, setindiceActual] = useState(0);
    const [slidesParaMostrar, setslidesParaMostrar] = useState(1);

    const siguienteSlide = useCallback(() => {
        if (indiceActual < element.length - slidesParaMostrar) {
            setindiceActual(indiceActual + 1);
        } else {
            setindiceActual(0)
        }
    }, [indiceActual, element.length, slidesParaMostrar])

    const slideAnterior = useCallback(() => {
        if (indiceActual > 0) {
            setindiceActual(indiceActual - 1);
        } else {
            setindiceActual(element.length - slidesParaMostrar)
        }
    }, [indiceActual, element.length, slidesParaMostrar])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                slideAnterior();
            } else if (event.key === 'ArrowRight') {
                siguienteSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [slideAnterior, siguienteSlide]);

    //Detectar cambio de pantalla
    useEffect(() => {
        const actualizarSlides = () => {
            if (window.innerWidth >= 1024) {
                setslidesParaMostrar(3);
            } else if (window.innerWidth >= 640) {
                setslidesParaMostrar(2);
            } else {
                setslidesParaMostrar(1);
            }
        };

        actualizarSlides();
        window.addEventListener("resize", actualizarSlides);

        return () => window.removeEventListener('resize', actualizarSlides);
    }, []);

    //Auto-deslizar
    useEffect(() => {
        if (autoDeslizar && element.length > slidesParaMostrar) {
            const intervaloId = setInterval(siguienteSlide, intervalo)
            return () => clearInterval(intervaloId)
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indiceActual, autoDeslizar, intervalo, element.length, slidesParaMostrar])

    const irASlide = (indice: number) => {
        if (indice <= element.length - slidesParaMostrar && indice >= 0) {
            setindiceActual(indice)
        }
    }

    //calcula el ancho de cada slide basado en cuantos se muestran
    const anchoSlide = `${100 / slidesParaMostrar}%`

    return (
        <div className={`relative w-full ${className}`} role="region" aria-label="Carrusel de propiedades">
            {/* Contenido principal */}
            <div className="overflow-hidden  py-2  md:py-10 rounded-2xl">
                <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{
                        transform: `translateX(-${indiceActual * (100 / slidesParaMostrar)}%)`,
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {element.map((elemento: Property, index: number) => (
                        <div
                            key={index}
                            className="flex-shrink-0 px-3 transition-all duration-500"
                            style={{ width: anchoSlide }}
                        >
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1">
                                {/* Image */}
                                {elemento.images && (
                                    <div className="h-48 md:h-56 overflow-hidden relative">
                                        <img
                                            src={getFirstImageUrl(elemento.images)}
                                            alt={`Imagen de ${elemento.title}`}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                )}
                                {/* Contenido */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold mb-2 line-clamp-1 text-gray-900 leading-tight">{elemento.title}</h3>
                                    <p className="text-gray-600 mb-3 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {elemento.location}
                                    </p>
                                    <p className="text-2xl font-bold text-indigo-600 mb-2">${elemento.price.toLocaleString()}</p>
                                    <div className="flex items-center text-sm text-gray-500 space-x-2">
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 010-1.848l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                            </svg>
                                            {elemento.bedrooms} hab
                                        </span>
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                            </svg>
                                            {elemento.bathrooms} baños
                                        </span>
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                                            </svg>
                                            {elemento.sqm} m²
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Flechas de Navegacion */}
            {mostrarFlechas && element.length > slidesParaMostrar && (
                <>
                    <button
                        onClick={slideAnterior}
                        aria-label="Slide anterior"
                        className="absolute md:-left-12 -left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl z-10 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                    >
                        <ArrowLeftCircleIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={siguienteSlide}
                        aria-label="Slide siguiente"
                        className="absolute md:-right-12 -right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl z-10 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                    >
                        <ArrowRightCircleIcon className="w-6 h-6" />
                    </button>
                </>
            )}
            {/* Puntos de Navegacion */}
            {mostrarPuntos && element.length > slidesParaMostrar && (
                <div className="flex justify-center mt-8 space-x-3" role="tablist" aria-label="Indicadores de slide">
                    {Array.from({ length: element.length - slidesParaMostrar + 1 }).map((_, index) => (
                        <button
                            key={index}
                            aria-label={`Ir al slide ${index + 1}`}
                            role="tab"
                            aria-selected={index === indiceActual}
                            onClick={() => irASlide(index)}
                            className={`w-4 h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${index === indiceActual
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 scale-125 shadow-lg'
                                : 'bg-gray-300 hover:bg-indigo-400 hover:scale-110'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>

    )
}

export default Carousel