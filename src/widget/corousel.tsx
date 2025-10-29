import { useEffect, useState, type FC } from "react"
import type { Property } from "../types";
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

interface TypeCorrusel {
    element: Property[];
    autoDeslizar: boolean;
    intervalo: number;
    mostrarPuntos: boolean;
    mostrarFlechas: boolean;
    className: string;
}

const Corousel: FC<TypeCorrusel> = ({
    element = [],
    autoDeslizar = true,
    intervalo = 4000,
    mostrarPuntos = true,
    mostrarFlechas = true,
    className = ""
}) => {

    const [indiceActual, setindiceActual] = useState(0);
    const [slidesParaMostrar, setslidesParaMostrar] = useState(1);

    //Detectar cambio de pantalla
    useEffect(() => {
        const actualizarSlides = () => {
            if (window.innerWidth >= 768) {
                setslidesParaMostrar(3);
            } else {
                setslidesParaMostrar(1)
            }
        };

        actualizarSlides()
        window.addEventListener("resize", actualizarSlides)

        return () => window.removeEventListener('resize', actualizarSlides)
    }, []);

    //Auto-deslizar
    useEffect(() => {
        if (autoDeslizar && element.length > slidesParaMostrar) {
            const intervaloId = setInterval(siguienteSlide, intervalo)
            return () => clearInterval(intervaloId)
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indiceActual, autoDeslizar, intervalo, element.length, slidesParaMostrar])

    const siguienteSlide = () => {
        if (indiceActual < element.length - slidesParaMostrar) {
            setindiceActual(indiceActual + 1);
        } else {
            setindiceActual(0)
        }
    }


    const slideAnterior = () => {
        if (indiceActual > 0) {
            setindiceActual(indiceActual - 1);
        } else {
            setindiceActual(element.length - slidesParaMostrar)
        }
    }

    const irASlide = (indice: number) => {
        if (indice <= element.length - slidesParaMostrar && indice >= 0) {
            setindiceActual(indice)
        }
    }

    //calcula el ancho de cada slide basado en cuantos se muestran
    const anchoSlide = `${100 / slidesParaMostrar}%`

    return (
        <div className={`relative w-full ${className}`}>
            {/* Contenido principal */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${indiceActual * (100 / slidesParaMostrar)}%)`
                    }}
                >
                    {element.map((elemento: Property, index: number) => (
                        <div
                            key={index}
                            className="flex-shrink-0 px-2 transition-all duration-300"
                            style={{ width: anchoSlide }}
                        >
                            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                {/* Image */}
                                {elemento.images && (
                                    <div className="h-48 md:h-56 overflow-hidden">
                                        <img
                                            src={elemento.images[0]}
                                            alt={elemento.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                {/* Contenido */}
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">{elemento.title}</h3>
                                    <p className="text-gray-600 mb-2">{elemento.location}</p>
                                    <p className="text-2xl font-bold text-blue-600">${elemento.price.toLocaleString()}</p>
                                    <p className="text-sm text-gray-500">{elemento.bedrooms} hab • {elemento.bathrooms} baños • {elemento.sqm} m²</p>
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
                        title="<"
                        className="absolute md:-left-10 -left-2 top-[40%] transform translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
                    >
                        <ArrowLeftCircleIcon />
                    </button>
                    <button
                        onClick={siguienteSlide}
                        title=">"
                        className="absolute   md:-right-10 -right-2 top-[40%] transform translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
                    >
                        <ArrowRightCircleIcon />
                    </button>
                </>
            )}
            {/* Puntos de Navegacion */}
            {mostrarPuntos && element.length > slidesParaMostrar && (
                <div className="flex justify-center mt-6  space-x-2">
                    {Array.from({ length: element.length - slidesParaMostrar + 1 }).map((_, index) => (
                        <button
                            key={index}
                            title="puntos"
                            onClick={() => irASlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === indiceActual
                                ? 'bg-blue-600 scale-125'
                                : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>

    )
}

export default Corousel