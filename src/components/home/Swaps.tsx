import { useTranslation } from "react-i18next";
import type { Property } from "../../types";
import Corousel from "../../widget/corousel";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const Swaps = () => {
    const { t } = useTranslation();

    const { data: properties, isLoading, error } = useQuery<Property[]>({
        queryKey: ['swaps'],
        queryFn: async () => {
            const response = await api.get('/swaps/available-properties');
            return response.data;
        },
    });



    return (
        <section className="py-16" data-aos="fade-up">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-white text-shadow-md text-shadow-purple-300 text-center mb-12">{t('swaps')}</h2>
                {isLoading ? (
                    <div className="text-center">Cargando Permutas...</div>
                ) : error ? (
                    <div className="text-center text-red-500">Error al cargar Permutas</div>
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

export default Swaps