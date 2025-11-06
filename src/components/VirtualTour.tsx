import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Html } from '@react-three/drei';

// Interfaz para definir la estructura de una habitación en el tour virtual
// Permite reutilizar el componente con diferentes conjuntos de habitaciones
export interface Room {
    name: string;
    path: string;
}

// Props del componente VirtualTour para hacerlo reutilizable
interface VirtualTourProps {
    rooms: Room[];
}

// Componente funcional principal para el tour virtual, ahora reutilizable
const VirtualTour: React.FC<VirtualTourProps> = ({ rooms }) => {
    // Estado para controlar la habitación actual mediante su índice en el array rooms
    const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

    // Función para cambiar a la habitación anterior
    const goToPreviousRoom = () => {
        setCurrentRoomIndex((prev) => (prev === 0 ? rooms.length - 1 : prev - 1));
    };

    // Función para cambiar a la habitación siguiente
    const goToNextRoom = () => {
        setCurrentRoomIndex((prev) => (prev === rooms.length - 1 ? 0 : prev + 1));
    };

    // Función para ir directamente a una habitación específica por índice
    const goToRoom = (index: number) => {
        setCurrentRoomIndex(index);
    };

    // Componente interno que representa la esfera panorámica
    // Se define dentro del componente padre para acceder al estado currentRoomIndex
    const PanoramaSphere: React.FC = () => {
        // useTexture carga la textura de la habitación actual de manera lazy
        // Callback configura la textura: anisotropy: 1 y generateMipmaps: false para ahorrar memoria GPU
        // Esto previene errores de Context Lost al limitar el uso de memoria
        const texture = useTexture(rooms[currentRoomIndex].path, (texture) => {
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
                {/* Suspense maneja la carga asíncrona de la textura, mostrando un fallback mientras carga */}
                <Suspense fallback={<Html><div>Cargando...</div></Html>}>
                    {/* Componente de la esfera panorámica que muestra la imagen 360 */}
                    <PanoramaSphere />
                </Suspense>
                {/* OrbitControls permite rotar la vista con el mouse para explorar la panorámica */}
                <OrbitControls makeDefault target={[0, 0, 0]} enablePan={false} enableZoom={false} enableRotate={true} />
            </Canvas>

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