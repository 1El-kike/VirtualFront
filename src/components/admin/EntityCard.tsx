import React from 'react';
import { StatusBadge } from './StatusBadge';

interface Property {
    id: number;
    title: string;
    location: string;
    price: number;
    images: string[];
}

interface User {
    nombre?: string;
    email: string;
}

interface BaseEntity {
    id: number;
    status: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    property?: Property;
}

interface EntityCardProps<T extends BaseEntity> {
    entity: T;
    title: string;
    type: 'swap' | 'rent' | 'reservation' | 'construction' | 'remodeling';
    children?: React.ReactNode;
    actions?: React.ReactNode;
}

export const EntityCard = <T extends BaseEntity>({
    entity,
    title,
    type,
    children,
    actions
}: EntityCardProps<T>) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{title} #{entity.id}</h3>
                <StatusBadge status={entity.status} type={type} />
            </div>

            {entity.property && (
                <div className="mb-4">
                    <h4 className="font-medium mb-2">Propiedad:</h4>
                    <p className="text-sm">{entity.property.title}</p>
                    <p className="text-sm text-gray-600">{entity.property.location}</p>
                    <p className="text-sm font-medium">€{entity.property.price.toLocaleString()}</p>
                </div>
            )}

            {children}

            <div className="mb-4">
                <p className="text-sm text-gray-600">
                    Usuario: {entity.user.nombre || entity.user.email}
                </p>
                <p className="text-xs text-gray-500">
                    Creado: {new Date(entity.createdAt).toLocaleDateString()}
                </p>
            </div>

            {actions && (
                <div className="flex space-x-2">
                    {actions}
                </div>
            )}
        </div>
    );
};