import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';
import type { Property } from '../types';
import useAuth from '../contexts/AuthContext';

interface PropertyFormData {
    title: string;
    description: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqm: number;
    virtualTourUrl?: string;
    images: FileList | null;
}

const Admin: React.FC = () => {
    const { token } = useAuth();
    const queryClient = useQueryClient();
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<PropertyFormData>({
        title: '',
        description: '',
        location: '',
        price: 0,
        bedrooms: 0,
        bathrooms: 0,
        sqm: 0,
        virtualTourUrl: '',
        images: null,
    });

    const { data: properties, isLoading, error } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const response = await api.get('/properties');
            return response.data as Property[];
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/properties/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['properties'] });
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: PropertyFormData) => {
            const formDataToSend = new FormData();
            formDataToSend.append('title', data.title);
            formDataToSend.append('description', data.description);
            formDataToSend.append('location', data.location);
            formDataToSend.append('price', data.price.toString());
            formDataToSend.append('bedrooms', data.bedrooms.toString());
            formDataToSend.append('bathrooms', data.bathrooms.toString());
            formDataToSend.append('sqm', data.sqm.toString());
            if (data.virtualTourUrl) formDataToSend.append('virtualTourUrl', data.virtualTourUrl);
            if (data.images) {
                Array.from(data.images).forEach(file => {
                    formDataToSend.append('images', file);
                });
            }
            await api.post('/properties', formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['properties'] });
            resetForm();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: PropertyFormData }) => {
            const formDataToSend = new FormData();
            formDataToSend.append('title', data.title);
            formDataToSend.append('description', data.description);
            formDataToSend.append('location', data.location);
            formDataToSend.append('price', data.price.toString());
            formDataToSend.append('bedrooms', data.bedrooms.toString());
            formDataToSend.append('bathrooms', data.bathrooms.toString());
            formDataToSend.append('sqm', data.sqm.toString());
            if (data.virtualTourUrl) formDataToSend.append('virtualTourUrl', data.virtualTourUrl);
            if (data.images) {
                Array.from(data.images).forEach(file => {
                    formDataToSend.append('images', file);
                });
            }
            await api.put(`/properties/${id}`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['properties'] });
            resetForm();
        },
    });

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            location: '',
            price: 0,
            bedrooms: 0,
            bathrooms: 0,
            sqm: 0,
            virtualTourUrl: '',
            images: null,
        });
        setEditingProperty(null);
        setShowForm(false);
    };

    const handleEdit = (property: Property) => {
        setEditingProperty(property);
        setFormData({
            title: property.title,
            description: property.description || '',
            location: property.location,
            price: property.price,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            sqm: property.sqm,
            virtualTourUrl: property.virtualTourUrl || '',
            images: null,
        });
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProperty) {
            updateMutation.mutate({ id: editingProperty.id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    if (isLoading) return <div className="text-center">Cargando...</div>;
    if (error) return <div className="text-center text-red-500">Error al cargar propiedades.</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Administración de Propiedades</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {showForm ? 'Cancelar' : 'Crear Nueva Propiedad'}
                </button>
                {showForm && (
                    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Título"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                className="p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Ubicación"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                                className="p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Precio"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                required
                                className="p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Dormitorios"
                                value={formData.bedrooms}
                                onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                                required
                                className="p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Baños"
                                value={formData.bathrooms}
                                onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                                required
                                className="p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Metros cuadrados"
                                value={formData.sqm}
                                onChange={(e) => setFormData({ ...formData, sqm: parseFloat(e.target.value) })}
                                required
                                className="p-2 border rounded"
                            />
                            <input
                                type="url"
                                placeholder="URL Tour Virtual"
                                value={formData.virtualTourUrl}
                                onChange={(e) => setFormData({ ...formData, virtualTourUrl: e.target.value })}
                                className="p-2 border rounded"
                            />
                            <textarea
                                placeholder="Descripción"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="p-2 border rounded md:col-span-2"
                            />
                            <input
                                title='file'
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => setFormData({ ...formData, images: e.target.files })}
                                className="p-2 border rounded md:col-span-2"
                            />
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                            {editingProperty ? 'Actualizar' : 'Crear'}
                        </button>
                    </form>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties?.map((property) => (
                        <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={property.images[0] || '/placeholder.jpg'}
                                alt={property.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                                <p className="text-gray-600 mb-2">{property.description}</p>
                                <p className="text-lg font-bold text-blue-600 mb-2">€{property.price.toLocaleString()}</p>
                                <div className="flex justify-between text-sm text-gray-500 mb-4">
                                    <span>{property.bedrooms} dormitorios</span>
                                    <span>{property.sqm} m²</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">{property.location}</p>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(property)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deleteMutation.mutate(property.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;