import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Image, Chip, Button } from '@heroui/react';
import { XMarkIcon, PencilIcon, MapPinIcon, CurrencyEuroIcon, HomeIcon } from '@heroicons/react/24/outline';
import type { Property } from '../../../types';

interface PropertyDetailModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    property: Property | null;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
    isOpen,
    onOpenChange,
    property
}) => {
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

    if (!property) return null;

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="4xl"
            scrollBehavior="inside"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <div className="flex items-center justify-between w-full">
                                <h2 className="text-xl font-bold">{property.title}</h2>
                                <Chip
                                    color={getStatusColor(property.status)}
                                    variant={getStatusVariant(property.status)}
                                    size="sm"
                                >
                                    {property.status}
                                </Chip>
                            </div>
                        </ModalHeader>

                        <ModalBody className="space-y-6">
                            {/* Image Gallery */}
                            {property.images && property.images.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Imágenes</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {property.images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <Image
                                                    src={`${import.meta.env.VITE_BACKEND_URL}${image}`}
                                                    alt={`${property.title} - Imagen ${index + 1}`}
                                                    className="w-full h-48 object-cover rounded-lg"
                                                    radius="lg"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Property Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Información General</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <MapPinIcon className="w-5 h-5 text-gray-500" />
                                                <span className="text-gray-700">{property.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CurrencyEuroIcon className="w-5 h-5 text-gray-500" />
                                                <span className="text-2xl font-bold text-blue-600">
                                                    {property.price.toLocaleString()} €
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <HomeIcon className="w-5 h-5 text-gray-500" />
                                                <span className="text-gray-700">{property.type}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Especificaciones</h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                                                <div className="text-sm text-gray-600">Dormitorios</div>
                                            </div>
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                                                <div className="text-sm text-gray-600">Baños</div>
                                            </div>
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-gray-900">{property.sqm}</div>
                                                <div className="text-sm text-gray-600">m²</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Detalles Adicionales</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Tipo de transacción:</span>
                                                <span className="font-medium">{property.transation}</span>
                                            </div>
                                            {property.virtualTourUrl && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Tour virtual:</span>
                                                    <a
                                                        href={property.virtualTourUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 underline"
                                                    >
                                                        Ver tour
                                                    </a>
                                                </div>
                                            )}
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Creado:</span>
                                                <span className="font-medium">
                                                    {new Date(property.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Actualizado:</span>
                                                <span className="font-medium">
                                                    {new Date(property.updatedAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {property.description && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">Descripción</h3>
                                            <p className="text-gray-700 leading-relaxed">{property.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                                startContent={<XMarkIcon className="w-4 h-4" />}
                            >
                                Cerrar
                            </Button>
                            <Button
                                color="primary"
                                startContent={<PencilIcon className="w-4 h-4" />}
                            >
                                Editar Propiedad
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};