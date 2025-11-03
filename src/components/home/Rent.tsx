import { useTranslation } from "react-i18next";
import Corousel from "../../widget/corousel";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "../../types";
import api from "../../utils/api";

const Rent = () => {
    const { t } = useTranslation();

    const { data: properties, isLoading, error } = useQuery<Property[]>({
        queryKey: ['rent'],
        queryFn: async () => {
            const response = await api.get('/rents/available-properties');
            return response.data;
        },
    });



    return (
        <section className="py-16" data-aos="fade-up">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">{t('rent')}</h2>
                {isLoading ? (
                    <div className="text-center">Cargando Rentas...</div>
                ) : error ? (
                    <div className="text-center text-red-500">Error al cargar Rentas</div>
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

export default Rent