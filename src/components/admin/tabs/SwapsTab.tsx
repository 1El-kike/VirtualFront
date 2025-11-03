import React from 'react';
import type { Swap } from '../../../types';
import { EntityManagementTab } from './EntityManagementTab';

export const SwapsTab: React.FC = () => {
    const renderAdditionalInfo = (entity: Swap) => (
        <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 className="font-medium mb-2">Propiedad Ofrecida:</h4>
                    <p className="text-sm">{entity.propertyOfrecida.title}</p>
                    <p className="text-sm text-gray-600">{entity.propertyOfrecida.location}</p>
                    <p className="text-sm font-medium">€{entity.propertyOfrecida.price.toLocaleString()}</p>
                </div>
                <div>
                    <h4 className="font-medium mb-2">Propiedad Deseada:</h4>
                    <p className="text-sm">{entity.propertyDeseada.title}</p>
                    <p className="text-sm text-gray-600">{entity.propertyDeseada.location}</p>
                    <p className="text-sm font-medium">€{entity.propertyDeseada.price.toLocaleString()}</p>
                </div>
            </div>
            {entity.description && (
                <p className="text-sm text-gray-600 mt-2">Descripción: {entity.description}</p>
            )}
        </div>
    );

    return (
        <EntityManagementTab<Swap>
            title="Administración de Permutas"
            entityName="swaps"
            apiEndpoint="/swaps"
            type="swap"
            renderAdditionalInfo={renderAdditionalInfo}
        />
    );
};