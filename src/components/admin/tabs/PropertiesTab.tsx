import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../utils/api';
import type { Property } from '../../../types';
import { LoadingState } from '../LoadingState';
import { ErrorState } from '../ErrorState';

export const PropertiesTab: React.FC = () => {
    const { data: properties, isLoading, error } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const response = await api.get('/properties/');
            return response.data as Property[];
        },
    });

    if (isLoading) return <LoadingState message="Cargando propiedades..." />;
    if (error) return <ErrorState message="Error al cargar propiedades" />;

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-8">Administración de Propiedades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties?.map((property) => (
                    <div key={property.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                            <p className="text-sm text-gray-500">
                                Estado: <span className={`font-medium ${property.status === 'DISPONIBLE' ? 'text-green-600' :
                                    property.status === 'RENTADA' ? 'text-blue-600' :
                                        property.status === 'VENDIDA' ? 'text-red-600' :
                                            property.status === 'RESERVADA' ? 'text-orange-600' :
                                                property.status === 'EN_CONTRUCCION' ? 'text-yellow-600' :
                                                    property.status === 'EN_REMODELACION' ? 'text-purple-600' :
                                                        'text-gray-600'
                                    }`}>{property.status}</span>
                            </p>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-600">{property.location}</p>
                            <p className="text-sm font-medium">€{property.price.toLocaleString()}</p>
                            <p className="text-sm">Tipo: {property.type}</p>
                            <p className="text-sm">Transacción: {property.transation}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-xs text-gray-500">
                                Habitaciones: {property.bedrooms} | Baños: {property.bathrooms}
                            </p>
                            <p className="text-xs text-gray-500">
                                Área: {property.sqm} m²
                            </p>
                        </div>

                        <div className="text-xs text-gray-500">
                            Creado: {new Date(property.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};