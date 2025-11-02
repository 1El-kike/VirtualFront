import { useTranslation } from "react-i18next";

const Statistics = () => {
    const { t } = useTranslation();

    return (
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
    )
}

export default Statistics