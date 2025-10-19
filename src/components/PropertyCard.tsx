import React from 'react';
import type { Property } from '../types';

interface PropertyCardProps {
    property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    return (
        <article className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in" role="article" aria-labelledby={`property-title-${property.id}`}>
            <img
                src={property.images[0] || '/placeholder.jpg'}
                alt={`Imagen de la propiedad ${property.title} ubicada en ${property.location}`}
                className="w-full h-48 object-cover"
                loading="lazy"
            />
            <div className="p-4">
                <h3 id={`property-title-${property.id}`} className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-2">{property.description}</p>
                <p className="text-lg font-bold text-blue-600 mb-2" aria-label={`Precio: ${property.price.toLocaleString()} euros`}>€{property.price.toLocaleString()}</p>
                <div className="flex justify-between text-sm text-gray-500">
                    <span aria-label={`${property.bedrooms} dormitorios`}>{property.bedrooms} dormitorios</span>
                    <span aria-label={`${property.sqm} metros cuadrados`}>{property.sqm} m²</span>
                </div>
                <p className="text-sm text-gray-500 mt-2" aria-label={`Ubicación: ${property.location}`}>{property.location}</p>
            </div>
        </article>
    );
};

export default PropertyCard;