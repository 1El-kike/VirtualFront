import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Select, SelectItem, addToast } from '@heroui/react';
import { XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import type { Property } from '../../../types';
import api from '../../../utils/api';

interface PropertyEditModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    property: Property | null;
    onPropertyUpdated: () => void;
}

export const PropertyEditModal: React.FC<PropertyEditModalProps> = ({
    isOpen,
    onOpenChange,
    property,
    onPropertyUpdated
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        sqm: '',
        type: '',
        transation: '',
        status: '',
        virtualTourUrl: ''
    });
    const [images, setImages] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (property) {
            setFormData({
                title: property.title || '',
                description: property.description || '',
                location: property.location || '',
                price: property.price?.toString() || '',
                bedrooms: property.bedrooms?.toString() || '',
                bathrooms: property.bathrooms?.toString() || '',
                sqm: property.sqm?.toString() || '',
                type: property.type || '',
                transation: property.transation || '',
                status: property.status || '',
                virtualTourUrl: property.virtualTourUrl || ''
            });
        }
    }, [property]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!property) return;

        // Verificar si se han realizado cambios
        const hasChanges =
            formData.title !== (property.title || '') ||
            formData.description !== (property.description || '') ||
            formData.location !== (property.location || '') ||
            formData.price !== (property.price?.toString() || '') ||
            formData.bedrooms !== (property.bedrooms?.toString() || '') ||
            formData.bathrooms !== (property.bathrooms?.toString() || '') ||
            formData.sqm !== (property.sqm?.toString() || '') ||
            formData.virtualTourUrl !== (property.virtualTourUrl || '') ||
            formData.type !== (property.type || '') ||
            formData.status !== (property.status || '') ||
            formData.transation !== (property.transation || '') ||
            images.length > 0;

        if (!hasChanges) {
            addToast({
                title: "⚠️ Sin cambios",
                description: "No se han realizado modificaciones en la propiedad",
                color: "warning",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            });
            return;
        }

        setIsLoading(true);
        try {
            const formDataToSend = new FormData();

            // Agregar campos de texto
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    if (typeof value === 'string' && value.trim() !== '') {
                        formDataToSend.append(key, value.trim());
                    } else if (typeof value === 'number' || typeof value === 'string') {
                        formDataToSend.append(key, String(value));
                    }
                }
            });

            // Agregar imágenes solo si hay imágenes seleccionadas
            if (images.length > 0) {
                images.forEach((image) => {
                    formDataToSend.append('images', image);
                });
            }

            await api.put(`/properties/${property.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Mostrar toast de éxito usando HeroUI
            addToast({
                title: "✅ Éxito",
                description: "Propiedad actualizada exitosamente",
                color: "success",
                timeout: 4000,
                shouldShowTimeoutProgress: true,
            });

            onPropertyUpdated();
            onOpenChange(false);
        } catch (error) {
            console.error('Error updating property:', error);

            const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al actualizar la propiedad';

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

    const propertyTypes = [
        { value: 'CASA', label: 'Casa' },
        { value: 'APARTAMENTO', label: 'Apartamento' },
        { value: 'TERRENO', label: 'Terreno' },
        { value: 'LOCAL_COMERCIAL', label: 'Local Comercial' },
        { value: 'OFICINA', label: 'Oficina' }
    ];

    const transactionTypes = [
        { value: 'VENTA', label: 'Venta' },
        { value: 'RENTA', label: 'Renta' },
        { value: 'PERMUTA', label: 'Permuta' },
        { value: 'VENTA_O_RENTA', label: 'Venta o Renta' },
        { value: 'VENTA_O_PERMUTA', label: 'Venta o Permuta' },
        { value: 'TODAS', label: 'Todas' }
    ];

    const statusTypes = [
        { value: 'DISPONIBLE', label: 'Disponible' },
        { value: 'RENTADA', label: 'Rentada' },
        { value: 'VENDIDA', label: 'Vendida' },
        { value: 'RESERVADA', label: 'Reservada' },
        { value: 'EN_CONTRUCCION', label: 'En Construcción' },
        { value: 'EN_REMODELACION', label: 'En Remodelación' }
    ];

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
                    <form onSubmit={handleSubmit}>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold">Editar Propiedad</h2>
                            <p className="text-sm text-gray-600">{property.title}</p>
                        </ModalHeader>

                        <ModalBody className="max-h-[70vh] overflow-y-auto">
                            <div className="space-y-8">
                                {/* Header Section */}
                                <div className="text-center pb-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">Editar Propiedad</h3>
                                    <p className="text-sm text-gray-600 mt-1">Modifica los detalles de la propiedad</p>
                                </div>

                                {/* Información Básica */}
                                <div className="space-y-4">
                                    <h4 className="text-md font-medium text-gray-800 flex items-center gap-2">
                                        <div className="w-1 h-4 bg-blue-500 rounded"></div>
                                        Información Básica
                                    </h4>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-3">
                                        <Input
                                            label="Título de la Propiedad"
                                            placeholder="Ej: Casa moderna en zona residencial"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            required
                                            className="w-full"
                                        />
                                        <Input
                                            label="Ubicación"
                                            placeholder="Ej: Calle Principal 123, Ciudad"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            required
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Características Económicas */}
                                <div className="space-y-4">
                                    <h4 className="text-md font-medium text-gray-800 flex items-center gap-2">
                                        <div className="w-1 h-4 bg-green-500 rounded"></div>
                                        Características Económicas
                                    </h4>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pl-3">
                                        <Input
                                            label="Precio (€)"
                                            placeholder="0"
                                            type="number"
                                            startContent={<span className="text-gray-500">€</span>}
                                            value={formData.price}
                                            onChange={(e) => handleInputChange('price', e.target.value)}
                                            required
                                            className="w-full"
                                        />
                                        <Input
                                            label="Área (m²)"
                                            placeholder="0"
                                            type="number"
                                            startContent={<span className="text-gray-500">m²</span>}
                                            value={formData.sqm}
                                            onChange={(e) => handleInputChange('sqm', e.target.value)}
                                            required
                                            className="w-full"
                                        />
                                        <Input
                                            label="Tour Virtual URL"
                                            placeholder="https://ejemplo.com/tour"
                                            value={formData.virtualTourUrl}
                                            onChange={(e) => handleInputChange('virtualTourUrl', e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Características Físicas */}
                                <div className="space-y-4">
                                    <h4 className="text-md font-medium text-gray-800 flex items-center gap-2">
                                        <div className="w-1 h-4 bg-purple-500 rounded"></div>
                                        Características Físicas
                                    </h4>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pl-3">
                                        <Input
                                            label="Número de Dormitorios"
                                            placeholder="0"
                                            type="number"
                                            value={formData.bedrooms}
                                            onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                                            required
                                            className="w-full"
                                        />
                                        <Input
                                            label="Número de Baños"
                                            placeholder="0"
                                            type="number"
                                            value={formData.bathrooms}
                                            onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                                            required
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Clasificación y Estado */}
                                <div className="space-y-4">
                                    <h4 className="text-md font-medium text-gray-800 flex items-center gap-2">
                                        <div className="w-1 h-4 bg-orange-500 rounded"></div>
                                        Clasificación y Estado
                                    </h4>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pl-3">
                                        <Select
                                            label="Tipo de Propiedad"
                                            placeholder="Selecciona el tipo"
                                            selectedKeys={formData.type ? [formData.type] : []}
                                            onSelectionChange={(keys) => {
                                                const selected = Array.from(keys)[0] as string;
                                                handleInputChange('type', selected);
                                            }}
                                            required
                                            className="w-full"
                                        >
                                            {propertyTypes.map((type) => (
                                                <SelectItem key={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Select
                                            label="Tipo de Transacción"
                                            placeholder="Selecciona la transacción"
                                            selectedKeys={formData.transation ? [formData.transation] : []}
                                            onSelectionChange={(keys) => {
                                                const selected = Array.from(keys)[0] as string;
                                                handleInputChange('transation', selected);
                                            }}
                                            required
                                            className="w-full"
                                        >
                                            {transactionTypes.map((type) => (
                                                <SelectItem key={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Select
                                            label="Estado Actual"
                                            placeholder="Selecciona el estado"
                                            selectedKeys={formData.status ? [formData.status] : []}
                                            onSelectionChange={(keys) => {
                                                const selected = Array.from(keys)[0] as string;
                                                handleInputChange('status', selected);
                                            }}
                                            required
                                            className="w-full"
                                        >
                                            {statusTypes.map((status) => (
                                                <SelectItem key={status.value}>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                {/* Descripción */}
                                <div className="space-y-4">
                                    <h4 className="text-md font-medium text-gray-800 flex items-center gap-2">
                                        <div className="w-1 h-4 bg-indigo-500 rounded"></div>
                                        Descripción Detallada
                                    </h4>
                                    <div className="pl-3">
                                        <Textarea
                                            label="Descripción de la Propiedad"
                                            placeholder="Describe detalladamente la propiedad, sus características especiales, ubicación, comodidades, etc."
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            minRows={4}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Imágenes */}
                                <div className="space-y-4">
                                    <h4 className="text-md font-medium text-gray-800 flex items-center gap-2">
                                        <div className="w-1 h-4 bg-pink-500 rounded"></div>
                                        Imágenes de la Propiedad
                                    </h4>
                                    <div className="pl-3">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <CloudArrowUpIcon className="w-10 h-10 mb-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                        <p className="mb-2 text-sm text-gray-600 group-hover:text-gray-800">
                                                            <span className="font-semibold">Haz clic para subir imágenes</span>
                                                        </p>
                                                        <p className="text-xs text-gray-500 group-hover:text-gray-700">
                                                            PNG, JPG, GIF hasta 10MB cada uno
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            Puedes seleccionar múltiples archivos
                                                        </p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        multiple
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                            </div>
                                            {images.length > 0 && (
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                    <p className="text-sm text-blue-800 font-medium">
                                                        ✅ {images.length} imagen(es) seleccionada(s) para subir
                                                    </p>
                                                    <p className="text-xs text-blue-600 mt-1">
                                                        Las imágenes se agregarán a las existentes
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                                startContent={<XMarkIcon className="w-4 h-4" />}
                                disabled={isLoading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                color="primary"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};