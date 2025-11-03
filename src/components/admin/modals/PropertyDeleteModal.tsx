import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, addToast } from '@heroui/react';
import { ExclamationTriangleIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Property } from '../../../types';
import api from '../../../utils/api';

interface PropertyDeleteModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    property: Property | null;
    onPropertyDeleted: () => void;
}

export const PropertyDeleteModal: React.FC<PropertyDeleteModalProps> = ({
    isOpen,
    onOpenChange,
    property,
    onPropertyDeleted
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (!property) return;

        setIsLoading(true);
        try {
            await api.delete(`/properties/${property.id}`);

            // Mostrar toast de éxito usando HeroUI
            addToast({
                title: "✅ Eliminado",
                description: "Propiedad eliminada exitosamente",
                color: "success",
                timeout: 4000,
                shouldShowTimeoutProgress: true,
            });

            onPropertyDeleted();
            onOpenChange(false);
        } catch (error) {
            console.error('Error deleting property:', error);

            const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al eliminar la propiedad';

            // Mostrar toast de error usando HeroUI
            addToast({
                title: "❌ Error",
                description: errorMessage,
                color: "danger",
                timeout: 5000,
                shouldShowTimeoutProgress: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!property) return null;

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="md"
            backdrop="blur"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                                    <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Eliminar Propiedad</h2>
                                    <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
                                </div>
                            </div>
                        </ModalHeader>

                        <ModalBody>
                            <div className="space-y-4">
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-red-800">
                                                ¿Estás seguro de que quieres eliminar esta propiedad?
                                            </p>
                                            <div className="text-sm text-red-700 space-y-1">
                                                <p><strong>Propiedad:</strong> {property.title}</p>
                                                <p><strong>Ubicación:</strong> {property.location}</p>
                                                <p><strong>Precio:</strong> €{property.price?.toLocaleString()}</p>
                                            </div>
                                            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-3">
                                                <p className="text-xs text-yellow-800">
                                                    <strong>Advertencia:</strong> Esta acción eliminará permanentemente la propiedad y todas sus imágenes asociadas del sistema.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Detalles de la propiedad a eliminar:</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                        <div><strong>Tipo:</strong> {property.type}</div>
                                        <div><strong>Estado:</strong> {property.status}</div>
                                        <div><strong>Dormitorios:</strong> {property.bedrooms}</div>
                                        <div><strong>Baños:</strong> {property.bathrooms}</div>
                                        <div><strong>Área:</strong> {property.sqm} m²</div>
                                        <div><strong>Transacción:</strong> {property.transation}</div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                color="default"
                                variant="light"
                                onPress={onClose}
                                disabled={isLoading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                color="danger"
                                onPress={handleDelete}
                                disabled={isLoading}
                                startContent={!isLoading && <TrashIcon className="w-4 h-4" />}
                            >
                                {isLoading ? 'Eliminando...' : 'Eliminar Propiedad'}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};