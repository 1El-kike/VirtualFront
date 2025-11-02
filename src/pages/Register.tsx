import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import useAuth from '../contexts/AuthContext';

interface RegisterFormData {
    nombre: string;
    email: string;
    password: string;
    confirmPassword: string;
    nombreMadre?: string;
    nombrePadre?: string;
    ci?: string;
    telefonoMovil?: string;
    telefonoFijo?: string;
    direccionCI?: string;
    direccionActual?: string;
    cuentaTarjetaPago?: string;
}

const Register: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
    const navigate = useNavigate();
    const { login } = useAuth();
    const password = watch('password');

    const registerMutation = useMutation({
        mutationFn: async (data: RegisterFormData) => {
            const response = await api.post('/auth/register', data);
            return response.data;
        },
        onSuccess: (data) => {
            login(data.token);
            navigate('/');
        },
        onError: (error: unknown) => {
            console.error('Register error:', error);
            // Manejo de errores aquí
        },
    });

    const onSubmit = (data: RegisterFormData) => {
        registerMutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-star justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 p-4 gap-8">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl order-2 lg:order-1"
            >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
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
                                className="inline-block p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg"
                            >
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </motion.div>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                        >
                            ¡Bienvenido a CasaCuba!
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed px-4 md:px-0"
                        >
                            Únete a nuestra comunidad de amantes del hogar perfecto
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0, duration: 0.5 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8"
                        >
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30">
                                <div className="text-2xl md:text-3xl mb-3">🏠</div>
                                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Propiedades Exclusivas</h3>
                                <p className="text-blue-100 text-xs md:text-sm">Descubre las mejores propiedades en Cuba con nosotros</p>
                            </div>

                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30">
                                <div className="text-2xl md:text-3xl mb-3">💎</div>
                                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Servicio Premium</h3>
                                <p className="text-blue-100 text-xs md:text-sm">Atención personalizada y asesoramiento experto</p>
                            </div>

                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30">
                                <div className="text-2xl md:text-3xl mb-3">🔒</div>
                                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Seguridad Total</h3>
                                <p className="text-blue-100 text-xs md:text-sm">Tus datos están protegidos con la máxima seguridad</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-yellow-400/30 mx-4 md:mx-0"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">¿Por qué elegirnos?</h3>
                            <div className="text-left space-y-2 md:space-y-3 text-blue-100">
                                <div className="flex items-center space-x-3">
                                    <span className="text-yellow-400 text-sm md:text-base">✓</span>
                                    <span className="text-sm md:text-base">Más de 1000 propiedades verificadas</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-yellow-400 text-sm md:text-base">✓</span>
                                    <span className="text-sm md:text-base">Asesores especializados en cada región</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-yellow-400 text-sm md:text-base">✓</span>
                                    <span className="text-sm md:text-base">Proceso de compra 100% transparente</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-yellow-400 text-sm md:text-base">✓</span>
                                    <span className="text-sm md:text-base">Soporte 24/7 durante todo el proceso</span>
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
                                ¡Regístrate ahora y comienza tu viaje hacia el hogar de tus sueños!
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

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-4xl order-1 lg:order-2"
            >
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                >
                    Crear Cuenta de Cliente
                </motion.h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Campos principales en fila */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                {...register('nombre', { required: 'Nombre es requerido' })}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                placeholder="Ingresa tu nombre completo"
                            />
                            {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', { required: 'Email es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                placeholder="tu@email.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register('password', { required: 'Contraseña es requerida', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                placeholder="Mínimo 6 caracteres"
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                {...register('confirmPassword', {
                                    required: 'Confirma tu contraseña',
                                    validate: value => value === password || 'Las contraseñas no coinciden'
                                })}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                placeholder="Repite tu contraseña"
                            />
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                        </motion.div>
                    </div>

                    {/* Campos adicionales en dos columnas */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Información Adicional (Opcional)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <label htmlFor="nombreMadre" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre de Madre
                                </label>
                                <input
                                    type="text"
                                    id="nombreMadre"
                                    {...register('nombreMadre')}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    placeholder="Nombre de tu madre"
                                />
                                {errors.nombreMadre && <p className="mt-1 text-sm text-red-600">{errors.nombreMadre.message}</p>}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                <label htmlFor="nombrePadre" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre de Padre
                                </label>
                                <input
                                    type="text"
                                    id="nombrePadre"
                                    {...register('nombrePadre')}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    placeholder="Nombre de tu padre"
                                />
                                {errors.nombrePadre && <p className="mt-1 text-sm text-red-600">{errors.nombrePadre.message}</p>}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                            >
                                <label htmlFor="ci" className="block text-sm font-medium text-gray-700 mb-2">
                                    CI (Carne de Identidad)
                                </label>
                                <input
                                    type="text"
                                    id="ci"
                                    {...register('ci')}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    placeholder="Número de CI"
                                />
                                {errors.ci && <p className="mt-1 text-sm text-red-600">{errors.ci.message}</p>}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.0, duration: 0.5 }}
                            >
                                <label htmlFor="telefonoMovil" className="block text-sm font-medium text-gray-700 mb-2">
                                    Teléfono Móvil
                                </label>
                                <input
                                    type="text"
                                    id="telefonoMovil"
                                    {...register('telefonoMovil')}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    placeholder="+591 12345678"
                                />
                                {errors.telefonoMovil && <p className="mt-1 text-sm text-red-600">{errors.telefonoMovil.message}</p>}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.1, duration: 0.5 }}
                            >
                                <label htmlFor="telefonoFijo" className="block text-sm font-medium text-gray-700 mb-2">
                                    Teléfono Fijo
                                </label>
                                <input
                                    type="text"
                                    id="telefonoFijo"
                                    {...register('telefonoFijo')}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    placeholder="+591 2 1234567"
                                />
                                {errors.telefonoFijo && <p className="mt-1 text-sm text-red-600">{errors.telefonoFijo.message}</p>}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                            >
                                <label htmlFor="direccionCI" className="block text-sm font-medium text-gray-700 mb-2">
                                    Dirección CI
                                </label>
                                <input
                                    type="text"
                                    id="direccionCI"
                                    {...register('direccionCI')}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    placeholder="Dirección registrada en CI"
                                />
                                {errors.direccionCI && <p className="mt-1 text-sm text-red-600">{errors.direccionCI.message}</p>}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.3, duration: 0.5 }}
                            >
                                <label htmlFor="direccionActual" className="block text-sm font-medium text-gray-700 mb-2">
                                    Dirección Actual
                                </label>
                                <input
                                    type="text"
                                    id="direccionActual"
                                    {...register('direccionActual')}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    placeholder="Tu dirección actual"
                                />
                                {errors.direccionActual && <p className="mt-1 text-sm text-red-600">{errors.direccionActual.message}</p>}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.4, duration: 0.5 }}
                            >
                                <label htmlFor="cuentaTarjetaPago" className="block text-sm font-medium text-gray-700 mb-2">
                                    Cuenta de Tarjeta de Pago
                                </label>
                                <input
                                    type="text"
                                    id="cuentaTarjetaPago"
                                    {...register('cuentaTarjetaPago')}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    placeholder="Número de cuenta o tarjeta"
                                />
                                {errors.cuentaTarjetaPago && <p className="mt-1 text-sm text-red-600">{errors.cuentaTarjetaPago.message}</p>}
                            </motion.div>
                        </div>
                    </div>

                    {/* Botón de registro */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        className="pt-6"
                    >
                        <button
                            type="submit"
                            disabled={registerMutation.isPending}
                            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            {registerMutation.isPending ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Registrando...
                                </div>
                            ) : (
                                'Crear Cuenta de Cliente'
                            )}
                        </button>
                    </motion.div>
                </form>
                {registerMutation.isError && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-sm text-red-600 text-center"
                    >
                        Error al registrarse. Intenta de nuevo.
                    </motion.p>
                )}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                    className="mt-6 text-center"
                >
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Inicia Sesión
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Register;