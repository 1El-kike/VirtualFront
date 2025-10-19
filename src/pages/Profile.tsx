import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserCircleIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import api from '../utils/api';
import useAuth from '../contexts/AuthContext';

interface ProfileFormData {
    email: string;
    nombre?: string;
    nombreMadre?: string;
    nombrePadre?: string;
    ci?: string;
    telefonoMovil?: string;
    telefonoFijo?: string;
    direccionCI?: string;
    direccionActual?: string;
    cuentaTarjetaPago?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

const Profile: React.FC = () => {
    const { user, login } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ProfileFormData>();

    const { data: profileData, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await api.get('/auth/profile');
            return response.data;
        },
    });

    const updateProfileMutation = useMutation({
        mutationFn: async (data: ProfileFormData) => {
            const response = await api.put('/auth/profile', data);
            return response.data;
        },
        onSuccess: (data) => {
            if (data.token) {
                login(data.token);
            }
            setIsEditing(false);
            setChangePassword(false);
            reset();
        },
    });

    // Set form default values when profile data loads
    React.useEffect(() => {
        if (profileData) {
            reset({
                email: profileData.email,
                nombre: profileData.nombre,
                nombreMadre: profileData.nombreMadre,
                nombrePadre: profileData.nombrePadre,
                ci: profileData.ci,
                telefonoMovil: profileData.telefonoMovil,
                telefonoFijo: profileData.telefonoFijo,
                direccionCI: profileData.direccionCI,
                direccionActual: profileData.direccionActual,
                cuentaTarjetaPago: profileData.cuentaTarjetaPago,
            });
        }
    }, [profileData, reset]);

    const onSubmit = (data: ProfileFormData) => {
        updateProfileMutation.mutate(data);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-violet-500 to-teal-500 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-2xl rounded-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-6 py-12 overflow-hidden">
                        <div className="absolute inset-0 bg-teal-400 bg-opacity-10"></div>
                        <div className="absolute -top-4 -right-4 w-32 h-32 bg-rose-200 bg-opacity-10 rounded-full"></div>
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-violet-200 bg-opacity-10 rounded-full"></div>
                        <div className="relative flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6 shadow-2xl">
                                <UserCircleIcon className="w-20 h-20 text-blue-700" />
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-4xl font-bold text-blue-900 mb-2">Mi Perfil</h1>
                                <p className="text-blue-100 text-lg">Gestiona tu información personal y preferencias</p>
                                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
                                        <span className="text-blue-950 font-medium">
                                            {profileData?.role === 'admin' ? '👑 Administrador' : '👤 Usuario'}
                                        </span>
                                    </div>
                                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
                                        <span className="text-blue-950">
                                            📅 Miembro desde {profileData?.createdAt ? new Date(profileData.createdAt).getFullYear() : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100 text-sm font-medium">Estado de Cuenta</p>
                                        <p className="text-2xl font-bold">Activa</p>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-full p-3">
                                        <UserCircleIcon className="w-8 h-8" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-100 text-sm font-medium">Propiedades</p>
                                        <p className="text-2xl font-bold">0</p>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-full p-3">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-100 text-sm font-medium">Posts del Blog</p>
                                        <p className="text-2xl font-bold">0</p>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-full p-3">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Personal Information Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Información Personal</h2>
                                        <p className="text-gray-600 mt-1">Actualiza tus datos personales y de contacto</p>
                                    </div>
                                    {!isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                            <span>Editar Perfil</span>
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                {...register('email', {
                                                    required: 'Email es requerido',
                                                    pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' }
                                                })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900 bg-white px-3 py-2 rounded-md border">{profileData?.email || user?.email}</p>
                                        )}
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nombre Completo
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                {...register('nombre')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900 bg-white px-3 py-2 rounded-md border">{profileData?.nombre || 'No especificado'}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nombre de la Madre
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                {...register('nombreMadre')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900 bg-white px-3 py-2 rounded-md border">{profileData?.nombreMadre || 'No especificado'}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nombre del Padre
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                {...register('nombrePadre')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900 bg-white px-3 py-2 rounded-md border">{profileData?.nombrePadre || 'No especificado'}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cédula de Identidad
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                {...register('ci')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900 bg-white px-3 py-2 rounded-md border">{profileData?.ci || 'No especificado'}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Teléfono Móvil
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                {...register('telefonoMovil')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900 bg-white px-3 py-2 rounded-md border">{profileData?.telefonoMovil || 'No especificado'}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Teléfono Fijo
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                {...register('telefonoFijo')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900 bg-white px-3 py-2 rounded-md border">{profileData?.telefonoFijo || 'No especificado'}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Dirección de Cédula
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                {...register('direccionCI')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900 bg-white px-3 py-2 rounded-md border">{profileData?.direccionCI || 'No especificado'}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Dirección Actual
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                {...register('direccionActual')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900 bg-white px-3 py-2 rounded-md border">{profileData?.direccionActual || 'No especificado'}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cuenta/Tarjeta de Pago
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                {...register('cuentaTarjetaPago')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900 bg-white px-3 py-2 rounded-md border">{profileData?.cuentaTarjetaPago || 'No especificado'}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Rol
                                        </label>
                                        <p className="text-gray-900 bg-white px-3 py-2 rounded-md border capitalize">
                                            {profileData?.role === 'admin' ? 'Administrador' : 'Usuario'}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Fecha de Registro
                                        </label>
                                        <p className="text-gray-900 bg-white px-3 py-2 rounded-md border">
                                            {profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString('es-ES') : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Password Change Section */}
                            {isEditing && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold text-gray-900">Cambiar Contraseña</h2>
                                        <button
                                            type="button"
                                            onClick={() => setChangePassword(!changePassword)}
                                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            {changePassword ? 'Cancelar' : 'Cambiar contraseña'}
                                        </button>
                                    </div>

                                    {changePassword && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-4"
                                        >
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Contraseña Actual
                                                </label>
                                                <input
                                                    type="password"
                                                    {...register('currentPassword', { required: 'Contraseña actual es requerida' })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nueva Contraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    {...register('newPassword', {
                                                        required: 'Nueva contraseña es requerida',
                                                        minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Confirmar Nueva Contraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    {...register('confirmPassword', {
                                                        required: 'Confirmación es requerida',
                                                        validate: value => value === watch('newPassword') || 'Las contraseñas no coinciden'
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {/* Action Buttons */}
                            {isEditing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex space-x-4"
                                >
                                    <button
                                        type="submit"
                                        disabled={updateProfileMutation.isPending}
                                        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                                    >
                                        <CheckIcon className="w-5 h-5" />
                                        <span>{updateProfileMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setChangePassword(false);
                                            reset();
                                        }}
                                        className="flex items-center space-x-2 bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                        <span>Cancelar</span>
                                    </button>
                                </motion.div>
                            )}
                        </form>

                        {/* Success/Error Messages */}
                        {updateProfileMutation.isSuccess && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-6 bg-green-50 border border-green-200 rounded-md p-4"
                            >
                                <p className="text-green-800">Perfil actualizado exitosamente.</p>
                            </motion.div>
                        )}

                        {updateProfileMutation.isError && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-6 bg-red-50 border border-red-200 rounded-md p-4"
                            >
                                <p className="text-red-800">Error al actualizar el perfil. Inténtalo de nuevo.</p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;