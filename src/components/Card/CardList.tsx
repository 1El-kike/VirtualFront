import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button, Badge, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/react';
import type { HousePreferences } from '../../types';
import { Link } from 'react-router-dom';

const CardList: React.FC = () => {
    const [cards, setCards] = useState<HousePreferences[]>([]);
    const [selectedCard, setSelectedCard] = useState<HousePreferences | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = () => {
        const savedCards = localStorage.getItem('housePreferences');
        if (savedCards) {
            try {
                const parsedCards = JSON.parse(savedCards);
                // Convertir las fechas de string a Date
                const cardsWithDates = parsedCards.map((card: Omit<HousePreferences, 'createdAt'> & { createdAt: string }) => ({
                    ...card,
                    createdAt: new Date(card.createdAt)
                }));
                setCards(cardsWithDates);
            } catch (error) {
                console.error('Error loading cards:', error);
            }
        }
    };

    const deleteCard = (id: string) => {
        const updatedCards = cards.filter(card => card.id !== id);
        setCards(updatedCards);
        localStorage.setItem('housePreferences', JSON.stringify(updatedCards));
    };

    const viewCardDetails = (card: HousePreferences) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const getPropertyTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            house: 'Casa',
            apartment: 'Apartamento',
            townhouse: 'Casa adosada',
            condo: 'Condominio',
            other: 'Otro'
        };
        return labels[type] || type;
    };

    const getTimelineLabel = (timeline: string) => {
        const labels: Record<string, string> = {
            immediate: 'Inmediato',
            '3months': '3 meses',
            '6months': '6 meses',
            '1year': '1 año',
            flexible: 'Flexible'
        };
        return labels[timeline] || timeline;
    };

    const getFinancingLabel = (financing: string) => {
        const labels: Record<string, string> = {
            cash: 'Efectivo',
            mortgage: 'Hipoteca',
            other: 'Otro'
        };
        return labels[financing] || financing;
    };

    if (cards.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="text-6xl mb-4">🏠</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">No tienes fichas guardadas</h1>
                        <p className="text-gray-600 mb-6">
                            Crea tu primera ficha de preferencias para encontrar la casa de tus sueños.
                        </p>
                        <Link to="/card/create">
                            <Button color="primary" size="lg">
                                Crear mi primera ficha
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Mis Fichas de Casa Ideal</h1>
                        <p className="text-gray-600 mt-2">{cards.length} ficha{cards.length !== 1 ? 's' : ''} guardada{cards.length !== 1 ? 's' : ''}</p>
                    </div>
                    <Link to="/card/create">
                        <Button color="primary" size="lg">
                            Crear nueva ficha
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <Card key={card.id} className="w-full hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start w-full">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{card.name}</h3>
                                        <p className="text-sm text-gray-600">{card.email}</p>
                                    </div>
                                    <Badge color="primary" variant="flat">
                                        {getPropertyTypeLabel(card.propertyType)}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Ubicación:</p>
                                        <p className="text-sm text-gray-600">{card.location}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Presupuesto:</p>
                                        <p className="text-sm text-gray-600">
                                            {formatCurrency(card.budgetMin)} - {formatCurrency(card.budgetMax)}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <p className="text-xs font-medium text-gray-700">Habitaciones:</p>
                                            <p className="text-xs text-gray-600">{card.bedrooms}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-700">Baños:</p>
                                            <p className="text-xs text-gray-600">{card.bathrooms}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Superficie:</p>
                                        <p className="text-sm text-gray-600">{card.minSqm}m² - {card.maxSqm}m²</p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-gray-700">Creada:</p>
                                        <p className="text-xs text-gray-500">{formatDate(card.createdAt)}</p>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            size="sm"
                                            variant="flat"
                                            color="primary"
                                            onPress={() => viewCardDetails(card)}
                                            className="flex-1"
                                        >
                                            Ver detalles
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="flat"
                                            color="danger"
                                            onPress={() => deleteCard(card.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>

                {/* Modal de detalles */}
                <Modal
                    isOpen={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    size="4xl"
                    scrollBehavior="inside"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    <h2 className="text-xl font-bold">Detalles de la ficha: {selectedCard?.name}</h2>
                                    <p className="text-sm text-gray-600">Creada el {selectedCard && formatDate(selectedCard.createdAt)}</p>
                                </ModalHeader>
                                <ModalBody>
                                    {selectedCard && (
                                        <div className="space-y-6">
                                            {/* Información Personal */}
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-semibold text-lg mb-3">Información Personal</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="font-medium">Nombre:</p>
                                                        <p>{selectedCard.name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Email:</p>
                                                        <p>{selectedCard.email}</p>
                                                    </div>
                                                    {selectedCard.phone && (
                                                        <div>
                                                            <p className="font-medium">Teléfono:</p>
                                                            <p>{selectedCard.phone}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Preferencias Básicas */}
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <h3 className="font-semibold text-lg mb-3">Preferencias Básicas</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="font-medium">Tipo de propiedad:</p>
                                                        <p>{getPropertyTypeLabel(selectedCard.propertyType)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Ubicación:</p>
                                                        <p>{selectedCard.location}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Presupuesto:</p>
                                                        <p>{formatCurrency(selectedCard.budgetMin)} - {formatCurrency(selectedCard.budgetMax)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Habitaciones/Baños:</p>
                                                        <p>{selectedCard.bedrooms} hab. / {selectedCard.bathrooms} baños</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Superficie:</p>
                                                        <p>{selectedCard.minSqm}m² - {selectedCard.maxSqm}m²</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Preferencias Intermedias */}
                                            <div className="bg-green-50 p-4 rounded-lg">
                                                <h3 className="font-semibold text-lg mb-3">Preferencias Intermedias</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="font-medium">Orientación:</p>
                                                        <p>{selectedCard.orientation}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Piso:</p>
                                                        <p>{selectedCard.floor || 'No especificado'}</p>
                                                    </div>
                                                </div>
                                                {selectedCard.architecturalStyle.length > 0 && (
                                                    <div className="mt-4">
                                                        <p className="font-medium">Estilo arquitectónico:</p>
                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                            {selectedCard.architecturalStyle.map((style, index) => (
                                                                <Badge key={index} variant="flat">{style}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {selectedCard.features.length > 0 && (
                                                    <div className="mt-4">
                                                        <p className="font-medium">Características deseadas:</p>
                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                            {selectedCard.features.map((feature, index) => (
                                                                <Badge key={index} variant="flat">{feature}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Preferencias Avanzadas */}
                                            <div className="bg-purple-50 p-4 rounded-lg">
                                                <h3 className="font-semibold text-lg mb-3">Preferencias Avanzadas</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="font-medium">Plazo:</p>
                                                        <p>{getTimelineLabel(selectedCard.timeline)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Financiamiento:</p>
                                                        <p>{getFinancingLabel(selectedCard.financing)}</p>
                                                    </div>
                                                </div>
                                                {selectedCard.constructionMaterials.length > 0 && (
                                                    <div className="mt-4">
                                                        <p className="font-medium">Materiales de construcción:</p>
                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                            {selectedCard.constructionMaterials.map((material, index) => (
                                                                <Badge key={index} variant="flat">{material}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {selectedCard.technology.length > 0 && (
                                                    <div className="mt-4">
                                                        <p className="font-medium">Tecnología:</p>
                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                            {selectedCard.technology.map((tech, index) => (
                                                                <Badge key={index} variant="flat">{tech}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {selectedCard.sustainability.length > 0 && (
                                                    <div className="mt-4">
                                                        <p className="font-medium">Sostenibilidad:</p>
                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                            {selectedCard.sustainability.map((sustain, index) => (
                                                                <Badge key={index} variant="flat">{sustain}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {selectedCard.customizations && (
                                                    <div className="mt-4">
                                                        <p className="font-medium">Personalizaciones:</p>
                                                        <p className="text-sm bg-white p-2 rounded mt-1">{selectedCard.customizations}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cerrar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
};

export default CardList;