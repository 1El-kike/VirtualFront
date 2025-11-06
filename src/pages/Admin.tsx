import React, { useState } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { EntityCreationForm } from '../components/admin/EntityCreationForm';
import { VirtualTourCreationForm } from '../components/admin/VirtualTourCreationForm';
import { PropertiesTab } from '../components/admin/tabs/PropertiesTab';
import { SwapsTab } from '../components/admin/tabs/SwapsTab';
import { EntityManagementTab } from '../components/admin/tabs/EntityManagementTab';
import type { Rent, Reservation, Construction, Remodeling } from '../types';
import { Button } from '@heroui/react';
import { HomeIcon, ArrowPathIcon, BuildingOfficeIcon, CalendarDaysIcon, WrenchScrewdriverIcon, CogIcon } from '@heroicons/react/24/outline';

const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('properties');
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

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

    const handleEntityCreated = () => {
        setRefreshTrigger(prev => prev + 1);
    };

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
        <div className="min-h-screen h-full  bg-gradient-to-b from-white via-white to-transparent">
            {/* Desktop Layout */}
            <div className="hidden h-full lg:flex">
                {/* Sidebar - Hidden on mobile, shown on lg+ */}
                <aside className="w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-r border-slate-700 sticky top-0 h-screen flex-shrink-0 ">
                    <div className=' w-80 h-full overflow-y-auto'>
                        {/* Header del Sidebar */}
                        <div className="p-6 border-b border-slate-700">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <CogIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Admin Panel</h2>
                                    <p className="text-xs text-slate-400">Sistema de Gestión</p>
                                </div>
                            </div>

                            {/* Navegación Principal */}
                            <nav className="space-y-2">
                                {menuItems.map((item) => {
                                    const isActive = activeTab === item.key;
                                    return (
                                        <button
                                            key={item.key}
                                            onClick={() => setActiveTab(item.key)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                                                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                                }`}
                                        >
                                            <div className={`p-2 rounded-lg transition-colors ${isActive
                                                ? 'bg-white/20'
                                                : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                                                }`}>
                                                {item.icon}
                                            </div>
                                            <div className="text-left">
                                                <div className={`font-medium ${isActive ? 'text-white' : 'text-slate-200'}`}>
                                                    {item.label}
                                                </div>
                                                <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                                    {item.description}
                                                </div>
                                            </div>
                                            {isActive && (
                                                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                        {/* Quick Actions */}
                        <div className="p-6">
                            <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                                <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                                Acciones Rápidas
                            </h3>
                            <div className="space-y-3">
                                <Button
                                    size="sm"
                                    className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg"
                                    startContent={<HomeIcon className="w-4 h-4" />}
                                >
                                    Nueva Propiedad
                                </Button>
                                <Button
                                    size="sm"
                                    className="w-full justify-start bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-lg"
                                    startContent={<ArrowPathIcon className="w-4 h-4" />}
                                >
                                    Nueva Permuta
                                </Button>
                                <Button
                                    size="sm"
                                    className="w-full justify-start bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 shadow-lg"
                                    startContent={<CalendarDaysIcon className="w-4 h-4" />}
                                >
                                    Nueva Reservación
                                </Button>
                            </div>

                            {/* Footer del Sidebar */}
                            <div className="mt-8 pt-6 border-t border-slate-700">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                    <p className="text-xs text-slate-400">Sistema Online</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </aside>

                {/* Main Content - Desktop */}
                <main className="flex-1 overflow-hidden">
                    <div className="h-full overflow-hidden">
                        <div className='my-5 mx-7'>
                            {/* Entity Creation Form */}
                            <EntityCreationForm
                                activeTab={activeTab}
                                onEntityCreated={handleEntityCreated}
                            />
                            {/* Virtual Tour Creation Form */}
                            <VirtualTourCreationForm
                                onTourCreated={handleEntityCreated}
                            />
                        </div>
                        <AdminLayout title="Vista">
                            {activeTab === 'properties' && <PropertiesTab refreshTrigger={refreshTrigger} />}
                            {activeTab === 'swaps' && <SwapsTab refreshTrigger={refreshTrigger} />}
                            {activeTab === 'rents' && (
                                <EntityManagementTab<Rent>
                                    title="Administración de Rentas"
                                    entityName="rents"
                                    apiEndpoint="/rents"
                                    type="rent"
                                    renderAdditionalInfo={renderAdditionalInfo}
                                    refreshTrigger={refreshTrigger}
                                />
                            )}
                            {activeTab === 'reservations' && (
                                <EntityManagementTab<Reservation>
                                    title="Administración de Reservaciones"
                                    entityName="reservations"
                                    apiEndpoint="/reservations"
                                    type="reservation"
                                    renderAdditionalInfo={renderReservationInfo}
                                    refreshTrigger={refreshTrigger}
                                />
                            )}
                            {activeTab === 'constructions' && (
                                <EntityManagementTab<Construction>
                                    title="Administración de Construcciones"
                                    entityName="constructions"
                                    apiEndpoint="/constructions"
                                    type="construction"
                                    renderAdditionalInfo={renderConstructionInfo}
                                    refreshTrigger={refreshTrigger}
                                />
                            )}
                            {activeTab === 'remodelings' && (
                                <EntityManagementTab<Remodeling>
                                    title="Administración de Remodelaciones"
                                    entityName="remodelings"
                                    apiEndpoint="/remodelings"
                                    type="remodeling"
                                    renderAdditionalInfo={renderRemodelingInfo}
                                    refreshTrigger={refreshTrigger}
                                />
                            )}
                        </AdminLayout>
                    </div>
                </main>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden">
                {/* Mobile Navigation */}
                <div className="bg-white border-b border-gray-200 px-4 py-3">
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

                {/* Main Content - Mobile */}
                <main className="overflow-hidden">
                    <div className="h-full overflow-hidden">
                        <div className='my-5 mx-7'>
                            {/* Entity Creation Form */}
                            <EntityCreationForm
                                activeTab={activeTab}
                                onEntityCreated={handleEntityCreated}
                            />
                            {/* Virtual Tour Creation Form */}
                            <VirtualTourCreationForm
                                onTourCreated={handleEntityCreated}
                            />
                        </div>
                        <AdminLayout title="Vista">
                            {activeTab === 'properties' && <PropertiesTab refreshTrigger={refreshTrigger} />}
                            {activeTab === 'swaps' && <SwapsTab refreshTrigger={refreshTrigger} />}
                            {activeTab === 'rents' && (
                                <EntityManagementTab<Rent>
                                    title="Administración de Rentas"
                                    entityName="rents"
                                    apiEndpoint="/rents"
                                    type="rent"
                                    renderAdditionalInfo={renderAdditionalInfo}
                                    refreshTrigger={refreshTrigger}
                                />
                            )}
                            {activeTab === 'reservations' && (
                                <EntityManagementTab<Reservation>
                                    title="Administración de Reservaciones"
                                    entityName="reservations"
                                    apiEndpoint="/reservations"
                                    type="reservation"
                                    renderAdditionalInfo={renderReservationInfo}
                                    refreshTrigger={refreshTrigger}
                                />
                            )}
                            {activeTab === 'constructions' && (
                                <EntityManagementTab<Construction>
                                    title="Administración de Construcciones"
                                    entityName="constructions"
                                    apiEndpoint="/constructions"
                                    type="construction"
                                    renderAdditionalInfo={renderConstructionInfo}
                                    refreshTrigger={refreshTrigger}
                                />
                            )}
                            {activeTab === 'remodelings' && (
                                <EntityManagementTab<Remodeling>
                                    title="Administración de Remodelaciones"
                                    entityName="remodelings"
                                    apiEndpoint="/remodelings"
                                    type="remodeling"
                                    renderAdditionalInfo={renderRemodelingInfo}
                                    refreshTrigger={refreshTrigger}
                                />
                            )}
                        </AdminLayout>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Admin;
