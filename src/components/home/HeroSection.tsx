import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import img from "../../assets/1.jpg"
import img2 from "../../assets/3.png"
import img3 from "../../assets/img-4.jpg"
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid';
import { HomeModernIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
    const { t } = useTranslation();

    return (
        <section className="relative h-screen mb-20 mask-b-from-90% mask-b-to-99%   flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 opacity-30 mask-radial-[70%90%] mask-radial-from-75% mask-radial-at-left">
                <img src={img3} className='w-full object-cover h-full' alt="" />
            </div>
            <div className="absolute inset-0 opacity-50">
                <img src={img} className='w-full h-full' alt="" />
            </div>
            <div className="absolute right-2 bottom-10">
                <img src={img2} className='w-96 object-cover' alt="" />
                <div className='hidden relative md:block text-center border border-teal-500 bg-gradient-to-bl from-slate-100 to-purple-50 w-96 h-40 rounded-xl shadow-2xl shadow-teal-400'>
                    <ChatBubbleBottomCenterTextIcon className='w-20 h-20 absolute top-1 left-[40%] text-yellow-500' />
                    <p className='text-yellow-500 font-extrabold  text-4xl pt-20 font-sans text-center text-shadow-amber-950 text-shadow-2xs  w-auto'> 100% Calidad</p>
                </div>
            </div>
            <div className="relative h-full flex flex-col justify-start items-center mt-10 md:gap-5 z-10 text-center px-4">
                <motion.div
                    className="flex w-full justify-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <HomeModernIcon className='w-40 text-teal-200' />
                </motion.div>
                <motion.h1
                    className="text-4xl md:text-8xl font-sans text-shadow-teal-500 text-shadow-lg  font-bold mb-6"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {t('heroTitle')}
                </motion.h1>
                <motion.p
                    className="text-xl font-serif text-teal-200 md:text-2xl  mb-8 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {t('heroSubtitle')}
                </motion.p>
                <motion.button
                    className="bg-gradient-to-bl from-violet-400 to-teal-400  md:max-w-[20%] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    onClick={() => window.location.href = '/card/create'}
                >
                    {t('createCard')}
                </motion.button>
            </div>
            <div className='hidden md:block grow basis-1/2'>

            </div>
        </section>
    )
}

export default HeroSection