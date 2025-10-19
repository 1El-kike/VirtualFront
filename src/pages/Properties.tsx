import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import type { Property } from '../types';
import Filters from '../components/Filters';
import PropertyCard from '../components/PropertyCard';

interface FiltersForm {
    location: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: string;
    minSqm: number;
    maxSqm: number;
}

const Properties: React.FC = () => {
    const [filters, setFilters] = useState<FiltersForm>({
        location: '',
        minPrice: 0,
        maxPrice: 1000000,
        bedrooms: '',
        minSqm: 0,
        maxSqm: 500,
    });
    const [page, setPage] = useState(1);
    const limit = 12;

    const { data, isLoading, error } = useQuery({
        queryKey: ['properties', filters, page],
        queryFn: async () => {
            console.log('Iniciando carga de propiedades con filtros:', filters, 'página:', page);
            const params = {
                location: filters.location || undefined,
                minPrice: filters.minPrice || undefined,
                maxPrice: filters.maxPrice || undefined,
                bedrooms: filters.bedrooms || undefined,
                minSqm: filters.minSqm || undefined,
                maxSqm: filters.maxSqm || undefined,
                page,
                limit,
            };
            console.log('Parámetros de la solicitud:', params);
            try {
                const response = await api.get('/properties', { params });
                console.log('Respuesta del backend:', response);
                return response.data as { properties: Property[]; total: number };
            } catch (err) {
                console.error('Error en la solicitud:', err);
                throw err;
            }
        },
    });

    const handleFiltersSubmit = (data: FiltersForm) => {
        setFilters(data);
        setPage(1);
    };

    const handleClearFilters = () => {
        setFilters({
            location: '',
            minPrice: 0,
            maxPrice: 1000000,
            bedrooms: '',
            minSqm: 0,
            maxSqm: 500,
        });
        setPage(1);
    };

    const totalPages = data ? Math.ceil(data.total / limit) : 0;


    console.log(data)
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Propiedades</h1>
                <Filters onSubmit={handleFiltersSubmit} onClear={handleClearFilters} />
                {isLoading && <p className="text-center">Cargando...</p>}
                {error && <p className="text-center text-red-500">Error al cargar propiedades.</p>}
                {data && (
                    <>
                        {(() => console.log('Properties array:', data?.properties))()}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {data?.properties?.map((property) => {
                                console.log('Rendering property:', property.id);
                                return <PropertyCard key={property.id} property={property} />;
                            })}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex justify-center space-x-2">
                                <button
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                                >
                                    Anterior
                                </button>
                                <span className="px-4 py-2">Página {page} de {totalPages}</span>
                                <button
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Properties;