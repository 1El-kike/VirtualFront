import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button, Input, Textarea, Autocomplete, AutocompleteItem, addToast } from '@heroui/react';
import { PlusIcon, HomeIcon, ArrowPathIcon, BuildingOfficeIcon, CalendarDaysIcon, CogIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import api from '../../utils/api';
import type { Property } from '../../types';

interface EntityCreationFormProps {
    activeTab: string;
    onEntityCreated: () => void;
}

export const EntityCreationForm: React.FC<EntityCreationFormProps> = ({
    activeTab,
    onEntityCreated
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Estados para diferentes formularios
    const [propertyForm, setPropertyForm] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        sqm: '',
        type: '',
        transation: '',
        status: 'DISPONIBLE',
        virtualTourUrl: ''
    });
    const [propertyImages, setPropertyImages] = useState<File[]>([]);

    const [swapForm, setSwapForm] = useState({
        description: '',
        userId: '',
        propertyofrecidaId: '',
        propertyDeseadaId: ''
    });

    const [rentForm, setRentForm] = useState({
        priceMensual: '',
        deposito: '',
        duracionContrato: '',
        FechaInit: '',
        serviceInclude: '',
        propertyId: '',
        userId: ''
    });

    const [reservationForm, setReservationForm] = useState({
        fechaReservation: '',
        fechaVisita: '',
        notas: '',
        propertyId: '',
        userId: ''
    });

    const [constructionForm, setConstructionForm] = useState({
        nameProyect: '',
        description: '',
        direction: '',
        fechaInicial: '',
        fechaEstimada: '',
        presupuesto: '',
        etapa: 'PLANEACION',
        propertyId: '',
        userId: ''
    });

    const [remodelingForm, setRemodelingForm] = useState({
        description: '',
        presupuesto: '',
        fechaInit: '',
        fechaEndEstimada: '',
        services: '',
        propertyId: '',
        userId: ''
    });

    const [availableProperties, setAvailableProperties] = useState<Property[]>([]);
    const [availableUsers, setAvailableUsers] = useState<{ id: number, nombre: string, email: string, telefonoMovil?: string }[]>([]);

    useEffect(() => {
        if (isExpanded) {
            loadAvailableData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded, activeTab]);

    const loadAvailableData = async () => {
        try {
            // Cargar propiedades disponibles
            const propertiesResponse = await api.get('/properties/');
            setAvailableProperties(propertiesResponse.data);

            // Cargar usuarios clientes para formularios que los necesiten
            if (activeTab === 'swaps' || activeTab === 'rents' || activeTab === 'reservations' || activeTab === 'constructions' || activeTab === 'remodelings') {
                const usersResponse = await api.get('/auth/clients');
                setAvailableUsers(usersResponse.data);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const resetForms = () => {
        setPropertyForm({
            title: '',
            description: '',
            location: '',
            price: '',
            bedrooms: '',
            bathrooms: '',
            sqm: '',
            type: '',
            transation: '',
            status: 'DISPONIBLE',
            virtualTourUrl: ''
        });
        setPropertyImages([]);
        setSwapForm({
            description: '',
            userId: '',
            propertyofrecidaId: '',
            propertyDeseadaId: ''
        });
        setRentForm({
            priceMensual: '',
            deposito: '',
            duracionContrato: '',
            FechaInit: '',
            serviceInclude: '',
            propertyId: '',
            userId: ''
        });
        setReservationForm({
            fechaReservation: '',
            fechaVisita: '',
            notas: '',
            propertyId: '',
            userId: ''
        });
        setConstructionForm({
            nameProyect: '',
            description: '',
            direction: '',
            fechaInicial: '',
            fechaEstimada: '',
            presupuesto: '',
            etapa: 'PLANEACION',
            propertyId: '',
            userId: ''
        });
        setRemodelingForm({
            description: '',
            presupuesto: '',
            fechaInit: '',
            fechaEndEstimada: '',
            services: '',
            propertyId: '',
            userId: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let endpoint = '';
            let data = {};

            switch (activeTab) {
                case 'properties': {
                    endpoint = '/properties/';

                    // Crear FormData para enviar archivos
                    const propertyFormData = new FormData();

                    // Agregar campos de texto
                    Object.entries(propertyForm).forEach(([key, value]) => {
                        if (value !== undefined && value !== null && value !== '') {
                            if (typeof value === 'string' && value.trim() !== '') {
                                propertyFormData.append(key, value.trim());
                            } else if (typeof value === 'number' || typeof value === 'string') {
                                propertyFormData.append(key, String(value));
                            }
                        }
                    });

                    // Agregar userId por defecto si no está presente
                    if (!propertyFormData.has('userId')) {
                        propertyFormData.append('userId', '1'); // Usuario por defecto
                    }

                    // Agregar imágenes si hay
                    if (propertyImages.length > 0) {
                        propertyImages.forEach((image) => {
                            propertyFormData.append('images', image);
                        });
                    }

                    // Usar FormData en lugar de objeto data
                    data = propertyFormData;
                    break;
                }

                case 'swaps':
                    endpoint = '/swaps/';
                    data = {
                        ...swapForm,
                        userId: parseInt(swapForm.userId),
                        propertyofrecidaId: parseInt(swapForm.propertyofrecidaId),
                        propertyDeseadaId: parseInt(swapForm.propertyDeseadaId),
                    };
                    break;

                case 'rents':
                    endpoint = '/rents/';
                    data = {
                        ...rentForm,
                        priceMensual: parseFloat(rentForm.priceMensual),
                        deposito: parseFloat(rentForm.deposito),
                        duracionContrato: parseInt(rentForm.duracionContrato),
                        propertyId: parseInt(rentForm.propertyId),
                        userId: parseInt(rentForm.userId),
                    };
                    break;

                case 'reservations':
                    endpoint = '/reservations/';
                    data = {
                        ...reservationForm,
                        propertyId: parseInt(reservationForm.propertyId),
                        userId: parseInt(reservationForm.userId),
                    };
                    break;

                case 'constructions':
                    endpoint = '/constructions/';
                    data = {
                        ...constructionForm,
                        presupuesto: parseFloat(constructionForm.presupuesto),
                        propertyId: parseInt(constructionForm.propertyId),
                        userId: parseInt(constructionForm.userId),
                    };
                    break;

                case 'remodelings':
                    endpoint = '/remodelings/';
                    data = {
                        ...remodelingForm,
                        presupuesto: parseFloat(remodelingForm.presupuesto),
                        propertyId: parseInt(remodelingForm.propertyId),
                        userId: parseInt(remodelingForm.userId),
                    };
                    break;
            }

            if (activeTab === 'properties') {
                await api.post(endpoint, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                await api.post(endpoint, data);
            }

            addToast({
                title: "✅ Éxito",
                description: `${getEntityName()} creado exitosamente`,
                color: "success",
                timeout: 4000,
                shouldShowTimeoutProgress: true,
            });

            resetForms();
            setIsExpanded(false);
            onEntityCreated();

        } catch (error) {
            console.error('Error creating entity:', error);

            const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || `Error al crear ${getEntityName().toLowerCase()}`;

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

    const getEntityName = () => {
        switch (activeTab) {
            case 'properties': return 'Propiedad';
            case 'swaps': return 'Permuta';
            case 'rents': return 'Renta';
            case 'reservations': return 'Reservación';
            case 'constructions': return 'Construcción';
            case 'remodelings': return 'Remodelación';
            default: return 'Entidad';
        }
    };

    const getEntityIcon = () => {
        switch (activeTab) {
            case 'properties': return <HomeIcon className="w-5 h-5" />;
            case 'swaps': return <ArrowPathIcon className="w-5 h-5" />;
            case 'rents': return <BuildingOfficeIcon className="w-5 h-5" />;
            case 'reservations': return <CalendarDaysIcon className="w-5 h-5" />;
            case 'constructions': return <CogIcon className="w-5 h-5" />;
            case 'remodelings': return <WrenchScrewdriverIcon className="w-5 h-5" />;
            default: return <PlusIcon className="w-5 h-5" />;
        }
    };

    const renderForm = () => {
        switch (activeTab) {
            case 'properties':
                return renderPropertyForm();
            case 'swaps':
                return renderSwapForm();
            case 'rents':
                return renderRentForm();
            case 'reservations':
                return renderReservationForm();
            case 'constructions':
                return renderConstructionForm();
            case 'remodelings':
                return renderRemodelingForm();
            default:
                return <div>Formulario no disponible</div>;
        }
    };

    const renderPropertyForm = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
                label="Título"
                placeholder="Título de la propiedad"
                value={propertyForm.title}
                onChange={(e) => setPropertyForm(prev => ({ ...prev, title: e.target.value }))}
                required
            />
            <Input
                label="Ubicación"
                placeholder="Dirección completa"
                value={propertyForm.location}
                onChange={(e) => setPropertyForm(prev => ({ ...prev, location: e.target.value }))}
                required
            />
            <Input
                label="Precio (€)"
                type="number"
                placeholder="0"
                value={propertyForm.price}
                onChange={(e) => setPropertyForm(prev => ({ ...prev, price: e.target.value }))}
                required
            />
            <Input
                label="Área (m²)"
                type="number"
                placeholder="0"
                value={propertyForm.sqm}
                onChange={(e) => setPropertyForm(prev => ({ ...prev, sqm: e.target.value }))}
                required
            />
            <Input
                label="Dormitorios"
                type="number"
                placeholder="0"
                value={propertyForm.bedrooms}
                onChange={(e) => setPropertyForm(prev => ({ ...prev, bedrooms: e.target.value }))}
                required
            />
            <Input
                label="Baños"
                type="number"
                placeholder="0"
                value={propertyForm.bathrooms}
                onChange={(e) => setPropertyForm(prev => ({ ...prev, bathrooms: e.target.value }))}
                required
            />
            <Autocomplete
                label="Tipo de Propiedad"
                selectedKey={propertyForm.type}
                onSelectionChange={(key) => {
                    setPropertyForm(prev => ({ ...prev, type: key as string }));
                }}
                required
            >
                <AutocompleteItem key="CASA">Casa</AutocompleteItem>
                <AutocompleteItem key="APARTAMENTO">Apartamento</AutocompleteItem>
                <AutocompleteItem key="TERRENO">Terreno</AutocompleteItem>
                <AutocompleteItem key="LOCAL_COMERCIAL">Local Comercial</AutocompleteItem>
                <AutocompleteItem key="OFICINA">Oficina</AutocompleteItem>
            </Autocomplete>
            <Autocomplete
                label="Tipo de Transacción"
                selectedKey={propertyForm.transation}
                onSelectionChange={(key) => {
                    setPropertyForm(prev => ({ ...prev, transation: key as string }));
                }}
                required
            >
                <AutocompleteItem key="VENTA">Venta</AutocompleteItem>
                <AutocompleteItem key="RENTA">Renta</AutocompleteItem>
                <AutocompleteItem key="PERMUTA">Permuta</AutocompleteItem>
                <AutocompleteItem key="VENTA_O_RENTA">Venta o Renta</AutocompleteItem>
                <AutocompleteItem key="VENTA_O_PERMUTA">Venta o Permuta</AutocompleteItem>
                <AutocompleteItem key="TODAS">Todas</AutocompleteItem>
            </Autocomplete>
            <div className="lg:col-span-2">
                <Textarea
                    label="Descripción"
                    placeholder="Descripción detallada de la propiedad"
                    value={propertyForm.description}
                    onChange={(e) => setPropertyForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                />
            </div>

            {/* Imágenes */}
            <div className="lg:col-span-2">
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Imágenes de la Propiedad
                    </label>

                    {/* Área de subida de imágenes */}
                    <div className="relative">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setPropertyImages(Array.from(e.target.files));
                                }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            title="Seleccionar imágenes de la propiedad"
                        />
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors bg-gradient-to-br from-gray-50 to-gray-100">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-gray-900">
                                        Arrastra y suelta imágenes aquí
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        O haz clic para seleccionar archivos
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        PNG, JPG, GIF hasta 10MB cada uno
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vista previa de imágenes seleccionadas */}
                    {propertyImages.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-gray-700">
                                Imágenes seleccionadas ({propertyImages.length})
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {propertyImages.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPropertyImages(prev => prev.filter((_, i) => i !== index));
                                            }}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                            title="Eliminar imagen"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                            {image.name.length > 15 ? `${image.name.substring(0, 15)}...` : image.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                                <span>
                                    {propertyImages.length} imagen(es) seleccionada(s)
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setPropertyImages([])}
                                    className="text-red-600 hover:text-red-800 font-medium"
                                >
                                    Limpiar todas
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderSwapForm = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Autocomplete
                label="Usuario Cliente"
                selectedKey={swapForm.userId}
                onSelectionChange={(key) => {
                    setSwapForm(prev => ({ ...prev, userId: key as string }));
                }}
                required
            >
                {availableUsers.map((user) => (
                    <AutocompleteItem key={user.id.toString()}>
                        {user.nombre} - {user.email} {user.telefonoMovil ? `(${user.telefonoMovil})` : ''}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
            <Autocomplete
                label="Propiedad Ofrecida"
                selectedKey={swapForm.propertyofrecidaId}
                onSelectionChange={(key) => {
                    setSwapForm(prev => ({ ...prev, propertyofrecidaId: key as string }));
                }}
                required
            >
                {availableProperties.map((property) => (
                    <AutocompleteItem key={property.id.toString()}>
                        {`${property.title} - ${property.location}`}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
            <Autocomplete
                label="Propiedad Deseada"
                selectedKey={swapForm.propertyDeseadaId}
                onSelectionChange={(key) => {
                    setSwapForm(prev => ({ ...prev, propertyDeseadaId: key as string }));
                }}
                required
            >
                {availableProperties.map((property) => (
                    <AutocompleteItem key={property.id.toString()}>
                        {`${property.title} - ${property.location}`}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
            <div className="lg:col-span-2">
                <Textarea
                    label="Descripción"
                    placeholder="Descripción de la permuta"
                    value={swapForm.description}
                    onChange={(e) => setSwapForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                />
            </div>
        </div>
    );

    const renderRentForm = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
                label="Precio Mensual (€)"
                type="number"
                placeholder="0"
                value={rentForm.priceMensual}
                onChange={(e) => setRentForm(prev => ({ ...prev, priceMensual: e.target.value }))}
                required
            />
            <Input
                label="Depósito (€)"
                type="number"
                placeholder="0"
                value={rentForm.deposito}
                onChange={(e) => setRentForm(prev => ({ ...prev, deposito: e.target.value }))}
                required
            />
            <Input
                label="Duración del Contrato (meses)"
                type="number"
                placeholder="12"
                value={rentForm.duracionContrato}
                onChange={(e) => setRentForm(prev => ({ ...prev, duracionContrato: e.target.value }))}
                required
            />
            <Input
                label="Fecha de Inicio"
                type="date"
                value={rentForm.FechaInit}
                onChange={(e) => setRentForm(prev => ({ ...prev, FechaInit: e.target.value }))}
                required
            />
            <Autocomplete
                label="Propiedad"
                selectedKey={rentForm.propertyId}
                onSelectionChange={(key) => {
                    setRentForm(prev => ({ ...prev, propertyId: key as string }));
                }}
                required
            >
                {availableProperties.map((property) => (
                    <AutocompleteItem key={property.id.toString()}>
                        {property.title} - {property.location}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
            <Autocomplete
                label="Usuario Cliente"
                selectedKey={rentForm.userId}
                onSelectionChange={(key) => {
                    setRentForm(prev => ({ ...prev, userId: key as string }));
                }}
                required
            >
                {availableUsers.map((user) => (
                    <AutocompleteItem key={user.id.toString()}>
                        {user.nombre} - {user.email} {user.telefonoMovil ? `(${user.telefonoMovil})` : ''}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
            <div className="lg:col-span-2">
                <Textarea
                    label="Servicios Incluidos"
                    placeholder="Lista de servicios incluidos en el alquiler"
                    value={rentForm.serviceInclude}
                    onChange={(e) => setRentForm(prev => ({ ...prev, serviceInclude: e.target.value }))}
                    rows={2}
                />
            </div>
        </div>
    );

    const renderReservationForm = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
                label="Fecha de Reservación"
                type="datetime-local"
                value={reservationForm.fechaReservation}
                onChange={(e) => setReservationForm(prev => ({ ...prev, fechaReservation: e.target.value }))}
                required
            />
            <Input
                label="Fecha de Visita"
                type="datetime-local"
                value={reservationForm.fechaVisita}
                onChange={(e) => setReservationForm(prev => ({ ...prev, fechaVisita: e.target.value }))}
                required
            />
            <Input
                label="ID de Propiedad"
                type="number"
                placeholder="ID de la propiedad"
                value={reservationForm.propertyId}
                onChange={(e) => setReservationForm(prev => ({ ...prev, propertyId: e.target.value }))}
                required
            />
            <Input
                label="ID de Usuario"
                type="number"
                placeholder="ID del usuario"
                value={reservationForm.userId}
                onChange={(e) => setReservationForm(prev => ({ ...prev, userId: e.target.value }))}
                required
            />
            <div className="lg:col-span-2">
                <Textarea
                    label="Notas"
                    placeholder="Notas adicionales sobre la reservación"
                    value={reservationForm.notas}
                    onChange={(e) => setReservationForm(prev => ({ ...prev, notas: e.target.value }))}
                    rows={2}
                />
            </div>
        </div>
    );

    const renderConstructionForm = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
                label="Nombre del Proyecto"
                placeholder="Nombre del proyecto de construcción"
                value={constructionForm.nameProyect}
                onChange={(e) => setConstructionForm(prev => ({ ...prev, nameProyect: e.target.value }))}
                required
            />
            <Input
                label="Dirección"
                placeholder="Dirección del proyecto"
                value={constructionForm.direction}
                onChange={(e) => setConstructionForm(prev => ({ ...prev, direction: e.target.value }))}
                required
            />
            <Input
                label="Fecha Inicial"
                type="date"
                value={constructionForm.fechaInicial}
                onChange={(e) => setConstructionForm(prev => ({ ...prev, fechaInicial: e.target.value }))}
                required
            />
            <Input
                label="Fecha Estimada de Finalización"
                type="date"
                value={constructionForm.fechaEstimada}
                onChange={(e) => setConstructionForm(prev => ({ ...prev, fechaEstimada: e.target.value }))}
                required
            />
            <Input
                label="Presupuesto (€)"
                type="number"
                placeholder="0"
                value={constructionForm.presupuesto}
                onChange={(e) => setConstructionForm(prev => ({ ...prev, presupuesto: e.target.value }))}
                required
            />
            <Input
                label="ID de Propiedad"
                type="number"
                placeholder="ID de la propiedad"
                value={constructionForm.propertyId}
                onChange={(e) => setConstructionForm(prev => ({ ...prev, propertyId: e.target.value }))}
                required
            />
            <Input
                label="ID de Usuario"
                type="number"
                placeholder="ID del usuario"
                value={constructionForm.userId}
                onChange={(e) => setConstructionForm(prev => ({ ...prev, userId: e.target.value }))}
                required
            />
            <div className="lg:col-span-2">
                <Textarea
                    label="Descripción"
                    placeholder="Descripción del proyecto de construcción"
                    value={constructionForm.description}
                    onChange={(e) => setConstructionForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                />
            </div>
        </div>
    );

    const renderRemodelingForm = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
                label="Presupuesto (€)"
                type="number"
                placeholder="0"
                value={remodelingForm.presupuesto}
                onChange={(e) => setRemodelingForm(prev => ({ ...prev, presupuesto: e.target.value }))}
                required
            />
            <Input
                label="Fecha de Inicio"
                type="date"
                value={remodelingForm.fechaInit}
                onChange={(e) => setRemodelingForm(prev => ({ ...prev, fechaInit: e.target.value }))}
                required
            />
            <Input
                label="Fecha Estimada de Finalización"
                type="date"
                value={remodelingForm.fechaEndEstimada}
                onChange={(e) => setRemodelingForm(prev => ({ ...prev, fechaEndEstimada: e.target.value }))}
                required
            />
            <Input
                label="ID de Propiedad"
                type="number"
                placeholder="ID de la propiedad"
                value={remodelingForm.propertyId}
                onChange={(e) => setRemodelingForm(prev => ({ ...prev, propertyId: e.target.value }))}
                required
            />
            <Input
                label="ID de Usuario"
                type="number"
                placeholder="ID del usuario"
                value={remodelingForm.userId}
                onChange={(e) => setRemodelingForm(prev => ({ ...prev, userId: e.target.value }))}
                required
            />
            <div className="lg:col-span-2">
                <Textarea
                    label="Descripción"
                    placeholder="Descripción de la remodelación"
                    value={remodelingForm.description}
                    onChange={(e) => setRemodelingForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                    required
                />
            </div>
            <div className="lg:col-span-2">
                <Textarea
                    label="Servicios"
                    placeholder="Servicios a realizar en la remodelación"
                    value={remodelingForm.services}
                    onChange={(e) => setRemodelingForm(prev => ({ ...prev, services: e.target.value }))}
                    rows={2}
                    required
                />
            </div>
        </div>
    );

    return (
        <Card className="mb-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                            {getEntityIcon()}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Crear Nueva {getEntityName()}
                            </h3>
                            <p className="text-sm text-gray-600">
                                Agrega una nueva {getEntityName().toLowerCase()} al sistema
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
                        {renderForm()}

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button
                                type="button"
                                variant="light"
                                onClick={() => {
                                    resetForms();
                                    setIsExpanded(false);
                                }}
                                disabled={isLoading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                disabled={isLoading}
                                startContent={!isLoading && <PlusIcon className="w-4 h-4" />}
                            >
                                {isLoading ? 'Creando...' : `Crear ${getEntityName()}`}
                            </Button>
                        </div>
                    </form>
                </CardBody>
            )}
        </Card>
    );
};