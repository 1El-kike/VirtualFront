import React, { useState } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { PropertiesTab } from '../components/admin/tabs/PropertiesTab';
import { SwapsTab } from '../components/admin/tabs/SwapsTab';
import { EntityManagementTab } from '../components/admin/tabs/EntityManagementTab';
import type { Rent, Reservation, Construction, Remodeling } from '../types';
import { Listbox, ListboxItem, Button } from '@heroui/react';
import { HomeIcon, ArrowPathIcon, BuildingOfficeIcon, CalendarDaysIcon, WrenchScrewdriverIcon, CogIcon } from '@heroicons/react/24/outline';

const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('properties');

    const renderAdditionalInfo = (entity: Rent) => (
        <div className="mb-4">
            <p className="text-sm font-medium">Precio mensual: €{entity.priceMensual.toLocaleString()}</p>
            <p className="text-sm">Duración: {entity.duracionContrato} meses</p>
            <p className="text-sm">Depósito: €{entity.deposito.toLocaleString()}</p>
            {entity.serviceInclude && (
                <p className="text-sm text-gray-600">Servicios incluidos: {entity.serviceInclude}</p>
            )}
        </div>
    );

    const renderReservationInfo = (entity: Reservation) => (
        <div className="mb-4">
            <p className="text-sm font-medium">Fecha de visita: {new Date(entity.fechaVisita).toLocaleDateString()}</p>
            {entity.notas && (
                <p className="text-sm text-gray-600">Notas: {entity.notas}</p>
            )}
        </div>
    );

    const renderConstructionInfo = (entity: Construction) => (
        <div className="mb-4">
            <p className="text-sm font-medium">Presupuesto: €{entity.presupuesto.toLocaleString()}</p>
            <p className="text-sm">Dirección: {entity.direction}</p>
            <p className="text-sm">Etapa: {entity.etapa}</p>
            <p className="text-xs text-gray-500">
                Estimado: {new Date(entity.fechaEstimada).toLocaleDateString()}
            </p>
        </div>
    );

    const renderRemodelingInfo = (entity: Remodeling) => (
        <div className="mb-4">
            <p className="text-sm font-medium">Presupuesto: €{entity.presupuesto.toLocaleString()}</p>
            <p className="text-sm">Servicios: {entity.services}</p>
            <p className="text-xs text-gray-500">
                Inicio: {new Date(entity.fechaInit).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-500">
                Estimado: {new Date(entity.fechaEndEstimada).toLocaleDateString()}
            </p>
        </div>
    );

    const menuItems = [
        {
            key: 'properties',
            label: 'Propiedades',
            icon: <HomeIcon className="w-5 h-5" />,
            description: 'Gestionar propiedades inmobiliarias'
        },
        {
            key: 'swaps',
            label: 'Permutas',
            icon: <ArrowPathIcon className="w-5 h-5" />,
            description: 'Administrar intercambios de propiedades'
        },
        {
            key: 'rents',
            label: 'Rentas',
            icon: <BuildingOfficeIcon className="w-5 h-5" />,
            description: 'Controlar contratos de alquiler'
        },
        {
            key: 'reservations',
            label: 'Reservaciones',
            icon: <CalendarDaysIcon className="w-5 h-5" />,
            description: 'Gestionar visitas y citas'
        },
        {
            key: 'constructions',
            label: 'Construcciones',
            icon: <CogIcon className="w-5 h-5" />,
            description: 'Supervisar proyectos de construcción'
        },
        {
            key: 'remodelings',
            label: 'Remodelaciones',
            icon: <WrenchScrewdriverIcon className="w-5 h-5" />,
            description: 'Administrar trabajos de remodelación'
        }
    ];

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
            {/* Sidebar - Hidden on mobile, shown on lg+ */}
            <aside className="hidden lg:block w-80 bg-white shadow-lg border-r border-gray-200 flex-shrink-0">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Panel de Administración</h2>
                    <Listbox
                        aria-label="Opciones de administración"
                        className="gap-1"
                        selectedKeys={[activeTab]}
                        selectionMode="single"
                        onSelectionChange={(keys) => {
                            const selectedKey = Array.from(keys)[0] as string;
                            setActiveTab(selectedKey);
                        }}
                    >
                        {menuItems.map((item) => (
                            <ListboxItem
                                key={item.key}
                                startContent={item.icon}
                                className="py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div>
                                    <div className="font-medium text-gray-900">{item.label}</div>
                                    <div className="text-sm text-gray-500">{item.description}</div>
                                </div>
                            </ListboxItem>
                        ))}
                    </Listbox>
                </div>

                {/* Quick Actions */}
                <div className="px-6 pb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Acciones Rápidas</h3>
                    <div className="space-y-2">
                        <Button
                            size="sm"
                            variant="flat"
                            color="primary"
                            className="w-full justify-start"
                            startContent={<HomeIcon className="w-4 h-4" />}
                        >
                            Nueva Propiedad
                        </Button>
                        <Button
                            size="sm"
                            variant="flat"
                            color="secondary"
                            className="w-full justify-start"
                            startContent={<ArrowPathIcon className="w-4 h-4" />}
                        >
                            Nueva Permuta
                        </Button>
                        <Button
                            size="sm"
                            variant="flat"
                            color="success"
                            className="w-full justify-start"
                            startContent={<CalendarDaysIcon className="w-4 h-4" />}
                        >
                            Nueva Reservación
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Mobile Navigation - Shown only on mobile */}
            <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold text-gray-800">Panel de Administración</h1>
                    <select
                        title="Seleccionar módulo de administración"
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {menuItems.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden min-h-0">
                <div className="h-full overflow-y-auto">
                    <AdminLayout title="">
                        {activeTab === 'properties' && <PropertiesTab />}

                        {activeTab === 'swaps' && <SwapsTab />}

                        {activeTab === 'rents' && (
                            <EntityManagementTab<Rent>
                                title="Administración de Rentas"
                                entityName="rents"
                                apiEndpoint="/rents"
                                type="rent"
                                renderAdditionalInfo={renderAdditionalInfo}
                            />
                        )}

                        {activeTab === 'reservations' && (
                            <EntityManagementTab<Reservation>
                                title="Administración de Reservaciones"
                                entityName="reservations"
                                apiEndpoint="/reservations"
                                type="reservation"
                                renderAdditionalInfo={renderReservationInfo}
                            />
                        )}

                        {activeTab === 'constructions' && (
                            <EntityManagementTab<Construction>
                                title="Administración de Construcciones"
                                entityName="constructions"
                                apiEndpoint="/constructions"
                                type="construction"
                                renderAdditionalInfo={renderConstructionInfo}
                            />
                        )}

                        {activeTab === 'remodelings' && (
                            <EntityManagementTab<Remodeling>
                                title="Administración de Remodelaciones"
                                entityName="remodelings"
                                apiEndpoint="/remodelings"
                                type="remodeling"
                                renderAdditionalInfo={renderRemodelingInfo}
                            />
                        )}
                    </AdminLayout>
                </div>
            </main>
        </div>
    );
};

export default Admin;