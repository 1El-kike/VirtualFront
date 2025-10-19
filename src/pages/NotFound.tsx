import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Página no encontrada - Inmobiliaria Virtual</title>
                <meta name="description" content="La página que buscas no existe. Regresa al inicio de Inmobiliaria Virtual." />
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-600 mb-4">Página no encontrada</h2>
                    <p className="text-gray-500 mb-8">
                        Lo sentimos, la página que buscas no existe o ha sido movida.
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;