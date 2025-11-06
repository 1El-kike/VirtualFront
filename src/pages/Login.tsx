import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import useAuth from '../contexts/AuthContext';

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const navigate = useNavigate();
    const { login } = useAuth();

    const loginMutation = useMutation({
        mutationFn: async (data: LoginFormData) => {
            const response = await api.post('/auth/login', data);
            return response.data;
        },
        onSuccess: (data) => {
            login(data.token);
            navigate('/');
        },
        onError: (error: unknown) => {
            console.error('Login error:', error);
            // Manejo de errores aquí, e.g., mostrar toast
        },
    });

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-start justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 gap-8">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full z-10 max-w-md order-1 lg:order-1"
            >
                <div className="bg-white md:min-h-screen p-6 md:p-8 rounded-2xl shadow-2xl">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-3xl font-bold text-center mb-6  text-gray-800"
                    >
                        Iniciar Sesión
                    </motion.h2>
                    <div className=''>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register('email', { required: 'Email es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register('password', { required: 'Contraseña es requerida', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                            </motion.div>
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                type="submit"
                                disabled={loginMutation.isPending}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {loginMutation.isPending ? 'Iniciando...' : 'Iniciar Sesión'}
                            </motion.button>
                        </form>
                    </div>

                    {loginMutation.isError && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 text-sm text-red-600 text-center"
                        >
                            Error al iniciar sesión. Verifica tus credenciales.
                        </motion.p>
                    )}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="mt-6 text-center"
                    >
                        <p className="text-sm text-gray-600">
                            ¿No tienes cuenta?{' '}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Regístrate
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl order-2 lg:order-2"
            >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="mb-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
                                className="inline-block p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-lg"
                            >
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </motion.div>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                        >
                            ¡Bienvenido de Vuelta!
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed px-4 md:px-0"
                        >
                            Accede a tu cuenta y continúa tu búsqueda del hogar perfecto
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0, duration: 0.5 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8"
                        >
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30">
                                <div className="text-2xl md:text-3xl mb-3">🔑</div>
                                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Acceso Seguro</h3>
                                <p className="text-blue-100 text-xs md:text-sm">Tu información está protegida con encriptación avanzada</p>
                            </div>

                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30">
                                <div className="text-2xl md:text-3xl mb-3">⚡</div>
                                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Acceso Rápido</h3>
                                <p className="text-blue-100 text-xs md:text-sm">Entra en segundos a tu panel de control</p>
                            </div>

                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30">
                                <div className="text-2xl md:text-3xl mb-3">📊</div>
                                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Tus Propiedades</h3>
                                <p className="text-blue-100 text-xs md:text-sm">Gestiona tus propiedades favoritas y búsquedas</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            className="bg-gradient-to-r from-green-400/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-green-400/30 mx-4 md:mx-0"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">¿Qué puedes hacer?</h3>
                            <div className="text-left space-y-2 md:space-y-3 text-blue-100">
                                <div className="flex items-center space-x-3">
                                    <span className="text-green-400 text-sm md:text-base">✓</span>
                                    <span className="text-sm md:text-base">Buscar propiedades por ubicación y precio</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-green-400 text-sm md:text-base">✓</span>
                                    <span className="text-sm md:text-base">Guardar propiedades favoritas</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-green-400 text-sm md:text-base">✓</span>
                                    <span className="text-sm md:text-base">Contactar directamente con vendedores</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-green-400 text-sm md:text-base">✓</span>
                                    <span className="text-sm md:text-base">Acceder a tu perfil y configuraciones</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.5 }}
                            className="mt-8 px-4 md:px-0"
                        >
                            <p className="text-blue-200 text-base md:text-lg font-medium text-center">
                                ¡Tu próximo hogar te está esperando!
                            </p>
                            <div className="mt-4 flex justify-center space-x-2">
                                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
