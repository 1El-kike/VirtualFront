import React from 'react';
import { useEntityManagement } from '../../../hooks/useEntityManagement';
import { EntityCard } from '../EntityCard';
import { LoadingState } from '../LoadingState';
import { ErrorState } from '../ErrorState';

interface EntityManagementTabProps<T> {
    title: string;
    entityName: string;
    apiEndpoint: string;
    type: 'swap' | 'rent' | 'reservation' | 'construction' | 'remodeling';
    renderAdditionalInfo?: (entity: T) => React.ReactNode;
    getAvailableActions?: (entity: T) => React.ReactNode;
}

export const EntityManagementTab = <T extends {
    id: number;
    status: string;
    user: { nombre?: string; email: string };
    createdAt: Date;
    updatedAt: Date;
}>({
    title,
    entityName,
    apiEndpoint,
    type,
    renderAdditionalInfo,
    getAvailableActions
}: EntityManagementTabProps<T>) => {
    const { data: entities, isLoading, error, updateStatusMutation, cancelMutation } = useEntityManagement<T>({
        entityName,
        apiEndpoint
    });

    if (isLoading) return <LoadingState message={`Cargando ${entityName}...`} />;
    if (error) return <ErrorState message={`Error al cargar ${entityName}`} />;

    const getDefaultActions = (entity: T) => {
        const actions = [];

        // Acciones específicas por tipo
        if (type === 'swap') {
            if (entity.status === 'PENDIENTE') {
                actions.push(
                    <button
                        key="accept"
                        onClick={() => updateStatusMutation.mutate({ id: entity.id, status: 'ACEPTADA' })}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                        disabled={updateStatusMutation.isPending}
                    >
                        Aceptar
                    </button>,
                    <button
                        key="reject"
                        onClick={() => updateStatusMutation.mutate({ id: entity.id, status: 'RECHAZADA' })}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                        disabled={updateStatusMutation.isPending}
                    >
                        Rechazar
                    </button>
                );
            }
        } else if (type === 'rent') {
            if (entity.status === 'ACTIVA') {
                actions.push(
                    <button
                        key="finalize"
                        onClick={() => updateStatusMutation.mutate({ id: entity.id, status: 'FINALIZADA' })}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                        disabled={updateStatusMutation.isPending}
                    >
                        Finalizar
                    </button>
                );
            }
        } else if (type === 'reservation') {
            if (entity.status === 'PENDIENTE') {
                actions.push(
                    <button
                        key="confirm"
                        onClick={() => updateStatusMutation.mutate({ id: entity.id, status: 'CONFIRMADA' })}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                        disabled={updateStatusMutation.isPending}
                    >
                        Confirmar
                    </button>,
                    <button
                        key="complete"
                        onClick={() => updateStatusMutation.mutate({ id: entity.id, status: 'COMPLETADA' })}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                        disabled={updateStatusMutation.isPending}
                    >
                        Completar
                    </button>
                );
            }
        } else if (type === 'construction') {
            if (entity.status === 'PLANEACION') {
                actions.push(
                    <button
                        key="start"
                        onClick={() => updateStatusMutation.mutate({ id: entity.id, status: 'EN_PROGRESO' })}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                        disabled={updateStatusMutation.isPending}
                    >
                        Iniciar
                    </button>
                );
            } else if (entity.status === 'EN_PROGRESO') {
                actions.push(
                    <button
                        key="pause"
                        onClick={() => updateStatusMutation.mutate({ id: entity.id, status: 'PAUSADA' })}
                        className="px-3 py-1 bg-orange-500 text-white rounded text-sm"
                        disabled={updateStatusMutation.isPending}
                    >
                        Pausar
                    </button>,
                    <button
                        key="complete"
                        onClick={() => updateStatusMutation.mutate({ id: entity.id, status: 'COMPLETADA' })}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                        disabled={updateStatusMutation.isPending}
                    >
                        Completar
                    </button>
                );
            } else if (entity.status === 'PAUSADA') {
                actions.push(
                    <button
                        key="resume"
                        onClick={() => updateStatusMutation.mutate({ id: entity.id, status: 'EN_PROGRESO' })}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                        disabled={updateStatusMutation.isPending}
                    >
                        Reanudar
                    </button>
                );
            }
        } else if (type === 'remodeling') {
            if (entity.status === 'PENDIENTE') {
                actions.push(
                    <button
                        key="start"
                        onClick={() => updateStatusMutation.mutate({ id: entity.id, status: 'EN_PROGRESO' })}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                        disabled={updateStatusMutation.isPending}
                    >
                        Iniciar
                    </button>
                );
            } else if (entity.status === 'EN_PROGRESO') {
                actions.push(
                    <button
                        key="complete"
                        onClick={() => updateStatusMutation.mutate({ id: entity.id, status: 'COMPLETADA' })}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                        disabled={updateStatusMutation.isPending}
                    >
                        Completar
                    </button>
                );
            }
        }

        // Acción de cancelar (disponible para estados no finales)
        const canCancel = !['CANCELADA', 'COMPLETADA', 'FINALIZADA', 'RECHAZADA'].includes(entity.status);
        if (canCancel) {
            actions.push(
                <button
                    key="cancel"
                    onClick={() => cancelMutation.mutate(entity.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                    disabled={cancelMutation.isPending}
                >
                    Cancelar
                </button>
            );
        }

        return actions;
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entities?.map((entity) => (
                    <EntityCard
                        key={entity.id}
                        entity={entity}
                        title={`${entityName.charAt(0).toUpperCase() + entityName.slice(1)} #${entity.id}`}
                        type={type}
                        actions={getAvailableActions ? getAvailableActions(entity) : getDefaultActions(entity)}
                    >
                        {renderAdditionalInfo && renderAdditionalInfo(entity)}
                    </EntityCard>
                ))}
            </div>
        </div>
    );
};