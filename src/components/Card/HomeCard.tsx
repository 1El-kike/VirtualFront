
import React from 'react';
import { Card, CardHeader, CardBody, Button } from '@heroui/react';
import { Link } from 'react-router-dom';

const HomeCard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Card className="w-full">
                    <CardHeader className="flex justify-around">
                        <h1 className="text-3xl font-bold text-gray-900">Centro de Gestión de Fichas</h1>
                        <p className="text-gray-600 mt-2">Administra tus preferencias de casa ideal</p>
                    </CardHeader>
                    <CardBody className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="pb-2">
                                    <h2 className="text-xl font-semibold text-gray-800">📋 Ver Mis Fichas</h2>
                                </CardHeader>
                                <CardBody className="pt-0">
                                    <p className="text-gray-600 mb-4">
                                        Consulta todas tus fichas de preferencias guardadas con detalles completos.
                                    </p>
                                    <Link to="/card/list">
                                        <Button color="primary" className="w-full">
                                            Ver Fichas
                                        </Button>
                                    </Link>
                                </CardBody>
                            </Card>

                            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="pb-2">
                                    <h2 className="text-xl font-semibold text-gray-800">✨ Crear Nueva Ficha</h2>
                                </CardHeader>
                                <CardBody className="pt-0">
                                    <p className="text-gray-600 mb-4">
                                        Define tus preferencias para encontrar la casa perfecta.
                                    </p>
                                    <Link to="/card/create">
                                        <Button color="success" className="w-full">
                                            Crear Ficha
                                        </Button>
                                    </Link>
                                </CardBody>
                            </Card>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 ¿Qué puedes hacer?</h3>
                            <ul className="text-blue-700 space-y-1">
                                <li>• Crear perfiles detallados con tus preferencias de vivienda</li>
                                <li>• Especificar presupuesto, ubicación, tamaño y características</li>
                                <li>• Incluir requerimientos avanzados como sostenibilidad y tecnología</li>
                                <li>• Gestionar múltiples fichas para diferentes necesidades</li>
                                <li>• Revisar y actualizar tus preferencias en cualquier momento</li>
                            </ul>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HomeCard;