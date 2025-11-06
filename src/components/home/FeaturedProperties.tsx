import { useQuery } from "@tanstack/react-query";
import type { Property } from "../../types";
import api from "../../utils/api";
//import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import Corousel from "../../widget/corousel";


const FeaturedProperties = () => {
    const { t } = useTranslation();

    const { data: properties, isLoading, error } = useQuery<Property[]>({
        queryKey: ['properties'],
        queryFn: async () => {
            const response = await api.get('/properties');
            return response.data;
        },
    });



    return (
        <section className="py-16 bg-gradient-to-bl from-blue-500/30 to-purple-500/30" data-aos="fade-up">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-white text-shadow-md text-shadow-purple-300 text-center mb-12">{t('featuredProperties')}</h2>
                {isLoading ? (
                    <div className="text-center">Cargando propiedades...</div>
                ) : error ? (
                    <div className="text-center text-red-500">Error al cargar propiedades</div>
                ) : (
                    <Corousel
                        element={properties as Property[]}
                        autoDeslizar={true}
                        intervalo={5000}
                        mostrarFlechas={true}
                        mostrarPuntos={true}
                        className="mb-16"
                    />

                )}
            </div>
        </section>
    )
}

export default FeaturedProperties