import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import api from '../utils/api';
import type { Lead } from '../types';

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    message?: string;
    propertyId?: string;
}

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>();

    const mutation = useMutation({
        mutationFn: async (data: ContactFormData) => {
            const response = await api.post<Lead>('/leads', {
                ...data,
                propertyId: data.propertyId ? parseInt(data.propertyId) : undefined,
            });
            return response.data;
        },
        onSuccess: () => {
            reset();
            alert('Mensaje enviado exitosamente');
        },
        onError: (error: Error) => {
            alert(`Error al enviar mensaje: ${error.message || 'Error desconocido'}`);
        },
    });

    const onSubmit = (data: ContactFormData) => {
        mutation.mutate(data);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-bold mb-4 text-center">Contáctanos</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre *
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', { required: 'Nombre es requerido' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email *
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: 'Email es requerido',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Email inválido',
                            },
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Teléfono
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Mensaje
                    </label>
                    <textarea
                        id="message"
                        {...register('message')}
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700">
                        Propiedad de interés (ID opcional)
                    </label>
                    <input
                        id="propertyId"
                        type="number"
                        {...register('propertyId')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <motion.button
                    type="submit"
                    disabled={mutation.isPending}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {mutation.isPending ? 'Enviando...' : 'Enviar'}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default ContactForm;