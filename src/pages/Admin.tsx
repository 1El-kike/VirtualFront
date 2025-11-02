/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';
import type { Property } from '../types';
import useAuth from '../contexts/AuthContext';
import { useState } from 'react';
import { getFirstImageUrl } from '../utils/imageHelper';

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
    imagePreviews: string[];
}
const Admin: React.FC = () => {
    const { token, isAdmin } = useAuth();
    const queryClient = useQueryClient();
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
                    <p className="text-lg text-gray-600">Solo los administradores pueden acceder a esta página.</p>
                </div>
            </div>
        );
    }
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
        imagePreviews: [],
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
        onError: (error: unknown) => {
            console.error('Error deleting property:', error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            alert(`Error al eliminar la propiedad: ${message}`);
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
        onError: (error: unknown) => {
            console.error('Error creating property:', error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            alert(`Error al crear la propiedad: ${message}`);
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
        onError: (error: unknown) => {
            console.error('Error updating property:', error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            alert(`Error al actualizar la propiedad: ${message}`);
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
            imagePreviews: [],
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
            imagePreviews: property.images || [],
        });
        setShowForm(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const previews: string[] = [];
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        previews.push(e.target.result as string);
                        if (previews.length === files.length) {
                            setFormData(prev => ({ ...prev, imagePreviews: previews }));
                        }
                    }
                };
                reader.readAsDataURL(file);
            });
        }
        setFormData(prev => ({ ...prev, images: files }));
    };

    const removeImagePreview = (index: number) => {
        setFormData(prev => ({
            ...prev,
            imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validaciones básicas
        if (!formData.title.trim()) {
            alert('El título es obligatorio');
            return;
        }
        if (!formData.location.trim()) {
            alert('La ubicación es obligatoria');
            return;
        }
        if (formData.price <= 0) {
            alert('El precio debe ser mayor a 0');
            return;
        }
        if (formData.bedrooms < 0) {
            alert('Los dormitorios no pueden ser negativos');
            return;
        }
        if (formData.bathrooms < 0) {
            alert('Los baños no pueden ser negativos');
            return;
        }
        if (formData.sqm <= 0) {
            alert('Los metros cuadrados deben ser mayores a 0');
            return;
        }

        if (editingProperty) {
            updateMutation.mutate({ id: editingProperty.id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-lg text-gray-600">Cargando propiedades...</p>
            </div>
        </div>
    );
    if (error) return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <div className="text-red-500 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Error al cargar propiedades</h2>
                <p className="text-gray-600">Por favor, intenta recargar la página.</p>
            </div>
        </div>
    );

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
                                onChange={handleImageChange}
                                className="p-2 border rounded md:col-span-2"
                            />
                            {formData.imagePreviews.length > 0 && (
                                <div className="md:col-span-2">
                                    <h4 className="text-sm font-medium mb-2">Vista previa de imágenes:</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {formData.imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={preview}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-20 object-cover rounded border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImagePreview(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={createMutation.isPending || updateMutation.isPending}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                        >
                            {(createMutation.isPending || updateMutation.isPending) ? 'Guardando...' : (editingProperty ? 'Actualizar' : 'Crear')}
                        </button>
                    </form>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties?.map((property) => (
                        <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={getFirstImageUrl(property.images) || '/placeholder.jpg'}
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
                                        disabled={deleteMutation.isPending}
                                        className="px-3 py-1 bg-red-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
                                    >
                                        {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
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