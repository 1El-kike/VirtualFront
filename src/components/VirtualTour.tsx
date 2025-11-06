import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Html } from '@react-three/drei';

// Interfaz para definir la estructura de una habitación en el tour virtual
// Permite reutilizar el componente con diferentes conjuntos de habitaciones
export interface Room {
    id: number;
    name: string;
    imageUrl: string;
    connections?: number[];
    hotspotPositions?: { [key: string]: { top: string; left: string } };
}

// Props del componente VirtualTour para hacerlo reutilizable
interface VirtualTourProps {
    rooms: Room[];
}

// Componente funcional principal para el tour virtual, ahora reutilizable
const VirtualTour: React.FC<VirtualTourProps> = ({ rooms }) => {
    // Estado para controlar la habitación actual mediante su índice en el array rooms
    const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
    // Estado para manejar transiciones elegantes entre habitaciones
    const [isTransitioning, setIsTransitioning] = useState(false);


    // Función para cambiar a la habitación anterior con transición elegante
    const goToPreviousRoom = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentRoomIndex((prev) => (prev === 0 ? rooms.length - 1 : prev - 1));
            setIsTransitioning(false);
        }, 500);
    };

    // Función para cambiar a la habitación siguiente con transición elegante
    const goToNextRoom = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentRoomIndex((prev) => (prev === rooms.length - 1 ? 0 : prev + 1));
            setIsTransitioning(false);
        }, 500);
    };

    // Función para ir directamente a una habitación específica por índice con transición elegante
    const goToRoom = (index: number) => {
        if (index !== currentRoomIndex) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentRoomIndex(index);
                setIsTransitioning(false);
            }, 500);
        }
    };

    // Componente interno que representa la esfera panorámica
    // Se define dentro del componente padre para acceder al estado currentRoomIndex
    const PanoramaSphere: React.FC = () => {
        // useTexture carga la textura de la habitación actual de manera lazy
        // Callback configura la textura: anisotropy: 1 y generateMipmaps: false para ahorrar memoria GPU
        // Esto previene errores de Context Lost al limitar el uso de memoria
        const texture = useTexture(rooms[currentRoomIndex]?.imageUrl || '', (texture) => {
            texture.anisotropy = 1;
            texture.generateMipmaps = false;
        });

        return (
            // Mesh que representa la esfera con la textura aplicada
            <mesh>
                {/* Geometría esférica con radio 500 para envolver completamente la vista y crear inmersión realista */}
                <sphereGeometry args={[500, 60, 40]} />
                {/* Material básico con la textura aplicada y side: BackSide para ver desde dentro */}
                <meshBasicMaterial map={texture} side={2} /> {/* side={2} es BackSide */}
            </mesh>
        );
    };

    return (
        // Contenedor principal del tour virtual con altura y ancho completo
        <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
            {/* Canvas de Three.js donde se renderiza la escena 3D */}
            <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 0.1], near: 0.1, far: 1000, fov: 75 }}>
                {/* Luz ambiental para iluminar la escena (aunque no es crítica para texturas) */}
                <ambientLight intensity={0.5} />
                {/* Solo renderizar si hay habitaciones y una habitación actual */}
                {rooms.length > 0 && rooms[currentRoomIndex] && (
                    <Suspense fallback={<Html><div>Cargando...</div></Html>}>
                        {/* Componente de la esfera panorámica que muestra la imagen 360 */}
                        <PanoramaSphere />
                        {/* Hotspots fijos en posiciones 3D que se mueven con la escena */}
                        {rooms[currentRoomIndex]?.connections?.map((connectedIndex: number) => {
                            const pos = rooms[currentRoomIndex]?.hotspotPositions?.[`${currentRoomIndex}-${connectedIndex}`];
                            if (!pos || !rooms[connectedIndex]) return null;
                            // Convertir porcentajes a coordenadas 3D (para esfera, pero adaptado)
                            // Para esfera, posiciones en superficie
                            const radius = 490; // Casi en la superficie
                            const theta = (parseFloat(pos.left) / 100) * Math.PI * 2; // Horizontal
                            const phi = (parseFloat(pos.top) / 100) * Math.PI; // Vertical
                            const x = radius * Math.sin(phi) * Math.cos(theta);
                            const y = radius * Math.cos(phi);
                            const z = radius * Math.sin(phi) * Math.sin(theta);
                            return (
                                <Html
                                    key={`hotspot-${currentRoomIndex}-${connectedIndex}`}
                                    position={[x, y, z]}
                                    center
                                >
                                    <div
                                        onClick={() => goToRoom(connectedIndex)}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            boxShadow: '0 0 15px rgba(0,0,0,0.7)',
                                            transition: 'all 0.3s ease',
                                            border: '2px solid rgba(0,0,0,0.3)',
                                            pointerEvents: 'auto'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.2)';
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                                        }}
                                        title={`Ir a ${rooms[connectedIndex].name}`}
                                    >
                                        <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#333' }}>
                                            {rooms[connectedIndex].name}
                                        </span>
                                    </div>
                                </Html>
                            );
                        })}
                    </Suspense>
                )}
                {/* OrbitControls permite rotar la vista con el mouse para explorar la panorámica */}
                <OrbitControls makeDefault target={[0, 0, 0]} enablePan={false} enableZoom={false} enableRotate={true} />
            </Canvas>

            {/* Capa de transición elegante entre habitaciones */}
            {isTransitioning && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    zIndex: 10,
                    transition: 'opacity 0.5s ease-in-out'
                }}>
                    Cambiando de habitación...
                </div>
            )}

            {/* Controles de navegación fuera del Canvas para cambiar entre habitaciones */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.5)',
                padding: '10px',
                borderRadius: '10px'
            }}>
                {/* Botón para ir a la habitación anterior */}
                <button onClick={goToPreviousRoom} style={{ padding: '10px', background: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    ← Anterior
                </button>

                {/* Lista de botones para ir directamente a cada habitación */}
                {rooms.map((room, index) => (
                    <button
                        key={index}
                        onClick={() => goToRoom(index)}
                        style={{
                            padding: '10px',
                            background: index === currentRoomIndex ? 'lightblue' : 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {room.name}
                    </button>
                ))}

                {/* Botón para ir a la habitación siguiente */}
                <button onClick={goToNextRoom} style={{ padding: '10px', background: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Siguiente →
                </button>
            </div>

        </div>
    );
};

export default VirtualTour;