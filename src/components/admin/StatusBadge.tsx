import React from 'react';

interface StatusBadgeProps {
    status: string;
    type?: 'swap' | 'rent' | 'reservation' | 'construction' | 'remodeling';
}

const getStatusColor = (status: string, type?: string) => {
    const statusColors: Record<string, Record<string, string>> = {
        swap: {
            PENDIENTE: 'text-yellow-600 bg-yellow-100',
            ACEPTADA: 'text-green-600 bg-green-100',
            RECHAZADA: 'text-red-600 bg-red-100',
            CANCELADA: 'text-gray-600 bg-gray-100',
        },
        rent: {
            ACTIVA: 'text-green-600 bg-green-100',
            FINALIZADA: 'text-blue-600 bg-blue-100',
            CANCELADA: 'text-red-600 bg-red-100',
        },
        reservation: {
            PENDIENTE: 'text-yellow-600 bg-yellow-100',
            CONFIRMADA: 'text-green-600 bg-green-100',
            CANCELADA: 'text-red-600 bg-red-100',
            COMPLETADA: 'text-blue-600 bg-blue-100',
        },
        construction: {
            PLANEACION: 'text-yellow-600 bg-yellow-100',
            EN_PROGRESO: 'text-blue-600 bg-blue-100',
            PAUSADA: 'text-orange-600 bg-orange-100',
            COMPLETADA: 'text-green-600 bg-green-100',
            CANCELADO: 'text-red-600 bg-red-100',
        },
        remodeling: {
            PENDIENTE: 'text-yellow-600 bg-yellow-100',
            EN_PROGRESO: 'text-blue-600 bg-blue-100',
            COMPLETADA: 'text-green-600 bg-green-100',
            CANCELADA: 'text-red-600 bg-red-100',
        },
    };

    return statusColors[type || 'default']?.[status] || 'text-gray-600 bg-gray-100';
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type }) => {
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status, type)}`}>
            {status}
        </span>
    );
};