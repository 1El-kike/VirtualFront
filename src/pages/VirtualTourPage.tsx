import React from 'react';
import VirtualTour from '../components/VirtualTour';
import { useVirtualTours } from '../hooks/useVirtualTours';

const VirtualTourPage: React.FC = () => {
    const { rooms, loading, error } = useVirtualTours();

    if (loading) {
        return <div>Cargando tour virtual...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Tour Virtual de la Casa</h1>
            <VirtualTour rooms={rooms} />
        </div>
    );
};

export default VirtualTourPage;