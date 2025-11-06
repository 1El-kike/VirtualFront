import { Suspense, type FC } from "react";
import { motion } from "framer-motion";
import { Progress } from "@heroui/react";
import { useTranslation } from "react-i18next";

interface WithChildren {
    children: React.ReactNode;
}

export const SuspensedView: FC<WithChildren> = ({ children }) => {
    const { t } = useTranslation();

    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-100 relative overflow-hidden flex items-center justify-center p-4">
                    {/* Elementos decorativos animados */}
                    <div className="absolute inset-0">
                        {/* Curvas animadas de fondo */}
                        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
                            <motion.path
                                d="M0,200 Q200,100 400,200 Q600,300 800,200 Q1000,100 1200,200"
                                stroke="rgba(236, 72, 153, 0.1)"
                                strokeWidth="3"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M200,600 Q400,500 600,600 Q800,700 1000,600 Q1200,500 1400,600"
                                stroke="rgba(219, 39, 119, 0.08)"
                                strokeWidth="2"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                            />
                        </svg>

                        {/* Círculos flotantes */}
                        <motion.div
                            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-rose-300/30 rounded-full blur-xl"
                            animate={{
                                y: [0, -20, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-rose-200/25 to-pink-300/25 rounded-full blur-lg"
                            animate={{
                                y: [0, 15, 0],
                                scale: [1, 0.9, 1],
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                        />
                    </div>

                    <motion.div
                        className="relative z-10 text-center max-w-md mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Icono animado */}
                        <motion.div
                            className="mb-8"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
                        >
                            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-2xl">
                                <motion.svg
                                    className="w-12 h-12 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </motion.svg>
                            </div>
                        </motion.div>

                        {/* Título */}
                        <motion.h2
                            className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {t("Loading...")}
                        </motion.h2>

                        {/* Descripción */}
                        <motion.p
                            className="text-gray-600 mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {t("Estamos preparando todo para ti. Solo un momento...")}
                        </motion.p>

                        {/* Barra de progreso */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Progress
                                isIndeterminate
                                color="secondary"
                                size="lg"
                                className="max-w-md"
                            />
                        </motion.div>

                        {/* Elementos decorativos adicionales */}
                        <motion.div
                            className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            <span className="text-white text-xs">✨</span>
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        >
                            <span className="text-white text-xs">💫</span>
                        </motion.div>
                    </motion.div>
                </div>
            }
        >
            {children}
        </Suspense>
    );
};