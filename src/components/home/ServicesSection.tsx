import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ServicesSection = () => {

    const { t } = useTranslation();

    return (
        <section className="py-16 bg-white/70" data-aos="fade-up">
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
    )
}

export default ServicesSection