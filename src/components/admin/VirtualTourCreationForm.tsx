import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button, Input, Autocomplete, AutocompleteItem, addToast, Textarea } from '@heroui/react';
import { PlusIcon, EyeIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import api from '../../utils/api';
import type { Property } from '../../types';

interface VirtualTourCreationFormProps {
    onTourCreated: () => void;
}

interface VirtualRoomForm {
    id: string;
    name: string;
    description: string;
    imageFile: File | null;
    imagePreview: string;
    connections: string[]; // IDs de habitaciones conectadas
    hotspotPositions: { [key: string]: { top: string; left: string } };
}

export const VirtualTourCreationForm: React.FC<VirtualTourCreationFormProps> = ({
    onTourCreated
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState('');
    const [availableProperties, setAvailableProperties] = useState<Property[]>([]);
    const [rooms, setRooms] = useState<VirtualRoomForm[]>([]);

    useEffect(() => {
        if (isExpanded) {
            loadAvailableProperties();
        }
    }, [isExpanded]);

    const loadAvailableProperties = async () => {
        try {
            const response = await api.get('/properties/');
            setAvailableProperties(response.data);
        } catch (error) {
            console.error('Error loading properties:', error);
        }
    };

    const addRoom = () => {
        const newRoom: VirtualRoomForm = {
            id: `room-${Date.now()}`,
            name: '',
            description: '',
            imageFile: null,
            imagePreview: '',
            connections: [],
            hotspotPositions: {}
        };
        setRooms(prev => [...prev, newRoom]);
    };

    const updateRoom = (roomId: string, updates: Partial<VirtualRoomForm>) => {
        setRooms(prev => prev.map(room =>
            room.id === roomId ? { ...room, ...updates } : room
        ));
    };

    const removeRoom = (roomId: string) => {
        setRooms(prev => prev.filter(room => room.id !== roomId));
    };

    const moveRoom = (fromIndex: number, toIndex: number) => {
        const newRooms = [...rooms];
        const [moved] = newRooms.splice(fromIndex, 1);
        newRooms.splice(toIndex, 0, moved);
        setRooms(newRooms);
    };

    const handleImageUpload = (roomId: string, file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            updateRoom(roomId, {
                imageFile: file,
                imagePreview: e.target?.result as string
            });
        };
        reader.readAsDataURL(file);
    };

    const addConnection = (fromRoomId: string, toRoomId: string) => {
        const fromRoom = rooms.find(r => r.id === fromRoomId);
        if (fromRoom && !fromRoom.connections.includes(toRoomId)) {
            updateRoom(fromRoomId, {
                connections: [...fromRoom.connections, toRoomId]
            });
        }
    };

    const removeConnection = (fromRoomId: string, toRoomId: string) => {
        const fromRoom = rooms.find(r => r.id === fromRoomId);
        if (fromRoom) {
            updateRoom(fromRoomId, {
                connections: fromRoom.connections.filter(id => id !== toRoomId)
            });
        }
    };

    const resetForm = () => {
        setSelectedPropertyId('');
        setRooms([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPropertyId || rooms.length === 0) {
            addToast({
                title: "⚠️ Error de Validación",
                description: "Selecciona una propiedad y agrega al menos una habitación",
                color: "warning",
                timeout: 4000,
            });
            return;
        }

        setIsLoading(true);

        try {
            // Crear habitaciones en orden
            for (let i = 0; i < rooms.length; i++) {
                const room = rooms[i];

                if (!room.name || !room.imageFile) {
                    throw new Error(`Habitación ${i + 1}: nombre e imagen requeridos`);
                }

                const formData = new FormData();
                formData.append('name', room.name);
                formData.append('description', room.description || '');
                formData.append('image', room.imageFile); // El backend manejará la subida
                formData.append('propertyId', selectedPropertyId);
                formData.append('connections', JSON.stringify(room.connections));
                formData.append('hotspotPositions', JSON.stringify(room.hotspotPositions));

                await api.post('/virtual-tours', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            addToast({
                title: "✅ Éxito",
                description: "Tour virtual creado exitosamente",
                color: "success",
                timeout: 4000,
            });

            resetForm();
            setIsExpanded(false);
            onTourCreated();

        } catch (error) {
            console.error('Error creating virtual tour:', error);
            const errorMessage = (error as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Error al crear el tour virtual';

            addToast({
                title: "❌ Error",
                description: errorMessage,
                color: "danger",
                timeout: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="mb-6 border-2 border-dashed border-purple-300 hover:border-purple-400 transition-colors">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                            <EyeIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Crear Tour Virtual
                            </h3>
                            <p className="text-sm text-gray-600">
                                Diseña un tour virtual inmersivo para una propiedad
                            </p>
                        </div>
                    </div>
                    <Button
                        isIconOnly
                        variant="light"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <PlusIcon className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-45' : ''}`} />
                    </Button>
                </div>
            </CardHeader>

            {isExpanded && (
                <CardBody className="pt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Selección de propiedad */}
                        <div className="space-y-4">
                            <h4 className="text-md font-medium text-gray-900 flex items-center gap-2">
                                <MapPinIcon className="w-4 h-4" />
                                Seleccionar Propiedad
                            </h4>
                            <Autocomplete
                                label="Propiedad"
                                placeholder="Selecciona la propiedad para el tour virtual"
                                selectedKey={selectedPropertyId}
                                onSelectionChange={(key) => setSelectedPropertyId(key as string)}
                                required
                            >
                                {availableProperties.map((property) => (
                                    <AutocompleteItem key={property.id.toString()}>
                                        {`${property.title} - ${property.location}`}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>

                        {/* Gestión de habitaciones */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-md font-medium text-gray-900 flex items-center gap-2">
                                    <EyeIcon className="w-4 h-4" />
                                    Habitaciones del Tour ({rooms.length})
                                </h4>
                                <Button
                                    type="button"
                                    size="sm"
                                    color="secondary"
                                    variant="flat"
                                    onClick={addRoom}
                                    startContent={<PlusIcon className="w-4 h-4" />}
                                >
                                    Agregar Habitación
                                </Button>
                            </div>

                            {rooms.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <EyeIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    <p>No hay habitaciones agregadas</p>
                                    <p className="text-sm">Haz clic en "Agregar Habitación" para comenzar</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {rooms.map((room, index) => (
                                        <Card key={room.id} className="border border-gray-200">
                                            <CardBody className="p-4">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                                                            {index + 1}
                                                        </span>
                                                        <h5 className="font-medium text-gray-900">Habitación {index + 1}</h5>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="light"
                                                            onClick={() => moveRoom(index, Math.max(0, index - 1))}
                                                            disabled={index === 0}
                                                            className="p-1"
                                                        >
                                                            ↑
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="light"
                                                            onClick={() => moveRoom(index, Math.min(rooms.length - 1, index + 1))}
                                                            disabled={index === rooms.length - 1}
                                                            className="p-1"
                                                        >
                                                            ↓
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            color="danger"
                                                            variant="light"
                                                            onClick={() => removeRoom(room.id)}
                                                            className="p-1"
                                                        >
                                                            ✕
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                    <Input
                                                        label="Nombre de la Habitación"
                                                        placeholder="ej: Sala Principal, Cocina, Dormitorio"
                                                        value={room.name}
                                                        onChange={(e) => updateRoom(room.id, { name: e.target.value })}
                                                        required
                                                    />
                                                    <Textarea
                                                        label="Descripción"
                                                        placeholder="Descripción de la habitación"
                                                        value={room.description}
                                                        onChange={(e) => updateRoom(room.id, { description: e.target.value })}
                                                        rows={2}
                                                    />
                                                </div>

                                                {/* Subida de imagen */}
                                                <div className="mt-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Imagen Panorámica 360°
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            title='file'
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) handleImageUpload(room.id, file);
                                                            }}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        />
                                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors bg-gradient-to-br from-gray-50 to-gray-100">
                                                            {room.imagePreview ? (
                                                                <div className="space-y-4">
                                                                    <img
                                                                        src={room.imagePreview}
                                                                        alt="Preview"
                                                                        className="max-h-32 mx-auto rounded-lg object-cover"
                                                                    />
                                                                    <p className="text-sm text-gray-600">
                                                                        {room.imageFile?.name}
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                                    <EyeIcon className="w-8 h-8 text-gray-400" />
                                                                    <p className="text-sm font-medium text-gray-900">
                                                                        Subir imagen panorámica
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        JPG, PNG hasta 10MB
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Conexiones */}
                                                <div className="mt-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Conexiones con otras habitaciones
                                                    </label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {rooms.filter(r => r.id !== room.id).map(otherRoom => (
                                                            <Button
                                                                key={otherRoom.id}
                                                                type="button"
                                                                size="sm"
                                                                variant={room.connections.includes(otherRoom.id) ? "solid" : "bordered"}
                                                                color={room.connections.includes(otherRoom.id) ? "success" : "default"}
                                                                onClick={() => {
                                                                    if (room.connections.includes(otherRoom.id)) {
                                                                        removeConnection(room.id, otherRoom.id);
                                                                    } else {
                                                                        addConnection(room.id, otherRoom.id);
                                                                    }
                                                                }}
                                                                className="text-xs"
                                                            >
                                                                {otherRoom.name || `Hab ${rooms.indexOf(otherRoom) + 1}`}
                                                                {room.connections.includes(otherRoom.id) && (
                                                                    <ArrowRightIcon className="w-3 h-3 ml-1" />
                                                                )}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button
                                type="button"
                                variant="light"
                                onClick={() => {
                                    resetForm();
                                    setIsExpanded(false);
                                }}
                                disabled={isLoading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                disabled={isLoading || !selectedPropertyId || rooms.length === 0}
                                startContent={!isLoading && <PlusIcon className="w-4 h-4" />}
                            >
                                {isLoading ? 'Creando Tour...' : 'Crear Tour Virtual'}
                            </Button>
                        </div>
                    </form>
                </CardBody>
            )}
        </Card>
    );
};