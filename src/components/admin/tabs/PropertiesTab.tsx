import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../utils/api';
import type { Property } from '../../../types';
import { LoadingState } from '../LoadingState';
import { ErrorState } from '../ErrorState';
import { Card, CardBody, Chip, Button } from '@heroui/react';
import { EyeIcon, PencilIcon, TrashIcon, MapPinIcon, HomeIcon, CurrencyEuroIcon } from '@heroicons/react/24/outline';
import { PropertyDetailModal } from '../modals/PropertyDetailModal';
import { PropertyEditModal } from '../modals/PropertyEditModal';
import { PropertyDeleteModal } from '../modals/PropertyDeleteModal';
import { useQueryClient } from '@tanstack/react-query';

export const PropertiesTab: React.FC = () => {
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: properties, isLoading, error } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const response = await api.get('/properties/');
            return response.data as Property[];
        },
    });

    const handleViewProperty = (property: Property) => {
        setSelectedProperty(property);
        setIsDetailModalOpen(true);
    };

    const handleEditProperty = (property: Property) => {
        setSelectedProperty(property);
        setIsEditModalOpen(true);
    };

    const handleDeleteProperty = (property: Property) => {
        setSelectedProperty(property);
        setIsDeleteModalOpen(true);
    };

    const handlePropertyUpdated = () => {
        queryClient.invalidateQueries({ queryKey: ['properties'] });
    };

    const handlePropertyDeleted = () => {
        queryClient.invalidateQueries({ queryKey: ['properties'] });
    };


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'DISPONIBLE': return 'success';
            case 'RENTADA': return 'primary';
            case 'VENDIDA': return 'danger';
            case 'RESERVADA': return 'warning';
            case 'EN_CONTRUCCION': return 'secondary';
            case 'EN_REMODELACION': return 'secondary';
            default: return 'default';
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'DISPONIBLE': return 'solid';
            case 'RENTADA': return 'flat';
            case 'VENDIDA': return 'flat';
            case 'RESERVADA': return 'flat';
            case 'EN_CONTRUCCION': return 'flat';
            case 'EN_REMODELACION': return 'flat';
            default: return 'flat';
        }
    };

    if (isLoading) return <LoadingState message="Cargando propiedades..." />;
    if (error) return <ErrorState message="Error al cargar propiedades" />;

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Administración de Propiedades</h2>
                <p className="text-gray-600">Gestiona todas las propiedades inmobiliarias del sistema</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {properties?.map((property) => (
                    <Card
                        key={property.id}
                        className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        shadow="sm"
                    >
                        {/* Background Image with Gradient Overlay */}
                        <div className="relative h-48 overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: property.images && property.images.length > 0
                                        ? `url(${import.meta.env.VITE_BACKEND_URL}${property.images[0]})`
                                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                }}
                            />
                            {/* Beautiful Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            {/* Status Badge */}
                            <div className="absolute top-3 right-3">
                                <Chip
                                    color={getStatusColor(property.status)}
                                    variant={getStatusVariant(property.status)}
                                    size="sm"
                                    className="text-white font-medium"
                                >
                                    {property.status}
                                </Chip>
                            </div>

                            {/* Price Badge */}
                            <div className="absolute bottom-3 left-3">
                                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1">
                                    <CurrencyEuroIcon className="w-4 h-4 text-gray-700" />
                                    <span className="font-bold text-gray-800">
                                        {property.price.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <CardBody className="p-4">
                            <div className="space-y-3">
                                {/* Title and Location */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                                        {property.title}
                                    </h3>
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <MapPinIcon className="w-4 h-4" />
                                        <span className="truncate">{property.location}</span>
                                    </div>
                                </div>

                                {/* Property Details */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <HomeIcon className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-700">{property.type}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-gray-500">{property.transation}</span>
                                    </div>
                                </div>

                                {/* Specifications */}
                                <div className="flex justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                                    <div className="text-center">
                                        <div className="font-medium text-gray-900">{property.bedrooms}</div>
                                        <div className="text-xs">Dorms</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-medium text-gray-900">{property.bathrooms}</div>
                                        <div className="text-xs">Baños</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-medium text-gray-900">{property.sqm}</div>
                                        <div className="text-xs">m²</div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        size="sm"
                                        variant="light"
                                        color="primary"
                                        className="flex-1"
                                        startContent={<EyeIcon className="w-4 h-4" />}
                                        onClick={() => handleViewProperty(property)}
                                    >
                                        Ver
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="light"
                                        color="secondary"
                                        className="flex-1"
                                        startContent={<PencilIcon className="w-4 h-4" />}
                                        onClick={() => handleEditProperty(property)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="light"
                                        color="danger"
                                        startContent={<TrashIcon className="w-4 h-4" />}
                                        onClick={() => handleDeleteProperty(property)}
                                    >
                                        Eliminar
                                    </Button>
                                </div>

                                {/* Created Date */}
                                <div className="text-xs text-gray-500 text-center pt-2 border-t">
                                    Creado: {new Date(property.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {properties?.length === 0 && (
                <div className="text-center py-12">
                    <HomeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay propiedades</h3>
                    <p className="text-gray-500">Aún no se han registrado propiedades en el sistema.</p>
                </div>
            )}

            {/* Property Detail Modal */}
            <PropertyDetailModal
                isOpen={isDetailModalOpen}
                onOpenChange={setIsDetailModalOpen}
                property={selectedProperty}
            />

            {/* Property Edit Modal */}
            <PropertyEditModal
                isOpen={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                property={selectedProperty}
                onPropertyUpdated={handlePropertyUpdated}
            />

            {/* Property Delete Modal */}
            <PropertyDeleteModal
                isOpen={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                property={selectedProperty}
                onPropertyDeleted={handlePropertyDeleted}
            />
        </div>
    );
};