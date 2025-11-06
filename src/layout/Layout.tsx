import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import { motion } from "framer-motion";


export const Layout = () => {
    return (
        <div className="min-h-screen relative font-sans flex flex-col">
            {/* fondo de color calido */}
            <div
                className="fixed inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                aria-hidden="true"
            >
                <div className="relative clip-fondo left-1/2 -z-10 aspect-[1155/778]  w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#7404a8] to-[#0f3e77] opacity-40 sm:left-[calc(90%-40rem)] sm:w-[102.1875rem]"></div>
            </div>
            <Header />
            <main className="flex-1 font-serif bg-gradient-to-br from-slate-950 to-blue-950" role="main">
                <div className="absolute inset-0">
                    {/* Curvas animadas de fondo */}
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
                        {/* Curva superior izquierda */}
                        <motion.path
                            d="M0,200 Q200,100 400,200 Q600,300 800,200 Q1000,100 1200,200"
                            stroke="rgba(236, 72, 153, 0.1)"
                            strokeWidth="3"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        {/* Curva inferior derecha */}
                        <motion.path
                            d="M200,600 Q400,500 600,600 Q800,700 1000,600 Q1200,500 1400,600"
                            stroke="rgba(219, 39, 119, 0.08)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                        />
                        {/* Curva central ondulada */}
                        <motion.path
                            d="M0,400 Q150,350 300,400 Q450,450 600,400 Q750,350 900,400 Q1050,450 1200,400"
                            stroke="rgba(244, 114, 182, 0.12)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
                        />
                    </svg>

                    {/* Círculos flotantes con gradientes rosados */}
                    <motion.div
                        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-teal-300/20 to-purple-400/20 rounded-full blur-xl"
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
                        className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-teal-300/20 to-purple-400/20 rounded-full blur-lg"
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
                    <motion.div
                        className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-teal-300/20 to-purple-400/20 rounded-full blur-md"
                        animate={{
                            x: [0, 10, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    />

                    {/* Partículas brillantes */}
                    <motion.div
                        className="absolute top-1/4 right-1/4 w-2 h-2 bg-teal-400 rounded-full"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-teal-400 rounded-full"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                    />
                    <motion.div
                        className="absolute top-3/4 right-1/3 w-4 h-4 bg-teal-500 rounded-full"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                    />
                </div>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
