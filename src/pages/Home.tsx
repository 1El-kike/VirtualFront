import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from '../components/home/HeroSection';
import FeaturedProperties from '../components/home/FeaturedProperties';
import ServicesSection from '../components/home/ServicesSection';
import Statistics from '../components/home/Statistics';
import Testimonials from '../components/home/Testimonials';
import Swaps from '../components/home/Swaps';
import Rent from '../components/home/Rent';
import Reservation from '../components/home/Reservation';
import { Contruction } from '../components/home/Contruction';
import Remodeling from '../components/home/Remodeling';

const Home: React.FC = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);



    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Inmobiliaria Virtual - Encuentra tu hogar ideal</title>
                <meta name="description" content="Descubre propiedades exclusivas con tours virtuales. Compra, vende o alquila inmuebles con nuestra plataforma inmobiliaria avanzada." />
                <meta property="og:title" content="Inmobiliaria Virtual - Encuentra tu hogar ideal" />
                <meta property="og:description" content="Descubre propiedades exclusivas con tours virtuales. Compra, vende o alquila inmuebles con nuestra plataforma inmobiliaria avanzada." />
                <meta property="og:image" content="https://inmobiliariavirtual.com/og-image-home.jpg" />
                <meta property="og:url" content="https://inmobiliariavirtual.com/" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            {/* Hero Section */}
            <HeroSection />
            {/* Featured Properties Section */}
            <FeaturedProperties />
            {/* Permuta */}
            <Swaps />
            {/* Services Section */}
            <ServicesSection />
            {/* Renta */}
            <Rent />
            {/* Reservacion o Hospedaje*/}
            <Reservation />
            {/* Statistics Section */}
            <Statistics />
            {/* Construcción */}
            <Contruction />
            {/* Remodelacion */}
            <Remodeling />
            {/* Testimonials Section */}
            <Testimonials />

        </div>
    );
};

export default Home;