import { useTranslation } from "react-i18next";

const Testimonials = () => {
    const { t } = useTranslation();

    return (
        <section className="py-16 bg-white/50" data-aos="fade-up">
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
    )
}

export default Testimonials