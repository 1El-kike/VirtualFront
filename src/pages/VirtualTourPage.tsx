import React from 'react';
import VirtualTour from '../components/VirtualTour';
import type { Room } from '../components/VirtualTour';

// Definición de las habitaciones para el tour virtual de la casa
// Se pueden cambiar o agregar más habitaciones según sea necesario
const houseRooms: Room[] = [
    { name: 'Sala', path: '/assets/casa/sala1.jpg' },
    { name: 'Cocina', path: '/assets/casa/cocina_comedor1.jpg' },
    { name: 'Terraza', path: '/assets/casa/terraza.jpg' },
    { name: 'Baño', path: '/assets/casa/bano.jpg' },
    { name: 'Cuarto 1', path: '/assets/casa/cuarto1.jpg' },
    { name: 'Cuarto 2', path: '/assets/casa/cuarto2.jpg' },
    { name: 'Cuarto 3', path: '/assets/casa/cuarto3.jpg' },
];

const VirtualTourPage: React.FC = () => {
    return (
        <div>
            <h1>Tour Virtual de la Casa</h1>
            <VirtualTour rooms={houseRooms} />
        </div>
    );
};

export default VirtualTourPage;