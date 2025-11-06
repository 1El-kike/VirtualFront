import { useTranslation } from "react-i18next";
import Corousel from "../../widget/corousel";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "../../types";
import api from "../../utils/api";


const Reservation = () => {
    const { t } = useTranslation();

    const { data: properties, isLoading, error } = useQuery<Property[]>({
        queryKey: ['reservation'],
        queryFn: async () => {
            const response = await api.get('/reservation');
            return response.data;
        },
    });



    return (
        <section className="py-16" data-aos="fade-up">
            <div className="container mx-auto px-4">
                <h2 className="md:text-4xl text-2xl font-bold text-white text-shadow-md text-shadow-purple-300 text-center mb-12">{t('reservation')}</h2>
                {isLoading ? (
                    <div className="text-center">Cargando Reservación o Hospedaje...</div>
                ) : error ? (
                    <div className="text-center text-red-500">Error al cargar Reservación o Hospedaje</div>
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

export default Reservation