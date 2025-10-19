import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import api from '../utils/api';
import type { Property } from '../types';

const Home: React.FC = () => {
    const { t } = useTranslation();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const { data: properties, isLoading, error } = useQuery<Property[]>({
        queryKey: ['properties'],
        queryFn: async () => {
            const response = await api.get('/properties');
            return response.data;
        },
    });

    const featuredProperties = properties?.slice(0, 4) || [];

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Inmobiliaria Virtual - Encuentra tu hogar ideal</title>
                <meta name="description" content="Descubre propiedades exclusivas con tours virtuales. Compra, vende o alquila inmuebles con nuestra plataforma inmobiliaria avanzada." />
                <meta property="og:title" content="Inmobiliaria Virtual - Encuentra tu hogar ideal" />
                <meta property="og:description" content="Descubre propiedades exclusivas con tours virtuales. Compra, vende o alquila inmuebles con nuestra plataforma inmobiliaria avanzada." />
                <meta property="og:image" content="https://inmobiliariavirtual.com/og-image-home.jpg" />
                <meta property="og:url" content="https://inmobiliariavirtual.com/" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {t('heroTitle')}
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {t('heroSubtitle')}
                    </motion.p>
                    <motion.button
                        className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        onClick={() => window.location.href = '/card/create'}
                    >
                        {t('createCard')}
                    </motion.button>
                </div>
            </section>

            {/* Featured Properties Section */}
            <section className="py-16 bg-gray-50" data-aos="fade-up">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">{t('featuredProperties')}</h2>
                    {isLoading ? (
                        <div className="text-center">Cargando propiedades...</div>
                    ) : error ? (
                        <div className="text-center text-red-500">Error al cargar propiedades</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProperties.map((property) => (
                                <motion.div
                                    key={property.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src={property.images[0] || '/placeholder.jpg'}
                                        alt={property.title}
                                        className="w-full h-48 object-cover"
                                        loading="lazy"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                                        <p className="text-gray-600 mb-2">{property.location}</p>
                                        <p className="text-2xl font-bold text-blue-600">${property.price.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500">{property.bedrooms} hab • {property.bathrooms} baños • {property.sqm} m²</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-white" data-aos="fade-up">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">{t('services')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <motion.div
                            className="text-center p-6"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('advancedSearch')}</h3>
                            <p className="text-gray-600">{t('advancedSearchDesc')}</p>
                        </motion.div>
                        <motion.div
                            className="text-center p-6"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('virtualTours')}</h3>
                            <p className="text-gray-600">{t('virtualToursDesc')}</p>
                        </motion.div>
                        <motion.div
                            className="text-center p-6"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('leadManagement')}</h3>
                            <p className="text-gray-600">{t('leadManagementDesc')}</p>
                        </motion.div>
                        <motion.div
                            className="text-center p-6"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('blog')}</h3>
                            <p className="text-gray-600">{t('blogDesc')}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 bg-gray-900 text-white" data-aos="fade-up">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">{t('statistics')}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
                            <div>{t('propertiesSold')}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-400 mb-2">1000+</div>
                            <div>{t('happyClients')}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-400 mb-2">15</div>
                            <div>{t('yearsExperience')}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-orange-400 mb-2">25</div>
                            <div>{t('awardsWon')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-white" data-aos="fade-up">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">{t('testimonials')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-600 mb-4">"Excelente servicio. Encontré mi casa ideal rápidamente."</p>
                            <div className="font-semibold">María García</div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-600 mb-4">"Los tours virtuales son increíbles. Me sentí como si estuviera ahí."</p>
                            <div className="font-semibold">Carlos López</div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-600 mb-4">"Profesionales y eficientes. Recomiendo totalmente."</p>
                            <div className="font-semibold">Ana Martínez</div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;