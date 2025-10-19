import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import api from '../utils/api';
import type { Property } from '../types';
import ImageGallery from '../components/ImageGallery';

const PropertyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [loaded, setLoaded] = useState(false);

    const { data: property, isLoading, error } = useQuery<Property>({
        queryKey: ['property', id],
        queryFn: async () => {
            const response = await api.get(`/properties/${id}`);
            return response.data;
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-lg">Cargando propiedad...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-lg text-red-500">Error al cargar la propiedad</div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-lg">Propiedad no encontrada</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Helmet>
                <title>{property.title} - Inmobiliaria Virtual</title>
                <meta name="description" content={`${property.description} Ubicada en ${property.location}. ${property.bedrooms} dormitorios, ${property.bathrooms} baños, ${property.sqm} m². Precio: €${property.price.toLocaleString()}.`} />
                <meta property="og:title" content={`${property.title} - Inmobiliaria Virtual`} />
                <meta property="og:description" content={`${property.description} Ubicada en ${property.location}.`} />
                <meta property="og:image" content={property.images[0] || 'https://inmobiliariavirtual.com/default-property.jpg'} />
                <meta property="og:url" content={`https://inmobiliariavirtual.com/properties/${property.id}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "RealEstateListing",
                        "name": property.title,
                        "description": property.description,
                        "image": property.images,
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": property.location
                        },
                        "numberOfRooms": property.bedrooms,
                        "numberOfBathroomsTotal": property.bathrooms,
                        "floorSize": {
                            "@type": "QuantitativeValue",
                            "value": property.sqm,
                            "unitText": "SQMT"
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": property.price,
                            "priceCurrency": "EUR"
                        },
                        "url": `https://inmobiliariavirtual.com/properties/${property.id}`
                    })}
                </script>
            </Helmet>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">{property.title}</h1>
                <div className="mb-8">
                    <ImageGallery images={property.images} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Detalles</h2>
                        <p className="mb-2"><strong>Ubicación:</strong> {property.location}</p>
                        <p className="mb-2"><strong>Precio:</strong> ${property.price.toLocaleString()}</p>
                        <p className="mb-2"><strong>Habitaciones:</strong> {property.bedrooms}</p>
                        <p className="mb-2"><strong>Baños:</strong> {property.bathrooms}</p>
                        <p className="mb-2"><strong>Metros cuadrados:</strong> {property.sqm}</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                        <p>{property.description || 'Sin descripción disponible'}</p>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Tour Virtual</h2>
                    {property.virtualTourUrl ? (
                        <div className="relative overflow-hidden rounded-lg">
                            <iframe
                                src={property.virtualTourUrl}
                                className={`w-full aspect-video border-0 rounded-lg transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                                title="Tour Virtual"
                                allowFullScreen
                                onLoad={() => setLoaded(true)}
                            ></iframe>
                        </div>
                    ) : (
                        <div className="w-full aspect-video bg-gray-200 flex items-center justify-center rounded-lg">
                            <p className="text-gray-500">Tour virtual no disponible</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;